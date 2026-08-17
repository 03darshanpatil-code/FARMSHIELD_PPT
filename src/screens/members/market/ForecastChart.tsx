import { motion } from 'framer-motion';
import { useContainerWidth } from '@/lib/useContainerWidth';
import {
  MARKETS,
  buildForecast,
  formatPrice,
  inr,
  type Market,
} from './marketData';

interface ForecastChartProps {
  cropId: string;
  period: number;
  markets?: Market[];
}

const SERIES_COLORS: Record<string, string> = {
  a: '#34d399',
  b: '#a3e635',
  c: '#f5b942',
};

const CHART_H = 240;
const PAD = { top: 18, right: 12, bottom: 12, left: 12 };

/**
 * Animated multi-market demo forecast. Lines re-draw whenever the crop or
 * period changes; labels are rendered in HTML so they stay crisp on mobile.
 */
export default function ForecastChart({ cropId, period, markets = MARKETS }: ForecastChartProps) {
  const [wrapRef, width] = useContainerWidth<HTMLDivElement>();
  const W = Math.max(width, 320);

  const allSeries = markets.map((m) => ({ market: m, series: buildForecast(cropId, m.id, period) }));
  const prices = allSeries.flatMap((s) => s.series.map((p) => p.price));
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const range = maxP - minP || 1;

  const x = (day: number) => PAD.left + (day / period) * (W - PAD.left - PAD.right);
  const y = (price: number) => PAD.top + (1 - (price - minP) / range) * (CHART_H - PAD.top - PAD.bottom);

  const linePath = (series: { day: number; price: number }[]) =>
    series.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.day)} ${y(p.price)}`).join(' ');

  const areaPath = (series: { day: number; price: number }[]) =>
    `${linePath(series)} L ${x(period)} ${CHART_H - PAD.bottom} L ${x(0)} ${CHART_H - PAD.bottom} Z`;

  const gridPrices = [minP, (minP + maxP) / 2, maxP];

  return (
    <div ref={wrapRef} className="w-full">
      <div className="relative w-full">
        {/* Grid + lines */}
        <svg
          width={W}
          height={CHART_H}
          viewBox={`0 0 ${W} ${CHART_H}`}
          className="block w-full"
          role="img"
          aria-label={`Demo price forecast chart for ${period} days`}
        >
          {/* Horizontal gridlines */}
          {gridPrices.map((p) => (
            <line
              key={p}
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(p)}
              y2={y(p)}
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="3 6"
            />
          ))}

          {allSeries.map(({ market, series }, idx) => {
            const color = SERIES_COLORS[market.id];
            const last = series[series.length - 1];
            return (
              <g key={`${cropId}-${period}-${market.id}`}>
                <motion.path
                  d={areaPath(series)}
                  fill={color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.07 }}
                  transition={{ duration: 0.8, delay: 0.5 + idx * 0.15 }}
                />
                <motion.path
                  d={linePath(series)}
                  fill="none"
                  stroke={color}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: idx * 0.18 }}
                />
                {/* End-point dot */}
                <motion.circle
                  cx={x(last.day)}
                  cy={y(last.price)}
                  r={4}
                  fill={color}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9 + idx * 0.18, type: 'spring', stiffness: 300, damping: 18 }}
                />
              </g>
            );
          })}
        </svg>

        {/* End-point price labels (HTML, crisp on all screens) */}
        {allSeries.map(({ market, series }, idx) => {
          const last = series[series.length - 1];
          const color = SERIES_COLORS[market.id];
          const labelLeft = Math.min((x(last.day) / W) * 100, 96);
          const labelTop = Math.max((y(last.price) / CHART_H) * 100, 4);
          return (
            <motion.span
              key={`label-${cropId}-${period}-${market.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + idx * 0.18, duration: 0.4 }}
              className="pointer-events-none absolute rounded-md border border-white/10 bg-forest-950/90 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums sm:text-xs"
              style={{
                left: `${labelLeft}%`,
                top: `${labelTop}%`,
                color,
                transform: `translate(${labelLeft > 88 ? '-100%' : '-50%'}, -50%)`,
              }}
            >
              {inr(last.price)}
            </motion.span>
          );
        })}

        {/* DEMO FORECAST badge */}
        <span className="pointer-events-none absolute right-2 top-2 rounded-md border border-amber-glow/30 bg-amber-glow/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-glow">
          Demo Forecast
        </span>
      </div>

      {/* X-axis labels */}
      <div className="mt-2 flex items-center justify-between px-1 text-[10px] uppercase tracking-widest text-offwhite-muted/60 sm:text-xs">
        <span>Today</span>
        <span>Day {Math.round(period / 2)}</span>
        <span>Day {period}</span>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {markets.map((m) => (
          <span
            key={m.id}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-offwhite-muted"
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: SERIES_COLORS[m.id] }} />
            {m.name}
          </span>
        ))}
        <span className="inline-flex items-center gap-1 text-[11px] text-offwhite-muted/50">
          · forecast ₹{formatPrice(maxP)}–{formatPrice(minP)} / kg range
        </span>
      </div>
    </div>
  );
}
