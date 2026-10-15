import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sparkles, Heart, Sliders, Ruler } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { count: wishlistCount } = useWishlist();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Rings', path: '/rings', icon: Sparkles },
    { label: 'Atelier', path: '/craftsmanship', icon: Sliders },
    { label: 'Sizing', path: '/rings/solitaire-twisted-band#sizing', icon: Ruler },
    { label: 'Wishlist', path: '/wishlist', icon: Heart, badge: wishlistCount },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#170C06]/98 backdrop-blur-md border-t border-[#C99A54]/30 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-2xl"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path.split('#')[0]);
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-2 relative transition-all duration-200 ${
                isActive ? 'text-[#E7C58A] scale-105' : 'text-[#F8F2E9]/65 hover:text-[#E7C58A]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 stroke-[1.5] ${isActive ? 'stroke-[2]' : ''}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#C99A54] text-[#170C06] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-wider uppercase mt-1 font-medium">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-1 w-4 h-[2px] bg-[#C99A54] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
