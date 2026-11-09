import { LocaleCode } from '../types/atelier';
import { SupportedOutputFormat } from '../services/imageConverterEngine';

export interface FormatComparisonRow {
  feature: string;
  sourceValue: string;
  targetValue: string;
}

export interface ConverterFaqItem {
  question: string;
  answer: string;
}

export interface ConverterRouteConfig {
  slug: string;
  sourceLabel: string;
  targetLabel: string;
  defaultOutputFormat: SupportedOutputFormat;
  acceptHint: string;
  title: string; // < 60 chars
  metaDescription: string; // < 155 chars
  h1: string;
  subtitle: string;
  introParagraphs: [string, string]; // 150+ words unique to this pair
  steps: [string, string, string, string];
  faqs: [
    ConverterFaqItem,
    ConverterFaqItem,
    ConverterFaqItem,
    ConverterFaqItem,
    ConverterFaqItem
  ];
  comparisonRows: [
    FormatComparisonRow,
    FormatComparisonRow,
    FormatComparisonRow,
    FormatComparisonRow
  ];
  relatedSlugs: [string, string, string, string];
  compressorLinkSlug: string;
  compressorLinkAnchor: string;
}

export const CONVERTER_UI_LABELS: Record<
  LocaleCode,
  {
    dropTitle: string;
    dropSub: string;
    settingsLegend: string;
    convertToLabel: string;
    qualityLabel: string;
    losslessNote: string;
    targetKbLabel: string;
    targetKbOptional: string;
    resizeLabel: string;
    resizeKeep: string;
    resizeMaxW: string;
    resizeMaxH: string;
    resizePct: string;
    resizePassport: string;
    resizeUs2x2: string;
    bgColorLabel: string;
    stripMetaLabel: string;
    stripMetaHint: string;
    convertBtn: string;
    downloadZipBtn: string;
    downloadMergedPdfBtn: string;
    clearBtn: string;
    presetsHeading: string;
    privacyNote: string;
    howToHeading: string;
    comparisonHeading: string;
    faqHeading: string;
    relatedHeading: string;
    compressorCtaPrefix: string;
    featureCol: string;
  }
> = {
  en: {
    dropTitle: 'Choose files or drop them here',
    dropSub:
      'Supports JPG, PNG, WebP, HEIC, AVIF, PDF, SVG, TIFF, GIF, BMP, and ICO. Select multiple files at once.',
    settingsLegend: 'Conversion & Size Settings',
    convertToLabel: 'Convert to',
    qualityLabel: 'Quality',
    losslessNote: 'Lossless / fixed palette format (quality slider disabled)',
    targetKbLabel: 'Target file size (KB)',
    targetKbOptional: 'optional — e.g. 50',
    resizeLabel: 'Resize mode',
    resizeKeep: 'Keep original dimensions',
    resizeMaxW: 'Max width (px)',
    resizeMaxH: 'Max height (px)',
    resizePct: 'Percentage (%)',
    resizePassport: 'Passport 35×45 mm (413×531 px)',
    resizeUs2x2: 'US Visa 2×2 in (600×600 px)',
    bgColorLabel: 'Background color (for transparent areas)',
    stripMetaLabel: 'Strip EXIF, GPS & camera metadata',
    stripMetaHint: 'Removes location & device serial tags while preserving photo orientation',
    convertBtn: 'Convert now',
    downloadZipBtn: 'Download all as ZIP',
    downloadMergedPdfBtn: 'Download combined PDF',
    clearBtn: 'Clear queue',
    presetsHeading: 'Quick size & dimension presets',
    privacyNote:
      '100% browser-local execution: your images and PDFs are decoded and converted inside your device RAM and are never uploaded to any server.',
    howToHeading: 'How to convert your files in 4 steps',
    comparisonHeading: 'Technical Format Comparison',
    faqHeading: 'Frequently Asked Questions',
    relatedHeading: 'Related Format Converters',
    compressorCtaPrefix: 'Need strict biometric photo cropping or signature cleanup?',
    featureCol: 'Specification',
  },
  // TODO(review-i18n): Review localized converter UI strings for French
  fr: {
    dropTitle: 'Choisissez vos fichiers ou glissez-les ici',
    dropSub:
      'Formats pris en charge : JPG, PNG, WebP, HEIC, AVIF, PDF, SVG, TIFF, GIF, BMP et ICO. Traitement par lot.',
    settingsLegend: 'Paramètres de conversion et de taille',
    convertToLabel: 'Convertir en',
    qualityLabel: 'Qualité',
    losslessNote: 'Format sans perte (curseur de qualité désactivé)',
    targetKbLabel: 'Taille cible (Ko)',
    targetKbOptional: 'optionnel — ex. 50',
    resizeLabel: 'Redimensionnement',
    resizeKeep: 'Conserver les dimensions originales',
    resizeMaxW: 'Largeur max (px)',
    resizeMaxH: 'Hauteur max (px)',
    resizePct: 'Pourcentage (%)',
    resizePassport: 'Passeport 35×45 mm (413×531 px)',
    resizeUs2x2: 'Visa US 2×2 po (600×600 px)',
    bgColorLabel: 'Couleur de fond (zones transparentes)',
    stripMetaLabel: 'Supprimer les métadonnées EXIF et GPS',
    stripMetaHint: 'Efface la géolocalisation tout en respectant l’orientation EXIF',
    convertBtn: 'Convertir maintenant',
    downloadZipBtn: 'Tout télécharger en ZIP',
    downloadMergedPdfBtn: 'Télécharger le PDF combiné',
    clearBtn: 'Vider la liste',
    presetsHeading: 'Préréglages rapides de taille et dimensions',
    privacyNote:
      'Exécution 100 % locale dans votre navigateur : vos photos et PDF ne quittent jamais votre appareil.',
    howToHeading: 'Comment convertir vos fichiers en 4 étapes',
    comparisonHeading: 'Comparaison technique des formats',
    faqHeading: 'Questions fréquentes (FAQ)',
    relatedHeading: 'Convertisseurs associés',
    compressorCtaPrefix: 'Besoin d’un cadrage biométrique ou d’une signature nettoyée ?',
    featureCol: 'Caractéristique',
  },
  // TODO(review-i18n): Review localized converter UI strings for Spanish
  es: {
    dropTitle: 'Elige tus archivos o arrástralos aquí',
    dropSub:
      'Soporta JPG, PNG, WebP, HEIC, AVIF, PDF, SVG, TIFF, GIF, BMP e ICO. Conversión por lotes.',
    settingsLegend: 'Ajustes de conversión y tamaño',
    convertToLabel: 'Convertir a',
    qualityLabel: 'Calidad',
    losslessNote: 'Formato sin pérdida (control de calidad desactivado)',
    targetKbLabel: 'Tamaño objetivo (KB)',
    targetKbOptional: 'opcional — ej. 50',
    resizeLabel: 'Modo de redimensionado',
    resizeKeep: 'Mantener dimensiones originales',
    resizeMaxW: 'Ancho máximo (px)',
    resizeMaxH: 'Alto máximo (px)',
    resizePct: 'Porcentaje (%)',
    resizePassport: 'Pasaporte 35×45 mm (413×531 px)',
    resizeUs2x2: 'Visa EE. UU. 2×2 in (600×600 px)',
    bgColorLabel: 'Color de fondo (para transparencia)',
    stripMetaLabel: 'Eliminar metadatos EXIF y GPS',
    stripMetaHint: 'Borra datos de ubicación manteniendo la orientación correcta',
    convertBtn: 'Convertir ahora',
    downloadZipBtn: 'Descargar todo en ZIP',
    downloadMergedPdfBtn: 'Descargar PDF combinado',
    clearBtn: 'Limpiar cola',
    presetsHeading: 'Ajustes rápidos de KB y dimensiones',
    privacyNote:
      'Ejecución 100 % local en tu navegador: tus imágenes y documentos nunca se suben a ningún servidor.',
    howToHeading: 'Cómo convertir tus archivos en 4 pasos',
    comparisonHeading: 'Comparación técnica de formatos',
    faqHeading: 'Preguntas frecuentes',
    relatedHeading: 'Convertidores relacionados',
    compressorCtaPrefix: '¿Necesitas recorte biométrico o limpieza de firma?',
    featureCol: 'Especificación',
  },
  // TODO(review-i18n): Review localized converter UI strings for Arabic (RTL)
  ar: {
    dropTitle: 'اختر الملفات أو اسحبها إلى هنا',
    dropSub:
      'يدعم JPG وPNG وWebP وHEIC وAVIF وPDF وSVG وTIFF وGIF وBMP وICO مع تحويل متعدد دفعة واحدة.',
    settingsLegend: 'إعدادات التحويل والحجم',
    convertToLabel: 'تحويل إلى',
    qualityLabel: 'الجودة',
    losslessNote: 'صيغة بدون فقدان (شريط الجودة غير مفعل)',
    targetKbLabel: 'الحجم المستهدف (كيلوبايت KB)',
    targetKbOptional: 'اختياري — مثل 50',
    resizeLabel: 'تغيير الأبعاد',
    resizeKeep: 'الحفاظ على الأبعاد الأصلية',
    resizeMaxW: 'أقصى عرض (بكسل)',
    resizeMaxH: 'أقصى ارتفاع (بكسل)',
    resizePct: 'نسبة مئوية (%)',
    resizePassport: 'جواز سفر 35×45 مم (413×531 بكسل)',
    resizeUs2x2: 'تأشيرة أمريكا 2×2 بوصة (600×600 بكسل)',
    bgColorLabel: 'لون الخلفية (للمناطق الشفافة)',
    stripMetaLabel: 'إزالة بيانات EXIF والموقع الجغرافي GPS',
    stripMetaHint: 'يحذف بيانات الكاميرا والموقع مع الحفاظ على اتجاه الصورة الصحيح',
    convertBtn: 'تحويل الآن',
    downloadZipBtn: 'تحميل الكل كملف ZIP',
    downloadMergedPdfBtn: 'تحميل ملف PDF المدمج',
    clearBtn: 'مسح القائمة',
    presetsHeading: 'خيارات سريعة للحجم والأبعاد',
    privacyNote:
      'معالجة محلية 100% داخل متصفحك: لا تغادر صورك أو ملفات PDF جهازك أبداً ولا يتم رفعها لأي خادم.',
    howToHeading: 'كيفية تحويل ملفاتك في 4 خطوات',
    comparisonHeading: 'مقارنة تقنية بين الصيغتين',
    faqHeading: 'الأسئلة الشائعة',
    relatedHeading: 'أدوات تحويل ذات صلة',
    compressorCtaPrefix: 'هل تحتاج إلى قص صورة جواز السفر أو تنقية التوقيع؟',
    featureCol: 'المعيار التقني',
  },
};

