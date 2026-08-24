import type { AadhaarData, CollectedInfo, Language } from '@/types';
import { getFormById, autoFillFromAadhaar } from './forms';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const MODEL = 'gemini-1.5-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

export function isGeminiConfigured(): boolean {
  return !!API_KEY && API_KEY.length > 10;
}

const LANG_NAMES: Record<Language, string> = {
  en: 'English',
  hi: 'Hindi (Devanagari script)',
  mr: 'Marathi (Devanagari script)',
};

const LANG_INSTRUCTIONS: Record<Language, string> = {
  en: 'Always respond in English.',
  hi: 'Always respond in Hindi using Devanagari script.',
  mr: 'Always respond in Marathi using Devanagari script.',
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: { message: string };
};

export type ConversationContext = {
  lang: Language;
  aadhaar: AadhaarData | null;
  collected: CollectedInfo;
  history: Array<{ role: 'user' | 'bot'; text: string }>;
};

/**
 * Ask Gemini which form the user wants to fill.
 * Returns a formId if detected, or null.
 */
export async function detectFormWithGemini(
  userText: string,
  lang: Language,
): Promise<string | null> {
  if (!isGeminiConfigured()) return null;

  const prompt = `You are a form detection assistant. The user said: "${userText}"
Which Indian government form do they want to fill?
Options: pan, passport, voter, ration
Reply with ONLY the form id (one word, lowercase). If you cannot determine, reply with "unknown".`;

  try {
    const resp = await callGemini(prompt, lang);
    const cleaned = resp.trim().toLowerCase();
    if (['pan', 'passport', 'voter', 'ration'].includes(cleaned)) {
      return cleaned;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Main conversational call — sends the full context to Gemini and gets a reply.
 * Gemini decides what to ask next or confirms completion.
 */
export async function chatWithGemini(ctx: ConversationContext): Promise<{
  reply: string;
  isComplete: boolean;
  extractedFields?: Record<string, string>;
}> {
  if (!isGeminiConfigured()) {
    return { reply: '', isComplete: false };
  }

  const formDef = ctx.collected.formId ? getFormById(ctx.collected.formId) : null;
  const autoFilled = formDef && ctx.aadhaar
    ? autoFillFromAadhaar(formDef, ctx.aadhaar)
    : {};

  const systemPrompt = buildSystemPrompt(ctx, formDef ?? undefined, autoFilled);
  const conversationText = ctx.history
    .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
    .join('\n');

  const fullPrompt = `${systemPrompt}\n\nConversation so far:\n${conversationText}\n\nAssistant:`;

  try {
    const reply = await callGemini(fullPrompt, ctx.lang);

    // Check for completion signal
    const isComplete = reply.includes('[FORM_COMPLETE]') || reply.includes('[COMPLETE]');
    const cleanReply = reply.replace(/\[FORM_COMPLETE\]|\[COMPLETE\]/g, '').trim();

    // Try to extract any structured data from the reply
    const extractedFields = extractFields(reply, ctx);

    return { reply: cleanReply, isComplete, extractedFields };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { reply: `Sorry, I encountered an error: ${message}`, isComplete: false };
  }
}

function buildSystemPrompt(
  ctx: ConversationContext,
  formDef: ReturnType<typeof getFormById>,
  autoFilled: Record<string, string>,
): string {
  const langName = LANG_NAMES[ctx.lang];
  const langInstruction = LANG_INSTRUCTIONS[ctx.lang];

  let prompt = `You are BharoAI, an AI assistant that helps Indian citizens fill government (Sarkari) forms. ${langInstruction}

You are friendly, respectful, and concise. You talk like a helpful government clerk who guides citizens through form-filling.`;

  if (ctx.aadhaar) {
    prompt += `\n\nThe user has uploaded their Aadhaar card. Extracted details:
- Name: ${ctx.aadhaar.name}
- Date of Birth: ${ctx.aadhaar.dob}
- Gender: ${ctx.aadhaar.gender}
- Aadhaar Number: ${ctx.aadhaar.aadhaarNumber}
- Address: ${ctx.aadhaar.address}`;
  }

  if (formDef) {
    prompt += `\n\nThe user wants to fill: ${formDef.name.en}
This form requires these fields:`;
    for (const field of formDef.fields) {
      const autoVal = autoFilled[field.key];
      const collectedVal = ctx.collected[field.key];
      const val = collectedVal || autoVal;
      prompt += `\n- ${field.label.en}${field.required ? ' (required)' : ''}: ${val || 'NOT YET PROVIDED'}`;
    }
    prompt += `\n\nYour job: Ask for the missing required fields one at a time, naturally and conversationally. When a field is already filled from Aadhaar, mention it briefly and move on. Don't ask for fields that are already filled.

When ALL required fields are filled, output the tag [FORM_COMPLETE] at the end of your message and give a brief confirmation summary.`;
  } else {
    prompt += `\n\nThe user hasn't selected a form yet. Ask them which form they want to fill (PAN Card, Passport, Voter ID, or Ration Card).`;
  }

  prompt += `\n\nImportant rules:
- Respond in ${langName} only.
- Keep responses short (2-3 sentences max).
- Ask only ONE question at a time.
- Be warm and encouraging.`;

  return prompt;
}

function extractFields(reply: string, ctx: ConversationContext): Record<string, string> | undefined {
  // Look for [FIELD:key=value] patterns
  const fieldPattern = /\[FIELD:(\w+)=([^\]]+)\]/g;
  const fields: Record<string, string> = {};
  let match;
  while ((match = fieldPattern.exec(reply)) !== null) {
    fields[match[1]] = match[2].trim();
  }
  return Object.keys(fields).length > 0 ? fields : undefined;
}

async function callGemini(prompt: string, lang: Language): Promise<string> {
  const langInstruction = LANG_INSTRUCTIONS[lang];

  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: `${langInstruction}\n\n${prompt}` }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 300,
    },
  };

  const resp = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const errData = await resp.json().catch(() => null);
    const msg = errData?.error?.message || `HTTP ${resp.status}`;
    throw new Error(msg);
  }

  const data = (await resp.json()) as GeminiResponse;
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('No response from Gemini');
  }
  return text;
}

/**
 * Get the initial welcome message from Gemini (or fallback).
 */
export async function getWelcomeMessage(lang: Language): Promise<string> {
  if (!isGeminiConfigured()) {
    return ''; // Caller handles fallback
  }

  const prompts: Record<Language, string> = {
    en: 'Greet the user as BharoAI. Tell them to upload their Aadhaar card and then tell you which government form they want to fill (PAN Card, Passport, Voter ID, or Ration Card). Keep it to 2-3 sentences.',
    hi: 'BharoAI के रूप में उपयोगकर्ता को अभिवादन करें। उन्हें बताएं कि अपना आधार कार्ड अपलोड करें और फिर बताएं कि कौन सा सरकारी फॉर्म भरना है (PAN कार्ड, पासपोर्ट, वोटर ID, या राशन कार्ड)। 2-3 वाक्यों में रखें।',
    mr: 'BharoAI म्हणून वापरकर्त्याला अभिवादन करा. त्यांना सांगा की त्यांचे आधार कार्ड अपलोड करा आणि मग सांगा कोणता सरकारी फॉर्म भरायचा आहे (PAN कार्ड, पासपोर्ट, व्होटर ID, किंवा राशन कार्ड). 2-3 वाक्यांत ठेवा.',
  };

  try {
    return await callGemini(prompts[lang], lang);
  } catch {
    return '';
  }
}
