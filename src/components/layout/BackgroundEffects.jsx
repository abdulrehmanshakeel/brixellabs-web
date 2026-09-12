import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const BackgroundEffects = () => {
  const canvasRef = useRef(null);

  // High-performance hardware-accelerated canvas particle constellation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Optimize particle count for high frame rate (max 32 particles)
    const isMobile = width < 768;
    const particleCount = isMobile ? 16 : Math.min(Math.floor((width * height) / 45000), 32);
    
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.5 + 1,
      color: Math.random() > 0.4 ? 'rgba(0, 240, 255,' : 'rgba(0, 229, 208,',
      alpha: Math.random() * 0.4 + 0.25,
    }));

    const maxDistSq = 130 * 130;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections (using distance squared to avoid Math.sqrt)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const alpha = 0.12 * (1 - distSq / maxDistSq);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Update & Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 [transform:translateZ(0)]">
      {/* Dark gradient base with subtle cyber grid */}
      <div className="absolute inset-0 circuit-bg opacity-70" />

      {/* Interactive Particle Constellation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 pointer-events-none will-change-transform" />

      {/* Radial neon cyan orb top-center */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.28, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-36 left-1/2 -translate-x-1/2 w-[650px] h-[480px] bg-gradient-to-b from-cyan-400/25 via-teal-500/10 to-transparent blur-[120px] rounded-full will-change-transform"
      />

      {/* Ambient teal glow right side */}
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.12, 0.2, 0.12],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/3 -right-48 w-[550px] h-[550px] bg-gradient-to-l from-teal-500/20 via-cyan-600/10 to-transparent blur-[130px] rounded-full will-change-transform"
      />

      {/* Ambient cyan glow bottom left */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.18, 0.1],
          x: [0, 25, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-20 -left-48 w-[550px] h-[550px] bg-gradient-to-r from-cyan-600/15 via-blue-600/10 to-transparent blur-[130px] rounded-full will-change-transform"
      />

      {/* Traveling Circuit Trace SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 80 0 L 80 220 L 220 360 L 220 850"
          stroke="#00f0ff"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="8 8"
          className="animated-circuit-line"
        />
        <path
          d="M 1250 80 L 1150 180 L 1150 580 L 980 750"
          stroke="#00e5d0"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="6 6"
          className="animated-circuit-line"
        />
        
        {/* Pulsing Junction Nodes */}
        <circle cx="220" cy="360" r="3" fill="#00f0ff" />
        <circle cx="1150" cy="180" r="3" fill="#00e5d0" />
        <circle cx="80" cy="220" r="2.5" fill="#00f0ff" />
        <circle cx="980" cy="750" r="2.5" fill="#00e5d0" />
      </svg>
    </div>
  );
};
