import React, { useEffect, useState } from 'react';
import { LuxuryPreloader } from '../components/effects/LuxuryPreloader';
import { HeroAtelierSection } from '../components/home/HeroAtelierSection';
import { PinnedHorizontalVault } from '../components/home/PinnedHorizontalVault';
import { ScrollMetricCounter } from '../components/interactive/ScrollMetricCounter';
import { PinnedHorizontalProvenance } from '../components/home/PinnedHorizontalProvenance';
import { DiamondMetamorphosisSlider } from '../components/interactive/DiamondMetamorphosisSlider';
import { Gemological4CExplorer } from '../components/interactive/Gemological4CExplorer';
import { PinnedHorizontalReviews } from '../components/home/PinnedHorizontalReviews';
import { RingStackerStudio } from '../components/interactive/RingStackerStudio';
import { BrandPromises } from '../components/home/BrandPromises';
import { AtelierConciergeBanner } from '../components/home/AtelierConciergeBanner';

export const HomePage: React.FC = () => {
  const [isPreloaded, setIsPreloaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'VALERIE JEWELLERS — Timeless Ring Stories & Fine Luxury Jewellery';
  }, []);

  return (
    <main className="w-full relative bg-[#170C06] overflow-x-clip">
      {/* 1. Cinematic Luxury Preloader with Diamond Geometry & Curtain Wipe */}
      {!isPreloaded && (
        <LuxuryPreloader onComplete={() => setIsPreloaded(true)} durationMs={2200} />
      )}

      {/* 2. [VERTICAL] Chapter 01: Haute Atelier Hero Stage */}
      <HeroAtelierSection />

      {/* 3. [HORIZONTAL PINNED] Chapter 02: Royal Ring Vault (Sticks to screen & glides horizontally, then unpins) */}
      <PinnedHorizontalVault />

      {/* 4. [VERTICAL] Chapter 03: Haute Joaillerie Architectural Blueprint Standards */}
      <ScrollMetricCounter />

      {/* 5. [HORIZONTAL PINNED] Chapter 04: Artisanal Provenance Journey (Sticks to screen & clips sideways, then unpins) */}
      <PinnedHorizontalProvenance />

      {/* 6. [VERTICAL] Chapter 05: Earth-to-Brilliance Split Metamorphosis */}
      <DiamondMetamorphosisSlider />

      {/* 7. [VERTICAL] Chapter 06: Master Gemological 4Cs Laboratory */}
      <Gemological4CExplorer />

      {/* 8. [HORIZONTAL PINNED] Chapter 07: Patron Chronicles & Heirloom Testimonials (Sticks to screen & slides horizontally, then unpins) */}
      <PinnedHorizontalReviews />

      {/* 9. [VERTICAL] Chapter 08: Interactive 3-Tier Ring Stacker Studio */}
      <RingStackerStudio />

      {/* 10. [VERTICAL] Chapter 09: Brand Guarantees & Private Atelier Concierge */}
      <BrandPromises />
      <AtelierConciergeBanner />
    </main>
  );
};

export default HomePage;
