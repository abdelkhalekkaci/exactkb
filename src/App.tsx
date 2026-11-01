/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Camera, Moon, QrCode, Sun } from 'lucide-react';
import {
  AtelierPage,
  BiometricPresetId,
  LocaleCode,
  QRPayloadType
} from './types/atelier';
import { TRANSLATIONS } from './data/seoRoutesAndTranslations';
import { ExactKbLabPage } from './components/ExactKbLabPage';
import { QrPrintshopPage } from './components/QrPrintshopPage';
import { CustomAtelierCursor } from './components/CustomAtelierCursor';
import { InfoAndLegalPages } from './components/InfoAndLegalPages';

export default function App() {
  const [activePage, setActivePage] = useState<AtelierPage>('exactkb');
  const [locale, setLocale] = useState<LocaleCode>('en');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Studio Calibration & Cross-Tool Bridge State
  const [exactKbPreset, setExactKbPreset] = useState<BiometricPresetId>('schengen-35x45');
  const [exactKbTarget, setExactKbTarget] = useState<number>(50);
  const [bridgedQrDataUrl, setBridgedQrDataUrl] = useState<string | null>(null);
  const [qrPayloadType, setQrPayloadType] = useState<QRPayloadType>('url');

  const t = TRANSLATIONS[locale];
  const isRtl = locale === 'ar';

  // Sync Light (#ffffff) and Dark (#14213d) Mode with <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const navigateToPage = (page: AtelierPage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQrWithPayload = (payloadType: QRPayloadType = 'url') => {
    setQrPayloadType(payloadType);
    navigateToPage('qr');
  };

  const handleSendQrToExactKb = (pngDataUrl: string) => {
    setBridgedQrDataUrl(pngDataUrl);
    setExactKbPreset('custom');
    setExactKbTarget(20);
    navigateToPage('exactkb');
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      lang={locale}
      className="min-h-screen flex flex-col bg-[#ffffff] dark:bg-[#14213d] text-[#14213d] dark:text-[#ffffff] transition-colors"
    >
      {/* QUINTE DISTRICTS INTERACTIVE CURSOR */}
      <CustomAtelierCursor enabled={true} />

      {/* SIMPLE, CLEAN 3-ZONE TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#ffffff]/95 dark:bg-[#14213d]/95 backdrop-blur-xs border-b border-[#14213d]/15 dark:border-[#ffffff]/15">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4">
          {/* Zone 1: Brand Title */}
          <a
            href="#exactkb"
            onClick={(e) => {
              e.preventDefault();
              navigateToPage('exactkb');
            }}
            className="font-serif text-xl font-bold tracking-tight whitespace-nowrap shrink-0"
          >
            ExactKB <span className="text-[#fca311]">&amp;</span> QR
          </a>

          {/* Zone 2: Clear 2-Tool Switcher in Navbar */}
          <nav className="flex items-center gap-2">
            <button
              onClick={() => navigateToPage('exactkb')}
              className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'exactkb'
                  ? 'bg-[#fca311] text-[#14213d] shadow-xs'
                  : 'hover:bg-[#fca311]/15'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{t.navExactKb}</span>
            </button>

            <button
              onClick={() => navigateToPage('qr')}
              className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'qr'
                  ? 'bg-[#fca311] text-[#14213d] shadow-xs'
                  : 'hover:bg-[#fca311]/15'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>{t.navQrStudio}</span>
            </button>
          </nav>

          {/* Zone 3: 4-Language Toggle (EN / FR / ES / AR) & Theme Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              role="group"
              aria-label="Language Selector"
              className="flex items-center rounded-lg border border-[#14213d]/20 dark:border-[#ffffff]/25 p-0.5"
            >
              {(['en', 'fr', 'es', 'ar'] as LocaleCode[]).map((code) => {
                const active = locale === code;
                return (
                  <button
                    key={code}
                    onClick={() => setLocale(code)}
                    className={`px-2 py-1 rounded-md text-xs font-mono font-bold uppercase transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#fca311] text-[#14213d]'
                        : 'hover:text-[#fca311]'
                    }`}
                  >
                    {code}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Light and Dark Mode"
              className="p-2 rounded-lg border border-[#14213d]/20 dark:border-[#ffffff]/25 hover:border-[#fca311] transition-colors cursor-pointer"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-[#fca311]" />
              ) : (
                <Moon className="w-4 h-4 text-[#14213d]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN PAGE ROUTER */}
      <main className="flex-1">
        {activePage === 'exactkb' && (
          <ExactKbLabPage
            locale={locale}
            initialPresetId={exactKbPreset}
            initialTargetKb={exactKbTarget}
            bridgedQrDataUrl={bridgedQrDataUrl}
            onClearBridgedQr={() => setBridgedQrDataUrl(null)}
            onNavigateToQr={handleOpenQrWithPayload}
          />
        )}

        {activePage === 'qr' && (
          <QrPrintshopPage
            locale={locale}
            initialPayloadType={qrPayloadType}
            onSendQrToExactKb={handleSendQrToExactKb}
          />
        )}

        {(activePage === 'about' ||
          activePage === 'legal' ||
          activePage === 'privacy' ||
          activePage === 'contact') && (
          <InfoAndLegalPages activePage={activePage} onNavigate={navigateToPage} />
        )}
      </main>

      {/* COMPLETE FOOTER WITH TOOLS & ESSENTIAL LEGAL / INFO PAGES */}
      <footer className="border-t border-[#14213d]/15 dark:border-[#ffffff]/15 py-10 mt-16 bg-[#ffffff] dark:bg-[#14213d]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 1: Brand & Privacy Promise */}
            <div className="space-y-2">
              <div className="font-serif text-lg font-bold">
                ExactKB <span className="text-[#fca311]">&amp;</span> QR
              </div>
              <p className="text-xs opacity-75 leading-relaxed">
                {t.footerDesc}
              </p>
            </div>

            {/* Column 2: Studio Tools */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold uppercase text-[#fca311]">
                {t.footerToolsTitle}
              </div>
              <ul className="space-y-1.5 text-xs font-semibold">
                <li>
                  <button
                    onClick={() => navigateToPage('exactkb')}
                    className="hover:text-[#fca311] transition-colors cursor-pointer"
                  >
                    {t.navExactKb}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToPage('qr')}
                    className="hover:text-[#fca311] transition-colors cursor-pointer"
                  >
                    {t.navQrStudio}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Information & Legal Pages */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold uppercase text-[#fca311]">
                {t.footerLegalTitle}
              </div>
              <ul className="space-y-1.5 text-xs font-semibold">
                <li>
                  <button
                    onClick={() => navigateToPage('about')}
                    className="hover:text-[#fca311] transition-colors cursor-pointer"
                  >
                    {t.navAbout}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToPage('legal')}
                    className="hover:text-[#fca311] transition-colors cursor-pointer"
                  >
                    {t.navLegal}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToPage('privacy')}
                    className="hover:text-[#fca311] transition-colors cursor-pointer"
                  >
                    {t.navPrivacy}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToPage('contact')}
                    className="hover:text-[#fca311] transition-colors cursor-pointer"
                  >
                    {t.navContact}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#14213d]/10 dark:border-[#ffffff]/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs opacity-70">
            <div>© {new Date().getFullYear()} ExactKB &amp; QR.</div>
            <div>{t.localGuaranteeFooter}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
