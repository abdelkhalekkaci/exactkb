import { BiometricPresetId, LocaleCode } from '../types/atelier';

export interface ToolLandingPageConfig {
  slug: string; // e.g. 'compress-photo-to-20kb'
  presetId: BiometricPresetId;
  targetKb: number;
  customWidth?: number;
  customHeight?: number;
  autoFeature?: 'grid-framing' | 'print-sheet' | 'name-slate';
  badgeText: Record<LocaleCode, string>;
  title: Record<LocaleCode, string>;
  metaDescription: Record<LocaleCode, string>;
  h1: Record<LocaleCode, string>;
  subtitle: Record<LocaleCode, string>;
  directAnswer: Record<LocaleCode, string>;
  portalSpecs: {
    dimensionsMm: string;
    dimensionsPx: string;
    maxKb: string;
    background: string;
    standardCode: string;
  };
  specificFaqs: Record<
    LocaleCode,
    Array<{ question: string; answer: string }>
  >;
}

export interface OfficialPortalSpecRow {
  id: string;
  portalName: Record<LocaleCode, string>;
  countryFlag: string;
  dimensionsMm: string;
  dimensionsPx: string;
  targetKbLabel: string;
  targetKbValue: number;
  presetId: BiometricPresetId;
  routeSlug: string;
  backgroundSpec: Record<LocaleCode, string>;
}

export const OFFICIAL_PORTAL_SPEC_TABLE: OfficialPortalSpecRow[] = [
  {
    id: 'france-ants',
    portalName: {
      en: 'France ANTS (Passport, ID Card, Driving Permit)',
      fr: 'France ANTS (Passeport, CNI, Permis de conduire)',
      es: 'Francia ANTS (Pasaporte, DNI, Permiso)',
      ar: 'فرنسا ANTS (جواز السفر، بطاقة الهوية، رخصة القيادة)'
    },
    countryFlag: '🇫🇷',
    dimensionsMm: '35 × 45 mm',
    dimensionsPx: '413 × 531 px (300 DPI)',
    targetKbLabel: '≤ 50 KB',
    targetKbValue: 50,
    presetId: 'schengen-35x45',
    routeSlug: 'ants-photo-identite-50ko',
    backgroundSpec: {
      en: 'Plain light grey/blue or white, no shadow',
      fr: 'Fond uni clair ou blanc pur, sans ombre',
      es: 'Fondo claro uniforme o blanco sin sombras',
      ar: 'خلفية فاتحة موحدة أو بيضاء بدون ظلال'
    }
  },
  {
    id: 'morocco-cnie',
    portalName: {
      en: 'Morocco CNIE & Biometric Passport / Public Exams',
      fr: 'Maroc CNIE, Passeport Biométrique & Concours',
      es: 'Marruecos CNIE y Pasaporte Biométrico',
      ar: 'المغرب CNIE وجواز السفر البيومتري والمباريات'
    },
    countryFlag: '🇲🇦',
    dimensionsMm: '35 × 45 mm',
    dimensionsPx: '413 × 531 px (300 DPI)',
    targetKbLabel: '≤ 50 KB',
    targetKbValue: 50,
    presetId: 'schengen-35x45',
    routeSlug: 'photo-cnie-maroc-35x45mm',
    backgroundSpec: {
      en: 'Pure white or light neutral background',
      fr: 'Fond blanc pur (#FFFFFF) ou gris très clair',
      es: 'Fondo blanco puro (#FFFFFF) o neutro',
      ar: 'خلفية بيضاء نقية (#FFFFFF) أو محايدة'
    }
  },
  {
    id: 'us-ds160',
    portalName: {
      en: 'US Visa DS-160, Green Card DV Lottery & USCIS',
      fr: 'Visa USA DS-160, DV Lottery (Green Card) & USCIS',
      es: 'Visa EE.UU. DS-160, Lotería DV y USCIS',
      ar: 'تأشيرة أمريكا DS-160 واللوتري DV Lottery وUSCIS'
    },
    countryFlag: '🇺🇸',
    dimensionsMm: '51 × 51 mm (2×2")',
    dimensionsPx: '600 × 600 px (300 DPI)',
    targetKbLabel: '≤ 100 KB (Max 240 KB)',
    targetKbValue: 100,
    presetId: 'us-visa-2x2',
    routeSlug: 'ds160-photo-compressor-600x600',
    backgroundSpec: {
      en: 'Pure white (#FFFFFF) RGB, sRGB color space',
      fr: 'Blanc pur (#FFFFFF), profil colorimétrique sRGB',
      es: 'Blanco puro (#FFFFFF), perfil de color sRGB',
      ar: 'أبيض نقي (#FFFFFF) بنطاق ألوان sRGB'
    }
  },
  {
    id: 'india-ssc-upsc',
    portalName: {
      en: 'India SSC, UPSC, IBPS, SBI & NEET (Photo + Name/Date)',
      fr: 'Inde SSC, UPSC, IBPS & NEET (Photo + Nom & Date)',
      es: 'India SSC, UPSC, IBPS y NEET (Foto + Nombre y Fecha)',
      ar: 'الهند SSC وUPSC وIBPS وNEET (صورة مع الاسم والتاريخ)'
    },
    countryFlag: '🇮🇳',
    dimensionsMm: '35 × 45 mm',
    dimensionsPx: '413 × 531 px (300 DPI)',
    targetKbLabel: '20 KB – 50 KB Exact',
    targetKbValue: 20,
    presetId: 'schengen-35x45',
    routeSlug: 'ssc-upsc-ibps-photo-signature-resizer',
    backgroundSpec: {
      en: 'White background, optional Name & Date banner',
      fr: 'Fond blanc uni, bandeau Nom & Date en option',
      es: 'Fondo blanco liso, banda de Nombre y Fecha opcional',
      ar: 'خلفية بيضاء سادة مع خيار شريط الاسم والتاريخ'
    }
  },
  {
    id: 'campus-france',
    portalName: {
      en: 'Campus France (Études en France Pastel Portal)',
      fr: 'Campus France (Dossier Études en France < 50 Ko)',
      es: 'Campus France (Portal Études en France < 50 KB)',
      ar: 'كامبوس فرانس Campus France (ملف الدراسة في فرنسا < 50 كيلوبايت)'
    },
    countryFlag: '🎓',
    dimensionsMm: '35 × 45 mm',
    dimensionsPx: '413 × 531 px (300 DPI)',
    targetKbLabel: '≤ 50 KB Strict',
    targetKbValue: 50,
    presetId: 'schengen-35x45',
    routeSlug: 'campus-france-photo-50ko',
    backgroundSpec: {
      en: 'Plain light or white background, strict 50 KB max',
      fr: 'Fond clair ou blanc uni, maximum 50 Ko obligatoire',
      es: 'Fondo claro o blanco, máximo estricto de 50 KB',
      ar: 'خلفية فاتحة أو بيضاء بحد أقصى 50 كيلوبايت'
    }
  },
  {
    id: 'uk-hmpo-passport',
    portalName: {
      en: 'UK Passport & Visa Photo (HM Passport Office)',
      fr: 'Passeport & Visa Royaume-Uni (UK 35×45 mm)',
      es: 'Pasaporte y Visa Reino Unido (UK 35×45 mm)',
      ar: 'جواز السفر وتأشيرة بريطانيا (UK 35×45 مم)'
    },
    countryFlag: '🇬🇧',
    dimensionsMm: '35 × 45 mm',
    dimensionsPx: '413 × 531 px (300 DPI)',
    targetKbLabel: '≤ 50 KB – 100 KB',
    targetKbValue: 50,
    presetId: 'schengen-35x45',
    routeSlug: 'uk-passport-photo-35x45mm',
    backgroundSpec: {
      en: 'Plain cream, light grey, or white background',
      fr: 'Fond uni clair ou blanc sans ombre',
      es: 'Fondo claro uniforme o blanco sin sombras',
      ar: 'خلفية فاتحة موحدة أو بيضاء بدون ظلال'
    }
  },
  {
    id: 'canada-ircc-visa',
    portalName: {
      en: 'Canada Passport, Visa & PR Photo (IRCC 50×70 mm)',
      fr: 'Passeport, Visa & RP Canada (IRCC 50×70 mm)',
      es: 'Pasaporte y Visa de Canadá (IRCC 50×70 mm)',
      ar: 'جواز سفر وتأشيرة كندا (IRCC مقاس 50×70 مم)'
    },
    countryFlag: '🇨🇦',
    dimensionsMm: '50 × 70 mm',
    dimensionsPx: '591 × 827 px (300 DPI)',
    targetKbLabel: '≤ 100 KB',
    targetKbValue: 100,
    presetId: 'custom',
    routeSlug: 'canada-passport-visa-photo-50x70mm',
    backgroundSpec: {
      en: 'Plain white or light-colored background',
      fr: 'Fond blanc uni ou très clair sans ombre',
      es: 'Fondo blanco liso o claro sin sombras',
      ar: 'خلفية بيضاء سادة وواضحة بدون ظلال'
    }
  },
  {
    id: 'printable-4x6-sheet',
    portalName: {
      en: '4×6 Inch (10×15 cm) Sheet of 8 Passport Photos',
      fr: 'Planche Photo 10×15 cm (4×6") de 8 Photos d’Identité',
      es: 'Hoja Imprimible 10×15 cm (4×6") con 8 Fotos de Pasaporte',
      ar: 'ورقة طباعة 10×15 سم (4×6 بوصة) تضم 8 صور شخصية'
    },
    countryFlag: '🖨️',
    dimensionsMm: '101.6 × 152.4 mm (4×6")',
    dimensionsPx: '1800 × 1200 px (300 DPI)',
    targetKbLabel: '8 Photos + Cut Marks',
    targetKbValue: 50,
    presetId: 'schengen-35x45',
    routeSlug: 'passport-photo-4x6-print-sheet',
    backgroundSpec: {
      en: 'Ready to print at home or pharmacy photo kiosk',
      fr: 'Prêt à imprimer chez soi ou en borne photo',
      es: 'Listo para imprimir en casa o en tienda de fotos',
      ar: 'جاهزة للطباعة المنزليّة أو في استوديو التصوير'
    }
  },
  {
    id: 'wet-ink-signature',
    portalName: {
      en: 'Official Wet-Ink Handwritten Signature Scan',
      fr: 'Signature Manuscrite Scannée (Sans Ombre Papier)',
      es: 'Firma Manuscrita Escaneada (Sin Sombra de Papel)',
      ar: 'توقيع خطي ممسوح ضوئياً (مع إزالة ظل الورق)'
    },
    countryFlag: '✍️',
    dimensionsMm: '47 × 15 mm (Ratio 140×60)',
    dimensionsPx: '560 × 180 px (300 DPI)',
    targetKbLabel: '10 KB – 20 KB Exact',
    targetKbValue: 20,
    presetId: 'wet-ink-sig',
    routeSlug: 'compress-signature-to-20kb',
    backgroundSpec: {
      en: 'Pure white paper (#FFFFFF), dark blue/black ink',
      fr: 'Fond papier blanchi (#FFFFFF), encre noire/bleue',
      es: 'Papel blanco puro (#FFFFFF), tinta negra o azul',
      ar: 'ورق أبيض نقي (#FFFFFF) بحبر أسود أو أزرق'
    }
  },
  {
    id: 'schengen-visa',
    portalName: {
      en: 'Schengen Visa & EU Biometric ID (ICAO Doc 9303)',
      fr: 'Visa Schengen & Passeport UE (Norme ICAO 9303)',
      es: 'Visa Schengen y Pasaporte Europeo (ICAO 9303)',
      ar: 'تأشيرة شنغن وجواز السفر الأوروبي (ICAO 9303)'
    },
    countryFlag: '🇪🇺',
    dimensionsMm: '35 × 45 mm',
    dimensionsPx: '413 × 531 px (300 DPI)',
    targetKbLabel: '≤ 50 KB',
    targetKbValue: 50,
    presetId: 'schengen-35x45',
    routeSlug: 'passport-photo-35x45mm-50kb',
    backgroundSpec: {
      en: 'ICAO 9303 compliant neutral white background',
      fr: 'Conforme OACI 9303, fond neutre ou blanc',
      es: 'Cumple OACI 9303, fondo neutro o blanco',
      ar: 'متوافق مع معيار ICAO 9303 بخلفية بيضاء'
    }
  },
  {
    id: 'exact-pdf-document',
    portalName: {
      en: 'Official ID / Photo to PDF (< 50 KB / 100 KB)',
      fr: 'Photo ou Pièce d’Identité en PDF < 50 Ko / 100 Ko',
      es: 'Foto o Documento en PDF exacto < 50 KB / 100 KB',
      ar: 'تحويل وضغط الصورة إلى ملف PDF أقل من 50 أو 100 كيلوبايت'
    },
    countryFlag: '📄',
    dimensionsMm: '35 × 45 mm / A4 Embed',
    dimensionsPx: '413 × 531 px (300 DPI)',
    targetKbLabel: '≤ 50 KB PDF',
    targetKbValue: 50,
    presetId: 'schengen-35x45',
    routeSlug: 'compress-photo-to-pdf-under-50kb',
    backgroundSpec: {
      en: 'Single-page PDF locked under KB limit',
      fr: 'PDF 1 page verrouillé sous la limite Ko',
      es: 'PDF de 1 página bajo el límite KB',
      ar: 'ملف PDF قياسي بصفحة واحدة تحت سقف الكيلوبايت'
    }
  },
  {
    id: 'amazon-marketplace',
    portalName: {
      en: 'Amazon, Shopify & E-Commerce Main Product Listing',
      fr: 'Photo Produit Amazon & E-Commerce 1000×1000 px',
      es: 'Foto de Producto Amazon y E-Commerce 1000×1000 px',
      ar: 'صورة منتجات أمازون والتجارة الإلكترونية 1000×1000 بكسل'
    },
    countryFlag: '📦',
    dimensionsMm: '84.7 × 84.7 mm',
    dimensionsPx: '1000 × 1000 px (300 DPI)',
    targetKbLabel: '≤ 200 KB',
    targetKbValue: 200,
    presetId: 'amazon-1000',
    routeSlug: 'amazon-1000x1000-white-background-photo',
    backgroundSpec: {
      en: 'Pure RGB(255,255,255) studio white, zoom-ready',
      fr: 'Blanc pur RGB(255,255,255) prêt pour le zoom',
      es: 'Blanco puro RGB(255,255,255) apto para zoom',
      ar: 'خلفية بيضاء نقية RGB(255,255,255) جاهزة للتكبير'
    }
  }
];

