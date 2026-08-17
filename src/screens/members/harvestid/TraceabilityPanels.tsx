import { motion } from 'framer-motion';
import {
  Leaf,
  Sprout,
  MapPin,
  Layers,
  Droplets,
  FlaskConical,
  Wheat,
  Info,
  type LucideIcon,
} from 'lucide-react';
import { fadeUp } from '@/lib/motion';
import { CROP_PROFILE, TRANSPARENCY } from './harvestData';

/* ============================================================
   Crop profile
   ============================================================ */

const PROFILE_ROWS: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Leaf, label: 'Crop', value: CROP_PROFILE.crop },
  { icon: Sprout, label: 'Variety', value: CROP_PROFILE.variety },
  { icon: MapPin, label: 'Growing Region', value: CROP_PROFILE.region },
  { icon: Layers, label: 'Soil Type', value: CROP_PROFILE.soilType },
  { icon: Leaf, label: 'Cultivation', value: CROP_PROFILE.cultivation },
  { icon: Droplets, label: 'Irrigation', value: CROP_PROFILE.irrigation },
  { icon: FlaskConical, label: 'Fertilizer / Inputs', value: CROP_PROFILE.fertilizer },
  { icon: Wheat, label: 'Harvest', value: CROP_PROFILE.harvest },
];

export function CropProfilePanel() {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="glass-card p-6">
      <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">Crop Profile</p>
      <div className="mt-4 space-y-2.5">
        {PROFILE_ROWS.map((row) => {
          const Icon = row.icon;
          return (
            <div key={row.label} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-lime-glow/80" />
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-offwhite-muted/60">{row.label}</p>
                <p className="text-sm text-offwhite">{row.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ============================================================
   Transparency score
   ============================================================ */

export function TransparencyScore() {
  const R = 52;
  const CIRC = 2 * Math.PI * R;
  const dash = (CIRC * TRANSPARENCY.overall) / 100;

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="glass-card p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
          Traceability Score
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-glow/30 bg-amber-glow/[0.06] px-2.5 py-1 text-[10px] font-medium text-amber-glow">
          DEMO TRANSPARENCY SCORE
        </span>
      </div>

      {/* Ring */}
      <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
        <div className="relative h-[140px] w-[140px]">
          <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
            <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
            <motion.circle
              cx="70"
              cy="70"
              r={R}
              fill="none"
              stroke="#a3e635"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${CIRC}`}
              initial={{ strokeDashoffset: CIRC }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-display text-4xl font-bold text-offwhite">{TRANSPARENCY.overall}%</p>
            <p className="text-[10px] uppercase tracking-widest text-offwhite-muted/60">Score</p>
          </div>
        </div>

        {/* Category bars */}
        <div className="w-full max-w-[280px] space-y-3">
          {TRANSPARENCY.categories.map((cat, i) => (
            <div key={cat.label}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-offwhite-muted">{cat.label}</span>
                <span className="font-display font-bold text-lime-glow">{cat.value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.value}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-glow to-lime-glow"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-5 flex items-center gap-1.5 text-[11px] text-offwhite-muted/50">
        <Info className="h-3 w-3" />
        DEMO TRANSPARENCY SCORE — a simulated illustration, not a certified real-world standard.
      </p>
    </motion.div>
  );
}
