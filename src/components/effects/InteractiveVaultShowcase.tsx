import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Eye, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { TiltCard } from './TiltCard';
import { DiamondShimmer } from './DiamondShimmer';
import { QuickViewModal } from '../common/QuickViewModal';
import { useWishlist } from '../../context/WishlistContext';
import type { Product } from '../../types';

export const InteractiveVaultShowcase: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isInWishlist, toggleWishlist } = useWishlist();

  const vaultItems = PRODUCTS.slice(0, 8);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
      setScrollIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
      setScrollIndex((prev) => Math.min(vaultItems.length - 1, prev + 1));
    }
  };

  return (
    <section className="bg-[#100703] text-[#F8F2E9] py-16 md:py-24 border-b border-[#C99A54]/25 overflow-hidden relative">
      {/* Ambient Radial Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C99A54]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#C99A54]/20">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#28160D] border border-[#C99A54]/40 rounded-full text-[10px] tracking-[0.25em] text-[#E7C58A] uppercase mb-3 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#C99A54]" />
              <span>THE ARCHIVAL VAULT RIBBON</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F8F2E9] font-normal tracking-wide">
              Rare Masterpieces in Motion
            </h2>
          </div>

          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <span className="text-xs text-[#71665C] font-mono mr-2">
              0{scrollIndex + 1} / 0{vaultItems.length}
            </span>
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full border border-[#C99A54]/40 flex items-center justify-center text-[#E7C58A] hover:bg-[#C99A54] hover:text-[#170C06] transition-all cursor-pointer"
              aria-label="Previous jewel"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full border border-[#C99A54]/40 flex items-center justify-center text-[#E7C58A] hover:bg-[#C99A54] hover:text-[#170C06] transition-all cursor-pointer"
              aria-label="Next jewel"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Smooth Horizontal Scroll Ribbon with Tilt & Hover Glare */}
        <div
          ref={containerRef}
          className="flex space-x-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {vaultItems.map((item, idx) => {
            const isFavorited = isInWishlist(item.id);

            return (
              <div
                key={item.id}
                className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 snap-start"
                data-cursor="inspect"
                data-cursor-text="INSPECT"
              >
                <TiltCard maxTilt={8} glareOpacity={0.28}>
                  <div className="group relative bg-[#1E0F07] border border-[#C99A54]/30 rounded-xs overflow-hidden transition-all duration-300 hover:border-[#E7C58A]">
                    {/* Visual Jewel Container */}
                    <div className="relative aspect-[4/3] bg-gradient-to-b from-[#2A150A] to-[#120703] p-6 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.mainImage}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]"
                      />

                      {/* Prismatic Diamond Shimmer on Hover */}
                      <DiamondShimmer trigger="hover" />

                      {/* Top serial badge */}
                      <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/75 border border-[#C99A54]/30 text-[9px] font-mono text-[#E7C58A] uppercase">
                        VAULT N°0{idx + 1}
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(item.id);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-[#F8F2E9] hover:text-[#E7C58A] transition-all hover:scale-110 cursor-pointer"
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isFavorited ? 'text-[#E7C58A] fill-[#E7C58A]' : ''}`} />
                      </button>

                      {/* Interactive Hover Inspect Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedProduct(item);
                        }}
                        className="absolute inset-x-4 bottom-4 py-2 bg-[#C99A54] hover:bg-[#E7C58A] text-[#170C06] text-[10px] tracking-[0.2em] uppercase font-bold flex items-center justify-center space-x-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 cursor-pointer shadow-lg"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>QUICK INSPECT</span>
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-2 border-t border-[#C99A54]/20">
                      <span className="text-[10px] font-mono tracking-widest text-[#C99A54] uppercase block">
                        {item.collectionName}
                      </span>
                      <Link
                        to={`/rings/${item.slug}`}
                        className="font-serif text-lg text-[#F8F2E9] group-hover:text-[#E7C58A] transition-colors truncate block"
                      >
                        {item.name}
                      </Link>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-base font-semibold text-[#E7C58A]">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        <Link
                          to={`/rings/${item.slug}`}
                          className="text-[11px] tracking-wider text-[#F8F2E9]/70 hover:text-[#FFF] uppercase flex items-center space-x-1"
                        >
                          <span>DETAILS</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick View Modal (Mounted conditionally) */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          isOpen={Boolean(selectedProduct)}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};
