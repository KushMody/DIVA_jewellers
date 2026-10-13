import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { MagneticButton } from '../effects/MagneticButton';
import { ScrollReveal } from '../effects/ScrollReveal';

export const CuratedBestsellers: React.FC = () => {
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <section className="bg-[#F8F2E9] py-16 md:py-24 px-6 md:px-12 border-b border-[#C99A54]/20">
      <div className="max-w-[1536px] mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 border-b border-[#C99A54]/20 pb-6">
            <div>
              <span className="text-xs tracking-[0.3em] text-[#C99A54] uppercase font-medium block mb-2 font-mono">
                CURATED MASTERPIECES
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#18130F] font-normal">
                Most Cherished Rings
              </h2>
            </div>
            <MagneticButton strength={0.25}>
              <Link
                to="/rings"
                data-cursor="hover"
                data-cursor-text="DISCOVER"
                className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs tracking-[0.2em] text-[#170C06] hover:text-[#C99A54] transition-colors uppercase font-medium group"
              >
                <span>VIEW ALL RINGS</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {bestsellers.map((product, idx) => (
            <ScrollReveal key={product.id} direction="up" delay={idx * 100} duration={600}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
