import { motion } from 'framer-motion';
import {
  Sprout,
  TrendingDown,
  CloudRain,
  FlaskConical,
  Landmark,
  Unlink,
  Wrench,
  ArrowRight,
  ArrowDown,
  Brain,
  Accessibility,
  TrendingUp,
  Network,
  ShieldCheck,
  BrainCircuit,
  LineChart,
  Satellite,
  Handshake,
  Bot,
  Eye,
  type LucideIcon,
} from 'lucide-react';
import { fadeUp, staggerContainer, staggerContainerFast, scaleIn } from '@/lib/motion';

interface Member01ContentProps {
  subsectionId: string;
}

export default function Member01Content({ subsectionId }: Member01ContentProps) {
  switch (subsectionId) {
    case 'agriculture-today':
      return <AgricultureToday />;
    case 'problems-farmers':
      return <ProblemsFaced />;
    case 'core-problem':
      return <CoreProblem />;
    case 'our-solution':
      return <OurSolution />;
    case 'vision':
      return <FarmShieldVision />;
    case 'ecosystem':
      return <FarmShieldEcosystem />;
    default:
      return <AgricultureToday />;
  }
}

/* ============================================================
   01 — Agriculture Today
   ============================================================ */

const agricultureCards = [
  {
    icon: Sprout,
    title: 'The Backbone of Nations',
    text: 'Agriculture sustains over 40% of the global workforce, yet remains one of the least digitized sectors.',
  },
  {
    icon: TrendingDown,
    title: 'Growing Pressure',
    text: 'A rising population demands more food from shrinking arable land and increasingly unpredictable climates.',
  },
  {
    icon: CloudRain,
    title: 'Climate Volatility',
    text: 'Erratic rainfall, extreme heat, and shifting seasons disrupt traditional farming cycles worldwide.',
  },
  {
    icon: FlaskConical,
    title: 'Knowledge Gap',
    text: 'Critical agricultural knowledge is scattered, outdated, or inaccessible to the farmers who need it most.',
  },
];

