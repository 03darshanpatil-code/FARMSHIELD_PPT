import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  CheckCircle2,
  Info,
  Layers,
  Grid,
  Waves,
  Leaf,
  FlaskConical,
  Droplets,
  Activity,
  ArrowRight,
  ArrowDown,
  Sprout,
  CloudSun,
  Search,
  Radar,
  ShieldAlert,
  type LucideIcon,
} from 'lucide-react';
import { fadeUp, staggerContainerFast, scaleIn } from '@/lib/motion';
import DetectionSpinner from '@/screens/members/DetectionSpinner';
import Modal from '@/screens/members/Modal';
import {
  BEST_MATCHES,
  CROP_SUITABILITY,
  SOIL_AREA,
  SOIL_PROFILE,
  SOIL_RADIUS_KM,
  type CropSoil,
  type SuitabilityLevel,
} from './soilData';

interface SoilIntelligenceProps {
  onExploreWeather: () => void;
}

const STEPS = [
  { id: 'soil', label: 'Soil Intelligence' },
  { id: 'profile', label: 'Soil Profile' },
  { id: 'suitability', label: 'Crop Suitability' },
  { id: 'recommendations', label: 'Recommendations' },
];

const SUIT_STYLES: Record<SuitabilityLevel, string> = {
  HIGH: 'border-lime-glow/40 bg-lime-glow/10 text-lime-glow',
  MEDIUM: 'border-amber-glow/40 bg-amber-glow/10 text-amber-glow',
  LOW: 'border-white/15 bg-white/[0.05] text-offwhite-muted',
};

const WATER_STYLES: Record<string, string> = {
  High: 'text-sky-300',
  Medium: 'text-emerald-glow',
  Low: 'text-lime-glow',
};

const PROFILE_ROWS: { icon: LucideIcon; label: string; value: string; color: string }[] = [
  { icon: Layers, label: 'Soil Type', value: SOIL_PROFILE.soilType, color: 'text-amber-glow' },
  { icon: Grid, label: 'Texture', value: SOIL_PROFILE.texture, color: 'text-lime-glow' },
  { icon: Waves, label: 'Drainage', value: SOIL_PROFILE.drainage, color: 'text-emerald-glow' },
  { icon: Leaf, label: 'Organic Matter', value: SOIL_PROFILE.organicMatter, color: 'text-lime-glow' },
  { icon: FlaskConical, label: 'pH Range', value: SOIL_PROFILE.phRange, color: 'text-emerald-glow' },
  { icon: Droplets, label: 'Water Retention', value: SOIL_PROFILE.waterRetention, color: 'text-sky-300' },
  { icon: Activity, label: 'Nutrient Tendency', value: SOIL_PROFILE.nutrientTendency, color: 'text-amber-glow' },
];

