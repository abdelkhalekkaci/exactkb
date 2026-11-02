import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Camera,
  Clock,
  HelpCircle,
  QrCode,
  Search,
  Sliders,
  Sparkles,
  Zap
} from 'lucide-react';
import { BiometricPresetId, LocaleCode, QRPayloadType } from '../types/atelier';
import {
  BlogCategoryId,
  LocalizedArticleContent,
  PHOTO_SEO_ARTICLES
} from '../data/photoSeoArticles';
import {
  QR_SEO_ARTICLES,
  QrBlogCategoryId
} from '../data/qrSeoArticles';

interface SeoBlogPageProps {
  locale: LocaleCode;
  onLaunchPreset: (presetId: BiometricPresetId, targetKb: number) => void;
  onLaunchQrPreset: (payloadType: QRPayloadType) => void;
}

type ToolDomainFilter = 'all' | 'photo' | 'qr';
type UnifiedCategoryFilter =
  | 'all'
  | Exclude<BlogCategoryId, 'all'>
  | QrBlogCategoryId;

interface UnifiedArticle {
  domain: 'photo' | 'qr';
  id: string;
  slug: string;
  number: number;
  category: Exclude<BlogCategoryId, 'all'> | QrBlogCategoryId;
  readingTimeMin: number;
  presetId?: BiometricPresetId;
  targetKb?: number;
  qrPayloadType?: QRPayloadType;
  specs: {
    dimensionsPx: string;
    physicalSize: string;
    dpi: string;
    byteCeiling: string;
  };
  translations: Record<LocaleCode, LocalizedArticleContent>;
}

interface BlogUiCopy {
  badge: string;
  heroTitle: string;
  heroSub: string;
  domainAll: string;
  domainPhoto: string;
  domainQr: string;
  searchPlaceholder: string;
  catAll: string;
  catExactKb: string;
  catPassport: string;
  catSignature: string;
  catPdfPrint: string;
  catQrStatic: string;
  catQrWifiMenu: string;
  catQrVcardChat: string;
  catBarcodeSvg: string;
  readGuideBtn: string;
  backToAllGuides: string;
  specDimensionsLabel: string;
  specByteLimitLabel: string;
  proTipLabel: string;
  faqHeading: string;
  relatedGuidesHeading: string;
}

