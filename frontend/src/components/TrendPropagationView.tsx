import React, { useState } from 'react';
import { 
  TrendingUp, 
  Play, 
  Pause, 
  Globe, 
  Users, 
  Zap, 
  Activity
} from 'lucide-react';
import { TrendCascade } from '../types';

interface TrendPropagationViewProps {
  cascades: TrendCascade[];
}

export const TrendPropagationView: React.FC<TrendPropagationViewProps> = ({ cascades }) => {
  const [selectedCascade, setSelectedCascade] = useState<TrendCascade>(cascades[0]);
  const [currentDay, setCurrentDay] = useState<number>(15);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeDataPoint = selectedCascade.timeline.find(t => t.day <= currentDay) || selectedCascade.timeline[0];

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const interval = setInterval(() => {
        setCurrentDay((prev) => {
          if (prev >= 20) {
            clearInterval(interval);
            setIsPlaying(false);
            return 20;
          }
          return prev + 1;
        });
      }, 400);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 text-[#111111]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/5 pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#6E6E73] font-medium block mb-1">
            TREND ANALYTICS
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-light tracking-tight text-[#111111]">
            Trend Propagation Timeline
          </h2>
        </div>

        {/* Trend Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {cascades.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCascade(c);
                setCurrentDay(15);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono transition ${
                selectedCascade.id === c.id
                  ? 'bg-[#111111] text-white font-semibold shadow-xs'
                  : 'bg-[#F5F5F2] border border-black/5 text-[#6E6E73] hover:text-[#111111]'
              }`}
            >
              {c.hashtag}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 space-y-6">
          <div className="p-8 rounded-3xl bg-white border border-black/5 shadow-velaro space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#6E6E73] uppercase tracking-wider font-semibold">ACTIVE CASCADE ANALYSIS</span>
                <h3 className="font-editorial text-2xl font-light text-[#111111] pt-1">
                  {selectedCascade.title}
                </h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#F5F5F2] border border-black/5 text-[#111111] text-xs font-mono font-semibold">
                STAGE: {selectedCascade.currentStage}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#F5F5F2] border border-black/5">
              <div>
                <div className="text-[10px] font-mono text-[#6E6E73] uppercase">POPULARITY INDEX</div>
                <div className="font-editorial text-2xl font-light text-[#111111]">
                  {selectedCascade.viralityCoefficient}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#6E6E73] uppercase">SPREAD SPEED</div>
                <div className="font-editorial text-2xl font-light text-[#111111]">
                  {selectedCascade.adoptionSpeed} / day
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#6E6E73] uppercase">ACTIVE PEOPLE</div>
                <div className="font-editorial text-2xl font-light text-[#111111]">
                  {activeDataPoint.activeNodes.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#6E6E73] uppercase">TOTAL SHARES</div>
                <div className="font-editorial text-2xl font-light text-[#111111]">
                  {activeDataPoint.totalShares.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Timeline Slider */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#6E6E73]">
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#111111] stroke-[1.5]" />
                  30-DAY TREND TIMELINE (DAY {currentDay} / 30)
                </span>
                <button
                  onClick={handlePlayToggle}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#111111] text-white font-mono text-[11px] hover:bg-[#2C2C2E] transition shadow-xs"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pause' : 'Play Timeline'}</span>
                </button>
              </div>

              <input
                type="range"
                min="1"
                max="20"
                value={currentDay}
                onChange={(e) => setCurrentDay(Number(e.target.value))}
                className="w-full h-2 bg-[#E8E8E3] rounded-lg appearance-none cursor-pointer accent-[#111111]"
              />

              <div className="flex justify-between text-[10px] font-mono text-[#6E6E73] pt-1">
                <span>Day 1 (Seed Origin)</span>
                <span>Day 5 (Early Adopters)</span>
                <span>Day 10 (Peak Trend)</span>
                <span>Day 15 (Mainstream)</span>
                <span>Day 20 (Full Saturation)</span>
              </div>
            </div>

            {/* City Spread */}
            <div className="pt-4 border-t border-black/5 space-y-3">
              <h4 className="text-xs font-mono text-[#6E6E73] uppercase font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#111111] stroke-[1.5]" /> City Adoption & Spread Density
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedCascade.geoSpread.map((geo) => (
                  <div key={geo.region} className="p-3 rounded-xl bg-[#F5F5F2] border border-black/5 space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[#111111] font-bold">{geo.region}</span>
                      <span className="text-[#6E6E73] text-[11px]">{geo.density}%</span>
                    </div>
                    <div className="w-full bg-[#E8E8E3] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#111111] h-full rounded-full transition-all duration-500"
                        style={{ width: `${geo.density}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Origin Creator */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-velaro space-y-4">
            <h4 className="text-xs font-mono text-[#6E6E73] uppercase tracking-wider font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 text-[#111111] stroke-[1.5]" /> TREND SEED CREATOR
            </h4>

            <div className="flex items-center space-x-3 p-3 rounded-2xl bg-[#F5F5F2] border border-black/5">
              <img
                src={selectedCascade.originUser.avatar}
                alt=""
                className="w-12 h-12 rounded-full object-cover border border-black/10"
              />
              <div>
                <h5 className="font-editorial text-sm font-medium text-[#111111]">
                  {selectedCascade.originUser.name}
                </h5>
                <p className="text-[11px] font-mono text-[#6E6E73]">
                  {selectedCascade.originUser.username} • {selectedCascade.originUser.followersCount.toLocaleString()} Followers
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F5F2] border border-black/5 text-xs space-y-1">
              <div className="font-mono text-[10px] text-[#6E6E73] uppercase font-semibold">Featured Trend Garment:</div>
              <div className="font-editorial text-sm font-medium text-[#111111]">{selectedCascade.seedProduct.name}</div>
              <div className="text-[11px] font-mono text-[#6E6E73]">₹{selectedCascade.seedProduct.price.toLocaleString('en-IN')} • {selectedCascade.seedProduct.brand}</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
