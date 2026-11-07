import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { diwaliAudio } from '../utils/audioEngine';

export default function PromiseScreen({ onNext }) {
  const [promiseAccepted, setPromiseAccepted] = useState(false);

  const handleMakePromise = () => {
    setPromiseAccepted(true);
    diwaliAudio.playRomanticChime();

    // Golden heart confetti explosion
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#F7E7B0', '#FF4081', '#FF6B6B', '#FFF'],
      shapes: ['circle'],
      scalar: 1.1,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10 w-full max-w-lg mx-auto text-center"
    >
      {/* Top golden subtitle */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A101C]/80 border border-[#D4AF37]/40 text-xs text-[#F7E7B0] tracking-widest uppercase font-serif"
      >
        <span>💍</span>
        <span>A Sacred Vow For A Lifetime</span>
        <span>💍</span>
      </motion.div>

      {/* Main Glass Card */}
      <div className="relative w-full rounded-3xl p-6 sm:p-9 glass-maroon border border-[#D4AF37]/60 box-glow-gold flex flex-col items-center overflow-hidden">
        {/* Subtle rangoli background */}
        <div className="absolute inset-0 bg-rangoli-pattern opacity-35 pointer-events-none" />

        {/* Heading: "One Promise, Forever ❤️" */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-2xl sm:text-4xl font-display font-extrabold gold-gradient-text tracking-wide mb-3"
        >
          One Promise, Forever ❤️
        </motion.h1>

        {/* Centerpiece: Animated Golden Beating Heart with Glowing Aura */}
        <motion.div
          animate={{
            scale: promiseAccepted ? [1, 1.25, 1.15] : [1, 1.08, 0.98, 1.06, 1],
          }}
          transition={{
            duration: promiseAccepted ? 0.8 : 2.2,
            repeat: promiseAccepted ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          className="relative z-10 my-4 flex items-center justify-center cursor-pointer"
          onClick={!promiseAccepted ? handleMakePromise : undefined}
        >
          {/* Outer Pulsing Glow */}
          <div
            className={`absolute w-36 h-36 rounded-full transition-all duration-700 ${
              promiseAccepted
                ? 'bg-[#FFD700]/40 blur-2xl scale-150'
                : 'bg-[#D4AF37]/25 blur-xl'
            }`}
          />

          {/* Golden Heart SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-28 h-28 sm:w-36 sm:h-36 filter drop-shadow(0 0 18px rgba(255, 215, 0, 0.75))"
          >
            <defs>
              <linearGradient id="goldHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9C4" />
                <stop offset="35%" stopColor="#FFD700" />
                <stop offset="70%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#AA820A" />
              </linearGradient>
            </defs>
            <path
              d="M50 88 C20 62 4 44 4 28 C4 14 15 4 29 4 C37 4 45 8 50 15 C55 8 63 4 71 4 C85 4 96 14 96 28 C96 44 80 62 50 88 Z"
              fill="url(#goldHeartGrad)"
              stroke="#FFF4DF"
              strokeWidth="2.5"
            />
            {/* Inner Ring with Initials */}
            <circle cx="50" cy="40" r="22" fill="#3A0D17" opacity="0.6" />
            <text
              x="50"
              y="45"
              fontFamily="serif"
              fontSize="14"
              fontWeight="bold"
              fill="#FFF4DF"
              textAnchor="middle"
            >
              K 💛 M
            </text>
          </svg>
        </motion.div>

        {/* Sacred Promise Text (Tamil from prompt) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 w-full p-4 sm:p-5 rounded-2xl bg-[#390C16]/80 border border-[#D4AF37]/40 shadow-inner my-2"
        >
          <p className="font-tamil text-base sm:text-lg font-semibold text-[#FFF4DF] leading-relaxed text-center">
            "நீ சந்தோஷமாக இருக்கும்போது உன்னுடன் சிரிப்பேன். நீ சோகமாக இருக்கும்போது உனக்குத் துணையாக இருப்பேன். வாழ்க்கை எப்படிப் போனாலும், உன்னை மதித்து, புரிந்து கொண்டு, உன் கையைப் பிடித்துக் கொண்டு நடக்க முயற்சி செய்வேன்."
          </p>

          <div className="mt-3 pt-3 border-t border-[#D4AF37]/30 text-xs sm:text-sm font-serif italic text-[#F7E7B0]/90">
            "In your joy I will laugh with you. In your sorrow I will stand as your strength. However life turns, I promise to respect you, understand you, and walk every step holding your hand."
          </div>
        </motion.div>

        {/* Interactive Promise Button: "MY PROMISE TO YOU 💛" */}
        <div className="relative z-10 mt-5 w-full">
          {!promiseAccepted ? (
            <motion.button
              onClick={handleMakePromise}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full py-4 px-6 rounded-full btn-gold-shimmer text-[#270811] font-display font-extrabold text-base tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/40 border border-[#FFF4DF]"
            >
              <Heart className="w-5 h-5 fill-current text-[#270811]" />
              <span>MY PROMISE TO YOU 💛</span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-3 rounded-2xl bg-[#521323] border border-[#FFD700] text-center shadow-lg"
            >
              <div className="flex items-center justify-center gap-2 text-[#FFD700] font-serif font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#FFD700]" />
                <span>Promise Sealed In My Heart Forever</span>
              </div>
              <p className="text-[11px] text-[#F7E7B0] font-sans mt-0.5">
                Kowsi has locked this promise for Mouli ✨
              </p>
            </motion.div>
          )}
        </div>

        {/* Unlock Button to Final Screen: The Final Surprise */}
        {promiseAccepted && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 mt-6 w-full"
          >
            <motion.button
              onClick={() => {
                diwaliAudio.playRomanticChime();
                onNext();
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFF4DF] to-[#FFD700] text-[#270811] font-display font-bold text-sm tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/50"
            >
              <Sparkles className="w-4 h-4 text-[#270811]" />
              <span>THE FINAL SURPRISE</span>
              <ChevronRight className="w-5 h-5 text-[#270811]" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
