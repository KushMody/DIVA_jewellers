import React, { useState } from 'react';
import { Sliders, Check, Heart, Sparkles } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

interface MetalOption {
  id: string;
  name: string;
  colorHex: string;
  purity: string;
  pricePerGram: number;
}

interface DiamondCut {
  id: string;
  name: string;
  shapeDescription: string;
  baseMultiplier: number;
}

const METALS: MetalOption[] = [
  { id: 'rose-gold', name: '18K Rose Gold', colorHex: '#E0A899', purity: '750 Hallmark', pricePerGram: 6800 },
  { id: 'yellow-gold', name: '18K Yellow Gold', colorHex: '#E5C158', purity: '750 Hallmark', pricePerGram: 6800 },
  { id: 'white-gold', name: '18K White Gold', colorHex: '#E2E6E9', purity: '750 Hallmark', pricePerGram: 7100 },
  { id: 'platinum', name: '950 Pure Platinum', colorHex: '#CED4DA', purity: '950 PT Hallmark', pricePerGram: 8200 },
];

const DIAMOND_CUTS: DiamondCut[] = [
  { id: 'round', name: 'Round Brilliant', shapeDescription: '57 facets, maximum scintillation', baseMultiplier: 1.0 },
  { id: 'oval', name: 'Regal Oval', shapeDescription: 'Elongating silhouette, romantic fire', baseMultiplier: 1.08 },
  { id: 'emerald', name: 'Emerald Step-Cut', shapeDescription: 'Art Deco hall of mirrors clarity', baseMultiplier: 1.15 },
  { id: 'cushion', name: 'Cushion Brilliant', shapeDescription: 'Soft pillow vintage radiance', baseMultiplier: 1.04 },
];

const BAND_STYLES = [
  { id: 'twisted', name: 'Twisted Pavé Band', accentWeight: 0.35, goldWeight: 4.8 },
  { id: 'classic', name: 'Classic Knife-Edge', accentWeight: 0.0, goldWeight: 4.2 },
  { id: 'halo', name: 'Cathedral Micro-Pavé', accentWeight: 0.55, goldWeight: 5.2 },
];

