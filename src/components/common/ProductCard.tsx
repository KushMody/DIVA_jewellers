import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import type { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { QuickViewModal } from './QuickViewModal';
import { TiltCard } from '../effects/TiltCard';
import { DiamondShimmer } from '../effects/DiamondShimmer';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const isFavorited = isInWishlist(product.id);

  return (
    <>
      <TiltCard maxTilt={6} glareOpacity={0.2} className="h-full">
        <div
          className="group relative flex flex-col h-full bg-[#F8F2E9] text-[#18130F] transition-all duration-300"
          data-cursor="inspect"
          data-cursor-text="VIEW"
        >
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-[#F0E5D7] border border-[#C99A54]/25">
            <Link to={`/rings/${product.slug}`} className="block w-full h-full relative">
              <img
                src={product.mainImage}
                alt={product.name}
                loading="lazy"
                className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
                  product.gallery[1] ? 'group-hover:opacity-0' : ''
                }`}
              />
              {product.gallery[1] && (
                <img
                  src={product.gallery[1]}
                  alt={`${product.name} alternate view`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
                />
              )}
            </Link>

            {/* Prismatic Shimmer Sweep on Hover */}
            <DiamondShimmer trigger="hover" />

            {/* Wishlist Heart Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-[#F8F2E9] hover:text-[#E7C58A] transition-all hover:scale-110 cursor-pointer"
              aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorited ? 'text-[#E7C58A] fill-[#E7C58A]' : 'text-white'
                }`}
              />
            </button>

            {/* Quick View Button (Desktop Hover & Mobile Accessible) */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="absolute inset-x-3 bottom-10 z-10 py-2 px-3 bg-[#170C06]/90 hover:bg-[#170C06] text-[#E7C58A] text-[10px] tracking-[0.2em] uppercase font-semibold flex items-center justify-center space-x-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 cursor-pointer shadow-lg backdrop-blur-xs"
              aria-label={`Quick view ${product.name}`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>QUICK VIEW</span>
            </button>

            {/* Category tag */}
            <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-[#170C06]/85 backdrop-blur-xs text-[9px] tracking-widest text-[#E7C58A] uppercase font-medium">
              {product.categoryLabel}
            </div>

            {/* Metal Swatch Indicators on Card */}
            <div className="absolute bottom-2.5 right-2.5 flex space-x-1 z-10 bg-black/40 px-1.5 py-0.5 rounded-full backdrop-blur-xs">
              {product.metalOptions.slice(0, 3).map((m) => (
                <span
                  key={m.id}
                  className="w-2 h-2 rounded-full border border-black/30"
                  style={{ backgroundColor: m.colorHex }}
                  title={m.name}
                />
              ))}
            </div>
          </div>

          {/* Info Container */}
          <div className={`flex flex-col pt-3.5 ${compact ? 'pb-1' : 'pb-4'}`}>
            <span className="text-[10px] tracking-[0.25em] text-[#C99A54] uppercase font-medium mb-1">
              {product.collectionName}
            </span>
            <Link
              to={`/rings/${product.slug}`}
              className="font-serif text-lg md:text-xl text-[#18130F] group-hover:text-[#C99A54] transition-colors leading-snug line-clamp-1"
            >
              {product.name}
            </Link>
            <div className="flex items-center justify-between mt-1.5">
              <div className="flex items-baseline space-x-2">
                <span className="text-sm md:text-base font-medium text-[#18130F]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-[#71665C] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <Link
                to={`/rings/${product.slug}`}
                className="text-xs tracking-wider text-[#C99A54] hover:text-[#170C06] transition-colors flex items-center space-x-1"
              >
                <span>VIEW</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </TiltCard>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};
