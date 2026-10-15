import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, ThumbsUp, MessageSquareQuote, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReviewStory {
  id: string;
  author: string;
  location: string;
  category: 'engagement' | 'anniversary' | 'bespoke';
  rating: number;
  date: string;
  ringName: string;
  ringSlug: string;
  image: string;
  quote: string;
  fullStory: string;
  serialNumber?: number;
  likes: number;
}

const REVIEWS: ReviewStory[] = [
  {
    id: 'rev-1',
    author: 'Aarav & Meera S.',
    location: 'Bandra, Mumbai',
    category: 'engagement',
    rating: 5,
    date: 'February 2026',
    ringName: 'The Eternal Radiance Solitaire',
    ringSlug: 'solitaire-twisted-band',
    image: '/images/products/solitaire-twisted-thumb-1.webp',
    serialNumber: 42,
    quote: 'The 360 inspector and laser serial engraving gave us complete confidence before visiting the atelier.',
    fullStory: 'We spent weeks researching diamond jewellers in Mumbai. What set VALERIE apart was the utter transparency of their Swiss chapter horology standards. Seeing edition #042/250 stamped on the shank and having the matching commemorative coin made our engagement unforgettable.',
    likes: 38,
  },
  {
    id: 'rev-2',
    author: 'Kabir & Ananya V.',
    location: 'Chanakyapuri, New Delhi',
    category: 'bespoke',
    rating: 5,
    date: 'January 2026',
    ringName: 'Custom Bespoke Signet Solitaire',
    ringSlug: 'custom-design-ring',
    image: '/images/products/custom-design-ring.webp',
    serialNumber: 11,
    quote: 'The CAD prototyping and 40x microscope setting tolerances rival the finest Geneva watchmakers.',
    fullStory: 'I approached the atelier with an heirloom drawing. The master goldsmiths translated my sketches into a solid 18K rose gold masterpiece with zero compromise. The hidden under-gallery halo was a breathtaking touch.',
    likes: 29,
  },
  {
    id: 'rev-3',
    author: 'Dev & Natasha M.',
    location: 'Indiranagar, Bengaluru',
    category: 'anniversary',
    rating: 5,
    date: 'December 2025',
    ringName: 'Pavé Diamond Eternity Band',
    ringSlug: 'pave-diamond-band',
    image: '/images/products/pave-diamond-band.webp',
    quote: 'The comfort-fit interior curve means my wife wears it daily without any irritation.',
    fullStory: 'For our 10th anniversary, we selected this full eternity band. The optical fire of the F-VVS1 micro-diamonds under candlelight is spectacular. The insured armored delivery arrived within 48 hours.',
    likes: 44,
  },
  {
    id: 'rev-4',
    author: 'Vikram & Rhea D.',
    location: 'Colaba, Mumbai',
    category: 'engagement',
    rating: 5,
    date: 'November 2025',
    ringName: 'Regal Emerald Solitaire',
    ringSlug: 'regal-emerald',
    image: '/images/products/regal-emerald.webp',
    serialNumber: 7,
    quote: 'The hall of mirrors step-cut clarity is hypnotic. True vintage nobility.',
    fullStory: 'Rhea always dreamt of an emerald cut. When we saw the Tolkowsky symmetry and sub-micron claw prongs in person, there was zero doubt. Truly an heirloom we will pass down to generations.',
    likes: 51,
  },
];

