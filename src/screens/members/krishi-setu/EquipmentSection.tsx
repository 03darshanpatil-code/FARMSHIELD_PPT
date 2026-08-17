import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tractor,
  Combine,
  Sprout,
  Droplets,
  Wrench,
  MapPin,
  Star,
  Eye,
  CalendarDays,
  CheckCircle2,
  Check,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import { fadeUp, staggerContainerFast } from '@/lib/motion';
import Modal from '@/screens/members/Modal';
import { EQUIPMENT, type Equipment } from './data';
import { SectionHeading } from './ui';

interface EquipmentSectionProps {
  booked: string[];
  onBook: (equipmentId: string) => void;
}

const EQUIPMENT_ICONS: Record<string, LucideIcon> = {
  e1: Tractor,
  e2: Combine,
  e3: Sprout,
  e4: Droplets,
  e5: Wrench,
};

const DURATIONS = [
  { id: 'half', label: 'Half Day', factor: 0.6 },
  { id: 'full', label: 'Full Day', factor: 1 },
  { id: '2days', label: '2 Days', factor: 1.9 },
  { id: 'week', label: '1 Week', factor: 6 },
];

const dateLabel = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
};

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export default function EquipmentSection({ booked, onBook }: EquipmentSectionProps) {
  const [detail, setDetail] = useState<Equipment | null>(null);
  const [booking, setBooking] = useState<Equipment | null>(null);

  return (
    <motion.div variants={staggerContainerFast} initial="hidden" animate="visible">
      <SectionHeading
        title="Equipment"
        subtitle="Rent tractors, harvesters, seeders and sprayers from verified local providers."
        badge={`${booked.length} booked in demo`}
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EQUIPMENT.map((eq) => {
          const Icon = EQUIPMENT_ICONS[eq.id] ?? Tractor;
          const isBooked = booked.includes(eq.id);
          return (
            <motion.div
              key={eq.id}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className={`glass-card flex flex-col p-5 transition-all duration-300 ${
                isBooked ? 'border-lime-glow/40 shadow-glow' : 'hover:border-amber-glow/30 hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-glow/10 ring-1 ring-amber-glow/20">
                  <Icon className="h-5 w-5 text-amber-glow" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-base font-semibold leading-snug text-offwhite">
                    {eq.name}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-offwhite-muted">
                    <Truck className="h-3 w-3 shrink-0 text-emerald-glow" />
                    <span className="truncate">{eq.provider}</span>
                  </p>
                </div>
                <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-xs font-semibold text-amber-glow">
                  <Star className="h-3 w-3 fill-amber-glow" />
                  {eq.rating.toFixed(1)}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-offwhite-muted/80">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-glow" />
                  {eq.location}
                </span>
                <span
                  className={
                    eq.availability === 'Available Today'
                      ? 'text-emerald-glow'
                      : 'text-amber-glow'
                  }
                >
                  {eq.availability}
                </span>
              </div>

              <p className="mt-4 font-display text-2xl font-bold text-offwhite">
                {inr(eq.pricePerDay)}
                <span className="ml-1 text-sm font-medium text-offwhite-muted">/ day</span>
              </p>

              {isBooked && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-lime-glow"
                >
                  <Check className="h-3.5 w-3.5" />
                  Booked in this demo
                </motion.p>
              )}

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-4">
                <button
                  onClick={() => setDetail(eq)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs font-semibold text-offwhite-muted transition-all hover:border-white/25 hover:text-offwhite"
                >
                  <Eye className="h-3.5 w-3.5" />
                  VIEW
                </button>
                <button
                  onClick={() => setBooking(eq)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-amber-glow/40 bg-amber-glow/10 px-3 py-2.5 text-xs font-bold text-amber-glow transition-all hover:border-amber-glow/60 hover:bg-amber-glow/15"
                >
                  <CalendarDays className="h-3.5 w-3.5" />
                  BOOK
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-5 flex items-center gap-2 text-xs text-offwhite-muted/50">
        <Truck className="h-3.5 w-3.5" />
        Demo rentals — bookings are simulated and shown live in My Network.
      </p>

      <EquipmentDetailModal equipment={detail} onClose={() => setDetail(null)} />
      <BookingModal equipment={booking} onClose={() => setBooking(null)} onConfirm={onBook} />
    </motion.div>
  );
}

/* ============================================================
   Equipment detail modal
   ============================================================ */

function EquipmentDetailModal({
  equipment,
  onClose,
}: {
  equipment: Equipment | null;
  onClose: () => void;
}) {
  const Icon = equipment ? (EQUIPMENT_ICONS[equipment.id] ?? Tractor) : Tractor;

  return (
    <Modal open={equipment !== null} onClose={onClose} label="Equipment details">
      {equipment && (
        <div className="pr-6">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-glow/10 ring-1 ring-amber-glow/25">
              <Icon className="h-6 w-6 text-amber-glow" />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-offwhite">{equipment.name}</h3>
              <p className="flex items-center gap-1.5 text-sm text-offwhite-muted">
                <Truck className="h-3.5 w-3.5 text-emerald-glow" />
                {equipment.provider} · {equipment.location}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-offwhite-muted">
              <Star className="h-3 w-3 fill-amber-glow text-amber-glow" />
              {equipment.rating.toFixed(1)} rating
            </span>
            <span
              className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                equipment.availability === 'Available Today'
                  ? 'border-emerald-glow/30 bg-emerald-glow/[0.08] text-emerald-glow'
                  : 'border-amber-glow/30 bg-amber-glow/[0.08] text-amber-glow'
              }`}
            >
              {equipment.availability}
            </span>
            <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-semibold text-offwhite">
              {inr(equipment.pricePerDay)}/day
            </span>
          </div>

          <p className="mt-5 text-xs uppercase tracking-widest text-offwhite-muted/60">
            Includes
          </p>
          <ul className="mt-2 space-y-1.5">
            {equipment.specs.map((spec) => (
              <li key={spec} className="flex items-center gap-2 text-sm text-offwhite-muted">
                <Check className="h-3.5 w-3.5 shrink-0 text-lime-glow" />
                {spec}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-[11px] text-offwhite-muted/50">
            Demo listing — availability and prices are simulated.
          </p>
        </div>
      )}
    </Modal>
  );
}

/* ============================================================
   Booking modal
   ============================================================ */

function BookingModal({
  equipment,
  onClose,
  onConfirm,
}: {
  equipment: Equipment | null;
  onClose: () => void;
  onConfirm: (equipmentId: string) => void;
}) {
  const [date, setDate] = useState<number | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [phase, setPhase] = useState<'form' | 'submitting' | 'done'>('form');

  useEffect(() => {
    if (equipment) {
      setDate(null);
      setDuration(null);
      setPhase('form');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipment?.id]);

  const selectedDuration = DURATIONS.find((d) => d.id === duration);
  const total = equipment && selectedDuration
    ? Math.round(equipment.pricePerDay * selectedDuration.factor)
    : 0;

  const confirm = () => {
    setPhase('submitting');
    window.setTimeout(() => {
      setPhase('done');
      if (equipment) onConfirm(equipment.id);
    }, 800);
  };

  return (
    <Modal open={equipment !== null} onClose={onClose} label="Book equipment">
      {equipment && (
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
                  Demo Booking
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-offwhite">
                  {equipment.name}
                </h3>

                <p className="mt-5 text-sm text-offwhite-muted">Select date</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[0, 1, 2, 3, 4].map((offset) => {
                    const active = date === offset;
                    return (
                      <button
                        key={offset}
                        onClick={() => setDate(offset)}
                        className={`rounded-xl border px-3.5 py-2 text-xs font-medium transition-all ${
                          active
                            ? 'border-amber-glow/50 bg-amber-glow/10 text-amber-glow'
                            : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
                        }`}
                      >
                        {dateLabel(offset)}
                        {offset === 0 && (
                          <span className="ml-1.5 text-[10px] font-bold text-emerald-glow">TODAY</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-6 text-sm text-offwhite-muted">Select duration</p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {DURATIONS.map((d) => {
                    const active = duration === d.id;
                    return (
                      <button
                        key={d.id}
                        onClick={() => setDuration(d.id)}
                        className={`rounded-xl border px-3 py-2.5 text-left transition-all ${
                          active
                            ? 'border-amber-glow/50 bg-amber-glow/10'
                            : 'border-white/[0.08] bg-white/[0.03] hover:border-white/20'
                        }`}
                      >
                        <span className={`block text-xs font-semibold ${active ? 'text-amber-glow' : 'text-offwhite'}`}>
                          {d.label}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-offwhite-muted/70">
                          {inr(Math.round(equipment.pricePerDay * d.factor))}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                  <p className="text-sm text-offwhite-muted">
                    {date !== null && duration ? (
                      <>
                        {dateLabel(date)} · {selectedDuration?.label} ·{' '}
                        <span className="font-display font-bold text-lime-glow">{inr(total)}</span>
                      </>
                    ) : (
                      'Pick a date and duration to continue'
                    )}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={date === null || duration === null || phase === 'submitting'}
                    onClick={confirm}
                    className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition-all ${
                      date !== null && duration
                        ? 'border-amber-glow/50 bg-gradient-to-r from-amber-glow/30 to-amber-glow/10 text-amber-glow hover:border-amber-glow/80'
                        : 'cursor-not-allowed border-white/[0.08] bg-white/[0.02] text-offwhite-muted/50'
                    }`}
                  >
                    {phase === 'submitting' ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-amber-glow/30 border-t-amber-glow" />
                        Confirming…
                      </>
                    ) : (
                      <>
                        <CalendarDays className="h-4 w-4" />
                        CONFIRM BOOKING
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
                  DEMO BOOKING CONFIRMED
                </h3>
                <p className="mt-2 max-w-sm text-sm text-offwhite-muted">
                  {equipment.name} reserved for{' '}
                  <span className="font-semibold text-offwhite">
                    {date !== null ? dateLabel(date) : '—'} · {selectedDuration?.label}
                  </span>{' '}
                  ({inr(total)}). Simulated booking only.
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
