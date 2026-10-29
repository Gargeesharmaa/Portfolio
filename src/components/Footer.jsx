import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { Github, Linkedin, Mail, ArrowUp, Terminal, Download, Sparkles } from 'lucide-react';

export default function Footer({ onOpenResumeModal, onReplayIntro, theme = 'dark' }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t dark:border-slate-800/80 border-slate-200 dark:bg-[#030712]/95 bg-white/95 backdrop-blur-md py-12 relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Status */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <span className="font-bold dark:text-white text-slate-900 text-sm">
              {personalInfo.name}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-mono dark:text-cyan-400 text-cyan-700 font-semibold">
              Agentic AI Engineer Intern
            </span>
          </div>
          <p className="text-xs dark:text-slate-500 text-slate-500 font-mono">
            B.Tech IT • Engineering College Ajmer • Available Nov 2026
          </p>
        </div>

        {/* Center: Quick Links & Download Action */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono dark:text-slate-400 text-slate-600">
          <a
            href="/resume.pdf"
            download="Gargee_Sharma_Resume.pdf"
            className="dark:text-cyan-400 text-cyan-700 hover:underline font-bold flex items-center gap-1 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Download Real PDF
          </a>
          <span>•</span>
          <button 
            onClick={onOpenResumeModal}
            className="dark:hover:text-emerald-400 hover:text-emerald-600 transition-colors"
          >
            Preview PDF
          </button>
          <span>•</span>
          <a href="#projects" className="dark:hover:text-emerald-400 hover:text-emerald-600 transition-colors">
            Projects
          </a>
          <span>•</span>
          <button 
            onClick={onReplayIntro}
            className="dark:hover:text-cyan-400 hover:text-cyan-600 transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-cyan-500" /> 3D Intro
          </button>
        </div>

        {/* Right: Social & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href={personalInfo.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl dark:bg-slate-900/80 bg-slate-100 dark:hover:bg-slate-800 hover:bg-slate-200 dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-950 border dark:border-slate-800 border-slate-300 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl dark:bg-slate-900/80 bg-slate-100 dark:hover:bg-slate-800 hover:bg-slate-200 dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-950 border dark:border-slate-800 border-slate-300 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${personalInfo.contact.email}`}
            className="p-2 rounded-xl dark:bg-slate-900/80 bg-slate-100 dark:hover:bg-slate-800 hover:bg-slate-200 dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-950 border dark:border-slate-800 border-slate-300 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300 dark:text-slate-300 text-slate-700 dark:hover:text-white hover:text-slate-950 border dark:border-slate-700 border-slate-300 transition-colors ml-2"
            title="Back to Top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
