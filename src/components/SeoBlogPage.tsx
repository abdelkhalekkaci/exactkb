import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Camera,
  CheckCircle2,
  Clock,
  FileText,
  HelpCircle,
  QrCode,
  Search,
  Sliders,
  Sparkles,
  Tag,
  Zap
} from 'lucide-react';
import { BiometricPresetId, LocaleCode, QRPayloadType } from '../types/atelier';
import {
  BlogCategoryId,
  LocalizedArticleContent,
  MASTER_PHOTO_KEYWORDS,
  PHOTO_SEO_ARTICLES
} from '../data/photoSeoArticles';
import {
  MASTER_QR_KEYWORDS,
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

interface UnifiedSeoArticle {
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

interface UnifiedKeywordItem {
  domain: 'photo' | 'qr';
  keyword: string;
  category: Exclude<BlogCategoryId, 'all'> | QrBlogCategoryId;
  specBadge: string;
  articleId: string;
  presetId?: BiometricPresetId;
  targetKb?: number;
  qrPayloadType?: QRPayloadType;
}

interface BlogUiCopy {
  badge: string;
  heroTitle: string;
  heroSub: string;
  domainAll: string;
  domainPhoto: string;
  domainQr: string;
  tabArticles: string;
  tabKeywords: string;
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
  targetKeywordsLabel: string;
  specDimensionsLabel: string;
  specByteLimitLabel: string;
  proTipLabel: string;
  faqHeading: string;
  relatedGuidesHeading: string;
  keywordMatrixTitle: string;
  keywordMatrixSub: string;
  colKeyword: string;
  colToolDomain: string;
  colCategory: string;
  colPresetSpec: string;
  colAction: string;
  openArticleBtn: string;
  launchToolShortBtn: string;
  completeBannerTitle: string;
  completeBannerSub: string;
  articlesCountLabel: string;
  keywordsCountLabel: string;
}

const BLOG_UI_COPY: Record<LocaleCode, BlogUiCopy> = {
  en: {
    badge: 'SEO KNOWLEDGE HUB · PHOTO KB & QR CODE EDITION',
    heroTitle: 'Photo Compression & QR Code Guides + Master SEO Keyword Directory',
    heroSub:
      'Explore 20 in-depth tutorials and 60+ high-search keywords covering Exact-KB Photo Compression (20KB, 50KB, 100KB, Passports, Signatures) and Permanent Static QR Codes (Wi-Fi, vCard 3.0, Café Menus, WhatsApp, CODE-128 & Vector SVG) — with 1-click preset launch buttons.',
    domainAll: 'All Studio Guides (20)',
    domainPhoto: 'Photo KB Compressor (10)',
    domainQr: 'QR Code & Barcode (10)',
    tabArticles: '20 SEO Guides & Tutorials',
    tabKeywords: 'Master SEO Keyword Directory (60+)',
    searchPlaceholder:
      'Search keywords or guides (e.g. 20kb, passport, wifi qr, vcard, menu, barcode, svg)...',
    catAll: 'All Topics',
    catExactKb: 'Exact KB Limits',
    catPassport: 'Passport & Visa',
    catSignature: 'Wet-Ink Signature',
    catPdfPrint: 'PDF & 4×6" Print',
    catQrStatic: 'Permanent Static QR',
    catQrWifiMenu: 'Wi-Fi & Café Menu QR',
    catQrVcardChat: 'vCard & WhatsApp QR',
    catBarcodeSvg: 'CODE-128 & Vector SVG',
    readGuideBtn: 'Read Full Guide',
    backToAllGuides: 'Back to All 20 Guides',
    targetKeywordsLabel: 'Targeted High-Search Keywords',
    specDimensionsLabel: 'Target Format / Dimensions',
    specByteLimitLabel: 'Standard / Byte Ceiling',
    proTipLabel: 'Studio Calibration Pro Tip',
    faqHeading: 'Frequently Asked Questions',
    relatedGuidesHeading: 'Related Studio Guides',
    keywordMatrixTitle: 'Complete Photo KB & QR Code SEO Keyword Matrix',
    keywordMatrixSub:
      'Every high-intent search query targeted by CompressPhoto, mapped directly to its matching guide and 1-click tool preset.',
    colKeyword: 'Searchable Keyword Phrase',
    colToolDomain: 'Tool',
    colCategory: 'Category',
    colPresetSpec: 'Preset Spec',
    colAction: '1-Click Action',
    openArticleBtn: 'Guide',
    launchToolShortBtn: 'Launch Preset →',
    completeBannerTitle:
      'Complete Dual-Tool SEO Architecture · 10 Photo KB Guides + 10 QR Code & Barcode Guides',
    completeBannerSub:
      'All 20 multilingual tutorials and 60+ search keywords are active across English, Français, Español & العربية with Schema.org TechArticle + FAQPage structured data.',
    articlesCountLabel: '20 Complete Multilingual Articles',
    keywordsCountLabel: '60+ High-Intent Keywords per Language'
  },
  fr: {
    badge: 'CENTRE DE GUIDES SEO · COMPRESSION PHOTO & QR CODE',
    heroTitle: 'Guides Compression Photo au Ko Exact, QR Code Vectoriel & Mots-Clés SEO',
    heroSub:
      'Découvrez 20 tutoriels complets et plus de 60 mots-clés couvrant la compression photo (20 Ko, 50 Ko, 100 Ko, Passeport, Signature) et le générateur QR Code statique permanent (Wi-Fi, vCard 3.0, Menu Restaurant, WhatsApp, CODE-128 & SVG) — avec lancement 1-clic.',
    domainAll: 'Tous les Guides (20)',
    domainPhoto: 'Compresseur Photo Ko (10)',
    domainQr: 'QR Code & Code-Barres (10)',
    tabArticles: '20 Guides & Tutoriels SEO',
    tabKeywords: 'Répertoire Mots-Clés SEO (60+)',
    searchPlaceholder:
      'Rechercher un mot-clé ou un guide (ex: 20 ko, passeport, qr wifi, vcard, menu, svg)...',
    catAll: 'Tous les Sujets',
    catExactKb: 'Limites Ko Exactes',
    catPassport: 'Passeport & Visa',
    catSignature: 'Signature Manuscrite',
    catPdfPrint: 'PDF & Planche 10×15',
    catQrStatic: 'QR Statique Permanent',
    catQrWifiMenu: 'QR Wi-Fi & Menu Café',
    catQrVcardChat: 'QR vCard & WhatsApp',
    catBarcodeSvg: 'CODE-128 & Vecteur SVG',
    readGuideBtn: 'Lire le Guide Complet',
    backToAllGuides: 'Retour aux 20 Guides',
    targetKeywordsLabel: 'Mots-Clés SEO Ciblés',
    specDimensionsLabel: 'Format / Dimensions',
    specByteLimitLabel: 'Norme / Plafond Octets',
    proTipLabel: 'Conseil Pro du Studio',
    faqHeading: 'Questions Fréquentes (FAQ)',
    relatedGuidesHeading: 'Guides Similaires',
    keywordMatrixTitle: 'Matrice Complète des Mots-Clés SEO Photo Ko & QR Code',
    keywordMatrixSub:
      'Toutes les requêtes à forte intention ciblées par CompressPhoto, reliées à leur article dédié et au préréglage 1-clic.',
    colKeyword: 'Expression Clé Recherchée',
    colToolDomain: 'Outil',
    colCategory: 'Catégorie',
    colPresetSpec: 'Spécification',
    colAction: 'Action 1-Clic',
    openArticleBtn: 'Guide',
    launchToolShortBtn: 'Ouvrir Outil →',
    completeBannerTitle:
      'Architecture SEO Complète · 10 Guides Compression Photo + 10 Guides QR Code & Code-Barres',
    completeBannerSub:
      'Les 20 articles multilingues et plus de 60 mots-clés sont actifs en EN, FR, ES et AR avec données structurées Schema.org TechArticle et FAQPage.',
    articlesCountLabel: '20 Articles Multilingues Complets',
    keywordsCountLabel: '60+ Mots-Clés par Langue'
  },
  es: {
    badge: 'CENTRO DE GUÍAS SEO · COMPRESIÓN DE FOTOS Y CÓDIGOS QR',
    heroTitle: 'Guías de Compresión de Fotos al KB Exacto, Códigos QR y Palabras Clave',
    heroSub:
      'Explora 20 guías paso a paso y más de 60 palabras clave sobre compresión de fotos (20KB, 50KB, 100KB, Pasaporte, Firma) y códigos QR estáticos permanentes (Wi-Fi, vCard 3.0, Menú Restaurante, WhatsApp, CODE-128 y SVG) — con botones de 1 clic.',
    domainAll: 'Todas las Guías (20)',
    domainPhoto: 'Compresor Fotos KB (10)',
    domainQr: 'Código QR y Barras (10)',
    tabArticles: '20 Guías y Tutoriales SEO',
    tabKeywords: 'Directorio de Palabras Clave (60+)',
    searchPlaceholder:
      'Buscar palabra clave o guía (ej: 20kb, pasaporte, qr wifi, vcard, menú, svg)...',
    catAll: 'Todos los Temas',
    catExactKb: 'Límites KB Exactos',
    catPassport: 'Pasaporte y Visa',
    catSignature: 'Firma Manuscrita',
    catPdfPrint: 'PDF y Hoja 10×15',
    catQrStatic: 'QR Estático Permanente',
    catQrWifiMenu: 'QR Wi-Fi y Menú',
    catQrVcardChat: 'QR vCard y WhatsApp',
    catBarcodeSvg: 'CODE-128 y Vector SVG',
    readGuideBtn: 'Leer Guía Completa',
    backToAllGuides: 'Volver a las 20 Guías',
    targetKeywordsLabel: 'Palabras Clave SEO Objetivo',
    specDimensionsLabel: 'Formato / Dimensiones',
    specByteLimitLabel: 'Estándar / Límite KB',
    proTipLabel: 'Consejo Pro de Calibración',
    faqHeading: 'Preguntas Frecuentes (FAQ)',
    relatedGuidesHeading: 'Guías Relacionadas',
    keywordMatrixTitle: 'Matriz Completa de Palabras Clave SEO de Fotos KB y Códigos QR',
    keywordMatrixSub:
      'Todas las búsquedas de alta intención cubiertas por CompressPhoto, conectadas con su guía y ajuste preestablecido en 1 clic.',
    colKeyword: 'Palabra Clave Buscada',
    colToolDomain: 'Herramienta',
    colCategory: 'Categoría',
    colPresetSpec: 'Especificación',
    colAction: 'Acción 1-Clic',
    openArticleBtn: 'Guía',
    launchToolShortBtn: 'Abrir Ajuste →',
    completeBannerTitle:
      'Arquitectura SEO Completa · 10 Guías de Compresión de Fotos + 10 Guías de Códigos QR',
    completeBannerSub:
      'Los 20 artículos multilingües y más de 60 palabras clave están activos en EN, FR, ES y AR con datos estructurados Schema.org TechArticle y FAQPage.',
    articlesCountLabel: '20 Artículos Multilingües Completos',
    keywordsCountLabel: '60+ Palabras Clave por Idioma'
  },
  ar: {
    badge: 'مركز الأدلة والكلمات المفتاحية · ضغط الصور ورموز QR',
    heroTitle: 'أدلة ضغط الصور بالكيلوبايت الدقيق وتوليد رموز QR ودليل الكلمات المفتاحية',
    heroSub:
      'تصفح 20 دليلاً شاملاً وأكثر من 60 كلمة مفتاحية تغطي ضغط الصور (20KB و50KB و100KB وجواز السفر والتوقيع) وتوليد رموز QR الثابتة الدائمة (الواي فاي، بطاقة العمل vCard، منيو المطاعم، واتساب، باركود CODE-128 وفيكتور SVG) — مع أزرار تشغيل بنقرة واحدة.',
    domainAll: 'جميع الأدلة (20)',
    domainPhoto: 'ضاغط الصور بالكيلوبايت (10)',
    domainQr: 'رموز QR والباركود (10)',
    tabArticles: '20 مقالاً ودليلاً شاملاً',
    tabKeywords: 'دليل الكلمات المفتاحية (60+)',
    searchPlaceholder:
      'ابحث عن كلمة مفتاحية أو مقال (مثال: 20 كيلوبايت، جواز سفر، واي فاي، باركود، منيو)...',
    catAll: 'جميع المواضيع',
    catExactKb: 'حدود الكيلوبايت الدقيقة',
    catPassport: 'جواز السفر والتأشيرة',
    catSignature: 'التوقيع الخطي',
    catPdfPrint: 'ملف PDF وورقة 10×15',
    catQrStatic: 'رمز QR ثابت ودائم',
    catQrWifiMenu: 'رمز QR للواي فاي والمنيو',
    catQrVcardChat: 'بطاقة vCard وواتساب',
    catBarcodeSvg: 'باركود CODE-128 وملف SVG',
    readGuideBtn: 'قراءة الدليل الكامل',
    backToAllGuides: 'العودة إلى جميع الأدلة (20)',
    targetKeywordsLabel: 'الكلمات المفتاحية المستهدفة في محركات البحث',
    specDimensionsLabel: 'الصيغة / الأبعاد القياسية',
    specByteLimitLabel: 'المعيار / السقف الأقصى',
    proTipLabel: 'نصيحة احترافية من الاستوديو',
    faqHeading: 'الأسئلة الشائعة (FAQ)',
    relatedGuidesHeading: 'أدلة ومقالات ذات صلة',
    keywordMatrixTitle: 'مصفوفة الكلمات المفتاحية الشاملة لضغط الصور ورموز QR (SEO)',
    keywordMatrixSub:
      'جميع عبارات البحث الأكثر طلباً في CompressPhoto مرتبطة مباشرة بالمقال المخصص وزر التشغيل بنقرة واحدة.',
    colKeyword: 'عبارة البحث (الكلمة المفتاحية)',
    colToolDomain: 'الأداة',
    colCategory: 'الفئة',
    colPresetSpec: 'المواصفات',
    colAction: 'تشغيل بنقرة واحدة',
    openArticleBtn: 'المقال',
    launchToolShortBtn: 'تشغيل الأداة ←',
    completeBannerTitle:
      'منظومة SEO متكاملة · 10 مقالات لضغط الصور + 10 مقالات لرموز QR والباركود',
    completeBannerSub:
      'جميع المقالات الـ 20 وأكثر من 60 كلمة مفتاحية متوفرة بـ 4 لغات (EN, FR, ES, AR) مع بيانات Schema.org المهيكلة لمحركات البحث.',
    articlesCountLabel: '20 مقالاً شاملاً بـ 4 لغات',
    keywordsCountLabel: '+60 كلمة مفتاحية لكل لغة'
  }
};

export const SeoBlogPage: React.FC<SeoBlogPageProps> = ({
  locale,
  onLaunchPreset,
  onLaunchQrPreset
}) => {
  const ui = BLOG_UI_COPY[locale];
  const [activeTab, setActiveTab] = useState<'articles' | 'keywords'>('articles');
  const [selectedDomain, setSelectedDomain] = useState<ToolDomainFilter>('all');
  const [selectedCategory, setSelectedCategory] =
    useState<UnifiedCategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Build unified list of all 20 SEO articles (10 Photo + 10 QR)
  const allUnifiedArticles: UnifiedSeoArticle[] = useMemo(() => {
    const photoMapped: UnifiedSeoArticle[] = PHOTO_SEO_ARTICLES.map((a) => ({
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

    const qrMapped: UnifiedSeoArticle[] = QR_SEO_ARTICLES.map((q) => ({
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

  // Build unified list of all 60+ keywords for current locale
  const allUnifiedKeywords: UnifiedKeywordItem[] = useMemo(() => {
    const photoKws = (
      MASTER_PHOTO_KEYWORDS[locale] || MASTER_PHOTO_KEYWORDS.en
    ).map((k) => ({
      domain: 'photo' as const,
      keyword: k.keyword,
      category: k.category,
      specBadge: `≤ ${k.targetKb} KB`,
      articleId: k.articleId,
      presetId: k.presetId,
      targetKb: k.targetKb
    }));

    const qrKws = (MASTER_QR_KEYWORDS[locale] || MASTER_QR_KEYWORDS.en).map(
      (k) => ({
        domain: 'qr' as const,
        keyword: k.keyword,
        category: k.category,
        specBadge: k.specBadge,
        articleId: k.articleId,
        qrPayloadType: k.qrPayloadType
      })
    );

    return [...photoKws, ...qrKws];
  }, [locale]);

  const selectedArticle: UnifiedSeoArticle | null = useMemo(() => {
    if (!selectedArticleId) return null;
    return allUnifiedArticles.find((a) => a.id === selectedArticleId) || null;
  }, [selectedArticleId, allUnifiedArticles]);

  // Reset category filter if user switches domain and current category belongs to the other tool
  const handleSelectDomain = (domain: ToolDomainFilter) => {
    setSelectedDomain(domain);
    setSelectedCategory('all');
  };

  // Dynamically update document title, meta description & JSON-LD schema for SEO
  useEffect(() => {
    const prevTitle = document.title;
    const metaDescEl = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescEl?.getAttribute('content') || '';

    let scriptEl = document.getElementById(
      'seo-blog-jsonld'
    ) as HTMLScriptElement | null;
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

  const filteredKeywords = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allUnifiedKeywords.filter((item) => {
      if (selectedDomain !== 'all' && item.domain !== selectedDomain) {
        return false;
      }
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      return (
        item.keyword.toLowerCase().includes(q) ||
        item.specBadge.toLowerCase().includes(q)
      );
    });
  }, [allUnifiedKeywords, selectedDomain, selectedCategory, searchQuery]);

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

  const handleTriggerArticlePreset = (article: UnifiedSeoArticle) => {
    if (article.domain === 'qr' && article.qrPayloadType) {
      onLaunchQrPreset(article.qrPayloadType);
    } else if (article.presetId && article.targetKb) {
      onLaunchPreset(article.presetId, article.targetKb);
    }
  };

  const handleTriggerKeywordPreset = (item: UnifiedKeywordItem) => {
    if (item.domain === 'qr' && item.qrPayloadType) {
      onLaunchQrPreset(item.qrPayloadType);
    } else if (item.presetId && item.targetKb) {
      onLaunchPreset(item.presetId, item.targetKb);
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
              <span>
                #{String(selectedArticle.number).padStart(2, '0')} ·{' '}
                {getCategoryLabel(selectedArticle.category)}
              </span>
            </span>
            <span className="inline-flex items-center gap-1 opacity-75">
              <Clock className="w-3.5 h-3.5 text-[#fca311]" />
              {selectedArticle.readingTimeMin} min
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
              {content.intro}
            </p>

            {/* Targeted SEO Keywords Bar */}
            <div className="pt-2 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#fca311] font-bold flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>{ui.targetKeywordsLabel}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {content.primaryKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className={
                      idx === 0
                        ? 'px-2.5 py-1 rounded-md bg-[#14213d] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#14213d] text-xs font-mono font-bold'
                        : 'px-2.5 py-1 rounded-md border border-[#14213d]/20 dark:border-[#ffffff]/20 text-xs font-mono opacity-85'
                    }
                  >
                    {idx === 0 ? `★ ${kw}` : kw}
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
                <span>
                  {selectedArticle.domain === 'qr'
                    ? '1-Click Pre-Configured QR & Barcode Studio'
                    : '1-Click Calibrated Exact-KB Preset'}
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

          {/* FAQ Section (Schema.org FAQPage backed) */}
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
                      #{String(rel.number).padStart(2, '0')} ·{' '}
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

        {/* TOOL SECTION FILTER: All (20) vs Photo KB Compressor (10) vs QR Code & Barcode (10) */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
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

        {/* Switch Tabs: 20 SEO Guides vs Master Keyword Matrix (60+) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#14213d]/10 dark:border-[#ffffff]/10">
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

      {/* TAB 1: 20 SEO ARTICLES GRID (10 PHOTO KB + 10 QR CODE & BARCODE) */}
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
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#fca311]/20 text-[#14213d] dark:text-[#fca311] font-bold">
                      {article.domain === 'qr' ? (
                        <QrCode className="w-3.5 h-3.5 text-[#fca311]" />
                      ) : (
                        <Camera className="w-3.5 h-3.5 text-[#fca311]" />
                      )}
                      <span>
                        #{String(article.number).padStart(2, '0')} ·{' '}
                        {getCategoryLabel(article.category)}
                      </span>
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

                  {/* Primary & Secondary Keyword Chips */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider opacity-65">
                      {ui.targetKeywordsLabel}:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {content.primaryKeywords.slice(0, 3).map((kw, i) => (
                        <span
                          key={i}
                          className={
                            i === 0
                              ? 'px-2 py-0.5 rounded-md bg-[#14213d] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#14213d] text-[11px] font-mono font-bold'
                              : 'px-2 py-0.5 rounded-md border border-[#14213d]/20 dark:border-[#ffffff]/20 text-[11px] font-mono opacity-80'
                          }
                        >
                          {i === 0 ? `★ ${kw}` : kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spec Strip & Dual Action Buttons */}
                <div className="space-y-3 pt-3 border-t border-[#14213d]/10 dark:border-[#ffffff]/10">
                  <div className="flex items-center justify-between text-[11px] font-mono opacity-80">
                    <span className="truncate pr-2">
                      {article.specs.dimensionsPx}
                    </span>
                    <span className="font-bold text-[#fca311] shrink-0">
                      {article.specs.byteCeiling}
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
                      onClick={() => handleTriggerArticlePreset(article)}
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

      {/* TAB 2: MASTER SEO KEYWORD DIRECTORY (PHOTO KB + QR CODE & BARCODE) */}
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
                  <th className="py-3.5 px-4">{ui.colToolDomain}</th>
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
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#fca311]/15 font-mono text-[11px] font-bold">
                        {item.domain === 'qr' ? (
                          <>
                            <QrCode className="w-3 h-3 text-[#fca311]" />
                            <span>QR</span>
                          </>
                        ) : (
                          <>
                            <Camera className="w-3 h-3 text-[#fca311]" />
                            <span>KB</span>
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-[#14213d]/20 dark:border-[#ffffff]/20 font-mono text-[11px]">
                        {getCategoryLabel(item.category)}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#fca311]">
                      {item.specBadge}
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
                          onClick={() => handleTriggerKeywordPreset(item)}
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

      {/* DUAL-TOOL SEO COMPLETION SUMMARY CALLOUT */}
      <div className="rounded-2xl border border-[#14213d]/20 dark:border-[#ffffff]/20 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold uppercase text-[#fca311]">
            {ui.completeBannerTitle}
          </div>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
            {ui.completeBannerSub}
          </p>
        </div>
      </div>
    </div>
  );
};
