import React, { useState, useEffect, useRef } from 'react';
import { Award, Compass, ShieldCheck, Gem } from 'lucide-react';

interface MetricItem {
  id: string;
  targetNumber: number;
  decimals: number;
  suffix: string;
  prefix?: string;
  label: string;
  technicalTerm: string;
  description: string;
  blueprintDetail: string;
  icon: React.ReactNode;
}

const METRICS: MetricItem[] = [
  {
    id: 'facets',
    targetNumber: 57,
    decimals: 0,
    suffix: ' FACETS',
    label: 'Optic Scintillation Geometry',
    technicalTerm: 'Marcel Tolkowsky 1919 Ratio',
    description: '33 crown and 24 pavilion facets aligned to achieve 100% total internal reflection of incoming photons.',
    blueprintDetail: 'Table 53% • Crown Angle 34.5° • Pavilion Depth 43.1%',
    icon: <Gem className="w-5 h-5 text-[#C99A54]" />,
  },
  {
    id: 'chapter',
    targetNumber: 250,
    decimals: 0,
    suffix: ' PIECES',
    label: 'Limited Archival Allocation',
    technicalTerm: 'Single Batch Foundry Casting',
    description: 'Each design is strictly capped at 250 numbered iterations before the master mold is retired to the vault.',
    blueprintDetail: 'Laser Hallmarked • Chapter I Registry • Archive N°250',
    icon: <Compass className="w-5 h-5 text-[#C99A54]" />,
  },
  {
    id: 'tolerance',
    targetNumber: 0.02,
    decimals: 2,
    suffix: ' MM',
    prefix: '±',
    label: 'Micro-Pavé Setting Tolerance',
    technicalTerm: 'Microscopic Binocular Caliper',
    description: 'Hand-seated under 40x Swiss binocular optics to ensure zero friction between prongs and girdle facets.',
    blueprintDetail: 'Prong Girdle Clearance < 20 Microns • Solid 18K Seat',
    icon: <Award className="w-5 h-5 text-[#C99A54]" />,
  },
  {
    id: 'purity',
    targetNumber: 100,
    decimals: 0,
    suffix: '%',
    label: 'Conflict-Free Provenance',
    technicalTerm: 'System of Warranties / KPCS',
    description: 'Every diamond traced back to ethical kimberlite deposits. Solid 18K gold cast from certified recycled bullion.',
    blueprintDetail: 'BIS 750 Hallmarked • IGI Certified • Kimberly Compliant',
    icon: <ShieldCheck className="w-5 h-5 text-[#C99A54]" />,
  },
];

export const ScrollMetricCounter: React.FC = () => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    facets: 0,
    chapter: 0,
    tolerance: 0,
    purity: 0,
  });
  const [activeBlueprint, setActiveBlueprint] = useState<string>('facets');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = performance.now();
          const duration = 2000;

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out expo
            const easeOutProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setCounts({
              facets: Math.floor(57 * easeOutProgress),
              chapter: Math.floor(250 * easeOutProgress),
              tolerance: parseFloat((0.02 * easeOutProgress).toFixed(2)),
              purity: Math.floor(100 * easeOutProgress),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    const elem = sectionRef.current;
    if (elem) observer.observe(elem);

    return () => {
      if (elem) observer.unobserve(elem);
    };
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#120703] text-[#F8F2E9] py-16 md:py-24 border-y border-[#C99A54]/25 relative overflow-hidden"
    >
      {/* Background Architectural Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #C99A54 1px, transparent 1px), linear-gradient(to right, #C99A54 1px, transparent 1px), linear-gradient(to bottom, #C99A54 1px, transparent 1px)',
          backgroundSize: '40px 40px, 120px 120px, 120px 120px',
        }}
      />

      {/* Ambient center spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C99A54]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#28160D] border border-[#C99A54]/40 rounded-full text-[10px] tracking-[0.25em] text-[#E7C58A] uppercase font-mono mb-3">
            <span>TECHNICAL SPECIFICATIONS & ARCHIVAL RIGOR</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F8F2E9] font-normal tracking-wide">
            Haute Joaillerie Standards
          </h2>
          <p className="text-xs sm:text-sm text-[#71665C] font-light mt-3 leading-relaxed">
            Every creation is engineered with mathematical geometry, strictly numbered casting
            allocations, and microscopic pavé tolerance.
          </p>
        </div>

        {/* 4 Interactive Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {METRICS.map((metric) => {
            const isSelected = activeBlueprint === metric.id;
            const currentVal = counts[metric.id];

            return (
              <div
                key={metric.id}
                onMouseEnter={() => {
                  setActiveBlueprint(metric.id);
                }}
                className={`group relative p-6 bg-[#1A0B05] border transition-all duration-300 rounded-xs cursor-pointer ${
                  isSelected
                    ? 'border-[#E7C58A] shadow-[0_0_25px_rgba(201,154,84,0.18)] translate-y-[-4px]'
                    : 'border-[#C99A54]/25 hover:border-[#C99A54]/60'
                }`}
              >
                {/* Top Blueprint Crosshair */}
                <div className="flex items-center justify-between pb-4 border-b border-[#C99A54]/20 mb-4">
                  <div className="p-2 rounded-full bg-[#28160D] border border-[#C99A54]/30">
                    {metric.icon}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#E7C58A]/80 uppercase">
                    SPEC 0{METRICS.indexOf(metric) + 1}
                  </span>
                </div>

                {/* Animated Metric Number */}
                <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-light text-[#E7C58A] tracking-tight mb-2">
                  <span>{metric.prefix || ''}</span>
                  <span>{metric.decimals > 0 ? currentVal.toFixed(metric.decimals) : currentVal}</span>
                  <span className="text-base sm:text-lg text-[#C99A54] font-sans ml-1">
                    {metric.suffix}
                  </span>
                </div>

                {/* Technical Term */}
                <h3 className="font-serif text-lg text-[#F8F2E9] group-hover:text-[#E7C58A] transition-colors mb-1">
                  {metric.label}
                </h3>
                <p className="text-[10px] tracking-wider font-mono text-[#C99A54] uppercase mb-3">
                  {metric.technicalTerm}
                </p>

                {/* Detailed description */}
                <p className="text-xs text-[#71665C] font-light leading-relaxed mb-4">
                  {metric.description}
                </p>

                {/* Technical Blueprint Footnote */}
                <div className="pt-3 border-t border-[#C99A54]/15 flex items-center space-x-2 text-[10px] font-mono text-[#E7C58A]/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C99A54] animate-ping" />
                  <span className="truncate">{metric.blueprintDetail}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Blueprint Visualizer Bar below */}
        <div className="mt-8 p-4 bg-[#170C06] border border-[#C99A54]/30 rounded-xs flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center space-x-3 text-[#E7C58A]">
            <span className="w-2 h-2 bg-[#C99A54] rotate-45" />
            <span className="tracking-widest uppercase">
              ACTIVE ATELIER REGISTER: {METRICS.find((m) => m.id === activeBlueprint)?.technicalTerm}
            </span>
          </div>
          <div className="text-[11px] text-[#71665C] tracking-wider">
            SWISS GEMMOLOGICAL RIGOR • CERTIFICATE N° DIVA-2026-CH
          </div>
        </div>
      </div>
    </section>
  );
};
