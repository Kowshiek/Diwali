import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import Diya from './Diya';
import confetti from 'canvas-confetti';
import { diwaliAudio } from '../utils/audioEngine';

export default function IntroScreen({ onOpenSurprise }) {
  const handleOpen = () => {
    // 1. Play sweet chime sound
    diwaliAudio.playRomanticChime();
    
    // 2. Start romantic background music (first user gesture)
    diwaliAudio.start();

    // 3. Golden Heart Confetti burst
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#FFD700', '#F7E7B0', '#FF4081', '#FF6B6B'],
    });

    // 4. Advance screen
    onOpenSurprise();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative text-center z-10"
    >
      {/* Top Ornamental Header Motif */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-4 flex items-center justify-center gap-2"
      >
        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
        <span className="text-xs uppercase tracking-[0.3em] text-[#F7E7B0]/90 font-medium font-serif">
          Deepavali 2026 Special
        </span>
        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
      </motion.div>

      {/* Main Container Card with Glowing Gold Border */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.9, ease: 'easeOut' }}
        className="max-w-md w-full relative p-6 sm:p-8 rounded-3xl glass-maroon border border-[#D4AF37]/50 box-glow-gold flex flex-col items-center overflow-hidden"
      >
        {/* Subtle decorative rangoli background in card */}
        <div className="absolute inset-0 bg-rangoli-pattern opacity-30 pointer-events-none" />

        {/* Centerpiece: Large Animated Golden Diya */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="my-3 relative"
        >
          <Diya size="lg" glowing={true} />
        </motion.div>

        {/* Text 1: "A Special Surprise For You..." */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="text-2xl sm:text-3xl font-display font-bold gold-gradient-text mt-4 mb-2 tracking-wide"
        >
          A Special Surprise For You...
        </motion.h1>

        {/* Heart Divider */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.0, type: 'spring' }}
          className="flex items-center gap-2 my-2 text-[#FFD700]"
        >
          <span className="w-10 h-[1px] bg-[#D4AF37]/40" />
          <Heart className="w-4 h-4 fill-[#FFD700] text-[#FFD700] animate-pulse" />
          <span className="w-10 h-[1px] bg-[#D4AF37]/40" />
        </motion.div>

        {/* Text 2: "Someone has something special to tell you, Mouli." */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="text-lg sm:text-xl font-serif text-[#FFF4DF] leading-relaxed max-w-xs font-normal"
        >
          Someone has something special to tell you,{' '}
          <span className="font-script text-2xl text-[#FFD700] font-semibold block sm:inline mt-1 sm:mt-0">
            Mouli.
          </span>
        </motion.p>

        {/* Tamil emotional touch subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="text-xs font-tamil text-[#F7E7B0]/80 mt-3 italic"
        >
          "உனக்காகவே உருவாக்கப்பட்ட ஒரு இனிய காதல் பரிசு..."
        </motion.p>

        {/* Button: "OPEN YOUR SURPRISE ❤️" */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-7 w-full flex justify-center"
        >
          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto px-8 py-4 rounded-full btn-gold-shimmer text-[#270811] font-display font-bold text-base sm:text-lg tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-[#D4AF37]/30 transition-all border border-[#FFF4DF]"
          >
            <Sparkles className="w-5 h-5 text-[#270811]" />
            <span>OPEN YOUR SURPRISE</span>
            <span className="text-xl">❤️</span>
          </motion.button>
        </motion.div>

        {/* Tap hint note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.8 }}
          className="text-[11px] text-[#F7E7B0]/60 mt-4 tracking-wider flex items-center gap-1 font-serif"
        >
          <span>✨ Turn up your phone volume for the best experience</span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
