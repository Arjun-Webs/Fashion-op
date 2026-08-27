# AURA Fashion AI — Comprehensive System & Architecture Documentation

Welcome to the technical and functional documentation for **AURA Fashion AI**, a state-of-the-art **Graph AI-Driven E-Commerce & Social Commerce Platform**. AURA merges high-end luxury fashion retail with graph neural analytics, influencer centrality algorithms (PageRank), community modularity detection (Louvain algorithm), and trend virality propagation models.

---

## 1. Executive Summary & Vision

Traditional e-commerce platforms treat products and customers as isolated database records. **AURA Fashion AI** reimagines commerce as a complex, interconnected social network graph comprising **Users**, **Products**, **Posts**, **Hashtags**, **Communities**, and **Brands**.

By modeling interaction networks:
- **Influencers** are ranked not just by raw follower count, but by graph **PageRank** and **Betweenness Centrality** (identifying true trendsetters vs. disconnected nodes).
- **Subcultures & Style Tribes** (e.g., *Quiet Luxury*, *Techwear*, *Retro Y2K*, *Sneakerheads*) are discovered dynamically through **Louvain Community Detection**.
- **Trend Propagation** is simulated using **Label Propagation** and **Independent Cascade Models** to forecast virality before inventory is stocked.
- **Recommendations** combine collaborative filtering, graph connectivity scores, and real-time virality signals.

---

## 2. Technology Stack & Directory Layout

### Tech Stack

| Layer | Technologies & Libraries |
| :--- | :--- |
| **Frontend Framework** | React 18 (TypeScript), Vite |
| **Styling & UI** | Custom Glassmorphism CSS, Tailwind CSS, Lucide React Icons |
| **Animations** | Framer Motion, Canvas Confetti |
| **Graph & Analytics Rendering** | Cytoscape.js (`cytoscape-fcose`, `cytoscape-cola`), ECharts, D3.js |
| **Backend Microservice** | Python 3, FastAPI, NetworkX, Uvicorn, Pydantic |
| **API Integration** | Axios / Fetch API, Vite Dev Proxy (`/api` -> `localhost:8000`) |

### Workspace Directory Structure

```
/Users/hema/Desktop/OP
├── backend/
│   ├── main.py              # FastAPI Python Microservice (NetworkX Graph Engine)
│   └── requirements.txt     # Python Dependencies (FastAPI, uvicorn, networkx)
├── src/
│   ├── components/          # React View Components & Modals
│   │   ├── AIRecommenderView.tsx
│   │   ├── AdminPanel.tsx
│   │   ├── AnalyticsDashboard.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── CheckoutModal.tsx
│   │   ├── CommunityDetectionView.tsx
│   │   ├── Footer.tsx
│   │   ├── GraphAnalyticsView.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCatalog.tsx
│   │   ├── ProductDetailModal.tsx
│   │   ├── SocialFeed.tsx
│   │   └── TrendPropagationView.tsx
│   ├── data/
│   │   └── mockData.ts      # Seed data for Users, Products, Posts, Graph Nodes/Edges
│   ├── services/
│   │   ├── aiEngine.ts      # Recommendation & Post Virality Predictor Model
│   │   └── graphEngine.ts   # Graph Algorithms (PageRank, Louvain, BFS, Centrality)
│   ├── types/
│   │   └── index.ts         # TypeScript Interfaces & Data Contracts
│   ├── App.tsx              # Main State Hub & View Router
│   ├── index.css            # Dark Mode & Glassmorphism Design System
│   └── main.tsx             # React Application Entry Point
├── index.html               # Main HTML Template with Google Fonts (Outfit, Inter)
├── package.json             # Node Dependencies & Scripts
├── tsconfig.json            # TypeScript Configuration
└── vite.config.ts           # Vite Bundler & API Proxy Config
```

---

## 3. Core Graph AI Concepts & Algorithms

