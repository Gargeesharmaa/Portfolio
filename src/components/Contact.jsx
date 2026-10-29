import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Copy, 
  Check, 
  Send, 
  ArrowUpRight,
  Radio,
  User,
  AtSign,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  RotateCw,
  Sparkles
} from 'lucide-react';

export default function Contact({ theme = 'dark' }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form Fields
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('GenAI / Agentic AI Internship Opportunity');
  const [message, setMessage] = useState(
    `Hi Gargee,\n\nWe came across your Agentic AI portfolio and self-correcting LangGraph projects. We would love to discuss an internship opportunity with our engineering team.\n\nBest regards,\n[Your Name / Company]`
  );

  // Status: 'idle' | 'sending' | 'success' | 'error'
  const [status, setStatus] = useState('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  // Build formatted email body including sender details
  const formattedBody = `From: ${senderName || 'Anonymous'}\nSender Email: ${senderEmail || 'Not provided'}\n\nMessage:\n${message}`;

  // Direct 1-Click Gmail Web Compose URL (100% reliable, zero server downtime)
  const gmailWebComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    personalInfo.contact.email
  )}&su=${encodeURIComponent(`[Portfolio Contact] ${subject || 'Internship Inquiry'}`)}&body=${encodeURIComponent(
    formattedBody
  )}`;

  // Native mailto link for Outlook / Apple Mail / Thunderbird
  const mailtoLink = `mailto:${personalInfo.contact.email}?subject=${encodeURIComponent(
    `[Portfolio Contact] ${subject || 'Internship Inquiry'}`
  )}&body=${encodeURIComponent(formattedBody)}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!senderEmail || !senderEmail.includes('@')) {
      setStatus('error');
      setStatusMsg('Please provide a valid email address so Gargee can reply back.');
      return;
    }

    if (!message.trim()) {
      setStatus('error');
      setStatusMsg('Please enter a message before sending.');
      return;
    }

    const accessKey = personalInfo.contact.web3FormsAccessKey || import.meta.env.VITE_WEB3FORMS_KEY;

    // IF WEB3FORMS ACCESS KEY IS CONFIGURED: Send via Web3Forms API
    if (accessKey && accessKey.trim() !== '') {
      setStatus('sending');
      setStatusMsg('');

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: accessKey.trim(),
            name: senderName.trim() || 'Recruiter / Hiring Team',
            email: senderEmail.trim(),
            subject: `[Portfolio Contact] ${subject.trim()}`,
            message: message.trim(),
            from_name: 'Gargee Sharma Portfolio'
          })
        });

        const data = await response.json();
        if (data.success) {
          setStatus('success');
          setStatusMsg(`Message dispatched directly to ${personalInfo.contact.email}!`);
          return;
        } else {
          // If key was invalid, fall back cleanly to Gmail compose
          console.warn('Web3Forms returned error:', data.message);
          window.open(gmailWebComposeUrl, '_blank', 'noopener,noreferrer');
          setStatus('idle');
          return;
        }
      } catch (err) {
        console.error('API submission failed, falling back to Gmail:', err);
        window.open(gmailWebComposeUrl, '_blank', 'noopener,noreferrer');
        setStatus('idle');
        return;
      }
    }

    // IF NO API KEY IS CONFIGURED YET:
    // Launch Gmail Web Compose directly with the pre-filled message (Guaranteed delivery, zero setup required)
    window.open(gmailWebComposeUrl, '_blank', 'noopener,noreferrer');
    setStatus('idle');
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t dark:border-slate-800/80 border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md dark:bg-cyan-500/10 bg-cyan-50 border dark:border-cyan-500/30 border-cyan-300 text-xs font-mono dark:text-cyan-400 text-cyan-700 mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>04 / Communication Station</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-slate-950 tracking-tight">
            Get In Touch
          </h2>
          <p className="mt-3 dark:text-slate-300 text-slate-600 text-sm sm:text-base leading-relaxed">
            I am actively interviewing for <strong className="dark:text-white text-slate-950">GenAI & Agentic AI engineering internships</strong> starting November 2026. Available for remote roles or immediate relocation.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <TiltCard3D maxTilt={10}>
              <div className="p-5 rounded-3xl dark:bg-slate-900/60 bg-white/80 border dark:border-slate-800/90 border-slate-200 backdrop-blur-xl flex items-center justify-between gap-4 shadow-xl hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-3 rounded-2xl dark:bg-cyan-500/10 bg-cyan-50 dark:text-cyan-400 text-cyan-600 border dark:border-cyan-500/30 border-cyan-200 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono dark:text-slate-400 text-slate-500 block">Direct Email</span>
                    <a
                      href={`mailto:${personalInfo.contact.email}`}
                      className="text-sm font-bold dark:text-white text-slate-900 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors truncate block font-sans"
                    >
                      {personalInfo.contact.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(personalInfo.contact.email, 'email')}
                  className="p-2.5 rounded-xl dark:bg-slate-800/80 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-300 text-slate-700 dark:hover:text-white hover:text-slate-950 border dark:border-slate-700 border-slate-300 transition-colors shrink-0 shadow-sm"
                  title="Copy Email"
                  aria-label="Copy Email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </TiltCard3D>

            {/* Phone Card */}
            <TiltCard3D maxTilt={10}>
              <div className="p-5 rounded-3xl dark:bg-slate-900/60 bg-white/80 border dark:border-slate-800/90 border-slate-200 backdrop-blur-xl flex items-center justify-between gap-4 shadow-xl hover:border-emerald-500/40 transition-colors">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-3 rounded-2xl dark:bg-emerald-500/10 bg-emerald-50 dark:text-emerald-400 text-emerald-600 border dark:border-emerald-500/30 border-emerald-200 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono dark:text-slate-400 text-slate-500 block">Phone / WhatsApp</span>
                    <a
                      href={`tel:${personalInfo.contact.phone}`}
                      className="text-sm font-bold dark:text-white text-slate-900 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors truncate block font-mono"
                    >
                      {personalInfo.contact.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(personalInfo.contact.phone, 'phone')}
                  className="p-2.5 rounded-xl dark:bg-slate-800/80 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-300 text-slate-700 dark:hover:text-white hover:text-slate-950 border dark:border-slate-700 border-slate-300 transition-colors shrink-0 shadow-sm"
                  title="Copy Phone"
                  aria-label="Copy Phone"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </TiltCard3D>

            {/* Location Card */}
            <TiltCard3D maxTilt={10}>
              <div className="p-5 rounded-3xl dark:bg-slate-900/60 bg-white/80 border dark:border-slate-800/90 border-slate-200 backdrop-blur-xl flex items-center gap-3.5 shadow-xl hover:border-violet-500/40 transition-colors">
                <div className="p-3 rounded-2xl dark:bg-violet-500/10 bg-violet-50 dark:text-violet-400 text-violet-600 border dark:border-violet-500/30 border-violet-200 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono dark:text-slate-400 text-slate-500 block">Candidate Base</span>
                  <span className="text-sm font-bold dark:text-white text-slate-900 block font-sans">
                    {personalInfo.contact.location}
                  </span>
                  <span className="text-xs font-mono dark:text-cyan-300 text-cyan-700 block mt-0.5">
                    ✓ Open to Relocation • Remote Friendly
                  </span>
                </div>
              </div>
            </TiltCard3D>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={personalInfo.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200 hover:border-cyan-500/50 flex items-center justify-between dark:text-slate-200 text-slate-700 dark:hover:text-white hover:text-slate-950 transition-all group backdrop-blur-xl shadow-sm"
              >
                <div className="flex items-center gap-2 text-xs font-mono">
                  <Linkedin className="w-4 h-4 dark:text-cyan-400 text-cyan-600" />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400" />
              </a>

              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl dark:bg-slate-900/80 bg-white border dark:border-slate-800 border-slate-200 hover:border-emerald-500/50 flex items-center justify-between dark:text-slate-200 text-slate-700 dark:hover:text-white hover:text-slate-950 transition-all group backdrop-blur-xl shadow-sm"
              >
                <div className="flex items-center gap-2 text-xs font-mono">
                  <Github className="w-4 h-4 dark:text-emerald-400 text-emerald-600" />
                  <span>GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Direct Dispatcher */}
          <div className="lg:col-span-7">
            <TiltCard3D maxTilt={5}>
              <div className="p-6 sm:p-8 rounded-3xl dark:bg-[#090d18]/90 bg-white/90 border dark:border-cyan-500/30 border-cyan-500/20 backdrop-blur-xl shadow-2xl space-y-5">
                {/* Card Header */}
                <div>
                  <h3 className="text-lg font-black dark:text-white text-slate-950 flex items-center gap-2">
                    <Send className="w-4 h-4 dark:text-cyan-400 text-cyan-600" />
                    Quick Dispatch to Gargee
                  </h3>
                  <p className="text-xs dark:text-slate-400 text-slate-500 mt-0.5">
                    Pre-fills an email directly to <strong className="dark:text-cyan-300 text-cyan-700">{personalInfo.contact.email}</strong>.
                  </p>
                </div>

                {/* SUCCESS VIEW (When API succeeds) */}
                {status === 'success' ? (
                  <div className="p-6 rounded-2xl dark:bg-emerald-950/20 bg-emerald-50/70 border dark:border-emerald-500/40 border-emerald-300 space-y-4 animate-fadeIn">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold dark:text-emerald-300 text-emerald-800">
                          Message Dispatched Successfully!
                        </h4>
                        <p className="text-xs dark:text-slate-300 text-slate-700 mt-1 leading-relaxed">
                          Your email inquiry has been delivered directly to <strong className="dark:text-white text-slate-950">{personalInfo.contact.email}</strong>. Gargee will review and get back to you within 24 hours.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        onClick={() => {
                          setStatus('idle');
                          setMessage('');
                        }}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl dark:bg-slate-900 bg-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-mono font-bold dark:text-white text-slate-900 border dark:border-slate-700 border-slate-300 transition-colors"
                      >
                        Send Another Message
                      </button>

                      <a
                        href={gmailWebComposeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl dark:bg-cyan-500/10 bg-cyan-50 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 text-xs font-mono font-semibold dark:text-cyan-300 text-cyan-800 border dark:border-cyan-500/30 border-cyan-300 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Also Open in Gmail</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  /* FORM VIEW */
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-xs font-mono dark:text-slate-300 text-slate-700 block mb-1.5 font-semibold flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-cyan-500" />
                          <span>Your Name / Organization</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins (Acme AI)"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-2xl dark:bg-slate-900/90 bg-slate-50 border dark:border-slate-800 border-slate-300 text-xs sm:text-sm dark:text-white text-slate-900 focus:outline-none focus:border-cyan-500 font-sans shadow-inner placeholder:text-slate-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono dark:text-slate-300 text-slate-700 block mb-1.5 font-semibold flex items-center gap-1.5">
                          <AtSign className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Your Email Address *</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="sarah@company.com"
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-2xl dark:bg-slate-900/90 bg-slate-50 border dark:border-slate-800 border-slate-300 text-xs sm:text-sm dark:text-white text-slate-900 focus:outline-none focus:border-cyan-500 font-mono shadow-inner placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Subject Line */}
                    <div>
                      <label className="text-xs font-mono dark:text-slate-300 text-slate-700 block mb-1.5 font-semibold">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-2xl dark:bg-slate-900/90 bg-slate-50 border dark:border-slate-800 border-slate-300 text-xs sm:text-sm dark:text-white text-slate-900 focus:outline-none focus:border-cyan-500 font-mono shadow-inner"
                      />
                    </div>

                    {/* Message Body */}
                    <div>
                      <label className="text-xs font-mono dark:text-slate-300 text-slate-700 block mb-1.5 font-semibold">
                        Message Body
                      </label>
                      <textarea
                        rows="4"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-2xl dark:bg-slate-900/90 bg-slate-50 border dark:border-slate-800 border-slate-300 text-xs sm:text-sm dark:text-white text-slate-900 focus:outline-none focus:border-cyan-500 leading-relaxed font-sans shadow-inner"
                      />
                    </div>

                    {/* Error Notice */}
                    {status === 'error' && (
                      <div className="p-3 rounded-xl dark:bg-red-950/30 bg-red-50 border dark:border-red-500/40 border-red-300 text-xs dark:text-red-300 text-red-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{statusMsg}</span>
                      </div>
                    )}

                    {/* Dual Action Dispatch Buttons (100% Guaranteed Delivery) */}
                    <div className="space-y-3 pt-1">
                      {/* Button 1: Send via Gmail Web */}
                      <a
                        href={gmailWebComposeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send via Gmail (1-Click Compose)</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                      </a>

                      {/* Button 2: Send via Default Mail App (Outlook, Apple Mail) */}
                      <a
                        href={mailtoLink}
                        className="w-full py-3 rounded-2xl dark:bg-slate-800/80 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-mono font-semibold dark:text-slate-200 text-slate-800 border dark:border-slate-700 border-slate-300 flex items-center justify-center gap-2 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-cyan-500" />
                        <span>Send via Default Mail App (Outlook / Apple Mail)</span>
                      </a>
                    </div>
                  </form>
                )}

                {/* Footer SLA */}
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono dark:text-slate-400 text-slate-500 border-t dark:border-slate-800 border-slate-200">
                  <span>Recipient: {personalInfo.contact.email}</span>
                  <span className="dark:text-emerald-400 text-emerald-600 font-semibold">
                    Response SLA: &lt; 24 Hours
                  </span>
                </div>
              </div>
            </TiltCard3D>
          </div>
        </div>
      </div>
    </section>
  );
}
