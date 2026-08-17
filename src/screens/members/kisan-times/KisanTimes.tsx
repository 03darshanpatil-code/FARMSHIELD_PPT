import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Clock,
  Flame,
  TrendingUp,
  Star,
  ArrowRight,
  Newspaper,
  Sparkles,
  Info,
} from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/motion';
import Modal from '../Modal';
import {
  NEWS,
  NEWS_CATEGORIES,
  FARMER_BRIEF,
  type NewsItem,
  type NewsCategoryFilter,
} from './newsData';

type SortMode = 'LATEST' | 'TRENDING' | 'IMPORTANT';

const SORT_MODES: SortMode[] = ['LATEST', 'TRENDING', 'IMPORTANT'];

export default function KisanTimes() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<NewsCategoryFilter>('All');
  const [sort, setSort] = useState<SortMode>('LATEST');
  const [article, setArticle] = useState<NewsItem | null>(null);

  const filtered = useMemo(() => {
    let list = NEWS.filter((n) => {
      const matchesCategory = category === 'All' || n.category === category;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === '' ||
        n.headline.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });

    if (sort === 'TRENDING') {
      list = [...list].sort((a, b) => {
        const rank = (t: NewsItem['tag']) => (t === 'TRENDING' ? 0 : t === 'IMPORTANT' ? 1 : 2);
        return rank(a.tag) - rank(b.tag);
      });
    } else if (sort === 'IMPORTANT') {
      list = list.filter((n) => n.tag === 'IMPORTANT');
    }
    return list;
  }, [query, category, sort]);

  const featured = filtered.find((n) => n.featured);
  const rest = filtered.filter((n) => !n.featured);

  return (
    <div>
      {/* ============================ 01 — Kisan Times ============================ */}
      <SectionHeader
        step="01"
        title="Kisan Times"
        subtitle="Daily agricultural intelligence, news, and updates for farmers."
      />

      <div className="mt-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-offwhite-muted/50" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH NEWS — try “tomato”, “rain”, “scheme”…"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-offwhite placeholder:text-offwhite-muted/40 outline-none transition-all focus:border-emerald-glow/50 focus:bg-emerald-glow/[0.03]"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {NEWS_CATEGORIES.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-xl border px-3.5 py-2 text-xs font-medium transition-all ${
                  active
                    ? 'border-emerald-glow/50 bg-emerald-glow/10 text-emerald-glow shadow-glow'
                    : 'border-white/[0.08] bg-white/[0.03] text-offwhite-muted hover:border-white/20 hover:text-offwhite'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sort control */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-1">
            {SORT_MODES.map((mode) => {
              const active = sort === mode;
              const Icon = mode === 'LATEST' ? Clock : mode === 'TRENDING' ? Flame : Star;
              return (
                <button
                  key={mode}
                  onClick={() => setSort(mode)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold tracking-widest transition-all ${
                    active
                      ? 'bg-emerald-glow/15 text-emerald-glow'
                      : 'text-offwhite-muted/60 hover:text-offwhite'
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {mode}
                </button>
              );
            })}
          </div>
          <p className="flex items-center gap-1.5 text-[11px] text-offwhite-muted/50">
            <Info className="h-3 w-3" />
            DEMO AGRICULTURAL NEWS — not live news.
          </p>
        </div>
      </div>

      {/* ============================ Featured story ============================ */}
      <AnimatePresence mode="wait">
        {featured && (
          <motion.button
            key={`featured-${featured.id}-${category}-${sort}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setArticle(featured)}
            className="group relative mt-6 block w-full overflow-hidden rounded-2xl border border-emerald-glow/25 bg-gradient-to-br from-emerald-glow/[0.08] via-forest-900/60 to-forest-950 p-6 text-left shadow-soft transition-all hover:border-emerald-glow/50 hover:shadow-glow sm:p-8"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-glow/10 blur-3xl" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-lg border border-emerald-glow/50 bg-emerald-glow/15 px-2.5 py-1 text-[10px] font-bold tracking-widest text-emerald-glow">
                <Flame className="h-3 w-3" />
                FEATURED STORY
              </span>
              <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold tracking-widest text-offwhite-muted">
                {featured.category.toUpperCase()}
              </span>
              <span className="text-[11px] text-offwhite-muted/50">
                {featured.date} · {featured.time}
              </span>
            </div>
            <h3 className="mt-4 max-w-2xl font-display text-xl font-bold leading-snug text-offwhite transition-colors group-hover:text-emerald-glow sm:text-2xl">
              {featured.headline}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-offwhite-muted">
              {featured.summary}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-emerald-glow">
              READ FULL STORY
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ============================ News grid ============================ */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {rest.map((item) => (
            <NewsCard key={item.id} item={item} onOpen={() => setArticle(item)} />
          ))}
        </AnimatePresence>
      </motion.div>

      {rest.length === 0 && !featured && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 rounded-2xl border border-dashed border-white/15 px-6 py-12 text-center text-sm text-offwhite-muted"
        >
          No demo stories match “{query}” in {category}. Try another search term.
        </motion.p>
      )}

      {/* ============================ 02 — Farmer Brief ============================ */}
      <div className="mt-14">
        <SectionHeader
          step="02"
          title="Today's Farmer Brief"
          subtitle="A compact snapshot connecting Kisan Times to the rest of the FarmShield modules."
        />
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FARMER_BRIEF.map((brief, i) => {
            const Icon = brief.icon;
            return (
              <motion.div
                key={brief.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.08 }}
                className="glass-card group p-5 transition-all hover:border-emerald-glow/30"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-emerald-glow/10 px-2.5 py-1 text-[10px] font-bold tracking-widest text-emerald-glow">
                    {brief.label}
                  </span>
                  <Icon className="h-4 w-4 text-emerald-glow/70" />
                </div>
                <p className="mt-3 font-display text-sm font-semibold leading-snug text-offwhite">
                  {brief.title}
                </p>
                <p className="mt-1 text-xs font-medium text-lime-glow">{brief.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-offwhite-muted/70">
                  {brief.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Article modal */}
      {article && <ArticleModal item={article} onClose={() => setArticle(null)} onOpen={setArticle} />}
    </div>
  );
}

/* ============================================================
   News card
   ============================================================ */

function NewsCard({ item, onOpen }: { item: NewsItem; onOpen: () => void }) {
  const Icon = item.icon;
  const tagColor =
    item.tag === 'TRENDING'
      ? 'text-amber-glow border-amber-glow/40 bg-amber-glow/[0.08]'
      : item.tag === 'IMPORTANT'
        ? 'text-lime-glow border-lime-glow/40 bg-lime-glow/[0.08]'
        : 'text-emerald-glow border-emerald-glow/40 bg-emerald-glow/[0.08]';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card group flex cursor-pointer flex-col p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-glow/30 hover:shadow-glow"
      onClick={onOpen}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-glow/10 ring-1 ring-emerald-glow/20">
          <Icon className="h-4 w-4 text-emerald-glow" />
        </span>
        <span className={`rounded-lg border px-2 py-0.5 text-[9px] font-bold tracking-widest ${tagColor}`}>
          {item.tag}
        </span>
      </div>
      <p className="mt-3 text-[10px] font-bold tracking-widest text-offwhite-muted/50">
        {item.category.toUpperCase()} · {item.date} · {item.time}
      </p>
      <h4 className="mt-1.5 font-display text-sm font-semibold leading-snug text-offwhite transition-colors group-hover:text-emerald-glow">
        {item.headline}
      </h4>
      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-offwhite-muted">
        {item.summary}
      </p>
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="flex items-center gap-1 text-[10px] text-offwhite-muted/50">
          <Clock className="h-3 w-3" />
          {item.readMinutes} min read
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-offwhite-muted/40 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-glow" />
      </div>
    </motion.div>
  );
}

/* ============================================================
   Article modal
   ============================================================ */

function ArticleModal({
  item,
  onClose,
  onOpen,
}: {
  item: NewsItem;
  onClose: () => void;
  onOpen: (item: NewsItem) => void;
}) {
  const Icon = item.icon;
  return (
    <Modal open onClose={onClose} label="Demo news article">
      <div className="pr-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-lg border border-emerald-glow/40 bg-emerald-glow/10 px-2.5 py-1 text-[10px] font-bold tracking-widest text-emerald-glow">
            <Newspaper className="h-3 w-3" />
            {item.tag === 'LATEST' ? 'LATEST' : item.tag === 'TRENDING' ? 'TRENDING' : 'IMPORTANT'}
          </span>
          <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold tracking-widest text-offwhite-muted">
            {item.category.toUpperCase()}
          </span>
          <span className="text-[11px] text-offwhite-muted/50">
            {item.date} · {item.time} · {item.readMinutes} min read
          </span>
        </div>

        <div className="mt-4 flex items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-glow/10 ring-1 ring-emerald-glow/20">
            <Icon className="h-5 w-5 text-emerald-glow" />
          </span>
          <h3 className="font-display text-xl font-bold leading-snug text-offwhite">
            {item.headline}
          </h3>
        </div>

        <p className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm italic leading-relaxed text-offwhite-muted">
          {item.summary}
        </p>

        <div className="mt-5 space-y-3">
          {item.body.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-offwhite-muted">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-lime-glow/25 bg-lime-glow/[0.05] p-4">
          <p className="text-[10px] font-bold tracking-widest text-lime-glow">KEY TAKEAWAYS</p>
          <ul className="mt-2.5 space-y-1.5">
            {item.takeaways.map((t) => (
              <li key={t} className="flex items-start gap-2 text-xs leading-relaxed text-offwhite-muted">
                <TrendingUp className="mt-0.5 h-3 w-3 shrink-0 text-lime-glow" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {item.related.length > 0 && (
          <div className="mt-6">
            <p className="text-[10px] font-bold tracking-widest text-offwhite-muted/60">
              RELATED STORIES
            </p>
            <div className="mt-2.5 space-y-2">
              {item.related
                .map((id) => NEWS.find((n) => n.id === id))
                .filter((n): n is NewsItem => Boolean(n))
                .map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onOpen(rel)}
                    className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left transition-all hover:border-emerald-glow/30 hover:bg-emerald-glow/[0.04]"
                  >
                    <span className="text-[10px] font-bold tracking-widest text-offwhite-muted/50">
                      {rel.category.toUpperCase()}
                    </span>
                    <span className="flex-1 text-xs font-medium text-offwhite group-hover:text-emerald-glow">
                      {rel.headline}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-offwhite-muted/40" />
                  </button>
                ))}
            </div>
          </div>
        )}

        <p className="mt-6 flex items-center gap-1.5 rounded-lg border border-amber-glow/25 bg-amber-glow/[0.05] p-3 text-[11px] text-offwhite-muted">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-glow" />
          Demo content — written for presentation purposes, not a real news story.
        </p>
      </div>
    </Modal>
  );
}

/* ============================================================
   Section header
   ============================================================ */

function SectionHeader({
  step,
  title,
  subtitle,
}: {
  step: string;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-glow/10 font-display text-sm font-bold text-amber-glow ring-1 ring-amber-glow/25">
        {step}
      </span>
      <div>
        <h3 className="font-display text-xl font-semibold text-offwhite sm:text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-offwhite-muted">{subtitle}</p>
      </div>
    </motion.div>
  );
}