export default function SoilIntelligence({ onExploreWeather }: SoilIntelligenceProps) {
  const [analysisState, setAnalysisState] = useState<'idle' | 'analyzing' | 'analyzed'>('idle');
  const [activeStep, setActiveStep] = useState('soil');
  const [detailCrop, setDetailCrop] = useState<CropSoil | null>(null);

  const analyzed = analysisState === 'analyzed';

  const handleAnalyze = () => {
    if (analysisState === 'analyzing') return;
    setAnalysisState('analyzing');
    window.setTimeout(() => setAnalysisState('analyzed'), 1800);
  };

  /* Scroll-spy for the section strip */
  useEffect(() => {
    const els = STEPS.map((s) => document.getElementById(`sstep-${s.id}`)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveStep(entry.target.id.replace('sstep-', ''));
        });
      },
      { rootMargin: '-25% 0px -60% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToStep = (id: string) => {
    document.getElementById(`sstep-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                    ? 'border-emerald-glow/50 bg-emerald-glow/10 text-emerald-glow'
                    : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
                }`}
              >
                <span
                  className={`font-display text-[11px] font-bold ${
                    active ? 'text-emerald-glow' : 'text-offwhite-muted/50'
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
        {/* ============================ 05 — Soil Intelligence ============================ */}
        <section id="sstep-soil" className="scroll-mt-32">
          <StepHeader
            step="05"
            title="Soil Intelligence"
            subtitle="Understand the soil characteristics of your region and explore suitable crops."
          />

          {/* Regional-estimate explanation */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 rounded-2xl border border-amber-glow/25 bg-amber-glow/[0.05] p-5 sm:p-6"
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-amber-glow">
              <ShieldAlert className="h-4 w-4" />
              How FarmShield approaches soil
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-offwhite-muted">
              FarmShield uses <span className="font-semibold text-offwhite">location-based regional soil information</span> to
              provide an <span className="font-semibold text-offwhite">estimated soil profile</span> and crop suitability
              insights. This is not a soil test — no laboratory analysis, sensors, or physical sampling are involved.
            </p>
          </motion.div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Analysis card */}
            <div className="glass-card flex flex-col p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-glow/10 ring-1 ring-amber-glow/25">
                  <MapPin className="h-5 w-5 text-amber-glow" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
                    Analysis Area
                  </p>
                  <p className="font-display text-base font-semibold text-offwhite">{SOIL_AREA}</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] uppercase tracking-widest text-offwhite-muted/60">
                  Demo
                </span>
              </div>

              <p className="mt-4 flex items-center gap-2 text-sm text-offwhite-muted">
                <Radar className="h-4 w-4 text-amber-glow" />
                Regional estimate radius
                <span className="font-semibold text-offwhite">{SOIL_RADIUS_KM} km</span>
              </p>

              <div className="mt-6 flex-1">
                <AnimatePresence mode="wait">
                  {analysisState === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-start gap-4"
                    >
                      <button
                        onClick={handleAnalyze}
                        className="group inline-flex items-center gap-2.5 rounded-xl border border-amber-glow/40 bg-gradient-to-r from-amber-glow/25 to-amber-glow/10 px-6 py-3.5 text-sm font-bold text-amber-glow shadow-glow-amber transition-all hover:border-amber-glow/70 hover:shadow-[0_0_32px_-4px_rgba(245,185,66,0.5)]"
                      >
                        <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
                        ANALYZE MY AREA
                      </button>
                      <p className="flex items-center gap-1.5 text-xs text-offwhite-muted/60">
                        <Info className="h-3.5 w-3.5" />
                        Simulated regional analysis — no real GPS or field sampling.
                      </p>
                    </motion.div>
                  )}

                  {analysisState === 'analyzing' && (
                    <motion.div
                      key="analyzing"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-4"
                    >
                      <DetectionSpinner accent="amber" />
                      <div>
                        <p className="font-display text-sm font-semibold text-amber-glow">
                          Analyzing regional soil…
                        </p>
                        <p className="mt-0.5 text-xs text-offwhite-muted">
                          Estimating soil profile from regional data within {SOIL_RADIUS_KM} km
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {analysisState === 'analyzed' && (
                    <motion.div
                      key="analyzed"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-start gap-3 rounded-xl border border-lime-glow/30 bg-lime-glow/[0.06] p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lime-glow" />
                        <div>
                          <p className="font-display text-sm font-semibold text-offwhite">
                            Regional estimate ready
                          </p>
                          <p className="mt-0.5 text-xs text-offwhite-muted">
                            Estimated soil profile and crop suitability are revealed below.
                          </p>
                        </div>
                      </div>
                      <p className="flex items-center gap-1.5 text-[11px] text-offwhite-muted/50">
                        <ShieldAlert className="h-3 w-3 text-amber-glow" />
                        DEMO / REGIONAL ESTIMATE — not a laboratory soil test.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Analysis radius visual */}
            <AnalysisRadius state={analysisState} />
          </div>
        </section>

        {/* ============================ 06 — Soil Profile ============================ */}
        <section id="sstep-profile" className="scroll-mt-32">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StepHeader
              step="06"
              title="Soil Profile"
              subtitle="Estimated regional profile — ranges and categories, not precise lab values."
            />
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-glow/30 bg-amber-glow/[0.07] px-3 py-1.5 text-xs font-medium text-amber-glow">
              DEMO / REGIONAL ESTIMATE
            </span>
          </div>

          <div
            className={`mt-6 grid grid-cols-1 gap-5 transition-all duration-700 lg:grid-cols-2 ${
              analyzed ? 'opacity-100' : 'opacity-60 saturate-[0.7]'
            }`}
          >
            {/* Profile rows */}
            <motion.div variants={staggerContainerFast} initial="hidden" animate="visible" className="glass-card p-6">
              <div className="space-y-2.5">
                {PROFILE_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <motion.div
                      key={row.label}
                      variants={fadeUp}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${row.color}`} />
                      <span className="w-40 shrink-0 text-xs uppercase tracking-widest text-offwhite-muted/60">
                        {row.label}
                      </span>
                      <span className="text-sm font-medium text-offwhite">{row.value}</span>
                    </motion.div>
                  );
                })}
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-[11px] text-offwhite-muted/50">
                <Info className="h-3 w-3" />
                Estimated from regional data — values are indicative categories.
              </p>
            </motion.div>

            {/* Soil visualization */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col gap-5">
              {/* Texture composition */}
              <div className="glass-card p-6">
                <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
                  Soil Composition · texture layers
                </p>
                <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-white/[0.05]">
                  {SOIL_PROFILE.composition.map((part) => (
                    <motion.div
                      key={part.label}
                      initial={{ width: 0 }}
                      animate={{ width: `${part.value}%` }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full ${part.color}`}
                    />
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                  {SOIL_PROFILE.composition.map((part) => (
                    <span key={part.label} className="flex items-center gap-1.5 text-xs text-offwhite-muted">
                      <span className={`h-2.5 w-2.5 rounded-sm ${part.color}`} />
                      {part.label} {part.value}%
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutrient tendency bars */}
              <div className="glass-card p-6">
                <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
                  Nutrient tendency · estimated
                </p>
                <div className="mt-4 space-y-4">
                  {SOIL_PROFILE.nutrients.map((n) => (
                    <div key={n.label}>
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="text-offwhite-muted">{n.label}</span>
                        <span className="font-semibold text-offwhite">{n.level}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${n.value}%` }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className={`h-full rounded-full ${n.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================ 07 — Crop Suitability ============================ */}
        <section id="sstep-suitability" className="scroll-mt-32">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StepHeader
              step="07"
              title="Crop Suitability"
              subtitle="Which crops fit the estimated regional soil profile — tap any crop for detail."
            />
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-glow/30 bg-amber-glow/[0.07] px-3 py-1.5 text-xs font-medium text-amber-glow">
              DEMO CROP SUITABILITY
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CROP_SUITABILITY.map((crop, i) => (
              <motion.button
                key={crop.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => setDetailCrop(crop)}
                className={`glass-card group flex flex-col p-5 text-left hover:border-emerald-glow/40 hover:bg-white/[0.05]`}
              >
                <div className="flex items-center justify-between">
                  <span className={`h-3 w-3 rounded-full ${crop.dot}`} />
                  <span
                    className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold tracking-widest ${SUIT_STYLES[crop.suitability]}`}
                  >
                    {crop.suitability}
                  </span>
                </div>
                <p className="mt-3 font-display text-lg font-semibold text-offwhite">{crop.name}</p>
                <p className="mt-1 text-xs text-offwhite-muted">
                  Water · <span className={`font-semibold ${WATER_STYLES[crop.water]}`}>{crop.water}</span>
                </p>
                <p className="mt-1 text-xs text-offwhite-muted/70">{crop.soilPreference}</p>
                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-offwhite-muted/80">
                  {crop.reason}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 border-t border-white/[0.06] pt-3 text-xs font-semibold text-emerald-glow opacity-80 transition-all group-hover:opacity-100">
                  View details
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>
            ))}
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-xs text-offwhite-muted/50">
            <Info className="h-3.5 w-3.5" />
            Suitability is a simulated estimate for presentation — not guaranteed agricultural guidance.
          </p>
        </section>

        {/* ============================ 08 — Recommendations ============================ */}
        <section id="sstep-recommendations" className="scroll-mt-32">
          <StepHeader
            step="08"
            title="Best Matches for This Area"
            subtitle="Ranked demo recommendations based on the estimated regional soil profile."
          />

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BEST_MATCHES.map((crop, i) => (
              <motion.div
                key={crop.id}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className={`relative overflow-hidden rounded-2xl border p-5 backdrop-blur-sm ${
                  i === 0
                    ? 'border-lime-glow/40 bg-gradient-to-b from-lime-glow/[0.08] to-transparent shadow-glow'
                    : 'border-white/[0.08] bg-white/[0.03] hover:border-white/20'
                }`}
              >
                <span className="absolute right-4 top-3 font-display text-5xl font-bold text-white/[0.06]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold tracking-widest ${SUIT_STYLES[crop.suitability]}`}
                >
                  {crop.suitability} MATCH
                </span>
                <p className="mt-3 font-display text-lg font-semibold text-offwhite">{crop.name}</p>
                <p className="mt-1 text-xs text-offwhite-muted">
                  Water · <span className={`font-semibold ${WATER_STYLES[crop.water]}`}>{crop.water}</span>
                </p>
                <p className="mt-3 text-xs leading-relaxed text-offwhite-muted/80">{crop.reason}</p>
                <p className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs leading-relaxed text-offwhite-muted">
                  {crop.recommendation}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ============ Interactive connection: weather + soil → decisions ============ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8"
          >
            <p className="text-center text-xs uppercase tracking-widest text-offwhite-muted/60">
              The FarmShield decision flow
            </p>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-offwhite-muted">
              Weather Intelligence and Soil Intelligence feed one shared picture of the local
              environment — leading to smarter farming decisions.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3">
              <FlowNode icon={MapPin} label="LOCATION" sub="Your farm area" color="text-emerald-glow border-emerald-glow/30 bg-emerald-glow/[0.06]" />
              <FlowArrow />
              <FlowNode icon={Layers} label="LOCAL ENVIRONMENT" sub="Regional climate & soil data" color="text-lime-glow border-lime-glow/30 bg-lime-glow/[0.06]" />
              <FlowArrow />
              <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
                <FlowNode icon={CloudSun} label="WEATHER" sub="Conditions & forecast" color="text-emerald-glow border-emerald-glow/30 bg-emerald-glow/[0.06]" compact />
                <FlowNode icon={Sprout} label="SOIL" sub="Estimated regional profile" color="text-amber-glow border-amber-glow/30 bg-amber-glow/[0.06]" compact />
              </div>
              <FlowArrow />
              <FlowNode icon={Leaf} label="CROP SUITABILITY" sub="What fits your area" color="text-lime-glow border-lime-glow/30 bg-lime-glow/[0.06]" />
              <FlowArrow />
              <motion.div
                variants={scaleIn}
                className="rounded-2xl border border-emerald-glow/30 bg-gradient-to-br from-forest-600 to-forest-900 px-10 py-5 shadow-glow"
              >
                <p className="font-display text-lg font-bold text-gradient-emerald">
                  SMARTER FARMING DECISIONS
                </p>
              </motion.div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={onExploreWeather}
                className="group inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-offwhite-muted transition-all hover:border-emerald-glow/40 hover:text-emerald-glow"
              >
                Back to Weather Intelligence
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Crop detail modal */}
      <CropDetailModal crop={detailCrop} onClose={() => setDetailCrop(null)} />
    </div>
  );
}

