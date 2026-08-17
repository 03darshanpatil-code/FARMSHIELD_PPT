import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { members, type Member } from '@/data/members';
import { fadeUp, staggerContainer } from '@/lib/motion';

const accentMap = {
  emerald: {
    border: 'hover:border-emerald-glow/40',
    glow: 'group-hover:shadow-[0_0_40px_-8px_rgba(52,211,153,0.35)]',
    text: 'text-emerald-glow',
    bg: 'bg-emerald-glow/10',
    ring: 'ring-emerald-glow/20',
  },
  amber: {
    border: 'hover:border-amber-glow/40',
    glow: 'group-hover:shadow-[0_0_40px_-8px_rgba(245,185,66,0.3)]',
    text: 'text-amber-glow',
    bg: 'bg-amber-glow/10',
    ring: 'ring-amber-glow/20',
  },
  lime: {
    border: 'hover:border-lime-glow/40',
    glow: 'group-hover:shadow-[0_0_40px_-8px_rgba(163,230,53,0.3)]',
    text: 'text-lime-glow',
    bg: 'bg-lime-glow/10',
    ring: 'ring-lime-glow/20',
  },
} as const;

export default function TeamHub() {
  const navigate = useNavigate();

  return (
    <PageLayout navMode="team">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 sm:pt-36 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium tracking-wide text-offwhite-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-glow animate-pulse-glow" />
            The Team
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="text-gradient-emerald">MEET THE FARM SHIELD TEAM</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-offwhite-muted"
          >
            Six minds. One vision. One intelligent agricultural ecosystem.
          </motion.p>
        </motion.div>

        {/* Member grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {members.map((member) => (
            <MemberCard
              key={member.memberId}
              member={member}
              onClick={() => navigate(`/member/${member.memberId}`)}
            />
          ))}
        </motion.div>
      </div>
    </PageLayout>
  );
}

interface MemberCardProps {
  member: Member;
  onClick: () => void;
}

function MemberCard({ member, onClick }: MemberCardProps) {
  const accent = accentMap[member.accent];
  const Icon = member.icon;

  return (
    <motion.button
      variants={fadeUp}
      onClick={onClick}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex flex-col items-start overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-left backdrop-blur-sm transition-all duration-300 ${accent.border} ${accent.glow} hover:bg-white/[0.05]`}
    >
      {/* Top row: number + icon */}
      <div className="flex w-full items-center justify-between">
        <span className="font-display text-5xl font-bold text-white/[0.06] transition-colors duration-300 group-hover:text-white/[0.1]">
          {member.memberNumber}
        </span>
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent.bg} ring-1 ${accent.ring} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className={`h-6 w-6 ${accent.text}`} />
        </span>
      </div>

      {/* Member label */}
      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-offwhite-muted/50">
        Member {member.memberNumber}
      </p>

      {/* Name */}
      <h3 className="mt-1.5 font-display text-xl font-semibold text-offwhite">
        {member.memberName}
      </h3>

      {/* Section title */}
      <p className={`mt-1 text-sm font-medium ${accent.text}`}>
        {member.title}
      </p>

      {/* Descriptor */}
      <p className="mt-3 text-sm leading-relaxed text-offwhite-muted">
        {member.descriptor}
      </p>

      {/* Arrow indicator */}
      <div className="mt-6 flex w-full items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-offwhite-muted/50">
          View Section
        </span>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] ${accent.text} transition-all duration-300 group-hover:translate-x-1 group-hover:border-white/20`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      {/* Bottom accent line */}
      <span
        className={`absolute bottom-0 left-0 h-px w-0 ${accent.text.replace(
          'text-',
          'bg-',
        )} transition-all duration-500 group-hover:w-full`}
      />
    </motion.button>
  );
}
