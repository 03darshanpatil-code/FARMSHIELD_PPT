/* ============================================================
   Weather Intelligence — mock/demo data layer
   Simulated values for presentation only.
   ============================================================ */

export interface DayForecast {
  day: string; // short label, e.g. "Mon"
  label: string; // full label, e.g. "Monday"
  condition: WeatherCondition;
  high: number;
  low: number;
  rain: number; // %
  humidity: number; // %
  wind: number; // km/h
  windDir: string;
}

export type WeatherCondition =
  | 'Sunny'
  | 'Partly Cloudy'
  | 'Overcast'
  | 'Light Rain'
  | 'Rain'
  | 'Storm'
  | 'Fog';

export const FARM_LOCATION = 'Chikhali Road, Kolhapur';
export const WEATHER_RADIUS_KM = 10;

/** Simulated 7-day outlook. Day 0 is "today". */
export const FORECAST: DayForecast[] = [
  { day: 'Mon', label: 'Monday', condition: 'Partly Cloudy', high: 33, low: 28, rain: 35, humidity: 72, wind: 14, windDir: 'NE' },
  { day: 'Tue', label: 'Tuesday', condition: 'Sunny', high: 32, low: 27, rain: 20, humidity: 68, wind: 18, windDir: 'NW' },
  { day: 'Wed', label: 'Wednesday', condition: 'Light Rain', high: 31, low: 26, rain: 55, humidity: 74, wind: 22, windDir: 'SW' },
  { day: 'Thu', label: 'Thursday', condition: 'Rain', high: 29, low: 25, rain: 80, humidity: 82, wind: 25, windDir: 'SW' },
  { day: 'Fri', label: 'Friday', condition: 'Rain', high: 30, low: 25, rain: 65, humidity: 78, wind: 19, windDir: 'SW' },
  { day: 'Sat', label: 'Saturday', condition: 'Sunny', high: 32, low: 26, rain: 30, humidity: 70, wind: 12, windDir: 'N' },
  { day: 'Sun', label: 'Sunday', condition: 'Partly Cloudy', high: 33, low: 27, rain: 10, humidity: 64, wind: 16, windDir: 'NE' },
];

/** Current simulated conditions (consistent with day 0). */
export const CURRENT_WEATHER = {
  temp: 28,
  feelsLike: 30,
  condition: 'Partly Cloudy' as WeatherCondition,
  humidity: 72,
  wind: 14,
  windDir: 'NE',
  rain: 35,
  sunrise: '6:12 AM',
  sunset: '6:54 PM',
};

/** Chart series: mean temperature, rainfall %, humidity % across the 7 days. */
export const CHART_SERIES = {
  temperature: FORECAST.map((d) => Math.round(((d.high + d.low) / 2) * 10) / 10),
  rainfall: FORECAST.map((d) => d.rain),
  humidity: FORECAST.map((d) => d.humidity),
} as const;

export type ChartMetric = keyof typeof CHART_SERIES;

export const CHART_METRICS: { id: ChartMetric; label: string }[] = [
  { id: 'temperature', label: 'Temperature' },
  { id: 'rainfall', label: 'Rainfall' },
  { id: 'humidity', label: 'Humidity' },
];

/* ------------------------------------------------------------
   Crop-specific weather view
   ------------------------------------------------------------ */

export interface CropWeather {
  id: string;
  name: string;
  dot: string;
  irrigation: 'Low' | 'Moderate' | 'High';
  insight: string;
}

export const WEATHER_CROPS: CropWeather[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    dot: 'bg-red-400',
    irrigation: 'Moderate',
    insight:
      'Simulated conditions indicate moderate irrigation requirements for tomato — light watering may be appropriate if rain stays below 40%.',
  },
  {
    id: 'rice',
    name: 'Rice',
    dot: 'bg-lime-glow',
    irrigation: 'High',
    insight:
      'Rice has high simulated water demand — the forecast rain on Thursday could be beneficial, though standing water should be managed.',
  },
  {
    id: 'wheat',
    name: 'Wheat',
    dot: 'bg-emerald-glow',
    irrigation: 'Moderate',
    insight:
      'Simulated conditions suggest low-to-moderate irrigation needs for wheat this week, with humidity aiding moisture retention.',
  },
  {
    id: 'maize',
    name: 'Maize',
    dot: 'bg-yellow-300',
    irrigation: 'Moderate',
    insight:
      'Maize may tolerate the current simulated moisture levels; consider irrigation only if dry spells extend beyond two days.',
  },
  {
    id: 'onion',
    name: 'Onion',
    dot: 'bg-offwhite',
    irrigation: 'Low',
    insight:
      'Onion prefers drier simulated conditions — excess rain near harvest can be a concern, so plan storage carefully.',
  },
  {
    id: 'potato',
    name: 'Potato',
    dot: 'bg-amber-glow',
    irrigation: 'Moderate',
    insight:
      'Moderate simulated irrigation may support tuber development; avoid waterlogging during the rainier mid-week days.',
  },
];

/* ------------------------------------------------------------
   Farming insights (derived from demo conditions)
   ------------------------------------------------------------ */

export interface Insight {
  id: string;
  title: string;
  text: string;
  level: 'info' | 'warning' | 'success';
}

export const DEMO_INSIGHTS: Insight[] = [
  {
    id: 'irrigation',
    title: 'Irrigation',
    text: 'Simulated rainfall is low today (35%). Light irrigation may be appropriate for moisture-sensitive crops this morning.',
    level: 'info',
  },
  {
    id: 'crop-care',
    title: 'Crop Care',
    text: 'Humidity is elevated (72%). A general inspection of lower leaves for fungal pressure is suggested in the demo conditions.',
    level: 'info',
  },
  {
    id: 'rain-alert',
    title: 'Rain Alert',
    text: 'Simulated heavy rainfall (80%) is expected on Thursday. Consider planning harvest and drying activities before then.',
    level: 'warning',
  },
  {
    id: 'field-activity',
    title: 'Field Activity',
    text: 'Conditions appear suitable for light field work today; avoid spraying or harvest near the rainier mid-week window.',
    level: 'success',
  },
];
