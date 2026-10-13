import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('01 ATELIER');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentScroll = window.scrollY;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
      setScrollProgress(progress);

      // Estimate active section based on scroll percentage
      if (progress < 12) setActiveSection('01 HERO');
      else if (progress < 22) setActiveSection('02 COLLECTIONS');
      else if (progress < 32) setActiveSection('03 VAULT RIBBON');
      else if (progress < 42) setActiveSection('04 METAMORPHOSIS');
      else if (progress < 52) setActiveSection('05 CHAPTER I REGISTRY');
      else if (progress < 62) setActiveSection('06 HAUTE SPECS');
      else if (progress < 72) setActiveSection('07 360° TURNTABLE');
      else if (progress < 82) setActiveSection('08 LIGHT SIMULATOR');
      else if (progress < 92) setActiveSection('09 BESPOKE STUDIO');
      else setActiveSection('10 PROVENANCE');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Hairline Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#8A6332] via-[#C99A54] to-[#FFF2D6] shadow-[0_0_8px_#C99A54] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Section Radar on Desktop Bottom-Right HUD */}
      <aside
        aria-label="Chapter progress indicator"
        className="fixed right-6 bottom-8 z-30 hidden xl:flex flex-col items-end space-y-1.5 pointer-events-none opacity-85 transition-opacity"
      >
        <div className="flex items-center space-x-2 px-2.5 py-1 bg-[#170C06]/90 border border-[#C99A54]/35 rounded-2xs backdrop-blur-sm text-[9px] font-mono tracking-widest text-[#E7C58A] shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C99A54] animate-pulse" />
          <span>{activeSection}</span>
          <span className="text-[#C99A54]/60">|</span>
          <span>{Math.round(scrollProgress)}%</span>
        </div>
      </aside>
    </>
  );
};
