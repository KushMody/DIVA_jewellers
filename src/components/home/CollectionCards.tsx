import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES_DATA } from '../../data/products';
import { TiltCard } from '../effects/TiltCard';
import { DiamondShimmer } from '../effects/DiamondShimmer';

export const CollectionCards: React.FC = () => {
  return (
    <section className="bg-[#F8F2E9] py-16 md:py-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
      <div className="max-w-[1536px] mx-auto">
        {/* Centered Heading */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-[11px] md:text-xs tracking-[0.35em] text-[#71665C] uppercase font-medium mb-1.5 font-mono">
            DISCOVER OUR
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#18130F] font-normal tracking-[0.03em]">
            Ring Collections
          </h2>

          {/* Fine gold ornamental divider matching reference */}
          <div className="flex items-center justify-center space-x-3 mt-4">
            <div className="w-16 md:w-24 h-[1px] bg-[#C99A54]/40" />
            <div className="w-2 h-2 rotate-45 border border-[#C99A54] bg-[#F8F2E9]" />
            <div className="w-16 md:w-24 h-[1px] bg-[#C99A54]/40" />
          </div>
        </div>

        {/* 4 Edge-to-Edge Category Cards with 3D Tilt and Cursor Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {CATEGORIES_DATA.map((cat) => (
            <TiltCard key={cat.id} maxTilt={6} glareOpacity={0.25} className="h-full">
              <Link
                to={cat.link}
                data-cursor="inspect"
                data-cursor-text="EXPLORE"
                className="group relative h-[210px] sm:h-[230px] md:h-[220px] lg:h-[215px] overflow-hidden border border-[#C99A54]/25 bg-[#28160D] transition-all duration-500 hover:border-[#C99A54] shadow-xs hover:shadow-xl flex flex-col justify-between p-5 md:p-6 block"
              >
                {/* Full-bleed photography */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Prismatic Shimmer Sweep on Hover */}
                <DiamondShimmer trigger="hover" />

                {/* Refined gradient overlay for text readability */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    cat.id === 'fashion'
                      ? 'bg-gradient-to-r from-black/85 via-black/40 to-transparent'
                      : 'bg-gradient-to-r from-black/70 via-black/35 to-transparent'
                  }`}
                />

                {/* Text content placed over readable area */}
                <div className="relative z-10 max-w-[200px]">
                  <h3 className="font-serif text-base md:text-lg font-medium tracking-[0.08em] leading-tight text-[#F8F2E9] group-hover:text-[#E7C58A] transition-colors duration-300 drop-shadow-sm">
                    {cat.title}
                  </h3>
                  <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-light mt-1 text-[#E7C58A]/85">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Circled outlined arrow matching Reference 1 */}
                <div className="relative z-10 mt-auto pt-4">
                  <div className="w-7 h-7 rounded-full border border-[#E7C58A] text-[#E7C58A] flex items-center justify-center transition-all duration-300 group-hover:bg-[#E7C58A] group-hover:text-[#170C06] group-hover:scale-110 shadow-sm">
                    <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
