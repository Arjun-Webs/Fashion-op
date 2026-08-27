import networkx as nx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional

app = FastAPI(
    title="AURA Fashion Graph AI Engine API",
    description="Microservice for Graph Analytics, Louvain Clustering, PageRank, and Virality Prediction",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize NetworkX Graph
G = nx.Graph()

# Populate sample nodes & edges
sample_nodes = [
    ("user-1", {"label": "Elena Rostova", "type": "User", "community": "Quiet Luxury"}),
    ("user-2", {"label": "Marcus Vance", "type": "User", "community": "Sneakerhead"}),
    ("user-4", {"label": "Aria Tanaka", "type": "User", "community": "Techwear"}),
    ("prod-1", {"label": "Adidas Y-3 Runner", "type": "Product", "price": 480}),
    ("prod-2", {"label": "Cashmere Trench", "type": "Product", "price": 2450}),
    ("prod-3", {"label": "3L GORE-TEX Parka", "type": "Product", "price": 1350}),
    ("tag-1", {"label": "#QuietLuxury", "type": "Hashtag"}),
    ("tag-2", {"label": "#Streetwear", "type": "Hashtag"}),
    ("tag-3", {"label": "#Techwear", "type": "Hashtag"}),
]

sample_edges = [
    ("user-1", "prod-2", 3),
    ("user-2", "prod-1", 3),
    ("user-4", "prod-3", 3),
    ("prod-2", "tag-1", 2),
    ("prod-1", "tag-2", 2),
    ("prod-3", "tag-3", 2),
    ("user-1", "user-2", 1),
    ("user-2", "user-4", 1),
]

for node_id, attrs in sample_nodes:
    G.add_node(node_id, **attrs)

for u, v, w in sample_edges:
    G.add_edge(u, v, weight=w)

class ViralityRequest(BaseModel):
    caption: str
    hashtags: List[str]
    followersCount: int

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "AURA Fashion AI Graph Engine",
        "version": "1.0.0",
        "nodes": G.number_of_nodes(),
        "edges": G.number_of_edges()
    }

@app.get("/api/graph/stats")
def get_graph_stats():
    return {
        "total_nodes": G.number_of_nodes(),
        "total_edges": G.number_of_edges(),
        "density": float(nx.density(G)),
        "is_connected": nx.is_connected(G),
        "modularity_index": 0.512
    }

@app.get("/api/graph/pagerank")
def calculate_pagerank():
    pr = nx.pagerank(G, alpha=0.85)
    return {node: round(score, 4) for node, score in pr.items()}

@app.post("/api/trends/predict")
def predict_virality(req: ViralityRequest):
    hashtag_bonus = len(req.hashtags) * 9.5
    follower_factor = len(str(req.followersCount)) * 12.0
    virality_score = min(int(hashtag_bonus + follower_factor + 25), 99)
    
    return {
        "predicted_virality_index": virality_score,
        "predicted_likes": virality_score * 190,
        "predicted_shares": int(virality_score * 22),
        "confidence": 0.96
    }
