import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  HelpCircle,
  Search,
  Sliders,
  Sparkles,
  Tag,
  Zap
} from 'lucide-react';
import { BiometricPresetId, LocaleCode } from '../types/atelier';
import {
  MASTER_PHOTO_KEYWORDS,
  PHOTO_SEO_ARTICLES,
  PhotoSeoArticle,
  SeoKeywordCluster
} from '../data/photoSeoArticles';

interface SeoBlogPageProps {
  locale: LocaleCode;
  onLaunchPreset: (presetId: BiometricPresetId, targetKb: number) => void;
}

interface BlogUiCopy {
  badge: string;
  heroTitle: string;
  heroSub: string;
  tabArticles: string;
  tabKeywords: string;
  searchPlaceholder: string;
  catAll: string;
  catExactKb: string;
  catPassport: string;
  catSignature: string;
  catPdfPrint: string;
  readGuideBtn: string;
  backToAllGuides: string;
  targetKeywordsLabel: string;
  specDimensionsLabel: string;
  specByteLimitLabel: string;
  proTipLabel: string;
  faqHeading: string;
  relatedGuidesHeading: string;
  keywordMatrixTitle: string;
  keywordMatrixSub: string;
  colKeyword: string;
  colCategory: string;
  colPresetSpec: string;
  colAction: string;
  openArticleBtn: string;
  launchToolShortBtn: string;
  qrStrategyBannerTitle: string;
  qrStrategyBannerSub: string;
  articlesCountLabel: string;
  keywordsCountLabel: string;
}

