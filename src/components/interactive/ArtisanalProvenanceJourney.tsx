import React, { useState, useEffect } from 'react';
import { Compass, MapPin, ChevronRight, Play, Pause } from 'lucide-react';

interface ProvenanceChapter {
  id: number;
  location: string;
  coords: string;
  stageName: string;
  headline: string;
  description: string;
  specifications: string[];
  image: string;
  tag: string;
}

const CHAPTERS: ProvenanceChapter[] = [
  {
    id: 1,
    location: 'Surat, Gujarat',
    coords: '21.1702° N, 72.8311° E',
    stageName: 'Chapter I: The Rough Crystal Sourcing',
    headline: 'Conflict-Free Rough Diamond Selection',
    description: 'Every diamond starts at the world center of diamond manufacturing in Surat. Only the top 1% of rough octahedral crystals with pristine natural lattice purity and zero strain are selected under 40x stereoscopic gemological microscopes.',
    specifications: ['100% Kimberley Process Compliant', 'Ethical Provenance Tracking', 'Natural Geological Formation (>1 Billion Years)'],
    image: '/images/categories/engagement-rings.webp',
    tag: 'ORIGIN & INTEGRITY',
  },
  {
    id: 2,
    location: 'Antwerp & IGI Laboratory',
    coords: '51.2194° N, 4.4025° E',
    stageName: 'Chapter II: Optical Cut & Certification',
    headline: 'Triple Excellent Laser Polishing',
    description: 'Master polishers align 57 facets with sub-micron tolerances, ensuring total internal light refraction. The finished stones are laser-inscribed with a unique serial number and verified by independent gemological laboratories (IGI & SGL).',
    specifications: ['Triple Excellent (Cut, Polish, Symmetry)', 'Flawless Hearts & Arrows Pattern', 'Individual Laser Inscription on Girdle'],
    image: '/images/details/brilliant-cut.webp',
    tag: 'PRECISION METRICS',
  },
  {
    id: 3,
    location: 'Mumbai Atelier',
    coords: '18.9220° N, 72.8347° E',
    stageName: 'Chapter III: Master Hand-Alloying & Setting',
    headline: 'Solid 18K Gold Forging & Microscope Mount',
    description: 'At our Mumbai atelier in Zaveri Bazaar, 24K gold is alloyed with pure copper and silver to achieve our proprietary 18K warm rose and yellow gold tones. Master setters hand-burnish each prong and set the secret under-gallery halo under high-magnification microscopes.',
    specifications: ['BIS 750 Hallmarked Solid Gold', '40+ Hours Master Bench Goldsmithing', 'Ergonomic Cathedral Shank Forging'],
    image: '/images/details/twisted-design.webp',
    tag: 'METALLURGY & CRAFT',
  },
  {
    id: 4,
    location: 'Private Salon & Vault Dispatch',
    coords: 'Pan-India Insured Transit',
    stageName: 'Chapter IV: Heirloom Vault Presentation',
    headline: 'Numbered Keepsake Coin & Sealed Vault Box',
    description: 'Every piece is nestled inside a solid walnut presentation box accompanied by its matching serialized brass keepsake coin, physical gemological certificate, and individual salon ledger documentation, delivered with tamper-proof armored logistics.',
    specifications: ['Numbered Commemorative Chapter Coin', 'Hardbound Provenance Certificate', '100% Insured Armored Doorstep Delivery'],
    image: '/images/categories/custom-design.webp',
    tag: 'LIFETIME HEIRLOOM',
  },
];

