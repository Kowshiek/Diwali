import React from 'react';

// Intricate Indian gold ornamental corner motif SVG
const CornerOrnament = ({ className = '', style = {} }) => (
  <svg
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-8 h-8 md:w-12 md:h-12 pointer-events-none ${className}`}
    style={style}
  >
    <path
      d="M2 2 L2 35 C2 25 10 15 20 12 C15 10 12 5 12 2 Z"
      fill="#D4AF37"
      opacity="0.8"
    />
    <path
      d="M2 2 L35 2 C25 2 15 10 12 20 C10 15 5 12 2 12 Z"
      fill="#D4AF37"
      opacity="0.8"
    />
    <path
      d="M8 8 C15 12 20 20 22 30 C24 20 30 14 38 10 C28 8 20 4 15 2"
      stroke="#FFD700"
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="8" cy="8" r="3" fill="#FFF4DF" stroke="#AA820A" strokeWidth="1" />
    <circle cx="22" cy="6" r="2" fill="#D4AF37" />
    <circle cx="6" cy="22" r="2" fill="#D4AF37" />
    <path d="M2 2 L58 2" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
    <path d="M2 2 L2 58" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
  </svg>
);

export default function OrnamentalBorder({ children, className = '', glow = true }) {
  return (
    <div
      className={`relative p-5 md:p-8 rounded-2xl glass-maroon border border-[#D4AF37]/50 ${
        glow ? 'box-glow-gold' : ''
      } ${className}`}
    >
      {/* Top Left Corner */}
      <div className="absolute top-1.5 left-1.5">
        <CornerOrnament />
      </div>

      {/* Top Right Corner */}
      <div className="absolute top-1.5 right-1.5 rotate-90">
        <CornerOrnament />
      </div>

      {/* Bottom Right Corner */}
      <div className="absolute bottom-1.5 right-1.5 rotate-180">
        <CornerOrnament />
      </div>

      {/* Bottom Left Corner */}
      <div className="absolute bottom-1.5 left-1.5 -rotate-90">
        <CornerOrnament />
      </div>

      {/* Decorative center top and bottom gold floral seals */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-[#390C16] border border-[#D4AF37] flex items-center gap-1.5 shadow-md">
        <span className="text-[#FFD700] text-xs">✨</span>
        <span className="text-[10px] tracking-widest uppercase font-semibold text-[#F7E7B0]">
          ✦ K 💛 M ✦
        </span>
        <span className="text-[#FFD700] text-xs">✨</span>
      </div>

      {children}
    </div>
  );
}