export const TOOL_LANDING_PAGES: ToolLandingPageConfig[] = [
  {
    slug: 'compress-photo-to-20kb',
    presetId: 'schengen-35x45',
    targetKb: 20,
    badgeText: {
      en: '20 KB EXACT CEILING · 300 DPI BIOMETRIC LOCK',
      fr: 'LIMITE EXACTE 20 KO · CALIBRATION 300 DPI',
      es: 'LÍMITE EXACTO 20 KB · CALIBRACIÓN 300 DPI',
      ar: 'سقف 20 كيلوبايت دقيق · معايرة 300 DPI'
    },
    title: {
      en: 'Compress Photo to 20KB Online Free (Exact KB & 300 DPI) | CompressPhoto',
      fr: 'Compresser Photo à 20 Ko en Ligne Gratuit (Taille Exacte) | CompressPhoto',
      es: 'Comprimir Foto a 20KB Online Gratis (Tamaño Exacto) | CompressPhoto',
      ar: 'ضغط الصورة إلى 20 كيلوبايت أونلاين مجاناً بدقة عالية | CompressPhoto'
    },
    metaDescription: {
      en: 'Compress any passport photo, ID portrait, or signature to 20KB exact online without losing quality. 100% private in-browser 7-pass binary search compressor.',
      fr: 'Compressez une photo d’identité, passeport ou signature à exactement 20 Ko en ligne sans perte de netteté. Traitement 100% local dans votre navigateur.',
      es: 'Comprime cualquier foto de pasaporte, DNI o firma a 20KB exactos online sin perder nitidez. Procesamiento 100% privado en tu navegador sin subir archivos.',
      ar: 'اضغط أي صورة شخصية أو جواز سفر أو توقيع إلى 20 كيلوبايت بالضبط أونلاين بدون فقدان الجودة. معالجة محلية 100% داخل متصفحك.'
    },
    h1: {
      en: 'Compress Photo to 20KB Online (Exact Byte Lock)',
      fr: 'Compresser une Photo à 20 Ko en Ligne (Sans Perte de Netteté)',
      es: 'Comprimir Foto a 20KB Online (Sin Perder Calidad)',
      ar: 'ضغط الصور إلى 20 كيلوبايت أونلاين (بدقة 300 DPI)'
    },
    subtitle: {
      en: 'Pre-calibrated to lock your JPEG, WebP, or PDF between 18.5 KB and 19.9 KB—guaranteed to pass strict 20KB civil service, visa, and banking portals.',
      fr: 'Pré-calibré pour verrouiller votre photo entre 18,5 Ko et 19,9 Ko — acceptation garantie sur les portails administratifs, concours et banques.',
      es: 'Precalibrado para fijar tu foto entre 18,5 KB y 19,9 KB — aceptación garantizada en portales gubernamentales, exámenes y bancos.',
      ar: 'معاير مسبقاً لتثبيت حجم صورتك بين 18.5 و19.9 كيلوبايت لضمان قبولها الفوري في جميع البوابات الحكومية والامتحانات.'
    },
    directAnswer: {
      en: 'To compress a photo to 20KB without blur, CompressPhoto uses a 7-pass binary search algorithm on HTML5 Canvas at 300 DPI. It strips non-essential EXIF metadata and tunes JPEG quantization tables until the file locks between 18.5 KB and 19.9 KB—100% locally in your browser.',
      fr: 'Pour compresser une photo à 20 Ko sans flou, CompressPhoto utilise un algorithme de recherche binaire en 7 passes à 300 DPI dans votre navigateur. Il supprime les métadonnées EXIF inutiles et ajuste la quantification JPEG pour stabiliser le fichier entre 18,5 Ko et 19,9 Ko, sans aucun envoi sur serveur.',
      es: 'Para comprimir una foto a 20KB sin desenfoque, CompressPhoto ejecuta una búsqueda binaria de 7 pasadas a 300 DPI en tu navegador. Elimina metadatos EXIF innecesarios y ajusta la cuantización JPEG hasta fijar el archivo entre 18,5 KB y 19,9 KB con privacidad total.',
      ar: 'لضغط صورة إلى 20 كيلوبايت بدون تشويش، يستخدم CompressPhoto خوارزمية بحث ثنائي من 7 مراحل بدقة 300 DPI داخل متصفحك، حيث يزيل بيانات EXIF الزائدة ويضبط ضغط JPEG لتثبيت الحجم بين 18.5 و19.9 كيلوبايت محلياً.'
    },
    portalSpecs: {
      dimensionsMm: '35 × 45 mm',
      dimensionsPx: '413 × 531 px (300 DPI)',
      maxKb: '≤ 20.0 KB (18.5–19.9 KB)',
      background: 'Pure White (#FFFFFF)',
      standardCode: 'SSC / UPSC / IBPS / Civil Portals'
    },
    specificFaqs: {
      en: [
        {
          question: 'How do I compress a JPEG photo to under 20KB without making it blurry?',
          answer: 'Upload your image above with the 20KB target pre-selected. Instead of shrinking pixel dimensions to a tiny thumbnail, our engine keeps official 35×45mm (413×531 px) resolution and binary-searches the exact JPEG quality factor that lands just under 20.0 KB.'
        },
        {
          question: 'Why do government portals reject photos that are 20.1 KB or under 10 KB?',
          answer: 'Automated portal validators check strict byte boundaries (typically 10,240 to 20,480 bytes). CompressPhoto locks your output between 18.5 KB and 19.9 KB so it passes both minimum and maximum byte thresholds on the first attempt.'
        },
        {
          question: 'Is my ID photo uploaded to any server when compressing to 20KB?',
          answer: 'No. 100% of the decoding, cropping, and 20KB binary search runs locally inside your device RAM via HTML5 Canvas. Your personal photos never leave your browser.'
        }
      ],
      fr: [
        {
          question: 'Comment réduire une photo à 20 Ko sans qu’elle devienne floue ?',
          answer: 'Importez votre photo ci-dessus : la cible 20 Ko est déjà activée. Plutôt que de réduire l’image en miniature illisible, notre moteur conserve la résolution biométrique (413×531 px) et ajuste par recherche binaire la table JPEG pour atteindre entre 18,5 Ko et 19,9 Ko.'
        },
        {
          question: 'Pourquoi les portails refusent-ils une photo de 20,2 Ko ?',
          answer: 'Les formulaires administratifs vérifient la taille exacte en octets (max 20 480 octets). Notre outil verrouille systématiquement le fichier juste sous la barre des 20,0 Ko.'
        },
        {
          question: 'Mes photos d’identité sont-elles envoyées sur un serveur ?',
          answer: 'Jamais. Tout le traitement s’effectue 100 % localement dans la mémoire vive de votre navigateur (conforme RGPD).'
        }
      ],
      es: [
        {
          question: '¿Cómo comprimir una foto a 20KB sin que pierda nitidez?',
          answer: 'Sube tu foto arriba con el objetivo de 20KB preseleccionado. Nuestro motor mantiene la resolución biométrica de 413×531 píxeles y ajusta mediante búsqueda binaria la compresión JPEG para quedar entre 18,5 KB y 19,9 KB.'
        },
        {
          question: '¿Se sube mi foto de identidad a algún servidor?',
          answer: 'No. El 100% del procesamiento ocurre localmente en la memoria de tu navegador.'
        }
      ],
      ar: [
        {
          question: 'كيف أضغط صورة إلى 20 كيلوبايت دون فقدان الوضوح؟',
          answer: 'ارفع صورتك في الأعلى حيث تم ضبط الهدف مسبقاً على 20 كيلوبايت. يحافظ المحرك على أبعاد 413×531 بكسل ويضبط جودة JPEG عبر البحث الثنائي لتثبيت الحجم بين 18.5 و19.9 كيلوبايت.'
        },
        {
          question: 'هل يتم رفع صوري الشخصية إلى أي خادم؟',
          answer: 'لا إطلاقاً. تتم جميع عمليات المعالجة محلياً بنسبة 100% داخل متصفحك.'
        }
      ]
    }
  },
  {
    slug: 'compress-photo-to-50kb',
    presetId: 'schengen-35x45',
    targetKb: 50,
    badgeText: {
      en: '50 KB EXACT CEILING · PASSPORT & VISA STANDARD',
      fr: 'LIMITE EXACTE 50 KO · NORME PASSEPORT & ANTS',
      es: 'LÍMITE EXACTO 50 KB · ESTÁNDAR PASAPORTE Y VISA',
      ar: 'سقف 50 كيلوبايت دقيق · معيار جواز السفر والتأشيرة'
    },
    title: {
      en: 'Compress Photo to 50KB Online Free (Passport & Visa 300 DPI) | CompressPhoto',
      fr: 'Compresser Photo à 50 Ko en Ligne Gratuit (Passeport, ANTS, CNIE) | CompressPhoto',
      es: 'Comprimir Foto a 50KB Online Gratis (Pasaporte y Visa) | CompressPhoto',
      ar: 'ضغط الصورة إلى 50 كيلوبايت أونلاين مجاناً (جواز السفر والتأشيرة) | CompressPhoto'
    },
    metaDescription: {
      en: 'Compress passport, Schengen visa, France ANTS, and Morocco CNIE photos to 50KB exact online at 300 DPI. 100% client-side privacy with instant JPG & PDF download.',
      fr: 'Compressez vos photos de passeport, ANTS, CNIE Maroc et visa Schengen à exactement 50 Ko en ligne à 300 DPI. 100% privé dans votre navigateur sans serveur.',
      es: 'Comprime fotos de pasaporte, visa Schengen y DNI a 50KB exactos online a 300 DPI. Procesamiento 100% local en tu navegador con exportación JPG y PDF.',
      ar: 'اضغط صور جواز السفر وتأشيرة شنغن وبطاقة CNIE إلى 50 كيلوبايت بالضبط أونلاين بدقة 300 DPI. خصوصية تامة 100% داخل متصفحك.'
    },
    h1: {
      en: 'Compress Photo to 50KB Online (Passport & Visa Ready)',
      fr: 'Compresser une Photo à 50 Ko en Ligne (Norme Passeport, ANTS & CNIE)',
      es: 'Comprimir Foto a 50KB Online (Estándar Pasaporte y Visa)',
      ar: 'ضغط الصور إلى 50 كيلوبايت أونلاين (مقاس جواز السفر والتأشيرة)'
    },
    subtitle: {
      en: 'Pre-set to 50 KB and 35×45 mm (413×531 px @ 300 DPI)—the global standard for France ANTS, Morocco CNIE, Schengen Visas, and university portals.',
      fr: 'Pré-réglé sur 50 Ko et 35×45 mm (413×531 px à 300 DPI) — le format exact exigé par l’ANTS, la CNIE Maroc, les visas Schengen et Parcoursup.',
      es: 'Preconfigurado en 50 KB y 35×45 mm (413×531 px a 300 DPI) — el estándar oficial para visados Schengen, pasaportes y portales académicos.',
      ar: 'مضبوط مسبقاً على 50 كيلوبايت ومقاس 35×45 مم (413×531 بكسل بدقة 300 DPI) المتوافق مع بوابات التأشيرات وجوازات السفر.'
    },
    directAnswer: {
      en: 'Compressing a photo to 50KB at 35×45 mm (413×531 pixels, 300 DPI) provides the ideal balance of razor-sharp facial biometrics and compact file size required by Schengen visa portals, France ANTS, Morocco CNIE, and civil service applications.',
      fr: 'Compresser une photo à 50 Ko au format 35×45 mm (413×531 pixels à 300 DPI) garantit une netteté biométrique parfaite tout en respectant le plafond strict de 50 Ko imposé par les portails ANTS, CNIE Maroc et les demandes de visa Schengen.',
      es: 'Comprimir una foto a 50KB en formato 35×45 mm (413×531 píxeles a 300 DPI) ofrece el equilibrio exacto entre nitidez biométrica y peso reducido exigido en trámites de visa Schengen y pasaportes.',
      ar: 'يضمن ضغط الصورة إلى 50 كيلوبايت بمقاس 35×45 مم (413×531 بكسل، 300 DPI) أعلى درجات الوضوح البيومتري للوجه مع الالتزام بالحد الأقصى المطلوب في بوابات التأشيرات.'
    },
    portalSpecs: {
      dimensionsMm: '35 × 45 mm',
      dimensionsPx: '413 × 531 px (300 DPI)',
      maxKb: '≤ 50.0 KB (46–49.8 KB)',
      background: 'Pure White / Light Neutral',
      standardCode: 'ICAO Doc 9303 · ISO/IEC 19794-5'
    },
    specificFaqs: {
      en: [
        {
          question: 'Does compressing a photo to 50KB reduce its 300 DPI print resolution?',
          answer: 'No. At 413×531 pixels (35×45 mm at 300 DPI), a 50KB JPEG retains near-lossless facial detail and smooth skin gradients while staying strictly below the 51,200-byte portal limit.'
        },
        {
          question: 'Can I also download my 50KB photo as a PDF file?',
          answer: 'Yes. Click the "Download PDF (≤ 50 KB)" button below the preview to save your calibrated photo as a ready-to-upload PDF locked under 50 KB.'
        }
      ],
      fr: [
        {
          question: 'Comment mettre une photo d’identité à moins de 50 Ko pour l’ANTS ou la CNIE ?',
          answer: 'Glissez simplement votre photo ci-dessus : l’outil la recadre automatiquement en 35×45 mm (413×531 px à 300 DPI) et verrouille son poids entre 46 Ko et 49,8 Ko.'
        },
        {
          question: 'Puis-je télécharger le résultat en JPG et en PDF sous 50 Ko ?',
          answer: 'Oui, vous pouvez télécharger instantanément l’image en JPG haute netteté ou en document PDF certifié inférieur à 50 Ko.'
        }
      ],
      es: [
        {
          question: '¿Cómo reducir una foto carnet a menos de 50KB?',
          answer: 'Sube tu foto arriba: la herramienta aplica automáticamente el formato 35×45 mm (413×531 px) y bloquea el peso justo por debajo de 50 KB.'
        }
      ],
      ar: [
        {
          question: 'كيف أضغط صورة جواز السفر إلى أقل من 50 كيلوبايت؟',
          answer: 'ارفع صورتك أعلاه وسيقوم المحرك تلقائياً بضبط المقاس على 35×45 مم (413×531 بكسل) وتثبيت الحجم تحت 50 كيلوبايت.'
        }
      ]
    }
  },
  {
    slug: 'compress-photo-to-100kb',
    presetId: 'us-visa-2x2',
    targetKb: 100,
    badgeText: {
      en: '100 KB EXACT CEILING · HIGH-DEFINITION 300 DPI',
      fr: 'LIMITE EXACTE 100 KO · HAUTE DÉFINITION 300 DPI',
      es: 'LÍMITE EXACTO 100 KB · ALTA DEFINICIÓN 300 DPI',
      ar: 'سقف 100 كيلوبايت دقيق · دقة عالية 300 DPI'
    },
    title: {
      en: 'Compress Photo to 100KB Online Free (No Quality Loss) | CompressPhoto',
      fr: 'Compresser Photo à 100 Ko en Ligne Gratuit (Haute Qualité) | CompressPhoto',
      es: 'Comprimir Foto a 100KB Online Gratis (Sin Perder Calidad) | CompressPhoto',
      ar: 'ضغط الصورة إلى 100 كيلوبايت أونلاين مجاناً بدون فقدان الجودة | CompressPhoto'
    },
    metaDescription: {
      en: 'Compress photos, US visa 600x600 portraits, and scanned IDs to 100KB exact online without losing sharpness. 100% browser-local JPEG, WebP & PDF compressor.',
      fr: 'Compressez vos photos, visas US 600x600 et documents scannés à exactement 100 Ko en ligne sans perte de qualité. Traitement 100% local dans le navigateur.',
      es: 'Comprime fotos, retratos de visa 600x600 y documentos a 100KB exactos online sin perder nitidez. Compresor 100% privado en tu navegador.',
      ar: 'اضغط الصور ووثائق التأشيرة بمقاس 600×600 إلى 100 كيلوبايت بالضبط أونلاين دون فقدان الحدة. معالجة محلية 100%.'
    },
    h1: {
      en: 'Compress Photo to 100KB Online (Zero Visual Loss)',
      fr: 'Compresser une Photo à 100 Ko en Ligne (Qualité Studio 300 DPI)',
      es: 'Comprimir Foto a 100KB Online (Calidad de Estudio 300 DPI)',
      ar: 'ضغط الصور إلى 100 كيلوبايت أونلاين (جودة استوديو 300 DPI)'
    },
    subtitle: {
      en: 'Ideal for US Visa DS-160 (600×600 px), Green Card DV Lottery, international university admissions, and high-clarity PDF document uploads.',
      fr: 'Idéal pour les visas américains DS-160 (600×600 px), la Green Card DV Lottery, Campus France et les dossiers administratifs haute définition.',
      es: 'Ideal para visas de EE.UU. DS-160 (600×600 px), Lotería DV, admisiones universitarias y documentos PDF de alta nitidez.',
      ar: 'مثالي لتأشيرة أمريكا DS-160 (600×600 بكسل) واللوتري DV Lottery والقبول الجامعي الدولي.'
    },
    directAnswer: {
      en: 'Compressing an image to 100KB preserves virtually 100% of perceptual sharpness for 600×600 px (2×2 inch) and 413×531 px (35×45 mm) portraits while reducing multi-megabyte smartphone camera files by over 95%.',
      fr: 'Compresser une image à 100 Ko préserve la quasi-totalité de la finesse visuelle pour les portraits 600×600 px (2×2 pouces) et 413×531 px (35×45 mm), tout en réduisant de 95 % le poids des photos issues d’un smartphone.',
      es: 'Comprimir una imagen a 100KB conserva prácticamente el 100% de la nitidez visual en retratos de 600×600 px y 413×531 px, reduciendo en un 95% el tamaño original de cámara.',
      ar: 'يحافظ ضغط الصورة إلى 100 كيلوبايت على كامل تفاصيل وحدّة الصورة لمقاسات 600×600 و413×531 بكسل مع تقليل حجم صور الهاتف بنسبة 95%.'
    },
    portalSpecs: {
      dimensionsMm: '51 × 51 mm (2×2") or 35 × 45 mm',
      dimensionsPx: '600 × 600 px (300 DPI)',
      maxKb: '≤ 100.0 KB (94–99.8 KB)',
      background: 'Pure White (#FFFFFF)',
      standardCode: 'US DOS DS-160 · USCIS · Global Portals'
    },
    specificFaqs: {
      en: [
        {
          question: 'How do I reduce a 5MB iPhone or Android photo to 100KB?',
          answer: 'Drop your smartphone photo above. Our client-side engine resamples the image to 300 DPI biometric dimensions, normalizes the color profile to sRGB, and binary-searches the JPEG quality to lock right under 100.0 KB.'
        }
      ],
      fr: [
        {
          question: 'Comment passer une photo de smartphone de 4 Mo à 100 Ko sans la pixelliser ?',
          answer: 'Importez votre photo ci-dessus : notre moteur recalibre la résolution à 300 DPI en profil sRGB et ajuste la compression en 7 passes pour atteindre entre 94 Ko et 99,8 Ko.'
        }
      ],
      es: [
        {
          question: '¿Cómo reducir una foto de móvil de 4MB a 100KB?',
          answer: 'Sube tu imagen arriba: nuestro motor ajusta la resolución a 300 DPI y bloquea el peso entre 94 KB y 99,8 KB sin pixelar el rostro.'
        }
      ],
      ar: [
        {
          question: 'كيف أحول صورة هاتف بحجم 4 ميجابايت إلى 100 كيلوبايت؟',
          answer: 'ارفع الصورة أعلاه ليقوم المحرك بمعايرتها بدقة 300 DPI وتثبيت الحجم تحت 100 كيلوبايت مباشرة.'
        }
      ]
    }
  },
  {
    slug: 'compress-photo-to-200kb',
    presetId: 'amazon-1000',
    targetKb: 200,
    badgeText: {
      en: '200 KB EXACT CEILING · HIGH-RES PORTAL & E-COMMERCE',
      fr: 'LIMITE EXACTE 200 KO · HAUTE RÉSOLUTION & E-COMMERCE',
      es: 'LÍMITE EXACTO 200 KB · ALTA RESOLUCIÓN Y E-COMMERCE',
      ar: 'سقف 200 كيلوبايت دقيق · دقة فائقة وتجارة إلكترونية'
    },
    title: {
      en: 'Compress Photo to 200KB Online Free (High Resolution) | CompressPhoto',
      fr: 'Compresser Photo à 200 Ko en Ligne Gratuit (Haute Résolution) | CompressPhoto',
      es: 'Comprimir Foto a 200KB Online Gratis (Alta Resolución) | CompressPhoto',
      ar: 'ضغط الصورة إلى 200 كيلوبايت أونلاين مجاناً بدقة فائقة | CompressPhoto'
    },
    metaDescription: {
      en: 'Compress high-resolution photos, visa portraits, and 1000x1000 e-commerce product images to 200KB exact online. 100% private in-browser engine.',
      fr: 'Compressez vos photos haute résolution, visas et images produits 1000x1000 à exactement 200 Ko en ligne. Traitement 100% local dans votre navigateur.',
      es: 'Comprime fotos de alta resolución, visas e imágenes de producto 1000x1000 a 200KB exactos online en tu navegador.',
      ar: 'اضغط الصور عالية الدقة وصور المنتجات 1000×1000 إلى 200 كيلوبايت بالضبط أونلاين محلياً.'
    },
    h1: {
      en: 'Compress Photo to 200KB Online (High-Resolution Lock)',
      fr: 'Compresser une Photo à 200 Ko en Ligne (Haute Résolution)',
      es: 'Comprimir Foto a 200KB Online (Alta Resolución)',
      ar: 'ضغط الصور إلى 200 كيلوبايت أونلاين (دقة فائقة)'
    },
    subtitle: {
      en: 'Designed for US DS-160 (< 240 KB ceiling), full-page document scans, and 1000×1000 px e-commerce studio images.',
      fr: 'Conçu pour les portails acceptant jusqu’à 200–240 Ko (Visa US DS-160, scans de documents et photos produits 1000×1000 px).',
      es: 'Diseñado para portales con límite de 200–240 KB (Visa EE.UU. DS-160, documentos y fotos de producto 1000×1000 px).',
      ar: 'مصمم للبوابات التي تقبل حتى 200–240 كيلوبايت مثل تأشيرة أمريكا وصور المنتجات عالية الدقة.'
    },
    directAnswer: {
      en: 'A 200KB ceiling allows full 1000×1000 px or 600×600 px studio-grade images to load instantaneously on web portals and pass the US Department of State 240KB maximum limit with a safe margin.',
      fr: 'Un plafond de 200 Ko permet de conserver une résolution de 1000×1000 px ou 600×600 px avec une qualité maximale tout en passant sous la limite stricte de 240 Ko du Département d’État américain.',
      es: 'Un límite de 200KB permite conservar resoluciones de 1000×1000 px o 600×600 px con calidad de estudio cumpliendo holgadamente el tope de 240KB.',
      ar: 'يتيح سقف 200 كيلوبايت الحفاظ على أبعاد 1000×1000 أو 600×600 بكسل بجودة استوديو فائقة مع ضمان القبول في البوابات الرسمية.'
    },
    portalSpecs: {
      dimensionsMm: '84.7 × 84.7 mm / Custom',
      dimensionsPx: '1000 × 1000 px (300 DPI)',
      maxKb: '≤ 200.0 KB',
      background: 'Pure White RGB(255,255,255)',
      standardCode: 'US DOS ≤ 240KB · E-Commerce sRGB'
    },
    specificFaqs: {
      en: [
        {
          question: 'Can I keep custom pixel dimensions while compressing to 200KB?',
          answer: 'Yes. Select "Custom Size" in Step 1 to enter any width and height in pixels while keeping the 200KB byte ceiling locked.'
        }
      ],
      fr: [
        {
          question: 'Puis-je choisir mes propres dimensions en pixels pour 200 Ko ?',
          answer: 'Oui, sélectionnez « Taille Personnalisée » à l’Étape 1 pour définir votre largeur et hauteur tout en verrouillant le poids sous 200 Ko.'
        }
      ],
      es: [
        {
          question: '¿Puedo mantener dimensiones personalizadas al comprimir a 200KB?',
          answer: 'Sí, selecciona "Tamaño Personalizado" en el Paso 1 para definir cualquier ancho y alto bajo el límite de 200KB.'
        }
      ],
      ar: [
        {
          question: 'هل يمكنني تحديد أبعاد مخصصة بالبكسل مع تثبيت الحجم عند 200 كيلوبايت؟',
          answer: 'نعم، اختر المقاس المخصص في الخطوة الأولى وأدخل العرض والارتفاع المطلوبين.'
        }
      ]
    }
  },
  {
    slug: 'compress-signature-to-20kb',
    presetId: 'wet-ink-sig',
    targetKb: 20,
    badgeText: {
      en: 'SIGNATURE < 20 KB · SHADOW REMOVAL & INK BOOST',
      fr: 'SIGNATURE < 20 KO · SUPPRESSION D’OMBRE PAPIER',
      es: 'FIRMA < 20 KB · ELIMINACIÓN DE SOMBRA DE PAPEL',
      ar: 'توقيع خطي أقل من 20 كيلوبايت · إزالة ظل الورق'
    },
    title: {
      en: 'Compress Signature to 20KB & Remove Paper Shadow Online | CompressPhoto',
      fr: 'Compresser Signature Manuscrite à 20 Ko & Blanchir le Fond | CompressPhoto',
      es: 'Comprimir Firma a 20KB y Quitar Sombra de Papel Online | CompressPhoto',
      ar: 'ضغط التوقيع الخطي إلى 20 كيلوبايت وإزالة ظل الورق أونلاين | CompressPhoto'
    },
    metaDescription: {
      en: 'Resize and compress handwritten wet-ink signatures to 10KB–20KB (140x60 / 560x180 px). Automatically removes grey phone camera paper shadows in your browser.',
      fr: 'Compressez votre signature manuscrite entre 10 Ko et 20 Ko (560x180 px) et supprimez automatiquement l’ombre grise du papier photographié au smartphone.',
      es: 'Comprime tu firma manuscrita entre 10KB y 20KB (560x180 px) y elimina automáticamente la sombra gris del papel fotografiado con el móvil.',
      ar: 'اضغط صورة التوقيع الخطي إلى أقل من 20 كيلوبايت (560×180 بكسل) مع إزالة ظل الورق الرمادي تلقائياً وتحويل الخلفية إلى أبيض نقي.'
    },
    h1: {
      en: 'Compress Handwritten Signature to 20KB (With Shadow Removal)',
      fr: 'Compresser une Signature Manuscrite à 20 Ko (Suppression d’Ombre Papier)',
      es: 'Comprimir Firma Manuscrita a 20KB (Con Limpieza de Fondo Blanco)',
      ar: 'ضغط التوقيع الخطي إلى 20 كيلوبايت (مع تبييض الخلفية وإزالة الظل)'
    },
    subtitle: {
      en: 'Automatically converts grey smartphone photos of paper signatures into crisp fountain-pen strokes on pure #FFFFFF white locked under 20.0 KB.',
      fr: 'Transforme une photo de signature prise au téléphone en un tracé net sur fond blanc pur (#FFFFFF) verrouillé sous 20,0 Ko.',
      es: 'Convierte una foto de firma tomada con el móvil en un trazo nítido sobre fondo blanco puro (#FFFFFF) por debajo de 20,0 KB.',
      ar: 'يحول صورة التوقيع الملتقطة بالهاتف إلى خط حبر واضح على خلفية بيضاء نقية (#FFFFFF) بحجم أقل من 20 كيلوبايت.'
    },
    directAnswer: {
      en: 'When you photograph a signature on paper with a smartphone, indoor lighting turns the paper grey—causing portal OCR rejection and bloated JPEG files. CompressPhoto applies adaptive luminance thresholding to turn paper #FFFFFF white while boosting ink contrast under 20 KB.',
      fr: 'Lorsqu’on photographie une signature sur papier avec un smartphone, l’éclairage crée un fond grisâtre qui fait échouer la validation OCR et alourdit le fichier JPEG. CompressPhoto applique un seuillage adaptatif de luminance qui blanchit le papier en #FFFFFF et compresse le tracé sous 20 Ko.',
      es: 'Al fotografiar una firma en papel con el móvil, la luz interior vuelve gris el papel y provoca rechazos en los portales. CompressPhoto aplica un umbral adaptativo de luminancia que convierte el papel en blanco puro #FFFFFF bajo 20 KB.',
      ar: 'عند تصوير التوقيع بالهاتف يظهر ظل رمادي على الورقة يسبب رفض الملف. يقوم CompressPhoto بتطبيق فلتر إضاءة ذكي لتحويل الورقة إلى أبيض نقي #FFFFFF وتثبيت الحجم تحت 20 كيلوبايت.'
    },
    portalSpecs: {
      dimensionsMm: '47 × 15 mm (140×60 ratio)',
      dimensionsPx: '560 × 180 px (300 DPI)',
      maxKb: '10.0 KB – 20.0 KB Exact',
      background: 'Shadow-Cleansed #FFFFFF White',
      standardCode: 'SSC / UPSC / IBPS / Banking OCR'
    },
    specificFaqs: {
      en: [
        {
          question: 'How do I remove the grey shadow from a photographed signature?',
          answer: 'On this page, the Wet-Ink Signature Cleanser is automatically enabled. It detects paper background luminance and converts it to pure #FFFFFF white while keeping your pen strokes sharp.'
        },
        {
          question: 'Can I compress my signature to between 10KB and 20KB?',
          answer: 'Yes. With the 20KB ceiling selected, the binary-search encoder locks your 560×180 px signature between 14 KB and 19.8 KB—right inside the 10KB–20KB window.'
        }
      ],
      fr: [
        {
          question: 'Comment enlever le fond gris d’une signature prise en photo ?',
          answer: 'Sur cette page, le mode « Signature Manuscrite » est pré-activé : il blanchit automatiquement le papier en #FFFFFF et renforce le contraste du stylo noir ou bleu.'
        }
      ],
      es: [
        {
          question: '¿Cómo quitar el fondo gris de una firma fotografiada con el celular?',
          answer: 'En esta página el limpiador de firma está activado por defecto: convierte el fondo de papel gris en blanco puro #FFFFFF y mantiene el trazo nítido bajo 20KB.'
        }
      ],
      ar: [
        {
          question: 'كيف أزيل الظل الرمادي من صورة التوقيع المصورة بالهاتف؟',
          answer: 'في هذه الصفحة يتم تفعيل فلتر تنظيف التوقيع تلقائياً لتحويل خلفية الورقة إلى أبيض نقي وتوضيح خط القلم تحت 20 كيلوبايت.'
        }
      ]
    }
  },
  {
    slug: 'ants-photo-identite-50ko',
    presetId: 'schengen-35x45',
    targetKb: 50,
    badgeText: {
      en: 'FRANCE ANTS OFFICIAL SPEC · 35×45 MM · ≤ 50 KB',
      fr: 'NORME OFFICIELLE ANTS FRANCE · 35×45 MM · ≤ 50 KO',
      es: 'NORMA OFICIAL ANTS FRANCIA · 35×45 MM · ≤ 50 KB',
      ar: 'المعيار الرسمي ANTS فرنسا · 35×45 مم · ≤ 50 كيلوبايت'
    },
    title: {
      en: 'France ANTS ID & Passport Photo Compressor (35x45mm 50KB) | CompressPhoto',
      fr: 'Photo d’Identité ANTS 35x45mm 50 Ko en Ligne (Passeport, CNI, Permis) | CompressPhoto',
      es: 'Foto de Identidad ANTS Francia 35x45mm 50KB Online | CompressPhoto',
      ar: 'ضغط صورة الهوية وجواز السفر الفرنسي ANTS مقاس 35×45 مم 50 كيلوبايت | CompressPhoto'
    },
    metaDescription: {
      en: 'Format and compress your France ANTS photo to 35x45mm (413x531 px at 300 DPI) and under 50KB online. 100% private in-browser tool for Passeport, CNI, Permis & ANEF.',
      fr: 'Redimensionnez et compressez votre photo d’identité ANTS / ANEF au format officiel 35x45 mm (413x531 px à 300 DPI) et moins de 50 Ko en ligne. 100% privé et gratuit.',
      es: 'Ajusta y comprime tu foto de identidad ANTS Francia al formato oficial 35x45 mm (413x531 px) y menos de 50 KB online.',
      ar: 'اضبط واضغط صورة الهوية الفرنسية ANTS بمقاس 35×45 مم (413×531 بكسل) وأقل من 50 كيلوبايت أونلاين مجاناً.'
    },
    h1: {
      en: 'France ANTS & ANEF Photo Compressor (35×45 mm · ≤ 50 KB)',
      fr: 'Photo d’Identité ANTS & ANEF : Format 35×45 mm et Compression 50 Ko',
      es: 'Compresor de Foto ANTS Francia (35×45 mm · ≤ 50 KB)',
      ar: 'ضبط وضغط صورة الهوية الفرنسية ANTS (35×45 مم · 50 كيلوبايت)'
    },
    subtitle: {
      en: 'Pre-configured to ISO/IEC 19794-5 French biometric requirements: 35×45 mm (413×531 px @ 300 DPI) locked under 50 KB for ANTS, ANEF Titre de Séjour, and Campus France.',
      fr: 'Pré-configuré selon la norme biométrique française ISO/IEC 19794-5 : 35×45 mm (413×531 px à 300 DPI) verrouillé sous 50 Ko pour pré-demande ANTS, ANEF Titre de Séjour et Campus France.',
      es: 'Preconfigurado según la norma biométrica francesa: 35×45 mm (413×531 px a 300 DPI) bajo 50 KB para ANTS, ANEF y Campus France.',
      ar: 'معاير مسبقاً وفق المواصفات البيومترية الفرنسية 35×45 مم (413×531 بكسل) وأقل من 50 كيلوبايت لبوابات ANTS وANEF وCampus France.'
    },
    directAnswer: {
      en: 'For French administrative portals (ANTS, ANEF étrangers en France, Campus France, Service-Public), digital ID photos must measure 35×45 mm (413×531 pixels at 300 DPI) in sRGB JPEG format and weigh under 50 KB to avoid upload timeout or dimension errors.',
      fr: 'Pour les téléservices administratifs français (ANTS, ANEF étrangers en France, Campus France, Parcoursup), la photo d’identité numérique doit mesurer 35×45 mm (soit 413×531 pixels à 300 DPI) au format JPEG sRGB et peser moins de 50 Ko pour être validée sans erreur.',
      es: 'Para los portales administrativos franceses (ANTS, ANEF, Campus France), la foto digital debe medir 35×45 mm (413×531 píxeles a 300 DPI) en formato JPEG sRGB y pesar menos de 50 KB.',
      ar: 'تتطلب البوابات الحكومية الفرنسية (ANTS وANEF وCampus France) صورة شخصية بمقاس 35×45 مم (413×531 بكسل بدقة 300 DPI) بصيغة JPEG وحجم أقل من 50 كيلوبايت.'
    },
    portalSpecs: {
      dimensionsMm: '35 × 45 mm',
      dimensionsPx: '413 × 531 px (300 DPI)',
      maxKb: '≤ 50.0 KB',
      background: 'Plain Light / Pure White',
      standardCode: 'France ANTS / ANEF · ISO/IEC 19794-5'
    },
    specificFaqs: {
      en: [
        {
          question: 'What are the exact pixel dimensions for a 35x45mm French ANTS photo?',
          answer: 'At the official 300 DPI print density, 35×45 mm equals exactly 413 pixels wide by 531 pixels high.'
        },
        {
          question: 'Can I also generate a 4x6 inch (10x15 cm) sheet of 8 photos for printing at a pharmacy or photo booth?',
          answer: 'Yes! Click "Printable 4×6 Sheet (8 Photos)" below the preview to download a 10×15 cm sheet with 8 calibrated 35×45 mm photos and crop marks.'
        }
      ],
      fr: [
        {
          question: 'Quelle est la taille exacte en pixels d’une photo d’identité 35x45 mm pour l’ANTS ou l’ANEF ?',
          answer: 'À la résolution officielle de 300 DPI, le format 35×45 mm correspond exactement à 413 pixels de largeur sur 531 pixels de hauteur.'
        },
        {
          question: 'Pourquoi ma photo est-elle refusée sur le site de l’ANEF ou Campus France ?',
          answer: 'Les rejets proviennent généralement d’un fichier trop lourd (> 50 Ko ou > 500 Ko selon le formulaire), d’un format HEIC (iPhone) non supporté, ou d’un ratio différent de 35×45 mm. Notre outil convertit automatiquement votre photo en JPEG sRGB 413×531 px sous 50 Ko.'
        },
        {
          question: 'Puis-je imprimer une planche de 8 photos 35×45 mm sur papier 10×15 cm ?',
          answer: 'Oui, cliquez sur le bouton « Planche 4×6" (8 Photos) » sous l’aperçu pour générer gratuitement une planche 10×15 cm prête à imprimer.'
        }
      ],
      es: [
        {
          question: '¿Cuál es el tamaño en píxeles de una foto 35x45 mm para ANTS Francia?',
          answer: 'A 300 DPI, 35×45 mm equivale exactamente a 413 × 531 píxeles.'
        }
      ],
      ar: [
        {
          question: 'ما هو مقاس البكسل الدقيق لصورة 35×45 مم الخاصة ببوابة ANTS الفرنسية؟',
          answer: 'عند دقة 300 DPI، يعادل مقاس 35×45 مم بالضبط 413 بكسل عرضاً في 531 بكسل ارتفاعاً.'
        }
      ]
    }
  },
  {
    slug: 'photo-cnie-maroc-35x45mm',
    presetId: 'schengen-35x45',
    targetKb: 50,
    badgeText: {
      en: 'MOROCCO CNIE & PASSPORT · 35×45 MM · ≤ 50 KB',
      fr: 'MAROC CNIE, PASSEPORT & CONCOURS · 35×45 MM · ≤ 50 KO',
      es: 'MARRUECOS CNIE Y PASAPORTE · 35×45 MM · ≤ 50 KB',
      ar: 'المغرب البطاقة الوطنية CNIE وجواز السفر · 35×45 مم · 50 كيلوبايت'
    },
    title: {
      en: 'Morocco CNIE & Passport Photo Size (35x45mm 50KB Online) | CompressPhoto',
      fr: 'Photo CNIE Maroc & Passeport Biométrique 35x45mm (50 Ko en Ligne) | CompressPhoto',
      es: 'Foto CNIE Marruecos y Pasaporte 35x45mm (50KB Online) | CompressPhoto',
      ar: 'مقاس وضغط صورة البطاقة الوطنية المغربية CNIE وجواز السفر 35×45 مم | CompressPhoto'
    },
    metaDescription: {
      en: 'Resize and compress your Morocco CNIE ID card, biometric passport, or Massar/emploi-public photo to 35x45mm (413x531 px) and under 50KB online.',
      fr: 'Calibrez et compressez votre photo pour la CNIE Maroc (cnie.ma), le passeport biométrique, Massar ou les concours publics au format 35x45 mm et moins de 50 Ko.',
      es: 'Ajusta y comprime tu foto para la CNIE de Marruecos y pasaporte biométrico a 35x45 mm (413x531 px) y menos de 50 KB online.',
      ar: 'اضبط واضغط صورة البطاقة الوطنية للتعريف الإلكترونية المغربية CNIE وجواز السفر البيومتري ومنصة مسار ومباريات التوظيف بمقاس 35×45 مم وأقل من 50 كيلوبايت.'
    },
    h1: {
      en: 'Morocco CNIE & Biometric Passport Photo Tool (35×45 mm · ≤ 50 KB)',
      fr: 'Photo CNIE Maroc, Passeport & Concours : Format 35×45 mm et 50 Ko',
      es: 'Foto CNIE Marruecos y Pasaporte (35×45 mm · ≤ 50 KB)',
      ar: 'ضبط وضغط صورة البطاقة الوطنية المغربية CNIE وجواز السفر (35×45 مم · 50 كيلوبايت)'
    },
    subtitle: {
      en: 'Calibrated for cnie.ma pre-registration, passeport.ma, Massar, Cursussup, and Moroccan civil service portals (413×531 px @ 300 DPI, ≤ 50 KB).',
      fr: 'Calibré pour la pré-demande cnie.ma, passeport.ma, Massar, Tawjihi/Cursussup et les portails de concours au Maroc (413×531 px à 300 DPI, ≤ 50 Ko).',
      es: 'Calibrado para preinscripción cnie.ma, passeport.ma y portales oficiales de Marruecos (413×531 px a 300 DPI, ≤ 50 KB).',
      ar: 'معاير خصيصاً لبوابة البطاقة الوطنية cnie.ma وجواز السفر البيومتري passeport.ma ومنصة مسار ومباريات الوظيفة العمومية (413×531 بكسل، أقل من 50 كيلوبايت).'
    },
    directAnswer: {
      en: 'Official Moroccan biometric documents (CNIE electronic ID card and biometric passport) and e-government portals require a 35×45 mm portrait (413×531 pixels at 300 DPI) on a clean light/white background compressed under 50 KB in JPEG or PDF format.',
      fr: 'Les documents biométriques marocains (Carte Nationale d’Identité Électronique CNIE et passeport biométrique) ainsi que les portails d’inscription en ligne exigent une photo au format 35×45 mm (413×531 pixels à 300 DPI) sur fond clair ou blanc, pesant moins de 50 Ko en JPEG ou PDF.',
      es: 'Los documentos biométricos de Marruecos (CNIE y pasaporte) requieren una foto de 35×45 mm (413×531 píxeles a 300 DPI) sobre fondo blanco o claro con un peso inferior a 50 KB.',
      ar: 'تتطلب الوثائق البيومترية المغربية (البطاقة الوطنية CNIE وجواز السفر) وبوابات التسجيل الإلكترونية صورة بمقاس 35×45 مم (413×531 بكسل بدقة 300 DPI) بخلفية فاتحة أو بيضاء وبحجم لا يتجاوز 50 كيلوبايت.'
    },
    portalSpecs: {
      dimensionsMm: '35 × 45 mm',
      dimensionsPx: '413 × 531 px (300 DPI)',
      maxKb: '≤ 50.0 KB',
      background: 'Pure White / Light Grey-Blue',
      standardCode: 'DGSN Morocco CNIE · ICAO 9303'
    },
    specificFaqs: {
      en: [
        {
          question: 'What size in pixels and KB is required for Morocco CNIE and student portals?',
          answer: 'The standard physical dimension is 35×45 mm, which translates to 413×531 pixels at 300 DPI, compressed under 50 KB in JPEG format.'
        }
      ],
      fr: [
        {
          question: 'Quelle est la taille en Ko et en pixels pour une photo CNIE Maroc ou concours emploi-public.ma ?',
          answer: 'La dimension officielle est de 35×45 mm (413×531 pixels à 300 DPI) avec un poids inférieur à 50 Ko (en JPG ou en PDF selon le portail).'
        },
        {
          question: 'Mes données personnelles sont-elles protégées ?',
          answer: 'Oui : votre photo CNIE ou passeport est traitée à 100 % dans votre navigateur sans jamais être envoyée sur Internet.'
        }
      ],
      es: [
        {
          question: '¿Qué tamaño en KB y píxeles se pide para la foto CNIE en Marruecos?',
          answer: 'El formato oficial es 35×45 mm (413×531 píxeles a 300 DPI) con un peso menor a 50 KB.'
        }
      ],
      ar: [
        {
          question: 'ما هو المقاس والحجم المطلوب لصورة البطاقة الوطنية CNIE ومباريات التوظيف في المغرب؟',
          answer: 'المقاس الرسمي هو 35×45 مم (أي 413×531 بكسل بدقة 300 DPI) وبحجم أقل من 50 كيلوبايت بصيغة JPG أو PDF.'
        }
      ]
    }
  },
  {
    slug: 'passport-photo-35x45mm-50kb',
    presetId: 'schengen-35x45',
    targetKb: 50,
    badgeText: {
      en: 'ICAO 9303 BIOMETRIC PASSPORT · 35×45 MM · 413×531 PX',
      fr: 'PASSEPORT BIOMÉTRIQUE OACI 9303 · 35×45 MM · 413×531 PX',
      es: 'PASAPORTE BIOMÉTRICO OACI 9303 · 35×45 MM · 413×531 PX',
      ar: 'جواز السفر البيومتري ICAO 9303 · 35×45 مم · 413×531 بكسل'
    },
    title: {
      en: '35x45mm Passport Photo Maker & 50KB Compressor (413x531 px) | CompressPhoto',
      fr: 'Photo Passeport 35x45mm en Ligne (413x531 px & 50 Ko) | CompressPhoto',
      es: 'Foto de Pasaporte 35x45mm Online (413x531 px y 50KB) | CompressPhoto',
      ar: 'صانع وضغط صورة جواز السفر 35×45 مم (413×531 بكسل و50 كيلوبايت) | CompressPhoto'
    },
    metaDescription: {
      en: 'Crop and compress your 35x45mm biometric passport & Schengen visa photo to 413x531 pixels (300 DPI) and under 50KB online. Includes 4x6 inch 8-photo print sheet.',
      fr: 'Recadrez et compressez votre photo de passeport biométrique 35x45 mm en 413x531 pixels (300 DPI) et moins de 50 Ko. Planche d’impression 10x15 cm (8 photos) incluse.',
      es: 'Recorta y comprime tu foto de pasaporte biométrico 35x45 mm a 413x531 píxeles (300 DPI) y menos de 50KB online con hoja de impresión 10x15 cm.',
      ar: 'اضبط واضغط صورة جواز السفر البيومتري مقاس 35×45 مم (413×531 بكسل بدقة 300 DPI) تحت 50 كيلوبايت مع إمكانية طباعة ورقة 10×15 سم تضم 8 صور.'
    },
    h1: {
      en: '35×45 mm Biometric Passport Photo Compressor (413×531 px · ≤ 50 KB)',
      fr: 'Photo de Passeport 35×45 mm en Ligne (413×531 px · 300 DPI · ≤ 50 Ko)',
      es: 'Foto de Pasaporte Biométrico 35×45 mm (413×531 px · ≤ 50 KB)',
      ar: 'ضبط وضغط صورة جواز السفر 35×45 مم (413×531 بكسل · 50 كيلوبايت)'
    },
    subtitle: {
      en: 'Official ICAO Doc 9303 standard used by the European Union, UK, Schengen Area, Australia, Morocco, and 140+ countries worldwide.',
      fr: 'Norme internationale OACI Doc 9303 utilisée par l’Union Européenne, la France, le Maroc, le Royaume-Uni, le Canada et plus de 140 pays.',
      es: 'Estándar internacional OACI Doc 9303 utilizado en la Unión Europea, España, Reino Unido y más de 140 países.',
      ar: 'المعيار الدولي المعتمد لمنظمة الطيران المدني ICAO Doc 9303 في الاتحاد الأوروبي والمغرب والمملكة المتحدة وأكثر من 140 دولة.'
    },
    directAnswer: {
      en: 'A 35×45 mm biometric passport photo measures exactly 413 × 531 pixels at 300 DPI (aspect ratio 7:9). CompressPhoto automatically centers your portrait, normalizes the background to pure white, and locks the JPEG or PDF file under 50 KB.',
      fr: 'Une photo de passeport biométrique de 35×45 mm mesure exactement 413 × 531 pixels à une résolution d’impression de 300 DPI (ratio 7:9). CompressPhoto calibre automatiquement ces dimensions, unifie le fond et verrouille le fichier sous 50 Ko.',
      es: 'Una foto de pasaporte biométrico de 35×45 mm mide exactamente 413 × 531 píxeles a 300 DPI (proporción 7:9). CompressPhoto calibra automáticamente estas dimensiones y fija el archivo por debajo de 50 KB.',
      ar: 'تبلغ أبعاد صورة جواز السفر البيومتري مقاس 35×45 مم بالضبط 413 × 531 بكسل عند دقة طباعة 300 DPI. يقوم CompressPhoto بمعايرة هذه الأبعاد وتثبيت الحجم تحت 50 كيلوبايت.'
    },
    portalSpecs: {
      dimensionsMm: '35 × 45 mm',
      dimensionsPx: '413 × 531 px (300 DPI)',
      maxKb: '≤ 50.0 KB',
      background: 'Pure White (#FFFFFF)',
      standardCode: 'ICAO Doc 9303 · EU / UK / Global'
    },
    specificFaqs: {
      en: [
        {
          question: 'How many pixels is 35x45mm at 300 DPI?',
          answer: '35 mm ÷ 25.4 × 300 = 413 pixels wide; 45 mm ÷ 25.4 × 300 = 531 pixels high.'
        }
      ],
      fr: [
        {
          question: 'Combien de pixels fait une photo 35x45 mm à 300 DPI ?',
          answer: '35 mm correspond à 413 pixels de large et 45 mm correspond à 531 pixels de haut (413 × 531 px).'
        }
      ],
      es: [
        {
          question: '¿Cuántos píxeles son 35x45 mm a 300 DPI?',
          answer: '35×45 mm equivale exactamente a 413 píxeles de ancho por 531 píxeles de alto.'
        }
      ],
      ar: [
        {
          question: 'كم يساوي مقاس 35×45 مم بالبكسل عند دقة 300 DPI؟',
          answer: 'يساوي بالضبط 413 بكسل للعرض و531 بكسل للارتفاع.'
        }
      ]
    }
  },
  {
    slug: 'ds160-photo-compressor-600x600',
    presetId: 'us-visa-2x2',
    targetKb: 100,
    badgeText: {
      en: 'US STATE DEPT DS-160 & DV LOTTERY · 2×2 INCH (600×600 PX)',
      fr: 'VISA USA DS-160 & DV LOTTERY · 2×2 POUCES (600×600 PX)',
      es: 'VISA EE.UU. DS-160 Y LOTERÍA DV · 2×2 PULGADAS (600×600 PX)',
      ar: 'تأشيرة أمريكا DS-160 واللوتري · 2×2 بوصة (600×600 بكسل)'
    },
    title: {
      en: 'US Visa DS-160 & DV Lottery Photo Compressor (600x600 px 2x2") | CompressPhoto',
      fr: 'Photo Visa USA DS-160 & Green Card DV Lottery (600x600 px 2x2") | CompressPhoto',
      es: 'Compresor de Foto Visa EE.UU. DS-160 y Lotería DV (600x600 px) | CompressPhoto',
      ar: 'مقاس وضغط صورة تأشيرة أمريكا DS-160 واللوتري 600×600 بكسل | CompressPhoto'
    },
    metaDescription: {
      en: 'Crop and compress your US Visa DS-160, Green Card DV Lottery, or USCIS photo to 2x2 inches (600x600 pixels, sRGB) and under 100KB/240KB online in your browser.',
      fr: 'Recadrez et compressez votre photo de Visa US DS-160 ou DV Lottery (Green Card) au format carré 2x2 pouces (600x600 pixels, fond blanc sRGB) et moins de 100 Ko / 240 Ko.',
      es: 'Recorta y comprime tu foto para Visa de EE.UU. DS-160 o Lotería de Visas DV a 2x2 pulgadas (600x600 píxeles, fondo blanco sRGB) y menos de 100KB / 240KB.',
      ar: 'اضبط واضغط صورة تأشيرة الولايات المتحدة DS-160 والقرعة الأمريكية DV Lottery بمقاس 2×2 بوصة (600×600 بكسل، خلفية بيضاء) وأقل من 100/240 كيلوبايت.'
    },
    h1: {
      en: 'US Visa DS-160 & DV Lottery Photo Tool (2×2" · 600×600 px · ≤ 100 KB)',
      fr: 'Photo Visa USA DS-160 & DV Lottery (2×2 pouces · 600×600 px · ≤ 100 Ko)',
      es: 'Foto Visa EE.UU. DS-160 y Lotería DV (2×2" · 600×600 px · ≤ 100 KB)',
      ar: 'أداة صورة تأشيرة أمريكا DS-160 واللوتري DV Lottery (600×600 بكسل)'
    },
    subtitle: {
      en: 'Enforces exact 1:1 square aspect ratio (600×600 px), pure #FFFFFF background, 24-bit sRGB color profile, and ≤ 100 KB byte ceiling (well below the 240 KB DOS cap).',
      fr: 'Applique le format carré 1:1 exact (600×600 px), un fond blanc pur #FFFFFF en profil sRGB et un poids verrouillé sous 100 Ko (conforme à la limite de 240 Ko du CEAC).',
      es: 'Aplica la proporción cuadrada 1:1 exacta (600×600 px), fondo blanco #FFFFFF en sRGB y peso inferior a 100 KB (cumpliendo el límite de 240 KB del CEAC).',
      ar: 'يطبق الأبعاد المربعة الدقيقة 1:1 (600×600 بكسل) مع خلفية بيضاء نقية #FFFFFF ونطاق ألوان sRGB وحجم أقل من 100 كيلوبايت (أقل من الحد الأقصى 240 كيلوبايت).'
    },
    directAnswer: {
      en: 'The US Department of State (CEAC DS-160, DS-260, and Electronic Diversity Visa DV Lottery) requires a square 2×2 inch digital photo measuring exactly 600×600 pixels in 24-bit sRGB JPEG format with a file size strictly under 240 KB.',
      fr: 'Le Département d’État américain (formulaire DS-160 au CEAC et loterie Green Card DV Lottery) exige une photo numérique carrée de 2×2 pouces mesurant exactement 600×600 pixels en JPEG sRGB 24 bits, pour un poids inférieur à 240 Ko.',
      es: 'El Departamento de Estado de EE.UU. (formulario DS-160 y Lotería de Visas DV) exige una foto digital cuadrada de 2×2 pulgadas (600×600 píxeles) en formato JPEG sRGB con un peso inferior a 240 KB.',
      ar: 'تشترط وزارة الخارجية الأمريكية (استمارة DS-160 وقرعة اللوتري DV Lottery) صورة رقمية مربعة بمقاس 2×2 بوصة (600×600 بكسل بالضبط) بصيغة JPEG sRGB وبحجم يقل عن 240 كيلوبايت.'
    },
    portalSpecs: {
      dimensionsMm: '51 × 51 mm (2 × 2 inches)',
      dimensionsPx: '600 × 600 px (300 DPI)',
      maxKb: '≤ 100 KB (DOS limit: 240 KB)',
      background: 'Pure White (#FFFFFF) sRGB',
      standardCode: 'US DOS CEAC DS-160 / DV Lottery'
    },
    specificFaqs: {
      en: [
        {
          question: 'Why does the CEAC DS-160 photo validator reject iPhone photos?',
          answer: 'iPhones capture photos in HEIC / Display P3 wide-gamut color and rectangular 4:3 aspect ratios over 3 MB. Our tool center-crops to 600×600 px (1:1), converts the color space to standard 24-bit sRGB JPEG, and locks the size under 100 KB.'
        }
      ],
      fr: [
        {
          question: 'Pourquoi le validateur DS-160 refuse-t-il les photos prises avec un iPhone ?',
          answer: 'Les iPhone utilisent un profil couleur Display P3 et un ratio rectangulaire 4:3. Notre outil convertit automatiquement votre photo en carré 600×600 px au profil sRGB 24 bits standard sous 100 Ko.'
        }
      ],
      es: [
        {
          question: '¿Por qué el validador DS-160 rechaza las fotos tomadas con iPhone?',
          answer: 'Los iPhone usan perfil de color Display P3 y formato rectangular. Nuestra herramienta convierte la imagen a 600×600 px en JPEG sRGB estándar bajo 100 KB.'
        }
      ],
      ar: [
        {
          question: 'لماذا يرفض موقع DS-160 أو اللوتري الصور الملتقطة بهواتف آيفون؟',
          answer: 'لأن هواتف آيفون تحفظ الصور بنطاق ألوان Display P3 وأبعاد مستطيلة. تقوم أداتنا بتحويل الصورة تلقائياً إلى مربع 600×600 بكسل بنطاق sRGB القياسي وحجم أقل من 100 كيلوبايت.'
        }
      ]
    }
  },
  {
    slug: 'ssc-upsc-photo-signature-20kb',
    presetId: 'schengen-35x45',
    targetKb: 20,
    badgeText: {
      en: 'SSC · UPSC · IBPS · SBI · NEET · 20KB PHOTO & SIGNATURE',
      fr: 'CONCOURS SSC · UPSC · IBPS · PHOTO 20-50 KO & SIGNATURE 20 KO',
      es: 'PORTALES SSC · UPSC · IBPS · FOTO Y FIRMA 20KB',
      ar: 'بوابات الامتحانات SSC وUPSC وIBPS · صورة وتوقيع 20 كيلوبايت'
    },
    title: {
      en: 'SSC, UPSC & IBPS Photo (20KB–50KB) & Signature (10KB–20KB) Compressor | CompressPhoto',
      fr: 'Compresseur Photo & Signature Concours (20 Ko – 50 Ko Exact) | CompressPhoto',
      es: 'Compresor de Foto y Firma para Exámenes (20KB – 50KB Exactos) | CompressPhoto',
      ar: 'ضغط الصور والتوقيع لبوابات الامتحانات والوظائف (20 إلى 50 كيلوبايت) | CompressPhoto'
    },
    metaDescription: {
      en: 'Compress passport photos (20KB–50KB, 3.5x4.5cm) and handwritten signatures (10KB–20KB, 140x60) for SSC, UPSC, IBPS, SBI, and NEET exam portals 100% locally.',
      fr: 'Compressez vos photos d’identité (20–50 Ko, 3,5x4,5 cm) et signatures manuscrites (10–20 Ko) pour tous les portails de concours administratifs.',
      es: 'Comprime fotos de carnet (20–50 KB) y firmas manuscritas (10–20 KB) para portales de exámenes y oposiciones.',
      ar: 'اضغط الصور الشخصية (20–50 كيلوبايت) والتوقيعات الخطية (10–20 كيلوبايت) لبوابات الامتحانات والتوظيف بدقة تامة.'
    },
    h1: {
      en: 'Exam Portal Photo (20–50 KB) & Signature (10–20 KB) Compressor',
      fr: 'Compresseur Photo (20–50 Ko) & Signature (10–20 Ko) pour Concours',
      es: 'Compresor de Foto (20–50 KB) y Firma (10–20 KB) para Oposiciones',
      ar: 'ضغط الصور (20–50 كيلوبايت) والتوقيع (10–20 كيلوبايت) لبوابات الامتحانات'
    },
    subtitle: {
      en: 'Switch in 1 click between 3.5×4.5 cm Photo (20–50 KB) and Shadow-Cleansed Signature (10–20 KB) with optional Studio Date Stamp.',
      fr: 'Basculez en 1 clic entre la Photo 3,5×4,5 cm (20–50 Ko) et la Signature Manuscrite sans ombre (10–20 Ko).',
      es: 'Alterna en 1 clic entre Foto 3,5×4,5 cm (20–50 KB) y Firma sin sombra (10–20 KB).',
      ar: 'بدّل بضغطة واحدة بين الصورة الشخصية 3.5×4.5 سم (20–50 كيلوبايت) والتوقيع الخطي المنظف من الظل (10–20 كيلوبايت).'
    },
    directAnswer: {
      en: 'National exam portals (SSC CGL/CHSL, UPSC Civil Services, IBPS PO/Clerk, SBI, and NEET) enforce dual file limits: 20 KB to 50 KB for the 3.5×4.5 cm portrait and 10 KB to 20 KB for the handwritten signature scan.',
      fr: 'Les portails de concours imposent une double limite stricte : entre 20 Ko et 50 Ko pour la photo d’identité 3,5×4,5 cm et entre 10 Ko et 20 Ko pour la signature manuscrite scannée.',
      es: 'Los portales de exámenes exigen límites dobles: entre 20 KB y 50 KB para la foto 3,5×4,5 cm y entre 10 KB y 20 KB para la firma escaneada.',
      ar: 'تفرض بوابات الامتحانات الوطنية حدوداً مزدوجة صارمة: من 20 إلى 50 كيلوبايت للصورة الشخصية (3.5×4.5 سم) ومن 10 إلى 20 كيلوبايت لصورة التوقيع الخطي.'
    },
    portalSpecs: {
      dimensionsMm: '35 × 45 mm (Photo) / 47 × 15 mm (Sig)',
      dimensionsPx: '413 × 531 px / 560 × 180 px',
      maxKb: '18.5 – 19.9 KB (Passes both 20KB & 50KB caps)',
      background: 'Pure White (#FFFFFF)',
      standardCode: 'NIC / SSC / UPSC / IBPS Spec'
    },
    specificFaqs: {
      en: [
        {
          question: 'How do I add a Name and Date stamp onto my SSC/NEET passport photo?',
          answer: 'After uploading your photo, click "Printable 4×6 Sheet" or enable the Studio Date Stamp option to imprint a clean verification date.'
        }
      ],
      fr: [
        {
          question: 'Comment passer de la compression de la photo à celle de la signature ?',
          answer: 'Dans l’Étape 1 à gauche, cliquez sur « Passeport / Carte ID » pour la photo, puis sur « Signature Manuscrite » pour nettoyer et compresser votre signature sous 20 Ko.'
        }
      ],
      es: [
        {
          question: '¿Cómo alternar entre comprimir la foto y comprimir la firma?',
          answer: 'En el Paso 1 selecciona "Pasaporte / DNI" para tu retrato o "Firma Manuscrita" para limpiar la sombra del papel bajo 20 KB.'
        }
      ],
      ar: [
        {
          question: 'كيف أنتقل بين ضغط الصورة الشخصية وضغط التوقيع الخطي؟',
          answer: 'في الخطوة الأولى، اختر جواز السفر للصورة الشخصية أو التوقيع الخطي لتنظيف خلفية الورقة وضغطها تحت 20 كيلوبايت.'
        }
      ]
    }
  },
  {
    slug: 'compress-photo-to-pdf-under-50kb',
    presetId: 'schengen-35x45',
    targetKb: 50,
    badgeText: {
      en: 'PHOTO TO PDF CONVERTER · LOCKED UNDER 50 KB / 100 KB',
      fr: 'CONVERTISSEUR PHOTO VERS PDF · VERROUILLÉ SOUS 50 KO / 100 KO',
      es: 'CONVERTIDOR FOTO A PDF · BLOQUEADO BAJO 50 KB / 100 KB',
      ar: 'تحويل وضغط الصورة إلى PDF · أقل من 50 أو 100 كيلوبايت'
    },
    title: {
      en: 'Convert & Compress Photo to PDF Under 50KB or 100KB Online | CompressPhoto',
      fr: 'Convertir et Compresser une Photo en PDF moins de 50 Ko / 100 Ko | CompressPhoto',
      es: 'Convertir y Comprimir Foto a PDF menor de 50KB o 100KB Online | CompressPhoto',
      ar: 'تحويل وضغط الصورة إلى PDF بحجم أقل من 50 أو 100 كيلوبايت أونلاين | CompressPhoto'
    },
    metaDescription: {
      en: 'Convert any JPG, PNG, or WebP photo or ID scan into a clean PDF file locked strictly under 20KB, 50KB, or 100KB in your browser.',
      fr: 'Convertissez une photo d’identité, un passeport ou une signature en un fichier PDF pesant strictement moins de 20 Ko, 50 Ko ou 100 Ko.',
      es: 'Convierte cualquier foto o documento escaneado en un archivo PDF con un peso estrictamente inferior a 20KB, 50KB o 100KB.',
      ar: 'حوّل واضغط أي صورة شخصية أو وثيقة إلى ملف PDF قياسي بحجم يقل عن 20 أو 50 أو 100 كيلوبايت مباشرة داخل متصفحك.'
    },
    h1: {
      en: 'Convert & Compress Photo to PDF Under 50KB / 100KB',
      fr: 'Convertir et Compresser une Photo en PDF sous 50 Ko ou 100 Ko',
      es: 'Convertir y Comprimir Foto a PDF bajo 50KB o 100KB',
      ar: 'تحويل وضغط الصورة إلى ملف PDF أقل من 50 أو 100 كيلوبايت'
    },
    subtitle: {
      en: 'Accounts for PDF file structure automatically so the final .pdf document never exceeds your 20KB, 50KB, or 100KB upload limit.',
      fr: 'Calcule automatiquement le poids du document PDF afin que le fichier .pdf final ne dépasse jamais votre limite de 20 Ko, 50 Ko ou 100 Ko.',
      es: 'Calcula automáticamente el tamaño del documento PDF para que el archivo .pdf final nunca supere tu límite de 20KB, 50KB o 100KB.',
      ar: 'يحسب حجم ترويسة ملف PDF تلقائياً لضمان عدم تجاوز الملف النهائي لسقف 20 أو 50 أو 100 كيلوبايت.'
    },
    directAnswer: {
      en: 'Standard image-to-PDF converters add 15–40 KB of extra overhead, pushing a 45 KB photo over a 50 KB limit. CompressPhoto accounts for the PDF wrapper before compressing your image so the exported PDF stays strictly below your target KB.',
      fr: 'Les convertisseurs PDF classiques ajoutent 15 à 40 Ko de données supplémentaires, faisant passer une image de 45 Ko au-dessus de la limite de 50 Ko. CompressPhoto prend en compte l’enveloppe PDF avant la compression afin que le fichier PDF final reste strictement sous 50 Ko.',
      es: 'Los convertidores PDF normales añaden entre 15 y 40 KB adicionales. CompressPhoto descuenta el peso del formato PDF antes de comprimir la imagen para que el PDF final nunca supere los 50 KB.',
      ar: 'تضيف أدوات تحويل PDF التقليدية ما بين 15 و40 كيلوبايت من البيانات الإضافية. يقوم CompressPhoto بخصم حجم غلاف PDF مسبقاً لضمان بقاء ملف PDF النهائي تحت 50 كيلوبايت بدقة.'
    },
    portalSpecs: {
      dimensionsMm: '35 × 45 mm / Standard PDF Page',
      dimensionsPx: '413 × 531 px (300 DPI)',
      maxKb: '≤ 50.0 KB PDF',
      background: 'Pure White (#FFFFFF)',
      standardCode: 'Official Portal PDF'
    },
    specificFaqs: {
      en: [
        {
          question: 'How do I download the compressed PDF file?',
          answer: 'Upload your image above, pick your target KB (e.g. 50 KB), and click the "Download PDF (≤ 50 KB)" button directly under the main download button.'
        }
      ],
      fr: [
        {
          question: 'Comment télécharger ma photo directement en PDF sous 50 Ko ?',
          answer: 'Importez votre image ci-dessus, choisissez la cible (ex: 50 Ko) puis cliquez sur le bouton « Télécharger en PDF (≤ 50 Ko) » sous l’aperçu.'
        }
      ],
      es: [
        {
          question: '¿Cómo descargar la foto directamente en PDF menor de 50KB?',
          answer: 'Sube tu imagen arriba, elige el límite (ej. 50 KB) y haz clic en el botón "Descargar en PDF (≤ 50 KB)" debajo de la vista previa.'
        }
      ],
      ar: [
        {
          question: 'كيف أقوم بتحميل الصورة بصيغة PDF أقل من 50 كيلوبايت؟',
          answer: 'ارفع صورتك أعلاه، اختر الحد المطلوب (مثل 50 كيلوبايت)، ثم اضغط على زر تحميل PDF أسفل المعاينة.'
        }
      ]
    }
  },
  {
    slug: 'amazon-1000x1000-white-background-photo',
    presetId: 'amazon-1000',
    targetKb: 200,
    badgeText: {
      en: 'AMAZON & E-COMMERCE · 1000×1000 PX · PURE RGB(255,255,255)',
      fr: 'AMAZON & E-COMMERCE · 1000×1000 PX · BLANC PUR RGB(255,255,255)',
      es: 'AMAZON Y E-COMMERCE · 1000×1000 PX · BLANCO PURO RGB(255,255,255)',
      ar: 'أمازون والتجارة الإلكترونية · 1000×1000 بكسل · خلفية بيضاء نقية'
    },
    title: {
      en: 'Amazon 1000x1000 Pure White Background Product Photo Compressor | CompressPhoto',
      fr: 'Photo Produit Amazon 1000x1000 Fond Blanc Pur & Compression | CompressPhoto',
      es: 'Foto de Producto Amazon 1000x1000 Fondo Blanco Puro Online | CompressPhoto',
      ar: 'ضبط وضغط صور منتجات أمازون 1000×1000 بخلفية بيضاء نقية | CompressPhoto'
    },
    metaDescription: {
      en: 'Resize and compress e-commerce product photos to 1000x1000 pixels on pure RGB(255,255,255) white background under 200KB for fast Amazon & Shopify zoom.',
      fr: 'Calibrez et compressez vos photos produits e-commerce en 1000x1000 pixels sur fond blanc pur RGB(255,255,255) sous 200 Ko pour Amazon et Shopify.',
      es: 'Ajusta y comprime fotos de productos e-commerce a 1000x1000 píxeles con fondo blanco puro RGB(255,255,255) bajo 200KB para Amazon y Shopify.',
      ar: 'اضبط واضغط صور المنتجات للتجارة الإلكترونية وأمازون بمقاس 1000×1000 بكسل وخلفية بيضاء نقية RGB(255,255,255) تحت 200 كيلوبايت.'
    },
    h1: {
      en: 'Amazon 1000×1000 px Pure White Product Photo Compressor',
      fr: 'Photo Produit Amazon 1000×1000 px : Fond Blanc Pur & Compression 200 Ko',
      es: 'Compresor de Foto de Producto Amazon 1000×1000 px (Fondo Blanco)',
      ar: 'أداة صور منتجات أمازون 1000×1000 بكسل بخلفية بيضاء نقية'
    },
    subtitle: {
      en: 'Enables marketplace hover-zoom (1000×1000 px sRGB) with pure RGB(255,255,255) studio canvas and fast-loading 200 KB WebP/JPEG output.',
      fr: 'Active le zoom Amazon (1000×1000 px sRGB) avec fond studio blanc pur RGB(255,255,255) et compression rapide à 200 Ko.',
      es: 'Activa el zoom de Amazon (1000×1000 px sRGB) con fondo blanco puro RGB(255,255,255) y compresión rápida a 200 KB.',
      ar: 'يفعّل ميزة التكبير في أمازون (1000×1000 بكسل) مع خلفية بيضاء نقية RGB(255,255,255) وحجم 200 كيلوبايت سريع التحميل.'
    },
    directAnswer: {
      en: 'Amazon Seller Central requires main product images to have a pure white background of RGB(255, 255, 255) and a minimum dimension of 1,000 × 1,000 pixels in sRGB JPEG format to enable customer hover-zoom and prevent listing suppression.',
      fr: 'Amazon Seller Central exige que l’image principale d’un produit possède un fond blanc pur RGB(255, 255, 255) et une dimension minimale de 1 000 × 1 000 pixels en JPEG sRGB pour activer le zoom client et éviter la suspension de la fiche.',
      es: 'Amazon Seller Central exige que la imagen principal tenga un fondo blanco puro RGB(255, 255, 255) y un tamaño mínimo de 1000 × 1000 píxeles en JPEG sRGB.',
      ar: 'يشترط مركز بائعي أمازون أن تكون الصورة الرئيسية للمنتج بخلفية بيضاء نقية RGB(255,255,255) وبأبعاد لا تقل عن 1000×1000 بكسل لتفعيل ميزة التكبير.'
    },
    portalSpecs: {
      dimensionsMm: '84.7 × 84.7 mm (1:1 Square)',
      dimensionsPx: '1000 × 1000 px (300 DPI)',
      maxKb: '≤ 200.0 KB',
      background: 'Pure White RGB(255,255,255)',
      standardCode: 'Amazon Marketplace Main Image Spec'
    },
    specificFaqs: {
      en: [
        {
          question: 'Why does Amazon suppress product photos with off-white backgrounds?',
          answer: 'Amazon bots test edge pixels for exact RGB(255,255,255). Studio lighting often leaves edge pixels at RGB(248,248,248). Our Pure White backdrop normalizes the canvas perimeter to exact #FFFFFF.'
        }
      ],
      fr: [
        {
          question: 'Pourquoi Amazon bloque-t-il les photos dont le fond est légèrement gris ?',
          answer: 'Les robots d’Amazon vérifient que les pixels de bordure soient exactement à RGB(255,255,255). Notre outil normalise le canevas en blanc pur #FFFFFF en 1000×1000 px.'
        }
      ],
      es: [
        {
          question: '¿Por qué Amazon rechaza fotos con fondo blanco grisáceo?',
          answer: 'El algoritmo de Amazon verifica que los bordes sean exactamente RGB(255,255,255). Nuestra herramienta normaliza el lienzo a blanco puro #FFFFFF en 1000×1000 px.'
        }
      ],
      ar: [
        {
          question: 'لماذا ترفض أمازون الصور ذات الخلفية الرمادية الفاتحة؟',
          answer: 'تفحص خوارزميات أمازون حواف الصورة للتأكد من أنها باللون الأبيض النقي RGB(255,255,255)، وتقوم أداتنا بضبط ذلك تلقائياً بمقاس 1000×1000 بكسل.'
        }
      ]
    }
  },
  {
    slug: 'compress-photo-to-10kb',
    presetId: 'wet-ink-sig',
    targetKb: 10,
    badgeText: {
      en: '10 KB STRICT LIMIT · SIGNATURE & THUMBPRINT READY',
      fr: 'LIMITE EXACTE 10 KO · SIGNATURE & PHOTO D’IDENTITÉ',
      es: 'LÍMITE EXACTO 10 KB · FIRMA Y FOTO DE DOCUMENTO',
      ar: 'حجم 10 كيلوبايت دقيق · للتوقيعات والصور الرسمية'
    },
    title: {
      en: 'Compress Photo & Signature to 10KB Online Free (Exact Size) | CompressPhoto',
      fr: 'Compresser Photo et Signature à 10 Ko en Ligne Gratuit | CompressPhoto',
      es: 'Comprimir Foto y Firma a 10KB Online Gratis (Tamaño Exacto) | CompressPhoto',
      ar: 'ضغط الصورة والتوقيع إلى 10 كيلوبايت أونلاين مجاناً | CompressPhoto'
    },
    metaDescription: {
      en: 'Compress any signature scan, thumb impression, or ID photo under 10KB online without losing sharpness. Removes grey paper shadows privately on your device.',
      fr: 'Compressez une signature manuscrite ou une photo d’identité à moins de 10 Ko en ligne sans perte de netteté. Nettoyage du fond blanc 100% privé.',
      es: 'Comprime cualquier firma manuscrita o foto de documento a menos de 10KB online sin perder nitidez. Limpieza de fondo blanco 100% privada.',
      ar: 'اضغط أي توقيع خطي أو بصمة أو صورة شخصية إلى أقل من 10 كيلوبايت أونلاين بدقة عالية وخصوصية تامة على جهازك.'
    },
    h1: {
      en: 'Compress Photo & Signature to 10KB Online (Exact Size)',
      fr: 'Compresser une Photo ou Signature à 10 Ko en Ligne',
      es: 'Comprimir Foto o Firma a 10KB Online (Tamaño Exacto)',
      ar: 'ضغط الصورة أو التوقيع إلى 10 كيلوبايت أونلاين'
    },
    subtitle: {
      en: 'Built for portals requiring a strict 10KB–20KB file size for handwritten signatures, thumb impressions, and compact ID photos.',
      fr: 'Conçu pour les formulaires exigeant un fichier inférieur à 10 Ko ou 20 Ko pour les signatures manuscrites et photos d’identité.',
      es: 'Diseñado para portales que exigen un peso máximo de 10KB a 20KB para firmas manuscritas y fotos de solicitud.',
      ar: 'مصمم للبوابات التي تشترط حجماً لا يتجاوز 10 إلى 20 كيلوبايت للتوقيعات الخطية والبصمات والصور الشخصية.'
    },
    directAnswer: {
      en: 'To compress a signature or photo under 10KB without making it unreadable, upload your image above. The tool automatically whitens shadowed paper and locks the file size between 8.5 KB and 9.9 KB.',
      fr: 'Pour réduire une signature ou une photo sous 10 Ko tout en gardant un tracé net, importez votre image ci-dessus. L’outil blanchit le papier et verrouille le poids juste sous 10 Ko.',
      es: 'Para reducir una firma o foto a menos de 10KB conservando trazos nítidos, sube tu imagen arriba. La herramienta blanquea el papel y ajusta el peso justo debajo de 10 KB.',
      ar: 'لضغط صورة التوقيع أو الوثيقة تحت 10 كيلوبايت مع الحفاظ على وضوح الخط، ارفع صورتك أعلاه ليتم تبييض الخلفية وضبط الحجم تلقائياً تحت 10 كيلوبايت.'
    },
    portalSpecs: {
      dimensionsMm: '47 × 15 mm / 35 × 45 mm',
      dimensionsPx: '560 × 180 px (300 DPI)',
      maxKb: '≤ 10.0 KB Strict',
      background: 'Pure White Paper (#FFFFFF)',
      standardCode: '10KB Exam & Portal Spec'
    },
    specificFaqs: {
      en: [
        {
          question: 'How do I keep a 10KB signature clear and readable?',
          answer: 'By turning shadowed grey paper into pure white (#FFFFFF), almost all of the 10KB budget is dedicated to your pen strokes so the signature stays crisp.'
        },
        {
          question: 'Can I also compress a portrait photo to 10KB?',
          answer: 'Yes. Switch Step 1 from Signature to Passport (35×45 mm) and keep Step 2 at 10 KB to compress any portrait under 10,240 bytes.'
        }
      ],
      fr: [
        {
          question: 'Comment garder une signature lisible à moins de 10 Ko ?',
          answer: 'En transformant le fond gris du papier en blanc pur (#FFFFFF), l’outil concentre toute la qualité sur le trait du stylo tout en restant sous 10 Ko.'
        }
      ],
      es: [
        {
          question: '¿Cómo mantener una firma legible en menos de 10KB?',
          answer: 'Al convertir el fondo gris del papel en blanco puro (#FFFFFF), toda la calidad se dedica al trazo del bolígrafo sin superar los 10 KB.'
        }
      ],
      ar: [
        {
          question: 'كيف أحافظ على وضوح التوقيع بحجم أقل من 10 كيلوبايت؟',
          answer: 'من خلال تحويل خلفية الورقة الرمادية إلى اللون الأبيض النقي، يتم تركيز كامل الجودة على حبر التوقيع ليبقى واضحاً تماماً تحت 10 كيلوبايت.'
        }
      ]
    }
  },
  {
    slug: 'compress-photo-to-30kb',
    presetId: 'schengen-35x45',
    targetKb: 30,
    badgeText: {
      en: '30 KB TARGET · 300 DPI PASSPORT & EXAM PHOTO',
      fr: 'CIBLE EXACTE 30 KO · PHOTO D’IDENTITÉ & DOSSIER',
      es: 'LÍMITE EXACTO 30 KB · FOTO DE PASAPORTE Y TRÁMITE',
      ar: 'حجم 30 كيلوبايت دقيق · لصور الوثائق والتسجيل'
    },
    title: {
      en: 'Compress Photo to 30KB Online Free (Exact KB Size) | CompressPhoto',
      fr: 'Compresser Photo à 30 Ko en Ligne Gratuit (Taille Exacte) | CompressPhoto',
      es: 'Comprimir Foto a 30KB Online Gratis (Tamaño Exacto) | CompressPhoto',
      ar: 'ضغط الصورة إلى 30 كيلوبايت أونلاين مجاناً بدقة عالية | CompressPhoto'
    },
    metaDescription: {
      en: 'Resize and compress any passport photo, visa portrait, or ID picture to 30KB online without losing quality. Instant 300 DPI formatting on your device.',
      fr: 'Redimensionnez et compressez toute photo d’identité, passeport ou dossier à moins de 30 Ko en ligne sans perte de qualité. 100% privé.',
      es: 'Ajusta y comprime cualquier foto de pasaporte, DNI o solicitud a menos de 30KB online sin perder nitidez. 100% privado en tu dispositivo.',
      ar: 'اضبط واضغط أي صورة شخصية أو صورة جواز سفر إلى 30 كيلوبايت أونلاين مجاناً مع الحفاظ على وضوح الملامح بدقة 300 DPI.'
    },
    h1: {
      en: 'Compress Photo to 30KB Online Free',
      fr: 'Compresser une Photo à 30 Ko en Ligne Gratuitement',
      es: 'Comprimir Foto a 30KB Online Gratis',
      ar: 'ضغط الصورة إلى 30 كيلوبايت أونلاين مجاناً'
    },
    subtitle: {
      en: 'Ideal for portals requiring a 20KB–30KB or 15KB–30KB photo upload limit at 35×45 mm or custom dimensions.',
      fr: 'Idéal pour les inscriptions en ligne demandant une photo entre 20 Ko et 30 Ko au format 35×45 mm ou personnalisé.',
      es: 'Ideal para portales de inscripción que piden una foto entre 20KB y 30KB en formato 35×45 mm o personalizado.',
      ar: 'مثالي لبوابات التسجيل والجامعات التي تطلب صورة شخصية بحجم يتراوح بين 20 و30 كيلوبايت.'
    },
    directAnswer: {
      en: 'A 30KB ceiling is the sweet spot for online exam and university portals that require a file between 20KB and 50KB. Upload your image above to lock it between 27 KB and 29.8 KB at 300 DPI.',
      fr: 'Une cible de 30 Ko est idéale pour les portails demandant une photo comprise entre 20 Ko et 50 Ko. Importez votre photo ci-dessus pour obtenir un fichier net entre 27 Ko et 29,8 Ko.',
      es: 'Un objetivo de 30KB es perfecto para formularios que piden un archivo entre 20KB y 50KB. Sube tu foto arriba para ajustarla entre 27 KB y 29,8 KB a 300 DPI.',
      ar: 'يعد حجم 30 كيلوبايت خياراً مثالياً للمواقع التي تطلب صورة بين 20 و50 كيلوبايت. ارفع صورتك أعلاه لضبطها بدقة تحت 30 كيلوبايت.'
    },
    portalSpecs: {
      dimensionsMm: '35 × 45 mm (or Custom)',
      dimensionsPx: '413 × 531 px (300 DPI)',
      maxKb: '≤ 30.0 KB (30,720 Bytes)',
      background: 'Pure White (#FFFFFF)',
      standardCode: '20KB–30KB Portal Spec'
    },
    specificFaqs: {
      en: [
        {
          question: 'Will a 30KB photo pass a "20KB to 50KB" upload requirement?',
          answer: 'Yes. Compressing to ~28–29.8 KB safely satisfies any portal asking for a photo between 20 KB and 50 KB.'
        }
      ],
      fr: [
        {
          question: 'Une photo de 30 Ko est-elle acceptée pour une exigence « entre 20 Ko et 50 Ko » ?',
          answer: 'Oui, un fichier calibré autour de 28 à 29,8 Ko passe immédiatement sur tous les portails demandant entre 20 Ko et 50 Ko.'
        }
      ],
      es: [
        {
          question: '¿Una foto de 30KB sirve para un requisito de "entre 20KB y 50KB"?',
          answer: 'Sí, un archivo ajustado entre 28 KB y 29,8 KB cumple perfectamente con cualquier rango de 20 KB a 50 KB.'
        }
      ],
      ar: [
        {
          question: 'هل تُقبل صورة بحجم 30 كيلوبايت في المواقع التي تطلب من 20 إلى 50 كيلوبايت؟',
          answer: 'نعم، ضبط الصورة عند حدود 28 إلى 29.8 كيلوبايت يضمن قبولها فوراً في جميع النماذج التي تشترط حجماً بين 20 و50 كيلوبايت.'
        }
      ]
    }
  },
  {
    slug: 'compress-photo-to-200kb',
    presetId: 'us-visa-2x2',
    targetKb: 200,
    badgeText: {
      en: '200 KB HIGH-DEFINITION · VISA, PASSPORT & E-COMMERCE',
      fr: 'LIMITE 200 KO HAUTE DÉFINITION · VISA & PASSEPORT',
      es: 'LÍMITE 200 KB ALTA DEFINICIÓN · VISA Y PASAPORTE',
      ar: 'سقف 200 كيلوبايت عالي الوضوح · للتأشيرات وجوازات السفر'
    },
    title: {
      en: 'Compress Photo to 200KB Online Free (High Quality 300 DPI) | CompressPhoto',
      fr: 'Compresser Photo à 200 Ko en Ligne Gratuit (Haute Qualité) | CompressPhoto',
      es: 'Comprimir Foto a 200KB Online Gratis (Alta Calidad) | CompressPhoto',
      ar: 'ضغط الصورة إلى 200 كيلوبايت أونلاين مجاناً بجودة عالية | CompressPhoto'
    },
    metaDescription: {
      en: 'Compress high-resolution visa photos (US DS-160 240KB max), passport scans, and profile pictures under 200KB online with near-lossless 300 DPI clarity.',
      fr: 'Compressez vos photos de visa (DS-160), passeports et portraits haute résolution à moins de 200 Ko en ligne sans aucune perte visible.',
      es: 'Comprime fotos de visa (DS-160), pasaportes y retratos de alta resolución a menos de 200KB online conservando toda la nitidez.',
      ar: 'اضغط صور التأشيرات وجوازات السفر والصور عالية الدقة إلى أقل من 200 كيلوبايت أونلاين مع الحفاظ الكامل على التفاصيل.'
    },
    h1: {
      en: 'Compress Photo to 200KB Online (High-Resolution 300 DPI)',
      fr: 'Compresser une Photo à 200 Ko en Ligne (Haute Définition)',
      es: 'Comprimir Foto a 200KB Online (Alta Resolución 300 DPI)',
      ar: 'ضغط الصورة إلى 200 كيلوبايت أونلاين بجودة عالية'
    },
    subtitle: {
      en: 'Perfect for US Visa DS-160 & Green Card Lottery (240KB limit), international e-Visas, and high-detail ID documents.',
      fr: 'Parfait pour le visa américain DS-160 et DV Lottery (limite 240 Ko), les e-Visas internationaux et les documents haute netteté.',
      es: 'Perfecto para la visa de EE.UU. DS-160 y Lotería DV (límite 240KB), e-Visas internacionales y documentos de alta nitidez.',
      ar: 'مثالي لتأشيرة أمريكا DS-160 واللوتري (الحد الأقصى 240 كيلوبايت) والتأشيرات الإلكترونية الدولية.'
    },
    directAnswer: {
      en: 'Many modern embassy portals—including the US Department of State CEAC (240 KB max), UK eVisa, and Canada IRCC—accept photos up to 200KB–240KB. Compressing to 200KB preserves studio-grade skin detail while guaranteeing instant upload acceptance.',
      fr: 'De nombreux portails consulaires (comme le DS-160 américain limité à 240 Ko ou les visas internationaux) acceptent jusqu’à 200 Ko. Ce réglage conserve une qualité studio maximale sans jamais dépasser la limite.',
      es: 'Muchos portales consulares (como el DS-160 de EE.UU. con límite de 240 KB) permiten hasta 200 KB. Este ajuste conserva calidad de estudio garantizando una subida sin errores.',
      ar: 'تقبل العديد من بوابات السفارات الحديثة (مثل تأشيرة أمريكا DS-160 بحد 240 كيلوبايت) صوراً حتى 200 كيلوبايت، مما يمنحك أعلى جودة ممكنة مع ضمان القبول الفوري.'
    },
    portalSpecs: {
      dimensionsMm: '51 × 51 mm (2×2") or 35 × 45 mm',
      dimensionsPx: '600 × 600 px (300 DPI)',
      maxKb: '≤ 200.0 KB (Max 240 KB)',
      background: 'Pure White (#FFFFFF)',
      standardCode: 'US DOS / International e-Visa'
    },
    specificFaqs: {
      en: [
        {
          question: 'Does a 200KB photo meet the US Visa DS-160 240KB requirement?',
          answer: 'Yes. The US Department of State requires a 600×600 pixel JPEG under 240 KB. Locking your photo under 200 KB ensures 100% compliance with maximum visual sharpness.'
        }
      ],
      fr: [
        {
          question: 'Une photo de 200 Ko respecte-t-elle la limite de 240 Ko du visa US DS-160 ?',
          answer: 'Oui. Le Département d’État américain exige un fichier 600×600 px inférieur à 240 Ko. Une cible à 200 Ko garantit une qualité optimale et une acceptation immédiate.'
        }
      ],
      es: [
        {
          question: '¿Una foto de 200KB cumple el requisito de 240KB de la visa DS-160?',
          answer: 'Sí. El Departamento de Estado de EE.UU. exige una imagen de 600×600 px menor de 240 KB. Ajustarla bajo 200 KB asegura la máxima nitidez.'
        }
      ],
      ar: [
        {
          question: 'هل تتوافق صورة 200 كيلوبايت مع شرط 240 كيلوبايت لتأشيرة أمريكا DS-160؟',
          answer: 'نعم، تشترط الخارجية الأمريكية صورة بمقاس 600×600 بكسل وأقل من 240 كيلوبايت، لذا فإن حجم 200 كيلوبايت يمنحك أعلى دقة مع قبول مضمون.'
        }
      ]
    }
  },
  {
    slug: 'ssc-upsc-ibps-photo-signature-resizer',
    presetId: 'schengen-35x45',
    targetKb: 20,
    autoFeature: 'name-slate',
    badgeText: {
      en: 'SSC · UPSC · IBPS · SBI · NEET · NAME & DATE ON PHOTO',
      fr: 'CONCOURS SSC · UPSC · IBPS · BANDEAU NOM & DATE INCLUS',
      es: 'EXÁMENES SSC · UPSC · IBPS · BANDA DE NOMBRE Y FECHA',
      ar: 'امتحانات SSC وUPSC وIBPS وNEET · مع شريط الاسم والتاريخ'
    },
    title: {
      en: 'SSC, UPSC, IBPS & NEET Photo & Signature Resizer (20KB–50KB + Name & Date) | CompressPhoto',
      fr: 'Redimensionner Photo & Signature SSC, UPSC, IBPS (20 Ko–50 Ko + Nom & Date) | CompressPhoto',
      es: 'Ajustar Foto y Firma SSC, UPSC, IBPS (20KB–50KB + Nombre y Fecha) | CompressPhoto',
      ar: 'ضبط حجم الصورة والتوقيع لامتحانات SSC وUPSC وIBPS (20–50 كيلوبايت مع الاسم والتاريخ) | CompressPhoto'
    },
    metaDescription: {
      en: 'Resize and compress photos (20KB–50KB) and signatures (10KB–20KB) for SSC, UPSC, IBPS, SBI, and NEET exams. Includes free Name & Date of Photo (DOP) slate banner.',
      fr: 'Compressez vos photos (20–50 Ko) et signatures (10–20 Ko) pour les concours administratifs avec ajout gratuit du bandeau Nom et Date sur la photo.',
      es: 'Comprime fotos (20–50KB) y firmas (10–20KB) para exámenes oficiales con opción gratuita para añadir banda de Nombre y Fecha en la foto.',
      ar: 'اضبط واضغط الصور الشخصية (20–50 كيلوبايت) والتوقيعات (10–20 كيلوبايت) للامتحانات الرسمية مع ميزة إضافة الاسم وتاريخ الصورة مجاناً.'
    },
    h1: {
      en: 'SSC, UPSC, IBPS & NEET Photo & Signature Compressor (With Name & Date)',
      fr: 'Compresseur Photo & Signature Concours (20 Ko–50 Ko avec Nom & Date)',
      es: 'Compresor de Foto y Firma para Exámenes (20KB–50KB con Nombre y Fecha)',
      ar: 'أداة ضبط الصور والتوقيعات للامتحانات (20–50 كيلوبايت مع الاسم والتاريخ)'
    },
    subtitle: {
      en: 'Pre-configured for 20KB–50KB passport photos, 10KB–20KB signatures, and automatic Name & Date of Photo (DOP) bottom slate.',
      fr: 'Pré-configuré pour les photos de 20 à 50 Ko, signatures de 10 à 20 Ko et bandeau inférieur Nom & Date de prise de vue.',
      es: 'Preconfigurado para fotos de 20 a 50 KB, firmas de 10 a 20 KB y banda inferior con Nombre y Fecha de la foto.',
      ar: 'مضبوط مسبقاً للصور (20–50 كيلوبايت) والتوقيعات (10–20 كيلوبايت) مع شريط الاسم وتاريخ التقاط الصورة.'
    },
    directAnswer: {
      en: 'SSC, UPSC, IBPS, SBI, and NEET portals require a 3.5×4.5 cm (35×45 mm) colour photo between 20KB and 50KB and a black/blue ink signature on white paper between 10KB and 20KB. You can also toggle the Name & Date banner directly below Step 2.',
      fr: 'Les portails de concours exigent une photo couleur 3,5×4,5 cm (35×45 mm) entre 20 Ko et 50 Ko ainsi qu’une signature sur papier blanc entre 10 Ko et 20 Ko, souvent accompagnée du nom et de la date en bas de la photo.',
      es: 'Los portales de exámenes exigen una foto de 3,5×4,5 cm entre 20KB y 50KB y una firma sobre papel blanco entre 10KB y 20KB, con opción de incluir el nombre y la fecha en el borde inferior.',
      ar: 'تشترط بوابات الامتحانات صورة ملونة بمقاس 3.5×4.5 سم بحجم 20 إلى 50 كيلوبايت وتوقيعاً خطياً بحجم 10 إلى 20 كيلوبايت، مع إمكانية إضافة شريط الاسم والتاريخ أسفل الصورة.'
    },
    portalSpecs: {
      dimensionsMm: '35 × 45 mm (Photo) / 47 × 15 mm (Signature)',
      dimensionsPx: '413 × 531 px / 560 × 180 px',
      maxKb: '20–50 KB (Photo) · 10–20 KB (Sig)',
      background: 'Pure White + Optional Name/Date Slate',
      standardCode: 'SSC / UPSC / IBPS / NTA Spec'
    },
    specificFaqs: {
      en: [
        {
          question: 'How do I add my Name and Date of Photo (DOP) at the bottom of the photo?',
          answer: 'The "Add Name & Date on Photo" panel is enabled automatically on this page. Type your full name and click "Today" to print a clean white or black slate at the bottom of your photo.'
        },
        {
          question: 'How do I switch from compressing my photo (20KB–50KB) to my signature (10KB–20KB)?',
          answer: 'In Step 1 above, click "Signature (< 20 KB)". The tool automatically switches to signature dimensions, cleans grey paper shadows, and locks the file size under 20 KB (or 10 KB).'
        }
      ],
      fr: [
        {
          question: 'Comment ajouter mon Nom et la Date en bas de la photo ?',
          answer: 'Le panneau « Ajouter Nom & Date » est ouvert sous l’Étape 2. Saisissez votre nom et la date du jour pour afficher automatiquement le bandeau réglementaire.'
        }
      ],
      es: [
        {
          question: '¿Cómo añadir mi Nombre y Fecha en la parte inferior de la foto?',
          answer: 'El panel "Añadir Nombre y Fecha" está activo debajo del Paso 2. Escribe tu nombre y selecciona la fecha para mostrar la banda automáticamente.'
        }
      ],
      ar: [
        {
          question: 'كيف أضيف اسمي وتاريخ الصورة في الشريط السفلي؟',
          answer: 'لوحة إضافة الاسم والتاريخ مفعّلة تلقائياً في هذه الصفحة؛ اكتب اسمك واختر تاريخ اليوم ليظهر الشريط بوضوح أسفل الصورة.'
        }
      ]
    }
  },
  {
    slug: 'campus-france-photo-50ko',
    presetId: 'schengen-35x45',
    targetKb: 50,
    badgeText: {
      en: 'CAMPUS FRANCE PASTEL · 35×45 MM · STRICT 50 KB MAX',
      fr: 'CAMPUS FRANCE (ÉTUDES EN FRANCE) · 35×45 MM · MAX 50 KO',
      es: 'CAMPUS FRANCE · 35×45 MM · MÁXIMO ESTRICTO 50 KB',
      ar: 'كامبوس فرانس Campus France · مقاس 35×45 مم · أقل من 50 كيلوبايت'
    },
    title: {
      en: 'Campus France Photo 50KB (35x45mm) Online Compressor | CompressPhoto',
      fr: 'Photo Campus France 50 Ko (35x45 mm) en Ligne Gratuit | CompressPhoto',
      es: 'Foto Campus France 50KB (35x45 mm) Compresor Online | CompressPhoto',
      ar: 'ضبط وضغط صورة كامبوس فرانس Campus France أقل من 50 كيلوبايت | CompressPhoto'
    },
    metaDescription: {
      en: 'Resize and compress your ID photo for the Campus France (Études en France) portal to exact 35x45 mm proportions and strictly under the 50KB limit.',
      fr: 'Redimensionnez et compressez votre photo d’identité pour votre dossier Campus France (Études en France) au format 35x45 mm et strictement moins de 50 Ko.',
      es: 'Ajusta y comprime tu foto de identidad para la plataforma Campus France (Études en France) en formato 35x45 mm y estrictamente menos de 50 KB.',
      ar: 'اضبط واضغط صورتك الشخصية لمنصة كامبوس فرانس (الدراسة في فرنسا) بمقاس 35×45 مم وبحجم يقل بدقة عن 50 كيلوبايت.'
    },
    h1: {
      en: 'Campus France Photo Resizer & 50KB Compressor (35×45 mm)',
      fr: 'Photo Campus France 50 Ko : Format 35×45 mm Homologué',
      es: 'Foto para Campus France 50KB: Formato Oficial 35×45 mm',
      ar: 'ضبط صورة كامبوس فرانس Campus France بحجم أقل من 50 كيلوبايت'
    },
    subtitle: {
      en: 'Prevents the "File too large (> 50 KB)" error on the Études en France / Pastel student application platform.',
      fr: 'Évite l’erreur « Fichier trop volumineux (> 50 Ko) » lors du dépôt de votre photo d’identité sur la plateforme Études en France.',
      es: 'Evita el error de archivo demasiado pesado (> 50 KB) al subir tu foto en la plataforma Études en France.',
      ar: 'يتجنب رسالة الخطأ الخاصة بتجاوز حجم 50 كيلوبايت عند رفع الصورة الشخصية على منصة الدراسة في فرنسا.'
    },
    directAnswer: {
      en: 'The Campus France (Études en France) portal requires an official 35×45 mm identity photo weighing strictly no more than 50 kilobytes (50 Ko) in JPEG format. Upload your photo above to crop and lock it between 46 KB and 49.8 KB.',
      fr: 'La plateforme Campus France (Études en France) impose une photo d’identité au format 35×45 mm pesant au maximum 50 kilo-octets (50 Ko) en format JPEG. Importez votre photo ci-dessus pour la calibrer automatiquement entre 46 Ko et 49,8 Ko.',
      es: 'La plataforma Campus France exige una foto de identidad de 35×45 mm que pese como máximo 50 KB en formato JPEG. Sube tu foto arriba para ajustarla entre 46 KB y 49,8 KB.',
      ar: 'تشترط منصة كامبوس فرانس (Études en France) صورة شخصية بمقاس 35×45 مم لا يتجاوز حجمها 50 كيلوبايت بصيغة JPEG. ارفع صورتك أعلاه لضبطها تلقائياً.'
    },
    portalSpecs: {
      dimensionsMm: '35 × 45 mm',
      dimensionsPx: '413 × 531 px (300 DPI)',
      maxKb: '≤ 50.0 KB (50 Ko Strict)',
      background: 'Plain Light or White (#FFFFFF)',
      standardCode: 'Études en France / Pastel Spec'
    },
    specificFaqs: {
      en: [
        {
          question: 'Why does Campus France reject my smartphone photo?',
          answer: 'Smartphone photos are usually 2 MB to 5 MB and have a 4:3 ratio. Campus France requires a 35×45 mm portrait ratio and a maximum file size of 50 KB.'
        }
      ],
      fr: [
        {
          question: 'Pourquoi le site Études en France refuse-t-il ma photo ?',
          answer: 'Le portail bloque toute image dépassant 50 Ko. Notre outil réduit le poids juste sous 50 Ko (environ 48 Ko) tout en respectant les dimensions 35×45 mm (413×531 px).'
        },
        {
          question: 'Puis-je aussi compresser mes justificatifs PDF pour Campus France ?',
          answer: 'Oui, vous pouvez télécharger toute pièce d’identité ou photo directement en PDF léger via le bouton « Télécharger en PDF ».'
        }
      ],
      es: [
        {
          question: '¿Por qué Campus France rechaza mi foto?',
          answer: 'El portal rechaza cualquier imagen que supere los 50 KB. Nuestra herramienta la ajusta a ~48 KB manteniendo el formato 35×45 mm.'
        }
      ],
      ar: [
        {
          question: 'لماذا ترفض منصة كامبوس فرانس قبول صورتي؟',
          answer: 'يرفض الموقع أي صورة يتجاوز حجمها 50 كيلوبايت. تقوم أداتنا بضبط المقاس الرسمي 35×45 مم وتثبيت الحجم عند حدود 48 كيلوبايت.'
        }
      ]
    }
  },
  {
    slug: 'uk-passport-photo-35x45mm',
    presetId: 'schengen-35x45',
    targetKb: 50,
    badgeText: {
      en: 'UK HM PASSPORT OFFICE & VISA · 35×45 MM · 300 DPI',
      fr: 'PASSEPORT & VISA ROYAUME-UNI (UK) · 35×45 MM',
      es: 'PASAPORTE Y VISA REINO UNIDO (UK) · 35×45 MM',
      ar: 'جواز سفر وتأشيرة بريطانيا (UK) · مقاس 35×45 مم'
    },
    title: {
      en: 'UK Passport & Visa Photo Size (35x45mm) Online Compressor | CompressPhoto',
      fr: 'Photo Passeport & Visa Royaume-Uni (35x45 mm) en Ligne | CompressPhoto',
      es: 'Foto de Pasaporte y Visa Reino Unido (35x45 mm) Online | CompressPhoto',
      ar: 'ضبط مقاس وحجم صورة جواز سفر وتأشيرة بريطانيا 35×45 مم | CompressPhoto'
    },
    metaDescription: {
      en: 'Format and resize your UK passport, UKVI visa, or driving licence photo to official 35x45 mm (413x531 px at 300 DPI) specifications privately in your browser.',
      fr: 'Formatez et compressez votre photo de passeport britannique ou visa UK au format officiel 35x45 mm (413x531 px à 300 DPI) directement dans votre navigateur.',
      es: 'Ajusta y comprime tu foto de pasaporte británico o visa del Reino Unido al formato oficial 35x45 mm (413x531 px a 300 DPI) en tu navegador.',
      ar: 'اضبط مقاس وحجم صورة جواز السفر البريطاني أو تأشيرة المملكة المتحدة بالمقاس الرسمي 35×45 مم (413×531 بكسل) مباشرة في متصفحك.'
    },
    h1: {
      en: 'UK Passport & Visa Photo Resizer (35×45 mm)',
      fr: 'Photo Passeport & Visa Royaume-Uni (Format 35×45 mm)',
      es: 'Foto de Pasaporte y Visa del Reino Unido (35×45 mm)',
      ar: 'ضبط صورة جواز السفر وتأشيرة بريطانيا (35×45 مم)'
    },
    subtitle: {
      en: 'Calibrated to official 35×45 mm proportions with head-size alignment guide and printable 4×6" (10×15 cm) 8-photo sheet.',
      fr: 'Calibré au format officiel 35×45 mm avec guide d’alignement du visage et planche imprimable 10×15 cm de 8 photos.',
      es: 'Calibrado al tamaño oficial de 35×45 mm con guía de alineación facial y hoja imprimible de 8 fotos.',
      ar: 'معاير بالمقاس الرسمي 35×45 مم مع دليل محاذاة الوجه وإمكانية طباعة ورقة تضم 8 صور.'
    },
    directAnswer: {
      en: 'Standard UK passport, visa (UKVI), and photocard driving licence photos measure 35 mm wide by 45 mm high (413 × 531 pixels at 300 DPI), with the head measuring between 29 mm and 34 mm from chin to crown on a plain light background.',
      fr: 'Les photos de passeport et de visa pour le Royaume-Uni mesurent 35 mm de large sur 45 mm de haut (413 × 531 pixels en 300 DPI), avec une hauteur de tête comprise entre 29 mm et 34 mm sur fond clair uni.',
      es: 'Las fotos de pasaporte y visa del Reino Unido miden 35 mm de ancho por 45 mm de alto (413 × 531 píxeles a 300 DPI), sobre un fondo claro uniforme.',
      ar: 'يبلغ المقاس الرسمي لصورة جواز السفر والتأشيرة البريطانية 35 مم عرضاً في 45 مم ارتفاعاً (413×531 بكسل بدقة 300 DPI) على خلفية فاتحة سادة.'
    },
    portalSpecs: {
      dimensionsMm: '35 × 45 mm (Head 29–34 mm)',
      dimensionsPx: '413 × 531 px (300 DPI)',
      maxKb: '≤ 50 KB / 100 KB / 200 KB',
      background: 'Plain Cream, Light Grey or White',
      standardCode: 'HM Passport Office / UKVI Spec'
    },
    specificFaqs: {
      en: [
        {
          question: 'Can I check if my head size is between 29mm and 34mm?',
          answer: 'Yes. Turn on the "Face & Eye Alignment Guide" under Step 2 to align your eyes and head height within the official 35×45 mm biometric zones.'
        }
      ],
      fr: [
        {
          question: 'Puis-je vérifier l’alignement du visage et des yeux ?',
          answer: 'Oui, activez le « Guide d’Alignement Visage & Yeux » sous l’Étape 2 pour centrer votre visage selon les normes officielles.'
        }
      ],
      es: [
        {
          question: '¿Puedo comprobar la alineación del rostro y los ojos?',
          answer: 'Sí, activa la "Guía de Alineación de Rostro y Ojos" debajo del Paso 2 para centrar tu retrato correctamente.'
        }
      ],
      ar: [
        {
          question: 'هل يمكنني التحقق من محاذاة الوجه والعينين؟',
          answer: 'نعم، فعّل دليل محاذاة الوجه والعينين أسفل الخطوة الثانية لضبط موقع الرأس والعينين بدقة.'
        }
      ]
    }
  },
  {
    slug: 'canada-passport-visa-photo-50x70mm',
    presetId: 'custom',
    targetKb: 100,
    customWidth: 591,
    customHeight: 827,
    badgeText: {
      en: 'CANADA IRCC PASSPORT, VISA & PR · 50×70 MM (591×827 PX)',
      fr: 'PASSEPORT, VISA & RP CANADA (IRCC) · 50×70 MM (591×827 PX)',
      es: 'PASAPORTE Y VISA DE CANADÁ (IRCC) · 50×70 MM (591×827 PX)',
      ar: 'جواز سفر وتأشيرة كندا (IRCC) · مقاس 50×70 مم (591×827 بكسل)'
    },
    title: {
      en: 'Canada Passport & Visa Photo Size (50x70mm / 591x827 px) Compressor | CompressPhoto',
      fr: 'Photo Passeport, Visa & RP Canada (50x70 mm) en Ligne | CompressPhoto',
      es: 'Foto de Pasaporte y Visa de Canadá (50x70 mm) Online | CompressPhoto',
      ar: 'ضبط مقاس صورة جواز سفر وتأشيرة كندا 50×70 مم أونلاين | CompressPhoto'
    },
    metaDescription: {
      en: 'Resize and compress Canada passport, IRCC temporary resident visa, and Permanent Resident (PR) photos to exact 50x70 mm (591x827 px at 300 DPI) online.',
      fr: 'Redimensionnez et compressez votre photo de passeport canadien, visa IRCC ou Résidence Permanente au format officiel 50x70 mm (591x827 px à 300 DPI).',
      es: 'Ajusta y comprime tu foto de pasaporte canadiense, visa IRCC o Residencia Permanente al tamaño oficial de 50x70 mm (591x827 px a 300 DPI).',
      ar: 'اضبط واضغط صورة جواز السفر الكندي أو تأشيرة كندا والإقامة الدائمة بالمقاس الرسمي 50×70 مم (591×827 بكسل بدقة 300 DPI).'
    },
    h1: {
      en: 'Canada Passport, Visa & PR Photo Resizer (50×70 mm)',
      fr: 'Photo Passeport, Visa & RP Canada : Format Officiel 50×70 mm',
      es: 'Foto de Pasaporte y Visa de Canadá (Formato 50×70 mm)',
      ar: 'ضبط صورة جواز السفر وتأشيرة كندا (مقاس 50×70 مم)'
    },
    subtitle: {
      en: 'Automatically sets the exact 50×70 mm (2 × 2¾ inches = 591 × 827 pixels at 300 DPI) dimensions required by Immigration, Refugees and Citizenship Canada (IRCC).',
      fr: 'Applique automatiquement les dimensions exactes de 50×70 mm (591 × 827 pixels en 300 DPI) exigées par Immigration, Réfugiés et Citoyenneté Canada (IRCC).',
      es: 'Configura automáticamente las dimensiones exactas de 50×70 mm (591 × 827 píxeles a 300 DPI) exigidas por IRCC Canadá.',
      ar: 'يطبق تلقائياً الأبعاد الرسمية 50×70 مم (591 × 827 بكسل بدقة 300 DPI) المعتمدة لدى دائرة الهجرة والجنسية الكندية (IRCC).'
    },
    directAnswer: {
      en: 'Unlike European 35×45 mm or US 2×2 inch photos, Canada passports and IRCC visa applications require a 50 mm wide by 70 mm high frame (591 × 827 pixels at 300 DPI, or at least 420 × 540 pixels for online uploads). This page pre-sets those exact 50×70 mm dimensions.',
      fr: 'Contrairement au format européen 35×45 mm, le passeport canadien et les demandes IRCC (Visa, Permis d’études, RP) exigent un format de 50 mm × 70 mm (soit 591 × 827 pixels à 300 DPI). Cette page pré-remplit automatiquement ces dimensions.',
      es: 'A diferencia del formato 35×45 mm, el pasaporte canadiense y las solicitudes IRCC exigen un tamaño de 50 mm × 70 mm (591 × 827 píxeles a 300 DPI). Esta página configura esas medidas automáticamente.',
      ar: 'بخلاف المقاس الأوروبي 35×45 مم، يشترط جواز السفر الكندي وطلبات الهجرة والتأشيرة الكندية (IRCC) مقاس 50×70 مم (أي 591×827 بكسل بدقة 300 DPI)، وهو مضبوط تلقائياً في هذه الصفحة.'
    },
    portalSpecs: {
      dimensionsMm: '50 × 70 mm (2 × 2¾ inches)',
      dimensionsPx: '591 × 827 px (300 DPI) / Min 420×540 px',
      maxKb: '≤ 100 KB / 200 KB',
      background: 'Plain White (#FFFFFF)',
      standardCode: 'Canada IRCC 50×70 mm Spec'
    },
    specificFaqs: {
      en: [
        {
          question: 'What are the pixel dimensions for a 50x70 mm Canada photo at 300 DPI?',
          answer: 'At 300 DPI print resolution, 50 mm × 70 mm equals 591 × 827 pixels. For IRCC online digital uploads, the minimum accepted pixel size is 420 × 540 pixels.'
        }
      ],
      fr: [
        {
          question: 'Quelle est la taille en pixels d’une photo Canada 50×70 mm ?',
          answer: 'En résolution d’impression 300 DPI, 50 × 70 mm correspond à 591 × 827 pixels (et au minimum 420 × 540 pixels pour un téléversement numérique sur le portail IRCC).'
        }
      ],
      es: [
        {
          question: '¿Cuántos píxeles tiene una foto de Canadá de 50×70 mm?',
          answer: 'A 300 DPI de resolución, 50 × 70 mm equivale exactamente a 591 × 827 píxeles.'
        }
      ],
      ar: [
        {
          question: 'كم يبلغ مقاس صورة كندا 50×70 مم بالبكسل؟',
          answer: 'عند دقة طباعة 300 DPI، يعادل مقاس 50×70 مم أبعاد 591 × 827 بكسل.'
        }
      ]
    }
  },
  {
    slug: 'passport-photo-4x6-print-sheet',
    presetId: 'schengen-35x45',
    targetKb: 50,
    autoFeature: 'print-sheet',
    badgeText: {
      en: 'PRINT 8 PASSPORT PHOTOS ON ONE 4×6" (10×15 CM) SHEET · FREE',
      fr: 'PLANCHE IMPRIMABLE 10×15 CM (4×6") DE 8 PHOTOS D’IDENTITÉ',
      es: 'HOJA IMPRIMIBLE 10×15 CM (4×6") CON 8 FOTOS DE PASAPORTE',
      ar: 'ورقة طباعة 10×15 سم (4×6 بوصة) تضم 8 صور شخصية مجاناً'
    },
    title: {
      en: 'Print Passport Photos on 4x6 Sheet (10x15 cm 8-Photo Grid) Free | CompressPhoto',
      fr: 'Planche Photo d’Identité 10x15 cm (8 Photos à Imprimer) Gratuit | CompressPhoto',
      es: 'Imprimir 8 Fotos de Pasaporte en Hoja 10x15 cm (4x6") Gratis | CompressPhoto',
      ar: 'طباعة 8 صور شخصية على ورقة 10×15 سم (4×6 بوصة) مجاناً | CompressPhoto'
    },
    metaDescription: {
      en: 'Arrange 8 passport or visa photos on a single 4x6 inch (10x15 cm) 300 DPI printable photo sheet with crop marks for free. Print at home or any pharmacy kiosk.',
      fr: 'Créez gratuitement une planche de 8 photos d’identité 35x45 mm sur une feuille 10x15 cm (4x6 pouces) à 300 DPI avec traits de coupe pour impression maison ou borne.',
      es: 'Genera gratis una plantilla de 8 fotos de pasaporte o visa en una hoja de 10x15 cm (4x6 pulgadas) a 300 DPI con líneas de corte lista para imprimir.',
      ar: 'أنشئ مجاناً ورقة طباعة بحجم 10×15 سم (4×6 بوصة) تضم 8 صور جواز سفر أو هوية بدقة 300 DPI مع علامات القص للطباعة الفورية.'
    },
    h1: {
      en: 'Free 4×6 Inch (10×15 cm) Passport Photo Print Sheet Generator',
      fr: 'Créer une Planche de 8 Photos d’Identité 10×15 cm (4×6") à Imprimer',
      es: 'Plantilla para Imprimir 8 Fotos de Pasaporte en Hoja 10×15 cm (4×6")',
      ar: 'إنشاء ورقة طباعة 8 صور شخصية بمقاس 10×15 سم (4×6 بوصة) مجاناً'
    },
    subtitle: {
      en: 'Generates a 300 DPI 1800×1200 px postcard sheet containing 8 perfectly sized passport or visa photos with scissor cut guides—100% free with no watermark.',
      fr: 'Génère une planche 10×15 cm en 300 DPI (1800×1200 px) contenant 8 photos d’identité à la taille exacte avec repères de découpe — 100 % gratuit et sans filigrane.',
      es: 'Genera una hoja de 10×15 cm a 300 DPI (1800×1200 px) con 8 fotos al tamaño exacto y guías de corte — 100% gratis y sin marca de agua.',
      ar: 'ينشئ ورقة طباعة قياسية 10×15 سم بدقة 300 DPI تضم 8 صور بالمقاس الرسمي مع خطوط قص واضحة — مجاناً بالكامل وبدون علامة مائية.'
    },
    directAnswer: {
      en: 'Instead of paying $10–$15 at a photo booth, upload your portrait above and click "4×6" Print Sheet (8 Photos)". You get a 300 DPI 4×6 inch (10×15 cm) JPEG sheet containing 8 passport photos with crop marks that costs around $0.25 to print at any pharmacy or home printer.',
      fr: 'Au lieu de payer 8 € à 12 € en photomaton, importez votre photo ci-dessus et cliquez sur « Planche 4×6" (8 Photos) ». Vous obtenez une feuille 10×15 cm à 300 DPI contenant 8 photos d’identité avec traits de coupe, imprimable pour quelques centimes sur n’importe quelle borne photo ou imprimante.',
      es: 'En lugar de pagar en una cabina fotográfica, sube tu foto arriba y abre la hoja 4×6" (10×15 cm). Obtendrás una plantilla a 300 DPI con 8 fotos y marcas de corte lista para imprimir en casa o en cualquier tienda.',
      ar: 'بدلاً من دفع تكلفة باهظة في أكشاك التصوير، ارفع صورتك أعلاه واحصل فوراً على ورقة مقاس 10×15 سم (4×6 بوصة) بدقة 300 DPI تحتوي على 8 صور جاهزة للطباعة والقص.'
    },
    portalSpecs: {
      dimensionsMm: '101.6 × 152.4 mm (4×6" / 10×15 cm Sheet)',
      dimensionsPx: '1800 × 1200 px (300 DPI Print Sheet)',
      maxKb: '8 Photos per Sheet + Cut Marks',
      background: 'Pure White Studio Grid',
      standardCode: '300 DPI Pharmacy & Home Print Standard'
    },
    specificFaqs: {
      en: [
        {
          question: 'Will the photos print at the exact 35×45 mm or 2×2 inch physical size?',
          answer: 'Yes. Because the 4×6 inch (10×15 cm) canvas is rendered at an exact 1800 × 1200 pixels (300 DPI), printing it on standard 4×6" photo paper without "Fit/Stretch to Fill" produces exact millimeter dimensions.'
        },
        {
          question: 'Does the printable sheet have any watermarks?',
          answer: 'No. Watermarks are off by default, and you can also toggle the bottom studio date label on or off before downloading.'
        }
      ],
      fr: [
        {
          question: 'Les 8 photos auront-elles exactement la taille 35×45 mm une fois imprimées ?',
          answer: 'Oui. La planche 10×15 cm étant calibrée à 1800 × 1200 pixels (300 DPI), chaque photo mesure exactement 35 × 45 mm à l’impression sur papier photo 10×15 cm standard.'
        }
      ],
      es: [
        {
          question: '¿Las 8 fotos saldrán al tamaño exacto de 35×45 mm al imprimir?',
          answer: 'Sí. Al estar calibrada a 1800 × 1200 píxeles (300 DPI), cada foto mide exactamente 35 × 45 mm al imprimirse en papel fotográfico estándar de 10×15 cm (4×6").'
        }
      ],
      ar: [
        {
          question: 'هل ستخرج الصور الثماني بالمقاس الحقيقي 35×45 مم عند الطباعة؟',
          answer: 'نعم، لأن ورقة 10×15 سم مصممة بأبعاد 1800×1200 بكسل (بدقة 300 DPI)، فإن كل صورة تخرج بالمقاس الرسمي الدقيق عند طباعتها على ورق صور 10×15 سم.'
        }
      ]
    }
  }
];

