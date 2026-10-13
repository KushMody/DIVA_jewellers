import React, { useState } from 'react';
import type { Product } from '../../types';

interface ProductTabsProps {
  product: Product;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'diamond' | 'shipping'>('description');

  const tabs = [
    { id: 'description', label: 'DESCRIPTION' },
    { id: 'details', label: 'DETAILS' },
    { id: 'diamond', label: 'DIAMOND INFO' },
    { id: 'shipping', label: 'SHIPPING & CARE' },
  ];

  return (
    <div className="border-t border-[#C99A54]/30 pt-10 mt-12">
      {/* Tab Navigation matching Reference 2 */}
      <div className="flex flex-wrap border-b border-[#C99A54]/25 gap-6 sm:gap-10 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`pb-3 text-xs sm:text-[13px] tracking-[0.2em] uppercase font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-[#170C06] font-semibold'
                : 'text-[#71665C] hover:text-[#170C06]'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#170C06]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-6">
        {activeTab === 'description' && (
          <div className="space-y-8 animate-fadeIn">
            <p className="text-xs sm:text-sm text-[#71665C] leading-relaxed max-w-3xl">
              {product.fullDescription}
            </p>

            {/* 3 Visual Highlights matching Reference 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-3.5">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover shrink-0 border border-[#C99A54]/30"
                  />
                  <div>
                    <h4 className="font-serif text-sm sm:text-base text-[#170C06] uppercase tracking-wide">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] text-[#71665C] leading-snug mt-0.5">
                      {feat.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="max-w-2xl text-xs space-y-3 animate-fadeIn">
            <div className="grid grid-cols-2 py-2 border-b border-[#C99A54]/15">
              <span className="text-[#71665C] uppercase tracking-wider">Metal Type</span>
              <span className="text-[#170C06] font-medium">{product.specs.metal}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-[#C99A54]/15">
              <span className="text-[#71665C] uppercase tracking-wider">Gross Weight</span>
              <span className="text-[#170C06] font-medium">{product.specs.grossWeight || '4.80 grams'}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-[#C99A54]/15">
              <span className="text-[#71665C] uppercase tracking-wider">Setting Profile</span>
              <span className="text-[#170C06] font-medium">
                {product.specs.settingType || 'Precision Crown Prongs & Micro Pavé'}
              </span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-[#C99A54]/15">
              <span className="text-[#71665C] uppercase tracking-wider">Hallmark Verification</span>
              <span className="text-[#170C06] font-medium">BIS Hallmarked 750 Gold Standard</span>
            </div>
          </div>
        )}

        {activeTab === 'diamond' && (
          <div className="max-w-2xl text-xs space-y-3 animate-fadeIn">
            <div className="grid grid-cols-2 py-2 border-b border-[#C99A54]/15">
              <span className="text-[#71665C] uppercase tracking-wider">Diamond Weight</span>
              <span className="text-[#170C06] font-medium">{product.specs.diamondWeight}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-[#C99A54]/15">
              <span className="text-[#71665C] uppercase tracking-wider">Clarity Grade</span>
              <span className="text-[#170C06] font-medium">{product.specs.diamondClarity}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-[#C99A54]/15">
              <span className="text-[#71665C] uppercase tracking-wider">Cut & Polish</span>
              <span className="text-[#170C06] font-medium">{product.specs.diamondCut}</span>
            </div>
            <div className="grid grid-cols-2 py-2 border-b border-[#C99A54]/15">
              <span className="text-[#71665C] uppercase tracking-wider">Certification</span>
              <span className="text-[#170C06] font-medium">{product.specs.certification}</span>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="max-w-2xl text-xs space-y-4 text-[#71665C] leading-relaxed animate-fadeIn">
            <p>
              <strong className="text-[#170C06] uppercase tracking-wider block mb-1">
                Insured Doorstep Delivery
              </strong>
              Complimentary nationwide delivery via armed security couriers with 100% transit insurance. Handled in discreet tamper-evident luxury presentation packaging.
            </p>
            <p>
              <strong className="text-[#170C06] uppercase tracking-wider block mb-1">
                Lifetime Care & Polish
              </strong>
              Every DIVA ring includes complimentary annual ultrasonic cleaning, prong tightening, and rhodium replenishment at any of our flagship salons.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
