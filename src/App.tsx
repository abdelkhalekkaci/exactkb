/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Camera, Moon, QrCode, Sun } from 'lucide-react';
import {
  AtelierPage,
  BiometricPresetId,
  LocaleCode,
  QRPayloadType
} from './types/atelier';
import {
  LOCALIZED_ROUTE_META,
  TRANSLATIONS
} from './data/seoRoutesAndTranslations';
import { ExactKbLabPage } from './components/ExactKbLabPage';
import { QrPrintshopPage } from './components/QrPrintshopPage';
import { CustomAtelierCursor } from './components/CustomAtelierCursor';
import { InfoAndLegalPages } from './components/InfoAndLegalPages';
import { SeoBlogPage } from './components/SeoBlogPage';

const SITE_ORIGIN = 'https://compressphoto.space';

interface ParsedRoute {
  page: AtelierPage;
  blogSlug: string | null;
}

export function getPathForPage(
  page: AtelierPage,
  blogSlug?: string | null
): string {
  switch (page) {
    case 'exactkb':
      return '/';
    case 'qr':
      return '/qr';
    case 'blog':
      return blogSlug ? `/blog/${blogSlug}` : '/blog';
    case 'about':
      return '/about';
    case 'legal':
      return '/legal';
    case 'privacy':
      return '/privacy';
    case 'contact':
      return '/contact';
  }
}

