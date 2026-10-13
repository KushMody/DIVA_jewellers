import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { playAtelierChime } from '../../utils/audio';

export const AtelierSoundscape: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const isEnabledRef = useRef(isEnabled);

  useEffect(() => {
    isEnabledRef.current = isEnabled;
  }, [isEnabled]);

  useEffect(() => {
    // Listen for hover on interactive elements if enabled
    const handleMouseOver = (e: MouseEvent) => {
      if (!isEnabledRef.current) return;
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-cursor="inspect"]') ||
        target.closest('[data-cursor="hover"]')
      ) {
        const frequencies = [587.33, 659.25, 783.99, 880.0, 1046.5];
        const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)];
        playAtelierChime(randomFreq, 0.35);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  const toggleSound = () => {
    if (!isEnabled) {
      setIsEnabled(true);
      playAtelierChime(880, 0.5);
    } else {
      setIsEnabled(false);
    }
  };

  return (
    <aside
      aria-label="Atelier Soundscape Controller"
      className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40"
    >
      <button
        onClick={toggleSound}
        className={`group flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all duration-300 backdrop-blur-md shadow-lg cursor-pointer ${
          isEnabled
            ? 'bg-[#170C06]/90 border-[#E7C58A] text-[#E7C58A] shadow-[#C99A54]/20'
            : 'bg-[#170C06]/75 border-[#C99A54]/30 text-[#F8F2E9]/60 hover:text-[#E7C58A] hover:border-[#C99A54]'
        }`}
        title={isEnabled ? 'Mute Atelier Acoustics' : 'Enable Atelier Acoustic Experience'}
      >
        {isEnabled ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-[#E7C58A] animate-pulse" />
            <div className="flex items-center space-x-0.5 h-2.5">
              <span className="w-0.5 h-2 bg-[#E7C58A] animate-[pulse_1s_infinite_ease-in-out]" />
              <span className="w-0.5 h-3 bg-[#E7C58A] animate-[pulse_1.2s_infinite_ease-in-out_0.2s]" />
              <span className="w-0.5 h-1.5 bg-[#E7C58A] animate-[pulse_0.8s_infinite_ease-in-out_0.4s]" />
            </div>
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono font-medium hidden sm:inline">
              ATELIER ACOUSTICS
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono font-light hidden sm:inline">
              AUDIO: OFF
            </span>
          </>
        )}
      </button>
    </aside>
  );
};
