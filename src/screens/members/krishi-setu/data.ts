/* ============================================================
   Krishi Setu — mock/demo data layer
   All profiles, ratings and bookings are simulated for
   presentation purposes only.
   ============================================================ */

export interface Farmer {
  id: string;
  name: string;
  location: string;
  crops: string[];
  experience: string;
  status: 'Nearby' | 'Verified' | 'Trusted';
}

export interface Worker {
  id: string;
  name: string;
  location: string;
  skills: string[];
  availability: string;
  workType: string;
  experience: string;
  rating: number;
  wage: string;
  languages: string[];
}

export interface Equipment {
  id: string;
  name: string;
  provider: string;
  location: string;
  availability: string;
  pricePerDay: number;
  rating: number;
  specs: string[];
}

export const FARMERS: Farmer[] = [
  {
    id: 'f1',
    name: 'Ramesh Jadhav',
    location: 'Sangli Road, Kolhapur',
    crops: ['Tomato', 'Chilli'],
    experience: '18 yrs',
    status: 'Nearby',
  },
  {
    id: 'f2',
    name: 'Anita Pawar',
    location: 'Kasba Bawda',
    crops: ['Onion', 'Garlic'],
    experience: '12 yrs',
    status: 'Verified',
  },
  {
    id: 'f3',
    name: 'Suresh Kamble',
    location: 'Shiroli',
    crops: ['Sugarcane', 'Maize'],
    experience: '22 yrs',
    status: 'Trusted',
  },
  {
    id: 'f4',
    name: 'Meena Deshmukh',
    location: 'Ichalkaranji Road',
    crops: ['Potato', 'Tomato'],
    experience: '9 yrs',
    status: 'Verified',
  },
  {
    id: 'f5',
    name: 'Vijay More',
    location: 'Uchgaon',
    crops: ['Grapes', 'Pomegranate'],
    experience: '15 yrs',
    status: 'Nearby',
  },
  {
    id: 'f6',
    name: 'Kavita Salunkhe',
    location: 'Talsande',
    crops: ['Soybean', 'Wheat'],
    experience: '11 yrs',
    status: 'Trusted',
  },
];

export const WORKERS: Worker[] = [
  {
    id: 'w1',
    name: 'Baburao Patil',
    location: 'Kasba Bawda',
    skills: ['Harvesting', 'Loading', 'Sorting'],
    availability: 'Available Today',
    workType: 'Harvesting',
    experience: '14 yrs',
    rating: 4.8,
    wage: '₹450/day',
    languages: ['Marathi', 'Hindi'],
  },
  {
    id: 'w2',
    name: 'Sunil Nikam',
    location: 'Uchgaon',
    skills: ['Sowing', 'Weeding', 'Irrigation'],
    availability: 'Available Today',
    workType: 'Sowing',
    experience: '8 yrs',
    rating: 4.5,
    wage: '₹400/day',
    languages: ['Marathi'],
  },
  {
    id: 'w3',
    name: 'Prakash Raut',
    location: 'Shiroli',
    skills: ['Irrigation', 'General Fieldwork'],
    availability: 'Available from Thu',
    workType: 'Irrigation',
    experience: '10 yrs',
    rating: 4.3,
    wage: '₹380/day',
    languages: ['Marathi', 'Kannada'],
  },
  {
    id: 'w4',
    name: 'Sangita Chavan',
    location: 'Talsande',
    skills: ['Packing', 'Sorting', 'Grading'],
    availability: 'Available Today',
    workType: 'Packing',
    experience: '6 yrs',
    rating: 4.7,
    wage: '₹360/day',
    languages: ['Marathi', 'Hindi'],
  },
  {
    id: 'w5',
    name: 'Mahesh Kale',
    location: 'Kagal',
    skills: ['Harvesting', 'Loading', 'Tractor assist'],
    availability: 'Available from Fri',
    workType: 'Harvesting',
    experience: '12 yrs',
    rating: 4.2,
    wage: '₹480/day',
    languages: ['Marathi'],
  },
  {
    id: 'w6',
    name: 'Asha Bhosale',
    location: 'Ichalkaranji',
    skills: ['Weeding', 'Sowing', 'Nursery'],
    availability: 'Available Today',
    workType: 'Weeding',
    experience: '7 yrs',
    rating: 4.6,
    wage: '₹340/day',
    languages: ['Marathi', 'Hindi'],
  },
];

export const EQUIPMENT: Equipment[] = [
  {
    id: 'e1',
    name: 'Mahindra 575 Tractor (75 HP)',
    provider: 'Joshi Agro Services',
    location: 'Sangli Road',
    availability: 'Available Today',
    pricePerDay: 2400,
    rating: 4.8,
    specs: ['75 HP · 4WD', 'Rotavator & trolley included', 'Fuel tank full', 'Operator assist available'],
  },
  {
    id: 'e2',
    name: 'Combine Harvester',
    provider: 'Sahyadri Machines',
    location: 'Shiroli',
    availability: 'Available from Sat',
    pricePerDay: 9500,
    rating: 4.6,
    specs: ['Self-propelled · 4.1 m header', 'Wheat & paddy ready', 'GPS yield logging', '2-person crew'],
  },
  {
    id: 'e3',
    name: 'Seed Drill / Seeder',
    provider: 'GreenLine Agritech',
    location: 'Kasba Bawda',
    availability: 'Available Today',
    pricePerDay: 1200,
    rating: 4.5,
    specs: ['12-row precision seeder', 'Calibrated for soybean & maize', 'Quick hitch', 'Depth control'],
  },
  {
    id: 'e4',
    name: 'Power Sprayer (500 L)',
    provider: 'Kolhapur Agro Rentals',
    location: 'Uchgaon',
    availability: 'Available from Thu',
    pricePerDay: 850,
    rating: 4.4,
    specs: ['500 L tank · 21 m boom', 'Tractor PTO driven', 'Nozzle kit included', 'Daily washing included'],
  },
  {
    id: 'e5',
    name: 'Power Tiller',
    provider: 'Joshi Agro Services',
    location: 'Sangli Road',
    availability: 'Available Today',
    pricePerDay: 1100,
    rating: 4.7,
    specs: ['9 HP diesel', 'Rotavator + plough set', 'Ideal for 1–2 acre plots', 'Fuel included for demo day'],
  },
];

export const WORK_REQUIREMENTS = [
  'Harvesting',
  'Sowing',
  'Irrigation Support',
  'Weeding',
  'Packing & Loading',
];

export const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
