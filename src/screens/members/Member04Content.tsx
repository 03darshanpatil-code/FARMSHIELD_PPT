import { motion } from 'framer-motion';
import { CloudSun, Layers, Sparkles } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/motion';
import WeatherIntelligence from './weather/WeatherIntelligence';
import SoilIntelligence from './soil/SoilIntelligence';

interface Member04ContentProps {
  subsectionId: string;
  setActiveSubId: (id: string) => void;
}

export default function Member04Content({
  subsectionId,
  setActiveSubId,
}: Member04ContentProps) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      {/* Section intro */}
      <motion.div variants={fadeUp} className="mb-8 max-w-2xl">
        <h2 className="font-display text-2xl font-semibold text-offwhite sm:text-3xl">
          Smart Agriculture Intelligence
        </h2>
        <p className="mt-3 text-offwhite-muted">
          Two connected intelligence tools that read the local environment around
          every farm — Weather Intelligence for conditions and forecasts, and Soil
          Intelligence for estimated regional soil profiles and crop suitability.
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-emerald-glow/20 bg-emerald-glow/[0.05] px-2.5 py-1 text-[11px] font-medium text-emerald-glow">
          <Sparkles className="h-3 w-3" />
          Frontend-only demo — all data is simulated for presentation.
        </p>
      </motion.div>

      {/* Feature content */}
      {subsectionId === 'weather' && (
        <WeatherIntelligence onExploreSoil={() => setActiveSubId('soil')} />
      )}
      {subsectionId === 'soil' && (
        <SoilIntelligence onExploreWeather={() => setActiveSubId('weather')} />
      )}

      {/* Cross-module chips */}
      <motion.div
        variants={fadeUp}
        className="mt-10 flex flex-wrap gap-2 border-t border-white/[0.06] pt-6"
      >
        <ModuleChip
          active={subsectionId === 'weather'}
          onClick={() => setActiveSubId('weather')}
          icon={CloudSun}
          label="Weather Intelligence"
        />
        <ModuleChip
          active={subsectionId === 'soil'}
          onClick={() => setActiveSubId('soil')}
          icon={Layers}
          label="Soil Intelligence"
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
  icon: typeof CloudSun;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
        active
          ? 'border-emerald-glow/50 bg-emerald-glow/10 text-emerald-glow shadow-glow'
          : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
