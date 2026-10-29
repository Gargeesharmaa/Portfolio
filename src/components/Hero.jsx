import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  ArrowRight, 
  MapPin, 
  FileText,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

export default function Hero({ onOpenResumeModal }) {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full dark:bg-slate-900/90 bg-white border dark:border-slate-800 border-slate-200 text-xs font-mono dark:text-slate-300 text-slate-700 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for Internships • Nov 2026</span>
          <span className="text-slate-400">•</span>
          <span className="dark:text-cyan-400 text-cyan-700 font-semibold">Remote & Relocation</span>
        </div>

        {/* Name & Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight dark:text-white text-slate-950 leading-[1.08] max-w-4xl">
          Gargee Sharma
        </h1>

        <p className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold dark:text-slate-200 text-slate-800 tracking-tight">
          Agentic AI & GenAI Systems Engineer
        </p>

        {/* Narrative / Focus */}
        <p className="mt-6 text-base sm:text-lg md:text-xl dark:text-slate-300 text-slate-600 leading-relaxed max-w-2xl font-sans">
          3rd-year B.Tech IT undergraduate at <strong className="dark:text-white text-slate-900">Engineering College Ajmer</strong>. Focused on cyclic state-graph orchestration, deterministic latency reduction, and rigorous RAGAS evaluation harnesses that bring GenAI into production.
        </p>

        {/* Streamlined Human-Crafted Action Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8 w-full sm:w-auto">
          <a
            href="#projects"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenResumeModal}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl dark:bg-slate-900 bg-white hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-200 text-slate-800 text-sm font-medium border dark:border-slate-800 border-slate-300 transition-all shadow-sm flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <FileText className="w-4 h-4 text-cyan-500" />
            <span>View Resume (PDF)</span>
          </button>
        </div>

        {/* Integrated Production Telemetry Strip */}
        <div className="mt-14 w-full rounded-3xl dark:bg-slate-900/70 bg-white/90 border dark:border-slate-800 border-slate-200 p-6 sm:p-7 backdrop-blur-xl shadow-xl transition-colors">
          <div className="flex items-center justify-between pb-4 mb-5 border-b dark:border-slate-800/80 border-slate-200 text-xs font-mono dark:text-slate-400 text-slate-500">
            <span className="flex items-center gap-2 font-bold dark:text-cyan-400 text-cyan-700">
              <Activity className="w-4 h-4 text-cyan-500" />
              VERIFIED ENGINEERING METRICS
            </span>
            <span className="hidden sm:inline">Benchmarked in Open-Source Repositories</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="border-r-0 lg:border-r dark:border-slate-800/80 border-slate-200 lg:pr-4">
              <span className="text-[11px] font-mono dark:text-slate-400 text-slate-500 uppercase tracking-wider block">
                Median Latency
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono dark:text-cyan-300 text-cyan-700 mt-1">
                ~50x Cut
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-600 mt-1 font-mono">
                2000ms → 42ms via dual-tier routing
              </p>
            </div>

            <div className="border-r-0 lg:border-r dark:border-slate-800/80 border-slate-200 lg:pr-4">
              <span className="text-[11px] font-mono dark:text-slate-400 text-slate-500 uppercase tracking-wider block">
                API Cost Avoided
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono dark:text-emerald-300 text-emerald-700 mt-1">
                87% Saved
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-600 mt-1 font-mono">
                Deterministic regex fast-path gates
              </p>
            </div>

            <div className="border-r-0 lg:border-r dark:border-slate-800/80 border-slate-200 lg:pr-4">
              <span className="text-[11px] font-mono dark:text-slate-400 text-slate-500 uppercase tracking-wider block">
                RAGAS Faithfulness
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono dark:text-cyan-300 text-cyan-700 mt-1">
                0.89 Score
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-600 mt-1 font-mono">
                Context Precision benchmarked at 0.80
              </p>
            </div>

            <div>
              <span className="text-[11px] font-mono dark:text-slate-400 text-slate-500 uppercase tracking-wider block">
                Agent Architectures
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono dark:text-violet-300 text-violet-700 mt-1">
                4 Systems
              </div>
              <p className="text-xs dark:text-slate-400 text-slate-600 mt-1 font-mono">
                LangGraph, ChromaDB, FastAPI, Docker
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
