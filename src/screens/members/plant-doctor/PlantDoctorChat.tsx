import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Mic,
  SendHorizontal,
  Sparkles,
  Volume2,
  Info,
  CornerDownLeft,
} from 'lucide-react';
import { getLang, EXTRA_QUESTIONS, LANGS, RESPONSE_CATEGORIES } from './doctorData';

interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  category?: string;
}

interface PlantDoctorChatProps {
  /** Controlled language (used by the Multilingual AI section). */
  lang?: string;
  onLangChange?: (code: string) => void;
  compact?: boolean;
}

export default function PlantDoctorChat({ lang, onLangChange, compact }: PlantDoctorChatProps) {
  const [internalLang, setInternalLang] = useState('en');
  const langCode = lang ?? internalLang;
  const data = getLang(langCode);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, role: 'assistant', text: data.greeting },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [voice, setVoice] = useState<'idle' | 'listening' | 'heard'>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);
  const timers = useRef<number[]>([]);

  const setLang = (code: string) => {
    if (onLangChange) onLangChange(code);
    else setInternalLang(code);
  };

  /* Reset the conversation when the language changes */
  useEffect(() => {
    setMessages([{ id: 0, role: 'assistant', text: getLang(langCode).greeting }]);
    setTyping(false);
    setVoice('idle');
    setInput('');
  }, [langCode]);

  /* Auto-scroll to the newest message */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, voice]);

  /* Clear any pending timers on unmount */
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const respond = (question: string, code: string, category?: string) => {
    const d = getLang(code);
    const chipIdx = d.chips.indexOf(question);
    if (chipIdx >= 0) return { text: d.responses[chipIdx], category };
    const extra = EXTRA_QUESTIONS.find((e) => e.question === question);
    if (extra) return { text: extra.response, category: extra.category };
    return { text: d.fallback, category: undefined };
  };

  const ask = (question: string, code: string, category?: string) => {
    setMessages((m) => [
      ...m,
      { id: idRef.current++, role: 'user' as const, text: question },
    ]);
    setTyping(true);
    const { text, category: cat } = respond(question, code, category);
    later(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { id: idRef.current++, role: 'assistant' as const, text, category: cat },
      ]);
    }, 950);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q || typing) return;
    setInput('');
    ask(q, langCode);
  };

  const handleVoice = () => {
    if (voice !== 'idle' || typing) return;
    setVoice('listening');
    const question = data.chips[1];
    later(() => {
      setVoice('heard');
      later(() => {
        setVoice('idle');
        ask(question, langCode, 'Weather');
      }, 800);
    }, 1700);
  };

  return (
    <div className="glass-card flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
        <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-glow/10 ring-1 ring-emerald-glow/30">
          <Bot className="h-5 w-5 text-emerald-glow" />
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-forest-950 bg-lime-glow" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-bold text-offwhite">Plant Doctor AI</p>
          <p className="text-[11px] text-offwhite-muted/60">
            Simulated assistant · {data.name} · {data.native}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-lg border border-lime-glow/30 bg-lime-glow/[0.07] px-2 py-1 text-[9px] font-bold tracking-widest text-lime-glow sm:inline-flex">
            DEMO AI
          </span>
          <select
            value={langCode}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Select language"
            className="max-w-[130px] cursor-pointer rounded-xl border border-white/10 bg-forest-900 px-2.5 py-2 text-xs text-offwhite outline-none transition-all hover:border-emerald-glow/40 focus:border-emerald-glow/50"
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.native} — {l.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className={`space-y-4 overflow-y-auto px-5 py-5 ${
          compact ? 'h-[340px]' : 'h-[420px]'
        }`}
      >
        {messages.map((msg) =>
          msg.role === 'user' ? (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-end"
            >
              <div className="max-w-[85%] rounded-2xl rounded-br-md border border-emerald-glow/30 bg-emerald-glow/10 px-4 py-3 text-sm leading-relaxed text-offwhite">
                {msg.text}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-end gap-2.5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-glow/10 ring-1 ring-emerald-glow/20">
                <Bot className="h-4 w-4 text-emerald-glow" />
              </span>
              <div className="max-w-[85%]">
                <div className="rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-offwhite-muted">
                  {msg.text}
                </div>
                <p className="mt-1 flex items-center gap-1 px-1 text-[9px] font-bold tracking-widest text-offwhite-muted/40">
                  <Sparkles className="h-2.5 w-2.5" />
                  DEMO AI RESPONSE{msg.category ? ` · ${msg.category.toUpperCase()}` : ''}
                </p>
              </div>
            </motion.div>
          ),
        )}

        {typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-end gap-2.5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-glow/10 ring-1 ring-emerald-glow/20">
              <Bot className="h-4 w-4 text-emerald-glow" />
            </span>
            <div className="rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.03] px-4 py-3.5">
              <div className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0.25, 1, 0.25] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="h-1.5 w-1.5 rounded-full bg-emerald-glow"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Voice status */}
      <div className="px-5">
        <AnimatePresence mode="wait">
          {voice === 'listening' && (
            <motion.div
              key="listening"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 overflow-hidden rounded-xl border border-emerald-glow/30 bg-emerald-glow/[0.06] px-3 py-2"
            >
              <motion.span
                animate={{ scale: [1, 1.25, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex h-5 w-5 items-center justify-center"
              >
                <Volume2 className="h-4 w-4 text-emerald-glow" />
              </motion.span>
              <p className="text-xs font-semibold text-emerald-glow">{data.listening}</p>
              <span className="ml-auto flex items-center gap-1 text-[9px] font-bold tracking-widest text-offwhite-muted/50">
                <Mic className="h-2.5 w-2.5" />
                DEMO VOICE INTERACTION
              </span>
            </motion.div>
          )}
          {voice === 'heard' && (
            <motion.div
              key="heard"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2"
            >
              <CornerDownLeft className="h-3.5 w-3.5 text-offwhite-muted/60" />
              <p className="truncate text-xs text-offwhite-muted">
                Heard: “{data.chips[1]}”
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Suggestions */}
      <div className="px-5 pt-4">
        <div className="flex flex-wrap gap-2">
          {data.chips.map((chip) => (
            <button
              key={chip}
              onClick={() => !typing && ask(chip, langCode)}
              className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-left text-[11px] leading-snug text-offwhite-muted transition-all hover:border-emerald-glow/40 hover:text-emerald-glow"
            >
              {chip}
            </button>
          ))}
        </div>
        {langCode === 'en' && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-[9px] font-bold tracking-widest text-offwhite-muted/40">
              MORE:
            </span>
            {EXTRA_QUESTIONS.map((e) => (
              <button
                key={e.id}
                onClick={() => !typing && ask(e.question, langCode, e.category)}
                className="rounded-xl border border-amber-glow/25 bg-amber-glow/[0.04] px-3 py-1.5 text-[11px] text-amber-glow transition-all hover:border-amber-glow/50"
              >
                {e.question}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-5">
        <button
          type="button"
          onClick={handleVoice}
          aria-label="Voice input (demo)"
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all ${
            voice === 'listening'
              ? 'border-emerald-glow/60 bg-emerald-glow/15 text-emerald-glow shadow-glow'
              : 'border-white/10 bg-white/[0.03] text-offwhite-muted hover:border-emerald-glow/40 hover:text-emerald-glow'
          }`}
        >
          <Mic className="h-4 w-4" />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={data.placeholder}
          className="h-11 min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-offwhite placeholder:text-offwhite-muted/40 outline-none transition-all focus:border-emerald-glow/50 focus:bg-emerald-glow/[0.03]"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-glow/50 bg-emerald-glow/15 text-emerald-glow transition-all hover:bg-emerald-glow/25 hover:shadow-glow"
        >
          <SendHorizontal className="h-4 w-4" />
        </button>
      </form>

      {/* Category coverage */}
      <div className="border-t border-white/[0.06] px-5 py-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[9px] font-bold tracking-widest text-offwhite-muted/40">
            CATEGORIES:
          </span>
          {RESPONSE_CATEGORIES.map((cat) => (
            <span
              key={cat}
              className="rounded-md border border-white/[0.07] bg-white/[0.02] px-2 py-0.5 text-[9px] font-medium tracking-wide text-offwhite-muted/60"
            >
              {cat}
            </span>
          ))}
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[10px] text-offwhite-muted/40">
          <Info className="h-3 w-3" />
          Demo multilingual interaction — predefined demo responses, no AI or translation API
          involved. Voice button is a presentation simulation only.
        </p>
      </div>
    </div>
  );
}
