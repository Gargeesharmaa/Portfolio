# Gargee Sharma — Agentic AI & GenAI Engineer Portfolio

A distinctive, high-performance, and credible portfolio website engineered for **Gargee Sharma** — 3rd-year B.Tech IT student at Engineering College Ajmer seeking **Generative AI** and **Agentic AI Engineering** internships (available November 2026 • Remote & Relocation).

---

## 🌟 Key Features

1. **Purposeful 3D Component**:
   * Real-time 3D **Agentic State-Graph Orchestrator** implemented in Three.js (WebGL).
   * Visualizes a production LangGraph cyclic workflow: *User Query → Vector Retriever (ChromaDB) → Document Grader (CRAG) → Query Rewriter → LLM Generator → Postgres Checkpoint*.
   * Interactive mouse/touch rotation, node state inspection, and an interactive **"Simulate CRAG Cycle"** runner demonstrating self-correcting query reformulation.
   * Zero AI clichés (no random glowing spheres or generic blobs)—strictly represents agent state architecture.

2. **Grounded, Quantified Project Showcases**:
   * **Agentic-RAG Platform**: Self-correcting LangGraph workflow, document grading, Postgres checkpointing, and RAGAS evaluation harness (Faithfulness 0.89, Context Precision 0.80, Context Recall 0.67, Answer Relevancy 0.66).
   * **Laya Triage**: Dual-tier SRE inference engine (local encoder with Groq Llama 3.3 fallback) cutting median latency ~50x (2,000 ms to 42 ms) and avoiding 87% API costs with a 0.75 confidence guardrail.

3. **Explore AI Engineer Portfolios**:
   * Searchable, curated directory of real AI/ML practitioners (Andrej Karpathy, Chip Huyen, Eugene Yan, Lilian Weng, Simon Willison, Hamel Husain, Shawn Wang / swyx, Jay Alammar).
   * Instant keyword search, tag filtering, and direct verified URLs.

4. **Recruiter-Centric Contact Experience**:
   * 1-click email and phone copying with instant checkmark feedback.
   * Pre-filled 1-click mailto launcher for hiring managers.
   * Complete verified candidate resume modal with print-to-PDF support.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Starts local server at `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Generates optimized code-split production bundles in `./dist`.

---

## 🛠️ Tech Stack
- **Framework**: React 18 + Vite 5
- **Styling**: Tailwind CSS + Typography + Lucide Icons
- **3D Graphics**: Three.js (WebGL with ACESFilmic tone mapping)
- **Deployment**: Zero-dependency static output ready for Vercel, Netlify, or GitHub Pages.

