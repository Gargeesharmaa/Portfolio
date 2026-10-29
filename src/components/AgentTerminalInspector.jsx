import React, { useState, useRef, useEffect } from 'react';
import { personalInfo, projectsData, skillsData } from '../data/portfolioData';
import { Terminal, Play, RotateCcw, Copy, Check, Sparkles, Cpu, Zap, Activity } from 'lucide-react';

export default function AgentTerminalInspector() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Gargee Sharma Agentic Runtime CLI v2.4' },
    { type: 'system', text: 'Type "help" or click one of the interactive quick actions below.' }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'user', text: `$ ${cmdStr}` }];

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmed === 'help') {
      newHistory.push({
        type: 'response',
        text: `Available Commands:
  • run eval          - Simulate RAGAS evaluation harness on Agentic-RAG
  • inspect triage    - Benchmark Laya Triage dual-tier latency (42ms vs 2000ms)
  • cat projects      - Dump active production projects & GitHub repositories
  • cat skills        - List verified Agentic AI & Backend competencies
  • contact           - Display direct email, phone, and relocation availability
  • clear             - Clear terminal screen`
      });
      setHistory(newHistory);
      return;
    }

    if (trimmed === 'cat projects') {
      newHistory.push({
        type: 'response',
        text: `Active Production Repositories:
1. Agentic-RAG Platform:
   - State-graph self-correcting RAG (LangGraph, ChromaDB, Postgres Checkpointing)
   - Benchmarks: Faithfulness 0.89 | Context Precision 0.80
   - URL: https://github.com/Gargeesharmaa/Agentic-Rag

2. Laya Triage - LLM-Powered SRE Alert Triage:
   - Dual-tier local encoder with Groq Llama 3.3 fallback
   - Benchmarks: 42ms median latency (~50x speedup), 87% API costs saved
   - URL: https://github.com/Gargeesharmaa/laya-triage`
      });
      setHistory(newHistory);
      return;
    }

    if (trimmed === 'cat skills') {
      newHistory.push({
        type: 'response',
        text: `Technical Competencies:
• Agentic AI: LangGraph, State-Graph Orchestration, Multi-Step Agent Workflows, Corrective RAG, Query Rewriting, Tool-Calling, LLM Guardrails
• Generative AI: RAG, LangChain, ChromaDB, RAGAS, LangSmith Tracing, Groq (Llama 3.3), OpenAI API
• Backend: Python, FastAPI, Pydantic, PostgreSQL, REST APIs, Webhooks, Hexagonal Architecture
• DevOps: Docker, Docker Compose, GitHub Actions CI/CD, Git, Automated Testing`
      });
      setHistory(newHistory);
      return;
    }

    if (trimmed === 'contact') {
      newHistory.push({
        type: 'response',
        text: `Candidate Contact & Status:
• Name: Gargee Sharma (3rd-year B.Tech IT, Engineering College Ajmer)
• Availability: Internships from November 2026 (Open to Remote & Relocation)
• Email: gargee6548@gmail.com
• Phone: +91 7874237752
• GitHub: https://github.com/Gargeesharmaa
• LinkedIn: https://www.linkedin.com/in/gargee-sharma/`
      });
      setHistory(newHistory);
      return;
    }

    if (trimmed === 'run eval') {
      setIsRunning(true);
      newHistory.push({ type: 'system', text: '[RAGAS HARNESS] Ingesting test dataset & firing batch evaluator...' });
      setHistory(newHistory);

      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          { type: 'system', text: '  [1/4] Evaluating Document Grader chunk relevance...' },
          { type: 'system', text: '  [2/4] Measuring Context Precision (retrieved chunks vs ground truth)...' }
        ]);
      }, 600);

      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          { type: 'system', text: '  [3/4] Testing query transformation self-correction cycles...' },
          { type: 'system', text: '  [4/4] Computing synthesis grounding against hallucination...' }
        ]);
      }, 1200);

      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            type: 'response',
            text: `[RAGAS EVALUATION HARNESS COMPLETE]
--------------------------------------------------
✓ Faithfulness:       0.89  [EXCELLENT - Grounded Context]
✓ Context Precision:  0.80  [HIGH SIGNAL - Minimal Noise]
✓ Context Recall:     0.67  [VERIFIED - Knowledge Coverage]
✓ Answer Relevancy:   0.66  [ALIGNED - Direct Intent Match]
--------------------------------------------------
Status: PASS • Trace recorded to LangSmith`
          }
        ]);
        setIsRunning(false);
      }, 1800);
      return;
    }

    if (trimmed === 'inspect triage') {
      setIsRunning(true);
      newHistory.push({ type: 'system', text: '[LAYA TRIAGE] Profiling Grafana webhook payload through dual-tier pipeline...' });
      setHistory(newHistory);

      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            type: 'response',
            text: `[LATENCY WATERFALL & ROUTING ANALYSIS]
--------------------------------------------------
Tier 1: On-Device Fast Classifier
  ↳ Execution Time:      42 ms
  ↳ Confidence Score:    0.91 (Threshold: ≥ 0.75)
  ↳ Decision:            P1 Alert -> Route to #sre-incidents
  ↳ Cloud API Fee:       $0.00 (Local Avoidance)

Comparison vs Cloud LLM Fallback:
  ↳ Cloud Median:        2,084 ms
  ↳ Speedup:             ~50x faster
  ↳ Monthly Savings:     87% API reduction across 10,000 alerts
--------------------------------------------------
Status: 200 OK • Dispatched Slack Block Kit card in 48ms total`
          }
        ]);
        setIsRunning(false);
      }, 1200);
      return;
    }

    newHistory.push({
      type: 'error',
      text: `Command not found: "${cmdStr}". Type "help" to view valid commands.`
    });
    setHistory(newHistory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRunning) return;
    executeCommand(inputVal);
    setInputVal('');
  };

  return (
    <div className="rounded-2xl bg-[#090d16] border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-slate-400 text-[11px] font-semibold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            gargee@agentic-runtime: ~
          </span>
        </div>

        {/* Quick Clickable Triggers */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => executeCommand('run eval')}
            disabled={isRunning}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[10px] border border-slate-700 transition-colors flex items-center gap-1"
          >
            <Play className="w-2.5 h-2.5" /> run eval
          </button>
          <button
            onClick={() => executeCommand('inspect triage')}
            disabled={isRunning}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[10px] border border-slate-700 transition-colors flex items-center gap-1"
          >
            <Zap className="w-2.5 h-2.5" /> inspect triage
          </button>
          <button
            onClick={() => executeCommand('contact')}
            disabled={isRunning}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-violet-300 text-[10px] border border-slate-700 transition-colors"
          >
            contact
          </button>
        </div>
      </div>

      {/* Terminal Output Stream */}
      <div className="p-4 sm:p-5 h-64 sm:h-72 overflow-y-auto space-y-2 bg-[#060911]/95">
        {history.map((line, idx) => (
          <div key={idx} className="leading-relaxed">
            {line.type === 'user' && (
              <span className="text-emerald-400 font-bold">{line.text}</span>
            )}
            {line.type === 'system' && (
              <span className="text-slate-500">{line.text}</span>
            )}
            {line.type === 'response' && (
              <pre className="text-slate-200 whitespace-pre-wrap font-mono mt-1 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                {line.text}
              </pre>
            )}
            {line.type === 'error' && (
              <span className="text-red-400">{line.text}</span>
            )}
          </div>
        ))}
        {isRunning && (
          <div className="text-amber-400 animate-pulse flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Executing agentic subprocess...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Interactive Command Input */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
      >
        <span className="text-emerald-400 font-bold">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type 'run eval', 'inspect triage', 'cat skills', or 'help'..."
          disabled={isRunning}
          className="flex-1 bg-transparent text-white placeholder-slate-600 focus:outline-none text-xs font-mono"
        />
        <button
          type="submit"
          disabled={isRunning || !inputVal.trim()}
          className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-medium transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}

