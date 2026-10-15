import React, { useEffect, createContext, useContext, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollContextType {
  lenisRef: React.RefObject<Lenis | null>;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenisRef: { current: null },
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Only enable on clients
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.075, // Silky luxury inertia damping
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.07,
      touchInertiaExponent: 1.6,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.15,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync scroll event with window for Framer Motion useScroll
    const handleLenisScroll = () => {
      window.dispatchEvent(new Event('scroll'));
    };

    lenis.on('scroll', handleLenisScroll);

    return () => {
      lenis.off('scroll', handleLenisScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenisRef }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
