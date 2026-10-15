import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LuxuryPreloaderProps {
  onComplete?: () => void;
  durationMs?: number;
}

export const LuxuryPreloader: React.FC<LuxuryPreloaderProps> = ({
  onComplete,
  durationMs = 2000,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleFinish = () => {
    setIsFinished(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 1000);
  };

  useEffect(() => {
    const startTime = performance.now();

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / durationMs) * 100));

      setProgress(rawProgress);

      if (rawProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(handleFinish, 300);
      }
    };

    const animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, [durationMs, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="luxury-preloader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            opacity: 0,
            transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] bg-[#100703] text-[#F8F2E9] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        >
          {/* Subtle Ambient Radial Gold Glow */}
          <div className="absolute w-[600px] h-[600px] bg-[#C99A54]/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Precision Diamond Sacred Geometry */}
          <div className="relative mb-8 flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-28 sm:h-28">
              {/* Outer Facet Envelope */}
              <motion.polygon
                points="50,8 88,34 50,92 12,34"
                fill="none"
                stroke="#E7C58A"
                strokeWidth="1.4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />

              {/* Table Facet Horizontal Line */}
              <motion.line
                x1="12"
                y1="34"
                x2="88"
                y2="34"
                stroke="#C99A54"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
              />

              {/* Center Culet Axis */}
              <motion.line
                x1="50"
                y1="8"
                x2="50"
                y2="92"
                stroke="#C99A54"
                strokeWidth="0.8"
                strokeDasharray="2 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.5 }}
              />

              {/* Star & Pavilion Facets */}
              <motion.polyline
                points="32,34 50,92 68,34"
                fill="none"
                stroke="#E7C58A"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.3, delay: 0.6, ease: 'easeInOut' }}
              />
              <motion.polyline
                points="32,34 50,8 68,34"
                fill="none"
                stroke="#C99A54"
                strokeWidth="0.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.7, ease: 'easeInOut' }}
              />
            </svg>

            {/* Glowing Focal Point */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 rounded-full bg-[#E7C58A] shadow-[0_0_15px_#C99A54] absolute top-1/2 -translate-y-1/2"
            />
          </div>

          {/* Maison Monogram & Title */}
          <div className="text-center space-y-2 mb-8">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[10px] tracking-[0.45em] text-[#C99A54] uppercase block font-mono"
            >
              FINE LUXURY ATELIER
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="font-serif text-3xl sm:text-4xl tracking-[0.22em] text-[#F8F2E9] font-normal"
            >
              DIVA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-[9px] tracking-[0.4em] text-[#E7C58A] uppercase font-light"
            >
              TIMELESS RING STORIES
            </motion.p>
          </div>

          {/* Hairline Gold Progress Bar */}
          <div className="w-56 sm:w-64 h-[1.5px] bg-white/10 rounded-full overflow-hidden relative mb-4">
            <motion.div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#C99A54] via-[#E7C58A] to-[#FFF5DF] shadow-[0_0_8px_#E7C58A]"
            />
          </div>

          {/* Metric Counter & Subtitle */}
          <div className="flex items-center space-x-3 text-xs font-mono text-[#E7C58A]">
            <span className="tabular-nums font-semibold tracking-wider">
              {String(progress).padStart(2, '0')}%
            </span>
            <span className="text-white/20">•</span>
            <span className="text-[10px] tracking-widest text-[#71665C] uppercase">
              CALIBRATING 18K ATELIER
            </span>
          </div>

          {/* Skip / Enter Action */}
          <button
            onClick={handleFinish}
            className="mt-6 px-4 py-1.5 border border-[#C99A54]/40 hover:border-[#E7C58A] bg-[#1a0b05]/80 hover:bg-[#C99A54]/20 text-[10px] font-mono tracking-widest text-[#E7C58A] uppercase rounded-full transition-all cursor-pointer shadow-lg"
          >
            ENTER ATELIER →
          </button>

          {/* Bottom Luxury Legal Line */}
          <div className="absolute bottom-5 sm:bottom-6 px-4 text-center text-[9px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#71665C] font-mono max-w-sm sm:max-w-none">
            SWISS & INDIAN HOROLOGY STANDARDS • BIS 750
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
