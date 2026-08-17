import { motion } from 'framer-motion';
import {
  Users,
  HardHat,
  Tractor,
  Package,
  Sprout,
  ArrowRight,
  Network,
  type LucideIcon,
} from 'lucide-react';
import { fadeUp, staggerContainerFast, scaleIn } from '@/lib/motion';
import { EQUIPMENT, FARMERS, WORKERS } from './data';
import { SectionHeading } from './ui';

interface NetworkSectionProps {
  connectedFarmers: string[];
  hiredWorkers: string[];
  bookedEquipment: string[];
  onExploreMarket: () => void;
}

const VB_W = 520;
const VB_H = 400;

const CENTER = { x: VB_W / 2, y: VB_H / 2 };

interface NodeSpec {
  id: string;
  label: string;
  sub: string;
  icon: LucideIcon;
  x: number;
  y: number;
  color: string;
  chip: string;
}

const NODES: NodeSpec[] = [
  {
    id: 'farmers',
    label: 'OTHER FARMERS',
    sub: '24 nearby',
    icon: Users,
    x: 110,
    y: 105,
    color: '#34d399',
    chip: 'border-emerald-glow/40 bg-emerald-glow/[0.08] text-emerald-glow',
  },
  {
    id: 'labour',
    label: 'LABOUR',
    sub: '18 available',
    icon: HardHat,
    x: 410,
    y: 105,
    color: '#a3e635',
    chip: 'border-lime-glow/40 bg-lime-glow/[0.08] text-lime-glow',
  },
  {
    id: 'equipment',
    label: 'EQUIPMENT',
    sub: '12 rentals',
    icon: Tractor,
    x: 110,
    y: 295,
    color: '#f5b942',
    chip: 'border-amber-glow/40 bg-amber-glow/[0.08] text-amber-glow',
  },
  {
    id: 'resources',
    label: 'AGRICULTURAL RESOURCES',
    sub: '8 services',
    icon: Package,
    x: 410,
    y: 295,
    color: '#f5b942',
    chip: 'border-amber-glow/40 bg-amber-glow/[0.08] text-amber-glow',
  },
];

const pct = (v: number, total: number) => (v / total) * 100;

