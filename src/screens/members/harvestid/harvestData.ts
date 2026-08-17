/* ============================================================
   HarvestID — mock/demo data layer
   Fictional crop passport data for presentation only.
   No real people or farms are represented.
   ============================================================ */

export const PASSPORT = {
  harvestId: 'FS-KLP-2026-084217',
  crop: 'Tomato',
  variety: 'Arka Rakshak (F1)',
  region: 'Chikhali Road, Kolhapur, Maharashtra',
  farmer: 'Ramesh Jadhav',
  harvestDate: '12 Aug 2026',
  batchId: 'BATCH-KLP-2612',
  cultivation: 'Integrated Pest Management',
  seed: 'Certified demo seed lot · germination 92%',
  inputs: [
    'Base dose 10:26:26 NPK — day 21',
    'Foliar micronutrient spray — day 34',
    'Organic compost application — day 61',
  ],
  irrigation: 'Drip irrigation · scheduled 3× per week',
  harvest: 'Hand-picked at 65 days · sorted & graded · 240 kg batch',
};

export const CROP_PROFILE = {
  crop: PASSPORT.crop,
  variety: PASSPORT.variety,
  region: PASSPORT.region,
  soilType: 'Loamy soil (regional estimate)',
  cultivation: PASSPORT.cultivation,
  irrigation: PASSPORT.irrigation,
  fertilizer: PASSPORT.inputs.join(' · '),
  harvest: PASSPORT.harvest,
};

/* ------------------------------------------------------------
   Crop journey timeline
   ------------------------------------------------------------ */

export interface JourneyStage {
  id: string;
  label: string;
  period: string;
  detail: string;
  tags: string[];
}

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'seed',
    label: 'Seed',
    period: 'May 2026',
    detail:
      'Certified Arka Rakshak F1 seeds sourced from a regional demo supplier. Germination verified at 92% in a controlled tray nursery.',
    tags: ['Certified lot', '92% germination'],
  },
  {
    id: 'planting',
    label: 'Planting',
    period: '08 Jun 2026',
    detail:
      'Seedlings transplanted at 45 cm spacing on raised beds. Basal dose of 10:26:26 NPK applied during bed preparation.',
    tags: ['Raised beds', '45 cm spacing'],
  },
  {
    id: 'growth',
    label: 'Growth',
    period: 'Jun – Jul 2026',
    detail:
      'Vegetative growth monitored weekly with demo growth checks. Staking installed at day 25; side shoots pruned to maintain canopy.',
    tags: ['Weekly checks', 'Staking at day 25'],
  },
  {
    id: 'cultivation',
    label: 'Cultivation',
    period: 'Jun – Aug 2026',
    detail:
      'Integrated Pest Management with pheromone traps and scouting. Foliar micronutrient spray applied at day 34; organic compost at day 61.',
    tags: ['IPM practices', '3 input events logged'],
  },
  {
    id: 'harvest',
    label: 'Harvest',
    period: '12 Aug 2026',
    detail:
      'Hand-picked at 65 days from transplanting. Fruits sorted by grade on-farm, with 240 kg assigned to this demo batch.',
    tags: ['65-day harvest', '240 kg batch'],
  },
  {
    id: 'packaging',
    label: 'Packaging',
    period: '12 Aug 2026',
    detail:
      'Batch packed in ventilated crates with HarvestID labels. Cold-chain transfer to the collection hub within 4 hours (demo).',
    tags: ['Ventilated crates', 'Label applied'],
  },
  {
    id: 'consumer',
    label: 'Consumer',
    period: '15 Aug 2026',
    detail:
      'Traceability verified end-to-end in the demo. Consumers can scan HarvestID to see this journey.',
    tags: ['Traceability verified'],
  },
];

/* ------------------------------------------------------------
   Traceability map stops
   ------------------------------------------------------------ */

export interface TraceStop {
  id: string;
  label: string;
  sub: string;
  x: number; // % position on the visual
  y: number;
}

export const TRACE_STOPS: TraceStop[] = [
  { id: 'farm', label: 'FARM', sub: 'Chikhali Rd · 240 kg', x: 10, y: 50 },
  { id: 'collection', label: 'COLLECTION', sub: 'Aggregation hub · 4 h', x: 30, y: 50 },
  { id: 'processing', label: 'PROCESSING', sub: 'Sorting & grading · 2 km', x: 50, y: 50 },
  { id: 'market', label: 'MARKET', sub: 'Urali Devachi Bazaar', x: 70, y: 50 },
  { id: 'consumer', label: 'CONSUMER', sub: 'Retail · verified', x: 90, y: 50 },
];

/* ------------------------------------------------------------
   Transparency score
   ------------------------------------------------------------ */

export const TRANSPARENCY = {
  overall: 94,
  categories: [
    { label: 'Origin', value: 96 },
    { label: 'Cultivation', value: 92 },
    { label: 'Harvest', value: 95 },
    { label: 'Processing', value: 90 },
    { label: 'Traceability', value: 97 },
  ],
};

/* ------------------------------------------------------------
   Consumer view
   ------------------------------------------------------------ */

export const CONSUMER_VIEW = [
  { q: 'Where was it grown?', a: 'Chikhali Road, Kolhapur, Maharashtra' },
  { q: 'What crop is it?', a: 'Tomato — Arka Rakshak variety' },
  { q: 'When was it harvested?', a: '12 August 2026' },
  { q: 'How was it grown?', a: 'Integrated pest management with drip irrigation' },
  { q: 'What was used?', a: 'Certified seeds · balanced NPK · foliar micronutrients' },
];
