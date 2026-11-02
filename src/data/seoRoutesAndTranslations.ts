import { BiometricPreset, LocaleCode, SeoRoute } from '../types/atelier';

export const BIOMETRIC_PRESETS: BiometricPreset[] = [
  {
    id: 'schengen-35x45',
    name: '35×45 mm Schengen / CNIE / Passeport',
    subtitle: 'France ANTS · Morocco CNIE · EU Biometric Standard',
    physicalSize: '35 × 45 mm',
    widthPx: 413,
    heightPx: 531,
    dpi: 300,
    recommendedKb: 50,
    defaultBackdrop: 'pure-white',
    isoSpec: 'ISO/IEC 19794-5 · 300 DPI'
  },
  {
    id: 'us-visa-2x2',
    name: '2×2 inch US Visa & DV Lottery',
    subtitle: 'Department of State DS-160 & Green Card Lottery',
    physicalSize: '51 × 51 mm (2×2 in)',
    widthPx: 600,
    heightPx: 600,
    dpi: 300,
    recommendedKb: 100,
    defaultBackdrop: 'pure-white',
    isoSpec: 'US DOS 600×600 px · ≤ 240 KB'
  },
  {
    id: 'wet-ink-sig',
    name: 'Wet-Ink Signature Scan (< 20 KB)',
    subtitle: 'SSC / UPSC / Civil Service & Banking Portals',
    physicalSize: '47 × 15 mm (140×60 ratio)',
    widthPx: 560,
    heightPx: 180,
    dpi: 300,
    recommendedKb: 20,
    defaultBackdrop: 'pure-white',
    isSignature: true,
    isoSpec: 'Shadow-Cleansed Wet Ink · < 20.0 KB'
  },
  {
    id: 'amazon-1000',
    name: 'Amazon 1000×1000 White Studio',
    subtitle: 'Marketplace Main Listing · Pure RGB(255,255,255)',
    physicalSize: '84.7 × 84.7 mm',
    widthPx: 1000,
    heightPx: 1000,
    dpi: 300,
    recommendedKb: 200,
    defaultBackdrop: 'pure-white',
    isoSpec: 'sRGB 1000×1000 px · Zoom Ready'
  },
  {
    id: 'custom',
    name: 'Custom Millimeter / Pixel Calibration',
    subtitle: 'Manual Width, Height & Strict Byte Target',
    physicalSize: 'User Defined',
    widthPx: 800,
    heightPx: 600,
    dpi: 300,
    recommendedKb: 30,
    defaultBackdrop: 'original',
    isoSpec: 'Custom Atelier Spec'
  }
];

export const STANDARD_KB_CEILINGS = [10, 15, 20, 30, 50, 100, 200, 500];

export interface LocaleDictionary {
  brandTitle: string;
  navExactKb: string;
  navQrStudio: string;
  navBlog: string;
  // Photo KB Compressor Page
  kbHeroTitle: string;
  kbHeroSub: string;
  dropTitle: string;
  dropClick: string;
  dropSub: string;
  samplePrompt: string;
  samplePassport: string;
  sampleSignature: string;
  sampleProduct: string;
  step1DocType: string;
  presetPassportTitle: string;
  presetPassportSub: string;
  presetUsVisaTitle: string;
  presetUsVisaSub: string;
  presetSigTitle: string;
  presetSigSub: string;
  presetCustomTitle: string;
  presetCustomSub: string;
  widthLabel: string;
  heightLabel: string;
  step2MaxKb: string;
  optionalCleanup: string;
  removeShadowLabel: string;
  shadowStrengthLabel: string;
  inkDarknessLabel: string;
  backdropColorLabel: string;
  backdropOriginal: string;
  backdropWhite: string;
  backdropBlue: string;
  outputFormatLabel: string;
  step3PreviewDownload: string;
  readyUnderLimit: string;
  beforeLabel: string;
  afterLabel: string;
  downloadCompressedBtn: string;
  downloadPdfBtn: string;
  printSheetBtn: string;
  needQrTitle: string;
  needQrSub: string;
  openQrBtn: string;
  // QR Generator Page
  qrHeroTitle: string;
  qrHeroSub: string;
  qrTabUrl: string;
  qrTabWifi: string;
  qrTabVcard: string;
  qrTabMenu: string;
  qrTabWhatsapp: string;
  qrTabBarcode: string;
  qrStep1Details: string;
  qrStep2Customize: string;
  qrStep3Preview: string;
  uploadCenterLogo: string;
  removeLogo: string;
  downloadHighResPng: string;
  downloadVectorSvg: string;
  compressQrUnder20Kb: string;
  // Footer & Legal Nav
  footerDesc: string;
  footerToolsTitle: string;
  footerLegalTitle: string;
  navAbout: string;
  navLegal: string;
  navPrivacy: string;
  navContact: string;
  backToCompressor: string;
  localGuaranteeFooter: string;
}

