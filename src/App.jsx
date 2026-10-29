import React, { useState, useEffect } from 'react';
import NeuralNetworkBackground3D from './components/NeuralNetworkBackground3D';
import IntroSequence3D from './components/IntroSequence3D';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AgentTerminalInspector from './components/AgentTerminalInspector';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import { Terminal, Sparkles } from 'lucide-react';

export default function App() {
  // Theme state: dark (default) or light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });

  // Whenever the website is reloaded, first show the 3D infrastructure boot sequence
  const [showIntro, setShowIntro] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Sync theme with HTML root class & localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="relative min-h-screen dark:bg-[#030712]/85 bg-slate-50/85 dark:text-slate-100 text-slate-900 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden transition-colors duration-300">
      {/* 3D Infrastructure Boot Sequence (Plays on reload/open or replay) */}
      {showIntro && (
        <IntroSequence3D onComplete={() => setShowIntro(false)} />
      )}

      {/* Luminous Full-Window 3D Neural Network Background (Theme Adaptive) */}
      <NeuralNetworkBackground3D theme={theme} />

      {/* Top Navigation with Theme Switcher */}
      <Navbar 
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenResumeModal={() => setIsResumeOpen(true)} 
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* Main Spatial Content Sections */}
      <main className="relative z-10 flex-1">
        {/* Hero Section */}
        <Hero 
          theme={theme}
          onOpenResumeModal={() => setIsResumeOpen(true)} 
        />

        {/* Interactive Agent Terminal & Live Benchmark Simulator */}
        <section id="terminal" className="py-12 md:py-16 border-t dark:border-slate-800/80 border-slate-200 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md dark:bg-cyan-500/10 bg-cyan-50 border dark:border-cyan-500/30 border-cyan-300 text-xs font-mono dark:text-cyan-400 text-cyan-700 mb-2 backdrop-blur-md">
                <Terminal className="w-3.5 h-3.5" />
                <span>Spatial Terminal Interface</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold dark:text-white text-slate-950 tracking-tight">
                Live Agent CLI & Inspector
              </h2>
              <p className="mt-1 dark:text-slate-300 text-slate-600 text-xs sm:text-sm">
                Execute live simulated RAGAS evaluations, latency waterfall comparisons, or query candidate credentials.
              </p>
            </div>

            <AgentTerminalInspector theme={theme} />
          </div>
        </section>

        {/* About & Narrative Profile */}
        <About theme={theme} />

        {/* 3D Competency Matrix & Skills Globe */}
        <Skills theme={theme} />

        {/* Featured Open-Source Repositories with 3D State Graphs */}
        <Projects theme={theme} />

        {/* Communication & Contact Station */}
        <Contact theme={theme} />
      </main>

      {/* Footer */}
      <Footer 
        theme={theme}
        onOpenResumeModal={() => setIsResumeOpen(true)} 
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* Real Candidate PDF Resume Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
    </div>
  );
}
