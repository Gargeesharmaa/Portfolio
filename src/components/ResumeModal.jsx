import React from 'react';
import { X, Download, ExternalLink, Printer, FileText, CheckCircle2 } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-5"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl dark:bg-slate-950 bg-white border dark:border-cyan-500/40 border-slate-300 rounded-3xl shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar with Download Resume Button */}
        <div className="px-5 py-4 dark:bg-slate-900/95 bg-slate-50 border-b dark:border-slate-800 border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-mono dark:text-white text-slate-900 font-bold tracking-wide">
              GARGEE SHARMA — OFFICIAL RESUME
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded dark:bg-emerald-500/10 bg-emerald-50 dark:text-emerald-400 text-emerald-700 border dark:border-emerald-500/30 border-emerald-300">
              Verified PDF Document
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Primary Direct Download Button */}
            <a
              href="/resume.pdf"
              download="Gargee_Sharma_Resume.pdf"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md shadow-cyan-950/40 hover:-translate-y-0.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>

            {/* Open Original PDF in New Tab */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300 dark:text-slate-300 text-slate-700 dark:hover:text-white hover:text-slate-950 border dark:border-slate-700 border-slate-300 transition-colors"
              title="Open PDF in New Tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300 dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-950 border dark:border-slate-700 border-slate-300 transition-colors"
              aria-label="Close Resume"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Real PDF Embedded Viewer */}
        <div className="flex-1 w-full dark:bg-slate-900 bg-slate-100 p-2 sm:p-4 overflow-hidden flex flex-col items-center">
          <iframe
            src="/resume.pdf#toolbar=1&navpanes=0&scrollbar=1&view=FitH"
            title="Gargee Sharma Official Resume PDF"
            className="w-full h-[76vh] rounded-2xl border dark:border-slate-800 border-slate-300 shadow-inner bg-white"
          />
        </div>

        {/* Bottom Bar */}
        <div className="px-5 py-3 dark:bg-slate-950 bg-slate-50 border-t dark:border-slate-800/80 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono dark:text-slate-400 text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Actual Official PDF • Updated October 2026</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              download="Gargee_Sharma_Resume.pdf"
              className="dark:text-cyan-400 text-cyan-700 hover:underline flex items-center gap-1 font-semibold"
            >
              <Download className="w-3 h-3" /> Click here to save PDF locally
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
