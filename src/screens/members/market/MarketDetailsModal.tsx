import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  Scale,
  Star,
  Truck,
  Landmark,
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
} from 'lucide-react';
import Modal from '@/screens/members/Modal';
import {
  buildForecast,
  formatPrice,
  getPriceChange,
  getTrend,
  inr,
  SELLING_LOT_KG,
  type Crop,
  type Market,
} from './marketData';

interface MarketDetailsModalProps {
  open: boolean;
  onClose: () => void;
  market: Market;
  crop: Crop;
  period: number;
}

export default function MarketDetailsModal({
  open,
  onClose,
  market,
  crop,
  period,
}: MarketDetailsModalProps) {
  const series = buildForecast(crop.id, market.id, period);
  const current = series[0].price;
  const trend = getTrend(series);
  const change = getPriceChange(series);
  const sellingValue = current * SELLING_LOT_KG;

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor =
    trend === 'up'
      ? 'text-emerald-glow'
      : trend === 'down'
        ? 'text-amber-glow'
        : 'text-offwhite-muted';

  const rows = [
    { icon: Clock, label: 'Opening Hours', value: market.openingHours },
    { icon: Scale, label: 'Daily Capacity', value: market.capacityTons },
    { icon: Truck, label: 'Logistics', value: market.vehicles },
    { icon: Landmark, label: 'Market', value: market.established },
  ];

  return (
    <Modal open={open} onClose={onClose} label={`${market.name} — market details`}>
      <div className="pr-6">
        <p className="text-xs uppercase tracking-widest text-amber-glow">Market Details</p>
        <h3 className="mt-1 font-display text-2xl font-bold text-offwhite">{market.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-offwhite-muted">
          <MapPin className="h-3.5 w-3.5 text-emerald-glow" />
          {market.distanceKm} km from farm ·{' '}
          <span
            className={
              market.status === 'Open' ? 'text-emerald-glow' : 'text-amber-glow'
            }
          >
            {market.status}
          </span>
        </p>
      </div>

      {/* Price summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-5 rounded-2xl border border-amber-glow/25 bg-gradient-to-br from-amber-glow/[0.08] to-transparent p-5"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-offwhite-muted/70">
              {crop.name} · current price
            </p>
            <p className="mt-1 font-display text-3xl font-bold text-offwhite">
              ₹{formatPrice(current)}
              <span className="ml-1 text-sm font-medium text-offwhite-muted">/ {crop.unit}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-offwhite-muted/70">
              {period}-day forecast trend
            </p>
            <p className={`mt-1 flex items-center justify-end gap-1.5 font-display text-lg font-semibold ${trendColor}`}>
              <TrendIcon className="h-4 w-4" />
              {change > 0 ? '+' : ''}
              {change}%
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
          <span className="text-sm text-offwhite-muted">
            Simulated selling value · {SELLING_LOT_KG} kg lot
          </span>
          <span className="font-display text-lg font-bold text-lime-glow">
            {inr(sellingValue)}
          </span>
        </div>
      </motion.div>

      {/* Info rows */}
      <div className="mt-5 space-y-2.5">
        {rows.map((row, i) => {
          const Icon = row.icon;
          return (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
            >
              <Icon className="h-4 w-4 shrink-0 text-emerald-glow/80" />
              <span className="w-32 shrink-0 text-xs uppercase tracking-widest text-offwhite-muted/60">
                {row.label}
              </span>
              <span className="text-sm text-offwhite">{row.value}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Rating + reason */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-offwhite">
          <Star className="h-4 w-4 fill-amber-glow text-amber-glow" />
          {market.rating.toFixed(1)} demo rating
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-offwhite-muted/60">
          <Info className="h-3.5 w-3.5" />
          Demonstration data
        </span>
      </div>
    </Modal>
  );
}
