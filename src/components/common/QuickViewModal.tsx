import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Heart, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedMetal, setSelectedMetal] = useState<string>(product?.metalOptions[0]?.id || 'rose-gold');
  const [selectedSize, setSelectedSize] = useState<number | ''>(product?.availableSizes[0] || 12);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [prevProductId, setPrevProductId] = useState<string | null>(null);

  if (product && product.id !== prevProductId) {
    setPrevProductId(product.id);
    setSelectedMetal(product.metalOptions[0]?.id || 'rose-gold');
    setSelectedSize(product.availableSizes[0] || 12);
    setActiveImageIndex(0);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isFavorited = isInWishlist(product.id);
  const currentImg = product.gallery[activeImageIndex] || product.mainImage;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#F8F2E9] border border-[#C99A54]/40 shadow-2xl rounded-xs overflow-hidden text-[#18130F] max-h-[90vh] flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-30 text-[#71665C] hover:text-[#170C06] bg-white/80 hover:bg-white p-2 rounded-full shadow-md backdrop-blur-xs transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image & Gallery */}
        <div className="w-full md:w-1/2 bg-[#170C06] p-5 sm:p-7 flex flex-col justify-between shrink-0">
          <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-xs border border-[#C99A54]/30 bg-black/30 flex items-center justify-center">
            <img
              src={currentImg}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#170C06]/90 border border-[#C99A54]/30 text-[9px] tracking-widest text-[#E7C58A] uppercase font-mono">
              {product.categoryLabel}
            </div>
          </div>

          {/* Thumbnail list */}
          {product.gallery.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-14 shrink-0 rounded-xs border overflow-hidden transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#E7C58A] ring-1 ring-[#E7C58A] opacity-100 scale-105'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Quick Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[500px] md:max-h-[85vh]">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#C99A54] uppercase font-mono block mb-1">
                {product.collectionName}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#170C06] font-normal leading-tight">
                {product.name}
              </h3>
              <div className="flex items-baseline space-x-3 mt-2">
                <span className="text-xl sm:text-2xl font-semibold text-[#170C06]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#71665C] line-through font-light">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-[#71665C] leading-relaxed font-light">
              {product.shortDescription}
            </p>

            {/* Metal Swatches */}
            <div className="space-y-2">
              <span className="text-xs tracking-wider uppercase font-semibold text-[#18130F] block">
                METAL ALLOY
              </span>
              <div className="flex flex-wrap gap-2">
                {product.metalOptions.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMetal(m.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 border text-xs rounded-xs transition-all cursor-pointer ${
                      selectedMetal === m.id
                        ? 'border-[#C99A54] bg-white ring-1 ring-[#C99A54] font-medium'
                        : 'border-[#C99A54]/25 hover:border-[#C99A54]/60 text-[#71665C]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: m.colorHex }}
                    />
                    <span>{m.name.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ring Size */}
            <div className="space-y-2">
              <span className="text-xs tracking-wider uppercase font-semibold text-[#18130F] block">
                RING SIZE (INDIAN)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.availableSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-9 h-8 text-xs font-mono border rounded-xs transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'border-[#170C06] bg-[#170C06] text-[#E7C58A] font-bold'
                        : 'border-[#C99A54]/30 text-[#71665C] hover:border-[#C99A54]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-4 text-[11px] text-[#71665C] pt-2 border-t border-[#C99A54]/20">
              <span className="flex items-center space-x-1 text-[#C99A54]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>IGI Natural Diamond</span>
              </span>
              <span className="flex items-center space-x-1 text-[#C99A54]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>BIS 750 Gold</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-6 border-t border-[#C99A54]/20">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`w-full py-3 px-4 text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                isFavorited
                  ? 'bg-[#C99A54] text-[#170C06]'
                  : 'bg-[#170C06] hover:bg-[#28160D] text-[#E7C58A]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              <span>{isFavorited ? 'SAVED IN WISHLIST' : 'ADD TO WISHLIST'}</span>
            </button>

            <Link
              to={`/rings/${product.slug}`}
              onClick={onClose}
              className="w-full py-2.5 px-4 border border-[#C99A54] text-[#170C06] hover:bg-[#C99A54]/10 text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center space-x-1.5 transition-all text-center block cursor-pointer"
            >
              <span>VIEW FULL ATELIER DETAILS</span>
              <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
