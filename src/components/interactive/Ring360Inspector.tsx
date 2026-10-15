import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, ZoomIn, ShieldCheck } from 'lucide-react';

interface AnatomyHotspot {
  id: string;
  name: string;
  description: string;
  angleTarget: number; // angle in degrees where this hotspot is best viewed
  x: number; // percentage from left (0-100)
  y: number; // percentage from top (0-100)
  tag: string;
}

const HOTSPOTS: AnatomyHotspot[] = [
  {
    id: 'prongs',
    name: 'Hand-Forged 4-Prong Talon Setting',
    description: 'Each talon claw is individually burnished under microscope to maximize diamond light entrance while providing lifetime stone retention.',
    angleTarget: 0,
    x: 48,
    y: 28,
    tag: 'MASTER SETTING',
  },
  {
    id: 'halo',
    name: 'Secret Under-Gallery Halo',
    description: 'Hidden beneath the center stone rests a row of 14 micro-pavé diamonds (F-VVS1), radiating an intimate glow visible only from the side profile.',
    angleTarget: 90,
    x: 52,
    y: 42,
    tag: 'INTIMATE BRILLIANCE',
  },
  {
    id: 'shank',
    name: 'Ergonomic Cathedral Twisted Band',
    description: 'Sculpted with a comfort-fit interior curve that balances weight seamlessly, preventing the ring from spinning during daily movement.',
    angleTarget: 180,
    x: 68,
    y: 65,
    tag: 'ERGONOMIC COMFORT',
  },
  {
    id: 'hallmark',
    name: 'Bureau of Indian Standards (BIS 750)',
    description: 'Indelibly laser-hallmarked with certified 18 Karat 750 gold purity, VALERIE maison insignia, and the piece’s unique ledger identification.',
    angleTarget: 270,
    x: 32,
    y: 72,
    tag: 'AUTHENTICITY HALLMARK',
  },
];

