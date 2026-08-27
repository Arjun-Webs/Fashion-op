import React from 'react';
import { ArrowRight, Network } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onGraphClick: () => void;
  onTrendClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onGraphClick,
  onTrendClick,
}) => {
  return (
    <div className="relative bg-[#F0EBE1] pt-12 pb-24 border-b border-[#1C1C1C]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Live Trend Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FAF6F0] border border-[#1C1C1C]/10 mb-8 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B98A4B]" />
          <span className="font-mono text-xs text-[#666666] tracking-wide">
            CURRENT TREND: <span className="text-[#1C1C1C] font-semibold">#EthnicFusion</span> & <span className="text-[#1C1C1C] font-semibold">#QuietLuxury</span>
          </span>
        </div>

        {/* Large Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Headlines & Actions */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B98A4B] font-semibold">
                EDITORIAL LUXURY COLLECTION 2026
              </span>
              <h1 className="font-editorial text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[#1C1C1C] leading-[0.95]">
                REDEFINED <br />
                <span className="font-semibold italic">ELEGANCE.</span>
              </h1>
            </div>

            <p className="text-[#666666] text-base sm:text-lg max-w-md font-light leading-relaxed">
              Curated luxury fashion tailored for everyday sophistication, 
              backed by AI intelligence and social style insights.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExploreClick}
                className="flex items-center space-x-3 px-8 py-4 rounded-full bg-[#1C1C1C] text-white font-mono text-xs uppercase tracking-[0.15em] hover:bg-[#B98A4B] transition-all duration-300 shadow-md"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>

              <button
                onClick={onGraphClick}
                className="flex items-center space-x-2 px-7 py-4 rounded-full bg-[#FAF6F0] border border-[#1C1C1C]/10 text-[#1C1C1C] font-mono text-xs uppercase tracking-[0.15em] hover:bg-[#E5DDD0] transition-all duration-300"
              >
                <Network className="w-3.5 h-3.5 stroke-[1.5] text-[#666666]" />
                <span>Explore Network</span>
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-[#1C1C1C]/10 max-w-md">
              <div>
                <div className="font-editorial text-2xl font-light text-[#1C1C1C]">98.4%</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#666666]">Fit Match</div>
              </div>
              <div>
                <div className="font-editorial text-2xl font-light text-[#1C1C1C]">14.8k</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#666666]">Style Links</div>
              </div>
              <div>
                <div className="font-editorial text-2xl font-light text-[#1C1C1C]">0.51 Q</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#666666]">Subculture Index</div>
              </div>
            </div>

          </div>

          {/* Right Column: Layered Fashion Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-floating bg-[#FAF6F0] group aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"
                alt="VASTRA Editorial Campaign"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-1000 ease-out"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#FAF6F0]/90 backdrop-blur-md border border-white/20 flex items-center justify-between shadow-xs">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#666666]">LIMITED EDITION</span>
                  <h3 className="font-editorial text-lg font-medium text-[#1C1C1C]">Raw Silk Heritage Jacket</h3>
                </div>
                <span className="font-mono text-sm font-semibold text-[#1C1C1C]">₹24,999</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