### 3.1. PageRank & Influencer Centrality
[graphEngine.ts](file:///Users/hema/Desktop/OP/src/services/graphEngine.ts) implements an iterative PageRank algorithm:
\[
R(n) = \frac{1 - d}{N} + d \sum_{m \in M(n)} \frac{R(m)}{L(m)}
\]
- **$d$ (Damping Factor)**: Default $0.85$.
- **Nodes ($N$)**: Users, Products, Posts, Brands.
- **Application**: Ranks influencers based on endorsement authority rather than superficial follower metrics.

### 3.2. Louvain Modularity Community Detection
Group nodes into modular micro-communities (e.g. `comm-1`: Quiet Luxury, `comm-2`: Techwear Syndicate, `comm-3`: Sneakerhead Vault). High modularity scores indicate tight intra-community connections and distinct target demographics.

### 3.3. Independent Cascade & Label Propagation (Trend Radar)
Simulates how a seed product or hashtag spreads from an initial influencer node outward across adjacent follower network edges with adoption probability $p = 0.70$.

### 3.4. Hybrid Recommendation Engine
[aiEngine.ts](file:///Users/hema/Desktop/OP/src/services/aiEngine.ts) scores product recommendations by aggregating:
1. **Base Popularity**: Rating, review counts, sustainability index ($0-100$).
2. **Collaborative Signal**: Virality scores of social posts where the item is tagged.
3. **Content Alignment**: Trend tier boost (`Trending Hot`, `Rising Fast`).
4. **Graph Connectivity**: Direct and indirect graph node degree / PageRank weights.

---

## 4. Application Modules & UI Views

### 4.1. Navigation & Role Context ([Navbar.tsx](file:///Users/hema/Desktop/OP/src/components/Navbar.tsx))
- Supports dynamic role switching: **Customer**, **Influencer**, **Admin**, **Moderator**.
- Displays quick counts for Cart Items and Wishlisted Products.
- Switches between 8 primary application views.

### 4.2. Boutique Store View ([ProductCatalog.tsx](file:///Users/hema/Desktop/OP/src/components/ProductCatalog.tsx))
- Interactive catalog with category filtering (*Streetwear*, *Quiet Luxury*, *Techwear*, *Retro Y2K*, *Sneakers*, etc.).
- Trend badges, sustainability scores, price indicators, wishlist toggles, and detail modal triggers.

### 4.3. Social Commerce Feed ([SocialFeed.tsx](file:///Users/hema/Desktop/OP/src/components/SocialFeed.tsx))
- Instagram/TikTok-inspired feed with user stories, outfit posts, tagged products, hashtags, and virality badges.
- **Create Post Modal**: Allows users to post media, tag products, and instantly view the estimated **Virality Score**.

### 4.4. Trend Propagation Radar ([TrendPropagationView.tsx](file:///Users/hema/Desktop/OP/src/components/TrendPropagationView.tsx))
- Visualizes trend cascades (e.g. `#QuietLuxury`, `#Techwear`, `#RetroY2K`) across 5 stages: *Origin Seed* $\rightarrow$ *Early Trend* $\rightarrow$ *Peak Popularity* $\rightarrow$ *Mainstream* $\rightarrow$ *Declining*.
- Displays adoption velocity (users/day), virality coefficients, and geographic heatmap distribution.

### 4.5. Community Detection Vault ([CommunityDetectionView.tsx](file:///Users/hema/Desktop/OP/src/components/CommunityDetectionView.tsx))
- Explores graph clusters with top influencers, top-trending products, modularity index scores, and community growth metrics.

### 4.6. Interactive Graph Analytics ([GraphAnalyticsView.tsx](file:///Users/hema/Desktop/OP/src/components/GraphAnalyticsView.tsx))
- Cytoscape canvas visualizing multi-entity relationships (`USER`, `PRODUCT`, `POST`, `HASHTAG`, `COMMUNITY`).
- Allows filtering nodes by type, calculating shortest paths (BFS), running live PageRank recalculation, and inspecting node metrics.

### 4.7. AI Recommender Sandbox ([AIRecommenderView.tsx](file:///Users/hema/Desktop/OP/src/components/AIRecommenderView.tsx))
- Live playground testing 4 recommendation algorithms (*Hybrid*, *Collaborative*, *Content-Based*, *Graph-Based*).
- Includes the **Post Virality Predictor Model** and **Purchase Propensity Estimator**.

### 4.8. Executive Analytics Dashboard ([AnalyticsDashboard.tsx](file:///Users/hema/Desktop/OP/src/components/AnalyticsDashboard.tsx))
- High-level KPIs: Total Revenue (₹ GMV), Active Users, Graph Nodes/Edges count, Modularity Index, Virality Rate.
- Rendered charts analyzing sales distribution, trend adoption curves, and top centrality users.

### 4.9. Admin Control Panel ([AdminPanel.tsx](file:///Users/hema/Desktop/OP/src/components/AdminPanel.tsx))
- Product inventory management (add new products, set sustainability scores, limited drop flags).
- Live graph node injection tool for real-time node dynamic topology updates.

### 4.10. E-Commerce Checkout & Modals
- [CartDrawer.tsx](file:///Users/hema/Desktop/OP/src/components/CartDrawer.tsx): Sliding side drawer managing item quantities, sizes, and colors.
- [CheckoutModal.tsx](file:///Users/hema/Desktop/OP/src/components/CheckoutModal.tsx): Seamless checkout form with order summary and instant invoice generation with confetti effects.
- [ProductDetailModal.tsx](file:///Users/hema/Desktop/OP/src/components/ProductDetailModal.tsx): Deep-dive modal showing graph connections, high-res galleries, size selectors, and related items.

---

## 5. Microservice Backend API Specifications

The Python backend service ([backend/main.py](file:///Users/hema/Desktop/OP/backend/main.py)) runs on FastAPI and NetworkX:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `GET /` | `GET` | Health check & base network node/edge metrics |
| `GET /api/graph/stats` | `GET` | Density, connectivity, modularity index, node/edge counts |
| `GET /api/graph/pagerank` | `GET` | Calculates network-wide PageRank dictionary |
| `POST /api/trends/predict` | `POST` | Predicts virality index, estimated likes & shares from post inputs |

---

## 6. How to Run the Website Locally

### Step 1: Start the Frontend Vite Dev Server
```bash
npm run dev
```
- Local URL: **http://localhost:3000**

### Step 2: Start the Python FastAPI Backend Engine (Optional / Network Services)
```bash
python3 -m uvicorn backend.main:app --port 8000
```
- API Documentation & Swagger Docs: **http://localhost:8000/docs**

---

*Documentation compiled and maintained for AURA Fashion AI Engine.*
