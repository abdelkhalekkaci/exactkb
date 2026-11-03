import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRightLeft,
  Barcode,
  Calendar,
  Check,
  Coffee,
  Contact,
  Copy,
  CreditCard,
  Download,
  FileCode2,
  FileText,
  Globe,
  Layers,
  Mail,
  MapPin,
  MessageSquare,
  Palette,
  Phone,
  Plus,
  Send,
  Settings2,
  Share2,
  Sliders,
  Smartphone,
  Trash2,
  Upload,
  Wifi
} from 'lucide-react';
import {
  AppStorePayloadData,
  CenterEmblemPreset,
  CustomBuilderPayloadData,
  EmailPayloadData,
  EventPayloadData,
  FinderInnerStyle,
  FinderPatternStyle,
  LocaleCode,
  LocationPayloadData,
  MenuPayloadData,
  ModuleDotStyle,
  PaymentPayloadData,
  PhonePayloadData,
  QRCategoryFilter,
  QRErrorCorrectionLevel,
  QRFrameStyle,
  QRGradientDirection,
  QRPayloadType,
  SmsPayloadData,
  SocialPayloadData,
  VCardPayloadData,
  WhatsappPayloadData,
  WifiPayloadData
} from '../types/atelier';
import {
  buildRawPayloadString,
  generateVectorSvgString,
  renderSvgToHighResPngDataUrl
} from '../utils/qrAndBarcodeEngine';
import { TRANSLATIONS } from '../data/seoRoutesAndTranslations';
import { VisitorVisualGuide } from './VisitorVisualGuide';

interface QrPrintshopPageProps {
  locale: LocaleCode;
  initialPayloadType: QRPayloadType;
  onSendQrToExactKb: (pngDataUrl: string) => void;
}

type CustomizeSubTab = 'shapes' | 'colors' | 'logo-frame' | 'advanced';

interface LocalizedMenuLabels {
  fullMenuKicker: string;
  catAll: string;
  catWeb: string;
  catContact: string;
  catVenue: string;
  catCommerce: string;
  catCustom: string;
  types: Record<QRPayloadType, { label: string; desc: string }>;
  customSectionTitle: string;
  customSectionSub: string;
  extraNonMentionedLabel: string;
  extraNonMentionedPlaceholder: string;
  extraNonMentionedHint: string;
  switchToFullCustomBtn: string;
  custTabShapes: string;
  custTabColors: string;
  custTabLogoFrame: string;
  custTabAdvanced: string;
  modulePatternLabel: string;
  cornerFrameLabel: string;
  cornerDotLabel: string;
  colorPresetsLabel: string;
  fgColorLabel: string;
  bgColorLabel: string;
  transparentBgLabel: string;
  gradientLabel: string;
  gradientColor2Label: string;
  gradientDirLabel: string;
  customEyeColorLabel: string;
  presetBadgesLabel: string;
  logoScaleLabel: string;
  frameStyleLabel: string;
  frameTextLabel: string;
  eccLevelLabel: string;
  quietZoneLabel: string;
  exportResLabel: string;
  rawPayloadInspectorLabel: string;
  rawOverrideToggle: string;
  copyPayloadBtn: string;
  copiedLabel: string;
  resetStyleBtn: string;
}

