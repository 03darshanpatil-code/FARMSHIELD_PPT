import { useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, Info, Sparkles } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/motion';
import { LANGS } from './doctorData';
import PlantDoctorChat from './PlantDoctorChat';

export default function MultilingualAI() {
  const [selected, setSelected] = useState('hi');

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
          03
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold text-offwhite sm:text-2xl">
            Multilingual AI
          </h3>
          <p className="mt-1 text-sm text-offwhite-muted">
            Plant Doctor AI supports 13 major regional languages of India — part of the
            assistant, not a separate feature.
          </p>
        </div>
      </motion.div>

      {/* Language grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mt-6"
      >
        <p className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-offwhite-muted/60">
          <Languages className="h-3.5 w-3.5" />
          LANGUAGE
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {LANGS.map((lang) => {
            const active = selected === lang.code;
            return (
              <motion.button
                key={lang.code}
                variants={fadeUp}
                onClick={() => setSelected(lang.code)}
                className={`rounded-xl border px-4 py-3 text-left transition-all ${
                  active
                    ? 'border-amber-glow/60 bg-amber-glow/10 shadow-glow'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <p
                  className={`font-display text-base font-bold ${
                    active ? 'text-amber-glow' : 'text-offwhite'
                  }`}
                >
                  {lang.native}
                </p>
                <p className="text-[11px] text-offwhite-muted/60">{lang.name}</p>
              </motion.button>
            );
          })}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-[11px] text-offwhite-muted/50">
          <Info className="h-3 w-3" />
          Demo multilingual interaction — predefined translated responses. No translation API.
        </p>
      </motion.div>

      {/* Synced chat */}
      <div className="mt-6">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-lg border border-amber-glow/30 bg-amber-glow/[0.07] px-2.5 py-1 text-[10px] font-bold tracking-widest text-amber-glow">
            {LANGS.find((l) => l.code === selected)?.native ?? ''} SELECTED
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-offwhite-muted/60">
            <Sparkles className="h-3 w-3 text-lime-glow" />
            Try the translated question chips — each returns a demo response in the same language.
          </span>
        </motion.div>
        <PlantDoctorChat lang={selected} onLangChange={setSelected} compact />
      </div>
    </div>
  );
}
