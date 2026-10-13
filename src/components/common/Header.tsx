import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X, Sparkles, Sliders, Ruler, PhoneCall, Globe, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { SearchModal } from './SearchModal';

interface HeaderProps {
  isTransparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isTransparent = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('INR (₹)');
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const location = useLocation();
  const { count: wishlistCount } = useWishlist();
  const { totalItems: cartCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setIsMobileMenuOpen(false);
  }

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'RINGS', path: '/rings' },
    { label: 'COLLECTIONS', path: '/collections/all' },
    { label: 'OUR STORY', path: '/our-story' },
    { label: 'CRAFTSMANSHIP', path: '/craftsmanship' },
  ];

  const isHome = location.pathname === '/';
  const shouldBeTransparent = isHome && !isScrolled && isTransparent;

  return (
    <>
      {/* Top Luxury Announcement Bar inspired by Czard limited drops */}
      <div className="bg-[#100703] border-b border-[#C99A54]/20 text-[#E7C58A] py-1.5 px-4 text-center text-[10px] tracking-[0.25em] uppercase font-light hidden sm:block relative z-50">
        <div className="max-w-[1536px] mx-auto flex items-center justify-between">
          <span className="text-[#C99A54]">SWISS & INDIAN HOROLOGICAL-GRADE CRAFT</span>
          <span className="font-mono">
            CHAPTER I ALLOCATION: STRICTLY 250 NUMBERED PIECES WORLDWIDE
          </span>
          <div className="relative">
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="flex items-center space-x-1 hover:text-white transition-colors"
            >
              <Globe className="w-3 h-3 text-[#C99A54]" />
              <span>{selectedCurrency}</span>
            </button>
            {isCurrencyDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 bg-[#170C06] border border-[#C99A54]/40 py-1 px-2 rounded-2xs shadow-xl text-left min-w-[90px]">
                {['INR (₹)', 'USD ($)', 'EUR (€)', 'AED (د.إ)'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setSelectedCurrency(curr);
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className="block w-full text-left py-1 text-[10px] text-[#F8F2E9]/80 hover:text-[#E7C58A]"
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <header
        className={`fixed ${isScrolled ? 'top-0' : 'top-0 sm:top-7'} left-0 right-0 z-40 transition-all duration-300 ${
          shouldBeTransparent
            ? 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-4 md:py-6'
            : 'bg-[#170C06] border-b border-[#C99A54]/20 py-3.5 md:py-4 shadow-xl'
        }`}
      >
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 group">
            {/* Elegant Diamond Icon */}
            <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7 md:w-8 md:h-8 text-[#E7C58A] transition-transform duration-500 group-hover:scale-105"
              >
                <path d="M2.7 10.3a2.4 2.4 0 0 0 0 3.4l8 8a2.4 2.4 0 0 0 3.4 0l8-8a2.4 2.4 0 0 0 0-3.4l-8-8a2.4 2.4 0 0 0-3.4 0l-8 8Z" />
                <path d="m2 10 10 10 10-10" />
                <path d="m12 2 4 8-4 8-4-8 4-8Z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-xl md:text-2xl tracking-[0.18em] text-[#F8F2E9] font-medium leading-tight">
                DIVA
              </span>
              <span className="text-[9px] md:text-[10px] tracking-[0.42em] text-[#C99A54] uppercase font-light -mt-0.5">
                JEWELLERS
              </span>
            </div>
          </Link>

          {/* Center Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-10">
            {navLinks.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`relative text-xs lg:text-[13px] tracking-[0.2em] font-medium transition-all duration-300 py-1 ${
                    isActive
                      ? 'text-[#F8F2E9]'
                      : 'text-[#F8F2E9]/75 hover:text-[#E7C58A]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C99A54] transition-all" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Search & Wishlist */}
          <div className="flex items-center space-x-3.5 sm:space-x-5 md:space-x-6">
            {/* Fine vertical line separator */}
            <div className="hidden md:block h-6 w-[1px] bg-[#C99A54]/30" />

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-[#F8F2E9]/80 hover:text-[#E7C58A] transition-colors p-1 cursor-pointer"
              aria-label="Open search"
            >
              <Search className="w-4 h-4 md:w-5 md:h-5 stroke-[1.5]" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative text-[#F8F2E9]/80 hover:text-[#E7C58A] transition-colors p-1"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart
                className={`w-4 h-4 md:w-5 md:h-5 stroke-[1.5] transition-colors ${
                  wishlistCount > 0 ? 'text-[#E7C58A] fill-[#E7C58A]/30' : ''
                }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C99A54] text-[#170C06] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Vault Bag Trigger */}
            <button
              onClick={openCart}
              className="relative text-[#F8F2E9]/80 hover:text-[#E7C58A] transition-colors p-1 cursor-pointer"
              aria-label={`Vault Bag with ${cartCount} reservations`}
            >
              <ShoppingBag
                className={`w-4 h-4 md:w-5 md:h-5 stroke-[1.5] transition-colors ${
                  cartCount > 0 ? 'text-[#E7C58A]' : ''
                }`}
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C99A54] text-[#170C06] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#F8F2E9] hover:text-[#E7C58A] transition-colors p-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#170C06] border-b border-[#C99A54]/30 px-6 py-6 animate-fadeIn text-[#F8F2E9] max-h-[85vh] overflow-y-auto">
            <nav className="flex flex-col space-y-4">
              {/* Primary Routes */}
              {navLinks.map((item) => {
                const isActive =
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`text-sm tracking-[0.2em] py-2 border-b border-[#C99A54]/10 transition-colors flex items-center justify-between ${
                      isActive ? 'text-[#E7C58A] font-semibold' : 'text-[#F8F2E9]/80'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[#C99A54]/50">→</span>
                  </Link>
                );
              })}

              {/* Interactive Boutique Features Shortcuts */}
              <div className="pt-2 border-t border-[#C99A54]/20 space-y-2">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#C99A54] block font-mono">
                  INTERACTIVE ATELIER EXPERIENCES
                </span>

                <Link
                  to="/craftsmanship"
                  className="flex items-center space-x-2 text-xs py-1.5 text-[#E7C58A] hover:text-white"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#C99A54]" />
                  <span>Bespoke Ring Customizer</span>
                </Link>

                <Link
                  to="/rings/solitaire-twisted-band"
                  className="flex items-center space-x-2 text-xs py-1.5 text-[#E7C58A] hover:text-white"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C99A54]" />
                  <span>360° Ring Turntable & Light Simulator</span>
                </Link>

                <Link
                  to="/our-story"
                  className="flex items-center space-x-2 text-xs py-1.5 text-[#E7C58A] hover:text-white"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#C99A54]" />
                  <span>Smart Screen Sizing Calibrator</span>
                </Link>
              </div>

              {/* Boutique Assistance */}
              <div className="pt-3 border-t border-[#C99A54]/20 flex flex-col space-y-2 text-xs text-[#C99A54]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>BOUTIQUE ASSISTANCE</span>
                  </span>
                  <a href="tel:+9118002099999" className="tracking-widest font-mono text-[#F8F2E9]">
                    +91 1800 209 9999
                  </a>
                </div>
                <div className="text-[10px] text-[#71665C]">
                  Mumbai • New Delhi • Bengaluru • Private Appointments
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
