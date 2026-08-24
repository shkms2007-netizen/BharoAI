import type { AadhaarData } from '@/types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const MODEL = 'gemini-1.5-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

function isGeminiConfigured(): boolean {
  return!!API_KEY && API_KEY.length > 10;
}

async function fileToBase64(file: File | Blob): Promise<{ base64: string; mime: string }> {
  const mime = file.type || 'image/jpeg';
  const buffer = await file.arrayBuffer();
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return { base64, mime };
}

// Main function used by your app
export async function runOCR(
  file: File | Blob,
  onProgress?: (pct: number) => void,
): Promise<string> {
  if (!isGeminiConfigured()) {
    throw new Error('Gemini API key not configured');
  }
  onProgress?.(10);
  const { base64, mime } = await fileToBase64(file);
  onProgress?.(30);

  const prompt = `You are Aadhaar OCR expert. Extract from this Indian Aadhaar card image:
- Full Name
- Date of Birth (DD/MM/YYYY)
- Gender
- Aadhaar Number (12 digits as XXXX XXXX XXXX)
- Full Address

Return ONLY valid JSON like:
{"name":"...","dob":"...","gender":"Male/Female/Other","aadhaarNumber":"XXXX XXXX XXXX","address":"..."}
If a field is not visible, use "Not detected". If this is back side of Aadhaar, extract address only and put "Not detected" for name. JSON only, no extra text.`;

  const body = {
    contents: [
      {
        role: 'user',
        parts: [
          { inline_data: { mime_type: mime, data: base64 } },
          { text: prompt },
        ],
      },
    ],
    generationConfig: { temperature: 0.1, maxOutputTokens: 500 },
  };

  const resp = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => null);
    throw new Error(err?.error?.message || `Gemini error ${resp.status}`);
  }

  const data = await resp.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  onProgress?.(90);
  return text;
}

export function parseAadhaarText(rawText: string): AadhaarData {
  try {
    // Try to find JSON inside response
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        name: parsed.name || 'Not detected',
        dob: parsed.dob || 'Not detected',
        gender: parsed.gender || 'Not detected',
        aadhaarNumber: parsed.aadhaarNumber || 'Not detected',
        address: parsed.address || 'Not detected',
      };
    }
  } catch {}

  // Fallback if not JSON
  return {
    name: 'Not detected',
    dob: 'Not detected',
    gender: 'Not detected',
    aadhaarNumber: 'Not detected',
    address: rawText.slice(0, 200),
  };
}

export async function convertPdfToImage(file: File): Promise<Blob> {
  const pdfjsLib = (await import('pdfjs-dist/build/pdf.mjs')) as any;
  pdfjsLib.GlobalWorkerOptions.workerSrc = (await import('pdfjs-dist/build/pdf.worker.mjs?url')).default as string;
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 2 });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: context, viewport }).promise;
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob as Blob), 'image/png');
  });
}

// Direct helper if your component calls it
export async function extractAadhaarWithGemini(file: File | Blob): Promise<AadhaarData> {
  const raw = await runOCR(file);
  return parseAadhaarText(raw);
}

