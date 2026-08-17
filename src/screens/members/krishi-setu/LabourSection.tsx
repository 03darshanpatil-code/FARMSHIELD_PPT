import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Star,
  Eye,
  UserPlus,
  CheckCircle2,
  Check,
  CalendarDays,
  BadgeCheck,
  Clock,
  Languages,
  Wallet,
  Send,
  type LucideIcon,
} from 'lucide-react';
import { fadeUp, staggerContainerFast } from '@/lib/motion';
import Modal from '@/screens/members/Modal';
import { WORKERS, WORK_REQUIREMENTS, type Worker } from './data';
import { Avatar, SectionHeading } from './ui';

interface LabourSectionProps {
  hired: string[];
  onHire: (workerName: string) => void;
}

export default function LabourSection({ hired, onHire }: LabourSectionProps) {
  const [profile, setProfile] = useState<Worker | null>(null);
  const [hiring, setHiring] = useState<Worker | null>(null);

  return (
    <motion.div variants={staggerContainerFast} initial="hidden" animate="visible">
      <SectionHeading
        title="Labour"
        subtitle="Discover skilled farm workers near you with demo availability and ratings."
        badge={`${hired.length} hired in demo`}
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WORKERS.map((worker, i) => {
          const isHired = hired.includes(worker.name);
          return (
            <motion.div
              key={worker.id}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className={`glass-card flex flex-col p-5 transition-all duration-300 ${
                isHired ? 'border-lime-glow/40 shadow-glow' : 'hover:border-amber-glow/30 hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-start gap-3">
                <Avatar name={worker.name} index={i} />
                <div className="min-w-0">
                  <p className="truncate font-display text-base font-semibold text-offwhite">
                    {worker.name}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-offwhite-muted">
                    <MapPin className="h-3 w-3 shrink-0 text-emerald-glow" />
                    <span className="truncate">{worker.location}</span>
                  </p>
                </div>
                <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-xs font-semibold text-amber-glow">
                  <Star className="h-3 w-3 fill-amber-glow" />
                  {worker.rating.toFixed(1)}
                </span>
              </div>

              <p className="mt-3 text-xs uppercase tracking-widest text-amber-glow">
                {worker.workType}
              </p>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {worker.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-xs text-offwhite-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-offwhite-muted/80">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-glow" />
                  {worker.availability}
                </span>
                <span>{worker.experience}</span>
                <span className="flex items-center gap-1">
                  <Wallet className="h-3.5 w-3.5 text-amber-glow" />
                  {worker.wage}
                </span>
              </div>

              {isHired && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-lime-glow"
                >
                  <Check className="h-3.5 w-3.5" />
                  Hired in this demo
                </motion.p>
              )}

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-4">
                <button
                  onClick={() => setProfile(worker)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs font-semibold text-offwhite-muted transition-all hover:border-white/25 hover:text-offwhite"
                >
                  <Eye className="h-3.5 w-3.5" />
                  VIEW PROFILE
                </button>
                <button
                  onClick={() => setHiring(worker)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-amber-glow/40 bg-amber-glow/10 px-3 py-2.5 text-xs font-bold text-amber-glow transition-all hover:border-amber-glow/60 hover:bg-amber-glow/15"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  HIRE
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Profile modal */}
      <WorkerProfileModal worker={profile} onClose={() => setProfile(null)} />

      {/* Hire modal */}
      <HireModal worker={hiring} onClose={() => setHiring(null)} onConfirm={onHire} />
    </motion.div>
  );
}

/* ============================================================
   Worker profile modal
   ============================================================ */

function WorkerProfileModal({ worker, onClose }: { worker: Worker | null; onClose: () => void }) {
  return (
    <Modal open={worker !== null} onClose={onClose} label="Worker profile">
      {worker && (
        <div className="pr-6">
          <div className="flex items-center gap-4">
            <Avatar name={worker.name} size="lg" />
            <div>
              <h3 className="font-display text-xl font-bold text-offwhite">{worker.name}</h3>
              <p className="flex items-center gap-1.5 text-sm text-offwhite-muted">
                <MapPin className="h-3.5 w-3.5 text-emerald-glow" />
                {worker.location} · {worker.experience}
              </p>
            </div>
            <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-sm font-semibold text-amber-glow">
              <Star className="h-3.5 w-3.5 fill-amber-glow" />
              {worker.rating.toFixed(1)}
            </span>
          </div>

          <div className="mt-5 space-y-2.5">
            <ProfileRow icon={BadgeCheck} label="Work Type" value={worker.workType} />
            <ProfileRow icon={CalendarDays} label="Availability" value={worker.availability} />
            <ProfileRow icon={Wallet} label="Wage (demo)" value={worker.wage} />
            <ProfileRow icon={Languages} label="Languages" value={worker.languages.join(', ')} />
            <ProfileRow
              icon={CheckCircle2}
              label="Skills"
              value={worker.skills.join(' · ')}
            />
          </div>

          <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
              Recent demo work
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-offwhite-muted">
              <li>· Kamble farm — onion harvest, 3 days (rated 4.9)</li>
              <li>· Pawar nursery — seedling sorting, 2 days (rated 4.7)</li>
            </ul>
          </div>

          <p className="mt-4 text-[11px] text-offwhite-muted/50">
            Demo profile — ratings and work history are simulated.
          </p>
        </div>
      )}
    </Modal>
  );
}

function ProfileRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <Icon className="h-4 w-4 shrink-0 text-amber-glow/80" />
      <span className="w-28 shrink-0 text-xs uppercase tracking-widest text-offwhite-muted/60">
        {label}
      </span>
      <span className="text-sm text-offwhite">{value}</span>
    </div>
  );
}

/* ============================================================
   Hire flow modal
   ============================================================ */

function HireModal({
  worker,
  onClose,
  onConfirm,
}: {
  worker: Worker | null;
  onClose: () => void;
  onConfirm: (workerName: string) => void;
}) {
  const [requirement, setRequirement] = useState<string | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [phase, setPhase] = useState<'form' | 'submitting' | 'done'>('form');

  // Reset the flow every time the modal opens for a worker
  useEffect(() => {
    if (worker) {
      setRequirement(null);
      setSelectedWorker(worker);
      setPhase('form');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worker?.id]);

  const submit = () => {
    setPhase('submitting');
    window.setTimeout(() => {
      setPhase('done');
      if (selectedWorker) onConfirm(selectedWorker.name);
    }, 800);
  };

  return (
    <Modal open={worker !== null} onClose={onClose} label="Hire worker">
      {worker && (
        <div className="pr-6">
          <AnimatePresence mode="wait">
            {phase !== 'done' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-xs uppercase tracking-widest text-amber-glow">
                  Demo Hiring
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-offwhite">
                  Hire a farm worker
                </h3>
                <p className="mt-1 text-sm text-offwhite-muted">
                  Step 1 · select the work requirement
                </p>

                {/* Step 1 — requirement */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {WORK_REQUIREMENTS.map((req) => (
                    <button
                      key={req}
                      onClick={() => setRequirement(req)}
                      className={`rounded-xl border px-3.5 py-2 text-xs font-medium transition-all ${
                        requirement === req
                          ? 'border-amber-glow/50 bg-amber-glow/10 text-amber-glow'
                          : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
                      }`}
                    >
                      {req}
                    </button>
                  ))}
                </div>

                <p className="mt-6 text-sm text-offwhite-muted">Step 2 · select the worker</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {WORKERS.map((w) => {
                    const active = selectedWorker?.id === w.id;
                    return (
                      <button
                        key={w.id}
                        onClick={() => setSelectedWorker(w)}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs transition-all ${
                          active
                            ? 'border-lime-glow/50 bg-lime-glow/10 text-lime-glow'
                            : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
                        }`}
                      >
                        <Avatar name={w.name} size="md" />
                        <span className="text-left">
                          <span className="block font-semibold">{w.name}</span>
                          <span className="block text-[10px] text-offwhite-muted/70">
                            {w.workType} · ★ {w.rating.toFixed(1)}
                          </span>
                        </span>
                        {active && <Check className="h-3.5 w-3.5" />}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <p className="text-xs text-offwhite-muted/60">
                    {selectedWorker ? (
                      <>
                        {selectedWorker.name} · {selectedWorker.wage} ·{' '}
                        <span className="text-amber-glow">{requirement ?? 'select requirement'}</span>
                      </>
                    ) : (
                      'Select a worker to continue'
                    )}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={!requirement || !selectedWorker || phase === 'submitting'}
                    onClick={submit}
                    className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition-all ${
                      requirement && selectedWorker
                        ? 'border-amber-glow/50 bg-gradient-to-r from-amber-glow/30 to-amber-glow/10 text-amber-glow hover:border-amber-glow/80'
                        : 'cursor-not-allowed border-white/[0.08] bg-white/[0.02] text-offwhite-muted/50'
                    }`}
                  >
                    {phase === 'submitting' ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-amber-glow/30 border-t-amber-glow" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        SUBMIT REQUEST
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-6 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-glow/15 ring-1 ring-lime-glow/30"
                >
                  <CheckCircle2 className="h-8 w-8 text-lime-glow" />
                </motion.span>
                <h3 className="mt-5 font-display text-xl font-bold text-lime-glow">
                  DEMO HIRING REQUEST SUBMITTED
                </h3>
                <p className="mt-2 max-w-sm text-sm text-offwhite-muted">
                  {selectedWorker?.name} has been notified for{' '}
                  <span className="font-semibold text-offwhite">{requirement}</span>.
                  This is a simulated request — no real hiring took place.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-2.5 text-sm font-medium text-offwhite-muted transition-all hover:border-white/25 hover:text-offwhite"
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </Modal>
  );
}
