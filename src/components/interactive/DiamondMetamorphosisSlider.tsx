import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, SlidersHorizontal, ArrowLeftRight } from 'lucide-react';

export const DiamondMetamorphosisSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(896);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
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
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-6">
            <button
              onClick={() => {
                setSliderPosition(15);
              }}
              className={`px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-mono border transition-all cursor-pointer ${
                sliderPosition < 30
                  ? 'bg-[#C99A54] text-[#170C06] border-[#C99A54] font-medium'
                  : 'bg-[#170C06] text-[#E7C58A] border-[#C99A54]/30 hover:border-[#C99A54]'
              }`}
            >
              1. ROUGH MATRIX (15%)
            </button>
            <button
              onClick={() => {
                setSliderPosition(50);
              }}
              className={`px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-mono border transition-all cursor-pointer ${
                sliderPosition >= 30 && sliderPosition <= 70
                  ? 'bg-[#C99A54] text-[#170C06] border-[#C99A54] font-medium'
                  : 'bg-[#170C06] text-[#E7C58A] border-[#C99A54]/30 hover:border-[#C99A54]'
              }`}
            >
              2. 50/50 METAMORPHOSIS
            </button>
            <button
              onClick={() => {
                setSliderPosition(85);
              }}
              className={`px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-mono border transition-all cursor-pointer ${
                sliderPosition > 70
                  ? 'bg-[#C99A54] text-[#170C06] border-[#C99A54] font-medium'
                  : 'bg-[#170C06] text-[#E7C58A] border-[#C99A54]/30 hover:border-[#C99A54]'
              }`}
            >
              3. 18K SOLITAIRE (85%)
            </button>
          </div>

          {/* Interactive Split Canvas */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseDown={handlePointerDown}
            onMouseUp={handlePointerUp}
            onTouchMove={handleTouchMove}
            onTouchStart={handlePointerDown}
            onTouchEnd={handlePointerUp}
            className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] overflow-hidden rounded-xs border border-[#C99A54]/40 select-none cursor-ew-resize shadow-2xl bg-[#0B0402]"
            data-cursor="inspect"
            data-cursor-text="DRAG"
          >
            {/* Layer 1 (Underneath): Master Finished Solitaire Ring */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=85"
                alt="Master 18K Diamond Solitaire"
                className="w-full h-full object-cover object-center filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Annotation Tag Right */}
              <div className="absolute bottom-6 right-6 z-10 text-right pointer-events-none">
                <span className="text-[10px] tracking-[0.3em] font-mono text-[#E7C58A] uppercase block">
                  STAGE 02 • FINISHED MASTERPIECE
                </span>
                <span className="font-serif text-lg sm:text-xl text-[#F8F2E9]">
                  18K Yellow Gold Solitaire
                </span>
                <p className="text-[11px] font-mono text-[#71665C]">
                  57 Facets Hand-Polished • BIS 750
                </p>
              </div>
            </div>

            {/* Layer 2 (Clipped on top): Rough Geological Matrix */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1400&q=85"
                alt="Rough Geological Diamond Matrix"
                className="absolute inset-0 w-full h-full object-cover object-center filter saturate-50 sepia-25"
                style={{
                  width: `${containerWidth}px`,
                  maxWidth: 'none',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

              {/* Annotation Tag Left */}
              <div className="absolute bottom-6 left-6 z-10 text-left pointer-events-none">
                <span className="text-[10px] tracking-[0.3em] font-mono text-[#E7C58A] uppercase block">
                  STAGE 01 • GEOLOGICAL CRADLE
                </span>
                <span className="font-serif text-lg sm:text-xl text-[#F8F2E9]">
                  Rough Kimberlite Crystal
                </span>
                <p className="text-[11px] font-mono text-[#71665C]">
                  Unfaceted Carbon • Kimberly Certified
                </p>
              </div>
            </div>

            {/* Draggable Divider Handle Line */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Hairline Golden Bar */}
              <div className="w-[2px] h-full bg-[#E7C58A] shadow-[0_0_12px_#E7C58A]" />

              {/* Center Drag Medallion */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#170C06] border-2 border-[#E7C58A] shadow-[0_0_20px_rgba(201,154,84,0.6)] flex items-center justify-center text-[#E7C58A]">
                <ArrowLeftRight className="w-4 h-4 animate-pulse" />
              </div>
            </div>

            {/* Instruction pill at top */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-black/70 border border-[#C99A54]/30 rounded-full text-[9px] font-mono tracking-widest text-[#E7C58A] uppercase backdrop-blur-xs pointer-events-none flex items-center space-x-1.5">
              <SlidersHorizontal className="w-3 h-3 text-[#C99A54]" />
              <span>DRAG OR TAP TO COMPARE STAGES</span>
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
