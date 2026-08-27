import React from 'react';
import { Layers, Flame, Crown, Zap, Sparkles, Box, Leaf, ArrowUpRight, ShieldCheck, Users } from 'lucide-react';
import { Community, Product } from '../types';

interface CommunityDetectionViewProps {
  communities: Community[];
  onSelectProduct: (product: Product) => void;
}

export const CommunityDetectionView: React.FC<CommunityDetectionViewProps> = ({
  communities,
  onSelectProduct,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 stroke-[1.5] text-[#111111]" />;
      case 'Crown': return <Crown className="w-5 h-5 stroke-[1.5] text-[#111111]" />;
      case 'Zap': return <Zap className="w-5 h-5 stroke-[1.5] text-[#111111]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 stroke-[1.5] text-[#111111]" />;
      case 'Box': return <Box className="w-5 h-5 stroke-[1.5] text-[#111111]" />;
      case 'Leaf': return <Leaf className="w-5 h-5 stroke-[1.5] text-[#111111]" />;
      default: return <Layers className="w-5 h-5 stroke-[1.5] text-[#111111]" />;
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 text-[#111111]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/5 pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#6E6E73] font-medium block mb-1">
            COMMUNITY CLUSTERING
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-light tracking-tight text-[#111111]">
            Style Communities & Subcultures
          </h2>
        </div>

        <div className="flex items-center space-x-3 px-4 py-2 rounded-2xl bg-[#F5F5F2] border border-black/5">
          <ShieldCheck className="w-5 h-5 text-[#111111] stroke-[1.5]" />
          <div>
            <div className="text-[10px] font-mono text-[#6E6E73] uppercase">COMMUNITY DENSITY (Q)</div>
            <div className="font-editorial text-lg font-medium text-[#111111]">0.512 (High Cluster Stability)</div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((comm) => (
          <div
            key={comm.id}
            className="group rounded-3xl bg-white border border-black/5 p-6 space-y-6 hover:shadow-velaro-hover transition duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-[#F5F5F2] border border-black/5 group-hover:scale-105 transition">
                    {getIcon(comm.icon)}
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl font-medium text-[#111111]">
                      {comm.name}
                    </h3>
                    <div className="text-xs font-mono text-[#6E6E73]">
                      {comm.membersCount.toLocaleString()} Members
                    </div>
                  </div>
                </div>

                <span className="flex items-center text-xs font-mono text-emerald-700 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +{comm.growthRate}%
                </span>
              </div>

              <p className="text-xs text-[#6E6E73] leading-relaxed">
                {comm.description}
              </p>

              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#6E6E73]">Cluster Density:</span>
                  <span className="text-[#111111] font-bold">{comm.modularityScore}</span>
                </div>
                <div className="w-full bg-[#E8E8E3] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#111111] h-full rounded-full"
                    style={{ width: `${comm.modularityScore * 100}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-black/5 space-y-2">
                <div className="text-[10px] font-mono text-[#6E6E73] uppercase font-semibold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#111111] stroke-[1.5]" /> Key Style Leaders:
                </div>
                <div className="flex items-center space-x-2">
                  {comm.topInfluencers.map((inf) => (
                    <div key={inf.id} className="flex items-center space-x-2 bg-[#F5F5F2] px-2.5 py-1.5 rounded-xl border border-black/5">
                      <img src={inf.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-xs font-mono text-[#111111]">{inf.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs text-[#111111] font-mono uppercase tracking-wider font-semibold">
              <span>View Style Feed</span>
              <ArrowUpRight className="w-4 h-4 stroke-[1.5]" />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
