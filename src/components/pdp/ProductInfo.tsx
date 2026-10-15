import React, { useState } from 'react';
import { Heart, Info, ChevronDown, ShieldCheck, Truck, Award, Sparkles, ShoppingBag, MessageCircle, Check } from 'lucide-react';
import type { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { SizeGuideModal } from '../common/SizeGuideModal';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const [selectedMetal, setSelectedMetal] = useState(product.metalOptions[0]?.id || 'rose-gold');
  const [selectedSize, setSelectedSize] = useState<number | ''>(product.availableSizes[0] || 14);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isMetalInfoOpen, setIsMetalInfoOpen] = useState(false);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const chosenMetalObj = product.metalOptions.find((m) => m.id === selectedMetal) || product.metalOptions[0];

  const handleAddToBag = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      metal: chosenMetalObj?.name || '18K Solid Gold',
      size: selectedSize || 14,
      price: product.price,
      image: product.mainImage,
      quantity: 1,
    });
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 text-[#18130F]">
      {/* Collection Label & Title matching Reference 2 */}
      <div>
        <span className="text-xs tracking-[0.25em] text-[#C99A54] uppercase font-medium block mb-1.5">
          {product.collectionName}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-tight text-[#170C06] font-normal">
          {product.name}
        </h1>
        <p className="text-xs sm:text-sm text-[#71665C] font-light leading-relaxed mt-2.5 max-w-xl">
          {product.shortDescription}
        </p>
      </div>

      {/* Price & Add to Wishlist row matching Reference 2 */}
      <div className="flex items-center justify-between border-y border-[#C99A54]/25 py-4">
        <div className="flex items-baseline space-x-3">
          <span className="font-sans text-2xl sm:text-3xl font-medium text-[#170C06]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-[#71665C] line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product.id)}
          className={`flex items-center space-x-2 text-xs tracking-wider uppercase transition-colors py-1.5 px-3 border ${
            isFavorited
              ? 'border-[#C99A54] bg-[#C99A54]/10 text-[#C99A54]'
              : 'border-transparent text-[#18130F] hover:text-[#C99A54]'
          }`}
          aria-label={isFavorited ? 'Saved to Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'text-[#C99A54] fill-[#C99A54]' : 'text-[#18130F]'
            }`}
          />
          <span className="font-medium text-xs">
            {isFavorited ? 'ADDED TO WISHLIST' : 'Add to Wishlist'}
          </span>
        </button>
      </div>

      {/* Metal Selection matching Reference 2 */}
      <div className="space-y-2.5">
        <div className="flex items-center space-x-1.5 text-xs tracking-wider text-[#18130F] uppercase font-medium">
          <span>METAL</span>
          <button
            onClick={() => setIsMetalInfoOpen(!isMetalInfoOpen)}
            className="text-[#71665C] hover:text-[#C99A54] transition-colors p-0.5"
            aria-label="Metal info"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
          {isMetalInfoOpen && (
            <span className="text-[11px] normal-case text-[#71665C] ml-2">
              (Solid 18 Karat 750 purity gold hallmark)
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {product.metalOptions.map((metal) => (
            <button
              key={metal.id}
              onClick={() => setSelectedMetal(metal.id)}
              className={`flex items-center space-x-2 px-3 py-2.5 border text-xs transition-all ${
                selectedMetal === metal.id
                  ? 'border-[#C99A54] bg-white ring-1 ring-[#C99A54] text-[#170C06] font-medium'
                  : 'border-[#C99A54]/30 bg-white/50 text-[#71665C] hover:border-[#C99A54]/60'
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/15 shadow-2xs"
                style={{ backgroundColor: metal.colorHex }}
              />
              <span className="truncate">{metal.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Ring Size Selection matching Reference 2 */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs tracking-wider uppercase">
          <div className="flex items-center space-x-1.5 font-medium text-[#18130F]">
            <span>RING SIZE</span>
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="text-[#71665C] hover:text-[#C99A54] transition-colors p-0.5"
              aria-label="Size help"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-[11px] text-[#71665C] hover:text-[#C99A54] transition-colors flex items-center space-x-1 lowercase font-light"
          >
            <span>Not sure about your size?</span>
            <span className="text-xs">&gt;</span>
          </button>
        </div>

        <div className="relative">
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value ? Number(e.target.value) : '')}
            className="w-full bg-white border border-[#C99A54]/30 text-[#18130F] text-xs py-2.5 px-3 appearance-none focus:outline-none focus:border-[#C99A54] cursor-pointer"
          >
            <option value="">Select Size</option>
            {product.availableSizes.map((size) => (
              <option key={size} value={size}>
                Size {size} (Indian Standard)
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-[#71665C] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Primary Action Buttons: Add to Vault Bag & Atelier Concierge */}
      <div className="space-y-3 pt-1">
        <button
          onClick={handleAddToBag}
          className="w-full py-3.5 bg-[#170C06] hover:bg-[#28160D] text-[#E7C58A] border border-[#C99A54] text-xs font-semibold tracking-[0.25em] uppercase flex items-center justify-center space-x-2.5 transition-all shadow-xl hover:shadow-[#C99A54]/20 cursor-pointer"
        >
          {isAddedSuccess ? (
            <>
              <Check className="w-4 h-4 text-[#C99A54]" />
              <span>RESERVED IN VAULT BAG</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 text-[#C99A54]" />
              <span>ADD TO VAULT BAG • ₹{product.price.toLocaleString('en-IN')}</span>
            </>
          )}
        </button>

        <a
          href={`https://wa.me/919820123456?text=${encodeURIComponent(
            `Hello VALERIE Atelier Concierge, I would like to inquire about "${product.name}" in ${chosenMetalObj?.name || '18K Gold'} (Size ${selectedSize || 14}).`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#170C06] border border-[#25D366]/40 text-xs font-medium tracking-wider uppercase flex items-center justify-center space-x-2 transition-colors text-center px-2"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
          <span className="hidden sm:inline">INQUIRE WITH ATELIER CONCIERGE (WHATSAPP)</span>
          <span className="sm:hidden">WHATSAPP CONCIERGE</span>
        </a>
      </div>

      {/* Trust Indicators matching Reference 2 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#C99A54]/20 text-center">
        <div className="flex flex-col items-center space-y-1.5 p-2 bg-white/40 border border-[#C99A54]/15">
          <Sparkles className="w-4 h-4 text-[#C99A54]" />
          <span className="text-[10px] sm:text-[11px] text-[#18130F] leading-tight font-medium">
            Certified Natural Diamond
          </span>
        </div>
        <div className="flex flex-col items-center space-y-1.5 p-2 bg-white/40 border border-[#C99A54]/15">
          <Award className="w-4 h-4 text-[#C99A54]" />
          <span className="text-[10px] sm:text-[11px] text-[#18130F] leading-tight font-medium">
            Premium 18K Gold
          </span>
        </div>
        <div className="flex flex-col items-center space-y-1.5 p-2 bg-white/40 border border-[#C99A54]/15">
          <ShieldCheck className="w-4 h-4 text-[#C99A54]" />
          <span className="text-[10px] sm:text-[11px] text-[#18130F] leading-tight font-medium">
            Lifetime Craftsmanship
          </span>
        </div>
        <div className="flex flex-col items-center space-y-1.5 p-2 bg-white/40 border border-[#C99A54]/15">
          <Truck className="w-4 h-4 text-[#C99A54]" />
          <span className="text-[10px] sm:text-[11px] text-[#18130F] leading-tight font-medium">
            Secure & Insured Delivery
          </span>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        selectedSize={typeof selectedSize === 'number' ? selectedSize : undefined}
        onSelectSize={(size) => setSelectedSize(size)}
      />
    </div>
  );
};
