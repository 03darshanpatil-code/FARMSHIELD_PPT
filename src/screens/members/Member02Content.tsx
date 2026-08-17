import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';
import DiseaseDetection from './disease-detection/DiseaseDetection';
import FertilizerMarketplace from './fertilizer/FertilizerMarketplace';
import CropSimulator from './crop-simulator/CropSimulator';

interface Member02ContentProps {
  subsectionId: string;
  setActiveSubId: (id: string) => void;
}

export default function Member02Content({
  subsectionId,
  setActiveSubId,
}: Member02ContentProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Section intro */}
      <motion.div variants={fadeUp} className="mb-8 max-w-2xl">
        <h2 className="font-display text-2xl font-semibold text-offwhite sm:text-3xl">
          AI & Smart Crop Care
        </h2>
        <p className="mt-3 text-offwhite-muted">
          An interactive demonstration of FarmShield's intelligent crop care
          pipeline — from AI disease detection to treatment recommendations,
          fertilizer purchasing, and crop scenario simulation.
        </p>
      </motion.div>

      {/* Feature content */}
      {subsectionId === 'disease-detection' && (
        <DiseaseDetection onGoToMarketplace={() => setActiveSubId('fertilizer-marketplace')} />
      )}
      {subsectionId === 'fertilizer-marketplace' && (
        <FertilizerMarketplace onBackToDiagnosis={() => setActiveSubId('disease-detection')} />
      )}
      {subsectionId === 'crop-simulator' && <CropSimulator />}
    </motion.div>
  );
}
