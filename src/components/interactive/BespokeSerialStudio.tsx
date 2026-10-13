import React, { useState } from 'react';
import { Award, Check, Sparkles, Shield, Info } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

interface BespokeSerialStudioProps {
  productName?: string;
  defaultMetal?: string;
}

// Simulated limited chapter allocation (250 numbered pieces)
const TOTAL_CHAPTER_PIECES = 250;
const RESERVED_NUMBERS = [1, 7, 8, 11, 21, 42, 69, 77, 88, 99, 100, 108, 111, 150, 199, 200, 222, 250];

export const BespokeSerialStudio: React.FC<BespokeSerialStudioProps> = ({
  productName = 'The Eternal Radiance Solitaire',
  defaultMetal = '18K Rose Gold',
}) => {
  const [selectedSerial, setSelectedSerial] = useState<number>(42);
  const [engravingText, setEngravingText] = useState<string>('FOREVER & ALWAYS • 2026');
  const [engravingFont, setEngravingFont] = useState<'serif' | 'script' | 'modern'>('serif');
  const [isReservedSuccess, setIsReservedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'ring' | 'coin'>('ring');
  const { toggleWishlist } = useWishlist();

  // Serial status
  const isReservedByOthers = RESERVED_NUMBERS.includes(selectedSerial) && selectedSerial !== 42;
  const formattedSerial = String(selectedSerial).padStart(3, '0');

  // Quick picker suggested numbers
  const suggestedNumbers = [7, 18, 24, 42, 72, 88, 108, 143, 214];

  const handleReserve = () => {
    toggleWishlist('diva-01');
    setIsReservedSuccess(true);
    setTimeout(() => setIsReservedSuccess(false), 3500);
  };

  return (
    <section className="bg-[#170C06] text-[#F8F2E9] py-16 md:py-24 px-4 sm:px-6 md:px-12 border-y border-[#C99A54]/25 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C99A54]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#28160D]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1536px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#28160D] border border-[#C99A54]/40 rounded-full text-[10px] tracking-[0.25em] text-[#E7C58A] uppercase mb-4">
            <Award className="w-3.5 h-3.5 text-[#C99A54]" />
            <span>CZARD-INSPIRED LIMITED HOROLOGY CHAPTER</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F8F2E9] font-normal tracking-wide leading-tight">
            Chapter I: Numbered Editions & Laser Inscription
          </h2>

          <p className="text-xs sm:text-sm text-[#F8F2E9]/75 font-light leading-relaxed mt-3 max-w-2xl mx-auto">
            Following the revered tradition of limited Swiss watch chapters, each DIVA heirloom ring is strictly restricted to <span className="text-[#E7C58A] font-medium">250 individually numbered editions</span> worldwide. Claim your unique serial hallmark and live-engrave your personal story.
          </p>

          <div className="flex items-center justify-center space-x-3 mt-5">
            <div className="w-16 h-[1px] bg-[#C99A54]/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C99A54] bg-[#170C06]" />
            <div className="w-16 h-[1px] bg-[#C99A54]/40" />
          </div>
        </div>

        {/* Main Interactive Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive Visualizer (Inner Band & Heirloom Coin) */}
          <div className="lg:col-span-7 space-y-4">
            {/* View Switcher Tabs */}
            <div className="flex items-center justify-between border-b border-[#C99A54]/20 pb-3">
              <div className="flex space-x-4 sm:space-x-6">
                <button
                  onClick={() => setActiveTab('ring')}
                  className={`text-xs tracking-[0.2em] uppercase transition-colors relative pb-2 ${
                    activeTab === 'ring' ? 'text-[#E7C58A] font-semibold' : 'text-[#F8F2E9]/60 hover:text-[#F8F2E9]'
                  }`}
                >
                  Inner Band Laser Engraving
                  {activeTab === 'ring' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C99A54]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('coin')}
                  className={`text-xs tracking-[0.2em] uppercase transition-colors relative pb-2 ${
                    activeTab === 'coin' ? 'text-[#E7C58A] font-semibold' : 'text-[#F8F2E9]/60 hover:text-[#F8F2E9]'
                  }`}
                >
                  Commemorative Keepsake Coin
                  {activeTab === 'coin' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C99A54]" />
                  )}
                </button>
              </div>

              <span className="text-[11px] text-[#C99A54] font-mono hidden sm:inline-block">
                LIVE 1:1 ATELIER RENDER
              </span>
            </div>

            {/* Visualizer Display Box */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-gradient-to-b from-[#1F1109] to-[#0E0603] border border-[#C99A54]/30 rounded-xs p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Top Watermark / Status */}
              <div className="flex items-center justify-between text-[11px] tracking-wider z-10">
                <div className="flex items-center space-x-2 text-[#C99A54]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-mono uppercase">{productName}</span>
                </div>
                <div className="px-2.5 py-1 bg-[#170C06]/80 border border-[#C99A54]/30 rounded-xs text-[#E7C58A] font-mono text-[10px]">
                  EDITION #{formattedSerial} / {TOTAL_CHAPTER_PIECES}
                </div>
              </div>

              {activeTab === 'ring' ? (
                /* Ring Inner Band Visualizer */
                <div className="relative my-auto flex flex-col items-center justify-center py-6">
                  {/* Outer Ring Curvature Glow */}
                  <div className="relative w-full max-w-[520px] h-[130px] sm:h-[150px] flex items-center justify-center">
                    {/* Ring Band Silhouette Graphic */}
                    <svg viewBox="0 0 600 180" className="w-full h-full drop-shadow-[0_10px_25px_rgba(201,154,84,0.25)]">
                      <defs>
                        <linearGradient id="goldShank" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8A6332" />
                          <stop offset="25%" stopColor="#C99A54" />
                          <stop offset="50%" stopColor="#FFF2D6" />
                          <stop offset="75%" stopColor="#C99A54" />
                          <stop offset="100%" stopColor="#8A6332" />
                        </linearGradient>
                        <linearGradient id="innerCavity" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#1E110A" />
                          <stop offset="100%" stopColor="#2D1A10" />
                        </linearGradient>
                      </defs>

                      {/* Outer Ring Arc */}
                      <path
                        d="M 20,90 Q 300,10 580,90 L 575,115 Q 300,45 25,115 Z"
                        fill="url(#goldShank)"
                        stroke="#E7C58A"
                        strokeWidth="1.2"
                      />

                      {/* Inner Polished Surface where laser hallmark & engraving sits */}
                      <path
                        d="M 30,115 Q 300,48 570,115 L 560,150 Q 300,90 40,150 Z"
                        fill="url(#innerCavity)"
                        stroke="#C99A54"
                        strokeWidth="0.8"
                      />
                    </svg>

                    {/* Dynamic Real-Time Laser Hallmarks rendered right over the inner band */}
                    <div className="absolute inset-x-8 top-[58%] -translate-y-1/2 flex items-center justify-center space-x-3 sm:space-x-4 text-center px-4 overflow-hidden pointer-events-none">
                      {/* Official BIS & Atelier Stamp */}
                      <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#E7C58A]/90 border border-[#E7C58A]/40 px-1 py-0.5 rounded-2xs">
                        DIVA
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-[#C99A54]/80">
                        750 AU
                      </span>
                      {/* Limited Edition Serial Number */}
                      <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#FFF2D6] bg-black/40 px-1.5 py-0.5 border-b border-[#C99A54]/50">
                        N°{formattedSerial}/{TOTAL_CHAPTER_PIECES}
                      </span>
                      {/* Customer Custom Engraving Text */}
                      <span
                        className={`text-xs sm:text-sm tracking-widest text-[#F8F2E9] drop-shadow-sm font-medium italic transition-all truncate max-w-[180px] sm:max-w-[240px] ${
                          engravingFont === 'serif'
                            ? 'font-serif'
                            : engravingFont === 'script'
                            ? 'italic font-serif'
                            : 'font-mono'
                        }`}
                      >
                        "{engravingText || 'YOUR INSCRIPTION'}"
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#C99A54]/90 tracking-widest uppercase font-light mt-4 text-center">
                    Sub-micron Nd:YAG Laser Inscription • Depth: 0.15mm • Indelible Hallmark
                  </p>
                </div>
              ) : (
                /* Keepsake Coin Visualizer (Inspired by CZARD box coin) */
                <div className="relative my-auto flex flex-col items-center justify-center py-4">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-[#C99A54] bg-gradient-to-tr from-[#8A6332] via-[#C99A54] to-[#FFF2D6] shadow-[0_0_35px_rgba(201,154,84,0.3)] flex items-center justify-center p-3">
                    {/* Inner Coin Rim */}
                    <div className="w-full h-full rounded-full border-2 border-dashed border-[#170C06]/40 bg-gradient-to-br from-[#170C06] to-[#28160D] flex flex-col items-center justify-center text-center p-3">
                      <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.25em] text-[#C99A54] uppercase">
                        HOUSE OF DIVA
                      </span>
                      <span className="font-serif text-xl sm:text-2xl text-[#E7C58A] font-semibold tracking-wider my-1">
                        N° {formattedSerial}
                      </span>
                      <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-[#F8F2E9]/75 uppercase">
                        CHAPTER I • 250
                      </span>
                      <div className="w-8 h-[1px] bg-[#C99A54]/40 my-1.5" />
                      <span className="text-[7px] text-[#C99A54] uppercase tracking-widest font-mono">
                        GENESIS KEEPSAKE COIN
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#C99A54]/90 tracking-widest uppercase font-light mt-4 text-center">
                    Solid Antiqued Brass Keepsake Coin • Delivered In Handcrafted Walnut Vault Box
                  </p>
                </div>
              )}

              {/* Bottom Specs Bar */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#C99A54]/20 text-[10px] sm:text-xs text-[#F8F2E9]/70">
                <div>
                  <span className="text-[#C99A54] block">ALLOY</span>
                  <span>{defaultMetal}</span>
                </div>
                <div className="text-center">
                  <span className="text-[#C99A54] block">PROVENANCE</span>
                  <span>Geneva & Mumbai Atelier</span>
                </div>
                <div className="text-right">
                  <span className="text-[#C99A54] block">CERTIFICATE</span>
                  <span>IGI Individual Ledger</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Controls (Select Serial & Custom Text) */}
          <div className="lg:col-span-5 space-y-6 bg-[#201007]/80 p-6 sm:p-8 border border-[#C99A54]/25 rounded-xs">
            {/* Step 1: Serial Number Picker */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs tracking-[0.2em] uppercase text-[#E7C58A] font-medium flex items-center space-x-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#C99A54] text-[#170C06] text-[10px] font-bold flex items-center justify-center">
                    1
                  </span>
                  <span>Select Edition Serial Number</span>
                </label>
                <span className="text-xs font-mono text-[#E7C58A]">
                  #{formattedSerial} / 250
                </span>
              </div>

              {/* Slider for smooth serial number exploration */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="250"
                  value={selectedSerial}
                  onChange={(e) => setSelectedSerial(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#170C06] rounded-lg appearance-none cursor-pointer accent-[#C99A54]"
                />
                <div className="flex justify-between text-[10px] text-[#71665C] font-mono">
                  <span>#001 (Genesis)</span>
                  <span>#125 (Mid-Chapter)</span>
                  <span>#250 (Finale)</span>
                </div>
              </div>

              {/* Quick Pick Pills */}
              <div className="pt-1">
                <span className="text-[10px] uppercase tracking-wider text-[#71665C] block mb-1.5">
                  Suggested Significant Numbers:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedNumbers.map((num) => (
                    <button
                      key={num}
                      onClick={() => setSelectedSerial(num)}
                      className={`px-2.5 py-1 text-xs font-mono rounded-xs border transition-all ${
                        selectedSerial === num
                          ? 'border-[#C99A54] bg-[#C99A54] text-[#170C06] font-bold'
                          : 'border-[#C99A54]/30 bg-[#170C06]/60 text-[#F8F2E9]/80 hover:border-[#C99A54]'
                      }`}
                    >
                      #{String(num).padStart(3, '0')}
                    </button>
                  ))}
                </div>
              </div>

              {isReservedByOthers && (
                <div className="flex items-center space-x-2 text-xs text-[#E58282] bg-[#E58282]/10 border border-[#E58282]/30 px-3 py-1.5 rounded-2xs">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Edition #{formattedSerial} has already been acquired. Please select an available serial.</span>
                </div>
              )}
            </div>

            {/* Step 2: Custom Laser Engraving Input */}
            <div className="space-y-3 pt-4 border-t border-[#C99A54]/20">
              <div className="flex items-center justify-between">
                <label className="text-xs tracking-[0.2em] uppercase text-[#E7C58A] font-medium flex items-center space-x-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#C99A54] text-[#170C06] text-[10px] font-bold flex items-center justify-center">
                    2
                  </span>
                  <span>Bespoke Inner Inscription</span>
                </label>
                <span className="text-[10px] text-[#71665C] font-mono">
                  {engravingText.length} / 28 chars
                </span>
              </div>

              <input
                type="text"
                maxLength={28}
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                placeholder="E.G. ARJUN & PRIYA • 12.10.2026"
                className="w-full bg-[#170C06] border border-[#C99A54]/30 text-xs sm:text-sm py-2.5 px-3 text-[#F8F2E9] focus:outline-none focus:border-[#C99A54] tracking-wider uppercase font-mono placeholder:text-white/30"
              />

              {/* Font Style Selection */}
              <div className="flex space-x-2 pt-1">
                {[
                  { id: 'serif', label: 'Classical Roman' },
                  { id: 'script', label: 'Italic Atelier' },
                  { id: 'modern', label: 'Horology Mono' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setEngravingFont(f.id as typeof engravingFont)}
                    className={`flex-1 py-1.5 text-[11px] border transition-all ${
                      engravingFont === f.id
                        ? 'border-[#C99A54] bg-[#C99A54]/20 text-[#E7C58A] font-medium'
                        : 'border-[#C99A54]/20 bg-[#170C06]/40 text-[#F8F2E9]/60 hover:border-[#C99A54]/50'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Reservation & Ledger Action */}
            <div className="pt-4 border-t border-[#C99A54]/20 space-y-3">
              <button
                onClick={handleReserve}
                disabled={isReservedByOthers}
                className={`w-full py-3.5 px-4 text-xs tracking-[0.25em] uppercase font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${
                  isReservedByOthers
                    ? 'bg-white/10 text-white/40 cursor-not-allowed border border-white/10'
                    : 'bg-[#C99A54] hover:bg-[#E7C58A] text-[#170C06] shadow-lg hover:shadow-[#C99A54]/30 cursor-pointer'
                }`}
              >
                {isReservedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#170C06]" />
                    <span>EDITION #{formattedSerial} RESERVED IN ATELIER LEDGER</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>CLAIM EDITION #{formattedSerial} WITH CUSTOM INSCRIPTION</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#71665C] pt-1">
                <span className="flex items-center space-x-1">
                  <Shield className="w-3.5 h-3.5 text-[#C99A54]" />
                  <span>Complimentary Laser Engraving</span>
                </span>
                <span>Includes Matching Coin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
