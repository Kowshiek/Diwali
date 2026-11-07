import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Download, Share2, Maximize2, X, RefreshCw, Heart, 
  Camera, Sparkles, Check, ChevronRight, Eye 
} from 'lucide-react';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import { diwaliAudio } from '../utils/audioEngine';

// Default romantic aesthetic couple illustration SVG placeholders
const DEFAULT_KOWSI_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Cdefs%3E%3ClinearGradient id='bgK' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%234A101C'/%3E%3Cstop offset='100%25' stop-color='%231B050B'/%3E%3C/linearGradient%3E%3ClinearGradient id='gld' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23FFD700'/%3E%3Cstop offset='100%25' stop-color='%23AA820A'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='400' fill='url(%23bgK)'/%3E%3Ccircle cx='150' cy='140' r='55' fill='url(%23gld)' opacity='0.85'/%3E%3Cpath d='M70 330 C70 230 110 210 150 210 C190 210 230 230 230 330 Z' fill='url(%23gld)' opacity='0.75'/%3E%3Ccircle cx='150' cy='140' r='60' fill='none' stroke='%23FFF4DF' stroke-width='2' stroke-dasharray='5 5'/%3E%3Ctext x='150' y='365' font-family='serif' font-size='22' font-weight='bold' fill='%23FFF4DF' text-anchor='middle'%3EKowsi 💛%3C/text%3E%3C/svg%3E";

const DEFAULT_MOULII_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Cdefs%3E%3ClinearGradient id='bgM' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%236B1729'/%3E%3Cstop offset='100%25' stop-color='%23270811'/%3E%3C/linearGradient%3E%3ClinearGradient id='gld2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23F7E7B0'/%3E%3Cstop offset='100%25' stop-color='%23D4AF37'/%3E%3Cstop offset='100%25' stop-color='%23AA820A'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='400' fill='url(%23bgM)'/%3E%3Ccircle cx='150' cy='140' r='55' fill='url(%23gld2)' opacity='0.85'/%3E%3Cpath d='M75 330 C75 235 110 215 150 215 C190 215 225 235 225 330 Z' fill='url(%23gld2)' opacity='0.75'/%3E%3Ccircle cx='150' cy='140' r='60' fill='none' stroke='%23FFF4DF' stroke-width='2' stroke-dasharray='5 5'/%3E%3Ctext x='150' y='365' font-family='serif' font-size='22' font-weight='bold' fill='%23FFF4DF' text-anchor='middle'%3EMoulii ❤️%3C/text%3E%3C/svg%3E";

