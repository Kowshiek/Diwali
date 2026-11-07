import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { diwaliAudio } from '../utils/audioEngine';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(diwaliAudio.isPlaying);
  const [isMuted, setIsMuted] = useState(diwaliAudio.isMuted);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const unsubscribe = diwaliAudio.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setIsMuted(state.isMuted);
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    diwaliAudio.toggle();
    diwaliAudio.playRomanticChime();
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    const muted = diwaliAudio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="px-3 py-1 text-xs rounded-full bg-[#1B050B]/90 text-[#F7E7B0] border border-[#D4AF37]/50 shadow-lg hidden sm:block pointer-events-none"
          >
            {isPlaying ? (isMuted ? 'Muted' : 'Playing Romantic Raga') : 'Play Music'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Music Control Capsule */}
      <div
        className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#270811]/90 backdrop-blur-md border border-[#D4AF37]/60 shadow-lg shadow-black/50"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Play / Pause Button with Rotating Mandala / Vinyl Effect */}
        <motion.button
          onClick={handleTogglePlay}
          whileTap={{ scale: 0.92 }}
          className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isPlaying && !isMuted
              ? 'bg-gradient-to-tr from-[#AA820A] via-[#FFD700] to-[#FFF4DF] text-[#270811] shadow-md shadow-[#D4AF37]/50'
              : 'bg-[#3E0F1A] text-[#D4AF37] hover:bg-[#521323]'
          }`}
          title={isPlaying ? 'Pause Music' : 'Play Music'}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="flex items-center justify-center w-full h-full"
            >
              <Music className="w-4 h-4" />
            </motion.div>
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}

          {/* Equalizer Wavebars indicator when playing */}
          {isPlaying && !isMuted && (
            <div className="absolute -bottom-1 flex items-end gap-0.5 h-2">
              <motion.span
                animate={{ height: ['2px', '6px', '2px'] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="w-0.5 bg-[#FFD700] rounded-full"
              />
              <motion.span
                animate={{ height: ['4px', '8px', '3px'] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                className="w-0.5 bg-[#FFD700] rounded-full"
              />
              <motion.span
                animate={{ height: ['2px', '7px', '2px'] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: 0.2 }}
                className="w-0.5 bg-[#FFD700] rounded-full"
              />
            </div>
          )}
        </motion.button>

        {/* Mute / Unmute Button */}
        {isPlaying && (
          <motion.button
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            onClick={handleToggleMute}
            whileTap={{ scale: 0.92 }}
            className="p-1.5 text-[#F7E7B0] hover:text-[#FFD700] transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#FFD700]" />
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}
