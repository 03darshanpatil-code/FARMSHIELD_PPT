import { motion } from 'framer-motion';
import {
  Newspaper,
  Bot,
  Languages,
  TrendingUp,
  Network,
  Sprout,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/motion';
import KisanTimes from './kisan-times/KisanTimes';
import PlantDoctorAI from './plant-doctor/PlantDoctorAI';
import MultilingualAI from './plant-doctor/MultilingualAI';
import Impact from './impact/Impact';
import UnifiedEcosystem from './ecosystem/UnifiedEcosystem';
import FarmerJourney from './ecosystem/FarmerJourney';

interface Member06ContentProps {
  subsectionId: string;
  setActiveSubId: (id: string) => void;
}

export default function Member06Content({ subsectionId, setActiveSubId }: Member06ContentProps) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      {/* Section intro */}
      <motion.div variants={fadeUp} className="mb-8 max-w-2xl">
        <h2 className="font-display text-2xl font-semibold text-offwhite sm:text-3xl">
          AI Assistant & Impact
        </h2>
        <p className="mt-3 text-offwhite-muted">
          Kisan Times brings daily agricultural intelligence, Plant Doctor AI answers
          farmer questions in 13 languages, and the unified ecosystem shows how every
          FarmShield feature works together for a stronger agricultural future.
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-lime-glow/20 bg-lime-glow/[0.05] px-2.5 py-1 text-[11px] font-medium text-lime-glow">
          <Sparkles className="h-3 w-3" />
          Frontend-only demo — all AI, news, and impact data is simulated for presentation.
        </p>
      </motion.div>

      {/* Feature content */}
      {subsectionId === 'kisan-times' && <KisanTimes />}
      {subsectionId === 'plant-doctor' && <PlantDoctorAI />}
      {subsectionId === 'multilingual' && <MultilingualAI />}
      {subsectionId === 'impact' && <Impact />}
      {subsectionId === 'unified-ecosystem' && <UnifiedEcosystem />}
      {subsectionId === 'farmer-journey' && <FarmerJourney />}

      {/* Cross-module chips */}
      <motion.div
        variants={fadeUp}
        className="mt-10 flex flex-wrap gap-2 border-t border-white/[0.06] pt-6"
      >
        <ModuleChip
          active={subsectionId === 'kisan-times'}
          onClick={() => setActiveSubId('kisan-times')}
          icon={Newspaper}
          label="Kisan Times"
        />
        <ModuleChip
          active={subsectionId === 'plant-doctor'}
          onClick={() => setActiveSubId('plant-doctor')}
          icon={Bot}
          label="Plant Doctor AI"
        />
        <ModuleChip
          active={subsectionId === 'multilingual'}
          onClick={() => setActiveSubId('multilingual')}
          icon={Languages}
          label="Multilingual AI"
        />
        <ModuleChip
          active={subsectionId === 'impact'}
          onClick={() => setActiveSubId('impact')}
          icon={TrendingUp}
          label="FarmShield Impact"
        />
        <ModuleChip
          active={subsectionId === 'unified-ecosystem'}
          onClick={() => setActiveSubId('unified-ecosystem')}
          icon={Network}
          label="Unified Ecosystem"
        />
        <ModuleChip
          active={subsectionId === 'farmer-journey'}
          onClick={() => setActiveSubId('farmer-journey')}
          icon={Sprout}
          label="Farmer Journey"
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
  icon: LucideIcon;
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
