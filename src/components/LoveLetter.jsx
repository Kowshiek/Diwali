import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, RotateCcw, FastForward } from 'lucide-react';
import { diwaliAudio } from '../utils/audioEngine';

export default function LoveLetter({ onNext }) {
  const letterParagraphs = [
    "My dear Moulii,",
    "I don't know how to explain how important you are in my life.",
    "You are not just someone I love. You are someone I want beside me in every chapter of my life.",
    "I cannot promise that every day will be perfect. I cannot promise that we will never face problems.",
    "But I can promise that I will always try to understand you, respect you, support you and stand beside you.",
    "No matter how difficult life becomes, I don't want to give up on us.",
    "Your smile means more to me than you know.",
    "I don't need a perfect life. I just want a beautiful life with you.",
    "With all my love,\nYour Kowsi 💛",
  ];

  // Typing state: which paragraph we are currently typing, and how many characters are revealed
  const [currentParaIndex, setCurrentParaIndex] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isCompleted) return;

    if (currentParaIndex >= letterParagraphs.length) {
      setIsCompleted(true);
      diwaliAudio.playRomanticChime();
      return;
    }

    const currentText = letterParagraphs[currentParaIndex];

    if (displayedChars < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayedChars((prev) => prev + 1);
      }, 26); // typing speed
      return () => clearTimeout(timer);
    } else {
      // Pause briefly between paragraphs
      const nextTimer = setTimeout(() => {
        setCurrentParaIndex((prev) => prev + 1);
        setDisplayedChars(0);
      }, 550);
      return () => clearTimeout(nextTimer);
    }
  }, [currentParaIndex, displayedChars, isCompleted, letterParagraphs]);

  // Show all immediately
  const handleShowAll = () => {
    setIsCompleted(true);
    setCurrentParaIndex(letterParagraphs.length);
    diwaliAudio.playRomanticChime();
  };

  // Replay letter typing
  const handleRestart = () => {
    setIsCompleted(false);
    setCurrentParaIndex(0);
    setDisplayedChars(0);
    diwaliAudio.playRomanticChime();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-start px-3 sm:px-4 py-8 relative z-10 w-full max-w-xl mx-auto"
    >
      {/* Decorative header */}
      <div className="text-center mb-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#F7E7B0] font-serif">
          From Kowsi's Heart To Yours
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-bold gold-gradient-text mt-1">
          Letter From My Heart
        </h2>
      </div>

      {/* Romantic Golden Controls Bar */}
      <div className="w-full flex items-center justify-between mb-3 px-2 text-xs text-[#F7E7B0]">
        <button
          onClick={handleRestart}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#4A101C]/80 hover:bg-[#5E1424] border border-[#D4AF37]/30 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#FFD700]" />
          <span>Replay Letter</span>
        </button>

        {!isCompleted && (
          <button
            onClick={handleShowAll}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#FFD700] border border-[#D4AF37]/40 transition-all"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Read All</span>
          </button>
        )}
      </div>

      {/* VINTAGE ROYAL PARCHMENT LETTER */}
      <div className="relative w-full rounded-3xl p-6 sm:p-9 glass-parchment border-4 border-[#D4AF37] box-glow-gold shadow-2xl overflow-hidden font-serif">
        
        {/* Parchment texture subtle styling */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#AA820A]/10 rounded-tr-full pointer-events-none" />

        {/* Traditional Wax Seal Ribbon (Top Right) */}
        <div className="absolute top-4 right-4 flex items-center justify-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#8E1E36] to-[#4A101C] border-2 border-[#D4AF37] shadow-lg flex items-center justify-center">
            <span className="font-script text-[#FFD700] font-bold text-sm sm:text-base">KM</span>
          </div>
        </div>

        {/* Letter Heading: "Dear Moulii, ❤️" */}
        <div className="mb-6 border-b border-[#270811]/20 pb-3">
          <h1 className="text-3xl sm:text-4xl font-script text-[#4A101C] font-bold">
            Dear Moulii, ❤️
          </h1>
          <p className="text-[11px] text-[#270811]/60 uppercase tracking-widest font-sans mt-0.5">
            Diwali 2026 • A Promise of Forever
          </p>
        </div>

        {/* Letter Body: Realistic Paragraph by Paragraph Reveal */}
        <div className="space-y-4 text-base sm:text-lg text-[#270811] leading-relaxed font-normal">
          {letterParagraphs.map((para, idx) => {
            if (isCompleted || idx < currentParaIndex) {
              // Fully revealed paragraph
              return (
                <p
                  key={idx}
                  className={
                    idx === letterParagraphs.length - 1
                      ? 'font-script text-2xl sm:text-3xl font-bold text-[#6B1729] pt-3 whitespace-pre-line'
                      : idx === 0
                      ? 'font-semibold text-lg text-[#4A101C]'
                      : 'leading-relaxed'
                  }
                >
                  {para}
                </p>
              );
            }

            if (idx === currentParaIndex) {
              // Currently typing paragraph with blinking quill cursor
              const currentSlice = para.slice(0, displayedChars);
              return (
                <p
                  key={idx}
                  className={
                    idx === letterParagraphs.length - 1
                      ? 'font-script text-2xl sm:text-3xl font-bold text-[#6B1729] pt-3 whitespace-pre-line'
                      : 'leading-relaxed'
                  }
                >
                  {currentSlice}
                  <span className="inline-block w-1.5 h-4 ml-1 bg-[#8E1E36] animate-pulse" />
                </p>
              );
            }

            return null;
          })}
        </div>

        {/* Romantic Decorative Golden Hearts Bottom Footer */}
        <div className="mt-8 pt-4 border-t border-[#270811]/15 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#8E1E36]">
            <Heart className="w-4 h-4 fill-current" />
            <span className="text-xs font-script text-lg">Kowsi & Moulii</span>
          </div>
          <span className="text-[11px] font-sans text-[#270811]/60 tracking-wider">
            Forever & Always
          </span>
        </div>
      </div>

      {/* Button to Next Screen: My Forever Promise */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-7 w-full flex justify-center pb-8"
      >
        <motion.button
          onClick={() => {
            diwaliAudio.playRomanticChime();
            onNext();
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full btn-gold-shimmer text-[#270811] font-display font-bold text-sm sm:text-base tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/30 border border-[#FFF4DF]"
        >
          <span>See My Forever Promise</span>
          <ChevronRight className="w-5 h-5 text-[#270811]" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
