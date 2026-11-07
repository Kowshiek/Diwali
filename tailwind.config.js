/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#4A101C',
          deep: '#270811',
          dark: '#1B050B',
          light: '#6B1729',
          glow: '#8E1E36',
        },
        gold: {
          antique: '#D4AF37',
          champagne: '#F7E7B0',
          warm: '#E6C665',
          bright: '#FFD700',
          deep: '#AA820A',
        },
        cream: {
          DEFAULT: '#FFF4DF',
          soft: '#FFF9EF',
          muted: '#EAD9BC',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cinzel', 'serif'],
        display: ['"Cinzel Decorative"', '"Cinzel"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        tamil: ['"Mukta Malar"', '"Noto Sans Tamil"', 'sans-serif'],
        body: ['"Cormorant Garamond"', 'sans-serif'],
      },
      animation: {
        'flame-flicker': 'flame 1.5s ease-in-out infinite alternate',
        'flame-glow': 'flameGlow 2s ease-in-out infinite alternate',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'sparkle': 'sparkle 1.8s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        flame: {
          '0%': { transform: 'scale(1) rotate(-1deg)', filter: 'drop-shadow(0 0 8px rgba(255, 180, 0, 0.8))' },
          '50%': { transform: 'scale(1.08, 0.95) rotate(1.5deg)', filter: 'drop-shadow(0 0 14px rgba(255, 140, 0, 0.95))' },
          '100%': { transform: 'scale(0.96, 1.05) rotate(-1deg)', filter: 'drop-shadow(0 0 10px rgba(255, 200, 50, 0.85))' },
        },
        flameGlow: {
          '0%': { opacity: '0.6', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(212, 175, 55, 0.3), 0 0 30px rgba(212, 175, 55, 0.15)' },
          '50%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.6), 0 0 50px rgba(212, 175, 55, 0.35)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
