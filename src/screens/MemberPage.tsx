import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { getMemberById, getAdjacentMembers } from '@/data/members';
import { subsectionTransition, fadeUp, staggerContainer } from '@/lib/motion';
import Member01Content from '@/screens/members/Member01Content';
import Member02Content from '@/screens/members/Member02Content';
import MemberPlaceholder from '@/screens/members/MemberPlaceholder';

const accentText = {
  emerald: 'text-emerald-glow',
  amber: 'text-amber-glow',
  lime: 'text-lime-glow',
};

const accentBg = {
  emerald: 'bg-emerald-glow/10 ring-emerald-glow/30',
  amber: 'bg-amber-glow/10 ring-amber-glow/30',
  lime: 'bg-lime-glow/10 ring-lime-glow/30',
};

const accentBorder = {
  emerald: 'border-emerald-glow/40 text-emerald-glow',
  amber: 'border-amber-glow/40 text-amber-glow',
  lime: 'border-lime-glow/40 text-lime-glow',
};

export default function MemberPage() {
  const { id } = useParams<{ id: string }>();
  const memberId = Number(id);
  const navigate = useNavigate();
  const member = getMemberById(memberId);

  const [activeSubId, setActiveSubId] = useState(
    member?.subsections[0]?.id ?? 'overview',
  );

  if (!member) {
    return (
      <PageLayout navMode="member" memberId={memberId}>
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="text-center">
            <p className="font-display text-2xl font-semibold text-offwhite">
              Member not found
            </p>
            <button
              onClick={() => navigate('/team')}
              className="mt-4 rounded-xl border border-white/10 px-6 py-3 text-sm text-offwhite-muted hover:border-emerald-glow/40 hover:text-emerald-glow"
            >
              Back to Team
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const adjacent = getAdjacentMembers(memberId);
  const Icon = member.icon;
  const activeSubsection =
    member.subsections.find((s) => s.id === activeSubId) ?? member.subsections[0];

  return (
    <PageLayout navMode="member" memberId={memberId}>
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 sm:pt-36 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Member number badge */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${accentBg[member.accent]}`}
            >
              <Icon className={`h-6 w-6 ${accentText[member.accent]}`} />
            </span>
            <span className="font-display text-5xl font-bold text-white/[0.08]">
              {member.memberNumber}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-3xl font-bold tracking-tight text-offwhite sm:text-4xl md:text-5xl"
          >
            {member.memberName}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className={`mt-2 font-display text-lg font-medium ${accentText[member.accent]}`}
          >
            {member.title}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-2xl text-base leading-relaxed text-offwhite-muted"
          >
            {member.subtitle}
          </motion.p>
        </motion.div>

        {/* Subsection navigation */}
        {member.subsections.length > 1 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap gap-2"
          >
            {member.subsections.map((sub) => {
              const SubIcon = sub.icon;
              const isActive = sub.id === activeSubId;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubId(sub.id)}
                  className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? accentBorder[member.accent]
                      : 'border-white/[0.08] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
                  }`}
                >
                  <SubIcon className="h-3.5 w-3.5" />
                  <span className="font-display">{sub.number}</span>
                  <span className="hidden sm:inline">{sub.title}</span>
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Animated content area */}
        <div className="mt-10 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubId}
              initial={subsectionTransition.initial}
              animate={subsectionTransition.animate}
              exit={subsectionTransition.exit}
              transition={subsectionTransition.transition}
            >
              {member.memberId === 1 ? (
                <Member01Content subsectionId={activeSubId} />
              ) : member.memberId === 2 ? (
                <Member02Content subsectionId={activeSubId} setActiveSubId={setActiveSubId} />
              ) : (
                <MemberPlaceholder memberName={member.memberName} title={member.title} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer nav: Prev / Next */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <button
            onClick={() => navigate(`/member/${adjacent.prev.memberId}`)}
            className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-left transition-all hover:border-emerald-glow/30 hover:bg-emerald-glow/[0.04]"
          >
            <ArrowLeft className="h-4 w-4 text-offwhite-muted transition-transform group-hover:-translate-x-1" />
            <div>
              <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
                Previous
              </p>
              <p className="text-sm font-medium text-offwhite">
                {adjacent.prev.memberName}
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/team')}
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm font-medium text-offwhite-muted transition-all hover:border-emerald-glow/30 hover:text-emerald-glow"
          >
            Back to Team
          </button>

          <button
            onClick={() => navigate(`/member/${adjacent.next.memberId}`)}
            className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-right transition-all hover:border-emerald-glow/30 hover:bg-emerald-glow/[0.04]"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-offwhite-muted/60">
                Next
              </p>
              <p className="text-sm font-medium text-offwhite">
                {adjacent.next.memberName}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-offwhite-muted transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