const BLOG_UI_COPY: Record<LocaleCode, BlogUiCopy> = {
  en: {
    badge: 'STUDIO BLOG & PRACTICAL GUIDES',
    heroTitle: 'Photo Compression & QR Code Guides',
    heroSub:
      'Step-by-step tutorials on compressing photos to exact kilobyte limits (20KB, 50KB, 100KB, Passports, Signatures) and generating permanent static QR codes & vector barcodes — with 1-click tool presets.',
    domainAll: 'All Articles (20)',
    domainPhoto: 'Compress Photo (10)',
    domainQr: 'QR Code & Barcode (10)',
    searchPlaceholder:
      'Search articles (e.g. 20kb, passport, signature, wifi qr, vcard, menu, barcode)...',
    catAll: 'All Topics',
    catExactKb: 'Exact KB Limits',
    catPassport: 'Passport & Visa',
    catSignature: 'Digital Signature',
    catPdfPrint: 'PDF & 4×6" Print',
    catQrStatic: 'Permanent Static QR',
    catQrWifiMenu: 'Wi-Fi & Café Menu QR',
    catQrVcardChat: 'vCard & WhatsApp QR',
    catBarcodeSvg: 'CODE-128 & Vector SVG',
    readGuideBtn: 'Read Article',
    backToAllGuides: 'Back to All Articles',
    specDimensionsLabel: 'Standard Format / Size',
    specByteLimitLabel: 'Target Specification',
    proTipLabel: 'Studio Pro Tip',
    faqHeading: 'Frequently Asked Questions',
    relatedGuidesHeading: 'Related Articles'
  },
  fr: {
    badge: 'BLOG & GUIDES PRATIQUES',
    heroTitle: 'Guides Compression Photo & QR Code',
    heroSub:
      'Tutoriels étape par étape pour compresser vos photos au kilo-octet exact (20 Ko, 50 Ko, 100 Ko, Passeport, Signature) et créer des QR codes statiques permanents et codes-barres vectoriels — avec ouverture de l’outil en 1 clic.',
    domainAll: 'Tous les Articles (20)',
    domainPhoto: 'Compresser Photo (10)',
    domainQr: 'QR Code & Code-Barres (10)',
    searchPlaceholder:
      'Rechercher un article (ex: 20 ko, passeport, signature, qr wifi, vcard, menu)...',
    catAll: 'Tous les Sujets',
    catExactKb: 'Limites Ko Exactes',
    catPassport: 'Passeport & Visa',
    catSignature: 'Signature Manuscrite',
    catPdfPrint: 'PDF & Planche 10×15',
    catQrStatic: 'QR Statique Permanent',
    catQrWifiMenu: 'QR Wi-Fi & Menu Café',
    catQrVcardChat: 'QR vCard & WhatsApp',
    catBarcodeSvg: 'CODE-128 & Vecteur SVG',
    readGuideBtn: 'Lire l’Article',
    backToAllGuides: 'Retour aux Articles',
    specDimensionsLabel: 'Format / Dimensions',
    specByteLimitLabel: 'Spécification Cible',
    proTipLabel: 'Conseil Pratique',
    faqHeading: 'Questions Fréquentes',
    relatedGuidesHeading: 'Articles Similaires'
  },
  es: {
    badge: 'BLOG Y GUÍAS PRÁCTICAS',
    heroTitle: 'Guías de Compresión de Fotos y Códigos QR',
    heroSub:
      'Tutoriales paso a paso para comprimir fotos al kilobyte exacto (20KB, 50KB, 100KB, Pasaporte, Firma) y crear códigos QR estáticos permanentes y códigos de barras vectoriales — con ajustes listos en 1 clic.',
    domainAll: 'Todos los Artículos (20)',
    domainPhoto: 'Comprimir Foto (10)',
    domainQr: 'Código QR y Barras (10)',
    searchPlaceholder:
      'Buscar un artículo (ej: 20kb, pasaporte, firma, qr wifi, vcard, menú)...',
    catAll: 'Todos los Temas',
    catExactKb: 'Límites KB Exactos',
    catPassport: 'Pasaporte y Visa',
    catSignature: 'Firma Manuscrita',
    catPdfPrint: 'PDF y Hoja 10×15',
    catQrStatic: 'QR Estático Permanente',
    catQrWifiMenu: 'QR Wi-Fi y Menú',
    catQrVcardChat: 'QR vCard y WhatsApp',
    catBarcodeSvg: 'CODE-128 y Vector SVG',
    readGuideBtn: 'Leer Artículo',
    backToAllGuides: 'Volver a los Artículos',
    specDimensionsLabel: 'Formato / Dimensiones',
    specByteLimitLabel: 'Especificación Objetivo',
    proTipLabel: 'Consejo Práctico',
    faqHeading: 'Preguntas Frecuentes',
    relatedGuidesHeading: 'Artículos Relacionados'
  },
  ar: {
    badge: 'المدونة والأدلة العملية',
    heroTitle: 'أدلة ضغط الصور وإنشاء رموز QR',
    heroSub:
      'شروحات خطوة بخطوة لضغط الصور بالحجم الدقيق بالكيلوبايت (20KB و50KB و100KB وصور الجواز والتوقيع) وإنشاء رموز QR الثابتة الدائمة والباركود — مع فتح الأداة بالإعدادات الجاهزة بنقرة واحدة.',
    domainAll: 'جميع المقالات (20)',
    domainPhoto: 'ضغط الصور (10)',
    domainQr: 'رموز QR والباركود (10)',
    searchPlaceholder:
      'ابحث في المقالات (مثال: 20 كيلوبايت، جواز سفر، توقيع، واي فاي، منيو، باركود)...',
    catAll: 'جميع المواضيع',
    catExactKb: 'حجم الكيلوبايت الدقيق',
    catPassport: 'جواز السفر والتأشيرة',
    catSignature: 'التوقيع الخطي',
    catPdfPrint: 'ملف PDF وطباعة 10×15',
    catQrStatic: 'رمز QR ثابت ودائم',
    catQrWifiMenu: 'رمز QR للواي فاي والمنيو',
    catQrVcardChat: 'بطاقة vCard وواتساب',
    catBarcodeSvg: 'باركود CODE-128 وملف SVG',
    readGuideBtn: 'قراءة المقال',
    backToAllGuides: 'العودة إلى جميع المقالات',
    specDimensionsLabel: 'الصيغة / الأبعاد القياسية',
    specByteLimitLabel: 'المواصفات المطلوبة',
    proTipLabel: 'نصيحة عملية',
    faqHeading: 'الأسئلة الشائعة',
    relatedGuidesHeading: 'مقالات ذات صلة'
  }
};

