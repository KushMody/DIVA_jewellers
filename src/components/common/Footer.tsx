import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#170C06] text-[#F8F2E9] border-t border-[#C99A54]/25 pt-16 pb-12">
      <div className="max-w-[1536px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 pb-14 border-b border-[#C99A54]/20">
          {/* Col 1: Brand & Atelier */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7 text-[#E7C58A]"
              >
                <path d="M2.7 10.3a2.4 2.4 0 0 0 0 3.4l8 8a2.4 2.4 0 0 0 3.4 0l8-8a2.4 2.4 0 0 0 0-3.4l-8-8a2.4 2.4 0 0 0-3.4 0l-8 8Z" />
                <path d="m2 10 10 10 10-10" />
                <path d="m12 2 4 8-4 8-4-8 4-8Z" />
              </svg>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-[0.16em] text-[#F8F2E9]">DIVA</span>
                <span className="text-[9px] tracking-[0.4em] text-[#C99A54] uppercase -mt-1 font-light">
                  JEWELLERS
                </span>
              </div>
            </div>
            <p className="text-xs text-[#71665C] leading-relaxed pt-2">
              Heirloom-grade Indian fine jewellery crafted with natural diamonds, 18K gold, and eternal precision. More than a ring, a story on your hand.
            </p>
            <div className="text-[11px] text-[#C99A54] tracking-wider pt-1">
              <span>MUMBAI</span> <span className="mx-2">•</span> <span>NEW DELHI</span> <span className="mx-2">•</span> <span>BENGALURU</span>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="space-y-3">
            <h4 className="text-xs tracking-[0.25em] text-[#C99A54] uppercase font-medium">COLLECTIONS</h4>
            <ul className="space-y-2 text-xs text-[#F8F2E9]/75">
              <li>
                <Link to="/collections/engagement-rings" className="hover:text-[#E7C58A] transition-colors">
                  Engagement Rings
                </Link>
              </li>
              <li>
                <Link to="/collections/wedding-bands" className="hover:text-[#E7C58A] transition-colors">
                  Wedding Bands
                </Link>
              </li>
              <li>
                <Link to="/collections/fashion-rings" className="hover:text-[#E7C58A] transition-colors">
                  Fashion & Gemstone Rings
                </Link>
              </li>
              <li>
                <Link to="/collections/custom-design" className="hover:text-[#E7C58A] transition-colors">
                  Bespoke Custom Atelier
                </Link>
              </li>
              <li>
                <Link to="/rings" className="hover:text-[#E7C58A] transition-colors">
                  Browse All Rings
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Client Experience */}
          <div className="space-y-3">
            <h4 className="text-xs tracking-[0.25em] text-[#C99A54] uppercase font-medium">SERVICES & CARE</h4>
            <ul className="space-y-2 text-xs text-[#F8F2E9]/75">
              <li>
                <Link to="/craftsmanship" className="hover:text-[#E7C58A] transition-colors">
                  Natural Diamond Certification
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="hover:text-[#E7C58A] transition-colors">
                  Lifetime Polish & Inspection
                </Link>
              </li>
              <li>
                <Link to="/rings/solitaire-twisted-band" className="hover:text-[#E7C58A] transition-colors">
                  Complimentary Ring Sizing
                </Link>
              </li>
              <li>
                <span className="hover:text-[#E7C58A] transition-colors cursor-pointer">
                  Insured Doorstep Delivery
                </span>
              </li>
              <li>
                <span className="hover:text-[#E7C58A] transition-colors cursor-pointer">
                  Private Salon Appointments
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Boutique Concierge */}
          <div className="space-y-3">
            <h4 className="text-xs tracking-[0.25em] text-[#C99A54] uppercase font-medium">CONCIERGE</h4>
            <p className="text-xs text-[#71665C]">
              Connect with our master gemologists for personalized guidance on ring selection or custom creation.
            </p>
            <div className="pt-1">
              <span className="text-xs text-[#E7C58A] block font-medium">concierge@divajewellers.com</span>
              <span className="text-xs text-[#71665C] block mt-0.5">+91 1800 209 9999 (Toll Free)</span>
            </div>
            <div className="pt-2">
              <span className="inline-block px-3 py-1.5 border border-[#C99A54]/40 text-[10px] tracking-widest text-[#E7C58A] uppercase">
                BY APPOINTMENT ONLY
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] sm:text-[11px] text-[#71665C] text-center md:text-left gap-4">
          <p>© 2026 DIVA JEWELLERS PRIVATE LIMITED. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-5 gap-y-1.5">
            <span className="hover:text-[#E7C58A] cursor-pointer transition-colors">PRIVACY POLICY</span>
            <span className="hover:text-[#E7C58A] cursor-pointer transition-colors">TERMS OF SERVICE</span>
            <span className="hover:text-[#E7C58A] cursor-pointer transition-colors">HALLMARKING STANDARDS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
