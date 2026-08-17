import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  LocateFixed,
  CheckCircle2,
  Info,
  Sun,
  CloudSun,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  CloudFog,
  Sunrise,
  Sunset,
  Droplets,
  Wind,
  Umbrella,
  ThermometerSun,
  Leaf,
  Tractor,
  Sparkles,
  ArrowRight,
  Radar,
  type LucideIcon,
} from 'lucide-react';
import { fadeUp, staggerContainerFast, scaleIn } from '@/lib/motion';
import DetectionSpinner from '@/screens/members/DetectionSpinner';
import {
  CURRENT_WEATHER,
  DEMO_INSIGHTS,
  FARM_LOCATION,
  FORECAST,
  WEATHER_CROPS,
  WEATHER_RADIUS_KM,
  type WeatherCondition,
  type DayForecast,
} from './weatherData';
import WeatherChart from './WeatherChart';
import type { ChartMetric } from './weatherData';

interface WeatherIntelligenceProps {
  onExploreSoil: () => void;
}

const STEPS = [
  { id: 'weather', label: 'Weather' },
  { id: 'current', label: 'Current Conditions' },
  { id: 'forecast', label: 'Forecast' },
  { id: 'insights', label: 'Farming Insights' },
];

const CONDITION_ICONS: Record<WeatherCondition, LucideIcon> = {
  Sunny: Sun,
  'Partly Cloudy': CloudSun,
  Overcast: Cloud,
  'Light Rain': CloudDrizzle,
  Rain: CloudRain,
  Storm: CloudLightning,
  Fog: CloudFog,
};

const CONDITION_COLORS: Record<WeatherCondition, string> = {
  Sunny: 'text-amber-glow',
  'Partly Cloudy': 'text-emerald-glow',
  Overcast: 'text-offwhite-muted',
  'Light Rain': 'text-sky-300',
  Rain: 'text-sky-300',
  Storm: 'text-amber-glow',
  Fog: 'text-offwhite-muted',
};

const INSIGHT_ICONS: Record<string, LucideIcon> = {
  irrigation: Droplets,
  'crop-care': Leaf,
  'rain-alert': CloudRain,
  'field-activity': Tractor,
};

