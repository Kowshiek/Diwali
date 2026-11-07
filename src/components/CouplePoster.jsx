import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Share2, Maximize2, X, RefreshCw, Heart, 
  Sparkles, ChevronRight, Upload, ZoomIn 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { diwaliAudio } from '../utils/audioEngine';
import defaultPosterImg from '../assets/couple-poster.jpg';

export default function CouplePoster({ onNext }) {
  // Main poster source defaults always to the official uploaded couple poster
  const [posterSrc, setPosterSrc] = useState(defaultPosterImg);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  const fileInputRef = useRef(null);

  // Exact Tamil quotes from the poster
  const posterQuotes = [
    {
      id: 1,
      tamil: "எனக்கு என்ன ஆனாலும் உன்னை விட்டுப் போக மாட்டேன்... ஏனென்றால் என் வாழ்க்கையில் கிடைத்த மிக அழகான வரம் நீதான்.",
      meaning: "No matter what happens, I will never leave you... because you are the most beautiful blessing in my life.",
    },
    {
      id: 2,
      tamil: "எத்தனை பிரச்சினைகள் வந்தாலும் உன் கையை விடமாட்டேன். உன் சந்தோஷத்தில் சிரிப்பவனாகவும், உன் கஷ்டத்தில் துணையாகவும் இருப்பேன்.",
      meaning: "Whatever difficulties come, I will never let go of your hand. I will laugh with you in your joy, and stand beside you in your sorrow.",
    },
    {
      id: 3,
      tamil: "இந்த உலகமே என்னை விட்டுப் போனாலும், உன் பக்கம் நின்று உன்னை நேசிக்கும் ஒருவனாக நான் இருப்பேன்.",
      meaning: "Even if the whole world turns away, I will always stand by your side loving you forever.",
    },
    {
      id: 4,
      tamil: "நீ என் காதல் மட்டுமல்ல... என் நிம்மதி, என் சந்தோஷம், என் எதிர்காலம், என் வாழ்க்கையின் அழகான கனவு.",
      meaning: "You are not just my love... you are my peace, my happiness, my future, and the most beautiful dream of my life.",
    },
    {
      id: 5,
      tamil: "எத்தனை ஜென்மம் எடுத்தாலும், ஒவ்வொரு முறையும் நான் தேர்ந்தெடுப்பது உன்னை மட்டும்தான்!",
      meaning: "No matter how many lifetimes I am given, every single time... I will choose only YOU!",
    },
  ];

  // Auto-rotate quote preview
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % posterQuotes.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [posterQuotes.length]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Upload custom poster if needed
  const handleCustomUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setPosterSrc(dataUrl);
        showToast('Poster updated ✨');
        diwaliAudio.playRomanticChime();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetDefault = () => {
    setPosterSrc(defaultPosterImg);
    showToast('Reset to original couple poster 💛');
    diwaliAudio.playRomanticChime();
  };

  // Direct High Quality Download to Android Phone
  const handleDownload = async () => {
    setIsDownloading(true);
    diwaliAudio.playRomanticChime();
    showToast('Saving poster to your phone... 📸');

    try {
      const response = await fetch(posterSrc);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `Kowsi_Mouli_Diwali_Special_Poster.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#F7E7B0', '#FF4081', '#FF6B6B'],
      });

      showToast('Poster saved to your gallery! 💛');
    } catch (err) {
      console.error('Download error:', err);
      // Fallback direct link download
      const link = document.createElement('a');
      link.href = posterSrc;
      link.download = `Kowsi_Mouli_Diwali_Special_Poster.jpg`;
      link.target = '_blank';
      link.click();
      showToast('Opened poster to save! 💛');
    } finally {
      setIsDownloading(false);
    }
  };

  // Share via Web Share API
  const handleShare = async () => {
    diwaliAudio.playRomanticChime();
    const shareData = {
      title: 'Kowsi 💛 Mouli – Forever & Always',
      text: 'Happy Diwali My Love! "Every Diwali, Every Tomorrow, Every Lifetime... I Choose YOU." Kowsi 💛 Mouli',
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
    showToast('Link copied to clipboard! 📋');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-start px-3 sm:px-4 py-8 relative z-10 w-full max-w-xl mx-auto"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 z-50 px-5 py-2.5 rounded-full bg-[#1B050B]/95 text-[#FFD700] border border-[#D4AF37] shadow-xl text-sm font-serif font-medium flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen Title */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A101C]/80 border border-[#D4AF37]/40 text-xs text-[#F7E7B0] tracking-widest uppercase mb-2">
          <span>✨</span>
          <span>Our Special Diwali Memory</span>
          <span>✨</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold gold-gradient-text">
          Our Special Couple Poster
        </h2>
        <p className="text-xs sm:text-sm text-[#F7E7B0]/80 font-serif mt-1">
          Kowsi 💛 Mouli • Forever & Always
        </p>
      </div>

      {/* THE ROYAL POSTER DISPLAY WITH ORNAMENTAL FRAME */}
      <div className="relative w-full rounded-3xl p-3 sm:p-5 glass-maroon border-2 border-[#D4AF37] box-glow-gold flex flex-col items-center overflow-hidden">
        
        {/* Corner Ornaments */}
        <div className="absolute top-2 left-2 text-[#D4AF37] text-lg pointer-events-none z-20">⚜️</div>
        <div className="absolute top-2 right-2 text-[#D4AF37] text-lg pointer-events-none z-20">⚜️</div>
        <div className="absolute bottom-2 left-2 text-[#D4AF37] text-lg pointer-events-none z-20">⚜️</div>
        <div className="absolute bottom-2 right-2 text-[#D4AF37] text-lg pointer-events-none z-20">⚜️</div>

        {/* Poster Top Badge */}
        <div className="flex items-center justify-center gap-2 mb-2 z-10">
          <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#FFD700]" />
          <span className="text-[11px] uppercase font-serif font-semibold tracking-[0.25em] text-[#FFD700]">
            🪔 SHUBH DEEPAVALI 2026 🪔
          </span>
          <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#FFD700]" />
        </div>

        {/* Interactive Image Frame - Fully uncropped portrait poster */}
        <div 
          onClick={() => {
            diwaliAudio.playRomanticChime();
            setIsFullScreen(true);
          }}
          className="relative w-full rounded-2xl overflow-hidden border-2 border-[#D4AF37]/80 shadow-2xl group cursor-pointer bg-black/40 flex items-center justify-center"
        >
          <img
            src={posterSrc}
            alt="Kowsi and Mouli Diwali Couple Poster"
            className="w-full h-auto block rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
            loading="eager"
          />

          {/* Hover / Tap overlay prompt */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none p-4 text-center">
            <div className="p-3 rounded-full bg-[#1B050B]/80 border border-[#D4AF37] text-[#FFD700] mb-2 shadow-lg">
              <ZoomIn className="w-6 h-6" />
            </div>
            <span className="text-sm font-serif font-bold text-[#FFF4DF] drop-shadow">
              Tap to View Full Screen & Zoom
            </span>
          </div>

          {/* Floating Pill on mobile indicating tap to expand */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#1B050B]/85 border border-[#D4AF37]/60 text-[11px] text-[#FFD700] font-serif flex items-center gap-1 shadow-md pointer-events-none">
            <Maximize2 className="w-3 h-3" />
            <span>Tap to Zoom</span>
          </div>
        </div>

        {/* Dynamic Tamil Quotes Carousel below Poster */}
        <div className="w-full mt-4 p-3.5 rounded-2xl bg-[#3A0D17]/85 border border-[#D4AF37]/40 shadow-inner text-center">
          <div className="flex justify-center items-center gap-1.5 mb-2">
            {posterQuotes.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setActiveQuoteIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === activeQuoteIndex ? 'w-6 bg-[#FFD700]' : 'w-2 bg-[#D4AF37]/40'
                }`}
                aria-label={`Show quote ${idx + 1}`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeQuoteIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="min-h-[75px] flex flex-col justify-center items-center px-1"
            >
              <p className="font-tamil text-sm sm:text-base font-semibold text-[#FFF4DF] leading-relaxed">
                "{posterQuotes[activeQuoteIndex].tamil}"
              </p>
              <p className="font-serif italic text-xs text-[#F7E7B0]/80 mt-1">
                "{posterQuotes[activeQuoteIndex].meaning}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Expandable all quotes drawer */}
        <details className="w-full mt-2.5 group text-left">
          <summary className="list-none flex items-center justify-between px-3 py-2 rounded-xl bg-[#270811]/90 border border-[#D4AF37]/30 text-xs text-[#FFD700] cursor-pointer hover:bg-[#3E0F1A] transition-colors">
            <span className="font-tamil font-medium">அனைத்து காதல் வரிகளையும் வாசிக்க... (View All Quotes)</span>
            <span className="text-xs transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="p-3 mt-1.5 rounded-xl bg-[#1B050B]/90 border border-[#D4AF37]/20 space-y-2.5 text-xs">
            {posterQuotes.map((q) => (
              <div key={q.id} className="border-b border-[#D4AF37]/20 pb-2 last:border-b-0 last:pb-0">
                <p className="font-tamil text-[#FFF4DF] font-medium leading-relaxed">
                  <span className="text-[#FFD700] font-bold mr-1">✦</span>
                  {q.tamil}
                </p>
                <p className="font-serif text-[#F7E7B0]/70 italic mt-0.5 text-[11px]">
                  {q.meaning}
                </p>
              </div>
            ))}
          </div>
        </details>

        {/* Final Quote Tagline */}
        <div className="mt-4 pt-3 border-t border-[#D4AF37]/30 text-center w-full">
          <p className="text-sm sm:text-base font-serif font-bold text-[#FFD700] tracking-wider uppercase text-glow-gold">
            "Every Diwali, Every Tomorrow, Every Lifetime... I Choose YOU."
          </p>
          <p className="text-xs font-script text-lg text-[#FFF4DF] mt-0.5">
            With Endless Love, Your Kowsi 💛
          </p>
        </div>
      </div>

      {/* ACTION BUTTONS: Full Screen, Save to Phone, Share */}
      <div className="w-full mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        <motion.button
          onClick={() => {
            diwaliAudio.playRomanticChime();
            setIsFullScreen(true);
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 px-2 rounded-2xl bg-[#4A101C] hover:bg-[#5E1424] text-[#FFF4DF] border border-[#D4AF37]/50 text-xs sm:text-sm font-serif font-semibold shadow-lg"
        >
          <Maximize2 className="w-4 h-4 text-[#FFD700]" />
          <span>Full Screen</span>
        </motion.button>

        <motion.button
          onClick={handleDownload}
          disabled={isDownloading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 px-2 rounded-2xl btn-gold-shimmer text-[#270811] text-xs sm:text-sm font-display font-bold shadow-lg"
        >
          <Download className="w-4 h-4" />
          <span>{isDownloading ? 'Saving...' : 'Save Poster'}</span>
        </motion.button>

        <motion.button
          onClick={handleShare}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 px-2 rounded-2xl bg-[#4A101C] hover:bg-[#5E1424] text-[#FFF4DF] border border-[#D4AF37]/50 text-xs sm:text-sm font-serif font-semibold shadow-lg"
        >
          <Share2 className="w-4 h-4 text-[#FFD700]" />
          <span>Share</span>
        </motion.button>
      </div>

      {/* Hidden File Input for uploading custom replacement if desired */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleCustomUpload}
      />

      {/* Optional subtle controls for change / reset */}
      <div className="flex items-center justify-center gap-3 mt-3 text-[11px] text-[#F7E7B0]/60">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="hover:text-[#FFD700] transition-colors underline underline-offset-2 flex items-center gap-1"
        >
          <Upload className="w-3 h-3" />
          <span>Change Poster</span>
        </button>
        {posterSrc !== defaultPosterImg && (
          <button
            onClick={handleResetDefault}
            className="hover:text-[#FFD700] transition-colors underline underline-offset-2 flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset to Original</span>
          </button>
        )}
      </div>

      {/* Proceed to Next Screen Button: Read My Heart's Letter */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 w-full flex justify-center pb-8"
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
          <span>Read My Heart's Letter</span>
          <ChevronRight className="w-5 h-5 text-[#270811]" />
        </motion.button>
      </motion.div>

      {/* FULL SCREEN MODAL */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4 overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsFullScreen(false)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50 border border-white/20"
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Poster Zoom Wrapper */}
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              transition={{ type: 'spring', damping: 22 }}
              className="relative max-w-lg w-full max-h-[90vh] flex flex-col items-center justify-center my-auto"
            >
              <img
                src={posterSrc}
                alt="Kowsi & Mouli Couple Poster Fullscreen"
                className="w-auto h-auto max-h-[82vh] max-w-full rounded-2xl border-2 border-[#D4AF37] object-contain shadow-2xl"
              />

              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={handleDownload}
                  className="px-5 py-2 rounded-full btn-gold-shimmer text-[#270811] text-xs font-bold font-display flex items-center gap-1.5 shadow-lg"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save to Phone Gallery</span>
                </button>
                <button
                  onClick={() => setIsFullScreen(false)}
                  className="px-5 py-2 rounded-full bg-white/20 text-white text-xs font-serif hover:bg-white/30 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