export const SeoBlogPage: React.FC<SeoBlogPageProps> = ({
  locale,
  onLaunchPreset,
  onLaunchQrPreset
}) => {
  const ui = BLOG_UI_COPY[locale];
  const [selectedDomain, setSelectedDomain] = useState<ToolDomainFilter>('all');
  const [selectedCategory, setSelectedCategory] =
    useState<UnifiedCategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const allUnifiedArticles: UnifiedArticle[] = useMemo(() => {
    const photoMapped: UnifiedArticle[] = PHOTO_SEO_ARTICLES.map((a) => ({
      domain: 'photo',
      id: a.id,
      slug: a.slug,
      number: a.number,
      category: a.category,
      readingTimeMin: a.readingTimeMin,
      presetId: a.presetId,
      targetKb: a.targetKb,
      specs: a.specs,
      translations: a.translations
    }));

    const qrMapped: UnifiedArticle[] = QR_SEO_ARTICLES.map((q) => ({
      domain: 'qr',
      id: q.id,
      slug: q.slug,
      number: q.number,
      category: q.category,
      readingTimeMin: q.readingTimeMin,
      qrPayloadType: q.qrPayloadType,
      specs: q.specs,
      translations: q.translations
    }));

    return [...photoMapped, ...qrMapped];
  }, []);

  const selectedArticle: UnifiedArticle | null = useMemo(() => {
    if (!selectedArticleId) return null;
    return allUnifiedArticles.find((a) => a.id === selectedArticleId) || null;
  }, [selectedArticleId, allUnifiedArticles]);

  const handleSelectDomain = (domain: ToolDomainFilter) => {
    setSelectedDomain(domain);
    setSelectedCategory('all');
  };

  // Invisibly inject metadata & Schema.org structured data in <head> for search engines only
  useEffect(() => {
    const prevTitle = document.title;
    const metaDescEl = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescEl?.getAttribute('content') || '';

    let scriptEl = document.getElementById(
      'blog-structured-data'
    ) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'blog-structured-data';
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
            keywords: content.primaryKeywords.join(', ')
          },
          {
            '@type': 'FAQPage',
            mainEntity: content.faqs.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer
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
    return allUnifiedArticles.filter((article) => {
      if (selectedDomain !== 'all' && article.domain !== selectedDomain) {
        return false;
      }
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      const content = article.translations[locale];
      const haystack = [
        content.title,
        content.excerpt,
        ...content.primaryKeywords
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [allUnifiedArticles, selectedDomain, selectedCategory, searchQuery, locale]);

  const getCategoryLabel = (
    cat: Exclude<BlogCategoryId, 'all'> | QrBlogCategoryId
  ) => {
    switch (cat) {
      case 'exact-kb':
        return ui.catExactKb;
      case 'passport-visa':
        return ui.catPassport;
      case 'signature':
        return ui.catSignature;
      case 'pdf-print':
        return ui.catPdfPrint;
      case 'qr-static':
        return ui.catQrStatic;
      case 'qr-wifi-menu':
        return ui.catQrWifiMenu;
      case 'qr-vcard-chat':
        return ui.catQrVcardChat;
      case 'barcode-svg':
        return ui.catBarcodeSvg;
    }
  };

  const categoryButtons = useMemo(() => {
    const base: { id: UnifiedCategoryFilter; label: string }[] = [
      { id: 'all', label: ui.catAll }
    ];
    if (selectedDomain === 'all' || selectedDomain === 'photo') {
      base.push(
        { id: 'exact-kb', label: ui.catExactKb },
        { id: 'passport-visa', label: ui.catPassport },
        { id: 'signature', label: ui.catSignature },
        { id: 'pdf-print', label: ui.catPdfPrint }
      );
    }
    if (selectedDomain === 'all' || selectedDomain === 'qr') {
      base.push(
        { id: 'qr-static', label: ui.catQrStatic },
        { id: 'qr-wifi-menu', label: ui.catQrWifiMenu },
        { id: 'qr-vcard-chat', label: ui.catQrVcardChat },
        { id: 'barcode-svg', label: ui.catBarcodeSvg }
      );
    }
    return base;
  }, [selectedDomain, ui]);

  const handleOpenArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTriggerArticlePreset = (article: UnifiedArticle) => {
    if (article.domain === 'qr' && article.qrPayloadType) {
      onLaunchQrPreset(article.qrPayloadType);
    } else if (article.presetId && article.targetKb) {
      onLaunchPreset(article.presetId, article.targetKb);
    }
  };

  // ============================================================================
  // FULL ARTICLE READER VIEW
  // ============================================================================
  if (selectedArticle) {
    const content = selectedArticle.translations[locale];
    const relatedArticles = allUnifiedArticles
      .filter(
        (a) =>
          a.domain === selectedArticle.domain && a.id !== selectedArticle.id
      )
      .slice(0, 3);

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
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#fca311]/20 text-[#14213d] dark:text-[#fca311] font-bold">
              {selectedArticle.domain === 'qr' ? (
                <QrCode className="w-3.5 h-3.5 text-[#fca311]" />
              ) : (
                <Camera className="w-3.5 h-3.5 text-[#fca311]" />
              )}
              <span>{getCategoryLabel(selectedArticle.category)}</span>
            </span>
            <span className="inline-flex items-center gap-1 opacity-75">
              <Clock className="w-3.5 h-3.5 text-[#fca311]" />
              {selectedArticle.readingTimeMin} min
            </span>
          </div>
        </div>

        {/* Article Content */}
        <article className="space-y-8">
          <header className="space-y-4">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight leading-tight">
              {content.title}
            </h1>
            <p className="text-sm sm:text-base opacity-85 leading-relaxed">
              {content.intro}
            </p>
          </header>

          {/* 1-CLICK INTERACTIVE PRESET LAUNCHER CARD (Top of Article) */}
          <div className="rounded-2xl border-2 border-[#fca311] bg-[#fca311]/10 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#fca311]">
                <Zap className="w-4 h-4" />
                <span>
                  {selectedArticle.domain === 'qr'
                    ? 'Ready-to-Use QR & Barcode Tool'
                    : 'Ready-to-Use Photo Compression Preset'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                <div className="px-3 py-2 rounded-lg bg-[#ffffff] dark:bg-[#14213d] border border-[#14213d]/15 dark:border-[#ffffff]/15">
                  <span className="opacity-65 block font-mono text-[10px] uppercase">
                    {ui.specDimensionsLabel}
                  </span>
                  <span className="font-mono font-bold">
                    {selectedArticle.specs.dimensionsPx}
                  </span>
                </div>
                <div className="px-3 py-2 rounded-lg bg-[#ffffff] dark:bg-[#14213d] border border-[#14213d]/15 dark:border-[#ffffff]/15">
                  <span className="opacity-65 block font-mono text-[10px] uppercase">
                    {ui.specByteLimitLabel}
                  </span>
                  <span className="font-mono font-bold text-[#fca311]">
                    {selectedArticle.specs.byteCeiling}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleTriggerArticlePreset(selectedArticle)}
              className="px-5 py-3.5 rounded-xl bg-[#fca311] text-[#14213d] font-bold text-xs sm:text-sm shadow-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              {selectedArticle.domain === 'qr' ? (
                <QrCode className="w-4 h-4 shrink-0" />
              ) : (
                <Sliders className="w-4 h-4 shrink-0" />
              )}
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
                <div className="space-y-3 pl-0 sm:pl-10">
                  <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                    {sec.body}
                  </p>
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="space-y-2 pt-1">
                      {sec.bullets.map((b, bIdx) => (
                        <li
                          key={bIdx}
                          className="text-xs sm:text-sm opacity-90 leading-relaxed flex items-start gap-2"
                        >
                          <span className="text-[#fca311] font-bold mt-0.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
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

          {/* FAQ Section */}
          <section className="space-y-4 pt-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#fca311]" />
              <span>{ui.faqHeading}</span>
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {content.faqs.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 p-5 space-y-2"
                >
                  <h3 className="font-bold text-sm sm:text-base flex items-start gap-2">
                    <span className="text-[#fca311] font-mono">Q.</span>
                    <span>{item.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed pl-6">
                    {item.answer}
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
              onClick={() => handleTriggerArticlePreset(selectedArticle)}
              className="px-5 py-3 rounded-xl bg-[#fca311] text-[#14213d] font-bold text-xs sm:text-sm hover:opacity-95 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>{content.ctaButtonLabel}</span>
            </button>
          </div>
        </article>

        {/* Related Articles */}
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
                      {getCategoryLabel(rel.category)}
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
  // VISITOR-FACING ARTICLES & GUIDES VIEW (PHOTO COMPRESSION + QR CODE)
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
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
            {ui.heroTitle}
          </h1>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed max-w-3xl">
            {ui.heroSub}
          </p>
        </div>

        {/* TOOL SECTION FILTER + SEARCH BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleSelectDomain('all')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                selectedDomain === 'all'
                  ? 'bg-[#14213d] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#14213d]'
                  : 'border border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#fca311]" />
              <span>{ui.domainAll}</span>
            </button>

            <button
              onClick={() => handleSelectDomain('photo')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                selectedDomain === 'photo'
                  ? 'bg-[#14213d] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#14213d]'
                  : 'border border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311]'
              }`}
            >
              <Camera className="w-4 h-4 text-[#fca311]" />
              <span>{ui.domainPhoto}</span>
            </button>

            <button
              onClick={() => handleSelectDomain('qr')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                selectedDomain === 'qr'
                  ? 'bg-[#14213d] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#14213d]'
                  : 'border border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311]'
              }`}
            >
              <QrCode className="w-4 h-4 text-[#fca311]" />
              <span>{ui.domainQr}</span>
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
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#14213d]/10 dark:border-[#ffffff]/10">
          {categoryButtons.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#fca311] text-[#14213d]'
                  : 'border border-[#14213d]/15 dark:border-[#ffffff]/15 hover:border-[#fca311]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ARTICLES GRID (10 PHOTO COMPRESSION + 10 QR CODE & BARCODE) */}
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
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#fca311]/20 text-[#14213d] dark:text-[#fca311] font-bold">
                    {article.domain === 'qr' ? (
                      <QrCode className="w-3.5 h-3.5 text-[#fca311]" />
                    ) : (
                      <Camera className="w-3.5 h-3.5 text-[#fca311]" />
                    )}
                    <span>{getCategoryLabel(article.category)}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 opacity-75">
                    <Clock className="w-3.5 h-3.5 text-[#fca311]" />
                    {article.readingTimeMin} min
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
              </div>

              {/* Spec Strip & Dual Action Buttons */}
              <div className="space-y-3 pt-3 border-t border-[#14213d]/10 dark:border-[#ffffff]/10">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="opacity-70">{article.specs.dimensionsPx}</span>
                  <span className="font-bold text-[#fca311]">
                    {article.specs.byteCeiling}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => handleOpenArticle(article.id)}
                    className="px-3.5 py-2.5 rounded-xl border border-[#14213d]/25 dark:border-[#ffffff]/25 text-xs font-bold hover:border-[#fca311] hover:text-[#fca311] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{ui.readGuideBtn}</span>
                  </button>

                  <button
                    onClick={() => handleTriggerArticlePreset(article)}
                    className="px-3.5 py-2.5 rounded-xl bg-[#fca311] text-[#14213d] text-xs font-bold hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {article.domain === 'qr' ? (
                      <QrCode className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <Zap className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span className="truncate">{content.ctaButtonLabel}</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
