import { useEffect, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Landmark,
  CheckCircle2,
  FileText,
  CalendarDays,
  Building2,
  ExternalLink,
  ArrowRight,
  Globe,
  Info,
  type LucideIcon,
} from 'lucide-react';
import Modal from '@/screens/members/Modal';
import { getSchemeById, type Scheme } from './schemesData';

/* ============================================================
   Scheme details modal + APPLY NOW portal simulation
   ============================================================ */

export function SchemeDetailsModal({
  schemeId,
  onClose,
}: {
  schemeId: string | null;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<'details' | 'redirecting' | 'portal'>('details');

  useEffect(() => {
    if (schemeId) setPhase('details');
  }, [schemeId]);

  const scheme = schemeId ? getSchemeById(schemeId) : null;

  return (
    <Modal open={scheme !== null} onClose={onClose} label="Scheme details">
      {scheme && (
        <div className="pr-6">
          <AnimatePresence mode="wait">
            {phase === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-lime-glow">
                  <Landmark className="h-3.5 w-3.5" />
                  {scheme.category}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold text-offwhite">{scheme.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-offwhite-muted">{scheme.objective}</p>

                <Section label="Benefits">
                  <ul className="space-y-1.5">
                    {scheme.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-offwhite-muted">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lime-glow" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </Section>

                <Section label="Eligibility">
                  <p className="text-sm text-offwhite-muted">{scheme.eligibility}</p>
                </Section>

                <Section label="Required Documents">
                  <div className="flex flex-wrap gap-1.5">
                    {scheme.documents.map((d) => (
                      <span key={d} className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-offwhite-muted">
                        {d}
                      </span>
                    ))}
                  </div>
                </Section>

                <Section label="Application Process">
                  <ol className="space-y-1.5">
                    {scheme.process.map((step, i) => (
                      <li key={step} className="flex items-start gap-2 text-sm text-offwhite-muted">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-lime-glow/10 font-display text-[10px] font-bold text-lime-glow ring-1 ring-lime-glow/25">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </Section>

                <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <MetaRow icon={Building2} label="Department" value={scheme.department} />
                  <MetaRow icon={CalendarDays} label="Demo Deadline" value={scheme.deadline} />
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-center gap-1.5 text-[11px] text-offwhite-muted/50">
                    <Info className="h-3 w-3" />
                    Demo data — verify on the official portal before applying.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setPhase('redirecting')}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-lime-glow/50 bg-gradient-to-r from-lime-glow/30 to-lime-glow/10 px-6 py-3 text-sm font-bold text-lime-glow transition-all hover:border-lime-glow/80 hover:shadow-glow"
                  >
                    APPLY NOW
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {phase === 'redirecting' && (
              <motion.div
                key="redirecting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <div className="relative h-16 w-16">
                  <motion.span
                    className="absolute inset-0 rounded-full border border-lime-glow/30"
                    animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="h-12 w-12 animate-spin rounded-full border-2 border-lime-glow/25 border-t-lime-glow" />
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-offwhite">
                  REDIRECTING TO OFFICIAL GOVERNMENT PORTAL
                </h3>
                <p className="mt-2 max-w-sm text-sm text-offwhite-muted">
                  Simulating a secure redirect for {scheme.name}…
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setPhase('portal')}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border border-lime-glow/50 bg-lime-glow/10 px-6 py-3 text-sm font-bold text-lime-glow transition-all hover:border-lime-glow/80"
                >
                  OPEN OFFICIAL PORTAL
                  <ExternalLink className="h-4 w-4" />
                </motion.button>
              </motion.div>
            )}

            {phase === 'portal' && (
              <motion.div
                key="portal"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-6 text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-glow/15 ring-1 ring-lime-glow/30">
                  <Globe className="h-8 w-8 text-lime-glow" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-offwhite">
                  {scheme.name} · Official Portal
                </h3>
                <p className="mt-2 max-w-sm text-sm text-offwhite-muted">
                  This demo opens the national government portal. The scheme may live
                  on a department-specific page.
                </p>
                <a
                  href={scheme.officialPortal}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-offwhite-muted transition-all hover:border-lime-glow/40 hover:text-lime-glow"
                >
                  OPEN OFFICIAL PORTAL
                  <ExternalLink className="h-4 w-4" />
                </a>
                <p className="mt-4 flex items-center gap-1.5 text-[11px] text-offwhite-muted/50">
                  <Info className="h-3 w-3" />
                  Demo link — verify the official government website before applying.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </Modal>
  );
}

/* ============================================================
   Scheme comparison modal
   ============================================================ */

const COMPARE_ROWS: { label: string; get: (s: Scheme) => string }[] = [
  { label: 'Category', get: (s) => s.category },
  { label: 'Benefit', get: (s) => s.benefit },
  { label: 'Eligibility', get: (s) => s.eligibility },
  { label: 'Support Type', get: (s) => s.supportType },
  { label: 'Application', get: (s) => s.applicationMethod },
  { label: 'Documents', get: (s) => s.documents.join(' · ') },
];

export function SchemeCompareModal({
  schemeIds,
  open,
  onClose,
}: {
  schemeIds: string[];
  open: boolean;
  onClose: () => void;
}) {
  const schemes = schemeIds.map(getSchemeById);

  return (
    <Modal open={open} onClose={onClose} label="Compare schemes">
      <div className="pr-6">
        <p className="text-xs uppercase tracking-widest text-lime-glow">Scheme Comparison</p>
        <h3 className="mt-1 font-display text-2xl font-bold text-offwhite">
          Compare selected schemes
        </h3>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-white/[0.08]">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.03]">
                <th className="px-4 py-3 text-xs uppercase tracking-widest text-offwhite-muted/60">
                  Scheme
                </th>
                {schemes.map((s) => (
                  <th key={s.id} className="px-4 py-3">
                    <p className="font-display text-sm font-bold text-offwhite">{s.name}</p>
                    <span className="mt-1 inline-block rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-offwhite-muted">
                      {s.category}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <tr key={row.label} className={i % 2 ? 'bg-white/[0.02]' : ''}>
                  <td className="px-4 py-3 text-xs uppercase tracking-widest text-offwhite-muted/60">
                    {row.label}
                  </td>
                  {schemes.map((s) => (
                    <td key={s.id} className="px-4 py-3 text-sm leading-relaxed text-offwhite-muted">
                      {row.get(s)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 flex items-center gap-1.5 text-[11px] text-offwhite-muted/50">
          <Info className="h-3 w-3" />
          Demo comparison — values are simulated. Verify eligibility on official portals.
        </p>
      </div>
    </Modal>
  );
}

/* ============================================================
   Shared bits
   ============================================================ */

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-5">
      <p className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-offwhite-muted/60">
        <FileText className="h-3 w-3 text-lime-glow" />
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function MetaRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <Icon className="h-4 w-4 shrink-0 text-lime-glow/80" />
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-offwhite-muted/60">{label}</p>
        <p className="truncate text-sm text-offwhite">{value}</p>
      </div>
    </div>
  );
}
