import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShieldCheck, Gift, Ruler, MessageCircle, ArrowRight, Sparkles, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const CartConciergeDrawer: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    isCartOpen,
    closeCart,
    subtotal,
    totalItems,
    includeGiftBox,
    setIncludeGiftBox,
    giftCardMessage,
    setGiftCardMessage,
    includeSizingKit,
    setIncludeSizingKit,
  } = useCart();

  const [isReservedSuccess, setIsReservedSuccess] = useState(false);

  // Lock body scroll when cart concierge drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Generate WhatsApp Concierge Consultation Link
  const generateWhatsAppUrl = () => {
    const phone = '919820123456'; // Sample Maison Concierge number
    let text = `Hello DIVA Atelier Concierge, I would like to reserve the following fine creations from my Vault Bag:\n\n`;
    items.forEach((item, idx) => {
      text += `${idx + 1}. *${item.name}*\n`;
      text += `   - Metal: ${item.metal}\n`;
      text += `   - Size: ${item.size}\n`;
      if (item.serialNumber) text += `   - Serial: N°${String(item.serialNumber).padStart(3, '0')}/250\n`;
      if (item.engravingText) text += `   - Laser Engraving: "${item.engravingText}"\n`;
      text += `   - Price: ₹${item.price.toLocaleString('en-IN')} (Qty: ${item.quantity})\n\n`;
    });
    text += `*Total Order Value:* ₹${subtotal.toLocaleString('en-IN')}\n`;
    if (includeGiftBox) text += `*Gift Packaging:* Solid Walnut Box with card: "${giftCardMessage}"\n`;
    text += `Please confirm availability and private appointment slots.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const handleCheckoutReservation = () => {
    setIsReservedSuccess(true);
    setTimeout(() => {
      setIsReservedSuccess(false);
      closeCart();
    }, 3200);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[9990] bg-black/70 backdrop-blur-xs"
          />

          {/* Slide-over Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-[9995] w-full max-w-lg bg-[#170C06] text-[#F8F2E9] border-l border-[#C99A54]/30 shadow-2xl flex flex-col justify-between"
          >
            {/* Top Header */}
            <div className="p-5 sm:p-6 border-b border-[#C99A54]/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#E7C58A] font-mono block">
                  ATELIER HEIRLOOM BAG
                </span>
                <h3 className="font-serif text-2xl text-[#F8F2E9]">
                  Vault Reservations ({totalItems})
                </h3>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full border border-[#C99A54]/30 flex items-center justify-center text-[#E7C58A] hover:bg-[#C99A54] hover:text-[#170C06] transition-colors cursor-pointer"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Items List */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 divide-y divide-[#C99A54]/15">
              {items.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full border border-[#C99A54]/30 mx-auto flex items-center justify-center text-[#C99A54]">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#F8F2E9]">Your Vault Bag is Empty</h4>
                  <p className="text-xs text-[#71665C] max-w-xs mx-auto leading-relaxed">
                    Select a bespoke diamond or signet ring from our collection to reserve your numbered chapter.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/rings"
                      onClick={closeCart}
                      className="inline-flex items-center space-x-2 px-6 py-2.5 border border-[#C99A54] text-xs uppercase tracking-widest text-[#E7C58A] hover:bg-[#C99A54] hover:text-[#170C06] transition-all"
                    >
                      <span>EXPLORE RINGS</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-start">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#28160D] border border-[#C99A54]/25 shrink-0 overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Jewel Info */}
                    <div className="flex-1 space-y-1.5">
                      <div className="flex justify-between items-start">
                        <Link
                          to={`/rings/${item.slug}`}
                          onClick={closeCart}
                          className="font-serif text-base sm:text-lg text-[#F8F2E9] hover:text-[#E7C58A] transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#71665C] hover:text-red-400 transition-colors p-1"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 text-[10px] text-[#E7C58A]">
                        <span className="px-1.5 py-0.5 bg-[#28160D] border border-[#C99A54]/30 rounded-2xs">
                          {item.metal}
                        </span>
                        <span className="px-1.5 py-0.5 bg-[#28160D] border border-[#C99A54]/30 rounded-2xs">
                          Size {item.size}
                        </span>
                        {item.serialNumber && (
                          <span className="px-1.5 py-0.5 bg-[#28160D] border border-[#C99A54]/30 rounded-2xs font-mono">
                            N°{String(item.serialNumber).padStart(3, '0')}
                          </span>
                        )}
                      </div>

                      {item.engravingText && (
                        <p className="text-[10px] text-[#71665C] italic font-serif">
                          Engraved: &ldquo;{item.engravingText}&rdquo;
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-sm sm:text-base font-medium text-[#F8F2E9]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>

                        <div className="flex items-center border border-[#C99A54]/30 rounded-2xs overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2 py-1 text-xs hover:bg-[#C99A54]/20 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2 py-1 text-xs hover:bg-[#C99A54]/20 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Complimentary Luxury Inclusions Section */}
              {items.length > 0 && (
                <div className="pt-5 space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C99A54] block font-mono">
                    COMPLIMENTARY ATELIER PRIVILEGES
                  </span>

                  {/* Gift Packaging Toggle */}
                  <div className="p-3 bg-[#28160D]/60 border border-[#C99A54]/30 rounded-xs space-y-2.5">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center space-x-2.5">
                        <Gift className="w-4 h-4 text-[#E7C58A]" />
                        <span className="text-xs text-[#F8F2E9]">
                          Solid Walnut Keepsake Box & Wax Seal
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={includeGiftBox}
                        onChange={(e) => setIncludeGiftBox(e.target.checked)}
                        className="accent-[#C99A54] w-4 h-4 cursor-pointer"
                      />
                    </label>

                    {includeGiftBox && (
                      <div className="pt-1">
                        <input
                          type="text"
                          value={giftCardMessage}
                          onChange={(e) => setGiftCardMessage(e.target.value)}
                          placeholder="Personalized calligraphy message..."
                          className="w-full bg-[#170C06] border border-[#C99A54]/30 px-2.5 py-1.5 text-xs text-[#F8F2E9] focus:outline-none focus:border-[#C99A54]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Plastic Sizing Kit Toggle */}
                  <div className="p-3 bg-[#28160D]/60 border border-[#C99A54]/30 rounded-xs">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center space-x-2.5">
                        <Ruler className="w-4 h-4 text-[#E7C58A]" />
                        <span className="text-xs text-[#F8F2E9]">
                          Complimentary Precision Ring Sizer Kit
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={includeSizingKit}
                        onChange={(e) => setIncludeSizingKit(e.target.checked)}
                        className="accent-[#C99A54] w-4 h-4 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Summary & Concierge Actions */}
            {items.length > 0 && (
              <div className="p-4 sm:p-6 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] border-t border-[#C99A54]/25 bg-[#100703] space-y-3.5 sm:space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#71665C]">
                    <span>Subtotal</span>
                    <span className="text-[#F8F2E9]">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#71665C]">
                    <span>Insured Armored Transit</span>
                    <span className="text-[#E7C58A]">COMPLIMENTARY</span>
                  </div>
                  <div className="flex justify-between text-[#71665C]">
                    <span>BIS 750 Hallmark & IGI Lab Certificate</span>
                    <span className="text-[#E7C58A]">INCLUDED</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-serif text-[#F8F2E9] pt-2 border-t border-[#C99A54]/20">
                    <span>Estimated Total</span>
                    <span className="text-[#E7C58A] font-sans font-medium">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="space-y-2 pt-1">
                  {/* WhatsApp Direct Concierge Checkout */}
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 sm:py-3 px-3 bg-[#25D366]/90 hover:bg-[#25D366] text-white flex items-center justify-center space-x-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-colors shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span className="truncate">CONCIERGE CHECKOUT (WHATSAPP)</span>
                  </a>

                  {/* Reserve Online */}
                  <button
                    onClick={handleCheckoutReservation}
                    disabled={isReservedSuccess}
                    className="w-full py-2.5 sm:py-3 px-3 bg-[#C99A54] hover:bg-[#E7C58A] text-[#170C06] flex items-center justify-center space-x-2 text-[11px] sm:text-xs font-semibold tracking-widest uppercase transition-colors shadow-lg cursor-pointer"
                  >
                    {isReservedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-[#170C06] shrink-0" />
                        <span className="truncate">VAULT RESERVATION CONFIRMED</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        <span className="truncate">RESERVE ATELIER APPOINTMENT</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center space-x-2 text-[9px] sm:text-[10px] text-[#71665C] pt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C99A54] shrink-0" />
                  <span className="truncate">100% Insured Pan-India armored logistics</span>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
