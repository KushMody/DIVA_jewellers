import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gem, Eye, Sparkles, Scale, Compass, Award, Check } from 'lucide-react';
import { playAtelierClick } from '../../utils/audio';

type FourCType = 'carat' | 'cut' | 'color' | 'clarity';

interface ColorGrade {
  grade: string;
  category: string;
  tintHex: string;
  rarity: string;
  description: string;
}

const COLOR_GRADES: ColorGrade[] = [
  { grade: 'D', category: 'Colorless', tintHex: '#FFFFFF', rarity: 'Top 0.1%', description: 'Completely devoid of color. The highest possible grade of optical purity.' },
  { grade: 'E', category: 'Colorless', tintHex: '#FDFEFE', rarity: 'Top 0.5%', description: 'Minute traces of nitrogen detectable only by expert gemological spectrometers.' },
  { grade: 'F', category: 'Colorless', tintHex: '#FCFDFD', rarity: 'Top 1.2%', description: 'Exquisite icy transparency. Considered the benchmark for high jewellery.' },
  { grade: 'G', category: 'Near Colorless', tintHex: '#FAF9F2', rarity: 'Top 5%', description: 'Appears completely colorless face-up when mounted in solid 18K white gold or platinum.' },
  { grade: 'H', category: 'Near Colorless', tintHex: '#F8F6EB', rarity: 'Top 12%', description: 'Warm undertones invisible to the naked eye. Magnificent value.' },
  { grade: 'I-J', category: 'Near Colorless', tintHex: '#F5F1DF', rarity: 'Standard', description: 'Warm romantic luster, pairs gloriously with 18K Yellow and Rose Gold shanks.' },
];

interface ClarityGrade {
  grade: string;
  fullName: string;
  inclusions: string;
  magnification: string;
  description: string;
  points: { x: number; y: number; type: string }[];
}

const CLARITY_GRADES: ClarityGrade[] = [
  {
    grade: 'FL',
    fullName: 'Flawless',
    inclusions: 'None',
    magnification: '10x Microscope',
    description: 'No internal inclusions or external blemishes visible under 10x magnification.',
    points: [],
  },
  {
    grade: 'VVS1',
    fullName: 'Very Very Slightly Included 1',
    inclusions: 'Microscopic Pinpoint',
    magnification: '10x Microscope',
    description: 'Extremely difficult for even a certified master gemologist to detect under 10x magnification.',
    points: [{ x: 52, y: 48, type: 'Micro-Pinpoint' }],
  },
  {
    grade: 'VS1',
    fullName: 'Very Slightly Included 1',
    inclusions: 'Minor Crystal & Cloud',
    magnification: '10x Microscope',
    description: 'Minor internal crystals invisible to the naked eye, preserving 100% optical fire.',
    points: [{ x: 45, y: 42, type: 'Natural Crystal' }, { x: 58, y: 55, type: 'Micro-Cloud' }],
  },
  {
    grade: 'SI1',
    fullName: 'Slightly Included 1',
    inclusions: 'Noticeable Feather',
    magnification: '10x Microscope',
    description: 'Inclusions readily noticeable under 10x magnification; typically eye-clean in smaller carat sizes.',
    points: [{ x: 38, y: 35, type: 'Feather' }, { x: 62, y: 60, type: 'Needle' }, { x: 50, y: 52, type: 'Crystal' }],
  },
];

