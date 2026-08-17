import { motion } from 'framer-motion';
import { useContainerWidth } from '@/lib/useContainerWidth';
import { CHART_SERIES, FORECAST, type ChartMetric } from './weatherData';

const METRIC_COLORS: Record<ChartMetric, string> = {
  temperature: '#f5b942',
  rainfall: '#7dd3fc',
  humidity: '#34d399',
};

const METRIC_UNITS: Record<ChartMetric, string> = {
  temperature: '°C',
  rainfall: '%',
  humidity: '%',
};

interface WeatherChartProps {
  metric: ChartMetric;
}

const CHART_H = 240;
const PAD = { top: 18, right: 12, bottom: 12, left: 12 };

export default function WeatherChart({ metric }: WeatherChartProps) {
  const [wrapRef, width] = useContainerWidth<HTMLDivElement>();
  const W = Math.max(width, 320);

  const series = CHART_SERIES[metric];
  const color = METRIC_COLORS[metric];
  const unit = METRIC_UNITS[metric];

  const minV = Math.min(...series);
  const maxV = Math.max(...series);
  const range = maxV - minV || 1;
  const n = series.length;

  const x = (i: number) => PAD.left + (i / (n - 1)) * (W - PAD.left - PAD.right);
  const y = (v: number) => PAD.top + (1 - (v - minV) / range) * (CHART_H - PAD.top - PAD.bottom);

  const linePath = series.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ');
  const areaPath = `${linePath} L ${x(n - 1)} ${CHART_H - PAD.bottom} L ${x(0)} ${CHART_H - PAD.bottom} Z`;

  return (
    <div ref={wrapRef} className="w-full">
      <div className="relative w-full">
        <svg
          width={W}
          height={CHART_H}
          viewBox={`0 0 ${W} ${CHART_H}`}
          className="block w-full"
          role="img"
          aria-label={`Demo weather chart — ${metric}`}
        >
          {/* Gridlines */}
          {[0, 0.5, 1].map((f) => {
            const v = minV + f * range;
            return (
              <line
                key={f}
                x1={PAD.left}
                x2={W - PAD.right}
                y1={y(v)}
                y2={y(v)}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="3 6"
              />
            );
          })}

          <g key={metric}>
            <motion.path
              d={areaPath}
              fill={color}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.09 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            />
            <motion.path
              d={linePath}
              fill="none"
              stroke={color}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
            {series.map((v, i) => (
              <motion.circle
                key={`${metric}-${i}`}
                cx={x(i)}
                cy={y(v)}
                r={4}
                fill={color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.08, type: 'spring', stiffness: 300, damping: 18 }}
              />
            ))}
          </g>
        </svg>

        {/* DEMO WEATHER DATA badge */}
        <span className="pointer-events-none absolute right-2 top-2 rounded-md border border-amber-glow/30 bg-amber-glow/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-glow">
          Demo Weather Data
        </span>
      </div>

      {/* X-axis labels */}
      <div className="mt-2 flex items-center justify-between px-1 text-[10px] uppercase tracking-widest text-offwhite-muted/60 sm:text-xs">
        {FORECAST.map((d) => (
          <span key={d.day}>{d.day}</span>
        ))}
      </div>

      {/* Legend + range */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-offwhite-muted">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
          {metric[0].toUpperCase()}{metric.slice(1)} {unit}
        </span>
        <span className="text-[11px] text-offwhite-muted/50">
          · range {Math.min(...series)}–{Math.max(...series)} {unit}
        </span>
      </div>
    </div>
  );
}