export const CONVERTER_ROUTES: ConverterRouteConfig[] = [
  {
    slug: 'image-converter',
    sourceLabel: 'Image & PDF',
    targetLabel: 'Any Format',
    defaultOutputFormat: 'jpg',
    acceptHint:
      'image/*,.heic,.heif,.avif,.tif,.tiff,.svg,.ico,.pdf,application/pdf',
    title: 'Free Image Converter: HEIC, PDF, PNG, JPG, WebP in Browser',
    metaDescription:
      'Convert images and PDFs between JPG, PNG, WebP, AVIF, HEIC, TIFF, SVG, BMP, GIF & ICO with exact KB target sizing. 100% private in your browser.',
    h1: 'Universal Image & PDF Converter — Private, In Your Browser',
    subtitle:
      'Convert between JPG, PNG, WebP, AVIF, HEIC, PDF, SVG, TIFF, BMP, GIF, and ICO. Set an exact file size in KB or resize dimensions without uploading a single byte.',
    introParagraphs: [
      'Modern devices, cameras, and operating systems save visuals in an increasingly fragmented mix of containers: Apple iPhones capture HEIC by default, Google and modern CMS platforms serve AVIF and WebP, scanners archive multi-megabyte TIFFs or PDFs, and design tools export vector SVGs. Yet government visa portals, civil registry platforms, university admission systems, and corporate HR forms still demand strict legacy JPG, PNG, or single-file PDF uploads capped at 20 KB, 50 KB, or 100 KB.',
      'CompressPhoto Universal Image Converter bridges every format gap directly inside your browser RAM. Unlike cloud converters that queue your private ID photos, signatures, and tax documents on remote servers, our engine decodes HEIC, TIFF, PDF, SVG, and raster formats locally on your device. You can batch-convert dozens of files simultaneously, flatten transparency onto a custom background color, strip sensitive GPS/EXIF metadata, and engage our 7-pass binary search to hit an exact kilobyte ceiling on the first try.',
    ],
    steps: [
      'Drop one or multiple files (JPG, PNG, WebP, HEIC, AVIF, PDF, SVG, TIFF, GIF, BMP, or ICO) into the converter box above.',
      'Choose your desired output format (JPG, PNG, WebP, AVIF, PDF, ICO, TIFF, BMP, or static GIF) and adjust quality if needed.',
      'Optionally enter a target file size in KB (such as 20 KB, 50 KB, or 100 KB) or pick a dimension preset like Passport 35×45 mm.',
      'Click Convert Now and download each converted file individually or bundled together as a single ZIP archive or merged PDF.',
    ],
    faqs: [
      {
        question: 'Are my photos or PDF documents ever uploaded to a server?',
        answer:
          'Never. Every decoder (including HEIC, TIFF, and PDF page rendering) and every encoder runs 100% locally inside your web browser using WebAssembly and HTML5 Canvas. Even if you disconnect from Wi-Fi after loading the page, conversions continue to work offline.',
      },
      {
        question: 'How does the Target File Size (KB) feature work during format conversion?',
        answer:
          'When you enter a target KB limit, our engine runs a 7-pass binary search across compression quality levels (0.05 to 0.95). If the file is still larger than your target at minimum quality, it progressively scales dimensions down in 10% steps until the output lands safely under your KB cap.',
      },
      {
        question: 'Why are heavy libraries like HEIC, TIFF, and PDF loaded on demand?',
        answer:
          'To keep the page instantaneous on mobile and desktop connections, specialized decoders (such as PDF.js, UTIF, and HEIC WebAssembly) are only downloaded by your browser when you actually select a file of that type.',
      },
      {
        question: 'What happens to transparent areas when converting PNG, WebP, or SVG to JPG?',
        answer:
          'Because JPG, BMP, and PDF streams do not support alpha transparency, unflattened transparent pixels often turn pitch black in basic converters. Our tool automatically composites transparent regions onto pure white (#FFFFFF) by default, or any custom hex color you pick.',
      },
      {
        question: 'Does converting an image remove GPS location and camera EXIF metadata?',
        answer:
          'Yes. With Strip Metadata enabled (the default), pixels are rendered fresh onto a clean raster buffer after applying the correct EXIF orientation, completely removing embedded GPS coordinates, camera serial numbers, and editing history.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Supported Inputs',
        sourceValue: 'JPG, PNG, WebP, HEIC, AVIF, PDF, SVG, TIFF, GIF, BMP, ICO',
        targetValue: 'Auto-detected by both file header MIME and extension',
      },
      {
        feature: 'Supported Outputs',
        sourceValue: '9 Formats',
        targetValue: 'JPG, PNG, WebP, AVIF, PDF, ICO (multi-size), TIFF, BMP, GIF',
      },
      {
        feature: 'Exact KB Targeting',
        sourceValue: 'Fixed quality only in standard tools',
        targetValue: '7-pass binary search + automatic dimension fallback',
      },
      {
        feature: 'Data Privacy',
        sourceValue: '100% Client-Side RAM',
        targetValue: 'Zero server uploads, EXIF/GPS stripped by default',
      },
    ],
    relatedSlugs: ['heic-to-jpg', 'jpg-to-pdf', 'pdf-to-jpg', 'png-to-jpg'],
    compressorLinkSlug: 'compress-photo-to-50kb',
    compressorLinkAnchor: 'Compress Photo to Exact 50 KB Studio',
  },
  {
    slug: 'heic-to-jpg',
    sourceLabel: 'HEIC',
    targetLabel: 'JPG',
    defaultOutputFormat: 'jpg',
    acceptHint: '.heic,.heif,image/heic,image/heif,image/*',
    title: 'HEIC to JPG Converter — Free, Private & Exact KB Size',
    metaDescription:
      'Convert iPhone HEIC and HEIF photos to universal JPG in your browser. Batch convert, strip GPS metadata, and hit exact KB limits with zero uploads.',
    h1: 'Convert HEIC to JPG Online — 100% Private in Your Browser',
    subtitle:
      'Turn Apple iPhone and iPad .HEIC photos into universally compatible .JPG files instantly, with optional target KB sizing for visa and exam portals.',
    introParagraphs: [
      'Since iOS 11, Apple iPhones and iPads save camera photos in the High Efficiency Image Container (HEIC) format encoded with HEVC (H.265). While HEIC stores crisp 12-megapixel and 48-megapixel photos at roughly half the size of JPEG, Windows PCs without paid codec extensions, Android portals, government visa websites (such as US DS-160, Schengen, ANTS, and Indian SSC/UPSC portals), and older web forms immediately reject .heic uploads.',
      'Our browser-local HEIC to JPG converter decodes Apple HEIC and HEIF containers right on your computer or phone without uploading personal portraits to third-party cloud servers. It automatically reads the iPhone EXIF orientation tag so portraits never come out sideways, strips private GPS coordinates, and lets you dial in an exact target file size like 50 KB or 100 KB for instant portal acceptance.',
    ],
    steps: [
      'Select or drag one or more iPhone .HEIC or .HEIF photos into the dropzone above.',
      'Ensure JPG is selected as the output format and set your preferred quality (85% is ideal for visual fidelity).',
      'If uploading to an official portal, enter a Target KB limit (e.g. 50 KB) or select a Passport dimension preset.',
      'Click Convert Now and save your standard .jpg files individually or as a single ZIP archive.',
    ],
    faqs: [
      {
        question: 'Why does my iPhone take HEIC photos instead of JPG?',
        answer:
          'Apple uses HEIC by default under Settings → Camera → Formats ("High Efficiency") because it reduces storage consumption by nearly 50% and supports 16-bit deep color and Live Photo bursts.',
      },
      {
        question: 'Can I convert HEIC to JPG on Windows or Chrome without installing codecs?',
        answer:
          'Yes. When your browser does not natively decode HEIC, our page lazily loads a self-hosted WebAssembly HEIC decoder directly inside your browser tab—no Microsoft Store codec purchase or software installation required.',
      },
      {
        question: 'Will my vertical iPhone portrait turn sideways when converted to JPG?',
        answer:
          'No. iPhones often store sensor pixels horizontally and rely on an EXIF rotation flag. Our engine applies imageOrientation: "from-image" during decoding so your upright portrait is baked upright into the final JPG.',
      },
      {
        question: 'How do I convert an iPhone HEIC photo to a JPG under 50 KB for a visa application?',
        answer:
          'Simply type 50 into the "Target file size (KB)" field before clicking Convert. Our 7-pass binary search will find the highest possible JPEG quality that stays strictly under 50 KB.',
      },
      {
        question: 'Does converting HEIC to JPG remove my iPhone GPS location data?',
        answer:
          'Yes. Re-encoding the decoded bitmap onto an HTML5 canvas removes all Apple MakerNote, Live Photo, and GPS latitude/longitude tags while keeping your image sharp.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Compression Algorithm',
        sourceValue: 'HEVC / H.265 intra-frame coding (.heic)',
        targetValue: 'Discrete Cosine Transform ISO/IEC 10918 (.jpg)',
      },
      {
        feature: 'Portal & Browser Compatibility',
        sourceValue: 'Limited (Safari/macOS native; rejected by most web forms)',
        targetValue: '100% Universal across all OS, browsers & government portals',
      },
      {
        feature: 'Color Depth',
        sourceValue: '10-bit to 16-bit HDR capable',
        targetValue: '8-bit per channel (24-bit sRGB standard)',
      },
      {
        feature: 'Best Use Case',
        sourceValue: 'Internal iPhone camera roll storage',
        targetValue: 'Online applications, email attachments, websites & printing',
      },
    ],
    relatedSlugs: ['heic-to-png', 'heic-to-pdf', 'jpg-to-pdf', 'jpeg-to-png'],
    compressorLinkSlug: 'compress-photo-to-50kb',
    compressorLinkAnchor: 'Compress JPG Photo to 50 KB',
  },
  {
    slug: 'heic-to-png',
    sourceLabel: 'HEIC',
    targetLabel: 'PNG',
    defaultOutputFormat: 'png',
    acceptHint: '.heic,.heif,image/heic,image/heif,image/*',
    title: 'HEIC to PNG Converter — Lossless Browser Conversion',
    metaDescription:
      'Convert iPhone HEIC and HEIF images to lossless PNG directly in your browser. Preserve crisp edges, transparency, and pixel accuracy without uploads.',
    h1: 'Convert HEIC to PNG — Lossless & 100% Private',
    subtitle:
      'Transform Apple HEIC/HEIF photos and iOS cutouts into uncompressed, lossless PNG graphics without leaving your browser.',
    introParagraphs: [
      'When you use iOS Subject Lift ("Copy Subject" on iPhone to isolate a person, product, or signature from its background) or capture high-detail screenshots and documents in HEIC/HEIF format, converting to lossy JPEG destroys any alpha transparency and introduces mosquito noise around sharp text edges. Converting HEIC to PNG preserves every pixel in a lossless deflate-compressed container.',
      'With CompressPhoto, your HEIC to PNG conversion runs entirely inside your device memory. Whether you are preparing transparent iOS product cutouts for e-commerce listings, archiving medical or legal scans taken on an iPad, or importing iPhone assets into desktop design software on Windows or Linux, you get pixel-accurate 32-bit RGBA PNG output with zero server uploads.',
    ],
    steps: [
      'Drop your .HEIC or .HEIF files from your iPhone, iPad, or Mac into the upload area above.',
      'Confirm PNG is selected in the "Convert to" dropdown menu.',
      'Optionally set a maximum width or height in pixels if you want to scale down 48 MP iPhone Pro captures.',
      'Click Convert Now and download your lossless .png files individually or in a single ZIP file.',
    ],
    faqs: [
      {
        question: 'Does HEIC to PNG keep transparent backgrounds from iPhone cutouts?',
        answer:
          'Yes. Unlike JPG which forces an opaque background, PNG natively supports an 8-bit alpha channel, preserving any transparency stored inside your HEIC/HEIF image.',
      },
      {
        question: 'Why is the converted PNG file larger than the original HEIC file?',
        answer:
          'HEIC uses aggressive perceptual lossy compression (HEVC), whereas PNG is a strictly lossless format that stores every pixel without discarding visual data. To reduce PNG file size, reduce the pixel dimensions using the Max Width option.',
      },
      {
        question: 'Can I set a target KB size when converting HEIC to PNG?',
        answer:
          'Yes. Because PNG has no lossy quality slider, entering a Target KB size instructs our engine to progressively scale the pixel dimensions until the lossless PNG fits within your kilobyte limit.',
      },
      {
        question: 'Is there any limit on how many HEIC files I can convert at once?',
        answer:
          'You can batch-convert dozens of HEIC files at once. Our queue processes 2 files concurrently so your browser stays fast and responsive even with large iPhone Pro photos.',
      },
      {
        question: 'Are my iPhone photos sent to an external cloud during HEIC to PNG conversion?',
        answer:
          'No. The entire HEIC decoding and PNG encoding pipeline runs locally inside your browser tab.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Compression Type',
        sourceValue: 'Lossy / Perceptual HEVC (.heic)',
        targetValue: '100% Lossless DEFLATE (.png)',
      },
      {
        feature: 'Alpha Transparency',
        sourceValue: 'Supported in HEIF alpha plane',
        targetValue: 'Full 8-bit RGBA transparency universally supported',
      },
      {
        feature: 'Typical File Size',
        sourceValue: '1.5 MB – 3 MB (12 MP photo)',
        targetValue: '6 MB – 14 MB (lossless 12 MP), smaller when resized',
      },
      {
        feature: 'Ideal Usage',
        sourceValue: 'iOS camera storage',
        targetValue: 'Graphic design, transparent cutouts, crisp text & UI assets',
      },
    ],
    relatedSlugs: ['heic-to-jpg', 'heic-to-pdf', 'png-to-jpg', 'png-to-webp'],
    compressorLinkSlug: 'compress-photo-to-100kb',
    compressorLinkAnchor: 'Compress Photo to 100 KB',
  },
  {
    slug: 'heic-to-pdf',
    sourceLabel: 'HEIC',
    targetLabel: 'PDF',
    defaultOutputFormat: 'pdf',
    acceptHint: '.heic,.heif,image/heic,image/heif,image/*',
    title: 'HEIC to PDF Converter — Combine iPhone Photos into 1 PDF',
    metaDescription:
      'Convert one or multiple iPhone HEIC photos into a single PDF or separate PDFs under 100 KB / 200 KB. Choose A4, Letter, margins & page order in browser.',
    h1: 'Convert HEIC to PDF — Single or Multi-Page Document Builder',
    subtitle:
      'Merge iPhone .HEIC photos of receipts, ID cards, or multi-page contracts into a clean, size-controlled PDF document right in your browser.',
    introParagraphs: [
      'Photographing multi-page contracts, university transcripts, signed forms, or expense receipts with an iPhone produces a folder of separate .HEIC images that accounting platforms, embassy visa portals, and government upload forms refuse to accept. Most portals require a single consolidated .PDF file—often with a strict file size cap of 100 KB, 200 KB, or 500 KB.',
      'Our browser-based HEIC to PDF studio decodes your iPhone HEIC files locally, lets you drag or reorder pages in the exact sequence you need, formats them onto standard A4, US Letter, or Fit-to-Image pages with customizable millimeter margins, and runs a 7-pass binary search on the embedded PDF image streams so your final multi-page PDF never exceeds your portal’s KB limit.',
    ],
    steps: [
      'Drop one or several iPhone .HEIC photos into the converter above.',
      'With PDF selected as the output format, choose whether to combine all images into 1 merged PDF or export 1 PDF per photo.',
      'Select your page size (A4, US Letter, or Fit to image), orientation, margin, and optional Target KB limit (e.g. 100 KB or 200 KB).',
      'Reorder pages if needed, click Convert Now, and download your ready-to-submit PDF document.',
    ],
    faqs: [
      {
        question: 'Can I combine multiple iPhone HEIC photos into a single multi-page PDF?',
        answer:
          'Yes! When PDF output is selected, the "Combine into 1 multi-page PDF" option is active by default, and you can reorder the pages using the up/down controls before exporting.',
      },
      {
        question: 'How do I keep my multi-page HEIC to PDF file under 100 KB or 200 KB?',
        answer:
          'Enter 100 or 200 in the "Target file size (KB)" box. Our PDF composer calculates the exact PDF object header overhead and binary-searches the JPEG stream quality across all pages so the combined PDF stays below your target.',
      },
      {
        question: 'Should I choose A4, US Letter, or Fit to Image for my PDF page size?',
        answer:
          'Choose A4 (210×297 mm) or US Letter (8.5×11 in) if your document will be printed or reviewed by an administrative office, or choose "Fit to image" if you want zero white borders around your photo.',
      },
      {
        question: 'Can I export each HEIC file as its own individual PDF instead of merging?',
        answer:
          'Yes. Switch the PDF Combine Mode selector from "Merged (1 PDF)" to "Separate (1 PDF per image)" and download them individually or as a ZIP.',
      },
      {
        question: 'Are my sensitive ID or contract photos uploaded anywhere during PDF creation?',
        answer:
          'Never. Both the HEIC decoding and the ISO-32000 PDF binary generation happen 100% inside your local browser memory.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Document Structure',
        sourceValue: 'Single Apple camera image container (.heic)',
        targetValue: 'Multi-page ISO-32000-1 portable document (.pdf)',
      },
      {
        feature: 'Print Layout Control',
        sourceValue: 'Raw sensor aspect ratio (4:3 or 16:9)',
        targetValue: 'A4, US Letter, or Fit-to-Image with 0/10/20 mm margins',
      },
      {
        feature: 'Portal Acceptance',
        sourceValue: 'Rejected by almost all document portals',
        targetValue: 'Accepted by 100% of administrative, legal & academic portals',
      },
      {
        feature: 'File Size Budgeting',
        sourceValue: 'Unpredictable (1.5–4 MB per photo)',
        targetValue: 'Exact target KB cap across all combined pages',
      },
    ],
    relatedSlugs: ['jpg-to-pdf', 'png-to-pdf', 'heic-to-jpg', 'pdf-to-jpg'],
    compressorLinkSlug: 'compress-photo-to-100kb',
    compressorLinkAnchor: 'Compress Photo to 100 KB',
  },
  {
    slug: 'jpg-to-pdf',
    sourceLabel: 'JPG',
    targetLabel: 'PDF',
    defaultOutputFormat: 'pdf',
    acceptHint: '.jpg,.jpeg,.jpe,image/jpeg,image/*',
    title: 'JPG to PDF Converter — Merge & Compress to Exact KB Online',
    metaDescription:
      'Convert and merge JPG images into a single PDF or separate PDFs in your browser. Set A4/Letter page size, margins, and exact target KB (50KB, 100KB, 200KB).',
    h1: 'Convert JPG to PDF — Merge Photos & Hit Exact KB Limits',
    subtitle:
      'Combine one or multiple JPG/JPEG images into a clean, print-ready PDF document with custom page sizes, reordering, and exact kilobyte control.',
    introParagraphs: [
      'Government portals, scholarship boards, banking KYC workflows, and visa application systems frequently ask applicants to upload scanned ID cards, passport bio pages, or signed declarations as a PDF document under 50 KB, 100 KB, or 200 KB. When you scan or photograph those pages as JPG images, wrapping them into a standard PDF using desktop print-to-PDF tools often inflates the file size past several megabytes.',
      'CompressPhoto JPG to PDF converter gives you complete control over both document layout and byte budget right inside your browser. Drop multiple JPGs, arrange their page sequence, pick A4, US Letter, or tight Fit-to-Image framing with 0 mm, 10 mm, or 20 mm margins, and optionally type a target KB limit. Our 7-pass binary search adjusts the embedded DCT stream so your final PDF lands right under your portal ceiling.',
    ],
    steps: [
      'Select or drag your .JPG or .JPEG images into the dropzone above.',
      'Choose whether to merge all images into 1 multi-page PDF or create 1 separate PDF per image, and reorder pages if needed.',
      'Pick your page layout (A4, US Letter, or Fit to image), orientation (Auto, Portrait, Landscape), and margin size.',
      'Optionally enter a Target KB limit (such as 50 KB, 100 KB, or 200 KB) and click Convert Now to download your PDF.',
    ],
    faqs: [
      {
        question: 'How do I convert a JPG to a PDF under 50 KB or 100 KB?',
        answer:
          'Type 50 or 100 into the "Target file size (KB)" field. Our engine accounts for the exact PDF cross-reference table and object wrapper bytes, then binary-searches the image compression so the resulting .pdf file is strictly under 50 KB or 100 KB.',
      },
      {
        question: 'Can I change the order of my JPG images before combining them into a PDF?',
        answer:
          'Yes. As soon as you add two or more images with PDF output selected, a page reorder list appears allowing you to move any image up or down in the sequence.',
      },
      {
        question: 'Does this JPG to PDF tool add watermarks or page footers?',
        answer:
          'Never. Your generated PDF contains only your images on clean pages with zero watermarks, zero branding, and zero tracking metadata.',
      },
      {
        question: 'What is the difference between "Fit to image" and "A4" page size?',
        answer:
          '"Fit to image" sets the PDF page dimensions to match the exact aspect ratio of each photo (no extra whitespace), whereas "A4" centers each photo onto a standard 210 × 297 mm sheet suitable for office printing.',
      },
      {
        question: 'Are my ID scans or financial documents uploaded to a server?',
        answer:
          'No. All PDF assembly happens locally in your browser’s memory using typed arrays. Your files never leave your device.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Multi-Page Support',
        sourceValue: 'Single image per .jpg file',
        targetValue: '1 to 50+ pages combined in a single .pdf document',
      },
      {
        feature: 'Print Geometry',
        sourceValue: 'Pixel dimensions only',
        targetValue: 'Physical points (A4 210×297 mm, US Letter 8.5×11 in, or exact fit)',
      },
      {
        feature: 'Internal Compression',
        sourceValue: 'Raw JFIF DCT stream',
        targetValue: 'ISO-32000 /DCTDecode XObject stream with binary-search KB cap',
      },
      {
        feature: 'Official Document Portals',
        sourceValue: 'Accepted for portraits; often rejected for multi-page forms',
        targetValue: 'Universal standard for multi-page certificates, IDs & forms',
      },
    ],
    relatedSlugs: ['png-to-pdf', 'heic-to-pdf', 'pdf-to-jpg', 'jpg-to-png'],
    compressorLinkSlug: 'compress-photo-to-100kb',
    compressorLinkAnchor: 'Compress Photo to 100 KB Studio',
  },
  {
    slug: 'png-to-pdf',
    sourceLabel: 'PNG',
    targetLabel: 'PDF',
    defaultOutputFormat: 'pdf',
    acceptHint: '.png,image/png,image/*',
    title: 'PNG to PDF Converter — Combine Screenshots & Scans Locally',
    metaDescription:
      'Convert PNG screenshots, transparent graphics, and scans into a single PDF or separate PDFs in your browser. Custom background color & exact KB limits.',
    h1: 'Convert PNG to PDF — Merge Screenshots & Documents Privately',
    subtitle:
      'Package high-resolution PNG screenshots, digital receipts, and transparent graphics into a compact, standards-compliant PDF document in your browser.',
    introParagraphs: [
      'Desktop and mobile screenshots, digital invoices, and exported charts are almost always saved as lossless PNG files. While PNG keeps UI text razor-sharp, uploading five separate 3 MB PNG screenshots to an insurance claim portal, university portal, or visa platform is either blocked by single-file upload rules or rejected for exceeding a 200 KB or 500 KB file size limit.',
      'Our browser-local PNG to PDF converter flattens alpha transparency cleanly onto pure white (or your chosen background color), arranges your PNGs in any page order you choose, formats them onto A4, US Letter, or exact-fit PDF pages, and compresses the embedded streams so the resulting PDF is compact, legible, and ready for immediate upload.',
    ],
    steps: [
      'Drop one or multiple .PNG images or screenshots into the converter area above.',
      'Select whether to merge all PNGs into one combined PDF or export individual PDF files, and arrange the page order.',
      'Select your page size (A4, Letter, or Fit to image), background fill color for transparent areas, and optional Target KB size.',
      'Click Convert Now to generate and download your PDF document instantly.',
    ],
    faqs: [
      {
        question: 'What happens to transparent areas in my PNG when converted to PDF?',
        answer:
          'Our converter composites transparent pixels onto a clean white (#FFFFFF) background by default so dark text or signatures remain perfectly readable on the PDF page, or you can pick any custom background color.',
      },
      {
        question: 'Why is my converted PDF much smaller than the original PNG files?',
        answer:
          'Lossless PNG screenshots often contain several megabytes of uncompressed color data. Embedding optimized DCT streams inside the PDF reduces file size by 70%–90% while keeping text crisp.',
      },
      {
        question: 'Can I combine both PNG and JPG files into the same PDF?',
        answer:
          'Yes! Even on the PNG to PDF page, you can drop a mix of PNG, JPG, WebP, and HEIC files and merge them all into one unified PDF document.',
      },
      {
        question: 'How do I force the output PDF to stay under 100 KB?',
        answer:
          'Type 100 into the "Target file size (KB)" input. The converter will run a 7-pass binary search across quality and scale until the complete PDF is under 100 KB.',
      },
      {
        question: 'Is my data private when converting confidential PNG screenshots to PDF?',
        answer:
          '100% private. Nothing is uploaded to any server; the PDF binary is constructed directly in your browser RAM.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Primary Format Role',
        sourceValue: 'Lossless raster graphic / screenshot (.png)',
        targetValue: 'Portable single or multi-page document (.pdf)',
      },
      {
        feature: 'Transparency Handling',
        sourceValue: '8-bit alpha channel',
        targetValue: 'Flattened onto user-selected page background (#FFFFFF default)',
      },
      {
        feature: 'Multi-File Submission',
        sourceValue: 'Requires uploading each screenshot separately',
        targetValue: 'Combines all screenshots into 1 ordered document',
      },
      {
        feature: 'File Size Control',
        sourceValue: 'Large lossless deflate stream',
        targetValue: 'Configurable quality slider + exact KB binary search',
      },
    ],
    relatedSlugs: ['jpg-to-pdf', 'heic-to-pdf', 'pdf-to-png', 'png-to-jpg'],
    compressorLinkSlug: 'compress-photo-to-50kb',
    compressorLinkAnchor: 'Compress Photo to 50 KB',
  },
  {
    slug: 'pdf-to-jpg',
    sourceLabel: 'PDF',
    targetLabel: 'JPG',
    defaultOutputFormat: 'jpg',
    acceptHint: '.pdf,application/pdf',
    title: 'PDF to JPG Converter — Extract Pages at 72, 150 or 300 DPI',
    metaDescription:
      'Convert PDF pages to high-resolution JPG images in your browser. Choose 72, 150, or 300 DPI, select specific page ranges, and hit exact KB limits.',
    h1: 'Convert PDF to JPG — High-DPI Page Extractor in Your Browser',
    subtitle:
      'Render every page (or selected pages) of any PDF document into crisp JPG images at 72, 150, or 300 DPI—100% locally with zero server uploads.',
    introParagraphs: [
      'Many official certificates, national ID downloads (such as India e-Aadhaar, PAN, French administrative attestations, or university diplomas), and scanner outputs arrive as PDF documents—yet online application forms frequently require a .JPG image upload under 50 KB or 100 KB for the photo or certificate slot. Taking a low-resolution screen capture of a PDF results in blurry text that gets rejected during verification.',
      'Our browser-local PDF to JPG converter uses a self-hosted WebAssembly/Canvas PDF renderer to rasterize each page directly at your chosen resolution: 72 DPI for fast web previews, 150 DPI for standard portal uploads, or 300 DPI for archival print quality. You can extract all pages or type a custom page range (like "1-2, 5"), set an exact kilobyte cap per page, and download individual JPGs or a single ZIP archive.',
    ],
    steps: [
      'Drop one or more .PDF documents into the converter box above.',
      'Select your render resolution (72 DPI, 150 DPI, or 300 DPI) and enter a page range (e.g. "All" or "1-3, 5").',
      'Optionally enter a Target KB limit (such as 50 KB or 100 KB) if the extracted JPG needs to fit a strict portal upload rule.',
      'Click Convert Now to render each PDF page as a sharp .jpg image and download them individually or as a ZIP.',
    ],
    faqs: [
      {
        question: 'Which DPI setting should I choose when converting PDF to JPG?',
        answer:
          'Choose 150 DPI for most online applications and government uploads (ideal balance of crisp text and compact size), 300 DPI for physical printing or OCR text recognition, and 72 DPI for quick thumbnails.',
      },
      {
        question: 'Can I convert only specific pages of a long PDF document to JPG?',
        answer:
          'Yes. In the PDF Page Range field, type the exact pages you want—for example "1" for just the first page, or "1-3, 7" for pages 1 through 3 and page 7.',
      },
      {
        question: 'How do I convert a PDF certificate into a JPG under 50 KB or 100 KB?',
        answer:
          'Set the Target file size (KB) input to 50 or 100. After rendering the PDF page at high clarity, our 7-pass binary search compresses each JPG page so it lands strictly under your KB limit.',
      },
      {
        question: 'Are confidential PDF bank statements or IDs uploaded to a server?',
        answer:
          'Never. PDF rendering runs 100% inside your browser tab using our locally bundled PDF engine. No document data ever leaves your computer or phone.',
      },
      {
        question: 'What happens if my PDF has 20 pages?',
        answer:
          'Each selected page is rendered into its own numbered JPG file (e.g. document-p1.jpg, document-p2.jpg) and you can download all 20 pages in one click using "Download all as ZIP".',
      },
    ],
    comparisonRows: [
      {
        feature: 'File Type',
        sourceValue: 'Vector/raster portable document (.pdf)',
        targetValue: 'Universal raster image per page (.jpg)',
      },
      {
        feature: 'Resolution Control',
        sourceValue: 'Resolution-independent PDF points',
        targetValue: 'Selectable 72 DPI, 150 DPI, or 300 DPI rasterization',
      },
      {
        feature: 'Page Extraction',
        sourceValue: 'Multi-page container',
        targetValue: 'All pages or custom range (e.g. 1-3, 5) exported as individual JPGs',
      },
      {
        feature: 'Image Upload Portals',
        sourceValue: 'Rejected by image-only `<input accept="image/jpeg">` fields',
        targetValue: 'Accepted by 100% of photo & certificate upload slots',
      },
    ],
    relatedSlugs: ['pdf-to-png', 'jpg-to-pdf', 'png-to-pdf', 'heic-to-pdf'],
    compressorLinkSlug: 'compress-photo-to-50kb',
    compressorLinkAnchor: 'Compress Extracted JPG to 50 KB',
  },
  {
    slug: 'pdf-to-png',
    sourceLabel: 'PDF',
    targetLabel: 'PNG',
    defaultOutputFormat: 'png',
    acceptHint: '.pdf,application/pdf',
    title: 'PDF to PNG Converter — Lossless 300 DPI Page Rendering',
    metaDescription:
      'Convert PDF pages to lossless PNG images at 72, 150, or 300 DPI right in your browser. Extract specific page ranges privately with zero uploads.',
    h1: 'Convert PDF to PNG — Lossless High-DPI Page Extractor',
    subtitle:
      'Render PDF pages, architectural diagrams, and typography into crystal-clear, lossless PNG images at up to 300 DPI inside your browser.',
    introParagraphs: [
      'When extracting technical diagrams, vector charts, sheet music, barcode labels, or fine-print legal tables from a PDF document, saving as lossy JPEG can introduce compression ringing around thin black lines and small fonts. Converting PDF to lossless PNG preserves razor-sharp contrast on every glyph and vector stroke.',
      'CompressPhoto PDF to PNG converter renders your PDF pages locally inside your browser at 72, 150, or 300 DPI without sending sensitive files to an external server. Select all pages or specify a custom page range (such as "1-4, 8"), and download individual lossless PNGs or a single bundled ZIP file.',
    ],
    steps: [
      'Select or drop your .PDF file into the converter dropzone above.',
      'Confirm PNG is selected as the output format, then choose 150 DPI or 300 DPI for crisp line art and text.',
      'Leave Page Range as "All" to extract every page, or enter specific pages like "1-2, 5".',
      'Click Convert Now and download your lossless .png pages individually or packed into a ZIP archive.',
    ],
    faqs: [
      {
        question: 'When should I choose PDF to PNG instead of PDF to JPG?',
        answer:
          'Choose PDF to PNG when your PDF contains small text, barcodes, QR codes, line drawings, or CAD diagrams where lossless edge sharpness is more important than the smallest possible file size.',
      },
      {
        question: 'Does 300 DPI PDF to PNG work on mobile devices?',
        answer:
          'Yes. Our engine automatically monitors canvas pixel area (capping at 16 megapixels on mobile Safari so the browser tab never runs out of memory) while delivering maximum sharpness.',
      },
      {
        question: 'Can I extract just page 1 of a PDF as a PNG?',
        answer:
          'Yes! Type "1" in the PDF Page Range box and only the first page will be rendered and exported.',
      },
      {
        question: 'Is any part of my PDF uploaded to the internet during conversion?',
        answer:
          'No. The PDF parser and canvas rasterizer execute 100% locally inside your browser.',
      },
      {
        question: 'Can I resize the extracted PNG pages to a specific pixel width?',
        answer:
          'Yes. Select "Max width (px)" in the Resize mode dropdown (for example 1200 px) and every rendered PDF page will scale proportionally to that exact width.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Image Compression',
        sourceValue: 'PDF vector/text operators (.pdf)',
        targetValue: '100% Lossless PNG DEFLATE (.png)',
      },
      {
        feature: 'Text & Barcode Clarity',
        sourceValue: 'Vector scalable',
        targetValue: 'Zero JPEG artifacts; razor-sharp at 150 or 300 DPI',
      },
      {
        feature: 'Page Range Control',
        sourceValue: 'Multi-page document',
        targetValue: 'Full document or custom range (e.g. 1, 3-5)',
      },
      {
        feature: 'Execution Privacy',
        sourceValue: 'Local file',
        targetValue: 'Rendered in browser RAM; zero network uploads',
      },
    ],
    relatedSlugs: ['pdf-to-jpg', 'png-to-pdf', 'svg-to-png', 'png-to-jpg'],
    compressorLinkSlug: 'compress-photo-to-100kb',
    compressorLinkAnchor: 'Compress Image to 100 KB',
  },
  {
    slug: 'png-to-jpg',
    sourceLabel: 'PNG',
    targetLabel: 'JPG',
    defaultOutputFormat: 'jpg',
    acceptHint: '.png,image/png,image/*',
    title: 'PNG to JPG Converter — Flatten Transparency & Hit Exact KB',
    metaDescription:
      'Convert PNG to JPG in your browser. Shrink file size by up to 85%, fill transparent backgrounds with white or custom color, and target exact KB limits.',
    h1: 'Convert PNG to JPG — Reduce File Size & Set Custom Background',
    subtitle:
      'Turn heavy lossless PNG files and screenshots into lightweight, universally accepted JPG photos with custom transparency fill and exact KB targeting.',
    introParagraphs: [
      'Lossless PNG images are fantastic for design assets, but a single portrait or screenshot saved as PNG can easily weigh 2 MB to 8 MB—causing immediate "File too large" or "Invalid format: only JPEG allowed" errors on passport portals, job application boards, and CMS uploaders. Furthermore, naive PNG-to-JPG converters often turn transparent PNG backgrounds into ugly solid black rectangles.',
      'Our browser-local PNG to JPG converter solves both problems at once. First, it composites any alpha transparency onto clean studio white (#FFFFFF) by default—or lets you choose any custom hex color such as passport sky-blue or warm cream. Second, it encodes a high-efficiency JPEG and lets you specify an optional target KB ceiling (like 20 KB or 50 KB) using our 7-pass binary search.',
    ],
    steps: [
      'Drop one or multiple .PNG images into the converter dropzone above.',
      'Ensure JPG is selected as the target format and choose your background color for transparent regions (White #FFFFFF is default).',
      'Adjust the Quality slider (85% recommended) or enter an exact Target KB size (such as 20 KB, 50 KB, or 100 KB).',
      'Click Convert Now and download your compact .jpg images individually or as a ZIP archive.',
    ],
    faqs: [
      {
        question: 'Why did my transparent PNG background turn black in other converters?',
        answer:
          'Transparent pixels in a PNG often have RGB values of (0,0,0) with Alpha=0. When a basic converter drops the alpha channel without compositing, those pixels become black. Our tool fills a solid background layer (#FFFFFF white by default) before drawing your PNG.',
      },
      {
        question: 'How much smaller will my file be after converting PNG to JPG?',
        answer:
          'For photographic images and detailed screenshots, converting PNG to JPG at 85% quality typically reduces file size by 70% to 90% with no visible loss in clarity.',
      },
      {
        question: 'Can I convert a PNG signature or portrait to a JPG under 20 KB or 50 KB?',
        answer:
          'Yes! Click the 20 KB or 50 KB quick preset button (or type any KB number) and our 7-pass binary search will lock the exact JPEG quality needed to stay under your limit.',
      },
      {
        question: 'Does converting PNG to JPG strip metadata chunks?',
        answer:
          'Yes. All PNG ancillary chunks (tEXt, iTXt, zTXt, eXIf, pHYs) are stripped during canvas re-encoding when Strip Metadata is checked.',
      },
      {
        question: 'Can I batch-convert 30 PNG files to JPG at once?',
        answer:
          'Absolutely. Select all 30 PNG files, click Convert Now, and click "Download all as ZIP" to get all converted JPGs in one archive.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Compression Method',
        sourceValue: 'Lossless DEFLATE (.png)',
        targetValue: 'Perceptual DCT compression (.jpg) — 70–90% smaller on photos',
      },
      {
        feature: 'Transparency',
        sourceValue: '8-bit Alpha channel',
        targetValue: 'Composited onto White (#FFFFFF) or custom color picker value',
      },
      {
        feature: 'Government Portal Support',
        sourceValue: 'Frequently rejected on DS-160, ANTS, SSC & UPSC portals',
        targetValue: 'Required standard format across all official portals',
      },
      {
        feature: 'Exact KB Control',
        sourceValue: 'Hard to hit small KB limits without tiny dimensions',
        targetValue: 'Easily hits 10 KB, 20 KB, 50 KB, or 100 KB at full resolution',
      },
    ],
    relatedSlugs: ['jpg-to-png', 'png-to-webp', 'png-to-pdf', 'png-to-ico'],
    compressorLinkSlug: 'compress-photo-to-20kb',
    compressorLinkAnchor: 'Compress Photo or Signature to 20 KB',
  },
  {
    slug: 'jpg-to-png',
    sourceLabel: 'JPG',
    targetLabel: 'PNG',
    defaultOutputFormat: 'png',
    acceptHint: '.jpg,.jpeg,.jpe,image/jpeg,image/*',
    title: 'JPG to PNG Converter — Lossless Browser Conversion',
    metaDescription:
      'Convert JPG and JPEG images to lossless PNG format in your browser. Stop generation loss during editing, resize dimensions, and strip EXIF privately.',
    h1: 'Convert JPG to PNG — Lossless Editing Container in Browser',
    subtitle:
      'Convert .JPG and .JPEG images into lossless .PNG files locally in your browser so you can edit, annotate, or upload to PNG-only workflows without further compression artifacts.',
    introParagraphs: [
      'Every time you open, edit, and re-save a JPEG file, the lossy DCT algorithm re-quantizes 8×8 pixel blocks, compounding blocky artifacts and color banding—a phenomenon known as generation loss. In addition, certain software pipelines, game engines, badge generators, and print-on-demand platforms strictly require a .PNG file upload.',
      'Our browser-local JPG to PNG converter decodes your JPEG image with correct EXIF orientation, optionally resizes it to your target pixel dimensions, strips embedded camera and GPS metadata, and packages the bitmap into a clean, lossless 24/32-bit PNG file without uploading your image to any server.',
    ],
    steps: [
      'Select or drag your .JPG or .JPEG files into the dropzone above.',
      'Confirm PNG is selected in the "Convert to" dropdown.',
      'Optionally select a Resize option (such as Max Width or Percentage) if you want to adjust pixel dimensions.',
      'Click Convert Now and download your lossless .png files individually or bundled in a ZIP archive.',
    ],
    faqs: [
      {
        question: 'Does converting JPG to PNG automatically make the background transparent?',
        answer:
          'No—converting the file container from JPG to PNG creates a lossless PNG copy of your image so no further JPEG compression loss occurs, and allows you to add transparency in any editor.',
      },
      {
        question: 'Why is the output PNG file larger in KB than my input JPG?',
        answer:
          'JPG uses lossy compression that discards high-frequency detail, while PNG stores every decoded pixel losslessly. If you need a smaller file size in a modern format that also supports lossless/lossy modes, consider WebP.',
      },
      {
        question: 'Is there any difference between JPG to PNG and JPEG to PNG?',
        answer:
          'No. .jpg and .jpeg are identical JFIF/Exif image streams; our converter accepts both .jpg, .jpeg, .jpe, and .jfif extensions seamlessly.',
      },
      {
        question: 'Can I strip camera EXIF and GPS tags when converting JPG to PNG?',
        answer:
          'Yes. "Strip EXIF, GPS & camera metadata" is enabled by default, ensuring your output PNG contains pure pixel data and zero private location tags.',
      },
      {
        question: 'Does this converter work offline once loaded?',
        answer:
          'Yes. Because JPG decoding and PNG encoding use native browser canvas APIs, it runs 100% on your device even without an internet connection.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Re-saving Quality',
        sourceValue: 'Loses quality on every edit/save cycle (.jpg)',
        targetValue: 'Zero generation loss on subsequent saves (.png)',
      },
      {
        feature: 'Alpha Channel Support',
        sourceValue: 'None (24-bit RGB only)',
        targetValue: '32-bit RGBA container ready for transparency editing',
      },
      {
        feature: 'EXIF Metadata',
        sourceValue: 'Often embeds GPS coordinates & camera serials',
        targetValue: 'Stripped clean by default during conversion',
      },
      {
        feature: 'Browser & OS Support',
        sourceValue: 'Universal',
        targetValue: 'Universal',
      },
    ],
    relatedSlugs: ['png-to-jpg', 'jpeg-to-png', 'jpg-to-webp', 'jpg-to-ico'],
    compressorLinkSlug: 'compress-photo-to-50kb',
    compressorLinkAnchor: 'Compress Photo to 50 KB',
  },
  {
    slug: 'webp-to-jpg',
    sourceLabel: 'WebP',
    targetLabel: 'JPG',
    defaultOutputFormat: 'jpg',
    acceptHint: '.webp,image/webp,image/*',
    title: 'WebP to JPG Converter — Save WebP Images as Standard JPG',
    metaDescription:
      'Convert Google WebP images to universal JPG in your browser. Open downloaded .webp files in any app or portal, set custom background & hit exact KB limits.',
    h1: 'Convert WebP to JPG — Universal Compatibility in Your Browser',
    subtitle:
      'Turn downloaded .WebP images into standard .JPG files that open in every photo editor, office suite, and government upload portal.',
    introParagraphs: [
      'Almost every modern website, e-commerce store, and content management system now serves images in Google’s WebP format to speed up page loads. However, when you right-click and save an image from the web, that .webp file is frequently rejected by older versions of Photoshop, Microsoft Office configurations, desktop printing kiosks, and official visa or exam portals that only accept .jpg uploads.',
      'CompressPhoto WebP to JPG converter transforms one or dozens of .webp files into standard JFIF .jpg images instantaneously inside your browser. If your source WebP contains transparent regions, they are cleanly composited onto pure white (or your custom color), and you can optionally lock an exact KB size such as 50 KB or 100 KB.',
    ],
    steps: [
      'Drag your downloaded .WebP files into the upload box above.',
      'Verify JPG is selected as the output format and set your desired quality or background color.',
      'Optionally enter a Target KB limit or resize width if preparing the image for an online portal.',
      'Click Convert Now and download your universal .jpg files individually or as a ZIP.',
    ],
    faqs: [
      {
        question: 'Why do websites save images as .webp instead of .jpg?',
        answer:
          'Websites use WebP because VP8/VP8L compression reduces bandwidth by 25%–35% compared to JPEG. Converting back to JPG restores 100% compatibility with desktop software and upload forms.',
      },
      {
        question: 'What happens if my WebP image has a transparent background?',
        answer:
          'Since JPG does not support transparency, our converter fills transparent areas with pure white (#FFFFFF) by default, or any color you pick in the Background Color control.',
      },
      {
        question: 'Can I convert animated WebP files to JPG?',
        answer:
          'Yes—for animated WebP files, the converter extracts and encodes the first keyframe as a static high-resolution JPG.',
      },
      {
        question: 'Will converting WebP to JPG degrade image quality?',
        answer:
          'At our default 85%–92% quality setting, visual differences are virtually imperceptible to the human eye while keeping file sizes compact.',
      },
      {
        question: 'Are my WebP images uploaded to a server?',
        answer:
          'Never. Conversion happens in milliseconds inside your local browser memory.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Origin & Codec',
        sourceValue: 'Google VP8 intra-frame codec (.webp)',
        targetValue: 'ISO/IEC 10918 JPEG standard (.jpg)',
      },
      {
        feature: 'Legacy App & Portal Support',
        sourceValue: 'Blocked by many upload forms & older desktop apps',
        targetValue: 'Supported by 100% of software, kiosks & government portals',
      },
      {
        feature: 'Transparency',
        sourceValue: 'Supported in WebP alpha channel',
        targetValue: 'Flattened onto clean white (#FFFFFF) or custom color',
      },
      {
        feature: 'Conversion Speed',
        sourceValue: 'Decoded natively in browser',
        targetValue: 'Under 50 ms per image locally',
      },
    ],
    relatedSlugs: ['webp-to-png', 'jpg-to-webp', 'png-to-jpg', 'avif-to-jpg'],
    compressorLinkSlug: 'compress-photo-to-50kb',
    compressorLinkAnchor: 'Compress JPG to Exact 50 KB',
  },
  {
    slug: 'webp-to-png',
    sourceLabel: 'WebP',
    targetLabel: 'PNG',
    defaultOutputFormat: 'png',
    acceptHint: '.webp,image/webp,image/*',
    title: 'WebP to PNG Converter — Keep Transparency & Lossless Quality',
    metaDescription:
      'Convert WebP to lossless PNG in your browser while preserving full alpha transparency. Ideal for logos, stickers, UI icons, and design workflows.',
    h1: 'Convert WebP to PNG — Preserve Alpha Transparency Locally',
    subtitle:
      'Convert transparent .WebP logos, product cutouts, and stickers into lossless 32-bit RGBA .PNG files directly inside your browser.',
    introParagraphs: [
      'Designers, developers, and marketers frequently download logos, product cutouts, and UI icons from modern web pages only to discover they are encoded as transparent .webp files that cannot be imported into certain video editors, print layout tools, or presentation software. Converting those assets to JPG would destroy their transparent backgrounds.',
      'Our browser-based WebP to PNG converter preserves the full 8-bit alpha transparency channel of your WebP image and outputs a standards-compliant, lossless 32-bit RGBA PNG. Everything executes locally in your browser RAM with batch ZIP download support and zero server uploads.',
    ],
    steps: [
      'Drop one or multiple .WebP files into the converter dropzone above.',
      'Ensure PNG is selected in the "Convert to" selector (alpha transparency is preserved automatically).',
      'Optionally adjust pixel dimensions using Max Width, Max Height, or Percentage scaling.',
      'Click Convert Now and download your transparent .png files individually or in a single ZIP archive.',
    ],
    faqs: [
      {
        question: 'Does WebP to PNG preserve transparent backgrounds?',
        answer:
          'Yes! Both WebP and PNG support 8-bit alpha channels. Every transparent and semi-transparent pixel in your WebP is preserved identically in the output PNG.',
      },
      {
        question: 'Why is the converted PNG larger than the source WebP?',
        answer:
          'WebP uses predictive spatial coding and entropy compression that is more compact than PNG’s 1990s DEFLATE algorithm. Converting to PNG trades a slightly larger file size for universal lossless editing compatibility.',
      },
      {
        question: 'Can I resize a WebP sticker or icon while converting it to PNG?',
        answer:
          'Yes. Use the Resize mode dropdown to set a Max Width (e.g. 512 px) or Percentage scale while keeping the exact aspect ratio.',
      },
      {
        question: 'Does this tool upload my client logos or proprietary UI assets?',
        answer:
          'No. All decoding and encoding happens inside your local browser tab.',
      },
      {
        question: 'Can I also convert PNG back to WebP on this site?',
        answer:
          'Yes—use our dedicated PNG to WebP converter link below whenever you are ready to publish your edited PNGs back to the web.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Alpha Transparency',
        sourceValue: '8-bit alpha channel (.webp)',
        targetValue: 'Preserved 1:1 in 32-bit RGBA (.png)',
      },
      {
        feature: 'Compression Type',
        sourceValue: 'VP8 / VP8L lossy or lossless',
        targetValue: '100% Lossless DEFLATE',
      },
      {
        feature: 'Design & Video App Support',
        sourceValue: 'Unsupported in some older NLEs & print tools',
        targetValue: 'Supported in 100% of design, CAD, print & video software',
      },
      {
        feature: 'Privacy',
        sourceValue: 'Local file',
        targetValue: '100% client-side execution',
      },
    ],
    relatedSlugs: ['png-to-webp', 'webp-to-jpg', 'svg-to-png', 'png-to-ico'],
    compressorLinkSlug: 'compress-photo-to-100kb',
    compressorLinkAnchor: 'Compress Image to 100 KB',
  },
  {
    slug: 'jpg-to-webp',
    sourceLabel: 'JPG',
    targetLabel: 'WebP',
    defaultOutputFormat: 'webp',
    acceptHint: '.jpg,.jpeg,.jpe,image/jpeg,image/*',
    title: 'JPG to WebP Converter — Shrink Web Images for Core Web Vitals',
    metaDescription:
      'Convert JPG and JPEG photos to next-gen WebP in your browser. Cut image weight by 30–50%, hit exact KB targets, and boost page speed with zero uploads.',
    h1: 'Convert JPG to WebP — Next-Gen Web Optimization in Browser',
    subtitle:
      'Compress and convert .JPG photographs into high-efficiency .WebP images locally to accelerate Core Web Vitals (LCP) and save bandwidth.',
    introParagraphs: [
      'Google Lighthouse and Core Web Vitals explicitly audit web pages for "Serve images in next-gen formats." Replacing traditional JPEG hero banners, blog thumbnails, and e-commerce product photos with WebP typically cuts byte weight by 25% to 45% at equivalent perceptual quality—directly improving Largest Contentful Paint (LCP) on mobile networks.',
      'With CompressPhoto JPG to WebP converter, you can batch-convert entire folders of product or editorial JPEGs directly in your browser. Dial in a custom quality percentage, cap maximum pixel width (e.g. 1200 px or 1920 px), or enforce a strict kilobyte budget (such as 50 KB or 100 KB per product card) and download your optimized .webp assets as a single ZIP archive.',
    ],
    steps: [
      'Drop your .JPG or .JPEG images into the batch dropzone above.',
      'Ensure WebP is selected as the output format and set Quality (80%–85% delivers exceptional compression).',
      'Optionally set a Max Width (e.g. 1600 px) or Target KB ceiling (e.g. 100 KB) for uniform web performance.',
      'Click Convert Now and download individual .webp files or click "Download all as ZIP".',
    ],
    faqs: [
      {
        question: 'How much smaller is WebP compared to JPG at the same visual quality?',
        answer:
          'Google benchmarks and real-world photography tests show WebP lossy files are 25% to 34% smaller than JPEG at equivalent SSIM quality index.',
      },
      {
        question: 'Do all modern web browsers support WebP images?',
        answer:
          'Yes. Chrome, Safari (macOS & iOS 14+), Firefox, Edge, and Opera all natively support WebP, covering over 98% of global web traffic.',
      },
      {
        question: 'Can I force every product image to be under 50 KB or 100 KB as WebP?',
        answer:
          'Yes. Enter 50 or 100 in the Target file size (KB) box and our 7-pass binary search will automatically optimize each WebP file to stay under that exact byte budget.',
      },
      {
        question: 'Does converting JPG to WebP strip camera EXIF metadata?',
        answer:
          'Yes—stripping EXIF and color profile bloat saves an extra 4 KB to 30 KB per image and protects photographer privacy.',
      },
      {
        question: 'Is there a daily limit on how many JPGs I can convert to WebP?',
        answer:
          'Zero limits. Because all processing uses your own device CPU/GPU in the browser, you can convert as many batches as you like for free.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Average File Size',
        sourceValue: '100% baseline (.jpg)',
        targetValue: '60% – 75% of JPG size at equal visual clarity (.webp)',
      },
      {
        feature: 'Core Web Vitals Impact',
        sourceValue: 'Flags "Serve images in next-gen formats" in Lighthouse',
        targetValue: 'Passes Lighthouse next-gen image audit & improves LCP',
      },
      {
        feature: 'Block Artifact Handling',
        sourceValue: '8×8 DCT blocks visible at low KB',
        targetValue: 'Predictive macroblocking keeps smooth gradients clean',
      },
      {
        feature: 'Browser Support',
        sourceValue: '100% all browsers',
        targetValue: '98.5%+ all modern desktop & mobile browsers',
      },
    ],
    relatedSlugs: ['png-to-webp', 'webp-to-jpg', 'avif-to-jpg', 'jpg-to-png'],
    compressorLinkSlug: 'compress-photo-to-50kb',
    compressorLinkAnchor: 'Compress Photo to 50 KB',
  },
  {
    slug: 'png-to-webp',
    sourceLabel: 'PNG',
    targetLabel: 'WebP',
    defaultOutputFormat: 'webp',
    acceptHint: '.png,image/png,image/*',
    title: 'PNG to WebP Converter — Transparent Web Assets at 70% Smaller Size',
    metaDescription:
      'Convert transparent PNG images and screenshots to lightweight WebP in your browser. Keep full alpha transparency while cutting file size by up to 75%.',
    h1: 'Convert PNG to WebP — Keep Transparency, Slash File Weight',
    subtitle:
      'Transform heavy transparent .PNG graphics, UI screenshots, and e-commerce cutouts into fast-loading .WebP files while preserving full alpha transparency.',
    introParagraphs: [
      'Historically, web developers had to use PNG whenever an image needed a transparent background—even though a single transparent product cutout or hero illustration could weigh 800 KB to 3 MB. Unlike JPEG, WebP natively supports a full 8-bit alpha transparency channel alongside lossy or lossless color compression, shrinking transparent PNGs by 60% to 80%.',
      'CompressPhoto PNG to WebP converter runs 100% locally in your browser. Drop your transparent PNG logos, game sprites, or documentation screenshots, set your preferred quality or target KB limit, and export crisp, alpha-preserving .webp files ready for production deployment.',
    ],
    steps: [
      'Select or drop your .PNG images into the converter dropzone above.',
      'Ensure WebP is chosen in the "Convert to" selector (alpha transparency is retained automatically).',
      'Set your Quality slider (85%–90% is ideal for crisp UI and cutouts) or enter a Target KB limit.',
      'Click Convert Now and download your lightweight .webp files individually or as a ZIP archive.',
    ],
    faqs: [
      {
        question: 'Does converting PNG to WebP keep the transparent background?',
        answer:
          'Yes! Unlike JPG, WebP natively encodes an 8-bit alpha channel, so your transparent background remains completely transparent.',
      },
      {
        question: 'How much smaller are transparent WebP images compared to transparent PNGs?',
        answer:
          'Combining lossy RGB with an alpha channel in WebP typically reduces file size by 65% to 85% compared to an equivalent 32-bit RGBA PNG.',
      },
      {
        question: 'Can I also set a Target KB limit when converting PNG to WebP?',
        answer:
          'Yes. Enter your desired KB ceiling (for example 50 KB or 100 KB) and our 7-pass binary search will find the highest quality WebP encoding that meets your target.',
      },
      {
        question: 'Will my UI screenshot text stay sharp in WebP?',
        answer:
          'Yes—setting the Quality slider between 88% and 95% keeps UI typography and thin borders sharp while still saving over half the PNG byte weight.',
      },
      {
        question: 'Are my proprietary UI mockups uploaded to any server?',
        answer:
          'Never. Every conversion runs locally inside your browser tab.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Transparency Support',
        sourceValue: '8-bit RGBA alpha (.png)',
        targetValue: '8-bit RGBA alpha preserved (.webp)',
      },
      {
        feature: 'Typical E-Commerce Cutout Size',
        sourceValue: '600 KB – 2.5 MB',
        targetValue: '80 KB – 300 KB (65–85% reduction)',
      },
      {
        feature: 'Compression Control',
        sourceValue: 'Fixed lossless DEFLATE',
        targetValue: 'Adjustable quality (10–100%) + exact KB binary search',
      },
      {
        feature: 'Web Performance',
        sourceValue: 'Slow mobile rendering on heavy pages',
        targetValue: 'Recommended by Google PageSpeed & Core Web Vitals',
      },
    ],
    relatedSlugs: ['webp-to-png', 'jpg-to-webp', 'png-to-jpg', 'svg-to-png'],
    compressorLinkSlug: 'compress-photo-to-50kb',
    compressorLinkAnchor: 'Compress Image to 50 KB',
  },
  {
    slug: 'avif-to-jpg',
    sourceLabel: 'AVIF',
    targetLabel: 'JPG',
    defaultOutputFormat: 'jpg',
    acceptHint: '.avif,image/avif,image/*',
    title: 'AVIF to JPG Converter — Open AV1 Images Anywhere Privately',
    metaDescription:
      'Convert AVIF images to universal JPG in your browser. Open .avif files in any desktop software or upload portal, with custom background & KB control.',
    h1: 'Convert AVIF to JPG — Instant Universal Compatibility',
    subtitle:
      'Decode next-gen .AVIF (AV1 Image File Format) photos into universally supported .JPG files locally in your browser.',
    introParagraphs: [
      'AVIF (AV1 Image File Format) is rapidly gaining adoption across news websites, CDNs, and newer smartphone OS releases thanks to its ultra-compact AV1 video keyframe compression. However, outside of modern web browsers, .avif files are still rejected by most government upload portals, desktop publishing suites, legacy photo viewers, and email clients.',
      'Our browser-local AVIF to JPG converter decodes .avif images using your browser’s hardware-accelerated AV1 decoder and re-encodes them as standard ISO JPEG files in milliseconds. Transparent AVIF regions are flattened onto clean white (or your custom color), and you can optionally lock a target file size in KB.',
    ],
    steps: [
      'Drag one or more .AVIF files into the converter dropzone above.',
      'Ensure JPG is selected as the output format and adjust Quality (85% default) or background fill color.',
      'Optionally specify a Target KB limit or resize dimensions.',
      'Click Convert Now and download your universally compatible .jpg files.',
    ],
    faqs: [
      {
        question: 'What is an AVIF file and why won’t my software open it?',
        answer:
          'AVIF compresses images using the royalty-free AV1 video codec. While web browsers decode it natively, many desktop apps and upload portals only recognize traditional JPG and PNG headers.',
      },
      {
        question: 'Does converting AVIF to JPG upload my files to a cloud server?',
        answer:
          'No. Your browser decodes the AVIF frame locally in RAM and writes the JPG directly on your device.',
      },
      {
        question: 'Can I convert a batch of downloaded AVIF images to JPG at once?',
        answer:
          'Yes! Select as many AVIF files as you need, convert them together, and download a single ZIP archive.',
      },
      {
        question: 'What happens if my AVIF file has transparency?',
        answer:
          'Transparent pixels are composited onto pure white (#FFFFFF) by default, or any color you choose in the Background Color picker.',
      },
      {
        question: 'Can I cap the output JPG at 50 KB or 100 KB?',
        answer:
          'Yes. Enter 50 or 100 in the Target file size (KB) field to engage our 7-pass binary search.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Codec Architecture',
        sourceValue: 'AV1 HEIF container (.avif)',
        targetValue: 'Standard JFIF DCT (.jpg)',
      },
      {
        feature: 'Software & Portal Compatibility',
        sourceValue: 'Modern browsers only; rejected by most portals',
        targetValue: '100% universal across all software, OS & portals',
      },
      {
        feature: 'Transparency',
        sourceValue: 'Supported in AVIF alpha plane',
        targetValue: 'Flattened onto White (#FFFFFF) or custom color',
      },
      {
        feature: 'Privacy',
        sourceValue: 'Local file',
        targetValue: '100% browser-local conversion',
      },
    ],
    relatedSlugs: ['avif-to-png', 'webp-to-jpg', 'heic-to-jpg', 'jpg-to-webp'],
    compressorLinkSlug: 'compress-photo-to-50kb',
    compressorLinkAnchor: 'Compress JPG to 50 KB',
  },
  {
    slug: 'avif-to-png',
    sourceLabel: 'AVIF',
    targetLabel: 'PNG',
    defaultOutputFormat: 'png',
    acceptHint: '.avif,image/avif,image/*',
    title: 'AVIF to PNG Converter — Lossless & Alpha-Preserving in Browser',
    metaDescription:
      'Convert AVIF to lossless PNG directly in your browser. Preserve full alpha transparency and pixel clarity for design, editing, and print workflows.',
    h1: 'Convert AVIF to PNG — Preserve Transparency & Detail Locally',
    subtitle:
      'Transform .AVIF graphics and photos into uncompressed, lossless 32-bit RGBA .PNG files without leaving your browser.',
    introParagraphs: [
      'When you need to import an AVIF graphic, UI asset, or transparent product cutout into desktop editing software, presentation decks, or print pipelines that lack AV1 codec support, converting to lossless PNG ensures zero additional compression artifacts and keeps every transparent pixel intact.',
      'CompressPhoto AVIF to PNG converter decodes your .avif files locally in browser RAM and outputs clean, standards-compliant PNG files. You can batch-convert multiple files at once, optionally scale dimensions, and download all converted PNGs in a single ZIP archive.',
    ],
    steps: [
      'Select or drop your .AVIF files into the converter area above.',
      'Confirm PNG is selected in the "Convert to" dropdown.',
      'Optionally choose a Resize mode if you need specific pixel dimensions.',
      'Click Convert Now and download your lossless .png files individually or as a ZIP.',
    ],
    faqs: [
      {
        question: 'Does AVIF to PNG keep transparent backgrounds intact?',
        answer:
          'Yes. Any alpha channel transparency present in the source AVIF file is preserved 1:1 in the exported 32-bit RGBA PNG.',
      },
      {
        question: 'Why is the resulting PNG file larger than the AVIF file?',
        answer:
          'AVIF is one of the most heavily compressed lossy formats available, whereas PNG stores uncompressed/lossless DEFLATE pixel data so you can edit without quality loss.',
      },
      {
        question: 'Are my files uploaded anywhere during AVIF to PNG conversion?',
        answer:
          'Never. The entire conversion takes place locally inside your browser tab.',
      },
      {
        question: 'Can I resize the image while converting AVIF to PNG?',
        answer:
          'Yes—use the Resize mode selector to set a Max Width, Max Height, or Percentage scale.',
      },
      {
        question: 'What if my browser cannot open a specific AVIF file?',
        answer:
          'All current versions of Chrome, Firefox, Safari (16.4+), and Edge include native AV1 image decoding.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Compression Method',
        sourceValue: 'AV1 intra-frame coding (.avif)',
        targetValue: 'Lossless DEFLATE (.png)',
      },
      {
        feature: 'Alpha Transparency',
        sourceValue: 'Supported',
        targetValue: 'Preserved 100% in 32-bit RGBA',
      },
      {
        feature: 'Desktop Editor Support',
        sourceValue: 'Requires plugins in older editors',
        targetValue: 'Native support in every design & office tool',
      },
      {
        feature: 'Data Privacy',
        sourceValue: 'Local file',
        targetValue: 'Zero server uploads',
      },
    ],
    relatedSlugs: ['avif-to-jpg', 'webp-to-png', 'heic-to-png', 'png-to-webp'],
    compressorLinkSlug: 'compress-photo-to-100kb',
    compressorLinkAnchor: 'Compress Image to 100 KB',
  },
  {
    slug: 'tiff-to-jpg',
    sourceLabel: 'TIFF',
    targetLabel: 'JPG',
    defaultOutputFormat: 'jpg',
    acceptHint: '.tif,.tiff,image/tiff,image/*',
    title: 'TIFF to JPG Converter — Shrink Large Scans in Your Browser',
    metaDescription:
      'Convert heavy TIFF and TIF scans to compact JPG images in your browser. Cut 30 MB scans down to 50 KB or 100 KB for portal uploads with zero server uploads.',
    h1: 'Convert TIFF to JPG — Compress Heavy Scans Locally',
    subtitle:
      'Turn multi-megabyte .TIF and .TIFF flatbed scans, medical/archival images, and camera exports into compact, portal-ready .JPG files in your browser.',
    introParagraphs: [
      'Flatbed document scanners, DSLR export workflows, and archival systems frequently save images as uncompressed or LZW-compressed Tagged Image File Format (.tif / .tiff) files weighing 15 MB to 80 MB each. Because Chrome, Firefox, and Edge do not natively display TIFF images in standard `<img>` tags—and online portals strictly reject .tiff uploads—converting to JPG is essential for sharing and submitting scans.',
      'Our browser-local TIFF to JPG converter lazily loads a dedicated TIFF decoder (`utif`) right inside your browser tab only when you select a .tif or .tiff file. It decodes the raster data locally in RAM, flattens any transparency onto clean white, and lets you compress a 30 MB scan down to a crisp 100 KB or 50 KB JPG without uploading confidential documents to the cloud.',
    ],
    steps: [
      'Drop one or more .TIF or .TIFF files into the converter dropzone above.',
      'Confirm JPG is selected as the target format and set your desired Quality (85% default).',
      'Optionally enter a Target KB limit (such as 100 KB or 200 KB) or set a Max Width (e.g. 2000 px) to tame massive scanner resolutions.',
      'Click Convert Now and download your lightweight .jpg files individually or as a ZIP.',
    ],
    faqs: [
      {
        question: 'Why won’t Chrome or Firefox open my .TIFF file directly?',
        answer:
          'Most web browsers (except Safari) do not include a built-in TIFF decoder for web pages. Our converter uses a self-hosted JavaScript TIFF decoder so you can view and convert TIFFs in any browser.',
      },
      {
        question: 'How much smaller will my TIFF scan become when converted to JPG?',
        answer:
          'A typical 25 MB uncompressed 300 DPI A4 TIFF scan converts to a 400 KB – 800 KB JPG at 85% quality, or can be locked to an exact 100 KB limit using the Target KB box.',
      },
      {
        question: 'Are my scanned legal or medical TIFF documents uploaded to a server?',
        answer:
          'Never. The TIFF parser runs 100% locally in your browser memory—zero bytes leave your computer.',
      },
      {
        question: 'What happens if I drop a multi-page TIFF file?',
        answer:
          'The converter extracts and decodes the primary (first) high-resolution IFD frame into a standard JPG image.',
      },
      {
        question: 'Can I also convert TIFF directly to PDF?',
        answer:
          'Yes! Simply change the "Convert to" dropdown from JPG to PDF to wrap your TIFF scans into a single or multi-page PDF document.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Typical File Size',
        sourceValue: '10 MB – 60 MB per scan (.tiff)',
        targetValue: '50 KB – 500 KB (.jpg) — up to 98% smaller',
      },
      {
        feature: 'Web & Portal Compatibility',
        sourceValue: 'Unsupported in Chrome/Firefox/Edge & web upload forms',
        targetValue: '100% supported across all browsers, devices & portals',
      },
      {
        feature: 'Decoding Engine',
        sourceValue: 'Lazy-loaded local UTIF parser in browser RAM',
        targetValue: 'Native ISO JPEG encoder with 7-pass KB search',
      },
      {
        feature: 'Best Use Case',
        sourceValue: 'Pre-press & local scanner archiving',
        targetValue: 'Online portal uploads, email & fast document sharing',
      },
    ],
    relatedSlugs: ['bmp-to-jpg', 'jpg-to-pdf', 'heic-to-jpg', 'png-to-jpg'],
    compressorLinkSlug: 'compress-photo-to-100kb',
    compressorLinkAnchor: 'Compress Scanned JPG to 100 KB',
  },
  {
    slug: 'bmp-to-jpg',
    sourceLabel: 'BMP',
    targetLabel: 'JPG',
    defaultOutputFormat: 'jpg',
    acceptHint: '.bmp,image/bmp,image/x-ms-bmp,image/*',
    title: 'BMP to JPG Converter — Compress Uncompressed Bitmaps Locally',
    metaDescription:
      'Convert uncompressed Windows BMP bitmap files to compact JPG images in your browser. Reduce file size by up to 95% and hit exact KB limits privately.',
    h1: 'Convert BMP to JPG — Shrink Uncompressed Bitmaps by 95%',
    subtitle:
      'Transform bloated Windows .BMP bitmap files from legacy scanners, biometric devices, and industrial software into tiny, universal .JPG images.',
    introParagraphs: [
      'Windows Device Independent Bitmap (.bmp) files store raw, uncompressed RGB pixel arrays. Even a modest 1000×1000 pixel portrait or fingerprint/signature capture exported by legacy banking software, medical equipment, or older Windows Paint workflows consumes 3 MB of disk space—and is immediately rejected by modern web upload forms that require .jpg files under 50 KB.',
      'CompressPhoto BMP to JPG converter decodes 24-bit and 32-bit Windows bitmaps directly in your browser and encodes them into clean, standard JPEG files at a fraction of the original byte size. You can convert dozens of BMP files in a single batch and optionally lock an exact target KB size like 20 KB or 50 KB.',
    ],
    steps: [
      'Select or drop your .BMP files into the converter dropzone above.',
      'Ensure JPG is selected as the target format and set your desired Quality (85% default).',
      'Optionally type a Target KB size (such as 20 KB or 50 KB) if uploading to an exam or banking portal.',
      'Click Convert Now and download your compressed .jpg files individually or as a ZIP archive.',
    ],
    faqs: [
      {
        question: 'Why are BMP files so huge compared to JPG?',
        answer:
          'BMP stores 3 raw bytes (Red, Green, Blue) for every single pixel with zero compression. Converting to JPG applies Discrete Cosine Transform compression, typically shrinking BMP files by 90% to 97%.',
      },
      {
        question: 'Can I convert a BMP signature scan to a JPG under 20 KB for Indian SSC/IBPS exams?',
        answer:
          'Yes! Click the 20 KB quick preset button and our 7-pass binary search will guarantee your converted JPG lands strictly under 20 KB.',
      },
      {
        question: 'Does converting BMP to JPG require uploading my files?',
        answer:
          'No. BMP decoding and JPG encoding run 100% locally inside your browser tab.',
      },
      {
        question: 'Can I also convert JPG or PNG back into a 24-bit Windows BMP file?',
        answer:
          'Yes! Our converter includes a custom zero-dependency 24-bit DIB BMP encoder—just select BMP in the "Convert to" dropdown on any page.',
      },
      {
        question: 'Is there any visual quality loss when converting BMP to JPG at 85%–90%?',
        answer:
          'At 85%–92% quality, the converted JPG looks virtually identical to the uncompressed BMP while weighing 10× to 20× less.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Data Storage',
        sourceValue: 'Uncompressed raw BGR scanlines (.bmp)',
        targetValue: 'Compressed DCT blocks (.jpg) — 90–97% smaller',
      },
      {
        feature: '1200×1600 Portrait Size',
        sourceValue: '~5.76 MB',
        targetValue: '~180 KB at 85% quality (or locked to 50 KB)',
      },
      {
        feature: 'Web Upload Portals',
        sourceValue: 'Blocked by almost all online forms',
        targetValue: 'Accepted by 100% of web forms & portals',
      },
      {
        feature: 'Privacy',
        sourceValue: 'Local file',
        targetValue: '100% browser-local execution',
      },
    ],
    relatedSlugs: ['tiff-to-jpg', 'png-to-jpg', 'gif-to-jpg', 'jpg-to-pdf'],
    compressorLinkSlug: 'compress-photo-to-20kb',
    compressorLinkAnchor: 'Compress Signature or Photo to 20 KB',
  },
  {
    slug: 'gif-to-jpg',
    sourceLabel: 'GIF',
    targetLabel: 'JPG',
    defaultOutputFormat: 'jpg',
    acceptHint: '.gif,image/gif,image/*',
    title: 'GIF to JPG Converter — Extract Static Frame to High-Color JPG',
    metaDescription:
      'Convert GIF images (static or first frame) to 24-bit JPG in your browser. Replace transparent pixels with custom background color & hit exact KB limits.',
    h1: 'Convert GIF to JPG — Static Frame & Legacy Graphic Converter',
    subtitle:
      'Turn static .GIF graphics or extract the opening frame of an animated GIF into a standard 24-bit .JPG photo right in your browser.',
    introParagraphs: [
      'Many legacy government portals, older corporate intranets, and archived web pages still distribute diagrams, badges, or scanned signatures as 8-bit 256-color .GIF files—and users also frequently need to extract a clean static thumbnail JPG from the first frame of an animated GIF for article headers or portal uploads that only accept JPEG.',
      'Our browser-local GIF to JPG converter renders your GIF (or the first frame of an animated GIF) onto a full 24-bit RGB canvas, replaces 1-bit transparent pixels with clean white (#FFFFFF) or your chosen background color, and exports a universally compatible .jpg file with optional target KB sizing.',
    ],
    steps: [
      'Select or drop one or more .GIF files into the upload zone above.',
      'Ensure JPG is selected as the output format and pick a Background Color if your GIF has transparent areas.',
      'Optionally set a Target KB size or resize dimensions.',
      'Click Convert Now and download your static .jpg image.',
    ],
    faqs: [
      {
        question: 'What happens when I convert an animated GIF to JPG?',
        answer:
          'Because JPG is a static single-image format, our converter extracts and encodes the first frame of the animated GIF as a crisp static JPG.',
      },
      {
        question: 'How are transparent GIF backgrounds handled when converting to JPG?',
        answer:
          'GIF supports 1-bit indexed transparency. Our converter composites transparent pixels onto pure white (#FFFFFF) by default, or any color you select in the Background Color picker.',
      },
      {
        question: 'Can I also convert JPG or PNG into a static GIF file?',
        answer:
          'Yes! Select GIF in the "Convert to" dropdown to use our built-in 256-color GIF89a LZW encoder.',
      },
      {
        question: 'Why would a portal reject my static GIF signature or photo?',
        answer:
          'Most biometric and exam upload portals validate the file header for JFIF/JPEG (`FF D8 FF`) and reject GIF89a headers even if the image is static.',
      },
      {
        question: 'Are my GIF files uploaded to a server during conversion?',
        answer:
          'No. Everything runs locally inside your browser tab.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Color Palette',
        sourceValue: '8-bit indexed palette (max 256 colors, .gif)',
        targetValue: '24-bit TrueColor (16.7 million colors, .jpg)',
      },
      {
        feature: 'Animation Support',
        sourceValue: 'Multi-frame animation capable',
        targetValue: 'Static single frame (extracts 1st frame cleanly)',
      },
      {
        feature: 'Transparency',
        sourceValue: '1-bit binary transparency',
        targetValue: 'Flattened onto White (#FFFFFF) or custom color',
      },
      {
        feature: 'Portal Acceptance',
        sourceValue: 'Rejected by photo/ID upload portals',
        targetValue: 'Accepted by 100% of photo/ID portals',
      },
    ],
    relatedSlugs: ['png-to-jpg', 'bmp-to-jpg', 'webp-to-jpg', 'jpg-to-png'],
    compressorLinkSlug: 'compress-photo-to-20kb',
    compressorLinkAnchor: 'Compress Photo to 20 KB',
  },
  {
    slug: 'svg-to-png',
    sourceLabel: 'SVG',
    targetLabel: 'PNG',
    defaultOutputFormat: 'png',
    acceptHint: '.svg,image/svg+xml,image/*',
    title: 'SVG to PNG Converter — Rasterize Vectors at Custom Pixel Size',
    metaDescription:
      'Convert SVG vector graphics and logos to crisp, transparent PNG images at any pixel resolution in your browser. 100% client-side with zero uploads.',
    h1: 'Convert SVG to PNG — Crisp Vector Rasterizer in Your Browser',
    subtitle:
      'Render .SVG vector logos, icons, and diagrams into razor-sharp, transparent 32-bit .PNG images at any custom pixel width or height.',
    introParagraphs: [
      'Scalable Vector Graphics (.svg) are ideal for responsive code and design systems, but social media profile uploaders, email signature builders, slide decks, marketplace listings, and print-on-demand portals almost universally block .svg uploads for security reasons—requiring a high-resolution transparent .png instead.',
      'Unlike raster-to-raster conversions, our browser-local SVG to PNG converter scales the mathematical vector paths to your requested target dimensions (or defaults to a crisp high-resolution canvas when the SVG has tiny viewBox coordinates) before rasterizing. Every curve and text path renders with anti-aliased precision and full 8-bit alpha transparency—100% locally in your browser.',
    ],
    steps: [
      'Drop one or more .SVG vector files into the converter dropzone above.',
      'Confirm PNG is selected as the output format (full alpha transparency is preserved).',
      'Optionally select "Max width (px)" or "Max height (px)" in Resize mode to render your vector at an exact pixel resolution (e.g. 1024 px or 2048 px).',
      'Click Convert Now and download your sharp transparent .png files individually or as a ZIP.',
    ],
    faqs: [
      {
        question: 'Does SVG to PNG keep the transparent background of my vector logo?',
        answer:
          'Yes! Because PNG supports full 32-bit RGBA alpha transparency, all transparent areas around your SVG paths remain completely transparent.',
      },
      {
        question: 'How do I render a tiny 24×24 px SVG icon as a crisp 1024×1024 px PNG?',
        answer:
          'Our SVG rasterizer automatically scales tiny SVG viewBoxes up to a crisp 1024 px base, or you can choose "Max width (px)" and enter any custom size (such as 512, 1024, or 2048) to rasterize the vector paths at that exact resolution.',
      },
      {
        question: 'Can I convert SVG to JPG or ICO instead of PNG?',
        answer:
          'Yes! Just switch the "Convert to" dropdown to JPG (which fills the background with white or your custom color) or ICO (which generates a multi-size 16–256 px favicon.ico directly from your SVG).',
      },
      {
        question: 'Why won’t social media or email signatures accept my .SVG logo?',
        answer:
          'SVG is an XML document that can theoretically contain embedded scripts, so nearly all user-upload platforms block .svg files and require a rasterized .png or .jpg.',
      },
      {
        question: 'Are my proprietary brand logos uploaded to any server?',
        answer:
          'Never. Vector parsing and canvas rasterization execute 100% locally in your browser.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Graphic Representation',
        sourceValue: 'XML mathematical vector paths (.svg)',
        targetValue: 'Lossless 32-bit RGBA pixel grid (.png)',
      },
      {
        feature: 'Resolution Scaling',
        sourceValue: 'Infinite vector scaling',
        targetValue: 'Rasterized at your exact chosen pixel width/height',
      },
      {
        feature: 'Upload Security Acceptance',
        sourceValue: 'Blocked by most social, email & CMS uploaders',
        targetValue: 'Accepted by 100% of platforms & apps',
      },
      {
        feature: 'Alpha Transparency',
        sourceValue: 'Transparent canvas',
        targetValue: 'Preserved 1:1 in 8-bit PNG alpha channel',
      },
    ],
    relatedSlugs: ['png-to-ico', 'png-to-webp', 'webp-to-png', 'png-to-jpg'],
    compressorLinkSlug: 'compress-photo-to-50kb',
    compressorLinkAnchor: 'Compress Image to 50 KB',
  },
  {
    slug: 'png-to-ico',
    sourceLabel: 'PNG',
    targetLabel: 'ICO',
    defaultOutputFormat: 'ico',
    acceptHint: '.png,image/png,.svg,image/*',
    title: 'PNG to ICO Converter — Multi-Size Favicon Generator (16–256px)',
    metaDescription:
      'Convert transparent PNG or SVG logos into a real multi-resolution Windows .ICO file (16x16, 32x32, 48x48, 64x64, 128x128, 256x256) in your browser.',
    h1: 'Convert PNG to ICO — Multi-Resolution Favicon & App Icon Builder',
    subtitle:
      'Generate a true binary Windows .ICO container embedding 16×16, 32×32, 48×48, 64×64, 128×128, and 256×256 transparent PNG frames locally in your browser.',
    introParagraphs: [
      'Many cheap online icon converters simply rename a .png file to .ico—producing a broken file that fails in Windows Explorer, Visual Studio, Tauri/Electron desktop builds, and legacy browser favicon parsers. A valid Microsoft ICONDIR (.ico) binary must contain a structured 6-byte directory header, 16-byte ICONDIRENTRY records for each resolution, and individually scaled image frames.',
      'CompressPhoto PNG to ICO converter builds a specification-compliant multi-resolution .ico binary right in your browser RAM. By default, it downscales your square or rectangular PNG (centering non-square logos proportionally without distortion) into all 6 standard icon sizes—16×16, 32×32, 48×48, 64×64, 128×128, and 256×256 px—while preserving full 32-bit RGBA alpha transparency.',
    ],
    steps: [
      'Drop your square (or rectangular) .PNG or .SVG logo into the converter box above.',
      'Ensure ICO is selected in the "Convert to" dropdown and toggle which icon sizes (16, 32, 48, 64, 128, 256 px) to embed.',
      'Click Convert Now to build your multi-resolution .ico container in browser memory.',
      'Download your ready-to-deploy favicon.ico or application icon file.',
    ],
    faqs: [
      {
        question: 'Is this a real multi-resolution .ICO binary or just a renamed PNG?',
        answer:
          'It is a genuine binary Windows ICONDIR container (`00 00 01 00`) with separate directory entries and embedded 32-bit RGBA frames for every selected pixel size (16×16 up to 256×256).',
      },
      {
        question: 'Does PNG to ICO preserve transparent backgrounds around my logo?',
        answer:
          'Yes! Every embedded icon frame uses 32-bit RGBA transparency so your favicon or Windows desktop shortcut looks clean on both light and dark taskbars.',
      },
      {
        question: 'What sizes should I include in a website favicon.ico versus a Windows desktop app icon?',
        answer:
          'For a compact website `favicon.ico`, selecting 16×16, 32×32, and 48×48 keeps the file tiny (~5–15 KB). For Windows `.exe`, Electron, or Tauri desktop apps, keep all sizes enabled up to 256×256.',
      },
      {
        question: 'What happens if my input PNG is rectangular instead of a 1:1 square?',
        answer:
          'Our encoder scales your logo proportionally and centers it inside each square icon frame with transparent padding so it never looks stretched or squashed.',
      },
      {
        question: 'Can I also convert an existing .ICO file back to PNG?',
        answer:
          'Yes! Drop any .ico file into our converter and select PNG output; our binary ICO parser automatically extracts the highest-resolution frame.',
      },
    ],
    comparisonRows: [
      {
        feature: 'Container Format',
        sourceValue: 'Single-resolution PNG image (.png)',
        targetValue: 'Multi-resolution Windows ICONDIR binary (.ico)',
      },
      {
        feature: 'Embedded Resolutions',
        sourceValue: '1 fixed pixel size',
        targetValue: 'Up to 6 sizes (16, 32, 48, 64, 128, 256 px) in one file',
      },
      {
        feature: 'Alpha Transparency',
        sourceValue: '32-bit RGBA',
        targetValue: '32-bit RGBA preserved across all icon frames',
      },
      {
        feature: 'Target Platforms',
        sourceValue: 'General web & design',
        targetValue: 'Browser `/favicon.ico`, Windows `.exe`, Electron & Tauri apps',
      },
    ],
    relatedSlugs: ['jpg-to-ico', 'svg-to-png', 'png-to-webp', 'png-to-jpg'],
    compressorLinkSlug: 'compress-photo-to-20kb',
    compressorLinkAnchor: 'Compress Image to 20 KB',
  },
  {
    slug: 'jpg-to-ico',
    sourceLabel: 'JPG',
    targetLabel: 'ICO',
    defaultOutputFormat: 'ico',
    acceptHint: '.jpg,.jpeg,.jpe,image/jpeg,image/*',
    title: 'JPG to ICO Converter — Create Multi-Size Favicons from Photos',
    metaDescription:
      'Convert JPG and JPEG images into genuine multi-size Windows .ICO files (16x16 to 256x256 px) directly in your browser. 100% private with zero uploads.',
    h1: 'Convert JPG to ICO — Favicon & Windows Icon Generator',
    subtitle:
      'Turn any .JPG photo, avatar, or brand emblem into a multi-resolution .ICO file (16×16 through 256×256 px) locally in your browser.',
    introParagraphs: [
      'Whether you are creating a personal portfolio `favicon.ico` from a headshot, turning a JPG brand mark into a Windows desktop folder icon, or packaging an internal tool icon, simply changing the file extension from `.jpg` to `.ico` will not work. Operating systems and browsers expect a binary ICONDIR header containing square icon frames at standard power-of-two dimensions.',
      'CompressPhoto JPG to ICO converter takes any JPG or JPEG image, scales and centers it cleanly into crisp 16×16, 32×32, 48×48, 64×64, 128×128, and 256×256 pixel frames, and packages them into a single valid `.ico` file right inside your browser with zero server uploads.',
    ],
    steps: [
      'Select or drag your .JPG or .JPEG image into the converter dropzone above.',
      'Confirm ICO is selected in the "Convert to" menu and pick which icon dimensions (16 px to 256 px) you want bundled.',
      'Click Convert Now to generate the multi-size Windows .ico binary.',
      'Download your `.ico` file and place it in your website root or desktop application project.',
    ],
    faqs: [
      {
        question: 'Does JPG to ICO work with non-square photos?',
        answer:
          'Yes. If your JPG is landscape or portrait, our converter fits the image proportionally inside each square icon frame so nothing is stretched.',
      },
      {
        question: 'Which icon sizes are included in the generated .ICO file?',
        answer:
          'By default, all 6 standard sizes (16×16, 32×32, 48×48, 64×64, 128×128, and 256×256 px) are embedded, and you can toggle individual sizes on or off before converting.',
      },
      {
        question: 'How can I make my favicon.ico file smaller in kilobytes?',
        answer:
          'For web favicons, uncheck 128×128 and 256×256 (leaving 16×16, 32×32, and 48×48 checked) to produce a tiny ~8 KB `.ico` file.',
      },
      {
        question: 'Are my photos uploaded to a server when generating an ICO file?',
        answer:
          'No. The entire ICONDIR binary assembly runs 100% locally in your browser RAM.',
      },
      {
        question: 'Should I use PNG to ICO if my logo has a transparent background?',
        answer:
          'Yes—since JPG files do not contain transparency, use a transparent PNG or SVG on our PNG to ICO page if you want a non-rectangular cutout icon.',
      },
    ],
    comparisonRows: [
      {
        feature: 'File Structure',
        sourceValue: 'Single JFIF photo stream (.jpg)',
        targetValue: 'Multi-frame ICONDIR binary container (.ico)',
      },
      {
        feature: 'Included Dimensions',
        sourceValue: 'Arbitrary photo width × height',
        targetValue: 'Standard square icon frames: 16, 32, 48, 64, 128, 256 px',
      },
      {
        feature: 'Aspect Ratio Handling',
        sourceValue: '4:3, 16:9, or 1:1',
        targetValue: 'Proportionally centered inside 1:1 square icon canvas',
      },
      {
        feature: 'Execution Privacy',
        sourceValue: 'Local file',
        targetValue: '100% client-side in browser RAM',
      },
    ],
    relatedSlugs: ['png-to-ico', 'svg-to-png', 'jpg-to-png', 'jpg-to-webp'],
    compressorLinkSlug: 'compress-photo-to-20kb',
    compressorLinkAnchor: 'Compress JPG Photo to 20 KB',
  },
  {
    slug: 'jpeg-to-png',
    sourceLabel: 'JPEG',
    targetLabel: 'PNG',
    defaultOutputFormat: 'png',
    acceptHint: '.jpeg,.jpg,.jpe,image/jpeg,image/*',
    title: 'JPEG to PNG Converter — Free Lossless Conversion in Browser',
    metaDescription:
      'Convert .JPEG photos to lossless .PNG format privately in your browser. Strip EXIF metadata, resize dimensions, and batch convert with zero server uploads.',
    h1: 'Convert JPEG to PNG — Lossless Format Conversion in Browser',
    subtitle:
      'Convert `.jpeg` camera photos and scans into uncompressed, lossless `.png` images directly inside your browser with full batch support.',
    introParagraphs: [
      'Digital cameras, WhatsApp Web downloads, and macOS/iOS scanners frequently save images with the four-letter `.jpeg` extension. When uploading to design platforms, software development pipelines, or institutional portals that specifically validate for a `.png` file, or when preparing an image for multi-stage graphic editing without further JPEG re-compression artifacts, converting JPEG to PNG is the cleanest solution.',
      'CompressPhoto JPEG to PNG converter decodes your `.jpeg` files locally in your browser, applies any EXIF rotation automatically so portraits stay upright, strips embedded GPS and camera serial metadata, and outputs a lossless 32-bit PNG ready for editing or upload.',
    ],
    steps: [
      'Drop one or multiple `.jpeg` (or `.jpg`) files into the converter box above.',
      'Verify PNG is selected in the "Convert to" dropdown menu.',
      'Optionally choose a Resize preset (Max Width, Max Height, Percentage, or Passport dimensions).',
      'Click Convert Now and download your lossless `.png` files individually or as a single ZIP archive.',
    ],
    faqs: [
      {
        question: 'What is the difference between a .JPEG file and a .JPG file?',
        answer:
          'Both use the exact same ISO/IEC 10918 Joint Photographic Experts Group format; `.jpg` originated from old MS-DOS 3-character extension limits while Unix/macOS and modern web apps often use `.jpeg`. Our converter handles both identically.',
      },
      {
        question: 'Why convert a JPEG photo to PNG before editing?',
        answer:
          'PNG is a lossless format. Once your JPEG is converted to PNG, you can save and re-save your edits repeatedly without introducing additional JPEG blockiness.',
      },
      {
        question: 'Does converting JPEG to PNG remove GPS location tags?',
        answer:
          'Yes. With "Strip EXIF, GPS & camera metadata" enabled by default, all private EXIF metadata is removed during conversion.',
      },
      {
        question: 'Can I batch-convert multiple JPEG files to PNG at once?',
        answer:
          'Yes! Select all your `.jpeg` files, click Convert Now, and use "Download all as ZIP" to save them in one click.',
      },
      {
        question: 'Are my JPEG photos uploaded to any cloud server?',
        answer:
          'Never. Every conversion executes 100% locally inside your browser tab.',
      },
    ],
    comparisonRows: [
      {
        feature: 'File Extension & Codec',
        sourceValue: 'Lossy DCT `.jpeg` / `.jpg`',
        targetValue: 'Lossless DEFLATE `.png`',
      },
      {
        feature: 'Editing Durability',
        sourceValue: 'Degrades on repeated saves',
        targetValue: '100% lossless across unlimited saves',
      },
      {
        feature: 'Metadata Privacy',
        sourceValue: 'Contains camera EXIF & GPS tags',
        targetValue: 'Clean pixel buffer with metadata stripped',
      },
      {
        feature: 'Conversion Speed',
        sourceValue: 'Local file',
        targetValue: 'Instant client-side Canvas encoding',
      },
    ],
    relatedSlugs: ['jpg-to-png', 'png-to-jpg', 'heic-to-png', 'jpg-to-webp'],
    compressorLinkSlug: 'compress-photo-to-50kb',
    compressorLinkAnchor: 'Compress Photo to 50 KB',
  },
];

export const CONVERTER_ROUTE_MAP = new Map<string, ConverterRouteConfig>(
  CONVERTER_ROUTES.map((r) => [r.slug, r])
);

export function getConverterRouteBySlug(slug: string): ConverterRouteConfig | undefined {
  return CONVERTER_ROUTE_MAP.get(slug.toLowerCase().trim());
}
