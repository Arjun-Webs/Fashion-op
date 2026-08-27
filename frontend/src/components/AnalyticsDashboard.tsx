import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Network, 
  ShieldCheck, 
  Crown,
  ArrowUpRight
} from 'lucide-react';
import { User } from '../types';

interface AnalyticsDashboardProps {
  users: User[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ users }) => {
  const chart1Ref = useRef<HTMLDivElement>(null);
  const chart2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chart1Ref.current) {
      const myChart1 = echarts.init(chart1Ref.current);
      myChart1.setOption({
        backgroundColor: 'transparent',
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: {
          type: 'category',
          data: ['Ethnic Fusion', 'Quiet Luxury', 'Sneakers', 'Streetwear', 'Techwear', 'Retro Y2K'],
          axisLine: { lineStyle: { color: 'rgba(0,0,0,0.1)' } }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: 'rgba(0,0,0,0.1)' } },
          splitLine: { lineStyle: { color: 'rgba(0,0,0,0.05)' } }
        },
        series: [{
          name: 'Sales Volume (₹ Lakhs)',
          type: 'bar',
          data: [285, 240, 195, 160, 120, 85],
          itemStyle: {
            color: '#111111',
            borderRadius: [8, 8, 0, 0]
          }
        }]
      });
    }

    if (chart2Ref.current) {
      const myChart2 = echarts.init(chart2Ref.current);
      myChart2.setOption({
        backgroundColor: 'transparent',
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: {
          type: 'category',
          data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
          axisLine: { lineStyle: { color: 'rgba(0,0,0,0.1)' } }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: 'rgba(0,0,0,0.1)' } },
          splitLine: { lineStyle: { color: 'rgba(0,0,0,0.05)' } }
        },
        series: [
          {
            name: 'Active Network Links',
            type: 'line',
            smooth: true,
            data: [1500, 3200, 6400, 11200, 18500, 26400],
            itemStyle: { color: '#111111' }
          },
          {
            name: 'Trend Speed Score',
            type: 'line',
            smooth: true,
            data: [50, 68, 82, 91, 96, 99],
            itemStyle: { color: '#C5A059' }
          }
        ]
      });
    }
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 text-[#111111]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/5 pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#6E6E73] font-medium block mb-1">
            BUSINESS INSIGHTS COCKPIT
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-light tracking-tight text-[#111111]">
            Sales & Network Analytics
          </h2>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-[#6E6E73]">
          <span>PIPELINE STATUS:</span>
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" /> OPERATIONAL
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-velaro space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-[#6E6E73]">
            <span>TOTAL SALES (GMV)</span>
            <DollarSign className="w-4 h-4 text-[#111111] stroke-[1.5]" />
          </div>
          <div className="font-editorial text-3xl font-light text-[#111111]">₹4.85 Cr</div>
          <div className="text-xs text-emerald-700 font-mono flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +32.4% vs last month
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-velaro space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-[#6E6E73]">
            <span>ACTIVE NETWORK NODES</span>
            <Network className="w-4 h-4 text-[#111111] stroke-[1.5]" />
          </div>
          <div className="font-editorial text-3xl font-light text-[#111111]">14,890</div>
          <div className="text-xs text-[#6E6E73] font-mono flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 120+ new links/min
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-velaro space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-[#6E6E73]">
            <span>COMMUNITY MODULARITY</span>
            <ShieldCheck className="w-4 h-4 text-[#111111] stroke-[1.5]" />
          </div>
          <div className="font-editorial text-3xl font-light text-[#111111]">0.512 Q</div>
          <div className="text-xs text-[#6E6E73] font-mono">Cluster Stability</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-velaro space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-[#6E6E73]">
            <span>TREND SPREAD SPEED</span>
            <TrendingUp className="w-4 h-4 text-[#111111] stroke-[1.5]" />
          </div>
          <div className="font-editorial text-3xl font-light text-[#111111]">1,850 / day</div>
          <div className="text-xs text-[#6E6E73] font-mono">Adoption Velocity</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-velaro space-y-4">
          <h3 className="font-editorial text-xl font-light text-[#111111]">
            Category Sales Volume (₹ Lakhs)
          </h3>
          <div ref={chart1Ref} className="w-full h-72" />
        </div>

        <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-velaro space-y-4">
          <h3 className="font-editorial text-xl font-light text-[#111111]">
            Network Links Growth & Trend Velocity
          </h3>
          <div ref={chart2Ref} className="w-full h-72" />
        </div>
      </div>

      {/* Influencer Table */}
      <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-velaro space-y-4">
        <h3 className="font-editorial text-xl font-light text-[#111111] flex items-center gap-2">
          <Crown className="w-5 h-5 text-[#111111] stroke-[1.5]" /> Top Style Influencer Ranks & Driven Sales
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono text-[#2C2C2E]">
            <thead className="text-[10px] uppercase bg-[#F5F5F2] text-[#111111]">
              <tr>
                <th className="p-3">Influencer</th>
                <th className="p-3">Tier</th>
                <th className="p-3">Followers</th>
                <th className="p-3">Style Rank</th>
                <th className="p-3">Network Centrality</th>
                <th className="p-3">Driven Sales (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {users.map((u, i) => (
                <tr key={u.id} className="hover:bg-black/[0.01] transition">
                  <td className="p-3 flex items-center space-x-2">
                    <img src={u.avatar} alt="" className="w-7 h-7 rounded-full object-cover border border-black/10" />
                    <span className="font-bold text-[#111111]">{u.name}</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-black/5 text-[#111111] font-semibold">
                      {u.influencerTier || 'Customer'}
                    </span>
                  </td>
                  <td className="p-3">{u.followersCount.toLocaleString()}</td>
                  <td className="p-3 text-[#111111] font-bold">{u.pageRankScore}</td>
                  <td className="p-3 text-[#6E6E73]">{u.betweennessCentrality}</td>
                  <td className="p-3 text-[#111111] font-bold">₹{(1450000 - i * 180000).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
