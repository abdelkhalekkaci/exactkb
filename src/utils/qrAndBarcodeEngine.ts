import QRCode from 'qrcode';
import {
  CenterEmblemPreset,
  FinderPatternStyle,
  MenuPayloadData,
  ModuleDotStyle,
  QRPayloadType,
  VCardPayloadData,
  WhatsappPayloadData,
  WifiPayloadData
} from '../types/atelier';

export interface QRStyleOptions {
  fgColor: string;
  bgColor: string;
  finderStyle: FinderPatternStyle;
  moduleStyle: ModuleDotStyle;
  emblemPreset: CenterEmblemPreset;
  customEmblemDataUrl: string | null;
}

export function buildRawPayloadString(
  type: QRPayloadType,
  data: {
    wifi: WifiPayloadData;
    vcard: VCardPayloadData;
    menu: MenuPayloadData;
    whatsapp: WhatsappPayloadData;
    url: string;
    code128: string;
  }
): string {
  switch (type) {
    case 'wifi': {
      const { ssid, password, encryption, hidden } = data.wifi;
      const esc = (s: string) => s.replace(/([\\;,:])/g, '\\$1');
      return `WIFI:T:${encryption};S:${esc(ssid || 'Atelier_Guest_WiFi')};P:${esc(password)};H:${hidden ? 'true' : 'false'};;`;
    }
    case 'vcard': {
      const v = data.vcard;
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${v.lastName};${v.firstName};;;`,
        `FN:${v.firstName} ${v.lastName}`.trim(),
        v.organization ? `ORG:${v.organization}` : '',
        v.title ? `TITLE:${v.title}` : '',
        v.phone ? `TEL;TYPE=CELL:${v.phone}` : '',
        v.email ? `EMAIL:${v.email}` : '',
        v.website ? `URL:${v.website}` : '',
        v.city ? `ADR;TYPE=WORK:;;${v.city};;;;` : '',
        'END:VCARD'
      ]
        .filter(Boolean)
        .join('\n');
    }
    case 'menu': {
      const m = data.menu;
      const base = m.menuUrl.trim() || 'https://bistro-lumiere.example/carte';
      const sep = base.includes('?') ? '&' : '?';
      return `${base}${sep}table=${encodeURIComponent(m.tableNumber || '12')}`;
    }
    case 'whatsapp': {
      const cleanPhone = data.whatsapp.phone.replace(/[^\d]/g, '') || '33612345678';
      const msg = encodeURIComponent(data.whatsapp.message || 'Bonjour, je souhaite réserver une séance au studio.');
      return `https://wa.me/${cleanPhone}?text=${msg}`;
    }
    case 'code128':
      return (data.code128 || 'ATELIER-2026-KB').slice(0, 32);
    case 'url':
    default:
      return data.url.trim() || 'https://exactkb-atelier.example';
  }
}

function isInFinderPattern(row: number, col: number, size: number): boolean {
  const inTopLeft = row < 7 && col < 7;
  const inTopRight = row < 7 && col >= size - 7;
  const inBottomLeft = row >= size - 7 && col < 7;
  return inTopLeft || inTopRight || inBottomLeft;
}

function isInCenterExcavation(row: number, col: number, size: number, hasEmblem: boolean): boolean {
  if (!hasEmblem) return false;
  const center = size / 2;
  const radius = Math.max(3.2, size * 0.13);
  return Math.abs(row + 0.5 - center) < radius && Math.abs(col + 0.5 - center) < radius;
}

function buildFinderSvgGroup(
  x: number,
  y: number,
  cellSize: number,
  style: FinderPatternStyle,
  fgColor: string,
  bgColor: string
): string {
  const outer = 7 * cellSize;
  const mid = 5 * cellSize;
  const inner = 3 * cellSize;
  const mOff = cellSize;
  const iOff = 2 * cellSize;

  if (style === 'rounded') {
    const rOuter = cellSize * 1.8;
    const rMid = cellSize * 1.2;
    const rInner = cellSize * 0.85;
    return `
      <rect x="${x}" y="${y}" width="${outer}" height="${outer}" rx="${rOuter}" fill="${fgColor}" />
      <rect x="${x + mOff}" y="${y + mOff}" width="${mid}" height="${mid}" rx="${rMid}" fill="${bgColor}" />
      <rect x="${x + iOff}" y="${y + iOff}" width="${inner}" height="${inner}" rx="${rInner}" fill="${fgColor}" />
    `;
  }

  if (style === 'diamond') {
    const cx = x + outer / 2;
    const cy = y + outer / 2;
    return `
      <rect x="${x}" y="${y}" width="${outer}" height="${outer}" rx="${cellSize * 0.4}" fill="${fgColor}" />
      <rect x="${x + mOff}" y="${y + mOff}" width="${mid}" height="${mid}" fill="${bgColor}" />
      <polygon points="${cx},${y + iOff - cellSize * 0.2} ${x + outer - iOff + cellSize * 0.2},${cy} ${cx},${y + outer - iOff + cellSize * 0.2} ${x + iOff - cellSize * 0.2},${cy}" fill="${fgColor}" />
    `;
  }

  // Classic Square
  return `
    <rect x="${x}" y="${y}" width="${outer}" height="${outer}" fill="${fgColor}" />
    <rect x="${x + mOff}" y="${y + mOff}" width="${mid}" height="${mid}" fill="${bgColor}" />
    <rect x="${x + iOff}" y="${y + iOff}" width="${inner}" height="${inner}" fill="${fgColor}" />
  `;
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
      .slice(0, 28) || 'ATELIER-2026';

  // Start Code B = 104
  const codes: number[] = [104];
  let checksum = 104;

  for (let i = 0; i < cleanText.length; i++) {
    const code = cleanText.charCodeAt(i) - 32;
    codes.push(code);
    checksum += code * (i + 1);
  }

  const checkCode = checksum % 103;
  codes.push(checkCode);
  codes.push(106); // Stop Code

  const bits = codes.map((c) => CODE128_PATTERNS[c] || CODE128_PATTERNS[0]).join('');
  return { bits, cleanText };
}

