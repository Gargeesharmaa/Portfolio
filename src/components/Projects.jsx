import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';
import AgenticStateGraph3D from './AgenticStateGraph3D';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Layers, 
  Activity, 
  CheckCircle2, 
  BarChart3, 
  GitBranch, 
  Sparkles, 
  Globe,
  Radio,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  ArrowRight
} from 'lucide-react';

export default function Projects({ theme = 'dark' }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [activeProjectTab, setActiveProjectTab] = useState({
    'agentic-rag': 'overview',
    'laya-triage': 'overview',
    'gargeemind': 'overview',
    'ai-refund-agent-eval': 'overview',
    'kidney-disease-mlops': 'overview'
  });

  const toggleExpand = (projectId) => {
    setExpandedProjectId((prev) => (prev === projectId ? null : projectId));
  };

  const setTab = (projectId, tab) => {
    setActiveProjectTab((prev) => ({ ...prev, [projectId]: tab }));
  };

  const categories = ['All', 'Agentic AI', 'Multi-Agent Systems', 'LLM Testing & Reliability', 'MLOps & Deep Learning'];

  const filteredProjects = selectedFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedFilter || p.category.includes(selectedFilter));

  return (
    <section id="projects" className="py-16 md:py-24 border-t dark:border-slate-800/80 border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md dark:bg-cyan-500/10 bg-cyan-50 border dark:border-cyan-500/30 border-cyan-300 text-xs font-mono dark:text-cyan-400 text-cyan-700 mb-3 backdrop-blur-md">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>02 / Production Repositories & Agent Systems</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-slate-950 tracking-tight">
              Curated Open-Source Codebases
            </h2>
            <p className="mt-3 dark:text-slate-300 text-slate-600 text-sm sm:text-base leading-relaxed">
              Click any project card to expand its complete architecture flow, quantified RAGAS benchmarks, and self-correcting state graph.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl dark:bg-slate-900/90 bg-white border dark:border-slate-800 border-slate-300 self-start md:self-auto backdrop-blur-md shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedFilter(cat);
                  if (expandedProjectId) {
                    const match = projectsData.find(p => p.id === expandedProjectId);
                    if (match && cat !== 'All' && match.category !== cat && !match.category.includes(cat)) {
                      setExpandedProjectId(null);
                    }
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  selectedFilter === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-md'
                    : 'dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-950'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Layout: Grid of Cards that Expand into Full View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {filteredProjects.map((project) => {
            const isExpanded = expandedProjectId === project.id;
            const currentTab = activeProjectTab[project.id] || 'overview';

            // IF EXPANDED: Show the full detailed view spanning both columns
            if (isExpanded) {
              return (
                <div 
                  key={project.id} 
                  id={`project-${project.id}`}
                  className="col-span-full rounded-3xl dark:bg-[#090d18]/95 bg-white/95 backdrop-blur-2xl border-2 dark:border-cyan-500/60 border-cyan-500/60 overflow-hidden shadow-2xl transition-all duration-300 ring-4 ring-cyan-500/10"
                >
                  {/* Top Control Bar with Collapse Button */}
                  <div className="px-6 sm:px-8 pt-8 pb-5 border-b dark:border-slate-800/80 border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4 dark:bg-slate-950/80 bg-slate-50/90">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-2">
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full dark:bg-cyan-500/10 bg-cyan-50 dark:text-cyan-400 text-cyan-700 border dark:border-cyan-500/30 border-cyan-300 font-bold">
                          {project.statusBadge}
                        </span>
                        <span className="text-xs font-mono dark:text-slate-400 text-slate-500">
                          {project.category}
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                          Expanded View
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black dark:text-white text-slate-950 tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm dark:text-cyan-400 text-cyan-700 font-mono mt-1 font-semibold">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Actions, Tab Switcher & Collapse Button */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* View Switcher */}
                      <div className="flex items-center p-1 rounded-2xl dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-300 shadow-inner">
                        <button
                          onClick={() => setTab(project.id, 'overview')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                            currentTab === 'overview'
                              ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-md'
                              : 'dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-950'
                          }`}
                        >
                          Overview
                        </button>
                        <button
                          onClick={() => setTab(project.id, 'architecture')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                            currentTab === 'architecture'
                              ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-md'
                              : 'dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-950'
                          }`}
                        >
                          3D State Flow
                        </button>
                        <button
                          onClick={() => setTab(project.id, 'eval')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                            currentTab === 'eval'
                              ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-md'
                              : 'dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-950'
                          }`}
                        >
                          Benchmarks
                        </button>
                      </div>

                      {/* Live Demo Link */}
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Live App</span>
                        </a>
                      )}

                      {/* GitHub Link */}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-2xl dark:bg-slate-800/80 bg-white dark:hover:bg-slate-700 hover:bg-slate-100 dark:text-white text-slate-800 text-xs font-mono font-medium flex items-center gap-2 border dark:border-slate-700 border-slate-300 transition-all shadow-sm"
                      >
                        <Github className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        <span>Codebase</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>

                      {/* Minimize / Collapse Button */}
                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="px-3.5 py-2 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
                        title="Collapse this project back to card"
                        aria-label="Collapse project details"
                      >
                        <ChevronUp className="w-4 h-4" />
                        <span>Collapse</span>
                      </button>
                    </div>
                  </div>

                  {/* Tab Content Body */}
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* OVERVIEW TAB */}
                    {currentTab === 'overview' && (
                      <div className="space-y-6">
                        {/* Problem & Purpose */}
                        <div className="p-5 rounded-2xl dark:bg-slate-900/40 bg-slate-50 border dark:border-slate-800/80 border-slate-200">
                          <h4 className="text-xs font-mono uppercase tracking-wider dark:text-cyan-400 text-cyan-700 mb-2 flex items-center gap-2 font-bold">
                            <Activity className="w-4 h-4 text-cyan-500" />
                            System Purpose & Problem Addressed
                          </h4>
                          <p className="text-sm sm:text-base dark:text-slate-200 text-slate-700 leading-relaxed font-sans">
                            {project.purpose}
                          </p>
                        </div>

                        {/* Quantified Metrics Highlight */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {project.evalMetrics.map((m) => (
                            <div
                              key={m.label}
                              className="p-4 rounded-2xl dark:bg-slate-900/60 bg-slate-50 border dark:border-slate-800/80 border-slate-200 shadow-sm"
                            >
                              <span className="text-[11px] font-mono dark:text-slate-400 text-slate-500 block truncate">
                                {m.label}
                              </span>
                              <span className="text-xl sm:text-2xl font-black font-mono dark:text-cyan-400 text-cyan-700 block mt-0.5">
                                {m.score}
                              </span>
                              <span className="text-[10px] dark:text-slate-500 text-slate-500 block mt-1 line-clamp-1">
                                {m.desc}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Key Implementations Bullets */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-mono uppercase tracking-wider dark:text-slate-400 text-slate-600 flex items-center gap-2 font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            Key Implementations & Contributions
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {project.contributions.map((bullet, bIdx) => (
                              <div
                                key={bIdx}
                                className="p-4 rounded-2xl dark:bg-slate-900/30 bg-slate-50 border dark:border-slate-800/70 border-slate-200 flex items-start gap-3"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                                <p className="text-xs dark:text-slate-300 text-slate-700 leading-relaxed font-sans">
                                  {bullet}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ARCHITECTURE TAB */}
                    {currentTab === 'architecture' && (
                      <div className="space-y-6">
                        {project.id === 'agentic-rag' ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between text-xs font-mono dark:text-slate-400 text-slate-600 dark:bg-slate-900/60 bg-slate-50 p-3 rounded-xl border dark:border-slate-800 border-slate-200">
                              <span className="flex items-center gap-2 dark:text-cyan-400 text-cyan-700 font-bold">
                                <Sparkles className="w-3.5 h-3.5 text-cyan-500" /> Interactive 3D LangGraph State Machine
                              </span>
                              <span>Click & drag to rotate • Simulate CRAG cycle</span>
                            </div>
                            <AgenticStateGraph3D theme={theme} />
                          </div>
                        ) : (
                          <div className="space-y-5">
                            <div className="p-4 rounded-xl dark:bg-slate-900/50 bg-slate-50 border dark:border-slate-800 border-slate-200 text-xs dark:text-slate-300 text-slate-700 font-mono">
                              <span className="dark:text-emerald-400 text-emerald-700 font-bold">STATE FLOW NODES:</span> Modular decoupled workflow stages.
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {project.architectureNodes.map((node, nIdx) => (
                                <div
                                  key={node.id}
                                  className="p-4 rounded-2xl dark:bg-slate-900/70 bg-slate-50 border dark:border-slate-800 border-slate-200 flex flex-col justify-between shadow-sm"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-mono dark:text-slate-500 text-slate-400">
                                      NODE 0{nIdx + 1}
                                    </span>
                                    <span
                                      className="w-2.5 h-2.5 rounded-full"
                                      style={{ backgroundColor: node.color }}
                                    />
                                  </div>
                                  <span className="text-sm font-bold dark:text-white text-slate-900 block">
                                    {node.name}
                                  </span>
                                  <span className="text-xs font-mono dark:text-cyan-400 text-cyan-700 mt-1 block">
                                    {node.role}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* BENCHMARKS / EVAL TAB */}
                    {currentTab === 'eval' && (
                      <div className="space-y-5">
                        <div className="p-4 rounded-xl dark:bg-slate-900/50 bg-slate-50 border dark:border-slate-800 border-slate-200 text-xs dark:text-slate-300 text-slate-700 font-mono">
                          <span className="dark:text-cyan-400 text-cyan-700 font-bold">BENCHMARK METRICS:</span> Quantified performance, accuracy, and latency metrics.
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {project.evalMetrics.map((m) => (
                            <div
                              key={m.label}
                              className="p-5 rounded-2xl dark:bg-slate-900/60 bg-slate-50 border dark:border-slate-800 border-slate-200 space-y-2 shadow-sm"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-bold dark:text-white text-slate-900">
                                  {m.label}
                                </span>
                                <span className="text-lg font-black font-mono dark:text-cyan-400 text-cyan-700">
                                  {m.score}
                                </span>
                              </div>
                              <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed font-sans">
                                {m.desc}
                              </p>
                              <div className="w-full h-2 rounded-full dark:bg-slate-800 bg-slate-200 overflow-hidden mt-2">
                                <div
                                  className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-teal-400 rounded-full"
                                  style={{ width: `${m.value || 85}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Stack Pills & Bottom Collapse Button */}
                    <div className="pt-4 border-t dark:border-slate-800/80 border-slate-200 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono dark:text-slate-500 text-slate-500 mr-2">Stack:</span>
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono px-2.5 py-1 rounded-xl dark:bg-slate-800/70 bg-slate-100 dark:text-slate-300 text-slate-700 border dark:border-slate-700/60 border-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="text-xs font-mono font-bold dark:text-cyan-400 text-cyan-700 hover:underline flex items-center gap-1 ml-auto"
                      >
                        <ChevronUp className="w-4 h-4" /> Minimize Project
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // IF COLLAPSED: Show the sleek, clickable summary Card with 3D Tilt
            return (
              <TiltCard3D key={project.id} maxTilt={8}>
                <div 
                  onClick={() => toggleExpand(project.id)}
                  className="group cursor-pointer rounded-3xl dark:bg-[#090d18]/90 bg-white/90 backdrop-blur-xl border dark:border-slate-800/90 border-slate-200/90 p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 dark:hover:border-cyan-500/50 hover:border-cyan-500/50 h-full flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Subtle top glow highlight on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-500" />

                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full dark:bg-cyan-500/10 bg-cyan-50 dark:text-cyan-400 text-cyan-700 border dark:border-cyan-500/30 border-cyan-300 font-bold">
                        {project.statusBadge}
                      </span>
                      <span className="text-[11px] font-mono dark:text-slate-500 text-slate-500">
                        {project.category}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-xl sm:text-2xl font-black dark:text-white text-slate-950 tracking-tight group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono dark:text-slate-400 text-slate-600 mt-1 line-clamp-2">
                      {project.subtitle}
                    </p>

                    {/* Impact Metrics Highlight Strip */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t dark:border-slate-800/80 border-slate-200/80">
                      <div className="p-2.5 rounded-xl dark:bg-slate-950/60 bg-slate-50 border dark:border-slate-800 border-slate-200">
                        <span className="text-[10px] font-mono dark:text-slate-500 text-slate-500 block uppercase">Primary Impact</span>
                        <span className="text-xs font-mono font-bold dark:text-cyan-300 text-cyan-700 block mt-0.5 truncate">
                          {project.impactMetric}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl dark:bg-slate-950/60 bg-slate-50 border dark:border-slate-800 border-slate-200">
                        <span className="text-[10px] font-mono dark:text-slate-500 text-slate-500 block uppercase">Architecture</span>
                        <span className="text-xs font-mono font-bold dark:text-emerald-300 text-emerald-700 block mt-0.5 truncate">
                          {project.secondaryMetric || 'Production Grade'}
                        </span>
                      </div>
                    </div>

                    {/* Purpose Teaser */}
                    <p className="text-xs dark:text-slate-300 text-slate-600 mt-4 leading-relaxed font-sans line-clamp-3">
                      {project.purpose}
                    </p>
                  </div>

                  {/* Card Bottom: Tech Pills & Expand CTA */}
                  <div className="mt-6 pt-4 border-t dark:border-slate-800/80 border-slate-200 flex flex-col gap-3.5">
                    {/* Technology tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-lg dark:bg-slate-800/70 bg-slate-100 dark:text-slate-300 text-slate-700 border dark:border-slate-700/60 border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-500">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {project.liveDemo && (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono transition-colors shadow-sm flex items-center gap-1"
                            title="Live App"
                          >
                            <Globe className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl dark:bg-slate-800 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-300 text-slate-700 border dark:border-slate-700 border-slate-300 transition-colors shadow-sm"
                          title="View Codebase on GitHub"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {/* Expand Button */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 text-xs font-mono font-bold shadow-md group-hover:scale-105 transition-transform">
                        <span>Click to Expand</span>
                        <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}
