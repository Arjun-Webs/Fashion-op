# 🌌 AURA Fashion AI — Full-Stack Graph Analytics & Next-Gen Social Shopping Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-3776ab.svg)](https://www.python.org/)

AURA is an end-to-end, high-performance web platform combining a visual Social Commerce Frontend with a Graph Neural Analytics microservice backend. It provides real-time community detection, virality index predictions, PageRank node centrality calculations, personalized AI styling recommendations, and an immersive shopping experience.

---

## 📁 Repository Structure

```text
├── frontend/                     # React 18 + Vite + TypeScript Frontend App
│   ├── src/
│   │   ├── components/          # UI Components (Graph Analytics, Social Feed, Auth, Cart, etc.)
│   │   ├── data/                # Mock Dataset & Graph Structures
│   │   ├── services/            # API Clients (Graph Engine & AI Recommender)
│   │   ├── types/               # TypeScript Interfaces & Models
│   │   ├── App.tsx              # Main Router & Layout Container
│   │   └── index.css            # Tailwind & Custom Styling Tokens
│   ├── index.html               # Entry HTML Document
│   ├── package.json             # Frontend Dependencies & Scripts
│   ├── tsconfig.json            # TypeScript Configuration
│   └── vite.config.ts           # Vite Build Setup
│
├── backend/                      # FastAPI + NetworkX Microservice Backend
│   ├── main.py                  # FastAPI Application & Graph Analytics Endpoints
│   ├── requirements.txt         # Python Dependencies
│   └── trending_fashion_items.csv # Trend & Node Attribute Dataset
│
├── .gitignore                    # Git Ignore Rules for Node, Python, and OS files
├── package.json                  # Root Monorepo Runner Scripts
├── DOCUMENTATION.md              # Technical Architecture & API Docs
├── USER_GUIDE.md                 # Product Manual & Walkthrough
└── README.md                     # Project Root Overview
```

---

## ✨ Features

- 🕸️ **Network Graph Analytics Engine**: Interactive Cytoscape & ECharts graph visualizations displaying relationships between users, luxury products, and fashion tags.
- 📊 **PageRank & Community Detection**: Real-time graph node centrality computations and Louvain community grouping powered by NetworkX.
- 🔮 **Virality Predictor**: Machine Learning-assisted virality score estimation for social fashion posts based on engagement heuristics.
- 🛍️ **E-Commerce & Social Feed**: Rich product catalog, shopping cart drawer, user authentication modal, and community feeds.
- 🎨 **Bloomberg-Quality UI Aesthetics**: Sleek dark-mode interface with glassmorphism, fluid Framer Motion micro-animations, and dynamic metric visualizations.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm** v9+
- **Python** 3.10+ and **pip**

### Option 1: Quick Start (Run Both Frontend & Backend)

From the root directory:

1. **Install root dependencies**:
   ```bash
   npm install
   ```

2. **Install frontend dependencies**:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

3. **Install backend dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

4. **Launch both services concurrently**:
   ```bash
   npm run dev
   ```
   - **Frontend UI**: [http://localhost:5173](http://localhost:5173)
   - **Backend API**: [http://localhost:8000](http://localhost:8000)
   - **Interactive API Docs (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Option 2: Running Services Separately

#### Frontend Development Server
```bash
cd frontend
npm run dev
```

#### Backend FastAPI Server
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

---

## 🛠️ API Reference (Backend)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Service health status & total node/edge counts |
| `GET` | `/api/graph/stats` | Network density, modularity index, connectivity check |
| `GET` | `/api/graph/pagerank` | Computes PageRank centrality scores for graph nodes |
| `POST` | `/api/trends/predict` | Predicts virality index, estimated likes, and share metrics |

---

## 📦 Building for Production

To create an optimized production build of the frontend:

```bash
npm run build:frontend
```
The compiled static assets will be saved to `frontend/dist/`.

---

## 📄 Documentation

For full architecture details and user guides, refer to:
- [`DOCUMENTATION.md`](./DOCUMENTATION.md) — Technical Deep Dive & Component Specifications
- [`USER_GUIDE.md`](./USER_GUIDE.md) — Step-by-Step User Instructions

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
