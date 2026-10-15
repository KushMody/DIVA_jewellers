import React, { useState } from 'react';
import { CreditCard, Ruler, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SizeRow {
  inSize: number;
  usSize: string;
  diameter: number; // in mm
  circ: number; // in mm
}

const SIZE_CHART: SizeRow[] = [
  { inSize: 8, usSize: '4.5', diameter: 15.3, circ: 48.0 },
  { inSize: 9, usSize: '5.0', diameter: 15.7, circ: 49.3 },
  { inSize: 10, usSize: '5.5', diameter: 16.0, circ: 50.3 },
  { inSize: 11, usSize: '5.75', diameter: 16.3, circ: 51.2 },
  { inSize: 12, usSize: '6.0', diameter: 16.5, circ: 51.9 },
  { inSize: 13, usSize: '6.5', diameter: 16.9, circ: 53.1 },
  { inSize: 14, usSize: '7.0', diameter: 17.3, circ: 54.4 },
  { inSize: 15, usSize: '7.25', diameter: 17.6, circ: 55.3 },
  { inSize: 16, usSize: '7.5', diameter: 17.9, circ: 56.3 },
  { inSize: 17, usSize: '8.0', diameter: 18.2, circ: 57.2 },
  { inSize: 18, usSize: '8.5', diameter: 18.5, circ: 58.1 },
  { inSize: 19, usSize: '8.75', diameter: 18.9, circ: 59.4 },
  { inSize: 20, usSize: '9.0', diameter: 19.2, circ: 60.3 },
  { inSize: 21, usSize: '9.5', diameter: 19.5, circ: 61.3 },
  { inSize: 22, usSize: '10.0', diameter: 19.8, circ: 62.2 },
];

export const SmartRingCalibrator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calibrator' | 'quiz'>('calibrator');

  // Screen calibration state: standard credit card width is 85.6mm.
  // Default pixels per mm ~ 3.78 (for standard 96dpi display).
  const [pixelsPerMm, setPixelsPerMm] = useState<number>(3.8);
  const [creditCardPx, setCreditCardPx] = useState<number>(325); // 85.6 * 3.8 ~ 325px
  const [isCalibrated, setIsCalibrated] = useState<boolean>(false);

  // Ring circle diameter slider in mm
  const [currentDiameterMm, setCurrentDiameterMm] = useState<number>(16.5); // default size 12

  // Persona Quiz state
  const [quizOccasion, setQuizOccasion] = useState<string>('engagement');
  const [quizStyle, setQuizStyle] = useState<string>('timeless');
  const [quizGold, setQuizGold] = useState<string>('rose');

  // Compute matched ring size from diameter
  const matchedSize = SIZE_CHART.reduce((prev, curr) => {
    return Math.abs(curr.diameter - currentDiameterMm) < Math.abs(prev.diameter - currentDiameterMm)
      ? curr
      : prev;
  });

  // Circle pixel diameter based on calibration
  const circleDiameterPx = Math.round(currentDiameterMm * pixelsPerMm * 2.2);

  const handleCardSlider = (val: number) => {
    setCreditCardPx(val);
    setPixelsPerMm(val / 85.6);
    setIsCalibrated(true);
  };

  return (
    <section id="ring-calibrator" className="bg-[#170C06] text-[#F8F2E9] py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-[#C99A54]/25 relative overflow-hidden">
      <div className="max-w-[1536px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#28160D] border border-[#C99A54]/40 rounded-full text-[10px] tracking-[0.25em] text-[#E7C58A] uppercase mb-4">
            <Ruler className="w-3.5 h-3.5 text-[#C99A54]" />
            <span>SMART ON-SCREEN RING SIZING & QUIZ ATELIER</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F8F2E9] font-normal tracking-wide">
            Find Your Flawless Fit
          </h2>

          <p className="text-xs sm:text-sm text-[#F8F2E9]/75 font-light leading-relaxed mt-3 max-w-2xl mx-auto">
            Place an existing ring directly on your screen to measure internal diameter with physical millimeter precision, or take our 60-second bridal style match quiz.
          </p>

          <div className="flex items-center justify-center space-x-3 mt-5">
            <div className="w-16 h-[1px] bg-[#C99A54]/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C99A54] bg-[#170C06]" />
            <div className="w-16 h-[1px] bg-[#C99A54]/40" />
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-[#201007] border border-[#C99A54]/30 rounded-xs">
            <button
              onClick={() => setActiveTab('calibrator')}
              className={`px-5 py-2 text-xs tracking-wider uppercase transition-all ${
                activeTab === 'calibrator'
                  ? 'bg-[#C99A54] text-[#170C06] font-semibold shadow-md'
                  : 'text-[#F8F2E9]/70 hover:text-[#E7C58A]'
              }`}
            >
              Virtual On-Screen Calibrator
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-5 py-2 text-xs tracking-wider uppercase transition-all ${
                activeTab === 'quiz'
                  ? 'bg-[#C99A54] text-[#170C06] font-semibold shadow-md'
                  : 'text-[#F8F2E9]/70 hover:text-[#E7C58A]'
              }`}
            >
              60-Second Ring Style Quiz
            </button>
          </div>
        </div>

        {activeTab === 'calibrator' ? (
          /* Tool 1: Interactive Calibrator & Sizing Circle */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Interactive Sizing Circle Canvas */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-square sm:aspect-[4/3] w-full rounded-xs border border-[#C99A54]/30 bg-gradient-to-br from-[#1E1109] to-[#0A0401] p-6 flex flex-col justify-between items-center overflow-hidden shadow-2xl">
                {/* Top readout */}
                <div className="w-full flex items-center justify-between text-[11px] text-[#C99A54] font-mono z-10">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#C99A54] animate-ping" />
                    <span>PLACE PHYSICAL RING ON SCREEN</span>
                  </span>
                  <span>ACCURACY: ±0.1 MM</span>
                </div>

                {/* Sizing Circle Area */}
                <div className="relative my-auto flex flex-col items-center justify-center">
                  {/* Glowing Ring Target Circle */}
                  <div
                    className="rounded-full border-2 border-[#E7C58A] bg-[#C99A54]/10 shadow-[0_0_25px_rgba(201,154,84,0.4)] flex flex-col items-center justify-center transition-all duration-100 relative"
                    style={{
                      width: `${circleDiameterPx}px`,
                      height: `${circleDiameterPx}px`,
                    }}
                  >
                    {/* Crosshair guidelines */}
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#C99A54]/30 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#C99A54]/30 pointer-events-none" />

                    {/* Diameter Text readout */}
                    <span className="font-mono text-sm sm:text-base font-bold text-[#FFF2D6] z-10 bg-[#170C06]/80 px-2 py-0.5 border border-[#C99A54]/40 rounded-2xs">
                      {currentDiameterMm.toFixed(1)} mm
                    </span>
                    <span className="text-[9px] text-[#C99A54] font-mono uppercase mt-0.5">
                      INTERNAL DIAMETER
                    </span>
                  </div>

                  <p className="text-[11px] text-[#C99A54] tracking-wider uppercase font-light mt-6 text-center">
                    Adjust slider below until glowing edge aligns with your ring's inner rim
                  </p>
                </div>

                {/* Diameter Slider */}
                <div className="w-full space-y-2 z-10 border-t border-[#C99A54]/20 pt-3">
                  <div className="flex justify-between text-xs text-[#F8F2E9]/80">
                    <span>Adjust Diameter: 14.8 mm to 21.0 mm</span>
                    <span className="font-mono text-[#E7C58A] font-semibold">
                      {currentDiameterMm.toFixed(1)} mm
                    </span>
                  </div>

                  <input
                    type="range"
                    min="14.8"
                    max="21.0"
                    step="0.1"
                    value={currentDiameterMm}
                    onChange={(e) => setCurrentDiameterMm(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#170C06] rounded-lg appearance-none cursor-pointer accent-[#C99A54]"
                  />
                </div>
              </div>
            </div>

            {/* Right: Sizing Match Card & Screen Calibration Step */}
            <div className="lg:col-span-5 space-y-6">
              {/* Result Card */}
              <div className="bg-[#201007]/90 border border-[#C99A54]/30 p-6 sm:p-7 rounded-xs space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-[#C99A54]/20 pb-3">
                  <span className="text-[10px] tracking-[0.25em] text-[#C99A54] uppercase font-mono">
                    YOUR VERIFIED MEASUREMENT
                  </span>
                  <span className="text-xs text-[#E7C58A] font-mono bg-[#170C06] px-2 py-0.5 border border-[#C99A54]/30">
                    MATCH CONFIRMED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center py-2">
                  <div className="bg-[#170C06] border border-[#C99A54]/20 p-3 rounded-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#71665C] block">
                      INDIAN RING SIZE
                    </span>
                    <span className="font-serif text-3xl sm:text-4xl text-[#E7C58A] font-semibold">
                      Size {matchedSize.inSize}
                    </span>
                  </div>
                  <div className="bg-[#170C06] border border-[#C99A54]/20 p-3 rounded-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#71665C] block">
                      US / CANADIAN SIZE
                    </span>
                    <span className="font-serif text-3xl sm:text-4xl text-[#F8F2E9] font-semibold">
                      Size {matchedSize.usSize}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#F8F2E9]/75 pt-2 border-t border-[#C99A54]/20">
                  <div className="flex justify-between">
                    <span>Internal Diameter:</span>
                    <span className="font-mono text-[#E7C58A]">{matchedSize.diameter} mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Finger Circumference:</span>
                    <span className="font-mono text-[#E7C58A]">{matchedSize.circ} mm</span>
                  </div>
                </div>

                <Link
                  to="/rings"
                  className="w-full py-3 px-4 bg-[#C99A54] hover:bg-[#E7C58A] text-[#170C06] text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center space-x-2 transition-all shadow-md block text-center"
                >
                  <span>SHOP RINGS IN SIZE {matchedSize.inSize}</span>
                  <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                </Link>
              </div>

              {/* Optional Screen PPI Calibrator Accordion */}
              <div className="bg-[#170C06] border border-[#C99A54]/20 p-4 rounded-xs space-y-3">
                <div className="flex items-center justify-between text-xs text-[#E7C58A] font-medium">
                  <span className="flex items-center space-x-1.5">
                    <CreditCard className="w-4 h-4 text-[#C99A54]" />
                    <span>Optional: Calibrate with Credit Card</span>
                  </span>
                  {isCalibrated && (
                    <span className="text-[10px] text-[#C99A54] flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>Calibrated</span>
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-[#71665C] leading-relaxed">
                  Hold any standard credit card against the screen. Adjust this bar until the white card outline below matches your card width:
                </p>

                {/* Simulated Card Outline */}
                <div
                  className="h-14 max-w-full border border-dashed border-white/60 bg-white/5 rounded-xs flex items-center justify-center text-[10px] text-white/70 mx-auto transition-all text-center px-1"
                  style={{ width: `${Math.min(340, creditCardPx)}px` }}
                >
                  CREDIT CARD WIDTH (85.6 MM)
                </div>

                <input
                  type="range"
                  min="260"
                  max="420"
                  value={creditCardPx}
                  onChange={(e) => handleCardSlider(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#201007] rounded-lg appearance-none cursor-pointer accent-[#C99A54]"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Tool 2: 60-Second Bridal Style Quiz */
          <div className="max-w-2xl mx-auto bg-[#201007]/90 border border-[#C99A54]/30 p-6 sm:p-10 rounded-xs space-y-8 shadow-2xl">
            {/* Question 1 */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-[#E7C58A] font-semibold block">
                1. What is the cherished occasion?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'engagement', label: 'Engagement Proposal' },
                  { id: 'wedding', label: 'Wedding Ceremony' },
                  { id: 'milestone', label: 'Personal Milestone' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setQuizOccasion(item.id)}
                    className={`p-3 text-xs border text-center transition-all ${
                      quizOccasion === item.id
                        ? 'border-[#C99A54] bg-[#C99A54]/20 text-[#E7C58A] font-medium'
                        : 'border-[#C99A54]/20 text-[#F8F2E9]/70 hover:border-[#C99A54]/40'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-[#E7C58A] font-semibold block">
                2. Which aesthetic speaks to your heart?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'timeless', label: 'Timeless Solitaire' },
                  { id: 'halo', label: 'Vintage Royal Halo' },
                  { id: 'modern', label: 'Twisted Contemporary' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setQuizStyle(item.id)}
                    className={`p-3 text-xs border text-center transition-all ${
                      quizStyle === item.id
                        ? 'border-[#C99A54] bg-[#C99A54]/20 text-[#E7C58A] font-medium'
                        : 'border-[#C99A54]/20 text-[#F8F2E9]/70 hover:border-[#C99A54]/40'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-[#E7C58A] font-semibold block">
                3. Preferred Precious Gold Hue?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'rose', label: '18K Rose Gold' },
                  { id: 'yellow', label: '18K Yellow Gold' },
                  { id: 'white', label: '18K White Gold / PT' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setQuizGold(item.id)}
                    className={`p-3 text-xs border text-center transition-all ${
                      quizGold === item.id
                        ? 'border-[#C99A54] bg-[#C99A54]/20 text-[#E7C58A] font-medium'
                        : 'border-[#C99A54]/20 text-[#F8F2E9]/70 hover:border-[#C99A54]/40'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recommendation Result */}
            <div className="pt-4 border-t border-[#C99A54]/25 space-y-4">
              <div className="bg-[#170C06] p-4 border border-[#C99A54]/30 rounded-xs flex items-center space-x-4">
                <img
                  src="/images/products/solitaire-twisted-band.webp"
                  alt="Recommended ring"
                  className="w-16 h-16 object-contain bg-[#201007] border border-[#C99A54]/20 p-1"
                />
                <div>
                  <span className="text-[10px] tracking-widest text-[#C99A54] uppercase font-mono">
                    YOUR CURATED MATCH
                  </span>
                  <h4 className="font-serif text-lg text-[#F8F2E9]">Solitaire Twisted Band Ring</h4>
                  <span className="text-xs text-[#E7C58A] font-mono">₹1,24,999 • 18K Rose Gold</span>
                </div>
              </div>

              <Link
                to="/rings/solitaire-twisted-band"
                className="w-full py-3.5 px-4 bg-[#C99A54] hover:bg-[#E7C58A] text-[#170C06] text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center space-x-2 transition-all shadow-md block text-center"
              >
                <span>EXPLORE YOUR CURATED PIECE</span>
                <ArrowRight className="w-4 h-4 inline" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
