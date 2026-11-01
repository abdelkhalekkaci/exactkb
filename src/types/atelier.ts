export type AtelierPage = 'exactkb' | 'qr' | 'about' | 'privacy' | 'legal' | 'contact';

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
  | 'wifi'
  | 'vcard'
  | 'menu'
  | 'whatsapp'
  | 'url'
  | 'code128';

export type FinderPatternStyle = 'square' | 'rounded' | 'diamond';
export type ModuleDotStyle = 'square' | 'dots' | 'bars';
export type CenterEmblemPreset = 'none' | 'atelier-seal' | 'wifi-badge' | 'bistro-cup' | 'vcard-monogram' | 'custom';
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
  email: string;
  website: string;
  city: string;
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
