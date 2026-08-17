import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FlaskConical,
  Sprout,
  Droplets,
  CloudSun,
  Sun,
  Leaf,
  TrendingUp,
  Clock,
  AlertTriangle,
  Lightbulb,
  Play,
  RotateCcw,
  Activity,
  Wheat,
  type LucideIcon,
} from 'lucide-react';
import { fadeUp, scaleIn, staggerContainer } from '@/lib/motion';

type CropId = 'tomato' | 'wheat' | 'rice' | 'cotton';
type Condition = 'optimal' | 'moderate' | 'poor';
type WeatherId = 'sunny' | 'cloudy' | 'rainy';
type ApproachId = 'organic' | 'balanced' | 'conventional';

interface CropOption {
  id: CropId;
  label: string;
  icon: LucideIcon;
}
interface ConditionOption {
  id: Condition;
  label: string;
  icon: LucideIcon;
}
interface WeatherOption {
  id: WeatherId;
  label: string;
  icon: LucideIcon;
}
interface ApproachOption {
  id: ApproachId;
  label: string;
  icon: LucideIcon;
}

const crops: CropOption[] = [
  { id: 'tomato', label: 'Tomato', icon: Sprout },
  { id: 'wheat', label: 'Wheat', icon: Wheat },
  { id: 'rice', label: 'Rice', icon: Leaf },
  { id: 'cotton', label: 'Cotton', icon: Sprout },
];

const growingConditions: ConditionOption[] = [
  { id: 'optimal', label: 'Optimal', icon: Sun },
  { id: 'moderate', label: 'Moderate', icon: CloudSun },
  { id: 'poor', label: 'Poor', icon: CloudSun },
];

const soilConditions: ConditionOption[] = [
  { id: 'optimal', label: 'Healthy', icon: Sprout },
  { id: 'moderate', label: 'Average', icon: Sprout },
  { id: 'poor', label: 'Degraded', icon: Sprout },
];

const weatherConditions: WeatherOption[] = [
  { id: 'sunny', label: 'Sunny', icon: Sun },
  { id: 'cloudy', label: 'Cloudy', icon: CloudSun },
  { id: 'rainy', label: 'Rainy', icon: CloudSun },
];

const approaches: ApproachOption[] = [
  { id: 'organic', label: 'Organic', icon: Leaf },
  { id: 'balanced', label: 'Balanced', icon: Activity },
  { id: 'conventional', label: 'Conventional', icon: FlaskConical },
];

