import React, { useState } from 'react';
import { skillsData, projectsData } from '../data/portfolioData';
import SkillsSphere3D from './SkillsSphere3D';
import TiltCard3D from './TiltCard3D';
import { 
  Cpu, 
  Layers, 
  Database, 
  Wrench, 
  CheckCircle2, 
  Terminal, 
  Sparkles, 
  Code2, 
  Workflow, 
  Boxes, 
  ShieldCheck, 
  GitBranch, 
  Zap, 
  Grid, 
  Globe,
  Radio,
  ArrowRight
} from 'lucide-react';

export default function Skills({ theme = 'dark' }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeView, setActiveView] = useState('matrix'); // 'matrix' or 'sphere'
  const [hoveredSkill, setHoveredSkill] = useState({
    name: 'LangGraph',
    category: 'Agentic AI & Orchestration',
    tag: 'State Machine',
    level: 'Core',
    project: 'Agentic-RAG Platform',
    role: 'Cyclic state graph orchestration, autonomous query transformations, and Postgres checkpointing.'
  });

  const categoryMeta = {
    'Agentic AI & Orchestration': {
      icon: Cpu,
      gradient: 'from-cyan-500/20 to-teal-500/10',
      borderAccent: 'dark:border-cyan-500/40 border-cyan-500/30',
      accentColor: 'text-cyan-500 dark:text-cyan-400',
      dotColor: 'bg-cyan-400',
      badge: 'Autonomous Agents',
      associatedRepo: 'Agentic-RAG Platform'
    },
    'Generative AI & LLMs': {
      icon: Layers,
      gradient: 'from-emerald-500/20 to-teal-500/10',
      borderAccent: 'dark:border-emerald-500/40 border-emerald-500/30',
      accentColor: 'text-emerald-500 dark:text-emerald-400',
      dotColor: 'bg-emerald-400',
      badge: 'RAG & Evaluation',
      associatedRepo: 'AI-Refund-Agent-Evaluation-System'
    },
    'Backend & Systems': {
      icon: Database,
      gradient: 'from-violet-500/20 to-purple-500/10',
      borderAccent: 'dark:border-violet-500/40 border-violet-500/30',
      accentColor: 'text-violet-500 dark:text-violet-400',
      dotColor: 'bg-violet-400',
      badge: 'High-Throughput APIs',
      associatedRepo: 'Laya Triage'
    },
    'DevOps & Infrastructure': {
      icon: Wrench,
      gradient: 'from-amber-500/20 to-orange-500/10',
      borderAccent: 'dark:border-amber-500/40 border-amber-500/30',
      accentColor: 'text-amber-500 dark:text-amber-400',
      dotColor: 'bg-amber-400',
      badge: 'Containers & MLOps',
      associatedRepo: 'Kidney-Disease-Classification-dlops'
    }
  };

  const filteredCategories = selectedCategory === 'All' 
    ? skillsData 
    : skillsData.filter(c => c.category === selectedCategory);

  return (
    <section id="skills" className="py-16 md:py-24 border-t dark:border-slate-800/80 border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading & Interactive Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md dark:bg-cyan-500/10 bg-cyan-50 border dark:border-cyan-500/30 border-cyan-300 text-xs font-mono dark:text-cyan-400 text-cyan-700 mb-3 backdrop-blur-md">
              <Boxes className="w-3.5 h-3.5" />
              <span>03 / Technical Competency Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-slate-950 tracking-tight">
              Production AI & Engineering Stack
            </h2>
            <p className="mt-3 dark:text-slate-300 text-slate-600 text-sm sm:text-base leading-relaxed">
              Every tool and architecture has been deployed in production codebases, benchmarked with real metrics, and tested in Dockerized environments.
            </p>
          </div>

          {/* View Mode & Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Switcher: Interactive Matrix vs 3D Sphere */}
            <div className="flex items-center p-1 rounded-2xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-300 shadow-sm">
              <button
                onClick={() => setActiveView('matrix')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                  activeView === 'matrix'
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-md'
                    : 'dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-950'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Skill Matrix</span>
              </button>
              <button
                onClick={() => setActiveView('sphere')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                  activeView === 'sphere'
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-md'
                    : 'dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-950'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>3D Sphere</span>
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-300 shadow-sm">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-md'
                    : 'dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-950'
                }`}
              >
                All
              </button>
              {skillsData.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => setSelectedCategory(cat.category)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    selectedCategory === cat.category
                      ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-md'
                      : 'dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-950'
                  }`}
                >
                  {cat.category.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Sphere View (When Toggled) */}
        {activeView === 'sphere' && (
          <div className="transition-all duration-500 animate-fadeIn">
            <SkillsSphere3D theme={theme} />
          </div>
        )}

        {/* Modern Interactive Bento Skill Matrix View (Default) */}
        {activeView === 'matrix' && (
          <div className="space-y-8">
            {/* Live Interactive Skill Spotlight Banner */}
            {hoveredSkill && (
              <div className="p-4 sm:p-5 rounded-2xl dark:bg-slate-900/90 bg-white border dark:border-cyan-500/40 border-cyan-500/30 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border dark:border-cyan-500/40 border-cyan-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-black dark:text-white text-slate-900">
                        {hoveredSkill.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full dark:bg-cyan-500/20 bg-cyan-100 dark:text-cyan-300 text-cyan-800 font-bold">
                        #{hoveredSkill.tag}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full dark:bg-emerald-500/20 bg-emerald-100 dark:text-emerald-400 text-emerald-800">
                        {hoveredSkill.level}
                      </span>
                    </div>
                    <span className="text-xs font-mono dark:text-slate-400 text-slate-600 block mt-0.5">
                      Domain: {hoveredSkill.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l dark:border-slate-800 border-slate-200 pt-3 sm:pt-0 sm:pl-4">
                  <div>
                    <span className="text-[10px] font-mono dark:text-slate-400 text-slate-500 block uppercase">
                      Applied In Production
                    </span>
                    <span className="text-xs font-mono font-bold dark:text-emerald-400 text-emerald-700 flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {hoveredSkill.project || 'Agentic AI Repositories'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 4 Category Bento Cards with Solid Elegant Tech Styling */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCategories.map((catGroup) => {
                const meta = categoryMeta[catGroup.category] || {
                  icon: Layers,
                  borderAccent: 'dark:border-slate-800 border-slate-200',
                  accentColor: 'text-cyan-400',
                  dotColor: 'bg-cyan-400',
                  associatedRepo: 'Production Stack'
                };
                const Icon = meta.icon;

                return (
                  <TiltCard3D key={catGroup.category} maxTilt={4}>
                    <div className="rounded-3xl dark:bg-[#090d18]/90 bg-white/95 backdrop-blur-xl border dark:border-slate-800 border-slate-200 p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 dark:hover:border-cyan-500/40 hover:border-cyan-500/40 flex flex-col justify-between h-full group">
                      <div>
                        {/* Category Header */}
                        <div className="flex items-start justify-between gap-4 pb-5 border-b dark:border-slate-800/80 border-slate-200">
                          <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 rounded-2xl dark:bg-slate-900 bg-slate-100 border dark:border-slate-700 border-slate-200 flex items-center justify-center text-cyan-500 shadow-inner group-hover:scale-105 transition-transform">
                              <Icon className="w-5 h-5 text-cyan-500" />
                            </div>
                            <div>
                              <h3 className="text-lg sm:text-xl font-black dark:text-white text-slate-900 tracking-tight">
                                {catGroup.category}
                              </h3>
                              <p className="text-xs dark:text-slate-400 text-slate-500 mt-0.5 font-sans">
                                {catGroup.description}
                              </p>
                            </div>
                          </div>

                          <span className="text-[11px] font-mono px-2.5 py-1 rounded-xl dark:bg-slate-900 bg-slate-100 dark:text-slate-300 text-slate-700 border dark:border-slate-800 border-slate-200 shrink-0">
                            {catGroup.skills.length} Skills
                          </span>
                        </div>

                        {/* Modern Responsive Skill Chips */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
                          {catGroup.skills.map((skill) => {
                            const isSelected = hoveredSkill?.name === skill.name;
                            const isCore = skill.level === 'Core';

                            return (
                              <div
                                key={skill.name}
                                onMouseEnter={() =>
                                  setHoveredSkill({
                                    name: skill.name,
                                    category: catGroup.category,
                                    tag: skill.tag,
                                    level: skill.level,
                                    project: meta.associatedRepo,
                                    role: skill.description || `Production component in ${catGroup.category}`
                                  })
                                }
                                onClick={() =>
                                  setHoveredSkill({
                                    name: skill.name,
                                    category: catGroup.category,
                                    tag: skill.tag,
                                    level: skill.level,
                                    project: meta.associatedRepo,
                                    role: skill.description || `Production component in ${catGroup.category}`
                                  })
                                }
                                className={`cursor-pointer p-3 rounded-2xl transition-all duration-200 border flex flex-col justify-between gap-2 shadow-sm ${
                                  isSelected
                                    ? 'dark:bg-slate-900 bg-cyan-50/70 dark:border-cyan-400 border-cyan-500 shadow-md ring-2 ring-cyan-500/20 scale-[1.02]'
                                    : 'dark:bg-slate-950/70 bg-slate-50/90 dark:border-slate-800/80 border-slate-200/90 dark:hover:bg-slate-900 hover:bg-slate-100 hover:border-cyan-500/40 hover:scale-[1.01]'
                                }`}
                              >
                                {/* Chip Header: Dot + Skill Name + Level Badge */}
                                <div className="flex items-center justify-between gap-1.5">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span
                                      className={`w-2 h-2 rounded-full shrink-0 ${
                                        isCore ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-400'
                                      }`}
                                    />
                                    <span className="text-xs font-bold font-mono dark:text-slate-100 text-slate-900 truncate">
                                      {skill.name}
                                    </span>
                                  </div>

                                  <span
                                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${
                                      isCore
                                        ? 'dark:bg-cyan-500/20 bg-cyan-100 dark:text-cyan-300 text-cyan-800'
                                        : 'dark:bg-emerald-500/20 bg-emerald-100 dark:text-emerald-400 text-emerald-800'
                                    }`}
                                  >
                                    {skill.level}
                                  </span>
                                </div>

                                {/* Chip Footer: Architectural Tag */}
                                <div className="flex items-center justify-between pt-1 border-t dark:border-slate-800/60 border-slate-200/60">
                                  <span className="text-[10px] font-mono dark:text-slate-400 text-slate-500">
                                    #{skill.tag}
                                  </span>
                                  <span className="text-[10px] font-mono dark:text-cyan-400 text-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                                    inspect <ArrowRight className="w-2.5 h-2.5" />
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Category Bottom Sub-footer */}
                      <div className="mt-5 pt-3.5 border-t dark:border-slate-800/80 border-slate-200 flex items-center justify-between text-[11px] font-mono dark:text-slate-500 text-slate-500">
                        <span>Verified in Repository:</span>
                        <span className="dark:text-cyan-400 text-cyan-700 font-semibold truncate ml-2">
                          {meta.associatedRepo}
                        </span>
                      </div>
                    </div>
                  </TiltCard3D>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
