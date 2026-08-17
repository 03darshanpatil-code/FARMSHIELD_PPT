import { motion } from 'framer-motion';
import {
  Home,
  Boxes,
  Factory,
  Store,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react';
import { TRACE_STOPS, type TraceStop } from './harvestData';

const STOP_ICONS: Record<string, LucideIcon> = {
  farm: Home,
  collection: Boxes,
  processing: Factory,
  market: Store,
  consumer: ShoppingCart,
};

const VB_W = 800;
const VB_H = 220;
const Y = VB_H / 2;

const xPx = (stop: TraceStop) => (stop.x / 100) * VB_W;

export default function TraceabilityMap() {
  return (
    <div className="relative mx-auto aspect-[40/11] w-full max-w-[760px]">
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full">
        {/* Connectors */}
        {TRACE_STOPS.slice(0, -1).map((stop, i) => {
          const next = TRACE_STOPS[i + 1];
          return (
            <g key={`${stop.id}-${next.id}`}>
              <motion.line
                x1={xPx(stop)}
                y1={Y}
                x2={xPx(next)}
                y2={Y}
                stroke="rgba(163,230,53,0.4)"
                strokeWidth={2}
                strokeDasharray="6 8"
                animate={{ strokeDashoffset: [0, -28] }}
                transition={{ duration: 1.6 + i * 0.2, repeat: Infinity, ease: 'linear' }}
              />
              {/* Travelling data dot */}
              <motion.circle
                r={4}
                fill="#a3e635"
                animate={{
                  cx: [xPx(stop), xPx(next), xPx(stop)],
                  cy: [Y, Y, Y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.8 + i * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
              />
            </g>
          );
        })}

        {/* Base line */}
        <line x1={xPx(TRACE_STOPS[0])} y1={Y} x2={xPx(TRACE_STOPS[4])} y2={Y} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
      </svg>

      {/* Nodes */}
      {TRACE_STOPS.map((stop, i) => {
        const Icon = STOP_ICONS[stop.id];
        const isEnd = i === TRACE_STOPS.length - 1;
        return (
          <div
            key={stop.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 260, damping: 18 }}
              className="flex flex-col items-center gap-1.5"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl border bg-forest-950/90 shadow-soft backdrop-blur-sm sm:h-14 sm:w-14 ${
                  isEnd
                    ? 'border-lime-glow/60 text-lime-glow shadow-glow'
                    : 'border-emerald-glow/40 text-emerald-glow'
                }`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <span className="rounded-md border border-white/10 bg-forest-950/90 px-2 py-0.5 font-display text-[9px] font-bold tracking-widest text-offwhite sm:text-[10px]">
                {stop.label}
              </span>
              <span className="max-w-[92px] text-center text-[8px] leading-tight text-offwhite-muted/60 sm:text-[9px]">
                {stop.sub}
              </span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
