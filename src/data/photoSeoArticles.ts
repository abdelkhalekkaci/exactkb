import { BiometricPresetId, LocaleCode } from '../types/atelier';

export type BlogCategoryId = 'all' | 'exact-kb' | 'passport-visa' | 'signature' | 'pdf-print';

export interface MasterKeywordItem {
  keyword: string;
  category: Exclude<BlogCategoryId, 'all'>;
  presetId: BiometricPresetId;
  targetKb: number;
  articleId: string;
}

export const MASTER_PHOTO_KEYWORDS: Record<LocaleCode, MasterKeywordItem[]> = {
  en: [
    { keyword: 'compress photo to 20kb', category: 'exact-kb', presetId: 'schengen-35x45', targetKb: 20, articleId: 'compress-photo-to-20kb-exact' },
    { keyword: 'reduce image size under 20kb', category: 'exact-kb', presetId: 'schengen-35x45', targetKb: 20, articleId: 'compress-photo-to-20kb-exact' },
    { keyword: 'resize jpg to 20kb without losing quality', category: 'exact-kb', presetId: 'schengen-35x45', targetKb: 20, articleId: 'compress-photo-to-20kb-exact' },
    { keyword: 'compress signature to 20kb', category: 'signature', presetId: 'wet-ink-sig', targetKb: 20, articleId: 'compress-signature-under-20kb' },
    { keyword: 'ssc upsc signature 10kb to 20kb', category: 'signature', presetId: 'wet-ink-sig', targetKb: 15, articleId: 'compress-signature-under-20kb' },
    { keyword: 'remove gray shadow from signature photo', category: 'signature', presetId: 'wet-ink-sig', targetKb: 20, articleId: 'compress-signature-under-20kb' },
    { keyword: 'compress photo to 50kb', category: 'exact-kb', presetId: 'schengen-35x45', targetKb: 50, articleId: 'compress-photo-to-50kb-online' },
    { keyword: 'reduce passport photo to 50kb jpg', category: 'exact-kb', presetId: 'schengen-35x45', targetKb: 50, articleId: 'compress-photo-to-50kb-online' },
    { keyword: '35x45mm passport photo pixels', category: 'passport-visa', presetId: 'schengen-35x45', targetKb: 50, articleId: '35x45mm-passport-photo-guide' },
    { keyword: '413x531 pixels 300 dpi converter', category: 'passport-visa', presetId: 'schengen-35x45', targetKb: 50, articleId: '35x45mm-passport-photo-guide' },
    { keyword: '2x2 inch us visa photo 600x600 px', category: 'passport-visa', presetId: 'us-visa-2x2', targetKb: 100, articleId: 'us-visa-2x2-inch-photo-guide' },
    { keyword: 'dv lottery photo compressor under 240kb', category: 'passport-visa', presetId: 'us-visa-2x2', targetKb: 100, articleId: 'us-visa-2x2-inch-photo-guide' },
    { keyword: 'compress photo to 100kb exact', category: 'exact-kb', presetId: 'us-visa-2x2', targetKb: 100, articleId: 'compress-photo-to-100kb-exact' },
    { keyword: '4x6 inch passport photo sheet 8 photos', category: 'pdf-print', presetId: 'schengen-35x45', targetKb: 50, articleId: 'print-8-passport-photos-4x6-sheet' },
    { keyword: 'compress jpg to pdf under 50kb', category: 'pdf-print', presetId: 'schengen-35x45', targetKb: 50, articleId: 'compress-photo-to-exact-kb-pdf' },
    { keyword: 'pure white background passport photo', category: 'passport-visa', presetId: 'amazon-1000', targetKb: 200, articleId: 'pure-white-background-passport-amazon' },
    { keyword: 'amazon 1000x1000 white background jpg', category: 'passport-visa', presetId: 'amazon-1000', targetKb: 200, articleId: 'pure-white-background-passport-amazon' },
    { keyword: 'jpeg vs webp exact kb compression', category: 'exact-kb', presetId: 'custom', targetKb: 30, articleId: 'jpeg-vs-webp-vs-png-compression' }
  ],
  fr: [
    { keyword: 'compresser photo 20 ko exact', category: 'exact-kb', presetId: 'schengen-35x45', targetKb: 20, articleId: 'compress-photo-to-20kb-exact' },
    { keyword: 'réduire taille image moins de 20 ko', category: 'exact-kb', presetId: 'schengen-35x45', targetKb: 20, articleId: 'compress-photo-to-20kb-exact' },
    { keyword: 'compresser signature manuscrite 20 ko', category: 'signature', presetId: 'wet-ink-sig', targetKb: 20, articleId: 'compress-signature-under-20kb' },
    { keyword: 'blanchir fond signature photo téléphone', category: 'signature', presetId: 'wet-ink-sig', targetKb: 20, articleId: 'compress-signature-under-20kb' },
    { keyword: 'compresser photo 50 ko en ligne', category: 'exact-kb', presetId: 'schengen-35x45', targetKb: 50, articleId: 'compress-photo-to-50kb-online' },
    { keyword: 'photo identité 35x45mm ants cnie maroc', category: 'passport-visa', presetId: 'schengen-35x45', targetKb: 50, articleId: '35x45mm-passport-photo-guide' },
    { keyword: '413x531 pixels 300 dpi passeport', category: 'passport-visa', presetId: 'schengen-35x45', targetKb: 50, articleId: '35x45mm-passport-photo-guide' },
    { keyword: 'photo visa usa 2x2 pouces 600x600 px', category: 'passport-visa', presetId: 'us-visa-2x2', targetKb: 100, articleId: 'us-visa-2x2-inch-photo-guide' },
    { keyword: 'compresser photo 100 ko sans perte', category: 'exact-kb', presetId: 'us-visa-2x2', targetKb: 100, articleId: 'compress-photo-to-100kb-exact' },
    { keyword: 'planche 8 photos identité 10x15 cm', category: 'pdf-print', presetId: 'schengen-35x45', targetKb: 50, articleId: 'print-8-passport-photos-4x6-sheet' },
    { keyword: 'convertir photo en pdf moins de 50 ko', category: 'pdf-print', presetId: 'schengen-35x45', targetKb: 50, articleId: 'compress-photo-to-exact-kb-pdf' },
    { keyword: 'fond blanc pur photo identité et amazon', category: 'passport-visa', presetId: 'amazon-1000', targetKb: 200, articleId: 'pure-white-background-passport-amazon' },
    { keyword: 'comparatif compression jpeg webp png', category: 'exact-kb', presetId: 'custom', targetKb: 30, articleId: 'jpeg-vs-webp-vs-png-compression' }
  ],
  es: [
    { keyword: 'comprimir foto a 20kb exactos', category: 'exact-kb', presetId: 'schengen-35x45', targetKb: 20, articleId: 'compress-photo-to-20kb-exact' },
    { keyword: 'reducir tamaño imagen menos de 20kb', category: 'exact-kb', presetId: 'schengen-35x45', targetKb: 20, articleId: 'compress-photo-to-20kb-exact' },
    { keyword: 'comprimir firma manuscrita a 20kb', category: 'signature', presetId: 'wet-ink-sig', targetKb: 20, articleId: 'compress-signature-under-20kb' },
    { keyword: 'quitar sombra gris de firma escaneada', category: 'signature', presetId: 'wet-ink-sig', targetKb: 20, articleId: 'compress-signature-under-20kb' },
    { keyword: 'comprimir foto a 50kb online gratis', category: 'exact-kb', presetId: 'schengen-35x45', targetKb: 50, articleId: 'compress-photo-to-50kb-online' },
    { keyword: 'foto pasaporte 35x45mm 413x531 pixeles', category: 'passport-visa', presetId: 'schengen-35x45', targetKb: 50, articleId: '35x45mm-passport-photo-guide' },
    { keyword: 'foto visa americana 2x2 pulgadas 600x600', category: 'passport-visa', presetId: 'us-visa-2x2', targetKb: 100, articleId: 'us-visa-2x2-inch-photo-guide' },
    { keyword: 'comprimir imagen a 100kb sin perder calidad', category: 'exact-kb', presetId: 'us-visa-2x2', targetKb: 100, articleId: 'compress-photo-to-100kb-exact' },
    { keyword: 'plantilla 8 fotos carnet en hoja 10x15 cm', category: 'pdf-print', presetId: 'schengen-35x45', targetKb: 50, articleId: 'print-8-passport-photos-4x6-sheet' },
    { keyword: 'convertir foto a pdf menos de 50kb', category: 'pdf-print', presetId: 'schengen-35x45', targetKb: 50, articleId: 'compress-photo-to-exact-kb-pdf' },
    { keyword: 'fondo blanco puro foto pasaporte y amazon', category: 'passport-visa', presetId: 'amazon-1000', targetKb: 200, articleId: 'pure-white-background-passport-amazon' },
    { keyword: 'diferencia compresión jpeg vs webp vs png', category: 'exact-kb', presetId: 'custom', targetKb: 30, articleId: 'jpeg-vs-webp-vs-png-compression' }
  ],
  ar: [
    { keyword: 'ضغط الصورة إلى 20 كيلوبايت', category: 'exact-kb', presetId: 'schengen-35x45', targetKb: 20, articleId: 'compress-photo-to-20kb-exact' },
    { keyword: 'تصغير حجم الصورة أقل من 20 كيلوبايت', category: 'exact-kb', presetId: 'schengen-35x45', targetKb: 20, articleId: 'compress-photo-to-20kb-exact' },
    { keyword: 'ضغط التوقيع الخطي تحت 20 كيلوبايت', category: 'signature', presetId: 'wet-ink-sig', targetKb: 20, articleId: 'compress-signature-under-20kb' },
    { keyword: 'إزالة ظل الكاميرا من صورة التوقيع', category: 'signature', presetId: 'wet-ink-sig', targetKb: 20, articleId: 'compress-signature-under-20kb' },
    { keyword: 'ضغط الصورة إلى 50 كيلوبايت أونلاين', category: 'exact-kb', presetId: 'schengen-35x45', targetKb: 50, articleId: 'compress-photo-to-50kb-online' },
    { keyword: 'مقاس صورة جواز السفر 35x45 مم والبطاقة الوطنية', category: 'passport-visa', presetId: 'schengen-35x45', targetKb: 50, articleId: '35x45mm-passport-photo-guide' },
    { keyword: 'صورة التأشيرة الأمريكية واللوتري 2x2 بوصة 600x600', category: 'passport-visa', presetId: 'us-visa-2x2', targetKb: 100, articleId: 'us-visa-2x2-inch-photo-guide' },
    { keyword: 'ضغط الصورة إلى 100 كيلوبايت بدون فقدان الجودة', category: 'exact-kb', presetId: 'us-visa-2x2', targetKb: 100, articleId: 'compress-photo-to-100kb-exact' },
    { keyword: 'طباعة 8 صور جواز سفر في ورقة 10x15 سم', category: 'pdf-print', presetId: 'schengen-35x45', targetKb: 50, articleId: 'print-8-passport-photos-4x6-sheet' },
    { keyword: 'تحويل الصورة إلى PDF أقل من 50 كيلوبايت', category: 'pdf-print', presetId: 'schengen-35x45', targetKb: 50, articleId: 'compress-photo-to-exact-kb-pdf' },
    { keyword: 'خلفية بيضاء نقية لصور الجواز وأمازون', category: 'passport-visa', presetId: 'amazon-1000', targetKb: 200, articleId: 'pure-white-background-passport-amazon' },
    { keyword: 'مقارنة ضغط الصور بصيغة JPEG و WebP و PNG', category: 'exact-kb', presetId: 'custom', targetKb: 30, articleId: 'jpeg-vs-webp-vs-png-compression' }
  ]
};

export interface ArticleSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface LocalizedArticleContent {
  title: string;
  metaDescription: string;
  excerpt: string;
  primaryKeywords: string[];
  intro: string;
  sections: ArticleSection[];
  proTip: string;
  ctaButtonLabel: string;
  faqs: ArticleFaq[];
}

export interface PhotoSeoArticle {
  id: string;
  slug: string;
  number: number;
  category: Exclude<BlogCategoryId, 'all'>;
  readingTimeMin: number;
  presetId: BiometricPresetId;
  targetKb: number;
  specs: {
    dimensionsPx: string;
    physicalSize: string;
    dpi: string;
    byteCeiling: string;
  };
  translations: Record<LocaleCode, LocalizedArticleContent>;
}

