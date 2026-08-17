import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import NavBar from './NavBar';

type NavMode = 'home' | 'team' | 'member';

interface PageLayoutProps {
  children: ReactNode;
  navMode: NavMode;
  memberId?: number;
  className?: string;
}

export default function PageLayout({
  children,
  navMode,
  memberId,
  className = '',
}: PageLayoutProps) {
  return (
    <div className="relative min-h-screen atmospheric-bg">
      {/* Subtle grid overlay */}
      <div className="pointer-events-none fixed inset-0 grid-pattern opacity-40" />

      {/* Ambient glow orbs */}
      <div className="pointer-events-none fixed left-[-10%] top-[10%] h-[400px] w-[400px] rounded-full bg-forest-500/10 blur-[120px]" />
      <div className="pointer-events-none fixed right-[-5%] bottom-[5%] h-[350px] w-[350px] rounded-full bg-emerald-glow/[0.06] blur-[100px]" />

      <NavBar mode={navMode} memberId={memberId} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`relative z-10 ${className}`}
      >
        {children}
      </motion.main>
    </div>
  );
}
