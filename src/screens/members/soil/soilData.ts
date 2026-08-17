/* ============================================================
   Soil Intelligence — mock/demo data layer
   Location-based REGIONAL ESTIMATES for presentation only.
   FarmShield does not perform physical soil testing.
   ============================================================ */

export const SOIL_AREA = 'Chikhali Road, Kolhapur';
export const SOIL_RADIUS_KM = 10;

export interface SoilProfile {
  soilType: string;
  texture: string;
  drainage: string;
  organicMatter: string;
  phRange: string;
  phNote: string;
  waterRetention: string;
  nutrientTendency: string;
  composition: { label: string; value: number; color: string }[];
  nutrients: { label: string; value: number; level: string; color: string }[];
}

export const SOIL_PROFILE: SoilProfile = {
  soilType: 'Loamy Soil',
  texture: 'Medium',
  drainage: 'Good',
  organicMatter: 'Medium · ~1%',
  phRange: '6.2–7.1',
  phNote: 'Slightly acidic → neutral',
  waterRetention: 'Moderate',
  nutrientTendency: 'Balanced · slightly N-rich',
  composition: [
    { label: 'Sand', value: 42, color: 'bg-amber-glow/50' },
    { label: 'Silt', value: 34, color: 'bg-lime-glow/50' },
    { label: 'Clay', value: 24, color: 'bg-forest-400/70' },
  ],
  nutrients: [
    { label: 'Nitrogen (N)', value: 62, level: 'Medium', color: 'bg-emerald-glow' },
    { label: 'Phosphorus (P)', value: 44, level: 'Low–Med', color: 'bg-lime-glow' },
    { label: 'Potassium (K)', value: 56, level: 'Medium', color: 'bg-amber-glow' },
    { label: 'Organic Carbon', value: 50, level: 'Medium', color: 'bg-emerald-glow/70' },
  ],
};

export type SuitabilityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface CropSoil {
  id: string;
  name: string;
  dot: string;
  suitability: SuitabilityLevel;
  water: 'High' | 'Medium' | 'Low';
  soilPreference: string;
  reason: string;
  explanation: string;
  soilCharacteristics: string;
  considerations: string;
  recommendation?: string;
}

export const CROP_SUITABILITY: CropSoil[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    dot: 'bg-red-400',
    suitability: 'HIGH',
    water: 'Medium',
    soilPreference: 'Deep loamy, pH 6–7',
    reason: 'Loamy texture and near-neutral pH closely match tomato preferences.',
    explanation:
      'Tomatoes perform well in the demo loamy profile, which offers the balance of moisture and aeration this crop prefers.',
    soilCharacteristics: 'Good drainage, medium texture, pH 6.2–7.1, moderate water retention.',
    considerations: 'Provide consistent moisture, stake plants, and avoid waterlogging during the rainier week.',
  },
  {
    id: 'rice',
    name: 'Rice',
    dot: 'bg-lime-glow',
    suitability: 'MEDIUM',
    water: 'High',
    soilPreference: 'Clayey, water-retentive',
    reason: 'Rice prefers heavier, water-retentive soil; this loam is workable but drains quickly.',
    explanation:
      'The regional estimate indicates moderate water retention, so paddy would require deliberate bunding and irrigation management.',
    soilCharacteristics: 'Medium texture, good drainage, moderate organic matter.',
    considerations: 'Plan for reliable water supply; the high-drainage profile may increase irrigation needs.',
  },
  {
    id: 'wheat',
    name: 'Wheat',
    dot: 'bg-emerald-glow',
    suitability: 'HIGH',
    water: 'Medium',
    soilPreference: 'Loamy, well-drained, pH 6–7.5',
    reason: 'Well-drained loam with neutral pH is a strong simulated match for wheat.',
    explanation:
      'Wheat suits the estimated profile well — good drainage reduces waterlogging risk during rabi season.',
    soilCharacteristics: 'Loamy texture, good drainage, balanced nutrients.',
    considerations: 'Maintain sowing window; supplement irrigation if dry spells persist.',
  },
  {
    id: 'maize',
    name: 'Maize',
    dot: 'bg-yellow-300',
    suitability: 'HIGH',
    water: 'Medium',
    soilPreference: 'Well-drained loam',
    reason: 'Maize thrives in well-drained loamy soil with good aeration.',
    explanation:
      'The demo profile offers the aeration and drainage maize prefers, with moderate moisture retention.',
    soilCharacteristics: 'Medium texture, good drainage, pH within the comfortable range.',
    considerations: 'Apply balanced nutrition at sowing; watch for moisture stress in dry spells.',
  },
  {
    id: 'onion',
    name: 'Onion',
    dot: 'bg-offwhite',
    suitability: 'MEDIUM',
    water: 'Low',
    soilPreference: 'Sandy loam, pH 6–7',
    reason: 'Onion prefers sandy loam; the medium loam is acceptable but slightly heavier.',
    explanation:
      'Good drainage helps bulb formation; moderate soil weight is manageable with ridge planting.',
    soilCharacteristics: 'Loamy texture, good drainage, moderate organic matter.',
    considerations: 'Avoid excess moisture near maturity; ensure firm beds for bulb development.',
  },
  {
    id: 'potato',
    name: 'Potato',
    dot: 'bg-amber-glow',
    suitability: 'HIGH',
    water: 'Medium',
    soilPreference: 'Loose, well-drained loam',
    reason: 'Loose loamy soil with good drainage suits tuber development.',
    explanation:
      'The estimated profile provides the loose structure potatoes need, with drainage that limits rot risk.',
    soilCharacteristics: 'Medium texture, good drainage, slightly acidic-to-neutral pH.',
    considerations: 'Ridge planting recommended; monitor late-blight risk in humid weeks.',
  },
  {
    id: 'groundnut',
    name: 'Groundnut',
    dot: 'bg-orange-400',
    suitability: 'MEDIUM',
    water: 'Low',
    soilPreference: 'Sandy loam, pH 6–7.5',
    reason: 'Groundnut prefers lighter sandy loam; the medium loam is acceptable with good management.',
    explanation:
      'Aeration is adequate for pegging; slightly heavier texture means careful harvest timing.',
    soilCharacteristics: 'Medium texture, good drainage, moderate fertility.',
    considerations: 'Avoid waterlogging; manage soil fertility with organic amendments.',
  },
  {
    id: 'millets',
    name: 'Millets',
    dot: 'bg-yellow-200',
    suitability: 'HIGH',
    water: 'Low',
    soilPreference: 'Well-drained, low-fertility tolerant',
    reason: 'Millets tolerate lower fertility and prefer exactly this kind of well-drained loam.',
    explanation:
      'The estimated profile is a strong match for millets, which perform well without intensive inputs.',
    soilCharacteristics: 'Good drainage, moderate organic matter, neutral pH.',
    considerations: 'Minimal irrigation needed; ideal as a low-input rotation option.',
  },
];

/** Ranked demo recommendations for this area. */
export const BEST_MATCHES: CropSoil[] = [
  {
    ...CROP_SUITABILITY[0],
    recommendation: 'Lead with tomato — the estimated loamy, near-neutral profile is the closest simulated match.',
  },
  {
    ...CROP_SUITABILITY[2],
    recommendation: 'Strong rabi option with the well-drained loam reducing waterlogging risk.',
  },
  {
    ...CROP_SUITABILITY[5],
    recommendation: 'Tuber-friendly loose loam with good drainage for healthier development.',
  },
  {
    ...CROP_SUITABILITY[7],
    recommendation: 'Low-input, resilient choice that fits the drainage and fertility profile well.',
  },
];