export const TRANSLATIONS: Record<LocaleCode, LocaleDictionary> = {
  en: {
    brandTitle: 'ExactKB & QR',
    navExactKb: 'Photo KB Compressor',
    navQrStudio: 'QR Code Generator',
    navBlog: 'Blog & Guides',
    kbHeroTitle: 'Compress Photo or Signature to Exact KB',
    kbHeroSub: '100% private in your browser. Drop your image, pick your target KB size, and download.',
    dropTitle: 'Drop your photo or signature here, or',
    dropClick: 'click to upload',
    dropSub: 'Supports JPG, PNG, WebP · Active file:',
    samplePrompt: 'Or test with a sample:',
    samplePassport: 'Passport Photo',
    sampleSignature: 'Handwritten Signature',
    sampleProduct: 'Product Photo',
    step1DocType: '1. Choose Document Type',
    presetPassportTitle: 'Passport (35×45 mm)',
    presetPassportSub: 'EU · France · Morocco CNIE',
    presetUsVisaTitle: 'US Visa (2×2 inch)',
    presetUsVisaSub: '600×600 px Square',
    presetSigTitle: 'Signature (< 20 KB)',
    presetSigSub: 'Removes Paper Shadow',
    presetCustomTitle: 'Custom Dimensions',
    presetCustomSub: 'Any Width & Height',
    widthLabel: 'Width (px)',
    heightLabel: 'Height (px)',
    step2MaxKb: '2. Pick Max File Size (KB)',
    optionalCleanup: 'Optional: Background & Signature Shadow Cleanup',
    removeShadowLabel: 'Remove Signature Paper Shadow',
    shadowStrengthLabel: 'Shadow Removal Strength',
    inkDarknessLabel: 'Pen Ink Darkness',
    backdropColorLabel: 'Photo Backdrop Color',
    backdropOriginal: 'Original',
    backdropWhite: 'Pure White',
    backdropBlue: 'Passport Blue',
    outputFormatLabel: 'Output Format',
    step3PreviewDownload: '3. Preview & Download',
    readyUnderLimit: 'Ready',
    beforeLabel: 'Before',
    afterLabel: 'After',
    downloadCompressedBtn: 'Download Compressed Image',
    downloadPdfBtn: 'Download as PDF',
    printSheetBtn: 'Print 8-Photo Sheet (4×6")',
    needQrTitle: 'Need a Free QR Code or Barcode?',
    needQrSub: 'Create permanent Wi-Fi, Business Card, Menu, or Website QR codes.',
    openQrBtn: 'Open QR Generator →',
    qrHeroTitle: 'Free Vector QR Code & Barcode Generator',
    qrHeroSub: 'Direct encoding with zero middleman links—your QR code never expires.',
    qrTabUrl: 'Website URL',
    qrTabWifi: 'Wi-Fi',
    qrTabVcard: 'Business Card',
    qrTabMenu: 'Café Menu',
    qrTabWhatsapp: 'WhatsApp',
    qrTabBarcode: 'Barcode',
    qrStep1Details: '1. Enter QR Code Details',
    qrStep2Customize: '2. Customize QR Shape & Logo',
    qrStep3Preview: '3. Live QR Code Preview',
    uploadCenterLogo: 'Upload Center Logo',
    removeLogo: 'Remove Logo',
    downloadHighResPng: 'Download High-Res PNG (1200 px)',
    downloadVectorSvg: 'Download Vector SVG',
    compressQrUnder20Kb: 'Compress QR < 20 KB',
    footerDesc: '100% client-side photo byte-ceiling compressor (Passport 35×45mm, US Visa 2×2", Wet-Ink Signatures < 20KB) and non-expiring vector QR & barcode generator.',
    footerToolsTitle: 'Studio Tools',
    footerLegalTitle: 'Information & Legal',
    navAbout: 'About Us',
    navLegal: 'Legal Notice',
    navPrivacy: 'Privacy Policy',
    navContact: 'Contact Us',
    backToCompressor: 'Back to Photo KB Compressor',
    localGuaranteeFooter: '100% Browser-Local Processing · Zero Cloud Uploads'
  },
  fr: {
    brandTitle: 'ExactKB & QR',
    navExactKb: 'Compresseur Photo Ko',
    navQrStudio: 'Générateur QR Code',
    navBlog: 'Blog & Guides',
    kbHeroTitle: 'Compresser Photo ou Signature au Ko Exact',
    kbHeroSub: '100% privé dans votre navigateur. Déposez votre image, choisissez la taille max en Ko et téléchargez.',
    dropTitle: 'Glissez votre photo ou signature ici, ou',
    dropClick: 'cliquez pour importer',
    dropSub: 'Formats JPG, PNG, WebP · Fichier actif :',
    samplePrompt: 'Ou tester avec un exemple :',
    samplePassport: 'Photo Passeport',
    sampleSignature: 'Signature Manuscrite',
    sampleProduct: 'Photo Produit',
    step1DocType: '1. Choisir le Type de Document',
    presetPassportTitle: 'Passeport (35×45 mm)',
    presetPassportSub: 'UE · France ANTS · Maroc CNIE',
    presetUsVisaTitle: 'Visa USA (2×2 pouces)',
    presetUsVisaSub: 'Carré 600×600 px',
    presetSigTitle: 'Signature (< 20 Ko)',
    presetSigSub: 'Efface l’ombre du papier',
    presetCustomTitle: 'Dimensions sur Mesure',
    presetCustomSub: 'Largeur & Hauteur libres',
    widthLabel: 'Largeur (px)',
    heightLabel: 'Hauteur (px)',
    step2MaxKb: '2. Taille Maximale du Fichier (Ko)',
    optionalCleanup: 'Optionnel : Fond Blanc & Nettoyage Signature',
    removeShadowLabel: 'Effacer l’ombre papier (Signature)',
    shadowStrengthLabel: 'Force de nettoyage',
    inkDarknessLabel: 'Intensité de l’encre',
    backdropColorLabel: 'Couleur de Fond Photo',
    backdropOriginal: 'Original',
    backdropWhite: 'Blanc Pur',
    backdropBlue: 'Bleu Identité',
    outputFormatLabel: 'Format de Sortie',
    step3PreviewDownload: '3. Aperçu & Téléchargement',
    readyUnderLimit: 'Prêt',
    beforeLabel: 'Avant',
    afterLabel: 'Après',
    downloadCompressedBtn: 'Télécharger l’Image Compressée',
    downloadPdfBtn: 'Télécharger en PDF',
    printSheetBtn: 'Planche 8 Photos (10×15 cm)',
    needQrTitle: 'Besoin d’un QR Code ou Code-Barres Gratuit ?',
    needQrSub: 'Créez des QR codes Wi-Fi, Carte de visite, Menu ou Site Web sans expiration.',
    openQrBtn: 'Ouvrir Générateur QR →',
    qrHeroTitle: 'Générateur QR Code & Code-Barres Vectoriel Gratuit',
    qrHeroSub: 'Encodage direct sans lien intermédiaire — votre QR code n’expire jamais.',
    qrTabUrl: 'Site Web (URL)',
    qrTabWifi: 'Wi-Fi',
    qrTabVcard: 'Carte de Visite',
    qrTabMenu: 'Menu Café',
    qrTabWhatsapp: 'WhatsApp',
    qrTabBarcode: 'Code-Barres',
    qrStep1Details: '1. Informations du QR Code',
    qrStep2Customize: '2. Forme & Logo Central',
    qrStep3Preview: '3. Aperçu en Direct',
    uploadCenterLogo: 'Importer un Logo Central',
    removeLogo: 'Retirer le Logo',
    downloadHighResPng: 'Télécharger PNG Haute Déf. (1200 px)',
    downloadVectorSvg: 'Télécharger SVG Vectoriel',
    compressQrUnder20Kb: 'Compresser QR < 20 Ko',
    footerDesc: 'Compresseur photo au kilo-octet exact 100% local (Passeport 35×45 mm, Visa USA 2×2", Signatures < 20 Ko) et générateur de QR codes vectoriels permanents.',
    footerToolsTitle: 'Outils du Studio',
    footerLegalTitle: 'Informations & Mentions',
    navAbout: 'À Propos',
    navLegal: 'Mentions Légales',
    navPrivacy: 'Politique de Confidentialité',
    navContact: 'Contact',
    backToCompressor: 'Retour au Compresseur Photo',
    localGuaranteeFooter: 'Traitement 100% Navigateur · Aucun Envoi Cloud'
  },
  es: {
    brandTitle: 'ExactKB & QR',
    navExactKb: 'Compresor Foto KB',
    navQrStudio: 'Generador Código QR',
    navBlog: 'Blog y Guías',
    kbHeroTitle: 'Comprimir Foto o Firma al KB Exacto',
    kbHeroSub: '100% privado en tu navegador. Suelta tu imagen, elige el tamaño máximo en KB y descarga.',
    dropTitle: 'Arrastra tu foto o firma aquí, o',
    dropClick: 'haz clic para subir',
    dropSub: 'Soporta JPG, PNG, WebP · Archivo activo:',
    samplePrompt: 'O prueba con un ejemplo:',
    samplePassport: 'Foto Pasaporte',
    sampleSignature: 'Firma Manuscrita',
    sampleProduct: 'Foto Producto',
    step1DocType: '1. Elegir Tipo de Documento',
    presetPassportTitle: 'Pasaporte (35×45 mm)',
    presetPassportSub: 'UE · España · Marruecos CNIE',
    presetUsVisaTitle: 'Visa EE.UU. (2×2 pulg.)',
    presetUsVisaSub: 'Cuadrado 600×600 px',
    presetSigTitle: 'Firma (< 20 KB)',
    presetSigSub: 'Elimina sombra del papel',
    presetCustomTitle: 'Dimensiones Personalizadas',
    presetCustomSub: 'Ancho y Alto libres',
    widthLabel: 'Ancho (px)',
    heightLabel: 'Alto (px)',
    step2MaxKb: '2. Tamaño Máximo del Archivo (KB)',
    optionalCleanup: 'Opcional: Fondo Blanco y Limpieza de Firma',
    removeShadowLabel: 'Eliminar sombra de papel en firma',
    shadowStrengthLabel: 'Fuerza de limpieza',
    inkDarknessLabel: 'Intensidad de la tinta',
    backdropColorLabel: 'Color de Fondo de la Foto',
    backdropOriginal: 'Original',
    backdropWhite: 'Blanco Puro',
    backdropBlue: 'Azul Pasaporte',
    outputFormatLabel: 'Formato de Salida',
    step3PreviewDownload: '3. Vista Previa y Descarga',
    readyUnderLimit: 'Listo',
    beforeLabel: 'Antes',
    afterLabel: 'Después',
    downloadCompressedBtn: 'Descargar Imagen Comprimida',
    downloadPdfBtn: 'Descargar como PDF',
    printSheetBtn: 'Hoja de 8 Fotos (10×15 cm)',
    needQrTitle: '¿Necesitas un Código QR o Código de Barras Gratis?',
    needQrSub: 'Crea códigos QR permanentes para Wi-Fi, Tarjeta de Visita, Menú o Web.',
    openQrBtn: 'Abrir Generador QR →',
    qrHeroTitle: 'Generador Gratis de Códigos QR y Barras en Vector',
    qrHeroSub: 'Codificación directa sin intermediarios: tu código QR nunca caduca.',
    qrTabUrl: 'Sitio Web',
    qrTabWifi: 'Wi-Fi',
    qrTabVcard: 'Tarjeta Visita',
    qrTabMenu: 'Menú Café',
    qrTabWhatsapp: 'WhatsApp',
    qrTabBarcode: 'Cód. Barras',
    qrStep1Details: '1. Datos del Código QR',
    qrStep2Customize: '2. Forma y Logo Central',
    qrStep3Preview: '3. Vista Previa en Vivo',
    uploadCenterLogo: 'Subir Logo Central',
    removeLogo: 'Quitar Logo',
    downloadHighResPng: 'Descargar PNG Alta Res. (1200 px)',
    downloadVectorSvg: 'Descargar Vector SVG',
    compressQrUnder20Kb: 'Comprimir QR < 20 KB',
    footerDesc: 'Compresor de fotos al kilobyte exacto 100% en tu navegador (Pasaporte 35×45mm, Visa EE.UU. 2×2", Firmas < 20KB) y generador de códigos QR vectoriales sin caducidad.',
    footerToolsTitle: 'Herramientas',
    footerLegalTitle: 'Información y Legal',
    navAbout: 'Sobre Nosotros',
    navLegal: 'Aviso Legal',
    navPrivacy: 'Política de Privacidad',
    navContact: 'Contacto',
    backToCompressor: 'Volver al Compresor de Fotos',
    localGuaranteeFooter: 'Procesamiento 100% Local en Navegador · Cero Subidas a la Nube'
  },
  ar: {
    brandTitle: 'ExactKB & QR',
    navExactKb: 'ضاغط الصور بالكيلوبايت',
    navQrStudio: 'مولّد رمز QR',
    navBlog: 'المدونة والأدلة',
    kbHeroTitle: 'ضغط الصورة أو التوقيع إلى حجم كيلوبايت دقيق',
    kbHeroSub: 'خصوصية 100% داخل متصفحك. اسحب صورتك، اختر الحد الأقصى بالكيلوبايت، وقم بالتنزيل فوراً.',
    dropTitle: 'أفلت صورتك أو توقيعك هنا، أو',
    dropClick: 'اضغط لاختيار ملف',
    dropSub: 'يدعم JPG و PNG و WebP · الملف الحالي:',
    samplePrompt: 'أو جرّب نموذجاً جاهزاً:',
    samplePassport: 'صورة جواز سفر',
    sampleSignature: 'توقيع خطي',
    sampleProduct: 'صورة منتج',
    step1DocType: '1. اختر نوع الوثيقة',
    presetPassportTitle: 'جواز سفر / بطاقة (35×45 مم)',
    presetPassportSub: 'أوروبا · فرنسا · المغرب CNIE',
    presetUsVisaTitle: 'تأشيرة أمريكا (2×2 بوصة)',
    presetUsVisaSub: 'مربع 600×600 بكسل',
    presetSigTitle: 'توقيع خطي (< 20 كيلوبايت)',
    presetSigSub: 'إزالة ظل الورق تلقائياً',
    presetCustomTitle: 'أبعاد مخصصة',
    presetCustomSub: 'عرض وارتفاع حر',
    widthLabel: 'العرض (بكسل)',
    heightLabel: 'الارتفاع (بكسل)',
    step2MaxKb: '2. اختر الحجم الأقصى للملف (KB)',
    optionalCleanup: 'اختياري: تبييض الخلفية وتنقية التوقيع',
    removeShadowLabel: 'إزالة ظل الكاميرا عن التوقيع',
    shadowStrengthLabel: 'قوة إزالة الظل',
    inkDarknessLabel: 'درجة وضوح الحبر',
    backdropColorLabel: 'لون خلفية الصورة',
    backdropOriginal: 'الأصلي',
    backdropWhite: 'أبيض نقي',
    backdropBlue: 'أزرق رسمي',
    outputFormatLabel: 'صيغة الملف',
    step3PreviewDownload: '3. المعاينة والتنزيل',
    readyUnderLimit: 'جاهز',
    beforeLabel: 'قبل',
    afterLabel: 'بعد',
    downloadCompressedBtn: 'تنزيل الصورة المضغوطة',
    downloadPdfBtn: 'تنزيل كملف PDF',
    printSheetBtn: 'ورقة طباعة 8 صور (10×15 سم)',
    needQrTitle: 'هل تحتاج إلى رمز QR أو باركود مجاني؟',
    needQrSub: 'أنشئ رموز QR دائمة لشبكة Wi-Fi أو بطاقة الأعمال أو قائمة المطعم أو الموقع.',
    openQrBtn: 'فتح مولّد QR ←',
    qrHeroTitle: 'مولّد رموز QR والباركود المتجهة مجاناً',
    qrHeroSub: 'تشفير مباشر بدون روابط وسيطة — رمز QR الخاص بك لا تنتهي صلاحيته أبداً.',
    qrTabUrl: 'رابط موقع',
    qrTabWifi: 'شبكة Wi-Fi',
    qrTabVcard: 'بطاقة أعمال',
    qrTabMenu: 'قائمة مقهى',
    qrTabWhatsapp: 'واتساب',
    qrTabBarcode: 'باركود',
    qrStep1Details: '1. أدخل بيانات رمز QR',
    qrStep2Customize: '2. تخصيص الشكل والشعار الوسطي',
    qrStep3Preview: '3. معاينة حية لرمز QR',
    uploadCenterLogo: 'رفع شعار في المنتصف',
    removeLogo: 'إزالة الشعار',
    downloadHighResPng: 'تنزيل صورة عالية الدقة PNG (1200px)',
    downloadVectorSvg: 'تنزيل ملف متجه SVG',
    compressQrUnder20Kb: 'ضغط رمز QR أقل من 20KB',
    footerDesc: 'أداة محلية 100% لضغط الصور والتوقيعات تحت سقف كيلوبايت دقيق (جواز سفر 35×45 مم، تأشيرة 2×2 بوصة، توقيع < 20KB) وتوليد رموز QR دائمة.',
    footerToolsTitle: 'أدوات المنصة',
    footerLegalTitle: 'معلومات وقوانين',
    navAbout: 'من نحن',
    navLegal: 'إشعار قانوني',
    navPrivacy: 'سياسة الخصوصية',
    navContact: 'اتصل بنا',
    backToCompressor: 'العودة إلى ضاغط الصور',
    localGuaranteeFooter: 'معالجة محلية 100% داخل المتصفح · لا يتم رفع أي ملفات'
  }
};