export function generateVectorSvgString(
  payloadType: QRPayloadType,
  rawPayload: string,
  style: QRStyleOptions
): string {
  const { fgColor, bgColor, finderStyle, moduleStyle, emblemPreset } = style;

  if (payloadType === 'code128') {
    const { bits, cleanText } = encodeCode128Bits(rawPayload);
    const quietZone = 24;
    const barW = 3;
    const totalW = bits.length * barW + quietZone * 2;
    const totalH = 180;
    let rects = '';
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] === '1') {
        rects += `<rect x="${quietZone + i * barW}" y="22" width="${barW}" height="114" fill="${fgColor}" />`;
      }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}" width="100%" height="100%">
      <rect width="${totalW}" height="${totalH}" fill="${bgColor}" rx="6" />
      ${rects}
      <text x="${totalW / 2}" y="160" text-anchor="middle" fill="${fgColor}" font-family="JetBrains Mono, monospace" font-weight="600" font-size="16" letter-spacing="3">${cleanText}</text>
    </svg>`;
  }

  // Generate QR Matrix using ISO/IEC 18004 Level H (30% Reed-Solomon error correction)
  const qr = QRCode.create(rawPayload || 'https://exactkb-atelier.example', {
    errorCorrectionLevel: 'H'
  });
  const size = qr.modules.size;
  const data = qr.modules.data;
  const margin = 4;
  const cellSize = 16;
  const viewBoxSize = (size + margin * 2) * cellSize;
  const hasEmblem = emblemPreset !== 'none';

  let elements = '';

  // Draw 3 Finder Patterns
  elements += buildFinderSvgGroup(margin * cellSize, margin * cellSize, cellSize, finderStyle, fgColor, bgColor);
  elements += buildFinderSvgGroup(
    (margin + size - 7) * cellSize,
    margin * cellSize,
    cellSize,
    finderStyle,
    fgColor,
    bgColor
  );
  elements += buildFinderSvgGroup(
    margin * cellSize,
    (margin + size - 7) * cellSize,
    cellSize,
    finderStyle,
    fgColor,
    bgColor
  );

  // Draw Data Modules
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (isInFinderPattern(r, c, size)) continue;
      if (isInCenterExcavation(r, c, size, hasEmblem)) continue;

      const isDark = data[r * size + c] === 1;
      if (!isDark) continue;

      const x = (margin + c) * cellSize;
      const y = (margin + r) * cellSize;

      if (moduleStyle === 'dots') {
        const rad = cellSize * 0.44;
        elements += `<circle cx="${x + cellSize / 2}" cy="${y + cellSize / 2}" r="${rad}" fill="${fgColor}" />`;
      } else if (moduleStyle === 'bars') {
        elements += `<rect x="${x + cellSize * 0.12}" y="${y}" width="${cellSize * 0.76}" height="${cellSize}" rx="${cellSize * 0.25}" fill="${fgColor}" />`;
      } else {
        elements += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${fgColor}" />`;
      }
    }
  }

  // Draw Center Emblem if enabled
  if (hasEmblem) {
    const centerPx = viewBoxSize / 2;
    const boxSize = Math.round(size * 0.23 * cellSize);
    const bx = centerPx - boxSize / 2;
    const by = centerPx - boxSize / 2;

    elements += `<rect x="${bx}" y="${by}" width="${boxSize}" height="${boxSize}" rx="${cellSize * 1.1}" fill="${bgColor}" stroke="${fgColor}" stroke-width="${cellSize * 0.28}" />`;

    if (emblemPreset === 'custom' && style.customEmblemDataUrl) {
      const pad = cellSize * 0.55;
      elements += `<image href="${style.customEmblemDataUrl}" x="${bx + pad}" y="${by + pad}" width="${boxSize - pad * 2}" height="${boxSize - pad * 2}" preserveAspectRatio="xMidYMid contain" />`;
    } else {
      const label =
        emblemPreset === 'wifi-badge'
          ? 'Wi-Fi'
          : emblemPreset === 'bistro-cup'
            ? 'MENU'
            : emblemPreset === 'vcard-monogram'
              ? 'vCARD'
              : 'ATELIER';
      elements += `<text x="${centerPx}" y="${centerPx + cellSize * 0.36}" text-anchor="middle" fill="${fgColor}" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="${cellSize * 1.05}">${label}</text>`;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" width="100%" height="100%" shape-rendering="geometricPrecision">
    <rect width="${viewBoxSize}" height="${viewBoxSize}" fill="${bgColor}" />
    ${elements}
  </svg>`;
}

/**
 * Renders the SVG Vector QR or CODE-128 Barcode into a high-resolution 1200px PNG DataURL
 * for instant printing or sending across the bridge to ExactKB (< 20KB).
 */
export async function renderSvgToHighResPngDataUrl(
  svgString: string,
  widthPx = 1200,
  heightPx = 1200
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
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, widthPx, heightPx);
    ctx.drawImage(img, 0, 0, widthPx, heightPx);
    return canvas.toDataURL('image/png');
  } finally {
    URL.revokeObjectURL(url);
  }
}
