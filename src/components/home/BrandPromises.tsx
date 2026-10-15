import React from 'react';
import { BRAND_PROMISES } from '../../data/products';
import { ScrollReveal } from '../effects/ScrollReveal';

export const BrandPromises: React.FC = () => {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'diamond':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 text-[#C99A54]">
            <path d="M2.7 10.3a2.4 2.4 0 0 0 0 3.4l8 8a2.4 2.4 0 0 0 3.4 0l8-8a2.4 2.4 0 0 0 0-3.4l-8-8a2.4 2.4 0 0 0-3.4 0l-8 8Z" />
            <path d="m2 10 10 10 10-10" />
            <path d="m12 2 4 8-4 8-4-8 4-8Z" />
          </svg>
        );
      case 'botanical':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 text-[#C99A54]">
            <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" />
            <path d="M12 9v13" />
            <path d="M12 12c-2-2-4-2-6 0" />
            <path d="M12 15c2-2 4-2 6 0" />
          </svg>
        );
      case 'sparkle':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 text-[#C99A54]">
            <path d="m12 3-1.9 6.1L4 11l6.1 1.9L12 19l1.9-6.1L20 11l-6.1-1.9Z" />
          </svg>
        );
      case 'heart':
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 text-[#C99A54]">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        );
    }
  };

  return (
    <section className="bg-[#170C06] border-y border-[#C99A54]/20 py-10 md:py-12 px-4 sm:px-6 md:px-12 text-[#F8F2E9]">
      <div className="max-w-[1536px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#C99A54]/25">
          {BRAND_PROMISES.map((promise, idx) => (
            <ScrollReveal
              key={promise.id}
              direction="up"
              delay={idx * 120}
              duration={600}
              className="h-full"
            >
              <div className="group flex items-center space-x-4 lg:px-8 first:lg:pl-0 last:lg:pr-0 p-3 rounded-xs hover:bg-[#28160D]/40 transition-colors">
                <div className="shrink-0 p-2 border border-[#C99A54]/30 bg-[#28160D]/60 rounded-full flex items-center justify-center group-hover:border-[#E7C58A] group-hover:scale-105 transition-all">
                  {renderIcon(promise.iconName)}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs md:text-[13px] tracking-[0.22em] text-[#F8F2E9] group-hover:text-[#E7C58A] uppercase font-medium transition-colors">
                    {promise.title}
                  </h4>
                  <p className="text-xs text-[#71665C] font-light leading-relaxed">
                    {promise.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
