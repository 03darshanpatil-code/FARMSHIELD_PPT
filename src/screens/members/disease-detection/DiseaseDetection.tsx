import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  Sparkles,
  ScanLine,
  Brain,
  CheckCircle2,
  AlertTriangle,
  FlaskRound,
  Leaf,
  Activity,
  ArrowRight,
  Package,
  ShoppingCart,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { fadeUp, scaleIn, staggerContainer } from '@/lib/motion';

const DEMO_IMAGE =
  'https://images.pexels.com/photos/6342164/pexels-photo-6342164.jpeg?auto=compress&cs=tinysrgb&w=940';

type Phase = 'idle' | 'scanning' | 'processing' | 'detecting' | 'complete';

const scanSteps: { phase: Phase; label: string; icon: typeof ScanLine }[] = [
  { phase: 'scanning', label: 'Image Scanning', icon: ScanLine },
  { phase: 'processing', label: 'AI Processing', icon: Brain },
  { phase: 'detecting', label: 'Detection', icon: Activity },
  { phase: 'complete', label: 'Analysis Complete', icon: CheckCircle2 },
];

interface DiseaseDetectionProps {
  onGoToMarketplace: () => void;
}

export default function DiseaseDetection({ onGoToMarketplace }: DiseaseDetectionProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [hasImage, setHasImage] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showTreatment, setShowTreatment] = useState(false);

  const startAnalysis = useCallback(() => {
    setHasImage(true);
    setShowResult(false);
    setShowTreatment(false);
    setPhase('scanning');

    const runSequence = async () => {
      const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
      await delay(1200);
      setPhase('processing');
      await delay(1200);
      setPhase('detecting');
      await delay(1200);
      setPhase('complete');
      await delay(600);
      setShowResult(true);
    };
    void runSequence();
  }, []);

  const reset = () => {
    setPhase('idle');
    setHasImage(false);
    setShowResult(false);
    setShowTreatment(false);
  };

  const currentStepIndex = scanSteps.findIndex((s) => s.phase === phase);

  return (
    <div>
      {/* Upload / Demo area */}
      <AnimatePresence mode="wait">
        {phase === 'idle' && !showResult && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            <UploadArea onDemo={startAnalysis} />
          </motion.div>
        )}

        {/* Analysis sequence */}
        {hasImage && phase !== 'idle' && !showResult && (
          <motion.div
            key="analysis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden rounded-2xl border border-lime-glow/20 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8"
          >
            {/* Image preview with scan overlay */}
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={DEMO_IMAGE}
                alt="Crop leaf being analyzed"
                className="h-64 w-full object-cover sm:h-80"
              />
              {/* Scan line animation */}
              <motion.div
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-lime-glow to-transparent shadow-[0_0_12px_2px_rgba(163,230,53,0.6)]"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Grid overlay */}
              <div className="absolute inset-0 grid-pattern opacity-30" />
              <div className="absolute inset-0 bg-forest-950/30" />

              {/* Phase label */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-forest-950/80 px-3 py-1.5 text-xs font-medium text-lime-glow backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                {scanSteps[currentStepIndex]?.label ?? 'Analyzing...'}
              </div>
            </div>

            {/* Step indicators */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {scanSteps.map((step, i) => {
                const StepIcon = step.icon;
                const isDone = i < currentStepIndex || phase === 'complete';
                const isActive = i === currentStepIndex;
                return (
                  <div key={step.phase} className="flex items-center gap-3">
                    <motion.span
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        opacity: isDone ? 1 : isActive ? 1 : 0.4,
                      }}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ring-1 ${
                        isDone
                          ? 'bg-lime-glow/15 ring-lime-glow/40 text-lime-glow'
                          : isActive
                            ? 'bg-lime-glow/10 ring-lime-glow/30 text-lime-glow'
                            : 'bg-white/[0.03] ring-white/10 text-offwhite-muted/40'
                      }`}
                    >
                      <StepIcon className="h-4 w-4" />
                    </motion.span>
                    <span
                      className={`text-sm ${isDone || isActive ? 'text-offwhite' : 'text-offwhite-muted/40'}`}
                    >
                      {step.label}
                    </span>
                    {i < scanSteps.length - 1 && (
                      <div
                        className={`ml-1 hidden h-px w-8 sm:block ${isDone ? 'bg-lime-glow/40' : 'bg-white/10'}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <DiagnosisResult onShowTreatment={() => setShowTreatment(true)} onReset={reset} />

            <AnimatePresence>
              {showTreatment && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TreatmentPanel onGoToMarketplace={onGoToMarketplace} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   Upload Area
   ============================================================ */

function UploadArea({ onDemo }: { onDemo: () => void }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Brain className="h-5 w-5 text-lime-glow" />
        <h3 className="font-display text-lg font-semibold text-offwhite">
          AI Crop Disease Detection
        </h3>
      </div>

      <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/[0.12] bg-white/[0.02] px-6 py-16 text-center backdrop-blur-sm transition-all hover:border-lime-glow/30 hover:bg-lime-glow/[0.03]">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-glow/10 ring-1 ring-lime-glow/20"
        >
          <Upload className="h-8 w-8 text-lime-glow" />
        </motion.div>
        <p className="mt-6 font-display text-lg font-semibold text-offwhite">
          Upload Crop Image
        </p>
        <p className="mt-2 max-w-sm text-sm text-offwhite-muted">
          Drag & drop a photo of your crop or leaf, or use the demo to see
          FarmShield's AI diagnosis in action.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onDemo}
            className="group inline-flex items-center gap-2.5 rounded-xl border border-lime-glow/30 bg-gradient-to-r from-forest-600 to-forest-800 px-6 py-3 text-sm font-semibold text-offwhite shadow-glow transition-all hover:border-lime-glow/60 hover:shadow-[0_0_32px_-4px_rgba(163,230,53,0.5)]"
          >
            <Sparkles className="h-4 w-4 text-lime-glow" />
            TRY DEMO
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            className="inline-flex items-center gap-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm font-medium text-offwhite-muted transition-all hover:border-white/20 hover:text-offwhite"
          >
            <Upload className="h-4 w-4" />
            Upload Image
          </button>
        </div>

        <p className="mt-6 flex items-center gap-1.5 text-xs text-offwhite-muted/50">
          <Info className="h-3 w-3" />
          Demo simulation — not a scientifically accurate diagnosis
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   Diagnosis Result
   ============================================================ */

function DiagnosisResult({
  onShowTreatment,
  onReset,
}: {
  onShowTreatment: () => void;
  onReset: () => void;
}) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-glow/10 ring-1 ring-amber-glow/30">
          <AlertTriangle className="h-5 w-5 text-amber-glow" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-widest text-amber-glow">
            Disease Detected
          </p>
          <p className="font-display text-xl font-semibold text-offwhite">
            Early Blight (Alternaria solani)
          </p>
        </div>
      </motion.div>

      {/* Image + stats grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Image */}
        <motion.div
          variants={scaleIn}
          className="relative overflow-hidden rounded-xl border border-white/[0.08]"
        >
          <img src={DEMO_IMAGE} alt="Analyzed crop" className="h-full w-full object-cover" />
          <div className="absolute bottom-3 left-3 rounded-lg bg-forest-950/80 px-3 py-1.5 text-xs text-offwhite backdrop-blur-sm">
            Analyzed Sample
          </div>
          {/* Detection markers */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute left-[30%] top-[40%] flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-glow/60 bg-amber-glow/10"
          >
            <span className="h-2 w-2 rounded-full bg-amber-glow" />
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
          <StatCard icon={Activity} label="Confidence" value="94.7%" accent="lime" />
          <StatCard icon={Leaf} label="Crop Affected" value="Tomato" accent="emerald" />
          <StatCard icon={AlertTriangle} label="Severity" value="Moderate" accent="amber" />
          <StatCard icon={ScanLine} label="Affected Area" value="~18%" accent="lime" />
        </motion.div>
      </div>

      {/* Explanation */}
      <motion.div
        variants={fadeUp}
        className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
      >
        <p className="text-sm leading-relaxed text-offwhite-muted">
          <span className="font-medium text-offwhite">Early Blight</span> is a
          common fungal disease affecting tomato plants, characterized by
          dark brown lesions with concentric rings on lower leaves. Left
          untreated, it can spread upward and significantly reduce yield. The
          AI model identified characteristic lesion patterns on approximately
          18% of the visible leaf area.
        </p>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-offwhite-muted/50">
          <Info className="h-3 w-3" />
          Demo simulation — results are illustrative, not scientifically verified
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onShowTreatment}
          className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-lime-glow/30 bg-gradient-to-r from-forest-600 to-forest-800 px-6 py-3 text-sm font-semibold text-offwhite shadow-glow transition-all hover:border-lime-glow/60"
        >
          <FlaskRound className="h-4 w-4 text-lime-glow" />
          View Recommended Treatment
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm font-medium text-offwhite-muted transition-all hover:border-white/20 hover:text-offwhite"
        >
          Run New Analysis
        </button>
      </motion.div>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  accent: 'emerald' | 'amber' | 'lime';
}) {
  const colorMap = {
    emerald: 'text-emerald-glow bg-emerald-glow/10 ring-emerald-glow/20',
    amber: 'text-amber-glow bg-amber-glow/10 ring-amber-glow/20',
    lime: 'text-lime-glow bg-lime-glow/10 ring-lime-glow/20',
  };
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
      <span className={`flex h-9 w-9 items-center justify-center rounded-lg ring-1 ${colorMap[accent]}`}>
        <Icon className="h-4 w-4" />
      </span>
      <p className="mt-3 text-xs uppercase tracking-widest text-offwhite-muted/60">
        {label}
      </p>
      <p className="mt-1 font-display text-lg font-semibold text-offwhite">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   Treatment Panel
   ============================================================ */

function TreatmentPanel({ onGoToMarketplace }: { onGoToMarketplace: () => void }) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-glow/10 ring-1 ring-lime-glow/30">
          <FlaskRound className="h-5 w-5 text-lime-glow" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-widest text-lime-glow">
            Recommended Treatment
          </p>
          <p className="font-display text-xl font-semibold text-offwhite">
            Treatment Plan
          </p>
        </div>
      </motion.div>

      {/* Treatment steps */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TreatmentCard
          icon={CheckCircle2}
          title="Recommended Action"
          text="Apply a copper-based fungicide to affected plants. Remove and destroy severely infected lower leaves to slow spread."
        />
        <TreatmentCard
          icon={Info}
          title="Application Guidance"
          text="Spray early morning or late evening every 7–10 days. Ensure thorough coverage of both leaf surfaces. Avoid application before rain."
        />
        <TreatmentCard
          icon={ShieldCheck}
          title="Preventive Advice"
          text="Improve air circulation with proper plant spacing. Use drip irrigation to keep foliage dry. Rotate crops to prevent soil-borne carryover."
        />
        <TreatmentCard
          icon={Package}
          title="Recommended Input"
          text="Copper Oxychloride 50% WP — a broad-spectrum protectant fungicide effective against fungal leaf diseases."
        />
      </div>

      {/* Recommended fertilizer */}
      <motion.div
        variants={fadeUp}
        className="mt-6 overflow-hidden rounded-2xl border border-lime-glow/25 bg-gradient-to-br from-forest-700/40 to-forest-900/40 backdrop-blur-sm"
      >
        <div className="border-b border-white/[0.06] px-6 py-4">
          <p className="text-xs uppercase tracking-widest text-lime-glow">
            Recommended Fertilizer
          </p>
        </div>
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-lime-glow/10 ring-1 ring-lime-glow/20">
              <FlaskRound className="h-7 w-7 text-lime-glow" />
            </span>
            <div>
              <h4 className="font-display text-lg font-semibold text-offwhite">
                Copper Oxychloride 50% WP
              </h4>
              <p className="mt-1 text-sm text-offwhite-muted">
                Broad-spectrum protectant fungicide • Suitable for tomato, potato &amp; vegetables
              </p>
              <p className="mt-2 text-sm text-offwhite-muted">
                <span className="font-medium text-amber-glow">₹ 420</span> per 500g pack
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onGoToMarketplace}
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-xl border border-amber-glow/40 bg-gradient-to-r from-amber-glow/20 to-amber-glow/10 px-6 py-3.5 text-sm font-bold text-amber-glow shadow-glow-amber transition-all hover:border-amber-glow/70 hover:shadow-[0_0_32px_-4px_rgba(245,185,66,0.5)]"
          >
            <ShoppingCart className="h-4 w-4" />
            BUY NOW
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </motion.div>

      {/* Flow hint */}
      <motion.p
        variants={fadeUp}
        className="mt-4 flex items-center gap-2 text-xs text-offwhite-muted/60"
      >
        <ArrowRight className="h-3.5 w-3.5 text-lime-glow" />
        Continuing to the Fertilizer Marketplace to compare prices and place a demo order
      </motion.p>
    </motion.div>
  );
}

function TreatmentCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof CheckCircle2;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5"
    >
      <div className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 text-lime-glow" />
        <h4 className="font-display text-sm font-semibold text-offwhite">{title}</h4>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-offwhite-muted">{text}</p>
    </motion.div>
  );
}
