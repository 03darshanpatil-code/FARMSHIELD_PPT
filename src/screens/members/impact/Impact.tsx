import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import {
  Users,
  Sprout,
  LineChart,
  BrainCircuit,
  Landmark,
  ScanLine,
  TrendingUp,
  Globe,
  ShieldCheck,
  Leaf,
  ArrowDown,
  ArrowRight,
  Cpu,
  Bot,
  ShoppingCart,
  BadgeCheck,
  Info,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/motion';

interface Metric {
  label: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
}

const METRICS: Metric[] = [
  { label: 'Farmers Supported', value: 48200, suffix: '+', icon: Users },
  { label: 'Crop Decisions', value: 2400000, suffix: '+', icon: Sprout },
  { label: 'Market Connections', value: 12450, suffix: '+', icon: LineChart },
  { label: 'Disease Analyses', value: 86700, suffix: '+', icon: BrainCircuit },
  { label: 'Scheme Discoveries', value: 31600, suffix: '+', icon: Landmark },
  { label: 'HarvestIDs Created', value: 58900, suffix: '+', icon: ScanLine },
];

interface ImpactCategory {
  title: string;
  icon: LucideIcon;
  explanation: string;
  metric: string;
  percent: number;
}

const CATEGORIES: ImpactCategory[] = [
  {
    title: 'PRODUCTIVITY',
    icon: TrendingUp,
    explanation: 'Disease detection, crop simulation, and market forecasting guide better field and selling decisions.',
    metric: '+32% demo decision confidence',
    percent: 78,
  },
  {
    title: 'ACCESSIBILITY',
    icon: Globe,
    explanation: '13 languages and voice-style interaction bring guidance closer to every farmer.',
    metric: '13 languages · demo',
    percent: 85,
  },
  {
    title: 'TRANSPARENCY',
    icon: ShieldCheck,
    explanation: 'HarvestID traces every batch from farm to consumer, building trust across the chain.',
    metric: '94% demo traceability',
    percent: 94,
  },
  {
    title: 'SUSTAINABILITY',
    icon: Leaf,
    explanation: 'Weather and soil guidance help plan irrigation and inputs more efficiently.',
    metric: '+28% demo input efficiency',
    percent: 71,
  },
];

const STATS_FLOW = [
  { icon: Cpu, label: 'AI DIAGNOSIS', sub: 'Disease & crop analysis' },
  { icon: Bot, label: 'SMART RECOMMENDATION', sub: 'Weather, soil & market guidance' },
  { icon: LineChart, label: 'MARKET DECISION', sub: 'Prices, forecasts & selling' },
  { icon: ShoppingCart, label: 'RESOURCE ACCESS', sub: 'Inputs, equipment & labour' },
  { icon: ScanLine, label: 'TRACEABILITY', sub: 'HarvestID crop passport' },
  { icon: BadgeCheck, label: 'CONSUMER TRUST', sub: 'Farm-to-table confidence' },
];

const formatNumber = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  return n.toLocaleString('en-IN');
};

export default function Impact() {
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
          04
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold text-offwhite sm:text-2xl">
            FarmShield Impact
          </h3>
          <p className="mt-1 text-sm text-offwhite-muted">
            One ecosystem. Multiple agricultural decisions. Greater accessibility.
          </p>
        </div>
      </motion.div>

      {/* Demo metrics label */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-amber-glow/25 bg-amber-glow/[0.05] px-3 py-1.5 text-[11px] font-medium text-amber-glow"
      >
        <Info className="h-3.5 w-3.5" />
        DEMO IMPACT METRICS — fictional demonstration numbers, not measured results.
      </motion.p>

      {/* Counters */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
      >
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              variants={fadeUp}
              className="glass-card p-4 text-center transition-all hover:border-emerald-glow/30"
            >
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-glow/10 ring-1 ring-emerald-glow/20">
                <Icon className="h-5 w-5 text-emerald-glow" />
              </span>
              <p className="mt-3 font-display text-2xl font-bold text-offwhite">
                <CountUp to={metric.value} suffix={metric.suffix} />
              </p>
              <p className="mt-1 text-[11px] leading-snug text-offwhite-muted">{metric.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Impact categories */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.title}
              variants={fadeUp}
              className="glass-card p-5 transition-all hover:border-emerald-glow/30"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-glow/10 ring-1 ring-lime-glow/20">
                  <Icon className="h-5 w-5 text-lime-glow" />
                </span>
                <span className="text-[10px] font-bold tracking-widest text-offwhite-muted/50">
                  {cat.title}
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-offwhite-muted">{cat.explanation}</p>
              <p className="mt-4 font-display text-sm font-bold text-lime-glow">{cat.metric}</p>
              <ProgressBar percent={cat.percent} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Ecosystem stats flow */}
      <div className="mt-12">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
            How the features connect
          </p>
          <h4 className="mt-1 font-display text-lg font-semibold text-offwhite">
            FarmShield ecosystem stats
          </h4>
        </motion.div>
        <div className="mt-5 flex flex-col items-stretch gap-1.5 lg:flex-row lg:items-center">
          {STATS_FLOW.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex flex-col items-stretch gap-1.5 lg:flex-row lg:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-card flex flex-1 items-center gap-3 px-4 py-3.5 transition-all hover:border-emerald-glow/30"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-glow/10 ring-1 ring-emerald-glow/20">
                    <Icon className="h-4 w-4 text-emerald-glow" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-xs font-bold text-offwhite">{step.label}</p>
                    <p className="truncate text-[10px] text-offwhite-muted/60">{step.sub}</p>
                  </div>
                </motion.div>
                {i < STATS_FLOW.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.1 }}
                    className="mx-auto flex h-6 w-6 shrink-0 items-center justify-center lg:mx-0"
                  >
                    <ArrowDown className="h-4 w-4 text-lime-glow/70 lg:hidden" />
                    <ArrowRight className="hidden h-4 w-4 text-lime-glow/70 lg:block" />
                  </motion.span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Animated counter
   ============================================================ */

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {formatNumber(val)}
      {suffix}
    </span>
  );
}

/* ============================================================
   Animated progress bar
   ============================================================ */

function ProgressBar({ percent }: { percent: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
      <motion.div
        initial={{ width: '0%' }}
        animate={inView ? { width: `${percent}%` } : { width: '0%' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="h-full rounded-full bg-gradient-to-r from-emerald-glow to-lime-glow"
      />
    </div>
  );
}
