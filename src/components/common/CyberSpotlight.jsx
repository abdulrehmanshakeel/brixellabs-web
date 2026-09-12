import React, { useEffect, useRef } from 'react';

export const CyberSpotlight = () => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    let rafId = null;
    let targetX = -1000;
    let targetY = -1000;
    let isInside = false;

    const updatePosition = () => {
      if (el) {
        if (isInside) {
          el.style.opacity = '1';
          el.style.background = `radial-gradient(650px circle at ${targetX}px ${targetY}px, rgba(0, 240, 255, 0.045), rgba(0, 229, 208, 0.015) 40%, transparent 80%)`;
        } else {
          el.style.opacity = '0';
        }
      }
      rafId = null;
    };

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isInside = true;
      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => {
      isInside = false;
      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-0 transition-opacity duration-300 will-change-[background,opacity]"
    />
  );
};