export default function WeatherIntelligence({ onExploreSoil }: WeatherIntelligenceProps) {
  const [locationState, setLocationState] = useState<'idle' | 'detecting' | 'detected'>('idle');
  const [forecastMode, setForecastMode] = useState<'today' | 'tomorrow' | '7days'>('today');
  const [metric, setMetric] = useState<ChartMetric>('temperature');
  const [activeStep, setActiveStep] = useState('weather');
  const [selectedCropId, setSelectedCropId] = useState('tomato');

  const detected = locationState === 'detected';
  const selectedCrop = WEATHER_CROPS.find((c) => c.id === selectedCropId) ?? WEATHER_CROPS[0];
  const ConditionIcon = CONDITION_ICONS[CURRENT_WEATHER.condition];

  const handleDetect = () => {
    if (locationState === 'detecting') return;
    setLocationState('detecting');
    window.setTimeout(() => setLocationState('detected'), 1600);
  };

  /* Scroll-spy for the section strip */
  useEffect(() => {
    const els = STEPS.map((s) => document.getElementById(`wstep-${s.id}`)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveStep(entry.target.id.replace('wstep-', ''));
        });
      },
      { rootMargin: '-25% 0px -60% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToStep = (id: string) => {
    document.getElementById(`wstep-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                  {String(i + 1).padStart(2, '0')}
                </span>
                {step.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 space-y-16">
        {/* ============================ 01 — Location ============================ */}
        <section id="wstep-weather" className="scroll-mt-32">
          <StepHeader
            step="01"
            title="Local Weather"
            subtitle="Detect your farm location to unlock the simulated weather picture for your area."
          />

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Detection card */}
            <div className="glass-card flex flex-col p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-glow/10 ring-1 ring-emerald-glow/25">
                  <MapPin className="h-5 w-5 text-emerald-glow" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
                    Current Farm Location
                  </p>
                  <p className="font-display text-base font-semibold text-offwhite">
                    {FARM_LOCATION}
                  </p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] uppercase tracking-widest text-offwhite-muted/60">
                  Demo
                </span>
              </div>

              <p className="mt-4 flex items-center gap-2 text-sm text-offwhite-muted">
                <Radar className="h-4 w-4 text-emerald-glow" />
                Weather coverage radius
                <span className="font-semibold text-offwhite">{WEATHER_RADIUS_KM} km</span>
              </p>

              <div className="mt-6 flex-1">
                <AnimatePresence mode="wait">
                  {locationState === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-start gap-4"
                    >
                      <button
                        onClick={handleDetect}
                        className="group inline-flex items-center gap-2.5 rounded-xl border border-emerald-glow/40 bg-gradient-to-r from-emerald-glow/25 to-emerald-glow/10 px-6 py-3.5 text-sm font-bold text-emerald-glow shadow-glow transition-all hover:border-emerald-glow/70 hover:shadow-[0_0_32px_-4px_rgba(52,211,153,0.5)]"
                      >
                        <LocateFixed className="h-4 w-4 transition-transform group-hover:scale-110" />
                        DETECT MY LOCATION
                      </button>
                      <p className="flex items-center gap-1.5 text-xs text-offwhite-muted/60">
                        <Info className="h-3.5 w-3.5" />
                        Uses a mock location — no browser GPS permission requested.
                      </p>
                    </motion.div>
                  )}

                  {locationState === 'detecting' && (
                    <motion.div
                      key="detecting"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-4"
                    >
                      <DetectionSpinner />
                      <div>
                        <p className="font-display text-sm font-semibold text-emerald-glow">
                          Detecting location…
                        </p>
                        <p className="mt-0.5 text-xs text-offwhite-muted">
                          Fetching simulated local weather within {WEATHER_RADIUS_KM} km
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {locationState === 'detected' && (
                    <motion.div
                      key="detected"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-start gap-3 rounded-xl border border-emerald-glow/30 bg-emerald-glow/[0.06] p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-glow" />
                        <div>
                          <p className="font-display text-sm font-semibold text-offwhite">
                            Location detected
                          </p>
                          <p className="mt-0.5 text-xs text-offwhite-muted">
                            Demo weather for {FARM_LOCATION} is ready below.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { icon: Sun, label: '28°C now' },
                          { icon: CloudSun, label: 'Partly cloudy' },
                          { icon: CloudRain, label: 'Rain Thu 80%' },
                        ].map((chip, i) => {
                          const Icon = chip.icon;
                          return (
                            <motion.span
                              key={chip.label}
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.15 + i * 0.1 }}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-offwhite-muted"
                            >
                              <Icon className="h-3.5 w-3.5 text-emerald-glow" />
                              {chip.label}
                            </motion.span>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Local weather zone visual */}
            <WeatherZone state={locationState} />
          </div>
        </section>

        {/* ============================ 02 — Current Conditions ============================ */}
        <section id="wstep-current" className="scroll-mt-32">
          <StepHeader
            step="02"
            title="Current Conditions"
            subtitle="A live snapshot of the simulated weather at your farm right now."
          />

          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className={`relative mt-6 overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-forest-700/50 via-forest-900/60 to-forest-950 p-6 backdrop-blur-sm transition-all duration-700 sm:p-8 ${
              detected ? 'opacity-100' : 'opacity-60 saturate-[0.7]'
            }`}
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-glow/[0.07] blur-[90px]" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center">
              {/* Main temperature */}
              <div className="flex items-center gap-6">
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                  className={`flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] ${CONDITION_COLORS[CURRENT_WEATHER.condition]}`}
                >
                  <ConditionIcon className="h-14 w-14" />
                </motion.span>
                <div>
                  <p className="font-display text-7xl font-bold tracking-tight text-offwhite sm:text-8xl">
                    {CURRENT_WEATHER.temp}°
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold uppercase tracking-widest text-emerald-glow">
                    {CURRENT_WEATHER.condition}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-offwhite-muted">
                    <ThermometerSun className="h-4 w-4 text-amber-glow" />
                    Feels like {CURRENT_WEATHER.feelsLike}°C
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <WeatherStat icon={Droplets} label="Humidity" value={`${CURRENT_WEATHER.humidity}%`} />
                <WeatherStat icon={Wind} label="Wind" value={`${CURRENT_WEATHER.wind} km/h`} sub={CURRENT_WEATHER.windDir} />
                <WeatherStat icon={Umbrella} label="Rain Probability" value={`${CURRENT_WEATHER.rain}%`} accent="rain" />
                <WeatherStat icon={Sunrise} label="Sunrise / Sunset" value={CURRENT_WEATHER.sunrise} sub={`↓ ${CURRENT_WEATHER.sunset}`} icon2={Sunset} />
              </div>
            </div>

            <p className="relative mt-6 flex items-center gap-1.5 text-[11px] text-offwhite-muted/50">
              <Info className="h-3 w-3" />
              Demonstration weather data — simulated for presentation.
            </p>
          </motion.div>
        </section>

        {/* ============================ 03 — Forecast ============================ */}
        <section id="wstep-forecast" className="scroll-mt-32">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StepHeader
              step="03"
              title="Forecast"
              subtitle="Simulated outlook with day cards and a weather trend chart."
            />
            <div className="flex gap-2">
              {(
                [
                  { id: 'today', label: 'Today' },
                  { id: 'tomorrow', label: 'Tomorrow' },
                  { id: '7days', label: '7 Days' },
                ] as const
              ).map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setForecastMode(mode.id)}
                  className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                    forecastMode === mode.id
                      ? 'border-emerald-glow/50 bg-emerald-glow/10 text-emerald-glow shadow-glow'
                      : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
                  }`}
                >
                  {mode.label.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={forecastMode}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {forecastMode === 'today' && <TodayCard day={FORECAST[0]} />}
                {forecastMode === 'tomorrow' && <TomorrowCard day={FORECAST[1]} />}
                {forecastMode === '7days' && <WeekStrip />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Weather chart */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="glass-card mt-6 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
                Weather Trend · 7 days
              </p>
              <div className="flex gap-2">
                {(
                  [
                    { id: 'temperature', label: 'Temperature' },
                    { id: 'rainfall', label: 'Rainfall' },
                    { id: 'humidity', label: 'Humidity' },
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMetric(m.id)}
                    className={`rounded-lg border px-3 py-1.5 text-[11px] font-bold transition-all ${
                      metric === m.id
                        ? 'border-emerald-glow/50 bg-emerald-glow/10 text-emerald-glow'
                        : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
                    }`}
                  >
                    {m.label.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <WeatherChart metric={metric} />
            </div>
          </motion.div>
        </section>

        {/* ============================ 04 — Farming Insights ============================ */}
        <section id="wstep-insights" className="scroll-mt-32">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StepHeader
              step="04"
              title="Farming Insights"
              subtitle="Simulated recommendations generated from the demo weather conditions."
            />
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-glow/30 bg-amber-glow/[0.07] px-3 py-1.5 text-xs font-medium text-amber-glow">
              DEMO AGRICULTURAL INSIGHTS
            </span>
          </div>

          {/* Insight cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {DEMO_INSIGHTS.map((insight, i) => {
              const Icon = INSIGHT_ICONS[insight.id] ?? Sparkles;
              const isWarning = insight.level === 'warning';
              return (
                <motion.div
                  key={insight.id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className={`glass-card flex items-start gap-4 p-5 ${
                    isWarning
                      ? 'border-amber-glow/40 bg-amber-glow/[0.05]'
                      : 'hover:border-emerald-glow/30 hover:bg-white/[0.05]'
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${
                      isWarning
                        ? 'bg-amber-glow/15 ring-amber-glow/30'
                        : 'bg-emerald-glow/10 ring-emerald-glow/20'
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${isWarning ? 'text-amber-glow' : 'text-emerald-glow'}`}
                    />
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-offwhite">
                      {insight.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-offwhite-muted">
                      {insight.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Crop-specific weather view */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-8">
            <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
              Crop-specific weather view
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {WEATHER_CROPS.map((c) => {
                const active = c.id === selectedCropId;
                return (
                  <motion.button
                    key={c.id}
                    onClick={() => setSelectedCropId(c.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                      active
                        ? 'border-emerald-glow/50 bg-emerald-glow/10 text-offwhite shadow-glow'
                        : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                    {c.name}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCropId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-4 rounded-2xl border border-emerald-glow/25 bg-gradient-to-br from-emerald-glow/[0.07] to-transparent p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-full ${selectedCrop.dot}`} />
                    <p className="font-display text-lg font-bold text-offwhite">
                      SELECTED CROP · {selectedCrop.name.toUpperCase()}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-offwhite-muted">
                    <Droplets className="h-3.5 w-3.5 text-sky-300" />
                    Simulated irrigation need:
                    <span className="font-bold text-offwhite">{selectedCrop.irrigation}</span>
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-offwhite-muted">
                  {selectedCrop.insight}
                </p>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-offwhite-muted/50">
                  <Info className="h-3 w-3" />
                  Demonstration insight — not professional or guaranteed agricultural advice.
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Bridge to soil */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-8 flex justify-center">
            <button
              onClick={onExploreSoil}
              className="group inline-flex items-center gap-2.5 rounded-xl border border-lime-glow/40 bg-gradient-to-r from-lime-glow/15 to-transparent px-6 py-3 text-sm font-bold text-lime-glow transition-all hover:border-lime-glow/70"
            >
              Continue to Soil Intelligence
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
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

function WeatherStat({
  icon: Icon,
  label,
  value,
  sub,
  accent,
  icon2: Icon2,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  accent?: 'rain';
  icon2?: LucideIcon;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
      <p className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-offwhite-muted/60">
        <Icon className={`h-3.5 w-3.5 ${accent === 'rain' ? 'text-sky-300' : 'text-emerald-glow'}`} />
        {label}
      </p>
      <p
        className={`mt-2 font-display text-lg font-bold sm:text-xl ${
          accent === 'rain' ? 'text-sky-300' : 'text-offwhite'
        }`}
      >
        {value}
      </p>
      {sub && (
        <p className="mt-0.5 flex items-center gap-1 text-xs text-offwhite-muted/70">
          {Icon2 && <Icon2 className="h-3 w-3 text-amber-glow" />}
          {sub}
        </p>
      )}
    </div>
  );
}

function DayDetails({ day, title }: { day: DayForecast; title: string }) {
  const Icon = CONDITION_ICONS[day.condition];
  return (
    <motion.div
      variants={staggerContainerFast}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
    >
      <div className="glass-card flex flex-col items-center justify-center gap-2 p-6 text-center">
        <span className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] ${CONDITION_COLORS[day.condition]}`}>
          <Icon className="h-9 w-9" />
        </span>
        <p className="font-display text-lg font-semibold text-offwhite">{title}</p>
        <p className="text-sm text-offwhite-muted">{day.condition}</p>
      </div>
      <motion.div variants={fadeUp} className="glass-card p-5 sm:col-span-2">
        <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">Simulated outlook</p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <WeatherStat icon={ThermometerSun} label="High" value={`${day.high}°C`} />
          <WeatherStat icon={ThermometerSun} label="Low" value={`${day.low}°C`} />
          <WeatherStat icon={Umbrella} label="Rain" value={`${day.rain}%`} accent="rain" />
          <WeatherStat icon={Wind} label="Wind" value={`${day.wind} km/h`} sub={day.windDir} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function TodayCard({ day }: { day: DayForecast }) {
  return (
    <div>
      <DayDetails day={day} title="Today" />
      <p className="mt-3 flex items-center gap-1.5 text-xs text-offwhite-muted/60">
        <Sparkles className="h-3.5 w-3.5 text-emerald-glow" />
        Simulated conditions for {day.label} — humidity {day.humidity}%, rain probability {day.rain}%.
      </p>
    </div>
  );
}

function TomorrowCard({ day }: { day: DayForecast }) {
  return (
    <div>
      <DayDetails day={day} title="Tomorrow" />
      <p className="mt-3 flex items-center gap-1.5 text-xs text-offwhite-muted/60">
        <Sparkles className="h-3.5 w-3.5 text-emerald-glow" />
        Simulated conditions for {day.label} — humidity {day.humidity}%, rain probability {day.rain}%.
      </p>
    </div>
  );
}

function WeekStrip() {
  return (
    <div className="-mx-1 overflow-x-auto px-1 pb-2 scrollbar-hide">
      <div className="flex min-w-max gap-3">
        {FORECAST.map((day, i) => {
          const Icon = CONDITION_ICONS[day.condition];
          return (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className={`glass-card flex w-32 shrink-0 flex-col items-center gap-2 p-4 text-center ${
                i === 0 ? 'border-emerald-glow/40' : ''
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-offwhite-muted/70">
                {day.label === 'Monday' ? 'Today' : day.day}
              </p>
              <Icon className={`h-7 w-7 ${CONDITION_COLORS[day.condition]}`} />
              <p className="font-display text-base font-bold text-offwhite">
                {day.high}°<span className="ml-1 text-xs font-medium text-offwhite-muted">{day.low}°</span>
              </p>
              <p className="flex items-center gap-1 text-xs text-sky-300">
                <Umbrella className="h-3 w-3" />
                {day.rain}%
              </p>
              <p className="flex items-center gap-1 text-xs text-offwhite-muted/70">
                <Droplets className="h-3 w-3" />
                {day.humidity}%
              </p>
              <p className="flex items-center gap-1 text-[11px] text-offwhite-muted/50">
                <Wind className="h-3 w-3" />
                {day.wind} km/h
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   Local weather zone visual
   ============================================================ */

const ZONE_SIZE = 300;
const ZONE_CENTER = ZONE_SIZE / 2;
const ZONE_RINGS = [38, 66, 90];

const ZONE_ELEMENTS = [
  { icon: Sun, label: 'Sunny', x: 150, y: 42, color: 'text-amber-glow' },
  { icon: CloudSun, label: 'Partial', x: 238, y: 96, color: 'text-emerald-glow' },
  { icon: CloudRain, label: 'Rain', x: 66, y: 210, color: 'text-sky-300' },
  { icon: Cloud, label: 'Overcast', x: 238, y: 220, color: 'text-offwhite-muted' },
];

function WeatherZone({ state }: { state: 'idle' | 'detecting' | 'detected' }) {
  const detected = state === 'detected';
  return (
    <div className="glass-card flex flex-col p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
          Local Weather Zone · {WEATHER_RADIUS_KM} km
        </p>
        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-offwhite-muted/50">
          <Info className="h-3 w-3" /> Illustrative demo
        </span>
      </div>

      <div className="relative mx-auto mt-4 w-full max-w-[300px]">
        <svg viewBox={`0 0 ${ZONE_SIZE} ${ZONE_SIZE}`} className="block w-full">
          <g stroke="rgba(255,255,255,0.04)">
            <line x1={ZONE_CENTER} y1={0} x2={ZONE_CENTER} y2={ZONE_SIZE} />
            <line x1={0} y1={ZONE_CENTER} x2={ZONE_SIZE} y2={ZONE_CENTER} />
          </g>
          {ZONE_RINGS.map((r) => (
            <circle
              key={r}
              cx={ZONE_CENTER}
              cy={ZONE_CENTER}
              r={r}
              fill="none"
              stroke="rgba(52,211,153,0.16)"
              strokeDasharray="4 6"
            />
          ))}
        </svg>

        {/* Radar sweep while detecting */}
        <AnimatePresence>
          {state === 'detecting' && (
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
                  background: 'conic-gradient(from 0deg, rgba(52,211,153,0.16), transparent 70deg)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Farm pin */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: '50%', top: '50%' }}
        >
          <motion.div
            animate={state === 'detecting' ? { scale: [1, 1.18, 1] } : { scale: [1, 1.05, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-glow/40 bg-forest-900/90 shadow-glow">
              <MapPin className="h-5 w-5 text-emerald-glow" />
            </span>
          </motion.div>
        </div>

        {/* Condition markers */}
        {ZONE_ELEMENTS.map((el, i) => {
          const Icon = el.icon;
          return (
            <div
              key={el.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(el.x / ZONE_SIZE) * 100}%`, top: `${(el.y / ZONE_SIZE) * 100}%` }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: detected ? 1 : 0.5, opacity: detected ? 1 : 0.3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.25 + i * 0.12 }}
                className="flex flex-col items-center gap-1"
              >
                <Icon className={`h-5 w-5 ${el.color}`} />
                <span className="rounded-md bg-forest-950/85 px-1.5 py-0.5 text-[9px] font-medium text-offwhite-muted">
                  {el.label}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs text-offwhite-muted/60">
        Simulated conditions sampled across the demo zone.
      </p>
    </div>
  );
}
