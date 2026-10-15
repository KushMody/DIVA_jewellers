import React from 'react';
import { MessageCircle, Calendar, ShieldCheck, Gem, Sparkles, MapPin } from 'lucide-react';
import { MagneticButton } from '../effects/MagneticButton';

export const AtelierConciergeBanner: React.FC = () => {
  const whatsappUrl = 'https://wa.me/919820123456?text=' + encodeURIComponent('Hello DIVA Atelier Concierge, I would like to schedule a private consultation for a bespoke ring commission.');

  return (
    <section className="bg-[#170C06] text-[#F8F2E9] py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-[#C99A54]/25 relative overflow-hidden select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C99A54]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1536px] mx-auto relative z-10">
        <div className="bg-[#201007]/90 border border-[#C99A54]/35 p-6 sm:p-10 md:p-16 rounded-xs shadow-2xl relative overflow-hidden">
          {/* Subtle Grid Graphic */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C99A54_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-8 space-y-3 sm:space-y-4 text-left">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 sm:px-3 sm:py-1 bg-[#28160D] border border-[#C99A54]/40 rounded-full text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#E7C58A] uppercase font-mono max-w-full">
                <Sparkles className="w-3.5 h-3.5 text-[#C99A54] shrink-0" />
                <span className="truncate">PRIVATE APPOINTMENT & BESPOKE COMMISSIONS</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-[#F8F2E9] font-normal tracking-wide">
                Experience the Haute Joaillerie Salon
              </h2>

              <p className="text-xs sm:text-sm text-[#F8F2E9]/80 font-light leading-relaxed max-w-2xl">
                Whether you seek private salon viewing in Mumbai or direct one-on-one video consultation with our chief gemologists in Antwerp, the DIVA Concierge caters to every facet of your commission.
              </p>

              {/* Guarantees row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#C99A54]/20">
                <div className="flex items-center space-x-2.5">
                  <MapPin className="w-4 h-4 text-[#C99A54] shrink-0" />
                  <span className="text-xs text-[#E7C58A] font-mono">Mumbai Flagship Salon</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C99A54] shrink-0" />
                  <span className="text-xs text-[#E7C58A] font-mono">100% Insured Armored Transit</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Gem className="w-4 h-4 text-[#C99A54] shrink-0" />
                  <span className="text-xs text-[#E7C58A] font-mono">Lifetime Archival Warranty</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <MagneticButton strength={0.25}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2.5 px-6 py-4 bg-[#C99A54] hover:bg-[#E7C58A] text-[#170C06] font-semibold text-xs tracking-[0.2em] uppercase rounded-xs transition-colors shadow-lg cursor-pointer text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WHATSAPP VIP CONCIERGE</span>
                </a>
              </MagneticButton>

              <a
                href="#consultation"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(whatsappUrl, '_blank');
                }}
                className="w-full inline-flex items-center justify-center space-x-2.5 px-6 py-4 border border-[#C99A54]/50 hover:border-[#E7C58A] text-[#F8F2E9] hover:bg-[#C99A54]/10 text-xs tracking-[0.2em] uppercase rounded-xs transition-colors text-center cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#C99A54]" />
                <span>REQUEST PRIVATE SALON VIEWING</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
