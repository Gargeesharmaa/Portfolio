import React from 'react';
import { personalInfo } from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';
import { 
  GraduationCap, 
  Compass, 
  Workflow, 
  ShieldAlert, 
  TerminalSquare, 
  Users, 
  MapPin, 
  Briefcase, 
  CheckCircle,
  Clock,
  Sparkles,
  Zap
} from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 border-t dark:border-slate-800/80 border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md dark:bg-emerald-500/10 bg-emerald-50 border dark:border-emerald-500/30 border-emerald-300 text-xs font-mono dark:text-emerald-400 text-emerald-700 mb-3 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5" />
            <span>01 / Profile & Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-slate-950 tracking-tight">
            Engineering Production Agent Systems
          </h2>
          <p className="mt-3 dark:text-slate-300 text-slate-600 text-sm sm:text-base leading-relaxed">
            I specialize in turning probabilistic LLMs into reliable, cost-efficient, and auditable production systems.
          </p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <TiltCard3D maxTilt={6}>
              <div className="p-6 sm:p-7 rounded-3xl dark:bg-slate-900/60 bg-white/80 border dark:border-slate-800/90 border-slate-200/90 backdrop-blur-xl shadow-2xl space-y-4">
                <h3 className="text-lg font-bold dark:text-white text-slate-900 flex items-center gap-2">
                  <TerminalSquare className="w-5 h-5 text-cyan-500" />
                  <span>Who I Am</span>
                </h3>
                <p className="text-sm dark:text-slate-200 text-slate-700 leading-relaxed font-sans">
                  I am a 3rd-year <span className="dark:text-white text-slate-950 font-bold">B.Tech Information Technology</span> student at <span className="dark:text-white text-slate-950 font-bold">Engineering College Ajmer</span> (2024–2028). Rather than building toy chatbots or thin API wrappers, I focus on the hard engineering challenges of Generative AI: <span className="dark:text-cyan-300 text-cyan-700 font-semibold">orchestrating state-graphs</span>, <span className="dark:text-emerald-300 text-emerald-700 font-semibold">reducing inference latency</span>, <span className="dark:text-amber-300 text-amber-700 font-semibold">calibrating probabilistic guardrails</span>, and <span className="dark:text-violet-300 text-violet-700 font-semibold">quantifying reliability using evaluation harnesses</span>.
                </p>
                <p className="text-sm dark:text-slate-200 text-slate-700 leading-relaxed font-sans">
                  In my recent projects, I have shipped autonomous self-correcting RAG pipelines using <span className="font-mono text-xs dark:text-cyan-400 text-cyan-700 dark:bg-slate-800/80 bg-slate-100 px-2 py-0.5 rounded-lg border dark:border-slate-700 border-slate-300">LangGraph</span> and architected dual-tier inference backends in <span className="font-mono text-xs dark:text-emerald-400 text-emerald-700 dark:bg-slate-800/80 bg-slate-100 px-2 py-0.5 rounded-lg border dark:border-slate-700 border-slate-300">FastAPI</span> that cut median response latency by ~50x while eliminating cloud API costs for 87% of requests.
                </p>
              </div>
            </TiltCard3D>

            {/* Core Engineering Pillars with 3D Tilt */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TiltCard3D maxTilt={10}>
                <div className="p-5 rounded-2xl dark:bg-slate-900/50 bg-white/70 border dark:border-slate-800/80 border-slate-200 backdrop-blur-xl h-full flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="w-9 h-9 rounded-xl dark:bg-cyan-500/10 bg-cyan-50 border dark:border-cyan-500/30 border-cyan-200 flex items-center justify-center text-cyan-500 mb-3">
                      <Workflow className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold dark:text-white text-slate-900">Deterministic Guardrails</h4>
                    <p className="text-xs dark:text-slate-300 text-slate-600 mt-1.5 leading-relaxed">
                      Regex & heuristic fast-paths bypass expensive LLM calls for unambiguous inputs, slashing latency and cloud bills.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono dark:text-cyan-400 text-cyan-700 mt-3 block">
                    Proven: 42ms vs 2000ms latency
                  </span>
                </div>
              </TiltCard3D>

              <TiltCard3D maxTilt={10}>
                <div className="p-5 rounded-2xl dark:bg-slate-900/50 bg-white/70 border dark:border-slate-800/80 border-slate-200 backdrop-blur-xl h-full flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="w-9 h-9 rounded-xl dark:bg-emerald-500/10 bg-emerald-50 border dark:border-emerald-500/30 border-emerald-200 flex items-center justify-center text-emerald-500 mb-3">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold dark:text-white text-slate-900">Self-Correcting Loops</h4>
                    <p className="text-xs dark:text-slate-300 text-slate-600 mt-1.5 leading-relaxed">
                      LangGraph cyclic graphs evaluate retrieved context chunks; poor chunks autonomously trigger query transformations.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono dark:text-emerald-400 text-emerald-700 mt-3 block">
                    Zero hallucinated answers
                  </span>
                </div>
              </TiltCard3D>
            </div>
          </div>

          {/* Right Column: Education & Leadership */}
          <div className="lg:col-span-5 space-y-6">
            {/* Education Card */}
            <TiltCard3D maxTilt={8}>
              <div className="p-6 rounded-3xl dark:bg-slate-900/60 bg-white/80 border dark:border-slate-800/90 border-slate-200 backdrop-blur-xl shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl dark:bg-cyan-500/10 bg-cyan-50 border dark:border-cyan-500/30 border-cyan-200 flex items-center justify-center text-cyan-500">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold dark:text-white text-slate-900">Education</h4>
                      <span className="text-xs dark:text-slate-400 text-slate-500 font-mono">B.Tech in Information Technology</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono dark:text-cyan-400 text-cyan-700 dark:bg-cyan-950/60 bg-cyan-50 px-2.5 py-1 rounded-lg border dark:border-cyan-800 border-cyan-200">
                    2024 – 2028
                  </span>
                </div>

                <div className="space-y-2 pt-1 border-t dark:border-slate-800 border-slate-200 text-xs">
                  <div className="flex items-center justify-between dark:text-slate-300 text-slate-700">
                    <span className="font-semibold dark:text-white text-slate-900">Engineering College Ajmer</span>
                    <span className="dark:text-slate-400 text-slate-500">Ajmer, Rajasthan</span>
                  </div>
                  <p className="dark:text-slate-400 text-slate-600 leading-relaxed">
                    Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, Software Engineering.
                  </p>
                </div>
              </div>
            </TiltCard3D>

            {/* Leadership Card */}
            <TiltCard3D maxTilt={8}>
              <div className="p-6 rounded-3xl dark:bg-slate-900/60 bg-white/80 border dark:border-slate-800/90 border-slate-200 backdrop-blur-xl shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl dark:bg-emerald-500/10 bg-emerald-50 border dark:border-emerald-500/30 border-emerald-200 flex items-center justify-center text-emerald-500">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold dark:text-white text-slate-900">Leadership & Community</h4>
                      <span className="text-xs dark:text-slate-400 text-slate-500 font-mono">AI/ML Club Joint Secretary</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs dark:text-slate-300 text-slate-600 leading-relaxed border-t dark:border-slate-800 border-slate-200 pt-3">
                  Lead student AI initiatives, organize hands-on technical bootcamps on RAG and Agentic workflows, and mentor junior students on open-source machine learning engineering.
                </p>
              </div>
            </TiltCard3D>

            {/* Internship Readiness Card */}
            <div className="p-5 rounded-3xl dark:bg-gradient-to-br dark:from-cyan-950/40 dark:via-slate-900/80 dark:to-emerald-950/30 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 border dark:border-cyan-500/30 border-cyan-300 backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-2 text-xs font-mono dark:text-cyan-300 text-cyan-800 font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                <span>Internship Availability Notice</span>
              </div>
              <p className="text-xs dark:text-slate-200 text-slate-700 leading-relaxed font-sans">
                Available for full-time / part-time internships starting <strong className="dark:text-white text-slate-950">November 2026</strong>. Flexible for on-site roles, hybrid configurations, or fully remote setups worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
