import { useEffect, useRef, useState, useCallback } from 'react';
import { Send, Bot, User, Mic, MicOff, RotateCcw, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { AadhaarData, ChatMessage, CollectedInfo, Language, FilledFormData } from '@/types';
import { tr } from '@/i18n';
import { isGeminiConfigured, chatWithGemini, getWelcomeMessage } from '@/lib/gemini';
import { detectForm, getFormById, autoFillFromAadhaar, getFormName } from '@/lib/forms';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

type ChatBoxProps = {
  lang: Language;
  hasAadhaar: boolean;
  aadhaarData: AadhaarData | null;
  onFormComplete: (formData: FilledFormData) => void;
  onReset: () => void;
};

const SUGGESTION_KEYS = ['suggestionPan', 'suggestionPassport', 'suggestionRation', 'suggestionVoter'] as const;
const SUGGESTION_VALUES = ['PAN Card', 'Passport', 'Ration Card', 'Voter ID'];

// Fallback conversation steps (used when Gemini is not configured)
type FallbackStep = 'welcome' | 'askForm' | 'askMobile' | 'askEmail' | 'askOccupation' | 'askFather' | 'askIncome' | 'complete';

export default function ChatBox({ lang, hasAadhaar, aadhaarData, onFormComplete, onReset }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [collected, setCollected] = useState<CollectedInfo>({});
  const [isComplete, setIsComplete] = useState(false);
  const [fallbackStep, setFallbackStep] = useState<FallbackStep>('welcome');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const geminiReady = isGeminiConfigured();
  const historyRef = useRef<Array<{ role: 'user' | 'bot'; text: string }>>([]);

  const { transcript, isListening, error: speechError, start, stop, reset: resetSpeech } = useSpeechRecognition(lang);

  // Initialize welcome message
  useEffect(() => {
    let cancelled = false;
    async function init() {
      if (geminiReady) {
        const welcome = await getWelcomeMessage(lang);
        if (!cancelled && welcome) {
          pushBot(welcome);
          historyRef.current.push({ role: 'bot', text: welcome });
        } else if (!cancelled) {
          pushBot(tr('chatWelcome', lang));
          historyRef.current.push({ role: 'bot', text: tr('chatWelcome', lang) });
        }
      } else {
        pushBot(tr('chatWelcome', lang));
        pushBot(tr('chatGeminiOffline', lang));
        historyRef.current.push({ role: 'bot', text: tr('chatWelcome', lang) });
        setFallbackStep('askForm');
      }
    }
    init();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update speech transcript into input field
  useEffect(() => {
    if (transcript) setInput(transcript);
  }, [transcript]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  const pushBot = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'bot', text, timestamp: Date.now() }]);
  }, []);

  const pushUser = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', text, timestamp: Date.now() }]);
  }, []);

  function handleSend(rawText?: string) {
    const text = (rawText ?? input).trim();
    if (!text || thinking || isComplete) return;

    if (!hasAadhaar) {
      pushUser(text);
      botReplyWithDelay(tr('chatNoUpload', lang));
      return;
    }

    pushUser(text);
    historyRef.current.push({ role: 'user', text: text });
    setInput('');
    resetSpeech();

    if (geminiReady) {
      handleGeminiFlow(text);
    } else {
      handleFallbackFlow(text);
    }
  }

  async function handleGeminiFlow(text: string) {
    setThinking(true);

    // First message: detect form
    if (!collected.formId) {
      const form = detectForm(text);
      if (form) {
        const newCollected = { ...collected, formId: form.id, formName: form.name[lang] };
        setCollected(newCollected);
      }
    }

    const ctx = {
      lang,
      aadhaar: aadhaarData,
      collected,
      history: historyRef.current,
    };

    try {
      const result = await chatWithGemini(ctx);
      setThinking(false);

      if (result.reply) {
        pushBot(result.reply);
        historyRef.current.push({ role: 'bot', text: result.reply });
      }

      if (result.isComplete) {
        completeForm();
      }
    } catch {
      setThinking(false);
      // Fall back to basic mode
      handleFallbackFlow(text);
    }
  }

  function completeForm() {
    if (!collected.formId || !aadhaarData) return;
    const form = getFormById(collected.formId);
    if (!form) return;

    const autoFilled = autoFillFromAadhaar(form, aadhaarData);
    const values: Record<string, string> = { ...autoFilled };
    // Add collected info
    for (const field of form.fields) {
      if (!values[field.key] && collected[field.key]) {
        values[field.key] = collected[field.key]!;
      }
    }

    const formData: FilledFormData = {
      formId: form.id,
      formName: form.name[lang],
      values,
    };

    setIsComplete(true);
    onFormComplete(formData);
  }

  // Fallback conversation (no Gemini)
  function handleFallbackFlow(text: string) {
    switch (fallbackStep) {
      case 'welcome':
      case 'askForm': {
        const form = detectForm(text);
        if (form) {
          const newCollected = { ...collected, formId: form.id, formName: form.name[lang] };
          setCollected(newCollected);
          setFallbackStep('askMobile');
          botReplyWithDelay(`${form.name[lang]} — ${tr('botAskMobile', lang)}`);
        } else {
          botReplyWithDelay(tr('botAskForm', lang));
        }
        break;
      }
      case 'askMobile': {
        const newCollected = { ...collected, mobile: text };
        setCollected(newCollected);
        setFallbackStep('askEmail');
        botReplyWithDelay(tr('botAskEmail', lang));
        break;
      }
      case 'askEmail': {
        const newCollected = { ...collected, email: text };
        setCollected(newCollected);
        const form = getFormById(collected.formId || '');
        // Check which extra fields the form needs
        if (form?.fields.some((f) => f.key === 'fatherName')) {
          setFallbackStep('askFather');
          botReplyWithDelay(tr('botAskFather', lang));
        } else if (form?.fields.some((f) => f.key === 'occupation')) {
          setFallbackStep('askOccupation');
          botReplyWithDelay(tr('botAskOccupation', lang));
        } else if (form?.fields.some((f) => f.key === 'annualIncome')) {
          setFallbackStep('askIncome');
          botReplyWithDelay(tr('botAskIncome', lang));
        } else {
          finishFallback(newCollected);
        }
        break;
      }
      case 'askFather': {
        const newCollected = { ...collected, fatherName: text };
        setCollected(newCollected);
        const form = getFormById(collected.formId || '');
        if (form?.fields.some((f) => f.key === 'occupation')) {
          setFallbackStep('askOccupation');
          botReplyWithDelay(tr('botAskOccupation', lang));
        } else {
          finishFallback(newCollected);
        }
        break;
      }
      case 'askOccupation': {
        const newCollected = { ...collected, occupation: text };
        setCollected(newCollected);
        const form = getFormById(collected.formId || '');
        if (form?.fields.some((f) => f.key === 'annualIncome')) {
          setFallbackStep('askIncome');
          botReplyWithDelay(tr('botAskIncome', lang));
        } else {
          finishFallback(newCollected);
        }
        break;
      }
      case 'askIncome': {
        const newCollected = { ...collected, annualIncome: text };
        setCollected(newCollected);
        finishFallback(newCollected);
        break;
      }
      default:
        break;
    }
  }

  function finishFallback(finalCollected: CollectedInfo) {
    setFallbackStep('complete');
    botReplyWithDelay(tr('botComplete', lang), () => {
      if (!finalCollected.formId || !aadhaarData) return;
      const form = getFormById(finalCollected.formId);
      if (!form) return;

      const autoFilled = autoFillFromAadhaar(form, aadhaarData);
      const values: Record<string, string> = { ...autoFilled };
      for (const field of form.fields) {
        if (!values[field.key] && finalCollected[field.key]) {
          values[field.key] = finalCollected[field.key]!;
        }
      }

      setIsComplete(true);
      onFormComplete({
        formId: form.id,
        formName: form.name[lang],
        values,
      });
    });
  }

  function botReplyWithDelay(text: string, after?: () => void) {
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      pushBot(text);
      historyRef.current.push({ role: 'bot', text });
      after?.();
    }, 600 + Math.random() * 400);
  }

  function handleSuggestion(value: string, key: string) {
    handleSend(value);
  }

  function handleMicToggle() {
    if (isListening) {
      stop();
    } else {
      setInput('');
      start();
    }
  }

  function handleRestart() {
    setMessages([]);
    setCollected({});
    setIsComplete(false);
    setFallbackStep('askForm');
    setInput('');
    historyRef.current = [];
    onReset();
    pushBot(tr('chatWelcome', lang));
    historyRef.current.push({ role: 'bot', text: tr('chatWelcome', lang) });
    inputRef.current?.focus();
  }

  const showSuggestions = !isComplete && !thinking && (fallbackStep === 'askForm' || fallbackStep === 'welcome') && hasAadhaar && (!geminiReady || messages.length <= 2);
  const formName = collected.formId ? getFormName(collected.formId, lang) : null;

  return (
    <div className="bg-white rounded-2xl border border-saffron-100 shadow-lg shadow-saffron-500/5 flex flex-col h-[500px] sm:h-[560px] animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-gray-100">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center shadow-sm">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-ashok-500 rounded-full border-2 border-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900">{tr('chatTitle', lang)}</h3>
          <p className="text-xs text-gray-500 truncate">{tr('chatSubtitle', lang)}</p>
        </div>
        {formName && (
          <div className="px-2.5 py-1 rounded-full bg-saffron-50 border border-saffron-200 text-[11px] font-semibold text-saffron-600 shrink-0">
            {formName}
          </div>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll px-4 sm:px-5 py-4 space-y-3">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} lang={lang} isComplete={isComplete} onRestart={handleRestart} />
        ))}

        {thinking && (
          <div className="flex items-end gap-2 animate-fade-in">
            <div className="w-7 h-7 rounded-lg bg-saffron-500 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="px-3 py-2.5 rounded-2xl rounded-bl-md bg-saffron-50 border border-saffron-100">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-saffron-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-1.5 h-1.5 bg-saffron-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                <span className="w-1.5 h-1.5 bg-saffron-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          </div>
        )}

        {showSuggestions && (
          <div className="flex flex-wrap gap-2 pt-1 animate-fade-in">
            {SUGGESTION_KEYS.map((key, i) => (
              <button
                key={key}
                onClick={() => handleSuggestion(SUGGESTION_VALUES[i], key)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-saffron-200 text-saffron-600 hover:bg-saffron-50 hover:border-saffron-300 active:scale-95 transition-all"
              >
                {tr(key, lang)}
              </button>
            ))}
          </div>
        )}

        {speechError && (
          <div className="flex items-center gap-2 text-xs text-red-500 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{speechError}</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-3 sm:p-4">
        <div className="flex items-center gap-2">
          {/* Mic button */}
          <button
            onClick={handleMicToggle}
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-gray-100 text-gray-600 hover:bg-saffron-100 hover:text-saffron-600'
            }`}
            aria-label="Voice input"
          >
            {isListening ? <MicOff className="w-4.5 h-4.5" /> : <Mic className="w-4.5 h-4.5" />}
          </button>

          <input
            ref={inputRef}
            type="text"
            value={isListening && transcript ? transcript : input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
            placeholder={isListening ? tr('chatListening', lang) : tr('chatPlaceholder', lang)}
            disabled={isComplete || thinking}
            className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-saffron-400/40 focus:border-saffron-300 disabled:opacity-50 transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={(!input.trim() && !transcript) || thinking || isComplete}
            className="w-10 h-10 rounded-xl bg-saffron-500 text-white flex items-center justify-center shadow-md hover:bg-saffron-600 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shrink-0"
            aria-label={tr('chatSend', lang)}
          >
            {thinking ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : <Send className="w-4.5 h-4.5" />}
          </button>
        </div>

        {isListening && (
          <div className="mt-2 flex items-center gap-2 text-xs text-saffron-600 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-medium">{tr('chatListening', lang)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function MessageBubble({ msg, lang, isComplete, onRestart }: { msg: ChatMessage; lang: Language; isComplete: boolean; onRestart: () => void }) {
  const isBot = msg.role === 'bot';
  const isWelcome = isBot && msg.text.includes('Namaste') || msg.text.includes('नमस्ते') || msg.text.includes('नमस्कार');

  return (
    <div className={`flex items-end gap-2 animate-slide-up ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
        isBot ? 'bg-saffron-500' : 'bg-gray-400'
      }`}>
        {isBot ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
      </div>
      <div className={`max-w-[80%] ${isBot ? '' : 'flex flex-col items-end'}`}>
        <div className={`px-3.5 py-2.5 rounded-2xl text-sm whitespace-pre-wrap break-words ${
          isBot
            ? 'bg-saffron-50 border border-saffron-100 text-gray-800 rounded-bl-md'
            : 'bg-saffron-500 text-white rounded-br-md'
        }`}>
          {msg.text}
        </div>

        {/* Show restart button on the last bot message when complete */}
        {isBot && isComplete && isWelcome === false && msg.text.includes('ready') || msg.text.includes('तैयार') || msg.text.includes('तयार') ? (
          <div className="mt-2 flex flex-wrap gap-2 animate-fade-in">
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-saffron-200 text-saffron-600 text-xs font-semibold hover:bg-saffron-50 active:scale-95 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {tr('previewNewForm', lang)}
            </button>
          </div>
        ) : null}

        {isBot && isComplete && (msg.text.includes('ready') || msg.text.includes('तैयार') || msg.text.includes('तयार')) && (
          <div className="mt-1 flex items-center gap-1 text-ashok-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
    </div>
  );
}
