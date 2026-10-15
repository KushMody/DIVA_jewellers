import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Star, MessageSquareQuote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReviewStory {
  id: string;
  author: string;
  location: string;
  ringName: string;
  ringSlug: string;
  image: string;
  serialNumber?: number;
  quote: string;
  fullStory: string;
  date: string;
}

const STORIES: ReviewStory[] = [
  {
    id: 'rev-1',
    author: 'Aarav & Meera S.',
    location: 'Bandra, Mumbai',
    ringName: 'The Eternal Radiance Solitaire',
    ringSlug: 'solitaire-twisted-band',
    image: '/images/products/solitaire-twisted-thumb-1.webp',
    serialNumber: 42,
    date: 'February 2026',
    quote: 'The 360 inspector and laser serial engraving gave us complete confidence before visiting the atelier.',
    fullStory: 'We spent weeks researching diamond jewellers in Mumbai. What set VALERIE apart was the utter transparency of their Swiss chapter horology standards. Seeing edition #042/250 stamped on the shank made our engagement unforgettable.',
  },
  {
    id: 'rev-2',
    author: 'Kabir & Ananya V.',
    location: 'Chanakyapuri, New Delhi',
    ringName: 'Custom Bespoke Signet Solitaire',
    ringSlug: 'custom-design-ring',
    image: '/images/products/custom-design-ring.webp',
    serialNumber: 11,
    date: 'January 2026',
    quote: 'The CAD prototyping and 40x microscope setting tolerances rival Geneva watchmakers.',
    fullStory: 'I approached the atelier with an heirloom drawing. The master goldsmiths translated my sketches into a solid 18K rose gold masterpiece with zero compromise.',
  },
  {
    id: 'rev-3',
    author: 'Dev & Natasha M.',
    location: 'Indiranagar, Bengaluru',
    ringName: 'Pavé Diamond Eternity Band',
    ringSlug: 'pave-diamond-band',
    image: '/images/products/pave-diamond-band.webp',
    date: 'December 2025',
    quote: 'The comfort-fit interior curve means my wife wears it daily without any irritation.',
    fullStory: 'For our 10th anniversary, we selected this full eternity band. The optical fire of the F-VVS1 micro-diamonds under candlelight is spectacular. The insured armored delivery arrived within 48 hours.',
  },
  {
    id: 'rev-4',
    author: 'Vikram & Rhea D.',
    location: 'Colaba, Mumbai',
    ringName: 'Regal Emerald Solitaire',
    ringSlug: 'regal-emerald',
    image: '/images/products/regal-emerald.webp',
    serialNumber: 7,
    date: 'November 2025',
    quote: 'The hall of mirrors step-cut clarity is hypnotic. True vintage nobility.',
    fullStory: 'Rhea always dreamt of an emerald cut. When we saw the Tolkowsky symmetry and sub-micron claw prongs in person, there was zero doubt. Truly an heirloom we will pass down to generations.',
  },
];

export const PinnedHorizontalReviews: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
    mass: 0.15,
  });

  // Moves 400vw across from 0% to -75%
  const x = useTransform(smoothProgress, [0, 1], ['0%', '-75%']);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.25) setActiveStoryIdx(0);
      else if (latest < 0.50) setActiveStoryIdx(1);
      else if (latest < 0.75) setActiveStoryIdx(2);
      else setActiveStoryIdx(3);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[320vh] w-full bg-[#100703]">
      {/* Pinned Sticky Stage (100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 md:py-8 select-none z-10">
        {/* Top Header */}
        <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between border-b border-[#C99A54]/25 pb-3 sm:pb-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <MessageSquareQuote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C99A54] shrink-0" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#E7C58A] font-mono truncate">
              STAGE III • PATRON STORIES
            </span>
          </div>

          <div className="flex items-center space-x-2.5 sm:space-x-4 shrink-0">
            <span className="text-[9px] sm:text-[10px] font-mono text-[#E7C58A]">
              0{activeStoryIdx + 1} / 04
            </span>
            <div className="flex text-[#E7C58A]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#E7C58A]" />
              ))}
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#F8F2E9]/70 hidden sm:inline">
              4.98 / 5.0 RATING
            </span>
          </div>
        </div>

        {/* Horizontal Sliding Stage */}
        <div className="flex-1 flex items-center overflow-hidden my-auto">
          <motion.div style={{ x }} className="flex h-[84vh] sm:h-[80vh] md:h-[75vh] w-[400vw] will-change-transform">
            {STORIES.map((story) => (
              <div
                key={story.id}
                className="w-[100vw] h-full flex items-center justify-center px-4 sm:px-8 md:px-16 shrink-0"
              >
                <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-center bg-[#1A0B05] border border-[#C99A54]/30 p-4 sm:p-6 md:p-10 rounded-xs shadow-2xl relative text-left">
                  {/* Left: Ring Image with Serial Hallmark */}
                  <div className="md:col-span-5 relative max-h-[170px] sm:max-h-[240px] md:max-h-none aspect-[16/10] sm:aspect-square overflow-hidden rounded-xs border border-[#C99A54]/30 group mx-auto w-full">
                    <img
                      src={story.image}
                      alt={story.ringName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    {story.serialNumber && (
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-black/85 backdrop-blur-xs text-[8px] sm:text-[9px] font-mono tracking-widest text-[#E7C58A] uppercase border border-[#C99A54]/30">
                        ALLOCATION N°{String(story.serialNumber).padStart(3, '0')}/250
                      </div>
                    )}
                    <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-black/80 backdrop-blur-xs text-[9px] sm:text-[10px] text-[#F8F2E9]/90 font-mono">
                      {story.location} • {story.date}
                    </div>
                  </div>

                  {/* Right: Patron Testimonial Dossier */}
                  <div className="md:col-span-7 space-y-2.5 sm:space-y-4">
                    <div className="flex items-center space-x-1.5 sm:space-x-2 text-[#E7C58A]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#E7C58A]" />
                      ))}
                      <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#C99A54] uppercase ml-1.5 sm:ml-2">
                        VERIFIED MAISON PATRON
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-2xl md:text-3xl text-[#F8F2E9] font-normal leading-snug">
                      "{story.quote}"
                    </h3>

                    <p className="text-xs sm:text-sm text-[#71665C] font-light leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {story.fullStory}
                    </p>

                    <div className="pt-2 sm:pt-3 border-t border-[#C99A54]/20 flex items-center justify-between">
                      <div>
                        <span className="font-serif text-sm sm:text-base text-[#F8F2E9] block">
                          {story.author}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-[#C99A54] font-mono uppercase truncate max-w-[170px] sm:max-w-none block">
                          {story.ringName}
                        </span>
                      </div>

                      <Link
                        to={`/rings/${story.ringSlug}`}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border border-[#C99A54]/40 hover:border-[#C99A54] text-[10px] sm:text-xs text-[#E7C58A] rounded-2xs transition-colors shrink-0"
                      >
                        <span>VIEW CREATION</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Footnote */}
        <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between text-[9px] sm:text-[10px] text-[#71665C] font-mono border-t border-[#C99A54]/25 pt-2.5 sm:pt-3">
          <span>CHAPTER • 03 OF 03</span>
          <span className="text-[#E7C58A]">SCROLL TO ADVANCE</span>
        </div>
      </div>
    </div>
  );
};