function parseLocationRoute(): ParsedRoute {
  if (typeof window === 'undefined') {
    return { page: 'exactkb', blogSlug: null };
  }

  const rawPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const rawHash = window.location.hash.replace(/^#\/?/, '');

  // Support legacy hash URLs if visited directly
  if (rawPath === '/' && rawHash) {
    if (rawHash === 'qr') return { page: 'qr', blogSlug: null };
    if (rawHash === 'blog') return { page: 'blog', blogSlug: null };
    if (rawHash.startsWith('blog/')) {
      return { page: 'blog', blogSlug: rawHash.slice(5) || null };
    }
    if (rawHash === 'about') return { page: 'about', blogSlug: null };
    if (rawHash === 'legal') return { page: 'legal', blogSlug: null };
    if (rawHash === 'privacy') return { page: 'privacy', blogSlug: null };
    if (rawHash === 'contact') return { page: 'contact', blogSlug: null };
  }

  if (rawPath === '/qr') return { page: 'qr', blogSlug: null };
  if (rawPath === '/blog') return { page: 'blog', blogSlug: null };
  if (rawPath.startsWith('/blog/')) {
    const slug = decodeURIComponent(rawPath.slice('/blog/'.length)).trim();
    return { page: 'blog', blogSlug: slug || null };
  }
  if (rawPath === '/about') return { page: 'about', blogSlug: null };
  if (rawPath === '/legal') return { page: 'legal', blogSlug: null };
  if (rawPath === '/privacy') return { page: 'privacy', blogSlug: null };
  if (rawPath === '/contact') return { page: 'contact', blogSlug: null };

  return { page: 'exactkb', blogSlug: null };
}

function parseInitialLocale(): LocaleCode {
  if (typeof window === 'undefined') return 'en';
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang')?.toLowerCase();
  if (
    langParam === 'en' ||
    langParam === 'fr' ||
    langParam === 'es' ||
    langParam === 'ar'
  ) {
    return langParam;
  }
  return 'en';
}

export default function App() {
  const initialRoute = parseLocationRoute();
  const [activePage, setActivePage] = useState<AtelierPage>(initialRoute.page);
  const [activeBlogSlug, setActiveBlogSlug] = useState<string | null>(
    initialRoute.blogSlug
  );
  const [locale, setLocale] = useState<LocaleCode>(parseInitialLocale);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Studio Calibration & Cross-Tool Bridge State
  const [exactKbPreset, setExactKbPreset] =
    useState<BiometricPresetId>('schengen-35x45');
  const [exactKbTarget, setExactKbTarget] = useState<number>(50);
  const [bridgedQrDataUrl, setBridgedQrDataUrl] = useState<string | null>(null);
  const [qrPayloadType, setQrPayloadType] = useState<QRPayloadType>('url');

  const t = TRANSLATIONS[locale];
  const isRtl = locale === 'ar';

  // Sync Light (#ffffff) and Dark (#14213d) Mode + lang/dir with <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.setAttribute('lang', locale);
    root.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
  }, [darkMode, locale, isRtl]);

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseLocationRoute();
      setActivePage(parsed.page);
      setActiveBlogSlug(parsed.blogSlug);
      setLocale(parseInitialLocale());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Synchronize <link rel="canonical">, hreflang tags, <meta property="og:url">, and localized page-specific title/description
  useEffect(() => {
    const canonicalPath = getPathForPage(activePage, activeBlogSlug);
    const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;

    let canonicalEl = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);

    // Sync hreflang alternate links for the active path
    const hreflangMap: Record<string, string> = {
      en: canonicalUrl,
      fr: `${canonicalUrl}?lang=fr`,
      es: `${canonicalUrl}?lang=es`,
      ar: `${canonicalUrl}?lang=ar`,
      'x-default': canonicalUrl
    };
    Object.entries(hreflangMap).forEach(([langCode, url]) => {
      let linkEl = document.querySelector(
        `link[rel="alternate"][hreflang="${langCode}"]`
      ) as HTMLLinkElement | null;
      if (!linkEl) {
        linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'alternate');
        linkEl.setAttribute('hreflang', langCode);
        document.head.appendChild(linkEl);
      }
      linkEl.setAttribute('href', url);
    });

    const ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) {
      ogUrlEl.setAttribute('content', canonicalUrl);
    }

    // Blog page manages its own dynamic localized hub/article title & description
    if (activePage !== 'blog') {
      const meta = LOCALIZED_ROUTE_META[locale][activePage];
      document.title = meta.title;

      const descEl = document.querySelector('meta[name="description"]');
      if (descEl) descEl.setAttribute('content', meta.description);

      const ogTitleEl = document.querySelector('meta[property="og:title"]');
      if (ogTitleEl) ogTitleEl.setAttribute('content', meta.title);

      const ogDescEl = document.querySelector('meta[property="og:description"]');
      if (ogDescEl) ogDescEl.setAttribute('content', meta.description);

      const twTitleEl = document.querySelector('meta[name="twitter:title"]');
      if (twTitleEl) twTitleEl.setAttribute('content', meta.title);

      const twDescEl = document.querySelector('meta[name="twitter:description"]');
      if (twDescEl) twDescEl.setAttribute('content', meta.description);
    }
  }, [activePage, activeBlogSlug, locale]);

  const navigateToPage = useCallback(
    (page: AtelierPage, blogSlug: string | null = null) => {
      const targetPath = getPathForPage(page, blogSlug);
      const targetUrl =
        locale === 'en' ? targetPath : `${targetPath}?lang=${locale}`;
      if (
        typeof window !== 'undefined' &&
        `${window.location.pathname}${window.location.search}` !== targetUrl
      ) {
        window.history.pushState({}, '', targetUrl);
      }
      setActivePage(page);
      setActiveBlogSlug(page === 'blog' ? blogSlug : null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [locale]
  );

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: AtelierPage,
    blogSlug: string | null = null
  ) => {
    if (
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey &&
      e.button === 0
    ) {
      e.preventDefault();
      navigateToPage(page, blogSlug);
    }
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

  const handleLaunchPresetFromBlog = (
    presetId: BiometricPresetId,
    targetKb: number
  ) => {
    setBridgedQrDataUrl(null);
    setExactKbPreset(presetId);
    setExactKbTarget(targetKb);
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
          {/* Zone 1: Custom Brand Logo + CompressPhoto Title */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, 'exactkb')}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#14213d] dark:bg-[#ffffff] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 64 64"
                fill="none"
                className="w-7 h-7"
                aria-hidden="true"
              >
                <path
                  d="M12 23V14C12 12.8954 12.8954 12 14 12H23"
                  stroke="#fca311"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
                <path
                  d="M52 23V14C52 12.8954 51.1046 12 50 12H41"
                  stroke="#fca311"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 41V50C12 51.1046 12.8954 52 14 52H23"
                  stroke="#fca311"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
                <path
                  d="M52 41V50C52 51.1046 51.1046 52 50 52H41"
                  stroke="#fca311"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="10"
                  className="stroke-[#ffffff] dark:stroke-[#14213d]"
                  strokeWidth="4.5"
                />
                <circle cx="32" cy="32" r="4.5" fill="#fca311" />
              </svg>
            </div>
            <span className="font-serif text-xl font-bold tracking-tight">
              Compress<span className="text-[#fca311]">Photo</span>
            </span>
          </a>

          {/* Zone 2: Clear 2-Tool Switcher in Navbar */}
          <nav aria-label="Primary Tools" className="flex items-center gap-2">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, 'exactkb')}
              className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'exactkb'
                  ? 'bg-[#fca311] text-[#14213d] shadow-xs'
                  : 'hover:bg-[#fca311]/15'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{t.navExactKb}</span>
            </a>

            <a
              href="/qr"
              onClick={(e) => handleLinkClick(e, 'qr')}
              className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'qr'
                  ? 'bg-[#fca311] text-[#14213d] shadow-xs'
                  : 'hover:bg-[#fca311]/15'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>{t.navQrStudio}</span>
            </a>
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
                    onClick={() => {
                      setLocale(code);
                      if (typeof window !== 'undefined') {
                        const currentPath = getPathForPage(
                          activePage,
                          activeBlogSlug
                        );
                        const nextUrl =
                          code === 'en'
                            ? currentPath
                            : `${currentPath}?lang=${code}`;
                        window.history.replaceState({}, '', nextUrl);
                      }
                    }}
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

        {activePage === 'blog' && (
          <SeoBlogPage
            locale={locale}
            activeArticleSlug={activeBlogSlug}
            onSelectArticleSlug={(slug) => navigateToPage('blog', slug)}
            onLaunchPreset={handleLaunchPresetFromBlog}
            onLaunchQrPreset={handleOpenQrWithPayload}
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
            {/* Column 1: Brand Logo & Privacy Promise */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#14213d] dark:bg-[#ffffff] flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    className="w-6 h-6"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 23V14C12 12.8954 12.8954 12 14 12H23"
                      stroke="#fca311"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M52 23V14C52 12.8954 51.1046 12 50 12H41"
                      stroke="#fca311"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 41V50C12 51.1046 12.8954 52 14 52H23"
                      stroke="#fca311"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M52 41V50C52 51.1046 51.1046 52 50 52H41"
                      stroke="#fca311"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="10"
                      className="stroke-[#ffffff] dark:stroke-[#14213d]"
                      strokeWidth="4.5"
                    />
                    <circle cx="32" cy="32" r="4.5" fill="#fca311" />
                  </svg>
                </div>
                <span className="font-serif text-lg font-bold">
                  Compress<span className="text-[#fca311]">Photo</span>
                </span>
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
                  <a
                    href="/"
                    onClick={(e) => handleLinkClick(e, 'exactkb')}
                    className="hover:text-[#fca311] transition-colors cursor-pointer"
                  >
                    {t.navExactKb}
                  </a>
                </li>
                <li>
                  <a
                    href="/qr"
                    onClick={(e) => handleLinkClick(e, 'qr')}
                    className="hover:text-[#fca311] transition-colors cursor-pointer"
                  >
                    {t.navQrStudio}
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    onClick={(e) => handleLinkClick(e, 'blog')}
                    className="hover:text-[#fca311] transition-colors cursor-pointer"
                  >
                    {t.navBlog}
                  </a>
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
                  <a
                    href="/about"
                    onClick={(e) => handleLinkClick(e, 'about')}
                    className="hover:text-[#fca311] transition-colors cursor-pointer"
                  >
                    {t.navAbout}
                  </a>
                </li>
                <li>
                  <a
                    href="/legal"
                    onClick={(e) => handleLinkClick(e, 'legal')}
                    className="hover:text-[#fca311] transition-colors cursor-pointer"
                  >
                    {t.navLegal}
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    onClick={(e) => handleLinkClick(e, 'privacy')}
                    className="hover:text-[#fca311] transition-colors cursor-pointer"
                  >
                    {t.navPrivacy}
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    onClick={(e) => handleLinkClick(e, 'contact')}
                    className="hover:text-[#fca311] transition-colors cursor-pointer"
                  >
                    {t.navContact}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#14213d]/10 dark:border-[#ffffff]/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs opacity-70">
            <div>© {new Date().getFullYear()} CompressPhoto.</div>
            <div>{t.localGuaranteeFooter}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
