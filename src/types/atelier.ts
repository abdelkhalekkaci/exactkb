export type AtelierPage = 'exactkb' | 'qr' | 'blog' | 'about' | 'privacy' | 'legal' | 'contact';

export type LocaleCode = 'en' | 'fr' | 'es' | 'ar';

export type BiometricPresetId =
  | 'schengen-35x45'
  | 'us-visa-2x2'
  | 'wet-ink-sig'
  | 'amazon-1000'
  | 'custom';

export interface BiometricPreset {
  id: BiometricPresetId;
  name: string;
  subtitle: string;
  physicalSize: string;
  widthPx: number;
  heightPx: number;
  dpi: number;
  recommendedKb: number;
  defaultBackdrop: BackdropMode;
  isSignature?: boolean;
  isoSpec: string;
}

export type BackdropMode = 'original' | 'pure-white' | 'id-blue' | 'warm-cream';

export type SignatureInkColor = 'classic-black' | 'fountain-blue' | 'archival-sepia';

export interface CompressionPass {
  passNumber: number;
  quality: number;
  width: number;
  height: number;
  bytes: number;
  kb: number;
  status: 'OVER' | 'UNDER' | 'LOCKED';
  deltaBytes: number;
}

export interface CompressionResult {
  blobUrl: string;
  dataUrl: string;
  bytes: number;
  kb: number;
  targetKb: number;
  targetBytes: number;
  width: number;
  height: number;
  mimeType: 'image/jpeg' | 'image/webp' | 'image/png';
  passes: CompressionPass[];
  durationMs: number;
  lockedQuality: number;
}

export interface StudioStampConfig {
  enabled: boolean;
  studioName: string;
  dateString: string;
  certificationCode: string;
  showWatermark: boolean;
  watermarkText: string;
  inkColor: 'vermilion' | 'charcoal' | 'emerald';
}

export type QRPayloadType =
  | 'url'
  | 'wifi'
  | 'vcard'
  | 'menu'
  | 'whatsapp'
  | 'email'
  | 'phone'
  | 'sms'
  | 'location'
  | 'event'
  | 'social'
  | 'payment'
  | 'appstore'
  | 'text'
  | 'code128'
  | 'custom'
  | 'barcode';

export type QRCategoryFilter =
  | 'all'
  | 'web'
  | 'contact'
  | 'venue'
  | 'commerce'
  | 'custom';

export type FinderPatternStyle = 'square' | 'rounded' | 'circle' | 'diamond' | 'leaf';
export type FinderInnerStyle = 'square' | 'rounded' | 'circle' | 'diamond';
export type ModuleDotStyle = 'square' | 'rounded' | 'dots' | 'diamond' | 'bars' | 'hbars' | 'classy';
export type QRErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type QRGradientDirection = 'diagonal' | 'vertical' | 'horizontal' | 'radial';
export type QRFrameStyle = 'none' | 'bottom-banner' | 'top-banner' | 'outline-box';

export type CenterEmblemPreset =
  | 'none'
  | 'scan-me'
  | 'wifi-badge'
  | 'bistro-cup'
  | 'vcard-monogram'
  | 'whatsapp-badge'
  | 'pay-badge'
  | 'atelier-seal'
  | 'custom';

export type PrintProofType = 'tent-card' | 'business-card' | 'flat-drafting';

export interface WifiPayloadData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardPayloadData {
  firstName: string;
  lastName: string;
  title: string;
  organization: string;
  phone: string;
  workPhone?: string;
  email: string;
  website: string;
  street?: string;
  city: string;
  country?: string;
  note?: string;
}

export interface MenuPayloadData {
  bistroName: string;
  menuUrl: string;
  tableNumber: string;
  dailyNote: string;
  wifiHint: string;
}

export interface WhatsappPayloadData {
  phone: string;
  message: string;
}

export interface EmailPayloadData {
  email: string;
  subject: string;
  body: string;
  encoding: 'mailto' | 'matmsg';
}

export interface PhonePayloadData {
  phone: string;
}

export interface SmsPayloadData {
  phone: string;
  message: string;
}

export interface LocationPayloadData {
  latitude: string;
  longitude: string;
  query: string;
  format: 'geo' | 'maps';
}

export interface EventPayloadData {
  title: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  description: string;
}

export interface SocialPayloadData {
  platform: 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'x' | 'facebook' | 'telegram' | 'custom';
  handleOrUrl: string;
}

export interface PaymentPayloadData {
  method: 'paypal' | 'upi' | 'bitcoin' | 'ethereum' | 'iban' | 'custom';
  recipient: string;
  recipientName: string;
  amount: string;
  currency: string;
  note: string;
}

export interface AppStorePayloadData {
  appName: string;
  iosUrl: string;
  androidUrl: string;
  primaryTarget: 'universal' | 'ios' | 'android';
  universalUrl: string;
}

export interface CustomKeyValuePair {
  id: string;
  key: string;
  value: string;
}

export interface CustomBuilderPayloadData {
  mode: 'uri-scheme' | 'key-value' | 'raw';
  scheme: string;
  path: string;
  format: 'json' | 'lines' | 'mecard' | 'query';
  pairs: CustomKeyValuePair[];
  rawString: string;
}

export interface SeoRoute {
  id: string;
  slug: string;
  locale: LocaleCode;
  languageLabel: string;
  keyword: string;
  title: string;
  metaDescription: string;
  targetTool: 'exactkb' | 'qr';
  presetId?: BiometricPresetId;
  targetKb?: number;
  qrPayloadType?: QRPayloadType;
  monthlyVolume: number;
  cpcUsd: number;
  faqQuestion: string;
  faqAnswer: string;
}

export interface BulkQueueItem {
  id: string;
  fileName: string;
  category: 'Passport 35×45mm' | 'Wet-Ink Signature' | 'US Visa 2×2in' | 'Studio Product';
  originalKb: number;
  targetKb: number;
  finalKb: number;
  passesUsed: number;
  status: 'queued' | 'processing' | 'locked';
}
