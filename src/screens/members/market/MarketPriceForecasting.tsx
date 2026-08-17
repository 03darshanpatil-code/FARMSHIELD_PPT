import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  LocateFixed,
  Radar,
  CheckCircle2,
  Info,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUpRight,
  ArrowRight,
  Store,
  Sparkles,
  Scale,
  Navigation,
} from 'lucide-react';
import { fadeUp, staggerContainerFast, scaleIn } from '@/lib/motion';
import {
  CROPS,
  MARKETS,
  MARKET_PRICES,
  SELLING_LOT_KG,
  buildForecast,
  formatPrice,
  getCropById,
  getPriceChange,
  getRecommendedMarket,
  getTrend,
  inr,
  type Market,
  type Trend,
} from './marketData';
import ForecastChart from './ForecastChart';
import MarketDetailsModal from './MarketDetailsModal';

interface MarketPriceForecastingProps {
  onExploreKrishiSetu: () => void;
}

const STEPS = [
  { id: 'location', label: 'Location' },
  { id: 'crop', label: 'Crop Selection' },
  { id: 'markets', label: 'Nearby Markets' },
  { id: 'compare', label: 'Price Comparison' },
  { id: 'forecast', label: 'Price Forecast' },
  { id: 'recommended', label: 'Recommended Market' },
];

const BAR_COLORS: Record<string, string> = {
  a: 'bg-emerald-glow/80',
  b: 'bg-lime-glow',
  c: 'bg-amber-glow/80',
};

