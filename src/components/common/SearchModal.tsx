import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
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
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? PRODUCTS.filter((p) => {
        return (
          p.name.toLowerCase().includes(trimmed) ||
          p.collectionName.toLowerCase().includes(trimmed) ||
          p.categoryLabel.toLowerCase().includes(trimmed) ||
          p.shortDescription.toLowerCase().includes(trimmed) ||
          p.specs.metal.toLowerCase().includes(trimmed)
        );
      })
    : [];

  if (!isOpen) return null;

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/rings/${slug}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#170C06] border border-[#C99A54]/30 shadow-2xl p-6 md:p-8 text-[#F8F2E9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#C99A54]/20 pb-4 mb-6">
          <div className="flex items-center space-x-3 flex-1">
            <Search className="w-5 h-5 text-[#C99A54]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search diamond rings, wedding bands, collections..."
              className="w-full bg-transparent text-[#F8F2E9] text-base md:text-lg focus:outline-none placeholder-[#71665C]"
            />
          </div>
          <button
            onClick={onClose}
            className="text-[#71665C] hover:text-[#E7C58A] transition-colors p-1"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions when empty */}
        {!query.trim() && (
          <div className="py-4">
            <p className="text-xs tracking-widest text-[#C99A54] uppercase mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {['Solitaire Twisted Band', 'Engagement Rings', 'Halo Grace', 'Wedding Bands', 'Regal Emerald'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 text-xs bg-[#28160D] border border-[#C99A54]/20 hover:border-[#C99A54] text-[#F8F2E9] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query.trim() && (
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-[#71665C] tracking-wider uppercase">
                {results.length} {results.length === 1 ? 'Result' : 'Results'} Found
              </span>
            </div>

            {results.length === 0 ? (
              <div className="py-12 text-center text-[#71665C]">
                <p className="text-sm">No rings found matching &quot;{query}&quot;</p>
                <p className="text-xs mt-1 text-[#71665C]/80">Try searching for &quot;Solitaire&quot;, &quot;Band&quot;, or &quot;Emerald&quot;</p>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.slug)}
                    className="flex items-center justify-between p-3 bg-[#28160D]/60 hover:bg-[#28160D] border border-transparent hover:border-[#C99A54]/40 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-14 h-14 object-cover border border-[#C99A54]/20"
                      />
                      <div>
                        <span className="text-[10px] tracking-widest text-[#C99A54] uppercase block">
                          {product.collectionName}
                        </span>
                        <h4 className="font-serif text-base text-[#F8F2E9] group-hover:text-[#E7C58A] transition-colors">
                          {product.name}
                        </h4>
                        <span className="text-xs text-[#E7C58A] font-sans">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#71665C] group-hover:text-[#C99A54] group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
