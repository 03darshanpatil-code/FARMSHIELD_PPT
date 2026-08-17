import { motion } from 'framer-motion';

/**
 * Radar-style detection spinner shared by the Member 4 location and
 * soil-analysis demo flows.
 */
export default function DetectionSpinner({ accent = 'emerald' }: { accent?: 'emerald' | 'amber' }) {
  const styles =
    accent === 'emerald'
      ? {
          ring: 'border-emerald-glow/30',
          ringSoft: 'border-emerald-glow/20',
          dashed: 'border-emerald-glow/40',
          dot: 'bg-emerald-glow',
          sweep: 'rgba(52,211,153,0.22)',
        }
      : {
          ring: 'border-amber-glow/30',
          ringSoft: 'border-amber-glow/20',
          dashed: 'border-amber-glow/40',
          dot: 'bg-amber-glow',
          sweep: 'rgba(245,185,66,0.22)',
        };

  return (
    <div className="relative h-12 w-12 shrink-0">
      <motion.span
        className={`absolute inset-0 rounded-full border ${styles.ring}`}
        animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.span
        className={`absolute inset-0 rounded-full border ${styles.ringSoft}`}
        animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
      />
      <motion.span
        className={`absolute inset-0 rounded-full border-2 border-dashed ${styles.dashed}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
      />
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ background: `conic-gradient(from 0deg, ${styles.sweep}, transparent 70deg)` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
      </span>
    </div>
  );
}
