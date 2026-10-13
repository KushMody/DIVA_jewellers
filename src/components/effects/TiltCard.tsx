import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  glareOpacity = 0.2,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Normalized relative coordinate values (-0.5 to 0.5)
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  // Smooth springs for 3D rotation
  const smoothX = useSpring(normX, { stiffness: 280, damping: 24 });
  const smoothY = useSpring(normY, { stiffness: 280, damping: 24 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Glare position transform
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);
  const glareAlpha = useTransform(smoothX, (v) => (v !== 0 ? glareOpacity : 0));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    normX.set(x);
    normY.set(y);
  };

  const handleMouseLeave = () => {
    normX.set(0);
    normY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`relative will-change-transform ${className}`}
    >
      {children}

      {/* Dynamic Specular Holographic Glare Overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 rounded-xs overflow-hidden"
        style={{
          opacity: glareAlpha,
          background: `radial-gradient(circle 260px at ${glareX} ${glareY}, rgba(255, 245, 220, 0.45) 0%, rgba(201, 154, 84, 0.15) 35%, transparent 70%)`,
          mixBlendMode: 'screen',
        }}
      />
    </motion.div>
  );
};
