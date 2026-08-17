import type { LucideIcon } from 'lucide-react';
import {
  Sprout,
  LineChart,
  CloudRain,
  Landmark,
  Cpu,
  Wheat,
  Tractor,
  ShoppingCart,
} from 'lucide-react';

export type NewsCategory = 'Crop' | 'Market' | 'Weather' | 'Government' | 'Technology' | 'Farming';
export type NewsTag = 'LATEST' | 'TRENDING' | 'IMPORTANT';

export interface NewsItem {
  id: number;
  headline: string;
  summary: string;
  category: NewsCategory;
  date: string;
  time: string;
  readMinutes: number;
  icon: LucideIcon;
  tag: NewsTag;
  featured?: boolean;
  body: string[];
  takeaways: string[];
  related: number[];
}

export const NEWS_CATEGORIES = [
  'All',
  'Crop',
  'Market',
  'Weather',
  'Government',
  'Technology',
  'Farming',
] as const;

export type NewsCategoryFilter = (typeof NEWS_CATEGORIES)[number];

export const NEWS: NewsItem[] = [
  {
    id: 1,
    headline: 'Vegetable mandi prices firm up as sowing season peaks',
    summary:
      'Tomato and onion rates hold steady at major demo mandis, with arrivals rising 12% week-on-week as the kharif harvest reaches market.',
    category: 'Market',
    date: '17 Aug',
    time: '06:40 AM',
    readMinutes: 4,
    icon: LineChart,
    tag: 'LATEST',
    featured: true,
    body: [
      'Arrivals of kharif vegetables are rising steadily across the demo mandis tracked by FarmShield. Tomato moved 14% higher week-on-week on firm demand from urban wholesale buyers, while onion remained range-bound.',
      'Field reports from the simulated network suggest the peak of the current harvest will reach markets over the next ten days. When arrivals peak, prices typically soften — so farmers who can store briefly may benefit from staggered selling.',
      'The Market Price Forecasting module simulates these patterns using the last 30 days of demo data, helping farmers compare nearby markets before deciding where to sell.',
    ],
    takeaways: [
      'Tomato prices up ~14% week-on-week in demo mandis.',
      'Peak arrivals expected within 10 days — consider staggered selling.',
      'Compare nearby markets before you load the cart.',
    ],
    related: [3, 9],
  },
  {
    id: 2,
    headline: 'Monsoon trough brings patchy rain to southern districts this week',
    summary:
      'Simulated weather models show scattered showers over the next 48 hours — a brief window to hold off on irrigation.',
    category: 'Weather',
    date: '17 Aug',
    time: '05:15 AM',
    readMinutes: 3,
    icon: CloudRain,
    tag: 'IMPORTANT',
    body: [
      'The demo weather model places a monsoon trough over the southern belt for the next two days. Expected rainfall is light to moderate — enough to delay one irrigation cycle for most standing crops.',
      'Farmers with vegetable plots should keep rows well-drained. Standing water beyond 12 hours can stress root systems, especially in heavier soils.',
      'For field-specific guidance, the Weather Intelligence module simulates irrigation, crop-care, and field-activity suggestions for your location.',
    ],
    takeaways: [
      'Light rain expected within 48 hours.',
      'Hold one irrigation cycle where soil moisture is adequate.',
      'Ensure drainage channels are clear before the rain arrives.',
    ],
    related: [5, 8],
  },
  {
    id: 3,
    headline: 'Soil health card cycle opens for 12 demo districts',
    summary:
      'The next application window for soil health cards has opened — check eligibility and required documents in the Government Schemes module.',
    category: 'Government',
    date: '16 Aug',
    time: '10:20 AM',
    readMinutes: 3,
    icon: Landmark,
    tag: 'IMPORTANT',
    body: [
      'The demo application cycle for soil health cards is now open in 12 districts. Cards help farmers understand the nutrient status of their soil and plan fertilizer use accordingly.',
      'Eligibility is typically tied to land ownership records and a valid farmer identity. The Government Schemes module simulates an eligibility check for your demo profile.',
      'Remember: this is simulated news. Always verify the current cycle and deadlines on the official government portal before applying.',
    ],
    takeaways: [
      'Application window now open in 12 demo districts.',
      'Soil health cards guide balanced fertilizer planning.',
      'Verify deadlines on the official portal before applying.',
    ],
    related: [7, 4],
  },
  {
    id: 4,
    headline: 'Drip irrigation adoption crosses 40% in command areas',
    summary:
      'Demo data from the FarmShield network shows drip systems now cover 40% of command-area acreage, cutting water use by up to a third.',
    category: 'Technology',
    date: '16 Aug',
    time: '08:05 AM',
    readMinutes: 5,
    icon: Cpu,
    tag: 'TRENDING',
    body: [
      'Farmers in the simulated command areas continue shifting to drip irrigation. Reported benefits include steadier yields during dry spells and reduced labour for watering.',
      'The trend is strongest for high-value crops like tomato, chilli, and sugarcane, where precise watering directly improves quality.',
      'Equipment booking for drip-compatible pumps and filters is demonstrated in the Krishi Setu module.',
    ],
    takeaways: [
      'Drip adoption at 40% in demo command areas.',
      'Water use down up to ~33% where adopted.',
      'Equipment and labour are bookable via Krishi Setu.',
    ],
    related: [9, 8],
  },
  {
    id: 5,
    headline: 'Early blight alert: keep tomato fields ventilated',
    summary:
      'Humid conditions favour early blight in tomato. Demo advisory: prune lower leaves and avoid evening overhead watering.',
    category: 'Crop',
    date: '15 Aug',
    time: '07:30 PM',
    readMinutes: 4,
    icon: Sprout,
    tag: 'IMPORTANT',
    body: [
      'The demo advisory flags conditions favourable to early blight across the tomato belt: warm days, humid nights, and light rain.',
      'General precautions include keeping rows ventilated, pruning lower leaves that touch the soil, and watering at the base of plants in the morning.',
      'For suspected infections, consult a local agriculture officer before using any fungicide. The Plant Doctor AI module demonstrates how a farmer might ask about symptoms and receive general guidance.',
    ],
    takeaways: [
      'Humid nights favour early blight in tomato.',
      'Prune lower leaves and water in the morning.',
      'Consult an agriculture officer before any fungicide use.',
    ],
    related: [2, 1],
  },
  {
    id: 6,
    headline: 'Millet procurement expands under the demo policy cycle',
    summary:
      'The demo procurement list adds two more millet varieties, with support prices unchanged for the current cycle.',
    category: 'Government',
    date: '15 Aug',
    time: '09:10 AM',
    readMinutes: 3,
    icon: Wheat,
    tag: 'LATEST',
    body: [
      'The simulated procurement cycle has been expanded to include two additional millet varieties, giving farmers more options at support prices.',
      'Registrations happen through the same demo flow as previous cycles — check your land records are updated well in advance.',
      'This is demonstration news. Procurement rules and support prices must be confirmed on official government channels.',
    ],
    takeaways: [
      'Two more millet varieties added to demo procurement.',
      'Keep land records updated before registration.',
      'Confirm support prices on official channels.',
    ],
    related: [3, 7],
  },
  {
    id: 7,
    headline: 'Farmers trial drone spraying for high-density orchards',
    summary:
      'A demo pilot maps orchard spraying with drones — coverage is faster, but crop-stage selection matters.',
    category: 'Technology',
    date: '14 Aug',
    time: '04:45 PM',
    readMinutes: 5,
    icon: Tractor,
    tag: 'TRENDING',
    body: [
      'Drone-assisted spraying is being trialled across high-density orchards in the demo network. Early feedback points to faster coverage and more even application on tall canopies.',
      'Pilots and agronomists note that crop stage, wind speed, and nozzle calibration determine effectiveness — spraying is only suitable at certain growth stages.',
      'General guidance remains: read product labels, follow local regulations, and consult an agriculture officer before adopting new application methods.',
    ],
    takeaways: [
      'Drone spraying covers orchards faster in the demo pilot.',
      'Crop stage and wind matter for effectiveness.',
      'Follow label guidance and local regulations.',
    ],
    related: [4, 5],
  },
  {
    id: 8,
    headline: 'Fertilizer availability improves ahead of rabi planning',
    summary:
      'Demo stock positions for major fertilizers are stable, with balanced NPK blends in better supply this quarter.',
    category: 'Farming',
    date: '14 Aug',
    time: '11:55 AM',
    readMinutes: 3,
    icon: ShoppingCart,
    tag: 'LATEST',
    body: [
      'Stock simulations for the coming rabi cycle show balanced NPK blends in better supply than last quarter. Urea and DAP remain available at demo reference prices.',
      'Fertilizer needs vary by crop and soil condition. The Fertilizer Marketplace module lets farmers compare demo prices and place simulated orders.',
      'Always buy from licensed dealers and match the product to your soil health card recommendations.',
    ],
    takeaways: [
      'Balanced NPK blends in better demo supply.',
      'Compare prices in the Fertilizer Marketplace.',
      'Buy from licensed dealers only.',
    ],
    related: [2, 6],
  },
  {
    id: 9,
    headline: 'Sugarcane crushing season to start earlier than usual',
    summary:
      'Demo mills signal an earlier start to crushing this year, with cane availability expected to be ample.',
    category: 'Crop',
    date: '13 Aug',
    time: '06:30 PM',
    readMinutes: 4,
    icon: Wheat,
    tag: 'LATEST',
    body: [
      'Several demo mills have announced an earlier crushing start this season, citing adequate cane availability and good juice recovery.',
      'Farmers with cane for supply should confirm their registration and transport slots with the local mill well before the start date.',
      'Selling windows matter — the Market Price Forecasting module simulates price trends to help farmers time their sales.',
    ],
    takeaways: [
      'Crushing likely to start earlier this season.',
      'Confirm registration and transport slots with your mill.',
      'Use price forecasts to time sales.',
    ],
    related: [1, 5],
  },
];

export interface FarmerBriefItem {
  id: string;
  label: string;
  title: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}

export const FARMER_BRIEF: FarmerBriefItem[] = [
  {
    id: 'market',
    label: 'Market',
    title: 'Tomato ₹28/kg at nearest market',
    value: '▲ ₹2 vs last week',
    detail: 'Compare prices across 3 nearby markets in Market Price Forecasting.',
    icon: LineChart,
  },
  {
    id: 'weather',
    label: 'Weather',
    title: 'Light rain expected in 2 days',
    value: 'Hold one irrigation cycle',
    detail: 'Full 7-day outlook in Weather Intelligence.',
    icon: CloudRain,
  },
  {
    id: 'government',
    label: 'Government',
    title: 'KCC renewal window open',
    value: 'Demo eligibility check available',
    detail: 'Check your profile in Government Schemes.',
    icon: Landmark,
  },
  {
    id: 'cropcare',
    label: 'Crop Care',
    title: 'Early-blight watch for tomato',
    value: 'Keep rows ventilated',
    detail: 'Ask Plant Doctor AI for general crop-care guidance.',
    icon: Sprout,
  },
];
