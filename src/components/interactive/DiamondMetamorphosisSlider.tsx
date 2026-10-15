import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, SlidersHorizontal, ArrowLeftRight } from 'lucide-react';

export const DiamondMetamorphosisSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  // Global pointer move and up listeners so dragging never gets stuck or frozen
  useEffect(() => {
    if (!isDragging) return;

    const onPointerMove = (e: PointerEvent) => {
      handleMove(e.clientX);
    };

    const onPointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [isDragging, handleMove]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  return (
    <section className="bg-[#100703] text-[#F8F2E9] py-16 md:py-24 border-b border-[#C99A54]/25 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C99A54]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#28160D] border border-[#C99A54]/40 rounded-full text-[10px] tracking-[0.25em] text-[#E7C58A] uppercase font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C99A54]" />
            <span>THE ATELIER METAMORPHOSIS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F8F2E9] font-normal tracking-wide">
            From Earth to Brilliance
          </h2>
          <p className="text-xs sm:text-sm text-[#71665C] font-light mt-3 leading-relaxed">
            Drag the golden divider to witness the transformation: from unrefined geological rough
            matrix to the master hand-faceted 18K Solitaire.
          </p>
        </div>

        {/* Split Slider Stage */}
        <div className="max-w-4xl mx-auto">
          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
            <button
              onClick={() => setSliderPosition(15)}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-mono border transition-all cursor-pointer ${
                sliderPosition < 30
                  ? 'bg-[#C99A54] text-[#170C06] border-[#C99A54] font-medium shadow-[0_0_15px_rgba(201,154,84,0.3)]'
                  : 'bg-[#170C06] text-[#E7C58A] border-[#C99A54]/30 hover:border-[#C99A54]'
              }`}
            >
              1. ROUGH (15%)
            </button>
            <button
              onClick={() => setSliderPosition(50)}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-mono border transition-all cursor-pointer ${
                sliderPosition >= 30 && sliderPosition <= 70
                  ? 'bg-[#C99A54] text-[#170C06] border-[#C99A54] font-medium shadow-[0_0_15px_rgba(201,154,84,0.3)]'
                  : 'bg-[#170C06] text-[#E7C58A] border-[#C99A54]/30 hover:border-[#C99A54]'
              }`}
            >
              2. 50/50 TRANSFORMATION
            </button>
            <button
              onClick={() => setSliderPosition(85)}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-mono border transition-all cursor-pointer ${
                sliderPosition > 70
                  ? 'bg-[#C99A54] text-[#170C06] border-[#C99A54] font-medium shadow-[0_0_15px_rgba(201,154,84,0.3)]'
                  : 'bg-[#170C06] text-[#E7C58A] border-[#C99A54]/30 hover:border-[#C99A54]'
              }`}
            >
              3. 18K SOLITAIRE (85%)
            </button>
          </div>

          {/* Interactive Split Canvas */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] overflow-hidden rounded-xs border border-[#C99A54]/40 select-none cursor-ew-resize shadow-2xl bg-[#0B0402] touch-none"
          >
            {/* Layer 1 (Underneath): Master Finished Solitaire Ring */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=85"
                alt="Master 18K Diamond Solitaire"
                className="w-full h-full object-cover object-center filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* Layer 2 (Clipped on top): Authentic Geological Rough Crystal Matrix */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1515526764876-0f3b298ee4ac?auto=format&fit=crop&w=1400&q=85"
                alt="Rough Geological Diamond Crystal"
                className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* Fixed Corner Label: Stage 01 (Never crushed or vertically wrapped) */}
            <div
              className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 z-20 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: sliderPosition > 12 ? 1 : 0.35,
              }}
            >
              <div className="bg-[#170C06]/85 backdrop-blur-md border border-[#C99A54]/30 rounded-xs px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 shadow-xl max-w-[150px] sm:max-w-[240px] md:max-w-[270px]">
                <span className="text-[8px] sm:text-[10px] tracking-[0.2em] font-mono text-[#E7C58A] uppercase block">
                  STAGE 01
                </span>
                <span className="font-serif text-xs sm:text-base md:text-lg text-[#F8F2E9] font-normal leading-tight block mt-0.5 truncate">
                  Rough Kimberlite
                </span>
                <p className="text-[9px] sm:text-[11px] font-mono text-[#71665C] mt-0.5 leading-tight hidden xs:block truncate">
                  Unfaceted Carbon • Kimberley
                </p>
              </div>
            </div>

            {/* Fixed Corner Label: Stage 02 (Never overlapped or cut off) */}
            <div
              className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 z-20 pointer-events-none text-right transition-opacity duration-300"
              style={{
                opacity: sliderPosition < 88 ? 1 : 0.35,
              }}
            >
              <div className="bg-[#170C06]/85 backdrop-blur-md border border-[#C99A54]/30 rounded-xs px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 shadow-xl max-w-[150px] sm:max-w-[240px] md:max-w-[270px] ml-auto">
                <span className="text-[8px] sm:text-[10px] tracking-[0.2em] font-mono text-[#E7C58A] uppercase block">
                  STAGE 02
                </span>
                <span className="font-serif text-xs sm:text-base md:text-lg text-[#F8F2E9] font-normal leading-tight block mt-0.5 truncate">
                  18K Solitaire
                </span>
                <p className="text-[9px] sm:text-[11px] font-mono text-[#71665C] mt-0.5 leading-tight hidden xs:block truncate">
                  57 Facets • BIS 750
                </p>
              </div>
            </div>

            {/* Draggable Divider Handle Line */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none select-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Hairline Golden Bar */}
              <div className="w-[2px] h-full bg-[#E7C58A] shadow-[0_0_12px_#E7C58A]" />

              {/* Center Drag Medallion */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#170C06] border-2 border-[#E7C58A] shadow-[0_0_20px_rgba(201,154,84,0.7)] flex items-center justify-center text-[#E7C58A]">
                <ArrowLeftRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
            </div>

            {/* Instruction pill at top */}
            <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 z-20 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-black/75 border border-[#C99A54]/30 rounded-full text-[8px] sm:text-[9px] font-mono tracking-widest text-[#E7C58A] uppercase backdrop-blur-xs pointer-events-none flex items-center space-x-1 sm:space-x-1.5 shadow-lg max-w-[90%] truncate">
              <SlidersHorizontal className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C99A54] shrink-0" />
              <span className="truncate">DRAG OR TAP TO COMPARE</span>
            </div>
          </div>

          {/* Ratio bar below */}
          <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-[#71665C]">
            <span>ROUGH CARBON: {Math.round(sliderPosition)}%</span>
            <div className="flex-1 mx-4 h-[2px] bg-[#28160D] overflow-hidden rounded-full">
              <div
                className="h-full bg-[#C99A54] transition-all duration-75"
                style={{ width: `${sliderPosition}%` }}
              />
            </div>
            <span>MASTER BRILLIANCE: {Math.round(100 - sliderPosition)}%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

