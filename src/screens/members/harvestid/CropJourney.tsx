import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sprout,
  Shovel,
  TrendingUp,
  Leaf,
  Wheat,
  Package,
  ShoppingCart,
  CalendarDays,
  type LucideIcon,
} from 'lucide-react';
import { JOURNEY_STAGES } from './harvestData';

const STAGE_ICONS: Record<string, LucideIcon> = {
  seed: Sprout,
  planting: Shovel,
  growth: TrendingUp,
  cultivation: Leaf,
  harvest: Wheat,
  packaging: Package,
  consumer: ShoppingCart,
};

export default function CropJourney() {
  const [active, setActive] = useState<string>('seed');

  return (
    <div className="relative">
      {/* Rail */}
      <div className="absolute bottom-6 left-[22px] top-6 w-px bg-gradient-to-b from-lime-glow/40 via-white/10 to-emerald-glow/40 sm:left-[26px]" />

      <div className="space-y-3">
        {JOURNEY_STAGES.map((stage, i) => {
          const Icon = STAGE_ICONS[stage.id];
          const isActive = active === stage.id;
          const isPast = JOURNEY_STAGES.findIndex((s) => s.id === active) > i;
          return (
            <div key={stage.id} className="relative flex gap-4 sm:gap-5">
              {/* Node */}
              <button
                onClick={() => setActive(stage.id)}
                aria-label={`Stage: ${stage.label}`}
                className={`relative z-10 mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all sm:h-[52px] sm:w-[52px] ${
                  isActive
                    ? 'border-lime-glow/60 bg-lime-glow/15 shadow-glow'
                    : isPast
                      ? 'border-emerald-glow/40 bg-emerald-glow/10'
                      : 'border-white/10 bg-forest-950/90 hover:border-white/25'
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    isActive ? 'text-lime-glow' : isPast ? 'text-emerald-glow' : 'text-offwhite-muted'
                  }`}
                />
              </button>

              {/* Stage card */}
              <motion.div
                whileHover={{ y: -2 }}
                onClick={() => setActive(stage.id)}
                className={`flex-1 cursor-pointer rounded-2xl border p-4 backdrop-blur-sm transition-all sm:p-5 ${
                  isActive
                    ? 'border-lime-glow/40 bg-lime-glow/[0.06] shadow-glow'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`font-display text-sm font-bold ${
                        isActive ? 'text-lime-glow' : 'text-offwhite'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')} · {stage.label.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-offwhite-muted">
                      <CalendarDays className="h-3 w-3" />
                      {stage.period}
                    </span>
                  </div>
                  <span className={`text-[11px] font-semibold ${isActive ? 'text-lime-glow' : 'text-offwhite-muted/50'}`}>
                    {isActive ? '▲ details' : 'tap to view'}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm leading-relaxed text-offwhite-muted">
                        {stage.detail}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {stage.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg border border-lime-glow/25 bg-lime-glow/[0.06] px-2 py-0.5 text-[11px] font-medium text-lime-glow"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
