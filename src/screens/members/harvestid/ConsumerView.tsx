import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  ShoppingCart,
  BadgeCheck,
  ShieldCheck,
  ArrowDown,
  ScanLine,
  MapPin,
  Leaf,
  CalendarDays,
  Sprout,
  FlaskConical,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { fadeUp, staggerContainerFast, scaleIn } from '@/lib/motion';
import { CONSUMER_VIEW, PASSPORT } from './harvestData';

type ViewMode = 'farmer' | 'consumer';

export default function ConsumerView() {
  const [mode, setMode] = useState<ViewMode>('farmer');

  return (
    <div>
      {/* Toggle */}
      <div className="flex w-full max-w-xs items-center rounded-xl border border-white/10 bg-white/[0.03] p-1">
        {(
          [
            { id: 'farmer', label: 'FARMER VIEW', icon: User },
            { id: 'consumer', label: 'CONSUMER VIEW', icon: ShoppingCart },
          ] as const
        ).map((m) => {
          const Icon = m.icon;
          const active = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                active ? 'text-forest-950' : 'text-offwhite-muted hover:text-offwhite'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="consumer-view-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-lime-glow to-emerald-glow"
                />
              )}
              <Icon className="relative z-10 h-3.5 w-3.5" />
              <span className="relative z-10">{m.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          {mode === 'farmer' ? <FarmerView /> : <ConsumerViewPanel />}
        </motion.div>
      </AnimatePresence>

      {/* Trust flow */}
      <TrustFlow />
    </div>
  );
}

/* ============================================================
   Farmer view — compact passport summary
   ============================================================ */

function FarmerView() {
  const rows = [
    { icon: ScanLine, label: 'HarvestID', value: PASSPORT.harvestId },
    { icon: Leaf, label: 'Crop / Variety', value: `${PASSPORT.crop} — ${PASSPORT.variety}` },
    { icon: MapPin, label: 'Region', value: PASSPORT.region },
    { icon: Sprout, label: 'Cultivation', value: PASSPORT.cultivation },
    { icon: CalendarDays, label: 'Harvest Date', value: PASSPORT.harvestDate },
    { icon: FlaskConical, label: 'Inputs', value: PASSPORT.inputs.join(' · ') },
  ];
  return (
    <motion.div variants={staggerContainerFast} initial="hidden" animate="visible" className="glass-card p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-glow/10 ring-1 ring-lime-glow/25">
          <User className="h-5 w-5 text-lime-glow" />
        </span>
        <div>
          <p className="font-display text-lg font-bold text-offwhite">Farmer View</p>
          <p className="text-xs text-offwhite-muted">The full crop passport, from the grower's perspective.</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <motion.div
              key={row.label}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-lime-glow/80" />
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-offwhite-muted/60">{row.label}</p>
                <p className="text-sm text-offwhite">{row.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ============================================================
   Consumer view — simplified Q&A + verified badge
   ============================================================ */

function ConsumerViewPanel() {
  return (
    <motion.div variants={staggerContainerFast} initial="hidden" animate="visible">
      <motion.div
        variants={scaleIn}
        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-lime-glow/40 bg-gradient-to-r from-lime-glow/[0.12] to-emerald-glow/[0.06] px-5 py-4"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-950/80 ring-1 ring-lime-glow/30">
            <BadgeCheck className="h-6 w-6 text-lime-glow" />
          </span>
          <div>
            <p className="font-display text-lg font-bold text-offwhite">VERIFIED HARVESTID</p>
            <p className="text-xs text-offwhite-muted">This batch's journey is verified in the demo ledger.</p>
          </div>
        </div>
        <span className="font-display text-sm font-semibold text-lime-glow">{PASSPORT.harvestId}</span>
      </motion.div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CONSUMER_VIEW.map((item) => (
          <motion.div
            key={item.q}
            variants={fadeUp}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm"
          >
            <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-lime-glow">
              <ShoppingCart className="h-3.5 w-3.5" />
              {item.q}
            </p>
            <p className="mt-2 font-display text-base font-semibold text-offwhite">{item.a}</p>
          </motion.div>
        ))}
      </div>

      <p className="mt-4 text-xs text-offwhite-muted/60">
        Q&A {`${CONSUMER_VIEW.length}`} — simplified from the full passport for shoppers. Demo data.
      </p>
    </motion.div>
  );
}

/* ============================================================
   Trust flow
   ============================================================ */

function TrustFlow() {
  const steps: { icon: LucideIcon; label: string; sub: string; color: string }[] = [
    { icon: User, label: 'FARMER', sub: 'Grower registers the batch', color: 'text-emerald-glow border-emerald-glow/30 bg-emerald-glow/[0.06]' },
    { icon: ScanLine, label: 'DIGITAL CROP ID', sub: 'Every batch gets a HarvestID', color: 'text-lime-glow border-lime-glow/30 bg-lime-glow/[0.06]' },
    { icon: MapPin, label: 'TRACEABILITY', sub: 'Journey logged farm → consumer', color: 'text-lime-glow border-lime-glow/30 bg-lime-glow/[0.06]' },
    { icon: ShieldCheck, label: 'TRANSPARENCY', sub: 'Open, verifiable demo records', color: 'text-emerald-glow border-emerald-glow/30 bg-emerald-glow/[0.06]' },
    { icon: BadgeCheck, label: 'CONSUMER TRUST', sub: 'Know where your food comes from', color: 'text-lime-glow border-lime-glow/40 bg-gradient-to-br from-lime-glow/[0.12] to-transparent' },
  ];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8"
    >
      <p className="text-center text-xs uppercase tracking-widest text-offwhite-muted/60">
        The HarvestID trust flow
      </p>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-offwhite-muted">
        From the farmer's hands to the consumer's table — transparency builds trust.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex flex-col items-center gap-3">
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.04 }}
                className={`flex items-center gap-3 rounded-2xl border px-6 py-4 backdrop-blur-sm ${step.color}`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <div className="text-left">
                  <p className="font-display text-sm font-semibold text-offwhite">{step.label}</p>
                  <p className="text-xs text-offwhite-muted/70">{step.sub}</p>
                </div>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  animate={{ y: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowDown className="h-5 w-5 text-offwhite-muted/50" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-offwhite-muted/50">
        <ArrowRight className="h-3 w-3 text-lime-glow" />
        Simulated trust flow — demo presentation only.
      </p>
    </motion.div>
  );
}
