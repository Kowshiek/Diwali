import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundEffects({ showPetals = true }) {
  const canvasRef = useRef(null);

  // Floating Golden Particles Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = window.innerWidth < 768 ? 40 : 70;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.2 + 0.6,
        color: Math.random() > 0.4 ? '#FFD700' : '#FFF4DF',
        alpha: Math.random() * 0.8 + 0.2,
        speedY: -(Math.random() * 0.6 + 0.2),
        speedX: (Math.random() - 0.5) * 0.4,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseVal: Math.random() * Math.PI,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulseVal += p.pulseSpeed;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        const currentAlpha = Math.max(0.1, (Math.sin(p.pulseVal) * 0.5 + 0.5) * p.alpha);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Falling romantic rose petals
  const petals = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    left: `${(i * 7.5) % 95}%`,
    duration: 7 + (i % 5) * 2,
    delay: (i * 0.7) % 6,
    size: 14 + (i % 4) * 5,
    rotate: (i * 45) % 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Golden Floating Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Falling Romantic Rose Petals */}
      {showPetals &&
        petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{
              y: '-10%',
              x: 0,
              rotate: petal.rotate,
              opacity: 0,
            }}
            animate={{
              y: ['-5%', '105vh'],
              x: [0, 25, -20, 15, 0],
              rotate: [petal.rotate, petal.rotate + 360],
              opacity: [0, 0.85, 0.85, 0.4, 0],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: 'linear',
            }}
            className="absolute top-0"
            style={{
              left: petal.left,
              width: petal.size,
              height: petal.size * 1.3,
            }}
          >
            {/* SVG Rose Petal */}
            <svg
              viewBox="0 0 30 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full filter drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
            >
              <defs>
                <linearGradient id={`petalGrad-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D81B60" />
                  <stop offset="50%" stopColor="#C2185B" />
                  <stop offset="100%" stopColor="#880E4F" />
                </linearGradient>
              </defs>
              <path
                d="M15 0 C25 8 30 22 24 34 C18 42 12 40 6 34 C0 22 5 8 15 0 Z"
                fill={`url(#petalGrad-${petal.id})`}
                opacity="0.88"
              />
              <path
                d="M15 4 C18 14 17 26 15 35"
                stroke="#FF80AB"
                strokeWidth="0.8"
                opacity="0.5"
                fill="none"
              />
            </svg>
          </motion.div>
        ))}

      {/* Subtle corner golden glowing radial vignettes */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-[90px] pointer-events-none" />
    </div>
  );
}
