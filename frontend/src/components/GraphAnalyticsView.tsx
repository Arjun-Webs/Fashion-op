import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { 
  Network, 
  Info
} from 'lucide-react';
import { GraphData, GraphNode } from '../types';
import { GraphEngine } from '../services/graphEngine';

interface GraphAnalyticsViewProps {
  graphData: GraphData;
}

export const GraphAnalyticsView: React.FC<GraphAnalyticsViewProps> = ({ graphData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [activeAlgorithm, setActiveAlgorithm] = useState<string>('Overview');
  const [engine] = useState(() => new GraphEngine(graphData));

  const [showUsers, setShowUsers] = useState(true);
  const [showProducts, setShowProducts] = useState(true);
  const [showHashtags, setShowHashtags] = useState(true);
  const [showCommunities, setShowCommunities] = useState(true);

  const [startNodeId, setStartNodeId] = useState('user-1');
  const [endNodeId, setEndNodeId] = useState('prod-3');
  const [shortestPathResult, setShortestPathResult] = useState<string[] | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const filteredNodes = graphData.nodes.filter(n => {
      if (n.type === 'User' && !showUsers) return false;
      if (n.type === 'Product' && !showProducts) return false;
      if (n.type === 'Hashtag' && !showHashtags) return false;
      if (n.type === 'Community' && !showCommunities) return false;
      return true;
    });

    const allowedNodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredEdges = graphData.edges.filter(
      e => allowedNodeIds.has(e.source) && allowedNodeIds.has(e.target)
    );

    const cyNodes = filteredNodes.map(n => ({
      data: {
        id: n.id,
        label: n.label,
        type: n.type,
        pageRank: n.pageRank || 0.05,
        degree: n.degree || 5,
        rawNode: n
      }
    }));

    const cyEdges = filteredEdges.map(e => ({
      data: {
        id: e.id,
        source: e.source,
        target: e.target,
        type: e.type,
        weight: e.weight
      }
    }));

    const cy = cytoscape({
      container: containerRef.current,
      elements: [...cyNodes, ...cyEdges],
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'color': '#111111',
            'font-family': 'Inter, sans-serif',
            'font-size': '10px',
            'text-valign': 'bottom',
            'text-margin-y': 4,
            'background-color': '#111111',
            'width': 'mapData(pageRank, 0.01, 0.15, 24, 55)',
            'height': 'mapData(pageRank, 0.01, 0.15, 24, 55)',
            'border-width': 2,
            'border-color': 'rgba(0,0,0,0.1)',
          }
        },
        {
          selector: 'node[type = "User"]',
          style: { 'background-color': '#111111', 'border-color': '#111111' }
        },
        {
          selector: 'node[type = "Product"]',
          style: { 'background-color': '#C5A059', 'border-color': '#C5A059' }
        },
        {
          selector: 'node[type = "Hashtag"]',
          style: { 'background-color': '#E53935', 'border-color': '#E53935' }
        },
        {
          selector: 'node[type = "Community"]',
          style: { 'background-color': '#6E6E73', 'border-color': '#6E6E73' }
        },
        {
          selector: 'edge',
          style: {
            'width': 'data(weight)',
            'line-color': 'rgba(0, 0, 0, 0.12)',
            'curve-style': 'bezier',
            'opacity': 0.7
          }
        },
        {
          selector: ':selected',
          style: {
            'border-width': 4,
            'border-color': '#111111',
            'line-color': '#111111',
            'opacity': 1.0
          }
        },
        {
          selector: '.highlighted',
          style: {
            'background-color': '#C5A059',
            'line-color': '#C5A059',
            'width': 4,
            'opacity': 1.0
          }
        }
      ],
      layout: {
        name: 'cose',
        animate: true,
        padding: 30
      }
    });

    cy.on('tap', 'node', (evt) => {
      const nodeData = evt.target.data('rawNode');
      setSelectedNode(nodeData);
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, [graphData, showUsers, showProducts, showHashtags, showCommunities]);

  const handleRunPageRank = () => {
    setActiveAlgorithm('PageRank');
    engine.calculatePageRank();
    const nodes = engine.getNodes();
    if (cyRef.current) {
      cyRef.current.batch(() => {
        nodes.forEach(n => {
          const ele = cyRef.current?.$id(n.id);
          if (ele) ele.data('pageRank', n.pageRank);
        });
      });
    }
  };

  const handleRunShortestPath = () => {
    setActiveAlgorithm('ShortestPath');
    const path = engine.findShortestPath(startNodeId, endNodeId);
    setShortestPathResult(path);

    if (cyRef.current && path) {
      cyRef.current.elements().removeClass('highlighted');
      path.forEach(id => {
        cyRef.current?.$id(id).addClass('highlighted');
      });
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-[#111111]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/5 pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#6E6E73] font-medium block mb-1">
            NETWORK MAP
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-light tracking-tight text-[#111111]">
            Style & Influencer Network Map
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleRunPageRank}
            className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition ${
              activeAlgorithm === 'PageRank'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'bg-[#F5F5F2] border border-black/5 text-[#6E6E73] hover:text-[#111111]'
            }`}
          >
            Calculate PageRank
          </button>
          <button
            onClick={() => setActiveAlgorithm('Louvain')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition ${
              activeAlgorithm === 'Louvain'
                ? 'bg-[#111111] text-white shadow-xs'
                : 'bg-[#F5F5F2] border border-black/5 text-[#6E6E73] hover:text-[#111111]'
            }`}
          >
            Style Clusters
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#F5F5F2] border border-black/5 text-xs">
        <div className="flex items-center space-x-4">
          <span className="font-mono text-[#111111] uppercase font-semibold">Filter Node Types:</span>
          <label className="flex items-center space-x-1.5 cursor-pointer text-[#2C2C2E]">
            <input type="checkbox" checked={showUsers} onChange={e => setShowUsers(e.target.checked)} className="accent-[#111111]" />
            <span className="font-mono">Users</span>
          </label>
          <label className="flex items-center space-x-1.5 cursor-pointer text-[#2C2C2E]">
            <input type="checkbox" checked={showProducts} onChange={e => setShowProducts(e.target.checked)} className="accent-[#C5A059]" />
            <span className="font-mono text-[#C5A059]">Products</span>
          </label>
          <label className="flex items-center space-x-1.5 cursor-pointer text-[#2C2C2E]">
            <input type="checkbox" checked={showHashtags} onChange={e => setShowHashtags(e.target.checked)} className="accent-[#E53935]" />
            <span className="font-mono text-[#E53935]">Hashtags</span>
          </label>
          <label className="flex items-center space-x-1.5 cursor-pointer text-[#2C2C2E]">
            <input type="checkbox" checked={showCommunities} onChange={e => setShowCommunities(e.target.checked)} className="accent-[#6E6E73]" />
            <span className="font-mono text-[#6E6E73]">Communities</span>
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-mono text-[#6E6E73]">Trace Connection Path:</span>
          <select
            value={startNodeId}
            onChange={(e) => setStartNodeId(e.target.value)}
            className="px-2.5 py-1 rounded-full bg-white border border-black/10 font-mono text-[#111111]"
          >
            {graphData.nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
          </select>
          <span className="text-gray-400 font-mono">➜</span>
          <select
            value={endNodeId}
            onChange={(e) => setEndNodeId(e.target.value)}
            className="px-2.5 py-1 rounded-full bg-white border border-black/10 font-mono text-[#111111]"
          >
            {graphData.nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
          </select>
          <button
            onClick={handleRunShortestPath}
            className="px-3.5 py-1 rounded-full bg-[#111111] text-white font-mono font-semibold hover:bg-[#2C2C2E] transition"
          >
            Trace
          </button>
        </div>
      </div>

      {/* Main Canvas & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 relative h-[600px] rounded-3xl bg-white border border-black/5 overflow-hidden shadow-velaro">
          <div ref={containerRef} className="w-full h-full" />
          <div className="absolute top-4 left-4 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-black/5 text-xs font-mono text-[#6E6E73] space-y-1 shadow-xs">
            <div className="text-[#111111] font-semibold uppercase">NETWORK MAP STATUS</div>
            <div>Nodes: {graphData.nodes.length} • Links: {graphData.edges.length}</div>
            <div>Click any node to inspect properties</div>
          </div>
        </div>

        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-black/5 shadow-velaro space-y-6">
          <h3 className="font-editorial text-xl font-light text-[#111111] flex items-center gap-2 border-b border-black/5 pb-4">
            <Info className="w-5 h-5 stroke-[1.5] text-[#111111]" /> Node Inspector Panel
          </h3>

          {selectedNode ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#F5F5F2] border border-black/5 space-y-2">
                <div className="flex justify-between text-xs font-mono text-[#6E6E73]">
                  <span>ID: {selectedNode.id}</span>
                  <span className="px-2 py-0.5 rounded bg-white text-[#111111] font-semibold border border-black/5">
                    {selectedNode.type}
                  </span>
                </div>
                <h4 className="font-editorial text-2xl font-light text-[#111111]">
                  {selectedNode.label}
                </h4>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2.5 rounded-xl bg-[#F5F5F2]">
                  <span className="text-[#6E6E73]">PageRank Score:</span>
                  <span className="text-[#111111] font-bold">{selectedNode.pageRank || 0.082}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-[#F5F5F2]">
                  <span className="text-[#6E6E73]">Links Count:</span>
                  <span className="text-[#111111] font-bold">{selectedNode.degree || 14} connections</span>
                </div>
              </div>

              {shortestPathResult && (
                <div className="p-4 rounded-2xl bg-[#F5F5F2] border border-black/5 text-xs text-[#111111] space-y-1">
                  <div className="font-mono text-[10px] font-bold uppercase text-[#6E6E73]">Shortest Path Traced:</div>
                  <div className="font-mono text-[11px] text-[#111111]">
                    {shortestPathResult.join(' ➜ ')}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 space-y-3 text-[#6E6E73]">
              <Network className="w-12 h-12 text-gray-300 mx-auto stroke-[1]" />
              <p className="text-xs font-mono">Click on any node in the network map to inspect detailed properties.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
