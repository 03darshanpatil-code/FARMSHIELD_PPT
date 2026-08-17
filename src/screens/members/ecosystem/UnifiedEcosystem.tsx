import { motion } from 'framer-motion';
import {
  BrainCircuit,
  CloudSun,
  Layers,
  Sprout,
  LineChart,
  ShoppingCart,
  Landmark,
  Network,
  Bot,
  ScanLine,
  Newspaper,
  Eye,
  ListChecks,
  Handshake,
  ArrowDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { fadeUp } from '@/lib/motion';

interface EcoNode {
  label: string;
  icon: LucideIcon;
  x: number;
  y: number;
  cluster: string;
}

const NODES: EcoNode[] = [
  { label: 'AI Disease Detection', icon: BrainCircuit, x: 20, y: 16, cluster: 'UNDERSTAND' },
  { label: 'Weather Intelligence', icon: CloudSun, x: 10, y: 50, cluster: 'UNDERSTAND' },
  { label: 'Soil Intelligence', icon: Layers, x: 16, y: 82, cluster: 'UNDERSTAND' },
  { label: 'Crop Simulator', icon: Sprout, x: 46, y: 8, cluster: 'DECIDE' },
  { label: 'Market Price Forecasting', icon: LineChart, x: 84, y: 10, cluster: 'DECIDE' },
  { label: 'Fertilizer Marketplace', icon: ShoppingCart, x: 94, y: 42, cluster: 'ACT' },
  { label: 'Government Schemes', icon: Landmark, x: 84, y: 78, cluster: 'ACT' },
  { label: 'Krishi Setu', icon: Network, x: 52, y: 92, cluster: 'CONNECT' },
  { label: 'Plant Doctor AI', icon: Bot, x: 28, y: 60, cluster: 'CONNECT' },
  { label: 'HarvestID', icon: ScanLine, x: 70, y: 56, cluster: 'TRACE' },
  { label: 'Kisan Times', icon: Newspaper, x: 36, y: 30, cluster: 'GROW' },
];

const CLUSTERS = [
  { name: 'UNDERSTAND', members: 'AI Disease Detection · Weather · Soil' },
  { name: 'DECIDE', members: 'Crop Simulator · Market Forecasting' },
  { name: 'ACT', members: 'Fertilizer Marketplace · Government Schemes' },
  { name: 'CONNECT', members: 'Krishi Setu · Plant Doctor AI' },
  { name: 'TRACE', members: 'HarvestID' },
  { name: 'GROW', members: 'Kisan Times · Impact' },
];

const FLOW: { label: string; icon: LucideIcon; features: string[] }[] = [
  {
    label: 'UNDERSTAND',
    icon: Eye,
    features: ['AI Disease Detection', 'Weather Intelligence', 'Soil Intelligence'],
  },
  {
    label: 'DECIDE',
    icon: ListChecks,
    features: ['Crop Simulator', 'Market Price Forecasting'],
  },
  {
    label: 'ACT',
    icon: ShoppingCart,
    features: ['Fertilizer Marketplace', 'Government Schemes'],
  },
  {
    label: 'CONNECT',
    icon: Handshake,
    features: ['Krishi Setu', 'Plant Doctor AI'],
  },
  {
    label: 'TRACE',
    icon: ScanLine,
    features: ['HarvestID'],
  },
  {
    label: 'GROW',
    icon: Sprout,
    features: ['FarmShield Impact'],
  },
];

export default function UnifiedEcosystem() {
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
          05
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold text-offwhite sm:text-2xl">
            Unified Ecosystem
          </h3>
          <p className="mt-1 text-sm text-offwhite-muted">
            Every FarmShield feature, connected around one platform.
          </p>
        </div>
      </motion.div>

      {/* Ecosystem map */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="glass-card mt-6 p-4 sm:p-6"
      >
        <div className="relative mx-auto aspect-[4/3] w-full max-w-3xl sm:aspect-[16/10]">
          {/* Connection lines */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            {NODES.map((node, i) => (
              <g key={`line-${node.label}`}>
                <motion.line
                  x1={50}
                  y1={50}
                  x2={node.x}
                  y2={node.y}
                  stroke="rgba(163,230,53,0.16)"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.07, ease: 'easeOut' }}
                />
                <motion.line
                  x1={50}
                  y1={50}
                  x2={node.x}
                  y2={node.y}
                  stroke="rgba(163,230,53,0.45)"
                  strokeWidth={0.8}
                  strokeDasharray="3 3"
                  vectorEffect="non-scaling-stroke"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, strokeDashoffset: [0, -24] }}
                  transition={{
                    opacity: { delay: 0.5 + i * 0.07 },
                    strokeDashoffset: {
                      duration: 1.4,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.15,
                    },
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Center node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative flex flex-col items-center">
              <div className="absolute inset-0 -m-3 rounded-full bg-emerald-glow/15 blur-xl" />
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-glow/60 bg-forest-900 shadow-glow sm:h-24 sm:w-24"
              >
                <span className="font-display text-[10px] font-bold tracking-widest text-lime-glow sm:text-xs">
                  FARM
                  <br />
                  SHIELD
                </span>
              </motion.div>
              <span className="mt-2 rounded-full border border-emerald-glow/30 bg-forest-950/90 px-3 py-1 text-[9px] font-bold tracking-widest text-emerald-glow backdrop-blur sm:text-[10px]">
                ONE ECOSYSTEM
              </span>
            </div>
          </motion.div>

          {/* Feature nodes */}
          {NODES.map((node, i) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.35 + i * 0.07,
                  type: 'spring',
                  stiffness: 260,
                  damping: 18,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-glow/30 bg-forest-900/90 shadow-glow backdrop-blur sm:h-11 sm:w-11">
                    <Icon className="h-4 w-4 text-emerald-glow sm:h-5 sm:w-5" />
                  </span>
                  <span className="hidden whitespace-nowrap rounded-md border border-white/[0.06] bg-forest-950/85 px-1.5 py-0.5 text-[9px] font-medium text-offwhite-muted backdrop-blur sm:block sm:text-[10px]">
                    {node.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-white/[0.06] pt-4">
          {CLUSTERS.map((c) => (
            <span key={c.name} className="flex items-center gap-1.5 text-[10px] text-offwhite-muted/70">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-glow/70" />
              {c.name}
            </span>
          ))}
        </div>
        <p className="mt-2 text-center text-[10px] text-offwhite-muted/40">
          Stylized map — nodes are arranged in logical clusters for the demo.
        </p>
      </motion.div>

      {/* Ecosystem flow */}
      <div className="mt-12">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
            From understanding to growth
          </p>
          <h4 className="mt-1 font-display text-lg font-semibold text-offwhite">
            The FarmShield flow
          </h4>
        </motion.div>

        <div className="mt-5 flex flex-col items-stretch gap-1.5 lg:flex-row lg:items-center">
          {FLOW.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <div key={stage.label} className="flex flex-col items-stretch gap-1.5 lg:flex-row lg:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-card flex flex-1 items-center gap-3 px-4 py-3.5 transition-all hover:border-amber-glow/30"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-glow/10 ring-1 ring-amber-glow/20">
                    <Icon className="h-4 w-4 text-amber-glow" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-xs font-bold text-offwhite">{stage.label}</p>
                    <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-offwhite-muted/70">
                      {stage.features.join(' · ')}
                    </p>
                  </div>
                </motion.div>
                {i < FLOW.length - 1 && (
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

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-5 flex items-center gap-1.5 text-[11px] text-offwhite-muted/50"
        >
          <Sparkles className="h-3 w-3 text-lime-glow" />
          Each stage maps the demo features you explored in this presentation.
        </motion.p>
      </div>
    </div>
  );
}
