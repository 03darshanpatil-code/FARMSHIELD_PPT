import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Check, UserPlus, Users } from 'lucide-react';
import { fadeUp, staggerContainerFast } from '@/lib/motion';
import { FARMERS } from './data';
import { Avatar, SectionHeading } from './ui';

interface FarmersSectionProps {
  connected: string[];
  onToggleConnect: (farmerId: string) => void;
}

const STATUS_STYLES: Record<string, string> = {
  Nearby: 'border-emerald-glow/30 bg-emerald-glow/[0.08] text-emerald-glow',
  Verified: 'border-lime-glow/30 bg-lime-glow/[0.08] text-lime-glow',
  Trusted: 'border-amber-glow/30 bg-amber-glow/[0.08] text-amber-glow',
};

export default function FarmersSection({ connected, onToggleConnect }: FarmersSectionProps) {
  return (
    <motion.div variants={staggerContainerFast} initial="hidden" animate="visible">
      <SectionHeading
        title="Farmer Network"
        subtitle="Connect with nearby growers to share inputs, labour and market intelligence."
        badge={`${connected.length} of ${FARMERS.length} connected`}
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FARMERS.map((farmer, i) => {
          const isConnected = connected.includes(farmer.id);
          return (
            <motion.div
              key={farmer.id}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className={`glass-card flex flex-col p-5 transition-all duration-300 ${
                isConnected ? 'border-lime-glow/40 shadow-glow' : 'hover:border-amber-glow/30 hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-start gap-3">
                <Avatar name={farmer.name} index={i} />
                <div className="min-w-0">
                  <p className="truncate font-display text-base font-semibold text-offwhite">
                    {farmer.name}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-offwhite-muted">
                    <MapPin className="h-3 w-3 shrink-0 text-emerald-glow" />
                    <span className="truncate">{farmer.location}</span>
                  </p>
                </div>
                <span
                  className={`ml-auto shrink-0 rounded-lg border px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${STATUS_STYLES[farmer.status]}`}
                >
                  {farmer.status}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {farmer.crops.map((crop) => (
                  <span
                    key={crop}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-xs text-offwhite-muted"
                  >
                    {crop}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-xs text-offwhite-muted/70">
                Farming experience ·{' '}
                <span className="font-semibold text-offwhite">{farmer.experience}</span>
              </p>

              <div className="mt-4 border-t border-white/[0.06] pt-4">
                <AnimatePresence mode="wait" initial={false}>
                  {isConnected ? (
                    <motion.button
                      key="connected"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => onToggleConnect(farmer.id)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-lime-glow/40 bg-lime-glow/10 px-4 py-2.5 text-sm font-bold text-lime-glow transition-all hover:border-lime-glow/60"
                    >
                      <Check className="h-4 w-4" />
                      CONNECTED
                    </motion.button>
                  ) : (
                    <motion.button
                      key="connect"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onToggleConnect(farmer.id)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-glow/40 bg-amber-glow/10 px-4 py-2.5 text-sm font-bold text-amber-glow transition-all hover:border-amber-glow/60"
                    >
                      <UserPlus className="h-4 w-4" />
                      CONNECT
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-5 flex items-center gap-2 text-xs text-offwhite-muted/50">
        <Users className="h-3.5 w-3.5" />
        Demo profiles — connections are simulated and shown live in My Network.
      </p>
    </motion.div>
  );
}
