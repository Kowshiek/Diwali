import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, Share2, Image as ImageIcon } from 'lucide-react';
import Diya from './Diya';
import FireworksCanvas from './FireworksCanvas';
import confetti from 'canvas-confetti';
import { diwaliAudio } from '../utils/audioEngine';

export default function FinalSurprise({ onRestart, onGoToPoster }) {
  const [toastMessage, setToastMessage] = useState('');

  // Big celebratory confetti barrage on grand finale entrance
  useEffect(() => {
    diwaliAudio.playRomanticChime();

    const end = Date.now() + 3.5 * 1000;
    const colors = ['#FFD700', '#F7E7B0', '#FF4081', '#FF6B6B', '#00E5FF'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleShare = async () => {
    diwaliAudio.playRomanticChime();
    const shareData = {
      title: 'Kowsi 💛 Moulii – Forever & Always',
      text: 'Happy Diwali My Love! "Every Diwali, I wish for the same thing... You, Me and A Lifetime Together. ❤️" Kowsi 💛 Moulii',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        showToast('Shared with love! ❤️');
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyLinkFallback();
        }
      }
    } else {
      copyLinkFallback();
    }
  };

  const copyLinkFallback = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Website link copied! 📋');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative text-center z-10 w-full max-w-xl mx-auto"
    >
      {/* Cinematic Full-Screen Diwali Fireworks */}
      <FireworksCanvas active={true} autoBurst={true} intensity="high" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 z-50 px-5 py-2.5 rounded-full bg-[#1B050B]/95 text-[#FFD700] border border-[#D4AF37] shadow-xl text-sm font-serif">
          {toastMessage}
        </div>
      )}

      {/* Grand Finale Card */}
      <div className="relative w-full rounded-3xl p-6 sm:p-10 glass-maroon border-2 border-[#D4AF37] box-glow-gold flex flex-col items-center overflow-hidden z-20">
        
        {/* Traditional Garland Header Motif */}
        <div className="relative z-10 flex items-center justify-center gap-2 mb-2">
          <span className="text-[#FFD700]">✨</span>
          <span className="text-xs uppercase font-serif font-bold tracking-[0.3em] text-[#F7E7B0]">
            FOREVER & ALWAYS
          </span>
          <span className="text-[#FFD700]">✨</span>
        </div>

        {/* Twin Glowing Diyas with Golden Heart Centerpiece */}
        <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-6 my-2">
          <Diya size="sm" glowing={true} />

          {/* Animated Golden Heart */}
          <motion.div
            animate={{
              scale: [1, 1.15, 0.96, 1.12, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
          >
            <Heart className="w-full h-full text-[#FFD700] fill-[#FFD700] filter drop-shadow(0 0 16px rgba(255, 215, 0, 0.8))" />
          </motion.div>

          <Diya size="sm" glowing={true} />
        </div>

        {/* Main Heading: "HAPPY DIWALI, MY LOVE!" */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 text-3xl sm:text-5xl font-display font-extrabold gold-gradient-text tracking-wider mt-3"
        >
          HAPPY DIWALI, MY LOVE!
        </motion.h1>

        {/* Names: "Kowsi 💛 Moulii" */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 text-2xl sm:text-4xl font-script text-[#FFF4DF] my-2 filter drop-shadow(0 2px 8px rgba(255,215,0,0.5))"
        >
          Kowsi 💛 Moulii
        </motion.div>

        {/* Golden Line Separator */}
        <div className="relative z-10 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-3" />

        {/* Main Message (Tamil from prompt):
            "நீ என் வாழ்க்கையில் வந்தது ஒரு சாதாரண நிகழ்வு இல்லை. என் வாழ்க்கையை இன்னும் அழகாக்கிய ஒரு அற்புதமான தருணம்." */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="relative z-10 p-4 rounded-2xl bg-[#3E0E19]/80 border border-[#D4AF37]/40 shadow-inner my-2 w-full"
        >
          <p className="font-tamil text-base sm:text-lg font-semibold text-[#FFF4DF] leading-relaxed">
            "நீ என் வாழ்க்கையில் வந்தது ஒரு சாதாரண நிகழ்வு இல்லை. என் வாழ்க்கையை இன்னும் அழகாக்கிய ஒரு அற்புதமான தருணம்."
          </p>
          <p className="font-serif italic text-xs sm:text-sm text-[#F7E7B0]/80 mt-2">
            "Your coming into my life was no ordinary occurrence. It was the most wondrous moment that made my life truly beautiful."
          </p>
        </motion.div>

        {/* Final Message (English from prompt):
            "Every Diwali, I wish for the same thing... You, Me and A Lifetime Together. ❤️" */}
        <motion.blockquote
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="relative z-10 text-base sm:text-xl font-serif font-bold text-[#FFD700] my-3 leading-relaxed px-2 text-glow-gold"
        >
          "Every Diwali, I wish for the same thing... You, Me and A Lifetime Together. ❤️"
        </motion.blockquote>

        {/* Signature: "Forever Yours, Kowsi 💛" */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="relative z-10 mt-3 border-t border-[#D4AF37]/30 pt-3 w-full"
        >
          <p className="font-script text-2xl sm:text-3xl text-[#FFF4DF] font-bold">
            Forever Yours,
            <span className="block text-[#FFD700] text-3xl sm:text-4xl">
              Kowsi 💛
            </span>
          </p>
          <p className="text-[11px] uppercase tracking-widest text-[#F7E7B0]/70 font-serif mt-1">
            Happy Diwali 2026 • With All My Love
          </p>
        </motion.div>

        {/* Interactive Action Controls */}
        <div className="relative z-10 mt-6 w-full flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <motion.button
            onClick={onRestart}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-3 px-4 rounded-full bg-[#4A101C] hover:bg-[#5E1424] text-[#FFF4DF] border border-[#D4AF37]/60 text-xs sm:text-sm font-serif font-semibold flex items-center justify-center gap-2 shadow-lg"
          >
            <RotateCcw className="w-4 h-4 text-[#FFD700]" />
            <span>Replay Surprise</span>
          </motion.button>

          <motion.button
            onClick={onGoToPoster}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-3 px-4 rounded-full bg-[#4A101C] hover:bg-[#5E1424] text-[#FFF4DF] border border-[#D4AF37]/60 text-xs sm:text-sm font-serif font-semibold flex items-center justify-center gap-2 shadow-lg"
          >
            <ImageIcon className="w-4 h-4 text-[#FFD700]" />
            <span>View Couple Poster</span>
          </motion.button>

          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-3 px-4 rounded-full btn-gold-shimmer text-[#270811] text-xs sm:text-sm font-display font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Love</span>
          </motion.button>
        </div>

        {/* Interactive fireworks hint */}
        <p className="relative z-10 text-[11px] text-[#F7E7B0]/60 mt-4 tracking-wide">
          ✨ Tap your phone screen to light up more fireworks in celebration!
        </p>
      </div>
    </motion.div>
  );
}
