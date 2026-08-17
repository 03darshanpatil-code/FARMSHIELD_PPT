import type { LucideIcon } from 'lucide-react';
import {
  Eye,
  BrainCircuit,
  LineChart,
  Satellite,
  Handshake,
  Bot,
} from 'lucide-react';

export type SubsectionId = string;

export interface Subsection {
  id: SubsectionId;
  number: string;
  title: string;
  icon: LucideIcon;
}

export interface Member {
  memberId: number;
  memberNumber: string;
  memberName: string;
  title: string;
  subtitle: string;
  descriptor: string;
  icon: LucideIcon;
  accent: 'emerald' | 'amber' | 'lime';
  subsections: Subsection[];
}

export const members: Member[] = [
  {
    memberId: 1,
    memberNumber: '01',
    memberName: 'Darshan S. Patil',
    title: 'The Problem & FarmShield Vision',
    subtitle: 'Understanding the fragmented agricultural landscape and the FarmShield solution.',
    descriptor: 'Vision & Foundation',
    icon: Eye,
    accent: 'emerald',
    subsections: [
      { id: 'agriculture-today', number: '01', title: 'Agriculture Today', icon: Eye },
      { id: 'problems-farmers', number: '02', title: 'Problems Faced by Farmers', icon: Eye },
      { id: 'core-problem', number: '03', title: 'Core Problem', icon: Eye },
      { id: 'our-solution', number: '04', title: 'Our Solution', icon: Eye },
      { id: 'vision', number: '05', title: 'FarmShield Vision', icon: Eye },
      { id: 'ecosystem', number: '06', title: 'FarmShield Ecosystem', icon: Eye },
    ],
  },
  {
    memberId: 2,
    memberNumber: '02',
    memberName: 'Syeda Sulaim Rayyan',
    title: 'AI & Smart Crop Care',
    subtitle: 'Intelligent crop monitoring, disease detection, and smart care recommendations.',
    descriptor: 'AI & Crop Intelligence',
    icon: BrainCircuit,
    accent: 'lime',
    subsections: [
      { id: 'disease-detection', number: '01', title: 'Disease Detection', icon: BrainCircuit },
      { id: 'fertilizer-marketplace', number: '02', title: 'Fertilizer Marketplace', icon: BrainCircuit },
      { id: 'crop-simulator', number: '03', title: 'Crop Simulator', icon: BrainCircuit },
    ],
  },
  {
    memberId: 3,
    memberNumber: '03',
    memberName: 'Jaideep B. H.',
    title: 'Market & Farmer Economy',
    subtitle: 'Market intelligence, price forecasting, and farmer economic empowerment.',
    descriptor: 'Market Intelligence',
    icon: LineChart,
    accent: 'amber',
    subsections: [
      { id: 'overview', number: '01', title: 'Overview', icon: LineChart },
    ],
  },
  {
    memberId: 4,
    memberNumber: '04',
    memberName: 'Tharun M.',
    title: 'Smart Agriculture Intelligence',
    subtitle: 'Satellite insight, weather intelligence, and soil-driven decision support.',
    descriptor: 'Agricultural Intelligence',
    icon: Satellite,
    accent: 'emerald',
    subsections: [
      { id: 'overview', number: '01', title: 'Overview', icon: Satellite },
    ],
  },
  {
    memberId: 5,
    memberNumber: '05',
    memberName: 'Mansi D.O',
    title: 'Farmer Services & Trust',
    subtitle: 'Government schemes, farmer connectivity, and building trust through transparency.',
    descriptor: 'Services & Trust',
    icon: Handshake,
    accent: 'lime',
    subsections: [
      { id: 'overview', number: '01', title: 'Overview', icon: Handshake },
    ],
  },
  {
    memberId: 6,
    memberNumber: '06',
    memberName: 'Moiz Y. E.',
    title: 'AI Assistant, Technology & Impact',
    subtitle: 'Conversational AI assistance, technology architecture, and measurable impact.',
    descriptor: 'AI Assistant & Impact',
    icon: Bot,
    accent: 'amber',
    subsections: [
      { id: 'overview', number: '01', title: 'Overview', icon: Bot },
    ],
  },
];

export const getMemberById = (id: number): Member | undefined =>
  members.find((m) => m.memberId === id);

export const getAdjacentMembers = (id: number) => {
  const index = members.findIndex((m) => m.memberId === id);
  const prev = index > 0 ? members[index - 1] : members[members.length - 1];
  const next = index < members.length - 1 ? members[index + 1] : members[0];
  return { prev, next };
};
