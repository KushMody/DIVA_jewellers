import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ChevronRight, Gem, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { HERO_SLIDES } from '../../data/products';
import { MagneticButton } from '../effects/MagneticButton';

export const HeroAtelierSection: React.FC = () => {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlideIdx];

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative w-full min-h-screen bg-[#170C06] text-[#F8F2E9] overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-8 select-none">
      {/* Background Visual with Hardware Accelerated Crossfade & Ken Burns */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 pointer-events-none"
        >
          <img
            src={slide.image}
            alt={`${slide.headlineTop} ${slide.headlineBottom}`}
            className="w-full h-full object-cover object-right md:object-center"
          />
          {/* Multi-tier Luxury Atmospheric Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#170C06] via-[#170C06]/85 to-transparent w-full md:w-[65%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#170C06] via-transparent to-[#170C06]/60" />
        </motion.div>
      </AnimatePresence>

      {/* Main Editorial Content Container */}
      <div className="relative z-10 max-w-[1536px] w-full mx-auto px-6 md:px-12 my-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Eyebrow, Hero Title, Editorial Copy, Actions */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2.5 px-3 py-1 bg-[#28160D]/80 border border-[#C99A54]/40 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E7C58A] animate-pulse" />
              <span className="text-[10px] tracking-[0.28em] text-[#E7C58A] uppercase font-mono font-medium">
                HAUTE JOAILLERIE ATELIER • MUMBAI & ANTWERP
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.05] tracking-[0.02em] text-[#F8F2E9] font-normal">
              <span className="block">{slide.headlineTop}</span>
              <span className="block text-[#E7C58A] italic font-light">{slide.headlineBottom}</span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-[#F8F2E9]/80 font-light leading-relaxed max-w-xl">
              {slide.supportingCopy.replace('\n', ' ')} Hand-carved in solid 18K gold with certified conflict-free natural diamonds, capped strictly at 250 archival allocations.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <MagneticButton strength={0.25}>
                <Link
                  to={slide.ctaLink}
                  data-cursor="hover"
                  data-cursor-text="DISCOVER"
                  className="inline-flex items-center space-x-3 px-8 py-3.5 bg-[#C99A54] text-[#170C06] text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#E7C58A] transition-all duration-300 group cursor-pointer shadow-xl shadow-[#C99A54]/20"
                >
                  <span>{slide.ctaText}</span>
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </MagneticButton>

              <Link
                to="/craftsmanship"
                className="inline-flex items-center space-x-2 px-6 py-3.5 border border-[#C99A54]/40 hover:border-[#E7C58A] text-xs tracking-[0.2em] uppercase text-[#F8F2E9] hover:bg-[#C99A54]/10 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C99A54]" />
                <span>ATELIER DOSSIER</span>
              </Link>
            </div>

            {/* Micro-Pillars Guarantee */}
            <div className="pt-4 grid grid-cols-3 gap-4 max-w-lg border-t border-[#C99A54]/25">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C99A54] shrink-0" />
                <span className="text-[10px] uppercase tracking-wider text-[#F8F2E9]/70 font-mono">
                  BIS 750 Gold
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Gem className="w-3.5 h-3.5 text-[#C99A54] shrink-0" />
                <span className="text-[10px] uppercase tracking-wider text-[#F8F2E9]/70 font-mono">
                  SGL / IGI Natural
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-3.5 h-3.5 text-[#C99A54] shrink-0" />
                <span className="text-[10px] uppercase tracking-wider text-[#F8F2E9]/70 font-mono">
                  Numbered 250
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Typography matching Reference 1 */}
          <div className="hidden lg:flex lg:col-span-4 justify-end items-center pr-4">
            <div className="flex flex-col items-start space-y-4 text-left border-l border-[#C99A54]/50 pl-6 py-4 bg-[#170C06]/40 backdrop-blur-xs">
              <div className="text-xs tracking-[0.35em] text-[#E7C58A] uppercase space-y-2 font-light leading-relaxed">
                <span className="block">TIMELESS</span>
                <span className="block">ELEGANCE</span>
                <span className="block">FOR EVERY</span>
                <span className="block">CHAPTER</span>
                <span className="block">OF YOU</span>
              </div>
              <div className="w-10 h-[1.5px] bg-[#C99A54]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Slide indicators & Scroll Prompt */}
      <div className="relative z-10 max-w-[1536px] w-full mx-auto px-6 md:px-12 flex items-center justify-between border-t border-[#C99A54]/20 pt-4">
        {/* Slide Selector Buttons */}
        <div className="flex items-center space-x-6">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIdx(idx)}
              className={`group flex items-center space-x-2 text-xs tracking-wider transition-all cursor-pointer ${
                idx === currentSlideIdx ? 'text-[#E7C58A] font-semibold' : 'text-[#F8F2E9]/40 hover:text-[#F8F2E9]'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <span className="font-mono text-xs">0{s.id}</span>
              <span
                className={`h-[1.5px] transition-all duration-300 ${
                  idx === currentSlideIdx ? 'w-8 bg-[#C99A54]' : 'w-3 bg-white/20 group-hover:w-5'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Scroll To Enter Indicator */}
        <button
          onClick={handleScrollDown}
          className="flex items-center space-x-2 text-xs tracking-[0.25em] uppercase text-[#E7C58A]/80 hover:text-[#E7C58A] transition-colors cursor-pointer group"
        >
          <span>SCROLL TO ENTER THE VAULT</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#C99A54] animate-bounce" />
        </button>
      </div>
    </section>
  );
};