export default function CropSimulator() {
  const [crop, setCrop] = useState<CropId>('tomato');
  const [growing, setGrowing] = useState<Condition>('moderate');
  const [soil, setSoil] = useState<Condition>('moderate');
  const [weather, setWeather] = useState<WeatherId>('sunny');
  const [approach, setApproach] = useState<ApproachId>('balanced');
  const [simulating, setSimulating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSimulate = () => {
    setShowResult(false);
    setSimulating(true);
    setTimeout(() => {
      setSimulating(false);
      setShowResult(true);
    }, 2200);
  };

  const handleReset = () => {
    setShowResult(false);
    setSimulating(false);
  };

  const result = computeResult(crop, growing, soil, weather, approach);

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-6">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-lime-glow" />
          <h3 className="font-display text-lg font-semibold text-offwhite">
            Crop Simulator
          </h3>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-offwhite-muted">
          Explore crop scenarios and understand potential outcomes before making
          farming decisions. Adjust the controls below and run a simulation.
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {/* Crop selection */}
        <ControlGroup label="Crop Selection">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {crops.map((c) => (
              <SelectCard
                key={c.id}
                option={c}
                selected={crop === c.id}
                onClick={() => setCrop(c.id)}
              />
            ))}
          </div>
        </ControlGroup>

        {/* Growing condition */}
        <ControlGroup label="Growing Condition">
          <div className="grid grid-cols-3 gap-2">
            {growingConditions.map((c) => (
              <SelectCard
                key={c.id}
                option={c}
                selected={growing === c.id}
                onClick={() => setGrowing(c.id)}
              />
            ))}
          </div>
        </ControlGroup>

        {/* Soil condition */}
        <ControlGroup label="Soil Condition">
          <div className="grid grid-cols-3 gap-2">
            {soilConditions.map((c) => (
              <SelectCard
                key={c.id}
                option={c}
                selected={soil === c.id}
                onClick={() => setSoil(c.id)}
              />
            ))}
          </div>
        </ControlGroup>

        {/* Weather condition */}
        <ControlGroup label="Weather Condition">
          <div className="grid grid-cols-3 gap-2">
            {weatherConditions.map((c) => (
              <SelectCard
                key={c.id}
                option={c}
                selected={weather === c.id}
                onClick={() => setWeather(c.id)}
              />
            ))}
          </div>
        </ControlGroup>

        {/* Farming approach */}
        <ControlGroup label="Farming Approach" full>
          <div className="grid grid-cols-3 gap-2">
            {approaches.map((c) => (
              <SelectCard
                key={c.id}
                option={c}
                selected={approach === c.id}
                onClick={() => setApproach(c.id)}
              />
            ))}
          </div>
        </ControlGroup>
      </motion.div>

      {/* Simulate button */}
      <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSimulate}
          disabled={simulating}
          className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-lime-glow/30 bg-gradient-to-r from-forest-600 to-forest-800 px-8 py-3.5 text-sm font-bold text-offwhite shadow-glow transition-all hover:border-lime-glow/60 disabled:opacity-60"
        >
          <Play className="h-4 w-4 text-lime-glow" />
          {simulating ? 'SIMULATING...' : 'SIMULATE'}
        </motion.button>
        {showResult && (
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-offwhite-muted transition-all hover:border-white/20 hover:text-offwhite"
          >
            <RotateCcw className="h-4 w-4" />
            Reset &amp; Adjust
          </button>
        )}
      </motion.div>

      {/* Simulation animation */}
      <AnimatePresence>
        {simulating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-lime-glow/20 bg-white/[0.02] py-16"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-lime-glow/30 border-t-lime-glow"
            >
              <FlaskConical className="h-6 w-6 text-lime-glow" />
            </motion.div>
            <p className="mt-4 font-display text-sm font-medium text-lime-glow">
              Running simulation...
            </p>
            <div className="mt-3 flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="h-1.5 w-1.5 rounded-full bg-lime-glow"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result dashboard */}
      <AnimatePresence>
        {showResult && !simulating && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6"
          >
            <ResultDashboard result={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============================================================
   Control Group + Select Card
   ============================================================ */

function ControlGroup({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={`rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 ${full ? 'sm:col-span-2' : ''}`}>
      <p className="mb-3 text-xs uppercase tracking-widest text-offwhite-muted/60">
        {label}
      </p>
      {children}
    </div>
  );
}

interface SelectableOption {
  id: string;
  label: string;
  icon: LucideIcon;
}

function SelectCard({
  option,
  selected,
  onClick,
}: {
  option: SelectableOption;
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = option.icon;
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-3 text-center transition-all ${
        selected
          ? 'border-lime-glow/40 bg-lime-glow/10 text-lime-glow'
          : 'border-white/[0.08] bg-white/[0.02] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs font-medium">{option.label}</span>
    </button>
  );
}

/* ============================================================
   Result Dashboard
   ============================================================ */

interface SimResult {
  growth: number;
  yieldRange: string;
  water: string;
  duration: string;
  risk: 'Low' | 'Moderate' | 'High';
  riskLevel: number;
  recommendation: string;
}

function computeResult(
  crop: CropId,
  growing: Condition,
  soil: Condition,
  weather: WeatherId,
  approach: ApproachId,
): SimResult {
  const conditionScore: Record<Condition, number> = { optimal: 1, moderate: 0.6, poor: 0.3 };
  const weatherScore: Record<WeatherId, number> = { sunny: 1, cloudy: 0.7, rainy: 0.5 };
  const approachScore: Record<ApproachId, number> = { organic: 0.7, balanced: 0.9, conventional: 1 };

  const base = conditionScore[growing] * 0.35 + conditionScore[soil] * 0.3 + weatherScore[weather] * 0.2 + approachScore[approach] * 0.15;
  const growth = Math.round(45 + base * 50);

  const cropYields: Record<CropId, [number, number]> = {
    tomato: [18, 35],
    wheat: [12, 24],
    rice: [20, 40],
    cotton: [8, 15],
  };
  const [minY, maxY] = cropYields[crop];
  const yieldLow = Math.round(minY + base * (maxY - minY) * 0.3);
  const yieldHigh = Math.round(minY + base * (maxY - minY) * 0.9);

  const waterBase: Record<CropId, number> = { tomato: 500, wheat: 300, rice: 1200, cotton: 700 };
  const water = `${Math.round(waterBase[crop] * (0.7 + base * 0.5))} mm/season`;

  const durationMap: Record<CropId, string> = {
    tomato: '90–120 days',
    wheat: '110–140 days',
    rice: '100–130 days',
    cotton: '150–180 days',
  };

  const riskNum = Math.round((1 - base) * 100);
  const risk: SimResult['risk'] = riskNum < 30 ? 'Low' : riskNum < 60 ? 'Moderate' : 'High';

  const recs = [
    'Conditions look promising. Maintain consistent irrigation and monitor for early disease signs.',
    'Moderate conditions. Consider supplemental nutrients and schedule regular crop inspections.',
    'Challenging conditions. Improve soil health before planting and plan for active pest management.',
  ];
  const recIndex = base > 0.65 ? 0 : base > 0.4 ? 1 : 2;

  return {
    growth,
    yieldRange: `${yieldLow}–${yieldHigh} quintal/acre`,
    water,
    duration: durationMap[crop],
    risk,
    riskLevel: riskNum,
    recommendation: recs[recIndex],
  };
}

function ResultDashboard({ result }: { result: SimResult }) {
  const riskColor =
    result.risk === 'Low'
      ? 'text-emerald-glow bg-emerald-glow/10 ring-emerald-glow/20'
      : result.risk === 'Moderate'
        ? 'text-amber-glow bg-amber-glow/10 ring-amber-glow/20'
        : 'text-red-400 bg-red-400/10 ring-red-400/20';

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-glow/10 ring-1 ring-lime-glow/30">
          <TrendingUp className="h-5 w-5 text-lime-glow" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-widest text-lime-glow">
            Simulation Results
          </p>
          <p className="font-display text-xl font-semibold text-offwhite">
            Scenario Analysis Dashboard
          </p>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Growth */}
        <motion.div variants={fadeUp} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
          <div className="flex items-center gap-2">
            <Sprout className="h-4 w-4 text-lime-glow" />
            <span className="text-xs uppercase tracking-widest text-offwhite-muted/60">
              Estimated Growth
            </span>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-offwhite">
            {result.growth}%
          </p>
          {/* Progress bar */}
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.growth}%` }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-forest-500 to-lime-glow"
            />
          </div>
        </motion.div>

        {/* Yield */}
        <motion.div variants={fadeUp} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-glow" />
            <span className="text-xs uppercase tracking-widest text-offwhite-muted/60">
              Expected Yield Range
            </span>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-offwhite">
            {result.yieldRange}
          </p>
          <p className="mt-1 text-xs text-offwhite-muted">quintal per acre</p>
        </motion.div>

        {/* Water */}
        <motion.div variants={fadeUp} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-lime-glow" />
            <span className="text-xs uppercase tracking-widest text-offwhite-muted/60">
              Water Requirement
            </span>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-offwhite">
            {result.water}
          </p>
        </motion.div>

        {/* Duration */}
        <motion.div variants={fadeUp} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-glow" />
            <span className="text-xs uppercase tracking-widest text-offwhite-muted/60">
              Growth Duration
            </span>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-offwhite">
            {result.duration}
          </p>
        </motion.div>

        {/* Risk */}
        <motion.div variants={fadeUp} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-glow" />
            <span className="text-xs uppercase tracking-widest text-offwhite-muted/60">
              Risk Indicator
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className={`rounded-lg px-3 py-1 text-sm font-bold ring-1 ${riskColor}`}>
              {result.risk}
            </span>
            <span className="text-sm text-offwhite-muted">{result.riskLevel}% risk score</span>
          </div>
          {/* Risk bar */}
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.riskLevel}%` }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                result.risk === 'Low'
                  ? 'bg-emerald-glow'
                  : result.risk === 'Moderate'
                    ? 'bg-amber-glow'
                    : 'bg-red-400'
              }`}
            />
          </div>
        </motion.div>

        {/* Recommendation */}
        <motion.div variants={fadeUp} className="rounded-2xl border border-lime-glow/20 bg-lime-glow/[0.04] p-5">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-lime-glow" />
            <span className="text-xs uppercase tracking-widest text-lime-glow">
              Recommendation
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-offwhite">
            {result.recommendation}
          </p>
        </motion.div>
      </div>

      {/* Disclaimer */}
      <motion.p
        variants={fadeUp}
        className="mt-4 flex items-center gap-1.5 text-xs text-offwhite-muted/50"
      >
        <AlertTriangle className="h-3 w-3" />
        Simulation demo results — illustrative estimates, not guaranteed agricultural predictions.
      </motion.p>
    </motion.div>
  );
}
