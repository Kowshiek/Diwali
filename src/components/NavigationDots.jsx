import React from 'react';
import { motion } from 'framer-motion';

const stepNames = [
  'Secret Surprise',
  'Diwali Welcome',
  'Couple Poster',
  'Letter of Love',
  'Forever Promise',
  'Grand Finale',
];

export default function NavigationDots({ currentStep, onSelectStep, unlocked }) {
  if (!unlocked || currentStep === 1) return null;

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B050B]/90 backdrop-blur-md border border-[#D4AF37]/50 shadow-xl max-w-[92vw]">
      {stepNames.map((name, idx) => {
        const stepNum = idx + 1;
        const isActive = currentStep === stepNum;
        return (
          <button
            key={stepNum}
            onClick={() => onSelectStep(stepNum)}
            className="group relative flex items-center justify-center p-1"
            title={`${stepNum}. ${name}`}
            aria-label={`${stepNum}. ${name}`}
          >
            {/* Active Pill Indicator */}
            {isActive ? (
              <motion.div
                layoutId="activePill"
                className="w-5 h-2.5 rounded-full bg-gradient-to-r from-[#AA820A] via-[#FFD700] to-[#FFF4DF] shadow-md shadow-[#D4AF37]/60"
              />
            ) : (
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]/35 group-hover:bg-[#FFD700]/70 transition-all" />
            )}

            {/* Step tooltip */}
            <span className="absolute -top-7 hidden group-hover:block whitespace-nowrap text-[10px] bg-[#270811] text-[#F7E7B0] px-2 py-0.5 rounded-md border border-[#D4AF37]/40 pointer-events-none">
              {stepNum}. {name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
