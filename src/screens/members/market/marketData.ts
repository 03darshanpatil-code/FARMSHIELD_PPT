/* ============================================================
   Market Price Forecasting — mock/demo data layer
   All values are simulated for presentation purposes only.
   ============================================================ */

export interface Market {
  id: string;
  name: string;
  distanceKm: number;
  status: 'Open' | 'Closing Soon';
  openingHours: string;
  capacityTons: string;
  rating: number;
  established: string;
  vehicles: string;
  reason: string;
}

export interface Crop {
  id: string;
  name: string;
  dot: string;
  unit: string;
}

export const CROPS: Crop[] = [
  { id: 'tomato', name: 'Tomato', dot: 'bg-red-400', unit: 'kg' },
  { id: 'onion', name: 'Onion', dot: 'bg-offwhite', unit: 'kg' },
  { id: 'potato', name: 'Potato', dot: 'bg-amber-glow', unit: 'kg' },
  { id: 'rice', name: 'Rice', dot: 'bg-lime-glow', unit: 'kg' },
  { id: 'wheat', name: 'Wheat', dot: 'bg-emerald-glow', unit: 'kg' },
  { id: 'maize', name: 'Maize', dot: 'bg-yellow-300', unit: 'kg' },
  { id: 'mango', name: 'Mango', dot: 'bg-orange-400', unit: 'kg' },
  { id: 'apple', name: 'Apple', dot: 'bg-red-500', unit: 'kg' },
];

export const MARKETS: Market[] = [
  {
    id: 'a',
    name: 'Gandhinagar APMC',
    distanceKm: 2.4,
    status: 'Open',
    openingHours: '5:30 AM – 8:00 PM',
    capacityTons: '~1,200 tonnes/day',
    rating: 4.6,
    established: 'Est. 1975 · Maharashtra State APMC',
    vehicles: '40+ truck & tempo loading bays',
    reason: 'Nearest market with a competitive price — minimal transport cost.',
  },
  {
    id: 'b',
    name: 'Urali Devachi Bazaar',
    distanceKm: 5.8,
    status: 'Open',
    openingHours: '6:00 AM – 7:30 PM',
    capacityTons: '~850 tonnes/day',
    rating: 4.4,
    established: 'Est. 1988 · Primary wholesale yard',
    vehicles: 'Direct farm-gate pickup lane',
    reason: 'Higher simulated price with acceptable distance.',
  },
  {
    id: 'c',
    name: 'Hadapsar Mandi',
    distanceKm: 8.1,
    status: 'Closing Soon',
    openingHours: '4:00 AM – 6:00 PM',
    capacityTons: '~1,050 tonnes/day',
    rating: 4.2,
    established: 'Est. 1963 · Historic grain mandi',
    vehicles: 'Wide entry gates, cold storage on-site',
    reason: 'Deepest wholesale demand; verify transport cost before selling.',
  },
];

/** Current simulated price per kg for each crop at each market. */
export const MARKET_PRICES: Record<string, Record<string, number>> = {
  tomato: { a: 28, b: 32, c: 26 },
  onion: { a: 22, b: 25, c: 20 },
  potato: { a: 24, b: 27, c: 23 },
  rice: { a: 38, b: 42, c: 36 },
  wheat: { a: 26, b: 29, c: 25 },
  maize: { a: 21, b: 23, c: 20 },
  mango: { a: 85, b: 92, c: 80 },
  apple: { a: 120, b: 135, c: 110 },
};

export const SELLING_LOT_KG = 100;

/* ------------------------------------------------------------
   Forecast series generation
   Deterministic seeded random walk — stable across re-renders.
   ------------------------------------------------------------ */

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Small per-market drift so trends read clearly: A rises, B holds, C softens. */
const DRIFT: Record<string, number> = { a: 0.0018, b: 0.0004, c: -0.0012 };

export function buildForecast(
  cropId: string,
  marketId: string,
  days: number,
): { day: number; price: number }[] {
  const start = MARKET_PRICES[cropId]?.[marketId] ?? 20;
  let seed = (hashString(cropId) * 31 + hashString(marketId) * 7 + days) % 2147483647;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const bias = DRIFT[marketId] ?? 0;
  const series = [{ day: 0, price: start }];
  let price = start;
  for (let d = 1; d <= days; d++) {
    price = Math.max(1, price * (1 + bias + (rand() - 0.5) * 0.028));
    series.push({ day: d, price: round2(price) });
  }
  return series;
}

export type Trend = 'up' | 'down' | 'stable';

export function getTrend(series: { price: number }[]): Trend {
  const first = series[0].price;
  const last = series[series.length - 1].price;
  const change = (last - first) / first;
  if (change > 0.015) return 'up';
  if (change < -0.015) return 'down';
  return 'stable';
}

export function getPriceChange(series: { price: number }[]): number {
  const first = series[0].price;
  const last = series[series.length - 1].price;
  return Math.round(((last - first) / first) * 1000) / 10;
}

export function getMarketById(id: string): Market {
  return MARKETS.find((m) => m.id === id) ?? MARKETS[0];
}

export function getCropById(id: string): Crop {
  return CROPS.find((c) => c.id === id) ?? CROPS[0];
}

/** Highest-price market for the given crop (the demo "recommended" pick). */
export function getRecommendedMarket(cropId: string): Market {
  return [...MARKETS].sort(
    (x, y) =>
      (MARKET_PRICES[cropId]?.[y.id] ?? 0) - (MARKET_PRICES[cropId]?.[x.id] ?? 0),
  )[0];
}

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export const formatPrice = (n: number) =>
  n % 1 === 0 ? `${n}` : n.toFixed(1).replace(/\.0$/, '');
