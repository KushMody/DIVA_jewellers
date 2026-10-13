import React, { useState, useRef } from 'react';

interface GemologicalLoupeMagnifierProps {
  imageSrc: string;
  altText: string;
  zoomScale?: number; // e.g. 2.4x
  className?: string;
}

export const GemologicalLoupeMagnifier: React.FC<GemologicalLoupeMagnifierProps> = ({
  imageSrc,
  altText,
  zoomScale = 2.4,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoupeActive, setIsLoupeActive] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 0, y: 0 });
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });

  const LOUPE_SIZE = 150; // diameter of the loupe in pixels

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check bounds
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setIsLoupeActive(false);
      return;
    }

    setLoupePos({ x, y });

    // Calculate background position percentage
    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;
    setBgPos({ x: bgX, y: bgY });
    setIsLoupeActive(true);
  };

  const handleMouseLeave = () => {
    setIsLoupeActive(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsLoupeActive(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden cursor-none select-none ${className}`}
      data-cursor="loupe"
    >
      {/* Base Image */}
      <img
        src={imageSrc}
        alt={altText}
        className="w-full h-full object-cover transition-transform duration-500 ease-out"
      />

      {/* 10x Gemological Hastings Loupe Lens */}
      {isLoupeActive && (
        <div
          className="pointer-events-none absolute z-40 rounded-full border-4 border-[#C99A54] shadow-[0_10px_35px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(201,154,84,0.3)] overflow-hidden transition-opacity duration-150"
          style={{
            width: `${LOUPE_SIZE}px`,
            height: `${LOUPE_SIZE}px`,
            left: `${loupePos.x - LOUPE_SIZE / 2}px`,
            top: `${loupePos.y - LOUPE_SIZE / 2}px`,
          }}
        >
          {/* Magnified Image Background */}
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
              backgroundSize: `${zoomScale * 100}%`,
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Optical Reticle Crosshairs and Calibration Markings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Fine Reticle Grid */}
            <div className="w-full h-[1px] bg-[#E7C58A]/30 absolute top-1/2 -translate-y-1/2" />
            <div className="h-full w-[1px] bg-[#E7C58A]/30 absolute left-1/2 -translate-x-1/2" />
            <div className="w-10 h-10 rounded-full border border-[#E7C58A]/30 absolute" />

            {/* Lens Glare Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 rounded-full" />

            {/* Gemologist Loupe Text Stamp */}
            <div className="absolute bottom-2 text-[8px] font-mono tracking-widest text-[#FFF2D6] bg-black/70 px-1.5 py-0.5 border border-[#C99A54]/40 rounded-2xs">
              10x HASTINGS TRIPLET
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
