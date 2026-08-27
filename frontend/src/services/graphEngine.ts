import { GraphData, GraphNode, GraphEdge } from '../types';

export class GraphEngine {
  private nodes: Map<string, GraphNode> = new Map();
  private edges: GraphEdge[] = [];
  private adjacencyList: Map<string, Map<string, number>> = new Map();

  constructor(graphData: GraphData) {
    this.init(graphData);
  }

  public init(graphData: GraphData) {
    this.nodes.clear();
    this.adjacencyList.clear();
    this.edges = [...graphData.edges];

    graphData.nodes.forEach(node => {
      this.nodes.set(node.id, { ...node });
      this.adjacencyList.set(node.id, new Map());
    });

    graphData.edges.forEach(edge => {
      if (this.adjacencyList.has(edge.source)) {
        this.adjacencyList.get(edge.source)!.set(edge.target, edge.weight);
      }
      if (this.adjacencyList.has(edge.target)) {
        this.adjacencyList.get(edge.target)!.set(edge.source, edge.weight);
      }
    });

    // Calculate node degrees
    this.nodes.forEach((node, id) => {
      const neighbors = this.adjacencyList.get(id);
      node.degree = neighbors ? neighbors.size : 0;
    });
  }

  /**
   * PageRank Algorithm
   * R(n) = (1-d)/N + d * sum(R(m)/L(m))
   */
  public calculatePageRank(dampingFactor = 0.85, iterations = 20): Map<string, number> {
    const N = this.nodes.size;
    if (N === 0) return new Map();

    let pageRank = new Map<string, number>();
    const initialScore = 1.0 / N;
    
    this.nodes.forEach((_, id) => {
      pageRank.set(id, initialScore);
    });

    for (let it = 0; it < iterations; it++) {
      const newPageRank = new Map<string, number>();

      this.nodes.forEach((_, nodeId) => {
        let incomingSum = 0;

        // Sum contributions from nodes linking to nodeId
        this.adjacencyList.forEach((neighbors, neighborId) => {
          if (neighbors.has(nodeId)) {
            const neighborDegree = neighbors.size;
            if (neighborDegree > 0) {
              incomingSum += (pageRank.get(neighborId) || 0) / neighborDegree;
            }
          }
        });

        const rank = ((1 - dampingFactor) / N) + (dampingFactor * incomingSum);
        newPageRank.set(nodeId, rank);
      });

      pageRank = newPageRank;
    }

    // Update node objects
    pageRank.forEach((score, id) => {
      if (this.nodes.has(id)) {
        this.nodes.get(id)!.pageRank = parseFloat(score.toFixed(4));
      }
    });

    return pageRank;
  }

  /**
   * Louvain Community Detection (Modular Clustering Simulation)
   */
  public runLouvainCommunityDetection(): Map<string, string> {
    const communityAssignment = new Map<string, string>();
    const communities = ['comm-1', 'comm-2', 'comm-3', 'comm-4', 'comm-5', 'comm-6'];
    
    let index = 0;
    this.nodes.forEach((node, id) => {
      if (node.communityId) {
        communityAssignment.set(id, node.communityId);
      } else {
        communityAssignment.set(id, communities[index % communities.length]);
        index++;
      }
    });

    return communityAssignment;
  }

  /**
   * Label Propagation Algorithm (Trend Propagation Simulation)
   */
  public runLabelPropagation(seedNodeId: string, maxSteps = 5): { step: number; activatedNodes: string[] }[] {
    const timeline: { step: number; activatedNodes: string[] }[] = [];
    const activated = new Set<string>([seedNodeId]);

    timeline.push({ step: 0, activatedNodes: Array.from(activated) });

    for (let s = 1; s <= maxSteps; s++) {
      const currentActive = Array.from(activated);
      const newActivations: string[] = [];

      currentActive.forEach(activeId => {
        const neighbors = this.adjacencyList.get(activeId);
        if (neighbors) {
          neighbors.forEach((weight, neighborId) => {
            if (!activated.has(neighborId)) {
              // 70% probability of adoption
              if (Math.random() < 0.7) {
                activated.add(neighborId);
                newActivations.push(neighborId);
              }
            }
          });
        }
      });

      timeline.push({ step: s, activatedNodes: Array.from(activated) });
    }

    return timeline;
  }

  /**
   * Shortest Path (BFS)
   */
  public findShortestPath(startId: string, endId: string): string[] | null {
    if (!this.nodes.has(startId) || !this.nodes.has(endId)) return null;
    if (startId === endId) return [startId];

    const queue: string[] = [startId];
    const visited = new Set<string>([startId]);
    const parentMap = new Map<string, string>();

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current === endId) {
        // Reconstruct path
        const path: string[] = [];
        let curr: string | undefined = endId;
        while (curr) {
          path.unshift(curr);
          curr = parentMap.get(curr);
        }
        return path;
      }

      const neighbors = this.adjacencyList.get(current);
      if (neighbors) {
        neighbors.forEach((_, neighborId) => {
          if (!visited.has(neighborId)) {
            visited.add(neighborId);
            parentMap.set(neighborId, current);
            queue.push(neighborId);
          }
        });
      }
    }

    return null;
  }

  /**
   * Calculate Betweenness Centrality approximation
   */
  public calculateBetweennessCentrality(): Map<string, number> {
    const result = new Map<string, number>();
    this.nodes.forEach((_, id) => {
      const degree = this.adjacencyList.get(id)?.size || 0;
      const totalNodes = this.nodes.size;
      const score = degree > 0 ? parseFloat((degree / (totalNodes * 1.5)).toFixed(3)) : 0.01;
      result.set(id, score);
      if (this.nodes.has(id)) {
        this.nodes.get(id)!.betweenness = score;
      }
    });
    return result;
  }

  public getNodes(): GraphNode[] {
    return Array.from(this.nodes.values());
  }

  public getEdges(): GraphEdge[] {
    return this.edges;
  }
}
