import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, Check, X, ArrowDown } from 'lucide-react';
import {
  InteractiveSurfaceEnvironment,
  type SurfaceColorTheme,
  SURFACE_THEMES,
} from '../effects/InteractiveSurfaceEnvironment';
import { DiamondShimmer } from '../effects/DiamondShimmer';
import { MagneticButton } from '../effects/MagneticButton';

interface SignatureJewel {
  id: string;
  name: string;
  subtitle: string;
  slug: string;
  price: number;
  originalPrice: number;
  metal: string;
  metalBadge: string;
  carat: string;
  image: string;
  hotspots: {
    id: string;
    x: number; // percentage
    y: number; // percentage
    label: string;
    detail: string;
    spec: string;
  }[];
}

const SIGNATURE_CREATIONS: SignatureJewel[] = [
  {
    id: 'solitaire-twisted',
    name: 'THE ETERNAL RADIANCE',
    subtitle: 'Solitaire Twisted Band in 18K Solid Rose Gold',
    slug: 'solitaire-twisted-band',
    price: 185000,
    originalPrice: 205000,
    metal: '18K Solid Rose Gold',
    metalBadge: 'BIS 750 HALLMARKED',
    carat: '1.25 ct F-VVS1',
    image: '/images/products/solitaire-twisted-band.webp',
    hotspots: [
      {
        id: 'crown',
        x: 48,
        y: 22,
        label: 'Tolkowsky 57-Facet Cut',
        detail: 'Hand-faceted Marcel Tolkowsky proportions for zero light leakage and absolute optical fire.',
        spec: 'Table 53% • Crown 34.5° • 3EX Symmetry',
      },
      {
        id: 'shank',
        x: 74,
        y: 60,
        label: 'Micro-Pavé Twisted Shank',
        detail: 'Seated under 40x Swiss binocular microscopes with sub-micron claw clearance.',
        spec: '0.35ct Side Pavé • Solid 18K Rose Gold',
      },
      {
        id: 'surface',
        x: 82,
        y: 84,
        label: 'Mumbai Atelier Cast',
        detail: 'Single-batch vacuum furnace bullion casting capped strictly at 250 archival units.',
        spec: 'Serial N°042/250 • 18.9220° N, 72.8346° E',
      },
    ],
  },
  {
    id: 'classic-solitaire',
    name: 'THE SOVEREIGN SOLITAIRE',
    subtitle: 'Prismatic Brilliant Cut Solitaire on Solid Gold',
    slug: 'solitaire-twisted-band',
    price: 195000,
    originalPrice: 215000,
    metal: '18K Solid Yellow Gold',
    metalBadge: 'CLASSIC PURITY',
    carat: '1.40 ct D-Flawless',
    image: '/images/products/classic-solitaire.webp',
    hotspots: [
      {
        id: 'solitaire-table',
        x: 50,
        y: 20,
        label: 'D-Color Triple Excellent Center',
        detail: 'Optically pure Type IIa natural diamond lattice devoid of nitrogen impurities.',
        spec: '1.40 Carat • GIA Triple Excellent',
      },
      {
        id: 'four-prong',
        x: 65,
        y: 52,
        label: 'Four-Claw Cathedral Setting',
        detail: 'Elevated cathedral prongs maximizing photon entrance through the girdle.',
        spec: 'Solid 750 Pure Gold • 4.8g Bullion',
      },
      {
        id: 'surface-2',
        x: 22,
        y: 82,
        label: 'Antwerp Bourse Cleaving',
        detail: 'Sub-nanosecond laser cleaved rough crystal from Surat kimberlite deposits.',
        spec: 'Archive N°018/250 • 51.2194° N, 4.4025° E',
      },
    ],
  },
  {
    id: 'regal-emerald',
    name: 'THE REGAL EMERALD',
    subtitle: 'Noble Step-Cut Solitaire in Solid 18K Gold',
    slug: 'regal-emerald',
    price: 215000,
    originalPrice: 240000,
    metal: '18K Solid Yellow Gold',
    metalBadge: 'VINTAGE NOBILITY',
    carat: '1.50 ct D-IF',
    image: '/images/products/regal-emerald.webp',
    hotspots: [
      {
        id: 'emerald-table',
        x: 52,
        y: 24,
        label: 'Hall of Mirrors Step-Cut',
        detail: 'Linear concentric facets generating aristocratic clarity and hypnotic light reflection.',
        spec: '1.50 Carat • Internally Flawless (IF)',
      },
      {
        id: 'gold-bezel',
        x: 70,
        y: 56,
        label: 'Double Tapered Claws',
        detail: 'Solid 18K yellow gold tapered prongs engineered to protect corner facets.',
        spec: 'Solid 750 Pure Gold • 5.2g Bullion',
      },
      {
        id: 'surface-3',
        x: 80,
        y: 84,
        label: 'Geneva Horology Chapter',
        detail: 'Laser hallmarked with individual registry number and lifetime warranty dossier.',
        spec: 'Serial N°007/250 • 46.2044° N, 6.1432° E',
      },
    ],
  },
];

