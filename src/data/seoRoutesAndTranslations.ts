import { AtelierPage, BiometricPreset, LocaleCode, SeoRoute } from '../types/atelier';

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
    isoSpec: 'Custom CompressPhoto Spec'
  }
];

export const STANDARD_KB_CEILINGS = [10, 15, 20, 30, 50, 100, 200, 500];

export interface SeoSpecCard {
  title: string;
  body: string;
  specs: string[];
}

export type NonBlogPage = Exclude<AtelierPage, 'blog'>;

export const LOCALIZED_ROUTE_META: Record<
  LocaleCode,
  Record<NonBlogPage, { title: string; description: string }>
> = {
  en: {
    compress: {
      title: 'Compress Photo to 20KB, 50KB, 100KB Online | CompressPhoto',
      description:
        'Compress passport photos, visa portraits, and signatures to 20KB, 50KB, or 100KB online. Crop 35x45mm & 2x2 IDs and generate static vector QR codes in browser.'
    },
    converter: {
      title: 'Free Image Converter: HEIC, PDF, PNG, JPG, WebP | CompressPhoto',
      description:
        'Convert images and PDFs between JPG, PNG, WebP, AVIF, HEIC, TIFF, SVG, BMP, GIF & ICO with target KB sizing. 100% private in your browser.'
    },
    qr: {
      title: 'Free Static QR Code & Vector Barcode Generator | CompressPhoto',
      description:
        'Generate permanent static QR codes (URL, Wi-Fi, vCard 3.0, Café Menu, WhatsApp) and CODE-128 vector SVG & 300 DPI PNG barcodes 100% locally in your browser.'
    },
    about: {
      title: 'About CompressPhoto — 100% Client-Side Photo & QR Studio',
      description:
        'Learn how CompressPhoto compresses passport photos and signatures to target KB limits and generates non-expiring static QR codes with zero server uploads.'
    },
    legal: {
      title: 'Legal Notice & Terms of Service | CompressPhoto',
      description:
        'Read the official legal notice (Mentions Légales), terms of use, and biometric specification disclaimers for CompressPhoto (compressphoto.space).'
    },
    privacy: {
      title: 'Privacy Policy — Zero Image Upload Guarantee | CompressPhoto',
      description:
        '100% client-side privacy policy: CompressPhoto processes all photos, signatures, and QR codes locally inside your browser with zero server uploads.'
    },
    contact: {
      title: 'Contact & Technical Support | CompressPhoto',
      description:
        'Contact the CompressPhoto team for support, custom biometric passport preset requests, or partnership inquiries.'
    }
  },
  fr: {
    compress: {
      title: 'Compresser Photo à 20 Ko, 50 Ko, 100 Ko en Ligne | CompressPhoto',
      description:
        'Compressez vos photos de passeport, visa et signatures à 20 Ko, 50 Ko ou 100 Ko en ligne. Calibrez le format 35x45mm ANTS/CNIE et créez des QR codes statiques.'
    },
    converter: {
      title: 'Convertisseur d’Images : HEIC, PDF, PNG, JPG, WebP | CompressPhoto',
      description:
        'Convertissez vos images et PDF entre JPG, PNG, WebP, AVIF, HEIC, TIFF, SVG, BMP, GIF et ICO avec contrôle du poids en Ko dans votre navigateur.'
    },
    qr: {
      title: 'Générateur QR Code Statique & Code-Barres SVG | CompressPhoto',
      description:
        'Créez gratuitement des QR codes statiques permanents (URL, Wi-Fi, vCard 3.0, Menu, WhatsApp) et codes-barres CODE-128 en SVG vectoriel et PNG 300 DPI.'
    },
    about: {
      title: 'À Propos de CompressPhoto — Studio Photo Ko & QR Local',
      description:
        'Découvrez comment CompressPhoto compresse vos photos d’identité et signatures au Ko cible et génère des QR codes vectoriels sans aucun envoi sur serveur.'
    },
    legal: {
      title: 'Mentions Légales & Conditions d’Utilisation | CompressPhoto',
      description:
        'Consultez les mentions légales officielles, conditions générales d’utilisation et normes biométriques de CompressPhoto (compressphoto.space).'
    },
    privacy: {
      title: 'Politique de Confidentialité — Zéro Envoi Cloud | CompressPhoto',
      description:
        'Confidentialité 100% locale : CompressPhoto traite vos photos, signatures et QR codes directement dans votre navigateur sans stockage serveur.'
    },
    contact: {
      title: 'Contact & Support Technique | CompressPhoto',
      description:
        'Contactez l’équipe CompressPhoto pour toute question technique, demande de format biométrique ou partenariat.'
    }
  },
  es: {
    compress: {
      title: 'Comprimir Foto a 20KB, 50KB, 100KB Online | CompressPhoto',
      description:
        'Comprime fotos de pasaporte, visa y firmas a 20KB, 50KB o 100KB online. Ajusta fotos carnet 35x45mm y 2x2 pulgadas y genera códigos QR estáticos en navegador.'
    },
    converter: {
      title: 'Convertidor de Imágenes: HEIC, PDF, PNG, JPG, WebP | CompressPhoto',
      description:
        'Convierte imágenes y PDF entre JPG, PNG, WebP, AVIF, HEIC, TIFF, SVG, BMP, GIF e ICO con tamaño en KB en tu navegador sin subir archivos.'
    },
    qr: {
      title: 'Generador de Código QR Estático y Barras Vector | CompressPhoto',
      description:
        'Crea gratis códigos QR estáticos permanentes (URL, Wi-Fi, vCard 3.0, Menú, WhatsApp) y códigos de barras CODE-128 en vector SVG y PNG 300 DPI.'
    },
    about: {
      title: 'Sobre CompressPhoto — Estudio Local de Fotos KB y QR',
      description:
        'Conoce cómo CompressPhoto comprime fotos de pasaporte y firmas al KB objetivo y genera códigos QR vectoriales permanentes sin subir archivos.'
    },
    legal: {
      title: 'Aviso Legal y Términos de Uso | CompressPhoto',
      description:
        'Consulta el aviso legal oficial, las condiciones de servicio y las especificaciones biométricas de CompressPhoto (compressphoto.space).'
    },
    privacy: {
      title: 'Política de Privacidad — Cero Subidas al Servidor | CompressPhoto',
      description:
        'Privacidad 100% en tu navegador: CompressPhoto procesa todas tus fotos, firmas y códigos QR localmente sin enviar datos a servidores externos.'
    },
    contact: {
      title: 'Contacto y Soporte Técnico | CompressPhoto',
      description:
        'Ponte en contacto con el equipo de CompressPhoto para soporte técnico, nuevos formatos de pasaporte o consultas.'
    }
  },
  ar: {
    compress: {
      title: 'ضغط الصور إلى 20KB و50KB و100KB أونلاين | CompressPhoto',
      description:
        'اضغط صور جواز السفر والتأشيرة والتوقيع الخطي إلى 20 أو 50 أو 100 كيلوبايت بدقة في متصفحك. ضبط مقاس 35x45 مم و2x2 بوصة مع مولّد رموز QR ثابتة مجاناً.'
    },
    converter: {
      title: 'محول صيغ الصور وPDF: HEIC وPNG وJPG وWebP | CompressPhoto',
      description:
        'حول الصور وملفات PDF بين JPG وPNG وWebP وAVIF وHEIC وTIFF وSVG وBMP وGIF وICO مع تحديد الحجم بالكيلوبايت محلياً في متصفحك.'
    },
    qr: {
      title: 'مولّد رموز QR الثابتة الدائمة والباركود المتجه | CompressPhoto',
      description:
        'أنشئ رموز QR ثابتة لا تنتهي صلاحيتها (رابط موقع، شبكة Wi-Fi، بطاقة أعمال vCard، قائمة مطعم، واتساب) وباركود CODE-128 بصيغة SVG وPNG بدقة 300 DPI.'
    },
    about: {
      title: 'من نحن — منصة CompressPhoto لضغط الصور وتوليد رموز QR محلياً',
      description:
        'تعرّف على كيفية عمل CompressPhoto لضغط الصور الرسمية والتوقيعات بالكيلوبايت المطلوب وإنشاء رموز QR دائمة داخل متصفحك بدون رفع أي ملفات.'
    },
    legal: {
      title: 'إشعار قانوني وشروط الاستخدام | CompressPhoto',
      description:
        'اطلع على الإشعار القانوني الرسمي وشروط الخدمة ومعايير الصور البيومترية لمنصة CompressPhoto (compressphoto.space).'
    },
    privacy: {
      title: 'سياسة الخصوصية — معالجة محلية 100% بدون خوادم | CompressPhoto',
      description:
        'خصوصية مطلقة: يقوم موقع CompressPhoto بمعالجة جميع الصور والتوقيعات ورموز QR داخل متصفح جهازك مباشرة دون رفعها لأي خادم.'
    },
    contact: {
      title: 'اتصل بنا والدعم الفني | CompressPhoto',
      description:
        'تواصل مع فريق CompressPhoto للدعم الفني أو طلب إضافة مقاسات صور رسمية جديدة.'
    }
  }
};