export const Gemological4CExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FourCType>('carat');

  // Carat state
  const [caratWeight, setCaratWeight] = useState<number>(1.5);

  // Cut state
  const [cutGrade, setCutGrade] = useState<'ideal' | 'deep' | 'shallow'>('ideal');

  // Color state
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);
  const [colorBg, setColorBg] = useState<'dark' | 'light'>('dark');

  // Clarity state
  const [selectedClarityIdx, setSelectedClarityIdx] = useState<number>(1); // default VVS1
  const [highlightInclusions, setHighlightInclusions] = useState<boolean>(true);

  // Calculated dimensions for Carat
  // Diameter (mm) approx ~ 6.5 * (carat / 1.0)^(1/3)
  const diameterMm = (6.5 * Math.pow(caratWeight, 1 / 3)).toFixed(2);
  const surfaceAreaMm2 = (Math.PI * Math.pow(parseFloat(diameterMm) / 2, 2)).toFixed(1);

  const tabs: { id: FourCType; label: string; icon: React.ReactNode; subtitle: string }[] = [
    { id: 'carat', label: '1. CARAT WEIGHT', icon: <Scale className="w-4 h-4" />, subtitle: 'Mass & Millimeter Diameter' },
    { id: 'cut', label: '2. CUT PRECISION', icon: <Compass className="w-4 h-4" />, subtitle: 'Total Internal Reflection' },
    { id: 'color', label: '3. COLOR SPECTRUM', icon: <Sparkles className="w-4 h-4" />, subtitle: 'D-to-Z Natural Whiteness' },
    { id: 'clarity', label: '4. CLARITY PURITY', icon: <Eye className="w-4 h-4" />, subtitle: '10x Optical Loupe Analysis' },
  ];

  return (
    <section className="bg-[#100703] text-[#F8F2E9] py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-[#C99A54]/25 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-[#C99A54]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1536px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#28160D] border border-[#C99A54]/40 rounded-full text-[10px] tracking-[0.25em] text-[#E7C58A] uppercase font-mono mb-3">
            <Award className="w-3.5 h-3.5 text-[#C99A54]" />
            <span>INTERACTIVE GEMOLOGICAL LABORATORY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F8F2E9] font-normal tracking-wide">
            The Master Diamond 4Cs Explorer
          </h2>
          <p className="text-xs sm:text-sm text-[#F8F2E9]/75 font-light leading-relaxed mt-3 max-w-2xl mx-auto">
            Demystify the four universal parameters of natural diamond brilliance. Interact with microscopic facet optics, finger scale proportions, and certified laboratory grading criteria.
          </p>
        </div>

        {/* 4C Tabs Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playAtelierClick();
                setActiveTab(tab.id);
              }}
              className={`p-4 border text-left transition-all duration-300 relative rounded-xs cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#28160D] border-[#E7C58A] shadow-xl'
                  : 'bg-[#170C06]/60 border-[#C99A54]/25 hover:border-[#C99A54]/60 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center space-x-2 text-[#E7C58A] mb-1">
                {tab.icon}
                <span className="text-xs font-semibold tracking-wider uppercase font-mono">
                  {tab.label}
                </span>
              </div>
              <span className="text-[11px] text-[#71665C] block font-light">
                {tab.subtitle}
              </span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active4CTab"
                  className="absolute bottom-0 inset-x-0 h-[2px] bg-[#C99A54]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: CARAT WEIGHT EXPLORER */}
        {activeTab === 'carat' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#170C06] border border-[#C99A54]/30 p-6 sm:p-10"
          >
            {/* Visual Scale Display */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-[#201007] border border-[#C99A54]/20 rounded-xs min-h-[360px] relative overflow-hidden">
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-[#E7C58A] font-mono">
                1:1 LIFE-SIZE FINGER & COIN COMPARISON
              </span>

              {/* Hand/Finger Context Outline */}
              <div className="relative w-full max-w-md h-64 flex items-center justify-around">
                {/* Reference 1 Rupee / 1 Dollar Coin (24mm) */}
                <div className="flex flex-col items-center space-y-2 opacity-50">
                  <div className="w-24 h-24 rounded-full border border-dashed border-[#C99A54] flex items-center justify-center text-[10px] font-mono text-[#E7C58A]">
                    24 mm Coin
                  </div>
                  <span className="text-[10px] text-[#71665C]">Standard Coin</span>
                </div>

                {/* Finger Silhouette with Dynamic Diamond Solitaire */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-20 h-44 bg-gradient-to-t from-[#2a1b12] to-[#3a271c] rounded-t-full border border-[#C99A54]/30 relative flex items-center justify-center shadow-inner">
                    {/* Ring Band */}
                    <div className="w-24 h-5 border-y-2 border-[#E7C58A] bg-[#C99A54]/40 absolute rounded-sm shadow-md" />

                    {/* Dynamic Diamond Solitaire Sized Proportionally */}
                    <motion.div
                      style={{
                        width: `${parseFloat(diameterMm) * 6}px`,
                        height: `${parseFloat(diameterMm) * 6}px`,
                      }}
                      className="rounded-full bg-gradient-to-tr from-[#FFFDF9] via-[#EAF4FC] to-[#FFFFFF] shadow-[0_0_25px_rgba(255,255,255,0.8)] border border-white z-10 flex items-center justify-center relative cursor-pointer"
                      whileHover={{ scale: 1.15 }}
                    >
                      <div className="w-2/3 h-2/3 border border-[#C99A54]/40 rotate-45" />
                    </motion.div>
                  </div>
                  <span className="text-[11px] text-[#E7C58A] font-mono">
                    {caratWeight.toFixed(2)} Carat on Finger
                  </span>
                </div>
              </div>

              {/* Metric Readout Pills */}
              <div className="grid grid-cols-3 gap-3 w-full mt-6 pt-4 border-t border-[#C99A54]/20 text-center">
                <div>
                  <span className="text-[10px] text-[#71665C] uppercase block">Diameter</span>
                  <span className="font-mono text-base text-[#E7C58A] font-semibold">{diameterMm} mm</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#71665C] uppercase block">Crown Area</span>
                  <span className="font-mono text-base text-[#E7C58A] font-semibold">{surfaceAreaMm2} mm²</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#71665C] uppercase block">Total Weight</span>
                  <span className="font-mono text-base text-[#E7C58A] font-semibold">{(caratWeight * 0.2).toFixed(2)} grams</span>
                </div>
              </div>
            </div>

            {/* Interactive Carat Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C99A54] block font-mono">
                  METRIC WEIGHT SCALE
                </span>
                <h3 className="font-serif text-2xl text-[#F8F2E9]">
                  {caratWeight.toFixed(2)} Carat Solitaire
                </h3>
                <p className="text-xs text-[#71665C] leading-relaxed mt-2">
                  1 Carat equals exactly 200 milligrams (0.2 grams). Because diamond crystals grow exponentially rarer in nature as mass increases, price scales non-linearly with carat weight.
                </p>
              </div>

              {/* Carat Slider */}
              <div className="space-y-3 bg-[#201007] p-4 border border-[#C99A54]/25 rounded-xs">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#71665C]">Slide to Adjust Carat:</span>
                  <span className="font-mono text-[#E7C58A] font-semibold">{caratWeight.toFixed(2)} ct</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.5"
                  step="0.1"
                  value={caratWeight}
                  onChange={(e) => setCaratWeight(parseFloat(e.target.value))}
                  className="w-full accent-[#C99A54] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#71665C] font-mono">
                  <span>0.50 ct (Dainty)</span>
                  <span>1.50 ct (Classic)</span>
                  <span>3.50 ct (Statement)</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-2">
                {[0.75, 1.0, 1.5, 2.0, 2.5, 3.0].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      playAtelierClick();
                      setCaratWeight(val);
                    }}
                    className={`px-3 py-1.5 text-xs font-mono border transition-all rounded-2xs cursor-pointer ${
                      caratWeight === val
                        ? 'bg-[#C99A54] text-[#170C06] border-[#C99A54] font-semibold'
                        : 'border-[#C99A54]/30 text-[#E7C58A] hover:border-[#C99A54]'
                    }`}
                  >
                    {val.toFixed(2)} ct
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: CUT PRECISION & RAY PATHS */}
        {activeTab === 'cut' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#170C06] border border-[#C99A54]/30 p-6 sm:p-10"
          >
            {/* Interactive Ray Path Diagram */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-[#201007] border border-[#C99A54]/20 rounded-xs min-h-[360px] relative">
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-[#E7C58A] font-mono">
                INTERNAL LIGHT RAY TRACING SIMULATION
              </span>

              {/* SVG Optical Cross Section */}
              <div className="w-full max-w-sm h-64 flex items-center justify-center relative">
                <svg viewBox="0 0 300 220" className="w-full h-full">
                  {/* Diamond Outline */}
                  {cutGrade === 'ideal' && (
                    <polygon
                      points="150,20 230,70 150,195 70,70"
                      fill="rgba(255,255,255,0.08)"
                      stroke="#E7C58A"
                      strokeWidth="2"
                    />
                  )}
                  {cutGrade === 'shallow' && (
                    <polygon
                      points="150,20 260,60 150,135 40,60"
                      fill="rgba(255,255,255,0.08)"
                      stroke="#E7C58A"
                      strokeWidth="2"
                    />
                  )}
                  {cutGrade === 'deep' && (
                    <polygon
                      points="150,20 210,65 150,210 90,65"
                      fill="rgba(255,255,255,0.08)"
                      stroke="#E7C58A"
                      strokeWidth="2"
                    />
                  )}

                  {/* Incoming Light Rays & Refraction */}
                  {cutGrade === 'ideal' && (
                    <g stroke="#FFF" strokeWidth="2.5" strokeDasharray="3 3">
                      {/* Left Ray: Enters crown, reflects across pavilion, exits table back to eye */}
                      <path d="M100,5 L115,70 L195,130 L150,20" stroke="#FFEAA7" />
                      {/* Right Ray: Enters crown, reflects, exits crown with dispersion */}
                      <path d="M200,5 L185,70 L105,130 L150,20" stroke="#74B9FF" />
                      <circle cx="150" cy="20" r="5" fill="#FFEAA7" className="animate-pulse" />
                    </g>
                  )}

                  {cutGrade === 'shallow' && (
                    <g stroke="#FF7675" strokeWidth="2" strokeDasharray="3 3">
                      {/* Escapes through pavilion bottom */}
                      <path d="M100,5 L120,60 L140,140" />
                      <path d="M200,5 L180,60 L160,140" />
                    </g>
                  )}

                  {cutGrade === 'deep' && (
                    <g stroke="#FF7675" strokeWidth="2" strokeDasharray="3 3">
                      {/* Escapes through pavilion side */}
                      <path d="M110,5 L125,65 L80,140" />
                      <path d="M190,5 L175,65 L220,140" />
                    </g>
                  )}
                </svg>

                {/* Efficiency Badge */}
                <div className="absolute bottom-2 right-4 px-3 py-1 bg-black/60 border border-[#C99A54]/40 rounded-full text-[10px] font-mono text-[#E7C58A]">
                  Light Return: {cutGrade === 'ideal' ? '100% (Maximum Fire)' : cutGrade === 'shallow' ? '42% (Light Leaks Out Bottom)' : '38% (Light Leaks Out Sides)'}
                </div>
              </div>
            </div>

            {/* Cut Selection & Technical Insights */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C99A54] block font-mono">
                  PROPORTION & FACET ANGLES
                </span>
                <h3 className="font-serif text-2xl text-[#F8F2E9]">
                  {cutGrade === 'ideal' ? 'DIVA Triple Excellent (Tolkowsky)' : cutGrade === 'shallow' ? 'Shallow Cut (Fisheye Effect)' : 'Deep Cut (Nailhead Effect)'}
                </h3>
                <p className="text-xs text-[#71665C] leading-relaxed mt-2">
                  Of the 4Cs, **Cut** is the only one dictated by human craftsmanship rather than nature. Precise 57-facet geometry dictates whether a diamond blazes with rainbow scintillation or appears dull and lifeless.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'ideal', label: 'Ideal Hearts & Arrows', subtitle: 'Zero light leakage. Total Internal Reflection.' },
                  { id: 'shallow', label: 'Shallow Spread Cut', subtitle: 'Light leaks out the base. Lacks brilliance.' },
                  { id: 'deep', label: 'Overly Deep Cut', subtitle: 'Light leaks out the girdle. Centers appear dark.' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      playAtelierClick();
                      setCutGrade(item.id as typeof cutGrade);
                    }}
                    className={`w-full p-3.5 border text-left transition-all rounded-xs flex items-center justify-between cursor-pointer ${
                      cutGrade === item.id
                        ? 'bg-[#28160D] border-[#E7C58A] shadow-md'
                        : 'bg-[#201007]/60 border-[#C99A54]/25 hover:border-[#C99A54]/50'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-semibold text-[#F8F2E9] block">{item.label}</span>
                      <span className="text-[10px] text-[#71665C]">{item.subtitle}</span>
                    </div>
                    {cutGrade === item.id && <Check className="w-4 h-4 text-[#C99A54]" />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: COLOR SPECTRUM */}
        {activeTab === 'color' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#170C06] border border-[#C99A54]/30 p-6 sm:p-10"
          >
            {/* Visual Color Gemstone Canvas */}
            <div
              className={`lg:col-span-7 flex flex-col items-center justify-center p-6 border border-[#C99A54]/20 rounded-xs min-h-[360px] relative transition-colors duration-500 ${
                colorBg === 'dark' ? 'bg-[#0E0603]' : 'bg-[#F8F2E9] text-[#18130F]'
              }`}
            >
              <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-mono">
                {colorBg === 'dark' ? 'VELVET BLACK BACKGROUND' : 'HIGH-CRI WHITE LABORATORY BACKGROUND'}
              </div>

              {/* Background switch toggle */}
              <button
                onClick={() => setColorBg(colorBg === 'dark' ? 'light' : 'dark')}
                className="absolute top-4 right-4 px-3 py-1 text-[10px] uppercase tracking-wider border border-[#C99A54]/40 rounded-full hover:bg-[#C99A54]/20 transition-colors cursor-pointer"
              >
                Toggle {colorBg === 'dark' ? 'White Lab Backdrop' : 'Black Velvet Backdrop'}
              </button>

              {/* Rendered Diamond Silhouette with dynamic tint */}
              <div className="relative w-48 h-48 flex items-center justify-center my-6">
                <div
                  className="w-40 h-40 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: COLOR_GRADES[selectedColorIdx].tintHex,
                    boxShadow: colorBg === 'dark' ? '0 0 50px rgba(231,197,138,0.25)' : '0 10px 30px rgba(0,0,0,0.1)',
                  }}
                >
                  <Gem
                    className="w-28 h-28 stroke-[1]"
                    style={{
                      color: colorBg === 'dark' ? '#C99A54' : '#170C06',
                    }}
                  />
                </div>
              </div>

              <div className="text-center space-y-1">
                <span className="font-serif text-3xl font-semibold">
                  Grade {COLOR_GRADES[selectedColorIdx].grade}
                </span>
                <span className="text-xs uppercase tracking-widest opacity-75 block font-mono">
                  {COLOR_GRADES[selectedColorIdx].category} • {COLOR_GRADES[selectedColorIdx].rarity}
                </span>
              </div>
            </div>

            {/* Color Grade Spectrum Selection */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C99A54] block font-mono">
                  GIA / IGI COLOR SCALE
                </span>
                <h3 className="font-serif text-2xl text-[#F8F2E9]">
                  Colorless D to J Warm Spectrum
                </h3>
                <p className="text-xs text-[#71665C] leading-relaxed mt-2">
                  {COLOR_GRADES[selectedColorIdx].description}
                </p>
              </div>

              {/* Interactive Color Spectrum Strip */}
              <div className="grid grid-cols-6 gap-2">
                {COLOR_GRADES.map((cg, idx) => (
                  <button
                    key={cg.grade}
                    onClick={() => {
                      playAtelierClick();
                      setSelectedColorIdx(idx);
                    }}
                    className={`py-3 px-1 border rounded-xs text-center transition-all cursor-pointer ${
                      selectedColorIdx === idx
                        ? 'bg-[#C99A54] text-[#170C06] border-[#C99A54] font-bold shadow-lg'
                        : 'bg-[#201007] border-[#C99A54]/25 text-[#E7C58A] hover:border-[#C99A54]'
                    }`}
                  >
                    <span className="font-serif text-lg block">{cg.grade}</span>
                    <span className="text-[9px] uppercase tracking-tighter opacity-80 block truncate">
                      {cg.category}
                    </span>
                  </button>
                ))}
              </div>

              <div className="p-3.5 bg-[#201007] border border-[#C99A54]/30 rounded-xs text-xs text-[#71665C] space-y-1.5">
                <div className="flex items-center space-x-2 text-[#E7C58A]">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-semibold uppercase tracking-wider text-[11px]">DIVA ATELIER STANDARD</span>
                </div>
                <p className="leading-relaxed">
                  We strictly set grades **D, E, and F** in all engagement and ceremonial solitaire pieces to ensure unmatched icy whiteness.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 4: CLARITY & MICROSCOPIC INSPECTION */}
        {activeTab === 'clarity' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#170C06] border border-[#C99A54]/30 p-6 sm:p-10"
          >
            {/* Interactive Loupe Chamber */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-[#201007] border border-[#C99A54]/20 rounded-xs min-h-[360px] relative">
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-[#E7C58A] font-mono">
                10x MICROSCOPIC CLARITY PLOT
              </span>

              {/* Microscope Circular Field of View */}
              <div className="w-64 h-64 rounded-full border-4 border-[#C99A54] bg-[#120703] relative flex items-center justify-center shadow-2xl overflow-hidden my-4">
                {/* Crosshairs */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div className="w-full h-[1px] bg-[#E7C58A]" />
                  <div className="h-full w-[1px] bg-[#E7C58A] absolute" />
                </div>

                {/* Facet Geometry Matrix */}
                <div className="w-48 h-48 border border-[#C99A54]/40 rotate-45 relative flex items-center justify-center">
                  <div className="w-32 h-32 border border-[#C99A54]/30 rotate-45" />
                </div>

                {/* Microscopic Inclusions on the Plot */}
                {highlightInclusions &&
                  CLARITY_GRADES[selectedClarityIdx].points.map((pt, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ repeat: Infinity, duration: 2.2 }}
                      style={{
                        left: `${pt.x}%`,
                        top: `${pt.y}%`,
                      }}
                      className="absolute z-20 w-3 h-3 rounded-full bg-red-400 border border-white shadow-[0_0_8px_#FF7675] cursor-pointer"
                      title={pt.type}
                    />
                  ))}
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <button
                  onClick={() => setHighlightInclusions(!highlightInclusions)}
                  className="px-3 py-1 border border-[#C99A54]/40 rounded-full text-[#E7C58A] hover:bg-[#C99A54]/20 transition-colors"
                >
                  {highlightInclusions ? 'Hide Inclusion Markers' : 'Highlight Inclusion Markers'}
                </button>
              </div>
            </div>

            {/* Clarity Grade Selection */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C99A54] block font-mono">
                  NATURAL PURITY SCALE
                </span>
                <h3 className="font-serif text-2xl text-[#F8F2E9]">
                  {CLARITY_GRADES[selectedClarityIdx].grade} — {CLARITY_GRADES[selectedClarityIdx].fullName}
                </h3>
                <p className="text-xs text-[#71665C] leading-relaxed mt-2">
                  {CLARITY_GRADES[selectedClarityIdx].description}
                </p>
              </div>

              <div className="space-y-2">
                {CLARITY_GRADES.map((cg, idx) => (
                  <button
                    key={cg.grade}
                    onClick={() => {
                      playAtelierClick();
                      setSelectedClarityIdx(idx);
                    }}
                    className={`w-full p-3 border text-left transition-all rounded-xs flex items-center justify-between cursor-pointer ${
                      selectedClarityIdx === idx
                        ? 'bg-[#28160D] border-[#E7C58A] shadow-md'
                        : 'bg-[#201007]/60 border-[#C99A54]/25 text-[#E7C58A] hover:border-[#C99A54]/50'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-semibold text-[#F8F2E9]">{cg.grade} ({cg.fullName})</span>
                      <span className="text-[10px] text-[#71665C] block">Inclusions: {cg.inclusions}</span>
                    </div>
                    {selectedClarityIdx === idx && <Check className="w-4 h-4 text-[#C99A54]" />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