export const Ring360Inspector: React.FC = () => {
  const [rotationAngle, setRotationAngle] = useState<number>(0); // 0 to 360
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<AnatomyHotspot | null>(HOTSPOTS[0]);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isDragging = useRef<boolean>(false);
  const lastMouseX = useRef<number>(0);

  // Observe visibility to avoid rendering 25fps intervals off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate the ring slowly only when in view and active
  useEffect(() => {
    if (!isAutoRotating || !isInView) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.8) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoRotating, isInView]);

  // Touch and mouse drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastMouseX.current = e.clientX;
    setIsAutoRotating(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastMouseX.current;
    lastMouseX.current = e.clientX;
    setRotationAngle((prev) => {
      let next = (prev + deltaX * 0.7) % 360;
      if (next < 0) next += 360;
      return next;
    });
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Determine current viewing angle frame (4 key perspectives)
  const normalizedAngle = Math.round(rotationAngle);
  const getPerspectiveLabel = (angle: number) => {
    if (angle >= 315 || angle < 45) return 'Direct Top Table Facet';
    if (angle >= 45 && angle < 135) return 'Profile Side View (Hidden Halo)';
    if (angle >= 135 && angle < 225) return 'Cathedral Arch & Shank';
    return 'Interior Hallmark & Under-Bridge';
  };

  // Jump to specific hotspot angle
  const selectHotspot = (hs: AnatomyHotspot) => {
    setActiveHotspot(hs);
    setIsAutoRotating(false);
    setRotationAngle(hs.angleTarget);
  };

  return (
    <section ref={sectionRef} className="bg-[#170C06] text-[#F8F2E9] py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-[#C99A54]/25 relative overflow-hidden">
      <div className="max-w-[1536px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#28160D] border border-[#C99A54]/40 rounded-full text-[10px] tracking-[0.25em] text-[#E7C58A] uppercase mb-4">
            <RotateCw className="w-3.5 h-3.5 text-[#C99A54]" />
            <span>360° MICRO-TURNTABLE & ANATOMY HOTSPOTS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F8F2E9] font-normal tracking-wide">
            Anatomy of a Master Jewel
          </h2>

          <p className="text-xs sm:text-sm text-[#F8F2E9]/75 font-light leading-relaxed mt-3 max-w-2xl mx-auto">
            Swipe or drag horizontally to inspect the ring from every perspective. Click the interactive gold hotspots to reveal master goldsmithing innovations.
          </p>

          <div className="flex items-center justify-center space-x-3 mt-5">
            <div className="w-16 h-[1px] bg-[#C99A54]/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C99A54] bg-[#170C06]" />
            <div className="w-16 h-[1px] bg-[#C99A54]/40" />
          </div>
        </div>

        {/* 360 Turntable Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center: Interactive 360 Turntable Screen */}
          <div className="lg:col-span-8">
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className={`relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xs border border-[#C99A54]/30 bg-gradient-to-br from-[#1F1109] via-[#120703] to-[#0A0401] p-6 flex flex-col justify-between overflow-hidden shadow-2xl select-none cursor-ew-resize transition-all ${
                isZoomed ? 'scale-102' : ''
              }`}
            >
              {/* Top Bar: Perspective readout and controls */}
              <div className="flex items-center justify-between z-20">
                <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] text-[#C99A54] font-mono tracking-wider min-w-0 pr-2">
                  <span className="w-2 h-2 rounded-full bg-[#C99A54] animate-pulse shrink-0" />
                  <span className="uppercase truncate max-w-[130px] sm:max-w-none">{getPerspectiveLabel(normalizedAngle)}</span>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
                  <button
                    onClick={() => setIsAutoRotating(!isAutoRotating)}
                    className="flex items-center space-x-1.5 bg-black/60 hover:bg-black/90 border border-[#C99A54]/30 px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] text-[#E7C58A] rounded-2xs transition-colors cursor-pointer"
                  >
                    <RotateCw className={`w-3 h-3 ${isAutoRotating ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">{isAutoRotating ? 'PAUSE ROTATION' : 'AUTO ORBIT'}</span>
                    <span className="sm:hidden">{isAutoRotating ? 'PAUSE' : 'ORBIT'}</span>
                  </button>

                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="bg-black/60 hover:bg-black/90 border border-[#C99A54]/30 p-1 text-[#E7C58A] rounded-2xs transition-colors"
                    title="Toggle zoom"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dynamic 360 Ring Turntable Model */}
              <div className="relative my-auto flex items-center justify-center py-4">
                {/* Turntable Base Disk */}
                <div className="absolute -bottom-8 w-80 h-16 rounded-[100%] bg-gradient-to-t from-black via-[#C99A54]/15 to-transparent blur-md pointer-events-none" />

                {/* Simulated 3D Ring with 360° Perspective Matrix */}
                <div
                  className="relative transition-transform duration-75 ease-out"
                  style={{
                    transform: `perspective(800px) rotateY(${rotationAngle}deg) scale(${isZoomed ? 1.25 : 1})`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    src="/images/products/solitaire-twisted-band.webp"
                    alt="VALERIE 360 Ring Turntable"
                    className="w-64 h-64 sm:w-80 sm:h-80 object-contain drop-shadow-[0_20px_35px_rgba(201,154,84,0.3)] pointer-events-none"
                  />
                </div>

                {/* Interactive Pulsing Hotspots (visible on respective angles) */}
                {HOTSPOTS.map((hs) => {
                  const angleDiff = Math.abs((rotationAngle - hs.angleTarget + 180) % 360 - 180);
                  const isVisible = angleDiff < 65; // Hotspot is visible when ring is turned within range
                  const isSelected = activeHotspot?.id === hs.id;

                  if (!isVisible) return null;

                  return (
                    <button
                      key={hs.id}
                      onClick={() => selectHotspot(hs)}
                      className="absolute z-30 group cursor-pointer transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${hs.x}%`,
                        top: `${hs.y}%`,
                      }}
                      aria-label={`Inspect ${hs.name}`}
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Ripple Effect */}
                        <span className="absolute w-8 h-8 rounded-full bg-[#C99A54]/30 animate-ping" />
                        {/* Core Hotspot Dot */}
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-white bg-[#C99A54] scale-120 shadow-[0_0_15px_#C99A54]'
                              : 'border-[#E7C58A] bg-[#170C06] hover:bg-[#C99A54] hover:text-[#170C06]'
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Angle Dial Scrubber */}
              <div className="space-y-2 z-10 pt-2 border-t border-[#C99A54]/20">
                <div className="flex items-center justify-between text-[11px] text-[#F8F2E9]/70">
                  <span className="flex items-center space-x-1.5 text-[#E7C58A]">
                    <RotateCw className="w-3.5 h-3.5 text-[#C99A54]" />
                    <span>Drag or scrub slider to rotate 360°</span>
                  </span>
                  <span className="font-mono text-[#C99A54]">
                    ANGLE: {Math.round(rotationAngle)}° / 360°
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="360"
                  value={Math.round(rotationAngle)}
                  onChange={(e) => {
                    setRotationAngle(Number(e.target.value));
                    setIsAutoRotating(false);
                  }}
                  className="w-full h-1.5 bg-[#170C06] rounded-lg appearance-none cursor-pointer accent-[#C99A54]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Hotspot Details Drawer */}
          <div className="lg:col-span-4 space-y-4">
            {/* Quick Hotspot Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {HOTSPOTS.map((hs) => (
                <button
                  key={hs.id}
                  onClick={() => selectHotspot(hs)}
                  className={`p-2.5 text-left border rounded-2xs transition-all ${
                    activeHotspot?.id === hs.id
                      ? 'border-[#C99A54] bg-[#C99A54]/20 text-[#E7C58A] shadow-md'
                      : 'border-[#C99A54]/20 bg-[#201007]/60 text-[#F8F2E9]/70 hover:border-[#C99A54]/50'
                  }`}
                >
                  <span className="text-[9px] text-[#C99A54] block font-mono uppercase">
                    {hs.tag}
                  </span>
                  <span className="text-xs font-serif truncate block text-[#F8F2E9]">
                    {hs.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Hotspot Deep-Dive Card */}
            {activeHotspot && (
              <div className="bg-[#201007]/90 border border-[#C99A54]/30 p-6 rounded-xs space-y-4 shadow-xl animate-fadeIn">
                <div className="flex items-center justify-between border-b border-[#C99A54]/20 pb-3">
                  <span className="text-[10px] tracking-[0.25em] text-[#C99A54] uppercase font-mono">
                    {activeHotspot.tag}
                  </span>
                  <span className="text-[10px] text-[#E7C58A] font-mono bg-[#170C06] px-2 py-0.5 border border-[#C99A54]/20">
                    BEARING {activeHotspot.angleTarget}°
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#F8F2E9]">
                  {activeHotspot.name}
                </h3>

                <p className="text-xs text-[#F8F2E9]/80 font-light leading-relaxed">
                  {activeHotspot.description}
                </p>

                <div className="pt-2 border-t border-[#C99A54]/20 flex items-center justify-between text-[11px] text-[#C99A54]">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Micro-Inspected at 40x Zoom</span>
                  </span>
                  <span>Hand Finished</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
