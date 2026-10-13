import React from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

interface ScrollParallaxTextProps {
  text: string;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export const ScrollParallaxText: React.FC<ScrollParallaxTextProps> = ({
  text,
  direction = 'left',
  className = '',
}) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Skew slightly based on scroll velocity for dynamic physical inertia
  const skew = useTransform(smoothVelocity, [-1500, 1500], direction === 'left' ? [-3, 3] : [3, -3]);

  // Duplicated text segments for continuous ticker ribbon
  const repeatedText = `${text} • ${text} • ${text} • ${text} • `;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden whitespace-nowrap opacity-[0.04] leading-none font-serif uppercase tracking-[0.2em] relative flex ${className}`}
    >
      <motion.div
        style={{ skew }}
        className="flex shrink-0 will-change-transform"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 35,
          ease: 'linear',
        }}
      >
        <span className="shrink-0">{repeatedText}</span>
        <span className="shrink-0">{repeatedText}</span>
      </motion.div>
    </div>
  );
};
