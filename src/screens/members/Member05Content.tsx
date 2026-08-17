import { motion } from 'framer-motion';
import { Landmark, ScanLine, Sparkles } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/motion';
import GovernmentSchemes from './schemes/GovernmentSchemes';
import HarvestID from './harvestid/HarvestID';

interface Member05ContentProps {
  subsectionId: string;
  setActiveSubId: (id: string) => void;
}

export default function Member05Content({
  subsectionId,
  setActiveSubId,
}: Member05ContentProps) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      {/* Section intro */}
      <motion.div variants={fadeUp} className="mb-8 max-w-2xl">
        <h2 className="font-display text-2xl font-semibold text-offwhite sm:text-3xl">
          Farmer Services & Trust
        </h2>
        <p className="mt-3 text-offwhite-muted">
          Two services that put farmers at the centre — Government Schemes, a
          discovery and eligibility companion for agricultural support, and
          HarvestID, a digital crop passport that brings transparency from farm to
          consumer.
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-lime-glow/20 bg-lime-glow/[0.05] px-2.5 py-1 text-[11px] font-medium text-lime-glow">
          <Sparkles className="h-3 w-3" />
          Frontend-only demo — all data is simulated for presentation.
        </p>
      </motion.div>

      {/* Feature content */}
      {subsectionId === 'schemes' && <GovernmentSchemes />}
      {subsectionId === 'harvestid' && <HarvestID />}

      {/* Cross-module chips */}
      <motion.div
        variants={fadeUp}
        className="mt-10 flex flex-wrap gap-2 border-t border-white/[0.06] pt-6"
      >
        <ModuleChip
          active={subsectionId === 'schemes'}
          onClick={() => setActiveSubId('schemes')}
          icon={Landmark}
          label="Government Schemes"
        />
        <ModuleChip
          active={subsectionId === 'harvestid'}
          onClick={() => setActiveSubId('harvestid')}
          icon={ScanLine}
          label="HarvestID"
        />
      </motion.div>
    </motion.div>
  );
}

function ModuleChip({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Landmark;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
        active
          ? 'border-lime-glow/50 bg-lime-glow/10 text-lime-glow shadow-glow'
          : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