/* ============================================================
   Sub-components
   ============================================================ */

function StepHeader({ step, title, subtitle }: { step: string; title: string; subtitle: string }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-glow/10 font-display text-sm font-bold text-emerald-glow ring-1 ring-emerald-glow/25">
        {step}
      </span>
      <div>
        <h3 className="font-display text-xl font-semibold text-offwhite sm:text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-offwhite-muted">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function FlowNode({
  icon: Icon,
  label,
  sub,
  color,
  compact,
}: {
  icon: LucideIcon;
  label: string;
  sub: string;
  color: string;
  compact?: boolean;
}) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.03 }}
      className={`flex items-center gap-3 rounded-2xl border ${color} px-6 py-4 backdrop-blur-sm ${
        compact ? 'w-full justify-center' : ''
      }`}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <div className="text-left">
        <p className="font-display text-sm font-semibold text-offwhite">{label}</p>
        <p className="text-xs text-offwhite-muted/70">{sub}</p>
      </div>
    </motion.div>
  );
}

function FlowArrow() {
  return (
    <motion.div
      animate={{ y: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <ArrowDown className="h-5 w-5 text-offwhite-muted/50" />
    </motion.div>
  );
}

function CropDetailModal({ crop, onClose }: { crop: CropSoil | null; onClose: () => void }) {
  return (
    <Modal open={crop !== null} onClose={onClose} label="Crop suitability details">
      {crop && (
        <div className="pr-6">
          <div className="flex items-center gap-3">
            <span className={`h-4 w-4 rounded-full ${crop.dot}`} />
            <h3 className="font-display text-xl font-bold text-offwhite">{crop.name}</h3>
            <span
              className={`ml-auto rounded-lg border px-2.5 py-1 text-[10px] font-bold tracking-widest ${SUIT_STYLES[crop.suitability]}`}
            >
              {crop.suitability} SUITABILITY
            </span>
          </div>

          <div className="mt-5 space-y-2.5">
            <DetailRow label="Water Requirement" value={crop.water} />
            <DetailRow label="Soil Preference" value={crop.soilPreference} />
            <DetailRow label="Soil Characteristics" value={crop.soilCharacteristics} />
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
                Suitability explanation
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-offwhite-muted">{crop.explanation}</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
                Cultivation considerations
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-offwhite-muted">{crop.considerations}</p>
            </div>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-[11px] text-offwhite-muted/50">
            <ShieldAlert className="h-3 w-3 text-amber-glow" />
            Demo crop suitability — simulated estimate, not guaranteed agricultural advice.
          </p>
        </div>
      )}
    </Modal>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <span className="w-44 shrink-0 text-xs uppercase tracking-widest text-offwhite-muted/60">
        {label}
      </span>
      <span className="text-sm text-offwhite">{value}</span>
    </div>
  );
}

/* ============================================================
   Analysis radius visual
   ============================================================ */

const AR_SIZE = 300;
const AR_CENTER = AR_SIZE / 2;
const AR_RINGS = [40, 68, 92];

function AnalysisRadius({ state }: { state: 'idle' | 'analyzing' | 'analyzed' }) {
  const analyzed = state === 'analyzed';
  return (
    <div className="glass-card flex flex-col p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
          Regional Analysis Grid · {SOIL_RADIUS_KM} km
        </p>
        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-offwhite-muted/50">
          <Info className="h-3 w-3" /> Illustrative demo
        </span>
      </div>

      <div className="relative mx-auto mt-4 w-full max-w-[300px]">
        <svg viewBox={`0 0 ${AR_SIZE} ${AR_SIZE}`} className="block w-full">
          <g stroke="rgba(255,255,255,0.04)">
            <line x1={AR_CENTER} y1={0} x2={AR_CENTER} y2={AR_SIZE} />
            <line x1={0} y1={AR_CENTER} x2={AR_SIZE} y2={AR_CENTER} />
          </g>
          {AR_RINGS.map((r) => (
            <circle
              key={r}
              cx={AR_CENTER}
              cy={AR_CENTER}
              r={r}
              fill="none"
              stroke="rgba(245,185,66,0.18)"
              strokeDasharray="4 6"
            />
          ))}
        </svg>

        {/* Sweep while analyzing */}
        <AnimatePresence>
          {state === 'analyzing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(245,185,66,0.16), transparent 70deg)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center pin */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: '50%', top: '50%' }}>
          <motion.div
            animate={state === 'analyzing' ? { scale: [1, 1.18, 1] } : { scale: [1, 1.05, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-glow/40 bg-forest-900/90 shadow-glow-amber">
              <Layers className="h-5 w-5 text-amber-glow" />
            </span>
          </motion.div>
        </div>

        {/* Regional nodes */}
        {[
          { x: 150, y: 48, label: 'N' },
          { x: 246, y: 128, label: 'E' },
          { x: 60, y: 200, label: 'W' },
          { x: 168, y: 246, label: 'S' },
        ].map((node, i) => (
          <div
            key={node.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(node.x / AR_SIZE) * 100}%`, top: `${(node.y / AR_SIZE) * 100}%` }}
          >
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: analyzed ? 1 : 0.5, opacity: analyzed ? 1 : 0.3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.25 + i * 0.12 }}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-amber-glow/40 bg-amber-glow/15 text-[9px] font-bold text-amber-glow"
            >
              {node.label}
            </motion.span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-offwhite-muted/60">
        Estimated from regional soil data — no field sampling involved.
      </p>
    </div>
  );
}
