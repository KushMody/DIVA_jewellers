import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Sparkles, Flame, Eye, Compass, Sliders, RefreshCw } from 'lucide-react';

interface LightingPreset {
  id: 'atelier' | 'candlelight' | 'sunlight' | 'nocturnal';
  name: string;
  subtitle: string;
  bgGradient: string;
  glowColor: string;
  sparkleTint: string;
  facetBrightness: number;
  fireIntensity: number;
  description: string;
}

const LIGHTING_PRESETS: LightingPreset[] = [
  {
    id: 'atelier',
    name: 'Atelier Spotlight',
    subtitle: '5500K High-CRI Laboratory Illumination',
    bgGradient: 'from-[#1E1109] via-[#120703] to-[#080301]',
    glowColor: 'rgba(255, 248, 235, 0.45)',
    sparkleTint: '#FFF5E0',
    facetBrightness: 1.0,
    fireIntensity: 0.85,
    description: 'Crisp, high-fidelity light revealing microscopic VVS1 clarity and flawless cut symmetry.',
  },
  {
    id: 'candlelight',
    name: 'Candlelight Gala',
    subtitle: '2200K Warm Amber Evening Romance',
    bgGradient: 'from-[#2C1306] via-[#180902] to-[#0A0401]',
    glowColor: 'rgba(235, 150, 60, 0.55)',
    sparkleTint: '#FFD39B',
    facetBrightness: 0.9,
    fireIntensity: 0.95,
    description: 'Warm candlelight brings forth golden warmth and deep internal romantic luster.',
  },
  {
    id: 'sunlight',
    name: 'Sunlit Radiance',
    subtitle: '6500K Direct Solar Prism Dispersion',
    bgGradient: 'from-[#281608] via-[#150B04] to-[#0B0502]',
    glowColor: 'rgba(255, 220, 140, 0.7)',
    sparkleTint: '#FFF8EB',
    facetBrightness: 1.25,
    fireIntensity: 1.3,
    description: 'Direct sunlight unleashes full rainbow prism fire, dancing scintillation, and brilliance.',
  },
  {
    id: 'nocturnal',
    name: 'Nocturnal Luminescence',
    subtitle: 'Czard-Inspired Lume & Blue Fluorescence',
    bgGradient: 'from-[#0A0E1A] via-[#05070D] to-[#020306]',
    glowColor: 'rgba(100, 180, 255, 0.65)',
    sparkleTint: '#90E0EF',
    facetBrightness: 0.8,
    fireIntensity: 1.2,
    description: 'Inspired by horological lume switches, revealing natural diamond blue fluorescence and ethereal nocturnal glow.',
  },
];

