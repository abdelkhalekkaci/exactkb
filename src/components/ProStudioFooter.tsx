import React from 'react';
import {
  Camera,
  CheckCircle2,
  FileText,
  Globe,
  Grid,
  Layers,
  Lock,
  QrCode,
  ShieldCheck,
  Sliders
} from 'lucide-react';
import { AtelierPage, LocaleCode } from '../types/atelier';
import { TRANSLATIONS } from '../data/seoRoutesAndTranslations';
import { TOOL_LANDING_PAGES } from '../data/toolLandingPages';

export type ProFeatureId =
  | 'grid-framing'
  | 'print-sheet'
  | 'name-slate'
  | 'batch-queue';

interface ProStudioFooterProps {
  locale: LocaleCode;
  langPrefix: string;
  getLocalizedPath: (
    loc: LocaleCode,
    page: AtelierPage,
    toolSlug?: string | null,
    blogSlug?: string | null
  ) => string;
  activePage: AtelierPage;
  activeToolSlug: string | null;
  activeBlogSlug: string | null;
  onSelectLocale: (code: LocaleCode, nextUrl: string) => void;
  onNavigate: (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: AtelierPage,
    blogSlug?: string | null,
    toolSlug?: string | null
  ) => void;
  onActivateProFeature?: (featureId: ProFeatureId) => void;
}

interface FooterProCopy {
  proRibbonKicker: string;
  proRibbonTitle: string;
  proRibbonSub: string;
  freeFeatures: Array<{
    id: ProFeatureId;
    title: string;
    desc: string;
    competitorPrice: string;
  }>;
  colExactKb: string;
  colPortals: string;
  colStudioGuides: string;
  colTrustLegal: string;
  openSourceLabel: string;
  standardsLine: string;
  zeroUploadGuarantee: string;
}

