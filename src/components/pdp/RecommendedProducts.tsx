import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

interface RecommendedProductsProps {
  currentProductId: string;
}

export const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ currentProductId }) => {
  // Filter out current product, keep recommendations
  const pool = PRODUCTS.filter((p) => p.id !== currentProductId);
  const [startIndex, setStartIndex] = useState(0);

  // Show 3 items at a time matching Reference Image 2
  const visibleCount = 3;
  const maxIndex = Math.max(0, pool.length - visibleCount);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleProducts = pool.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="pt-10 border-t border-[#C99A54]/30 mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs sm:text-sm tracking-[0.25em] text-[#170C06] uppercase font-medium">
          YOU MAY ALSO LIKE
        </h3>

        {/* Carousel controls matching Reference 2 */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`w-7 h-7 rounded-full border border-[#C99A54]/40 flex items-center justify-center transition-colors ${
              startIndex === 0
                ? 'opacity-35 cursor-not-allowed text-[#71665C]'
                : 'hover:border-[#170C06] hover:text-[#170C06] text-[#71665C]'
            }`}
            aria-label="Previous recommended products"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex >= maxIndex}
            className={`w-7 h-7 rounded-full border border-[#C99A54]/40 flex items-center justify-center transition-colors ${
              startIndex >= maxIndex
                ? 'opacity-35 cursor-not-allowed text-[#71665C]'
                : 'hover:border-[#170C06] hover:text-[#170C06] text-[#71665C]'
            }`}
            aria-label="Next recommended products"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3 Recommended Cards matching Reference 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </div>
    </div>
  );
};
