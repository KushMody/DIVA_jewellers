import React, { useState, useEffect } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

interface StickyMobilePDPBarProps {
  product: Product;
}

export const StickyMobilePDPBar: React.FC<StickyMobilePDPBarProps> = ({ product }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const isFavorited = isInWishlist(product.id);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once user scrolls past 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const handleReserve = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      metal: product.metalOptions[0]?.name || '18K Solid Gold',
      size: product.availableSizes[0] || 14,
      price: product.price,
      image: product.mainImage,
      quantity: 1,
    });
  };

  return (
    <div className="md:hidden fixed bottom-14 left-0 right-0 z-40 bg-[#170C06]/95 backdrop-blur-md border-t border-[#C99A54]/30 px-4 py-2.5 shadow-2xl flex items-center justify-between animate-fadeIn">
      <div className="flex flex-col max-w-[50%]">
        <span className="text-[10px] text-[#C99A54] uppercase tracking-wider font-mono truncate">
          {product.name}
        </span>
        <span className="font-serif text-lg font-semibold text-[#F8F2E9]">
          ₹{product.price.toLocaleString('en-IN')}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`p-2.5 rounded-xs border transition-colors ${
            isFavorited
              ? 'border-[#C99A54] bg-[#C99A54] text-[#170C06]'
              : 'border-[#C99A54]/40 bg-[#28160D] text-[#E7C58A]'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={handleReserve}
          className="px-4 py-2.5 bg-[#C99A54] hover:bg-[#E7C58A] text-[#170C06] text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center space-x-1.5 cursor-pointer shadow-lg"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>RESERVE</span>
        </button>
      </div>
    </div>
  );
};
