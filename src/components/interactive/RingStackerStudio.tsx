import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface RingLayerOption {
  id: string;
  name: string;
  category: 'centerpiece' | 'band' | 'crown';
  carat: number;
  goldGrams: number;
  price: number;
  image: string;
  description: string;
}

const CENTERPIECE_OPTIONS: RingLayerOption[] = [
  {
    id: 'solitaire-twisted',
    name: 'Eternal Radiance Solitaire',
    category: 'centerpiece',
    carat: 1.25,
    goldGrams: 4.8,
    price: 185000,
    image: '/images/products/solitaire-twisted-band.webp',
    description: '1.25ct Solitaire with twisted pavé shank.',
  },
  {
    id: 'regal-emerald',
    name: 'Regal Emerald Solitaire',
    category: 'centerpiece',
    carat: 1.5,
    goldGrams: 5.2,
    price: 215000,
    image: '/images/products/regal-emerald.webp',
    description: '1.50ct Emerald-cut center diamond.',
  },
  {
    id: 'halo-grace',
    name: 'Halo Grace Solitaire',
    category: 'centerpiece',
    carat: 1.1,
    goldGrams: 4.5,
    price: 165000,
    image: '/images/products/halo-grace.webp',
    description: 'Center diamond embraced by micro-pavé halo.',
  },
];

const BAND_OPTIONS: RingLayerOption[] = [
  {
    id: 'pave-band',
    name: 'Pavé Diamond Eternity Band',
    category: 'band',
    carat: 0.45,
    goldGrams: 3.2,
    price: 68000,
    image: '/images/products/pave-diamond-band.webp',
    description: 'Full circle of micro-pavé natural diamonds.',
  },
  {
    id: 'wedding-diamond',
    name: 'Contour Diamond Wedding Band',
    category: 'band',
    carat: 0.35,
    goldGrams: 2.9,
    price: 54000,
    image: '/images/products/diamond-wedding-band.webp',
    description: 'Curved contour band that hugs the solitaire setting.',
  },
  {
    id: 'minimalist-gold',
    name: 'Solid 18K Knife-Edge Band',
    category: 'band',
    carat: 0.0,
    goldGrams: 3.6,
    price: 32000,
    image: '/images/products/minimalist-gold-ring.webp',
    description: 'Sleek, mirror-polished solid 18K gold band.',
  },
];

const CROWN_OPTIONS: RingLayerOption[] = [
  {
    id: 'floral-crown',
    name: 'Floral Tiara Crown Accent',
    category: 'crown',
    carat: 0.28,
    goldGrams: 2.6,
    price: 48000,
    image: '/images/products/floral-diamond-ring.webp',
    description: 'Marquise-cut diamond tiara peak.',
  },
  {
    id: 'chevron-accent',
    name: 'Art Deco Chevron Band',
    category: 'crown',
    carat: 0.22,
    goldGrams: 2.4,
    price: 42000,
    image: '/images/products/custom-design-ring.webp',
    description: 'Geometric pointed chevron nestling on top.',
  },
];

const METALS = [
  { id: 'rose', name: '18K Rose Gold', colorHex: '#E0A899' },
  { id: 'yellow', name: '18K Yellow Gold', colorHex: '#E5C158' },
  { id: 'white', name: '18K White Gold', colorHex: '#E2E6E9' },
  { id: 'platinum', name: '950 Pure Platinum', colorHex: '#CED4DA' },
];