const FOOTER_PRO_COPY: Record<LocaleCode, FooterProCopy> = {
  en: {
    proRibbonKicker: 'ZERO PAYWALLS · ZERO WATERMARKS · 100% FREE FOREVER',
    proRibbonTitle:
      'Premium Studio Capabilities Other Websites Charge $7–$19 For — Included Free',
    proRibbonSub:
      'Because all image processing runs locally inside your own browser RAM, our server cost per photo is $0.00. Click any Pro feature below to launch it in the studio:',
    freeFeatures: [
      {
        id: 'grid-framing',
        title: 'Biometric ICAO Face Grid & Framing',
        desc: 'Live eye-line & crown-to-chin overlay with pan, zoom, tilt & lighting controls.',
        competitorPrice: '$9.95 on photo booths → LAUNCH FREE'
      },
      {
        id: 'print-sheet',
        title: '4×6" (10×15 cm) 8-Photo Print Sheet',
        desc: '300 DPI pharmacy print sheet with millimeter crop marks & studio date stamp.',
        competitorPrice: '$6.99 on ID sites → LAUNCH FREE'
      },
      {
        id: 'name-slate',
        title: 'Official Name & Date Photo Slate',
        desc: '1-click DOP name & date plate at the bottom of your photo locked under 20KB/50KB.',
        competitorPrice: 'Paid Pro add-on → LAUNCH FREE'
      },
      {
        id: 'batch-queue',
        title: 'Unlimited Multi-Photo Batch Queue',
        desc: 'Drop multiple photos at once and lock every file to your exact KB ceiling simultaneously.',
        competitorPrice: '$12/mo on cloud tools → LAUNCH FREE'
      }
    ],
    colExactKb: 'Exact-KB Compressors',
    colPortals: 'Official Portal Presets',
    colStudioGuides: 'Vector Studio & Guides',
    colTrustLegal: 'Trust, Privacy & Standards',
    openSourceLabel: 'Auditable Open-Source Engine (GitHub)',
    standardsLine:
      'ICAO Doc 9303 · ISO/IEC 19794-5 · US CEAC DS-160 · ISO-32000-1 PDF · 300 DPI JFIF',
    zeroUploadGuarantee:
      '100% Client-Side RAM Execution — Zero Bytes Ever Leave Your Device (GDPR Compliant)'
  },
  fr: {
    proRibbonKicker: 'ZÉRO ABONNEMENT · ZÉRO FILIGRANE · 100 % GRATUIT À VIE',
    proRibbonTitle:
      'Les Options Payantes ailleurs (7 € à 19 €) — Intégrées 100 % Gratuitement',
    proRibbonSub:
      'Comme tout le calcul s’exécute dans la mémoire RAM de votre propre appareil, nos serveurs ne coûtent rien par photo. Cliquez sur une fonction Pro pour l’activer :',
    freeFeatures: [
      {
        id: 'grid-framing',
        title: 'Grille Biométrique OACI & Recadrage Pro',
        desc: 'Alignement yeux/menton en direct avec zoom, déplacement, rotation et luminosité.',
        competitorPrice: '8,90 € en cabine → LANCER GRATUIT'
      },
      {
        id: 'print-sheet',
        title: 'Planche 10×15 cm (4×6") de 8 Photos',
        desc: 'Planche 300 DPI prête à imprimer avec traits de coupe millimétrés et tampon date.',
        competitorPrice: '5,99 € ailleurs → LANCER GRATUIT'
      },
      {
        id: 'name-slate',
        title: 'Bandeau Officiel Nom + Date sur Photo',
        desc: 'Ajoutez votre nom et la date de prise de vue en bas de la photo sous 20 Ko / 50 Ko.',
        competitorPrice: 'Option Pro payante → LANCER GRATUIT'
      },
      {
        id: 'batch-queue',
        title: 'Compression par Lot (Batch Illimité)',
        desc: 'Compressez plusieurs photos simultanément au Ko exact sans limite quotidienne.',
        competitorPrice: '12 €/mois ailleurs → LANCER GRATUIT'
      }
    ],
    colExactKb: 'Compression au Ko Exact',
    colPortals: 'Portails Officiels & Pays',
    colStudioGuides: 'Studio QR & Guides',
    colTrustLegal: 'Confiance, RGPD & Normes',
    openSourceLabel: 'Code Open-Source Auditable (GitHub)',
    standardsLine:
      'OACI Doc 9303 · ISO/IEC 19794-5 (ANTS / CNIE) · US DS-160 · PDF ISO-32000-1 · 300 DPI',
    zeroUploadGuarantee:
      'Exécution 100 % Locale en RAM — Aucun Fichier Envoyé sur Serveur (Conforme RGPD)'
  },
  es: {
    proRibbonKicker: 'CERO SUSCRIPCIONES · CERO MARCAS DE AGUA · 100% GRATIS',
    proRibbonTitle:
      'Funciones Pro por las que otros sitios cobran $7–$19 — Aquí 100% Gratis',
    proRibbonSub:
      'Como todo el procesamiento ocurre localmente en la memoria RAM de tu navegador, incluimos gratis todas las herramientas avanzadas de estudio. Haz clic para activar:',
    freeFeatures: [
      {
        id: 'grid-framing',
        title: 'Guía Biométrica OACI y Encuadre Pro',
        desc: 'Alineación de ojos y barbilla con controles de zoom, rotación, encuadre y luz.',
        competitorPrice: '$9.95 en otros sitios → ABRIR GRATIS'
      },
      {
        id: 'print-sheet',
        title: 'Hoja 10×15 cm (4×6") con 8 Fotos',
        desc: 'Plantilla de impresión a 300 DPI con guías de corte milimétricas y sello de fecha.',
        competitorPrice: '$6.99 en otros sitios → ABRIR GRATIS'
      },
      {
        id: 'name-slate',
        title: 'Rótulo Oficial Nombre + Fecha en Foto',
        desc: 'Inserta tu nombre y fecha de captura al pie de la foto manteniendo el límite de 20KB/50KB.',
        competitorPrice: 'Función Pro de pago → ABRIR GRATIS'
      },
      {
        id: 'batch-queue',
        title: 'Compresión por Lotes Ilimitada (Batch)',
        desc: 'Comprime múltiples fotos simultáneamente al KB exacto sin límites diarios.',
        competitorPrice: '$12/mes en otros sitios → ABRIR GRATIS'
      }
    ],
    colExactKb: 'Compresión por KB Exacto',
    colPortals: 'Portales Oficiales y Visas',
    colStudioGuides: 'Estudio QR y Guías',
    colTrustLegal: 'Confianza, Privacidad y Legal',
    openSourceLabel: 'Motor de Código Abierto Auditable (GitHub)',
    standardsLine:
      'OACI Doc 9303 · ISO/IEC 19794-5 · US CEAC DS-160 · PDF ISO-32000-1 · 300 DPI JFIF',
    zeroUploadGuarantee:
      'Procesamiento 100% Local en RAM — Cero Archivos Subidos a Servidores (RGPD)'
  },
  ar: {
    proRibbonKicker: 'بدون اشتراكات · بدون علامة مائية · مجاني 100% مدى الحياة',
    proRibbonTitle:
      'ميزات احترافية مدفوعة في المواقع الأخرى (7$ إلى 19$) — متاحة هنا مجاناً بالكامل',
    proRibbonSub:
      'لأن جميع عمليات المعالجة تتم محلياً داخل ذاكرة متصفحك (RAM)، نوفر لك جميع أدوات الاستوديو الاحترافية مجاناً. انقر على أي ميزة لتشغيلها:',
    freeFeatures: [
      {
        id: 'grid-framing',
        title: 'شبكة المحاذاة البيومترية ICAO والتحكم بالصورة',
        desc: 'محاذاة دقيقة للعينين والذقن مع التحكم بالتكبير والإزاحة والدوران والإضاءة.',
        competitorPrice: '9.95$ في المواقع الأخرى ← تشغيل مجاناً'
      },
      {
        id: 'print-sheet',
        title: 'ورقة طباعة 10×15 سم (4×6 بوصة) تضم 8 صور',
        desc: 'جاهزة للطباعة بدقة 300 DPI مع علامات قص بالمليمتر وختم التاريخ.',
        competitorPrice: '6.99$ في المواقع الأخرى ← تشغيل مجاناً'
      },
      {
        id: 'name-slate',
        title: 'شريط الاسم وتاريخ الصورة الرسمي (DOP)',
        desc: 'إضافة الاسم وتاريخ التقاط الصورة أسفل الصورة الشخصية مع تثبيت الحجم تحت 20 أو 50 كيلوبايت.',
        competitorPrice: 'ميزة مدفوعة ← تشغيل مجاناً'
      },
      {
        id: 'batch-queue',
        title: 'ضغط دفعات متعددة من الصور (Batch) بلا حدود',
        desc: 'ارفع واضغط عشرات الصور دفعة واحدة بالكيلوبايت الدقيق بدون أي قيود يومية.',
        competitorPrice: '12$/شهرياً ← تشغيل مجاناً'
      }
    ],
    colExactKb: 'ضغط بالكيلوبايت الدقيق',
    colPortals: 'البوابات الحكومية الرسمية',
    colStudioGuides: 'استوديو QR والأدلة التقنية',
    colTrustLegal: 'الخصوصية والمعايير القانونية',
    openSourceLabel: 'محرك مفتوح المصدر قابل للتدقيق (GitHub)',
    standardsLine:
      'ICAO Doc 9303 · ISO/IEC 19794-5 · US DS-160 · ISO-32000-1 PDF · 300 DPI JFIF',
    zeroUploadGuarantee:
      'معالجة محلية 100% داخل الذاكرة — لا تغادر صورك جهازك أبداً (متوافق مع GDPR)'
  }
};