export const PHOTO_SEO_ARTICLES: PhotoSeoArticle[] = [
  // =========================================================================
  // ARTICLE 1: COMPRESS PHOTO TO 20KB EXACT
  // =========================================================================
  {
    id: 'compress-photo-to-20kb-exact',
    slug: 'how-to-compress-photo-to-20kb-exact-without-losing-quality',
    number: 1,
    category: 'exact-kb',
    readingTimeMin: 4,
    presetId: 'schengen-35x45',
    targetKb: 20,
    specs: {
      dimensionsPx: '413 × 531 px (or Custom)',
      physicalSize: '35 × 45 mm',
      dpi: '300 DPI',
      byteCeiling: '≤ 20.0 KB (20,480 Bytes)'
    },
    translations: {
      en: {
        title: 'How to Compress a Photo to 20KB Exact Without Losing Quality (2026 Guide)',
        metaDescription: 'Learn how to compress any JPG, PNG, or passport photo strictly under 20KB (18KB–19.9KB) without blur using 100% browser-local 7-pass binary search.',
        excerpt: 'Government exam portals, banking KYC forms, and university registrations frequently reject photos over 20KB. Here is how to lock any portrait right at 18.5–19.9 KB with zero facial blur.',
        primaryKeywords: ['compress photo to 20kb', 'reduce image size under 20kb', 'resize jpg to 20kb online', 'photo compressor 20kb exact'],
        intro: 'When an online application portal states "Maximum file size: 20 KB", uploading a 20.4 KB image triggers an instant rejection error—while over-compressing to 6 KB destroys facial clarity. Traditional percentage sliders (like "70% quality") force you to guess the final kilobyte size.',
        sections: [
          {
            heading: 'Why Standard Image Compressors Fail at 20 KB',
            body: 'Smartphone cameras capture portraits between 2.5 MB and 6 MB (2,500 KB to 6,000 KB). Shrinking that file down to 20 KB requires a 99% byte reduction. Generic compressors either leave the resolution too large (resulting in blocky JPEG artifacts) or shrink the file blindly without targeting the 20,480-byte ceiling.',
            bullets: [
              'Exact Byte Ceiling: 20 KB equals 20,480 bytes. Aiming for 18.5 KB to 19.8 KB gives you maximum sharpness while staying 100% compliant.',
              'Resolution Calibration First: Resizing to standard biometric dimensions (such as 413×531 px or 300×400 px) before quantization preserves crisp eyes and facial edges.',
              'Pure White Background Advantage: Replacing noisy wall textures with solid #FFFFFF white saves up to 35% of JPEG bytes for the face itself.'
            ]
          },
          {
            heading: 'How Our 7-Pass Binary-Search Engine Locks 20 KB in Milliseconds',
            body: 'Instead of guessing a quality slider, CompressPhoto runs an automated 7-pass binary search directly inside your browser’s HTML5 Canvas. It tests quality midpoints (50% → 75% → 62.5% → 68.75%...) until it finds the highest possible optical quality that weighs strictly ≤ 20.0 KB.'
          }
        ],
        proTip: 'Use the yellow Before/After comparison slider in the preview box to verify eye and hair sharpness at 20 KB before clicking Download.',
        ctaButtonLabel: 'Compress Photo to 20 KB Now →',
        faqs: [
          {
            question: 'Will compressing my photo to 20KB make it blurry?',
            answer: 'No. By calibrating pixel dimensions first and using 7-pass binary search to use 98% of the allowed 20KB budget (around 19.5 KB), facial features remain sharp and portal-compliant.'
          },
          {
            question: 'Are my ID photos uploaded to any server when compressing to 20KB?',
            answer: 'Never. All 7 compression passes run 100% locally inside your device browser.'
          }
        ]
      },
      fr: {
        title: 'Comment Compresser une Photo à 20 Ko Exact Sans Perdre en Qualité',
        metaDescription: 'Découvrez comment réduire la taille d’une photo JPG ou PNG strictement sous 20 Ko (18–19,9 Ko) sans flou grâce à notre algorithme binaire à 7 passes 100% local.',
        excerpt: 'Les portails de concours administratifs, banques et inscriptions universitaires imposent souvent une limite stricte de 20 Ko. Voici comment verrouiller votre photo sous 20 Ko avec une netteté parfaite.',
        primaryKeywords: ['compresser photo 20 ko', 'réduire taille image 20 ko', 'photo moins de 20 ko en ligne', 'compresseur jpg 20 ko'],
        intro: 'Lorsqu’un portail officiel exige une photo « inférieure à 20 Ko », un fichier de 20,3 Ko est immédiatement rejeté, tandis qu’une image trop compressée à 5 Ko devient floue et illisible.',
        sections: [
          {
            heading: 'Pourquoi la recherche binaire à 7 passes garantit moins de 20 Ko',
            body: 'Au lieu d’utiliser un curseur de pourcentage approximatif, CompressPhoto teste automatiquement 7 niveaux de quantification JPEG dans votre navigateur pour atteindre 19,2–19,9 Ko : le maximum de netteté possible sous la barre des 20 480 octets.',
            bullets: [
              'Calibration des pixels : redimensionnement automatique aux normes officielles.',
              'Fond blanc pur #FFFFFF : élimine le bruit de fond qui consomme inutilement des octets.',
              'Confidentialité totale : vos photos d’identité ne quittent jamais votre appareil.'
            ]
          }
        ],
        proTip: 'Faites glisser la ligne jaune Avant/Après dans l’aperçu pour vérifier la netteté du visage à 20 Ko.',
        ctaButtonLabel: 'Compresser une Photo à 20 Ko →',
        faqs: [
          {
            question: 'Comment être sûr que mon fichier fera moins de 20 Ko ?',
            answer: 'Le moteur vérifie la taille exacte en octets (≤ 20 480 octets) avant de vous proposer le bouton de téléchargement.'
          }
        ]
      },
      es: {
        title: 'Cómo Comprimir una Foto a 20KB Exactos Sin Perder Calidad',
        metaDescription: 'Aprende a reducir el tamaño de cualquier foto JPG o PNG por debajo de 20KB (18–19.9KB) sin desenfoque mediante búsqueda binaria de 7 pasadas en tu navegador.',
        excerpt: 'Los portales de exámenes, bancos y trámites oficiales suelen rechazar fotos mayores de 20KB. Descubre cómo ajustar tu foto exactamente bajo 20KB manteniendo la nitidez.',
        primaryKeywords: ['comprimir foto a 20kb', 'reducir imagen a 20kb', 'foto menos de 20kb online', 'compresor jpg 20kb'],
        intro: 'Cuando un formulario web exige un máximo estricto de 20 KB, subir un archivo de 21 KB genera un error inmediato. Nuestro motor de 7 pasadas bloquea tu imagen entre 18.8 KB y 19.9 KB automáticamente.',
        sections: [
          {
            heading: 'Compresión Exacta en 7 Pasadas Locales',
            body: 'El algoritmo ajusta primero la resolución biométrica y luego busca el punto exacto de compresión JPEG para aprovechar cada byte permitido sin cruzar el límite de 20 KB.',
            bullets: [
              'Límite estricto verificado: ≤ 20,480 bytes.',
              'Fondo blanco de estudio para ahorrar peso en el archivo.',
              'Procesamiento 100% privado en tu navegador.'
            ]
          }
        ],
        proTip: 'Usa la línea amarilla Antes/Después para comprobar la nitidez antes de descargar.',
        ctaButtonLabel: 'Comprimir Foto a 20 KB Ahora →',
        faqs: [
          {
            question: '¿Mi foto pierde nitidez al bajar a 20KB?',
            answer: 'No, porque optimizamos las dimensiones en píxeles y aprovechamos hasta el 99% del límite de 20KB.'
          }
        ]
      },
      ar: {
        title: 'كيفية ضغط الصورة إلى 20 كيلوبايت بدقة دون فقدان الجودة',
        metaDescription: 'تعرّف على طريقة تصغير وضغط الصور بصيغة JPG أو PNG تحت سقف 20 كيلوبايت بدقة تامة وبدون تشويش عبر تقنية البحث الثنائي من 7 مراحل محلياً.',
        excerpt: 'تشترط بوابات التوظيف والجامعات والبنوك ألا يتجاوز حجم الصورة 20 كيلوبايت. إليك الطريقة الأسرع لضبط صورتك عند 19 كيلوبايت بوضوح عالٍ.',
        primaryKeywords: ['ضغط الصورة إلى 20 كيلوبايت', 'تصغير حجم الصورة 20kb', 'ضغط صور الجواز 20 كيلوبايت'],
        intro: 'عندما تطلب بوابة إلكترونية صورة بحجم أقصى 20 كيلوبايت، فإن رفع صورة بحجم 21 كيلوبايت يؤدي إلى رفضها فوراً. يعمل محركنا ذو الـ 7 مراحل على قفل الحجم تحت 20.0 كيلوبايت مع الحفاظ على أعلى دقة ممكنة.',
        sections: [
          {
            heading: 'كيف يعمل محرك البحث الثنائي ذو الـ 7 مراحل؟',
            body: 'يقوم الأداة بضبط أبعاد البكسل أولاً ثم يختبر 7 مستويات ضغط داخل متصفحك في أجزاء من الثانية للوصول إلى أفضل جودة بصرية تحت سقف 20,480 بايت.',
            bullets: [
              'حجم مضمون تحت 20 كيلوبايت.',
              'توحيد الخلفية البيضاء لتوفير مساحة الملف لملامح الوجه.',
              'خصوصية تامة 100% داخل متصفحك بدون رفع أي ملفات.'
            ]
          }
        ],
        proTip: 'اسحب الخط الأصفر (قبل / بعد) لمقارنة نقاء الصورة قبل التنزيل.',
        ctaButtonLabel: 'اضغط صورتك إلى 20 كيلوبايت الآن ←',
        faqs: [
          {
            question: 'هل تصبح الصورة ضبابية عند ضغطها إلى 20 كيلوبايت؟',
            answer: 'لا، لأن الأداة تضبط الأبعاد القياسية وتستغل السقف المسموح (حوالي 19.5 كيلوبايت) بالكامل.'
          }
        ]
      }
    }
  },

  // =========================================================================
  // ARTICLE 2: COMPRESS SIGNATURE UNDER 10KB–20KB & REMOVE SHADOW
  // =========================================================================
  {
    id: 'compress-signature-under-20kb',
    slug: 'compress-handwritten-signature-to-20kb-remove-paper-shadow',
    number: 2,
    category: 'signature',
    readingTimeMin: 5,
    presetId: 'wet-ink-sig',
    targetKb: 20,
    specs: {
      dimensionsPx: '560 × 180 px (140×60 ratio)',
      physicalSize: '47 × 15 mm',
      dpi: '300 DPI',
      byteCeiling: '10 KB – 20 KB Strict'
    },
    translations: {
      en: {
        title: 'How to Compress a Handwritten Signature Under 20KB & Remove Phone Shadows',
        metaDescription: 'Turn gray smartphone photos of handwritten signatures into crisp pen ink on pure white #FFFFFF paper strictly under 10KB–20KB for SSC, UPSC, and banking portals.',
        excerpt: 'Photographing a signature on paper with your phone leaves a gray shadow that portals reject and bloats the file size. Learn how to whiten the paper and lock it under 20KB in 1 click.',
        primaryKeywords: ['compress signature to 20kb', 'ssc upsc signature 10kb to 20kb', 'remove shadow from signature photo', 'handwritten signature white background'],
        intro: 'Civil service exams (SSC, UPSC, IBPS), visa portals, and digital banking forms require a scanned wet-ink signature between 10 KB and 20 KB. However, most applicants take a photo of their signature using a smartphone—creating an uneven gray or yellow paper shadow.',
        sections: [
          {
            heading: 'Why Phone Shadows Ruin Both Portal Compliance and File Size',
            body: 'A gray gradient shadow across paper forces the JPEG encoder to store thousands of color transitions, making a small signature weigh 85 KB+ while looking dirty. When you convert the paper background to pure #FFFFFF white, 90% of the image becomes uniform white blocks that compress to just a few kilobytes.',
            bullets: [
              'Adaptive Luminance Thresholding: Separates dark ballpoint or fountain pen strokes from the paper background.',
              'Ink Contrast Boost: Enhances faint pen lines so your signature remains legible at 560×180 px (or 140×60 px).',
              'Guaranteed < 20 KB Output: Easily hits 12 KB, 15 KB, or 19 KB depending on your portal requirements.'
            ]
          }
        ],
        proTip: 'Select the "Signature (< 20 KB)" preset—it automatically turns ON the Wet-Ink Signature Shadow Cleanser!',
        ctaButtonLabel: 'Clean & Compress Signature (< 20 KB) →',
        faqs: [
          {
            question: 'How do I remove the gray background from a photographed signature?',
            answer: 'Select the "Signature (< 20 KB)" preset in CompressPhoto. The built-in shadow cleanser automatically turns the paper pure white #FFFFFF while darkening your pen strokes.'
          },
          {
            question: 'Can I compress my signature between 10KB and 20KB for SSC/UPSC?',
            answer: 'Yes. Pick 15 KB or 20 KB as your target ceiling and the 7-pass engine will lock the file right inside the required range.'
          }
        ]
      },
      fr: {
        title: 'Nettoyer et Compresser une Signature Manuscrite sous 20 Ko (Fond Blanc Pur)',
        metaDescription: 'Supprimez l’ombre grise du papier photographié au smartphone et compressez votre signature manuscrite sous 20 Ko pour les dossiers administratifs et bancaires.',
        excerpt: 'Une signature prise en photo au téléphone présente souvent un fond grisâtre rejeté par les portails officiels. Blanchissez le papier en #FFFFFF et verrouillez-la sous 20 Ko.',
        primaryKeywords: ['compresser signature 20 ko', 'nettoyer signature manuscrite fond blanc', 'signature scannée moins de 20 ko'],
        intro: 'La plupart des candidats photographient leur signature sur une feuille blanche avec leur smartphone, ce qui crée une ombre grise. Notre outil isole l’encre du stylo et blanchit automatiquement le papier tout en réduisant le poids sous 20 Ko.',
        sections: [
          {
            heading: 'Seuillage Adaptatif de l’Encre et Suppression d’Ombre',
            body: 'En transformant le fond grisé en blanc pur #FFFFFF, votre signature devient nette comme un scan professionnel et se compresse facilement entre 12 Ko et 19 Ko.',
            bullets: [
              'Suppression automatique de l’ombre du téléphone.',
              'Renforcement du contraste de l’encre bleue ou noire.',
              'Format proportionnel 560×180 px prêt pour les portails.'
            ]
          }
        ],
        proTip: 'Cliquez sur le format « Signature (< 20 Ko) » pour activer automatiquement le nettoyeur d’ombre.',
        ctaButtonLabel: 'Nettoyer & Compresser une Signature (< 20 Ko) →',
        faqs: [
          {
            question: 'Comment enlever le fond gris d’une signature prise au téléphone ?',
            answer: 'Choisissez le mode « Signature (< 20 Ko) » : le filtre de nettoyage transforme le papier gris en blanc pur #FFFFFF.'
          }
        ]
      },
      es: {
        title: 'Cómo Limpiar y Comprimir una Firma Manuscrita a Menos de 20KB (Fondo Blanco)',
        metaDescription: 'Elimina la sombra gris del papel tomada con el móvil y comprime tu firma en tinta por debajo de 20KB para portales oficiales y bancarios.',
        excerpt: 'Fotografiar tu firma con el celular deja sombras grises en el papel. Aprende a convertir el fondo en blanco puro #FFFFFF y bloquear el peso bajo 20KB.',
        primaryKeywords: ['comprimir firma a 20kb', 'quitar sombra de firma manuscrita', 'firma fondo blanco menos de 20kb'],
        intro: 'Al tomar una foto de tu firma sobre papel con el móvil, la sombra proyectada oscurece el fondo y aumenta el peso del archivo JPEG. Nuestro limpiador de tinta separa el trazo del bolígrafo y deja el papel blanco puro.',
        sections: [
          {
            heading: 'Limpieza Automática de Sombra de Papel',
            body: 'El modo Firma (< 20 KB) activa automáticamente el filtro de umbralización que elimina sombras y garantiza un archivo limpio entre 12 KB y 19.5 KB.',
            bullets: [
              'Papel blanco puro #FFFFFF sin sombras.',
              'Mayor nitidez en el trazo del bolígrafo.',
              'Peso garantizado bajo 20 KB.'
            ]
          }
        ],
        proTip: 'Elige la opción "Firma (< 20 KB)" para activar la limpieza de sombras en 1 clic.',
        ctaButtonLabel: 'Limpiar y Comprimir Firma (< 20 KB) →',
        faqs: [
          {
            question: '¿Cómo blanquear el papel de una firma tomada con celular?',
            answer: 'Selecciona el preset "Firma (< 20 KB)" y el limpiador automático eliminará cualquier sombra gris.'
          }
        ]
      },
      ar: {
        title: 'كيفية إزالة ظل الكاميرا وضغط التوقيع الخطي تحت 20 كيلوبايت',
        metaDescription: 'حوّل صورة التوقيع المصوّرة بالهاتف إلى توقيع واضح على خلفية بيضاء نقية #FFFFFF بحجم أقل من 20 كيلوبايت لبوابات التوظيف والبنوك.',
        excerpt: 'تصوير التوقيع بالهاتف يترك ظلاً رمادياً على الورقة يسبب رفض الملف. تعرّف على كيفية تبييض الخلفية وضغط التوقيع تحت 20 كيلوبايت بضغطة واحدة.',
        primaryKeywords: ['ضغط التوقيع تحت 20 كيلوبايت', 'إزالة ظل التوقيع الخطي', 'تبييض خلفية التوقيع'],
        intro: 'عند تصوير توقيعك على ورقة باستخدام كاميرا الهاتف، يظهر ظل رمادي يجعل الصورة تبدو غير احترافية ويزيد من حجمها. يقوم منقّي التوقيع في أداتنا بعزل حبر القلم وتحويل الخلفية إلى أبيض نقي #FFFFFF.',
        sections: [
          {
            heading: 'تنقية ظل الورق وتوضيح الحبر تلقائياً',
            body: 'بمجرد اختيار قالب التوقيع (< 20 كيلوبايت)، يتم تفعيل فلتر إزالة الظلال تلقائياً مع قفل حجم الملف تحت 20 كيلوبايت.',
            bullets: [
              'خلفية بيضاء نقية بدون ظلال الكاميرا.',
              'تعزيز وضوح حبر القلم الأزرق أو الأسود.',
              'حجم مضمون بين 10 و 20 كيلوبايت.'
            ]
          }
        ],
        proTip: 'اختر قالب « توقيع خطي (< 20 كيلوبايت) » لتفعيل إزالة الظل تلقائياً.',
        ctaButtonLabel: 'تنظيف وضغط التوقيع (< 20 KB) الآن ←',
        faqs: [
          {
            question: 'كيف أتخلص من الظل الرمادي في صورة التوقيع؟',
            answer: 'اختر قالب التوقيع (< 20KB) وسيقوم المنقّي الذكي بتحويل الورقة إلى أبيض نقي فوراً.'
          }
        ]
      }
    }
  },

  // =========================================================================
  // ARTICLE 3: COMPRESS PHOTO TO 50KB ONLINE
  // =========================================================================
  {
    id: 'compress-photo-to-50kb-online',
    slug: 'how-to-compress-photo-to-50kb-online-passport-visa',
    number: 3,
    category: 'exact-kb',
    readingTimeMin: 4,
    presetId: 'schengen-35x45',
    targetKb: 50,
    specs: {
      dimensionsPx: '413 × 531 px',
      physicalSize: '35 × 45 mm',
      dpi: '300 DPI',
      byteCeiling: '≤ 50.0 KB (51,200 Bytes)'
    },
    translations: {
      en: {
        title: 'How to Compress a Photo to 50KB Online for Passport, Visa & Job Portals',
        metaDescription: 'Compress any portrait or ID photo strictly under 50KB (45KB–49.8KB) in 1 click. Ideal for online visa portals, civil service exams, and digital ID cards.',
        excerpt: '50 KB is the global standard file-size ceiling for national ID portals, university admissions, and e-Visa uploads. Learn how to hit 48–49.9 KB with studio-grade clarity.',
        primaryKeywords: ['compress photo to 50kb', 'reduce image size to 50kb', 'passport photo under 50kb', 'jpg compressor 50kb'],
        intro: 'Across hundreds of government e-Visa portals, national ID renewal systems, and civil service recruitment platforms, 50 KB (51,200 bytes) is the most common file-size limit for portrait photographs.',
        sections: [
          {
            heading: 'Why 48 KB – 49.8 KB Is the Sweet Spot for 50 KB Portals',
            body: 'At 50 KB, a 413×531 px (35×45 mm) or 600×600 px portrait has more than enough byte budget to look indistinguishable from an uncompressed studio photo—provided you don’t waste bytes on background noise or excessive pixel dimensions.',
            bullets: [
              'Zero Visible Compression Artifacts: 50 KB at 300 DPI preserves natural skin tones and crisp facial contours.',
              'Instant 1-Click Calibration: Pick the 50 KB button in Step 2 to lock your file under 51,200 bytes.',
              'Export as JPG or 50 KB PDF: Download either a verified JPEG or an ISO-compliant PDF under 50 KB.'
            ]
          }
        ],
        proTip: 'If your portal requires both a 50 KB photo and a 20 KB signature, you can process both in seconds without leaving the page.',
        ctaButtonLabel: 'Compress Photo Under 50 KB →',
        faqs: [
          {
            question: 'How do I reduce a 3 MB phone photo to 50 KB without making it tiny?',
            answer: 'Our compressor locks the physical print dimensions at 300 DPI (413×531 px) and uses 7-pass binary search to tune JPEG quantization right to ~49 KB.'
          }
        ]
      },
      fr: {
        title: 'Compresser une Photo à 50 Ko en Ligne (Passeport, Visa, Concours)',
        metaDescription: 'Réduisez le poids de votre photo d’identité ou portrait strictement sous 50 Ko (48–49,8 Ko) sans aucune perte de netteté visible.',
        excerpt: 'Le plafond de 50 Ko est la norme la plus courante sur les portails administratifs, e-Visa et inscriptions en ligne. Calibrez votre photo sous 50 Ko en 1 clic.',
        primaryKeywords: ['compresser photo 50 ko', 'réduire image 50 ko en ligne', 'photo identité moins de 50 ko'],
        intro: 'La majorité des portails administratifs et de demande de visa en ligne fixent la taille maximale des photos d’identité à 50 Ko (51 200 octets).',
        sections: [
          {
            heading: 'Une Qualité Studio à 49 Ko',
            body: 'Avec une résolution calibrée à 413×531 px (300 DPI), un fichier de 48 à 49,8 Ko conserve un piqué parfait sur le visage tout en étant accepté du premier coup.',
            bullets: [
              'Verrouillage strict sous 51 200 octets.',
              'Compatible JPG, WebP et PDF ≤ 50 Ko.',
              '100% gratuit et privé dans votre navigateur.'
            ]
          }
        ],
        proTip: 'Cliquez simplement sur le bouton « 50 KB » à l’étape 2 pour verrouiller cette limite.',
        ctaButtonLabel: 'Compresser une Photo sous 50 Ko →',
        faqs: [
          {
            question: 'Pourquoi viser 49 Ko au lieu de 15 Ko quand la limite est de 50 Ko ?',
            answer: 'Viser juste en dessous de 50 Ko permet de conserver 3 fois plus de détails optiques sur le visage.'
          }
        ]
      },
      es: {
        title: 'Cómo Comprimir una Foto a 50KB Online para Pasaporte, Visa y Trámites',
        metaDescription: 'Reduce el peso de tu foto carnet o retrato estrictamente por debajo de 50KB (48–49.8KB) con calidad de estudio y privacidad 100% en tu navegador.',
        excerpt: '50 KB es el límite estándar en portales de visado electrónico, universidades y trámites gubernamentales. Ajusta tu foto bajo 50 KB en un clic.',
        primaryKeywords: ['comprimir foto a 50kb', 'reducir imagen a 50kb online', 'foto carnet menos de 50kb'],
        intro: 'El límite de 50 KB (51,200 bytes) es el estándar más utilizado en plataformas de e-Visa, matrículas universitarias y portales de empleo público.',
        sections: [
          {
            heading: 'Máxima Nitidez Justo Debajo de 50 KB',
            body: 'Nuestro motor binario ajusta la imagen entre 48 KB y 49.8 KB a 300 DPI para que conserve toda su nitidez original sin superar nunca el límite.',
            bullets: [
              'Calibración exacta bajo 51,200 bytes.',
              'Exportación directa en JPG o PDF ≤ 50 KB.',
              'Sin marcas de agua ni subidas a servidores.'
            ]
          }
        ],
        proTip: 'Selecciona "50 KB" en el Paso 2 para bloquear el peso máximo automáticamente.',
        ctaButtonLabel: 'Comprimir Foto a 50 KB →',
        faqs: [
          {
            question: '¿Puedo descargar también en PDF menor de 50KB?',
            answer: 'Sí, el botón "Descargar como PDF (≤ 50 KB)" genera un documento PDF listo para subir.'
          }
        ]
      },
      ar: {
        title: 'كيفية ضغط الصورة إلى 50 كيلوبايت أونلاين لجواز السفر والتأشيرات',
        metaDescription: 'اضغط صورة جواز السفر أو الهوية تحت سقف 50 كيلوبايت (48–49.8 كيلوبايت) بدقة استوديو كاملة ومحلياً داخل متصفحك.',
        excerpt: 'يُعد حد 50 كيلوبايت المعيار الأكثر شيوعاً في بوابات التأشيرات الإلكترونية والجامعات والبطاقات الوطنية. اضبط صورتك تحت 50 كيلوبايت بضغطة واحدة.',
        primaryKeywords: ['ضغط الصورة إلى 50 كيلوبايت', 'تصغير حجم الصورة 50kb', 'صورة جواز السفر 50 كيلوبايت'],
        intro: 'تعتمد معظم بوابات التأشيرات الإلكترونية والتسجيل الجامعي والمباريات الحكومية سقف 50 كيلوبايت (51,200 بايت) كحد أقصى لصور الهوية.',
        sections: [
          {
            heading: 'جودة بصرية فائقة عند 49 كيلوبايت',
            body: 'يعمل محرك البحث الثنائي على ضبط الصورة عند حوالي 49 كيلوبايت بدقة 300 نقطة في البوصة للحفاظ على وضوح ملامح الوجه بالكامل.',
            bullets: [
              'ضمان عدم تجاوز 51,200 بايت.',
              'إمكانية التنزيل بصيغة JPG أو PDF أقل من 50 كيلوبايت.',
              'معالجة فورية وآمنة 100% داخل جهازك.'
            ]
          }
        ],
        proTip: 'اضغط على زر 50 KB في الخطوة الثانية لقفل السقف الأقصى فوراً.',
        ctaButtonLabel: 'اضغط صورتك تحت 50 كيلوبايت ←',
        faqs: [
          {
            question: 'هل يمكنني تصدير ملف PDF بحجم أقل من 50 كيلوبايت أيضاً؟',
            answer: 'نعم، يوفر الموقع زر تنزيل PDF مضبوط بدقة تحت 50 كيلوبايت.'
          }
        ]
      }
    }
  },

  // =========================================================================
  // ARTICLE 4: 35x45 MM BIOMETRIC PASSPORT & ID PHOTO GUIDE
  // =========================================================================
  {
    id: '35x45mm-passport-photo-guide',
    slug: '35x45mm-biometric-passport-id-photo-size-pixels-guide',
    number: 4,
    category: 'passport-visa',
    readingTimeMin: 5,
    presetId: 'schengen-35x45',
    targetKb: 50,
    specs: {
      dimensionsPx: '413 × 531 px',
      physicalSize: '35 × 45 mm (3.5 × 4.5 cm)',
      dpi: '300 DPI (ISO/IEC 19794-5)',
      byteCeiling: '≤ 50.0 KB'
    },
    translations: {
      en: {
        title: '35×45 mm Passport & ID Photo Guide: Exact Pixels (413×531 px) & KB Size',
        metaDescription: 'Convert any portrait to the official 35×45 mm (3.5×4.5 cm / 413×531 pixels at 300 DPI) biometric standard for Schengen Visa, France ANTS, Morocco CNIE, UK, and EU passports.',
        excerpt: 'What is 35×45 mm in pixels? At the official 300 DPI print standard, 35×45 mm equals exactly 413 × 531 pixels. Here is how to format and compress your biometric photo in 1 click.',
        primaryKeywords: ['35x45mm passport photo pixels', '3.5x4.5 cm photo size in pixels', '413x531 pixels 300 dpi', 'schengen visa photo size'],
        intro: 'The 35 × 45 millimeter (3.5 × 4.5 cm) portrait is the official ICAO / ISO/IEC 19794-5 biometric standard used across the European Union (Schengen Visa), France (ANTS Passeport / CNI), Morocco (CNIE), the UK, Australia, and over 120 countries.',
        sections: [
          {
            heading: 'Exact Conversion: 35 × 45 mm = 413 × 531 Pixels at 300 DPI',
            body: 'Digital portals require millimeter dimensions converted into pixels at 300 Dots Per Inch (DPI). Using the formula (mm ÷ 25.4) × 300, 35 mm equals 413 pixels wide and 45 mm equals 531 pixels high.',
            bullets: [
              'Aspect Ratio: 7:9 vertical portrait crop with centered head and shoulders.',
              'Background Rules: Uniform light gray, passport blue, or pure white without shadows behind the ears.',
              'File Size Ceiling: Typically ≤ 50 KB to 100 KB in sRGB JPEG format.'
            ]
          }
        ],
        proTip: 'After calibrating your 35×45 mm photo, click "Print 8-Photo Sheet (4×6")" to generate a printable sheet of 8 photos with millimeter crop marks!',
        ctaButtonLabel: 'Open 35×45 mm Passport Calibrator →',
        faqs: [
          {
            question: 'How many pixels is a 35x45 mm passport photo at 300 DPI?',
            answer: 'At 300 DPI, a 35×45 mm photograph measures exactly 413 pixels wide by 531 pixels high.'
          }
        ]
      },
      fr: {
        title: 'Photo d’Identité 35×45 mm (Passeport ANTS, CNIE Maroc, Schengen) : Pixels & Ko',
        metaDescription: 'Calibrez votre photo d’identité au format officiel 35×45 mm (3,5×4,5 cm soit 413×531 pixels à 300 DPI) sous 50 Ko pour Passeport, CNI ANTS, CNIE Maroc et Visa Schengen.',
        excerpt: 'Le format 35×45 mm correspond exactement à 413 × 531 pixels à 300 DPI. Préparez votre photo biométrique conforme aux normes ISO/IEC 19794-5 en quelques secondes.',
        primaryKeywords: ['photo identité 35x45mm pixels', 'photo passeport ants 35x45', 'photo cnie maroc 35x45mm 50 ko', '413x531 pixels 300 dpi'],
        intro: 'Le format 35 × 45 mm (3,5 × 4,5 cm) est la norme biométrique internationale exigée pour le passeport français, la carte nationale d’identité (ANTS), la CNIE marocaine et les visas Schengen.',
        sections: [
          {
            heading: 'Correspondance Exacte : 35×45 mm = 413 × 531 Pixels (300 DPI)',
            body: 'Pour que votre photo numérique ait exactement la taille physique de 3,5 × 4,5 cm à l’impression comme sur les portails en ligne, elle doit mesurer 413 pixels de large sur 531 pixels de haut à 300 DPI.',
            bullets: [
              'Dimensions officielles : 413 × 531 px (ratio 35:45).',
              'Fond normalisé : blanc pur ou bleu identité sans ombre.',
              'Planche 10×15 cm incluse : téléchargez 8 photos prêtes à imprimer.'
            ]
          }
        ],
        proTip: 'Utilisez le bouton « Planche 8 Photos (10×15 cm) » pour imprimer vos 8 photos 35×45 mm en pharmacie ou sur borne photo.',
        ctaButtonLabel: 'Calibrer en 35×45 mm (< 50 Ko) →',
        faqs: [
          {
            question: 'Quelle est la taille en pixels d’une photo 35x45 mm ?',
            answer: 'À la résolution standard de 300 DPI, une photo de 35×45 mm mesure exactement 413 × 531 pixels.'
          }
        ]
      },
      es: {
        title: 'Guía de Foto Pasaporte 35×45 mm: Píxeles Exactos (413×531 px) y Peso en KB',
        metaDescription: 'Ajusta tu foto carnet al estándar biométrico 35×45 mm (3.5×4.5 cm / 413×531 píxeles a 300 DPI) bajo 50KB para pasaporte europeo, visado Schengen y DNI.',
        excerpt: 'En resolución de 300 DPI, el tamaño 35×45 mm equivale exactamente a 413 × 531 píxeles. Calibra y comprime tu foto biométrica en un clic.',
        primaryKeywords: ['foto pasaporte 35x45mm pixeles', 'tamaño foto 3.5x4.5 cm en pixeles', '413x531 pixeles 300 dpi'],
        intro: 'El formato de 35 × 45 mm (3.5 × 4.5 cm) es el estándar biométrico oficial utilizado en la Unión Europea, visados Schengen y documentos nacionales de identidad.',
        sections: [
          {
            heading: 'Conversión Oficial: 35×45 mm = 413 × 531 Píxeles a 300 DPI',
            body: 'Nuestro preset 35×45 mm recorta y escala automáticamente tu retrato a 413×531 píxeles mientras normaliza el fondo y bloquea el peso bajo 50 KB.',
            bullets: [
              'Resolución exacta: 413 × 531 px a 300 DPI.',
              'Fondo blanco puro o azul pasaporte.',
              'Incluye plantilla de 8 fotos en hoja de 10×15 cm.'
            ]
          }
        ],
        proTip: 'Descarga también la hoja de 10×15 cm con 8 fotos y marcas de corte milimétricas.',
        ctaButtonLabel: 'Calibrar Foto 35×45 mm Ahora →',
        faqs: [
          {
            question: '¿Cuántos píxeles tiene una foto de 35x45 mm?',
            answer: 'A 300 DPI de resolución de impresión, mide exactamente 413 píxeles de ancho por 531 píxeles de alto.'
          }
        ]
      },
      ar: {
        title: 'دليل مقاس صورة جواز السفر والبطاقة الوطنية 35×45 مم (413×531 بكسل)',
        metaDescription: 'اضبط صورتك على المقاس البيومتري الرسمي 35×45 مم (3.5×4.5 سم أي 413×531 بكسل بدقة 300 DPI) تحت 50 كيلوبايت لجواز السفر والبطاقة الوطنية CNIE وتأشيرة شنغن.',
        excerpt: 'يعادل مقاس 35×45 مم بالضبط 413 × 531 بكسل عند دقة 300 DPI. تعرّف على كيفية معايرة وضغط صورتك الرسمية في ثوانٍ.',
        primaryKeywords: ['مقاس صورة جواز السفر 35x45 مم بالبكسل', 'صورة البطاقة الوطنية المغربية cnie', '413x531 بكسل 300 dpi'],
        intro: 'يُعد مقاس 35 × 45 مليمتر (3.5 × 4.5 سم) المعيار البيومتري الدولي المعتمد لجوازات السفر وتأشيرة شنغن الأوروبية والبطاقة الوطنية الإلكترونية (CNIE).',
        sections: [
          {
            heading: 'التحويل الدقيق: 35×45 مم = 413 × 531 بكسل (300 DPI)',
            body: 'يقوم القالب الجاهز في موقعنا بضبط الأبعاد تلقائياً إلى 413×531 بكسل مع توحيد الخلفية البيضاء أو الزرقاء وقفل الحجم تحت 50 كيلوبايت.',
            bullets: [
              'أبعاد دقيقة 413×531 بكسل مطابقة لمعيار ISO.',
              'توحيد لون الخلفية وإزالة الظلال.',
              'إمكانية طباعة ورقة 10×15 سم تضم 8 صور جاهزة للقص.'
            ]
          }
        ],
        proTip: 'يمكنك تنزيل ورقة صيدلية 10×15 سم تحتوي على 8 صور بمقاس 35×45 مم مع علامات القص.',
        ctaButtonLabel: 'فتح معاير صور 35×45 مم الآن ←',
        faqs: [
          {
            question: 'كم يبلغ مقاس 35×45 مم بالبكسل؟',
            answer: 'عند دقة 300 نقطة في البوصة (300 DPI)، يبلغ المقاس 413 بكسل عرضاً في 531 بكسل ارتفاعاً.'
          }
        ]
      }
    }
  },

  // =========================================================================
  // ARTICLE 5: US VISA DS-160 & DV LOTTERY 2x2 INCH (600x600 PX)
  // =========================================================================
  {
    id: 'us-visa-2x2-inch-photo-guide',
    slug: 'us-visa-ds160-dv-lottery-2x2-inch-600x600-photo-compressor',
    number: 5,
    category: 'passport-visa',
    readingTimeMin: 5,
    presetId: 'us-visa-2x2',
    targetKb: 100,
    specs: {
      dimensionsPx: '600 × 600 px (1:1 Square)',
      physicalSize: '2 × 2 inches (51 × 51 mm)',
      dpi: '300 DPI',
      byteCeiling: '≤ 100 KB (Official Max ≤ 240 KB)'
    },
    translations: {
      en: {
        title: 'US Visa DS-160 & DV Lottery 2×2 Inch (600×600 px) Photo Size & KB Guide',
        metaDescription: 'Format and compress your square 2×2 inch (600×600 pixels, 51×51 mm) portrait with a pure white background under 100KB/240KB for US Visa DS-160 and Green Card DV Lottery.',
        excerpt: 'The US Department of State requires a strict 1:1 square 600×600 pixel JPEG under 240 KB on a pure white background. Calibrate yours to a safe 100 KB in 1 click.',
        primaryKeywords: ['2x2 inch photo 600x600 pixels', 'us visa ds-160 photo compressor', 'dv lottery photo size under 240kb', '51x51mm square passport photo'],
        intro: 'Applying for a United States non-immigrant visa (Form DS-160), immigrant visa, or the Diversity Visa (DV) Green Card Lottery requires strict adherence to US Department of State digital photo rules. Even a 1-pixel deviation from a 1:1 square causes automatic portal rejection.',
        sections: [
          {
            heading: 'Official US Department of State Digital Photo Requirements',
            body: 'Unlike European 35×45 mm rectangular photos, the US standard is a 2 × 2 inch (51 × 51 mm) square.',
            bullets: [
              'Exact Pixel Dimensions: 600 × 600 pixels (minimum) in a strict 1:1 square aspect ratio.',
              'Maximum File Size: Must be ≤ 240 KB in sRGB JPEG format (our preset locks it cleanly under 100 KB for instant upload speed and zero compression artifacts).',
              'Background Color: Plain pure white or off-white without shadows.'
            ]
          }
        ],
        proTip: 'Never use an image resizer that stretches a rectangular photo into a square—our 600×600 px preset uses smart center-crop geometry so your facial proportions remain 100% natural.',
        ctaButtonLabel: 'Calibrate 2×2" US Visa Photo (600×600 px) →',
        faqs: [
          {
            question: 'What is the exact pixel and KB size for DV Lottery and DS-160 photos?',
            answer: 'Your photo must be a square 600×600 pixel JPEG file weighing 240 KB or less. Locking it under 100 KB guarantees fast acceptance.'
          }
        ]
      },
      fr: {
        title: 'Photo Visa USA DS-160 & DV Lottery 2×2 Pouces (600×600 px) : Guide & Compression',
        metaDescription: 'Préparez votre photo carrée 2×2 pouces (51×51 mm / 600×600 pixels) sur fond blanc pur sous 100 Ko (norme ≤ 240 Ko) pour le Visa américain DS-160 et la Green Card Lottery.',
        excerpt: 'Le Département d’État américain exige une photo carrée de 600×600 pixels (2×2 pouces) en JPEG sous 240 Ko. Calibrez votre photo à 100 Ko sans déformation.',
        primaryKeywords: ['photo visa usa 2x2 pouces 600x600', 'photo dv lottery 600x600 ko', 'format photo ds-160 fond blanc'],
        intro: 'Pour une demande de visa américain (formulaire DS-160) ou la loterie Green Card (DV Lottery), la photo doit impérativement être carrée : 2 × 2 pouces (51 × 51 mm), soit 600 × 600 pixels.',
        sections: [
          {
            heading: 'Normes Officielles US Department of State',
            body: 'Notre préréglage « Visa USA (2×2 pouces) » recadre automatiquement votre portrait au format carré 600×600 px sans écraser le visage, applique un fond blanc pur et verrouille le poids sous 100 Ko (largement sous la limite officielle de 240 Ko).',
            bullets: [
              'Format carré strict : 600 × 600 pixels (300 DPI).',
              'Poids sécurisé : ≤ 100 Ko en JPEG sRGB.',
              'Recadrage centré intelligent sans déformation.'
            ]
          }
        ],
        proTip: 'Cliquez sur le bouton ci-dessous pour charger directement le calibreur 600×600 px.',
        ctaButtonLabel: 'Calibrer une Photo Visa USA 2×2" →',
        faqs: [
          {
            question: 'Quelle est la taille maximale en Ko pour la loterie Green Card (DV Lottery) ?',
            answer: 'La limite officielle est de 240 Ko pour une image de 600×600 pixels. Notre outil la calibre sous 100 Ko avec une netteté maximale.'
          }
        ]
      },
      es: {
        title: 'Foto Visa Americana DS-160 y Lotería de Visas 2×2 Pulgadas (600×600 px)',
        metaDescription: 'Ajusta y comprime tu foto cuadrada de 2×2 pulgadas (51×51 mm / 600×600 píxeles) con fondo blanco bajo 100KB/240KB para la Visa EE.UU. DS-160 y DV Lottery.',
        excerpt: 'El Departamento de Estado de EE.UU. exige una imagen cuadrada de 600×600 píxeles en formato JPEG menor de 240 KB. Calibra la tuya en 1 clic.',
        primaryKeywords: ['foto visa americana 2x2 pulgadas', '600x600 pixeles foto loteria visas', 'comprimir foto ds-160'],
        intro: 'Para el formulario DS-160 de visa estadounidense o la Lotería de Visas (Green Card DV Lottery), es obligatorio subir una fotografía cuadrada de 2 × 2 pulgadas (600 × 600 píxeles).',
        sections: [
          {
            heading: 'Requisitos Oficiales de 600×600 Píxeles y Peso en KB',
            body: 'Nuestro preset Visa EE.UU. (2×2") aplica un recorte cuadrado centrado sin deformar el rostro, normaliza el fondo blanco y bloquea el archivo bajo 100 KB.',
            bullets: [
              'Dimensiones exactas: 600 × 600 píxeles.',
              'Peso garantizado bajo 100 KB (límite oficial 240 KB).',
              'Fondo blanco puro de estudio.'
            ]
          }
        ],
        proTip: 'Evita estirar fotos rectangulares; nuestro recorte automático mantiene las proporciones reales del rostro.',
        ctaButtonLabel: 'Calibrar Foto Visa EE.UU. 2×2" →',
        faqs: [
          {
            question: '¿Cuánto debe pesar la foto para la Visa Americana DS-160?',
            answer: 'Debe pesar menos de 240 KB y medir 600×600 píxeles. Ajustarla a 100 KB garantiza aceptación inmediata.'
          }
        ]
      },
      ar: {
        title: 'دليل مقاس صورة التأشيرة الأمريكية DS-160 واللوتري 2×2 بوصة (600×600 بكسل)',
        metaDescription: 'اضبط واضغط صورتك المربعة بمقاس 2×2 بوصة (51×51 مم / 600×600 بكسل) بخلفية بيضاء نقية تحت 100 كيلوبايت لتأشيرة أمريكا واللوتري (DV Lottery).',
        excerpt: 'تشترط وزارة الخارجية الأمريكية صورة مربعة بدقة 600×600 بكسل وحجم أقل من 240 كيلوبايت على خلفية بيضاء. اضبط صورتك بضغطة واحدة.',
        primaryKeywords: ['مقاس صورة اللوتري الامريكي 600x600', 'صورة التأشيرة الأمريكية 2x2 بوصة', 'ضغط صورة اللوتري DS-160'],
        intro: 'يتطلب التقديم على التأشيرة الأمريكية (استمارة DS-160) أو قرعة الهجرة العشوائية (DV Lottery) صورة مربعة تماماً بمقاس 2 × 2 بوصة (51 × 51 مم) أي 600 × 600 بكسل.',
        sections: [
          {
            heading: 'المواصفات الرسمية لصور التأشيرة الأمريكية والجرين كارد',
            body: 'يقوم قالب التأشيرة الأمريكية في موقعنا بقص الصورة بشكل مربع متوازن 600×600 بكسل دون مطّ الوجه، مع توحيد الخلفية البيضاء وضبط الحجم تحت 100 كيلوبايت.',
            bullets: [
              'أبعاد مربعة دقيقة: 600 × 600 بكسل.',
              'حجم مثالي تحت 100 كيلوبايت (الحد الرسمي 240 كيلوبايت).',
              'خلفية بيضاء نقية مطابقة للشروط.'
            ]
          }
        ],
        proTip: 'استخدم الزر أدناه لفتح القالب المربع 600×600 بكسل جاهزاً للاستخدام فوراً.',
        ctaButtonLabel: 'ضبط صورة التأشيرة الأمريكية 2×2 بوصة ←',
        faqs: [
          {
            question: 'ما هو الحجم والأبعاد المطلوبة لصورة اللوتري الأمريكي؟',
            answer: 'الأبعاد المطلوبة هي 600×600 بكسل بصيغة JPEG وحجم لا يتجاوز 240 كيلوبايت.'
          }
        ]
      }
    }
  },

  // =========================================================================
  // ARTICLE 6: COMPRESS PHOTO TO 100KB EXACT
  // =========================================================================
  {
    id: 'compress-photo-to-100kb-exact',
    slug: 'compress-photo-to-100kb-without-losing-sharpness-300-dpi',
    number: 6,
    category: 'exact-kb',
    readingTimeMin: 4,
    presetId: 'us-visa-2x2',
    targetKb: 100,
    specs: {
      dimensionsPx: '600 × 600 px (or Custom)',
      physicalSize: '51 × 51 mm / Custom',
      dpi: '300 DPI',
      byteCeiling: '≤ 100.0 KB (102,400 Bytes)'
    },
    translations: {
      en: {
        title: 'How to Compress a Photo to 100KB Exact While Keeping 300 DPI Print Sharpness',
        metaDescription: 'Reduce high-resolution camera photos to under 100KB (94KB–99.8KB) with zero loss in visual detail. Ideal for professional portals, HR badges, and visa uploads.',
        excerpt: 'Need to shrink a 5 MB smartphone portrait or document scan under 100 KB without pixelation? See how 7-pass binary search preserves 100% print-grade clarity.',
        primaryKeywords: ['compress photo to 100kb', 'reduce jpg size under 100kb', 'image compressor 100kb online free'],
        intro: 'A 100 KB (102,400-byte) limit is widely used by corporate HR badge systems, professional licensing boards, embassy portals, and scholarship applications.',
        sections: [
          {
            heading: 'Maximizing Detail Inside a 100 KB Budget',
            body: 'When you target 100 KB in CompressPhoto, the 7-pass binary search engine converges right between 95 KB and 99.8 KB—retaining high-frequency skin texture, eyeglasses detail, and crisp typography on scanned documents.',
            bullets: [
              'Sub-Pixel Sharpness: Preserves fine details up to 800×800 px or 600×600 px.',
              'Zero Metadata Bloat: Strips unnecessary camera EXIF headers that often waste 30–60 KB on their own.',
              'Instant PDF Option: Wrap your 100 KB image into a verified ≤ 100 KB PDF in one click.'
            ]
          }
        ],
        proTip: 'Stripping EXIF camera metadata alone saves up to 50 KB before image compression even begins!',
        ctaButtonLabel: 'Compress Photo Under 100 KB →',
        faqs: [
          {
            question: 'Does compressing to 100KB remove hidden EXIF GPS data?',
            answer: 'Yes. Re-encoding on the browser HTML5 Canvas automatically strips all private camera EXIF and GPS metadata, saving kilobytes and protecting your privacy.'
          }
        ]
      },
      fr: {
        title: 'Compresser une Photo à 100 Ko Sans Perdre la Netteté 300 DPI',
        metaDescription: 'Réduisez une photo haute résolution de plusieurs mégaoctets sous la barre des 100 Ko (95–99,8 Ko) tout en conservant une qualité d’impression 300 DPI.',
        excerpt: 'Comment passer d’une photo smartphone de 4 Mo à moins de 100 Ko sans aucune pixellisation ? Découvrez la suppression EXIF et la recherche binaire.',
        primaryKeywords: ['compresser photo 100 ko', 'réduire image sous 100 ko', 'compresseur jpg 100 ko gratuit'],
        intro: 'La limite de 100 Ko (102 400 octets) est très fréquente pour les badges professionnels, les dossiers d’ambassade et les portails RH.',
        sections: [
          {
            heading: 'Suppression des Métadonnées EXIF & Calibration 100 Ko',
            body: 'Les photos de smartphone contiennent jusqu’à 50 Ko de métadonnées invisibles (EXIF, GPS). Notre moteur les supprime automatiquement et consacre 100% des 100 Ko à la qualité visuelle.',
            bullets: [
              'Netteté maximale entre 95 Ko et 99,8 Ko.',
              'Suppression automatique des données EXIF/GPS.',
              'Exportation directe en JPG, WebP ou PDF ≤ 100 Ko.'
            ]
          }
        ],
        proTip: 'Le nettoyage automatique des métadonnées EXIF économise jusqu’à 50 Ko sans toucher à la qualité de l’image.',
        ctaButtonLabel: 'Compresser une Photo sous 100 Ko →',
        faqs: [
          {
            question: 'Les données GPS de mon téléphone sont-elles supprimées ?',
            answer: 'Oui, le traitement sur le Canvas du navigateur supprime toutes les métadonnées EXIF et GPS cachées.'
          }
        ]
      },
      es: {
        title: 'Cómo Comprimir una Foto a 100KB Sin Perder Nitidez (300 DPI)',
        metaDescription: 'Reduce fotos de alta resolución por debajo de 100KB (95–99.8KB) eliminando metadatos EXIF y conservando el 100% de la claridad visual.',
        excerpt: 'Pasa de una foto de móvil de 4 MB a menos de 100 KB sin pixelado gracias a la limpieza de metadatos EXIF y búsqueda binaria en 7 pasadas.',
        primaryKeywords: ['comprimir foto a 100kb', 'reducir imagen a 100kb sin perder calidad', 'compresor jpg 100kb'],
        intro: 'El límite de 100 KB (102,400 bytes) es ideal para portales profesionales, credenciales corporativas y formularios consulares.',
        sections: [
          {
            heading: 'Limpieza de Metadatos EXIF y Precisión a 100 KB',
            body: 'Al eliminar los datos ocultos de la cámara (EXIF) y ajustar el punto exacto de cuantización JPEG, tu imagen mantiene calidad fotográfica completa en ~98 KB.',
            bullets: [
              'Eliminación automática de metadatos EXIF/GPS.',
              'Calidad visual intacta a 300 DPI.',
              'Compatible con descarga en JPG y PDF ≤ 100 KB.'
            ]
          }
        ],
        proTip: 'Eliminar los datos EXIF ocultos ahorra hasta 50 KB automáticamente.',
        ctaButtonLabel: 'Comprimir Foto a 100 KB →',
        faqs: [
          {
            question: '¿Se borran los datos ocultos de ubicación GPS al comprimir?',
            answer: 'Sí, el procesamiento local en Canvas elimina todos los metadatos EXIF y GPS por completo.'
          }
        ]
      },
      ar: {
        title: 'كيفية ضغط الصورة إلى 100 كيلوبايت مع الحفاظ على دقة الطباعة 300 DPI',
        metaDescription: 'صغّر حجم الصور عالية الدقة من عدة ميجابايت إلى أقل من 100 كيلوبايت (95–99.8 كيلوبايت) بدون أي فقدان في الوضوح مع إزالة بيانات EXIF الخفية.',
        excerpt: 'هل تحتاج إلى تقليص صورة هاتف بحجم 4 ميجابايت إلى أقل من 100 كيلوبايت دون تشويش؟ تعرّف على كيف تحافظ تقنية الـ 7 مراحل على نقاء التفاصيل.',
        primaryKeywords: ['ضغط الصورة إلى 100 كيلوبايت', 'تصغير حجم الصورة 100kb', 'ضغط الصور بدون فقدان الجودة'],
        intro: 'يُستخدم سقف 100 كيلوبايت على نطاق واسع في بوابات السفارات وبطاقات العمل المهنية والتسجيل الأكاديمي.',
        sections: [
          {
            heading: 'إزالة بيانات EXIF الخفية واستغلال كامل مساحة 100 كيلوبايت',
            body: 'تحتوي صور الهواتف على بيانات خفية (EXIF) تستهلك حتى 50 كيلوبايت. تقوم أداتنا بحذف هذه البيانات تلقائياً وتخصيص كامل الـ 100 كيلوبايت لنقاء الصورة.',
            bullets: [
              'حجم دقيق بين 95 و 99.8 كيلوبايت.',
              'حذف تلقائي لبيانات الكاميرا والموقع الجغرافي EXIF.',
              'دعم التنزيل بصيغة JPG و PDF تحت 100 كيلوبايت.'
            ]
          }
        ],
        proTip: 'حذف بيانات الكاميرا الخفية يوفر عشرات الكيلوبايتات لصالح وضوح الصورة.',
        ctaButtonLabel: 'اضغط صورتك تحت 100 كيلوبايت الآن ←',
        faqs: [
          {
            question: 'هل يتم حذف بيانات الموقع الجغرافي EXIF من الصورة؟',
            answer: 'نعم، المعالجة داخل المتصفح تزيل جميع البيانات الوصفية الخفية لحماية خصوصيتك وتقليل حجم الملف.'
          }
        ]
      }
    }
  },

  // =========================================================================
  // ARTICLE 7: PRINT 8 PASSPORT PHOTOS ON A 4x6 INCH (10x15 CM) SHEET
  // =========================================================================
  {
    id: 'print-8-passport-photos-4x6-sheet',
    slug: 'how-to-print-8-passport-photos-on-4x6-inch-10x15cm-sheet',
    number: 7,
    category: 'pdf-print',
    readingTimeMin: 4,
    presetId: 'schengen-35x45',
    targetKb: 50,
    specs: {
      dimensionsPx: '1800 × 1200 px Sheet (4×2 Grid)',
      physicalSize: '4 × 6 inches (10 × 15 cm)',
      dpi: '300 DPI Print Master',
      byteCeiling: '8 Biometric Photos + Crop Marks'
    },
    translations: {
      en: {
        title: 'How to Print 8 Passport Photos on a Single 4×6 Inch (10×15 cm) Sheet',
        metaDescription: 'Generate a free 300 DPI 4×6 inch (10×15 cm) printable pharmacy sheet with 8 biometric passport photos, millimeter crop marks, and optional studio date stamp.',
        excerpt: 'Photo booths charge $12–$18 for 4 passport photos. With our built-in 4×6" (10×15 cm) sheet generator, you can print 8 calibrated photos at any pharmacy or home printer for $0.30.',
        primaryKeywords: ['4x6 passport photo sheet 8 photos', 'print passport photo on 4x6 paper', '10x15 cm passport photo template free'],
        intro: 'Once you have calibrated your digital passport or visa portrait, you often need physical printed copies to bring to the embassy or consulate. Instead of paying $15 at a photo booth, you can tile 8 exact-size photos onto a standard 4×6 inch (10×15 cm) postcard sheet.',
        sections: [
          {
            heading: 'Built-In 300 DPI 4×2 Grid with Millimeter Crop Marks',
            body: 'Clicking "Print 8-Photo Sheet (4×6")" in Step 3 generates an 1800×1200 pixel print master at 300 DPI containing 8 identical portraits arranged in a 4×2 grid, complete with precision corner cut marks (┌ ┐ └ ┘) and an optional studio verification date stamp.',
            bullets: [
              'True Physical Scale: Printing on standard 4×6" (10×15 cm) glossy paper without scaling ("100% Actual Size") yields exact 35×45 mm cutouts.',
              'Precision Scissor Guides: Corner trim ticks prevent crooked cutting.',
              'Optional Studio Date Stamp: Toggle the verification footer on or off before downloading.'
            ]
          }
        ],
        proTip: 'When printing at a pharmacy kiosk (CVS, Walgreens, Boots, Carrefour, Rossmann) or home printer, always select "4×6 inch / 10×15 cm" and "Borderless / 100% Scale".',
        ctaButtonLabel: 'Create Printable 8-Photo 4×6" Sheet →',
        faqs: [
          {
            question: 'How many 35x45mm passport photos fit on a 4x6 inch (10x15 cm) sheet?',
            answer: 'Eight (8) 35×45 mm photos fit comfortably in a 4×2 grid on a 4×6 inch (10×15 cm) photo sheet with breathing room and scissor crop marks.'
          }
        ]
      },
      fr: {
        title: 'Imprimer 8 Photos d’Identité sur une Feuille 10×15 cm (Planche Pharmacie Gratuite)',
        metaDescription: 'Générez gratuitement une planche photo 10×15 cm (4×6 pouces) à 300 DPI contenant 8 photos d’identité 35×45 mm avec traits de coupe et tampon de date.',
        excerpt: 'Économisez le prix d’un Photomaton : générez une planche de 8 photos d’identité sur un format carte postale 10×15 cm prêt à imprimer en borne photo ou chez vous.',
        primaryKeywords: ['planche photo identité 10x15 gratuit', 'imprimer 8 photos identité 10x15 cm', 'gabarit photo passeport 35x45mm'],
        intro: 'Plutôt que de payer 8 € en cabine photo pour 4 tirages, notre générateur de planche 10×15 cm (4×6 pouces) dispose automatiquement 8 photos biométriques en grille 4×2 à 300 DPI.',
        sections: [
          {
            heading: 'Traits de Coupe Millimétrés et Tampon d’Atelier',
            body: 'En cliquant sur « Planche 8 Photos (10×15 cm) » à l’étape 3, vous obtenez un fichier haute définition 1800×1200 px avec repères de découpe aux quatre coins de chaque photo.',
            bullets: [
              '8 photos calibrées sur une seule feuille 10×15 cm.',
              'Repères de coupe ┌ ┐ └ ┘ pour un découpage net aux ciseaux.',
              'Tampon de date d’atelier activable ou désactivable en 1 clic.'
            ]
          }
        ],
        proTip: 'Sur une borne d’impression en supermarché ou pharmacie, choisissez le tirage classique 10×15 cm (coût moyen : 0,25 €).',
        ctaButtonLabel: 'Créer une Planche 8 Photos 10×15 cm →',
        faqs: [
          {
            question: 'Les dimensions 35x45 mm sont-elles respectées à l’impression 10x15 cm ?',
            answer: 'Oui, la planche est calibrée à exactement 300 DPI (1800×1200 px) pour que chaque photo mesure 35×45 mm sur papier 10×15 cm.'
          }
        ]
      },
      es: {
        title: 'Cómo Imprimir 8 Fotos Carnet / Pasaporte en una Hoja de 10×15 cm (4×6")',
        metaDescription: 'Crea gratis una plantilla de 10×15 cm (4×6 pulgadas) a 300 DPI con 8 fotos tamaño pasaporte, marcas de corte milimétricas y sello de fecha.',
        excerpt: 'Ahorra dinero en estudios fotográficos: genera una hoja estándar de 10×15 cm (4×6") con 8 fotos biométricas listas para imprimir en cualquier farmacia o en casa.',
        primaryKeywords: ['plantilla 8 fotos carnet 10x15', 'imprimir fotos pasaporte hoja 4x6', 'hoja 10x15 fotos carnet gratis'],
        intro: 'Con el botón "Hoja de 8 Fotos (10×15 cm)" en el Paso 3, puedes armar instantáneamente una plantilla de impresión a 300 DPI con 8 fotografías alineadas y listas para recortar.',
        sections: [
          {
            heading: 'Cuadrícula 4×2 a 300 DPI con Guías de Corte',
            body: 'La hoja generada mide 1800×1200 píxeles e incluye marcas de corte en cada esquina y un sello de fecha opcional.',
            bullets: [
              '8 fotos por hoja estándar de 10×15 cm (4×6 pulgadas).',
              'Guías de corte precisas para tijera o guillotina.',
              'Descarga inmediata en JPG de alta resolución.'
            ]
          }
        ],
        proTip: 'Imprime en papel fotográfico brillante de 10×15 cm al 100% de escala.',
        ctaButtonLabel: 'Crear Hoja de 8 Fotos (10×15 cm) →',
        faqs: [
          {
            question: '¿Cuántas fotos caben en una hoja de 10x15 cm?',
            answer: 'Caben 8 fotos tamaño carnet/pasaporte organizadas en 2 filas de 4 fotos con marcas de recorte.'
          }
        ]
      },
      ar: {
        title: 'كيفية طباعة 8 صور جواز سفر في ورقة واحدة مقاس 10×15 سم (4×6 بوصة)',
        metaDescription: 'أنشئ مجاناً ورقة طباعة مقاس 10×15 سم (4×6 بوصة) بدقة 300 DPI تضم 8 صور شخصية مع علامات القص وختم التاريخ الاختياري.',
        excerpt: 'وفّر تكلفة استوديوهات التصوير: صمّم ورقة طباعة قياسية 10×15 سم تحتوي على 8 صور جواز سفر جاهزة للطباعة الفورية في المنزل أو الصيدلية.',
        primaryKeywords: ['طباعة 8 صور في ورقة 10x15', 'قالب صور جواز السفر 4x6 بوصة', 'تجميع 8 صور شخصية للطباعة'],
        intro: 'بعد ضبط مقاس صورتك البيومترية، يمكنك بضغطة زر واحدة على « ورقة طباعة 8 صور (10×15 سم) » توليد لوحة طباعة عالية الدقة تضم 8 نسخ مرتبة في شبكة 4×2.',
        sections: [
          {
            heading: 'دقة 300 DPI مع علامات قص بالمليمتر',
            body: 'تأتي اللوحة بأبعاد 1800×1200 بكسل مع علامات زاوية دقيقة (┌ ┐ └ ┘) لتسهيل القص بالمقص، بالإضافة إلى إمكانية إظهار أو إخفاء ختم التاريخ.',
            bullets: [
              '8 صور متطابقة على ورق قياسي 10×15 سم (4×6 بوصة).',
              'علامات قص واضحة لضمان أبعاد متساوية.',
              'تنزيل فوري ومجاني بصيغة JPG.'
            ]
          }
        ],
        proTip: 'عند الطباعة، اختر مقاس ورق 10×15 سم (4×6 بوصة) بنسبة مقياس 100%.',
        ctaButtonLabel: 'إنشاء ورقة طباعة 8 صور الآن ←',
        faqs: [
          {
            question: 'كم عدد الصور التي تتسع لها ورقة 10×15 سم؟',
            answer: 'تتسع لـ 8 صور قياسية مرتبة في صفين مع هوامش وعلامات قص دقيقة.'
          }
        ]
      }
    }
  },

  // =========================================================================
  // ARTICLE 8: CONVERT & COMPRESS PHOTO TO EXACT-KB PDF (< 50KB / 100KB)
  // =========================================================================
  {
    id: 'compress-photo-to-exact-kb-pdf',
    slug: 'convert-and-compress-photo-to-exact-kb-pdf-under-50kb-100kb',
    number: 8,
    category: 'pdf-print',
    readingTimeMin: 4,
    presetId: 'schengen-35x45',
    targetKb: 50,
    specs: {
      dimensionsPx: 'Matches Image Resolution',
      physicalSize: 'ISO-32000 PDF 1.4 Container',
      dpi: '300 DPI Embedded Stream',
      byteCeiling: '≤ Target KB (20 KB / 50 KB / 100 KB)'
    },
    translations: {
      en: {
        title: 'How to Convert & Compress a Photo to an Exact-KB PDF (< 50KB or 100KB)',
        metaDescription: 'Convert any JPG or PNG image into a lightweight PDF strictly under 20KB, 50KB, or 100KB in 1 click using our zero-bloat ISO-32000 PDF compiler.',
        excerpt: 'Many portals ask for your ID photo or signature scan in .PDF format under 50 KB—but standard "Print to PDF" tools add 150 KB of font and metadata overhead. Here is the fix.',
        primaryKeywords: ['compress jpg to pdf under 50kb', 'convert photo to pdf exact kb size', 'reduce pdf size to 50kb online', 'image to pdf under 100kb'],
        intro: 'Have you ever compressed a JPG image down to 35 KB, converted it to PDF using your computer’s "Print to PDF" feature, and watched the PDF balloon to 220 KB? Standard PDF printers embed bulky color profiles, fonts, and XML metadata.',
        sections: [
          {
            heading: 'Our Zero-Overhead ISO-32000 PDF Compiler',
            body: 'CompressPhoto includes a custom binary PDF 1.4 compiler written specifically for strict byte ceilings. It reserves 1.5 KB for a minimal ISO-32000 PDF header/xref table and packs your binary-searched JPEG stream directly inside—so a 50 KB target produces a PDF weighing ~48.5 KB.',
            bullets: [
              'Zero Font or XML Bloat: Only ~1,200 bytes of container overhead.',
              'Exact Byte Budget: Automatically deducts PDF header bytes before running the 7-pass image search.',
              '100% Offline & Private: Compiled in memory as a Blob—your document never touches a server.'
            ]
          }
        ],
        proTip: 'Set your Max KB in Step 2 (e.g., 50 KB), then click "Download as PDF (≤ 50 KB)" in Step 3!',
        ctaButtonLabel: 'Convert Photo to Exact-KB PDF (≤ 50 KB) →',
        faqs: [
          {
            question: 'Why does my 40KB JPG become 200KB when saved as a PDF on my computer?',
            answer: 'OS PDF printers re-compress the image and attach heavy ICC color profiles. Our Exact-KB PDF compiler wraps the raw compressed JPEG stream with less than 1.5 KB of header bytes.'
          }
        ]
      },
      fr: {
        title: 'Convertir et Compresser une Photo en PDF au Ko Exact (< 50 Ko ou 100 Ko)',
        metaDescription: 'Transformez une image JPG ou PNG en fichier PDF strictement inférieur à 20 Ko, 50 Ko ou 100 Ko grâce à notre compilateur PDF ISO-32000 sans surpoids.',
        excerpt: 'Les imprimantes PDF classiques ajoutent plus de 150 Ko de métadonnées inutiles. Notre compilateur PDF intègre votre photo avec seulement 1,2 Ko d’en-tête.',
        primaryKeywords: ['convertir photo en pdf moins de 50 ko', 'compresser image en pdf 50 ko', 'pdf moins de 100 ko en ligne'],
        intro: 'Lorsque vous enregistrez une image de 40 Ko en PDF via « Imprimer en PDF », le fichier grimpe souvent à 200 Ko. Notre compilateur PDF minimaliste résout ce problème en encapsulant directement le flux JPEG binaire.',
        sections: [
          {
            heading: 'Compilation PDF 1.4 Ultra-Légère en 1 Clic',
            body: 'Choisissez votre plafond en Ko (ex. 50 Ko) puis cliquez sur « Télécharger en PDF (≤ 50 KB) » : le fichier PDF final respecte strictement votre limite.',
            bullets: [
              'En-tête PDF ultra-léger (~1,2 Ko seulement).',
              'Respect strict du plafond (20 Ko, 50 Ko, 100 Ko).',
              'Création 100% locale dans le navigateur.'
            ]
          }
        ],
        proTip: 'Cliquez sur « Télécharger en PDF » à l’étape 3 après avoir choisi votre taille max en Ko.',
        ctaButtonLabel: 'Convertir en PDF ≤ 50 Ko →',
        faqs: [
          {
            question: 'Le fichier PDF généré est-il lisible par tous les portails administratifs ?',
            answer: 'Oui, il respecte la norme universelle ISO-32000 (PDF 1.4) compatible avec 100% des lecteurs et portails.'
          }
        ]
      },
      es: {
        title: 'Cómo Convertir y Comprimir una Foto a PDF con KB Exactos (< 50KB / 100KB)',
        metaDescription: 'Convierte cualquier foto JPG o PNG en un archivo PDF estrictamente menor de 20KB, 50KB o 100KB usando nuestro compilador PDF ISO-32000 ultraligero.',
        excerpt: '¿Tu imagen de 40 KB sube a 200 KB al guardarla como PDF? Nuestro compilador directo envuelve tu foto en un PDF válido con solo 1.2 KB de cabecera.',
        primaryKeywords: ['convertir foto a pdf menos de 50kb', 'comprimir jpg a pdf 50kb', 'imagen a pdf 100kb exactos'],
        intro: 'Muchos portales de trámites exigen subir documentos o fotos en formato .PDF por debajo de 50 KB o 100 KB. Nuestro compilador directo crea un PDF ISO-32000 sin metadatos pesados.',
        sections: [
          {
            heading: 'Compilador PDF Directo Sin Sobrepeso',
            body: 'El motor descuenta automáticamente los bytes de la cabecera PDF para que el archivo `.pdf` descargado quede siempre por debajo de tu límite elegido.',
            bullets: [
              'Cabecera PDF mínima (~1.2 KB).',
              'Peso total garantizado ≤ 50 KB o 100 KB.',
              '100% privado en tu navegador.'
            ]
          }
        ],
        proTip: 'Haz clic en "Descargar como PDF" en el Paso 3 para obtener tu PDF ligero al instante.',
        ctaButtonLabel: 'Convertir Foto a PDF ≤ 50 KB →',
        faqs: [
          {
            question: '¿Por qué pesa tan poco el PDF generado aquí?',
            answer: 'Porque insertamos el flujo JPEG optimizado directamente en un contenedor PDF 1.4 limpio sin fuentes ni perfiles innecesarios.'
          }
        ]
      },
      ar: {
        title: 'كيفية تحويل وضغط الصورة إلى ملف PDF بحجم كيلوبايت دقيق (< 50KB أو 100KB)',
        metaDescription: 'حوّل أي صورة JPG أو PNG إلى ملف PDF خفيف بحجم أقل من 20 أو 50 أو 100 كيلوبايت بضغطة واحدة عبر مترجم PDF المباشر داخل المتصفح.',
        excerpt: 'عند حفظ صورة كملف PDF بالطريقة التقليدية يزداد حجمها أضعافاً. تعرّف على كيفية تصدير ملف PDF مضبوط تحت 50 كيلوبايت بالضبط.',
        primaryKeywords: ['تحويل الصورة إلى pdf أقل من 50 كيلوبايت', 'ضغط pdf إلى 50 كيلوبايت', 'تحويل jpg إلى pdf بحجم صغير'],
        intro: 'تطلب العديد من المنصات الرسمية رفع الوثائق أو الصور بصيغة PDF بشرط ألا يتجاوز الحجم 50 أو 100 كيلوبايت. يقوم مترجم PDF المدمج في موقعنا بإنشاء ملف PDF قياسي بدون أي إضافات تثقل الحجم.',
        sections: [
          {
            heading: 'تصدير PDF مباشر بمعيار ISO-32000',
            body: 'يحسب المحرك حجم ترويسة PDF (حوالي 1.2 كيلوبايت فقط) مسبقاً ليضمن بقاء ملف PDF النهائي تحت السقف الذي حددته.',
            bullets: [
              'ملف PDF متوافق مع جميع البوابات الرسمية.',
              'التزام صارم بالسقف المحدد (20KB أو 50KB أو 100KB).',
              'تحويل فوري وآمن محلياً.'
            ]
          }
        ],
        proTip: 'اضغط على زر « تنزيل كملف PDF » في الخطوة الثالثة للحصول على الملف فوراً.',
        ctaButtonLabel: 'تحويل الصورة إلى PDF ≤ 50 كيلوبايت ←',
        faqs: [
          {
            question: 'لماذا لا يزداد حجم الصورة عند تحويلها إلى PDF هنا؟',
            answer: 'لأننا نغلف الصورة المضغوطة مباشرة داخل حاوية PDF خفيفة دون إضافة خطوط أو ملفات تعريف غير ضرورية.'
          }
        ]
      }
    }
  },

  // =========================================================================
  // ARTICLE 9: PURE WHITE BACKGROUND (#FFFFFF) FOR ID & AMAZON PHOTOS
  // =========================================================================
  {
    id: 'pure-white-background-passport-amazon',
    slug: 'pure-white-background-passport-photo-and-amazon-1000x1000',
    number: 9,
    category: 'passport-visa',
    readingTimeMin: 4,
    presetId: 'amazon-1000',
    targetKb: 200,
    specs: {
      dimensionsPx: '1000 × 1000 px (or Biometric)',
      physicalSize: '84.7 × 84.7 mm',
      dpi: '300 DPI sRGB',
      byteCeiling: '≤ 200 KB · RGB(255,255,255)'
    },
    translations: {
      en: {
        title: 'How to Get a Pure White Background (#FFFFFF) for Passport & Amazon Photos',
        metaDescription: 'Normalize off-white walls into pure RGB(255,255,255) studio white for biometric passport photos and 1000×1000 px Amazon marketplace product listings.',
        excerpt: 'Both embassy photo scanners and Amazon’s main listing bots reject off-white or cream walls (like RGB 242,239,230). Here is how to normalize your backdrop to pure #FFFFFF.',
        primaryKeywords: ['pure white background passport photo', 'amazon 1000x1000 white background jpg', 'rgb 255 255 255 photo converter'],
        intro: 'Even when you stand in front of a white wall or place a product on white poster board, indoor lighting makes the camera record warm beige or light gray pixels (e.g., `#F2EFE6`). Automated portal bots check corner pixels for pure `#FFFFFF` (`RGB 255, 255, 255`).',
        sections: [
          {
            heading: 'Why Pure #FFFFFF Improves Both Compliance and Compression',
            body: 'In addition to passing automated background checks on visa portals and e-commerce marketplaces (Amazon requires 1000×1000 px on pure RGB 255,255,255 for zoom-ready listings), uniform white 8×8 pixel blocks compress to nearly zero bytes in JPEG—leaving more byte budget for your subject.',
            bullets: [
              'Studio Backdrop Normalizer: Open Optional Cleanup and select "Pure White" or "Passport Blue".',
              'Amazon 1000×1000 Preset: Calibrates square e-commerce product shots under 200 KB.',
              'Side-by-Side Verification: Drag the yellow Before/After line to see the beige wall turn crisp studio white.'
            ]
          }
        ],
        proTip: 'Drag the yellow Before/After slider in the preview box—you can immediately see the original warm wall on the left versus pure #FFFFFF studio white on the right!',
        ctaButtonLabel: 'Open White Studio Calibrator →',
        faqs: [
          {
            question: 'What pixel dimensions does Amazon require for main product images?',
            answer: 'Amazon requires at least 1000×1000 pixels on a pure white RGB(255,255,255) background so customers can use the hover zoom feature.'
          }
        ]
      },
      fr: {
        title: 'Obtenir un Fond Blanc Pur (#FFFFFF) pour Photo d’Identité et Produit Amazon',
        metaDescription: 'Transformez un mur beige ou gris clair en fond blanc pur RGB(255,255,255) pour vos photos de passeport/visa et vos fiches produits Amazon 1000×1000 px.',
        excerpt: 'Un mur blanc éclairé en intérieur apparaît souvent beige sur la photo. Découvrez comment normaliser le fond en blanc pur #FFFFFF ou bleu identité.',
        primaryKeywords: ['fond blanc pur photo identité', 'photo produit amazon 1000x1000 fond blanc', 'blanchir fond photo en ligne'],
        intro: 'Même devant un mur blanc, l’éclairage intérieur crée souvent une teinte beige ou grise rejetée par les robots de vérification biométrique et les marketplaces comme Amazon.',
        sections: [
          {
            heading: 'Normalisation du Fond Blanc RGB(255, 255, 255)',
            body: 'Dans les options de nettoyage, sélectionnez « Blanc Pur » ou « Bleu Identité » pour uniformiser l’arrière-plan tout en réduisant le poids du fichier JPEG.',
            bullets: [
              'Fond blanc pur #FFFFFF conforme aux portails.',
              'Option Bleu Identité pour les cartes officielles.',
              'Format e-commerce 1000×1000 px disponible.'
            ]
          }
        ],
        proTip: 'Déplacez la ligne jaune Avant/Après pour voir la différence entre le fond beige d’origine à gauche et le blanc pur à droite.',
        ctaButtonLabel: 'Tester le Normaliseur Fond Blanc →',
        faqs: [
          {
            question: 'Pourquoi le fond blanc pur réduit-il aussi la taille en Ko ?',
            answer: 'Une couleur blanche uniforme se compresse en quelques octets seulement en JPEG, laissant plus d’octets pour la netteté du sujet.'
          }
        ]
      },
      es: {
        title: 'Cómo Obtener un Fondo Blanco Puro (#FFFFFF) para Pasaporte y Fotos de Amazon',
        metaDescription: 'Convierte fondos beige o grises en blanco puro RGB(255,255,255) para fotos de pasaporte/visa y listados de productos en Amazon (1000×1000 px).',
        excerpt: 'Las paredes blancas suelen verse amarillentas o grises en las fotos caseras. Normaliza tu fondo a blanco puro #FFFFFF en un clic.',
        primaryKeywords: ['fondo blanco puro foto pasaporte', 'foto amazon 1000x1000 fondo blanco', 'blanquear fondo foto carnet'],
        intro: 'Los sistemas automáticos de embajadas y plataformas como Amazon verifican que el fondo sea blanco puro RGB(255,255,255).',
        sections: [
          {
            heading: 'Normalizador de Fondo de Estudio (#FFFFFF y Azul Pasaporte)',
            body: 'Activa el fondo "Blanco Puro" o "Azul Pasaporte" en las opciones avanzadas y comprueba el cambio al instante con el deslizador Antes/Después.',
            bullets: [
              'Blanco puro RGB(255,255,255) sin sombras.',
              'Ahorra hasta un 35% de peso en KB.',
              'Ideal para retratos oficiales y e-commerce.'
            ]
          }
        ],
        proTip: 'Desliza la línea amarilla Antes/Después para comparar el fondo original con el blanco de estudio.',
        ctaButtonLabel: 'Abrir Calibrador de Fondo Blanco →',
        faqs: [
          {
            question: '¿Puedo cambiar el fondo también a Azul Pasaporte?',
            answer: 'Sí, dentro de las opciones de limpieza puedes elegir Original, Blanco Puro o Azul Pasaporte.'
          }
        ]
      },
      ar: {
        title: 'كيفية الحصول على خلفية بيضاء نقية (#FFFFFF) لصور الجواز ومنتجات أمازون',
        metaDescription: 'حوّل الخلفيات الباهتة أو المائلة للصفرة إلى خلفية بيضاء نقية RGB(255,255,255) لصور جواز السفر والتأشيرات وصور منتجات المتاجر الإلكترونية 1000×1000 بكسل.',
        excerpt: 'تظهر الجدران البيضاء في الإضاءة المنزلية بلون بيج أو رمادي باهت. تعرّف على كيفية توحيد الخلفية إلى أبيض نقي #FFFFFF بضغطة واحدة.',
        primaryKeywords: ['خلفية بيضاء نقية لصور الجواز', 'تبييض خلفية الصورة الشخصية', 'صور منتجات أمازون 1000x1000'],
        intro: 'تفحص الأنظمة الآلية في بوابات التأشيرات ومتاجر التجارة الإلكترونية مثل أمازون زوايا الصورة للتأكد من أن الخلفية بيضاء نقية RGB(255,255,255).',
        sections: [
          {
            heading: 'توحيد الخلفية البيضاء أو الزرقاء الرسمية',
            body: 'من خلال خيارات التنقية الإضافية، يمكنك اختيار « أبيض نقي » أو « أزرق رسمي » ومشاهدة الفرق فوراً عبر شريط المقارنة الأصفر (قبل / بعد).',
            bullets: [
              'خلفية بيضاء نقية #FFFFFF مطابقة للمعايير.',
              'توفير كبير في حجم الكيلوبايت لصالح دقة الصورة.',
              'دعم مقاس 1000×1000 بكسل للمتاجر الإلكترونية.'
            ]
          }
        ],
        proTip: 'اسحب الخط الأصفر في شاشة المعاينة لترى كيف تتحول الخلفية الباهتة إلى أبيض استوديو نقي.',
        ctaButtonLabel: 'فتح أداة الخلفية البيضاء الآن ←',
        faqs: [
          {
            question: 'هل يتوفر أيضاً خيار الخلفية الزرقاء الرسمية؟',
            answer: 'نعم، يمكنك التبديل بضغطة واحدة بين الخلفية الأصلية، الأبيض النقي، والأزرق الرسمي.'
          }
        ]
      }
    }
  },

  // =========================================================================
  // ARTICLE 10: JPEG VS WEBP VS PNG & 7-PASS BINARY SEARCH
  // =========================================================================
  {
    id: 'jpeg-vs-webp-vs-png-compression',
    slug: 'compress-jpeg-vs-webp-vs-png-exact-kb-binary-search',
    number: 10,
    category: 'exact-kb',
    readingTimeMin: 5,
    presetId: 'custom',
    targetKb: 30,
    specs: {
      dimensionsPx: 'Custom Width × Height',
      physicalSize: 'JPG · WebP · PNG',
      dpi: '300 DPI',
      byteCeiling: '10 KB – 500 KB Custom'
    },
    translations: {
      en: {
        title: 'Compress JPEG vs. WebP vs. PNG: Which Format Is Best for Exact KB Limits?',
        metaDescription: 'Compare JPEG, WebP, and PNG file sizes and learn how 7-pass binary search locks custom pixel dimensions to any exact kilobyte target (10KB, 15KB, 30KB, 200KB).',
        excerpt: 'Why is a PNG file 8× larger than a JPG? When should you use WebP vs. JPEG? Here is the complete technical guide to choosing the right image format for strict KB ceilings.',
        primaryKeywords: ['compress jpeg vs webp vs png', 'compress image to exact kb', 'custom pixel and kb photo resizer', 'compress photo to 15kb 30kb'],
        intro: 'Choosing the wrong image format is the #1 reason people struggle to get a photo under 15 KB, 20 KB, or 30 KB. Understanding how JPEG, WebP, and PNG store pixels lets you pick the best format for any upload portal or website.',
        sections: [
          {
            heading: 'Format Comparison: JPG vs. WebP vs. PNG',
            body: 'Each format uses a completely different compression math inside the browser:',
            bullets: [
              'JPEG (.jpg): Universal compatibility. Required by 99% of government passport, visa, and exam portals. Supports precise 7-pass quantization to hit 10 KB–500 KB.',
              'WebP (.webp): Modern web format that delivers 25–35% sharper details than JPEG at the exact same KB size. Best for websites, blogs, and modern portals.',
              'PNG (.png): Lossless compression. Great for logos, but a 600×600 portrait in PNG weighs 350 KB+. Always convert PNG portraits to JPG or WebP when you need < 50 KB!'
            ]
          }
        ],
        proTip: 'If you upload a heavy .PNG file into CompressPhoto, it automatically converts and locks it into a lightweight .JPG (or .WebP) under your exact KB ceiling.',
        ctaButtonLabel: 'Open Custom Pixel & KB Calibrator →',
        faqs: [
          {
            question: 'Why can’t a PNG portrait be compressed to 20KB without shrinking its resolution?',
            answer: 'PNG is a lossless format without a quality quantization table. Converting that PNG to JPEG or WebP lets our 7-pass engine lock it under 20KB at full resolution.'
          }
        ]
      },
      fr: {
        title: 'JPEG vs WebP vs PNG : Quel Format Choisir pour Compresser au Ko Exact ?',
        metaDescription: 'Comparez les formats JPG, WebP et PNG et découvrez comment calibrer des dimensions personnalisées en pixels sous n’importe quelle limite en Ko (10 Ko, 15 Ko, 30 Ko).',
        excerpt: 'Pourquoi une image PNG est-elle 8 fois plus lourde qu’un JPG ? Quand utiliser le WebP ? Le guide complet pour choisir le bon format et les bonnes dimensions.',
        primaryKeywords: ['compresser jpeg vs webp vs png', 'redimensionner photo pixels et ko', 'compresser image 15 ko 30 ko'],
        intro: 'Le choix du format d’image (JPG, WebP ou PNG) détermine à la fois la compatibilité avec les portails administratifs et la finesse visuelle à poids égal.',
        sections: [
          {
            heading: 'Comparatif Technique : JPG, WebP et PNG',
            body: 'Dans les options avancées de CompressPhoto, vous pouvez basculer entre JPG, WebP et PNG en un clic :',
            bullets: [
              'JPG : compatible avec 100% des portails administratifs, passeports et visas.',
              'WebP : 30% plus net que le JPG à poids égal, idéal pour le web et le e-commerce.',
              'PNG : sans perte, mais trop lourd pour les portails limités à 50 Ko (convertissez vos PNG en JPG automatiquement).'
            ]
          }
        ],
        proTip: 'Si vous déposez une image .PNG lourde dans l’outil, elle est automatiquement convertie en .JPG léger sous votre limite en Ko.',
        ctaButtonLabel: 'Ouvrir le Calibreur sur Mesure →',
        faqs: [
          {
            question: 'Puis-je définir ma propre largeur et hauteur en pixels ?',
            answer: 'Oui, cliquez sur « Dimensions sur Mesure » pour saisir la largeur, la hauteur et le plafond en Ko de votre choix.'
          }
        ]
      },
      es: {
        title: 'JPEG vs. WebP vs. PNG: ¿Qué Formato Elegir para Comprimir al KB Exacto?',
        metaDescription: 'Compara los formatos JPG, WebP y PNG y aprende a calibrar dimensiones personalizadas en píxeles bajo cualquier límite en KB (10KB, 15KB, 30KB).',
        excerpt: '¿Por qué un archivo PNG pesa 8 veces más que un JPG? Descubre qué formato elegir para portales oficiales o sitios web y cómo ajustar píxeles a medida.',
        primaryKeywords: ['comprimir jpeg vs webp vs png', 'cambiar tamaño foto pixeles y kb', 'comprimir imagen a 15kb 30kb'],
        intro: 'Elegir el formato correcto entre JPG, WebP y PNG es clave cuando necesitas cumplir con un límite estricto de kilobytes sin perder nitidez.',
        sections: [
          {
            heading: 'Cuándo Usar JPG, WebP o PNG',
            body: 'Puedes cambiar el formato de salida dentro de las opciones avanzadas:',
            bullets: [
              'JPG: el estándar universal exigido por el 99% de los portales gubernamentales.',
              'WebP: ofrece un 30% más de nitidez al mismo peso en KB para páginas web.',
              'PNG: ideal para logotipos, pero si subes un retrato PNG pesado, nuestra herramienta lo convierte a JPG bajo tu límite en KB.'
            ]
          }
        ],
        proTip: 'Usa el modo "Dimensiones Personalizadas" para elegir cualquier ancho y alto en píxeles junto con tu límite en KB.',
        ctaButtonLabel: 'Abrir Calibrador Personalizado →',
        faqs: [
          {
            question: '¿Puedo subir una foto PNG y descargarla en JPG menor de 30KB?',
            answer: 'Sí, al arrastrar un archivo PNG se convierte y comprime automáticamente a JPG bajo el límite en KB que elijas.'
          }
        ]
      },
      ar: {
        title: 'مقارنة صيغ الصور JPEG و WebP و PNG: أيها أفضل للضغط بالكيلوبايت الدقيق؟',
        metaDescription: 'تعرّف على الفرق بين صيغ JPG و WebP و PNG وكيفية ضبط أبعاد مخصصة بالبكسل تحت أي سقف كيلوبايت (10KB، 15KB، 30KB).',
        excerpt: 'لماذا يكون ملف PNG أكبر بـ 8 مرات من JPG؟ ومتى تستخدم WebP؟ دليلك الشامل لاختيار الصيغة والأبعاد المناسبة للبوابات الرسمية والمواقع.',
        primaryKeywords: ['الفرق بين jpg و png و webp', 'تغيير أبعاد الصورة بالبكسل والكيلوبايت', 'ضغط الصورة إلى 15 كيلوبايت 30 كيلوبايت'],
        intro: 'يُعد اختيار صيغة الملف المناسبة العامل الأهم عند الرغبة في تقليص حجم الصورة إلى 15 أو 30 كيلوبايت مع الحفاظ على أعلى جودة ممكنة.',
        sections: [
          {
            heading: 'متى تختار JPG أو WebP أو PNG؟',
            body: 'يمكنك التبديل بين الصيغ الثلاث من داخل الخيارات الإضافية في الأداة:',
            bullets: [
              'JPG: الصيغة الرسمية المعتمدة في 99% من بوابات الجوازات والتأشيرات والتوظيف.',
              'WebP: تمنح وضوحاً أعلى بنسبة 30% بنفس حجم الكيلوبايت، وهي مثالية للمواقع والمتاجر.',
              'PNG: صيغة غير مضغوطة كبيرة الحجم؛ عند رفع صورة PNG يقوم الموقع بتحويلها وضغطها إلى JPG خفيف تلقائياً.'
            ]
          }
        ],
        proTip: 'استخدم وضع « أبعاد مخصصة » لتحديد أي عرض وارتفاع بالبكسل مع سقف الكيلوبايت المطلوب.',
        ctaButtonLabel: 'فتح أداة الأبعاد المخصصة الآن ←',
        faqs: [
          {
            question: 'هل يمكنني رفع صورة PNG وتنزيلها بصيغة JPG أقل من 30 كيلوبايت؟',
            answer: 'نعم، بمجرد إفلات ملف PNG يتم تحويله وضغطه تلقائياً إلى JPG تحت السقف المحدد.'
          }
        ]
      }
    }
  }
];
