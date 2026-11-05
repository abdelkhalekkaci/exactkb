import React from 'react';
import {
  Camera,
  FileText,
  Globe,
  Grid,
  Layers,
  Lock,
  QrCode,
  Sliders
} from 'lucide-react';
import { AtelierPage, LocaleCode } from '../types/atelier';
import { TRANSLATIONS } from '../data/seoRoutesAndTranslations';

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
    ctaLabel: string;
  }>;
  colExactKb: string;
  colPortals: string;
  colTrustLegal: string;
  languageLabel: string;
  privacyGuarantee: string;
}

const FOOTER_PRO_COPY: Record<LocaleCode, FooterProCopy> = {
  en: {
    proRibbonKicker: 'INCLUDED FREE · NO WATERMARKS · NO SIGN-UP REQUIRED',
    proRibbonTitle:
      'Complete Passport, Visa & Exam Photo Studio — All Pro Tools Included Free',
    proRibbonSub:
      'Everything you need to prepare, align, and print official ID photos and signatures in one place. Select any tool below to use it:',
    freeFeatures: [
      {
        id: 'grid-framing',
        title: 'Face & Eye Alignment Guide',
        desc: 'Check official head size and eye level with zoom, tilt, and brightness adjustments.',
        ctaLabel: 'Open Alignment Guide'
      },
      {
        id: 'print-sheet',
        title: 'Printable 4×6" (10×15 cm) Sheet',
        desc: 'Generate a ready-to-print sheet of 8 passport or visa photos with cut marks.',
        ctaLabel: 'Create Print Sheet'
      },
      {
        id: 'name-slate',
        title: 'Add Name & Date on Photo',
        desc: 'Place a clean name and photo date banner at the bottom for exam applications.',
        ctaLabel: 'Add Name & Date'
      },
      {
        id: 'batch-queue',
        title: 'Batch Compress Multiple Photos',
        desc: 'Upload and compress several photos at once to your exact KB limit in one click.',
        ctaLabel: 'Open Batch Compressor'
      }
    ],
    colExactKb: 'Compress by KB Size',
    colPortals: 'Official Country & Exam Presets',
    colTrustLegal: 'Guides & Information',
    languageLabel: 'Language:',
    privacyGuarantee:
      '100% Private & Secure — Your photos are processed directly on your device and never uploaded.'
  },
  fr: {
    proRibbonKicker: '100 % GRATUIT · SANS FILIGRANE · SANS INSCRIPTION',
    proRibbonTitle:
      'Studio Photo d’Identité, Passeport & Signature — Tous les Outils Pro Gratuits',
    proRibbonSub:
      'Tout ce qu’il vous faut pour ajuster, vérifier et imprimer vos photos officielles et signatures. Cliquez sur un outil pour l’ouvrir :',
    freeFeatures: [
      {
        id: 'grid-framing',
        title: 'Guide d’Alignement Visage & Yeux',
        desc: 'Vérifiez la taille de la tête et la hauteur des yeux avec zoom, rotation et lumière.',
        ctaLabel: 'Ouvrir le Guide'
      },
      {
        id: 'print-sheet',
        title: 'Planche Imprimable 10×15 cm (8 Photos)',
        desc: 'Créez une planche de 8 photos d’identité prête à imprimer avec traits de coupe.',
        ctaLabel: 'Créer une Planche'
      },
      {
        id: 'name-slate',
        title: 'Bandeau Nom & Date sur Photo',
        desc: 'Ajoutez votre nom et la date de prise de vue en bas de la photo tout en restant sous 20 Ko / 50 Ko.',
        ctaLabel: 'Ajouter Nom & Date'
      },
      {
        id: 'batch-queue',
        title: 'Compression par Lot Multi-Photos',
        desc: 'Compressez plusieurs photos simultanément au poids exact en un seul clic.',
        ctaLabel: 'Compresser par Lot'
      }
    ],
    colExactKb: 'Compresser par Poids (Ko)',
    colPortals: 'Formats Officiels par Pays',
    colTrustLegal: 'Guides & Informations',
    languageLabel: 'Langue :',
    privacyGuarantee:
      '100 % Privé et Sécurisé — Vos photos sont traitées directement sur votre appareil et ne sont jamais envoyées.'
  },
  es: {
    proRibbonKicker: '100% GRATIS · SIN MARCAS DE AGUA · SIN REGISTRO',
    proRibbonTitle:
      'Estudio Completo de Fotos para Pasaporte, Visa y Firma — Herramientas Pro Gratis',
    proRibbonSub:
      'Todo lo que necesitas para encuadrar, verificar e imprimir tus fotos oficiales. Selecciona cualquier herramienta para abrirla:',
    freeFeatures: [
      {
        id: 'grid-framing',
        title: 'Guía de Alineación de Rostro y Ojos',
        desc: 'Verifica el tamaño de la cabeza y la altura de los ojos con zoom, rotación y brillo.',
        ctaLabel: 'Abrir Guía'
      },
      {
        id: 'print-sheet',
        title: 'Hoja Imprimible 10×15 cm (8 Fotos)',
        desc: 'Genera una plantilla lista para imprimir con 8 fotos y líneas de corte.',
        ctaLabel: 'Crear Hoja 10×15'
      },
      {
        id: 'name-slate',
        title: 'Añadir Nombre y Fecha en la Foto',
        desc: 'Coloca tu nombre y fecha de captura al pie de la foto manteniendo el límite de KB.',
        ctaLabel: 'Añadir Nombre y Fecha'
      },
      {
        id: 'batch-queue',
        title: 'Comprimir Múltiples Fotos por Lotes',
        desc: 'Sube y comprime varias fotos al mismo tiempo al peso exacto en KB.',
        ctaLabel: 'Comprimir por Lotes'
      }
    ],
    colExactKb: 'Comprimir por Peso (KB)',
    colPortals: 'Formatos Oficiales por País',
    colTrustLegal: 'Guías e Información',
    languageLabel: 'Idioma:',
    privacyGuarantee:
      '100% Privado y Seguro — Tus fotos se procesan directamente en tu dispositivo y nunca se suben a internet.'
  },
  ar: {
    proRibbonKicker: 'مجاني 100% · بدون علامة مائية · بدون تسجيل حساب',
    proRibbonTitle:
      'استوديو متكامل لصور جواز السفر والتأشيرات والتوقيع — جميع الأدوات الاحترافية مجاناً',
    proRibbonSub:
      'كل ما تحتاجه لضبط ومحاذاة وطباعة صورك الرسمية في مكان واحد. اختر أي أداة أدناه لتشغيلها مباشرة:',
    freeFeatures: [
      {
        id: 'grid-framing',
        title: 'شبكة محاذاة الوجه والعينين',
        desc: 'تحقق من مقاس الرأس ومستوى العينين مع أدوات التكبير والدوران وتعديل الإضاءة.',
        ctaLabel: 'فتح أداة المحاذاة'
      },
      {
        id: 'print-sheet',
        title: 'ورقة طباعة 10×15 سم (8 صور)',
        desc: 'احصل على ورقة جاهزة للطباعة تضم 8 صور شخصية مع علامات قص دقيقة.',
        ctaLabel: 'إنشاء ورقة الطباعة'
      },
      {
        id: 'name-slate',
        title: 'إضافة الاسم والتاريخ على الصورة',
        desc: 'أضف شريط الاسم وتاريخ الصورة أسفل الصورة الشخصية مع الحفاظ على الحجم بالكيلوبايت.',
        ctaLabel: 'إضافة الاسم والتاريخ'
      },
      {
        id: 'batch-queue',
        title: 'ضغط عدة صور دفعة واحدة',
        desc: 'ارفع واضغط مجموعة من الصور في وقت واحد بالحجم الدقيق بالكيلوبايت بنقرة واحدة.',
        ctaLabel: 'فتح ضغط الدفعات'
      }
    ],
    colExactKb: 'ضغط حسب الحجم بالكيلوبايت',
    colPortals: 'المقاسات الرسمية حسب الدولة',
    colTrustLegal: 'الأدلة والمعلومات',
    languageLabel: 'اللغة:',
    privacyGuarantee:
      'خصوصية وأمان 100% — تتم معالجة صورك مباشرة على جهازك ولا يتم رفعها إلى أي خادم.'
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
      {/* TOP RIBBON: FREE PRO TOOLS FOR VISITORS */}
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
                <div className="pt-2 border-t border-[#ffffff]/10 text-xs font-bold text-[#fca311] flex items-center justify-between">
                  <span>{feat.ctaLabel}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN 4-COLUMN VISITOR DIRECTORY */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Column 1 (4 cols): Brand Identity & Language Switcher */}
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
              <span className="font-serif text-xl font-bold tracking-tight text-[#ffffff] block leading-none">
                Compress<span className="text-[#fca311]">Photo</span>
              </span>
            </a>

            <p className="text-xs text-[#ffffff]/75 leading-relaxed">
              {t.footerDesc}
            </p>

            {/* Language Selector */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-[#ffffff]/70">
                <Globe className="w-3.5 h-3.5 text-[#fca311]" />
                <span>{copy.languageLabel}</span>
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
          </div>

          {/* Column 2 (2 cols): Exact-KB Compressors */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#fca311]">
              {copy.colExactKb}
            </div>
            <ul className="space-y-2 text-xs text-[#ffffff]/85">
              <li>
                <a
                  href={`${langPrefix}/compress-photo-to-10kb`}
                  onClick={(e) =>
                    onNavigate(e, 'exactkb', null, 'compress-photo-to-10kb')
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  Compress Photo to 10 KB
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/compress-photo-to-20kb`}
                  onClick={(e) =>
                    onNavigate(e, 'exactkb', null, 'compress-photo-to-20kb')
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  Compress Photo to 20 KB
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/compress-photo-to-30kb`}
                  onClick={(e) =>
                    onNavigate(e, 'exactkb', null, 'compress-photo-to-30kb')
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  Compress Photo to 30 KB
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
                  Compress Photo to 50 KB
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
                  Compress Photo to 100 KB
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
                  Compress Photo to 200 KB
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
                  Signature Under 20 KB
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
            <div className="text-xs font-bold uppercase tracking-wider text-[#fca311]">
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
                  🇫🇷 France ANTS (35×45 mm)
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
                  🇲🇦 Morocco CNIE &amp; Passport (35×45 mm)
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/campus-france-photo-50ko`}
                  onClick={(e) =>
                    onNavigate(e, 'exactkb', null, 'campus-france-photo-50ko')
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  🎓 Campus France (50 Ko · 35×45 mm)
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
                  🇺🇸 US Visa DS-160 &amp; Green Card (2×2&quot;)
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/uk-passport-photo-35x45mm`}
                  onClick={(e) =>
                    onNavigate(
                      e,
                      'exactkb',
                      null,
                      'uk-passport-photo-35x45mm'
                    )
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  🇬🇧 UK Passport &amp; Visa (35×45 mm)
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/canada-passport-visa-photo-50x70mm`}
                  onClick={(e) =>
                    onNavigate(
                      e,
                      'exactkb',
                      null,
                      'canada-passport-visa-photo-50x70mm'
                    )
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  🇨🇦 Canada Passport &amp; Visa (50×70 mm)
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/ssc-upsc-ibps-photo-signature-resizer`}
                  onClick={(e) =>
                    onNavigate(
                      e,
                      'exactkb',
                      null,
                      'ssc-upsc-ibps-photo-signature-resizer'
                    )
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  🇮🇳 SSC, UPSC, IBPS &amp; NEET (+ Name/Date)
                </a>
              </li>
              <li>
                <a
                  href={`${langPrefix}/passport-photo-4x6-print-sheet`}
                  onClick={(e) =>
                    onNavigate(
                      e,
                      'exactkb',
                      null,
                      'passport-photo-4x6-print-sheet'
                    )
                  }
                  className="hover:text-[#fca311] transition-colors block"
                >
                  🖨️ 4×6&quot; (10×15 cm) 8-Photo Print Sheet
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 (3 cols): Guides, QR Studio & Legal Pages */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#fca311]">
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
                  <span>{t.navBlog}</span>
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

        {/* CLEAN VISITOR BOTTOM BAR (NO SITEMAP, NO LLMS.TXT, NO DEVELOPER KEYWORDS) */}
        <div className="pt-8 border-t border-[#ffffff]/12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#ffffff]/70">
          <div className="flex items-center gap-2 text-center sm:text-start">
            <Lock className="w-3.5 h-3.5 text-[#fca311] shrink-0" />
            <span>{copy.privacyGuarantee}</span>
          </div>

          <div className="text-[#ffffff]/60 shrink-0">
            © {new Date().getFullYear()} CompressPhoto (compressphoto.space).
          </div>
        </div>
      </div>
    </footer>
  );
};
