import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Users, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { getAdjacentMembers, getMemberById } from '@/data/members';

type NavMode = 'home' | 'team' | 'member';

interface NavBarProps {
  mode: NavMode;
  memberId?: number;
}

export default function NavBar({ mode, memberId }: NavBarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const adjacent = memberId ? getAdjacentMembers(memberId) : null;
  const currentMember = memberId ? getMemberById(memberId) : null;

  const isHome = mode === 'home';
  const isTeam = mode === 'team';
  const isMember = mode === 'member';

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-charcoal-950/70 px-4 py-3 backdrop-blur-xl sm:px-6">
          {/* Brand */}
          <Link
            to="/"
            className="group flex items-center gap-2.5"
            aria-label="FarmShield Home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-forest-500 to-forest-700 shadow-glow ring-1 ring-emerald-glow/30">
              <span className="font-display text-sm font-bold text-offwhite">FS</span>
            </span>
            <span className="font-display text-base font-semibold tracking-tight text-offwhite transition-colors group-hover:text-emerald-glow">
              FarmShield
            </span>
          </Link>

          {/* Context-aware center label */}
          <div className="hidden items-center gap-2 text-sm text-offwhite-muted md:flex">
            {isHome && <span className="font-display">Home</span>}
            {isTeam && <span className="font-display">Team Hub</span>}
            {isMember && currentMember && (
              <span className="font-display">
                Member {currentMember.memberNumber} — {currentMember.memberName}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Home button (hidden on home) */}
            {!isHome && (
              <NavButton
                to="/"
                icon={<Home className="h-4 w-4" />}
                label="Home"
              />
            )}

            {/* Team Hub button (hidden on team) */}
            {!isTeam && (
              <NavButton
                to="/team"
                icon={<Users className="h-4 w-4" />}
                label="Team Hub"
              />
            )}

            {/* Back to Team (member pages) */}
            {isMember && (
              <NavButton
                to="/team"
                icon={<ArrowLeft className="h-4 w-4" />}
                label="Team"
              />
            )}

            {/* Previous / Next (member pages) */}
            {isMember && adjacent && (
              <>
                <div className="mx-1 hidden h-6 w-px bg-white/10 sm:block" />
                <button
                  onClick={() => navigate(`/member/${adjacent.prev.memberId}`)}
                  className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium text-offwhite-muted transition-all hover:border-emerald-glow/40 hover:bg-emerald-glow/10 hover:text-emerald-glow"
                  aria-label={`Previous: ${adjacent.prev.memberName}`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>
                <button
                  onClick={() => navigate(`/member/${adjacent.next.memberId}`)}
                  className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium text-offwhite-muted transition-all hover:border-emerald-glow/40 hover:bg-emerald-glow/10 hover:text-emerald-glow"
                  aria-label={`Next: ${adjacent.next.memberName}`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* location key forces re-render animation on route change */}
      <span className="sr-only">{location.pathname}</span>
    </motion.nav>
  );
}

interface NavButtonProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

function NavButton({ to, icon, label }: NavButtonProps) {
  return (
    <Link
      to={to}
      className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium text-offwhite-muted transition-all hover:border-emerald-glow/40 hover:bg-emerald-glow/10 hover:text-emerald-glow"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