export const InteractiveRingStudio: React.FC = () => {
  const [selectedMetal, setSelectedMetal] = useState<string>('rose-gold');
  const [selectedCut, setSelectedCut] = useState<string>('round');
  const [selectedBand, setSelectedBand] = useState<string>('twisted');
  const [caratWeight, setCaratWeight] = useState<number>(1.5);
  const [viewMode, setViewMode] = useState<'macro' | 'hand'>('macro');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const { toggleWishlist } = useWishlist();

  const metal = METALS.find((m) => m.id === selectedMetal) || METALS[0];
  const cut = DIAMOND_CUTS.find((c) => c.id === selectedCut) || DIAMOND_CUTS[0];
  const band = BAND_STYLES.find((b) => b.id === selectedBand) || BAND_STYLES[0];

  // Dynamic price computation
  const baseDiamondPricePerCarat = 82000;
  const diamondCost = Math.round(Math.pow(caratWeight, 1.35) * baseDiamondPricePerCarat * cut.baseMultiplier);
  const goldCost = Math.round(band.goldWeight * metal.pricePerGram);
  const accentCost = Math.round(band.accentWeight * 70000);
  const craftsmanshipCost = 18000;
  const totalPrice = diamondCost + goldCost + accentCost + craftsmanshipCost;

  const handleSaveToWishlist = () => {
    toggleWishlist('diva-01');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <section className="bg-[#F8F2E9] py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-[#C99A54]/25 text-[#18130F]">
      <div className="max-w-[1536px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#170C06] border border-[#C99A54]/40 rounded-full text-[10px] tracking-[0.25em] text-[#E7C58A] uppercase mb-4">
            <Sliders className="w-3.5 h-3.5 text-[#C99A54]" />
            <span>DIVA ATELIER BESPOKE CONFIGURATOR</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#18130F] font-normal tracking-wide">
            Design Your Bespoke Heirloom
          </h2>

          <p className="text-xs sm:text-sm text-[#71665C] font-light leading-relaxed mt-3 max-w-2xl mx-auto">
            Select precious alloys, diamond geometry, and carat scale. Watch specifications and pricing update dynamically in real time.
          </p>

          <div className="flex items-center justify-center space-x-3 mt-5">
            <div className="w-16 h-[1px] bg-[#C99A54]/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C99A54] bg-[#F8F2E9]" />
            <div className="w-16 h-[1px] bg-[#C99A54]/40" />
          </div>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Live Visual Render & Scale View */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-[#C99A54]/20 pb-3">
              <div className="flex space-x-4">
                <button
                  onClick={() => setViewMode('macro')}
                  className={`text-xs tracking-wider uppercase pb-2 relative transition-colors ${
                    viewMode === 'macro' ? 'text-[#170C06] font-semibold' : 'text-[#71665C] hover:text-[#170C06]'
                  }`}
                >
                  Atelier Macro View
                  {viewMode === 'macro' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C99A54]" />
                  )}
                </button>
                <button
                  onClick={() => setViewMode('hand')}
                  className={`text-xs tracking-wider uppercase pb-2 relative transition-colors ${
                    viewMode === 'hand' ? 'text-[#170C06] font-semibold' : 'text-[#71665C] hover:text-[#170C06]'
                  }`}
                >
                  Life-Size Hand Scale
                  {viewMode === 'hand' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C99A54]" />
                  )}
                </button>
              </div>

              <span className="text-[11px] font-mono text-[#C99A54] hidden sm:inline-block">
                SCALE: {caratWeight.toFixed(2)} CT • {metal.name}
              </span>
            </div>

            {/* Visualizer Frame */}
            <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-xs border border-[#C99A54]/30 bg-gradient-to-br from-[#201007] to-[#120703] p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Top Watermark Badge */}
              <div className="flex items-center justify-between z-10">
                <span className="text-[11px] tracking-widest text-[#E7C58A] font-mono uppercase">
                  {cut.name} • {caratWeight.toFixed(2)} Carats
                </span>
                <span
                  className="px-2 py-0.5 rounded-2xs text-[10px] font-mono font-medium border border-white/20 text-[#170C06]"
                  style={{ backgroundColor: metal.colorHex }}
                >
                  {metal.purity}
                </span>
              </div>

              {/* Dynamic Graphic Model */}
              <div className="relative my-auto flex items-center justify-center py-6">
                {viewMode === 'macro' ? (
                  /* High-Resolution Macro View */
                  <div className="relative flex items-center justify-center">
                    {/* Metal Tone Glow behind ring */}
                    <div
                      className="absolute w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-40 transition-colors duration-500"
                      style={{ backgroundColor: metal.colorHex }}
                    />

                    {/* Ring Image with Dynamic Scale */}
                    <img
                      src="/images/products/solitaire-twisted-band.webp"
                      alt="Bespoke ring creation"
                      className="w-56 h-56 sm:w-72 sm:h-72 object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] transition-all duration-300"
                      style={{
                        transform: `scale(${0.85 + caratWeight * 0.1})`,
                      }}
                    />

                    {/* Dynamic Center Sparkle Burst */}
                    <div className="absolute top-1/4 z-20 pointer-events-none animate-pulse">
                      <Sparkles className="w-8 h-8 text-[#FFF2D6] drop-shadow-[0_0_12px_#fff]" />
                    </div>
                  </div>
                ) : (
                  /* Life-Size Hand Scale Preview */
                  <div className="relative flex flex-col items-center justify-center">
                    <img
                      src="/images/details/worn-on-hand.webp"
                      alt="Worn on hand proportion"
                      className="w-64 h-64 sm:w-72 sm:h-72 object-cover rounded-xs border border-[#C99A54]/30 shadow-xl"
                    />
                    <div className="mt-3 px-3 py-1 bg-black/70 border border-[#C99A54]/40 text-[#E7C58A] text-[10px] font-mono">
                      ACTUAL FINGER PROPORTION ({caratWeight.toFixed(2)} CT on Size 12)
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic Bottom Metric Strip */}
              <div className="grid grid-cols-4 gap-2 pt-3 border-t border-[#C99A54]/20 text-[10px] sm:text-xs text-[#F8F2E9]/75 z-10">
                <div>
                  <span className="text-[#C99A54] block">CENTER</span>
                  <span>{caratWeight.toFixed(2)} ct</span>
                </div>
                <div>
                  <span className="text-[#C99A54] block">ACCENT</span>
                  <span>{band.accentWeight} ct</span>
                </div>
                <div>
                  <span className="text-[#C99A54] block">EST. GOLD</span>
                  <span>{band.goldWeight} g</span>
                </div>
                <div className="text-right">
                  <span className="text-[#C99A54] block">PURITY</span>
                  <span>{metal.name.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-5 space-y-6 bg-white p-6 sm:p-8 border border-[#C99A54]/30 rounded-xs shadow-lg">
            {/* Step 1: Select Precious Metal */}
            <div className="space-y-2.5">
              <label className="text-xs tracking-wider uppercase font-semibold text-[#18130F] flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded-full bg-[#C99A54] text-[#170C06] text-[10px] font-bold flex items-center justify-center">
                  1
                </span>
                <span>Select Precious Alloy</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                {METALS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMetal(m.id)}
                    className={`flex items-center space-x-2.5 p-2.5 border text-xs text-left transition-all ${
                      selectedMetal === m.id
                        ? 'border-[#C99A54] bg-[#F8F2E9] ring-1 ring-[#C99A54] text-[#170C06] font-medium'
                        : 'border-[#C99A54]/25 hover:border-[#C99A54]/60 text-[#71665C]'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: m.colorHex }}
                    />
                    <div className="truncate">
                      <span className="block truncate">{m.name}</span>
                      <span className="text-[10px] text-[#71665C] block">{m.purity}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Diamond Cut Geometry */}
            <div className="space-y-2.5 pt-3 border-t border-[#C99A54]/20">
              <label className="text-xs tracking-wider uppercase font-semibold text-[#18130F] flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded-full bg-[#C99A54] text-[#170C06] text-[10px] font-bold flex items-center justify-center">
                  2
                </span>
                <span>Diamond Cut Shape</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                {DIAMOND_CUTS.map((dc) => (
                  <button
                    key={dc.id}
                    onClick={() => setSelectedCut(dc.id)}
                    className={`p-2.5 border text-xs text-left transition-all ${
                      selectedCut === dc.id
                        ? 'border-[#C99A54] bg-[#F8F2E9] ring-1 ring-[#C99A54] text-[#170C06] font-medium'
                        : 'border-[#C99A54]/25 hover:border-[#C99A54]/60 text-[#71665C]'
                    }`}
                  >
                    <span className="font-serif block text-sm">{dc.name}</span>
                    <span className="text-[10px] text-[#71665C] truncate block">{dc.shapeDescription}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Carat Weight Slider */}
            <div className="space-y-2 pt-3 border-t border-[#C99A54]/20">
              <div className="flex items-center justify-between">
                <label className="text-xs tracking-wider uppercase font-semibold text-[#18130F] flex items-center space-x-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#C99A54] text-[#170C06] text-[10px] font-bold flex items-center justify-center">
                    3
                  </span>
                  <span>Center Diamond Carat</span>
                </label>
                <span className="font-mono text-sm font-semibold text-[#C99A54]">
                  {caratWeight.toFixed(2)} CT
                </span>
              </div>

              <input
                type="range"
                min="1.0"
                max="3.5"
                step="0.05"
                value={caratWeight}
                onChange={(e) => setCaratWeight(Number(e.target.value))}
                className="w-full h-1.5 bg-[#F0E5D7] rounded-lg appearance-none cursor-pointer accent-[#C99A54]"
              />

              <div className="flex justify-between text-[10px] text-[#71665C] font-mono">
                <span>1.00 ct (Classic)</span>
                <span>2.00 ct (Statement)</span>
                <span>3.50 ct (Royal)</span>
              </div>
            </div>

            {/* Step 4: Band Style */}
            <div className="space-y-2 pt-3 border-t border-[#C99A54]/20">
              <label className="text-xs tracking-wider uppercase font-semibold text-[#18130F] flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded-full bg-[#C99A54] text-[#170C06] text-[10px] font-bold flex items-center justify-center">
                  4
                </span>
                <span>Band Setting Style</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {BAND_STYLES.map((bs) => (
                  <button
                    key={bs.id}
                    onClick={() => setSelectedBand(bs.id)}
                    className={`p-2 border text-xs text-center transition-all cursor-pointer ${
                      selectedBand === bs.id
                        ? 'border-[#C99A54] bg-[#F8F2E9] ring-1 ring-[#C99A54] text-[#170C06] font-medium'
                        : 'border-[#C99A54]/25 hover:border-[#C99A54]/60 text-[#71665C]'
                    }`}
                  >
                    {bs.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Readout & Action */}
            <div className="pt-4 border-t border-[#C99A54]/30 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs tracking-widest text-[#71665C] uppercase">ESTIMATED ATELIER PRICE</span>
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#170C06]">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={handleSaveToWishlist}
                className="w-full py-3.5 px-4 bg-[#170C06] hover:bg-[#28160D] text-[#E7C58A] text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase font-semibold flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#C99A54] shrink-0" />
                    <span className="truncate">BESPOKE DESIGN SAVED TO WISHLIST</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 shrink-0" />
                    <span className="truncate">SAVE BESPOKE DESIGN TO WISHLIST</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-[#71665C]">
                Includes complimentary custom laser engraving, IGI natural diamond certificate, and insured delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