export const HeroAtelierSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [surfaceTheme, setSurfaceTheme] = useState<SurfaceColorTheme>('champagne-gold');
  const sectionRef = useRef<HTMLDivElement>(null);

  // Smooth inertial 3D mouse offset tracking (-0.5 to 0.5)
  const springX = useSpring(0, { stiffness: 90, damping: 22 });
  const springY = useSpring(0, { stiffness: 90, damping: 22 });

  // Live real-time 3D rotation and translation transforms
  const rotateY = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [16, -16]);
  const jewelX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const jewelY = useTransform(springY, [-0.5, 0.5], [-12, 12]);
  const shadowX = useTransform(springX, [-0.5, 0.5], [26, -26]);
  const shadowY = useTransform(springY, [-0.5, 0.5], [102, 118]);

  const currentJewel = SIGNATURE_CREATIONS[currentIdx];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    springX.set(x);
    springY.set(y);
  };

  const handlePrev = () => {
    setActiveHotspot(null);
    setCurrentIdx((prev) => (prev === 0 ? SIGNATURE_CREATIONS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveHotspot(null);
    setCurrentIdx((prev) => (prev + 1) % SIGNATURE_CREATIONS.length);
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#170C06] text-[#F8F2E9] overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-6 select-none"
    >
      {/* ========================================================================= */}
      {/* 1. ATMOSPHERIC ATELIER AMBIENCE (Clean luxury gradients, NO double image)  */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Radial Amber Glow from Ceiling */}
        <div className="absolute top-0 inset-x-0 h-[60vh] bg-gradient-to-b from-[#28160D]/80 via-[#1C0E07]/60 to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C99A54]/12 rounded-full blur-[140px]" />

        {/* Subtle Luxury Architectural Grid Line Accents */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#C99A54_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* ========================================================================= */}
      {/* 2. BUTTERY INTERACTIVE SURFACE (Proper Color & Real-Time Mouse Interaction) */}
      {/* ========================================================================= */}
      <InteractiveSurfaceEnvironment
        theme={surfaceTheme}
        onThemeChange={setSurfaceTheme}
        enableFloorCaustic={true}
      />

      {/* ========================================================================= */}
      {/* 3. TOP BRAND CREST (Matching reference top center "VIDI - GENEVA")         */}
      {/* ========================================================================= */}
      <div className="relative z-20 text-center max-w-xl mx-auto pt-1 sm:pt-3 px-4 pointer-events-none">
        <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.35em] uppercase text-[#E7C58A]/90 font-mono mb-1">
          <Sparkles className="w-3 h-3 text-[#C99A54]" />
          <span>MUMBAI & ANTWERP • HAUTE JOAILLERIE</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-[0.06em] text-[#F8F2E9] font-normal drop-shadow-md">
          DIVA
        </h1>

        <div className="flex items-center justify-center space-x-3 mt-1 text-[11px] tracking-[0.3em] uppercase text-[#C99A54] font-light">
          <span>ARCHIVAL CHAPTER I</span>
          <span>•</span>
          <span>LIMITED ALLOCATION</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CENTER STAGE: SINGLE CLEAN HERO CREATION WITH 3D GYRO TILT             */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center my-auto px-4 max-w-4xl mx-auto w-full">
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[420px] flex items-center justify-center">
          {/* Surface Shadow that responds to mouse on the exhibition pedestal */}
          <motion.div
            style={{
              x: shadowX,
              y: shadowY,
            }}
            className="absolute bottom-2 w-80 sm:w-[440px] h-14 bg-black/90 rounded-full blur-2xl pointer-events-none"
          />

          {/* Mirror Reflection of the Creation on the Polished Exhibition Surface */}
          <div className="absolute top-[98%] inset-x-0 max-w-xl mx-auto h-24 sm:h-32 pointer-events-none overflow-hidden opacity-25 filter blur-[1.5px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,transparent_75%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,transparent_75%)]">
            <img
              src={currentJewel.image}
              alt=""
              className="w-full h-full object-cover scale-y-[-1] filter brightness-70 contrast-125"
            />
          </div>

          {/* Single Focused Masterpiece Visual with Smooth 3D Motion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentJewel.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                rotateY,
                rotateX,
                x: jewelX,
                y: jewelY,
                transformPerspective: 1000,
              }}
              className="relative w-full max-w-xl aspect-[16/10] sm:aspect-[16/9] rounded-xs border border-[#C99A54]/35 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] bg-[#1A0B05] will-change-transform group cursor-pointer"
            >
              {/* Inner Clipped Image Container for Hover Zoom & Edge Shadows */}
              <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xs">
                <img
                  src={currentJewel.image}
                  alt={currentJewel.name}
                  className="w-full h-full object-cover filter brightness-[0.96] contrast-[1.05] transition-transform duration-700 group-hover:scale-104"
                />

                {/* Edge Gradient Voids */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#170C06] via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#170C06]/40 via-transparent to-[#170C06]/40 pointer-events-none" />

                <DiamondShimmer trigger="hover" />
              </div>

              {/* Refined Interactive Hotspots with Adaptive Smart-Placement Tooltips */}
              {currentJewel.hotspots.map((hs) => {
                const isSelected = activeHotspot === hs.id;
                const isNearTop = hs.y < 45;
                const isNearLeft = hs.x < 30;
                const isNearRight = hs.x > 70;

                const tooltipPositionClass = isNearTop
                  ? 'top-full mt-2.5'
                  : 'bottom-full mb-2.5';

                const tooltipAlignClass = isNearLeft
                  ? 'left-0'
                  : isNearRight
                  ? 'right-0'
                  : 'left-1/2 -translate-x-1/2';

                return (
                  <div
                    key={hs.id}
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 ${
                      isSelected ? 'z-50' : 'z-30'
                    }`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(isSelected ? null : hs.id);
                      }}
                      className={`group/btn relative w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#E7C58A] text-[#170C06] scale-125 shadow-[0_0_20px_#C99A54]'
                          : 'bg-[#170C06]/85 border border-[#C99A54] text-[#E7C58A] hover:bg-[#C99A54] hover:text-[#170C06]'
                      }`}
                      title={hs.label}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span className="absolute inset-0 rounded-full border border-[#C99A54] animate-ping opacity-35 pointer-events-none" />
                    </button>

                    {/* Tooltip Card with Smart Adaptive Placement */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.92, y: isNearTop ? -6 : 6 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.92, y: isNearTop ? -6 : 6 }}
                          className={`absolute ${tooltipPositionClass} ${tooltipAlignClass} w-64 max-w-[calc(100vw-3rem)] p-3.5 bg-[#1A0B05]/95 backdrop-blur-md border border-[#E7C58A] text-left shadow-[0_15px_40px_rgba(0,0,0,0.85)] rounded-xs z-50 pointer-events-auto`}
                        >
                          <div className="flex items-center justify-between border-b border-[#C99A54]/30 pb-1 mb-1.5">
                            <span className="text-[9px] font-mono tracking-widest uppercase text-[#C99A54]">
                              SPECIFICATION DOSSIER
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveHotspot(null);
                              }}
                              className="text-[#71665C] hover:text-white p-0.5 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <h4 className="font-serif text-sm text-[#F8F2E9] font-medium leading-tight">
                            {hs.label}
                          </h4>
                          <p className="text-[11px] text-[#F8F2E9]/85 font-light leading-relaxed mt-1">
                            {hs.detail}
                          </p>
                          <div className="mt-2 pt-1.5 border-t border-[#C99A54]/20 flex items-center space-x-1.5 text-[9px] font-mono text-[#E7C58A]">
                            <Check className="w-3 h-3 text-[#C99A54] shrink-0" />
                            <span>{hs.spec}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Current Jewel Details */}
        <div className="text-center mt-2 pointer-events-none">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C99A54] font-mono block">
            {currentJewel.metalBadge} • {currentJewel.carat}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F8F2E9] font-normal tracking-wide mt-0.5">
            {currentJewel.name}
          </h2>
          <div className="flex items-center justify-center space-x-3 mt-0.5">
            <span className="font-serif text-lg text-[#E7C58A]">
              ₹{currentJewel.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-[#71665C] line-through font-serif">
              ₹{currentJewel.originalPrice.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE SURFACE CONTROLS (Matching Reference Image 1 Layout)        */}
      {/* ========================================================================= */}
      <div className="relative z-30 max-w-[1536px] w-full mx-auto px-4 sm:px-8 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-auto pb-3 sm:pb-4">
        {/* Left: DISCOVER Pill & Carousel Circle Buttons (Matching Image 1) */}
        <div className="flex items-center space-x-3 sm:flex-col sm:items-start sm:space-x-0 sm:space-y-2">
          <MagneticButton strength={0.25}>
            <Link
              to={`/rings/${currentJewel.slug}`}
              data-cursor="hover"
              data-cursor-text="INSPECT"
              className="inline-flex items-center space-x-2.5 px-7 sm:px-9 py-2.5 bg-[#231812] hover:bg-[#C99A54] border border-[#C99A54]/60 text-[#F8F2E9] hover:text-[#170C06] text-xs tracking-[0.25em] uppercase font-bold rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all duration-300 group cursor-pointer"
            >
              <span>DISCOVER</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E7C58A] group-hover:bg-[#170C06]" />
            </Link>
          </MagneticButton>

          {/* Floating Carousel Navigation Circles (← and →) */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={handlePrev}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#231812] border border-[#C99A54]/40 flex items-center justify-center text-[#E7C58A] hover:bg-[#C99A54] hover:text-[#170C06] transition-all shadow-xl cursor-pointer"
              aria-label="Previous masterpiece"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#231812] border border-[#C99A54]/40 flex items-center justify-center text-[#E7C58A] hover:bg-[#C99A54] hover:text-[#170C06] transition-all shadow-xl cursor-pointer"
              aria-label="Next masterpiece"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: Slide Indicators */}
        <div className="flex items-center space-x-2">
          {SIGNATURE_CREATIONS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveHotspot(null);
                setCurrentIdx(idx);
              }}
              className={`transition-all cursor-pointer ${
                idx === currentIdx
                  ? 'w-7 h-1.5 bg-[#C99A54] rounded-full'
                  : 'w-1.5 h-1.5 bg-white/25 rounded-full hover:bg-white/60'
              }`}
              aria-label={`Select creation ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right: Surface Material Tone Selector & Round Scroll Button */}
        <div className="flex items-center space-x-2 sm:space-x-3.5 max-w-full">
          {/* Surface Material Tone Selector */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 bg-[#1A0B05]/90 backdrop-blur-md border border-[#C99A54]/45 p-1 rounded-full shadow-xl overflow-x-auto max-w-[calc(100vw-5rem)] sm:max-w-none">
            {(Object.keys(SURFACE_THEMES) as SurfaceColorTheme[]).map((themeKey) => {
              const th = SURFACE_THEMES[themeKey];
              const isSelected = surfaceTheme === themeKey;
              return (
                <button
                  key={themeKey}
                  onClick={() => setSurfaceTheme(themeKey)}
                  className={`px-2 sm:px-2.5 py-1 rounded-full text-[8px] sm:text-[9px] font-mono tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#E7C58A] text-[#170C06] font-bold shadow-[0_0_12px_#C99A54]'
                      : 'text-[#F8F2E9]/70 hover:text-white hover:bg-white/10'
                  }`}
                  title={th.metalName}
                >
                  {th.label.split(' ')[0]}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleScrollDown}
            className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-black/85 border border-[#C99A54]/40 flex items-center justify-center text-[#E7C58A] hover:bg-[#C99A54] hover:text-[#170C06] transition-all shadow-2xl cursor-pointer group"
            aria-label="Scroll to enter vault"
            title="Scroll to enter vault"
          >
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
