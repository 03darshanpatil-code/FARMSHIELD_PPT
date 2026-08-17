import { motion } from 'framer-motion';
import { Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fadeUp, staggerContainer } from '@/lib/motion';

interface MemberPlaceholderProps {
  memberName: string;
  title: string;
}

export default function MemberPlaceholder({
  memberName,
  title,
}: MemberPlaceholderProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-20 text-center"
    >
      <motion.div
        variants={fadeUp}
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-glow/10 ring-1 ring-emerald-glow/20"
      >
        <Construction className="h-8 w-8 text-emerald-glow" />
      </motion.div>

      <motion.h2 variants={fadeUp} className="mt-6 font-display text-2xl font-semibold text-offwhite">
        {title}
      </motion.h2>

      <motion.p variants={fadeUp} className="mt-3 max-w-md text-base text-offwhite-muted">
        {memberName}'s detailed presentation will be unveiled in the next phase of
        FarmShield. The architecture and navigation are fully in place and ready.
      </motion.p>

      <motion.button
        variants={fadeUp}
        onClick={() => navigate('/team')}
        className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-offwhite-muted transition-all hover:border-emerald-glow/30 hover:text-emerald-glow"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Team
      </motion.button>
    </motion.div>
  );
}
