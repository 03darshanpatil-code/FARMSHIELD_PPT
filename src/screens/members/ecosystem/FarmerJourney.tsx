import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sprout,
  Search,
  Bot,
  ListChecks,
  ShoppingCart,
  Wheat,
  LineChart,
  ScanLine,
  BadgeCheck,
  ArrowRight,
  Sparkles,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { fadeUp } from '@/lib/motion';

interface JourneyStep {
  title: string;
  icon: LucideIcon;
  text: string;
}

const JOURNEY: JourneyStep[] = [
  { title: 'FARMER', icon: Sprout, text: 'The journey begins with the farmer and the field.' },
  { title: 'IDENTIFY PROBLEM', icon: Search, text: 'Spot a disease, check the weather, or plan a sale.' },
  { title: 'GET AI GUIDANCE', icon: Bot, text: 'Plant Doctor AI answers in 13 languages.' },
  { title: 'CHOOSE ACTION', icon: ListChecks, text: 'Simulate crops, compare forecasts, check schemes.' },
  { title: 'BUY / ACCESS RESOURCES', icon: ShoppingCart, text: 'Inputs from the marketplace, equipment and labour via Krishi Setu.' },
  { title: 'GROW CROP', icon: Wheat, text: 'Weather and soil guidance through the season.' },
  { title: 'SELL SMARTER', icon: LineChart, text: 'Nearby market prices and forecasts before selling.' },
  { title: 'TRACE HARVEST', icon: ScanLine, text: 'HarvestID creates the digital crop passport.' },
  { title: 'BUILD TRUST', icon: BadgeCheck, text: 'Consumers trace the crop from farm to table.' },
];

export default function FarmerJourney() {
  const navigate = useNavigate();

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
          06
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold text-offwhite sm:text-2xl">
            Farmer Journey
          </h3>
          <p className="mt-1 text-sm text-offwhite-muted">
            How a farmer moves through the FarmShield ecosystem — from problem to trust.
          </p>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative mx-auto mt-8 max-w-2xl">
        <div className="absolute bottom-4 left-[22px] top-4 w-px bg-gradient-to-b from-emerald-glow/60 via-lime-glow/30 to-transparent sm:left-[26px]" />
        <div className="space-y-4">
          {JOURNEY.map((step, i) => {
            const Icon = step.icon;
            const last = i === JOURNEY.length - 1;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4"
              >
                <motion.span
                  animate={
                    last
                      ? { scale: [1, 1.12, 1], boxShadow: ['0 0 0 0 rgba(163,230,53,0.4)', '0 0 0 10px rgba(163,230,53,0)', '0 0 0 0 rgba(163,230,53,0)'] }
                      : {}
                  }
                  transition={{ duration: 2.4, repeat: last ? Infinity : 0, ease: 'easeOut' }}
                  className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border sm:h-[52px] sm:w-[52px] ${
                    last
                      ? 'border-lime-glow/70 bg-lime-glow/15'
                      : 'border-emerald-glow/40 bg-forest-900'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${last ? 'text-lime-glow' : 'text-emerald-glow'}`} />
                </motion.span>
                <div className="glass-card flex-1 p-4 transition-all hover:border-emerald-glow/30">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p
                      className={`font-display text-sm font-bold tracking-wide ${
                        last ? 'text-lime-glow' : 'text-offwhite'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')} — {step.title}
                    </p>
                    {last && (
                      <span className="flex items-center gap-1 rounded-lg border border-lime-glow/40 bg-lime-glow/10 px-2 py-0.5 text-[9px] font-bold tracking-widest text-lime-glow">
                        <BadgeCheck className="h-3 w-3" />
                        TRUST
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-offwhite-muted">{step.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Final closing card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-16 overflow-hidden rounded-3xl border border-emerald-glow/30 bg-gradient-to-b from-forest-900 via-forest-950 to-forest-950 px-6 py-16 text-center shadow-soft sm:px-10 sm:py-20"
      >
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-glow/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-lime-glow/10 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-glow/[0.07] blur-2xl" />

        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-glow/60 bg-forest-900 shadow-glow"
        >
          <Sprout className="h-9 w-9 text-lime-glow" />
        </motion.div>

        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mt-6 font-display text-4xl font-bold tracking-tight text-offwhite sm:text-6xl"
        >
          <span className="text-gradient-emerald">FARMSHIELD</span>
        </motion.h3>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mt-4 font-display text-lg font-medium text-lime-glow sm:text-xl"
        >
          SMART FARMING BEGINS WITH SMART DECISIONS.
        </motion.p>

        {/* Team signature */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mt-4 flex items-center justify-center gap-4"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-glow/40" />
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-glow/90">
            ERROR 420
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-glow/40" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-offwhite-muted"
        >
          One intelligent agricultural ecosystem.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            onClick={() => navigate('/')}
            className="group inline-flex items-center gap-2.5 rounded-xl border border-lime-glow/50 bg-gradient-to-r from-lime-glow/30 to-lime-glow/10 px-7 py-3.5 text-sm font-bold text-lime-glow shadow-glow transition-all hover:border-lime-glow/80 hover:shadow-[0_0_32px_-4px_rgba(163,230,53,0.5)]"
          >
            EXPLORE FARMSHIELD AGAIN
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => navigate('/team')}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-offwhite-muted transition-all hover:border-emerald-glow/40 hover:text-emerald-glow"
          >
            <Users className="h-4 w-4" />
            BACK TO TEAM
          </button>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mt-8 flex items-center justify-center gap-1.5 text-[11px] text-offwhite-muted/40"
        >
          <Sparkles className="h-3 w-3" />
          A concept presentation built with simulated demo data — thank you for watching.
        </motion.p>
      </motion.div>
    </div>
  );
}
