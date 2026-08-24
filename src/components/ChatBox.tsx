import { useEffect, useRef, useState } from 'react';
import { Send, Bot, User, Download, Printer, RotateCcw, CheckCircle2 } from 'lucide-react';
import type { ChatMessage, Language } from '@/types';
import { tr, trFn } from '@/i18n';

type AadhaarData = {
  name: string;
  dob: string;
  address: string;
};

type ChatBoxProps = {
  lang: Language;
  hasAadhaar: boolean;
  aadhaarData: AadhaarData | null;
};

type ConversationState = 'welcome' | 'awaitForm' | 'awaitMobile' | 'awaitEmail' | 'awaitOccupation' | 'complete';

const SUGGESTIONS: { key: 'suggestionPan' | 'suggestionPassport' | 'suggestionRation' | 'suggestionVoter'; value: string }[] = [
  { key: 'suggestionPan', value: 'PAN Card' },
  { key: 'suggestionPassport', value: 'Passport' },
  { key: 'suggestionRation', value: 'Ration Card' },
  { key: 'suggestionVoter', value: 'Voter ID' },
];

export default function ChatBox({ lang, hasAadhaar, aadhaarData }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [convState, setConvState] = useState<ConversationState>('welcome');
  const [collected, setCollected] = useState<{ form?: string; mobile?: string; email?: string; occupation?: string }>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize / reset welcome message when language changes or aadhaar state changes
  useEffect(() => {
    if (messages.length === 0) {
      pushBot(tr('chatWelcome', lang));
      setConvState('awaitForm');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  function pushBot(text: string) {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'bot', text, timestamp: Date.now() }]);
  }

  function pushUser(text: string) {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', text, timestamp: Date.now() }]);
  }

  function botReply(text: string) {
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      pushBot(text);
    }, 700 + Math.random() * 500);
  }

  function handleSend(rawText?: string) {
    const text = (rawText ?? input).trim();
    if (!text || thinking) return;

    if (!hasAadhaar && convState !== 'welcome') {
      pushUser(text);
      botReply(tr('chatNoUpload', lang));
      return;
    }

    pushUser(text);
    setInput('');

    switch (convState) {
      case 'awaitForm': {
        const form = normalizeForm(text, lang);
        setCollected((c) => ({ ...c, form }));
        setConvState('awaitMobile');
        botReply(trFn('botConfirmForm', lang, form));
        break;
      }
      case 'awaitMobile':
        setCollected((c) => ({ ...c, mobile: text }));
        setConvState('awaitEmail');
        botReply(tr('botAskEmail', lang));
        break;
      case 'awaitEmail':
        setCollected((c) => ({ ...c, email: text }));
        setConvState('awaitOccupation');
        botReply(tr('botAskOccupation', lang));
        break;
      case 'awaitOccupation': {
        const finalCollected = { ...collected, occupation: text };
        setCollected(finalCollected);
        setConvState('complete');
        setThinking(true);
        setTimeout(() => {
          setThinking(false);
          pushBot(tr('botComplete', lang));
          // Push summary message
          setTimeout(() => {
            pushBot(buildSummary(lang, aadhaarData, finalCollected));
          }, 400);
        }, 900);
        break;
      }
      default:
        break;
    }
  }

  function handleSuggestion(value: string) {
    handleSend(value);
  }

  function handleRestart() {
    setMessages([]);
    setCollected({});
    setConvState('awaitForm');
    setInput('');
    pushBot(tr('chatWelcome', lang));
    inputRef.current?.focus();
  }

  function buildSummary(lang: Language, aadhaar: AadhaarData | null, c: { form?: string; mobile?: string; email?: string; occupation?: string }): string {
    const lines = [
      `${tr('botSummaryForm', lang)}: ${c.form ?? '-'}`,
      `${tr('botSummaryName', lang)}: ${aadhaar?.name ?? '-'}`,
      `${tr('botSummaryDob', lang)}: ${aadhaar?.dob ?? '-'}`,
      `${tr('botSummaryAddress', lang)}: ${aadhaar?.address ?? '-'}`,
      `${tr('botSummaryMobile', lang)}: ${c.mobile ?? '-'}`,
      `${tr('botSummaryEmail', lang)}: ${c.email ?? '-'}`,
      `${tr('botSummaryOccupation', lang)}: ${c.occupation ?? '-'}`,
    ];
    return lines.join('\n');
  }

  const showSuggestions = convState === 'awaitForm' && hasAadhaar && !thinking;
  const isComplete = convState === 'complete';

  return (
    <div className="bg-white rounded-2xl border border-saffron-100 shadow-lg shadow-saffron-500/5 flex flex-col h-[480px] sm:h-[520px] animate-fade-in-up">
      {/* Chat header */}
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
            {SUGGESTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => handleSuggestion(s.value)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-saffron-200 text-saffron-600 hover:bg-saffron-50 hover:border-saffron-300 active:scale-95 transition-all"
              >
                {tr(s.key, lang)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
            placeholder={tr('chatPlaceholder', lang)}
            disabled={isComplete || thinking}
            className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-saffron-400/40 focus:border-saffron-300 disabled:opacity-50 transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || thinking || isComplete}
            className="w-10 h-10 rounded-xl bg-saffron-500 text-white flex items-center justify-center shadow-md hover:bg-saffron-600 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shrink-0"
            aria-label={tr('chatSend', lang)}
          >
            <Send className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg, lang, isComplete, onRestart }: { msg: ChatMessage; lang: Language; isComplete: boolean; onRestart: () => void }) {
  const isBot = msg.role === 'bot';
  const isSummary = isBot && msg.text.includes('\n');

  // Check if this is the last bot summary message when complete
  const isLastSummary = isSummary && isComplete;

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

        {/* Action buttons after summary */}
        {isLastSummary && (
          <div className="mt-2 flex flex-wrap gap-2 animate-fade-in">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-ashok-500 text-white text-xs font-semibold hover:bg-ashok-600 active:scale-95 transition-all">
              <Download className="w-3.5 h-3.5" />
              {tr('botDownloadBtn', lang)}
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 active:scale-95 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              {tr('botPrintBtn', lang)}
            </button>
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-saffron-200 text-saffron-600 text-xs font-semibold hover:bg-saffron-50 active:scale-95 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {tr('botRestart', lang)}
            </button>
          </div>
        )}

        {/* Show completion message + check icon for the "complete" line */}
        {isBot && !isSummary && isComplete && msg.text === tr('botComplete', lang) && (
          <div className="mt-1 flex items-center gap-1 text-ashok-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">{tr('botDownload', lang)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function normalizeForm(text: string, _lang: Language): string {
  const lower = text.toLowerCase();
  if (lower.includes('pan')) return 'PAN Card';
  if (lower.includes('passport') || lower.includes('पासपोर्ट') || lower.includes('पासपोर्ट')) return 'Passport';
  if (lower.includes('ration') || lower.includes('राशन')) return 'Ration Card';
  if (lower.includes('voter') || lower.includes('वोटर') || lower.includes('व्होटर')) return 'Voter ID';
  return text;
}
