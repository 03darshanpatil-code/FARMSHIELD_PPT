import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  MapPin,
  LandPlot,
  Wheat,
  Sprout,
  Wallet,
  CheckCircle2,
  MinusCircle,
  XCircle,
  RotateCcw,
  ShieldAlert,
  Search,
  ArrowRight,
} from 'lucide-react';
import { staggerContainerFast } from '@/lib/motion';
import DetectionSpinner from '@/screens/members/DetectionSpinner';
import {
  PROFILE_OPTIONS,
  SCHEMES,
  checkEligibility,
  type EligibilityResult,
  type FarmerProfile,
} from './schemesData';

interface EligibilityCheckerProps {
  onOpenScheme: (schemeId: string) => void;
}

const FIELDS: { key: keyof FarmerProfile; label: string; icon: typeof User; options: readonly string[] }[] = [
  { key: 'farmerType', label: 'Farmer Type', icon: User, options: PROFILE_OPTIONS.farmerType },
  { key: 'state', label: 'State', icon: MapPin, options: PROFILE_OPTIONS.state },
  { key: 'landHolding', label: 'Land Holding', icon: LandPlot, options: PROFILE_OPTIONS.landHolding },
  { key: 'cropType', label: 'Crop Type', icon: Wheat, options: PROFILE_OPTIONS.cropType },
  { key: 'farmingCategory', label: 'Farming Category', icon: Sprout, options: PROFILE_OPTIONS.farmingCategory },
  { key: 'income', label: 'Annual Income', icon: Wallet, options: PROFILE_OPTIONS.income },
];

const RESULT_STYLES: Record<EligibilityResult, { icon: typeof CheckCircle2; cls: string; text: string }> = {
  ELIGIBLE: {
    icon: CheckCircle2,
    cls: 'border-lime-glow/40 bg-lime-glow/10 text-lime-glow shadow-glow',
    text: 'ELIGIBLE',
  },
  'MAY BE ELIGIBLE': {
    icon: MinusCircle,
    cls: 'border-amber-glow/40 bg-amber-glow/10 text-amber-glow shadow-glow-amber',
    text: 'MAY BE ELIGIBLE',
  },
  'NOT ELIGIBLE': {
    icon: XCircle,
    cls: 'border-white/20 bg-white/[0.05] text-offwhite-muted',
    text: 'NOT ELIGIBLE',
  },
};

const RESULT_LABELS: Record<EligibilityResult, string> = {
  ELIGIBLE: 'Based on the demo profile, you appear eligible for one or more schemes.',
  'MAY BE ELIGIBLE': 'Some schemes may apply — additional conditions (demo) could affect the outcome.',
  'NOT ELIGIBLE': 'The demo profile does not match the simplified eligibility criteria used here.',
};

