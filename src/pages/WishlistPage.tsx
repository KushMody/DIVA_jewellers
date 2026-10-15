import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/common/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlistProducts, clearWishlist, count } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'My Saved Rings — DIVA JEWELLERS';
  }, []);

  return (
    <main className="bg-[#F8F2E9] min-h-screen pt-24 sm:pt-28 md:pt-32 pb-24 text-[#18130F]">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-2 text-[11px] md:text-xs text-[#71665C] mb-6 font-light"
        >
          <Link to="/" className="hover:text-[#170C06] transition-colors">
            Home
          </Link>
          <span className="text-[#C99A54]">&gt;</span>
          <span className="text-[#170C06] font-medium">My Wishlist</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#C99A54]/25 pb-6 mb-10">
          <div>
            <span className="text-[11px] tracking-[0.3em] text-[#C99A54] uppercase font-medium block mb-1">
              SAVED CREATIONS
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#170C06] font-normal">
              My Cherished Wishlist ({count})
            </h1>
          </div>

          {count > 0 && (
            <button
              onClick={clearWishlist}
              className="mt-4 sm:mt-0 flex items-center space-x-1.5 text-xs text-[#71665C] hover:text-[#170C06] transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Wishlist</span>
            </button>
          )}
        </div>

        {/* Content */}
        {count === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-5">
            <div className="w-16 h-16 rounded-full border border-[#C99A54]/40 flex items-center justify-center mx-auto text-[#C99A54]">
              <Heart className="w-8 h-8 stroke-[1.2]" />
            </div>
            <h2 className="font-serif text-2xl text-[#170C06]">Your Wishlist is Empty</h2>
            <p className="text-xs text-[#71665C] leading-relaxed">
              Explore our curated ring collections and tap the heart icon on any design to preserve it for future consultation.
            </p>
            <div className="pt-2">
              <Link
                to="/rings"
                className="inline-flex items-center space-x-2 px-6 py-3 border border-[#C99A54] text-xs tracking-[0.2em] uppercase text-[#170C06] hover:bg-[#170C06] hover:text-[#F8F2E9] transition-colors"
              >
                <span>EXPLORE RINGS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
