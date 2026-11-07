import React from 'react';
import { motion } from 'framer-motion';

export default function Diya({ size = 'md', className = '', glowing = true }) {
  const sizeMap = {
    sm: { width: 64, height: 48, flameW: 24, flameH: 42 },
    md: { width: 120, height: 90, flameW: 42, flameH: 70 },
    lg: { width: 200, height: 150, flameW: 64, flameH: 105 },
    xl: { width: 280, height: 210, flameW: 90, flameH: 150 },
  };

  const dims = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Outer Atmospheric Glow */}
      {glowing && (
        <motion.div
          animate={{
            scale: [1, 1.15, 0.98, 1.12, 1],
            opacity: [0.65, 0.9, 0.7, 0.95, 0.65],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-12 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255, 170, 0, 0.45) 0%, rgba(212, 175, 55, 0.2) 40%, rgba(74, 16, 28, 0) 70%)',
            filter: 'blur(16px)',
          }}
        />
      )}

      {/* Floating Sparkles & Embers from Flame */}
      {glowing && (
        <div className="absolute -top-10 w-24 h-24 pointer-events-none overflow-visible">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#FFE57F]"
              style={{
                left: `${35 + i * 10}%`,
                bottom: '10px',
                filter: 'drop-shadow(0 0 4px #FFD700)',
              }}
              animate={{
                y: [-10, -50 - i * 15],
                x: [0, (i % 2 === 0 ? 1 : -1) * (10 + i * 6)],
                opacity: [0.9, 0],
                scale: [1.2, 0.2],
              }}
              transition={{
                duration: 1.8 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Dancing Diya Flame */}
      <div className="relative -mb-3 z-10 flex justify-center items-end" style={{ width: dims.flameW, height: dims.flameH }}>
        {/* Layer 1: Outer Orange-Red Aura */}
        <motion.div
          animate={{
            scale: [1, 1.08, 0.96, 1.05, 1],
            skewX: [0, -3, 2, -1, 0],
            opacity: [0.85, 0.95, 0.8, 1, 0.85],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 w-full h-full rounded-t-full origin-bottom"
          style={{
            background: 'radial-gradient(ellipse at 50% 85%, #FF4500 0%, #FF8C00 50%, rgba(255, 215, 0, 0) 80%)',
            filter: 'drop-shadow(0 0 16px rgba(255, 100, 0, 0.9))',
          }}
        />

        {/* Layer 2: Radiant Golden Center Flame */}
        <motion.div
          animate={{
            scaleY: [1, 1.12, 0.94, 1.08, 1],
            scaleX: [1, 0.94, 1.06, 0.97, 1],
            skewX: [0, 2, -3, 1, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1 w-3/4 h-5/6 rounded-t-full origin-bottom"
          style={{
            background: 'linear-gradient(180deg, #FFF9C4 0%, #FFD54F 35%, #FFA000 85%, #E65100 100%)',
            boxShadow: '0 0 12px #FFD700',
          }}
        />

        {/* Layer 3: White-Hot Inner Core */}
        <motion.div
          animate={{
            scale: [0.95, 1.1, 0.98, 1.05, 0.95],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1 w-2/5 h-3/5 rounded-t-full bg-white/95 origin-bottom blur-[1px]"
        />

        {/* Tiny Wick at bottom */}
        <div className="absolute -bottom-1 w-1 h-3 bg-[#3E2723] rounded-t-sm z-20" />
      </div>

      {/* Traditional Indian Brass & Terracotta Diya Lamp Body */}
      <svg
        width={dims.width}
        height={dims.height}
        viewBox="0 0 200 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 filter drop-shadow(0 8px 16px rgba(0,0,0,0.6))"
      >
        <defs>
          {/* Gold Brass Metallic Gradient */}
          <linearGradient id="brassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="25%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFF4DF" />
            <stop offset="75%" stopColor="#AA820A" />
            <stop offset="100%" stopColor="#5D4037" />
          </linearGradient>

          {/* Terracotta/Maroon inner rim */}
          <linearGradient id="terracottaInner" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3E141E" />
            <stop offset="60%" stopColor="#6A1B29" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>

          {/* Golden Highlight Rim */}
          <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#AA820A" />
            <stop offset="30%" stopColor="#FFF9C4" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#FFF9C4" />
            <stop offset="100%" stopColor="#AA820A" />
          </linearGradient>
        </defs>

        {/* Base Pedestal */}
        <ellipse cx="100" cy="125" rx="55" ry="12" fill="url(#brassGradient)" stroke="#FFE082" strokeWidth="1.5" />
        <path d="M75 115 L65 125 H135 L125 115 Z" fill="#8D6E63" opacity="0.6" />

        {/* Diya Bowl Outer Body */}
        <path
          d="M20 55 C20 95 60 118 100 118 C140 118 180 95 180 55 C160 62 135 68 100 68 C65 68 40 62 20 55 Z"
          fill="url(#brassGradient)"
          stroke="#FFE082"
          strokeWidth="2"
        />

        {/* Ornate Traditional Engravings / Petal Pattern on Body */}
        <path
          d="M45 75 Q60 100 100 105 Q140 100 155 75"
          fill="none"
          stroke="#4A101C"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <circle cx="100" cy="95" r="4" fill="#FFF4DF" stroke="#AA820A" strokeWidth="1" />
        <circle cx="75" cy="88" r="3" fill="#FFF4DF" stroke="#AA820A" strokeWidth="1" />
        <circle cx="125" cy="88" r="3" fill="#FFF4DF" stroke="#AA820A" strokeWidth="1" />
        <circle cx="55" cy="78" r="2.5" fill="#FFF4DF" stroke="#AA820A" strokeWidth="1" />
        <circle cx="145" cy="78" r="2.5" fill="#FFF4DF" stroke="#AA820A" strokeWidth="1" />

        {/* Inner Oil Basin */}
        <ellipse cx="100" cy="55" rx="80" ry="20" fill="url(#terracottaInner)" stroke="url(#goldRim)" strokeWidth="3" />

        {/* Oil Pool Reflection */}
        <ellipse cx="100" cy="56" rx="65" ry="12" fill="#2C0B12" />
        <ellipse cx="100" cy="56" rx="45" ry="7" fill="#FFB300" opacity="0.4" />
        <ellipse cx="100" cy="55" rx="20" ry="4" fill="#FFF" opacity="0.6" filter="blur(2px)" />

        {/* Diya Spout / Pointed Tip */}
        <path d="M100 35 L106 50 H94 Z" fill="#FFE082" />
      </svg>
    </div>
  );
}