export const PROGRAMMATIC_SEO_ROUTES: SeoRoute[] = [
  {
    id: 'en-sig-20kb',
    slug: '/en/compress-signature-to-20kb-exact',
    locale: 'en',
    languageLabel: 'English',
    keyword: 'compress signature to 20kb exact for exam portal',
    title: 'Compress Wet-Ink Signature to Under 20KB Exact — 7-Pass Studio Lab',
    metaDescription: 'Remove phone camera paper shadows and lock your handwritten signature scan strictly under 20KB (140×60 / 560×180 px) in 7 binary-search passes.',
    targetTool: 'exactkb',
    presetId: 'wet-ink-sig',
    targetKb: 20,
    monthlyVolume: 48500,
    cpcUsd: 1.45,
    faqQuestion: 'How does ExactKB guarantee my signature scan stays strictly under 20 KB?',
    faqAnswer: 'Our 7-pass binary-search engine tests JPEG/WebP quantization midpoints in real time and strips uneven phone-camera paper shadows so background pixels compress cleanly below 20,480 bytes.'
  },
  {
    id: 'en-us-visa-2x2',
    slug: '/en/us-visa-2x2-photo-100kb-calibrator',
    locale: 'en',
    languageLabel: 'English',
    keyword: '2x2 inch us visa photo compressor under 100kb',
    title: 'US Visa & DV Lottery 2×2 Inch (600×600 px) Photo Calibrator Under 100KB',
    metaDescription: 'Calibrate 2×2 inch (600×600 px) US Visa DS-160 and DV Lottery portraits with pure white backdrop normalization and printable 4×6 pharmacy sheets.',
    targetTool: 'exactkb',
    presetId: 'us-visa-2x2',
    targetKb: 100,
    monthlyVolume: 39200,
    cpcUsd: 1.85,
    faqQuestion: 'What are the exact pixel and byte requirements for US Visa DS-160 photos?',
    faqAnswer: 'The US Department of State requires a square 600×600 pixel image (2×2 inches at 300 DPI) in sRGB JPEG format under 240 KB—our preset locks it cleanly under 100 KB with zero visible artifacting.'
  },
  {
    id: 'en-compress-15kb',
    slug: '/en/compress-jpeg-to-15kb-without-blur',
    locale: 'en',
    languageLabel: 'English',
    keyword: 'compress photo to 15kb exact online client side',
    title: 'Compress Photo to 15KB Exact — Deterministic 7-Pass Binary Search',
    metaDescription: 'Lock any ID portrait or document scan under 15.0 KB with 100% browser-local privacy and optical split-loupe sharpness inspection.',
    targetTool: 'exactkb',
    presetId: 'schengen-35x45',
    targetKb: 15,
    monthlyVolume: 31400,
    cpcUsd: 1.30,
    faqQuestion: 'Can I export an Exact-KB PDF under 15 KB or 20 KB as well?',
    faqAnswer: 'Yes. The Exact-KB PDF compiler wraps the binary-searched JPEG stream into a minimal ISO-32000 PDF container calibrated to your target kilobyte ceiling.'
  },
  {
    id: 'en-wifi-qr-tent',
    slug: '/en/forever-free-wifi-qr-table-tent-print',
    locale: 'en',
    languageLabel: 'English',
    keyword: 'non expiring vector wifi qr code cafe table tent',
    title: 'Forever-Free Wi-Fi Vector QR Code & Café Table Tent Printshop',
    metaDescription: 'Generate permanent SVG vector Wi-Fi auto-connect QR codes with custom finder patterns and folded café table tent print proofs. Zero redirect servers.',
    targetTool: 'qr',
    qrPayloadType: 'wifi',
    monthlyVolume: 27800,
    cpcUsd: 2.10,
    faqQuestion: 'Why do ExactKB Atelier QR codes never expire?',
    faqAnswer: 'Unlike subscription QR generators that encode a middleman tracking link, we encode your Wi-Fi credentials, vCard 3.0, or URL directly into the ISO/IEC 18004 dot matrix.'
  },
  {
    id: 'fr-cnie-schengen',
    slug: '/fr/photo-identite-35x45mm-cnie-maroc-ants-50ko',
    locale: 'fr',
    languageLabel: 'Français',
    keyword: 'photo identité 35x45mm cnie maroc passeport france 50 ko',
    title: 'Calibrage Photo Identité 35×45 mm (Passeport ANTS & CNIE Maroc) < 50 Ko',
    metaDescription: 'Préparez votre photo biométrique 35×45 mm (413×531 px à 300 DPI) sous 50 Ko et imprimez une planche pharmacie 10×15 cm de 8 photos avec repères de coupe.',
    targetTool: 'exactkb',
    presetId: 'schengen-35x45',
    targetKb: 50,
    monthlyVolume: 44100,
    cpcUsd: 1.65,
    faqQuestion: 'Comment imprimer 8 photos d’identité 35×45 mm sur une feuille 10×15 cm ?',
    faqAnswer: 'Cliquez sur « Planche Pharmacie 10×15 cm (8 Photos) » pour générer une planche 300 DPI avec traits de coupe millimétrés ┌ ┐ └ ┘ et tampon d’atelier personnalisable.'
  },
  {
    id: 'fr-signature-20ko',
    slug: '/fr/compresser-signature-manuscrite-20ko-concours',
    locale: 'fr',
    languageLabel: 'Français',
    keyword: 'compresser signature manuscrite moins de 20 ko fond blanc',
    title: 'Nettoyer & Compresser une Signature Manuscrite sous 20 Ko Exact',
    metaDescription: 'Supprimez l’ombre du papier prise au téléphone et verrouillez votre signature manuscrite sous 20 Ko pour les portails administratifs et bancaires.',
    targetTool: 'exactkb',
    presetId: 'wet-ink-sig',
    targetKb: 20,
    monthlyVolume: 22900,
    cpcUsd: 1.50,
    faqQuestion: 'Comment blanchir le papier d’une signature photographiée au smartphone ?',
    faqAnswer: 'Activez le Purificateur d’Ombre pour Signature : notre seuillage adaptatif isole l’encre du stylo et transforme le papier grisé en blanc pur #FFFFFF.'
  },
  {
    id: 'fr-qr-menu-bistro',
    slug: '/fr/qr-code-menu-restaurant-vectoriel-sans-abonnement',
    locale: 'fr',
    languageLabel: 'Français',
    keyword: 'qr code menu restaurant chevalet table vectoriel gratuit à vie',
    title: 'Imprimerie QR Code Menu Bistro & Carte de Visite vCard 3.0 Vectorielle',
    metaDescription: 'Créez des QR codes vectoriels SVG permanents pour menus de restaurant et cartes vCard 3.0 avec aperçu chevalet de table et export < 20 Ko.',
    targetTool: 'qr',
    qrPayloadType: 'menu',
    monthlyVolume: 19600,
    cpcUsd: 1.95,
    faqQuestion: 'Puis-je envoyer mon QR code directement dans le compresseur ExactKB ?',
    faqAnswer: 'Oui, le bouton « Envoyer QR vers ExactKB (< 20 Ko) » transfère instantanément votre QR code dans le laboratoire photo pour le verrouiller sous 20 Ko.'
  },
  {
    id: 'es-firma-20kb',
    slug: '/es/comprimir-firma-manuscrita-20kb-sin-sombra',
    locale: 'es',
    languageLabel: 'Español',
    keyword: 'comprimir firma escaneada a 20kb exactos fondo blanco',
    title: 'Limpiar y Comprimir Firma Manuscrita a Menos de 20KB Exactos',
    metaDescription: 'Elimina las sombras del papel tomadas con el móvil y bloquea tu firma en tinta por debajo de 20KB mediante búsqueda binaria de 7 pasadas.',
    targetTool: 'exactkb',
    presetId: 'wet-ink-sig',
    targetKb: 20,
    monthlyVolume: 33700,
    cpcUsd: 1.25,
    faqQuestion: '¿Cómo eliminar la sombra gris del papel al fotografiar una firma?',
    faqAnswer: 'El Limpiador de Firma en Tinta aplica umbralización adaptativa local para conservar el trazo de bolígrafo y convertir el fondo en blanco puro #FFFFFF.'
  },
  {
    id: 'es-pasaporte-35x45',
    slug: '/es/foto-carnet-pasaporte-35x45mm-plantilla-10x15',
    locale: 'es',
    languageLabel: 'Español',
    keyword: 'foto pasaporte 35x45mm hoja 10x15 8 fotos para imprimir',
    title: 'Calibrador de Foto Pasaporte 35×45 mm y Plantilla Farmacia 10×15 cm',
    metaDescription: 'Ajusta tu foto biométrica a 35×45 mm o 2×2 pulgadas bajo 50KB y descarga la hoja de 10×15 cm con 8 fotos y marcas de corte milimétricas.',
    targetTool: 'exactkb',
    presetId: 'schengen-35x45',
    targetKb: 50,
    monthlyVolume: 28400,
    cpcUsd: 1.40,
    faqQuestion: '¿Mis fotografías se suben a algún servidor externo?',
    faqAnswer: 'Nunca. Todo el procesamiento de 7 pasadas y la generación de hojas 10×15 cm ocurre al 100% dentro de la memoria local de tu navegador.'
  },
  {
    id: 'es-qr-vcard',
    slug: '/es/generador-qr-vcard-vectorial-svg-permanente',
    locale: 'es',
    languageLabel: 'Español',
    keyword: 'generador qr vcard 3.0 tarjeta visita svg sin caducidad',
    title: 'Imprenta QR vCard 3.0 y Código de Barras CODE-128 en Vector SVG',
    metaDescription: 'Codifica contactos vCard 3.0, Wi-Fi y códigos CODE-128 directamente en la matriz sin redirecciones ni caducidad.',
    targetTool: 'qr',
    qrPayloadType: 'vcard',
    monthlyVolume: 21200,
    cpcUsd: 1.75,
    faqQuestion: '¿Qué diferencia hay entre un QR directo vCard 3.0 y un QR dinámico de pago?',
    faqAnswer: 'Un QR directo contiene todos tus datos de contacto codificados en la propia matriz gráfica, por lo que funciona para siempre incluso sin conexión a internet.'
  },
  {
    id: 'ar-cnie-passport',
    slug: '/ar/tasgir-sourat-jawaz-safar-35x45mm-50kb',
    locale: 'ar',
    languageLabel: 'العربية',
    keyword: 'ضغط صورة جواز السفر والبطاقة الوطنية 35x45 مم أقل من 50 كيلوبايت',
    title: 'ضبط حجم صورة جواز السفر والبطاقة الوطنية (35×45 مم) تحت 50 كيلوبايت',
    metaDescription: 'معايرة الصور البيومترية (35×45 مم و 2×2 بوصة) تحت سقف 50 أو 20 كيلوبايت بدقة عبر 7 مراحل بحث ثنائي مع ورقة طباعة 10×15 سم تضم 8 صور.',
    targetTool: 'exactkb',
    presetId: 'schengen-35x45',
    targetKb: 50,
    monthlyVolume: 41800,
    cpcUsd: 1.35,
    faqQuestion: 'كيف أضمن قبول الصورة في بوابات الجوازات والبطاقة الوطنية الإلكترونية؟',
    faqAnswer: 'يقوم المختبر بضبط الأبعاد إلى 413×531 بكسل (300 نقطة في البوصة) وتوحيد الخلفية البيضاء وحصر الحجم تحت السقف المطلوب بالكيلوبايت بدقة تامة.'
  },
  {
    id: 'ar-signature-20kb',
    slug: '/ar/tandif-wa-daght-tawqie-khatti-20kb',
    locale: 'ar',
    languageLabel: 'العربية',
    keyword: 'إزالة ظل التوقيع وضغط الصورة إلى 20 كيلوبايت لبوابات التوظيف',
    title: 'تنظيف ظل التوقيع الخطي وضغطه تحت 20 كيلوبايت بدقة',
    metaDescription: 'أزل ظلال تصوير الهاتف عن التوقيع الحبري واحصل على خلفية بيضاء نقية بحجم أقل من 20 كيلوبايت لبوابات المباريات والبنوك.',
    targetTool: 'exactkb',
    presetId: 'wet-ink-sig',
    targetKb: 20,
    monthlyVolume: 26500,
    cpcUsd: 1.20,
    faqQuestion: 'هل يتم رفع صورة التوقيع أو البطاقة إلى أي خادم خارجي؟',
    faqAnswer: 'إطلاقاً. جميع عمليات المعالجة والبحث الثنائي تتم محلياً بنسبة 100% داخل متصفحك لضمان السرية المطلقة.'
  }
];

export function buildJsonLdSchema(route: SeoRoute): string {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: `ExactKB & QR Atelier — ${route.title}`,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All (100% Client-Side Browser Engine)',
        inLanguage: route.locale,
        description: route.metaDescription,
        featureList: [
          '7-Pass Binary-Search Exact Kilobyte Compression',
          '35x45mm Schengen / Morocco CNIE & 2x2in US Visa Biometric Presets',
          'Wet-Ink Signature Camera Shadow Cleanser (< 20KB)',
          'Printable 4x6 inch (10x15 cm) 8-Photo Pharmacy Sheet with Crop Marks',
          'Non-Expiring Vector QR & CODE-128 Barcode Printshop'
        ],
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD'
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: route.faqQuestion,
            acceptedAnswer: {
              '@type': 'Answer',
              text: route.faqAnswer
            }
          }
        ]
      }
    ]
  };
  return JSON.stringify(schema, null, 2);
}
