import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: number) => void;
  selectedSize?: number;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectSize,
  selectedSize,
}) => {
  const [activeTab, setActiveTab] = useState<'chart' | 'how-to'>('chart');

  if (!isOpen) return null;

  const sizeTable = [
    { inSize: 8, usSize: '4.5', diameter: '15.3 mm', circ: '48.0 mm' },
    { inSize: 9, usSize: '5.0', diameter: '15.7 mm', circ: '49.3 mm' },
    { inSize: 10, usSize: '5.5', diameter: '16.0 mm', circ: '50.3 mm' },
    { inSize: 11, usSize: '5.75', diameter: '16.3 mm', circ: '51.2 mm' },
    { inSize: 12, usSize: '6.0', diameter: '16.5 mm', circ: '51.9 mm' },
    { inSize: 13, usSize: '6.5', diameter: '16.9 mm', circ: '53.1 mm' },
    { inSize: 14, usSize: '7.0', diameter: '17.3 mm', circ: '54.4 mm' },
    { inSize: 15, usSize: '7.25', diameter: '17.6 mm', circ: '55.3 mm' },
    { inSize: 16, usSize: '7.5', diameter: '17.9 mm', circ: '56.3 mm' },
    { inSize: 17, usSize: '8.0', diameter: '18.2 mm', circ: '57.2 mm' },
    { inSize: 18, usSize: '8.5', diameter: '18.5 mm', circ: '58.1 mm' },
    { inSize: 19, usSize: '8.75', diameter: '18.9 mm', circ: '59.4 mm' },
    { inSize: 20, usSize: '9.0', diameter: '19.2 mm', circ: '60.3 mm' },
    { inSize: 21, usSize: '9.5', diameter: '19.5 mm', circ: '61.3 mm' },
    { inSize: 22, usSize: '10.0', diameter: '19.8 mm', circ: '62.2 mm' },
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#F8F2E9] border border-[#C99A54]/40 shadow-2xl p-6 md:p-8 text-[#18130F] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#C99A54]/30 pb-4 mb-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#C99A54] block">DIVA ATELIER GUIDE</span>
            <h3 className="font-serif text-2xl text-[#170C06]">Indian Ring Size Guide</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#71665C] hover:text-[#170C06] transition-colors p-1"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#C99A54]/20 mb-6">
          <button
            onClick={() => setActiveTab('chart')}
            className={`pb-2.5 px-4 text-xs tracking-widest uppercase font-medium transition-colors border-b-2 ${
              activeTab === 'chart'
                ? 'border-[#C99A54] text-[#170C06]'
                : 'border-transparent text-[#71665C] hover:text-[#170C06]'
            }`}
          >
            Size Chart (India / US)
          </button>
          <button
            onClick={() => setActiveTab('how-to')}
            className={`pb-2.5 px-4 text-xs tracking-widest uppercase font-medium transition-colors border-b-2 ${
              activeTab === 'how-to'
                ? 'border-[#C99A54] text-[#170C06]'
                : 'border-transparent text-[#71665C] hover:text-[#170C06]'
            }`}
          >
            How to Measure
          </button>
        </div>

        {activeTab === 'chart' ? (
          <div>
            <p className="text-xs text-[#71665C] mb-4">
              All DIVA rings follow standard Indian sizing metrics. Select your matching circumference or inner diameter below:
            </p>
            <div className="overflow-x-auto border border-[#C99A54]/30">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#170C06] text-[#F8F2E9]">
                    <th className="py-2.5 px-3 font-medium">Indian Size</th>
                    <th className="py-2.5 px-3 font-medium">Inside Diameter</th>
                    <th className="py-2.5 px-3 font-medium">Circumference</th>
                    <th className="py-2.5 px-3 font-medium">US Size</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C99A54]/20 bg-white/70">
                  {sizeTable.map((item) => (
                    <tr
                      key={item.inSize}
                      className={`hover:bg-[#C99A54]/10 transition-colors ${
                        selectedSize === item.inSize ? 'bg-[#C99A54]/15 font-semibold' : ''
                      }`}
                    >
                      <td className="py-2 px-3 text-[#170C06]">Size {item.inSize}</td>
                      <td className="py-2 px-3 text-[#71665C]">{item.diameter}</td>
                      <td className="py-2 px-3 text-[#71665C]">{item.circ}</td>
                      <td className="py-2 px-3 text-[#71665C]">{item.usSize}</td>
                      <td className="py-2 px-3 text-right">
                        {onSelectSize && (
                          <button
                            onClick={() => {
                              onSelectSize(item.inSize);
                              onClose();
                            }}
                            className={`px-2.5 py-1 text-[11px] border transition-colors ${
                              selectedSize === item.inSize
                                ? 'bg-[#170C06] text-[#F8F2E9] border-[#170C06]'
                                : 'border-[#C99A54] text-[#170C06] hover:bg-[#C99A54] hover:text-white'
                            }`}
                          >
                            {selectedSize === item.inSize ? (
                              <span className="flex items-center space-x-1">
                                <Check className="w-3 h-3 text-[#E7C58A]" /> <span>Selected</span>
                              </span>
                            ) : (
                              'Select'
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs text-[#71665C] leading-relaxed">
            <div className="p-4 bg-white/80 border border-[#C99A54]/20">
              <h4 className="font-serif text-base text-[#170C06] mb-1">Method 1: Measure an Existing Ring</h4>
              <p>
                1. Select an existing ring that comfortably fits the intended finger.<br />
                2. Measure the exact internal diameter in millimeters with a standard ruler.<br />
                3. Match the inner diameter measurement to the chart on the previous tab.
              </p>
            </div>
            <div className="p-4 bg-white/80 border border-[#C99A54]/20">
              <h4 className="font-serif text-base text-[#170C06] mb-1">Method 2: Use Paper or Strip</h4>
              <p>
                1. Wrap a strip of paper snugly around the knuckle or base of your finger.<br />
                2. Mark the exact spot where the paper overlaps with a pen.<br />
                3. Measure the length against a ruler in millimeters to discover your finger circumference.
              </p>
            </div>
            <p className="text-[11px] italic text-[#C99A54]">
              * Complimentary resizing is provided on all DIVA Jewellers solitaire rings within 30 days of purchase.
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
