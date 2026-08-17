import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  HardHat,
  Tractor,
  Package,
  Network,
  LayoutGrid,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { fadeUp, staggerContainerFast } from '@/lib/motion';
import FarmersSection from './FarmersSection';
import LabourSection from './LabourSection';
import EquipmentSection from './EquipmentSection';
import NetworkSection from './NetworkSection';

interface KrishiSetuProps {
  onExploreMarket: () => void;
}

const TABS: { id: string; number: string; label: string; icon: LucideIcon }[] = [
  { id: 'overview', number: '01', label: 'Overview', icon: LayoutGrid },
  { id: 'farmers', number: '02', label: 'Farmers', icon: Users },
  { id: 'labour', number: '03', label: 'Labour', icon: HardHat },
  { id: 'equipment', number: '04', label: 'Equipment', icon: Tractor },
  { id: 'network', number: '05', label: 'My Network', icon: Network },
];

const PILLARS = [
  { icon: Users, label: 'FARMERS', sub: 'Nearby growers' },
  { icon: HardHat, label: 'LABOUR', sub: 'Skilled workers' },
  { icon: Tractor, label: 'EQUIPMENT', sub: 'Machinery on demand' },
  { icon: Package, label: 'AGRICULTURAL RESOURCES', sub: 'Inputs & advisory' },
];

export default function KrishiSetu({ onExploreMarket }: KrishiSetuProps) {
  const [tab, setTab] = useState('overview');
  const [connectedFarmers, setConnectedFarmers] = useState<string[]>([]);
  const [hiredWorkers, setHiredWorkers] = useState<string[]>([]);
  const [bookedEquipment, setBookedEquipment] = useState<string[]>([]);

  const toggleConnect = (farmerId: string) => {
    setConnectedFarmers((prev) =>
      prev.includes(farmerId) ? prev.filter((id) => id !== farmerId) : [...prev, farmerId],
    );
  };

  const hireWorker = (workerName: string) => {
    setHiredWorkers((prev) => (prev.includes(workerName) ? prev : [...prev, workerName]));
  };

  const bookEquipment = (equipmentId: string) => {
    setBookedEquipment((prev) =>
      prev.includes(equipmentId) ? prev : [...prev, equipmentId],
    );
  };

  return (
    <div>
      {/* Header */}
      <motion.div variants={staggerContainerFast} initial="hidden" animate="visible">
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-glow/10 ring-1 ring-amber-glow/25">
            <Network className="h-5 w-5 text-amber-glow" />
          </span>
          <div>
            <h2 className="font-display text-2xl font-semibold text-offwhite sm:text-3xl">
              Krishi Setu
            </h2>
            <p className="text-sm text-offwhite-muted">
              A connected digital ecosystem for farmers, agricultural workers, and resources.
            </p>
          </div>
        </motion.div>

        {/* Connection pillars */}
        <motion.div variants={fadeUp} className="mt-8">
          <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
            Krishi Setu connects
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={p.label} className="relative">
                  <motion.div
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    className="glass-card group flex items-center gap-3 p-4 hover:border-amber-glow/30 hover:bg-white/[0.05]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-glow/10 ring-1 ring-amber-glow/20 transition-transform group-hover:scale-110">
                      <Icon className="h-5 w-5 text-amber-glow" />
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold tracking-wide text-offwhite">
                        {p.label}
                      </p>
                      <p className="text-xs text-offwhite-muted/70">{p.sub}</p>
                    </div>
                  </motion.div>
                  {i < PILLARS.length - 1 && (
                    <ArrowRight className="absolute -right-2.5 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-offwhite-muted/40 lg:block" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Internal navigation */}
      <div className="mt-8 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all ${
                active
                  ? 'border-amber-glow/50 bg-amber-glow/10 text-amber-glow shadow-glow-amber'
                  : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
              }`}
            >
              <span className={`font-display text-[11px] font-bold ${active ? 'text-amber-glow' : 'text-offwhite-muted/50'}`}>
                {t.number}
              </span>
              <Icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="mt-6 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab === 'overview' && <Overview setTab={setTab} onExploreMarket={onExploreMarket} />}
            {tab === 'farmers' && (
              <FarmersSection connected={connectedFarmers} onToggleConnect={toggleConnect} />
            )}
            {tab === 'labour' && (
              <LabourSection hired={hiredWorkers} onHire={hireWorker} />
            )}
            {tab === 'equipment' && (
              <EquipmentSection booked={bookedEquipment} onBook={bookEquipment} />
            )}
            {tab === 'network' && (
              <NetworkSection
                connectedFarmers={connectedFarmers}
                hiredWorkers={hiredWorkers}
                bookedEquipment={bookedEquipment}
                onExploreMarket={onExploreMarket}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Overview({
  setTab,
  onExploreMarket,
}: {
  setTab: (tab: string) => void;
  onExploreMarket: () => void;
}) {
  const overviewItems = [
    {
      icon: Users,
      label: 'Farmer Network',
      text: 'Discover and connect with growers near you — share inputs, labour and best practices.',
      tab: 'farmers',
    },
    {
      icon: HardHat,
      label: 'Labour',
      text: 'Find skilled farm workers for harvest, sowing and irrigation, with demo ratings and availability.',
      tab: 'labour',
    },
    {
      icon: Tractor,
      label: 'Equipment',
      text: 'Rent tractors, harvesters, seeders and sprayers from local providers — book with a few taps.',
      tab: 'equipment',
    },
    {
      icon: Package,
      label: 'Agricultural Resources',
      text: 'Seeds, fertilizers, advisory services and government schemes, surfaced in one place.',
      tab: 'network',
    },
  ];

  return (
    <motion.div variants={staggerContainerFast} initial="hidden" animate="visible">
      <motion.p variants={fadeUp} className="max-w-2xl text-offwhite-muted">
        A unified network where every actor in the farm economy is one tap away —
        built as a fully interactive, frontend-only demonstration.
      </motion.p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {overviewItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              onClick={() => setTab(item.tab)}
              className="glass-card group flex items-start gap-4 p-5 text-left hover:border-amber-glow/30 hover:bg-white/[0.05]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-glow/10 ring-1 ring-amber-glow/20 transition-transform group-hover:scale-110">
                <Icon className="h-5 w-5 text-amber-glow" />
              </span>
              <span>
                <span className="flex items-center gap-2 font-display text-base font-semibold text-offwhite">
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-offwhite-muted/40 transition-all group-hover:translate-x-1 group-hover:text-amber-glow" />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-offwhite-muted">
                  {item.text}
                </span>
              </span>
              <span className="ml-auto font-display text-2xl font-bold text-white/[0.06]">
                {String(i + 1).padStart(2, '0')}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Demo stats strip */}
      <motion.div
        variants={fadeUp}
        className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-4"
      >
        <p className="text-sm text-offwhite-muted">
          Demo network in your area:
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { label: 'Farmers', value: '120+' },
            { label: 'Workers', value: '45' },
            { label: 'Equipment', value: '18' },
            { label: 'Resources', value: '30' },
          ].map((s) => (
            <span key={s.label} className="flex items-baseline gap-1.5">
              <span className="font-display text-lg font-bold text-lime-glow">{s.value}</span>
              <span className="text-xs uppercase tracking-widest text-offwhite-muted/60">
                {s.label}
              </span>
            </span>
          ))}
        </div>
      </motion.div>

      <motion.button
        variants={fadeUp}
        onClick={onExploreMarket}
        className="group mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-offwhite-muted transition-all hover:border-lime-glow/40 hover:text-lime-glow"
      >
        Back to Market Price Forecasting
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </motion.button>
    </motion.div>
  );
}