function AgricultureToday() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        variants={fadeUp}
        className="font-display text-2xl font-semibold text-offwhite sm:text-3xl"
      >
        Agriculture Today
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-offwhite-muted">
        The landscape farmers operate in is more complex and demanding than ever
        before.
      </motion.p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {agricultureCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="glass-card group p-6 hover:border-emerald-glow/30 hover:bg-white/[0.05]"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-glow/10 ring-1 ring-emerald-glow/20 transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5 text-emerald-glow" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-offwhite">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-offwhite-muted">
                    {card.text}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ============================================================
   02 — Problems Faced by Farmers
   ============================================================ */

const problems = [
  { icon: FlaskConical, title: 'Crop Diseases', text: 'Pests and diseases destroy crops before farmers can identify or treat them.' },
  { icon: TrendingDown, title: 'Uncertain Market Prices', text: 'Unpredictable prices leave farmers unable to plan profitable sales.' },
  { icon: CloudRain, title: 'Weather Uncertainty', text: 'Shifting weather patterns make sowing, irrigation, and harvest timing a gamble.' },
  { icon: Sprout, title: 'Soil-Related Decisions', text: 'Lack of soil data leads to poor fertilizer and crop choices season after season.' },
  { icon: Landmark, title: 'Government Scheme Access', text: 'Eligible subsidies and support remain out of reach due to complex, fragmented processes.' },
  { icon: Unlink, title: 'Fragmented Information', text: 'Agricultural knowledge is scattered across disconnected, hard-to-find sources.' },
  { icon: Wrench, title: 'Finding Resources & Services', text: 'Locating reliable tools, seeds, fertilizers, and expert help is a persistent struggle.' },
];

function ProblemsFaced() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.h2
        variants={fadeUp}
        className="font-display text-2xl font-semibold text-offwhite sm:text-3xl"
      >
        Problems Faced by Farmers
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-offwhite-muted">
        Seven critical challenges that compound into a daily struggle for
        agricultural communities.
      </motion.p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem, i) => {
          const Icon = problem.icon;
          return (
            <motion.div
              key={problem.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="glass-card group relative overflow-hidden p-5 hover:border-amber-glow/30 hover:bg-white/[0.05]"
            >
              <span className="absolute right-4 top-4 font-display text-3xl font-bold text-white/[0.04]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-glow/10 ring-1 ring-amber-glow/20 transition-transform group-hover:scale-110">
                <Icon className="h-5 w-5 text-amber-glow" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-offwhite">
                {problem.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-offwhite-muted">
                {problem.text}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ============================================================
   03 — Core Problem
   ============================================================ */

function CoreProblem() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.h2
        variants={fadeUp}
        className="font-display text-2xl font-semibold text-offwhite sm:text-3xl"
      >
        The Core Problem
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-offwhite-muted">
        A single farmer is forced to navigate a maze of disconnected sources,
        leading to difficult, uninformed decisions.
      </motion.p>

      {/* Flow diagram */}
      <motion.div
        variants={fadeUp}
        className="mt-10 flex flex-col items-center gap-4"
      >
        {/* Farmer node */}
        <FlowNode icon={Sprout} label="The Farmer" accent="emerald" />

        <FlowArrow />

        {/* Disconnected sources */}
        <div className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: CloudRain, label: 'Weather Apps' },
            { icon: LineChart, label: 'Market Rates' },
            { icon: Landmark, label: 'Govt. Offices' },
            { icon: Wrench, label: 'Input Dealers' },
          ].map((src) => {
            const Icon = src.icon;
            return (
              <div
                key={src.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-amber-glow/20 bg-amber-glow/[0.04] p-4 text-center"
              >
                <Icon className="h-5 w-5 text-amber-glow" />
                <span className="text-xs font-medium text-offwhite-muted">{src.label}</span>
              </div>
            );
          })}
        </div>

        <FlowArrow label="Fragmented & disconnected" />

        {/* Difficult decisions */}
        <FlowNode icon={TrendingDown} label="Difficult Decisions" accent="amber" />

        <FlowArrow label="The FarmShield solution" />

        {/* FarmShield reveal */}
        <motion.div
          variants={scaleIn}
          className="relative flex flex-col items-center gap-3 rounded-2xl border border-emerald-glow/30 bg-gradient-to-br from-forest-700 to-forest-900 px-12 py-8 shadow-glow"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-glow/15 ring-1 ring-emerald-glow/30">
            <ShieldCheck className="h-7 w-7 text-emerald-glow" />
          </span>
          <span className="font-display text-3xl font-bold text-gradient-emerald sm:text-4xl">
            FARMSHIELD
          </span>
          <span className="text-sm text-offwhite-muted">
            One unified ecosystem. Every decision, connected.
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   04 — Our Solution
   ============================================================ */

function OurSolution() {
  const steps = [
    {
      icon: Unlink,
      label: 'Fragmented Agricultural Services',
      sub: 'Scattered tools, data, and support',
      accent: 'amber' as const,
    },
    {
      icon: ShieldCheck,
      label: 'FarmShield Unified Ecosystem',
      sub: 'AI-powered integration layer',
      accent: 'emerald' as const,
    },
    {
      icon: Network,
      label: 'One Connected Platform',
      sub: 'Every insight, one tap away',
      accent: 'lime' as const,
    },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.h2
        variants={fadeUp}
        className="font-display text-2xl font-semibold text-offwhite sm:text-3xl"
      >
        Our Solution
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-offwhite-muted">
        The transformation from fragmentation to a single, connected platform.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-10 flex flex-col items-center gap-2"
      >
        {steps.map((step, i) => {
          const Icon = step.icon;
          const accentColor =
            step.accent === 'emerald'
              ? 'text-emerald-glow border-emerald-glow/30 bg-emerald-glow/[0.06]'
              : step.accent === 'amber'
                ? 'text-amber-glow border-amber-glow/30 bg-amber-glow/[0.06]'
                : 'text-lime-glow border-lime-glow/30 bg-lime-glow/[0.06]';
          return (
            <div key={step.label} className="flex flex-col items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className={`flex w-full max-w-md items-center gap-4 rounded-2xl border ${accentColor} p-5 backdrop-blur-sm`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/10">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-offwhite">
                    {step.label}
                  </p>
                  <p className="text-sm text-offwhite-muted">{step.sub}</p>
                </div>
              </motion.div>
              {i < steps.length - 1 && <FlowArrow />}
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   05 — FarmShield Vision
   ============================================================ */

const pillars: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Brain, title: 'AI', text: 'Intelligent insights that turn data into decisions.' },
  { icon: Accessibility, title: 'Accessibility', text: 'Tools every farmer can use, regardless of scale or literacy.' },
  { icon: TrendingUp, title: 'Profitability', text: 'Better decisions that protect and grow farmer income.' },
  { icon: Network, title: 'Connectivity', text: 'A unified ecosystem linking every part of the farm journey.' },
  { icon: ShieldCheck, title: 'Transparency', text: 'Traceability and trust from soil to shelf.' },
];

function FarmShieldVision() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.h2
        variants={fadeUp}
        className="font-display text-2xl font-semibold text-offwhite sm:text-3xl"
      >
        FarmShield Vision
      </motion.h2>

      {/* Main statement */}
      <motion.div
        variants={fadeUp}
        className="mt-6 rounded-2xl border border-emerald-glow/20 bg-gradient-to-br from-forest-700/40 to-forest-900/40 p-8 text-center backdrop-blur-sm"
      >
        <p className="mx-auto max-w-3xl font-display text-xl font-medium leading-relaxed text-offwhite sm:text-2xl">
          Empower every farmer with{' '}
          <span className="text-emerald-glow">intelligent</span>,{' '}
          <span className="text-emerald-glow">accessible</span>,{' '}
          <span className="text-emerald-glow">connected</span> agricultural
          technology.
        </p>
      </motion.div>

      {/* Five pillars */}
      <motion.p variants={fadeUp} className="mt-10 text-sm uppercase tracking-widest text-offwhite-muted/60">
        Five Pillars
      </motion.p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="glass-card group flex flex-col items-center p-5 text-center hover:border-emerald-glow/30 hover:bg-white/[0.05]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-glow/10 ring-1 ring-emerald-glow/20 transition-transform group-hover:scale-110">
                <Icon className="h-6 w-6 text-emerald-glow" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-offwhite">
                {pillar.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-offwhite-muted">
                {pillar.text}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ============================================================
   06 — FarmShield Ecosystem
   ============================================================ */

const ecosystemModules = [
  { icon: BrainCircuit, label: 'AI & Crop Care', member: '02', accent: 'lime' as const },
  { icon: LineChart, label: 'Market & Farmer Economy', member: '03', accent: 'amber' as const },
  { icon: Satellite, label: 'Smart Agriculture Intelligence', member: '04', accent: 'emerald' as const },
  { icon: Handshake, label: 'Farmer Services & Trust', member: '05', accent: 'lime' as const },
  { icon: Bot, label: 'AI Assistant & Technology', member: '06', accent: 'amber' as const },
];

function FarmShieldEcosystem() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.h2
        variants={fadeUp}
        className="font-display text-2xl font-semibold text-offwhite sm:text-3xl"
      >
        FarmShield Ecosystem
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-offwhite-muted">
        Five interconnected modules orbit a single, unified intelligence layer.
      </motion.p>

      {/* Ecosystem diagram */}
      <motion.div
        variants={fadeUp}
        className="mt-10 flex flex-col items-center"
      >
        {/* Central node */}
        <motion.div
          variants={scaleIn}
          className="relative flex flex-col items-center gap-2 rounded-2xl border border-emerald-glow/30 bg-gradient-to-br from-forest-600 to-forest-900 px-10 py-6 shadow-glow"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-glow/15 ring-1 ring-emerald-glow/30">
            <ShieldCheck className="h-6 w-6 text-emerald-glow" />
          </span>
          <span className="font-display text-xl font-bold text-gradient-emerald">
            FARMSHIELD
          </span>
          <span className="text-xs text-offwhite-muted">Unified Ecosystem</span>
        </motion.div>

        {/* Connecting lines (decorative) */}
        <div className="my-2 h-8 w-px bg-gradient-to-b from-emerald-glow/40 to-transparent" />

        {/* Modules */}
        <motion.div
          variants={staggerContainerFast}
          className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ecosystemModules.map((mod) => {
            const Icon = mod.icon;
            const accentColor =
              mod.accent === 'emerald'
                ? 'text-emerald-glow border-emerald-glow/25 bg-emerald-glow/[0.05]'
                : mod.accent === 'amber'
                  ? 'text-amber-glow border-amber-glow/25 bg-amber-glow/[0.05]'
                  : 'text-lime-glow border-lime-glow/25 bg-lime-glow/[0.05]';
            return (
              <motion.div
                key={mod.label}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`group relative flex items-center gap-4 rounded-2xl border ${accentColor} p-5 backdrop-blur-sm transition-all`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/10 transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="font-display text-sm font-semibold text-offwhite">
                    {mod.label}
                  </p>
                  <p className="text-xs text-offwhite-muted/70">
                    Member {mod.member}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-offwhite-muted/40 transition-all group-hover:translate-x-1 group-hover:text-offwhite" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Connection note */}
        <motion.div variants={fadeUp} className="mt-8 flex items-center gap-2 text-xs text-offwhite-muted/60">
          <Eye className="h-3.5 w-3.5" />
          <span>Each module is fully interactive and explored in its dedicated member section.</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   Shared flow helpers
   ============================================================ */

function FlowNode({
  icon: Icon,
  label,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  accent: 'emerald' | 'amber';
}) {
  const color =
    accent === 'emerald'
      ? 'border-emerald-glow/30 bg-emerald-glow/[0.06] text-emerald-glow'
      : 'border-amber-glow/30 bg-amber-glow/[0.06] text-amber-glow';
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.04 }}
      className={`flex items-center gap-3 rounded-2xl border ${color} px-6 py-4 backdrop-blur-sm`}
    >
      <Icon className="h-5 w-5" />
      <span className="font-display text-base font-semibold text-offwhite">{label}</span>
    </motion.div>
  );
}

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        animate={{ y: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown className="h-5 w-5 text-offwhite-muted/50" />
      </motion.div>
      {label && <span className="text-xs text-offwhite-muted/60">{label}</span>}
    </div>
  );
}
