import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, Flame } from 'lucide-react';
import Diya from './Diya';
import FireworksCanvas from './FireworksCanvas';
import { diwaliAudio } from '../utils/audioEngine';

export default function WelcomeScreen({ onNext }) {
  const handleNext = () => {
    diwaliAudio.playRomanticChime();
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative text-center z-10"
    >
      {/* Background Diwali fireworks on screen 2 */}
      <FireworksCanvas active={true} autoBurst={true} intensity="medium" />

      {/* Floating Animated Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ y: '100vh', opacity: 0, scale: 0.8 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.7, 0.7, 0],
              scale: [0.8, 1.2, 1],
              x: [(i % 2 === 0 ? 1 : -1) * 20, (i % 2 === 0 ? -1 : 1) * 30],
            }}
            transition={{
              duration: 9 + i * 2,
              repeat: Infinity,
              delay: i * 1.8,
              ease: 'easeOut',
            }}
            className="absolute"
            style={{ left: `${15 + i * 18}%` }}
          >
            <Heart className="w-6 h-6 text-[#FFD700] fill-[#FFD700]/40 filter drop-shadow(0 0 6px #FFD700)" />
          </motion.div>
        ))}
      </div>

      {/* Main Glass Card */}
      <div className="max-w-lg w-full relative p-6 sm:p-10 rounded-3xl glass-maroon border border-[#D4AF37]/50 box-glow-gold flex flex-col items-center z-20">
        
        {/* Festive Arch / Toran Garland Motif */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full flex items-center justify-center gap-3 mb-2"
        >
          <span className="text-[#FFD700]">🪔</span>
          <span className="text-xs uppercase tracking-[0.25em] text-[#F7E7B0] font-serif">
            Kowsi 💛 Moulii
          </span>
          <span className="text-[#FFD700]">🪔</span>
        </motion.div>

        {/* Row of 3 Glowing Festive Diyas */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center justify-center gap-4 sm:gap-6 my-4"
        >
          <Diya size="sm" />
          <Diya size="md" glowing={true} />
          <Diya size="sm" />
        </motion.div>

        {/* Main Heading: "Happy Diwali, My Beautiful Moulii ❤️" */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-2xl sm:text-4xl font-display font-extrabold gold-gradient-text tracking-wide leading-tight mt-2"
        >
          Happy Diwali,
          <span className="block font-script text-3xl sm:text-5xl text-[#FFF4DF] font-normal my-1 filter drop-shadow(0 2px 8px rgba(255,215,0,0.4))">
            My Beautiful Moulii ❤️
          </span>
        </motion.h1>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 my-4 w-3/4">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <Sparkles className="w-4 h-4 text-[#FFD700]" />
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>

        {/* Subtitle: "Among millions of lights, you will always be my favourite light." */}
        <motion.blockquote
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg sm:text-xl font-serif italic text-[#FFF4DF] leading-relaxed max-w-md px-2"
        >
          "Among millions of lights, you will always be my favourite light."
        </motion.blockquote>

        {/* Tamil emotional touch translation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-sm font-tamil text-[#F7E7B0]/90 mt-3 font-medium leading-relaxed max-w-sm"
        >
          "கோடி தீபங்கள் ஒளிர்ந்தாலும், என் இதயத்தை ஒளிரச் செய்யும் ஒரே தீபம் நீதான் என் மௌலி! ✨"
        </motion.p>

        {/* Button: "There's Something More For You..." */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-8 w-full flex justify-center"
        >
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full btn-gold-shimmer text-[#270811] font-display font-bold text-sm sm:text-base tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/30 border border-[#FFF4DF]"
          >
            <span>There's Something More For You...</span>
            <ChevronRight className="w-5 h-5 text-[#270811]" />
          </motion.button>
        </motion.div>

        {/* Interactive hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5 }}
          className="text-[11px] text-[#F7E7B0]/70 mt-4 tracking-wide"
        >
          ✨ Tap anywhere on your screen to burst Diwali fireworks!
        </motion.p>
      </div>
    </motion.div>
  );
}