export const AtelierReviewsShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'engagement' | 'anniversary' | 'bespoke'>('all');
  const [selectedStory, setSelectedStory] = useState<ReviewStory | null>(null);
  const [likedReviews, setLikedReviews] = useState<string[]>([]);

  const filtered = activeCategory === 'all'
    ? REVIEWS
    : REVIEWS.filter((r) => r.category === activeCategory);

  const toggleLike = (id: string) => {
    setLikedReviews((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-[#170C06] text-[#F8F2E9] py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-[#C99A54]/25 relative overflow-hidden">
      <div className="max-w-[1536px] mx-auto relative z-10">
        {/* Header & Overall Rating Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-[#C99A54]/20 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#28160D] border border-[#C99A54]/40 rounded-full text-[10px] tracking-[0.25em] text-[#E7C58A] uppercase font-mono mb-3">
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#C99A54]" />
              <span>VERIFIED PATRON CHRONICLES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F8F2E9] font-normal tracking-wide">
              Heirloom Stories & Testimonials
            </h2>
          </div>

          <div className="flex items-center space-x-4 bg-[#201007] border border-[#C99A54]/30 px-5 py-3 rounded-xs">
            <div className="flex text-[#E7C58A]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#E7C58A]" />
              ))}
            </div>
            <div>
              <span className="font-mono text-sm font-semibold text-[#F8F2E9]">4.98 / 5.0</span>
              <span className="text-[10px] text-[#71665C] block">From 420+ Certified Patrons</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'all', label: 'All Chronicles' },
            { id: 'engagement', label: 'Proposals & Engagements' },
            { id: 'anniversary', label: 'Anniversary Milestones' },
            { id: 'bespoke', label: 'Bespoke Atelier Commissions' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id as typeof activeCategory);
              }}
              className={`px-4 py-2 text-xs tracking-wider uppercase transition-all rounded-xs cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-[#C99A54] text-[#170C06] font-semibold shadow-md'
                  : 'bg-[#201007] text-[#71665C] hover:text-[#F8F2E9] border border-[#C99A54]/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((rev) => {
            const isLiked = likedReviews.includes(rev.id);
            return (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-[#201007] border border-[#C99A54]/25 p-5 rounded-xs flex flex-col justify-between hover:border-[#C99A54]/60 transition-all duration-300 group shadow-lg"
              >
                <div className="space-y-4">
                  {/* Photo & Ring Badge */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xs bg-[#170C06] border border-[#C99A54]/20">
                    <img
                      src={rev.image}
                      alt={rev.ringName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                      onClick={() => setSelectedStory(rev)}
                    />
                    {rev.serialNumber && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-xs text-[9px] font-mono text-[#E7C58A] border border-[#C99A54]/30 rounded-2xs">
                        N°{String(rev.serialNumber).padStart(3, '0')}/250
                      </span>
                    )}
                  </div>

                  {/* Stars & Verification */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex text-[#E7C58A]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#E7C58A]" />
                      ))}
                    </div>
                    <span className="inline-flex items-center space-x-1 text-[10px] text-[#71665C]">
                      <ShieldCheck className="w-3 h-3 text-[#C99A54]" />
                      <span>Verified Atelier Patron</span>
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="font-serif text-base text-[#F8F2E9] leading-snug italic">
                    &ldquo;{rev.quote}&rdquo;
                  </p>

                  <p className="text-xs text-[#71665C] line-clamp-3 leading-relaxed">
                    {rev.fullStory}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="pt-4 mt-4 border-t border-[#C99A54]/15 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-[#E7C58A] block">{rev.author}</span>
                    <span className="text-[10px] text-[#71665C]">{rev.location}</span>
                  </div>

                  <button
                    onClick={() => toggleLike(rev.id)}
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                      isLiked
                        ? 'border-[#C99A54] bg-[#C99A54]/20 text-[#E7C58A]'
                        : 'border-[#C99A54]/20 text-[#71665C] hover:text-[#F8F2E9]'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span className="text-[10px] font-mono">{rev.likes + (isLiked ? 1 : 0)}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Story Lightbox Modal */}
      <AnimatePresence>
        {selectedStory && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="w-full max-w-xl bg-[#170C06] border border-[#C99A54]/40 p-6 sm:p-8 text-[#F8F2E9] rounded-xs shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 text-[#71665C] hover:text-[#F8F2E9] p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C99A54] block">
                  {selectedStory.category.toUpperCase()} CHRONICLE
                </span>
                <h3 className="font-serif text-2xl text-[#F8F2E9]">{selectedStory.author}</h3>
                <span className="text-xs text-[#71665C] block -mt-2">{selectedStory.location} • {selectedStory.date}</span>

                <div className="aspect-[16/9] overflow-hidden border border-[#C99A54]/25 rounded-2xs">
                  <img
                    src={selectedStory.image}
                    alt={selectedStory.ringName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-sm text-[#F8F2E9]/85 font-light leading-relaxed">
                  {selectedStory.fullStory}
                </p>

                <div className="pt-2 border-t border-[#C99A54]/20 flex justify-between items-center">
                  <span className="text-xs text-[#E7C58A] font-medium">{selectedStory.ringName}</span>
                  <Link
                    to={`/rings/${selectedStory.ringSlug}`}
                    onClick={() => setSelectedStory(null)}
                    className="text-xs uppercase tracking-wider text-[#C99A54] hover:text-white"
                  >
                    View Jewel →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
