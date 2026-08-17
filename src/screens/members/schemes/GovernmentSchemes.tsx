import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Landmark,
  Search,
  ArrowRight,
  Check,
  Scale,
  X,
  ShieldAlert,
  Sparkles,
  Info,
  CalendarDays,
} from 'lucide-react';
import { fadeUp, staggerContainerFast, scaleIn } from '@/lib/motion';
import {
  SCHEMES,
  SCHEME_CATEGORIES,
  getSchemeById,
  type Scheme,
} from './schemesData';
import EligibilityChecker from './EligibilityChecker';
import { SchemeCompareModal, SchemeDetailsModal } from './SchemeModals';

const STEPS = [
  { id: 'schemes', label: 'Government Schemes' },
  { id: 'discover', label: 'Discover Schemes' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'details', label: 'Scheme Details' },
];

export default function GovernmentSchemes() {
  const [activeStep, setActiveStep] = useState('schemes');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [compare, setCompare] = useState<string[]>([]);
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [showCompare, setShowCompare] = useState(false);

  const featured = SCHEMES[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SCHEMES.filter((s) => {
      const inCategory = category === 'All' || s.category === category;
      const inQuery =
        q === '' ||
        s.name.toLowerCase().includes(q) ||
        s.short.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [query, category]);

  /* Scroll-spy for the section strip */
  useEffect(() => {
    const els = STEPS.map((s) => document.getElementById(`gstep-${s.id}`)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveStep(entry.target.id.replace('gstep-', ''));
        });
      },
      { rootMargin: '-25% 0px -60% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToStep = (id: string) => {
    document.getElementById(`gstep-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleCompare = (id: string) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const scrollToEligibility = () => scrollToStep('eligibility');

  return (
    <div>
      {/* Step strip */}
      <div className="sticky top-[84px] z-30 -mx-4 border-y border-white/[0.06] bg-forest-950/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {STEPS.map((step, i) => {
            const active = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => scrollToStep(step.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all ${
                  active
                    ? 'border-lime-glow/50 bg-lime-glow/10 text-lime-glow'
                    : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
                }`}
              >
                <span
                  className={`font-display text-[11px] font-bold ${
                    active ? 'text-lime-glow' : 'text-offwhite-muted/50'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {step.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 space-y-16">
        {/* ============================ 01 — Government Schemes ============================ */}
        <section id="gstep-schemes" className="scroll-mt-32">
          <StepHeader
            step="01"
            title="Government Schemes"
            subtitle="Discover benefits, check eligibility, and access agricultural support from one place."
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-glow/10 ring-1 ring-lime-glow/25">
              <Landmark className="h-5 w-5 text-lime-glow" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-semibold text-offwhite">
                {SCHEMES.length} schemes · demo catalogue
              </p>
              <p className="text-sm text-offwhite-muted">
                Realistic examples for presentation. FarmShield helps you find them —
                it is not an official government platform.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-glow/30 bg-amber-glow/[0.06] px-3 py-1.5 text-[11px] font-medium text-amber-glow">
              <ShieldAlert className="h-3.5 w-3.5" />
              DEMO DATA — NOT OFFICIAL
            </span>
          </motion.div>
        </section>

        {/* ============================ 02 — Discover Schemes ============================ */}
        <section id="gstep-discover" className="scroll-mt-32">
          <StepHeader
            step="02"
            title="Discover Schemes"
            subtitle="Search and filter the demo catalogue, then compare or open details."
          />

          {/* Search */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-6">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-offwhite-muted/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH SCHEMES — e.g. insurance, KCC, solar…"
                className="w-full rounded-xl border border-white/10 bg-forest-950 py-3 pl-11 pr-4 text-sm text-offwhite placeholder:text-offwhite-muted/40 transition-all hover:border-white/20 focus:border-lime-glow/50 focus:outline-none"
              />
            </div>
          </motion.div>

          {/* Filter chips */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {SCHEME_CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all ${
                    active
                      ? 'border-lime-glow/50 bg-lime-glow/10 text-lime-glow'
                      : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
                  }`}
                >
                  {cat}
                  <span className={`text-[10px] font-bold ${active ? 'text-lime-glow' : 'text-offwhite-muted/50'}`}>
                    {cat === 'All' ? SCHEMES.length : SCHEMES.filter((s) => s.category === cat).length}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Cards */}
          <motion.div
            key={`${category}-${query}`}
            variants={staggerContainerFast}
            initial="hidden"
            animate="visible"
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                inCompare={compare.includes(scheme.id)}
                onToggleCompare={toggleCompare}
                onViewDetails={() => setDetailsId(scheme.id)}
                onCheckEligibility={scrollToEligibility}
              />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center text-sm text-offwhite-muted/70">
              No schemes match “{query}” in the demo catalogue.
            </motion.p>
          )}
        </section>

        {/* ============================ 03 — Eligibility ============================ */}
        <section id="gstep-eligibility" className="scroll-mt-32">
          <StepHeader
            step="03"
            title="Eligibility"
            subtitle="Build a simple demo profile and see which schemes may apply."
          />
          <div className="mt-6">
            <EligibilityChecker onOpenScheme={(id) => setDetailsId(id)} />
          </div>
        </section>

        {/* ============================ 04 — Scheme Details ============================ */}
        <section id="gstep-details" className="scroll-mt-32">
          <StepHeader
            step="04"
            title="Scheme Details"
            subtitle="A closer look at a featured scheme — every card supports this view."
          />

          <FeaturedScheme scheme={featured} onViewDetails={() => setDetailsId(featured.id)} />
        </section>
      </div>

      {/* Compare floating bar */}
      <AnimatePresence>
        {compare.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-lime-glow/30 bg-forest-950/95 px-4 py-3 shadow-soft-lg backdrop-blur-xl">
              <span className="flex items-center gap-2 text-sm text-offwhite-muted">
                <Scale className="h-4 w-4 text-lime-glow" />
                {compare.length} selected
              </span>
              <div className="flex -space-x-2">
                {compare.map((id) => (
                  <span
                    key={id}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-forest-800 font-display text-[10px] font-bold text-lime-glow"
                  >
                    {getSchemeById(id).name.charAt(0)}
                  </span>
                ))}
              </div>
              <div className="h-6 w-px bg-white/10" />
              <button
                onClick={() => setShowCompare(true)}
                className="rounded-xl border border-lime-glow/50 bg-lime-glow/10 px-4 py-2 text-xs font-bold text-lime-glow transition-all hover:border-lime-glow/80"
              >
                VIEW COMPARISON
              </button>
              <button
                onClick={() => {
                  setCompare([]);
                  setShowCompare(false);
                }}
                aria-label="Clear comparison"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-offwhite-muted transition-all hover:border-white/25 hover:text-offwhite"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SchemeDetailsModal schemeId={detailsId} onClose={() => setDetailsId(null)} />
      <SchemeCompareModal
        schemeIds={compare}
        open={showCompare && compare.length >= 2}
        onClose={() => setShowCompare(false)}
      />
    </div>
  );
}

