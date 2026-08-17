/* ============================================================
   Government Schemes — mock/demo data layer
   Realistic-looking demo scheme examples. NOT official.
   Real eligibility must be verified on official government portals.
   ============================================================ */

export const SCHEME_CATEGORIES = [
  'All',
  'Income Support',
  'Crop Insurance',
  'Loans',
  'Irrigation',
  'Equipment',
  'Seeds & Fertilizers',
  'State Schemes',
] as const;

export type SchemeCategory = (typeof SCHEME_CATEGORIES)[number];

export interface Scheme {
  id: string;
  name: string;
  short: string;
  category: Exclude<SchemeCategory, 'All'>;
  benefit: string;
  eligibility: string;
  status: 'Open' | 'Closing Soon';
  department: string;
  objective: string;
  benefits: string[];
  documents: string[];
  process: string[];
  deadline: string;
  supportType: string;
  applicationMethod: string;
  officialPortal: string;
}

export const SCHEMES: Scheme[] = [
  {
    id: 'pmkisan',
    name: 'PM-KISAN',
    short: 'Direct income support of ₹6,000/year to eligible farmer families.',
    category: 'Income Support',
    benefit: '₹6,000 per year (₹2,000 × 3 instalments)',
    eligibility: 'Landholding up to 2 ha (demo criteria)',
    status: 'Open',
    department: 'Ministry of Agriculture & Farmers Welfare',
    objective:
      'Supplement the financial needs of small and marginal farmers through direct income support (demo).',
    benefits: [
      'Direct benefit transfer of ₹6,000 per year',
      'Three instalments of ₹2,000 each (demo schedule)',
      'Transparent Aadhaar-linked transfer',
    ],
    documents: ['Aadhaar (demo)', 'Land record / Khatoni', 'Bank account details'],
    process: ['Register on the demo portal', 'Verify Aadhaar & land records', 'Receive instalment to bank account'],
    deadline: 'Rolling — apply any time (demo)',
    supportType: 'Cash transfer',
    applicationMethod: 'Online portal + CSC',
    officialPortal: 'https://www.india.gov.in/',
  },
  {
    id: 'pmfby',
    name: 'PM Fasal Bima Yojana',
    short: 'Affordable crop insurance against yield loss and natural calamities.',
    category: 'Crop Insurance',
    benefit: 'Coverage at ~2% premium for kharif, 1.5% for rabi (demo)',
    eligibility: 'All farmers with notified crops (demo)',
    status: 'Closing Soon',
    department: 'Department of Agriculture & Cooperation',
    objective:
      'Protect farmers against crop loss from pests, diseases and natural calamities (demo).',
    benefits: [
      'Low demo premium for comprehensive coverage',
      'Covers yield loss, prevented sowing & post-harvest loss',
      'Claims settled directly to bank accounts',
    ],
    documents: ['Aadhaar (demo)', 'Land record', 'Bank account', 'Sowing certificate (demo)'],
    process: ['Enrol before the season deadline', 'Pay nominal demo premium', 'File claim in case of loss'],
    deadline: 'Enrolment window closes soon (demo)',
    supportType: 'Insurance',
    applicationMethod: 'Bank branch / online',
    officialPortal: 'https://www.india.gov.in/',
  },
  {
    id: 'kcc',
    name: 'Kisan Credit Card',
    short: 'Revolving low-interest credit for farming and allied activities.',
    category: 'Loans',
    benefit: 'Credit limit based on land holding & crop plan (demo)',
    eligibility: 'Farmers with valid land records (demo)',
    status: 'Open',
    department: 'NABARD / Commercial Banks',
    objective:
      'Provide timely, affordable credit for cultivation and post-harvest needs (demo).',
    benefits: [
      'Revolving credit for multiple seasons',
      'Low demo interest with prompt-pay incentive',
      'Covers cultivation, storage & consumption needs',
    ],
    documents: ['Aadhaar (demo)', 'Land record', 'Passport-size photo', 'Bank account'],
    process: ['Apply at nearest bank branch', 'Submit land & identity documents', 'Receive card & credit limit'],
    deadline: 'Rolling — apply any time (demo)',
    supportType: 'Credit',
    applicationMethod: 'Bank branch',
    officialPortal: 'https://www.india.gov.in/',
  },
  {
    id: 'pmkusum',
    name: 'PM-KUSUM',
    short: 'Subsidy support for solar pumps and solarisation of farm power.',
    category: 'Irrigation',
    benefit: 'Subsidy on standalone solar pumps (demo %)',
    eligibility: 'Farmers with cultivable land & water source (demo)',
    status: 'Open',
    department: 'Ministry of New & Renewable Energy',
    objective:
      'Encourage solar-powered irrigation and reduce farm power costs (demo).',
    benefits: [
      'Central + state subsidy on demo installation cost',
      'Lower long-term irrigation energy cost',
      'Surplus solar power can be fed to grid (demo)',
    ],
    documents: ['Aadhaar (demo)', 'Land record', 'Water source proof (demo)', 'Bank account'],
    process: ['Apply via state nodal agency', 'Site & installation approval', 'Subsidy credited on completion (demo)'],
    deadline: 'State-wise windows — check portal (demo)',
    supportType: 'Subsidy',
    applicationMethod: 'State nodal agency portal',
    officialPortal: 'https://www.india.gov.in/',
  },
  {
    id: 'smam',
    name: 'Agricultural Mechanization Subsidy',
    short: 'Subsidy on tractors, tillers and farm machinery for small farmers.',
    category: 'Equipment',
    benefit: 'Demo subsidy % on eligible machinery cost',
    eligibility: 'Small & marginal farmers prioritised (demo)',
    status: 'Open',
    department: 'Department of Agriculture & Cooperation',
    objective:
      'Improve farm efficiency through affordable access to machinery (demo).',
    benefits: [
      'Demo subsidy on select machinery models',
      'Custom hiring centres for shared access',
      'Priority for small & marginal farmers',
    ],
    documents: ['Aadhaar (demo)', 'Land record', 'Quotation from dealer (demo)', 'Bank account'],
    process: ['Select eligible machinery', 'Submit demo application with quotation', 'Subsidy transferred on purchase (demo)'],
    deadline: 'Financial-year window (demo)',
    supportType: 'Subsidy',
    applicationMethod: 'District agriculture office',
    officialPortal: 'https://www.india.gov.in/',
  },
  {
    id: 'shc',
    name: 'Soil Health Card',
    short: 'Get soil nutrient status guidance for balanced fertiliser use.',
    category: 'Seeds & Fertilizers',
    benefit: 'Free demo soil health guidance per cycle',
    eligibility: 'All farmers (demo)',
    status: 'Open',
    department: 'Department of Agriculture & Cooperation',
    objective:
      'Promote balanced fertiliser use based on soil nutrient status (demo scheme).',
    benefits: [
      'Demo nutrient status categories for your region',
      'Fertiliser recommendations per crop',
      'Issued every 2 years (demo cycle)',
    ],
    documents: ['Aadhaar (demo)', 'Land record'],
    process: ['Register on the demo portal', 'Soil sampling arranged by department', 'Card issued with recommendations (demo)'],
    deadline: 'Rolling — apply any time (demo)',
    supportType: 'Service',
    applicationMethod: 'Online portal + village office',
    officialPortal: 'https://www.india.gov.in/',
  },
  {
    id: 'mh-kharif',
    name: 'Maharashtra Kharif Input Support',
    short: 'State-level input assistance for kharif sowing in affected areas.',
    category: 'State Schemes',
    benefit: 'Demo input support amount per hectare',
    eligibility: 'Farmers in notified affected areas (demo)',
    status: 'Closing Soon',
    department: 'Maharashtra Agriculture Department',
    objective:
      'Support kharif sowing through state-level input assistance (demo).',
    benefits: [
      'Demo input support for notified crops',
      'Priority for small & marginal farmers',
      'Direct transfer to bank accounts',
    ],
    documents: ['Aadhaar (demo)', 'Land record', 'Crop sowing certificate (demo)'],
    process: ['Check notification for your area', 'Submit demo application', 'Receive input support (demo)'],
    deadline: 'Seasonal window — closing soon (demo)',
    supportType: 'Cash transfer',
    applicationMethod: 'District agriculture office',
    officialPortal: 'https://www.india.gov.in/',
  },
  {
    id: 'aif',
    name: 'Agriculture Infrastructure Fund',
    short: 'Interest subvention for post-harvest infrastructure projects.',
    category: 'Loans',
    benefit: 'Demo interest subvention on eligible loans',
    eligibility: 'Farmers, FPOs & agri-entrepreneurs (demo)',
    status: 'Open',
    department: 'Ministry of Agriculture & Farmers Welfare',
    objective:
      'Finance warehouses, cold storage and post-harvest infrastructure (demo).',
    benefits: [
      'Demo interest subvention on loans',
      'Supports FPOs and agri-startups',
      'Long repayment tenure (demo)',
    ],
    documents: ['Project report (demo)', 'Aadhaar (demo)', 'Land/lease documents', 'Bank account'],
    process: ['Prepare demo project report', 'Apply through lending bank', 'Sanction & disbursal (demo)'],
    deadline: 'Rolling — apply any time (demo)',
    supportType: 'Credit',
    applicationMethod: 'Lending bank / online',
    officialPortal: 'https://www.india.gov.in/',
  },
];

