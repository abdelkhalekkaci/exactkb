/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
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
import {
  getToolLandingBySlug
} from './data/toolLandingPages';
import { ExactKbLabPage } from './components/ExactKbLabPage';
import { CustomAtelierCursor } from './components/CustomAtelierCursor';
import { ProStudioFooter } from './components/ProStudioFooter';

const QrPrintshopPage = lazy(() =>
  import('./components/QrPrintshopPage').then((m) => ({
    default: m.QrPrintshopPage
  }))
);
const SeoBlogPage = lazy(() =>
  import('./components/SeoBlogPage').then((m) => ({
    default: m.SeoBlogPage
  }))
);
const InfoAndLegalPages = lazy(() =>
  import('./components/InfoAndLegalPages').then((m) => ({
    default: m.InfoAndLegalPages
  }))
);

const SITE_ORIGIN = 'https://compressphoto.space';

interface ParsedRoute {
  locale: LocaleCode;
  page: AtelierPage;
  toolSlug: string | null;
  blogSlug: string | null;
}

export function getBasePathForPage(
  page: AtelierPage,
  toolSlug?: string | null,
  blogSlug?: string | null
): string {
  switch (page) {
    case 'exactkb':
      return toolSlug ? `/${toolSlug}` : '/';
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

export function getLocalizedPath(
  locale: LocaleCode,
  page: AtelierPage,
  toolSlug?: string | null,
  blogSlug?: string | null
): string {
  const basePath = getBasePathForPage(page, toolSlug, blogSlug);
  if (locale === 'en') {
    return basePath;
  }
  return basePath === '/' ? `/${locale}` : `/${locale}${basePath}`;
}

function parseLocationRoute(): ParsedRoute {
  if (typeof window === 'undefined') {
    return { locale: 'en', page: 'exactkb', toolSlug: null, blogSlug: null };
  }

  let rawPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const rawHash = window.location.hash.replace(/^#\/?/, '');
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang')?.toLowerCase();

  let detectedLocale: LocaleCode = 'en';

  // 1. Check subdirectory prefix (/fr, /es, /ar)
  if (rawPath === '/fr' || rawPath.startsWith('/fr/')) {
    detectedLocale = 'fr';
    rawPath = rawPath.slice(3) || '/';
  } else if (rawPath === '/es' || rawPath.startsWith('/es/')) {
    detectedLocale = 'es';
    rawPath = rawPath.slice(3) || '/';
  } else if (rawPath === '/ar' || rawPath.startsWith('/ar/')) {
    detectedLocale = 'ar';
    rawPath = rawPath.slice(3) || '/';
  } else if (
    langParam === 'fr' ||
    langParam === 'es' ||
    langParam === 'ar' ||
    langParam === 'en'
  ) {
    detectedLocale = langParam;
  }

  // Support legacy hash URLs if visited directly
  if (rawPath === '/' && rawHash) {
    if (rawHash === 'qr')
      return {
        locale: detectedLocale,
        page: 'qr',
        toolSlug: null,
        blogSlug: null
      };
    if (rawHash === 'blog')
      return {
        locale: detectedLocale,
        page: 'blog',
        toolSlug: null,
        blogSlug: null
      };
    if (rawHash.startsWith('blog/')) {
      return {
        locale: detectedLocale,
        page: 'blog',
        toolSlug: null,
        blogSlug: rawHash.slice(5) || null
      };
    }
    if (rawHash === 'about')
      return {
        locale: detectedLocale,
        page: 'about',
        toolSlug: null,
        blogSlug: null
      };
    if (rawHash === 'legal')
      return {
        locale: detectedLocale,
        page: 'legal',
        toolSlug: null,
        blogSlug: null
      };
    if (rawHash === 'privacy')
      return {
        locale: detectedLocale,
        page: 'privacy',
        toolSlug: null,
        blogSlug: null
      };
    if (rawHash === 'contact')
      return {
        locale: detectedLocale,
        page: 'contact',
        toolSlug: null,
        blogSlug: null
      };
  }

  if (rawPath === '/qr')
    return {
      locale: detectedLocale,
      page: 'qr',
      toolSlug: null,
      blogSlug: null
    };
  if (rawPath === '/blog')
    return {
      locale: detectedLocale,
      page: 'blog',
      toolSlug: null,
      blogSlug: null
    };
  if (rawPath.startsWith('/blog/')) {
    const slug = decodeURIComponent(rawPath.slice('/blog/'.length)).trim();
    return {
      locale: detectedLocale,
      page: 'blog',
      toolSlug: null,
      blogSlug: slug || null
    };
  }
  if (rawPath === '/about')
    return {
      locale: detectedLocale,
      page: 'about',
      toolSlug: null,
      blogSlug: null
    };
  if (rawPath === '/legal')
    return {
      locale: detectedLocale,
      page: 'legal',
      toolSlug: null,
      blogSlug: null
    };
  if (rawPath === '/privacy')
    return {
      locale: detectedLocale,
      page: 'privacy',
      toolSlug: null,
      blogSlug: null
    };
  if (rawPath === '/contact')
    return {
      locale: detectedLocale,
      page: 'contact',
      toolSlug: null,
      blogSlug: null
    };

  // Check if rawPath matches one of the Dedicated Tool Landing Pages
  const cleanCandidateSlug = rawPath.replace(/^\/+/, '');
  const matchedTool = getToolLandingBySlug(cleanCandidateSlug);
  if (matchedTool) {
    return {
      locale: detectedLocale,
      page: 'exactkb',
      toolSlug: matchedTool.slug,
      blogSlug: null
    };
  }

  return {
    locale: detectedLocale,
    page: 'exactkb',
    toolSlug: null,
    blogSlug: null
  };
}

export default function App() {
  const initialRoute = parseLocationRoute();
  const [activePage, setActivePage] = useState<AtelierPage>(initialRoute.page);
  const [activeToolSlug, setActiveToolSlug] = useState<string | null>(
    initialRoute.toolSlug
  );
  const [activeBlogSlug, setActiveBlogSlug] = useState<string | null>(
    initialRoute.blogSlug
  );
  const [locale, setLocale] = useState<LocaleCode>(initialRoute.locale);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Studio Calibration & Cross-Tool Bridge State
  const initialLanding = getToolLandingBySlug(initialRoute.toolSlug);
  const [exactKbPreset, setExactKbPreset] = useState<BiometricPresetId>(
    initialLanding ? initialLanding.presetId : 'schengen-35x45'
  );
  const [exactKbTarget, setExactKbTarget] = useState<number>(
    initialLanding ? initialLanding.targetKb : 50
  );
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
      setActiveToolSlug(parsed.toolSlug);
      setActiveBlogSlug(parsed.blogSlug);
      setLocale(parsed.locale);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Synchronize self-referencing <link rel="canonical">, subdirectory hreflang tags, <meta property="og:url">, and localized title/description
  useEffect(() => {
    const localizedPath = getLocalizedPath(
      locale,
      activePage,
      activeToolSlug,
      activeBlogSlug
    );
    const selfCanonicalUrl = `${SITE_ORIGIN}${localizedPath}`;

    let canonicalEl = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', selfCanonicalUrl);

    // Sync hreflang alternate links pointing to real subdirectory URLs (/fr/..., /es/..., /ar/...)
    const enUrl = `${SITE_ORIGIN}${getLocalizedPath('en', activePage, activeToolSlug, activeBlogSlug)}`;
    const frUrl = `${SITE_ORIGIN}${getLocalizedPath('fr', activePage, activeToolSlug, activeBlogSlug)}`;
    const esUrl = `${SITE_ORIGIN}${getLocalizedPath('es', activePage, activeToolSlug, activeBlogSlug)}`;
    const arUrl = `${SITE_ORIGIN}${getLocalizedPath('ar', activePage, activeToolSlug, activeBlogSlug)}`;

    const hreflangMap: Record<string, string> = {
      en: enUrl,
      fr: frUrl,
      es: esUrl,
      ar: arUrl,
      'x-default': enUrl
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
      ogUrlEl.setAttribute('content', selfCanonicalUrl);
    }

    // Blog page manages its own dynamic localized hub/article title & description
    if (activePage !== 'blog') {
      const toolLanding =
        activePage === 'exactkb' ? getToolLandingBySlug(activeToolSlug) : null;
      const meta = toolLanding
        ? {
            title: toolLanding.title[locale],
            description: toolLanding.metaDescription[locale]
          }
        : LOCALIZED_ROUTE_META[locale][activePage];

      document.title = meta.title;

      const descEl = document.querySelector('meta[name="description"]');
      if (descEl) descEl.setAttribute('content', meta.description);

      const ogTitleEl = document.querySelector('meta[property="og:title"]');
      if (ogTitleEl) ogTitleEl.setAttribute('content', meta.title);

      const ogDescEl = document.querySelector(
        'meta[property="og:description"]'
      );
      if (ogDescEl) ogDescEl.setAttribute('content', meta.description);

      const twTitleEl = document.querySelector('meta[name="twitter:title"]');
      if (twTitleEl) twTitleEl.setAttribute('content', meta.title);

      const twDescEl = document.querySelector(
        'meta[name="twitter:description"]'
      );
      if (twDescEl) twDescEl.setAttribute('content', meta.description);
    }
  }, [activePage, activeToolSlug, activeBlogSlug, locale]);

  const navigateToPage = useCallback(
    (
      page: AtelierPage,
      blogSlug: string | null = null,
      toolSlug: string | null = null
    ) => {
      const nextToolSlug = page === 'exactkb' ? toolSlug : null;
      const nextBlogSlug = page === 'blog' ? blogSlug : null;
      const targetUrl = getLocalizedPath(
        locale,
        page,
        nextToolSlug,
        nextBlogSlug
      );

      if (
        typeof window !== 'undefined' &&
        `${window.location.pathname}${window.location.search}` !== targetUrl
      ) {
        window.history.pushState({}, '', targetUrl);
      }
      setActivePage(page);
      setActiveToolSlug(nextToolSlug);
      setActiveBlogSlug(nextBlogSlug);

      if (nextToolSlug) {
        const landing = getToolLandingBySlug(nextToolSlug);
        if (landing) {
          setExactKbPreset(landing.presetId);
          setExactKbTarget(landing.targetKb);
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [locale]
  );

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: AtelierPage,
    blogSlug: string | null = null,
    toolSlug: string | null = null
  ) => {
    if (
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey &&
      e.button === 0
    ) {
      e.preventDefault();
      navigateToPage(page, blogSlug, toolSlug);
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
    navigateToPage('exactkb', null, null);
  };

  const handleLaunchPresetFromBlog = (
    presetId: BiometricPresetId,
    targetKb: number
  ) => {
    setBridgedQrDataUrl(null);
    setExactKbPreset(presetId);
    setExactKbTarget(targetKb);
    navigateToPage('exactkb', null, null);
  };

  const langPrefix = locale === 'en' ? '' : `/${locale}`;

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
            href={langPrefix || '/'}
            onClick={(e) => handleLinkClick(e, 'exactkb', null, null)}
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
              href={langPrefix || '/'}
              onClick={(e) => handleLinkClick(e, 'exactkb', null, null)}
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
              href={`${langPrefix}/qr`}
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

          {/* Zone 3: 4-Language Subdirectory Switcher (EN / FR / ES / AR) & Theme Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              role="group"
              aria-label="Language Selector"
              className="flex items-center rounded-lg border border-[#14213d]/20 dark:border-[#ffffff]/25 p-0.5"
            >
              {(['en', 'fr', 'es', 'ar'] as LocaleCode[]).map((code) => {
                const active = locale === code;
                const nextUrl = getLocalizedPath(
                  code,
                  activePage,
                  activeToolSlug,
                  activeBlogSlug
                );
                return (
                  <a
                    key={code}
                    href={nextUrl}
                    onClick={(e) => {
                      e.preventDefault();
                      setLocale(code);
                      if (typeof window !== 'undefined') {
                        window.history.pushState({}, '', nextUrl);
                      }
                    }}
                    className={`px-2 py-1 rounded-md text-xs font-mono font-bold uppercase transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#fca311] text-[#14213d]'
                        : 'hover:text-[#fca311]'
                    }`}
                  >
                    {code}
                  </a>
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
            activeToolSlug={activeToolSlug}
            initialPresetId={exactKbPreset}
            initialTargetKb={exactKbTarget}
            bridgedQrDataUrl={bridgedQrDataUrl}
            onClearBridgedQr={() => setBridgedQrDataUrl(null)}
            onSelectToolSlug={(slug) => navigateToPage('exactkb', null, slug)}
            onSelectBlogSlug={(slug) => navigateToPage('blog', slug, null)}
          />
        )}

        <Suspense
          fallback={
            <div className="max-w-5xl mx-auto px-6 py-16 text-center text-xs font-mono opacity-75">
              Loading Studio Module...
            </div>
          }
        >
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
            <InfoAndLegalPages
              activePage={activePage}
              onNavigate={(p) => navigateToPage(p, null, null)}
            />
          )}
        </Suspense>
      </main>

      <ProStudioFooter
        locale={locale}
        langPrefix={langPrefix}
        getLocalizedPath={getLocalizedPath}
        activePage={activePage}
        activeToolSlug={activeToolSlug}
        activeBlogSlug={activeBlogSlug}
        onSelectLocale={(code, nextUrl) => {
          setLocale(code);
          if (typeof window !== 'undefined') {
            window.history.pushState({}, '', nextUrl);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigate={handleLinkClick}
      />
    </div>
  );
}
