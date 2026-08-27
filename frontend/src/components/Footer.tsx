import React, { useState } from 'react';
import { ShieldCheck, Network } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-white border-t border-black/5 text-[#6E6E73] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-5 space-y-4">
            <span className="font-editorial text-2xl font-light tracking-[0.2em] text-[#111111] uppercase block">
              VASTRA
            </span>

            <p className="text-xs font-light text-[#6E6E73] leading-relaxed max-w-sm">
              International modern luxury fashion platform designed with editorial elegance. 
              Powered by AI recommendations, style network maps, and social trend forecasting.
            </p>

            <div className="flex items-center space-x-3 text-[11px] font-mono text-[#111111]">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 stroke-[1.5]" /> SYSTEM OPERATIONAL</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Network className="w-3.5 h-3.5 stroke-[1.5]" /> FASTAPI ENGINE ONLINE</span>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-2">
              <div className="text-[#111111] uppercase font-bold tracking-wider">Store</div>
              <div className="hover:text-[#111111] cursor-pointer">Ethnic Fusion</div>
              <div className="hover:text-[#111111] cursor-pointer">Quiet Luxury</div>
              <div className="hover:text-[#111111] cursor-pointer">Sneakers</div>
              <div className="hover:text-[#111111] cursor-pointer">Techwear</div>
            </div>
            <div className="space-y-2">
              <div className="text-[#111111] uppercase font-bold tracking-wider">Analytics</div>
              <div className="hover:text-[#111111] cursor-pointer">Communities</div>
              <div className="hover:text-[#111111] cursor-pointer">PageRank</div>
              <div className="hover:text-[#111111] cursor-pointer">Virality Predictor</div>
              <div className="hover:text-[#111111] cursor-pointer">Network Map</div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono text-[#111111] uppercase font-bold tracking-wider">Editorial Newsletter</div>
            <p className="text-xs text-[#6E6E73]">Subscribe for curated style dispatches and limited collection drops.</p>
            
            {subscribed ? (
              <div className="p-3 rounded-2xl bg-[#F5F5F2] border border-black/5 text-xs font-mono text-[#111111]">
                ✓ Subscribed to VASTRA Dispatch
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-full bg-[#F5F5F2] border border-black/5 text-xs text-[#111111] placeholder-gray-400 focus:outline-none focus:border-black font-mono"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#111111] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#2C2C2E] transition shadow-xs"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#6E6E73] gap-4">
          <div>© 2026 VASTRA AI FASHION INC. ALL RIGHTS RESERVED.</div>
          <div>EDITORIAL LUXURY EDITION</div>
        </div>

      </div>
    </footer>
  );
};