/* ------------------------------------------------------------
   Demo eligibility checker
   ------------------------------------------------------------ */

export const PROFILE_OPTIONS = {
  farmerType: ['Individual Farmer', 'Tenant Farmer', 'Sharecropper', 'Women Farmer', 'FPO Member'],
  state: ['Maharashtra', 'Karnataka', 'Gujarat', 'Punjab', 'Uttar Pradesh', 'Telangana'],
  landHolding: ['Marginal (< 1 ha)', 'Small (1–2 ha)', 'Semi-medium (2–4 ha)', 'Medium (4–10 ha)', 'Large (> 10 ha)'],
  cropType: ['Cereals', 'Pulses', 'Oilseeds', 'Horticulture', 'Cash Crop', 'Mixed Farming'],
  farmingCategory: ['Conventional', 'Organic', 'Integrated', 'Rainfed'],
  income: ['< ₹1 Lakh', '₹1–2 Lakhs', '₹2–5 Lakhs', '> ₹5 Lakhs'],
} as const;

export type FarmerProfile = {
  farmerType: string;
  state: string;
  landHolding: string;
  cropType: string;
  farmingCategory: string;
  income: string;
};

export type EligibilityResult = 'ELIGIBLE' | 'MAY BE ELIGIBLE' | 'NOT ELIGIBLE';

