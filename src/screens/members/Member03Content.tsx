import { motion } from 'framer-motion';
import { LineChart, Network, Sparkles } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/motion';
import MarketPriceForecasting from './market/MarketPriceForecasting';
import KrishiSetu from './krishi-setu/KrishiSetu';

interface Member03ContentProps {
  subsectionId: string;
  setActiveSubId: (id: string) => void;
}

export default function Member03Content({
  subsectionId,
  setActiveSubId,
}: Member03ContentProps) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      {/* Section intro */}
      <motion.div variants={fadeUp} className="mb-8 max-w-2xl">
        <h2 className="font-display text-2xl font-semibold text-offwhite sm:text-3xl">
          Market & Farmer Economy
        </h2>
        <p className="mt-3 text-offwhite-muted">
          An interactive demonstration of FarmShield's farmer-economy layer — market
          price intelligence for smarter selling decisions, and Krishi Setu, a
          connected ecosystem of farmers, labour, equipment, and agricultural
          resources.
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-amber-glow/20 bg-amber-glow/[0.05] px-2.5 py-1 text-[11px] font-medium text-amber-glow">
          <Sparkles className="h-3 w-3" />
          Frontend-only demo — all data is simulated for presentation.
        </p>
      </motion.div>

      {/* Feature content */}
      {subsectionId === 'market-forecasting' && (
        <MarketPriceForecasting onExploreKrishiSetu={() => setActiveSubId('krishi-setu')} />
      )}
      {subsectionId === 'krishi-setu' && (
        <KrishiSetu onExploreMarket={() => setActiveSubId('market-forecasting')} />
      )}

      {/* Cross-module chips */}
      <motion.div
        variants={fadeUp}
        className="mt-10 flex flex-wrap gap-2 border-t border-white/[0.06] pt-6"
      >
        <ModuleChip
          active={subsectionId === 'market-forecasting'}
          onClick={() => setActiveSubId('market-forecasting')}
          icon={LineChart}
          label="Market Price Forecasting"
        />
        <ModuleChip
          active={subsectionId === 'krishi-setu'}
          onClick={() => setActiveSubId('krishi-setu')}
          icon={Network}
          label="Krishi Setu"
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
  icon: typeof LineChart;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
        active
          ? 'border-amber-glow/50 bg-amber-glow/10 text-amber-glow shadow-glow-amber'
          : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
