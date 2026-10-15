import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Compass, MapPin, CheckCircle } from 'lucide-react';

interface ProvenanceChapter {
  id: number;
  location: string;
  coords: string;
  stageName: string;
  headline: string;
  description: string;
  specifications: string[];
  image: string;
  badge: string;
}

const PROVENANCE_CHAPTERS: ProvenanceChapter[] = [
  {
    id: 1,
    location: 'Surat, Gujarat',
    coords: '21.1702° N, 72.8311° E',
    stageName: 'Chapter I: The Rough Crystal Sourcing',
    headline: 'Conflict-Free Rough Diamond Selection',
    description: 'Every diamond starts at the world center of diamond manufacturing in Surat. Only the top 1% of rough octahedral crystals with pristine natural lattice purity and zero internal strain are selected under 40x stereoscopic gemological microscopes.',
    specifications: ['100% Kimberley Process Compliant', 'Ethical Provenance Tracking', 'Natural Geological Formation (>1 Billion Years)'],
    image: '/images/products/classic-solitaire.webp',
    badge: 'SURAT CRYSTAL GRADING',
  },
  {
    id: 2,
    location: 'Antwerp, Belgium',
    coords: '51.2194° N, 4.4025° E',
    stageName: 'Chapter II: The Diamond Bourse & Faceting',
    headline: 'Tolkowsky Ideal Optical Mathematical Cut',
    description: 'Transported to the historic diamond district in Antwerp for precision 3D computer tomography planning. Each rough diamond is cleaved via sub-nanosecond lasers and faceted to the exact 57-facet Marcel Tolkowsky proportions for zero optical leakage.',
    specifications: ['Tolkowsky 1919 Ideal Proportion', 'Zero Light Leakage Reflection', 'Triple Excellent (3EX) Symmetry'],
    image: '/images/details/brilliant-cut.webp',
    badge: 'ANTWERP OPTIC CALCULATION',
  },
  {
    id: 3,
    location: 'Mumbai Atelier, Maharashtra',
    coords: '18.9220° N, 72.8346° E',
    stageName: 'Chapter III: Master Goldsmithing & Setting',
    headline: 'Solid 18K Casting & Microscopic Pavé Seating',
    description: 'Our generational karigars in Mumbai cast certified 18K solid gold under controlled vacuum furnaces. Each side pavé diamond is seated under 40x binocular lenses with sub-micron claw clearance to guarantee lifetime durability.',
    specifications: ['Solid 18K Gold Bullion Casting', 'Microscopic Binocular Prong Seating', 'Mirror-Polish Interior Comfort-Fit'],
    image: '/images/products/custom-design-ring.webp',
    badge: 'MUMBAI MASTER KARIGARS',
  },
  {
    id: 4,
    location: 'Swiss Horology Chapter, Geneva',
    coords: '46.2044° N, 6.1432° E',
    stageName: 'Chapter IV: Laser Hallmarking & Vault Presentation',
    headline: 'Strictly Numbered Batch Allocation (N°250)',
    description: 'Before release, each masterpiece receives microscopic laser serial hallmarking alongside BIS 750 gold purity stamps. Encased in handcrafted solid American walnut boxes accompanied by its numbered commemorative coin and gemological dossier.',
    specifications: ['Strict Archival Allocation (#/250)', 'BIS 750 Hallmarked & IGI Certified', 'Solid Walnut Heirloom Presentation'],
    image: '/images/hero/hero-slide-3.webp',
    badge: 'LIMITED ARCHIVAL VAULT',
  },
];

