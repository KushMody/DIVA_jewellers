import React from 'react';

interface DiamondShimmerProps {
  className?: string;
  trigger?: 'hover' | 'always';
}

export const DiamondShimmer: React.FC<DiamondShimmerProps> = ({
  className = '',
  trigger = 'hover',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-20 ${className}`}
      aria-hidden="true"
    >
      {/* Prismatic Specular Beam */}
      <div
        className={`absolute -inset-[100%] w-[300%] h-[300%] -translate-x-[150%] -rotate-45 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out ${
          trigger === 'hover'
            ? 'group-hover:translate-x-[150%]'
            : 'animate-[shimmerSweep_3s_infinite_ease-in-out]'
        }`}
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 30%, rgba(231,197,138,0.25) 50%, rgba(255,255,255,0.45) 52%, rgba(201,154,84,0.25) 54%, rgba(255,255,255,0.03) 70%, transparent 100%)',
        }}
      />

      {/* Subtle Corner Star Sparkle on Hover */}
      <div className="absolute top-3 right-3 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 transform scale-50 group-hover:scale-100 rotate-0 group-hover:rotate-45">
        <svg viewBox="0 0 24 24" fill="#E7C58A" className="w-full h-full drop-shadow-[0_0_8px_#E7C58A]">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>

      <div className="absolute bottom-4 left-4 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 transform scale-50 group-hover:scale-100 rotate-0 group-hover:rotate-90">
        <svg viewBox="0 0 24 24" fill="#C99A54" className="w-full h-full drop-shadow-[0_0_6px_#C99A54]">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>
    </div>
  );
};
