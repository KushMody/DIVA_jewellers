import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUpDown, Sliders, Ruler } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { ScrollReveal } from '../components/effects/ScrollReveal';
import type { CategorySlug } from '../types';

export const RingsPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const validCategory = (category && ['engagement-rings', 'wedding-bands', 'fashion-rings', 'custom-design'].includes(category))
    ? (category as CategorySlug)
    : 'all';
  const [activeCategory, setActiveCategory] = useState<CategorySlug>(validCategory);
  const [prevCategoryParam, setPrevCategoryParam] = useState<string | undefined>(category);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  if (category !== prevCategoryParam) {
    setPrevCategoryParam(category);
    setActiveCategory(validCategory);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Ring Collections — VALERIE JEWELLERS';
  }, []);

  const categoryFilters = [
    { id: 'all', label: 'All Rings' },
    { id: 'engagement-rings', label: 'Engagement' },
    { id: 'wedding-bands', label: 'Wedding Bands' },
    { id: 'fashion-rings', label: 'Fashion Rings' },
    { id: 'custom-design', label: 'Custom Design' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.collectionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // default featured order
  });

  return (
    <main className="bg-[#F8F2E9] min-h-screen pt-24 sm:pt-28 md:pt-32 pb-24 text-[#18130F]">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-2 text-[11px] md:text-xs text-[#71665C] mb-6 font-light overflow-x-auto whitespace-nowrap pb-1"
        >
          <Link to="/" className="hover:text-[#170C06] transition-colors">
            Home
          </Link>
          <span className="text-[#C99A54]">&gt;</span>
          <span className="text-[#170C06] font-medium">Ring Collections</span>
        </nav>

        {/* Editorial Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="text-[11px] tracking-[0.3em] text-[#C99A54] uppercase font-medium block mb-2 font-mono">
            FINE JEWELLERY ATELIER
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#170C06] font-normal tracking-wide">
            The Ring Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#71665C] font-light leading-relaxed mt-3">
            Handcrafted in 18K gold and natural certified diamonds. Each piece is sculpted to commemorate your eternal milestones with unmatched craftsmanship.
          </p>

          <div className="flex items-center justify-center space-x-3 mt-4">
            <div className="w-12 h-[1px] bg-[#C99A54]/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C99A54] bg-[#F8F2E9]" />
            <div className="w-12 h-[1px] bg-[#C99A54]/40" />
          </div>
        </div>

        {/* Interactive Shortcuts Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          <Link
            to="/craftsmanship"
            className="p-4 bg-[#170C06] border border-[#C99A54]/30 rounded-xs flex items-center justify-between group hover:border-[#C99A54] transition-all text-[#F8F2E9]"
          >
            <div className="flex items-center space-x-3">
              <Sliders className="w-5 h-5 text-[#C99A54] group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-[10px] tracking-wider uppercase text-[#C99A54] font-mono block">
                  BESPOKE ATELIER
                </span>
                <span className="font-serif text-base text-[#F8F2E9]">
                  Design Your Custom Ring
                </span>
              </div>
            </div>
            <span className="text-xs text-[#E7C58A] group-hover:translate-x-1 transition-transform">→</span>
          </Link>

          <Link
            to="/rings/solitaire-twisted-band#sizing"
            className="p-4 bg-[#201007] border border-[#C99A54]/30 rounded-xs flex items-center justify-between group hover:border-[#C99A54] transition-all text-[#F8F2E9]"
          >
            <div className="flex items-center space-x-3">
              <Ruler className="w-5 h-5 text-[#C99A54] group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-[10px] tracking-wider uppercase text-[#C99A54] font-mono block">
                  PRECISION CALIBRATOR
                </span>
                <span className="font-serif text-base text-[#F8F2E9]">
                  Find Your Ring Size on Screen
                </span>
              </div>
            </div>
            <span className="text-xs text-[#E7C58A] group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Filters & Sorting Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between border-y border-[#C99A54]/25 py-4 mb-10 gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 overflow-x-auto max-w-full">
            {categoryFilters.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as CategorySlug)}
                className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'border-b-2 border-[#170C06] text-[#170C06] font-semibold'
                    : 'text-[#71665C] hover:text-[#170C06]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort Controls */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-3 sm:space-x-4">
            <span className="text-xs text-[#71665C] uppercase tracking-wider">
              {sortedProducts.length} Rings
            </span>
            <div className="flex items-center space-x-2 text-xs text-[#170C06]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#C99A54] shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-transparent border border-[#C99A54]/30 px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#C99A54] cursor-pointer"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="py-20 text-center text-[#71665C]">
            <p className="font-serif text-2xl text-[#170C06] mb-2">No Rings Found</p>
            <p className="text-xs">Try selecting another collection or clearing filters.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-6 px-6 py-2.5 border border-[#C99A54] text-xs uppercase tracking-widest text-[#170C06]"
            >
              Show All Rings
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {sortedProducts.map((product, idx) => (
              <ScrollReveal
                key={product.id}
                direction="up"
                delay={(idx % 4) * 80}
                duration={550}
              >
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