export const ArtisanalProvenanceJourney: React.FC = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const currentChapter = CHAPTERS[activeChapterIndex];

  // Auto-advance chapters
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveChapterIndex((prev) => (prev + 1) % CHAPTERS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const selectChapter = (idx: number) => {
    setActiveChapterIndex(idx);
    setIsPlaying(false);
  };

  return (
    <section className="bg-[#170C06] text-[#F8F2E9] py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-[#C99A54]/25 relative overflow-hidden">
      {/* Background Subtle Map Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C99A54_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-[1536px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#28160D] border border-[#C99A54]/40 rounded-full text-[10px] tracking-[0.25em] text-[#E7C58A] uppercase mb-4">
            <Compass className="w-3.5 h-3.5 text-[#C99A54]" />
            <span>CZARD-INSPIRED GLOBAL ARTISANAL PROVENANCE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F8F2E9] font-normal tracking-wide">
            The Journey of Origin: Surat to Mumbai Atelier
          </h2>

          <p className="text-xs sm:text-sm text-[#F8F2E9]/75 font-light leading-relaxed mt-3 max-w-2xl mx-auto">
            Trace the chronological creation of your ring from geological crystal extraction to Antwerp lab grading, traditional Mumbai goldsmithing, and vault presentation.
          </p>

          <div className="flex items-center justify-center space-x-3 mt-5">
            <div className="w-16 h-[1px] bg-[#C99A54]/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C99A54] bg-[#170C06]" />
            <div className="w-16 h-[1px] bg-[#C99A54]/40" />
          </div>
        </div>

        {/* Timeline Navigation Bar */}
        <div className="flex items-center justify-between border-b border-[#C99A54]/25 pb-4 mb-10 overflow-x-auto">
          <div className="flex items-center space-x-4 sm:space-x-8 min-w-max">
            {CHAPTERS.map((ch, idx) => {
              const isActive = activeChapterIndex === idx;
              return (
                <button
                  key={ch.id}
                  onClick={() => selectChapter(idx)}
                  className={`flex items-center space-x-2.5 text-xs tracking-wider transition-all cursor-pointer py-1 ${
                    isActive ? 'text-[#E7C58A] font-semibold' : 'text-[#F8F2E9]/50 hover:text-[#F8F2E9]'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono border ${
                      isActive
                        ? 'border-[#C99A54] bg-[#C99A54] text-[#170C06] font-bold'
                        : 'border-[#C99A54]/30 text-[#C99A54]'
                    }`}
                  >
                    0{ch.id}
                  </span>
                  <span className="uppercase">{ch.location}</span>
                </button>
              );
            })}
          </div>

          {/* Autoplay Controls */}
          <div className="hidden md:flex items-center space-x-3 pl-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-1.5 bg-[#201007] border border-[#C99A54]/30 px-2.5 py-1 text-[10px] text-[#E7C58A] rounded-2xs hover:border-[#C99A54]"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>
          </div>
        </div>

        {/* Chapter Presentation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#201007]/80 border border-[#C99A54]/25 p-6 sm:p-10 rounded-xs shadow-2xl">
          {/* Photography with Location Stamp */}
          <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-xs border border-[#C99A54]/30 group">
            <img
              src={currentChapter.image}
              alt={currentChapter.headline}
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            {/* Location coordinates overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-[#F8F2E9] z-10">
              <span className="flex items-center space-x-1 text-[#E7C58A] font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#C99A54]" />
                <span>{currentChapter.location}</span>
              </span>
              <span className="font-mono text-[#C99A54] text-[10px]">{currentChapter.coords}</span>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#C99A54] uppercase font-mono block mb-1">
                {currentChapter.tag}
              </span>
              <span className="text-xs text-[#E7C58A] font-mono block mb-2">
                {currentChapter.stageName}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F8F2E9] font-normal leading-tight">
                {currentChapter.headline}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#F8F2E9]/80 font-light leading-relaxed">
              {currentChapter.description}
            </p>

            {/* Checklist Specifications */}
            <div className="space-y-2 pt-2 border-t border-[#C99A54]/20">
              {currentChapter.specifications.map((spec, i) => (
                <div key={i} className="flex items-center space-x-2 text-xs text-[#F8F2E9]/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C99A54] shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            {/* Next Chapter Button */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => selectChapter((activeChapterIndex + 1) % CHAPTERS.length)}
                className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase text-[#E7C58A] hover:text-[#FFF] transition-colors"
              >
                <span>NEXT PROVENANCE STAGE</span>
                <ChevronRight className="w-4 h-4 text-[#C99A54]" />
              </button>

              <span className="text-xs font-mono text-[#71665C]">
                0{activeChapterIndex + 1} / 0{CHAPTERS.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