/* ============================================================
   Sub-components
   ============================================================ */

function StepHeader({ step, title, subtitle }: { step: string; title: string; subtitle: string }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-glow/10 font-display text-sm font-bold text-lime-glow ring-1 ring-lime-glow/25">
        {step}
      </span>
      <div>
        <h3 className="font-display text-xl font-semibold text-offwhite sm:text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-offwhite-muted">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function SchemeCard({
  scheme,
  inCompare,
  onToggleCompare,
  onViewDetails,
  onCheckEligibility,
}: {
  scheme: Scheme;
  inCompare: boolean;
  onToggleCompare: (id: string) => void;
  onViewDetails: () => void;
  onCheckEligibility: () => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5 }}
      className="glass-card group flex flex-col p-5 hover:border-lime-glow/30 hover:bg-white/[0.05]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-glow/10 ring-1 ring-lime-glow/20">
            <Landmark className="h-4 w-4 text-lime-glow" />
          </span>
          <div>
            <p className="font-display text-base font-semibold leading-tight text-offwhite">
              {scheme.name}
            </p>
            <p className="text-[11px] uppercase tracking-widest text-offwhite-muted/60">
              {scheme.category}
            </p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-lg border px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
            scheme.status === 'Open'
              ? 'border-emerald-glow/30 bg-emerald-glow/[0.08] text-emerald-glow'
              : 'border-amber-glow/30 bg-amber-glow/[0.08] text-amber-glow'
          }`}
        >
          {scheme.status}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-offwhite-muted">{scheme.short}</p>

      <div className="mt-4 space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
        <p className="text-xs text-offwhite-muted">
          <span className="font-semibold text-lime-glow">Benefit:</span>{' '}
          <span className="text-offwhite">{scheme.benefit}</span>
        </p>
        <p className="text-xs text-offwhite-muted">
          <span className="font-semibold text-lime-glow">Eligibility:</span> {scheme.eligibility}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-offwhite-muted/50">
          <Info className="h-3 w-3" /> Demo data
        </span>
        <button
          onClick={() => onToggleCompare(scheme.id)}
          className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-all ${
            inCompare
              ? 'border-lime-glow/50 bg-lime-glow/10 text-lime-glow'
              : 'border-white/10 bg-white/[0.03] text-offwhite-muted hover:border-white/25 hover:text-offwhite'
          }`}
        >
          <Check className="h-3 w-3" />
          Compare
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={onViewDetails}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-lime-glow/40 bg-lime-glow/10 px-3 py-2.5 text-xs font-bold text-lime-glow transition-all hover:border-lime-glow/60 hover:bg-lime-glow/15"
        >
          VIEW DETAILS
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={onCheckEligibility}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs font-semibold text-offwhite-muted transition-all hover:border-white/25 hover:text-offwhite"
        >
          CHECK ELIGIBILITY
        </button>
      </div>
    </motion.div>
  );
}

function FeaturedScheme({ scheme, onViewDetails }: { scheme: Scheme; onViewDetails: () => void }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="relative mt-6 overflow-hidden rounded-2xl border border-lime-glow/30 bg-gradient-to-br from-lime-glow/[0.1] via-forest-700/40 to-forest-900/60 p-6 shadow-glow sm:p-8"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-lime-glow/10 blur-[80px]" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-lime-glow/15 ring-1 ring-lime-glow/30">
            <Landmark className="h-7 w-7 text-lime-glow" />
          </span>
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-lime-glow">
              <Sparkles className="h-3.5 w-3.5" />
              Featured Scheme
            </p>
            <h4 className="mt-1 font-display text-2xl font-bold text-offwhite">{scheme.name}</h4>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-offwhite-muted">
              {scheme.objective}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-offwhite-muted">
              <span className="font-display font-bold text-lime-glow">{scheme.benefit}</span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-emerald-glow" />
                {scheme.deadline}
              </span>
              <span
                className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                  scheme.status === 'Open'
                    ? 'border-emerald-glow/30 bg-emerald-glow/[0.08] text-emerald-glow'
                    : 'border-amber-glow/30 bg-amber-glow/[0.08] text-amber-glow'
                }`}
              >
                {scheme.status}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onViewDetails}
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-lime-glow/50 bg-gradient-to-r from-lime-glow/30 to-lime-glow/10 px-7 py-3.5 text-sm font-bold text-lime-glow transition-all hover:border-lime-glow/80 hover:shadow-glow"
        >
          VIEW DETAILS
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}
