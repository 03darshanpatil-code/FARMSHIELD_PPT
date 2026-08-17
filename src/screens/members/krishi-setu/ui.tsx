import { initials } from './data';

const AVATAR_GRADIENTS = [
  'from-emerald-500/80 to-forest-700',
  'from-lime-500/70 to-forest-800',
  'from-amber-glow/70 to-forest-700',
  'from-emerald-glow/60 to-forest-900',
  'from-lime-glow/60 to-forest-800',
  'from-amber-600/70 to-forest-800',
];

export function Avatar({
  name,
  size = 'md',
  index = 0,
}: {
  name: string;
  size?: 'md' | 'lg';
  index?: number;
}) {
  const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-display font-bold text-offwhite ring-1 ring-white/15 ${
        size === 'lg' ? 'h-14 w-14 text-base' : 'h-11 w-11 text-sm'
      } ${gradient}`}
    >
      {initials(name)}
    </span>
  );
}

export function SectionHeading({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h3 className="font-display text-xl font-semibold text-offwhite sm:text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-offwhite-muted">{subtitle}</p>
      </div>
      {badge && (
        <span className="rounded-lg border border-amber-glow/30 bg-amber-glow/[0.07] px-3 py-1.5 text-xs font-medium text-amber-glow">
          {badge}
        </span>
      )}
    </div>
  );
}
