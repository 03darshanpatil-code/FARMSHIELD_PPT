import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScanLine,
  QrCode,
  Lock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Info,
  ShieldCheck,
  Layers,
  Camera,
} from 'lucide-react';
import { fadeUp } from '@/lib/motion';
import CropPassport from './CropPassport';
import CropJourney from './CropJourney';
import TraceabilityMap from './TraceabilityMap';
import { CropProfilePanel, TransparencyScore } from './TraceabilityPanels';
import ConsumerView from './ConsumerView';
import { PASSPORT } from './harvestData';

const STEPS = [
  { id: 'harvestid', label: 'HarvestID' },
  { id: 'qr', label: 'QR Verification' },
  { id: 'passport', label: 'Crop Passport' },
  { id: 'journey', label: 'Crop Journey' },
  { id: 'traceability', label: 'Traceability' },
  { id: 'consumer', label: 'Consumer View' },
];

export default function HarvestID() {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'verified'>('idle');
  const [activeStep, setActiveStep] = useState('harvestid');

  const verified = scanState === 'verified';

  const handleScan = () => {
    if (scanState !== 'idle') return;
    setScanState('scanning');
    window.setTimeout(() => {
      setScanState('verified');
      window.setTimeout(() => scrollToStep('passport'), 600);
    }, 1800);
  };

  /* Scroll-spy for the section strip */
  useEffect(() => {
    const els = STEPS.map((s) => document.getElementById(`hstep-${s.id}`)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveStep(entry.target.id.replace('hstep-', ''));
        });
      },
      { rootMargin: '-25% 0px -60% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToStep = (id: string) => {
    document.getElementById(`hstep-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      {/* Step strip */}
      <div className="sticky top-[84px] z-30 -mx-4 border-y border-white/[0.06] bg-forest-950/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {STEPS.map((step, i) => {
            const active = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => scrollToStep(step.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all ${
                  active
                    ? 'border-lime-glow/50 bg-lime-glow/10 text-lime-glow'
                    : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
                }`}
              >
                <span
                  className={`font-display text-[11px] font-bold ${
                    active ? 'text-lime-glow' : 'text-offwhite-muted/50'
                  }`}
                >
                  {String(i + 5).padStart(2, '0')}
                </span>
                {step.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 space-y-16">
        {/* ============================ 05 — HarvestID intro ============================ */}
        <section id="hstep-harvestid" className="scroll-mt-32">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-lime-glow/25 bg-lime-glow/[0.07] px-3.5 py-1.5 text-xs font-medium tracking-wide text-lime-glow">
                <Sparkles className="h-3.5 w-3.5" />
                Digital Crop Passport
              </span>
              <h3 className="mt-4 font-display text-4xl font-bold tracking-tight text-offwhite sm:text-5xl">
                <span className="text-gradient-emerald">HARVESTID</span>
              </h3>
              <p className="mt-2 font-display text-lg font-medium text-offwhite-muted sm:text-xl">
                Know where your food comes from.
              </p>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-offwhite-muted">
                Every crop batch receives a digital identity — from the farm and
                cultivation records to harvest, packaging, and the consumer's table.
              </p>
              <button
                onClick={() => scrollToStep('qr')}
                className="group mt-8 inline-flex items-center gap-2.5 rounded-xl border border-lime-glow/50 bg-gradient-to-r from-lime-glow/30 to-lime-glow/10 px-7 py-3.5 text-sm font-bold text-lime-glow shadow-glow transition-all hover:border-lime-glow/80 hover:shadow-[0_0_32px_-4px_rgba(163,230,53,0.5)]"
              >
                EXPLORE CROP PASSPORT
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Animated passport visual */}
            <MiniPassportCard />
          </div>
        </section>

        {/* ============================ 06 — QR Verification ============================ */}
        <section id="hstep-qr" className="scroll-mt-32">
          <StepHeader
            step="06"
            title="QR Verification"
            subtitle="Scan the HarvestID on the batch label — a simulated demo scan."
          />

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* QR panel */}
            <div className="glass-card flex flex-col items-center p-6 sm:p-8">
              <div className="relative">
                <QRVisual scanning={scanState === 'scanning'} />
                <AnimatePresence>
                  {scanState === 'scanning' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                    >
                      <motion.div
                        animate={{ top: ['6%', '94%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute left-3 right-3 h-[3px] rounded-full bg-gradient-to-r from-transparent via-lime-glow to-transparent shadow-glow"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {verified && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-forest-950/40 backdrop-blur-[2px]"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-lime-glow/60 bg-forest-950/90 shadow-glow">
                      <CheckCircle2 className="h-8 w-8 text-lime-glow" />
                    </span>
                  </motion.div>
                )}
              </div>

              <div className="mt-6 min-h-[64px] text-center">
                <AnimatePresence mode="wait">
                  {scanState === 'idle' && (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <button
                        onClick={handleScan}
                        className="group inline-flex items-center gap-2.5 rounded-xl border border-lime-glow/50 bg-gradient-to-r from-lime-glow/30 to-lime-glow/10 px-7 py-3.5 text-sm font-bold text-lime-glow transition-all hover:border-lime-glow/80 hover:shadow-glow"
                      >
                        <Camera className="h-4 w-4 transition-transform group-hover:scale-110" />
                        SCAN HARVESTID
                      </button>
                    </motion.div>
                  )}
                  {scanState === 'scanning' && (
                    <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="font-display text-sm font-semibold text-lime-glow">
                        Scanning batch label…
                      </p>
                      <p className="mt-0.5 text-xs text-offwhite-muted">
                        Reading HarvestID {PASSPORT.harvestId}
                      </p>
                    </motion.div>
                  )}
                  {scanState === 'verified' && (
                    <motion.div
                      key="verified"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="font-display text-lg font-bold text-lime-glow">
                        IDENTITY VERIFIED
                      </p>
                      <p className="mt-0.5 text-xs text-offwhite-muted">
                        {PASSPORT.crop} batch · {PASSPORT.batchId}
                      </p>
                      <button
                        onClick={() => scrollToStep('passport')}
                        className="group mt-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs font-semibold text-offwhite-muted transition-all hover:border-lime-glow/40 hover:text-lime-glow"
                      >
                        VIEW CROP PASSPORT
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className="mt-4 flex items-center gap-1.5 text-[11px] text-offwhite-muted/50">
                <Info className="h-3 w-3" />
                DEMO QR SCAN — no real scanning or camera involved.
              </p>
            </div>

            {/* What is HarvestID panel */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="glass-card flex flex-col p-6 sm:p-8"
            >
              <p className="text-xs uppercase tracking-widest text-lime-glow">How it works</p>
              <h4 className="mt-2 font-display text-xl font-bold text-offwhite sm:text-2xl">
                A digital identity for every batch
              </h4>
              <div className="mt-5 space-y-2.5">
                {[
                  { icon: QrCode, text: 'Each crop batch carries a HarvestID on its label.' },
                  { icon: ScanLine, text: 'Scanning verifies the batch in the demo ledger.' },
                  { icon: MapPin, text: 'Records span the full journey — farm to consumer.' },
                  { icon: ShieldCheck, text: 'Transparency built for consumer trust.' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.text}
                      variants={fadeUp}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lime-glow/10 ring-1 ring-lime-glow/20">
                        <Icon className="h-4 w-4 text-lime-glow" />
                      </span>
                      <p className="text-sm text-offwhite-muted">{item.text}</p>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-6 flex items-center gap-2 rounded-xl border border-amber-glow/25 bg-amber-glow/[0.05] p-4">
                <Layers className="h-4 w-4 shrink-0 text-amber-glow" />
                <p className="text-xs leading-relaxed text-offwhite-muted">
                  This is a demonstration. No blockchain, no real QR scanning, and no
                  real supply-chain data are used.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================ 07 — Crop Passport ============================ */}
        <section id="hstep-passport" className="scroll-mt-32">
          <StepHeader
            step="07"
            title="Crop Passport"
            subtitle="The verified digital record for this batch."
          />
          <div className="mt-6">
            <AnimatePresence mode="wait">
              {verified ? (
                <motion.div key="passport" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <CropPassport />
                </motion.div>
              ) : (
                <motion.div
                  key="locked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] ring-1 ring-white/10">
                    <Lock className="h-7 w-7 text-offwhite-muted/50" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-offwhite">
                      Passport locked
                    </p>
                    <p className="mt-1 text-sm text-offwhite-muted">
                      Scan the HarvestID above to reveal the crop passport.
                    </p>
                  </div>
                  <button
                    onClick={() => scrollToStep('qr')}
                    className="inline-flex items-center gap-2 rounded-xl border border-lime-glow/40 bg-lime-glow/10 px-5 py-2.5 text-xs font-bold text-lime-glow transition-all hover:border-lime-glow/60"
                  >
                    <ScanLine className="h-4 w-4" />
                    GO TO QR VERIFICATION
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ============================ 08 — Crop Journey ============================ */}
        <section id="hstep-journey" className="scroll-mt-32">
          <StepHeader
            step="08"
            title="Crop Journey"
            subtitle="Every stage of the batch's life, from seed to consumer — tap a stage for details."
          />
          <div className="mt-8">
            <CropJourney />
          </div>
        </section>

        {/* ============================ 09 — Traceability ============================ */}
        <section id="hstep-traceability" className="scroll-mt-32">
          <StepHeader
            step="09"
            title="Traceability"
            subtitle="The end-to-end journey map, crop profile, and demo transparency score."
          />

          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="glass-card mt-6 p-5 sm:p-8">
            <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
              Journey map · farm → consumer
            </p>
            <div className="mt-4">
              <TraceabilityMap />
            </div>
            <p className="mt-4 text-center text-[11px] text-offwhite-muted/50">
              Stylized demonstration map — no real GPS or geographic data.
            </p>
          </motion.div>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <CropProfilePanel />
            <TransparencyScore />
          </div>
        </section>

        {/* ============================ 10 — Consumer View ============================ */}
        <section id="hstep-consumer" className="scroll-mt-32">
          <StepHeader
            step="10"
            title="Consumer View"
            subtitle="Switch between the farmer's record and the simplified consumer experience."
          />
          <div className="mt-6">
            <ConsumerView />
          </div>
        </section>
      </div>
    </div>
  );
}

/* ============================================================
   Sub-components
   ============================================================ */

function StepHeader({ step, title, subtitle }: { step: string; title: string; subtitle: string }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-glow/10 font-display text-sm font-bold text-lime-glow ring-1 ring-lime-glow/25">
        {step}
      </span>
      <div>
        <h3 className="font-display text-xl font-semibold text-offwhite sm:text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-offwhite-muted">{subtitle}</p>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Mini passport card (intro visual)
   ============================================================ */

function MiniPassportCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto flex w-full max-w-md items-center justify-center py-8"
    >
      {/* Back card */}
      <div className="absolute -translate-x-[30%] -rotate-6">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-56 rounded-2xl border border-white/10 bg-forest-900/70 p-4 opacity-60 backdrop-blur-sm"
        >
          <p className="font-display text-xs font-bold text-offwhite-muted">HARVESTID</p>
          <div className="mt-3 space-y-1.5">
            <div className="h-1.5 w-3/4 rounded bg-white/10" />
            <div className="h-1.5 w-1/2 rounded bg-white/10" />
            <div className="h-1.5 w-2/3 rounded bg-white/10" />
          </div>
        </motion.div>
      </div>

      {/* Front card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-64 overflow-hidden rounded-2xl border border-lime-glow/30 bg-gradient-to-b from-forest-800 to-forest-950 p-5 shadow-soft-lg"
      >
        <div className="flex items-center justify-between">
          <p className="font-display text-sm font-bold text-offwhite">HARVESTID</p>
          <span className="text-[10px] uppercase tracking-widest text-lime-glow">Digital Passport</span>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="h-16 w-16 rounded-xl bg-offwhite p-1.5">
            <QRMini />
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-20 rounded bg-white/20" />
            <div className="h-1.5 w-14 rounded bg-white/10" />
            <div className="h-1.5 w-16 rounded bg-white/10" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-[10px] text-offwhite-muted/70">Tomato · Arka Rakshak</span>
          <span className="inline-flex rotate-[-6deg] items-center gap-1 rounded border border-lime-glow/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-lime-glow">
            <ShieldCheck className="h-3 w-3" /> Verified
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function QRMini() {
  const cells = useMemo(() => {
    const list: { x: number; y: number }[] = [];
    const n = 9;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const inFinder = (i < 3 && j < 3) || (i < 3 && j >= n - 3) || (i >= n - 3 && j < 3);
        if (inFinder) continue;
        if ((i * 7 + j * 13 + ((i * j) % 11)) % 5 < 2) list.push({ x: i, y: j });
      }
    }
    return list;
  }, []);

  const cell = 100 / 9;
  const finder = (x: number, y: number) => (
    <g key={`f${x}-${y}`}>
      <rect x={x} y={y} width={cell * 3} height={cell * 3} fill="#0d1f17" rx={cell * 0.4} />
      <rect x={x + cell * 0.6} y={y + cell * 0.6} width={cell * 1.8} height={cell * 1.8} fill="#f4f6f2" />
      <rect x={x + cell * 1.1} y={y + cell * 1.1} width={cell * 0.8} height={cell * 0.8} fill="#0d1f17" />
    </g>
  );

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <rect width="100" height="100" fill="#f4f6f2" rx="8" />
      {cells.map((c) => (
        <rect key={`${c.x}-${c.y}`} x={c.x * cell} y={c.y * cell} width={cell} height={cell} fill="#0d1f17" />
      ))}
      {finder(0, 0)}
      {finder(100 - cell * 3, 0)}
      {finder(0, 100 - cell * 3)}
    </svg>
  );
}

/* ============================================================
   Large QR visual
   ============================================================ */

function QRVisual({ scanning }: { scanning: boolean }) {
  const n = 17;
  const cell = 100 / n;
  const cells = useMemo(() => {
    const list: { x: number; y: number }[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const inFinder =
          (i < 6 && j < 6) || (i < 6 && j >= n - 6) || (i >= n - 6 && j < 6);
        if (inFinder) continue;
        if ((i * 7 + j * 13 + ((i * j) % 11)) % 5 < 2) list.push({ x: i, y: j });
      }
    }
    return list;
  }, []);

  const finder = (x: number, y: number) => (
    <g key={`f${x}-${y}`}>
      <rect x={x} y={y} width={cell * 6} height={cell * 6} fill="#0d1f17" rx={cell * 0.6} />
      <rect x={x + cell} y={y + cell} width={cell * 4} height={cell * 4} fill="#f4f6f2" />
      <rect x={x + cell * 2} y={y + cell * 2} width={cell * 2} height={cell * 2} fill="#0d1f17" />
    </g>
  );

  return (
    <motion.div
      animate={scanning ? { scale: [1, 1.03, 1] } : { scale: 1 }}
      transition={scanning ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4 }}
      className="relative w-48 rounded-2xl p-3 shadow-soft sm:w-56"
    >
      <svg viewBox="0 0 100 100" className="block w-full">
        <rect width="100" height="100" fill="#f4f6f2" rx="10" />
        {cells.map((c) => (
          <rect key={`${c.x}-${c.y}`} x={c.x * cell} y={c.y * cell} width={cell} height={cell} fill="#0d1f17" />
        ))}
        {finder(0, 0)}
        {finder(100 - cell * 6, 0)}
        {finder(0, 100 - cell * 6)}
      </svg>
    </motion.div>
  );
}