export default function NetworkSection({
  connectedFarmers,
  hiredWorkers,
  bookedEquipment,
  onExploreMarket,
}: NetworkSectionProps) {
  const stats = [
    { icon: Users, label: 'Farmers connected', count: connectedFarmers.length, total: FARMERS.length },
    { icon: HardHat, label: 'Labour hired', count: hiredWorkers.length, total: WORKERS.length },
    { icon: Tractor, label: 'Equipment booked', count: bookedEquipment.length, total: EQUIPMENT.length },
  ];
  const hasActivity = connectedFarmers.length + hiredWorkers.length + bookedEquipment.length > 0;

  return (
    <motion.div variants={staggerContainerFast} initial="hidden" animate="visible">
      <SectionHeading
        title="My Network"
        subtitle="Watch your demo connections come alive — every action you took is reflected here."
        badge="Live demo"
      />

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-5">
        {/* Diagram */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="glass-card p-4 sm:p-6 lg:col-span-3"
        >
          <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-offwhite-muted/60">
            <Network className="h-3.5 w-3.5 text-amber-glow" />
            Krishi Setu network · demo visualization
          </p>

          <div className="relative mx-auto mt-2 aspect-[13/10] w-full max-w-[520px]">
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full">
              {/* Connection lines */}
              {NODES.map((node, i) => (
                <g key={node.id}>
                  <motion.line
                    x1={CENTER.x}
                    y1={CENTER.y}
                    x2={node.x}
                    y2={node.y}
                    stroke={node.color}
                    strokeOpacity={0.35}
                    strokeWidth={1.5}
                    strokeDasharray="5 7"
                    animate={{ strokeDashoffset: [0, -24] }}
                    transition={{ duration: 1.4 + i * 0.25, repeat: Infinity, ease: 'linear' }}
                  />
                  {/* Travelling data dot */}
                  <motion.circle
                    r={3}
                    fill={node.color}
                    animate={{
                      cx: [CENTER.x, node.x, CENTER.x],
                      cy: [CENTER.y, node.y, CENTER.y],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3.2 + i * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.6,
                    }}
                  />
                </g>
              ))}

              {/* Central pulse rings */}
              <motion.circle
                cx={CENTER.x}
                cy={CENTER.y}
                r={34}
                fill="none"
                stroke="#34d399"
                strokeOpacity={0.35}
                strokeWidth={1}
                animate={{ r: [34, 60], opacity: [0.35, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
              />
            </svg>

            {/* Central node */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pct(CENTER.x, VB_W)}%`, top: `${pct(CENTER.y, VB_H)}%` }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-1.5"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-glow/50 bg-gradient-to-br from-forest-600 to-forest-900 shadow-glow">
                  <Sprout className="h-8 w-8 text-emerald-glow" />
                </span>
                <span className="rounded-lg border border-emerald-glow/30 bg-forest-950/90 px-2.5 py-1 font-display text-xs font-bold tracking-widest text-offwhite">
                  FARMER
                </span>
                <span className="text-[10px] uppercase tracking-widest text-offwhite-muted/60">
                  You
                </span>
              </motion.div>
            </div>

            {/* Satellite nodes */}
            {NODES.map((node) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${pct(node.x, VB_W)}%`, top: `${pct(node.y, VB_H)}%` }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 18 }}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span className={`flex h-12 w-12 items-center justify-center rounded-xl border bg-forest-950/90 backdrop-blur-sm ${node.chip}`}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="max-w-[110px] text-center font-display text-[10px] font-bold leading-tight tracking-wider text-offwhite">
                      {node.label}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-offwhite-muted/60">
                      {node.sub}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <p className="mt-2 text-center text-[11px] text-offwhite-muted/50">
            Animated lines show live demo connections moving between the farmer and the ecosystem.
          </p>
        </motion.div>

        {/* Live activity panel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm lg:col-span-2"
        >
          <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
            Your demo network
          </p>

          <div className="mt-4 space-y-4">
            {stats.map((s) => {
              const Icon = s.icon;
              const width = pct(s.count, s.total);
              return (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-offwhite-muted">
                      <Icon className="h-4 w-4 text-amber-glow" />
                      {s.label}
                    </span>
                    <span className="font-display font-bold text-offwhite">
                      {s.count}
                      <span className="text-offwhite-muted/50"> / {s.total}</span>
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.05]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${width}%` }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-glow to-lime-glow"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {hasActivity ? (
            <div className="mt-5 space-y-2">
              {connectedFarmers.length > 0 && (
                <p className="text-xs text-offwhite-muted">
                  <span className="font-semibold text-lime-glow">✓ Farmers:</span>{' '}
                  {FARMERS.filter((f) => connectedFarmers.includes(f.id))
                    .map((f) => f.name.split(' ')[0])
                    .join(', ')}
                </p>
              )}
              {hiredWorkers.length > 0 && (
                <p className="text-xs text-offwhite-muted">
                  <span className="font-semibold text-lime-glow">✓ Labour:</span>{' '}
                  {hiredWorkers.join(', ')}
                </p>
              )}
              {bookedEquipment.length > 0 && (
                <p className="text-xs text-offwhite-muted">
                  <span className="font-semibold text-lime-glow">✓ Equipment:</span>{' '}
                  {EQUIPMENT.filter((e) => bookedEquipment.includes(e.id))
                    .map((e) => e.name.split('(')[0].trim())
                    .join(', ')}
                </p>
              )}
            </div>
          ) : (
            <p className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs leading-relaxed text-offwhite-muted/70">
              Connect with farmers, hire labour and book equipment — every demo
              action appears here in real time.
            </p>
          )}

          <div className="mt-auto flex flex-col gap-3 pt-5">
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
              {[
                { label: 'Farmers nearby', value: '24' },
                { label: 'Workers', value: '18' },
                { label: 'Equipment', value: '12' },
                { label: 'Resources', value: '8' },
              ].map((s) => (
                <span key={s.label} className="text-xs text-offwhite-muted/70">
                  <span className="font-display font-bold text-offwhite">{s.value}</span>{' '}
                  {s.label}
                </span>
              ))}
            </div>
            <button
              onClick={onExploreMarket}
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-offwhite-muted transition-all hover:border-lime-glow/40 hover:text-lime-glow"
            >
              Back to Market Price Forecasting
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
