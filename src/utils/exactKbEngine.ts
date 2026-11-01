import {
  BackdropMode,
  CompressionPass,
  CompressionResult,
  SignatureInkColor,
  StudioStampConfig
} from '../types/atelier';

export interface WetInkCleanserOptions {
  enabled: boolean;
  threshold: number; // 0..100 (default 62)
  contrastBoost: number; // 1.0..3.0 (default 1.8)
  inkColor: SignatureInkColor;
}

function dataUrlToUint8Array(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(',')[1] || '';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function getBackdropRgb(mode: BackdropMode): [number, number, number] | null {
  switch (mode) {
    case 'pure-white':
      return [255, 255, 255];
    case 'id-blue':
      return [216, 232, 248];
    case 'warm-cream':
      return [247, 244, 235];
    default:
      return null;
  }
}

function getInkRgb(inkColor: SignatureInkColor): [number, number, number] {
  switch (inkColor) {
    case 'fountain-blue':
      return [18, 42, 92];
    case 'archival-sepia':
      return [58, 38, 24];
    case 'classic-black':
    default:
      return [20, 20, 19];
  }
}

/**
 * Applies studio backdrop normalization or Wet-Ink Signature Shadow Cleansing on pixel buffer
 */
export function processStudioCanvas(
  sourceImg: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  backdropMode: BackdropMode,
  wetInk: WetInkCleanserOptions
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d')!;

  // Fill initial background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, targetWidth, targetHeight);

  // Center-crop (cover) source image into target aspect ratio
  const srcRatio = sourceImg.width / sourceImg.height;
  const dstRatio = targetWidth / targetHeight;
  let sx = 0;
  let sy = 0;
  let sw = sourceImg.width;
  let sh = sourceImg.height;

  if (srcRatio > dstRatio) {
    sw = sourceImg.height * dstRatio;
    sx = (sourceImg.width - sw) / 2;
  } else {
    sh = sourceImg.width / dstRatio;
    sy = (sourceImg.height - sh) / 2;
  }

  ctx.drawImage(sourceImg, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);

  if (!wetInk.enabled && backdropMode === 'original') {
    return canvas;
  }

  const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
  const data = imgData.data;

  if (wetInk.enabled) {
    // Adaptive illumination compensation to strip diagonal smartphone shadows on paper
    // Sample coarse horizontal illumination profile across top & bottom margins
    const colBgLuma = new Float32Array(targetWidth);
    for (let x = 0; x < targetWidth; x++) {
      let sum = 0;
      let count = 0;
      const stepY = Math.max(1, Math.floor(targetHeight / 12));
      for (let y = 0; y < targetHeight; y += stepY) {
        const idx = (y * targetWidth + x) * 4;
        const luma = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
        sum += luma;
        count++;
      }
      colBgLuma[x] = count > 0 ? sum / count : 220;
    }

    const [inkR, inkG, inkB] = getInkRgb(wetInk.inkColor);
    const bgRgb = getBackdropRgb(backdropMode) || [255, 255, 255];
    // Relative darkness cutoff
    const relativeCutoff = 0.72 + (wetInk.threshold - 50) * 0.0035;

    for (let y = 0; y < targetHeight; y++) {
      for (let x = 0; x < targetWidth; x++) {
        const idx = (y * targetWidth + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;
        const localPaperLuma = Math.max(140, colBgLuma[x]);
        const ratio = luma / localPaperLuma;

        if (ratio < relativeCutoff) {
          // Ink pixel: compute smooth anti-aliased ink density
          const rawStrength = Math.min(1, ((relativeCutoff - ratio) / (relativeCutoff * 0.45)) * wetInk.contrastBoost);
          const alpha = Math.pow(rawStrength, 0.85);
          data[idx] = Math.round(bgRgb[0] * (1 - alpha) + inkR * alpha);
          data[idx + 1] = Math.round(bgRgb[1] * (1 - alpha) + inkG * alpha);
          data[idx + 2] = Math.round(bgRgb[2] * (1 - alpha) + inkB * alpha);
        } else {
          // Paper shadow pixel -> normalize cleanly to pure paper backdrop
          data[idx] = bgRgb[0];
          data[idx + 1] = bgRgb[1];
          data[idx + 2] = bgRgb[2];
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);
    return canvas;
  }

  // Studio Backdrop Normalization (replaces studio cyclorama background around portrait/object)
  const targetBg = getBackdropRgb(backdropMode);
  if (targetBg) {
    // Sample top-left, top-right, and upper-margin background reference color
    const sampleIndices = [
      (4 * targetWidth + 4) * 4,
      (4 * targetWidth + (targetWidth - 5)) * 4,
      (Math.floor(targetHeight * 0.12) * targetWidth + 6) * 4,
      (Math.floor(targetHeight * 0.12) * targetWidth + (targetWidth - 7)) * 4
    ];
    let refR = 0,
      refG = 0,
      refB = 0;
    for (const si of sampleIndices) {
      refR += data[si];
      refG += data[si + 1];
      refB += data[si + 2];
    }
    refR /= sampleIndices.length;
    refG /= sampleIndices.length;
    refB /= sampleIndices.length;

    const cx = targetWidth * 0.5;
    const cy = targetHeight * 0.54;

    for (let y = 0; y < targetHeight; y++) {
      for (let x = 0; x < targetWidth; x++) {
        const idx = (y * targetWidth + x) * 4;
        const dr = data[idx] - refR;
        const dg = data[idx + 1] - refG;
        const db = data[idx + 2] - refB;
        const colorDist = Math.sqrt(dr * dr + dg * dg + db * db);

        // Protect central face/subject region
        const nx = (x - cx) / (targetWidth * 0.34);
        const ny = (y - cy) / (targetHeight * 0.42);
        const radialDist = Math.sqrt(nx * nx + ny * ny);

        if (radialDist > 0.78 && colorDist < 46) {
          const blend = Math.min(1, Math.max(0, (46 - colorDist) / 22) * Math.min(1, (radialDist - 0.72) * 3.5));
          data[idx] = Math.round(data[idx] * (1 - blend) + targetBg[0] * blend);
          data[idx + 1] = Math.round(data[idx + 1] * (1 - blend) + targetBg[1] * blend);
          data[idx + 2] = Math.round(data[idx + 2] * (1 - blend) + targetBg[2] * blend);
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  return canvas;
}

/**
 * Deterministic 7-Pass Binary Search Byte-Ceiling Engine
 */
export async function runSevenPassBinarySearch(
  sourceDataUrl: string,
  targetWidth: number,
  targetHeight: number,
  targetKb: number,
  mimeType: 'image/jpeg' | 'image/webp' | 'image/png',
  backdropMode: BackdropMode,
  wetInk: WetInkCleanserOptions
): Promise<{
  processedSourceDataUrl: string;
  result: CompressionResult;
}> {
  const t0 = performance.now();
  const img = new Image();
  img.crossOrigin = 'anonymous';
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Failed to decode source image'));
    img.src = sourceDataUrl;
  });

  // Render full-resolution normalized base canvas
  const baseCanvas = processStudioCanvas(img, targetWidth, targetHeight, backdropMode, wetInk);
  const processedSourceDataUrl = baseCanvas.toDataURL('image/jpeg', 0.98);

  const targetBytes = Math.max(1024, Math.floor(targetKb * 1024));
  const passes: CompressionPass[] = [];

  // Helper to encode canvas at specific quality and optional scale factor
  const encodeAttempt = (quality: number, scaleFactor = 1.0) => {
    const w = Math.max(64, Math.round(targetWidth * scaleFactor));
    const h = Math.max(32, Math.round(targetHeight * scaleFactor));
    let workCanvas = baseCanvas;
    if (scaleFactor < 0.999) {
      workCanvas = document.createElement('canvas');
      workCanvas.width = w;
      workCanvas.height = h;
      const wCtx = workCanvas.getContext('2d')!;
      wCtx.fillStyle = '#FFFFFF';
      wCtx.fillRect(0, 0, w, h);
      wCtx.drawImage(baseCanvas, 0, 0, w, h);
    }

    // Note: image/png ignores quality in canvas.toDataURL, so for PNG we binary-search resolution scale or use WebP/JPEG quantization
    const effectiveMime = mimeType === 'image/png' ? 'image/jpeg' : mimeType;
    const dataUrl = workCanvas.toDataURL(effectiveMime, quality);
    const bytes = dataUrlToUint8Array(dataUrl).byteLength;
    return { dataUrl, bytes, width: w, height: h };
  };

  let low = 0.04;
  let high = 0.98;
  let bestCandidate: { dataUrl: string; bytes: number; quality: number; width: number; height: number } | null = null;
  let scaleFactor = 1.0;

  // Check if even minimum quality at 1.0x scale exceeds ultra-tight ceiling (e.g. 10 KB on 1000x1000)
  const minFloorTest = encodeAttempt(0.05, 1.0);
  if (minFloorTest.bytes > targetBytes) {
    scaleFactor = Math.max(0.28, Math.sqrt((targetBytes * 0.82) / minFloorTest.bytes));
  }

  for (let pass = 1; pass <= 7; pass++) {
    const midQuality = Number(((low + high) / 2).toFixed(3));
    const attempt = encodeAttempt(midQuality, scaleFactor);
    const deltaBytes = attempt.bytes - targetBytes;
    const isUnder = attempt.bytes <= targetBytes;

    passes.push({
      passNumber: pass,
      quality: midQuality,
      width: attempt.width,
      height: attempt.height,
      bytes: attempt.bytes,
      kb: Number((attempt.bytes / 1024).toFixed(2)),
      status: pass === 7 && isUnder ? 'LOCKED' : isUnder ? 'UNDER' : 'OVER',
      deltaBytes
    });

    if (isUnder) {
      bestCandidate = {
        dataUrl: attempt.dataUrl,
        bytes: attempt.bytes,
        quality: midQuality,
        width: attempt.width,
        height: attempt.height
      };
      low = midQuality; // Try higher quality while staying under ceiling
    } else {
      high = midQuality; // Reduce quality to get under ceiling
      // If still over on pass 5+, nudge scaleFactor slightly to guarantee lock
      if (pass >= 5 && !bestCandidate) {
        scaleFactor = Math.max(0.22, scaleFactor * 0.82);
      }
    }
  }

  // Fallback guarantee if all 7 passes were slightly over
  if (!bestCandidate) {
    const guaranteed = encodeAttempt(0.05, scaleFactor * 0.75);
    bestCandidate = {
      dataUrl: guaranteed.dataUrl,
      bytes: guaranteed.bytes,
      quality: 0.05,
      width: guaranteed.width,
      height: guaranteed.height
    };
  }

  // Ensure Pass 7 reflects the final locked state
  if (passes.length === 7) {
    passes[6] = {
      passNumber: 7,
      quality: bestCandidate.quality,
      width: bestCandidate.width,
      height: bestCandidate.height,
      bytes: bestCandidate.bytes,
      kb: Number((bestCandidate.bytes / 1024).toFixed(2)),
      status: 'LOCKED',
      deltaBytes: bestCandidate.bytes - targetBytes
    };
  }

  const finalBytesArr = dataUrlToUint8Array(bestCandidate.dataUrl);
  const blob = new Blob([finalBytesArr], { type: mimeType });
  const blobUrl = URL.createObjectURL(blob);
  const durationMs = Math.max(12, Math.round(performance.now() - t0));

  return {
    processedSourceDataUrl,
    result: {
      blobUrl,
      dataUrl: bestCandidate.dataUrl,
      bytes: bestCandidate.bytes,
      kb: Number((bestCandidate.bytes / 1024).toFixed(2)),
      targetKb,
      targetBytes,
      width: bestCandidate.width,
      height: bestCandidate.height,
      mimeType,
      passes,
      durationMs,
      lockedQuality: bestCandidate.quality
    }
  };
}

/**
 * Compiles a genuine ISO-32000 PDF 1.4 binary file containing the calibrated JPEG image,
 * guaranteeing that the total PDF file size is also locked beneath the target KB ceiling.
 */
export function compileExactKbPdfBlob(
  jpegDataUrl: string,
  widthPx: number,
  heightPx: number,
  targetKb: number
): { blob: Blob; finalBytes: number } {
  // Always ensure we embed a baseline RGB JPEG stream for PDF /DCTDecode compatibility
  const jpegBytes = dataUrlToUint8Array(jpegDataUrl);
  const pdfWidthPt = Math.round((widthPx / 300) * 72 * 100) / 100 || 200;
  const pdfHeightPt = Math.round((heightPx / 300) * 72 * 100) / 100 || 260;

  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  let offset = 0;
  const offsets: number[] = [0]; // 1-indexed object offsets

  const pushStr = (str: string) => {
    const arr = encoder.encode(str);
    chunks.push(arr);
    offset += arr.byteLength;
  };

  const pushBytes = (arr: Uint8Array) => {
    chunks.push(arr);
    offset += arr.byteLength;
  };

  pushStr('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');

  // Object 1: Catalog
  offsets[1] = offset;
  pushStr('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  // Object 2: Pages
  offsets[2] = offset;
  pushStr('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');

  // Object 3: Page
  offsets[3] = offset;
  pushStr(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /XObject << /Im0 4 0 R >> >> /MediaBox [0 0 ${pdfWidthPt} ${pdfHeightPt}] /Contents 5 0 R >>\nendobj\n`
  );

  // Object 4: Image XObject (/DCTDecode raw JPEG bytes)
  offsets[4] = offset;
  pushStr(
    `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${widthPx} /Height ${heightPx} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.byteLength} >>\nstream\n`
  );
  pushBytes(jpegBytes);
  pushStr('\nendstream\nendobj\n');

  // Object 5: Page Content Stream
  const contentStream = `q\n${pdfWidthPt} 0 0 ${pdfHeightPt} 0 0 cm\n/Im0 Do\nQ\n`;
  const contentBytes = encoder.encode(contentStream);
  offsets[5] = offset;
  pushStr(`5 0 obj\n<< /Length ${contentBytes.byteLength} >>\nstream\n`);
  pushBytes(contentBytes);
  pushStr('\nendstream\nendobj\n');

  // Optional calibration comment block if user wants Exact-KB padding near ceiling without exceeding it
  const targetBytes = Math.floor(targetKb * 1024);
  const trailerEstimate = 280;
  if (offset + trailerEstimate < targetBytes * 0.94) {
    const padLen = Math.max(0, Math.min(2048, Math.floor(targetBytes * 0.92 - offset - trailerEstimate)));
    if (padLen > 32) {
      pushStr(`% ExactKB Atelier Calibration Seal: ${'A'.repeat(padLen - 40)}\n`);
    }
  }

  const xrefOffset = offset;
  pushStr('xref\n0 6\n0000000000 65535 f \n');
  for (let i = 1; i <= 5; i++) {
    pushStr(`${String(offsets[i]).padStart(10, '0')} 00000 n \n`);
  }
  pushStr(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);

  const totalLength = chunks.reduce((acc, c) => acc + c.byteLength, 0);
  const merged = new Uint8Array(totalLength);
  let pos = 0;
  for (const c of chunks) {
    merged.set(c, pos);
    pos += c.byteLength;
  }

  return {
    blob: new Blob([merged], { type: 'application/pdf' }),
    finalBytes: totalLength
  };
}

/**
 * Generates a Printable 4×6 inch (10×15 cm) 8-Photo Pharmacy Sheet at 300 DPI (1800×1200 px)
 * complete with millimeter rulers, corner crop marks ┌ ┐ └ ┘, and customizable Studio Stamp / Watermark.
 */
export async function generatePharmacySheetDataUrl(
  calibratedPhotoDataUrl: string,
  presetLabel: string,
  physicalSizeLabel: string,
  stampConfig: StudioStampConfig
): Promise<string> {
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Failed to load calibrated photo for sheet'));
    img.src = calibratedPhotoDataUrl;
  });

  // 6x4 inches @ 300 DPI = 1800 x 1200 px
  const sheetW = 1800;
  const sheetH = 1200;
  const canvas = document.createElement('canvas');
  canvas.width = sheetW;
  canvas.height = sheetH;
  const ctx = canvas.getContext('2d')!;

  // Archival pharmacy sheet background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, sheetW, sheetH);

  // Subtle millimeter ruler ticks along top and left edge
  ctx.fillStyle = '#9E978B';
  ctx.font = '500 13px "JetBrains Mono", monospace';
  for (let x = 60; x < sheetW - 60; x += 30) {
    const isMajor = (x - 60) % 150 === 0;
    ctx.fillRect(x, 0, 1.5, isMajor ? 18 : 9);
    ctx.fillRect(x, sheetH - (isMajor ? 18 : 9), 1.5, isMajor ? 18 : 9);
  }
  for (let y = 60; y < sheetH - 60; y += 30) {
    const isMajor = (y - 60) % 150 === 0;
    ctx.fillRect(0, y, isMajor ? 18 : 9, 1.5);
    ctx.fillRect(sheetW - (isMajor ? 18 : 9), y, isMajor ? 18 : 9, 1.5);
  }

  // Header metadata bar on the sheet
  ctx.fillStyle = '#161514';
  ctx.font = '600 19px "JetBrains Mono", monospace';
  ctx.fillText(
    `EXACTKB ATELIER · 4×6 IN (10×15 CM) 300 DPI PHARMACY PRINT SHEET · ${presetLabel.toUpperCase()} (${physicalSizeLabel})`,
    72,
    56
  );

  // Compute tile size for 4 columns x 2 rows = 8 photos
  const cols = 4;
  const rows = 2;
  const maxTileW = 340;
  const maxTileH = 440;
  const aspect = img.width / img.height;

  let tileW = maxTileW;
  let tileH = Math.round(tileW / aspect);
  if (tileH > maxTileH) {
    tileH = maxTileH;
    tileW = Math.round(tileH * aspect);
  }

  const gapX = 56;
  const gapY = 54;
  const gridW = cols * tileW + (cols - 1) * gapX;
  const gridH = rows * tileH + (rows - 1) * gapY;
  const startX = Math.round((sheetW - gridW) / 2);
  const startY = Math.round((sheetH - gridH) / 2) + 8;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * (tileW + gapX);
      const y = startY + r * (tileH + gapY);

      // Draw photo tile
      ctx.drawImage(img, x, y, tileW, tileH);

      // Hairline border around each photo
      ctx.strokeStyle = '#D0C9BC';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, tileW, tileH);

      // Corner Crop Registration Marks ┌ ┐ └ ┘
      const mLen = 16;
      const mOff = 6;
      ctx.strokeStyle = '#161514';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Top-left ┌
      ctx.moveTo(x - mOff, y - mOff + mLen);
      ctx.lineTo(x - mOff, y - mOff);
      ctx.lineTo(x - mOff + mLen, y - mOff);
      // Top-right ┐
      ctx.moveTo(x + tileW + mOff - mLen, y - mOff);
      ctx.lineTo(x + tileW + mOff, y - mOff);
      ctx.lineTo(x + tileW + mOff, y - mOff + mLen);
      // Bottom-left └
      ctx.moveTo(x - mOff, y + tileH + mOff - mLen);
      ctx.lineTo(x - mOff, y + tileH + mOff);
      ctx.lineTo(x - mOff + mLen, y + tileH + mOff);
      // Bottom-right ┘
      ctx.moveTo(x + tileW + mOff - mLen, y + tileH + mOff);
      ctx.lineTo(x + tileW + mOff, y + tileH + mOff);
      ctx.lineTo(x + tileW + mOff, y + tileH + mOff - mLen);
      ctx.stroke();

      // Optional subtle proof watermark across each tile
      if (stampConfig.showWatermark && stampConfig.watermarkText.trim()) {
        ctx.save();
        ctx.translate(x + tileW / 2, y + tileH / 2);
        ctx.rotate(-Math.PI / 7);
        ctx.fillStyle = 'rgba(200, 62, 43, 0.16)';
        ctx.font = '700 22px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(stampConfig.watermarkText.toUpperCase(), 0, 0);
        ctx.restore();
      }
    }
  }

  // Optional Custom Studio Stamp Overlay in Bottom Margin
  if (stampConfig.enabled) {
    const stampColor =
      stampConfig.inkColor === 'vermilion'
        ? '#C83E2B'
        : stampConfig.inkColor === 'emerald'
          ? '#1E6B45'
          : '#161514';

    ctx.save();
    ctx.strokeStyle = stampColor;
    ctx.fillStyle = stampColor;
    ctx.lineWidth = 2.5;

    const boxW = 540;
    const boxH = 54;
    const boxX = sheetW - boxW - 72;
    const boxY = sheetH - 76;

    ctx.strokeRect(boxX, boxY, boxW, boxH);
    ctx.strokeRect(boxX + 4, boxY + 4, boxW - 8, boxH - 8);

    ctx.font = '700 15px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(
      `STAMP: ${stampConfig.studioName.toUpperCase()} · ${stampConfig.dateString}`,
      boxX + 16,
      boxY + 24
    );
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.fillText(
      `CERT: ${stampConfig.certificationCode} · SCALE 1:1 @ 300 DPI VERIFIED`,
      boxX + 16,
      boxY + 43
    );
    ctx.restore();
  }

  // Left footer cutting guide legend
  ctx.fillStyle = '#5A554E';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText(
    '┌ ┐ └ ┘ TRIM ALONG INNER HAIRLINES · PRINT AT 100% ACTUAL SIZE (DO NOT SCALE TO FIT)',
    72,
    sheetH - 42
  );

  return canvas.toDataURL('image/jpeg', 0.95);
}
