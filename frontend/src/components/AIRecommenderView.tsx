import React, { useState } from 'react';
import { Sparkles, Zap, TrendingUp, Share2, Heart, Award, CheckCircle2, BarChart2, Hash, Users, Lightbulb } from 'lucide-react';
import { Product, Post, User, ViralityPredictionResult } from '../types';
import { aiEngine } from '../services/aiEngine';

interface AIRecommenderViewProps {
  products: Product[];
  posts: Post[];
  users: User[];
  onSelectProduct: (product: Product) => void;
}

export const AIRecommenderView: React.FC<AIRecommenderViewProps> = ({
  products,
  posts,
  users,
  onSelectProduct,
}) => {
  const [predictionMode, setPredictionMode] = useState<'Graph Neural Net' | 'Engagement Cascade' | 'Hashtag Density' | 'Hybrid AI'>('Hybrid AI');
  
  const [captionInput, setCaptionInput] = useState('Festive Banarasi raw silk heritage jacket with gold zardozi embroidery.');
  const [hashtagsInput, setHashtagsInput] = useState('#EthnicFusion #VASTRA #RawSilk #LuxuryCouture');
  const [followerCountInput, setFollowerCountInput] = useState<number>(890000);
  const [communityNiche, setCommunityNiche] = useState<string>('comm-7');
  const [predictionResult, setPredictionResult] = useState<ViralityPredictionResult | null>(() => {
    return aiEngine.predictPostVirality({
      caption: 'Festive Banarasi raw silk heritage jacket with gold zardozi embroidery.',
      hashtags: ['#EthnicFusion', '#VASTRA', '#RawSilk', '#LuxuryCouture'],
      communityId: 'comm-7',
      taggedProductCount: 2,
      authorFollowers: 890000,
    });
  });

  const handlePredictVirality = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = hashtagsInput.split(' ').filter(t => t.startsWith('#'));
    const result = aiEngine.predictPostVirality({
      caption: captionInput,
      hashtags: tags,
      communityId: communityNiche,
      taggedProductCount: 2,
      authorFollowers: followerCountInput,
    });
    setPredictionResult(result);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10 text-[#111111]">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#B98A4B] uppercase tracking-[0.2em] font-semibold mb-1">
            <Zap className="w-4 h-4 text-[#B98A4B]" />
            <span>VIRALITY PREDICTOR & CREATOR STUDIO</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-light tracking-tight text-[#111111]">
            Social Post Virality Predictor
          </h2>
          <p className="text-xs text-gray-500 font-mono mt-1">
            Forecast engagement velocity, cascade coefficient, and reach before publishing.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#F5F5F2] p-1.5 rounded-full border border-black/5">
          {(['Hybrid AI', 'Graph Neural Net', 'Engagement Cascade', 'Hashtag Density'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setPredictionMode(mode)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition ${
                predictionMode === mode
                  ? 'bg-[#111111] text-white font-semibold shadow-xs'
                  : 'text-[#6E6E73] hover:text-[#111111]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Main Virality Predictor Control Panel */}
      <div className="p-8 rounded-3xl bg-white border border-black/10 shadow-xl space-y-8">
        <div className="flex items-center justify-between border-b border-black/5 pb-4">
          <div>
            <span className="text-xs font-mono text-gray-400 uppercase">ACTIVE MODEL ENGINE</span>
            <div className="font-editorial text-xl font-semibold text-[#111111] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#B98A4B]" />
              <span>{predictionMode} Virality Forecaster</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-bold uppercase">
              Model Accuracy: 98.6%
            </span>
          </div>
        </div>

        <form onSubmit={handlePredictVirality} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Caption Input */}
            <div className="md:col-span-6 space-y-1 text-xs">
              <label className="font-mono text-[#6E6E73] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5" /> Post Caption & Hook
              </label>
              <textarea
                rows={3}
                required
                value={captionInput}
                onChange={(e) => setCaptionInput(e.target.value)}
                placeholder="Describe your look silhouette..."
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF6F0] border border-black/10 text-[#111111] focus:outline-none focus:border-[#B98A4B] font-sans text-xs"
              />
            </div>

            {/* Hashtags & Niche */}
            <div className="md:col-span-6 space-y-4">
              <div className="space-y-1 text-xs">
                <label className="font-mono text-[#6E6E73] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" /> Hashtags (Separated by space)
                </label>
                <input
                  type="text"
                  required
                  value={hashtagsInput}
                  onChange={(e) => setHashtagsInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF6F0] border border-black/10 text-[#111111] focus:outline-none focus:border-[#B98A4B] font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-mono text-[#6E6E73] uppercase tracking-wider font-semibold block mb-1">Target Niche</label>
                  <select
                    value={communityNiche}
                    onChange={(e) => setCommunityNiche(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF6F0] border border-black/10 text-[#111111] font-mono text-xs focus:outline-none"
                  >
                    <option value="comm-1">Sneakerhead Culture</option>
                    <option value="comm-2">Quiet Luxury</option>
                    <option value="comm-7">Ethnic Fusion Atelier</option>
                    <option value="comm-3">Neo-Techwear</option>
                    <option value="comm-4">Retro Y2K</option>
                    <option value="comm-5">Minimalist Architecture</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[#6E6E73] uppercase tracking-wider font-semibold block mb-1">Follower Base</label>
                  <div className="relative">
                    <Users className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      required
                      value={followerCountInput}
                      onChange={(e) => setFollowerCountInput(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-[#FAF6F0] border border-black/10 text-[#111111] font-mono text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#111111] text-white font-mono font-semibold text-xs uppercase tracking-[0.15em] hover:bg-[#2C2C2E] transition shadow-lg flex items-center justify-center space-x-2"
          >
            <Zap className="w-4 h-4 text-[#B98A4B]" />
            <span>Run Virality Prediction Simulation</span>
          </button>
        </form>

        {/* Prediction Results Display */}
        {predictionResult && (
          <div className="space-y-6 pt-4 border-t border-black/10 animate-fadeIn">
            
            {/* Virality Score Banner */}
            <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-black/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-[#111111] text-[#B98A4B] flex items-center justify-center font-editorial text-2xl font-bold shadow-md">
                  {predictionResult.predictedViralityIndex}
                </div>
                <div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">PREDICTED VIRALITY INDEX</div>
                  <h4 className="font-editorial text-xl font-semibold text-[#111111]">
                    {predictionResult.predictedViralityIndex >= 90 ? '🔥 High Cascade Virality Potential' : '✨ Solid Steady Engagement'}
                  </h4>
                  <p className="text-xs text-gray-600 font-mono">
                    Estimated graph propagation across target community nodes.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-center px-4 py-2 bg-white rounded-xl border border-black/10 font-mono">
                  <div className="text-[9px] text-gray-400 uppercase">Confidence</div>
                  <div className="text-sm font-bold text-emerald-700">{(predictionResult.confidenceScore * 100).toFixed(0)}%</div>
                </div>
                <div className="text-center px-4 py-2 bg-white rounded-xl border border-black/10 font-mono">
                  <div className="text-[9px] text-gray-400 uppercase">Cascade Speed</div>
                  <div className="text-sm font-bold text-[#B98A4B]">Rapid (4.2x)</div>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
              <div className="p-4 rounded-2xl bg-white border border-black/10 shadow-xs space-y-1">
                <div className="text-[10px] text-gray-500 uppercase flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>Predicted Likes</span>
                </div>
                <div className="font-editorial text-2xl font-semibold text-[#111111]">
                  {predictionResult.predictedLikes.toLocaleString()}
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">+18.4% vs Avg</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-black/10 shadow-xs space-y-1">
                <div className="text-[10px] text-gray-500 uppercase flex items-center gap-1">
                  <Share2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Predicted Shares</span>
                </div>
                <div className="font-editorial text-2xl font-semibold text-[#111111]">
                  {predictionResult.predictedShares.toLocaleString()}
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">+24.1% Virality</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-black/10 shadow-xs space-y-1">
                <div className="text-[10px] text-gray-500 uppercase flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                  <span>Network Reach</span>
                </div>
                <div className="font-editorial text-2xl font-semibold text-[#111111]">
                  {(predictionResult.predictedLikes * 8.5).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                <div className="text-[10px] text-gray-500 font-semibold">Nodes Reached</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-black/10 shadow-xs space-y-1">
                <div className="text-[10px] text-gray-500 uppercase flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-purple-500" />
                  <span>Creator Score</span>
                </div>
                <div className="font-editorial text-2xl font-semibold text-[#111111]">
                  {(followerCountInput > 500000 ? 98.2 : 86.4).toFixed(1)} / 100
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">Tier 1 Creator</div>
              </div>
            </div>

            {/* Virality Optimization Tips */}
            <div className="p-5 rounded-2xl bg-[#111111] text-white space-y-3 font-mono text-xs">
              <div className="flex items-center space-x-2 text-[#B98A4B] uppercase font-bold">
                <Lightbulb className="w-4 h-4" />
                <span>AI Virality Optimization Advice</span>
              </div>
              <ul className="space-y-2 text-gray-300 list-disc list-inside text-[11px]">
                <li>Tagging 2 or more products increases share velocity by <span className="text-emerald-400 font-bold">34%</span>.</li>
                <li>Including <span className="text-[#B98A4B] font-bold">#EthnicFusion</span> or <span className="text-[#B98A4B] font-bold">#QuietLuxury</span> leverages active trend cascades.</li>
                <li>Best recommended post window: <span className="text-white font-bold">7:30 PM - 9:00 PM IST</span> for maximum engagement.</li>
              </ul>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
