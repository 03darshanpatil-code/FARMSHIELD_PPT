import { motion } from 'framer-motion';
import {
  ScanLine,
  MapPin,
  User,
  CalendarDays,
  Hash,
  Leaf,
  Sprout,
  FlaskConical,
  Droplets,
  Wheat,
  Package,
  BadgeCheck,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { PASSPORT } from './harvestData';

export default function CropPassport() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotateX: -4 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-b from-forest-800/60 to-forest-950/90 shadow-soft-lg backdrop-blur-sm"
    >
      {/* Header band */}
      <div className="relative border-b border-white/[0.08] bg-gradient-to-r from-lime-glow/[0.14] via-transparent to-emerald-glow/[0.12] px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-forest-500 to-forest-700 shadow-glow ring-1 ring-lime-glow/30">
              <ScanLine className="h-5 w-5 text-lime-glow" />
            </span>
            <div>
              <p className="font-display text-lg font-bold tracking-wide text-offwhite">
                HARVESTID
              </p>
              <p className="text-[11px] uppercase tracking-[0.25em] text-offwhite-muted/70">
                Digital Crop Passport
              </p>
            </div>
          </div>
          <motion.span
            animate={{ rotate: [0, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex -rotate-3 items-center gap-1.5 rounded-lg border-2 border-lime-glow/60 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-lime-glow"
          >
            <BadgeCheck className="h-4 w-4" />
            Verified
          </motion.span>
        </div>
      </div>

      <div className="px-6 py-6 sm:px-8">
        {/* Identity grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
          <Field icon={Hash} label="HarvestID" value={PASSPORT.harvestId} wide />
          <Field icon={Hash} label="Batch ID" value={PASSPORT.batchId} />
          <Field icon={Leaf} label="Crop" value={PASSPORT.crop} />
          <Field icon={Sprout} label="Variety" value={PASSPORT.variety} />
          <Field icon={MapPin} label="Farm Region" value={PASSPORT.region} wide />
          <Field icon={User} label="Farmer" value={`${PASSPORT.farmer} (demo)`} />
          <Field icon={CalendarDays} label="Harvest Date" value={PASSPORT.harvestDate} />
        </div>

        {/* Detail blocks */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DetailBlock icon={Leaf} title="Cultivation Method" text={PASSPORT.cultivation} />
          <DetailBlock icon={Sprout} title="Seed Information" text={PASSPORT.seed} />
          <DetailBlock icon={Droplets} title="Irrigation" text={PASSPORT.irrigation} />
          <DetailBlock icon={FlaskConical} title="Fertilizer / Input History" text={PASSPORT.inputs.join(' · ')} />
        </div>

        <DetailBlock icon={Wheat} title="Harvest Information" text={PASSPORT.harvest} />

        {/* Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
          <p className="flex items-center gap-1.5 text-[11px] text-offwhite-muted/50">
            <ShieldCheck className="h-3.5 w-3.5 text-lime-glow" />
            Demo passport — fictional data, no real farm or person represented.
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-offwhite-muted">
            <Package className="h-3 w-3" />
            Batch size: 240 kg
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  wide,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={wide ? 'col-span-2 sm:col-span-2' : ''}>
      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-offwhite-muted/60">
        <Icon className="h-3 w-3 text-lime-glow/80" />
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-offwhite">{value}</p>
    </div>
  );
}

function DetailBlock({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-offwhite-muted/60">
        <Icon className="h-3 w-3 text-lime-glow/80" />
        {title}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-offwhite-muted">{text}</p>
    </div>
  );
}