export default function CouplePoster({ onNext }) {
  // LocalStorage-backed state for photos
  const [kowsiPhoto, setKowsiPhoto] = useState(() => {
    return localStorage.getItem('km_kowsi_photo') || null;
  });
  const [mouliiPhoto, setMouliiPhoto] = useState(() => {
    return localStorage.getItem('km_moulii_photo') || null;
  });
  const [fullPosterPhoto, setFullPosterPhoto] = useState(() => {
    return localStorage.getItem('km_full_poster_photo') || null;
  });

  // UI state
  const [posterMode, setPosterMode] = useState(() => {
    return localStorage.getItem('km_poster_mode') || 'dual'; // 'dual' or 'single'
  });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  const posterRef = useRef(null);
  const kowsiInputRef = useRef(null);
  const mouliiInputRef = useRef(null);
  const posterInputRef = useRef(null);

  // Emotional quotes from prompt
  const tamilQuotes = [
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
      tamil: "நீ என் காதல் மட்டுமல்ல... என் நிம்மதி, என் சந்தோஷம், என் எதிர்காலம்.",
      meaning: "You are not just my love... you are my peace, my happiness, and my entire future.",
    },
    {
      id: 4,
      tamil: "எத்தனை ஜென்மம் எடுத்தாலும், ஒவ்வொரு முறையும் நான் தேர்ந்தெடுப்பது உன்னை மட்டும்தான்!",
      meaning: "No matter how many lifetimes I am given, every single time... I will choose only YOU!",
    },
  ];

  // Auto-rotate quote every 7 seconds for a cinematic feel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % tamilQuotes.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Handle Kowsi photo upload
  const handleKowsiUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setKowsiPhoto(dataUrl);
        try {
          localStorage.setItem('km_kowsi_photo', dataUrl);
        } catch (err) {
          console.warn('Storage quota exceeded, photo kept in memory');
        }
        showToast('Kowsi photo updated ✨');
        diwaliAudio.playRomanticChime();
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Moulii photo upload
  const handleMouliiUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setMouliiPhoto(dataUrl);
        try {
          localStorage.setItem('km_moulii_photo', dataUrl);
        } catch (err) {
          console.warn('Storage quota exceeded, photo kept in memory');
        }
        showToast('Moulii photo updated ❤️');
        diwaliAudio.playRomanticChime();
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Full Couple Poster upload
  const handleFullPosterUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setFullPosterPhoto(dataUrl);
        setPosterMode('single');
        try {
          localStorage.setItem('km_full_poster_photo', dataUrl);
          localStorage.setItem('km_poster_mode', 'single');
        } catch (err) {
          console.warn('Storage quota exceeded, photo kept in memory');
        }
        showToast('Couple poster uploaded ✨');
        diwaliAudio.playRomanticChime();
      };
      reader.readAsDataURL(file);
    }
  };

  // Save/Download poster as high-definition image to Android phone
  const handleSavePoster = async () => {
    if (!posterRef.current) return;
    setIsDownloading(true);
    diwaliAudio.playRomanticChime();

    try {
      showToast('Creating high-resolution poster... 📸');
      const canvas = await html2canvas(posterRef.current, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#270811',
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Kowsi_Moulii_Diwali_Poster_2026.png`;
      link.click();

      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#F7E7B0', '#FF4081'],
      });

      showToast('Poster saved to your gallery! 💛');
    } catch (err) {
      console.error('Error generating image:', err);
      showToast('Could not save automatically. Try taking a screenshot!');
    } finally {
      setIsDownloading(false);
    }
  };

  // Share website or poster via Web Share API
  const handleShare = async () => {
    diwaliAudio.playRomanticChime();
    const shareData = {
      title: 'Kowsi 💛 Moulii – Forever & Always',
      text: 'A magical Diwali surprise for my love Moulii! ✨🪔 "Every Diwali, Every Tomorrow, Every Lifetime... I Choose YOU."',
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
      className="min-h-screen flex flex-col items-center justify-start px-3 sm:px-4 py-8 relative z-10 w-full max-w-2xl mx-auto"
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

      {/* Screen Title & Subtitle */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A101C]/80 border border-[#D4AF37]/40 text-xs text-[#F7E7B0] tracking-widest uppercase mb-2">
          <span>✨</span>
          <span>Our Love Story In Lights</span>
          <span>✨</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold gold-gradient-text">
          Our Special Couple Poster
        </h2>
        <p className="text-xs sm:text-sm text-[#F7E7B0]/80 font-serif mt-1">
          A timeless Diwali tribute to the light of my life
        </p>
      </div>

      {/* Upload Controls Bar (Floating Pill) */}
      <div className="w-full mb-4 flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl glass-maroon border border-[#D4AF37]/40 shadow-lg text-xs">
        <button
          onClick={() => kowsiInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#5A1523] hover:bg-[#721B2D] text-[#FFF4DF] transition-all border border-[#D4AF37]/30"
          title="Upload or change Kowsi's photo"
        >
          <Camera className="w-3.5 h-3.5 text-[#FFD700]" />
          <span>{kowsiPhoto ? 'Change Kowsi' : 'Add Kowsi'}</span>
        </button>

        <button
          onClick={() => mouliiInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#5A1523] hover:bg-[#721B2D] text-[#FFF4DF] transition-all border border-[#D4AF37]/30"
          title="Upload or change Moulii's photo"
        >
          <Camera className="w-3.5 h-3.5 text-[#FF4081]" />
          <span>{mouliiPhoto ? 'Change Moulii' : 'Add Moulii'}</span>
        </button>

        <button
          onClick={() => posterInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2A0A10] hover:bg-[#3D0F19] text-[#F7E7B0] transition-all border border-[#D4AF37]/40"
          title="Upload ready-made couple poster"
        >
          <Upload className="w-3.5 h-3.5 text-[#FFD700]" />
          <span>Upload Poster</span>
        </button>

        {fullPosterPhoto && (
          <button
            onClick={() => {
              const newMode = posterMode === 'single' ? 'dual' : 'single';
              setPosterMode(newMode);
              localStorage.setItem('km_poster_mode', newMode);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#AA820A]/30 text-[#FFD700] border border-[#FFD700]/40"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{posterMode === 'single' ? 'Show Dual' : 'Show Poster'}</span>
          </button>
        )}

        {/* Hidden File Inputs */}
        <input
          ref={kowsiInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleKowsiUpload}
        />
        <input
          ref={mouliiInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleMouliiUpload}
        />
        <input
          ref={posterInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFullPosterUpload}
        />
      </div>

      {/* THE ROYAL POSTER CANVAS (Exportable to Phone Gallery) */}
      <div
        ref={posterRef}
        className="relative w-full rounded-3xl p-4 sm:p-7 glass-maroon border-2 border-[#D4AF37] box-glow-gold flex flex-col items-center overflow-hidden text-center bg-[#270811]"
      >
        {/* Background Traditional Indian Rangoli Pattern */}
        <div className="absolute inset-0 bg-rangoli-pattern opacity-40 pointer-events-none" />

        {/* Four Corner Brass Floral Mandalas */}
        <div className="absolute top-2 left-2 text-[#D4AF37]/80 text-xl pointer-events-none">⚜️</div>
        <div className="absolute top-2 right-2 text-[#D4AF37]/80 text-xl pointer-events-none">⚜️</div>
        <div className="absolute bottom-2 left-2 text-[#D4AF37]/80 text-xl pointer-events-none">⚜️</div>
        <div className="absolute bottom-2 right-2 text-[#D4AF37]/80 text-xl pointer-events-none">⚜️</div>

        {/* Poster Top Ribbon */}
        <div className="relative z-10 flex items-center justify-center gap-2 mb-2">
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#FFD700]" />
          <span className="text-[11px] sm:text-xs uppercase font-serif font-semibold tracking-[0.3em] text-[#FFD700]">
            🪔 SHUBH DEEPAVALI 🪔
          </span>
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#FFD700]" />
        </div>

        {/* Poster Heading: "HAPPY DIWALI, MY LOVE!" */}
        <h1 className="relative z-10 text-2xl sm:text-4xl font-display font-extrabold gold-gradient-text tracking-wider mt-1 mb-1">
          HAPPY DIWALI, MY LOVE!
        </h1>

        {/* Names: "Kowsi 💛 Moulii" */}
        <div className="relative z-10 flex items-center justify-center gap-2 text-2xl sm:text-3xl font-script text-[#FFF4DF] my-1 filter drop-shadow(0 2px 6px rgba(255,215,0,0.5))">
          <span>Kowsi</span>
          <Heart className="w-5 h-5 text-[#FFD700] fill-[#FFD700] animate-pulse" />
          <span>Moulii</span>
        </div>

        {/* Subtitle Tagline */}
        <p className="relative z-10 text-xs sm:text-sm uppercase tracking-widest text-[#F7E7B0]/90 font-serif mb-4">
          Two Hearts. One Promise. Forever Together.
        </p>

        {/* THE PHOTOGRAPH DISPLAY FRAME */}
        <div className="relative z-10 w-full my-2">
          {posterMode === 'single' && fullPosterPhoto ? (
            /* Uploaded Full Poster View */
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl max-h-[460px] mx-auto bg-black/40">
              <img
                src={fullPosterPhoto}
                alt="Kowsi & Moulii Couple Poster"
                className="w-full h-auto object-contain max-h-[440px] mx-auto"
              />
            </div>
          ) : (
            /* Dual Side-by-Side Photo Frame (Kowsi + Moulii) */
            <div className="grid grid-cols-2 gap-3 sm:gap-4 p-2 sm:p-3 rounded-2xl bg-[#1B050B]/70 border border-[#D4AF37]/50 shadow-inner">
              
              {/* Kowsi Photo Frame */}
              <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/60 group aspect-[3/4] bg-[#2E0B14] flex flex-col items-center justify-center">
                <img
                  src={kowsiPhoto || DEFAULT_KOWSI_IMG}
                  alt="Kowsi"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2 text-center pointer-events-none">
                  <span className="text-xs sm:text-sm font-serif font-bold text-[#FFF4DF] tracking-wide">
                    Kowsi
                  </span>
                  <span className="text-[10px] text-[#FFD700] font-sans">
                    {kowsiPhoto ? 'Your Kowsi 💛' : 'Click Add Kowsi'}
                  </span>
                </div>
              </div>

              {/* Moulii Photo Frame */}
              <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/60 group aspect-[3/4] bg-[#2E0B14] flex flex-col items-center justify-center">
                <img
                  src={mouliiPhoto || DEFAULT_MOULII_IMG}
                  alt="Moulii"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2 text-center pointer-events-none">
                  <span className="text-xs sm:text-sm font-serif font-bold text-[#FFF4DF] tracking-wide">
                    Moulii
                  </span>
                  <span className="text-[10px] text-[#FF80AB] font-sans">
                    {mouliiPhoto ? 'My Beautiful Queen ❤️' : 'Click Add Moulii'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* EMOTIONAL TAMIL QUOTES CAROUSEL */}
        <div className="relative z-10 w-full mt-4 p-4 rounded-2xl bg-[#3A0D17]/85 border border-[#D4AF37]/40 shadow-md">
          {/* Quote index indicators */}
          <div className="flex justify-center items-center gap-1.5 mb-2">
            {tamilQuotes.map((q, idx) => (
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="min-h-[85px] flex flex-col justify-center items-center"
            >
              <p className="font-tamil text-sm sm:text-base font-semibold text-[#FFF4DF] leading-relaxed text-center px-1">
                "{tamilQuotes[activeQuoteIndex].tamil}"
              </p>
              <p className="font-serif italic text-xs text-[#F7E7B0]/80 mt-1.5 text-center">
                "{tamilQuotes[activeQuoteIndex].meaning}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ALL 4 TAMIL QUOTES TOGGLE / ACCORDION FOR COMPLETE READING */}
        <details className="relative z-10 w-full mt-2 group text-left">
          <summary className="list-none flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#270811]/90 border border-[#D4AF37]/30 text-xs text-[#FFD700] cursor-pointer hover:bg-[#3E0F1A]">
            <span className="font-tamil font-medium">அனைத்து காதல் வரிகளையும் வாசிக்க... (View All Quotes)</span>
            <span className="text-xs transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="p-3 mt-1.5 rounded-xl bg-[#1B050B]/90 border border-[#D4AF37]/20 space-y-3 text-xs">
            {tamilQuotes.map((q, i) => (
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

        {/* FINAL PROMISE QUOTE */}
        <div className="relative z-10 mt-5 pt-3 border-t border-[#D4AF37]/30 w-full">
          <p className="text-sm sm:text-base font-serif font-bold text-[#FFD700] tracking-wider uppercase filter drop-shadow(0 0 10px rgba(255,215,0,0.5))">
            "Every Diwali, Every Tomorrow, Every Lifetime... I Choose YOU."
          </p>
          <p className="text-[11px] font-script text-[#FFF4DF] mt-1 text-lg">
            Forever & Always, Your Kowsi 💛
          </p>
        </div>
      </div>

      {/* POSTER ACTION BUTTONS: Full Screen, Save to Phone, Share */}
      <div className="w-full mt-5 grid grid-cols-3 gap-2 sm:gap-3">
        <motion.button
          onClick={() => setIsFullScreen(true)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 px-2 rounded-2xl bg-[#4A101C] hover:bg-[#5E1424] text-[#FFF4DF] border border-[#D4AF37]/50 text-xs sm:text-sm font-serif font-semibold shadow-lg"
        >
          <Maximize2 className="w-4 h-4 text-[#FFD700]" />
          <span>Full Screen</span>
        </motion.button>

        <motion.button
          onClick={handleSavePoster}
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

      {/* Next Step Button: Read My Heart's Letter */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 w-full flex justify-center pb-8"
      >
        <motion.button
          onClick={() => {
            diwaliAudio.playRomanticChime();
            onNext();
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#AA820A] via-[#FFD700] to-[#AA820A] text-[#270811] font-display font-bold text-sm sm:text-base tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/30 border border-[#FFF4DF]"
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
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 overflow-y-auto"
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
              transition={{ type: 'spring', damping: 20 }}
              className="w-full max-w-lg my-auto"
            >
              {/* Render the full poster frame inside modal */}
              <div className="rounded-3xl p-5 sm:p-7 glass-maroon border-2 border-[#D4AF37] box-glow-gold flex flex-col items-center text-center">
                <h2 className="text-xl sm:text-3xl font-display font-extrabold gold-gradient-text">
                  HAPPY DIWALI, MY LOVE!
                </h2>
                <div className="text-2xl font-script text-[#FFF4DF] my-1">
                  Kowsi 💛 Moulii
                </div>

                <div className="my-3 w-full">
                  {posterMode === 'single' && fullPosterPhoto ? (
                    <img
                      src={fullPosterPhoto}
                      alt="Couple Poster"
                      className="w-full rounded-2xl max-h-[60vh] object-contain mx-auto"
                    />
                  ) : (
                    <div className="grid grid-cols-2 gap-3 aspect-[3/2] w-full">
                      <img
                        src={kowsiPhoto || DEFAULT_KOWSI_IMG}
                        alt="Kowsi"
                        className="w-full h-full object-cover rounded-xl border border-[#D4AF37]"
                      />
                      <img
                        src={mouliiPhoto || DEFAULT_MOULII_IMG}
                        alt="Moulii"
                        className="w-full h-full object-cover rounded-xl border border-[#D4AF37]"
                      />
                    </div>
                  )}
                </div>

                <p className="font-tamil text-sm text-[#FFF4DF] font-medium mt-2">
                  "{tamilQuotes[activeQuoteIndex].tamil}"
                </p>

                <p className="text-sm font-serif font-bold text-[#FFD700] uppercase mt-3">
                  "Every Diwali, Every Tomorrow, Every Lifetime... I Choose YOU."
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleSavePoster}
                    className="px-5 py-2 rounded-full btn-gold-shimmer text-[#270811] text-xs font-bold font-display flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Save to Phone</span>
                  </button>
                  <button
                    onClick={() => setIsFullScreen(false)}
                    className="px-5 py-2 rounded-full bg-white/20 text-white text-xs font-serif"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