export interface SchemeCheck {
  schemeId: string;
  result: EligibilityResult;
}

/**
 * Simple deterministic demo rules mapping a profile to scheme eligibility.
 * Purely illustrative — not based on any official criteria.
 */
export function checkEligibility(profile: FarmerProfile): { overall: EligibilityResult; matches: SchemeCheck[] } {
  const small = profile.landHolding.includes('Marginal') || profile.landHolding.includes('Small');
  const medium = profile.landHolding.includes('Semi-medium') || profile.landHolding.includes('Medium');
  const large = profile.landHolding.includes('Large');
  const lowIncome = profile.income.includes('<') || profile.income.includes('1–2');
  const midIncome = profile.income.includes('2–5');
  const highIncome = profile.income.includes('> 5');
  const notifiedCrop = ['Cereals', 'Pulses', 'Oilseeds', 'Horticulture', 'Mixed Farming'].includes(profile.cropType);

  const checks: { schemeId: string; result: EligibilityResult }[] = [
    {
      schemeId: 'pmkisan',
      result: small && lowIncome ? 'ELIGIBLE' : small && midIncome ? 'MAY BE ELIGIBLE' : 'NOT ELIGIBLE',
    },
    {
      schemeId: 'pmfby',
      result: notifiedCrop ? 'ELIGIBLE' : 'MAY BE ELIGIBLE',
    },
    {
      schemeId: 'kcc',
      result: lowIncome ? 'ELIGIBLE' : midIncome ? 'MAY BE ELIGIBLE' : 'NOT ELIGIBLE',
    },
    {
      schemeId: 'pmkusum',
      result: !large && profile.farmingCategory !== 'Rainfed' ? 'ELIGIBLE' : 'MAY BE ELIGIBLE',
    },
    {
      schemeId: 'smam',
      result: small ? 'ELIGIBLE' : medium ? 'MAY BE ELIGIBLE' : 'NOT ELIGIBLE',
    },
    {
      schemeId: 'shc',
      result: 'ELIGIBLE',
    },
    {
      schemeId: 'mh-kharif',
      result: profile.state === 'Maharashtra' && !highIncome ? 'MAY BE ELIGIBLE' : 'NOT ELIGIBLE',
    },
    {
      schemeId: 'aif',
      result: !highIncome ? 'ELIGIBLE' : 'MAY BE ELIGIBLE',
    },
  ];

  const eligible = checks.filter((c) => c.result === 'ELIGIBLE');
  const maybe = checks.filter((c) => c.result === 'MAY BE ELIGIBLE');

  const overall: EligibilityResult =
    eligible.length > 0 ? 'ELIGIBLE' : maybe.length > 0 ? 'MAY BE ELIGIBLE' : 'NOT ELIGIBLE';

  return { overall, matches: checks };
}

export const getSchemeById = (id: string): Scheme => SCHEMES.find((s) => s.id === id) ?? SCHEMES[0];