export default function MarketPriceForecasting({
  onExploreKrishiSetu,
}: MarketPriceForecastingProps) {
  const [locationState, setLocationState] = useState<'idle' | 'detecting' | 'detected'>('idle');
  const [cropId, setCropId] = useState('tomato');
  const [period, setPeriod] = useState<7 | 14 | 30>(7);
  const [activeStep, setActiveStep] = useState('location');
  const [showMarketModal, setShowMarketModal] = useState(false);

  const detected = locationState === 'detected';
  const crop = getCropById(cropId);
  const recommended = getRecommendedMarket(cropId);
  const recPrice = MARKET_PRICES[cropId][recommended.id];
  const recSeries = buildForecast(cropId, recommended.id, period);
  const recTrend = getTrend(recSeries);
  const recChange = getPriceChange(recSeries);

  const handleDetect = () => {
    if (locationState === 'detecting') return;
    setLocationState('detecting');
    window.setTimeout(() => setLocationState('detected'), 1600);
  };

  /* Scroll-spy for the step strip */
  useEffect(() => {
    const els = STEPS.map((s) => document.getElementById(`step-${s.id}`)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveStep(entry.target.id.replace('step-', ''));
        });
      },
      { rootMargin: '-25% 0px -60% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToStep = (id: string) => {
    document.getElementById(`step-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const maxPrice = Math.max(...MARKETS.map((m) => MARKET_PRICES[cropId][m.id]));

  return (
    <div>
      {/* ============================ Step strip ============================ */}
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
                    ? 'border-amber-glow/50 bg-amber-glow/10 text-amber-glow'
                    : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
                }`}
              >
                <span
                  className={`font-display text-[11px] font-bold ${
                    active ? 'text-amber-glow' : 'text-offwhite-muted/50'
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
        <section id="step-location" className="scroll-mt-32">
          <StepHeader
            step="01"
            title="Location"
            subtitle="Detect your farm location to reveal nearby markets within your selling radius."
          />

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Detection card */}
            <div className="glass-card flex flex-col p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-glow/10 ring-1 ring-amber-glow/25">
                  <MapPin className="h-5 w-5 text-amber-glow" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
                    Current Farm Location
                  </p>
                  <p className="font-display text-base font-semibold text-offwhite">
                    Chikhali Road, Kolhapur
                  </p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] uppercase tracking-widest text-offwhite-muted/60">
                  Demo
                </span>
              </div>

              <p className="mt-4 flex items-center gap-2 text-sm text-offwhite-muted">
                <Navigation className="h-4 w-4 text-emerald-glow" />
                Market radius
                <span className="font-semibold text-offwhite">10 km</span>
                <span className="text-offwhite-muted/50">·</span>
                <span className="font-semibold text-offwhite">3 markets</span> in range
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
                        className="group inline-flex items-center gap-2.5 rounded-xl border border-amber-glow/40 bg-gradient-to-r from-amber-glow/25 to-amber-glow/10 px-6 py-3.5 text-sm font-bold text-amber-glow shadow-glow-amber transition-all hover:border-amber-glow/70 hover:shadow-[0_0_32px_-4px_rgba(245,185,66,0.5)]"
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
                      <RadarSpinner />
                      <div>
                        <p className="font-display text-sm font-semibold text-amber-glow">
                          Detecting location…
                        </p>
                        <p className="mt-0.5 text-xs text-offwhite-muted">
                          Scanning nearby markets within 10 km
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
                            3 markets found within 10 km of Chikhali Road, Kolhapur.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {MARKETS.map((m, i) => (
                          <motion.span
                            key={m.id}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 + i * 0.1 }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-offwhite-muted"
                          >
                            <Store className="h-3.5 w-3.5 text-amber-glow" />
                            {m.name} · {m.distanceKm} km
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Radius map */}
            <RadiusMap state={locationState} />
          </div>
        </section>

        {/* ============================ 02 — Crop Selection ============================ */}
        <section id="step-crop" className="scroll-mt-32">
          <StepHeader
            step="02"
            title="Crop Selection"
            subtitle="Pick the crop you plan to sell — market prices, trends, and forecasts update instantly."
          />

          <div className="mt-6 flex flex-wrap gap-2.5">
            {CROPS.map((c) => {
              const active = c.id === cropId;
              return (
                <motion.button
                  key={c.id}
                  onClick={() => setCropId(c.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? 'border-amber-glow/50 bg-amber-glow/10 text-offwhite shadow-glow-amber'
                      : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                  {c.name}
                  {active && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-glow">
                      · selected
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={cropId}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.3 }}
              className="mt-4 inline-flex items-center gap-2 text-sm text-offwhite-muted"
            >
              <Sparkles className="h-4 w-4 text-lime-glow" />
              Showing demo market data for{' '}
              <span className="font-semibold text-offwhite">{crop.name}</span> — best price
              <span className="font-semibold text-lime-glow">
                ₹{formatPrice(maxPrice)}/kg
              </span>
            </motion.p>
          </AnimatePresence>
        </section>

        {/* ============================ 03 — Nearby Markets ============================ */}
        <section id="step-markets" className="scroll-mt-32">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StepHeader
              step="03"
              title="Nearby Markets"
              subtitle="Live snapshot of markets within your 10 km demo radius."
            />
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                detected
                  ? 'border-emerald-glow/30 bg-emerald-glow/[0.08] text-emerald-glow'
                  : 'border-amber-glow/30 bg-amber-glow/[0.06] text-amber-glow'
              }`}
            >
              <Radar className="h-3.5 w-3.5" />
              {detected ? '3 markets found' : 'Location pending'}
            </span>
          </div>

          <div
            className={`mt-6 grid grid-cols-1 gap-4 transition-all duration-700 sm:grid-cols-2 lg:grid-cols-3 ${
              detected ? 'opacity-100' : 'opacity-50 saturate-[0.7]'
            }`}
          >
            {MARKETS.map((m, i) => (
              <MarketCard
                key={m.id}
                market={m}
                cropId={cropId}
                isBest={MARKET_PRICES[cropId][m.id] === maxPrice}
                index={i}
              />
            ))}
          </div>
          {!detected && (
            <p className="mt-3 flex items-center gap-1.5 text-xs text-offwhite-muted/60">
              <Info className="h-3.5 w-3.5" />
              Markets are dimmed until you detect your demo farm location.
            </p>
          )}
        </section>

        {/* ============================ 04 — Price Comparison ============================ */}
        <section id="step-compare" className="scroll-mt-32">
          <StepHeader
            step="04"
            title="Price Comparison"
            subtitle="Compare current simulated prices and selling value across nearby markets."
          />

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-5">
            {/* Bar chart */}
            <motion.div
              key={cropId}
              variants={staggerContainerFast}
              initial="hidden"
              animate="visible"
              className="glass-card p-6 lg:col-span-2"
            >
              <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
                Price ladder · {crop.name}
              </p>
              <div className="mt-5 space-y-5">
                {MARKETS.map((m) => {
                  const p = MARKET_PRICES[cropId][m.id];
                  const isBest = p === maxPrice;
                  return (
                    <div key={m.id}>
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-offwhite-muted">
                          {m.name}
                          {isBest && (
                            <span className="rounded-md border border-lime-glow/30 bg-lime-glow/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-lime-glow">
                              Highest
                            </span>
                          )}
                        </span>
                        <span className="font-display font-semibold text-offwhite">
                          ₹{formatPrice(p)}/kg
                        </span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.05]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(p / maxPrice) * 100}%` }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className={`h-full rounded-full ${BAR_COLORS[m.id]}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 flex items-center gap-1.5 text-[11px] text-offwhite-muted/50">
                <Info className="h-3 w-3" />
                Demonstration values — change the crop to see prices update.
              </p>
            </motion.div>

            {/* Market comparison cards */}
            <motion.div
              key={`cards-${cropId}`}
              variants={staggerContainerFast}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-3"
            >
              {MARKETS.map((m) => {
                const p = MARKET_PRICES[cropId][m.id];
                const isBest = p === maxPrice;
                const series = buildForecast(cropId, m.id, 7);
                const trend = getTrend(series);
                const change = getPriceChange(series);
                return (
                  <motion.div
                    key={m.id}
                    variants={fadeUp}
                    whileHover={{ y: -5 }}
                    className={`relative flex flex-col rounded-2xl border p-5 backdrop-blur-sm transition-all duration-300 ${
                      isBest
                        ? 'border-lime-glow/40 bg-gradient-to-b from-lime-glow/[0.08] to-transparent shadow-glow'
                        : 'border-white/[0.08] bg-white/[0.03] hover:border-white/20'
                    }`}
                  >
                    {isBest && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.2 }}
                        className="absolute -top-2.5 right-4 rounded-lg border border-lime-glow/40 bg-forest-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-lime-glow"
                      >
                        Highest Price
                      </motion.span>
                    )}
                    <div className="flex items-center justify-between">
                      <p className="font-display text-sm font-semibold text-offwhite">
                        {m.name}
                      </p>
                      <span className="text-xs text-offwhite-muted/60">{m.distanceKm} km</span>
                    </div>
                    <p className="mt-3 font-display text-2xl font-bold text-offwhite">
                      ₹{formatPrice(p)}
                      <span className="ml-1 text-sm font-medium text-offwhite-muted">/ kg</span>
                    </p>
                    <div className="mt-2">
                      <TrendBadge trend={trend} change={change} />
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
                      <span className="flex items-center gap-1.5 text-xs text-offwhite-muted">
                        <Scale className="h-3.5 w-3.5 text-amber-glow" />
                        {SELLING_LOT_KG} kg lot
                      </span>
                      <span className="font-display text-sm font-bold text-lime-glow">
                        {inr(p * SELLING_LOT_KG)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ============================ 05 — Price Forecast ============================ */}
        <section id="step-forecast" className="scroll-mt-32">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StepHeader
              step="05"
              title="Price Forecast"
              subtitle="Simulated forward trend for the next 7–30 days across nearby markets."
            />
            <div className="flex gap-2">
              {([7, 14, 30] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setPeriod(d)}
                  className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                    period === d
                      ? 'border-amber-glow/50 bg-amber-glow/10 text-amber-glow shadow-glow-amber'
                      : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
                  }`}
                >
                  {d} DAYS
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* Stat tiles */}
            <div className="grid grid-cols-2 gap-4 lg:col-span-1 lg:grid-cols-1">
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="glass-card p-5"
              >
                <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
                  Current Price · {crop.name}
                </p>
                <p className="mt-2 font-display text-3xl font-bold text-offwhite">
                  ₹{formatPrice(recPrice)}
                  <span className="ml-1 text-sm font-medium text-offwhite-muted">/ kg</span>
                </p>
                <p className="mt-1.5 text-xs text-offwhite-muted/60">
                  at {recommended.name}
                </p>
              </motion.div>

              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.08 }}
                className="glass-card p-5"
              >
                <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
                  Forecast Trend · {period} days
                </p>
                <p className="mt-2 font-display text-3xl font-bold text-offwhite">
                  ₹{formatPrice(recSeries[recSeries.length - 1].price)}
                  <span className="ml-1 text-sm font-medium text-offwhite-muted">/ kg</span>
                </p>
                <div className="mt-1.5">
                  <TrendBadge trend={recTrend} change={recChange} />
                </div>
              </motion.div>

              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 lg:col-span-1">
                <p className="flex items-start gap-2 text-[11px] leading-relaxed text-offwhite-muted/70">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-glow" />
                  DEMO FORECAST — simulated trends for presentation only, not real
                  market predictions.
                </p>
              </div>
            </div>

            {/* Chart */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="glass-card p-5 sm:p-6 lg:col-span-2"
            >
              <ForecastChart cropId={cropId} period={period} />
            </motion.div>
          </div>
        </section>

        {/* ============================ 06 — Recommended Market ============================ */}
        <section id="step-recommended" className="scroll-mt-32">
          <StepHeader
            step="06"
            title="Recommended Market"
            subtitle="FarmShield's pick for the best simulated selling outcome right now."
          />

          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative mt-6 overflow-hidden rounded-2xl border border-amber-glow/30 bg-gradient-to-br from-amber-glow/[0.12] via-forest-700/40 to-forest-900/60 p-6 shadow-glow-amber sm:p-8"
          >
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber-glow/10 blur-[80px]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <motion.span
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-glow/15 ring-1 ring-amber-glow/30"
                >
                  <Store className="h-7 w-7 text-amber-glow" />
                </motion.span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-amber-glow">
                    Recommended Market
                  </p>
                  <h4 className="mt-1 font-display text-2xl font-bold text-offwhite sm:text-3xl">
                    {recommended.name}
                  </h4>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-offwhite-muted">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-emerald-glow" />
                      {recommended.distanceKm} km
                    </span>
                    <span className="font-display text-lg font-bold text-lime-glow">
                      ₹{formatPrice(recPrice)}/kg
                    </span>
                    <TrendBadge trend={recTrend} change={recChange} />
                  </div>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-offwhite-muted">
                    {recommended.reason}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowMarketModal(true)}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-amber-glow/50 bg-gradient-to-r from-amber-glow/30 to-amber-glow/15 px-7 py-3.5 text-sm font-bold text-amber-glow transition-all hover:border-amber-glow/80 hover:shadow-[0_0_32px_-4px_rgba(245,185,66,0.5)]"
                >
                  VIEW MARKET
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.button>
                <button
                  onClick={onExploreKrishiSetu}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3 text-sm font-medium text-offwhite-muted transition-all hover:border-lime-glow/40 hover:text-lime-glow"
                >
                  Explore Krishi Setu
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      <MarketDetailsModal
        open={showMarketModal}
        onClose={() => setShowMarketModal(false)}
        market={recommended}
        crop={crop}
        period={period}
      />
    </div>
  );
}

/* ============================================================
   Sub-components
   ============================================================ */

function StepHeader({ step, title, subtitle }: { step: string; title: string; subtitle: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex items-start gap-4"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-glow/10 font-display text-sm font-bold text-amber-glow ring-1 ring-amber-glow/25">
        {step}
      </span>
      <div>
        <h3 className="font-display text-xl font-semibold text-offwhite sm:text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-offwhite-muted">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function TrendBadge({ trend, change }: { trend: Trend; change: number }) {
  const Icon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const cls =
    trend === 'up'
      ? 'border-emerald-glow/30 bg-emerald-glow/[0.08] text-emerald-glow'
      : trend === 'down'
        ? 'border-amber-glow/30 bg-amber-glow/[0.08] text-amber-glow'
        : 'border-white/10 bg-white/[0.04] text-offwhite-muted';
  return (
    <span className={`inline-flex items-center gap-1 rounded-lg border px-2 py-0.5 text-xs font-semibold ${cls}`}>
      <Icon className="h-3.5 w-3.5" />
      {change > 0 ? '+' : ''}
      {change}%
    </span>
  );
}

function MarketCard({
  market,
  cropId,
  isBest,
  index,
}: {
  market: Market;
  cropId: string;
  isBest: boolean;
  index: number;
}) {
  const price = MARKET_PRICES[cropId][market.id];
  const series = buildForecast(cropId, market.id, 7);
  const trend = getTrend(series);
  const change = getPriceChange(series);
  const crop = getCropById(cropId);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border p-5 backdrop-blur-sm transition-all duration-300 ${
        isBest
          ? 'border-lime-glow/30 bg-gradient-to-b from-lime-glow/[0.06] to-transparent'
          : 'border-white/[0.08] bg-white/[0.03] hover:border-white/20'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-base font-semibold text-offwhite">{market.name}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-offwhite-muted">
            <MapPin className="h-3 w-3 text-emerald-glow" />
            {market.distanceKm} km from farm
          </p>
        </div>
        <span
          className={`shrink-0 rounded-lg border px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
            market.status === 'Open'
              ? 'border-emerald-glow/30 bg-emerald-glow/[0.08] text-emerald-glow'
              : 'border-amber-glow/30 bg-amber-glow/[0.08] text-amber-glow'
          }`}
        >
          {market.status}
        </span>
      </div>

      <p className="mt-4 font-display text-3xl font-bold text-offwhite">
        ₹{formatPrice(price)}
        <span className="ml-1 text-sm font-medium text-offwhite-muted">/ {crop.unit}</span>
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-0.5 text-xs text-offwhite-muted">
          <span className={`h-1.5 w-1.5 rounded-full ${crop.dot}`} />
          {crop.name}
        </span>
        <TrendBadge trend={trend} change={change} />
        {isBest && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-lime-glow">
            Best price
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs text-offwhite-muted/60">
        <span>Simulated · within 10 km radius</span>
        <span className="font-display text-xs font-bold text-amber-glow">MARKET {market.id.toUpperCase()}</span>
      </div>
    </motion.div>
  );
}

function RadarSpinner() {
  return (
    <div className="relative h-12 w-12 shrink-0">
      <motion.span
        className="absolute inset-0 rounded-full border border-amber-glow/30"
        animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.span
        className="absolute inset-0 rounded-full border border-amber-glow/20"
        animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
      />
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-dashed border-amber-glow/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
      />
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, rgba(245,185,66,0.22), transparent 70deg)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="h-2 w-2 rounded-full bg-amber-glow" />
      </span>
    </div>
  );
}

const MAP_SIZE = 320;
const MAP_CENTER = MAP_SIZE / 2;
const MAP_RADIUS_5 = 46;
const MAP_RADIUS_10 = 82;
const MAX_RADIUS_KM = 10;

const MARKER_ANGLES: Record<string, number> = { a: 30, b: 150, c: 265 };

function RadiusMap({ state }: { state: 'idle' | 'detecting' | 'detected' }) {
  const detected = state === 'detected';

  const markers = MARKETS.map((m) => {
    const r = (m.distanceKm / MAX_RADIUS_KM) * MAP_RADIUS_10;
    const angle = (MARKER_ANGLES[m.id] * Math.PI) / 180;
    return {
      market: m,
      x: MAP_CENTER + r * Math.cos(angle),
      y: MAP_CENTER + r * Math.sin(angle),
    };
  });

  return (
    <div className="glass-card flex flex-col p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
          Market Radius · 10 km
        </p>
        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-offwhite-muted/50">
          <Info className="h-3 w-3" /> Illustrative demo map
        </span>
      </div>

      <div className="relative mx-auto mt-4 w-full max-w-[320px]">
        <svg viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`} className="block w-full">
          {/* Grid */}
          <g stroke="rgba(255,255,255,0.04)">
            <line x1={MAP_CENTER} y1={0} x2={MAP_CENTER} y2={MAP_SIZE} />
            <line x1={0} y1={MAP_CENTER} x2={MAP_SIZE} y2={MAP_CENTER} />
          </g>
          {/* Radius rings */}
          <circle
            cx={MAP_CENTER}
            cy={MAP_CENTER}
            r={MAP_RADIUS_5}
            fill="none"
            stroke="rgba(52,211,153,0.18)"
            strokeDasharray="4 6"
          />
          <circle
            cx={MAP_CENTER}
            cy={MAP_CENTER}
            r={MAP_RADIUS_10}
            fill="none"
            stroke="rgba(52,211,153,0.28)"
            strokeDasharray="4 6"
          />
          <circle
            cx={MAP_CENTER}
            cy={MAP_CENTER}
            r={MAP_RADIUS_10}
            fill="rgba(52,211,153,0.04)"
          />
          {/* Connector lines to markers */}
          {markers.map((mk) => (
            <motion.line
              key={`line-${mk.market.id}`}
              x1={MAP_CENTER}
              y1={MAP_CENTER}
              x2={mk.x}
              y2={mk.y}
              stroke="rgba(245,185,66,0.35)"
              strokeDasharray="3 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: detected ? 1 : 0.4 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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
                  background:
                    'conic-gradient(from 0deg, rgba(52,211,153,0.18), transparent 70deg)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Farm pin */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(MAP_CENTER / MAP_SIZE) * 100}%`, top: `${(MAP_CENTER / MAP_SIZE) * 100}%` }}
        >
          <motion.div
            animate={
              state === 'detecting'
                ? { scale: [1, 1.2, 1] }
                : { scale: [1, 1.06, 1] }
            }
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-glow/40 bg-forest-900/90 shadow-glow">
              <MapPin className="h-5 w-5 text-emerald-glow" />
            </span>
          </motion.div>
        </div>

        {/* Market markers */}
        {markers.map((mk, i) => (
          <div
            key={mk.market.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(mk.x / MAP_SIZE) * 100}%`,
              top: `${(mk.y / MAP_SIZE) * 100}%`,
            }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: detected ? 1 : 0.6, opacity: detected ? 1 : 0.35 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.3 + i * 0.12 }}
              className="flex flex-col items-center gap-1"
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold ${
                  i === 0
                    ? 'border-emerald-glow/50 bg-emerald-glow/20 text-emerald-glow'
                    : i === 1
                      ? 'border-lime-glow/50 bg-lime-glow/20 text-lime-glow'
                      : 'border-amber-glow/50 bg-amber-glow/20 text-amber-glow'
                }`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="rounded-md bg-forest-950/85 px-1.5 py-0.5 text-[9px] font-medium text-offwhite-muted">
                {mk.market.distanceKm} km
              </span>
            </motion.div>
          </div>
        ))}

        {/* Ring labels */}
        <span className="absolute left-[8%] top-[38%] text-[9px] uppercase tracking-widest text-emerald-glow/50">
          5 km
        </span>
        <span className="absolute left-[2%] top-[16%] text-[9px] uppercase tracking-widest text-emerald-glow/60">
          10 km
        </span>
      </div>

      <p className="mt-4 text-center text-xs text-offwhite-muted/60">
        A · Gandhinagar APMC — B · Urali Devachi — C · Hadapsar Mandi
      </p>
    </div>
  );
}