export const DiamondLightSimulator: React.FC = () => {
  const [activePreset, setActivePreset] = useState<LightingPreset['id']>('atelier');
  const [lightAngle, setLightAngle] = useState<number>(45); // degrees 0-360
  const [scintillationIntensity, setScintillationIntensity] = useState<number>(85);
  const [isAutoRotatingLight, setIsAutoRotatingLight] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const preset = LIGHTING_PRESETS.find((p) => p.id === activePreset) || LIGHTING_PRESETS[0];

  // Auto-rotate the light angle gently
  useEffect(() => {
    if (!isAutoRotatingLight) return;
    const interval = setInterval(() => {
      setLightAngle((prev) => (prev + 1.2) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoRotatingLight]);

  // Mouse / touch interactive light position
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rad = Math.atan2(y, x);
    let deg = (rad * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;
    setLightAngle(Math.round(deg));
    setIsAutoRotatingLight(false);
  };

  // Compute light coordinates on a circle
  const radian = ((lightAngle - 90) * Math.PI) / 180;
  const lightRadius = 140;
  const lightX = Math.cos(radian) * lightRadius;
  const lightY = Math.sin(radian) * lightRadius;

  // Facet sparkle positions around the brilliant round cut
  const sparkles = [
    { x: -50, y: -45, delay: 0.1, size: 18 },
    { x: 45, y: -40, delay: 0.6, size: 22 },
    { x: 0, y: -65, delay: 0.3, size: 26 },
    { x: -60, y: 15, delay: 0.9, size: 16 },
    { x: 60, y: 20, delay: 0.4, size: 20 },
    { x: -20, y: 55, delay: 0.7, size: 24 },
    { x: 25, y: 50, delay: 0.2, size: 19 },
    { x: 0, y: 0, delay: 0.5, size: 30 }, // Center table facet
  ];

  return (
    <section className="bg-[#170C06] text-[#F8F2E9] py-16 md:py-24 px-4 sm:px-6 md:px-12 border-b border-[#C99A54]/25 relative overflow-hidden">
      <div className="max-w-[1536px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#28160D] border border-[#C99A54]/40 rounded-full text-[10px] tracking-[0.25em] text-[#E7C58A] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C99A54]" />
            <span>OPTICAL SCINTILLATION & LUME SIMULATOR</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F8F2E9] font-normal tracking-wide">
            Interactive Diamond Light & Luster Studio
          </h2>

          <p className="text-xs sm:text-sm text-[#F8F2E9]/75 font-light leading-relaxed mt-3 max-w-2xl mx-auto">
            Experience how the 57 hand-polished facets of our Ideal Cut solitaire disperse light in different atmospheres. Drag the orbiting light source or toggle the nocturnal luminescence mode.
          </p>

          <div className="flex items-center justify-center space-x-3 mt-5">
            <div className="w-16 h-[1px] bg-[#C99A54]/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#C99A54] bg-[#170C06]" />
            <div className="w-16 h-[1px] bg-[#C99A54]/40" />
          </div>
        </div>

        {/* 4 Environment Preset Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {LIGHTING_PRESETS.map((p) => {
            const isActive = activePreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePreset(p.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xs border text-xs tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-[#C99A54] bg-[#C99A54] text-[#170C06] font-semibold shadow-lg shadow-[#C99A54]/20 scale-102'
                    : 'border-[#C99A54]/30 bg-[#28160D]/60 text-[#F8F2E9]/80 hover:border-[#C99A54] hover:text-[#E7C58A]'
                }`}
              >
                {p.id === 'atelier' && <Eye className="w-3.5 h-3.5" />}
                {p.id === 'candlelight' && <Flame className="w-3.5 h-3.5" />}
                {p.id === 'sunlight' && <Sun className="w-3.5 h-3.5" />}
                {p.id === 'nocturnal' && <Moon className="w-3.5 h-3.5" />}
                <span className="uppercase">{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Lighting Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Diamond Light Canvas */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onPointerMove={handlePointerMove}
              className={`relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xs border border-[#C99A54]/35 bg-gradient-to-br ${preset.bgGradient} p-6 flex flex-col justify-between overflow-hidden shadow-2xl transition-colors duration-700 select-none cursor-crosshair`}
            >
              {/* Top readout */}
              <div className="flex items-center justify-between z-20">
                <div className="flex items-center space-x-2 text-[11px] text-[#C99A54] font-mono tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#C99A54] animate-ping" />
                  <span className="uppercase">{preset.subtitle}</span>
                </div>
                <div className="flex items-center space-x-2 bg-black/50 px-2.5 py-1 border border-[#C99A54]/30 text-[10px] text-[#E7C58A] font-mono">
                  <span>LIGHT BEARING: {Math.round(lightAngle)}°</span>
                  <button
                    onClick={() => setIsAutoRotatingLight(!isAutoRotatingLight)}
                    className="hover:text-white transition-colors ml-1 p-0.5"
                    title="Toggle auto orbit"
                  >
                    <RefreshCw className={`w-3 h-3 ${isAutoRotatingLight ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Dynamic Center Jewel and Light Source */}
              <div className="relative my-auto flex items-center justify-center py-4">
                {/* Dynamic Ambient Glow centered on light position */}
                <div
                  className="absolute w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-300"
                  style={{
                    backgroundColor: preset.glowColor,
                    transform: `translate(${lightX * 0.7}px, ${lightY * 0.7}px)`,
                    opacity: 0.75,
                  }}
                />

                {/* Orbiting Light Indicator */}
                <div
                  className="absolute z-30 pointer-events-none transition-all duration-75"
                  style={{
                    transform: `translate(${lightX}px, ${lightY}px)`,
                  }}
                >
                  <div className="relative flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 border border-white/60 animate-ping absolute" />
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white shadow-[0_0_20px_#fff] flex items-center justify-center"
                      style={{ backgroundColor: preset.sparkleTint }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  </div>
                </div>

                {/* SVG High-Precision Diamond Solitaire Facet Matrix */}
                <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
                  <svg viewBox="0 0 300 300" className="w-full h-full">
                    <defs>
                      <radialGradient id="tableFacetGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={preset.sparkleTint} stopOpacity={preset.facetBrightness} />
                        <stop offset="70%" stopColor={preset.sparkleTint} stopOpacity={preset.facetBrightness * 0.4} />
                        <stop offset="100%" stopColor="#170C06" stopOpacity="0.8" />
                      </radialGradient>
                      <linearGradient id="facetReflection" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                        <stop offset="50%" stopColor={preset.sparkleTint} stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#8A6332" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>

                    {/* Outer Girdle Polygon */}
                    <polygon
                      points="150,20 240,55 280,150 240,245 150,280 60,245 20,150 60,55"
                      fill="url(#tableFacetGlow)"
                      stroke="#E7C58A"
                      strokeWidth="1.2"
                      className="transition-all duration-500"
                    />

                    {/* Star & Kite Facets (57 Facets Pattern) */}
                    <polygon points="150,20 185,85 150,110 115,85" fill="rgba(255,255,255,0.25)" stroke="#C99A54" strokeWidth="0.8" />
                    <polygon points="240,55 215,115 185,85 200,60" fill="rgba(255,255,255,0.35)" stroke="#C99A54" strokeWidth="0.8" />
                    <polygon points="280,150 215,150 215,115 250,135" fill="rgba(255,255,255,0.2)" stroke="#C99A54" strokeWidth="0.8" />
                    <polygon points="240,245 200,240 215,185 215,150" fill="rgba(255,255,255,0.3)" stroke="#C99A54" strokeWidth="0.8" />
                    <polygon points="150,280 115,215 150,190 185,215" fill="rgba(255,255,255,0.2)" stroke="#C99A54" strokeWidth="0.8" />
                    <polygon points="60,245 85,185 115,215 100,240" fill="rgba(255,255,255,0.35)" stroke="#C99A54" strokeWidth="0.8" />
                    <polygon points="20,150 85,150 85,185 50,165" fill="rgba(255,255,255,0.2)" stroke="#C99A54" strokeWidth="0.8" />
                    <polygon points="60,55 100,60 85,115 85,150" fill="rgba(255,255,255,0.3)" stroke="#C99A54" strokeWidth="0.8" />

                    {/* Octagonal Center Table Facet */}
                    <polygon
                      points="150,110 185,115 215,150 185,185 150,190 115,185 85,150 115,115"
                      fill="url(#facetReflection)"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />

                    {/* Internal Cross Star Fire */}
                    <line x1="150" y1="110" x2="150" y2="190" stroke="#FFF" strokeWidth="0.8" strokeDasharray="2,2" />
                    <line x1="85" y1="150" x2="215" y2="150" stroke="#FFF" strokeWidth="0.8" strokeDasharray="2,2" />
                  </svg>

                  {/* Dynamic Optical Scintillation Stars */}
                  {sparkles.map((sp, idx) => {
                    const dynamicScale = Math.sin((lightAngle + sp.delay * 180) * 0.05) * 0.5 + 0.8;
                    const opacity = Math.min(1, Math.max(0.2, dynamicScale * (scintillationIntensity / 100)));

                    return (
                      <div
                        key={idx}
                        className="absolute pointer-events-none transition-transform duration-100 ease-out"
                        style={{
                          transform: `translate(${sp.x}px, ${sp.y}px) scale(${dynamicScale * (preset.fireIntensity / 1.0)})`,
                          opacity,
                        }}
                      >
                        {/* 8-point Sparkle Star */}
                        <svg
                          viewBox="0 0 24 24"
                          width={sp.size}
                          height={sp.size}
                          className="drop-shadow-[0_0_10px_#fff]"
                          fill={preset.sparkleTint}
                        >
                          <path d="M12 0 L14 9 L23 12 L14 15 L12 24 L10 15 L1 12 L10 9 Z" />
                          <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
                        </svg>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Instructions / Optical Metrics */}
              <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F8F2E9]/75 pt-2 border-t border-[#C99A54]/20 z-10 gap-2">
                <span className="flex items-center space-x-1.5 text-[#E7C58A]">
                  <Compass className="w-3.5 h-3.5 text-[#C99A54]" />
                  <span>Interactive: Move pointer over canvas to steer lighting angle</span>
                </span>
                <span className="font-mono text-[#C99A54]">
                  LIGHT REFRACTION: 2.417 (DIAMOND RI)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Gemological Performance Readouts */}
          <div className="lg:col-span-4 space-y-5 bg-[#201007]/80 p-6 sm:p-7 border border-[#C99A54]/25 rounded-xs">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#C99A54] uppercase font-mono block mb-1">
                GEMOLOGICAL OPTICAL REPORT
              </span>
              <h3 className="font-serif text-2xl text-[#F8F2E9]">
                {preset.name}
              </h3>
              <p className="text-xs text-[#71665C] leading-relaxed mt-1.5 font-light">
                {preset.description}
              </p>
            </div>

            {/* Performance Sliders & Metrics */}
            <div className="space-y-3.5 pt-3 border-t border-[#C99A54]/20">
              {/* Metric 1: Light Dispersion (Fire) */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#F8F2E9]/80 font-medium">Optical Fire (Dispersion)</span>
                  <span className="text-[#E7C58A] font-mono">99.8%</span>
                </div>
                <div className="w-full bg-[#170C06] h-1.5 rounded-full overflow-hidden border border-[#C99A54]/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#C99A54] via-[#E7C58A] to-[#FFF2D6] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, preset.fireIntensity * 78)}%` }}
                  />
                </div>
              </div>

              {/* Metric 2: Brilliance (White Light Return) */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#F8F2E9]/80 font-medium">Internal Brilliance</span>
                  <span className="text-[#E7C58A] font-mono">99.4%</span>
                </div>
                <div className="w-full bg-[#170C06] h-1.5 rounded-full overflow-hidden border border-[#C99A54]/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#C99A54] to-[#FFF] rounded-full transition-all duration-500"
                    style={{ width: `${preset.facetBrightness * 75}%` }}
                  />
                </div>
              </div>

              {/* Scintillation Sparkle Slider */}
              <div className="pt-2">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#E7C58A] flex items-center space-x-1">
                    <Sliders className="w-3.5 h-3.5 text-[#C99A54]" />
                    <span>Scintillation Sparkle Frequency</span>
                  </span>
                  <span className="font-mono text-[#C99A54]">{scintillationIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={scintillationIntensity}
                  onChange={(e) => setScintillationIntensity(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#170C06] rounded-lg appearance-none cursor-pointer accent-[#C99A54]"
                />
              </div>
            </div>

            {/* Gemological Specifications Box */}
            <div className="bg-[#170C06] border border-[#C99A54]/20 p-4 space-y-2 text-xs">
              <div className="flex justify-between text-[#F8F2E9]/70">
                <span>Cut Grade:</span>
                <span className="text-[#E7C58A] font-medium">Triple Excellent (3EX)</span>
              </div>
              <div className="flex justify-between text-[#F8F2E9]/70">
                <span>Polish & Symmetry:</span>
                <span className="text-[#E7C58A] font-medium">Hearts & Arrows Ideal</span>
              </div>
              <div className="flex justify-between text-[#F8F2E9]/70">
                <span>Certification:</span>
                <span className="text-[#E7C58A] font-medium">IGI Laser Inscribed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