const QR_MENU_I18N: Record<LocaleCode, LocalizedMenuLabels> = {
  en: {
    fullMenuKicker: 'Complete 16-Option QR & Barcode Menu — Choose Any Preset or Build a Custom Non-Mentioned Format',
    catAll: 'All Options (16)',
    catWeb: 'Web & Social',
    catContact: 'Contact & Comms',
    catVenue: 'Venue & Events',
    catCommerce: 'Payments & Retail',
    catCustom: 'Custom / Other',
    types: {
      url: { label: 'Website URL', desc: 'Direct link + optional UTM tags' },
      wifi: { label: 'Wi-Fi Network', desc: 'Auto-connect SSID & password' },
      vcard: { label: 'vCard 3.0 Contact', desc: 'Full digital business card' },
      menu: { label: 'Café / Menu', desc: 'Restaurant menu + table number' },
      whatsapp: { label: 'WhatsApp Chat', desc: 'Direct wa.me pre-filled chat' },
      email: { label: 'Email Message', desc: 'Recipient, subject & body' },
      phone: { label: 'Phone Call', desc: 'Instant 1-tap dial (tel:)' },
      sms: { label: 'SMS Text', desc: 'Pre-filled SMS number & text' },
      location: { label: 'GPS / Maps', desc: 'Coordinates or Google Maps' },
      event: { label: 'Calendar Event', desc: 'iCal VEVENT date, time & venue' },
      social: { label: 'Social Profile', desc: 'Instagram, TikTok, LinkedIn, X' },
      payment: { label: 'Payment / Crypto', desc: 'PayPal, UPI, IBAN, BTC, ETH' },
      appstore: { label: 'App Download', desc: 'iOS App Store & Google Play' },
      text: { label: 'Plain Text / Note', desc: 'Free text, serial code or coupon' },
      code128: { label: '1D Barcode', desc: 'Retail CODE-128 SKU & label' },
      custom: { label: 'Custom / Other', desc: 'Non-mentioned URI, JSON or raw' },
      barcode: { label: '1D Barcode', desc: 'Retail CODE-128 SKU & label' }
    },
    customSectionTitle: 'Custom / Non-Mentioned Options Builder',
    customSectionSub: 'Create any custom URI scheme (Zoom, Spotify, Telegram, custom app), structured Key-Value / JSON data, or raw payload.',
    extraNonMentionedLabel: 'Additional / Non-Mentioned Custom Fields (Optional)',
    extraNonMentionedPlaceholder: 'Add custom parameter, extra vCard field, or note...',
    extraNonMentionedHint: 'Need an option not listed above? Type extra parameters here or switch to the Custom Builder.',
    switchToFullCustomBtn: 'Open Full Custom Builder →',
    custTabShapes: 'Shapes & Dots',
    custTabColors: 'Colors & Gradients',
    custTabLogoFrame: 'Logo & Frame',
    custTabAdvanced: 'Specs & Raw Data',
    modulePatternLabel: 'Matrix Module / Dot Pattern',
    cornerFrameLabel: 'Corner Eye Outer Frame',
    cornerDotLabel: 'Corner Eye Center Dot',
    colorPresetsLabel: 'Curated Studio Color Palettes',
    fgColorLabel: 'Foreground Color',
    bgColorLabel: 'Background Color',
    transparentBgLabel: 'Transparent PNG/SVG Background',
    gradientLabel: 'Enable Gradient Fill',
    gradientColor2Label: 'Second Gradient Color',
    gradientDirLabel: 'Gradient Direction',
    customEyeColorLabel: 'Custom Corner Eye Color',
    presetBadgesLabel: 'Center Emblem / Icon Badge',
    logoScaleLabel: 'Center Logo Size',
    frameStyleLabel: 'Call-to-Action Frame Style',
    frameTextLabel: 'Frame Banner Text (Custom Call-to-Action)',
    eccLevelLabel: 'Reed-Solomon Error Correction Level',
    quietZoneLabel: 'Quiet Zone Margin (Modules)',
    exportResLabel: 'PNG Export Resolution',
    rawPayloadInspectorLabel: 'Live Encoded Payload Inspector',
    rawOverrideToggle: 'Manual Raw Payload Override',
    copyPayloadBtn: 'Copy Payload',
    copiedLabel: 'Copied!',
    resetStyleBtn: 'Reset Style'
  },
  fr: {
    fullMenuKicker: 'Menu Complet de 16 Types de QR Codes & Codes-Barres — Toutes les Options + Mode Sur Mesure',
    catAll: 'Tout Voir (16)',
    catWeb: 'Web & Réseaux',
    catContact: 'Contact & Appel',
    catVenue: 'Lieu & Événement',
    catCommerce: 'Paiement & Retail',
    catCustom: 'Sur Mesure / Autre',
    types: {
      url: { label: 'Site Web (URL)', desc: 'Lien direct + balises UTM' },
      wifi: { label: 'Réseau Wi-Fi', desc: 'Connexion auto SSID & clé' },
      vcard: { label: 'Carte Visite vCard', desc: 'Fiche contact complète 3.0' },
      menu: { label: 'Menu Restaurant', desc: 'Carte bistro + numéro table' },
      whatsapp: { label: 'Chat WhatsApp', desc: 'Message direct pré-rempli' },
      email: { label: 'E-mail Complet', desc: 'Destinataire, objet & texte' },
      phone: { label: 'Appel Téléphone', desc: 'Numérotation directe (tel:)' },
      sms: { label: 'Message SMS', desc: 'Numéro & texte SMS prêt' },
      location: { label: 'GPS / Maps', desc: 'Coordonnées ou Google Maps' },
      event: { label: 'Agenda / Événement', desc: 'iCal VEVENT date & lieu' },
      social: { label: 'Réseaux Sociaux', desc: 'Instagram, TikTok, LinkedIn, X' },
      payment: { label: 'Paiement / Crypto', desc: 'PayPal, IBAN SEPA, BTC, UPI' },
      appstore: { label: 'Application Mobile', desc: 'App Store iOS & Google Play' },
      text: { label: 'Texte Libre / Note', desc: 'Note, code promo ou série' },
      code128: { label: 'Code-Barres 1D', desc: 'CODE-128 logistique & SKU' },
      custom: { label: 'Personnalisé / Autre', desc: 'Option non mentionnée / Libre' },
      barcode: { label: 'Code-Barres 1D', desc: 'CODE-128 logistique & SKU' }
    },
    customSectionTitle: 'Constructeur d’Options Non Mentionnées / Sur Mesure',
    customSectionSub: 'Créez tout schéma URI personnalisé, structure Clé-Valeur (JSON, MECARD) ou chaîne brute sur mesure.',
    extraNonMentionedLabel: 'Champs Personnalisés / Options Non Mentionnées (Optionnel)',
    extraNonMentionedPlaceholder: 'Ajouter un paramètre personnalisé, champ vCard ou note...',
    extraNonMentionedHint: 'Un champ spécifique manque ? Ajoutez-le ici ou ouvrez le mode Sur Mesure.',
    switchToFullCustomBtn: 'Ouvrir Constructeur Libre →',
    custTabShapes: 'Formes & Points',
    custTabColors: 'Couleurs & Dégradés',
    custTabLogoFrame: 'Logo & Cadre',
    custTabAdvanced: 'Options Avancées',
    modulePatternLabel: 'Style des Points de la Matrice',
    cornerFrameLabel: 'Cadre Externe des 3 Coins',
    cornerDotLabel: 'Point Central des 3 Coins',
    colorPresetsLabel: 'Palettes de Couleurs Studio',
    fgColorLabel: 'Couleur Principale',
    bgColorLabel: 'Couleur de Fond',
    transparentBgLabel: 'Fond Transparent (PNG/SVG)',
    gradientLabel: 'Activer un Dégradé',
    gradientColor2Label: 'Seconde Couleur du Dégradé',
    gradientDirLabel: 'Direction du Dégradé',
    customEyeColorLabel: 'Couleur Spécifique pour les Coins',
    presetBadgesLabel: 'Badge ou Icône Centrale',
    logoScaleLabel: 'Taille du Logo Central',
    frameStyleLabel: 'Cadre & Bannière d’Appel à l’Action',
    frameTextLabel: 'Texte de la Bannière (Personnalisable)',
    eccLevelLabel: 'Correction d’Erreur Reed-Solomon',
    quietZoneLabel: 'Marge Blanche (Quiet Zone)',
    exportResLabel: 'Résolution d’Export PNG',
    rawPayloadInspectorLabel: 'Inspecteur des Données Encodées',
    rawOverrideToggle: 'Modifier le Code Brut Manuellement',
    copyPayloadBtn: 'Copier Données',
    copiedLabel: 'Copié !',
    resetStyleBtn: 'Réinitialiser Style'
  },
  es: {
    fullMenuKicker: 'Menú Completo de 16 Opciones de Código QR y Barras — Todos los Formatos + Creador Personalizado',
    catAll: 'Todas (16)',
    catWeb: 'Web y Redes',
    catContact: 'Contacto y Chat',
    catVenue: 'Local y Eventos',
    catCommerce: 'Pagos y Retail',
    catCustom: 'Personalizado / Otro',
    types: {
      url: { label: 'Sitio Web (URL)', desc: 'Enlace web + etiquetas UTM' },
      wifi: { label: 'Red Wi-Fi', desc: 'Conexión automática SSID/clave' },
      vcard: { label: 'Tarjeta vCard 3.0', desc: 'Contacto profesional completo' },
      menu: { label: 'Menú Cafetería', desc: 'Carta digital + número de mesa' },
      whatsapp: { label: 'Chat WhatsApp', desc: 'Mensaje directo predefinido' },
      email: { label: 'Correo Email', desc: 'Destinatario, asunto y texto' },
      phone: { label: 'Llamada Teléfono', desc: 'Marcación en 1 toque (tel:)' },
      sms: { label: 'Mensaje SMS', desc: 'Número y texto SMS listo' },
      location: { label: 'Ubicación GPS', desc: 'Coordenadas o Google Maps' },
      event: { label: 'Evento Calendario', desc: 'iCal VEVENT fecha y lugar' },
      social: { label: 'Perfil Social', desc: 'Instagram, TikTok, LinkedIn, X' },
      payment: { label: 'Pagos / Crypto', desc: 'PayPal, IBAN, BTC, ETH, UPI' },
      appstore: { label: 'Descargar App', desc: 'App Store iOS y Google Play' },
      text: { label: 'Texto Libre / Nota', desc: 'Texto, cupón o número serie' },
      code128: { label: 'Código Barras 1D', desc: 'CODE-128 comercial y SKU' },
      custom: { label: 'Personalizado / Otro', desc: 'Opciones no mencionadas / Raw' },
      barcode: { label: 'Código Barras 1D', desc: 'CODE-128 comercial y SKU' }
    },
    customSectionTitle: 'Constructor de Opciones No Mencionadas / Personalizadas',
    customSectionSub: 'Crea cualquier esquema URI a medida, estructura Clave-Valor (JSON, MECARD) o código bruto.',
    extraNonMentionedLabel: 'Campos Personalizados / Opciones No Mencionadas (Opcional)',
    extraNonMentionedPlaceholder: 'Añadir parámetro extra, línea vCard o nota...',
    extraNonMentionedHint: '¿Necesitas un campo no listado? Escríbelo aquí o abre el Constructor Personalizado.',
    switchToFullCustomBtn: 'Abrir Constructor Personalizado →',
    custTabShapes: 'Formas y Puntos',
    custTabColors: 'Colores y Degradado',
    custTabLogoFrame: 'Logo y Marco',
    custTabAdvanced: 'Ajustes y Código',
    modulePatternLabel: 'Patrón de Puntos de la Matriz',
    cornerFrameLabel: 'Marco Exterior de Esquinas',
    cornerDotLabel: 'Punto Interior de Esquinas',
    colorPresetsLabel: 'Paletas de Color de Estudio',
    fgColorLabel: 'Color Principal',
    bgColorLabel: 'Color de Fondo',
    transparentBgLabel: 'Fondo Transparente (PNG/SVG)',
    gradientLabel: 'Activar Degradado',
    gradientColor2Label: 'Segundo Color de Degradado',
    gradientDirLabel: 'Dirección del Degradado',
    customEyeColorLabel: 'Color Personalizado en Esquinas',
    presetBadgesLabel: 'Insignia o Logo Central',
    logoScaleLabel: 'Tamaño del Logo Central',
    frameStyleLabel: 'Estilo de Marco / Banner Inferior',
    frameTextLabel: 'Texto del Marco (Personalizable)',
    eccLevelLabel: 'Nivel de Corrección de Errores',
    quietZoneLabel: 'Margen Exterior (Módulos)',
    exportResLabel: 'Resolución de Exportación PNG',
    rawPayloadInspectorLabel: 'Inspector de Datos Codificados',
    rawOverrideToggle: 'Edición Manual de Datos Brutos',
    copyPayloadBtn: 'Copiar Datos',
    copiedLabel: '¡Copiado!',
    resetStyleBtn: 'Restablecer Estilo'
  },
  ar: {
    fullMenuKicker: 'القائمة الكاملة لـ 16 نوعاً من رموز QR والباركود — جميع الخيارات القياسية + قسم التخصيص الحر للخيارات غير المذكورة',
    catAll: 'جميع الخيارات (16)',
    catWeb: 'مواقع وتواصل',
    catContact: 'بيانات اتصال',
    catVenue: 'أماكن وفعاليات',
    catCommerce: 'دفع إلكتروني وباركود',
    catCustom: 'مخصص / خيارات أخرى',
    types: {
      url: { label: 'رابط موقع (URL)', desc: 'رابط مباشر مع معاملات UTM' },
      wifi: { label: 'شبكة Wi-Fi', desc: 'اتصال تلقائي بالاسم وكلمة السر' },
      vcard: { label: 'بطاقة أعمال vCard', desc: 'جهة اتصال كاملة للهاتف' },
      menu: { label: 'قائمة مقهى / مطعم', desc: 'رابط القائمة مع رقم الطاولة' },
      whatsapp: { label: 'محادثة واتساب', desc: 'رسالة واتساب مباشرة جاهزة' },
      email: { label: 'بريد إلكتروني', desc: 'المستلم والموضوع ونص الرسالة' },
      phone: { label: 'اتصال هاتفي', desc: 'اتصال مباشر بنقرة واحدة' },
      sms: { label: 'رسالة نصية SMS', desc: 'رقم الهاتف ونص الرسالة' },
      location: { label: 'موقع جغرافي GPS', desc: 'إحداثيات أو خرائط جوجل' },
      event: { label: 'موعد / فعالية', desc: 'حدث تقويم بالتاريخ والمكان' },
      social: { label: 'حسابات التواصل', desc: 'إنستغرام، تيك توك، لينكدإن، X' },
      payment: { label: 'دفع / عملات رقمية', desc: 'PayPal و IBAN و BTC و UPI' },
      appstore: { label: 'تطبيق هاتف', desc: 'متجر آبل ومتجر جوجل بلاي' },
      text: { label: 'نص حر / ملاحظة', desc: 'نص مفتوح أو كود خصم أو رقم تسلسلي' },
      code128: { label: 'باركود 1D', desc: 'باركود منتجات CODE-128 قياسي' },
      custom: { label: 'مخصص / غير مذكور', desc: 'بناء أي صيغة مخصصة أو غير مذكورة' },
      barcode: { label: 'باركود 1D', desc: 'باركود منتجات CODE-128 قياسي' }
    },
    customSectionTitle: 'منشئ الخيارات المخصصة وغير المذكورة',
    customSectionSub: 'أنشئ أي بروتوكول مخصص (URI Scheme) أو بيانات مهيكلة (JSON / مفتاح-قيمة) أو نص برمجي خام.',
    extraNonMentionedLabel: 'حقول إضافية / خيارات غير مذكورة (اختياري)',
    extraNonMentionedPlaceholder: 'أضف أي معامل إضافي أو سطر مخصص هنا...',
    extraNonMentionedHint: 'هل تبحث عن خيار غير مذكور أعلاه؟ أضفه هنا أو انتقل إلى منشئ الخيارات المخصصة.',
    switchToFullCustomBtn: 'فتح المنشئ المخصص الكامل ←',
    custTabShapes: 'الأشكال والنقاط',
    custTabColors: 'الألوان والتدرج',
    custTabLogoFrame: 'الشعار والإطار',
    custTabAdvanced: 'إعدادات متقدمة',
    modulePatternLabel: 'نمط نقاط مصفوفة QR',
    cornerFrameLabel: 'شكل الإطار الخارجي للزوايا',
    cornerDotLabel: 'شكل النقطة الداخلية للزوايا',
    colorPresetsLabel: 'لوحات ألوان احترافية جاهزة',
    fgColorLabel: 'اللون الأساسي للرمز',
    bgColorLabel: 'لون الخلفية',
    transparentBgLabel: 'خلفية شفافة بالكامل (PNG/SVG)',
    gradientLabel: 'تفعيل التدرج اللوني',
    gradientColor2Label: 'اللون الثاني للتدرج',
    gradientDirLabel: 'اتجاه التدرج اللوني',
    customEyeColorLabel: 'لون مخصص لزوايا الرمز',
    presetBadgesLabel: 'الشعار أو الأيقونة الوسطية',
    logoScaleLabel: 'حجم الشعار في المنتصف',
    frameStyleLabel: 'إطار وشريط الدعوة للمسح (Frame)',
    frameTextLabel: 'نص الشريط السفلي / العلوي (مخصص)',
    eccLevelLabel: 'مستوى تصحيح الأخطاء (Reed-Solomon)',
    quietZoneLabel: 'الهامش الأبيض المحيط (Quiet Zone)',
    exportResLabel: 'دقة تنزيل الصورة PNG',
    rawPayloadInspectorLabel: 'معاينة وتحرير البيانات المشفرة',
    rawOverrideToggle: 'تعديل النص المشفر يدوياً',
    copyPayloadBtn: 'نسخ البيانات',
    copiedLabel: 'تم النسخ!',
    resetStyleBtn: 'إعادة ضبط التصميم'
  }
};

