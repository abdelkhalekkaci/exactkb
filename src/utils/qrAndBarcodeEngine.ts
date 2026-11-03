import QRCode from 'qrcode';
import {
  AppStorePayloadData,
  CenterEmblemPreset,
  CustomBuilderPayloadData,
  EmailPayloadData,
  EventPayloadData,
  FinderInnerStyle,
  FinderPatternStyle,
  LocationPayloadData,
  MenuPayloadData,
  ModuleDotStyle,
  PaymentPayloadData,
  PhonePayloadData,
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

export interface QRStyleOptions {
  fgColor: string;
  bgColor: string;
  transparentBg?: boolean;
  useGradient?: boolean;
  gradientColor2?: string;
  gradientDirection?: QRGradientDirection;
  customEyeColor?: boolean;
  eyeColor?: string;
  finderStyle: FinderPatternStyle;
  finderInnerStyle?: FinderInnerStyle;
  moduleStyle: ModuleDotStyle;
  emblemPreset: CenterEmblemPreset;
  customEmblemDataUrl: string | null;
  emblemScale?: number;
  showEmblemBorder?: boolean;
  frameStyle?: QRFrameStyle;
  frameText?: string;
  errorCorrectionLevel?: QRErrorCorrectionLevel;
  marginModules?: number;
  code128ShowText?: boolean;
  code128Height?: number;
}

export interface AllQRPayloadInputs {
  wifi: WifiPayloadData;
  vcard: VCardPayloadData;
  menu: MenuPayloadData;
  whatsapp: WhatsappPayloadData;
  url: string;
  urlUtmSource?: string;
  urlUtmMedium?: string;
  urlUtmCampaign?: string;
  code128: string;
  email?: EmailPayloadData;
  phone?: PhonePayloadData;
  sms?: SmsPayloadData;
  location?: LocationPayloadData;
  event?: EventPayloadData;
  social?: SocialPayloadData;
  payment?: PaymentPayloadData;
  appstore?: AppStorePayloadData;
  text?: string;
  custom?: CustomBuilderPayloadData;
  extraCustomAppendix?: string;
}

function formatIcalDateTime(isoLocal: string): string {
  if (!isoLocal) return '20260615T100000Z';
  const cleaned = isoLocal.replace(/[-:]/g, '');
  if (cleaned.length === 13) return `${cleaned}00`;
  if (cleaned.length >= 15) return cleaned.slice(0, 15);
  return '20260615T100000';
}

export function buildRawPayloadString(
  type: QRPayloadType,
  data: AllQRPayloadInputs
): string {
  const appendix = data.extraCustomAppendix?.trim() || '';

  switch (type) {
    case 'wifi': {
      const { ssid, password, encryption, hidden } = data.wifi;
      const esc = (s: string) => s.replace(/([\\;,:])/g, '\\$1');
      const base = `WIFI:T:${encryption};S:${esc(ssid || 'Guest_WiFi')};P:${esc(password)};H:${hidden ? 'true' : 'false'};`;
      return appendix ? `${base}${appendix};` : `${base};`;
    }

    case 'vcard': {
      const v = data.vcard;
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${v.lastName};${v.firstName};;;`,
        `FN:${v.firstName} ${v.lastName}`.trim(),
        v.organization ? `ORG:${v.organization}` : '',
        v.title ? `TITLE:${v.title}` : '',
        v.phone ? `TEL;TYPE=CELL:${v.phone}` : '',
        v.workPhone ? `TEL;TYPE=WORK:${v.workPhone}` : '',
        v.email ? `EMAIL:${v.email}` : '',
        v.website ? `URL:${v.website}` : '',
        v.street || v.city || v.country
          ? `ADR;TYPE=WORK:;;${v.street || ''};${v.city || ''};;;${v.country || ''}`
          : '',
        v.note ? `NOTE:${v.note}` : '',
        appendix ? appendix : '',
        'END:VCARD'
      ];
      return lines.filter(Boolean).join('\n');
    }

    case 'menu': {
      const m = data.menu;
      const base = m.menuUrl.trim() || 'https://cafe-lumiere.ch/menu';
      const params: string[] = [];
      if (m.tableNumber.trim()) {
        params.push(`table=${encodeURIComponent(m.tableNumber.trim())}`);
      }
      if (m.dailyNote.trim()) {
        params.push(`note=${encodeURIComponent(m.dailyNote.trim())}`);
      }
      if (m.wifiHint.trim()) {
        params.push(`wifi=${encodeURIComponent(m.wifiHint.trim())}`);
      }
      if (appendix) {
        params.push(appendix.replace(/^[?&]/, ''));
      }
      if (params.length === 0) return base;
      const sep = base.includes('?') ? '&' : '?';
      return `${base}${sep}${params.join('&')}`;
    }

    case 'whatsapp': {
      const cleanPhone = data.whatsapp.phone.replace(/[^\d]/g, '') || '33612345678';
      const fullMsg = appendix
        ? `${data.whatsapp.message}\n${appendix}`.trim()
        : data.whatsapp.message || 'Hello!';
      const msg = encodeURIComponent(fullMsg);
      return `https://wa.me/${cleanPhone}?text=${msg}`;
    }

    case 'email': {
      const em = data.email || {
        email: 'contact@compressphoto.space',
        subject: 'Inquiry',
        body: 'Hello, I would like more information.',
        encoding: 'mailto'
      };
      const bodyWithExtra = appendix ? `${em.body}\n${appendix}`.trim() : em.body;
      if (em.encoding === 'matmsg') {
        const esc = (s: string) => s.replace(/([\\;:])/g, '\\$1');
        return `MATMSG:TO:${esc(em.email)};SUB:${esc(em.subject)};BODY:${esc(bodyWithExtra)};;`;
      }
      const params: string[] = [];
      if (em.subject) params.push(`subject=${encodeURIComponent(em.subject)}`);
      if (bodyWithExtra) params.push(`body=${encodeURIComponent(bodyWithExtra)}`);
      const q = params.length > 0 ? `?${params.join('&')}` : '';
      return `mailto:${em.email.trim() || 'contact@compressphoto.space'}${q}`;
    }

    case 'phone': {
      const ph = data.phone?.phone.trim() || '+33142685500';
      return `tel:${ph.replace(/\s+/g, '')}`;
    }

    case 'sms': {
      const sm = data.sms || { phone: '+33614289000', message: 'Hello!' };
      const msg = appendix ? `${sm.message} ${appendix}`.trim() : sm.message;
      return `SMSTO:${sm.phone.trim() || '+33614289000'}:${msg}`;
    }

    case 'location': {
      const loc = data.location || {
        latitude: '48.8584',
        longitude: '2.2945',
        query: 'Eiffel Tower, Paris',
        format: 'geo'
      };
      const lat = loc.latitude.trim() || '48.8584';
      const lng = loc.longitude.trim() || '2.2945';
      if (loc.format === 'maps') {
        const q = loc.query.trim()
          ? encodeURIComponent(loc.query.trim())
          : `${lat},${lng}`;
        return `https://www.google.com/maps/search/?api=1&query=${q}`;
      }
      const qParam = loc.query.trim() ? `?q=${encodeURIComponent(loc.query.trim())}` : '';
      return `geo:${lat},${lng}${qParam}`;
    }

    case 'event': {
      const ev = data.event || {
        title: 'Product Launch & Studio Showcase',
        location: 'Geneva Convention Center',
        startDateTime: '2026-06-15T10:00',
        endDateTime: '2026-06-15T12:00',
        description: 'Annual keynote and live exhibition.'
      };
      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${ev.title || 'Event'}`,
        ev.location ? `LOCATION:${ev.location}` : '',
        `DTSTART:${formatIcalDateTime(ev.startDateTime)}`,
        `DTEND:${formatIcalDateTime(ev.endDateTime)}`,
        ev.description ? `DESCRIPTION:${ev.description}` : '',
        appendix ? appendix : '',
        'END:VEVENT',
        'END:VCALENDAR'
      ];
      return lines.filter(Boolean).join('\n');
    }

    case 'social': {
      const soc = data.social || { platform: 'instagram', handleOrUrl: 'compressphoto' };
      const raw = soc.handleOrUrl.trim().replace(/^@/, '') || 'compressphoto';
      if (/^https?:\/\//i.test(raw)) {
        return appendix ? `${raw}${raw.includes('?') ? '&' : '?'}${appendix}` : raw;
      }
      const baseMap: Record<SocialPayloadData['platform'], string> = {
        instagram: `https://instagram.com/${raw}`,
        tiktok: `https://tiktok.com/@${raw}`,
        linkedin: `https://linkedin.com/in/${raw}`,
        youtube: `https://youtube.com/@${raw}`,
        x: `https://x.com/${raw}`,
        facebook: `https://facebook.com/${raw}`,
        telegram: `https://t.me/${raw}`,
        custom: `https://${raw}`
      };
      const built = baseMap[soc.platform] || `https://${raw}`;
      return appendix ? `${built}?${appendix.replace(/^[?&]/, '')}` : built;
    }

    case 'payment': {
      const pay = data.payment || {
        method: 'paypal',
        recipient: 'atelierstudio',
        recipientName: 'Atelier Studio',
        amount: '25.00',
        currency: 'EUR',
        note: 'Invoice #104'
      };
      const rec = pay.recipient.trim() || 'atelierstudio';
      const amt = pay.amount.trim();
      const cur = (pay.currency.trim() || 'EUR').toUpperCase();
      switch (pay.method) {
        case 'paypal': {
          if (/^https?:\/\//i.test(rec)) return rec;
          return amt ? `https://paypal.me/${rec}/${amt}${cur}` : `https://paypal.me/${rec}`;
        }
        case 'upi': {
          const params = [
            `pa=${encodeURIComponent(rec)}`,
            pay.recipientName ? `pn=${encodeURIComponent(pay.recipientName)}` : '',
            amt ? `am=${encodeURIComponent(amt)}` : '',
            `cu=${encodeURIComponent(cur || 'INR')}`,
            pay.note ? `tn=${encodeURIComponent(pay.note)}` : ''
          ].filter(Boolean);
          return `upi://pay?${params.join('&')}`;
        }
        case 'bitcoin': {
          const q: string[] = [];
          if (amt) q.push(`amount=${encodeURIComponent(amt)}`);
          if (pay.note) q.push(`message=${encodeURIComponent(pay.note)}`);
          return `bitcoin:${rec}${q.length ? `?${q.join('&')}` : ''}`;
        }
        case 'ethereum': {
          return `ethereum:${rec}${amt ? `?value=${encodeURIComponent(amt)}` : ''}`;
        }
        case 'iban': {
          // EPC SEPA Credit Transfer QR standard
          return [
            'BCD',
            '002',
            '1',
            'SCT',
            '',
            pay.recipientName || 'Beneficiary',
            rec.replace(/\s+/g, ''),
            amt ? `EUR${amt}` : '',
            '',
            '',
            pay.note || 'Payment'
          ].join('\n');
        }
        case 'custom':
        default:
          return rec;
      }
    }

    case 'appstore': {
      const app = data.appstore || {
        appName: 'CompressPhoto',
        iosUrl: 'https://apps.apple.com/app/id000000000',
        androidUrl: 'https://play.google.com/store/apps/details?id=space.compressphoto',
        primaryTarget: 'universal',
        universalUrl: 'https://compressphoto.space'
      };
      if (app.primaryTarget === 'ios') return app.iosUrl.trim() || 'https://apps.apple.com';
      if (app.primaryTarget === 'android') return app.androidUrl.trim() || 'https://play.google.com';
      return app.universalUrl.trim() || app.iosUrl.trim() || 'https://compressphoto.space';
    }

    case 'text': {
      const baseText = data.text?.trim() || 'CompressPhoto — 100% Client-Side Photo & QR Studio';
      return appendix ? `${baseText}\n${appendix}` : baseText;
    }

    case 'custom': {
      const c = data.custom;
      if (!c) return appendix || 'CUSTOM:CompressPhoto';
      if (c.mode === 'raw') {
        return c.rawString.trim() || 'https://compressphoto.space';
      }
      const activePairs = c.pairs.filter((p) => p.key.trim() !== '' || p.value.trim() !== '');
      if (c.mode === 'uri-scheme') {
        const cleanScheme = (c.scheme.trim() || 'custom').replace(/:\/\/$/, '').replace(/:$/, '');
        const cleanPath = c.path.trim();
        const queryPart = activePairs
          .filter((p) => p.key.trim())
          .map((p) => `${encodeURIComponent(p.key.trim())}=${encodeURIComponent(p.value.trim())}`)
          .join('&');
        const baseUri = `${cleanScheme}://${cleanPath}`;
        return queryPart ? `${baseUri}${baseUri.includes('?') ? '&' : '?'}${queryPart}` : baseUri;
      }
      // key-value structured mode
      if (c.format === 'json') {
        const obj: Record<string, string> = {};
        activePairs.forEach((p, idx) => {
          obj[p.key.trim() || `field_${idx + 1}`] = p.value;
        });
        return JSON.stringify(obj);
      }
      if (c.format === 'mecard') {
        const body = activePairs
          .map((p) => `${p.key.trim().toUpperCase() || 'KEY'}:${p.value.trim()};`)
          .join('');
        return `CUSTOM:${body};`;
      }
      if (c.format === 'query') {
        return activePairs
          .map((p) => `${encodeURIComponent(p.key.trim())}=${encodeURIComponent(p.value.trim())}`)
          .join('&');
      }
      // default 'lines'
      return activePairs.map((p) => `${p.key.trim()}: ${p.value.trim()}`).join('\n') || 'KEY: VALUE';
    }

    case 'code128':
    case 'barcode':
      return (data.code128 || 'SKU-2026-094').slice(0, 32);

    case 'url':
    default: {
      const base = data.url.trim() || 'https://compressphoto.space';
      const utmParams: string[] = [];
      if (data.urlUtmSource?.trim()) {
        utmParams.push(`utm_source=${encodeURIComponent(data.urlUtmSource.trim())}`);
      }
      if (data.urlUtmMedium?.trim()) {
        utmParams.push(`utm_medium=${encodeURIComponent(data.urlUtmMedium.trim())}`);
      }
      if (data.urlUtmCampaign?.trim()) {
        utmParams.push(`utm_campaign=${encodeURIComponent(data.urlUtmCampaign.trim())}`);
      }
      if (appendix) {
        utmParams.push(appendix.replace(/^[?&]/, ''));
      }
      if (utmParams.length === 0) return base;
      const sep = base.includes('?') ? '&' : '?';
      return `${base}${sep}${utmParams.join('&')}`;
    }
  }
}

function isInFinderPattern(row: number, col: number, size: number): boolean {
  const inTopLeft = row < 7 && col < 7;
  const inTopRight = row < 7 && col >= size - 7;
  const inBottomLeft = row >= size - 7 && col < 7;
  return inTopLeft || inTopRight || inBottomLeft;
}

function isInCenterExcavation(
  row: number,
  col: number,
  size: number,
  hasEmblem: boolean,
  emblemScale = 0.23
): boolean {
  if (!hasEmblem) return false;
  const center = size / 2;
  const radius = Math.max(3.0, size * (emblemScale * 0.58));
  return Math.abs(row + 0.5 - center) < radius && Math.abs(col + 0.5 - center) < radius;
}

function buildFinderSvgGroup(
  x: number,
  y: number,
  cellSize: number,
  outerStyle: FinderPatternStyle,
  innerStyle: FinderInnerStyle,
  eyeFill: string,
  bgColor: string
): string {
  const outer = 7 * cellSize;
  const mid = 5 * cellSize;
  const inner = 3 * cellSize;
  const mOff = cellSize;
  const iOff = 2 * cellSize;
  const cx = x + outer / 2;
  const cy = y + outer / 2;

  let frameSvg = '';
  if (outerStyle === 'circle') {
    frameSvg = `
      <circle cx="${cx}" cy="${cy}" r="${outer / 2}" fill="${eyeFill}" />
      <circle cx="${cx}" cy="${cy}" r="${mid / 2}" fill="${bgColor}" />
    `;
  } else if (outerStyle === 'rounded') {
    const rOuter = cellSize * 1.9;
    const rMid = cellSize * 1.3;
    frameSvg = `
      <rect x="${x}" y="${y}" width="${outer}" height="${outer}" rx="${rOuter}" fill="${eyeFill}" />
      <rect x="${x + mOff}" y="${y + mOff}" width="${mid}" height="${mid}" rx="${rMid}" fill="${bgColor}" />
    `;
  } else if (outerStyle === 'leaf') {
    const rOuter = cellSize * 2.2;
    const rMid = cellSize * 1.5;
    frameSvg = `
      <rect x="${x}" y="${y}" width="${outer}" height="${outer}" rx="${rOuter}" ry="${cellSize * 0.5}" fill="${eyeFill}" />
      <rect x="${x + mOff}" y="${y + mOff}" width="${mid}" height="${mid}" rx="${rMid}" ry="${cellSize * 0.35}" fill="${bgColor}" />
    `;
  } else if (outerStyle === 'diamond') {
    frameSvg = `
      <rect x="${x}" y="${y}" width="${outer}" height="${outer}" rx="${cellSize * 0.45}" fill="${eyeFill}" />
      <rect x="${x + mOff}" y="${y + mOff}" width="${mid}" height="${mid}" fill="${bgColor}" />
    `;
  } else {
    frameSvg = `
      <rect x="${x}" y="${y}" width="${outer}" height="${outer}" fill="${eyeFill}" />
      <rect x="${x + mOff}" y="${y + mOff}" width="${mid}" height="${mid}" fill="${bgColor}" />
    `;
  }

  let innerSvg = '';
  if (innerStyle === 'circle') {
    innerSvg = `<circle cx="${cx}" cy="${cy}" r="${inner / 2}" fill="${eyeFill}" />`;
  } else if (innerStyle === 'diamond') {
    const dHalf = (inner / 2) * 1.12;
    innerSvg = `<polygon points="${cx},${cy - dHalf} ${cx + dHalf},${cy} ${cx},${cy + dHalf} ${cx - dHalf},${cy}" fill="${eyeFill}" />`;
  } else if (innerStyle === 'rounded') {
    innerSvg = `<rect x="${x + iOff}" y="${y + iOff}" width="${inner}" height="${inner}" rx="${cellSize * 0.85}" fill="${eyeFill}" />`;
  } else {
    innerSvg = `<rect x="${x + iOff}" y="${y + iOff}" width="${inner}" height="${inner}" fill="${eyeFill}" />`;
  }

  return `${frameSvg}\n${innerSvg}`;
}

// Complete CODE-128 Subset B Bar Pattern Table (Codes 0..106)
const CODE128_PATTERNS: string[] = [
  '11011001100', '11001101100', '11001100110', '10010011000', '10010001100', '10001001100',
  '10011001000', '10011000100', '10001100100', '11001001000', '11001000100', '11000100100',
  '10110011100', '10011011100', '10011001110', '10111001100', '10011101100', '10011100110',
  '11001110010', '11001011100', '11001001110', '11011100100', '11001110100', '11101101110',
  '11101001100', '11100101100', '11100100110', '11101100100', '11100110100', '11100110010',
  '11011011000', '11011000110', '11000110110', '10100011000', '10001011000', '10001000110',
  '10110001000', '10001101000', '10001100010', '11010001000', '11000101000', '11000100010',
  '10110111000', '10110001110', '10001101110', '10111011000', '10111000110', '10001110110',
  '11101110110', '11010001110', '11000101110', '11011101000', '11011100010', '11011101110',
  '11101011000', '11101000110', '11100010110', '11101101000', '11101100010', '11100011010',
  '11101111010', '11001000010', '11110001010', '10100110000', '10100001100', '10010110000',
  '10010000110', '10000101100', '10000100110', '10110010000', '10110000100', '10011010000',
  '10011000010', '10000110100', '10000110010', '11000010010', '11001010000', '11110111010',
  '11000010100', '10001111010', '10100111100', '10010111100', '10010011110', '10111100100',
  '10011110100', '10011110010', '11110100100', '11110010100', '11110010010', '11011011110',
  '11011110110', '11110110110', '10101111000', '10100011110', '10001011110', '10111101000',
  '10111100010', '11110101000', '11110100010', '10111011110', '10111101110', '11101011110',
  '11110101110', '11010000100', '11010010000', '11010011100', '1100011101011'
];

export function encodeCode128Bits(text: string): { bits: string; cleanText: string } {
  const cleanText =
    text
      .replace(/[^\x20-\x7E]/g, '')
      .trim()
      .slice(0, 32) || 'SKU-2026-094';

  const codes: number[] = [104];
  let checksum = 104;

  for (let i = 0; i < cleanText.length; i++) {
    const code = cleanText.charCodeAt(i) - 32;
    codes.push(code);
    checksum += code * (i + 1);
  }

  const checkCode = checksum % 103;
  codes.push(checkCode);
  codes.push(106);

  const bits = codes.map((c) => CODE128_PATTERNS[c] || CODE128_PATTERNS[0]).join('');
  return { bits, cleanText };
}

function escapeXmlText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function generateVectorSvgString(
  payloadType: QRPayloadType,
  rawPayload: string,
  style: QRStyleOptions
): string {
  const {
    fgColor = '#14213d',
    bgColor = '#ffffff',
    transparentBg = false,
    useGradient = false,
    gradientColor2 = '#fca311',
    gradientDirection = 'diagonal',
    customEyeColor = false,
    eyeColor = '#fca311',
    finderStyle = 'rounded',
    finderInnerStyle = 'rounded',
    moduleStyle = 'square',
    emblemPreset = 'none',
    emblemScale = 0.23,
    showEmblemBorder = true,
    frameStyle = 'none',
    frameText = 'SCAN ME',
    errorCorrectionLevel = 'H',
    marginModules = 4,
    code128ShowText = true,
    code128Height = 114
  } = style;

  const effectiveBg = transparentBg ? 'none' : bgColor;
  const solidBgForCutouts = transparentBg ? '#ffffff' : bgColor;

  if (payloadType === 'code128' || payloadType === 'barcode') {
    const { bits, cleanText } = encodeCode128Bits(rawPayload);
    const quietZone = Math.max(8, marginModules * 6);
    const barW = 3;
    const barH = Math.max(60, Math.min(180, code128Height));
    const totalW = bits.length * barW + quietZone * 2;
    const totalH = code128ShowText ? barH + 66 : barH + 36;
    let rects = '';
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] === '1') {
        rects += `<rect x="${quietZone + i * barW}" y="20" width="${barW}" height="${barH}" fill="${fgColor}" />`;
      }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}" width="100%" height="100%">
      ${!transparentBg ? `<rect width="${totalW}" height="${totalH}" fill="${bgColor}" rx="6" />` : ''}
      ${rects}
      ${
        code128ShowText
          ? `<text x="${totalW / 2}" y="${barH + 46}" text-anchor="middle" fill="${fgColor}" font-family="JetBrains Mono, monospace" font-weight="600" font-size="16" letter-spacing="3">${escapeXmlText(cleanText)}</text>`
          : ''
      }
    </svg>`;
  }

  const hasEmblem = emblemPreset !== 'none';
  // Enforce at least Q/H error correction when an emblem is present so it always scans
  const effectiveEcc: QRErrorCorrectionLevel =
    hasEmblem && (errorCorrectionLevel === 'L' || errorCorrectionLevel === 'M')
      ? 'H'
      : errorCorrectionLevel;

  const qr = QRCode.create(rawPayload || 'https://compressphoto.space', {
    errorCorrectionLevel: effectiveEcc
  });

  const size = qr.modules.size;
  const data = qr.modules.data;
  const margin = Math.max(0, Math.min(8, marginModules));
  const cellSize = 16;
  const matrixBoxSize = (size + margin * 2) * cellSize;

  const bannerHeight = frameStyle === 'bottom-banner' || frameStyle === 'top-banner' ? cellSize * 4.2 : 0;
  const topOffset = frameStyle === 'top-banner' ? bannerHeight : 0;
  const totalWidth = matrixBoxSize;
  const totalHeight = matrixBoxSize + bannerHeight;

  let defs = '';
  const moduleFill = useGradient ? 'url(#qrModuleGrad)' : fgColor;
  const finderFill = customEyeColor ? eyeColor : moduleFill;

  if (useGradient) {
    if (gradientDirection === 'radial') {
      defs = `<defs>
        <radialGradient id="qrModuleGrad" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="${fgColor}" />
          <stop offset="100%" stop-color="${gradientColor2}" />
        </radialGradient>
      </defs>`;
    } else {
      const coords =
        gradientDirection === 'horizontal'
          ? 'x1="0%" y1="0%" x2="100%" y2="0%"'
          : gradientDirection === 'vertical'
            ? 'x1="0%" y1="0%" x2="0%" y2="100%"'
            : 'x1="0%" y1="0%" x2="100%" y2="100%"';
      defs = `<defs>
        <linearGradient id="qrModuleGrad" ${coords}>
          <stop offset="0%" stop-color="${fgColor}" />
          <stop offset="100%" stop-color="${gradientColor2}" />
        </linearGradient>
      </defs>`;
    }
  }

  let elements = '';

  // Draw 3 Finder Patterns
  elements += buildFinderSvgGroup(
    margin * cellSize,
    topOffset + margin * cellSize,
    cellSize,
    finderStyle,
    finderInnerStyle,
    finderFill,
    solidBgForCutouts
  );
  elements += buildFinderSvgGroup(
    (margin + size - 7) * cellSize,
    topOffset + margin * cellSize,
    cellSize,
    finderStyle,
    finderInnerStyle,
    finderFill,
    solidBgForCutouts
  );
  elements += buildFinderSvgGroup(
    margin * cellSize,
    topOffset + (margin + size - 7) * cellSize,
    cellSize,
    finderStyle,
    finderInnerStyle,
    finderFill,
    solidBgForCutouts
  );

  // Draw Data Modules
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (isInFinderPattern(r, c, size)) continue;
      if (isInCenterExcavation(r, c, size, hasEmblem, emblemScale)) continue;

      const isDark = data[r * size + c] === 1;
      if (!isDark) continue;

      const x = (margin + c) * cellSize;
      const y = topOffset + (margin + r) * cellSize;
      const cx = x + cellSize / 2;
      const cy = y + cellSize / 2;

      if (moduleStyle === 'dots') {
        const rad = cellSize * 0.44;
        elements += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${moduleFill}" />`;
      } else if (moduleStyle === 'rounded') {
        elements += `<rect x="${x + cellSize * 0.04}" y="${y + cellSize * 0.04}" width="${cellSize * 0.92}" height="${cellSize * 0.92}" rx="${cellSize * 0.32}" fill="${moduleFill}" />`;
      } else if (moduleStyle === 'diamond') {
        const half = cellSize * 0.52;
        elements += `<polygon points="${cx},${cy - half} ${cx + half},${cy} ${cx},${cy + half} ${cx - half},${cy}" fill="${moduleFill}" />`;
      } else if (moduleStyle === 'bars') {
        elements += `<rect x="${x + cellSize * 0.14}" y="${y}" width="${cellSize * 0.72}" height="${cellSize}" rx="${cellSize * 0.25}" fill="${moduleFill}" />`;
      } else if (moduleStyle === 'hbars') {
        elements += `<rect x="${x}" y="${y + cellSize * 0.14}" width="${cellSize}" height="${cellSize * 0.72}" rx="${cellSize * 0.25}" fill="${moduleFill}" />`;
      } else if (moduleStyle === 'classy') {
        elements += `<rect x="${x}" y="${y}" width="${cellSize * 0.94}" height="${cellSize * 0.94}" rx="${cellSize * 0.38}" ry="${cellSize * 0.1}" fill="${moduleFill}" />`;
      } else {
        elements += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${moduleFill}" />`;
      }
    }
  }

  // Draw Center Emblem if enabled
  if (hasEmblem) {
    const centerX = matrixBoxSize / 2;
    const centerY = topOffset + matrixBoxSize / 2;
    const boxSize = Math.round(size * emblemScale * cellSize);
    const bx = centerX - boxSize / 2;
    const by = centerY - boxSize / 2;

    const strokeAttr = showEmblemBorder
      ? `stroke="${finderFill}" stroke-width="${cellSize * 0.28}"`
      : '';

    elements += `<rect x="${bx}" y="${by}" width="${boxSize}" height="${boxSize}" rx="${cellSize * 1.1}" fill="${solidBgForCutouts}" ${strokeAttr} />`;

    if (emblemPreset === 'custom' && style.customEmblemDataUrl) {
      const pad = cellSize * 0.55;
      elements += `<image href="${style.customEmblemDataUrl}" x="${bx + pad}" y="${by + pad}" width="${boxSize - pad * 2}" height="${boxSize - pad * 2}" preserveAspectRatio="xMidYMid contain" />`;
    } else {
      const labelMap: Record<CenterEmblemPreset, string> = {
        none: '',
        'scan-me': 'SCAN',
        'wifi-badge': 'Wi-Fi',
        'bistro-cup': 'MENU',
        'vcard-monogram': 'vCARD',
        'whatsapp-badge': 'CHAT',
        'pay-badge': 'PAY',
        'atelier-seal': 'PRO',
        custom: 'LOGO'
      };
      const label = labelMap[emblemPreset] || 'SCAN';
      elements += `<text x="${centerX}" y="${centerY + cellSize * 0.36}" text-anchor="middle" fill="${fgColor}" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="${cellSize * 1.02}">${escapeXmlText(label)}</text>`;
    }
  }

  // Draw Frame / Call-to-Action Banner if enabled
  const cleanBannerText = escapeXmlText((frameText || 'SCAN ME').slice(0, 28));
  if (frameStyle === 'bottom-banner') {
    const by = matrixBoxSize - cellSize * 0.4;
    const bh = bannerHeight - cellSize * 0.4;
    const bw = matrixBoxSize - cellSize * 2;
    const bx = cellSize;
    elements += `
      <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${cellSize * 0.8}" fill="${fgColor}" />
      <text x="${totalWidth / 2}" y="${by + bh * 0.66}" text-anchor="middle" fill="${solidBgForCutouts}" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="${cellSize * 1.35}" letter-spacing="2">${cleanBannerText}</text>
    `;
  } else if (frameStyle === 'top-banner') {
    const by = cellSize * 0.8;
    const bh = bannerHeight - cellSize * 0.4;
    const bw = matrixBoxSize - cellSize * 2;
    const bx = cellSize;
    elements += `
      <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${cellSize * 0.8}" fill="${fgColor}" />
      <text x="${totalWidth / 2}" y="${by + bh * 0.66}" text-anchor="middle" fill="${solidBgForCutouts}" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="${cellSize * 1.35}" letter-spacing="2">${cleanBannerText}</text>
    `;
  } else if (frameStyle === 'outline-box') {
    const inset = cellSize * 0.6;
    elements += `<rect x="${inset}" y="${inset}" width="${totalWidth - inset * 2}" height="${totalHeight - inset * 2}" rx="${cellSize * 1.2}" fill="none" stroke="${fgColor}" stroke-width="${cellSize * 0.35}" />`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="100%" height="100%" shape-rendering="geometricPrecision">
    ${defs}
    ${!transparentBg ? `<rect width="${totalWidth}" height="${totalHeight}" fill="${effectiveBg}" rx="${cellSize * 0.75}" />` : ''}
    ${elements}
  </svg>`;
}

/**
 * Renders the SVG Vector QR or CODE-128 Barcode into a high-resolution PNG DataURL
 * for instant printing or sending across the bridge to CompressPhoto (< 20KB).
 */
export async function renderSvgToHighResPngDataUrl(
  svgString: string,
  widthPx = 1200,
  heightPx = 1200,
  transparentBg = false
): Promise<string> {
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to rasterize SVG'));
      img.src = url;
    });

    const canvas = document.createElement('canvas');
    canvas.width = widthPx;
    canvas.height = heightPx;
    const ctx = canvas.getContext('2d')!;
    if (!transparentBg) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, widthPx, heightPx);
    } else {
      ctx.clearRect(0, 0, widthPx, heightPx);
    }
    ctx.drawImage(img, 0, 0, widthPx, heightPx);
    return canvas.toDataURL('image/png');
  } finally {
    URL.revokeObjectURL(url);
  }
}