export interface LocaleDictionary {
  brandTitle: string;
  navCompress: string;
  navConverter: string;
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
  kbSeoSectionTitle: string;
  kbSeoSectionSub: string;
  kbSeoCards: SeoSpecCard[];
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
  qrSeoSectionTitle: string;
  qrSeoSectionSub: string;
  qrSeoCards: SeoSpecCard[];
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
    brandTitle: 'CompressPhoto',
    navCompress: 'Photo Compressor',
    navConverter: 'Image Converter',
    navQrStudio: 'QR Code Generator',
    navBlog: 'Blog & Guides',
    kbHeroTitle: 'Compress Photo & Signature to 20KB, 50KB, 100KB Online',
    kbHeroSub:
      '100% private in your browser. Resize 35×45mm passport photos, 2×2" US visa portraits, and wet-ink signatures to your exact KB limit.',
    dropTitle: 'Drop your photo or signature here, or',
    dropClick: 'click to upload',
    dropSub: 'Supports JPG, PNG, WebP · Active file:',
    samplePrompt: 'Or test with a sample:',
    samplePassport: 'Passport Photo',
    sampleSignature: 'Handwritten Signature',
    sampleProduct: 'Product Photo',
    step1DocType: '1. Select Passport Photo, Visa Crop, or Signature Preset',
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
    step2MaxKb: '2. Set Target File Size in KB (20KB, 50KB, 100KB, 200KB)',
    optionalCleanup: 'Optional: Background & Signature Shadow Cleanup',
    removeShadowLabel: 'Remove Signature Paper Shadow',
    shadowStrengthLabel: 'Shadow Removal Strength',
    inkDarknessLabel: 'Pen Ink Darkness',
    backdropColorLabel: 'Photo Backdrop Color',
    backdropOriginal: 'Original',
    backdropWhite: 'Pure White',
    backdropBlue: 'Passport Blue',
    outputFormatLabel: 'Output Format',
    step3PreviewDownload: '3. Instant Biometric Preview & Compressed JPG / PDF Download',
    readyUnderLimit: 'Ready',
    beforeLabel: 'Before',
    afterLabel: 'After',
    downloadCompressedBtn: 'Download Compressed Image',
    downloadPdfBtn: 'Download as PDF',
    printSheetBtn: 'Print 8-Photo Sheet (4×6")',
    needQrTitle: 'Need a Free Permanent QR Code or Vector Barcode?',
    needQrSub: 'Create non-expiring Wi-Fi, Business Card (vCard 3.0), Menu, or Website QR codes.',
    openQrBtn: 'Open QR Generator →',
    kbSeoSectionTitle: 'Official Photo KB Compression & Biometric ID Specifications',
    kbSeoSectionSub:
      'CompressPhoto uses a deterministic 7-pass binary-search encoder in local browser RAM to lock JPG, WebP, PNG, and PDF files strictly beneath government portal ceilings.',
    kbSeoCards: [
      {
        title: 'Compress Photo to 20KB, 50KB & 100KB for Online Portals',
        body: 'Eliminate "File Too Large" errors on civil service, university, and embassy portals without blurry pixelation.',
        specs: [
          '10KB – 20KB Exact Ceiling: SSC, UPSC, IBPS & Banking Signature Uploads',
          '50KB Exact Ceiling: France ANTS, Morocco CNIE & Schengen Visa Portals',
          '100KB – 240KB Ceiling: US Department of State DS-160 & DV Lottery'
        ]
      },
      {
        title: '35×45 mm Passport, 2×2" US Visa & Wet-Ink Signature Presets',
        body: 'Calibrated at 300 DPI with pure white #FFFFFF background normalization and printable 4×6 inch (10×15 cm) 8-photo sheets.',
        specs: [
          '35×45 mm (413×531 px @ 300 DPI) ICAO 9303 Biometric Passport Standard',
          '2×2 inch (600×600 px @ 300 DPI) Square US Visa & Green Card Crop',
          '560×180 px Adaptive Shadow Removal for Handwritten Pen Signatures'
        ]
      },
      {
        title: '100% Browser-Local Privacy & Target-KB PDF Wrapper',
        body: 'Your biometric portraits and handwritten signatures never leave your device—zero cloud uploads or external servers.',
        specs: [
          'Instant ISO-32000 PDF Export Locked Under Your Target KB Limit',
          'Interactive Before / After Optical Split-Slider Sharpness Check',
          'Zero Server Storage · GDPR Compliant Client-Side Canvas Engine'
        ]
      }
    ],
    qrHeroTitle: 'Free Permanent Static QR Code & Vector Barcode Generator',
    qrHeroSub:
      '100% direct static encoding with zero middleman links—your URL, Wi-Fi, vCard 3.0, Menu, WhatsApp, and CODE-128 barcodes never expire.',
    qrTabUrl: 'Website URL',
    qrTabWifi: 'Wi-Fi',
    qrTabVcard: 'Business Card',
    qrTabMenu: 'Café Menu',
    qrTabWhatsapp: 'WhatsApp',
    qrTabBarcode: 'Barcode',
    qrStep1Details: '1. Select QR Code Type (URL, Wi-Fi, vCard 3.0, Menu, WhatsApp, Barcode)',
    qrStep2Customize: '2. Customize Vector QR Matrix, Corner Markers & Center Logo',
    qrStep3Preview: '3. Live Scannability Preview & Print SVG / 300 DPI PNG Export',
    uploadCenterLogo: 'Upload Center Logo',
    removeLogo: 'Remove Logo',
    downloadHighResPng: 'Download High-Res PNG (1200 px)',
    downloadVectorSvg: 'Download Vector SVG',
    compressQrUnder20Kb: 'Compress QR < 20 KB',
    qrSeoSectionTitle: 'Permanent Static Vector QR Code & CODE-128 Barcode Specifications',
    qrSeoSectionSub:
      'CompressPhoto encodes your data directly into the ISO/IEC 18004 Level-H dot matrix—guaranteeing zero redirect tracking, zero monthly fees, and infinite scan life.',
    qrSeoCards: [
      {
        title: '100% Permanent Static QR Codes (Zero Expiration)',
        body: 'Unlike dynamic subscription QR generators that deactivate after a trial, static QR codes store your payload directly inside the graphic modules.',
        specs: [
          'Website URL & Landing Page Direct Matrix Encoding',
          'Guest Wi-Fi Auto-Connect (WPA/WPA2 SSID & Password)',
          'vCard 3.0 Digital Business Card for iOS & Android Contacts'
        ]
      },
      {
        title: 'Restaurant Menu, WhatsApp Chat & Retail CODE-128 Barcodes',
        body: 'Purpose-built templates for hospitality table tents, customer support chat links, and inventory SKU labels.',
        specs: [
          'Contactless Bistro & Café Menu QR with Table Number Parameter',
          'WhatsApp Click-to-Chat (wa.me) with Pre-Filled Customer Message',
          'ISO/IEC 15417 CODE-128 Subset-B ASCII Retail & Logistics Barcode'
        ]
      },
      {
        title: 'Print-Ready Vector SVG, 300 DPI PNG & < 20KB Export',
        body: 'Engineered with 30% Reed-Solomon Level-H error correction so custom center logos scan reliably on any smartphone camera.',
        specs: [
          'True Geometric SVG Vector Paths for Adobe Illustrator & Print Shops',
          '1200×1200 px High-Resolution PNG for Packaging & Signage',
          '1-Click Bridge to CompressPhoto KB Compressor (< 20KB Portal Upload)'
        ]
      }
    ],
    footerDesc:
      'CompressPhoto: 100% client-side photo byte-ceiling compressor (Passport 35×45mm, US Visa 2×2", Wet-Ink Signatures < 20KB) and permanent static vector QR & barcode generator.',
    footerToolsTitle: 'CompressPhoto Tools',
    footerLegalTitle: 'Information & Legal',
    navAbout: 'About Us',
    navLegal: 'Legal Notice',
    navPrivacy: 'Privacy Policy',
    navContact: 'Contact Us',
    backToCompressor: 'Back to Photo KB Compressor',
    localGuaranteeFooter: '100% Browser-Local Processing · Zero Cloud Uploads'
  },
  fr: {
    brandTitle: 'CompressPhoto',
    navCompress: 'Compresseur Photo',
    navConverter: 'Convertisseur Image',
    navQrStudio: 'Générateur QR Code',
    navBlog: 'Blog & Guides',
    kbHeroTitle: 'Compresser Photo & Signature à 20 Ko, 50 Ko, 100 Ko en Ligne',
    kbHeroSub:
      '100% privé dans votre navigateur. Calibrez vos photos passeport 35×45 mm, visa USA 2×2" et signatures manuscrites au poids Ko exact.',
    dropTitle: 'Glissez votre photo ou signature ici, ou',
    dropClick: 'cliquez pour importer',
    dropSub: 'Formats JPG, PNG, WebP · Fichier actif :',
    samplePrompt: 'Ou tester avec un exemple :',
    samplePassport: 'Photo Passeport',
    sampleSignature: 'Signature Manuscrite',
    sampleProduct: 'Photo Produit',
    step1DocType: '1. Choisir Format Passeport, Visa ou Signature',
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
    step2MaxKb: '2. Définir la Taille Cible en Ko (20 Ko, 50 Ko, 100 Ko)',
    optionalCleanup: 'Optionnel : Fond Blanc & Nettoyage Signature',
    removeShadowLabel: 'Effacer l’ombre papier (Signature)',
    shadowStrengthLabel: 'Force de nettoyage',
    inkDarknessLabel: 'Intensité de l’encre',
    backdropColorLabel: 'Couleur de Fond Photo',
    backdropOriginal: 'Original',
    backdropWhite: 'Blanc Pur',
    backdropBlue: 'Bleu Identité',
    outputFormatLabel: 'Format de Sortie',
    step3PreviewDownload: '3. Aperçu Biométrique & Téléchargement JPG / PDF Compressé',
    readyUnderLimit: 'Prêt',
    beforeLabel: 'Avant',
    afterLabel: 'Après',
    downloadCompressedBtn: 'Télécharger l’Image Compressée',
    downloadPdfBtn: 'Télécharger en PDF',
    printSheetBtn: 'Planche 8 Photos (10×15 cm)',
    needQrTitle: 'Besoin d’un QR Code Statique ou Code-Barres Vectoriel Gratuit ?',
    needQrSub: 'Créez des QR codes Wi-Fi, Carte de visite vCard 3.0, Menu ou Site Web sans expiration.',
    openQrBtn: 'Ouvrir Générateur QR →',
    kbSeoSectionTitle: 'Spécifications Officielles de Compression Photo en Ko & Formats Biométriques',
    kbSeoSectionSub:
      'CompressPhoto utilise une recherche binaire à 7 passes directement dans la mémoire de votre navigateur pour garantir un fichier JPG, WebP ou PDF strictement sous la limite exigée.',
    kbSeoCards: [
      {
        title: 'Compresser une Photo à 20 Ko, 50 Ko ou 100 Ko Exact',
        body: 'Validez vos dépôts de dossiers sur les portails administratifs, universitaires et consulaires sans perte de netteté.',
        specs: [
          'Limite Stricte 10 Ko – 20 Ko : Signatures manuscrites & concours administratifs',
          'Limite 50 Ko : Passeport France ANTS, CNIE Maroc & Visa Schengen',
          'Limite 100 Ko – 240 Ko : Visa Américain DS-160 & Loterie Green Card'
        ]
      },
      {
        title: 'Formats Photo Identité 35×45 mm, Visa 2×2" & Signature Fond Blanc',
        body: 'Calibrage à 300 DPI avec blanchiment du fond #FFFFFF et génération de planche photo 10×15 cm (8 photos avec traits de coupe).',
        specs: [
          '35×45 mm (413×531 px à 300 DPI) Norme Biométrique OACI 9303',
          '2×2 pouces (600×600 px à 300 DPI) Format Carré Visa USA',
          'Suppression automatique de l’ombre du papier pour signature prise au smartphone'
        ]
      },
      {
        title: 'Confidentialité 100% Locale & Export PDF au Ko Exact',
        body: 'Vos photos d’identité et signatures ne quittent jamais votre appareil — aucun téléversement vers un serveur externe.',
        specs: [
          'Compilation directe en fichier PDF ISO-32000 verrouillé sous votre limite en Ko',
          'Comparateur optique Avant / Après avec ligne jaune interactive',
          'Traitement 100% Navigateur conforme RGPD · Zéro stockage cloud'
        ]
      }
    ],
    qrHeroTitle: 'Générateur Gratuit de QR Code Statique Permanent & Code-Barres Vectoriel',
    qrHeroSub:
      'Encodage statique direct sans lien intermédiaire — vos QR codes URL, Wi-Fi, vCard 3.0, Menu, WhatsApp et codes-barres CODE-128 n’expirent jamais.',
    qrTabUrl: 'Site Web (URL)',
    qrTabWifi: 'Wi-Fi',
    qrTabVcard: 'Carte de Visite',
    qrTabMenu: 'Menu Café',
    qrTabWhatsapp: 'WhatsApp',
    qrTabBarcode: 'Code-Barres',
    qrStep1Details: '1. Choisir le Type de QR Code (URL, Wi-Fi, vCard 3.0, Menu, Code-Barres)',
    qrStep2Customize: '2. Personnaliser la Matrice QR Vectorielle, Coins & Logo Central',
    qrStep3Preview: '3. Aperçu Scannable en Direct & Export SVG / PNG 300 DPI',
    uploadCenterLogo: 'Importer un Logo Central',
    removeLogo: 'Retirer le Logo',
    downloadHighResPng: 'Télécharger PNG Haute Déf. (1200 px)',
    downloadVectorSvg: 'Télécharger SVG Vectoriel',
    compressQrUnder20Kb: 'Compresser QR < 20 Ko',
    qrSeoSectionTitle: 'Spécifications des QR Codes Statiques Permanents & Codes-Barres CODE-128',
    qrSeoSectionSub:
      'CompressPhoto encode vos données directement dans la matrice ISO/CEI 18004 Niveau H — sans redirection publicitaire, sans abonnement et valable à vie.',
    qrSeoCards: [
      {
        title: 'QR Codes 100% Statiques et Permanents (Sans Expiration)',
        body: 'Contrairement aux générateurs dynamiques payants qui bloquent vos codes après un essai, l’encodage statique inscrit vos données directement dans l’image.',
        specs: [
          'Encodage direct d’URL de site web et page de destination',
          'Connexion Wi-Fi automatique invité (SSID & mot de passe WPA/WPA2)',
          'Carte de visite numérique vCard 3.0 universelle (iOS & Android)'
        ]
      },
      {
        title: 'QR Code Menu Restaurant, WhatsApp & Code-Barres CODE-128',
        body: 'Conçu pour les chevalets de table de bistro, le service client direct sur WhatsApp et l’étiquetage logistique.',
        specs: [
          'QR Menu Café & Restaurant sans contact avec numéro de table',
          'Lien direct WhatsApp Click-to-Chat avec message pré-rempli',
          'Code-barres vectoriel CODE-128 Subset-B pour produits et inventaire'
        ]
      },
      {
        title: 'Export Vectoriel SVG d’Imprimerie, PNG 300 DPI & < 20 Ko',
        body: 'Correction d’erreur Reed-Solomon Niveau H (30%) permettant d’insérer un logo central tout en conservant un scan instantané.',
        specs: [
          'Fichier SVG vectoriel pur pour imprimeurs, Illustrator et gravure',
          'Image PNG Haute Résolution 1200×1200 px pour supports imprimés',
          'Transfert en 1 clic vers le compresseur CompressPhoto (< 20 Ko)'
        ]
      }
    ],
    footerDesc:
      'CompressPhoto : compresseur photo au kilo-octet exact 100% local (Passeport 35×45 mm, Visa USA 2×2", Signatures < 20 Ko) et générateur de QR codes vectoriels permanents.',
    footerToolsTitle: 'Outils CompressPhoto',
    footerLegalTitle: 'Informations & Mentions',
    navAbout: 'À Propos',
    navLegal: 'Mentions Légales',
    navPrivacy: 'Politique de Confidentialité',
    navContact: 'Contact',
    backToCompressor: 'Retour au Compresseur Photo',
    localGuaranteeFooter: 'Traitement 100% Navigateur · Aucun Envoi Cloud'
  },
  es: {
    brandTitle: 'CompressPhoto',
    navCompress: 'Compresor Foto',
    navConverter: 'Convertidor Imagen',
    navQrStudio: 'Generador Código QR',
    navBlog: 'Blog y Guías',
    kbHeroTitle: 'Comprimir Foto y Firma a 20KB, 50KB, 100KB Online',
    kbHeroSub:
      '100% privado en tu navegador. Ajusta fotos de pasaporte 35×45 mm, visa EE.UU. 2×2" y firmas manuscritas al límite exacto en KB.',
    dropTitle: 'Arrastra tu foto o firma aquí, o',
    dropClick: 'haz clic para subir',
    dropSub: 'Soporta JPG, PNG, WebP · Archivo activo:',
    samplePrompt: 'O prueba con un ejemplo:',
    samplePassport: 'Foto Pasaporte',
    sampleSignature: 'Firma Manuscrita',
    sampleProduct: 'Foto Producto',
    step1DocType: '1. Elegir Formato Pasaporte, Visa o Firma Manuscrita',
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
    step2MaxKb: '2. Fijar Tamaño Máximo en KB (20KB, 50KB, 100KB, 200KB)',
    optionalCleanup: 'Opcional: Fondo Blanco y Limpieza de Firma',
    removeShadowLabel: 'Eliminar sombra de papel en firma',
    shadowStrengthLabel: 'Fuerza de limpieza',
    inkDarknessLabel: 'Intensidad de la tinta',
    backdropColorLabel: 'Color de Fondo de la Foto',
    backdropOriginal: 'Original',
    backdropWhite: 'Blanco Puro',
    backdropBlue: 'Azul Pasaporte',
    outputFormatLabel: 'Formato de Salida',
    step3PreviewDownload: '3. Vista Previa Biométrica y Descarga JPG / PDF Comprimido',
    readyUnderLimit: 'Listo',
    beforeLabel: 'Antes',
    afterLabel: 'Después',
    downloadCompressedBtn: 'Descargar Imagen Comprimida',
    downloadPdfBtn: 'Descargar como PDF',
    printSheetBtn: 'Hoja de 8 Fotos (10×15 cm)',
    needQrTitle: '¿Necesitas un Código QR Estático o Código de Barras Gratis?',
    needQrSub: 'Crea códigos QR permanentes para Wi-Fi, Tarjeta de Visita vCard 3.0, Menú o Web.',
    openQrBtn: 'Abrir Generador QR →',
    kbSeoSectionTitle: 'Especificaciones Oficiales para Comprimir Fotos en KB yTamaño Pasaporte',
    kbSeoSectionSub:
      'CompressPhoto ejecuta un algoritmo de búsqueda binaria de 7 pasadas en la memoria local de tu navegador para dejar tus archivos JPG, WebP o PDF exactamente bajo el límite requerido.',
    kbSeoCards: [
      {
        title: 'Comprimir Foto a 20KB, 50KB y 100KB para Portales Oficiales',
        body: 'Evita errores de archivo demasiado grande en trámites gubernamentales, oposiciones y matrículas universitarias sin perder nitidez.',
        specs: [
          'Límite Exacto 10KB – 20KB: Firmas digitalizadas y portales de empleo público',
          'Límite 50KB: Pasaporte biométrico 35×45 mm, DNI y visados Schengen',
          'Límite 100KB – 240KB: Formulario DS-160 de Visa EE.UU. y Lotería de Visas'
        ]
      },
      {
        title: 'Plantillas de Pasaporte 35×45 mm, Visa 2×2" y Firma sin Sombra',
        body: 'Calibración exacta a 300 DPI con fondo blanco puro #FFFFFF y plantilla imprimible de 8 fotos en papel 10×15 cm (4×6").',
        specs: [
          '35×45 mm (413×531 px a 300 DPI) Estándar Biométrico OACI 9303',
          '2×2 pulgadas (600×600 px a 300 DPI) Formato Cuadrado Visa EE.UU.',
          'Eliminación automática de sombras grises en firmas fotografiadas con el móvil'
        ]
      },
      {
        title: 'Privacidad 100% Local en Navegador y Exportación PDF Exacto',
        body: 'Tus fotografías biométricas y firmas manuscritas nunca se suben a ningún servidor externo.',
        specs: [
          'Generación instantánea de PDF ISO-32000 bloqueado bajo tu límite de KB',
          'Control deslizante amarillo Antes / Después para verificar la nitidez',
          'Procesamiento 100% en RAM local compatible con RGPD'
        ]
      }
    ],
    qrHeroTitle: 'Generador Gratis de Código QR Estático Permanente y Barras en Vector',
    qrHeroSub:
      'Codificación estática directa sin enlaces intermediarios: tus códigos QR de Web, Wi-Fi, vCard 3.0, Menú, WhatsApp y CODE-128 nunca caducan.',
    qrTabUrl: 'Sitio Web',
    qrTabWifi: 'Wi-Fi',
    qrTabVcard: 'Tarjeta Visita',
    qrTabMenu: 'Menú Café',
    qrTabWhatsapp: 'WhatsApp',
    qrTabBarcode: 'Cód. Barras',
    qrStep1Details: '1. Seleccionar Tipo de Código QR (URL, Wi-Fi, vCard 3.0, Menú, Barras)',
    qrStep2Customize: '2. Personalizar Matriz QR Vectorial, Esquinas y Logo Central',
    qrStep3Preview: '3. Vista Previa Escaneable y Exportación Vector SVG / PNG 300 DPI',
    uploadCenterLogo: 'Subir Logo Central',
    removeLogo: 'Quitar Logo',
    downloadHighResPng: 'Descargar PNG Alta Res. (1200 px)',
    downloadVectorSvg: 'Descargar Vector SVG',
    compressQrUnder20Kb: 'Comprimir QR < 20 KB',
    qrSeoSectionTitle: 'Especificaciones de Códigos QR Estáticos Permanentes y Barras CODE-128',
    qrSeoSectionSub:
      'CompressPhoto codifica tus datos directamente en la matriz ISO/IEC 18004 Nivel H, garantizando cero redirecciones, cero cuotas mensuales y duración ilimitada.',
    qrSeoCards: [
      {
        title: 'Códigos QR 100% Estáticos y Sin Caducidad',
        body: 'A diferencia de los generadores dinámicos de pago que desactivan tu código tras unos días, el código estático guarda la información dentro del propio gráfico.',
        specs: [
          'Codificación directa de enlaces web (URL) sin servidores intermedios',
          'Conexión automática a Wi-Fi para clientes (SSID y clave WPA/WPA2)',
          'Tarjeta de visita digital vCard 3.0 compatible con iOS y Android'
        ]
      },
      {
        title: 'QR para Menú de Restaurante, WhatsApp y Código CODE-128',
        body: 'Soluciones listas para imprenta en hostelería, atención al cliente por WhatsApp y etiquetado de inventario.',
        specs: [
          'QR de Menú Digital para mesas de restaurante y cafetería',
          'Enlace directo WhatsApp Click-to-Chat con mensaje predefinido',
          'Código de barras vectorial CODE-128 Subset-B para comercio y logística'
        ]
      },
      {
        title: 'Exportación Vectorial SVG, PNG 300 DPI y Compresión < 20KB',
        body: 'Corrección de errores Reed-Solomon Nivel H (30%) para incluir logotipo central manteniendo una lectura instantánea.',
        specs: [
          'Archivo Vector SVG escalable para diseño profesional e imprenta',
          'Imagen PNG de 1200×1200 px de alta resolución',
          'Envío en 1 clic al compresor CompressPhoto para dejarlo bajo 20 KB'
        ]
      }
    ],
    footerDesc:
      'CompressPhoto: compresor de fotos al kilobyte exacto 100% en tu navegador (Pasaporte 35×45mm, Visa EE.UU. 2×2", Firmas < 20KB) y generador de códigos QR vectoriales sin caducidad.',
    footerToolsTitle: 'Herramientas CompressPhoto',
    footerLegalTitle: 'Información y Legal',
    navAbout: 'Sobre Nosotros',
    navLegal: 'Aviso Legal',
    navPrivacy: 'Política de Privacidad',
    navContact: 'Contacto',
    backToCompressor: 'Volver al Compresor de Fotos',
    localGuaranteeFooter: 'Procesamiento 100% Local en Navegador · Cero Subidas a la Nube'
  },
  ar: {
    brandTitle: 'CompressPhoto',
    navCompress: 'ضاغط الصور',
    navConverter: 'محول الصيغ',
    navQrStudio: 'مولّد رمز QR',
    navBlog: 'المدونة والأدلة',
    kbHeroTitle: 'ضغط الصور والتوقيع إلى 20KB و50KB و100KB أونلاين',
    kbHeroSub:
      'خصوصية 100% داخل متصفحك. اضبط صور جواز السفر 35×45 مم وتأشيرة أمريكا 2×2 بوصة والتوقيع الخطي بالحجم الدقيق بالكيلوبايت.',
    dropTitle: 'أفلت صورتك أو توقيعك هنا، أو',
    dropClick: 'اضغط لاختيار ملف',
    dropSub: 'يدعم JPG و PNG و WebP · الملف الحالي:',
    samplePrompt: 'أو جرّب نموذجاً جاهزاً:',
    samplePassport: 'صورة جواز سفر',
    sampleSignature: 'توقيع خطي',
    sampleProduct: 'صورة منتج',
    step1DocType: '1. اختيار مقاس جواز السفر أو التأشيرة أو التوقيع الخطي',
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
    step2MaxKb: '2. تحديد الحجم المستهدف بالكيلوبايت (20KB، 50KB، 100KB)',
    optionalCleanup: 'اختياري: تبييض الخلفية وتنقية التوقيع',
    removeShadowLabel: 'إزالة ظل الكاميرا عن التوقيع',
    shadowStrengthLabel: 'قوة إزالة الظل',
    inkDarknessLabel: 'درجة وضوح الحبر',
    backdropColorLabel: 'لون خلفية الصورة',
    backdropOriginal: 'الأصلي',
    backdropWhite: 'أبيض نقي',
    backdropBlue: 'أزرق رسمي',
    outputFormatLabel: 'صيغة الملف',
    step3PreviewDownload: '3. معاينة فورية وتنزيل الصورة المضغوطة JPG أو PDF',
    readyUnderLimit: 'جاهز',
    beforeLabel: 'قبل',
    afterLabel: 'بعد',
    downloadCompressedBtn: 'تنزيل الصورة المضغوطة',
    downloadPdfBtn: 'تنزيل كملف PDF',
    printSheetBtn: 'ورقة طباعة 8 صور (10×15 سم)',
    needQrTitle: 'هل تحتاج إلى رمز QR ثابت ودائم أو باركود مجاني؟',
    needQrSub: 'أنشئ رموز QR دائمة لشبكة Wi-Fi أو بطاقة الأعمال vCard 3.0 أو قائمة المطعم أو الموقع.',
    openQrBtn: 'فتح مولّد QR ←',
    kbSeoSectionTitle: 'المواصفات الرسمية لضغط الصور بالكيلوبايت ومقاسات جواز السفر والتأشيرة',
    kbSeoSectionSub:
      'يعمل موقع CompressPhoto عبر خوارزمية بحث ثنائي من 7 مراحل داخل ذاكرة المتصفح لضمان ضبط حجم ملفات JPG وWebP وPDF تحت السقف المطلوب بدقة تامة.',
    kbSeoCards: [
      {
        title: 'ضغط الصور إلى 20KB و50KB و100KB للبوابات الحكومية',
        body: 'تخلّص من رسائل رفض الملفات بسبب الحجم الزائد في مواقع التوظيف والجامعات والسفارات مع الحفاظ على وضوح الملامح.',
        specs: [
          'سقف 10KB – 20KB الدقيق: رفع التوقيع الخطي والوثائق في بوابات المباريات والبنوك',
          'سقف 50KB الدقيق: صور جواز السفر البيومتري 35×45 مم والبطاقة الوطنية CNIE وتأشيرة شنغن',
          'سقف 100KB – 240KB: نموذج تأشيرة أمريكا DS-160 وقرعة الهجرة العشوائية'
        ]
      },
      {
        title: 'قوالب جواز السفر 35×45 مم وتأشيرة 2×2 بوصة وتنقية التوقيع',
        body: 'معايرة بدقة 300 DPI مع توحيد الخلفية البيضاء النقية #FFFFFF وإعداد ورقة طباعة 10×15 سم تضم 8 صور جاهزة للقص.',
        specs: [
          'مقاس 35×45 مم (413×531 بكسل بدقة 300 DPI) المطابق لمعيار ICAO 9303',
          'مقاس 2×2 بوصة (600×600 بكسل) المربع الخاص بالتأشيرة الأمريكية',
          'إزالة الظل الرمادي تلقائياً عن التوقيع المصوّر بكاميرا الهاتف'
        ]
      },
      {
        title: 'خصوصية محلية 100% وتصدير ملفات PDF بحجم كيلوبايت مضمون',
        body: 'صورك الشخصية وتوقيعك لا تغادر جهازك أبداً — تتم المعالجة بالكامل داخل متصفحك بدون خوادم خارجية.',
        specs: [
          'تحويل فوري إلى ملف PDF مطابق لمعيار ISO-32000 تحت السقف المحدد بالكيلوبايت',
          'شريط مقارنة بصري تفاعلي (قبل / بعد) للتحقق من الجودة قبل التنزيل',
          'حماية كاملة للبيانات الشخصية · لا يتم رفع أو تخزين أي صور على الإنترنت'
        ]
      }
    ],
    qrHeroTitle: 'مولّد مجاني لرموز QR الثابتة الدائمة والباركود المتجه',
    qrHeroSub:
      'تشفير ثابت ومباشر بدون روابط وسيطة — رموز QR للمواقع وWi-Fi وبطاقات vCard 3.0 وقوائم المطاعم وباركود CODE-128 لا تنتهي صلاحيتها أبداً.',
    qrTabUrl: 'رابط موقع',
    qrTabWifi: 'شبكة Wi-Fi',
    qrTabVcard: 'بطاقة أعمال',
    qrTabMenu: 'قائمة مقهى',
    qrTabWhatsapp: 'واتساب',
    qrTabBarcode: 'باركود',
    qrStep1Details: '1. اختيار نوع رمز QR (رابط، Wi-Fi، بطاقة vCard، قائمة، واتساب، باركود)',
    qrStep2Customize: '2. تخصيص مصفوفة QR المتجهة، شكل الزوايا والشعار الوسطي',
    qrStep3Preview: '3. معاينة حية وتصدير ملف متجه SVG أو PNG بدقة 300 DPI',
    uploadCenterLogo: 'رفع شعار في المنتصف',
    removeLogo: 'إزالة الشعار',
    downloadHighResPng: 'تنزيل صورة عالية الدقة PNG (1200px)',
    downloadVectorSvg: 'تنزيل ملف متجه SVG',
    compressQrUnder20Kb: 'ضغط رمز QR أقل من 20KB',
    qrSeoSectionTitle: 'مواصفات رموز QR الثابتة الدائمة والباركود المتجه CODE-128',
    qrSeoSectionSub:
      'يقوم CompressPhoto بتشفير بياناتك مباشرة داخل مصفوفة ISO/IEC 18004 بمستوى تصحيح H — بدون روابط تحويل وسيطة أو اشتراكات شهرية وبصلاحية دائمة مدى الحياة.',
    qrSeoCards: [
      {
        title: 'رموز QR ثابتة ودائمة 100% (لا تنتهي صلاحيتها أبداً)',
        body: 'على عكس المواقع التي تقفل الرمز بعد فترة تجريبية، يتم تخزين الرابط أو بيانات الاتصال مباشرة داخل نقاط الرمز الهندسية.',
        specs: [
          'تشفير مباشر لروابط المواقع والصفحات الرسمية بدون وسطاء',
          'رمز اتصال سريع بشبكة Wi-Fi للضيوف (الاسم وكلمة المرور WPA/WPA2)',
          'بطاقة أعمال رقمية vCard 3.0 تعمل فوراً على هواتف آيفون وأندرويد'
        ]
      },
      {
        title: 'رموز قوائم المطاعم والمقاهي وواتساب وباركود CODE-128',
        body: 'قوالب احترافية جاهزة للطباعة لطاولات المطاعم وخدمة العملاء عبر واتساب وملصقات المنتجات.',
        specs: [
          'رمز QR لقائمة الطعام الرقمية مع دعم رقم الطاولة',
          'رابط محادثة واتساب مباشر (wa.me) مع رسالة ترحيبية جاهزة',
          'باركود قياسي CODE-128 Subset-B للمنتجات والمخازن'
        ]
      },
      {
        title: 'تصدير ملفات متجهة SVG للطباعة وPNG بدقة 300 DPI وضغط < 20KB',
        body: 'معامل تصحيح أخطاء Reed-Solomon من المستوى H (بنسبة 30%) يتيح إضافة شعارك في الوسط مع ضمان سرعة المسح الضوئي.',
        specs: [
          'ملف متجه SVG نقي قابل للتكبير اللانهائي للمطابع وبرامج التصميم',
          'صورة PNG عالية الدقة (1200×1200 بكسل) للبطاقات والملصقات',
          'إرسال مباشر بنقرة واحدة إلى ضاغط الصور CompressPhoto (< 20KB)'
        ]
      }
    ],
    footerDesc:
      'CompressPhoto : أداة محلية 100% لضغط الصور والتوقيعات تحت سقف كيلوبايت دقيق (جواز سفر 35×45 مم، تأشيرة 2×2 بوصة، توقيع < 20KB) وتوليد رموز QR دائمة.',
    footerToolsTitle: 'أدوات CompressPhoto',
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
    title: 'Compress Wet-Ink Signature to Under 20KB Exact — CompressPhoto',
    metaDescription: 'Remove phone camera paper shadows and lock your handwritten signature scan strictly under 20KB (140×60 / 560×180 px) in 7 binary-search passes.',
    targetTool: 'compress',
    presetId: 'wet-ink-sig',
    targetKb: 20,
    monthlyVolume: 48500,
    cpcUsd: 1.45,
    faqQuestion: 'How does CompressPhoto guarantee my signature scan stays strictly under 20 KB?',
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
    targetTool: 'compress',
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
    targetTool: 'compress',
    presetId: 'schengen-35x45',
    targetKb: 15,
    monthlyVolume: 31400,
    cpcUsd: 1.30,
    faqQuestion: 'Can I export a Target-KB PDF under 15 KB or 20 KB as well?',
    faqAnswer: 'Yes. The CompressPhoto PDF compiler wraps the binary-searched JPEG stream into a minimal ISO-32000 PDF container calibrated to your target kilobyte ceiling.'
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
    faqQuestion: 'Why do CompressPhoto QR codes never expire?',
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
    targetTool: 'compress',
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
    targetTool: 'compress',
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
    faqQuestion: 'Puis-je envoyer mon QR code directement dans le compresseur CompressPhoto ?',
    faqAnswer: 'Oui, le bouton « Compresser QR < 20 Ko » transfère instantanément votre QR code dans le compresseur photo pour le verrouiller sous 20 Ko.'
  },
  {
    id: 'es-firma-20kb',
    slug: '/es/comprimir-firma-manuscrita-20kb-sin-sombra',
    locale: 'es',
    languageLabel: 'Español',
    keyword: 'comprimir firma escaneada a 20kb exactos fondo blanco',
    title: 'Limpiar y Comprimir Firma Manuscrita a Menos de 20KB Exactos',
    metaDescription: 'Elimina las sombras del papel tomadas con el móvil y bloquea tu firma en tinta por debajo de 20KB mediante búsqueda binaria de 7 pasadas.',
    targetTool: 'compress',
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
    targetTool: 'compress',
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
    targetTool: 'compress',
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
    targetTool: 'compress',
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
        name: `CompressPhoto — ${route.title}`,
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
