export const personalInfo = {
  name: "Gargee Sharma",
  role: "Agentic AI & GenAI Engineer",
  tagline: "3rd-year B.Tech IT undergraduate building production LLM systems with LangGraph, LangChain, RAGAS, FastAPI, and Docker.",
  availability: {
    status: "Actively Seeking Internships",
    role: "GenAI & Agentic AI Engineer Intern",
    timeline: "Available from November 2026",
    flexibility: "Open to Remote & Immediate Relocation",
    badge: "Seeking Internships • Nov 2026 • Remote & Relocation"
  },
  contact: {
    email: "gargee6548@gmail.com",
    phone: "+91 7874237752",
    location: "Ajmer, Rajasthan, India",
    linkedin: "https://www.linkedin.com/in/gargee-sharma/",
    github: "https://github.com/Gargeesharmaa",
    githubUsername: "Gargeesharmaa",
    // Free Web3Forms key from web3forms.com (optional: paste your key here for zero-redirect in-page submissions)
    web3FormsAccessKey: ""
  },
  education: {
    degree: "B.Tech in Information Technology",
    institution: "Engineering College Ajmer",
    location: "Ajmer, Rajasthan",
    timeline: "Aug 2024 – May 2028",
    status: "3rd Year Undergraduate Student"
  },
  leadership: [
    {
      title: "Joint Secretary",
      organization: "AI/ML Club — Engineering College Ajmer",
      bullets: [
        "Co-lead the college AI/ML Club, coordinating technical sessions, hands-on workshops, and peer-learning activities on Machine Learning and Generative AI.",
        "Plan speaker sessions, hands-on agent building workshops, project showcases, and oversee member onboarding and technical logistics."
      ]
    }
  ]
};

export const skillsData = [
  {
    category: "Agentic AI & Orchestration",
    description: "Multi-agent systems, state-graph orchestration, and self-correcting reasoning loops",
    skills: [
      { name: "LangGraph", level: "Core", tag: "State Machine" },
      { name: "Multi-Agent Systems", level: "Core", tag: "Coordination" },
      { name: "State-Graph Orchestration", level: "Core", tag: "Architecture" },
      { name: "Corrective RAG (CRAG)", level: "Advanced", tag: "Pattern" },
      { name: "Tool-Calling & Routing", level: "Advanced", tag: "Agent Tooling" },
      { name: "Autonomous Query Rewriting", level: "Advanced", tag: "Self-Correction" },
      { name: "LLM Guardrails & Confidence Gates", level: "Advanced", tag: "Reliability" },
      { name: "DeepEval & RAGAS", level: "Advanced", tag: "Evaluation" }
    ]
  },
  {
    category: "Generative AI & LLMs",
    description: "Vector embeddings, retrieval pipelines, semantic routing, and evaluation",
    skills: [
      { name: "RAG Architectures", level: "Core", tag: "Retrieval" },
      { name: "LangChain", level: "Core", tag: "Framework" },
      { name: "ChromaDB", level: "Core", tag: "Vector Store" },
      { name: "RAGAS Evaluation Framework", level: "Advanced", tag: "Benchmarking" },
      { name: "LangSmith Tracing", level: "Advanced", tag: "Observability" },
      { name: "Groq (Llama 3.3)", level: "Advanced", tag: "Fast Inference" },
      { name: "HuggingFace Embeddings", level: "Advanced", tag: "Embeddings" },
      { name: "OpenAI API", level: "Advanced", tag: "Synthesis" }
    ]
  },
  {
    category: "Backend & Systems",
    description: "Production API services, strict data contracts, and transactional persistence",
    skills: [
      { name: "Python", level: "Core", tag: "Language" },
      { name: "FastAPI", level: "Core", tag: "API Framework" },
      { name: "Pydantic (Strict Schema)", level: "Core", tag: "Validation" },
      { name: "PostgreSQL & SQL", level: "Advanced", tag: "State Checkpointing" },
      { name: "REST APIs & Webhooks", level: "Core", tag: "Integration" },
      { name: "Hexagonal Architecture", level: "Advanced", tag: "Design Pattern" }
    ]
  },
  {
    category: "DevOps & Infrastructure",
    description: "Containerization, MLOps tracking, and automated pipelines",
    skills: [
      { name: "Docker & Docker Compose", level: "Core", tag: "Containers" },
      { name: "GitHub Actions (CI/CD)", level: "Advanced", tag: "Automation" },
      { name: "MLflow & DVC", level: "Advanced", tag: "MLOps Tracking" },
      { name: "Git Version Control", level: "Core", tag: "Collaboration" },
      { name: "Grafana Webhooks", level: "Intermediate", tag: "SRE Ingestion" },
      { name: "Slack Block Kit Integration", level: "Intermediate", tag: "Incident Ops" }
    ]
  }
];

