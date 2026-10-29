import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Menu, X, FileText, Send, Github, Linkedin, Download, Sparkles, Sun, Moon } from 'lucide-react';

export default function Navbar({ onOpenResumeModal, onReplayIntro, theme = 'dark', onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Agent CLI', href: '#terminal' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full dark:bg-[#030712]/90 bg-white/90 backdrop-blur-md dark:border-cyan-500/20 border-slate-200/80 border-b shadow-lg dark:shadow-black/40 shadow-slate-200/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium dark:text-slate-300 text-slate-600 dark:hover:text-white hover:text-slate-950 dark:hover:bg-slate-800/60 hover:bg-slate-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5 ml-auto">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl dark:bg-slate-900/80 bg-slate-100 dark:hover:bg-slate-800 hover:bg-slate-200 dark:text-amber-400 text-slate-700 border dark:border-slate-700/80 border-slate-300 transition-all hover:scale-105"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-700" />
            )}
          </button>

          {/* Replay 3D Intro Button */}
          <button
            onClick={onReplayIntro}
            className="px-3 py-2 rounded-xl dark:bg-slate-900/80 bg-slate-100 dark:hover:bg-slate-800 hover:bg-slate-200 dark:text-slate-300 text-slate-700 dark:hover:text-cyan-400 hover:text-cyan-700 border dark:border-slate-700/80 border-slate-300 transition-colors text-xs font-mono flex items-center gap-1.5"
            title="Replay 3D Startup Animation"
          >
            <Sparkles className="w-3.5 h-3.5 dark:text-cyan-400 text-cyan-600" />
            <span>3D Intro</span>
          </button>

          {/* Download Official Resume PDF */}
          <a
            href="/resume.pdf"
            download="Gargee_Sharma_Resume.pdf"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-cyan-950/40 transition-all hover:scale-105"
            title="Download Verified Resume PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume</span>
          </a>

          {/* View PDF Online */}
          <button
            onClick={onOpenResumeModal}
            className="px-3 py-2 rounded-xl dark:bg-slate-900/80 bg-slate-100 dark:hover:bg-slate-800 hover:bg-slate-200 dark:text-slate-300 text-slate-700 dark:hover:text-white hover:text-slate-950 border dark:border-slate-700/80 border-slate-300 transition-colors text-xs font-mono flex items-center gap-1.5"
            title="Preview Real Resume PDF"
          >
            <FileText className="w-3.5 h-3.5 dark:text-cyan-400 text-cyan-600" />
            <span>Preview</span>
          </button>

          <a
            href={personalInfo.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl dark:bg-slate-900/80 bg-slate-100 dark:hover:bg-slate-800 hover:bg-slate-200 dark:text-slate-300 text-slate-700 dark:hover:text-white hover:text-slate-950 border dark:border-slate-800 border-slate-300 transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl dark:bg-slate-900/80 bg-slate-100 dark:hover:bg-slate-800 hover:bg-slate-200 dark:text-slate-300 text-slate-700 dark:hover:text-white hover:text-slate-950 border dark:border-slate-800 border-slate-300 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-700" />
              )}
            </button>
            <a
              href="/resume.pdf"
              download="Gargee_Sharma_Resume.pdf"
              className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-mono font-bold flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl dark:bg-slate-900 bg-slate-100 dark:text-slate-300 text-slate-700 border dark:border-slate-800 border-slate-300"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b dark:border-slate-800 border-slate-200 dark:bg-[#060a16] bg-white px-4 pt-3 pb-5 space-y-2 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-medium dark:text-slate-300 text-slate-700 dark:hover:text-white hover:text-slate-950 dark:hover:bg-slate-800/80 hover:bg-slate-100"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t dark:border-slate-800/80 border-slate-200 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="w-full py-2.5 rounded-xl dark:bg-slate-900 bg-slate-100 dark:text-cyan-300 text-cyan-700 text-xs font-mono font-bold flex items-center justify-center gap-2 border dark:border-slate-700/80 border-slate-300"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" /> Replay 3D Intro
            </button>
            <a
              href="/resume.pdf"
              download="Gargee_Sharma_Resume.pdf"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <Download className="w-4 h-4" /> Download Official Resume PDF
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