export const PinnedHorizontalProvenance: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
    mass: 0.15,
  });

  // Sideways layer clips
  // Chapter 2 clips in from 0.22 to 0.48
  const clipLayer2 = useTransform(smoothProgress, [0.22, 0.48], ['inset(0 0 0 100%)', 'inset(0 0 0 0%)']);
  const lineLayer2 = useTransform(smoothProgress, [0.22, 0.48], ['100%', '0%']);
  const opacityLine2 = useTransform(smoothProgress, [0.21, 0.23, 0.47, 0.49], [0, 1, 1, 0]);

  // Chapter 3 clips in from 0.50 to 0.74
  const clipLayer3 = useTransform(smoothProgress, [0.50, 0.74], ['inset(0 0 0 100%)', 'inset(0 0 0 0%)']);
  const lineLayer3 = useTransform(smoothProgress, [0.50, 0.74], ['100%', '0%']);
  const opacityLine3 = useTransform(smoothProgress, [0.49, 0.51, 0.73, 0.75], [0, 1, 1, 0]);

  // Chapter 4 clips in from 0.76 to 0.98
  const clipLayer4 = useTransform(smoothProgress, [0.76, 0.98], ['inset(0 0 0 100%)', 'inset(0 0 0 0%)']);
  const lineLayer4 = useTransform(smoothProgress, [0.76, 0.98], ['100%', '0%']);
  const opacityLine4 = useTransform(smoothProgress, [0.75, 0.77, 0.97, 0.99], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[360vh] w-full bg-[#170C06]">
      {/* Pinned Sticky Stage (100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 select-none z-10">
        {/* Top Radar Bar */}
        <div className="relative z-50 max-w-[1536px] w-full mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between border-b border-[#C99A54]/25 pb-3 sm:pb-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C99A54] animate-spin [animation-duration:12s] shrink-0" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#E7C58A] font-mono truncate">
              STAGE II • ARTISANAL PROVENANCE
            </span>
          </div>

          {/* Golden Step Indicators */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {PROVENANCE_CHAPTERS.map((ch) => (
              <div key={ch.id} className="flex items-center space-x-1 sm:space-x-1.5 text-[9px] sm:text-[10px] font-mono text-[#F8F2E9]/70">
                <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-[#C99A54]/40 flex items-center justify-center text-[8px] sm:text-[9px] text-[#E7C58A]">
                  0{ch.id}
                </span>
                <span className="hidden sm:inline uppercase text-[#E7C58A]">{ch.location.split(',')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* The 4 Stacking Clipping Layers */}
        <div className="relative flex-1 w-full overflow-hidden my-auto">
          {/* ========================================================================= */}
          {/* LAYER 1: SURAT (Base Layer)                                               */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 h-full w-full flex items-center justify-center px-4 sm:px-6 md:px-12">
            <ChapterCard chapter={PROVENANCE_CHAPTERS[0]} />
          </div>

          {/* ========================================================================= */}
          {/* LAYER 2: ANTWERP (Clips in from right)                                    */}
          {/* ========================================================================= */}
          <motion.div
            style={{ clipPath: clipLayer2 }}
            className="absolute inset-0 h-full w-full bg-[#1a0c06] flex items-center justify-center px-4 sm:px-6 md:px-12 will-change-transform z-20 shadow-2xl"
          >
            <ChapterCard chapter={PROVENANCE_CHAPTERS[1]} />
          </motion.div>
          <motion.div
            style={{ left: lineLayer2, opacity: opacityLine2 }}
            className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-[#E7C58A] to-transparent pointer-events-none z-25 shadow-[0_0_15px_#C99A54]"
          />

          {/* ========================================================================= */}
          {/* LAYER 3: MUMBAI (Clips in from right)                                     */}
          {/* ========================================================================= */}
          <motion.div
            style={{ clipPath: clipLayer3 }}
            className="absolute inset-0 h-full w-full bg-[#170a04] flex items-center justify-center px-4 sm:px-6 md:px-12 will-change-transform z-30 shadow-2xl"
          >
            <ChapterCard chapter={PROVENANCE_CHAPTERS[2]} />
          </motion.div>
          <motion.div
            style={{ left: lineLayer3, opacity: opacityLine3 }}
            className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-[#E7C58A] to-transparent pointer-events-none z-35 shadow-[0_0_15px_#C99A54]"
          />

          {/* ========================================================================= */}
          {/* LAYER 4: GENEVA / SWISS (Clips in from right)                             */}
          {/* ========================================================================= */}
          <motion.div
            style={{ clipPath: clipLayer4 }}
            className="absolute inset-0 h-full w-full bg-[#150702] flex items-center justify-center px-4 sm:px-6 md:px-12 will-change-transform z-40 shadow-2xl"
          >
            <ChapterCard chapter={PROVENANCE_CHAPTERS[3]} />
          </motion.div>
          <motion.div
            style={{ left: lineLayer4, opacity: opacityLine4 }}
            className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-[#E7C58A] to-transparent pointer-events-none z-45 shadow-[0_0_15px_#C99A54]"
          />
        </div>

        {/* Bottom Footnote */}
        <div className="relative z-50 max-w-[1536px] w-full mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between text-[9px] sm:text-[10px] text-[#71665C] font-mono border-t border-[#C99A54]/25 pt-2.5 sm:pt-3">
          <span>CHAPTER • 02 OF 03</span>
          <span className="text-[#E7C58A]">SCROLL TO REVEAL</span>
        </div>
      </div>
    </div>
  );
};

// Reusable Chapter Presentation Card
const ChapterCard: React.FC<{ chapter: ProvenanceChapter }> = ({ chapter }) => {
  return (
    <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-center bg-[#201007]/90 border border-[#C99A54]/30 p-4 sm:p-6 md:p-10 rounded-xs shadow-2xl">
      {/* Visual Photography */}
      <div className="lg:col-span-5 relative max-h-[170px] sm:max-h-[240px] lg:max-h-none aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-xs border border-[#C99A54]/30 group mx-auto w-full">
        <img
          src={chapter.image}
          alt={chapter.headline}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        />
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 sm:px-3 sm:py-1 bg-black/85 backdrop-blur-xs text-[8px] sm:text-[9px] font-mono tracking-widest text-[#E7C58A] uppercase border border-[#C99A54]/30">
          {chapter.badge}
        </div>
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between px-2.5 py-1 bg-black/80 backdrop-blur-xs border border-[#C99A54]/30 text-[9px] sm:text-[10px] font-mono text-[#E7C58A]">
          <span className="flex items-center space-x-1.5">
            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C99A54]" />
            <span className="truncate max-w-[120px] sm:max-w-none">{chapter.location}</span>
          </span>
          <span className="opacity-75 hidden xs:inline">{chapter.coords}</span>
        </div>
      </div>

      {/* Chapter Text Dossier */}
      <div className="lg:col-span-7 space-y-2.5 sm:space-y-4 text-left">
        <div>
          <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#C99A54] block font-mono">
            {chapter.stageName}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl md:text-4xl text-[#F8F2E9] font-normal leading-tight mt-0.5 sm:mt-1">
            {chapter.headline}
          </h3>
          <p className="text-xs sm:text-sm text-[#F8F2E9]/80 font-light leading-relaxed mt-1.5 sm:mt-3 line-clamp-2 sm:line-clamp-none">
            {chapter.description}
          </p>
        </div>

        {/* Specifications Pills */}
        <div className="pt-2 space-y-1.5 sm:space-y-2 border-t border-[#C99A54]/20">
          <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#E7C58A] font-mono block">
            VERIFIED GEOLOGICAL & ATELIER PROTOCOLS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
            {chapter.specifications.map((spec, i) => (
              <div key={i} className="flex items-center space-x-2 text-[11px] sm:text-xs text-[#F8F2E9]/90 font-light">
                <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C99A54] shrink-0" />
                <span className="truncate">{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
