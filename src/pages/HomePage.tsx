import React, { useEffect } from 'react';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { CollectionCards } from '../components/home/CollectionCards';
import { BrandPromises } from '../components/home/BrandPromises';
import { CuratedBestsellers } from '../components/home/CuratedBestsellers';
import { BespokeSerialStudio } from '../components/interactive/BespokeSerialStudio';
import { Ring360Inspector } from '../components/interactive/Ring360Inspector';
import { DiamondLightSimulator } from '../components/interactive/DiamondLightSimulator';
import { InteractiveRingStudio } from '../components/interactive/InteractiveRingStudio';
import { SmartRingCalibrator } from '../components/interactive/SmartRingCalibrator';
import { ArtisanalProvenanceJourney } from '../components/interactive/ArtisanalProvenanceJourney';
import { Gemological4CExplorer } from '../components/interactive/Gemological4CExplorer';
import { RingStackerStudio } from '../components/interactive/RingStackerStudio';
import { AtelierReviewsShowcase } from '../components/home/AtelierReviewsShowcase';
import { InteractiveVaultShowcase } from '../components/effects/InteractiveVaultShowcase';
import { ScrollParallaxText } from '../components/effects/ScrollParallaxText';
import { ScrollMetricCounter } from '../components/interactive/ScrollMetricCounter';
import { DiamondMetamorphosisSlider } from '../components/interactive/DiamondMetamorphosisSlider';
import { ScrollReveal } from '../components/effects/ScrollReveal';

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'DIVA JEWELLERS — Timeless Ring Stories & Fine Luxury Jewellery';
  }, []);

  return (
    <main className="w-full overflow-hidden relative">
      {/* 1. Cinematic Hero Carousel with Staggered Framer Motion & Ken-Burns Zoom */}
      <HeroCarousel />

      {/* Parallax Background Typography Ribbon (Seamless Infinite Marquee) */}
      <ScrollParallaxText
        text="DIVA ATELIER • GENEVA & SURAT • LIMITED CHAPTER 250 • SOLID 18K GOLD"
        speed={0.15}
        direction="left"
        className="text-6xl sm:text-8xl md:text-9xl py-4 select-none"
      />

      {/* 2. Curated Ring Collection Categories with 3D Tilt & Holographic Flare */}
      <ScrollReveal direction="up" delay={40}>
        <CollectionCards />
      </ScrollReveal>

      {/* 3. Archival Vault Ribbon (Velocity Horizontal Scroll & 3D Tilt) */}
      <ScrollReveal direction="up" delay={40}>
        <InteractiveVaultShowcase />
      </ScrollReveal>

      {/* 4. Atelier Metamorphosis Split Drag Slider (Rough Earth to 18K Solitaire) */}
      <ScrollReveal direction="up" delay={40}>
        <DiamondMetamorphosisSlider />
      </ScrollReveal>

      {/* 5. Master Diamond 4Cs Gemological Laboratory (Interactive Carat, Cut, Color, Clarity) */}
      <ScrollReveal direction="up" delay={40}>
        <Gemological4CExplorer />
      </ScrollReveal>

      {/* 6. CZARD-Inspired Limited Chapter & Live Laser Engraving Studio */}
      <ScrollReveal direction="up" delay={40}>
        <BespokeSerialStudio />
      </ScrollReveal>

      {/* 7. Technical Specifications & Precision Metric Counters (Scroll-Animated) */}
      <ScrollReveal direction="up" delay={40}>
        <ScrollMetricCounter />
      </ScrollReveal>

      {/* Parallax Background Typography Ribbon */}
      <ScrollParallaxText
        text="SUB-MICRON LASER HALLMARK • BIS 750 • IGI NATURAL DIAMONDS • HEIRLOOM COIN"
        speed={0.2}
        direction="right"
        className="text-6xl sm:text-8xl md:text-9xl py-4 select-none"
      />

      {/* 8. Interactive 360° Ring Turntable & Anatomy Hotspot Inspector */}
      <ScrollReveal direction="up" delay={40}>
        <Ring360Inspector />
      </ScrollReveal>

      {/* 9. Interactive Diamond Light & Nocturnal Lume Simulator */}
      <ScrollReveal direction="up" delay={40}>
        <DiamondLightSimulator />
      </ScrollReveal>

      {/* 10. Bespoke Ring Customizer & Hand Scale Preview */}
      <ScrollReveal direction="up" delay={40}>
        <InteractiveRingStudio />
      </ScrollReveal>

      {/* 11. Bespoke Ring Stacking Studio (Curate 3-piece Solitaire + Band + Tiara suites) */}
      <ScrollReveal direction="up" delay={40}>
        <RingStackerStudio />
      </ScrollReveal>

      {/* 12. Artisanal Provenance Journey (Surat -> Antwerp -> Mumbai) */}
      <ScrollReveal direction="up" delay={40}>
        <ArtisanalProvenanceJourney />
      </ScrollReveal>

      {/* 13. Smart On-Screen Ring Sizing Calibrator & Quiz */}
      <ScrollReveal direction="up" delay={40}>
        <SmartRingCalibrator />
      </ScrollReveal>

      {/* 14. Verified Patron Chronicles & Proposal Lightbox Showcase */}
      <ScrollReveal direction="up" delay={40}>
        <AtelierReviewsShowcase />
      </ScrollReveal>

      {/* 15. Brand Promises */}
      <BrandPromises />

      {/* 16. Curated Masterpieces / Bestsellers */}
      <CuratedBestsellers />
    </main>
  );
};
