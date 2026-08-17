import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, Languages, Mic, ShieldAlert } from 'lucide-react';
import { fadeUp } from '@/lib/motion';
import PlantDoctorChat from './PlantDoctorChat';

export default function PlantDoctorAI() {
  return (
    <div>
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex items-start gap-4"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-glow/10 font-display text-sm font-bold text-amber-glow ring-1 ring-amber-glow/25">
          02
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold text-offwhite sm:text-2xl">
            Plant Doctor AI
          </h3>
          <p className="mt-1 text-sm text-offwhite-muted">Your intelligent farming companion.</p>
        </div>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        {/* Chat */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <PlantDoctorChat />
        </motion.div>

        {/* Info panel */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-4">
          <div className="glass-card p-5">
            <p className="text-xs uppercase tracking-widest text-emerald-glow">How it works</p>
            <div className="mt-4 space-y-3">
              {[
                {
                  icon: MessageCircle,
                  title: 'Ask anything',
                  text: 'Tap a suggested question or type your own — the assistant answers from simulated demo knowledge.',
                },
                {
                  icon: Languages,
                  title: '13 languages',
                  text: 'Switch language from the selector — interface labels, questions, and demo responses all update.',
                },
                {
                  icon: Mic,
                  title: 'Voice-style input',
                  text: 'The microphone button simulates listening and recognition. No real microphone is used.',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-glow/10 ring-1 ring-emerald-glow/20">
                      <Icon className="h-4 w-4 text-emerald-glow" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-offwhite">{item.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-offwhite-muted">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-glow/25 bg-amber-glow/[0.05] p-5">
            <p className="flex items-center gap-2 text-xs font-bold tracking-widest text-amber-glow">
              <ShieldAlert className="h-4 w-4" />
              DEMO AI RESPONSE
            </p>
            <p className="mt-2 text-xs leading-relaxed text-offwhite-muted">
              All responses are predefined demonstration text — not real AI, not agricultural
              advice. Guidance stays general: no specific pesticide or chemical dosing is given,
              and farmers are directed to local agriculture officers for treatment decisions.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-lime-glow/20 bg-lime-glow/[0.05] px-4 py-3">
            <Sparkles className="h-4 w-4 shrink-0 text-lime-glow" />
            <p className="text-[11px] leading-relaxed text-offwhite-muted">
              Frontend-only simulation — no AI API, no speech API, no new dependencies.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
