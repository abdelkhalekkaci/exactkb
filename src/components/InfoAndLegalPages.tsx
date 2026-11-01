import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Info,
  Lock,
  Mail,
  Send,
  ShieldCheck
} from 'lucide-react';
import { AtelierPage } from '../types/atelier';

interface InfoAndLegalPagesProps {
  activePage: 'about' | 'privacy' | 'legal' | 'contact';
  onNavigate: (page: AtelierPage) => void;
}

export const InfoAndLegalPages: React.FC<InfoAndLegalPagesProps> = ({
  activePage,
  onNavigate
}) => {
  // Contact Form State with Validation
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Question');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError('Please fill in your name, email address, and message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormError(null);
    setFormSubmitted(true);
  };

  const INFO_TABS: { id: 'about' | 'legal' | 'privacy' | 'contact'; label: string; icon: React.ReactNode }[] = [
    { id: 'about', label: 'About / À Propos', icon: <Info className="w-4 h-4" /> },
    { id: 'legal', label: 'Legal Notice / Mentions Légales', icon: <FileText className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy Policy / Confidentialité', icon: <Lock className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact Us', icon: <Mail className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Bar: Back to Tool + Sub-Navigation for Info Pages */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#14213d]/15 dark:border-[#ffffff]/15">
        <button
          onClick={() => onNavigate('exactkb')}
          className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-lg bg-[#fca311] text-[#14213d] hover:bg-[#e5920e] transition-colors w-fit cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Photo KB Compressor</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {INFO_TABS.map((tab) => {
            const active = activePage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                    : 'border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. ABOUT / À PROPOS PAGE */}
      {activePage === 'about' && (
        <div className="p-6 sm:p-10 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-6">
          <div className="space-y-2 border-b border-[#14213d]/10 dark:border-[#ffffff]/10 pb-5">
            <div className="text-xs font-mono font-bold uppercase text-[#fca311]">
              About / À Propos
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">
              Precision Browser-Local Tools for Official Documents &amp; Print
            </h1>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed opacity-90">
            <p>
              <strong>CompressPhoto</strong> was created to solve two everyday frustrations without compromising your privacy:
            </p>
            <ul className="space-y-3 pl-4 list-disc">
              <li>
                <strong>Strict Kilobyte Limits on Official Portals:</strong> Government visa applications (Schengen 35×45 mm, France ANTS, Morocco CNIE, US Visa 2×2&quot;) and civil-service exam portals require exact pixel dimensions and strict file-size ceilings (such as <code>&lt; 20 KB</code> or <code>&lt; 50 KB</code>). Our 7-pass binary-search engine locks your image or handwritten signature right under your chosen KB limit in milliseconds.
              </li>
              <li>
                <strong>Non-Expiring Vector QR Codes:</strong> Many online QR generators insert middleman tracking links that expire unless you pay a monthly subscription. Our QR &amp; Barcode generator encodes your URL, Wi-Fi credentials, Business Card (vCard 3.0), or Menu directly into the vector matrix so your printed codes work forever.
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-xl border-2 border-[#fca311] bg-[#fca311]/10 flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-[#fca311] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm space-y-1">
              <div className="font-bold">100% Client-Side Guarantee (Zero Server Uploads)</div>
              <p className="opacity-85">
                Every photo, passport scan, signature, and QR code is processed strictly inside your own device’s web browser using HTML5 Canvas. Your personal files never leave your computer or phone.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. LEGAL NOTICE / MENTIONS LÉGALES PAGE */}
      {activePage === 'legal' && (
        <div className="p-6 sm:p-10 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-6">
          <div className="space-y-2 border-b border-[#14213d]/10 dark:border-[#ffffff]/10 pb-5">
            <div className="text-xs font-mono font-bold uppercase text-[#fca311]">
              Legal Notice / Mentions Légales &amp; CGU
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">
              Mentions Légales &amp; Terms of Service
            </h1>
          </div>

          <div className="space-y-6 text-sm leading-relaxed opacity-90">
            <section className="space-y-2">
              <h2 className="text-base font-bold">1. Service Publisher / Éditeur du Service</h2>
              <p>
                <strong>CompressPhoto</strong> is an independent web utility platform providing client-side image compression, biometric crop calibration, and vector QR/barcode generation.
                <br />
                Official Website: <strong>https://compressphoto.space</strong> · Contact Email: <strong>contact@compressphoto.space</strong>
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold">2. Intellectual Property / Propriété Intellectuelle</h2>
              <p>
                All interface designs, client-side compression algorithms, and software code on this website are protected by copyright law. Any images, signatures, or QR codes you generate using this tool belong 100% to you and may be used freely for personal, administrative, or commercial purposes.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold">3. Disclaimer of Liability / Limitation de Responsabilité</h2>
              <p>
                While our presets follow international biometric standards (such as ISO/IEC 19794-5 for 35×45 mm passports and US Department of State 2×2 inch specifications), users remain solely responsible for verifying that their final photograph meets the specific facial posture, lighting, and background rules of their destination embassy or administrative portal.
              </p>
            </section>
          </div>
        </div>
      )}

      {/* 3. PRIVACY POLICY / POLITIQUE DE CONFIDENTIALITÉ PAGE */}
      {activePage === 'privacy' && (
        <div className="p-6 sm:p-10 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-6">
          <div className="space-y-2 border-b border-[#14213d]/10 dark:border-[#ffffff]/10 pb-5">
            <div className="text-xs font-mono font-bold uppercase text-[#fca311]">
              Privacy Policy / Politique de Confidentialité (GDPR)
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">
              Privacy Policy &amp; Data Protection
            </h1>
          </div>

          <div className="space-y-6 text-sm leading-relaxed opacity-90">
            <section className="space-y-2">
              <h2 className="text-base font-bold">1. Zero Image Upload Policy</h2>
              <p>
                Unlike traditional online image compressors that upload your files to remote cloud servers, <strong>CompressPhoto</strong> executes 100% of its image resizing, byte-ceiling compression, PDF generation, and signature shadow removal locally inside your browser. We never view, transmit, or store your photographs or signatures.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold">2. QR Code &amp; Barcode Privacy</h2>
              <p>
                All Wi-Fi passwords, vCard contact details, phone numbers, and URLs entered into the QR Code Generator are encoded directly into your SVG/PNG image inside your browser. No middleman redirect URLs or tracking databases are used.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold">3. Cookies &amp; Local Storage</h2>
              <p>
                We use minimal browser preferences (such as remembering your Light or Dark theme selection) and standard anonymous traffic analytics to keep the tool fast and free. You can clear your browser cache at any time.
              </p>
            </section>
          </div>
        </div>
      )}

      {/* 4. CONTACT US PAGE */}
      {activePage === 'contact' && (
        <div className="p-6 sm:p-10 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-6">
          <div className="space-y-2 border-b border-[#14213d]/10 dark:border-[#ffffff]/10 pb-5">
            <div className="text-xs font-mono font-bold uppercase text-[#fca311]">
              Contact &amp; Support
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">
              Get in Touch with Us
            </h1>
            <p className="text-sm opacity-80">
              Have a question, feature request, or need a custom preset added? Send us a message below.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-xl border-2 border-[#fca311] bg-[#fca311]/15 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#fca311] mx-auto" />
              <h3 className="font-serif text-xl font-bold">Message Received!</h3>
              <p className="text-sm opacity-85 max-w-md mx-auto">
                Thank you, <strong>{name}</strong>. We have received your message regarding <strong>{subject}</strong> and will reply to <strong>{email}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="px-5 py-2.5 rounded-lg bg-[#fca311] text-[#14213d] text-xs font-bold cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5">Your Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">Topic</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-[#ffffff] dark:bg-[#14213d]"
                >
                  <option value="General Question">General Question</option>
                  <option value="Request a New Photo Preset">Request a New Photo Preset</option>
                  <option value="Bug Report">Report a Bug</option>
                  <option value="Business / Partnership">Business / Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">Message *</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                />
              </div>

              {formError && (
                <div className="p-3 rounded-lg bg-[#fca311]/20 border border-[#fca311] text-xs font-bold">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                className="px-6 py-3.5 rounded-lg bg-[#fca311] hover:bg-[#e5920e] text-[#14213d] text-sm font-bold flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