const COLOR_PRESETS = [
  { name: 'Atelier Navy', fg: '#14213d', bg: '#ffffff', eye: '#fca311' },
  { name: 'Pure Obsidian', fg: '#000000', bg: '#ffffff', eye: '#000000' },
  { name: 'Royal Emerald', fg: '#064e3b', bg: '#f0fdf4', eye: '#059669' },
  { name: 'Bordeaux Wine', fg: '#7f1d1d', bg: '#fff1f2', eye: '#be123c' },
  { name: 'Indigo Cobalt', fg: '#1e1b4b', bg: '#eef2ff', eye: '#4f46e5' },
  { name: 'Bistro Espresso', fg: '#3e2723', bg: '#fffbeb', eye: '#d97706' }
];

export const QrPrintshopPage: React.FC<QrPrintshopPageProps> = ({
  locale,
  initialPayloadType,
  onSendQrToExactKb
}) => {
  const t = TRANSLATIONS[locale];
  const m = QR_MENU_I18N[locale];

  const [payloadType, setPayloadType] = useState<QRPayloadType>(
    initialPayloadType === 'barcode' ? 'code128' : initialPayloadType
  );
  const [categoryFilter, setCategoryFilter] = useState<QRCategoryFilter>('all');
  const [customizeTab, setCustomizeTab] = useState<CustomizeSubTab>('shapes');

  useEffect(() => {
    setPayloadType(initialPayloadType === 'barcode' ? 'code128' : initialPayloadType);
  }, [initialPayloadType]);

  // --- PAYLOAD STATES FOR ALL 16 QR TYPES ---
  const [urlString, setUrlString] = useState<string>('https://compressphoto.space');
  const [showUtmFields, setShowUtmFields] = useState<boolean>(false);
  const [urlUtmSource, setUrlUtmSource] = useState<string>('');
  const [urlUtmMedium, setUrlUtmMedium] = useState<string>('');
  const [urlUtmCampaign, setUrlUtmCampaign] = useState<string>('');

  const [wifiData, setWifiData] = useState<WifiPayloadData>({
    ssid: 'Guest_WiFi_5G',
    password: 'welcome2026',
    encryption: 'WPA',
    hidden: false
  });

  const [vcardData, setVcardData] = useState<VCardPayloadData>({
    firstName: 'Camille',
    lastName: 'Moreau',
    title: 'Creative Director',
    organization: 'CompressPhoto Studio',
    phone: '+41 22 555 0194',
    workPhone: '',
    email: 'camille@compressphoto.space',
    website: 'https://compressphoto.space',
    street: '14 Rue du Rhône',
    city: 'Geneva',
    country: 'Switzerland',
    note: ''
  });

  const [menuData, setMenuData] = useState<MenuPayloadData>({
    bistroName: 'Café Lumière',
    menuUrl: 'https://cafe-lumiere.ch/menu',
    tableNumber: '12',
    dailyNote: 'Scan for Digital Menu',
    wifiHint: ''
  });

  const [whatsappData, setWhatsappData] = useState<WhatsappPayloadData>({
    phone: '+33614289000',
    message: 'Hello, I have a question.'
  });

  const [emailData, setEmailData] = useState<EmailPayloadData>({
    email: 'contact@compressphoto.space',
    subject: 'Project Inquiry',
    body: 'Hello, I would like to get in touch regarding...',
    encoding: 'mailto'
  });

  const [phoneData, setPhoneData] = useState<PhonePayloadData>({
    phone: '+33142685500'
  });

  const [smsData, setSmsData] = useState<SmsPayloadData>({
    phone: '+33614289000',
    message: 'Hello, please confirm my reservation.'
  });

  const [locationData, setLocationData] = useState<LocationPayloadData>({
    latitude: '48.8584',
    longitude: '2.2945',
    query: 'Eiffel Tower, Paris',
    format: 'geo'
  });

  const [eventData, setEventData] = useState<EventPayloadData>({
    title: 'Annual Design & Print Showcase',
    location: 'Palexpo Geneva, Hall 4',
    startDateTime: '2026-06-15T10:00',
    endDateTime: '2026-06-15T17:00',
    description: 'Present this QR code at the entrance desk.'
  });

  const [socialData, setSocialData] = useState<SocialPayloadData>({
    platform: 'instagram',
    handleOrUrl: 'compressphoto'
  });

  const [paymentData, setPaymentData] = useState<PaymentPayloadData>({
    method: 'paypal',
    recipient: 'compressphoto',
    recipientName: 'CompressPhoto Studio',
    amount: '25.00',
    currency: 'EUR',
    note: 'Order #2026'
  });

  const [appStoreData, setAppStoreData] = useState<AppStorePayloadData>({
    appName: 'CompressPhoto',
    iosUrl: 'https://apps.apple.com/app/id000000000',
    androidUrl: 'https://play.google.com/store/apps/details?id=space.compressphoto',
    primaryTarget: 'universal',
    universalUrl: 'https://compressphoto.space'
  });

  const [plainText, setPlainText] = useState<string>(
    'VIP-PASS-2026-8841 — Valid for 2 Guests'
  );

  const [code128String, setCode128String] = useState<string>('SKU-2026-094');
  const [code128ShowText, setCode128ShowText] = useState<boolean>(true);
  const [code128Height, setCode128Height] = useState<number>(114);

  const [customData, setCustomData] = useState<CustomBuilderPayloadData>({
    mode: 'uri-scheme',
    scheme: 'spotify',
    path: 'track/4uLU6hMCjMI75M1A2tKUQC',
    format: 'json',
    pairs: [
      { id: '1', key: 'badge_id', value: 'EMP-9042' },
      { id: '2', key: 'access_zone', value: 'LEVEL-3-LAB' }
    ],
    rawString: 'CUSTOM:ID=9042;ZONE=LAB;VALID=2026;;'
  });

  // Extra non-mentioned appendix field available on all presets
  const [extraCustomAppendix, setExtraCustomAppendix] = useState<string>('');
  const [manualRawOverrideEnabled, setManualRawOverrideEnabled] = useState<boolean>(false);
  const [manualRawString, setManualRawString] = useState<string>('');

  // --- COMPREHENSIVE VISUAL & TECHNICAL CUSTOMIZATION STATES ---
  const [finderStyle, setFinderStyle] = useState<FinderPatternStyle>('rounded');
  const [finderInnerStyle, setFinderInnerStyle] = useState<FinderInnerStyle>('rounded');
  const [moduleStyle, setModuleStyle] = useState<ModuleDotStyle>('square');

  const [fgColor, setFgColor] = useState<string>('#14213d');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [transparentBg, setTransparentBg] = useState<boolean>(false);
  const [useGradient, setUseGradient] = useState<boolean>(false);
  const [gradientColor2, setGradientColor2] = useState<string>('#fca311');
  const [gradientDirection, setGradientDirection] = useState<QRGradientDirection>('diagonal');
  const [customEyeColor, setCustomEyeColor] = useState<boolean>(false);
  const [eyeColor, setEyeColor] = useState<string>('#fca311');

  const [emblemPreset, setEmblemPreset] = useState<CenterEmblemPreset>('none');
  const [customEmblemUrl, setCustomEmblemUrl] = useState<string | null>(null);
  const [emblemScale, setEmblemScale] = useState<number>(0.23);
  const [showEmblemBorder, setShowEmblemBorder] = useState<boolean>(true);

  const [frameStyle, setFrameStyle] = useState<QRFrameStyle>('none');
  const [frameText, setFrameText] = useState<string>('SCAN ME');

  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<QRErrorCorrectionLevel>('H');
  const [marginModules, setMarginModules] = useState<number>(4);
  const [exportResolution, setExportResolution] = useState<number>(1200);

  const [exportStatus, setExportStatus] = useState<string | null>(null);
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);

  const emblemInputRef = useRef<HTMLInputElement | null>(null);

  const computedPayload = useMemo(
    () =>
      buildRawPayloadString(payloadType, {
        wifi: wifiData,
        vcard: vcardData,
        menu: menuData,
        whatsapp: whatsappData,
        url: urlString,
        urlUtmSource: showUtmFields ? urlUtmSource : '',
        urlUtmMedium: showUtmFields ? urlUtmMedium : '',
        urlUtmCampaign: showUtmFields ? urlUtmCampaign : '',
        code128: code128String,
        email: emailData,
        phone: phoneData,
        sms: smsData,
        location: locationData,
        event: eventData,
        social: socialData,
        payment: paymentData,
        appstore: appStoreData,
        text: plainText,
        custom: customData,
        extraCustomAppendix
      }),
    [
      payloadType,
      wifiData,
      vcardData,
      menuData,
      whatsappData,
      urlString,
      showUtmFields,
      urlUtmSource,
      urlUtmMedium,
      urlUtmCampaign,
      code128String,
      emailData,
      phoneData,
      smsData,
      locationData,
      eventData,
      socialData,
      paymentData,
      appStoreData,
      plainText,
      customData,
      extraCustomAppendix
    ]
  );

  const activeRawPayload =
    manualRawOverrideEnabled && manualRawString.trim() !== ''
      ? manualRawString
      : computedPayload;

  const svgMarkup = useMemo(
    () =>
      generateVectorSvgString(payloadType, activeRawPayload, {
        fgColor,
        bgColor,
        transparentBg,
        useGradient,
        gradientColor2,
        gradientDirection,
        customEyeColor,
        eyeColor,
        finderStyle,
        finderInnerStyle,
        moduleStyle,
        emblemPreset,
        customEmblemDataUrl: customEmblemUrl,
        emblemScale,
        showEmblemBorder,
        frameStyle,
        frameText,
        errorCorrectionLevel,
        marginModules,
        code128ShowText,
        code128Height
      }),
    [
      payloadType,
      activeRawPayload,
      fgColor,
      bgColor,
      transparentBg,
      useGradient,
      gradientColor2,
      gradientDirection,
      customEyeColor,
      eyeColor,
      finderStyle,
      finderInnerStyle,
      moduleStyle,
      emblemPreset,
      customEmblemUrl,
      emblemScale,
      showEmblemBorder,
      frameStyle,
      frameText,
      errorCorrectionLevel,
      marginModules,
      code128ShowText,
      code128Height
    ]
  );

  const handleEmblemFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomEmblemUrl(reader.result);
        setEmblemPreset('custom');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetStyles = () => {
    setFinderStyle('rounded');
    setFinderInnerStyle('rounded');
    setModuleStyle('square');
    setFgColor('#14213d');
    setBgColor('#ffffff');
    setTransparentBg(false);
    setUseGradient(false);
    setGradientColor2('#fca311');
    setGradientDirection('diagonal');
    setCustomEyeColor(false);
    setEyeColor('#fca311');
    setEmblemPreset('none');
    setCustomEmblemUrl(null);
    setEmblemScale(0.23);
    setShowEmblemBorder(true);
    setFrameStyle('none');
    setFrameText('SCAN ME');
    setErrorCorrectionLevel('H');
    setMarginModules(4);
  };

  const handleCopyPayload = async () => {
    try {
      await navigator.clipboard.writeText(activeRawPayload);
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2000);
    } catch {
      // Fallback ignored
    }
  };

  const handleDownloadSvg = () => {
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressphoto-qr-${payloadType}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    setExportStatus('Downloaded Vector SVG (.svg)');
    setTimeout(() => setExportStatus(null), 3500);
  };

  const handleDownloadHighResPng = async () => {
    const w = exportResolution;
    const h =
      payloadType === 'code128'
        ? Math.round(exportResolution * 0.42)
        : frameStyle === 'bottom-banner' || frameStyle === 'top-banner'
          ? Math.round(exportResolution * 1.12)
          : exportResolution;
    const pngUrl = await renderSvgToHighResPngDataUrl(svgMarkup, w, h, transparentBg);
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = `compressphoto-qr-${payloadType}-${w}px.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setExportStatus(`Downloaded High-Res PNG (${w} px)`);
    setTimeout(() => setExportStatus(null), 3500);
  };

  const handleBridgeToExactKb = async () => {
    const w = payloadType === 'code128' ? 1000 : 800;
    const h = payloadType === 'code128' ? 420 : 800;
    const pngUrl = await renderSvgToHighResPngDataUrl(svgMarkup, w, h, false);
    onSendQrToExactKb(pngUrl);
  };

  const handleAddCustomPair = () => {
    setCustomData((prev) => ({
      ...prev,
      pairs: [
        ...prev.pairs,
        { id: String(Date.now()), key: `param_${prev.pairs.length + 1}`, value: '' }
      ]
    }));
  };

  const handleRemoveCustomPair = (id: string) => {
    setCustomData((prev) => ({
      ...prev,
      pairs: prev.pairs.filter((p) => p.id !== id)
    }));
  };

  const handleUpdateCustomPair = (id: string, field: 'key' | 'value', val: string) => {
    setCustomData((prev) => ({
      ...prev,
      pairs: prev.pairs.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    }));
  };

  const FULL_PAYLOAD_MENU: {
    id: QRPayloadType;
    category: QRCategoryFilter;
    icon: React.ReactNode;
  }[] = [
    { id: 'url', category: 'web', icon: <Globe className="w-4 h-4 shrink-0" /> },
    { id: 'wifi', category: 'venue', icon: <Wifi className="w-4 h-4 shrink-0" /> },
    { id: 'vcard', category: 'contact', icon: <Contact className="w-4 h-4 shrink-0" /> },
    { id: 'menu', category: 'venue', icon: <Coffee className="w-4 h-4 shrink-0" /> },
    { id: 'whatsapp', category: 'contact', icon: <MessageSquare className="w-4 h-4 shrink-0" /> },
    { id: 'email', category: 'contact', icon: <Mail className="w-4 h-4 shrink-0" /> },
    { id: 'phone', category: 'contact', icon: <Phone className="w-4 h-4 shrink-0" /> },
    { id: 'sms', category: 'contact', icon: <Send className="w-4 h-4 shrink-0" /> },
    { id: 'location', category: 'venue', icon: <MapPin className="w-4 h-4 shrink-0" /> },
    { id: 'event', category: 'venue', icon: <Calendar className="w-4 h-4 shrink-0" /> },
    { id: 'social', category: 'web', icon: <Share2 className="w-4 h-4 shrink-0" /> },
    { id: 'payment', category: 'commerce', icon: <CreditCard className="w-4 h-4 shrink-0" /> },
    { id: 'appstore', category: 'web', icon: <Smartphone className="w-4 h-4 shrink-0" /> },
    { id: 'text', category: 'custom', icon: <FileText className="w-4 h-4 shrink-0" /> },
    { id: 'code128', category: 'commerce', icon: <Barcode className="w-4 h-4 shrink-0" /> },
    { id: 'custom', category: 'custom', icon: <Settings2 className="w-4 h-4 shrink-0" /> }
  ];

  const filteredMenu = useMemo(
    () =>
      categoryFilter === 'all'
        ? FULL_PAYLOAD_MENU
        : FULL_PAYLOAD_MENU.filter((item) => item.category === categoryFilter),
    [categoryFilter]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* CLEAN, SIMPLE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
          {t.qrHeroTitle}
        </h1>
        <p className="text-sm sm:text-base opacity-80">
          {t.qrHeroSub}
        </p>
      </div>

      {/* STEP 1 MENU: COMPLETE 16-OPTION QR CODE & BARCODE SELECTOR */}
      <section className="p-5 sm:p-6 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#14213d]/10 dark:border-[#ffffff]/10 pb-3">
          <div>
            <h2 className="text-base font-bold">{t.qrStep1Details}</h2>
            <p className="text-xs opacity-75 mt-0.5">{m.fullMenuKicker}</p>
          </div>

          {/* Category Filter Bar */}
          <div className="flex flex-wrap items-center gap-1 bg-[#14213d]/5 dark:bg-[#ffffff]/10 p-1 rounded-lg">
            {(
              [
                { id: 'all', label: m.catAll },
                { id: 'web', label: m.catWeb },
                { id: 'contact', label: m.catContact },
                { id: 'venue', label: m.catVenue },
                { id: 'commerce', label: m.catCommerce },
                { id: 'custom', label: m.catCustom }
              ] as { id: QRCategoryFilter; label: string }[]
            ).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  categoryFilter === cat.id
                    ? 'bg-[#fca311] text-[#14213d]'
                    : 'hover:text-[#fca311]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Full Grid of 16 QR Code Options */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {filteredMenu.map((item) => {
            const active = payloadType === item.id;
            const info = m.types[item.id];
            const isCustomBtn = item.id === 'custom';
            return (
              <button
                key={item.id}
                onClick={() => setPayloadType(item.id)}
                className={`p-3 rounded-xl border text-start transition-all cursor-pointer flex items-start gap-2.5 ${
                  active
                    ? 'bg-[#fca311] text-[#14213d] border-[#fca311] shadow-xs'
                    : isCustomBtn
                      ? 'bg-[#fca311]/10 border-[#fca311]/50 hover:border-[#fca311]'
                      : 'bg-[#ffffff] dark:bg-[#14213d]/40 border-[#14213d]/15 dark:border-[#ffffff]/15 hover:border-[#fca311]'
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    active
                      ? 'bg-[#14213d] text-[#fca311]'
                      : 'bg-[#14213d]/10 dark:bg-[#ffffff]/10 text-[#fca311]'
                  }`}
                >
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold truncate">{info.label}</div>
                  <div
                    className={`text-[11px] truncate mt-0.5 ${
                      active ? 'text-[#14213d]/80' : 'opacity-65'
                    }`}
                  >
                    {info.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* STEP 2 & STEP 3: INPUTS + CUSTOMIZE STUDIO + LIVE PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT 7 COLUMNS: Payload Details + Full 4-Tab Customize Section */}
        <div className="lg:col-span-7 space-y-6">
          {/* PAYLOAD DATA FORM CARD */}
          <div className="p-6 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-4">
            <div className="flex items-center justify-between border-b border-[#14213d]/10 dark:border-[#ffffff]/10 pb-3">
              <h2 className="text-base font-bold">
                {m.types[payloadType]?.label || t.qrStep1Details}
              </h2>
              <span className="text-xs font-mono opacity-70">
                ISO/IEC 18004 · Static
              </span>
            </div>

            {/* 1. WEBSITE URL */}
            {payloadType === 'url' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5">
                    Website Link (URL)
                  </label>
                  <input
                    type="url"
                    value={urlString}
                    onChange={(e) => setUrlString(e.target.value)}
                    placeholder="https://compressphoto.space"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setShowUtmFields(!showUtmFields)}
                    className="text-xs font-bold text-[#fca311] hover:underline cursor-pointer"
                  >
                    {showUtmFields
                      ? '− Hide Campaign UTM Parameters'
                      : '+ Add Campaign UTM Parameters (utm_source, utm_medium, utm_campaign)'}
                  </button>
                  {showUtmFields && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2.5 p-3 rounded-lg bg-[#14213d]/5 dark:bg-[#ffffff]/5">
                      <div>
                        <label className="block text-[11px] font-semibold mb-1">
                          utm_source
                        </label>
                        <input
                          type="text"
                          placeholder="print_flyer"
                          value={urlUtmSource}
                          onChange={(e) => setUrlUtmSource(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-md border border-[#14213d]/20 dark:border-[#ffffff]/20 bg-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold mb-1">
                          utm_medium
                        </label>
                        <input
                          type="text"
                          placeholder="qr_code"
                          value={urlUtmMedium}
                          onChange={(e) => setUrlUtmMedium(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-md border border-[#14213d]/20 dark:border-[#ffffff]/20 bg-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold mb-1">
                          utm_campaign
                        </label>
                        <input
                          type="text"
                          placeholder="summer_2026"
                          value={urlUtmCampaign}
                          onChange={(e) => setUrlUtmCampaign(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-md border border-[#14213d]/20 dark:border-[#ffffff]/20 bg-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. WI-FI NETWORK */}
            {payloadType === 'wifi' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Wi-Fi Network Name (SSID)
                    </label>
                    <input
                      type="text"
                      value={wifiData.ssid}
                      onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Wi-Fi Password
                    </label>
                    <input
                      type="text"
                      value={wifiData.password}
                      onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                      disabled={wifiData.encryption === 'nopass'}
                      placeholder={wifiData.encryption === 'nopass' ? 'No password' : ''}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center pt-1">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Security / Encryption
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(
                        [
                          { id: 'WPA', label: 'WPA/WPA2/WPA3' },
                          { id: 'WEP', label: 'WEP' },
                          { id: 'nopass', label: 'Open / None' }
                        ] as const
                      ).map((enc) => (
                        <button
                          key={enc.id}
                          type="button"
                          onClick={() => setWifiData({ ...wifiData, encryption: enc.id })}
                          className={`py-1.5 px-2 rounded-lg text-xs font-bold border cursor-pointer ${
                            wifiData.encryption === enc.id
                              ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                              : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                          }`}
                        >
                          {enc.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4">
                    <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wifiData.hidden}
                        onChange={(e) => setWifiData({ ...wifiData, hidden: e.target.checked })}
                        className="rounded accent-[#fca311] w-4 h-4"
                      />
                      <span>Hidden Wi-Fi Network (H:true)</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* 3. VCARD 3.0 CONTACT */}
            {payloadType === 'vcard' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">First Name</label>
                    <input
                      type="text"
                      value={vcardData.firstName}
                      onChange={(e) => setVcardData({ ...vcardData, firstName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Last Name</label>
                    <input
                      type="text"
                      value={vcardData.lastName}
                      onChange={(e) => setVcardData({ ...vcardData, lastName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Mobile Phone</label>
                    <input
                      type="text"
                      value={vcardData.phone}
                      onChange={(e) => setVcardData({ ...vcardData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Work / Landline Phone</label>
                    <input
                      type="text"
                      value={vcardData.workPhone || ''}
                      onChange={(e) => setVcardData({ ...vcardData, workPhone: e.target.value })}
                      placeholder="+41 22..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      value={vcardData.email}
                      onChange={(e) => setVcardData({ ...vcardData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Website URL</label>
                    <input
                      type="url"
                      value={vcardData.website}
                      onChange={(e) => setVcardData({ ...vcardData, website: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={vcardData.organization}
                      onChange={(e) => setVcardData({ ...vcardData, organization: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Job Title / Role</label>
                    <input
                      type="text"
                      value={vcardData.title}
                      onChange={(e) => setVcardData({ ...vcardData, title: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Street Address</label>
                    <input
                      type="text"
                      value={vcardData.street || ''}
                      onChange={(e) => setVcardData({ ...vcardData, street: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">City</label>
                    <input
                      type="text"
                      value={vcardData.city}
                      onChange={(e) => setVcardData({ ...vcardData, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Country</label>
                    <input
                      type="text"
                      value={vcardData.country || ''}
                      onChange={(e) => setVcardData({ ...vcardData, country: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Note / Bio (Optional)</label>
                  <input
                    type="text"
                    value={vcardData.note || ''}
                    onChange={(e) => setVcardData({ ...vcardData, note: e.target.value })}
                    placeholder="Available Mon–Fri · Geneva Studio"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
              </div>
            )}

            {/* 4. CAFÉ / RESTAURANT MENU */}
            {payloadType === 'menu' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Restaurant / Café Name
                    </label>
                    <input
                      type="text"
                      value={menuData.bistroName}
                      onChange={(e) => setMenuData({ ...menuData, bistroName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Table / Zone Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={menuData.tableNumber}
                      onChange={(e) => setMenuData({ ...menuData, tableNumber: e.target.value })}
                      placeholder="12"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Menu Link (URL)</label>
                  <input
                    type="url"
                    value={menuData.menuUrl}
                    onChange={(e) => setMenuData({ ...menuData, menuUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Special Note / Dish of the Day</label>
                    <input
                      type="text"
                      value={menuData.dailyNote}
                      onChange={(e) => setMenuData({ ...menuData, dailyNote: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Guest Wi-Fi Hint (Optional)</label>
                    <input
                      type="text"
                      value={menuData.wifiHint}
                      onChange={(e) => setMenuData({ ...menuData, wifiHint: e.target.value })}
                      placeholder="Bistro_Guest / cafe2026"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 5. WHATSAPP DIRECT CHAT */}
            {payloadType === 'whatsapp' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    WhatsApp Phone Number (with Country Code)
                  </label>
                  <input
                    type="text"
                    value={whatsappData.phone}
                    onChange={(e) => setWhatsappData({ ...whatsappData, phone: e.target.value })}
                    placeholder="+33614289000"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Pre-Filled Message</label>
                  <textarea
                    rows={2}
                    value={whatsappData.message}
                    onChange={(e) => setWhatsappData({ ...whatsappData, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
              </div>
            )}

            {/* 6. EMAIL MESSAGE */}
            {payloadType === 'email' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold mb-1">Recipient Email Address</label>
                    <input
                      type="email"
                      value={emailData.email}
                      onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">QR Email Standard</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(['mailto', 'matmsg'] as const).map((enc) => (
                        <button
                          key={enc}
                          type="button"
                          onClick={() => setEmailData({ ...emailData, encoding: enc })}
                          className={`py-2 px-2 rounded-lg text-xs font-bold uppercase border cursor-pointer ${
                            emailData.encoding === enc
                              ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                              : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                          }`}
                        >
                          {enc}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Subject Line</label>
                  <input
                    type="text"
                    value={emailData.subject}
                    onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Email Body</label>
                  <textarea
                    rows={3}
                    value={emailData.body}
                    onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
              </div>
            )}

            {/* 7. PHONE CALL */}
            {payloadType === 'phone' && (
              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Phone Number for Direct Dial (tel:)
                </label>
                <input
                  type="tel"
                  value={phoneData.phone}
                  onChange={(e) => setPhoneData({ phone: e.target.value })}
                  placeholder="+33 1 42 68 55 00"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                />
              </div>
            )}

            {/* 8. SMS TEXT MESSAGE */}
            {payloadType === 'sms' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Recipient Mobile Number (SMSTO:)
                  </label>
                  <input
                    type="tel"
                    value={smsData.phone}
                    onChange={(e) => setSmsData({ ...smsData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">SMS Text Message</label>
                  <textarea
                    rows={2}
                    value={smsData.message}
                    onChange={(e) => setSmsData({ ...smsData, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
              </div>
            )}

            {/* 9. GPS LOCATION / GOOGLE MAPS */}
            {payloadType === 'location' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Latitude</label>
                    <input
                      type="text"
                      value={locationData.latitude}
                      onChange={(e) => setLocationData({ ...locationData, latitude: e.target.value })}
                      placeholder="48.8584"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Longitude</label>
                    <input
                      type="text"
                      value={locationData.longitude}
                      onChange={(e) => setLocationData({ ...locationData, longitude: e.target.value })}
                      placeholder="2.2945"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Place Name / Address Search Query
                  </label>
                  <input
                    type="text"
                    value={locationData.query}
                    onChange={(e) => setLocationData({ ...locationData, query: e.target.value })}
                    placeholder="Eiffel Tower, Paris"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      { id: 'geo', label: 'Native Geo URI (geo:lat,lng)' },
                      { id: 'maps', label: 'Google Maps Web Link' }
                    ] as const
                  ).map((fmt) => (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() => setLocationData({ ...locationData, format: fmt.id })}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border cursor-pointer ${
                        locationData.format === fmt.id
                          ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                          : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 10. CALENDAR EVENT (iCal VEVENT) */}
            {payloadType === 'event' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Event Title</label>
                    <input
                      type="text"
                      value={eventData.title}
                      onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Venue / Location</label>
                    <input
                      type="text"
                      value={eventData.location}
                      onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Start Date & Time</label>
                    <input
                      type="datetime-local"
                      value={eventData.startDateTime}
                      onChange={(e) => setEventData({ ...eventData, startDateTime: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">End Date & Time</label>
                    <input
                      type="datetime-local"
                      value={eventData.endDateTime}
                      onChange={(e) => setEventData({ ...eventData, endDateTime: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Event Description / Notes</label>
                  <input
                    type="text"
                    value={eventData.description}
                    onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
              </div>
            )}

            {/* 11. SOCIAL MEDIA PROFILE */}
            {payloadType === 'social' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Select Social Platform</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(
                      [
                        { id: 'instagram', label: 'Instagram' },
                        { id: 'tiktok', label: 'TikTok' },
                        { id: 'linkedin', label: 'LinkedIn' },
                        { id: 'youtube', label: 'YouTube' },
                        { id: 'x', label: 'X / Twitter' },
                        { id: 'facebook', label: 'Facebook' },
                        { id: 'telegram', label: 'Telegram' },
                        { id: 'custom', label: 'Other Link' }
                      ] as const
                    ).map((plat) => (
                      <button
                        key={plat.id}
                        type="button"
                        onClick={() => setSocialData({ ...socialData, platform: plat.id })}
                        className={`py-2 px-2 rounded-lg text-xs font-bold border cursor-pointer ${
                          socialData.platform === plat.id
                            ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                            : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                        }`}
                      >
                        {plat.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Username (@handle) or Full Profile URL
                  </label>
                  <input
                    type="text"
                    value={socialData.handleOrUrl}
                    onChange={(e) => setSocialData({ ...socialData, handleOrUrl: e.target.value })}
                    placeholder="@compressphoto"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
              </div>
            )}

            {/* 12. PAYMENT / CRYPTO / IBAN / PAYPAL / UPI */}
            {payloadType === 'payment' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Payment Protocol</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {(
                      [
                        { id: 'paypal', label: 'PayPal.me' },
                        { id: 'iban', label: 'SEPA IBAN' },
                        { id: 'upi', label: 'UPI (India)' },
                        { id: 'bitcoin', label: 'Bitcoin' },
                        { id: 'ethereum', label: 'Ethereum' },
                        { id: 'custom', label: 'Custom URI' }
                      ] as const
                    ).map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentData({ ...paymentData, method: pm.id })}
                        className={`py-2 px-2 rounded-lg text-xs font-bold border cursor-pointer ${
                          paymentData.method === pm.id
                            ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                            : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                        }`}
                      >
                        {pm.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      {paymentData.method === 'paypal'
                        ? 'PayPal.me Handle or Link'
                        : paymentData.method === 'iban'
                          ? 'IBAN Account Number'
                          : paymentData.method === 'upi'
                            ? 'UPI ID (e.g. merchant@upi)'
                            : 'Wallet Address / Payment Link'}
                    </label>
                    <input
                      type="text"
                      value={paymentData.recipient}
                      onChange={(e) => setPaymentData({ ...paymentData, recipient: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Beneficiary / Merchant Name</label>
                    <input
                      type="text"
                      value={paymentData.recipientName}
                      onChange={(e) => setPaymentData({ ...paymentData, recipientName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Amount</label>
                    <input
                      type="text"
                      value={paymentData.amount}
                      onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                      placeholder="25.00"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Currency</label>
                    <input
                      type="text"
                      value={paymentData.currency}
                      onChange={(e) => setPaymentData({ ...paymentData, currency: e.target.value })}
                      placeholder="EUR / USD"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Reference / Note</label>
                    <input
                      type="text"
                      value={paymentData.note}
                      onChange={(e) => setPaymentData({ ...paymentData, note: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 13. APP STORE / PLAY STORE DOWNLOAD */}
            {payloadType === 'appstore' && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'universal', label: 'Universal Landing URL' },
                      { id: 'ios', label: 'Apple App Store (iOS)' },
                      { id: 'android', label: 'Google Play (Android)' }
                    ] as const
                  ).map((tItem) => (
                    <button
                      key={tItem.id}
                      type="button"
                      onClick={() => setAppStoreData({ ...appStoreData, primaryTarget: tItem.id })}
                      className={`py-2 px-2 rounded-lg text-xs font-bold border cursor-pointer ${
                        appStoreData.primaryTarget === tItem.id
                          ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                          : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                      }`}
                    >
                      {tItem.label}
                    </button>
                  ))}
                </div>
                {appStoreData.primaryTarget === 'universal' && (
                  <div>
                    <label className="block text-xs font-semibold mb-1">Universal App Landing Page URL</label>
                    <input
                      type="url"
                      value={appStoreData.universalUrl}
                      onChange={(e) => setAppStoreData({ ...appStoreData, universalUrl: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                )}
                {appStoreData.primaryTarget === 'ios' && (
                  <div>
                    <label className="block text-xs font-semibold mb-1">Apple App Store URL</label>
                    <input
                      type="url"
                      value={appStoreData.iosUrl}
                      onChange={(e) => setAppStoreData({ ...appStoreData, iosUrl: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                )}
                {appStoreData.primaryTarget === 'android' && (
                  <div>
                    <label className="block text-xs font-semibold mb-1">Google Play Store URL</label>
                    <input
                      type="url"
                      value={appStoreData.androidUrl}
                      onChange={(e) => setAppStoreData({ ...appStoreData, androidUrl: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                )}
              </div>
            )}

            {/* 14. PLAIN TEXT / NOTES / VOUCHER */}
            {payloadType === 'text' && (
              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Plain Text, Voucher Code, Serial Key, or Offline Note
                </label>
                <textarea
                  rows={4}
                  value={plainText}
                  onChange={(e) => setPlainText(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent font-mono"
                />
              </div>
            )}

            {/* 15. 1D BARCODE (CODE-128) */}
            {payloadType === 'code128' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Barcode ASCII Text / SKU (CODE-128 Subset B)
                  </label>
                  <input
                    type="text"
                    maxLength={32}
                    value={code128String}
                    onChange={(e) => setCode128String(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center pt-1">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Bar Height ({code128Height} px)
                    </label>
                    <input
                      type="range"
                      min={60}
                      max={160}
                      value={code128Height}
                      onChange={(e) => setCode128Height(Number(e.target.value))}
                      className="w-full accent-[#fca311]"
                    />
                  </div>
                  <div className="pt-3">
                    <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={code128ShowText}
                        onChange={(e) => setCode128ShowText(e.target.checked)}
                        className="rounded accent-[#fca311] w-4 h-4"
                      />
                      <span>Display Human-Readable SKU Text Below Bars</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* 16. DEDICATED CUSTOM / NON-MENTIONED OPTIONS BUILDER */}
            {payloadType === 'custom' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-lg bg-[#fca311]/10 border border-[#fca311]/40 space-y-1">
                  <div className="text-xs font-bold">{m.customSectionTitle}</div>
                  <p className="text-[11px] opacity-80">{m.customSectionSub}</p>
                </div>

                {/* Custom Builder Mode Selector */}
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'uri-scheme', label: '1. Custom App URI Scheme' },
                      { id: 'key-value', label: '2. Key-Value / JSON Table' },
                      { id: 'raw', label: '3. Raw Custom Payload' }
                    ] as const
                  ).map((cm) => (
                    <button
                      key={cm.id}
                      type="button"
                      onClick={() => setCustomData({ ...customData, mode: cm.id })}
                      className={`py-2 px-2 rounded-lg text-xs font-bold border cursor-pointer ${
                        customData.mode === cm.id
                          ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                          : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                      }`}
                    >
                      {cm.label}
                    </button>
                  ))}
                </div>

                {customData.mode === 'uri-scheme' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2.5">
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          Protocol Scheme
                        </label>
                        <input
                          type="text"
                          value={customData.scheme}
                          onChange={(e) => setCustomData({ ...customData, scheme: e.target.value })}
                          placeholder="zoommtg / spotify / tg"
                          className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold mb-1">
                          Resource Path / Identifier
                        </label>
                        <input
                          type="text"
                          value={customData.path}
                          onChange={(e) => setCustomData({ ...customData, path: e.target.value })}
                          placeholder="zoom.us/join?confno=123456789"
                          className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: 'Spotify Track', scheme: 'spotify', path: 'track/4uLU6hMCjMI75M1A2tKUQC' },
                        { label: 'Zoom Meeting', scheme: 'zoommtg', path: 'zoom.us/join?confno=88291004' },
                        { label: 'Telegram Resolve', scheme: 'tg', path: 'resolve?domain=compressphoto' },
                        { label: 'FaceTime Audio', scheme: 'facetime-audio', path: '+33614289000' },
                        { label: 'WeChat Pay/App', scheme: 'weixin', path: 'dl/business/' }
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() =>
                            setCustomData({
                              ...customData,
                              scheme: preset.scheme,
                              path: preset.path
                            })
                          }
                          className="px-2.5 py-1 rounded-md text-[11px] font-semibold border border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311] cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(customData.mode === 'key-value' || customData.mode === 'uri-scheme') && (
                  <div className="space-y-2.5 pt-1">
                    {customData.mode === 'key-value' && (
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          Structured Output Format
                        </label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {(
                            [
                              { id: 'json', label: 'JSON Object' },
                              { id: 'lines', label: 'Key: Value' },
                              { id: 'mecard', label: 'MECARD ;' },
                              { id: 'query', label: 'Query &=' }
                            ] as const
                          ).map((fmt) => (
                            <button
                              key={fmt.id}
                              type="button"
                              onClick={() => setCustomData({ ...customData, format: fmt.id })}
                              className={`py-1.5 px-2 rounded-lg text-xs font-bold border cursor-pointer ${
                                customData.format === fmt.id
                                  ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                                  : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                              }`}
                            >
                              {fmt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold">
                          Custom Key-Value Parameters
                        </span>
                        <button
                          type="button"
                          onClick={handleAddCustomPair}
                          className="px-2.5 py-1 rounded-md bg-[#fca311]/20 hover:bg-[#fca311] text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Field</span>
                        </button>
                      </div>

                      {customData.pairs.map((pair) => (
                        <div key={pair.id} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={pair.key}
                            onChange={(e) => handleUpdateCustomPair(pair.id, 'key', e.target.value)}
                            placeholder="Key / Field Name"
                            className="w-2/5 px-2.5 py-1.5 text-xs font-mono rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                          />
                          <input
                            type="text"
                            value={pair.value}
                            onChange={(e) => handleUpdateCustomPair(pair.id, 'value', e.target.value)}
                            placeholder="Value"
                            className="flex-1 px-2.5 py-1.5 text-xs font-mono rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveCustomPair(pair.id)}
                            aria-label="Remove parameter"
                            className="p-1.5 rounded-lg border border-[#14213d]/15 dark:border-[#ffffff]/15 hover:border-red-500 text-red-500 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {customData.mode === 'raw' && (
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Raw Custom Payload String (Any Unmentioned Standard or Protocol)
                    </label>
                    <textarea
                      rows={4}
                      value={customData.rawString}
                      onChange={(e) => setCustomData({ ...customData, rawString: e.target.value })}
                      placeholder="Enter any raw QR string, MECARD, GS1 string, or custom data..."
                      className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                )}
              </div>
            )}

            {/* EXTRA NON-MENTIONED OPTIONS APPENDIX FIELD (ON ALL STANDARD PRESETS) */}
            {payloadType !== 'custom' && payloadType !== 'code128' && (
              <div className="pt-3 border-t border-[#14213d]/10 dark:border-[#ffffff]/10 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-semibold opacity-90">
                    {m.extraNonMentionedLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() => setPayloadType('custom')}
                    className="text-[11px] font-bold text-[#fca311] hover:underline cursor-pointer"
                  >
                    {m.switchToFullCustomBtn}
                  </button>
                </div>
                <input
                  type="text"
                  value={extraCustomAppendix}
                  onChange={(e) => setExtraCustomAppendix(e.target.value)}
                  placeholder={m.extraNonMentionedPlaceholder}
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-[#14213d]/20 dark:border-[#ffffff]/20 bg-[#14213d]/[0.02] dark:bg-[#ffffff]/[0.03]"
                />
                <p className="text-[11px] opacity-65">{m.extraNonMentionedHint}</p>
              </div>
            )}
          </div>

          {/* STEP 2: COMPREHENSIVE 4-TAB CUSTOMIZE SECTION */}
          <div className="p-6 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#14213d]/10 dark:border-[#ffffff]/10 pb-3">
              <h2 className="text-base font-bold">{t.qrStep2Customize}</h2>
              <button
                type="button"
                onClick={handleResetStyles}
                className="text-xs font-semibold opacity-75 hover:opacity-100 hover:text-[#fca311] underline cursor-pointer"
              >
                {m.resetStyleBtn}
              </button>
            </div>

            {/* 4-Tab Customize Navigation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-[#14213d]/5 dark:bg-[#ffffff]/10 p-1 rounded-xl">
              {(
                [
                  { id: 'shapes', label: m.custTabShapes, icon: <Layers className="w-3.5 h-3.5" /> },
                  { id: 'colors', label: m.custTabColors, icon: <Palette className="w-3.5 h-3.5" /> },
                  { id: 'logo-frame', label: m.custTabLogoFrame, icon: <Upload className="w-3.5 h-3.5" /> },
                  { id: 'advanced', label: m.custTabAdvanced, icon: <Sliders className="w-3.5 h-3.5" /> }
                ] as { id: CustomizeSubTab; label: string; icon: React.ReactNode }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCustomizeTab(tab.id)}
                  className={`py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    customizeTab === tab.id
                      ? 'bg-[#fca311] text-[#14213d] shadow-xs'
                      : 'hover:text-[#fca311]'
                  }`}
                >
                  {tab.icon}
                  <span className="truncate">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* TAB 1: SHAPES & DOTS */}
            {customizeTab === 'shapes' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-2">
                    {m.modulePatternLabel}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(
                      [
                        { id: 'square', label: 'Square Classic' },
                        { id: 'rounded', label: 'Rounded Soft' },
                        { id: 'dots', label: 'Circle Dots' },
                        { id: 'diamond', label: 'Diamond Rhombus' },
                        { id: 'bars', label: 'Vertical Bars' },
                        { id: 'hbars', label: 'Horizontal Bars' },
                        { id: 'classy', label: 'Classy Leaf' }
                      ] as { id: ModuleDotStyle; label: string }[]
                    ).map((mod) => (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => setModuleStyle(mod.id)}
                        className={`py-2 px-2.5 rounded-lg text-xs font-bold border cursor-pointer ${
                          moduleStyle === mod.id
                            ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                            : 'border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311]'
                        }`}
                      >
                        {mod.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2">
                    {m.cornerFrameLabel}
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {(
                      [
                        { id: 'square', label: 'Square' },
                        { id: 'rounded', label: 'Rounded' },
                        { id: 'circle', label: 'Circle Ring' },
                        { id: 'diamond', label: 'Bevel' },
                        { id: 'leaf', label: 'Leaf Cut' }
                      ] as { id: FinderPatternStyle; label: string }[]
                    ).map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFinderStyle(f.id)}
                        className={`py-2 px-2 rounded-lg text-xs font-bold border cursor-pointer ${
                          finderStyle === f.id
                            ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                            : 'border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311]'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2">
                    {m.cornerDotLabel}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(
                      [
                        { id: 'square', label: 'Square' },
                        { id: 'rounded', label: 'Rounded' },
                        { id: 'circle', label: 'Circle Ball' },
                        { id: 'diamond', label: 'Diamond' }
                      ] as { id: FinderInnerStyle; label: string }[]
                    ).map((inner) => (
                      <button
                        key={inner.id}
                        type="button"
                        onClick={() => setFinderInnerStyle(inner.id)}
                        className={`py-2 px-2 rounded-lg text-xs font-bold border cursor-pointer ${
                          finderInnerStyle === inner.id
                            ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                            : 'border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311]'
                        }`}
                      >
                        {inner.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: COLORS & GRADIENTS */}
            {customizeTab === 'colors' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-2">
                    {m.colorPresetsLabel}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {COLOR_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setFgColor(preset.fg);
                          setBgColor(preset.bg);
                          setEyeColor(preset.eye);
                        }}
                        className="p-2 rounded-lg border border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311] flex items-center gap-2 text-xs font-semibold cursor-pointer"
                      >
                        <span
                          className="w-5 h-5 rounded-md border border-black/15 shrink-0"
                          style={{ backgroundColor: preset.fg }}
                        />
                        <span className="truncate">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 items-center">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      {m.fgColorLabel}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-9 h-9 rounded-md cursor-pointer border border-[#14213d]/20"
                      />
                      <input
                        type="text"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-[#14213d]/20 dark:border-[#ffffff]/20 bg-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      {m.bgColorLabel}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        disabled={transparentBg}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-9 h-9 rounded-md cursor-pointer border border-[#14213d]/20 disabled:opacity-40"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        disabled={transparentBg}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-[#14213d]/20 dark:border-[#ffffff]/20 bg-transparent disabled:opacity-40"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={transparentBg}
                        onChange={(e) => setTransparentBg(e.target.checked)}
                        className="rounded accent-[#fca311] w-4 h-4"
                      />
                      <span>{m.transparentBgLabel}</span>
                    </label>
                  </div>
                </div>

                {/* Gradient Controls */}
                <div className="p-3.5 rounded-lg bg-[#14213d]/5 dark:bg-[#ffffff]/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="inline-flex items-center gap-2 text-xs font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useGradient}
                        onChange={(e) => setUseGradient(e.target.checked)}
                        className="rounded accent-[#fca311] w-4 h-4"
                      />
                      <span>{m.gradientLabel}</span>
                    </label>

                    <label className="inline-flex items-center gap-2 text-xs font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={customEyeColor}
                        onChange={(e) => setCustomEyeColor(e.target.checked)}
                        className="rounded accent-[#fca311] w-4 h-4"
                      />
                      <span>{m.customEyeColorLabel}</span>
                    </label>
                  </div>

                  {useGradient && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          {m.gradientColor2Label}
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={gradientColor2}
                            onChange={(e) => setGradientColor2(e.target.value)}
                            className="w-8 h-8 rounded-md cursor-pointer"
                          />
                          <input
                            type="text"
                            value={gradientColor2}
                            onChange={(e) => setGradientColor2(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-[#14213d]/20 dark:border-[#ffffff]/20 bg-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          {m.gradientDirLabel}
                        </label>
                        <div className="grid grid-cols-4 gap-1">
                          {(['diagonal', 'horizontal', 'vertical', 'radial'] as const).map(
                            (dir) => (
                              <button
                                key={dir}
                                type="button"
                                onClick={() => setGradientDirection(dir)}
                                className={`py-1.5 px-1.5 rounded-md text-[11px] font-bold capitalize border cursor-pointer ${
                                  gradientDirection === dir
                                    ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                                    : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                                }`}
                              >
                                {dir}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {customEyeColor && (
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-xs font-semibold">{m.customEyeColorLabel}:</span>
                      <input
                        type="color"
                        value={eyeColor}
                        onChange={(e) => setEyeColor(e.target.value)}
                        className="w-8 h-8 rounded-md cursor-pointer"
                      />
                      <span className="text-xs font-mono">{eyeColor}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: CENTER LOGO & CALL-TO-ACTION FRAME */}
            {customizeTab === 'logo-frame' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-2">
                    {m.presetBadgesLabel}
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                    {(
                      [
                        { id: 'none', label: 'None' },
                        { id: 'scan-me', label: 'SCAN' },
                        { id: 'wifi-badge', label: 'Wi-Fi' },
                        { id: 'bistro-cup', label: 'MENU' },
                        { id: 'vcard-monogram', label: 'vCARD' },
                        { id: 'whatsapp-badge', label: 'CHAT' },
                        { id: 'pay-badge', label: 'PAY' },
                        { id: 'atelier-seal', label: 'PRO' }
                      ] as { id: CenterEmblemPreset; label: string }[]
                    ).map((badge) => (
                      <button
                        key={badge.id}
                        type="button"
                        onClick={() => setEmblemPreset(badge.id)}
                        className={`py-2 px-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                          emblemPreset === badge.id
                            ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                            : 'border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311]'
                        }`}
                      >
                        {badge.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload Custom Image Logo + Scale */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-lg bg-[#14213d]/5 dark:bg-[#ffffff]/5">
                  <div className="flex items-center gap-2.5">
                    <input
                      ref={emblemInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml,image/webp"
                      onChange={handleEmblemFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => emblemInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-lg bg-[#fca311] text-[#14213d] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{t.uploadCenterLogo}</span>
                    </button>

                    {emblemPreset !== 'none' && (
                      <button
                        type="button"
                        onClick={() => setEmblemPreset('none')}
                        className="text-xs underline opacity-80 hover:opacity-100 cursor-pointer"
                      >
                        {t.removeLogo}
                      </button>
                    )}
                  </div>

                  {emblemPreset !== 'none' && (
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold">{m.logoScaleLabel}:</span>
                      {(
                        [
                          { val: 0.18, label: 'S' },
                          { val: 0.23, label: 'M' },
                          { val: 0.27, label: 'L' }
                        ] as const
                      ).map((sz) => (
                        <button
                          key={sz.label}
                          type="button"
                          onClick={() => setEmblemScale(sz.val)}
                          className={`w-7 h-7 rounded-md text-xs font-bold border cursor-pointer ${
                            emblemScale === sz.val
                              ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                              : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                          }`}
                        >
                          {sz.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Call-to-Action Frame Banner */}
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5">
                      {m.frameStyleLabel}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(
                        [
                          { id: 'none', label: 'No Frame' },
                          { id: 'bottom-banner', label: 'Bottom Label Banner' },
                          { id: 'top-banner', label: 'Top Label Banner' },
                          { id: 'outline-box', label: 'Studio Border Box' }
                        ] as { id: QRFrameStyle; label: string }[]
                      ).map((fr) => (
                        <button
                          key={fr.id}
                          type="button"
                          onClick={() => setFrameStyle(fr.id)}
                          className={`py-2 px-2 rounded-lg text-xs font-bold border cursor-pointer ${
                            frameStyle === fr.id
                              ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                              : 'border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311]'
                          }`}
                        >
                          {fr.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {(frameStyle === 'bottom-banner' || frameStyle === 'top-banner') && (
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        {m.frameTextLabel}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <input
                          type="text"
                          maxLength={26}
                          value={frameText}
                          onChange={(e) => setFrameText(e.target.value)}
                          placeholder="SCAN ME"
                          className="flex-1 px-3 py-2 text-xs font-bold uppercase rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                        />
                        {['SCAN ME', 'FREE WI-FI', 'VIEW MENU', 'SAVE CONTACT'].map((presetTxt) => (
                          <button
                            key={presetTxt}
                            type="button"
                            onClick={() => setFrameText(presetTxt)}
                            className="px-2.5 py-1.5 rounded-lg border border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311] text-[11px] font-bold cursor-pointer"
                          >
                            {presetTxt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: ADVANCED TECHNICAL SPECS & RAW PAYLOAD OVERRIDE */}
            {customizeTab === 'advanced' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5">
                      {m.eccLevelLabel}
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(
                        [
                          { id: 'L', label: 'L (7%)' },
                          { id: 'M', label: 'M (15%)' },
                          { id: 'Q', label: 'Q (25%)' },
                          { id: 'H', label: 'H (30%)' }
                        ] as { id: QRErrorCorrectionLevel; label: string }[]
                      ).map((lvl) => (
                        <button
                          key={lvl.id}
                          type="button"
                          onClick={() => setErrorCorrectionLevel(lvl.id)}
                          className={`py-2 px-2 rounded-lg text-xs font-bold border cursor-pointer ${
                            errorCorrectionLevel === lvl.id
                              ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                              : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                          }`}
                        >
                          {lvl.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5">
                      {m.exportResLabel}
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[600, 1200, 2000, 2400].map((res) => (
                        <button
                          key={res}
                          type="button"
                          onClick={() => setExportResolution(res)}
                          className={`py-2 px-1.5 rounded-lg text-xs font-mono font-bold border cursor-pointer ${
                            exportResolution === res
                              ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                              : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                          }`}
                        >
                          {res}px
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    {m.quietZoneLabel}: <span className="font-mono">{marginModules} modules</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={8}
                    value={marginModules}
                    onChange={(e) => setMarginModules(Number(e.target.value))}
                    className="w-full accent-[#fca311]"
                  />
                </div>

                {/* Live Raw Payload Inspector & Manual Override */}
                <div className="p-3.5 rounded-lg bg-[#14213d]/5 dark:bg-[#ffffff]/5 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold">{m.rawPayloadInspectorLabel}</span>
                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={manualRawOverrideEnabled}
                          onChange={(e) => {
                            setManualRawOverrideEnabled(e.target.checked);
                            if (e.target.checked && !manualRawString) {
                              setManualRawString(computedPayload);
                            }
                          }}
                          className="rounded accent-[#fca311] w-3.5 h-3.5"
                        />
                        <span>{m.rawOverrideToggle}</span>
                      </label>

                      <button
                        type="button"
                        onClick={handleCopyPayload}
                        className="px-2.5 py-1 rounded-md border border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311] text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        {copiedPayload ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{m.copiedLabel}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#fca311]" />
                            <span>{m.copyPayloadBtn}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {manualRawOverrideEnabled ? (
                    <textarea
                      rows={3}
                      value={manualRawString}
                      onChange={(e) => setManualRawString(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-[#fca311] bg-[#ffffff] dark:bg-[#14213d]"
                    />
                  ) : (
                    <pre className="p-2.5 rounded-lg bg-[#ffffff] dark:bg-[#14213d] border border-[#14213d]/10 dark:border-[#ffffff]/10 text-[11px] font-mono whitespace-pre-wrap break-all max-h-28 overflow-y-auto">
                      {activeRawPayload}
                    </pre>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: Clean QR Preview & Download */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="p-6 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-5 text-center">
            <div className="flex items-center justify-between border-b border-[#14213d]/10 dark:border-[#ffffff]/10 pb-3">
              <h2 className="text-base font-bold text-start">
                {t.qrStep3Preview}
              </h2>
              <span className="text-xs font-mono opacity-75">
                ECC-{errorCorrectionLevel} · {exportResolution}px
              </span>
            </div>

            <div className="p-6 rounded-xl bg-[#ffffff] border-2 border-[#14213d]/15 max-w-[290px] mx-auto flex items-center justify-center shadow-xs">
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: svgMarkup }}
              />
            </div>

            {/* Active Payload Summary Line */}
            <div className="text-xs font-mono opacity-75 truncate px-2">
              {activeRawPayload}
            </div>

            <div className="space-y-3 pt-1">
              <button
                data-cursor-label="DOWNLOAD"
                onClick={handleDownloadHighResPng}
                className="w-full py-4 px-6 rounded-lg bg-[#fca311] hover:bg-[#e5920e] text-[#14213d] text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>
                  {t.downloadHighResPng.replace('1200', String(exportResolution))}
                </span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleDownloadSvg}
                  className="py-3 px-4 rounded-lg border-2 border-[#14213d]/20 dark:border-[#ffffff]/25 hover:border-[#fca311] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileCode2 className="w-4 h-4 text-[#fca311]" />
                  <span>{t.downloadVectorSvg}</span>
                </button>

                <button
                  onClick={handleBridgeToExactKb}
                  className="py-3 px-4 rounded-lg border-2 border-[#14213d]/20 dark:border-[#ffffff]/25 hover:border-[#fca311] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowRightLeft className="w-4 h-4 text-[#fca311]" />
                  <span>{t.compressQrUnder20Kb}</span>
                </button>
              </div>
            </div>

            {exportStatus && (
              <div className="p-3 rounded-lg bg-[#fca311]/20 border border-[#fca311] text-xs font-mono font-bold">
                ✓ {exportStatus}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ILLUSTRATED VISITOR GUIDE WITH WEBSITE SCREENS FOR QR GENERATOR */}
      <VisitorVisualGuide mode="qr" locale={locale} />

      {/* SEMANTIC SEO SPECIFICATION & PERMANENT QR GUIDE SECTION */}
      <section
        aria-labelledby="compressphoto-qr-specs-heading"
        className="pt-8 border-t border-[#14213d]/15 dark:border-[#ffffff]/15 space-y-6"
      >
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2
            id="compressphoto-qr-specs-heading"
            className="font-serif text-2xl sm:text-3xl font-bold tracking-tight"
          >
            {t.qrSeoSectionTitle}
          </h2>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
            {t.qrSeoSectionSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.qrSeoCards.map((card, idx) => (
            <article
              key={idx}
              className="p-6 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <h3 className="font-serif text-base sm:text-lg font-bold leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs opacity-80 leading-relaxed">
                  {card.body}
                </p>
              </div>
              <ul className="space-y-1.5 pt-3 border-t border-[#14213d]/10 dark:border-[#ffffff]/10">
                {card.specs.map((spec, sIdx) => (
                  <li
                    key={sIdx}
                    className="text-xs font-medium flex items-start gap-2"
                  >
                    <span className="text-[#fca311] font-bold">•</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
