import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductGallery } from '../components/pdp/ProductGallery';
import { ProductInfo } from '../components/pdp/ProductInfo';
import { ProductTabs } from '../components/pdp/ProductTabs';
import { RecommendedProducts } from '../components/pdp/RecommendedProducts';
import { StickyMobilePDPBar } from '../components/pdp/StickyMobilePDPBar';
import { BespokeSerialStudio } from '../components/interactive/BespokeSerialStudio';
import { Ring360Inspector } from '../components/interactive/Ring360Inspector';
import { DiamondLightSimulator } from '../components/interactive/DiamondLightSimulator';
import { SmartRingCalibrator } from '../components/interactive/SmartRingCalibrator';
import { Gemological4CExplorer } from '../components/interactive/Gemological4CExplorer';
import { ScrollReveal } from '../components/effects/ScrollReveal';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find product by slug or default to featured solitaire-twisted-band
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${product.name} — VALERIE JEWELLERS`;
  }, [product, slug]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="font-serif text-3xl mb-4 text-[#170C06]">Jewel Not Found</h2>
        <button
          onClick={() => navigate('/rings')}
          className="px-6 py-2.5 border border-[#C99A54] text-xs uppercase tracking-widest text-[#170C06]"
        >
          Return to Collections
        </button>
      </div>
    );
  }

  return (
    <main className="bg-[#F8F2E9] min-h-screen pt-24 sm:pt-28 md:pt-32 pb-24">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-2 text-[11px] md:text-xs text-[#71665C] mb-6 md:mb-8 font-light overflow-x-auto whitespace-nowrap pb-1"
        >
          <Link to="/" className="hover:text-[#170C06] transition-colors">
            Home
          </Link>
          <span className="text-[#C99A54]">&gt;</span>
          <Link to="/rings" className="hover:text-[#170C06] transition-colors">
            Rings
          </Link>
          <span className="text-[#C99A54]">&gt;</span>
          <Link
            to={`/collections/${product.category}`}
            className="hover:text-[#170C06] transition-colors"
          >
            {product.categoryLabel}
          </Link>
          <span className="text-[#C99A54]">&gt;</span>
          <span className="text-[#170C06] font-medium">{product.name}</span>
        </nav>

        {/* Upper Main Section: Gallery on left (dominates), Info on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Gallery: 7 columns on desktop */}
          <div className="lg:col-span-7 w-full">
            <ProductGallery images={product.gallery} productName={product.name} />
          </div>

          {/* Info: 5 columns on desktop */}
          <div className="lg:col-span-5 w-full pt-1 lg:pt-0">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Interactive 360 Turntable Anatomy Inspector */}
        <div className="mt-16">
          <ScrollReveal direction="up" delay={50}>
            <Ring360Inspector />
          </ScrollReveal>
        </div>

        {/* Interactive Diamond Light & Nocturnal Lume Simulator */}
        <div className="mt-8">
          <ScrollReveal direction="up" delay={50}>
            <DiamondLightSimulator />
          </ScrollReveal>
        </div>

        {/* Bespoke Limited Edition Chapter Allocation & Laser Inscription Studio */}
        <div className="mt-8">
          <ScrollReveal direction="up" delay={50}>
            <BespokeSerialStudio
              productName={product.name}
              defaultMetal={product.metalOptions[0]?.name || '18K Rose Gold'}
            />
          </ScrollReveal>
        </div>

        {/* Lower Row: Tabs on Left, Recommended on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-12">
          <div className="lg:col-span-7">
            <ProductTabs product={product} />
          </div>
          <div className="lg:col-span-5">
            <RecommendedProducts currentProductId={product.id} />
          </div>
        </div>

        {/* Master 4Cs Gemological Education Lab */}
        <div className="mt-16">
          <ScrollReveal direction="up" delay={50}>
            <Gemological4CExplorer />
          </ScrollReveal>
        </div>

        {/* On-Screen Sizing Calibrator */}
        <div id="sizing" className="mt-16">
          <ScrollReveal direction="up" delay={50}>
            <SmartRingCalibrator />
          </ScrollReveal>
        </div>
      </div>

      {/* Sticky Quick-Action Bar for Mobile Devices */}
      <StickyMobilePDPBar product={product} />
    </main>
  );
};
