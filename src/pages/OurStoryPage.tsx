import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArtisanalProvenanceJourney } from '../components/interactive/ArtisanalProvenanceJourney';
import { BespokeSerialStudio } from '../components/interactive/BespokeSerialStudio';
import { ScrollMetricCounter } from '../components/interactive/ScrollMetricCounter';
import { ScrollReveal } from '../components/effects/ScrollReveal';

export const OurStoryPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Our Story & Provenance — VALERIE JEWELLERS';
  }, []);

  return (
    <main className="bg-[#F8F2E9] min-h-screen pt-24 sm:pt-28 md:pt-32 pb-24 text-[#18130F]">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-2 text-[11px] md:text-xs text-[#71665C] mb-6 sm:mb-8 font-light"
        >
          <Link to="/" className="hover:text-[#170C06] transition-colors">
            Home
          </Link>
          <span className="text-[#C99A54]">&gt;</span>
          <span className="text-[#170C06] font-medium">Our Story</span>
        </nav>

        {/* Hero Banner */}
        <div className="relative h-[260px] sm:h-[340px] md:h-[420px] bg-[#170C06] overflow-hidden border border-[#C99A54]/30 mb-12 sm:mb-16 flex items-center justify-center text-center p-4 sm:p-8">
          <img
            src="/images/products/custom-design-ring.webp"
            alt="VALERIE Jewellers Heritage Atelier"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="relative z-10 max-w-2xl text-[#F8F2E9] space-y-2.5 sm:space-y-4">
            <span className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.35em] text-[#E7C58A] uppercase font-medium">
              HERITAGE & VISION
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal leading-tight">
              A Legacy of Brilliance, Carved by Passion
            </h1>
            <p className="text-xs sm:text-sm text-[#F8F2E9]/80 font-light max-w-lg mx-auto leading-relaxed">
              Founded on the belief that jewellery is not an accessory, but a timeless vessel for life’s most profound human emotions.
            </p>
          </div>
        </div>

        {/* Editorial Narrative */}
        <ScrollReveal direction="up" delay={50}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs tracking-[0.25em] text-[#C99A54] uppercase font-medium">
                ESTABLISHED IN MUMBAI
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#170C06] leading-snug">
                Three Generations of Discerning Artistry
              </h2>
              <p className="text-xs sm:text-sm text-[#71665C] leading-relaxed">
                For over three decades, VALERIE JEWELLERS has redefined luxury fine jewellery in India. We combine royal Mughal-era artisanal metalwork with contemporary European minimalism to sculpt rings that stand outside the whims of passing trends.
              </p>
              <p className="text-xs sm:text-sm text-[#71665C] leading-relaxed">
                Every diamond selected for our engagement and ceremonial rings is individually inspected by certified gemologists for optical brilliance, fire, and cut precision before our master bench jewelers set a single prong.
              </p>
            </div>
            <div className="lg:col-span-6">
              <img
                src="/images/products/classic-solitaire.webp"
                alt="Classic Diamond Craft"
                className="w-full aspect-[4/3] object-cover border border-[#C99A54]/30 shadow-md"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Technical Horological Rigor & Metrics */}
        <div className="mb-20">
          <ScrollMetricCounter />
        </div>

        {/* Interactive Provenance Journey */}
        <div className="mb-20">
          <ScrollReveal direction="up" delay={50}>
            <ArtisanalProvenanceJourney />
          </ScrollReveal>
        </div>

        {/* Limited Chapters & Laser Hallmark System */}
        <div className="mb-20">
          <ScrollReveal direction="up" delay={50}>
            <BespokeSerialStudio />
          </ScrollReveal>
        </div>

        {/* Core Pillars */}
        <div className="bg-[#170C06] text-[#F8F2E9] p-8 md:p-14 border border-[#C99A54]/30">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs tracking-[0.3em] text-[#E7C58A] uppercase block mb-1">OUR PHILOSOPHY</span>
            <h3 className="font-serif text-2xl sm:text-3xl">Pillars of VALERIE</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2 border-l border-[#C99A54]/30 pl-4">
              <span className="text-xs text-[#E7C58A] font-mono">01</span>
              <h4 className="font-serif text-lg">Conflict-Free Provenance</h4>
              <p className="text-xs text-[#71665C] leading-relaxed">
                We only source natural diamonds through Kimberley Process compliant channels, upholding supreme ethical integrity.
              </p>
            </div>
            <div className="space-y-2 border-l border-[#C99A54]/30 pl-4">
              <span className="text-xs text-[#E7C58A] font-mono">02</span>
              <h4 className="font-serif text-lg">Solid 18K Metallurgy</h4>
              <p className="text-xs text-[#71665C] leading-relaxed">
                Engineered with bespoke alloy mixes of 75% pure gold to guarantee lasting durability, warm luster, and skin comfort.
              </p>
            </div>
            <div className="space-y-2 border-l border-[#C99A54]/30 pl-4">
              <span className="text-xs text-[#E7C58A] font-mono">03</span>
              <h4 className="font-serif text-lg">Eternal Care</h4>
              <p className="text-xs text-[#71665C] leading-relaxed">
                A ring from VALERIE carries our commitment for a lifetime. Complimentary maintenance, sizing, and inspection forever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
