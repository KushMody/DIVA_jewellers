import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { HERO_SLIDES } from '../../data/products';
import { MagneticButton } from '../effects/MagneticButton';

const SLIDE_DURATION = 7500; // ms

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number>(0);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = HERO_SLIDES[currentSlide];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 45) {
      setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
    } else if (deltaX < -45) {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[580px] sm:h-[620px] md:h-[680px] lg:h-[720px] overflow-hidden bg-[#170C06] text-[#F8F2E9]"
    >
      {/* Background Slides with Hardware Accelerated Crossfade & Slow Ken-Burns Zoom */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 pointer-events-none"
        >
          <img
            src={slide.image}
            alt={`${slide.headlineTop} ${slide.headlineBottom}`}
            className="w-full h-full object-cover object-right md:object-center"
          />
          {/* Multi-tier Luxury Atmospheric Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#170C06] via-[#170C06]/90 to-transparent w-full md:w-[75%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#170C06] via-transparent to-[#170C06]/60" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1536px] h-full mx-auto px-4 sm:px-6 md:px-12 flex flex-col justify-between pt-24 sm:pt-28 md:pt-36 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-auto">
          {/* Left Column: Eyebrow, Staggered Headline, Supporting Copy, Button */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.12,
                    delayChildren: 0.1,
                  },
                },
                exit: {
                  opacity: 0,
                  transition: { duration: 0.25 },
                },
              }}
              className="md:col-span-8 lg:col-span-7 space-y-4 sm:space-y-5 md:space-y-6"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="inline-flex items-center space-x-2"
              >
                <span className="w-6 h-[1px] bg-[#C99A54]" />
                <p className="text-[11px] sm:text-xs md:text-sm tracking-[0.35em] text-[#E7C58A] uppercase font-medium">
                  {slide.eyebrow}
                </p>
              </motion.div>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[74px] leading-[1.08] tracking-[0.02em] text-[#F8F2E9] font-normal"
              >
                <span className="block">{slide.headlineTop}</span>
                <span className="block text-[#E7C58A] italic">{slide.headlineBottom}</span>
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="text-xs sm:text-sm md:text-base text-[#F8F2E9]/80 font-light leading-relaxed max-w-lg whitespace-pre-line"
              >
                {slide.supportingCopy}
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="pt-2 flex items-center space-x-4"
              >
                <MagneticButton strength={0.25}>
                  <Link
                    to={slide.ctaLink}
                    data-cursor="hover"
                    data-cursor-text="EXPLORE"
                    className="inline-flex items-center space-x-3 px-7 py-3.5 bg-[#C99A54]/10 border border-[#C99A54] text-xs tracking-[0.25em] uppercase text-[#F8F2E9] hover:bg-[#C99A54] hover:text-[#170C06] transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-[#C99A54]/30"
                  >
                    <span>{slide.ctaText}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </MagneticButton>

                <Link
                  to="/craftsmanship"
                  className="hidden sm:inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase text-[#E7C58A]/80 hover:text-white transition-colors"
                >
                  <span>ATELIER DOSSIER</span>
                  <span>↗</span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Right Column: Editorial Text matching Reference 1 */}
          <div className="hidden lg:flex md:col-span-4 lg:col-span-5 justify-end items-center pr-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start space-y-4 text-left border-l border-[#C99A54]/40 pl-5 py-3 bg-[#170C06]/40 backdrop-blur-xs rounded-xs"
              >
                <div className="text-[11px] tracking-[0.32em] text-[#E7C58A] uppercase space-y-2 font-light leading-relaxed">
                  {slide.editorialText.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </div>
                <div className="w-8 h-[1.5px] bg-[#C99A54]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Bar: Slide indicators with animated timer progress bars & play/pause toggle */}
        <div className="flex items-center justify-between pt-4 border-t border-[#C99A54]/20">
          <div className="flex items-center space-x-6 sm:space-x-8">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`group flex flex-col items-start text-xs tracking-wider transition-all cursor-pointer ${
                  idx === currentSlide ? 'text-[#E7C58A] font-semibold' : 'text-[#F8F2E9]/45 hover:text-[#F8F2E9]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                <div className="flex items-center space-x-1.5">
                  <span className="text-[11px] font-mono">0{s.id}</span>
                  <span className="text-[9px] uppercase tracking-widest hidden md:inline opacity-70">
                    {idx === 0 ? 'Solitaire' : idx === 1 ? 'Eternity' : 'Bespoke'}
                  </span>
                </div>
                {/* Micro-Progress Bar for Active Slide */}
                <div className="w-12 sm:w-16 h-[2px] bg-white/15 mt-1.5 rounded-full overflow-hidden relative">
                  {idx === currentSlide ? (
                    <motion.div
                      key={`timer-${currentSlide}-${isPaused}`}
                      className="absolute inset-y-0 left-0 bg-[#C99A54]"
                      initial={{ width: '0%' }}
                      animate={{ width: isPaused ? '100%' : '100%' }}
                      transition={{
                        duration: isPaused ? 0 : SLIDE_DURATION / 1000,
                        ease: 'linear',
                      }}
                    />
                  ) : null}
                </div>
              </button>
            ))}
          </div>

          {/* Quick Prev / Pause / Next Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full border border-[#C99A54]/30 flex items-center justify-center text-[#E7C58A] hover:bg-[#C99A54] hover:text-[#170C06] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="w-8 h-8 rounded-full border border-[#C99A54]/30 flex items-center justify-center text-[#E7C58A] hover:bg-[#C99A54] hover:text-[#170C06] transition-colors"
              aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full border border-[#C99A54]/30 flex items-center justify-center text-[#E7C58A] hover:bg-[#C99A54] hover:text-[#170C06] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