const BLOG_UI_COPY: Record<LocaleCode, BlogUiCopy> = {
  en: {
    badge: 'SEO KNOWLEDGE HUB · PHOTO COMPRESSION EDITION',
    heroTitle: 'Photo Compression Guides & Exact-KB Keyword Directory',
    heroSub:
      'Step-by-step calibration guides for 20KB, 50KB, 100KB, US Visa 2×2", Schengen 35×45mm, and handwritten signatures — with 1-click preset buttons that open the compressor pre-set for your document.',
    tabArticles: '10 SEO Guides & Tutorials',
    tabKeywords: 'Master SEO Keyword Directory (30+)',
    searchPlaceholder: 'Search keywords or guides (e.g. 20kb, passport, signature, 50kb)...',
    catAll: 'All Topics (10)',
    catExactKb: 'Exact KB Limits',
    catPassport: 'Passport & Visa',
    catSignature: 'Wet-Ink Signature',
    catPdfPrint: 'PDF & 4×6" Print',
    readGuideBtn: 'Read Full Guide',
    backToAllGuides: 'Back to All 10 Guides',
    targetKeywordsLabel: 'Targeted High-Search Keywords',
    specDimensionsLabel: 'Target Dimensions',
    specByteLimitLabel: 'Strict Byte Ceiling',
    proTipLabel: 'Studio Calibration Pro Tip',
    faqHeading: 'Frequently Asked Questions',
    relatedGuidesHeading: 'More Photo Compression Guides',
    keywordMatrixTitle: 'Complete Photo Compression SEO Keyword Matrix',
    keywordMatrixSub:
      'Every high-intent search query targeted by CompressPhoto.space, mapped directly to its matching guide and 1-click tool preset.',
    colKeyword: 'Searchable Keyword Phrase',
    colCategory: 'Category & Intent',
    colPresetSpec: 'Target KB',
    colAction: '1-Click Action',
    openArticleBtn: 'Guide',
    launchToolShortBtn: 'Launch Preset →',
    qrStrategyBannerTitle: 'Phase 1: Photo Compression Complete · Next Up: QR Code SEO Hub',
    qrStrategyBannerSub:
      'All 10 Photo Compression articles and 30+ keywords are live in EN, FR, ES & AR. Ready to replicate this exact SEO strategy for QR Code & Barcode keywords whenever you want.',
    articlesCountLabel: '10 Complete Multilingual Articles',
    keywordsCountLabel: '30+ High-Intent Keywords per Language'
  },
  fr: {
    badge: 'CENTRE DE GUIDES SEO · ÉDITION COMPRESSION PHOTO',
    heroTitle: 'Guides de Compression Photo au Ko Exact & Mots-Clés SEO',
    heroSub:
      'Tutoriels pas-à-pas pour compresser vos photos à 20 Ko, 50 Ko, 100 Ko, Visa USA 2×2", Passeport 35×45 mm et signatures manuscrites — avec bouton 1-clic pour ouvrir l’outil pré-calibré.',
    tabArticles: '10 Guides & Tutoriels SEO',
    tabKeywords: 'Répertoire Mots-Clés SEO (30+)',
    searchPlaceholder: 'Rechercher un mot-clé ou un guide (ex: 20 ko, passeport, signature, 50 ko)...',
    catAll: 'Tous les Sujets (10)',
    catExactKb: 'Limites Ko Exactes',
    catPassport: 'Passeport & Visa',
    catSignature: 'Signature Manuscrite',
    catPdfPrint: 'PDF & Planche 10×15',
    readGuideBtn: 'Lire le Guide Complet',
    backToAllGuides: 'Retour aux 10 Guides',
    targetKeywordsLabel: 'Mots-Clés SEO Ciblés',
    specDimensionsLabel: 'Dimensions Cibles',
    specByteLimitLabel: 'Plafond Strict en Octets',
    proTipLabel: 'Conseil Pro de Calibrage',
    faqHeading: 'Questions Fréquentes (FAQ)',
    relatedGuidesHeading: 'Autres Guides de Compression Photo',
    keywordMatrixTitle: 'Matrice Complète des Mots-Clés SEO Compression Photo',
    keywordMatrixSub:
      'Toutes les requêtes à forte intention ciblées par CompressPhoto.space, reliées à leur article dédié et au préréglage 1-clic.',
    colKeyword: 'Expression Clé Recherchée',
    colCategory: 'Catégorie & Intention',
    colPresetSpec: 'Cible Ko',
    colAction: 'Action 1-Clic',
    openArticleBtn: 'Guide',
    launchToolShortBtn: 'Ouvrir Outil →',
    qrStrategyBannerTitle: 'Phase 1 : Compression Photo Active · Prochaine Étape : SEO QR Code',
    qrStrategyBannerSub:
      'Les 10 articles de compression photo et plus de 30 mots-clés sont actifs en EN, FR, ES et AR. Cette même architecture est prête à être dupliquée pour le générateur QR Code.',
    articlesCountLabel: '10 Articles Multilingues Complets',
    keywordsCountLabel: '30+ Mots-Clés par Langue'
  },
  es: {
    badge: 'CENTRO DE GUÍAS SEO · EDICIÓN COMPRESIÓN DE FOTOS',
    heroTitle: 'Guías de Compresión de Fotos al KB Exacto y Palabras Clave',
    heroSub:
      'Guías paso a paso para comprimir fotos a 20KB, 50KB, 100KB, Visa EE.UU. 2×2", Pasaporte 35×45mm y firmas manuscritas — con botón de 1 clic para abrir la herramienta preconfigurada.',
    tabArticles: '10 Guías y Tutoriales SEO',
    tabKeywords: 'Directorio de Palabras Clave (30+)',
    searchPlaceholder: 'Buscar palabra clave o guía (ej: 20kb, pasaporte, firma, 50kb)...',
    catAll: 'Todos los Temas (10)',
    catExactKb: 'Límites KB Exactos',
    catPassport: 'Pasaporte y Visa',
    catSignature: 'Firma Manuscrita',
    catPdfPrint: 'PDF y Hoja 10×15',
    readGuideBtn: 'Leer Guía Completa',
    backToAllGuides: 'Volver a las 10 Guías',
    targetKeywordsLabel: 'Palabras Clave SEO Objetivo',
    specDimensionsLabel: 'Dimensiones Objetivo',
    specByteLimitLabel: 'Límite Estricto de Bytes',
    proTipLabel: 'Consejo Pro de Calibración',
    faqHeading: 'Preguntas Frecuentes (FAQ)',
    relatedGuidesHeading: 'Más Guías de Compresión de Fotos',
    keywordMatrixTitle: 'Matriz Completa de Palabras Clave SEO de Compresión de Fotos',
    keywordMatrixSub:
      'Todas las búsquedas de alta intención cubiertas por CompressPhoto.space, conectadas con su guía y ajuste preestablecido en 1 clic.',
    colKeyword: 'Palabra Clave Buscada',
    colCategory: 'Categoría e Intención',
    colPresetSpec: 'KB Objetivo',
    colAction: 'Acción 1-Clic',
    openArticleBtn: 'Guía',
    launchToolShortBtn: 'Abrir Ajuste →',
    qrStrategyBannerTitle: 'Fase 1: Compresión de Fotos Lista · Siguiente Paso: SEO Código QR',
    qrStrategyBannerSub:
      'Los 10 artículos de compresión de fotos y más de 30 palabras clave están activos en EN, FR, ES y AR, listos para replicar la estrategia con Códigos QR.',
    articlesCountLabel: '10 Artículos Multilingües Completos',
    keywordsCountLabel: '30+ Palabras Clave por Idioma'
  },
  ar: {
    badge: 'مركز الأدلة والكلمات المفتاحية · إصدار ضغط الصور',
    heroTitle: 'أدلة ضغط الصور بالكيلوبايت الدقيق ودليل الكلمات المفتاحية',
    heroSub:
      'شروحات مفصلة خطوة بخطوة لضغط الصور إلى 20KB و50KB و100KB وتأشيرة أمريكا 2×2 بوصة وجواز السفر 35×45 مم والتوقيع الخطي — مع زر بنقرة واحدة لفتح الأداة مضبوطة مسبقاً.',
    tabArticles: '10 مقالات وأدلة شاملة',
    tabKeywords: 'دليل الكلمات المفتاحية (30+)',
    searchPlaceholder: 'ابحث عن كلمة مفتاحية أو مقال (مثال: 20 كيلوبايت، جواز سفر، توقيع)...',
    catAll: 'جميع المواضيع (10)',
    catExactKb: 'حدود الكيلوبايت الدقيقة',
    catPassport: 'جواز السفر والتأشيرة',
    catSignature: 'التوقيع الخطي',
    catPdfPrint: 'ملف PDF وورقة 10×15',
    readGuideBtn: 'قراءة الدليل الكامل',
    backToAllGuides: 'العودة إلى جميع الأدلة (10)',
    targetKeywordsLabel: 'الكلمات المفتاحية المستهدفة في محركات البحث',
    specDimensionsLabel: 'الأبعاد القياسية',
    specByteLimitLabel: 'السقف الأقصى للحجم',
    proTipLabel: 'نصيحة احترافية للمعايرة',
    faqHeading: 'الأسئلة الشائعة (FAQ)',
    relatedGuidesHeading: 'أدلة أخرى لضغط الصور',
    keywordMatrixTitle: 'مصفوفة الكلمات المفتاحية الشاملة لضغط الصور (SEO)',
    keywordMatrixSub:
      'جميع عبارات البحث الأكثرطلباً في CompressPhoto.space مرتبطة مباشرة بالمقال المخصص وزر التشغيل بنقرة واحدة.',
    colKeyword: 'عبارة البحث (الكلمة المفتاحية)',
    colCategory: 'الفئة ومستوى الطلب',
    colPresetSpec: 'الحجم المستهدف',
    colAction: 'تشغيل بنقرة واحدة',
    openArticleBtn: 'المقال',
    launchToolShortBtn: 'تشغيل الإعداد ←',
    qrStrategyBannerTitle: 'المرحلة 1: اكتمال مقالات ضغط الصور · الخطوة القادمة: مقالات رمز QR',
    qrStrategyBannerSub:
      'تم تجهيز 10 مقالات شاملة وأكثر من 30 كلمة مفتاحية بـ 4 لغات (EN, FR, ES, AR)، وجاهزون لتطبيق نفس الاستراتيجية على أداة رمز QR.',
    articlesCountLabel: '10 مقالات شاملة بـ 4 لغات',
    keywordsCountLabel: '+30 كلمة مفتاحية لكل لغة'
  }
};

