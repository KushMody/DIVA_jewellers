import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Maximize2, X } from 'lucide-react';
import { GemologicalLoupeMagnifier } from '../effects/GemologicalLoupeMagnifier';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => {
    if (isZoomOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isZoomOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomOpen) setIsZoomOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen]);

  const currentImage = images[selectedIndex] || images[0];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row gap-3 md:gap-4 items-start w-full">
        {/* Vertical thumbnail strip on the left */}
        <div className="flex sm:flex-col gap-2.5 shrink-0 overflow-x-auto sm:overflow-visible w-full sm:w-[96px] pb-2 sm:pb-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-16 h-16 sm:w-[96px] sm:h-[96px] bg-[#F0E5D7] overflow-hidden border transition-all duration-300 cursor-pointer ${
                selectedIndex === idx
                  ? 'border-[#C99A54] ring-1 ring-[#C99A54] shadow-md'
                  : 'border-[#C99A54]/25 opacity-70 hover:opacity-100 hover:border-[#C99A54]/60'
              }`}
              aria-label={`View angle ${idx + 1}`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}

          {/* Down arrow indicator below thumbnails */}
          <button
            onClick={handleNext}
            className="hidden sm:flex w-[96px] h-8 items-center justify-center border border-[#C99A54]/30 text-[#71665C] hover:text-[#170C06] hover:border-[#C99A54] transition-colors bg-white/40 cursor-pointer"
            aria-label="Next image angle"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Large Main Gallery Image with Interactive 10x Gemological Loupe */}
        <div className="relative flex-1 aspect-[725/472] w-full bg-[#28160D] overflow-hidden border border-[#C99A54]/25 shadow-md group">
          <GemologicalLoupeMagnifier
            imageSrc={currentImage}
            altText={productName}
            zoomScale={2.5}
            className="w-full h-full"
          />

          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/50 backdrop-blur-xs border border-white/25 flex items-center justify-center text-[#F8F2E9] hover:bg-black/80 hover:border-[#C99A54] hover:text-[#E7C58A] transition-all cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/50 backdrop-blur-xs border border-white/25 flex items-center justify-center text-[#F8F2E9] hover:bg-black/80 hover:border-[#C99A54] hover:text-[#E7C58A] transition-all cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Expand Fullscreen icon */}
          <button
            onClick={() => setIsZoomOpen(true)}
            className="absolute right-3.5 bottom-3.5 z-30 w-8 h-8 rounded-full bg-black/50 backdrop-blur-xs border border-white/20 flex items-center justify-center text-[#F8F2E9] hover:bg-black/80 hover:text-[#E7C58A] transition-all cursor-pointer"
            aria-label="Zoom image"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Hint badge */}
          <div className="absolute left-3.5 bottom-3.5 z-20 hidden md:block text-[9px] font-mono tracking-widest text-[#E7C58A] bg-black/60 px-2 py-0.5 border border-[#C99A54]/30 pointer-events-none">
            HOVER FOR 10X GEMOLOGICAL LOUPE
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
            aria-label="Close zoom"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={currentImage}
            alt={productName}
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
};
