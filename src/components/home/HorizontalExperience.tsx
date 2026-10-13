import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Gem, Heart, Leaf, Eye, ShoppingBag } from 'lucide-react';
import { CATEGORIES_DATA, HERO_SLIDES, PRODUCTS } from '../../data/products';
import { MagneticButton } from '../effects/MagneticButton';
import { DiamondShimmer } from '../effects/DiamondShimmer';
import { useCart } from '../../context/CartContext';

export const HorizontalExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState('rose-gold');

  const { addItem } = useCart();

  // Signature featured jewel from Reference 2
  const featuredProduct = PRODUCTS[0];

  // Pin scroll tracking over 350vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    mass: 0.25,
  });

  // Layer 2 (Collections): Clips in sideways from right to left between 0.16 and 0.50
  const clipSection2 = useTransform(
    smoothProgress,
    [0.16, 0.50],
    ['inset(0 0 0 100%)', 'inset(0 0 0 0%)']
  );
  const edgeLine2 = useTransform(smoothProgress, [0.16, 0.50], ['100%', '0%']);
  const opacityEdge2 = useTransform(smoothProgress, [0.15, 0.16, 0.49, 0.51], [0, 1, 1, 0]);

  // Layer 3 (Masterpiece & Promises): Clips in sideways from right to left between 0.58 and 0.92
  const clipSection3 = useTransform(
    smoothProgress,
    [0.58, 0.92],
    ['inset(0 0 0 100%)', 'inset(0 0 0 0%)']
  );
  const edgeLine3 = useTransform(smoothProgress, [0.58, 0.92], ['100%', '0%']);
  const opacityEdge3 = useTransform(smoothProgress, [0.57, 0.58, 0.91, 0.93], [0, 1, 1, 0]);

  // Parallax shifts inside the layers for depth
  const xContent2 = useTransform(smoothProgress, [0.16, 0.50], [90, 0]);
  const xContent3 = useTransform(smoothProgress, [0.58, 0.92], [90, 0]);

  // Track active chapter for the bottom HUD
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.35) {
        setActiveChapter(0);
      } else if (latest < 0.75) {
        setActiveChapter(1);
      } else {
        setActiveChapter(2);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToChapter = (idx: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const progressMap = [0, 0.48, 0.98];
    const targetScroll = containerTop + progressMap[idx] * containerHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const handleNext = () => {
    scrollToChapter(Math.min(2, activeChapter + 1));
  };

  const handlePrev = () => {
    scrollToChapter(Math.max(0, activeChapter - 1));
  };

  const handleAddMasterpiece = () => {
    addItem({
      productId: featuredProduct.id,
      name: featuredProduct.name,
      slug: featuredProduct.slug,
      metal:
        selectedMetal === 'rose-gold'
          ? '18K Rose Gold'
          : selectedMetal === 'yellow-gold'
          ? '18K Yellow Gold'
          : '18K White Gold',
      size: 14,
      price: featuredProduct.price,
      image: featuredProduct.mainImage,
      quantity: 1,
    });
  };

  const currentHero = HERO_SLIDES[heroSlideIdx];

  return (
    <div ref={containerRef} className="relative h-[340vh] w-full bg-[#170C06]">
      {/* Pinned Sticky Viewport (100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
        {/* ========================================================================= */}
        {/* LAYER 1 (BASE): THE HERO SECTION (Matching Reference 1 exactly)           */}
        {/* ========================================================================= */}
        <section className="absolute inset-0 h-full w-full bg-[#170C06] text-[#F8F2E9] overflow-hidden flex flex-col justify-between">
          {/* Photographic Background Image */}
          <div className="absolute inset-0 pointer-events-none">
            <img
              src={currentHero.image}
              alt={currentHero.headlineTop}
              className="h-full w-full object-cover object-right md:object-center transition-all duration-1000 ease-out"
            />
            {/* Exact Dark Gradient Voids from Reference 1 */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#170C06] via-[#170C06]/85 to-transparent w-full md:w-[65%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#170C06] via-transparent to-[#170C06]/60" />
          </div>

          {/* Hero Main Editorial Grid */}
          <div className="relative z-10 max-w-[1536px] h-full w-full mx-auto px-6 md:px-12 flex flex-col justify-between pt-24 sm:pt-32 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-auto">
              {/* Left Column: Eyebrow, 2-line Serif Headline, Supporting Copy, Button */}
              <div className="md:col-span-8 lg:col-span-7 space-y-4 sm:space-y-6">
                <p className="text-[11px] sm:text-xs md:text-sm tracking-[0.35em] text-[#E7C58A] uppercase font-medium">
                  MORE THAN A RING
                </p>

                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.08] tracking-[0.02em] text-[#F8F2E9] font-normal">
                  <span className="block">A STORY</span>
                  <span className="block">ON YOUR HAND</span>
                </h1>

                <p className="text-xs sm:text-sm md:text-base text-[#F8F2E9]/80 font-light leading-relaxed max-w-lg">
                  Exquisite rings crafted with timeless elegance, for life’s most beautiful moments.
                </p>

                <div className="pt-2">
                  <MagneticButton strength={0.3}>
                    <Link
                      to="/rings"
                      data-cursor="hover"
                      data-cursor-text="EXPLORE"
                      className="inline-flex items-center space-x-3 px-8 py-3.5 border border-[#C99A54] text-xs tracking-[0.25em] uppercase text-[#F8F2E9] hover:bg-[#C99A54] hover:text-[#170C06] transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-[#C99A54]/30"
                    >
                      <span>EXPLORE RINGS</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </MagneticButton>
                </div>
              </div>

              {/* Right Column: Editorial Text matching Reference 1 */}
              <div className="hidden lg:flex md:col-span-4 lg:col-span-5 justify-end items-center pr-4">
                <div className="flex flex-col items-start space-y-4 text-left border-l border-[#C99A54]/50 pl-5 py-2">
                  <div className="text-[11px] tracking-[0.32em] text-[#E7C58A] uppercase space-y-1.5 font-light leading-relaxed">
                    <span className="block">TIMELESS</span>
                    <span className="block">ELEGANCE</span>
                    <span className="block">FOR EVERY</span>
                    <span className="block">CHAPTER</span>
                    <span className="block">OF YOU</span>
                  </div>
                  <div className="w-8 h-[1.5px] bg-[#C99A54]" />
                </div>
              </div>
            </div>

            {/* Bottom Left: Slide indicators 01  02  03 matching Reference 1 */}
            <div className="flex items-center space-x-6 pt-4">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setHeroSlideIdx(idx)}
                  className={`group flex flex-col items-start text-xs tracking-wider transition-all cursor-pointer ${
                    idx === heroSlideIdx
                      ? 'text-[#E7C58A] font-semibold'
                      : 'text-[#F8F2E9]/45 hover:text-[#F8F2E9]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span className="text-xs font-mono">0{s.id}</span>
                  <span
                    className={`h-[1.5px] mt-1 transition-all duration-300 ${
                      idx === heroSlideIdx ? 'w-8 bg-[#C99A54]' : 'w-3 bg-white/20 group-hover:w-5'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LAYER 2: RING COLLECTIONS (Clips in sideways from the right)               */}
        {/* ========================================================================= */}
        <motion.section
          style={{ clipPath: clipSection2 }}
          className="absolute inset-0 h-full w-full bg-[#F8F2E9] text-[#18130F] overflow-hidden flex flex-col justify-center will-change-transform z-20 shadow-2xl"
        >
          {/* Subtle warm luxury grain overlay */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#EFE6D8]/40 to-[#E8DCCB]/60 pointer-events-none" />

          <motion.div
            style={{ x: xContent2 }}
            className="relative z-10 max-w-[1536px] w-full mx-auto px-6 md:px-12 py-8 flex flex-col justify-center h-full"
          >
            {/* Editorial Heading Matching Reference 1 */}
            <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
              <span className="text-[11px] tracking-[0.3em] text-[#71665C] uppercase font-light block mb-1">
                DISCOVER OUR
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#18130F] font-normal tracking-wide">
                RING COLLECTIONS
              </h2>
              <div className="flex items-center justify-center space-x-3 mt-3">
                <div className="w-12 h-[1px] bg-[#C99A54]/40" />
                <div className="w-1.5 h-1.5 rotate-45 border border-[#C99A54] bg-[#F8F2E9]" />
                <div className="w-12 h-[1px] bg-[#C99A54]/40" />
              </div>
            </div>

            {/* 4 Collections Cards Grid Matching Reference 1 Exactly */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {CATEGORIES_DATA.map((cat) => (
                <Link
                  key={cat.id}
                  to={cat.link}
                  data-cursor="hover"
                  data-cursor-text="VIEW"
                  className="group relative block aspect-[4/3] sm:aspect-[3/4] overflow-hidden bg-[#28160D] border border-[#C99A54]/30 shadow-xl cursor-pointer"
                >
                  {/* Photographic Image */}
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Contrast gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-300" />

                  {/* Diamond Shimmer on Hover */}
                  <DiamondShimmer trigger="hover" />

                  {/* Text Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white flex flex-col justify-end">
                    <h3 className="font-serif text-base sm:text-lg font-normal tracking-wide leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-[10px] tracking-[0.25em] text-[#E7C58A] uppercase font-light mt-1">
                      {cat.subtitle}
                    </p>

                    {/* Circular Arrow Button Matching Reference 1 */}
                    <div className="mt-4 w-7 h-7 rounded-full border border-white/50 flex items-center justify-center group-hover:border-[#E7C58A] group-hover:bg-[#E7C58A] group-hover:text-[#170C06] transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Leading-Edge Golden Laser Line for Layer 2 Clip */}
        <motion.div
          style={{
            left: edgeLine2,
            opacity: opacityEdge2,
          }}
          className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-[#E7C58A] to-transparent pointer-events-none z-25 shadow-[0_0_15px_#C99A54]"
        />

        {/* ========================================================================= */}
        {/* LAYER 3: MASTERPIECE & PROMISES (Clips in sideways over Layer 2)          */}
        {/* ========================================================================= */}
        <motion.section
          style={{ clipPath: clipSection3 }}
          className="absolute inset-0 h-full w-full bg-[#170C06] text-[#F8F2E9] overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-16 will-change-transform z-30 shadow-2xl"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C99A54]/10 rounded-full blur-[140px] pointer-events-none" />

          <motion.div
            style={{ x: xContent3 }}
            className="relative z-10 max-w-[1536px] w-full mx-auto px-6 md:px-12 my-auto"
          >
            {/* Upper: Spotlight Solitaire Box Matching Reference 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#201007] border border-[#C99A54]/30 p-6 sm:p-8 md:p-10 rounded-xs shadow-2xl mb-8">
              {/* Solitaire Image */}
              <div className="lg:col-span-5 relative aspect-[16/11] overflow-hidden rounded-2xs border border-[#C99A54]/30 group">
                <img
                  src={featuredProduct.mainImage}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/75 backdrop-blur-xs text-[9px] font-mono tracking-widest text-[#E7C58A] uppercase border border-[#C99A54]/30">
                  SIGNATURE SOLITAIRE
                </div>
              </div>

              {/* Solitaire Details & Rapid Reservation */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#C99A54] block font-mono">
                    THE ETERNAL RADIANCE
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F8F2E9] font-normal leading-tight">
                    {featuredProduct.name}
                  </h3>
                  <p className="text-xs text-[#71665C] leading-relaxed mt-2 max-w-xl font-light">
                    A perfect blend of classic elegance and modern design, this ring symbolises an everlasting bond. Crafted in solid 18K gold and natural certified diamonds.
                  </p>
                </div>

                {/* Price & Metal Selector */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-[#C99A54]/25">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-2xl sm:text-3xl font-serif text-[#F8F2E9]">
                      ₹{featuredProduct.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#71665C] line-through">
                      ₹{featuredProduct.originalPrice?.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Metal Buttons */}
                  <div className="flex items-center space-x-2">
                    {[
                      { id: 'rose-gold', name: '18K Rose', hex: '#E0A899' },
                      { id: 'yellow-gold', name: '18K Yellow', hex: '#E5C158' },
                      { id: 'white-gold', name: '18K White', hex: '#D8DCE0' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMetal(m.id)}
                        className={`flex items-center space-x-1.5 px-2.5 py-1 border text-[11px] rounded-2xs cursor-pointer transition-all ${
                          selectedMetal === m.id
                            ? 'border-[#E7C58A] bg-[#C99A54]/20 text-[#E7C58A]'
                            : 'border-[#C99A54]/25 text-[#71665C] hover:border-[#C99A54]/60'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.hex }} />
                        <span>{m.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <button
                    onClick={handleAddMasterpiece}
                    className="px-6 py-3 bg-[#C99A54] hover:bg-[#E7C58A] text-[#170C06] font-semibold text-xs tracking-[0.2em] uppercase flex items-center space-x-2 transition-colors cursor-pointer shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO VAULT BAG</span>
                  </button>

                  <Link
                    to={`/rings/${featuredProduct.slug}`}
                    className="px-6 py-3 border border-[#C99A54] text-[#F8F2E9] hover:bg-[#C99A54]/10 text-xs tracking-[0.2em] uppercase flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-[#C99A54]" />
                    <span>FULL GEMOLOGICAL DOSSIER</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Lower: 4 Brand Promises Matching Bottom of Reference 1 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-[#C99A54]/25">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-full border border-[#C99A54]/40 flex items-center justify-center shrink-0 text-[#E7C58A]">
                  <Gem className="w-5 h-5 stroke-[1.2]" />
                </div>
                <div>
                  <h4 className="font-serif text-xs sm:text-sm text-[#F8F2E9] uppercase tracking-wider">
                    FINEST CRAFTSMANSHIP
                  </h4>
                  <p className="text-[10px] text-[#71665C] leading-snug font-light">
                    Thoughtfully designed, beautifully crafted.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-full border border-[#C99A54]/40 flex items-center justify-center shrink-0 text-[#E7C58A]">
                  <Leaf className="w-5 h-5 stroke-[1.2]" />
                </div>
                <div>
                  <h4 className="font-serif text-xs sm:text-sm text-[#F8F2E9] uppercase tracking-wider">
                    TIMELESS DESIGNS
                  </h4>
                  <p className="text-[10px] text-[#71665C] leading-snug font-light">
                    Elegant styles for every moment.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-full border border-[#C99A54]/40 flex items-center justify-center shrink-0 text-[#E7C58A]">
                  <Sparkles className="w-5 h-5 stroke-[1.2]" />
                </div>
                <div>
                  <h4 className="font-serif text-xs sm:text-sm text-[#F8F2E9] uppercase tracking-wider">
                    PREMIUM QUALITY
                  </h4>
                  <p className="text-[10px] text-[#71665C] leading-snug font-light">
                    Only the finest materials, for lasting brilliance.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-full border border-[#C99A54]/40 flex items-center justify-center shrink-0 text-[#E7C58A]">
                  <Heart className="w-5 h-5 stroke-[1.2]" />
                </div>
                <div>
                  <h4 className="font-serif text-xs sm:text-sm text-[#F8F2E9] uppercase tracking-wider">
                    MADE FOR YOU
                  </h4>
                  <p className="text-[10px] text-[#71665C] leading-snug font-light">
                    Rings that celebrate your unique story.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Leading-Edge Golden Laser Line for Layer 3 Clip */}
        <motion.div
          style={{
            left: edgeLine3,
            opacity: opacityEdge3,
          }}
          className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-[#E7C58A] to-transparent pointer-events-none z-35 shadow-[0_0_15px_#C99A54]"
        />

        {/* ========================================================================= */}
        {/* FIXED LUXURY RADAR / CHAPTER CONTROLS AT SCREEN BOTTOM                     */}
        {/* ========================================================================= */}
        <div className="fixed bottom-6 inset-x-0 z-40 pointer-events-none px-6 md:px-12">
          <div className="max-w-[1536px] mx-auto flex items-center justify-between">
            {/* Interactive Chapter Indicator Pill */}
            <div className="pointer-events-auto flex items-center space-x-4 bg-[#100703]/90 backdrop-blur-md px-4 py-2 border border-[#C99A54]/30 rounded-full shadow-2xl">
              {[
                { idx: 0, label: '01 STORY' },
                { idx: 1, label: '02 COLLECTIONS' },
                { idx: 2, label: '03 CRAFTSMANSHIP' },
              ].map((ch) => (
                <button
                  key={ch.idx}
                  onClick={() => scrollToChapter(ch.idx)}
                  className={`text-[10px] tracking-[0.2em] uppercase font-mono transition-colors cursor-pointer ${
                    activeChapter === ch.idx
                      ? 'text-[#E7C58A] font-semibold'
                      : 'text-[#71665C] hover:text-[#F8F2E9]'
                  }`}
                >
                  {ch.label}
                </button>
              ))}

              {/* Gold Progress Track */}
              <div className="w-16 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  style={{
                    width: useTransform(smoothProgress, [0, 1], ['0%', '100%']),
                  }}
                  className="h-full bg-[#C99A54]"
                />
              </div>
            </div>

            {/* Right: Quick Chapter Skip Arrows */}
            <div className="pointer-events-auto hidden sm:flex items-center space-x-2">
              <button
                onClick={handlePrev}
                disabled={activeChapter === 0}
                className="w-9 h-9 rounded-full bg-[#100703]/90 border border-[#C99A54]/30 flex items-center justify-center text-[#E7C58A] hover:bg-[#C99A54] hover:text-[#170C06] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xl cursor-pointer"
                aria-label="Previous chapter"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeChapter === 2}
                className="w-9 h-9 rounded-full bg-[#100703]/90 border border-[#C99A54]/30 flex items-center justify-center text-[#E7C58A] hover:bg-[#C99A54] hover:text-[#170C06] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xl cursor-pointer"
                aria-label="Next chapter"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