export const ProStudioFooter: React.FC<ProStudioFooterProps> = ({
  locale,
  langPrefix,
  getLocalizedPath,
  activePage,
  activeToolSlug,
  activeBlogSlug,
  onSelectLocale,
  onNavigate,
  onActivateProFeature
}) => {
  const t = TRANSLATIONS[locale];
  const copy = FOOTER_PRO_COPY[locale];

  const featureIcons = [
    <Sliders key="grid" className="w-4 h-4 text-[#fca311] shrink-0" />,
    <Grid key="sheet" className="w-4 h-4 text-[#fca311] shrink-0" />,
    <FileText key="slate" className="w-4 h-4 text-[#fca311] shrink-0" />,
    <Layers key="batch" className="w-4 h-4 text-[#fca311] shrink-0" />
  ];

  return (
    <footer className="mt-20 border-t border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#14213d] text-[#ffffff]">
      {/* TOP ARCHITECTURAL RIBBON: PAID-ELSEWHERE PRO FEATURES INCLUDED FREE */}
      <div className="border-b border-[#ffffff]/10 bg-[#1b2c52]/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#fca311]">
              {copy.proRibbonKicker}
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#ffffff]">
              {copy.proRibbonTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#ffffff]/75 leading-relaxed">
              {copy.proRibbonSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {copy.freeFeatures.map((feat, idx) => (
              <button
                key={feat.id}
                type="button"
                onClick={() => onActivateProFeature?.(feat.id)}
                className="p-4 rounded-xl border border-[#ffffff]/15 hover:border-[#fca311] bg-[#14213d]/85 hover:bg-[#14213d] text-start flex flex-col justify-between space-y-3 transition-all group cursor-pointer"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    {featureIcons[idx]}
                    <h3 className="text-xs sm:text-sm font-bold text-[#ffffff] group-hover:text-[#fca311] transition-colors leading-snug">
                      {feat.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#ffffff]/70 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#ffffff]/10 text-[11px] font-mono font-semibold text-[#fca311] flex items-center justify-between">
                  <span>✓ {feat.competitorPrice}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN 5-COLUMN STUDIO DIRECTORY */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Column 1 (4 cols): Brand Identity, Architecture & Language Switcher */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href={langPrefix || '/'}
              onClick={(e) => onNavigate(e, 'exactkb', null, null)}
              className="inline-flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#ffffff] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
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
                    stroke="#14213d"
                    strokeWidth="4.5"
                  />
                  <circle cx="32" cy="32" r="4.5" fill="#fca311" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-[#ffffff] block leading-none">
                  Compress<span className="text-[#fca311]">Photo</span>
                </span>
                <span className="text-[10px] font-mono text-[#ffffff]/60 tracking-wider uppercase">
                  compressphoto.space
                </span>
              </div>
            </a>

            <p className="text-xs text-[#ffffff]/75 leading-relaxed">
              {t.footerDesc}
            </p>

            {/* Interactive Subdirectory Language Selector */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#ffffff]/65">
                <Globe className="w-3.5 h-3.5 text-[#fca311]" />
                <span>Studio Editions:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {(
                  [
                    { code: 'en', label: 'English' },
                    { code: 'fr', label: 'Français' },
                    { code: 'es', label: 'Español' },
                    { code: 'ar', label: 'العربية' }
                  ] as const
                ).map((item) => {
                  const isCurrent = locale === item.code;
                  const nextUrl = getLocalizedPath(
                    item.code,
                    activePage,
                    activeToolSlug,
                    activeBlogSlug
                  );
                  return (
                    <a
                      key={item.code}
                      href={nextUrl}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectLocale(item.code, nextUrl);
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#fca311] text-[#14213d] font-bold'
                          : 'bg-[#ffffff]/10 text-[#ffffff]/85 hover:bg-[#ffffff]/20'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-1">
              <a
                href="https://github.com/abdelkhalekkaci/exactkb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#fca311] hover:underline"
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{copy.openSourceLabel}</span>
              </a>
            </div>
          </div>

          {/* Column 2 (2 cols): Exact-KB Compressors */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#fca311]">
              {copy.colExactKb}
            </div>
            <ul className="space-y-2 text-xs text-[#ffffff]/85">
              <li>
                <a
                  href={`${langPrefix}/compress-photo-to-20kb`}
                  onClick={(e) =>
                    onNavigate(e, 'exactkb', null, 'compress-photo-to-20kb')
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  20 KB Photo Compressor
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/compress-photo-to-50kb`}
                  onClick={(e) =>
                    onNavigate(e, 'exactkb', null, 'compress-photo-to-50kb')
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  50 KB Passport &amp; Visa
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/compress-photo-to-100kb`}
                  onClick={(e) =>
                    onNavigate(e, 'exactkb', null, 'compress-photo-to-100kb')
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  100 KB High-Clarity
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/compress-photo-to-200kb`}
                  onClick={(e) =>
                    onNavigate(e, 'exactkb', null, 'compress-photo-to-200kb')
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  200 KB High-Res Lock
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/compress-signature-to-20kb`}
                  onClick={(e) =>
                    onNavigate(e, 'exactkb', null, 'compress-signature-to-20kb')
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  Signature &lt; 20 KB
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/compress-photo-to-pdf-under-50kb`}
                  onClick={(e) =>
                    onNavigate(
                      e,
                      'exactkb',
                      null,
                      'compress-photo-to-pdf-under-50kb'
                    )
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  Photo to PDF &le; 50 KB
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 (3 cols): Official Government & Exam Portals */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#fca311]">
              {copy.colPortals}
            </div>
            <ul className="space-y-2 text-xs text-[#ffffff]/85">
              <li>
                <a
                  href={`${langPrefix}/ants-photo-identite-50ko`}
                  onClick={(e) =>
                    onNavigate(e, 'exactkb', null, 'ants-photo-identite-50ko')
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  🇫🇷 France ANTS &amp; ANEF (35×45mm · 50Ko)
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/photo-cnie-maroc-35x45mm`}
                  onClick={(e) =>
                    onNavigate(e, 'exactkb', null, 'photo-cnie-maroc-35x45mm')
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  🇲🇦 Maroc CNIE &amp; Passeport (35×45mm)
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/ds160-photo-compressor-600x600`}
                  onClick={(e) =>
                    onNavigate(
                      e,
                      'exactkb',
                      null,
                      'ds160-photo-compressor-600x600'
                    )
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  🇺🇸 US Visa DS-160 &amp; DV Lottery (2×2&quot;)
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/passport-photo-35x45mm-50kb`}
                  onClick={(e) =>
                    onNavigate(
                      e,
                      'exactkb',
                      null,
                      'passport-photo-35x45mm-50kb'
                    )
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  🇪🇺 Schengen &amp; ICAO Passport (413×531 px)
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/ssc-upsc-photo-signature-20kb`}
                  onClick={(e) =>
                    onNavigate(
                      e,
                      'exactkb',
                      null,
                      'ssc-upsc-photo-signature-20kb'
                    )
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  🇮🇳 SSC, UPSC, IBPS &amp; NEET (20 KB)
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/amazon-1000x1000-white-background-photo`}
                  onClick={(e) =>
                    onNavigate(
                      e,
                      'exactkb',
                      null,
                      'amazon-1000x1000-white-background-photo'
                    )
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  📦 Amazon 1000×1000 Pure White Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 (3 cols): Studio Modules, Guides, Legal & AI Catalog */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#fca311]">
              {copy.colTrustLegal}
            </div>
            <ul className="space-y-2 text-xs text-[#ffffff]/85">
              <li>
                <a
                  href={`${langPrefix}/blog`}
                  onClick={(e) => onNavigate(e, 'blog')}
                  className="hover:text-[#fca311] transition-colors flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-[#fca311]" />
                  <span>{t.navBlog} (20 Tutorials)</span>
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/qr`}
                  onClick={(e) => onNavigate(e, 'qr')}
                  className="hover:text-[#fca311] transition-colors flex items-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#fca311]" />
                  <span>{t.navQrStudio}</span>
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/about`}
                  onClick={(e) => onNavigate(e, 'about')}
                  className="hover:text-[#fca311] transition-colors block"
                >
                  {t.navAbout}
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/privacy`}
                  onClick={(e) => onNavigate(e, 'privacy')}
                  className="hover:text-[#fca311] transition-colors block"
                >
                  {t.navPrivacy}
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/legal`}
                  onClick={(e) => onNavigate(e, 'legal')}
                  className="hover:text-[#fca311] transition-colors block"
                >
                  {t.navLegal}
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/contact`}
                  onClick={(e) => onNavigate(e, 'contact')}
                  className="hover:text-[#fca311] transition-colors block"
                >
                  {t.navContact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM ARCHITECTURAL BAR: STANDARDS, SITEMAP/LLMS LINKS & COPYRIGHT */}
        <div className="pt-8 border-t border-[#ffffff]/12 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-[#ffffff]/75">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#fca311] shrink-0" />
              <span>{copy.zeroUploadGuarantee}</span>
            </div>
            <div className="font-mono text-[11px] text-[#ffffff]/60">
              {copy.standardsLine}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#ffffff]/60 pt-2">
            <div>
              © {new Date().getFullYear()} CompressPhoto (compressphoto.space).
              All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fca311] transition-colors"
              >
                Sitemap.xml (156 URLs)
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fca311] transition-colors"
              >
                llms.txt
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/llms-full.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fca311] transition-colors"
              >
                llms-full.txt
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