export const RingStackerStudio: React.FC = () => {
  const [selectedCenter, setSelectedCenter] = useState<RingLayerOption>(CENTERPIECE_OPTIONS[0]);
  const [selectedBand, setSelectedBand] = useState<RingLayerOption | null>(BAND_OPTIONS[0]);
  const [selectedCrown, setSelectedCrown] = useState<RingLayerOption | null>(CROWN_OPTIONS[0]);
  const [selectedMetal, setSelectedMetal] = useState(METALS[0]);
  const [stackAddedSuccess, setStackAddedSuccess] = useState(false);

  const { addItem } = useCart();

  // Active stack list
  const activeStack = [selectedCrown, selectedCenter, selectedBand].filter(Boolean) as RingLayerOption[];

  // Totals
  const totalCarat = activeStack.reduce((sum, r) => sum + r.carat, 0).toFixed(2);
  const totalGold = activeStack.reduce((sum, r) => sum + r.goldGrams, 0).toFixed(1);
  const totalPrice = activeStack.reduce((sum, r) => sum + r.price, 0);

  const handleAddStackToBag = () => {
    activeStack.forEach((r) => {
      addItem({
        productId: r.id,
        name: r.name,
        slug: 'solitaire-twisted-band',
        metal: selectedMetal.name,
        size: 14,
        price: r.price,
        image: r.image,
        quantity: 1,
      });
    });
    setStackAddedSuccess(true);
    setTimeout(() => setStackAddedSuccess(false), 3000);
  };

  return (
    <section className="bg-[#170C06] text-[#F8F2E9] py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-[#C99A54]/25 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#C99A54]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1536px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#28160D] border border-[#C99A54]/40 rounded-full text-[10px] tracking-[0.25em] text-[#E7C58A] uppercase font-mono mb-3">
            <Layers className="w-3.5 h-3.5 text-[#C99A54]" />
            <span>INTERACTIVE ATELIER CURATOR</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F8F2E9] font-normal tracking-wide">
            The Bespoke Ring Stacking Studio
          </h2>
          <p className="text-xs sm:text-sm text-[#F8F2E9]/75 font-light leading-relaxed mt-3 max-w-2xl mx-auto">
            Design an eternal bridal suite or everyday luxury stack. Layer solitaires, eternity bands, and tiara chevron crowns together with live finger visualization and custom metallurgy.
          </p>
        </div>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Canvas: Live Stacked Finger Visualizer */}
          <div className="lg:col-span-6 bg-[#201007] border border-[#C99A54]/30 p-6 sm:p-10 rounded-xs flex flex-col items-center justify-between min-h-[520px] relative overflow-hidden shadow-2xl">
            {/* Top Toolbar */}
            <div className="w-full flex justify-between items-center pb-4 border-b border-[#C99A54]/20 text-xs">
              <span className="font-mono text-[#E7C58A] uppercase tracking-wider text-[11px]">
                {activeStack.length} PIECES STACKED
              </span>
              <div className="flex space-x-2">
                {METALS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedMetal(m);
                    }}
                    className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                      selectedMetal.id === m.id ? 'ring-2 ring-[#E7C58A] scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: m.colorHex }}
                    title={m.name}
                  />
                ))}
              </div>
            </div>

            {/* Finger Silhouette with Layered Rings */}
            <div className="relative w-64 h-80 flex flex-col items-center justify-center my-6">
              {/* Hand/Finger Column */}
              <div className="w-24 h-72 bg-gradient-to-t from-[#2a1b12] to-[#3a271c] rounded-t-full border border-[#C99A54]/30 relative flex flex-col items-center justify-center shadow-2xl">
                {/* Finger Knuckle details */}
                <div className="w-16 h-[1px] bg-white/10 absolute top-20" />
                <div className="w-16 h-[1px] bg-white/10 absolute bottom-16" />

                {/* Layer 1: Crown Tiara (Top) */}
                <AnimatePresence>
                  {selectedCrown && (
                    <motion.div
                      key={selectedCrown.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-28 h-7 z-30 mb-0.5 rounded-sm flex items-center justify-center relative cursor-pointer group"
                      style={{
                        backgroundColor: `${selectedMetal.colorHex}dd`,
                        boxShadow: `0 0 12px ${selectedMetal.colorHex}66`,
                      }}
                      title={selectedCrown.name}
                    >
                      <div className="w-3 h-3 rotate-45 bg-white border border-[#C99A54] -mt-3 shadow-md" />
                      <span className="opacity-0 group-hover:opacity-100 absolute -right-28 text-[9px] bg-black/80 px-2 py-1 text-[#E7C58A] whitespace-nowrap transition-opacity">
                        {selectedCrown.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Layer 2: Solitaire Centerpiece (Middle) */}
                <motion.div
                  key={selectedCenter.id}
                  layout
                  className="w-30 h-9 z-20 my-0.5 rounded-sm flex items-center justify-center relative cursor-pointer group shadow-xl"
                  style={{
                    backgroundColor: selectedMetal.colorHex,
                    boxShadow: `0 0 16px ${selectedMetal.colorHex}88`,
                  }}
                >
                  {/* Solitaire Stone */}
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-white via-[#EBF3F9] to-white border border-[#C99A54] -mt-8 flex items-center justify-center shadow-[0_0_20px_white]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C99A54]" />
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 absolute -right-28 text-[9px] bg-black/80 px-2 py-1 text-[#E7C58A] whitespace-nowrap transition-opacity">
                    {selectedCenter.name}
                  </span>
                </motion.div>

                {/* Layer 3: Eternity / Wedding Band (Bottom) */}
                <AnimatePresence>
                  {selectedBand && (
                    <motion.div
                      key={selectedBand.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-28 h-6 z-10 mt-0.5 rounded-sm flex items-center justify-center relative cursor-pointer group"
                      style={{
                        backgroundColor: `${selectedMetal.colorHex}ee`,
                        boxShadow: `0 0 10px ${selectedMetal.colorHex}55`,
                      }}
                      title={selectedBand.name}
                    >
                      <div className="flex space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                      </div>
                      <span className="opacity-0 group-hover:opacity-100 absolute -right-28 text-[9px] bg-black/80 px-2 py-1 text-[#E7C58A] whitespace-nowrap transition-opacity">
                        {selectedBand.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Stack Metrics Bar */}
            <div className="w-full pt-4 border-t border-[#C99A54]/20 grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-[10px] text-[#71665C] uppercase block">Stack Carats</span>
                <span className="font-mono text-sm sm:text-base text-[#E7C58A] font-semibold">{totalCarat} ct</span>
              </div>
              <div>
                <span className="text-[10px] text-[#71665C] uppercase block">Solid 18K Gold</span>
                <span className="font-mono text-sm sm:text-base text-[#E7C58A] font-semibold">{totalGold} g</span>
              </div>
              <div>
                <span className="text-[10px] text-[#71665C] uppercase block">Total Value</span>
                <span className="font-mono text-sm sm:text-base text-[#E7C58A] font-semibold">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Right Controls: Layer Selectors */}
          <div className="lg:col-span-6 space-y-6">
            {/* Slot 1: Centerpiece Solitaire */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-[#E7C58A] font-mono flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C99A54]" />
                  <span>LAYER 1: SOLITAIRE CENTERPIECE</span>
                </span>
                <span className="text-[11px] text-[#71665C] font-mono">Required</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {CENTERPIECE_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedCenter(item);
                    }}
                    className={`p-3 border text-left transition-all rounded-xs flex flex-col justify-between cursor-pointer ${
                      selectedCenter.id === item.id
                        ? 'bg-[#28160D] border-[#E7C58A] shadow-md'
                        : 'bg-[#201007]/60 border-[#C99A54]/25 hover:border-[#C99A54]/60'
                    }`}
                  >
                    <div>
                      <span className="font-serif text-sm text-[#F8F2E9] block leading-snug line-clamp-1">{item.name}</span>
                      <span className="text-[10px] text-[#71665C] font-mono mt-0.5 block">{item.carat} ct • {item.goldGrams}g</span>
                    </div>
                    <span className="text-xs font-medium text-[#E7C58A] mt-2 block">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slot 2: Wedding / Eternity Band */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-[#E7C58A] font-mono flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C99A54]" />
                  <span>LAYER 2: WEDDING / ETERNITY BAND</span>
                </span>
                {selectedBand && (
                  <button
                    onClick={() => setSelectedBand(null)}
                    className="text-[10px] text-red-300 hover:text-red-400 font-mono transition-colors"
                  >
                    Remove Band
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {BAND_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedBand(item);
                    }}
                    className={`p-3 border text-left transition-all rounded-xs flex flex-col justify-between cursor-pointer ${
                      selectedBand?.id === item.id
                        ? 'bg-[#28160D] border-[#E7C58A] shadow-md'
                        : 'bg-[#201007]/60 border-[#C99A54]/25 hover:border-[#C99A54]/60'
                    }`}
                  >
                    <div>
                      <span className="font-serif text-sm text-[#F8F2E9] block leading-snug line-clamp-1">{item.name}</span>
                      <span className="text-[10px] text-[#71665C] font-mono mt-0.5 block">{item.carat} ct • {item.goldGrams}g</span>
                    </div>
                    <span className="text-xs font-medium text-[#E7C58A] mt-2 block">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slot 3: Crown Tiara / Chevron Accent */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-[#E7C58A] font-mono flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C99A54]" />
                  <span>LAYER 3: TIARA / CHEVRON ACCENT</span>
                </span>
                {selectedCrown && (
                  <button
                    onClick={() => setSelectedCrown(null)}
                    className="text-[10px] text-red-300 hover:text-red-400 font-mono transition-colors"
                  >
                    Remove Accent
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CROWN_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedCrown(item);
                    }}
                    className={`p-3 border text-left transition-all rounded-xs flex flex-col justify-between cursor-pointer ${
                      selectedCrown?.id === item.id
                        ? 'bg-[#28160D] border-[#E7C58A] shadow-md'
                        : 'bg-[#201007]/60 border-[#C99A54]/25 hover:border-[#C99A54]/60'
                    }`}
                  >
                    <div>
                      <span className="font-serif text-sm text-[#F8F2E9] block leading-snug">{item.name}</span>
                      <span className="text-[10px] text-[#71665C] font-mono mt-0.5 block">{item.carat} ct • {item.goldGrams}g</span>
                    </div>
                    <span className="text-xs font-medium text-[#E7C58A] mt-2 block">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-4">
              <button
                onClick={handleAddStackToBag}
                className="w-full py-4 bg-[#C99A54] hover:bg-[#E7C58A] text-[#170C06] font-semibold text-xs tracking-[0.25em] uppercase flex items-center justify-center space-x-3 transition-colors shadow-2xl cursor-pointer"
              >
                {stackAddedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#170C06]" />
                    <span>ENTIRE STACK ADDED TO VAULT BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD COMPLETE {activeStack.length}-PIECE STACK TO BAG (₹{totalPrice.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