export default function EligibilityChecker({ onOpenScheme }: EligibilityCheckerProps) {
  const [profile, setProfile] = useState<FarmerProfile>({
    farmerType: PROFILE_OPTIONS.farmerType[0],
    state: PROFILE_OPTIONS.state[0],
    landHolding: PROFILE_OPTIONS.landHolding[0],
    cropType: PROFILE_OPTIONS.cropType[0],
    farmingCategory: PROFILE_OPTIONS.farmingCategory[0],
    income: PROFILE_OPTIONS.income[0],
  });
  const [phase, setPhase] = useState<'idle' | 'checking' | 'result'>('idle');
  const [result, setResult] = useState<ReturnType<typeof checkEligibility> | null>(null);

  const runCheck = () => {
    setPhase('checking');
    window.setTimeout(() => {
      setResult(checkEligibility(profile));
      setPhase('result');
    }, 1600);
  };

  const reset = () => {
    setPhase('idle');
    setResult(null);
  };

  return (
    <motion.div variants={staggerContainerFast} initial="hidden" animate="visible" className="glass-card p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-lime-glow">Check Your Eligibility</p>
          <h4 className="mt-1 font-display text-xl font-bold text-offwhite sm:text-2xl">
            Demo farmer profile
          </h4>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-glow/30 bg-amber-glow/[0.06] px-3 py-1.5 text-[11px] font-medium text-amber-glow">
          <ShieldAlert className="h-3.5 w-3.5" />
          No real personal data collected
        </span>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Profile form */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FIELDS.map((field) => {
                const Icon = field.icon;
                return (
                  <label key={field.key} className="block">
                    <span className="mb-1.5 flex items-center gap-1.5 text-xs uppercase tracking-widest text-offwhite-muted/60">
                      <Icon className="h-3.5 w-3.5 text-lime-glow" />
                      {field.label}
                    </span>
                    <select
                      value={profile[field.key]}
                      onChange={(e) => setProfile((p) => ({ ...p, [field.key]: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-forest-950 px-3.5 py-2.5 text-sm text-offwhite transition-all hover:border-white/20 focus:border-lime-glow/50 focus:outline-none"
                    >
                      {field.options.map((opt) => (
                        <option key={opt} value={opt} className="bg-forest-950 text-offwhite">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-1.5 text-[11px] text-offwhite-muted/50">
                <ShieldAlert className="h-3 w-3" />
                Simplified demo criteria — not official rules.
              </p>
              <button
                onClick={runCheck}
                className="inline-flex items-center gap-2 rounded-xl border border-lime-glow/50 bg-gradient-to-r from-lime-glow/30 to-lime-glow/10 px-6 py-3 text-sm font-bold text-lime-glow transition-all hover:border-lime-glow/80 hover:shadow-glow"
              >
                <Search className="h-4 w-4" />
                ANALYZE ELIGIBILITY
              </button>
            </div>
          </motion.div>
        )}
        {phase === 'checking' && (
          <motion.div key="checking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CheckingView />
          </motion.div>
        )}
        {phase === 'result' && result && (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultView result={result} onReset={reset} onOpenScheme={onOpenScheme} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CheckingView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 py-10"
    >
      <DetectionSpinner />
      <div>
        <p className="font-display text-sm font-semibold text-lime-glow">Analyzing eligibility…</p>
        <p className="mt-0.5 text-xs text-offwhite-muted">
          Checking the demo profile against {SCHEMES.length} schemes
        </p>
      </div>
    </motion.div>
  );
}

function ResultView({
  result,
  onReset,
  onOpenScheme,
}: {
  result: ReturnType<typeof checkEligibility>;
  onReset: () => void;
  onOpenScheme: (id: string) => void;
}) {
  const style = RESULT_STYLES[result.overall];
  const Icon = style.icon;

  const byResult = (r: EligibilityResult) =>
    result.matches
      .filter((m) => m.result === r)
      .map((m) => SCHEMES.find((s) => s.id === m.schemeId))
      .filter((s): s is (typeof SCHEMES)[number] => s !== undefined);

  const eligible = byResult('ELIGIBLE');
  const maybe = byResult('MAY BE ELIGIBLE');
  const notEligible = byResult('NOT ELIGIBLE');

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
      {/* Result badge */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        className={`flex flex-col items-center gap-3 rounded-2xl border p-6 text-center sm:flex-row sm:justify-center ${style.cls}`}
      >
        <Icon className="h-10 w-10" />
        <div>
          <p className="font-display text-2xl font-bold tracking-wide">{style.text}</p>
          <p className="mt-1 max-w-md text-sm text-offwhite-muted">{RESULT_LABELS[result.overall]}</p>
        </div>
      </motion.div>

      <p className="mt-4 flex items-center gap-1.5 text-[11px] text-offwhite-muted/50">
        <ShieldAlert className="h-3 w-3 text-amber-glow" />
        DEMO ELIGIBILITY RESULT — real eligibility must be verified on the official government portal.
      </p>

      {/* Per-scheme results */}
      <div className="mt-5 space-y-4">
        {eligible.length > 0 && (
          <ResultGroup title="Demo-eligible schemes" tone="eligible" schemes={eligible} onOpenScheme={onOpenScheme} />
        )}
        {maybe.length > 0 && (
          <ResultGroup title="May be eligible (demo)" tone="maybe" schemes={maybe} onOpenScheme={onOpenScheme} />
        )}
        {notEligible.length > 0 && (
          <ResultGroup title="Not matched in demo" tone="not" schemes={notEligible} onOpenScheme={onOpenScheme} />
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-offwhite-muted transition-all hover:border-white/25 hover:text-offwhite"
        >
          <RotateCcw className="h-4 w-4" />
          TRY ANOTHER PROFILE
        </button>
      </div>
    </motion.div>
  );
}

function ResultGroup({
  title,
  tone,
  schemes,
  onOpenScheme,
}: {
  title: string;
  tone: 'eligible' | 'maybe' | 'not';
  schemes: (typeof SCHEMES)[number][];
  onOpenScheme: (id: string) => void;
}) {
  const titleCls =
    tone === 'eligible'
      ? 'text-lime-glow'
      : tone === 'maybe'
        ? 'text-amber-glow'
        : 'text-offwhite-muted';
  return (
    <div>
      <p className={`text-xs uppercase tracking-widest ${titleCls}`}>{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {schemes.map((s) => (
          <button
            key={s.id}
            onClick={() => onOpenScheme(s.id)}
            className="group inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-offwhite-muted transition-all hover:border-lime-glow/40 hover:text-lime-glow"
          >
            {s.name}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
