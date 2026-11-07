import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { diwaliAudio } from '../utils/audioEngine';

export default function FireworksCanvas({ active = true, autoBurst = true, intensity = 'high' }) {
  const canvasRef = useRef(null);

  // Custom Canvas Fireworks Physics
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const colors = [
      '#FFD700', // Gold
      '#FFA500', // Orange
      '#FF4081', // Rose Pink
      '#00E5FF', // Cyan Sparkle
      '#76FF03', // Lime Sparkle
      '#FFF4DF', // Champagne
      '#FF1744', // Red
    ];

    function createFirework(x, y) {
      const particleCount = intensity === 'high' ? 65 : 40;
      const color = colors[Math.floor(Math.random() * colors.length)];
      diwaliAudio.playFireworkPop();

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 5 + 2.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
          decay: Math.random() * 0.018 + 0.012,
          radius: Math.random() * 2.2 + 1.2,
          gravity: 0.07,
        });
      }
    }

    // Auto fireworks timer
    let autoTimer = null;
    if (autoBurst) {
      const launch = () => {
        const x = window.innerWidth * (0.2 + Math.random() * 0.6);
        const y = window.innerHeight * (0.15 + Math.random() * 0.4);
        createFirework(x, y);

        // Also trigger canvas-confetti gold/rose heart sparkles occasionally
        if (Math.random() > 0.4) {
          confetti({
            particleCount: 18,
            spread: 60,
            origin: { x: x / window.innerWidth, y: y / window.innerHeight },
            colors: ['#FFD700', '#F7E7B0', '#FF4081', '#FF6B6B'],
            shapes: ['circle'],
            scalar: 0.8,
            ticks: 80,
          });
        }

        const nextDelay = intensity === 'high' ? Math.random() * 900 + 700 : Math.random() * 1500 + 1200;
        autoTimer = setTimeout(launch, nextDelay);
      };
      launch();
    }

    // Interactive Tap to launch firework anywhere!
    const handlePointerDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createFirework(x, y);
    };

    window.addEventListener('pointerdown', handlePointerDown);

    // Animation Loop
    const loop = () => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (autoTimer) clearTimeout(autoTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, autoBurst, intensity]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
