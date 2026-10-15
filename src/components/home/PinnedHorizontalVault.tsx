import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Eye, Gem, ChevronRight } from 'lucide-react';
import { CATEGORIES_DATA, PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { DiamondShimmer } from '../effects/DiamondShimmer';

export const PinnedHorizontalVault: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMetal, setSelectedMetal] = useState('rose-gold');
  const [activePanelIdx, setActivePanelIdx] = useState(0);

  const { addItem } = useCart();

  const featuredSolitaire = PRODUCTS[0];
  const featuredEmerald = PRODUCTS[3] || PRODUCTS[1];
  const featuredPave = PRODUCTS[2] || PRODUCTS[0];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
    mass: 0.15,
  });

  // Moves the 400vw horizontal strip from 0% to -75%
  const x = useTransform(smoothProgress, [0, 1], ['0%', '-75%']);
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.25) setActivePanelIdx(0);
      else if (latest < 0.50) setActivePanelIdx(1);
      else if (latest < 0.75) setActivePanelIdx(2);
      else setActivePanelIdx(3);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleAddFeatured = (product: typeof featuredSolitaire) => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      metal:
        selectedMetal === 'rose-gold'
          ? '18K Rose Gold'
          : selectedMetal === 'yellow-gold'
          ? '18K Yellow Gold'
          : '18K White Gold',
      size: 14,
      price: product.price,
      image: product.mainImage,
      quantity: 1,
    });
  };

  return (
    <div ref={containerRef} className="relative h-[340vh] w-full bg-[#120703]">
      {/* Pinned Sticky Stage (100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 md:py-8 select-none z-10">
        {/* Top HUD: Section Header & Progress Bar */}
        <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between border-b border-[#C99A54]/20 pb-3 sm:pb-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#C99A54] animate-ping shrink-0" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#E7C58A] font-mono truncate">
              STAGE I • RING VAULT
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            <span className="text-[10px] sm:text-[11px] font-mono text-[#F8F2E9]/70">
              0{activePanelIdx + 1} / 04
            </span>
            <div className="w-20 sm:w-28 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                style={{
                  width: progressWidth,
                }}
                className="h-full bg-[#C99A54]"
              />
            </div>
          </div>
        </div>

        {/* Horizontal Sliding Viewport Track */}
        <div className="flex-1 flex items-center overflow-hidden my-auto relative z-10">
          <motion.div style={{ x }} className="flex h-[86vh] sm:h-[82vh] md:h-[80vh] w-[400vw] will-change-transform">
            {/* ========================================================================= */}
            {/* PANEL 1 (100vw): THE SIGNATURE ETERNAL SOLITAIRE                         */}
            {/* ========================================================================= */}
            <div className="w-[100vw] h-full flex items-center justify-center px-4 sm:px-8 md:px-16 shrink-0">
              <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center bg-[#1A0B05] border border-[#C99A54]/30 p-4 sm:p-6 md:p-10 rounded-xs shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#C99A54]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Left: Product Image with 360 Badge */}
                <div className="lg:col-span-5 relative max-h-[170px] sm:max-h-[240px] lg:max-h-none aspect-[16/10] sm:aspect-square overflow-hidden rounded-xs border border-[#C99A54]/30 group mx-auto w-full">
                  <img
                    src={featuredSolitaire.mainImage}
                    alt={featuredSolitaire.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-black/80 backdrop-blur-xs text-[8px] sm:text-[9px] font-mono tracking-widest text-[#E7C58A] uppercase border border-[#C99A54]/30">
                    N°001 SIGNATURE EDITION
                  </div>
                  <DiamondShimmer trigger="hover" />
                </div>

                {/* Right: Solitaire Dossier & Rapid Add */}
                <div className="lg:col-span-7 space-y-2.5 sm:space-y-4 text-left">
                  <div>
                    <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#C99A54] block font-mono">
                      {featuredSolitaire.collectionName}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-[#F8F2E9] font-normal tracking-wide mt-0.5 sm:mt-1">
                      {featuredSolitaire.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#71665C] font-light leading-relaxed mt-1 sm:mt-2 line-clamp-2 sm:line-clamp-none max-w-lg">
                      Tolkowsky optical symmetry with a delicate pavé twisted shank. Cast in solid 18K gold and set under 40x Swiss binocular microscopes.
                    </p>
                  </div>

                  {/* Metal Switcher */}
                  <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 py-2 sm:py-3 border-y border-[#C99A54]/20">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xl sm:text-2xl md:text-3xl font-serif text-[#F8F2E9]">
                        ₹{featuredSolitaire.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] sm:text-xs text-[#71665C] line-through">
                        ₹{featuredSolitaire.originalPrice?.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5 sm:space-x-2">
                      {[
                        { id: 'rose-gold', name: '18K Rose', hex: '#E0A899' },
                        { id: 'yellow-gold', name: '18K Yellow', hex: '#E5C158' },
                        { id: 'white-gold', name: '18K White', hex: '#D8DCE0' },
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setSelectedMetal(m.id)}
                          className={`flex items-center space-x-1 px-2 py-0.5 sm:px-2.5 sm:py-1 border text-[9px] sm:text-[10px] rounded-2xs cursor-pointer transition-all ${
                            selectedMetal === m.id
                              ? 'border-[#E7C58A] bg-[#C99A54]/20 text-[#E7C58A]'
                              : 'border-[#C99A54]/20 text-[#71665C] hover:border-[#C99A54]/50'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ backgroundColor: m.hex }} />
                          <span>{m.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-0.5 sm:pt-1">
                    <button
                      onClick={() => handleAddFeatured(featuredSolitaire)}
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-[#C99A54] hover:bg-[#E7C58A] text-[#170C06] font-semibold text-[10px] sm:text-xs tracking-[0.2em] uppercase flex items-center space-x-2 transition-colors cursor-pointer shadow-lg"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ADD TO VAULT BAG</span>
                    </button>
                    <Link
                      to={`/rings/${featuredSolitaire.slug}`}
                      className="px-4 py-2 sm:px-6 sm:py-3 border border-[#C99A54]/40 hover:border-[#C99A54] text-[#F8F2E9] text-[10px] sm:text-xs tracking-[0.2em] uppercase flex items-center space-x-2 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C99A54]" />
                      <span>VIEW 360 DOSSIER</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* PANEL 2 (100vw): THE 4 CURATED CATEGORIES PANORAMA                        */}
            {/* ========================================================================= */}
            <div className="w-[100vw] h-full flex flex-col justify-center px-4 sm:px-8 md:px-16 shrink-0">
              <div className="max-w-6xl w-full mx-auto">
                <div className="text-left mb-3 sm:mb-6">
                  <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#C99A54] uppercase font-mono block">
                    ARCHIVAL DIRECTORY
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F8F2E9] font-normal tracking-wide">
                    Four Pillars of Haute Joaillerie
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
                  {CATEGORIES_DATA.map((cat) => (
                    <Link
                      key={cat.id}
                      to={cat.link}
                      className="group relative block aspect-[4/3] sm:aspect-[3/4] overflow-hidden bg-[#1A0B05] border border-[#C99A54]/30 hover:border-[#E7C58A] transition-all duration-500 shadow-xl"
                    >
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4 text-left">
                        <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-[#E7C58A] uppercase font-mono block">
                          {cat.subtitle}
                        </span>
                        <h4 className="font-serif text-xs sm:text-sm md:text-base text-[#F8F2E9] mt-0.5 truncate sm:whitespace-normal">
                          {cat.title}
                        </h4>
                        <div className="mt-1.5 sm:mt-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/40 flex items-center justify-center group-hover:bg-[#C99A54] group-hover:border-[#C99A54] group-hover:text-[#170C06] transition-all">
                          <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* PANEL 3 (100vw): PAVÉ ETERNITY & REGAL EMERALD DUO                       */}
            {/* ========================================================================= */}
            <div className="w-[100vw] h-full flex items-center justify-center px-4 sm:px-8 md:px-16 shrink-0">
              <div className="max-w-6xl w-full grid grid-cols-2 gap-3 sm:gap-6 items-stretch">
                {/* Emerald Card */}
                <div className="bg-[#1A0B05] border border-[#C99A54]/30 p-3 sm:p-6 rounded-xs relative group text-left flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/10] overflow-hidden border border-[#C99A54]/20 mb-2 sm:mb-4 rounded-2xs">
                      <img
                        src={featuredEmerald.mainImage}
                        alt={featuredEmerald.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-[#C99A54] uppercase font-mono block">
                      NOBLE VINTAGE CUT
                    </span>
                    <h4 className="font-serif text-sm sm:text-xl md:text-2xl text-[#F8F2E9] mt-0.5 sm:mt-1 truncate sm:whitespace-normal">
                      {featuredEmerald.name}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#71665C] mt-1 line-clamp-2 hidden sm:block">
                      {featuredEmerald.shortDescription}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-[#C99A54]/20">
                    <span className="font-serif text-sm sm:text-lg md:text-xl text-[#F8F2E9]">
                      ₹{featuredEmerald.price.toLocaleString('en-IN')}
                    </span>
                    <Link
                      to={`/rings/${featuredEmerald.slug}`}
                      className="inline-flex items-center space-x-1 text-[10px] sm:text-xs text-[#E7C58A] hover:underline uppercase tracking-wider font-mono"
                    >
                      <span className="hidden xs:inline">INSPECT</span>
                      <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Pavé Eternity Card */}
                <div className="bg-[#1A0B05] border border-[#C99A54]/30 p-3 sm:p-6 rounded-xs relative group text-left flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/10] overflow-hidden border border-[#C99A54]/20 mb-2 sm:mb-4 rounded-2xs">
                      <img
                        src={featuredPave.mainImage}
                        alt={featuredPave.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-[#C99A54] uppercase font-mono block">
                      MICRO-PAVÉ SCINTILLATION
                    </span>
                    <h4 className="font-serif text-sm sm:text-xl md:text-2xl text-[#F8F2E9] mt-0.5 sm:mt-1 truncate sm:whitespace-normal">
                      {featuredPave.name}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#71665C] mt-1 line-clamp-2 hidden sm:block">
                      {featuredPave.shortDescription}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-[#C99A54]/20">
                    <span className="font-serif text-sm sm:text-lg md:text-xl text-[#F8F2E9]">
                      ₹{featuredPave.price.toLocaleString('en-IN')}
                    </span>
                    <Link
                      to={`/rings/${featuredPave.slug}`}
                      className="inline-flex items-center space-x-1 text-[10px] sm:text-xs text-[#E7C58A] hover:underline uppercase tracking-wider font-mono"
                    >
                      <span className="hidden xs:inline">INSPECT</span>
                      <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* PANEL 4 (100vw): VAULT COMPLETE & SCROLL TRANSITION                       */}
            {/* ========================================================================= */}
            <div className="w-[100vw] h-full flex items-center justify-center px-4 sm:px-8 md:px-16 shrink-0">
              <div className="max-w-2xl text-center space-y-3 sm:space-y-5 bg-[#1A0B05]/90 border border-[#C99A54]/40 p-5 sm:p-8 md:p-12 rounded-xs shadow-2xl">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-[#C99A54] flex items-center justify-center mx-auto text-[#E7C58A]">
                  <Gem className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>

                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#E7C58A] font-mono block">
                  VAULT EXPLORATION CONCLUDED
                </span>

                <h3 className="font-serif text-xl sm:text-3xl md:text-4xl text-[#F8F2E9] font-normal leading-tight">
                  Continue Scrolling to Discover the Standards of Haute Horology
                </h3>

                <p className="text-[11px] sm:text-xs md:text-sm text-[#71665C] font-light leading-relaxed max-w-lg mx-auto line-clamp-3 sm:line-clamp-none">
                  Every VALERIE creation passes Marcel Tolkowsky optical ratios, 40x Swiss binocular pavé tolerance, and Kimberley Process conflict-free verification.
                </p>

                <div className="pt-1 sm:pt-2 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/rings"
                    className="px-5 py-2.5 sm:px-7 sm:py-3 bg-[#C99A54] hover:bg-[#E7C58A] text-[#170C06] text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold transition-colors"
                  >
                    EXPLORE ALL 14 DESIGNS
                  </Link>
                </div>

                <div className="pt-2 sm:pt-4 flex items-center justify-center space-x-2 text-[9px] sm:text-[10px] text-[#E7C58A]/80 font-mono">
                  <span>SCROLL DOWN TO DEEPEN YOUR ATELIER JOURNEY</span>
                  <span className="animate-bounce">↓</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stage Footnote */}
        <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between text-[9px] sm:text-[10px] text-[#71665C] font-mono border-t border-[#C99A54]/20 pt-2.5 sm:pt-3">
          <span>CHAPTER • 01 OF 03</span>
          <span className="text-[#E7C58A]">SCROLL TO ADVANCE</span>
        </div>
      </div>
    </div>
  );
};
