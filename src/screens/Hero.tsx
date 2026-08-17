import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fadeUp, staggerContainer } from '@/lib/motion';

const FIELD_IMAGE =
  'https://images.pexels.com/photos/4237192/pexels-photo-4237192.jpeg?auto=compress&cs=tinysrgb&w=1920';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Atmospheric field image — low opacity */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src={FIELD_IMAGE}
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 via-forest-950/70 to-forest-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/80 via-transparent to-forest-950/80" />
      </div>

      {/* Floating data particles */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-emerald-glow/50"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-glow/20 bg-emerald-glow/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-glow"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI-Powered Agricultural Ecosystem</span>
        </motion.div>

        {/* Wordmark */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
        >
          <span className="text-gradient-emerald">FARMSHIELD</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="mt-6 font-display text-xl font-medium text-offwhite sm:text-2xl md:text-3xl"
        >
          Smart Farming Begins with Smart Decisions
        </motion.p>

        {/* Team name */}
        <motion.div
          variants={fadeUp}
          className="mt-5 flex items-center justify-center gap-4"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-glow/40" />
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-glow/90">
            ERROR 420
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-glow/40" />
        </motion.div>

        {/* Supporting text */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-offwhite-muted sm:text-lg"
        >
          An AI-powered unified agricultural ecosystem empowering farmers with
          intelligent insights, services, connectivity, and traceability.
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp} className="mt-12 flex justify-center">
          <motion.button
            onClick={() => navigate('/team')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-emerald-glow/30 bg-gradient-to-r from-forest-600 to-forest-800 px-8 py-4 text-base font-semibold text-offwhite shadow-glow transition-all hover:border-emerald-glow/60 hover:shadow-[0_0_40px_-4px_rgba(52,211,153,0.5)]"
          >
            {/* Sheen */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">ENTER FARMSHIELD</span>
            <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </motion.button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={fadeUp}
          className="mt-16 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-offwhite-muted/60">
            <span>An interactive presentation</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-8 w-px bg-gradient-to-b from-emerald-glow/50 to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
