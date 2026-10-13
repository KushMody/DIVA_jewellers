import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Compass, Sparkles, Feather } from 'lucide-react';
import { Ring360Inspector } from '../components/interactive/Ring360Inspector';
import { DiamondLightSimulator } from '../components/interactive/DiamondLightSimulator';
import { InteractiveRingStudio } from '../components/interactive/InteractiveRingStudio';
import { ArtisanalProvenanceJourney } from '../components/interactive/ArtisanalProvenanceJourney';
import { DiamondMetamorphosisSlider } from '../components/interactive/DiamondMetamorphosisSlider';
import { ScrollMetricCounter } from '../components/interactive/ScrollMetricCounter';
import { ScrollReveal } from '../components/effects/ScrollReveal';

export const CraftsmanshipPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Craftsmanship & Metallurgy — DIVA JEWELLERS';
  }, []);

  return (
    <main className="bg-[#F8F2E9] min-h-screen pt-24 md:pt-32 pb-24 text-[#18130F]">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-2 text-[11px] md:text-xs text-[#71665C] mb-8 font-light"
        >
          <Link to="/" className="hover:text-[#170C06] transition-colors">
            Home
          </Link>
          <span className="text-[#C99A54]">&gt;</span>
          <span className="text-[#170C06] font-medium">Craftsmanship</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs tracking-[0.3em] text-[#C99A54] uppercase font-medium block mb-2 font-mono">
            THE ART OF METICULOUS PERFECTION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#170C06] font-normal tracking-wide">
            Master Craftsmanship & Metallurgy
          </h1>
          <p className="text-xs sm:text-sm text-[#71665C] font-light leading-relaxed mt-3">
            Every ring at DIVA undergoes more than 40 hours of meticulous hand-finishing, microscopic stone calibration, and rigorous quality inspection.
          </p>

          <div className="flex items-center justify-center space-x-3 mt-4">
            <div className="w-12 h-[1px] bg-[#C99A54]/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C99A54] bg-[#F8F2E9]" />
            <div className="w-12 h-[1px] bg-[#C99A54]/40" />
          </div>
        </div>

        {/* Step-by-Step Atelier Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/80 border border-[#C99A54]/25 p-6 space-y-4">
            <Feather className="w-8 h-8 text-[#C99A54]" />
            <h3 className="font-serif text-lg text-[#170C06]">1. Hand Drafting & Gouache</h3>
            <p className="text-xs text-[#71665C] leading-relaxed">
              Conceptualization begins on parchment with precision proportions, mapping center stone light refraction and ergonomic balance.
            </p>
          </div>

          <div className="bg-white/80 border border-[#C99A54]/25 p-6 space-y-4">
            <Compass className="w-8 h-8 text-[#C99A54]" />
            <h3 className="font-serif text-lg text-[#170C06]">2. 3D Precision Matrix</h3>
            <p className="text-xs text-[#71665C] leading-relaxed">
              Micron-accurate CAD modeling determines exact metal shrinkage, seat angles, and prong curvatures for eternal diamond security.
            </p>
          </div>

          <div className="bg-white/80 border border-[#C99A54]/25 p-6 space-y-4">
            <Sparkles className="w-8 h-8 text-[#C99A54]" />
            <h3 className="font-serif text-lg text-[#170C06]">3. Microscopic Setting</h3>
            <p className="text-xs text-[#71665C] leading-relaxed">
              Under 40x optical microscopes, master setters seat every pavé diamond into hand-cut beads with surgical precision.
            </p>
          </div>

          <div className="bg-white/80 border border-[#C99A54]/25 p-6 space-y-4">
            <Award className="w-8 h-8 text-[#C99A54]" />
            <h3 className="font-serif text-lg text-[#170C06]">4. Final Mirror Polish</h3>
            <p className="text-xs text-[#71665C] leading-relaxed">
              Six stages of progressive diamond paste polishing bring forth the unmistakable warm luster of solid 18K gold.
            </p>
          </div>
        </div>

        {/* Interactive 360 Turntable */}
        <div className="mb-16">
          <ScrollReveal direction="up" delay={50}>
            <Ring360Inspector />
          </ScrollReveal>
        </div>

        {/* Metamorphosis Slider */}
        <div className="mb-16">
          <ScrollReveal direction="up" delay={50}>
            <DiamondMetamorphosisSlider />
          </ScrollReveal>
        </div>

        {/* Technical Horological Rigor & Metrics */}
        <div className="mb-16">
          <ScrollMetricCounter />
        </div>

        {/* Interactive Diamond Light Simulator */}
        <div className="mb-16">
          <ScrollReveal direction="up" delay={50}>
            <DiamondLightSimulator />
          </ScrollReveal>
        </div>

        {/* Interactive Customizer Studio */}
        <div className="mb-16">
          <ScrollReveal direction="up" delay={50}>
            <InteractiveRingStudio />
          </ScrollReveal>
        </div>

        {/* Provenance Story */}
        <div className="mb-16">
          <ScrollReveal direction="up" delay={50}>
            <ArtisanalProvenanceJourney />
          </ScrollReveal>
        </div>

        {/* Metallurgy Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#170C06] text-[#F8F2E9] p-8 md:p-14 border border-[#C99A54]/30">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs tracking-[0.25em] text-[#E7C58A] uppercase font-medium">
              SIGNATURE METALLURGY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-snug">
              The 18K Gold Standard
            </h2>
            <p className="text-xs sm:text-sm text-[#71665C] leading-relaxed">
              We exclusively use 18 Karat gold (750 purity). Pure 24K gold is too soft for secure gem-setting, while 14K lacks the depth of color. Our custom alloy blends ensure rich rose, yellow, and white golds that remain nickel-free and hypoallergenic.
            </p>
            <div className="pt-2">
              <Link
                to="/collections/custom-design"
                className="inline-flex items-center space-x-2 text-xs tracking-widest text-[#E7C58A] hover:text-white uppercase font-medium"
              >
                <span>BOOK A CUSTOM CONSULTATION</span>
                <span>→</span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <img
              src="/images/categories/wedding-bands.webp"
              alt="18K Gold Craftsmanship"
              className="w-full aspect-[16/9] object-cover border border-[#C99A54]/30"
            />
          </div>
        </div>
      </div>
    </main>
  );
};