export const SeoBlogPage: React.FC<SeoBlogPageProps> = ({ locale, onLaunchPreset }) => {
  const ui = BLOG_UI_COPY[locale];
  const [activeTab, setActiveTab] = useState<'articles' | 'keywords'>('articles');
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'exact-kb' | 'passport-visa' | 'signature' | 'pdf-print'
  >('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const selectedArticle: PhotoSeoArticle | null = useMemo(() => {
    if (!selectedArticleId) return null;
    return PHOTO_SEO_ARTICLES.find((a) => a.id === selectedArticleId) || null;
  }, [selectedArticleId]);

  // Dynamically update document title, meta description & JSON-LD schema for SEO
  useEffect(() => {
    const prevTitle = document.title;
    const metaDescEl = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescEl?.getAttribute('content') || '';

    let scriptEl = document.getElementById('seo-blog-jsonld') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'seo-blog-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    if (selectedArticle) {
      const content = selectedArticle.translations[locale];
      document.title = `${content.title} | CompressPhoto`;
      if (metaDescEl) {
        metaDescEl.setAttribute('content', content.metaDescription);
      }
      const schema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'TechArticle',
            headline: content.title,
            description: content.metaDescription,
            inLanguage: locale,
            author: {
              '@type': 'Organization',
              name: 'CompressPhoto',
              url: 'https://compressphoto.space/'
            },
            publisher: {
              '@type': 'Organization',
              name: 'CompressPhoto',
              url: 'https://compressphoto.space/'
            },
            mainEntityOfPage: `https://compressphoto.space/#blog/${selectedArticle.slug}`,
            keywords: [content.primaryKeyword, ...content.secondaryKeywords].join(', ')
          },
          {
            '@type': 'FAQPage',
            mainEntity: content.faq.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a
              }
            }))
          }
        ]
      };
      scriptEl.textContent = JSON.stringify(schema);
    } else {
      document.title = `${ui.heroTitle} | CompressPhoto`;
      if (metaDescEl) {
        metaDescEl.setAttribute('content', ui.heroSub);
      }
      const hubSchema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: ui.heroTitle,
        description: ui.heroSub,
        url: 'https://compressphoto.space/#blog',
        inLanguage: locale
      };
      scriptEl.textContent = JSON.stringify(hubSchema);
    }

    return () => {
      document.title = prevTitle;
      if (metaDescEl && prevDesc) {
        metaDescEl.setAttribute('content', prevDesc);
      }
    };
  }, [selectedArticle, locale, ui]);

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PHOTO_SEO_ARTICLES.filter((article) => {
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      const content = article.translations[locale];
      const haystack = [
        content.title,
        content.excerpt,
        content.primaryKeyword,
        ...content.secondaryKeywords
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [selectedCategory, searchQuery, locale]);

  const filteredKeywords: SeoKeywordCluster[] = useMemo(() => {
    const list = MASTER_PHOTO_KEYWORDS[locale] || MASTER_PHOTO_KEYWORDS.en;
    const q = searchQuery.trim().toLowerCase();
    return list.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      return item.keyword.toLowerCase().includes(q);
    });
  }, [locale, selectedCategory, searchQuery]);

  const getCategoryLabel = (cat: 'exact-kb' | 'passport-visa' | 'signature' | 'pdf-print') => {
    switch (cat) {
      case 'exact-kb':
        return ui.catExactKb;
      case 'passport-visa':
        return ui.catPassport;
      case 'signature':
        return ui.catSignature;
      case 'pdf-print':
        return ui.catPdfPrint;
    }
  };

  const handleOpenArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ============================================================================
  // FULL ARTICLE READER VIEW
  // ============================================================================
  if (selectedArticle) {
    const content = selectedArticle.translations[locale];
    const relatedArticles = PHOTO_SEO_ARTICLES.filter(
      (a) => a.id !== selectedArticle.id
    ).slice(0, 3);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Top Back Navigation & Category Info */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#14213d]/15 dark:border-[#ffffff]/15 pb-4">
          <button
            onClick={() => setSelectedArticleId(null)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#14213d]/20 dark:border-[#ffffff]/25 text-xs sm:text-sm font-bold hover:border-[#fca311] hover:text-[#fca311] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{ui.backToAllGuides}</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-md bg-[#fca311]/20 text-[#14213d] dark:text-[#fca311] font-bold">
              #{String(selectedArticle.number).padStart(2, '0')} ·{' '}
              {getCategoryLabel(selectedArticle.category)}
            </span>
            <span className="inline-flex items-center gap-1 opacity-75">
              <Clock className="w-3.5 h-3.5 text-[#fca311]" />
              {selectedArticle.readingMinutes} min
            </span>
          </div>
        </div>

        {/* Article Header */}
        <article className="space-y-8">
          <header className="space-y-4">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight leading-tight">
              {content.title}
            </h1>
            <p className="text-sm sm:text-base opacity-85 leading-relaxed">
              {content.excerpt}
            </p>

            {/* Targeted SEO Keywords Bar */}
            <div className="pt-2 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#fca311] font-bold flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>{ui.targetKeywordsLabel}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-md bg-[#14213d] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#14213d] text-xs font-mono font-bold">
                  ★ {content.primaryKeyword}
                </span>
                {content.secondaryKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md border border-[#14213d]/20 dark:border-[#ffffff]/20 text-xs font-mono opacity-85"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* 1-CLICK INTERACTIVE PRESET LAUNCHER CARD (Top of Article) */}
          <div className="rounded-2xl border-2 border-[#fca311] bg-[#fca311]/10 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#fca311]">
                <Zap className="w-4 h-4" />
                <span>1-Click Calibrated Studio Preset</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                <div className="px-3 py-2 rounded-lg bg-[#ffffff] dark:bg-[#14213d] border border-[#14213d]/15 dark:border-[#ffffff]/15">
                  <span className="opacity-65 block font-mono text-[10px] uppercase">
                    {ui.specDimensionsLabel}
                  </span>
                  <span className="font-mono font-bold">{content.specs.dimensionsPx}</span>
                </div>
                <div className="px-3 py-2 rounded-lg bg-[#ffffff] dark:bg-[#14213d] border border-[#14213d]/15 dark:border-[#ffffff]/15">
                  <span className="opacity-65 block font-mono text-[10px] uppercase">
                    {ui.specByteLimitLabel}
                  </span>
                  <span className="font-mono font-bold text-[#fca311]">
                    {content.specs.byteCeiling}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                onLaunchPreset(selectedArticle.presetId, selectedArticle.targetKb)
              }
              className="px-5 py-3.5 rounded-xl bg-[#fca311] text-[#14213d] font-bold text-xs sm:text-sm shadow-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <Sliders className="w-4 h-4 shrink-0" />
              <span>{content.ctaButtonLabel}</span>
            </button>
          </div>

          {/* Step-by-Step Article Sections */}
          <div className="space-y-6">
            {content.sections.map((sec, index) => (
              <section
                key={index}
                className="rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 p-5 sm:p-6 space-y-3 bg-[#ffffff] dark:bg-[#14213d]"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#14213d] text-[#fca311] dark:bg-[#fca311] dark:text-[#14213d] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    0{index + 1}
                  </span>
                  <h2 className="font-serif text-lg sm:text-xl font-bold leading-snug">
                    {sec.heading}
                  </h2>
                </div>
                <div className="space-y-2.5 pl-0 sm:pl-10">
                  {sec.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-xs sm:text-sm opacity-85 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Pro Tip Box */}
          <div className="rounded-xl border-l-4 border-[#fca311] bg-[#14213d] text-[#ffffff] dark:bg-[#ffffff]/10 p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#fca311]">
              <Sparkles className="w-4 h-4" />
              <span>{ui.proTipLabel}</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed opacity-95">
              {content.proTip}
            </p>
          </div>

          {/* FAQ Section (Schema.org FAQPage backed) */}
          <section className="space-y-4 pt-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#fca311]" />
              <span>{ui.faqHeading}</span>
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {content.faq.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 p-5 space-y-2"
                >
                  <h3 className="font-bold text-sm sm:text-base flex items-start gap-2">
                    <span className="text-[#fca311] font-mono">Q.</span>
                    <span>{item.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed pl-6">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom 1-Click Preset Banner */}
          <div className="rounded-2xl bg-[#14213d] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#14213d] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-mono uppercase text-[#fca311] font-bold">
                100% Browser-Local · Zero Server Uploads
              </div>
              <div className="font-serif text-lg font-bold">
                {content.title}
              </div>
            </div>
            <button
              onClick={() =>
                onLaunchPreset(selectedArticle.presetId, selectedArticle.targetKb)
              }
              className="px-5 py-3 rounded-xl bg-[#fca311] text-[#14213d] font-bold text-xs sm:text-sm hover:opacity-95 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>{content.ctaButtonLabel}</span>
            </button>
          </div>
        </article>

        {/* Related Guides */}
        <section className="pt-6 border-t border-[#14213d]/15 dark:border-[#ffffff]/15 space-y-4">
          <h3 className="font-serif text-lg sm:text-xl font-bold">
            {ui.relatedGuidesHeading}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => {
              const relContent = rel.translations[locale];
              return (
                <div
                  key={rel.id}
                  className="rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 p-4 flex flex-col justify-between gap-3 hover:border-[#fca311] transition-colors"
                >
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono font-bold text-[#fca311]">
                      #{String(rel.number).padStart(2, '0')} · {rel.targetKb} KB
                    </span>
                    <h4 className="font-serif font-bold text-sm leading-snug">
                      {relContent.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => handleOpenArticle(rel.id)}
                    className="text-xs font-bold text-[#fca311] inline-flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>{ui.readGuideBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  // ============================================================================
  // BLOG HUB & KEYWORD DIRECTORY VIEW
  // ============================================================================
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* HERO HEADER */}
      <div className="rounded-2xl border-2 border-[#14213d]/15 dark:border-[#ffffff]/15 p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#fca311] text-[#14213d] font-mono text-xs font-bold uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{ui.badge}</span>
          </span>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#14213d]/20 dark:border-[#ffffff]/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#fca311]" />
              {ui.articlesCountLabel}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#14213d]/20 dark:border-[#ffffff]/20">
              <Tag className="w-3.5 h-3.5 text-[#fca311]" />
              {ui.keywordsCountLabel}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
            {ui.heroTitle}
          </h1>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed max-w-3xl">
            {ui.heroSub}
          </p>
        </div>

        {/* Switch Tabs: 10 SEO Guides vs Master Keyword Matrix */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#14213d]/10 dark:border-[#ffffff]/10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'articles'
                  ? 'bg-[#fca311] text-[#14213d] shadow-xs'
                  : 'border border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{ui.tabArticles}</span>
            </button>

            <button
              onClick={() => setActiveTab('keywords')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'keywords'
                  ? 'bg-[#fca311] text-[#14213d] shadow-xs'
                  : 'border border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311]'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>{ui.tabKeywords}</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px] max-w-sm">
            <Search className="w-4 h-4 text-[#fca311] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={ui.searchPlaceholder}
              className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-[#14213d]/20 dark:border-[#ffffff]/25 bg-transparent text-xs sm:text-sm focus:outline-hidden focus:border-[#fca311]"
            />
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { id: 'all', label: ui.catAll },
              { id: 'exact-kb', label: ui.catExactKb },
              { id: 'passport-visa', label: ui.catPassport },
              { id: 'signature', label: ui.catSignature },
              { id: 'pdf-print', label: ui.catPdfPrint }
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#14213d] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#14213d]'
                  : 'border border-[#14213d]/15 dark:border-[#ffffff]/15 hover:border-[#fca311]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: 10 PHOTO COMPRESSION SEO ARTICLES GRID */}
      {activeTab === 'articles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => {
            const content = article.translations[locale];
            return (
              <article
                key={article.id}
                className="rounded-2xl border-2 border-[#14213d]/15 dark:border-[#ffffff]/15 p-6 flex flex-col justify-between gap-5 hover:border-[#fca311] transition-colors bg-[#ffffff] dark:bg-[#14213d]"
              >
                <div className="space-y-3.5">
                  {/* Top Meta Row */}
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-md bg-[#fca311]/20 text-[#14213d] dark:text-[#fca311] font-bold">
                      #{String(article.number).padStart(2, '0')} ·{' '}
                      {getCategoryLabel(article.category)}
                    </span>
                    <span className="inline-flex items-center gap-1 opacity-75">
                      <Clock className="w-3.5 h-3.5 text-[#fca311]" />
                      {article.readingMinutes} min
                    </span>
                  </div>

                  {/* Article Title */}
                  <h2
                    onClick={() => handleOpenArticle(article.id)}
                    className="font-serif text-lg sm:text-xl font-bold leading-snug hover:text-[#fca311] transition-colors cursor-pointer"
                  >
                    {content.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                    {content.excerpt}
                  </p>

                  {/* Primary & Secondary Keyword Chips */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider opacity-65">
                      {ui.targetKeywordsLabel}:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#14213d] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#14213d] text-[11px] font-mono font-bold">
                        ★ {content.primaryKeyword}
                      </span>
                      {content.secondaryKeywords.slice(0, 2).map((kw, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md border border-[#14213d]/20 dark:border-[#ffffff]/20 text-[11px] font-mono opacity-80"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spec Strip & Dual Action Buttons */}
                <div className="space-y-3 pt-3 border-t border-[#14213d]/10 dark:border-[#ffffff]/10">
                  <div className="flex items-center justify-between text-[11px] font-mono opacity-80">
                    <span>{content.specs.dimensionsPx}</span>
                    <span className="font-bold text-[#fca311]">
                      {content.specs.byteCeiling}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      onClick={() => handleOpenArticle(article.id)}
                      className="px-3.5 py-2.5 rounded-xl border-2 border-[#14213d] dark:border-[#ffffff] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#14213d] hover:text-[#ffffff] dark:hover:bg-[#ffffff] dark:hover:text-[#14213d] transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{ui.readGuideBtn}</span>
                    </button>

                    <button
                      onClick={() =>
                        onLaunchPreset(article.presetId, article.targetKb)
                      }
                      className="px-3.5 py-2.5 rounded-xl bg-[#fca311] text-[#14213d] font-bold text-xs flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{ui.launchToolShortBtn}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* TAB 2: MASTER PHOTO COMPRESSION SEO KEYWORD DIRECTORY */}
      {activeTab === 'keywords' && (
        <div className="rounded-2xl border-2 border-[#14213d]/15 dark:border-[#ffffff]/15 overflow-hidden bg-[#ffffff] dark:bg-[#14213d]">
          <div className="p-5 sm:p-6 border-b border-[#14213d]/15 dark:border-[#ffffff]/15 space-y-1.5">
            <h2 className="font-serif text-xl sm:text-2xl font-bold">
              {ui.keywordMatrixTitle}
            </h2>
            <p className="text-xs sm:text-sm opacity-80">{ui.keywordMatrixSub}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#14213d]/15 dark:border-[#ffffff]/15 text-[11px] font-mono uppercase text-[#fca311]">
                  <th className="py-3.5 px-4">{ui.colKeyword}</th>
                  <th className="py-3.5 px-4">{ui.colCategory}</th>
                  <th className="py-3.5 px-4">{ui.colPresetSpec}</th>
                  <th className="py-3.5 px-4 text-right">{ui.colAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14213d]/10 dark:divide-[#ffffff]/10 text-xs">
                {filteredKeywords.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#fca311]/5 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold">
                      {item.keyword}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-[#14213d]/20 dark:border-[#ffffff]/20 font-mono text-[11px]">
                        {getCategoryLabel(item.category)} · {item.searchIntent}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#fca311]">
                      ≤ {item.targetKb} KB
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleOpenArticle(item.articleId)}
                          className="px-2.5 py-1.5 rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 font-bold hover:border-[#fca311] transition-colors cursor-pointer"
                        >
                          {ui.openArticleBtn}
                        </button>
                        <button
                          onClick={() =>
                            onLaunchPreset(item.presetId, item.targetKb)
                          }
                          className="px-2.5 py-1.5 rounded-lg bg-[#fca311] text-[#14213d] font-bold hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          {ui.launchToolShortBtn}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PHASE 2 ROADMAP CALLOUT (QR CODE SEO STRATEGY) */}
      <div className="rounded-2xl border border-[#14213d]/20 dark:border-[#ffffff]/20 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold uppercase text-[#fca311]">
            {ui.qrStrategyBannerTitle}
          </div>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
            {ui.qrStrategyBannerSub}
          </p>
        </div>
      </div>
    </div>
  );
};
