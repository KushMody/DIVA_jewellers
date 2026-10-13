import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const LuxuryCustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'drag' | 'inspect' | 'loupe'>('default');
  const [isVisible, setIsVisible] = useState(false);

  // Raw instantaneous mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth inertial spring physics for the outer ring (zero React re-renders)
  const springX = useSpring(mouseX, { stiffness: 350, damping: 28, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    // Only activate on devices with fine pointing input (mouse/trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    let isMouseOverWindow = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isMouseOverWindow) {
        isMouseOverWindow = true;
        setIsVisible(true);
      }

      // Detect cursor targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        const text = cursorTarget.getAttribute('data-cursor-text') || '';
        setCursorText(text);
        if (type === 'loupe') {
          setCursorVariant('loupe');
          setCursorText('');
        } else if (type === 'drag') {
          setCursorVariant('drag');
        } else if (type === 'inspect') {
          setCursorVariant('inspect');
        } else {
          setCursorVariant('hover');
        }
      } else if (target.closest('button, a, input, select, [role="button"], label')) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      isMouseOverWindow = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      isMouseOverWindow = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Precision Instant Center Diamond Dot */}
      {cursorVariant !== 'loupe' && (
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#E7C58A] shadow-[0_0_12px_#C99A54] pointer-events-none"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: cursorVariant === 'hover' ? 0.5 : 1,
            opacity: cursorVariant === 'drag' ? 0.2 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      )}

      {/* Fluid Inertial Trailing Ring with Luxury Damping */}
      {cursorVariant !== 'loupe' && (
        <motion.div
          className="fixed top-0 left-0 rounded-full border border-[#C99A54]/85 flex items-center justify-center pointer-events-none"
          style={{
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            width:
              cursorVariant === 'default'
                ? 38
                : cursorVariant === 'drag'
                ? 82
                : cursorVariant === 'inspect'
                ? 96
                : 54,
            height:
              cursorVariant === 'default'
                ? 38
                : cursorVariant === 'drag'
                ? 82
                : cursorVariant === 'inspect'
                ? 96
                : 54,
            backgroundColor:
              cursorVariant === 'default'
                ? 'rgba(201, 154, 84, 0.05)'
                : cursorVariant === 'drag'
                ? 'rgba(23, 12, 6, 0.88)'
                : cursorVariant === 'inspect'
                ? 'rgba(23, 12, 6, 0.92)'
                : 'rgba(201, 154, 84, 0.18)',
            borderColor:
              cursorVariant === 'default'
                ? 'rgba(201, 154, 84, 0.6)'
                : 'rgba(231, 197, 138, 1)',
            boxShadow:
              cursorVariant === 'default'
                ? '0 0 0px transparent'
                : '0 8px 30px rgba(201, 154, 84, 0.25)',
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-[9px] font-mono tracking-widest text-[#E7C58A] uppercase font-semibold text-center px-1 select-none pointer-events-none"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      )}
    </div>
  );
};