export const projectsData = [
  {
    id: "agentic-rag",
    title: "Agentic-RAG Platform",
    subtitle: "Self-Correcting State-Graph RAG with Document Grading & LangGraph Checkpointing",
    github: "https://github.com/Gargeesharmaa/Agentic-Rag",
    impactMetric: "RAGAS Faithfulness: 0.89",
    secondaryMetric: "Context Precision: 0.80",
    statusBadge: "Autonomous State Graph",
    category: "Agentic AI",
    purpose: "Standard RAG systems hallucinate when retrieval retrieves noisy or irrelevant passages. This platform implements a self-correcting agentic workflow as a LangGraph state graph (retrieve → grade documents → generate or rewrite query). Irrelevant retrievals trigger autonomous query transformations instead of hallucinated answers, guaranteeing verified answer grounding before final synthesis.",
    technologies: [
      "Python", "LangGraph", "LangChain", "ChromaDB", "PostgreSQL", 
      "Docker", "Docker Compose", "RAGAS", "LangSmith", "Groq", "OpenAI"
    ],
    contributions: [
      "Designed a self-correcting agentic RAG workflow as a LangGraph state graph (retrieve, grade documents, generate or rewrite query), so irrelevant retrievals trigger autonomous query transformation instead of hallucinated answers.",
      "Implemented an LLM-based document grader that filters retrieved chunks before generation, improving answer grounding (corrective-RAG pattern); exposed the pipeline as an agent tool for a master agent.",
      "Built metadata-filtered retrieval (by file path or filename) with automatic fallback to global similarity search, supporting document-specific and cross-corpus Q&A.",
      "Added Postgres-backed LangGraph checkpointing for persistent agent sessions and replayable, auditable traces, with an in-memory fallback when no database is configured.",
      "Built a RAGAS evaluation harness that batch-scores and plots results: Faithfulness 0.89, Context Precision 0.80, Context Recall 0.67, Answer Relevancy 0.66.",
      "Containerized with Docker and docker-compose; supports multiple LLM providers (OpenAI, Groq) and LangSmith tracing hooks."
    ],
    evalMetrics: [
      { label: "Faithfulness", score: "0.89", value: 89, desc: "Grounded strictly in retrieved context without hallucination" },
      { label: "Context Precision", score: "0.80", value: 80, desc: "High signal-to-noise ratio in retrieved context chunks" },
      { label: "Context Recall", score: "0.67", value: 67, desc: "Coverage of ground-truth information in knowledge base" },
      { label: "Answer Relevancy", score: "0.66", value: 66, desc: "Direct alignment with user query intent" }
    ],
    architectureNodes: [
      { id: "input", name: "User Prompt", role: "AgentState Ingestion", type: "entry", color: "#06b6d4" },
      { id: "retrieve", name: "Metadata Retrieval", role: "ChromaDB Filtered Search", type: "action", color: "#10b981" },
      { id: "grade", name: "CRAG Doc Grader", role: "LLM Chunk Relevance Filter", type: "decision", color: "#f59e0b" },
      { id: "rewrite", name: "Query Rewriter", role: "Self-Correction Transform", type: "correction", color: "#a855f7" },
      { id: "generate", name: "LLM Generator", role: "Grounded Synthesis", type: "output", color: "#10b981" },
      { id: "checkpoint", name: "Postgres Checkpoint", role: "Replayable Audit Trace", type: "persist", color: "#3b82f6" }
    ]
  },
  {
    id: "laya-triage",
    title: "Laya Triage — LLM-Powered SRE Alert Triage",
    subtitle: "Dual-Tier Fast-Path Inference & Hexagonal Incident Response Backend",
    github: "https://github.com/Gargeesharmaa/laya-triage",
    impactMetric: "50x Latency Cut (2,000ms → 42ms)",
    secondaryMetric: "87% API Cost Saved",
    statusBadge: "Production SRE Pipeline",
    category: "High-Throughput Systems",
    purpose: "Engineering teams face alert fatigue from high-volume Grafana incident webhooks, while sending every alert to cloud LLMs causes unacceptable latency and massive API bills. Laya Triage implements a dual-tier inference pipeline: routing high-confidence alerts to an on-device local encoder and falling back to cloud LLMs only when ambiguity arises.",
    technologies: [
      "Python", "FastAPI", "Pydantic", "Laya", "Groq (Llama 3.3)", 
      "Docker", "GitHub Actions", "Slack Block Kit API", "Grafana Webhooks"
    ],
    contributions: [
      "Architected a dual-tier AI inference pipeline (local encoder with LLM fallback) that cut median latency ~50x (2,000 ms to 42 ms) and avoided API costs for 87% of requests by routing high-confidence alerts to an on-device model.",
      "Engineered a probabilistic guardrail using a calibrated confidence threshold (0.75) to route low-confidence decisions to Groq Llama 3.3, limiting hallucinations without sacrificing response speed.",
      "Built a FastAPI backend with strict Pydantic validation to ingest Grafana webhooks, return structured AI decisions (priority, team, risk), and send Slack Block Kit notifications for incident response.",
      "Designed a modular, hexagonal architecture so AI models (local vs cloud) and integrations (Slack) can be swapped without changing core business logic.",
      "Dockerized the application and set up GitHub Actions CI/CD for automated linting, testing, and container builds."
    ],
    evalMetrics: [
      { label: "Median Latency", score: "42 ms", value: 98, desc: "50x speedup from 2,000ms cloud latency to 42ms local execution" },
      { label: "API Cost Saved", score: "87%", value: 87, desc: "High-confidence alerts resolved without cloud token fees" },
      { label: "Confidence Threshold", score: "0.75", value: 75, desc: "Calibrated cutoff routing ambiguous alerts to Groq Llama 3.3" },
      { label: "Architecture", score: "Hexagonal", value: 100, desc: "Fully decoupled ports & adapters for zero-lock-in modularity" }
    ],
    architectureNodes: [
      { id: "webhook", name: "Grafana Webhook", role: "Strict Pydantic Schema", type: "entry", color: "#06b6d4" },
      { id: "encoder", name: "Local Fast Encoder", role: "Sub-50ms Classification", type: "action", color: "#10b981" },
      { id: "guardrail", name: "Confidence Gate (0.75)", role: "Probabilistic Routing", type: "decision", color: "#f59e0b" },
      { id: "cloud_llm", name: "Groq Llama 3.3", role: "Complex Reasoning Fallback", type: "fallback", color: "#a855f7" },
      { id: "slack", name: "Slack Block Kit", role: "Interactive Incident Card", type: "output", color: "#10b981" }
    ]
  },
  {
    id: "gargeemind",
    title: "GargeeMind — Multi-Agent Research System",
    subtitle: "Collaborative 4-Agent Research Pipeline with Autonomous Web Scraping & Fact Checking",
    github: "https://github.com/Gargeesharmaa/GARGEEMIND",
    liveDemo: "https://gargeemind.onrender.com/",
    impactMetric: "4 Specialized Autonomous Agents",
    secondaryMetric: "Full Source Citations",
    statusBadge: "Live on Render",
    category: "Multi-Agent Systems",
    purpose: "Manual deep-topic research requires hours of searching, vetting, and synthesizing conflicting sources. GargeeMind coordinates four specialized autonomous agents (Search Agent, Reader/Scraper Agent, Synthesis Writer, and Critic Agent) to autonomously gather, cross-examine, and author publication-ready markdown research reports.",
    technologies: [
      "Python", "Streamlit", "LangGraph", "Multi-Agent Workflows", 
      "Beautiful Soup", "DuckDuckGo API", "OpenAI / Groq", "Docker"
    ],
    contributions: [
      "Architected a four-agent collaborative workflow where specialized agents execute discrete tasks: Search (web discovery), Reader (HTML extraction), Writer (synthesis), and Critic (fact verification).",
      "Built resilient web-scraping fallbacks with rate-limit handling and content cleansing to extract high-signal text from disparate web sources.",
      "Implemented a feedback loop where the Critic agent scores draft reports for source grounding and returns critique notes to the Writer agent before final report rendering.",
      "Deployed a live interactive web app on Render with one-click report export and markdown downloads."
    ],
    evalMetrics: [
      { label: "Agent Count", score: "4 Agents", value: 100, desc: "Search, Scraper, Writer, and Critic peer coordination" },
      { label: "Citation Rate", score: "100%", value: 100, desc: "Every assertion backed by direct primary URL sources" },
      { label: "Verification Loop", score: "Active", value: 95, desc: "Critic review loop eliminates unsupported claims" },
      { label: "Deployment", score: "Render Live", value: 90, desc: "Containerized cloud deployment on Render platform" }
    ],
    architectureNodes: [
      { id: "topic", name: "Research Topic", role: "User Query Ingestion", type: "entry", color: "#06b6d4" },
      { id: "search", name: "Search Agent", role: "Web Discovery & URL Aggregation", type: "action", color: "#10b981" },
      { id: "scraper", name: "Scraper Agent", role: "Deep Text Extraction", type: "action", color: "#38bdf8" },
      { id: "writer", name: "Writer Agent", role: "Report Synthesis & Drafting", type: "decision", color: "#a855f7" },
      { id: "critic", name: "Critic Agent", role: "Fact-Check & Source Review", type: "correction", color: "#f59e0b" },
      { id: "export", name: "Report Output", role: "Structured Markdown Document", type: "output", color: "#10b981" }
    ]
  },
  {
    id: "ai-refund-agent-eval",
    title: "AI Refund Agent Evaluation System",
    subtitle: "Automated Regression Testing & Tool-Calling Evaluation with DeepEval & LangGraph",
    github: "https://github.com/Gargeesharmaa/AI-Refund-Agent-Evaluation-System",
    impactMetric: "DeepEval Metric Suites",
    secondaryMetric: "Strict Pydantic Contracts",
    statusBadge: "Agent Evaluation Engine",
    category: "LLM Testing & Reliability",
    purpose: "Transactional customer-facing agents that process refunds and payments require strict behavioral verification before production deployment. This system implements automated end-to-end evaluation harnesses using DeepEval, validating agent decision trees, tool-calling accuracy, and policy compliance.",
    technologies: [
      "Python", "DeepEval", "LangGraph", "LangChain-Groq", 
      "Pydantic v2", "Pytest", "Portalocker"
    ],
    contributions: [
      "Developed comprehensive evaluation suites assessing tool-calling accuracy, policy adherence, and hallucination resistance for autonomous refund agents.",
      "Engineered automated synthetic test scenarios modeling edge cases (e.g., fraudulent claims, partial refunds, expired warranty exceptions).",
      "Integrated DeepEval metric runners with continuous regression gates, preventing LLM prompt drift and unintended policy violations.",
      "Enforced strict Pydantic contract validation to guarantee deterministic JSON schemas across all transactional agent actions."
    ],
    evalMetrics: [
      { label: "Tool Accuracy", score: "96.4%", value: 96, desc: "Correct function and argument invocation across test suite" },
      { label: "Policy Adherence", score: "98.1%", value: 98, desc: "Strict compliance with transactional refund policies" },
      { label: "Evaluation Tool", score: "DeepEval", value: 100, desc: "Standardized metric evaluation & regression harness" },
      { label: "State Graph", score: "LangGraph", value: 100, desc: "Deterministic decision path execution" }
    ],
    architectureNodes: [
      { id: "scenario", name: "Test Scenario", role: "Synthetic Edge Case Ingestion", type: "entry", color: "#06b6d4" },
      { id: "agent", name: "Refund Agent", role: "LangGraph Decision Workflow", type: "action", color: "#10b981" },
      { id: "tool", name: "Tool Invocation", role: "Payment & DB Verification", type: "action", color: "#38bdf8" },
      { id: "deepeval", name: "DeepEval Harness", role: "Hallucination & Policy Scoring", type: "decision", color: "#f59e0b" },
      { id: "gate", name: "CI Quality Gate", role: "Pass/Fail Automated Threshold", type: "output", color: "#10b981" }
    ]
  },
  {
    id: "kidney-disease-mlops",
    title: "Kidney Disease Classification MLOps",
    subtitle: "End-to-End Deep Learning Pipeline with VGG16, DVC, MLflow, Docker & FastAPI",
    github: "https://github.com/Gargeesharmaa/Kidney-Disease-Classification-dlops",
    impactMetric: "81.8% Multi-Class Accuracy",
    secondaryMetric: "Full DVC & MLflow Tracking",
    statusBadge: "Production MLOps Pipeline",
    category: "MLOps & Deep Learning",
    purpose: "Medical image classification requires reproducible training pipelines, artifact versioning, and low-latency serving. This project implements an end-to-end MLOps pipeline using VGG16 transfer learning to classify kidney CT abnormalities into four categories (Cyst, Normal, Tumor, Stone).",
    technologies: [
      "Python", "TensorFlow / Keras", "VGG16", "DVC", "MLflow", 
      "Docker", "FastAPI", "Streamlit", "GitHub Actions"
    ],
    contributions: [
      "Engineered an end-to-end deep learning pipeline using fine-tuned VGG16 transfer learning, achieving 81.8% multi-class accuracy across CT scans.",
      "Integrated Data Version Control (DVC) for reproducible dataset and model artifact versioning across pipeline stages.",
      "Instrumented MLflow experiment tracking to log hyperparameter iterations, training loss, and validation metrics.",
      "Containerized both the FastAPI REST inference microservice and interactive Streamlit diagnosis UI with Docker."
    ],
    evalMetrics: [
      { label: "Test Accuracy", score: "81.8%", value: 82, desc: "Validated multi-class accuracy on held-out CT scans" },
      { label: "Model Architecture", score: "VGG16", value: 90, desc: "Fine-tuned transfer learning backbone" },
      { label: "Data Versioning", score: "DVC", value: 100, desc: "Immutable dataset and pipeline stage lineage" },
      { label: "Experiment Tracking", score: "MLflow", value: 100, desc: "Automated metric logging and model registry" }
    ],
    architectureNodes: [
      { id: "ct_scan", name: "CT Scan Ingestion", role: "DICOM/Image Preprocessing", type: "entry", color: "#06b6d4" },
      { id: "dvc", name: "DVC Pipeline", role: "Data Versioning & Stage Caching", type: "action", color: "#10b981" },
      { id: "vgg16", name: "VGG16 Model", role: "Deep Feature Extraction", type: "action", color: "#38bdf8" },
      { id: "mlflow", name: "MLflow Registry", role: "Metric & Model Artifact Logging", type: "decision", color: "#a855f7" },
      { id: "fastapi", name: "FastAPI Serving", role: "Containerized Microservice Endpoint", type: "output", color: "#10b981" }
    ]
  }
];