export function getToolLandingBySlug(slug: string | null): ToolLandingPageConfig | null {
  if (!slug) return null;
  return TOOL_LANDING_PAGES.find((t) => t.slug === slug) || null;
}

export interface RichHomeGeoContent {
  directAnswer: string;
  specTableHeading: string;
  specTableSub: string;
  colPortal: string;
  colDimensionsMm: string;
  colPixels: string;
  colMaxKb: string;
  colAction: string;
  applyPresetBtn: string;
  rejectionTitle: string;
  rejectionSub: string;
  rejectionReasons: Array<{ title: string; desc: string }>;
  faqHeading: string;
  faqSub: string;
  faqs: Array<{ question: string; answer: string }>;
  dedicatedToolsHeading: string;
  dedicatedToolsSub: string;
  eeatBadgeTitle: string;
  eeatBadgeDesc: string;
  checklistTitle: string;
  checklistKbPass: string;
  checklistDpiPass: string;
  checklistSrgbPass: string;
  checklistPrivacyPass: string;
}

export const HOME_GEO_CONTENT: Record<LocaleCode, RichHomeGeoContent> = {
  en: {
    directAnswer:
      'CompressPhoto resizes and compresses passport photos, visa portraits, and handwritten signatures to exact kilobyte limits (10KB, 20KB, 50KB, 100KB, 200KB) at 300 DPI. Your files are processed privately on your own device and are never uploaded to any server.',
    specTableHeading: 'Official Photo & Signature Sizes by Country & Portal (2026)',
    specTableSub:
      'Select any official passport, visa, or exam format below to set the exact pixel dimensions and kilobyte limit automatically.',
    colPortal: 'Official Portal / Document',
    colDimensionsMm: 'Physical Size',
    colPixels: 'Pixels @ 300 DPI',
    colMaxKb: 'Max File Size',
    colAction: 'Quick Setup',
    applyPresetBtn: 'Use This Size →',
    rejectionTitle: 'Why Online Portals Reject Uploaded Photos (And How We Fix It)',
    rejectionSub:
      'Online application forms check four main requirements before accepting your photo or signature:',
    rejectionReasons: [
      {
        title: '01. File Size Slightly Over the Limit (e.g., 20.4 KB on a 20 KB limit)',
        desc: 'Normal quality sliders only guess percentages. Our tool locks the exact file size safely below your required kilobyte limit while keeping the clearest possible image.'
      },
      {
        title: '02. Wrong Dimensions or Low Print Resolution',
        desc: 'Cropping by hand breaks the official 35×45 mm (413×531 px) or 2×2 inch (600×600 px) proportions. Our presets apply the exact 300 DPI dimensions automatically.'
      },
      {
        title: '03. Unsupported Smartphone Photo Formats (HEIC)',
        desc: 'Many government portals reject raw iPhone or Android camera files. We automatically convert your photo into a universally accepted standard JPEG, PNG, or PDF.'
      },
      {
        title: '04. Grey Shadows on Photographed Signatures',
        desc: 'Indoor lighting makes white paper look grey in phone photos. Our Signature mode turns the paper background clean white while keeping your pen strokes sharp under 20 KB.'
      }
    ],
    faqHeading: 'Frequently Asked Questions — Photo & Signature Compression',
    faqSub:
      'Helpful answers for preparing passport, visa, exam, and signature files.',
    faqs: [
      {
        question: 'How can I compress a photo to 20KB or 50KB without making it blurry?',
        answer:
          'Upload your photo, choose your document type (such as 35×45 mm Passport or Signature), and click 20 KB or 50 KB. The tool optimizes the file size at 300 DPI while keeping facial details clear and sharp.'
      },
      {
        question: 'Are my passport photos or signatures uploaded to any server?',
        answer:
          'No. Every photo and signature is processed directly inside your web browser on your own phone or computer. Your personal images never leave your device.'
      },
      {
        question: 'What are the pixel dimensions for a 35×45 mm passport photo and a 2×2 inch US visa photo?',
        answer:
          'At the standard 300 DPI resolution, a 35×45 mm passport photo (France ANTS, Morocco CNIE, Schengen, UK) is 413 × 531 pixels. A 2×2 inch US Visa (DS-160 / Green Card Lottery) photo is 600 × 600 pixels.'
      },
      {
        question: 'How do I remove the grey background from a handwritten signature photo under 20KB?',
        answer:
          'Select the "Handwritten Signature" option in Step 1. The signature cleaner automatically turns shadowed grey paper into pure white and keeps the file under 20 KB.'
      },
      {
        question: 'Can I save my compressed photo as a PDF under 50KB or 100KB?',
        answer:
          'Yes. After compressing your image, click "Download as PDF" below the preview. The exported PDF file is guaranteed to stay under your selected kilobyte limit.'
      },
      {
        question: 'How can I print 8 passport photos on a single 4×6 inch (10×15 cm) sheet?',
        answer:
          'Click "4×6" Print Sheet (8 Photos)" below the preview to download a ready-to-print 4×6 inch (10×15 cm) sheet containing 8 passport photos with cut lines.'
      }
    ],
    dedicatedToolsHeading: 'Popular Photo & Official Portal Tools',
    dedicatedToolsSub:
      'Open a ready-to-use compressor pre-set for your required kilobyte size or application portal:',
    eeatBadgeTitle: 'Official Passport, Visa & Signature Standards',
    eeatBadgeDesc:
      'Pre-set for 35×45 mm passports, 2×2 inch US visas, and civil service exam signatures. 100% private on your device.',
    checklistTitle: 'Photo Quality Check',
    checklistKbPass: 'Exact KB Size Verified',
    checklistDpiPass: '300 DPI Resolution',
    checklistSrgbPass: 'Ready for Online Upload',
    checklistPrivacyPass: '100% Private on Your Device'
  },
  fr: {
    directAnswer:
      'CompressPhoto redimensionne et compresse vos photos d’identité, passeports, visas et signatures manuscrites au poids exact en kilo-octets (10 Ko, 20 Ko, 50 Ko, 100 Ko, 200 Ko) en 300 DPI. Vos photos sont traitées directement sur votre appareil et ne sont jamais envoyées sur internet.',
    specTableHeading: 'Tableau des Formats Officiels Photos d’Identité, Passeports & Concours (2026)',
    specTableSub:
      'Cliquez sur n’importe quel organisme ci-dessous (ANTS, CNIE Maroc, Visa US DS-160, Signature) pour régler automatiquement les bonnes dimensions.',
    colPortal: 'Organisme / Document',
    colDimensionsMm: 'Format (mm)',
    colPixels: 'Dimensions (300 DPI)',
    colMaxKb: 'Poids Max (Ko)',
    colAction: 'Réglage Rapide',
    applyPresetBtn: 'Utiliser ce format →',
    rejectionTitle: 'Pourquoi votre photo est refusée sur les sites officiels (Et comment éviter cela)',
    rejectionSub:
      'Les portails en ligne vérifient 4 points essentiels avant d’accepter votre photo ou signature :',
    rejectionReasons: [
      {
        title: '01. Fichier légèrement trop lourd (ex : 50,3 Ko pour une limite à 50 Ko)',
        desc: 'Notre outil ajuste automatiquement la compression pour que votre fichier reste juste en dessous du poids maximum autorisé tout en restant parfaitement net.'
      },
      {
        title: '02. Dimensions incorrectes ou résolution trop faible',
        desc: 'Un recadrage manuel déforme souvent le format 35×45 mm (413×531 px) ou 2×2 pouces (600×600 px). Nos formats appliquent la taille exacte en 300 DPI.'
      },
      {
        title: '03. Format photo de smartphone non reconnu (HEIC)',
        desc: 'De nombreux sites administratifs refusent le format brut des téléphones récents. Nous convertissons automatiquement votre image en JPEG, PNG ou PDF standard.'
      },
      {
        title: '04. Ombre grise sur les signatures photographiées',
        desc: 'Une feuille blanche prise en photo au téléphone paraît souvent grise. Le mode Signature blanchit le fond du papier tout en gardant un fichier inférieur à 20 Ko.'
      }
    ],
    faqHeading: 'Questions Fréquentes (FAQ) — Compression Photo & Formats d’Identité',
    faqSub:
      'Conseils pratiques pour réussir vos démarches ANTS, CNIE Maroc, Visa US DS-160 et concours.',
    faqs: [
      {
        question: 'Comment compresser une photo à 20 Ko ou 50 Ko sans perdre en netteté ?',
        answer:
          'Importez votre photo, choisissez votre format (ex : Passeport 35×45 mm ou Signature) et cliquez sur 20 Ko ou 50 Ko. L’outil ajuste le poids au Ko près en 300 DPI tout en préservant la netteté du visage.'
      },
      {
        question: 'Mes photos d’identité sont-elles envoyées sur un serveur ?',
        answer:
          'Non, jamais. Toutes les modifications sont effectuées directement sur votre téléphone ou votre ordinateur. Vos photos personnelles restent 100 % privées.'
      },
      {
        question: 'Quelle est la taille en pixels pour une photo ANTS (France) ou CNIE (Maroc) ?',
        answer:
          'Le format officiel 35×45 mm correspond exactement à 413 × 531 pixels en 300 DPI, avec un poids recommandé inférieur à 50 Ko.'
      },
      {
        question: 'Comment enlever l’ombre grise d’une signature manuscrite sous 20 Ko ?',
        answer:
          'Choisissez « Signature Manuscrite » à l’Étape 1. Le nettoyage automatique rend le papier parfaitement blanc et réduit le fichier sous 20 Ko.'
      },
      {
        question: 'Comment convertir une photo en PDF de moins de 50 Ko ou 100 Ko ?',
        answer:
          'Après la compression de votre photo, cliquez sur « Télécharger en PDF » sous l’aperçu pour obtenir un document PDF respectant votre limite en Ko.'
      },
      {
        question: 'Comment imprimer 8 photos d’identité sur une feuille 10×15 cm ?',
        answer:
          'Cliquez sur « Planche 4×6" (8 Photos) » sous l’aperçu pour télécharger une planche 10×15 cm prête à imprimer avec 8 photos et repères de découpe.'
      }
    ],
    dedicatedToolsHeading: 'Outils par Poids en Ko & par Démarche Officielle',
    dedicatedToolsSub:
      'Ouvrez directement l’outil pré-réglé pour votre démarche ou votre limite de poids :',
    eeatBadgeTitle: 'Formats Officiels Passeport, Visa & Signature',
    eeatBadgeDesc:
      'Calibré pour les photos 35×45 mm (ANTS, CNIE), visas US 2×2" (DS-160) et signatures. 100 % privé sur votre appareil.',
    checklistTitle: 'Vérification de la Photo',
    checklistKbPass: 'Poids en Ko Respecté',
    checklistDpiPass: 'Résolution 300 DPI',
    checklistSrgbPass: 'Prêt pour Dossier en Ligne',
    checklistPrivacyPass: '100 % Privé sur Votre Appareil'
  },
  es: {
    directAnswer:
      'CompressPhoto ajusta el tamaño y comprime tus fotos de pasaporte, visa y firmas manuscritas al peso exacto en kilobytes (10KB, 20KB, 50KB, 100KB, 200KB) a 300 DPI. Tus fotos se procesan de forma privada en tu propio dispositivo y nunca se suben a internet.',
    specTableHeading: 'Tabla de Formatos Oficiales de Fotos de Pasaporte, Visa y Exámenes (2026)',
    specTableSub:
      'Selecciona cualquier formato oficial abajo para ajustar automáticamente las dimensiones en píxeles y el peso máximo en KB.',
    colPortal: 'Trámite / Documento',
    colDimensionsMm: 'Tamaño (mm)',
    colPixels: 'Dimensiones (300 DPI)',
    colMaxKb: 'Peso Máx (KB)',
    colAction: 'Ajuste Rápido',
    applyPresetBtn: 'Usar este formato →',
    rejectionTitle: 'Por qué los sitios oficiales rechazan tu foto (Y cómo evitarlo)',
    rejectionSub:
      'Los formularios en línea revisan 4 requisitos principales antes de aceptar tu archivo:',
    rejectionReasons: [
      {
        title: '01. Archivo ligeramente superior al límite (ej. 20,3 KB en un límite de 20 KB)',
        desc: 'Nuestra herramienta ajusta el peso exacto para que tu foto quede justo por debajo del límite permitido manteniendo la mejor nitidez.'
      },
      {
        title: '02. Proporción incorrecta o baja resolución',
        desc: 'Nuestros formatos aplican automáticamente el tamaño exacto de 35×45 mm (413×531 px) o 2×2 pulgadas (600×600 px) a 300 DPI.'
      },
      {
        title: '03. Formato de cámara de móvil no compatible (HEIC)',
        desc: 'Convertimos automáticamente la imagen de tu teléfono a formato JPEG, PNG o PDF compatible con todos los portales oficiales.'
      },
      {
        title: '04. Sombra gris en firmas manuscritas fotografiadas',
        desc: 'El modo Firma limpia el fondo gris del papel dejándolo blanco puro y manteniendo el archivo por debajo de 20 KB.'
      }
    ],
    faqHeading: 'Preguntas Frecuentes (FAQ) — Compresión de Fotos y Firmas',
    faqSub:
      'Respuestas prácticas para preparar fotos de pasaporte, visa, trámites y firmas.',
    faqs: [
      {
        question: '¿Cómo comprimir una foto a 20KB o 50KB sin perder nitidez?',
        answer:
          'Sube tu foto, elige el formato (ej. Pasaporte 35×45 mm o Firma) y selecciona 20 KB o 50 KB. La herramienta optimiza el archivo a 300 DPI conservando la claridad del rostro.'
      },
      {
        question: '¿Mis fotos o firmas se suben a algún servidor?',
        answer:
          'No, nunca. Todo el proceso se realiza directamente en tu teléfono u ordenador. Tus imágenes nunca salen de tu dispositivo.'
      },
      {
        question: '¿Cuáles son las medidas en píxeles para 35×45 mm y 2×2 pulgadas?',
        answer:
          'A 300 DPI, 35×45 mm equivale a 413 × 531 píxeles y 2×2 pulgadas (Visa EE.UU. DS-160) equivale a 600 × 600 píxeles.'
      },
      {
        question: '¿Puedo guardar mi foto comprimida en formato PDF menor de 50KB?',
        answer:
          'Sí, haz clic en "Descargar en PDF" debajo de la vista previa para obtener un archivo PDF garantizado por debajo de tu límite de KB.'
      }
    ],
    dedicatedToolsHeading: 'Herramientas por Peso en KB y Trámites Oficiales',
    dedicatedToolsSub:
      'Abre directamente el compresor configurado para tu límite de kilobytes o trámite:',
    eeatBadgeTitle: 'Formatos Oficiales de Pasaporte, Visa y Firma',
    eeatBadgeDesc:
      'Configurado para pasaportes de 35×45 mm, visas de EE.UU. de 2×2" y firmas. 100% privado en tu dispositivo.',
    checklistTitle: 'Verificación de la Foto',
    checklistKbPass: 'Peso en KB Correcto',
    checklistDpiPass: 'Resolución 300 DPI',
    checklistSrgbPass: 'Listo para Subir en Línea',
    checklistPrivacyPass: '100% Privado en Tu Dispositivo'
  },
  ar: {
    directAnswer:
      'تتيح لك منصة CompressPhoto ضبط أبعاد وضغط صور جواز السفر والتأشيرات والتوقيعات الخطية بالحجم الدقيق بالكيلوبايت (10، 20، 50، 100، 200 كيلوبايت) بدقة 300 DPI. تتم معالجة صورك بخصوصية تامة على جهازك مباشرة دون رفعها لأي خادم.',
    specTableHeading: 'جدول المقاسات الرسمية لصور جواز السفر والتأشيرات والامتحانات (2026)',
    specTableSub:
      'اختر أي وثيقة رسمية أدناه (البطاقة الوطنية CNIE، جواز السفر، تأشيرة أمريكا DS-160، التوقيع الخطي) لضبط الأبعاد والحجم تلقائياً.',
    colPortal: 'الوثيقة / البوابة الرسمية',
    colDimensionsMm: 'المقاس (مم)',
    colPixels: 'الأبعاد (300 DPI)',
    colMaxKb: 'الحد الأقصى للحجم',
    colAction: 'ضبط سريع',
    applyPresetBtn: 'استخدام هذا المقاس ←',
    rejectionTitle: 'لماذا ترفض المواقع الرسمية قبول صورتك؟ (وكيف نضمن قبولها)',
    rejectionSub:
      'تتحقق نماذج التسجيل الإلكترونية من 4 شروط أساسية قبل قبول ملف الصورة أو التوقيع:',
    rejectionReasons: [
      {
        title: '01. تجاوز الحجم المسموح به بجزء بسيط (مثل 20.3 كيلوبايت عند حد 20 كيلوبايت)',
        desc: 'تقوم أداتنا بضبط حجم الملف بدقة ليبقى أقل من الحد الأقصى المطلوب مع الحفاظ على أعلى وضوح ممكن للملامح.'
      },
      {
        title: '02. مقاسات غير مطابقة أو دقة ضعيفة',
        desc: 'تطبق قوالبنا الجاهزة المقاس الرسمي 35×45 مم (413×531 بكسل) أو 2×2 بوصة (600×600 بكسل) بدقة 300 DPI تلقائياً.'
      },
      {
        title: '03. صيغ كاميرا الهاتف غير المدعومة (HEIC)',
        desc: 'نحول صور الهاتف تلقائياً إلى صيغة JPEG أو PNG أو PDF قياسية مقبولة في جميع المواقع الحكومية.'
      },
      {
        title: '04. الخلفية الرمادية في صور التوقيع المصورة بالهاتف',
        desc: 'يقوم وضع التوقيع الخطي بتحويل خلفية الورقة الرمادية إلى اللون الأبيض النقي مع تقليص الحجم تحت 20 كيلوبايت.'
      }
    ],
    faqHeading: 'الأسئلة الشائعة — ضغط الصور الشخصية والتوقيعات',
    faqSub:
      'إجابات مبسطة لتجهيز صور جواز السفر والبطاقة الوطنية والتأشيرات والتوقيعات.',
    faqs: [
      {
        question: 'كيف أضغط صورة إلى 20 أو 50 كيلوبايت دون أن تفقد وضوحها؟',
        answer:
          'ارفع صورتك واختر نوع الوثيقة (مثل جواز السفر 35×45 مم أو التوقيع) ثم اختر 20 أو 50 كيلوبايت. ستقوم الأداة بضبط الحجم بدقة 300 DPI مع الحفاظ على وضوح الوجه.'
      },
      {
        question: 'هل يتم رفع صوري الشخصية إلى الإنترنت؟',
        answer:
          'لا، أبداً. تتم جميع خطوات القص والضغط مباشرة على هاتفك أو حاسوبك، ولا تغادر صورك جهازك نهائياً.'
      },
      {
        question: 'ما هو المقاس بالبكسل لصورة 35×45 مم وصورة تأشيرة أمريكا 2×2 بوصة؟',
        answer:
          'عند دقة 300 DPI، يعادل مقاس 35×45 مم 413 × 531 بكسل، ويعادل مقاس 2×2 بوصة لتأشيرة أمريكا واللوتري 600 × 600 بكسل.'
      },
      {
        question: 'كيف أحفظ الصورة بصيغة PDF بحجم أقل من 50 كيلوبايت؟',
        answer:
          'بعد ضغط الصورة، اضغط على زر تحميل بصيغة PDF أسفل المعاينة للحصول على ملف PDF جاهز ومضمون تحت الحجم المحدد.'
      }
    ],
    dedicatedToolsHeading: 'أدوات جاهزة حسب الحجم بالكيلوبايت ونوع الوثيقة',
    dedicatedToolsSub:
      'افتح الأداة المضبوطة مسبقاً حسب الحجم أو الوثيقة المطلوبة:',
    eeatBadgeTitle: 'المقاسات الرسمية لجوازات السفر والتأشيرات والتوقيعات',
    eeatBadgeDesc:
      'مضبوط مسبقاً لصور 35×45 مم وتأشيرات أمريكا 2×2 بوصة والتوقيعات. خصوصية تامة 100% على جهازك.',
    checklistTitle: 'فحص جاهزية الصورة',
    checklistKbPass: 'الحجم بالكيلوبايت مطابق',
    checklistDpiPass: 'دقة 300 DPI',
    checklistSrgbPass: 'جاهز للرفع الإلكتروني',
    checklistPrivacyPass: 'خصوصية 100% على جهازك'
  }
};
