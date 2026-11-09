import {
  encodeBmpFromImageData,
  encodeIcoFromCanvas,
  encodeStaticGifFromImageData,
  extractLargestPngFromIco,
} from './binaryImageEncoders';
import {
  composeCanvasesToPdf,
  PdfComposeOptions,
  PdfOrientation,
  PdfPageSize,
  renderPdfFileToCanvases,
} from './pdfComposer';

export type SupportedInputFormat =
  | 'jpg'
  | 'png'
  | 'webp'
  | 'gif'
  | 'bmp'
  | 'avif'
  | 'heic'
  | 'tiff'
  | 'svg'
  | 'ico'
  | 'pdf';

export type SupportedOutputFormat =
  | 'jpg'
  | 'png'
  | 'webp'
  | 'avif'
  | 'bmp'
  | 'gif'
  | 'tiff'
  | 'ico'
  | 'pdf';

export type ResizeMode =
  | 'keep'
  | 'max-width'
  | 'max-height'
  | 'percentage'
  | 'passport-35x45'
  | 'us-2x2';

export interface ConverterSettings {
  outputFormat: SupportedOutputFormat;
  quality: number; // 10..100
  targetKb: number | null; // optional exact KB ceiling
  resizeMode: ResizeMode;
  maxWidth: number | null;
  maxHeight: number | null;
  scalePercent: number; // e.g. 50, 75, 100
  backgroundColor: string; // e.g. '#FFFFFF'
  stripMetadata: boolean; // default true
  // ICO specific
  icoSizes: number[]; // default [16, 32, 48, 64, 128, 256]
  // PDF Input specific
  pdfInputDpi: 72 | 150 | 300;
  pdfPageRange: string; // e.g. 'all' or '1-3, 5'
  // PDF Output specific
  pdfCombineMode: 'merged' | 'separate';
  pdfPageSize: PdfPageSize;
  pdfOrientation: PdfOrientation;
  pdfMarginMm: 0 | 10 | 20;
}

export interface DecodedSourceFrame {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  sourceFormat: SupportedInputFormat;
  pageLabel?: string;
  wasCappedForSafety?: boolean;
}

export interface ConvertedItemOutput {
  id: string;
  sourceFileName: string;
  outputFileName: string;
  sourceFormat: string;
  outputFormat: SupportedOutputFormat;
  originalBytes: number;
  outputBytes: number;
  width: number;
  height: number;
  blob: Blob;
  objectUrl: string;
  previewUrl: string;
  targetReached: boolean;
  qualityUsed?: number;
  scaleUsed?: number;
  warningMessage?: string;
}

const MAX_SAFE_CANVAS_PIXELS = 16_777_216; // 4096 x 4096 limit for iOS Safari

let cachedAvifSupport: boolean | null = null;

/**
 * Feature-detects whether the visitor's browser natively encodes image/avif via HTMLCanvasElement.toBlob.
 */
export async function detectAvifEncodingSupport(): Promise<boolean> {
  if (cachedAvifSupport !== null) return cachedAvifSupport;
  if (typeof document === 'undefined') return false;
  try {
    const c = document.createElement('canvas');
    c.width = 2;
    c.height = 2;
    const ctx = c.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#14213d';
      ctx.fillRect(0, 0, 2, 2);
    }
    const supported = await new Promise<boolean>((resolve) => {
      c.toBlob(
        (b) => resolve(Boolean(b && b.type === 'image/avif')),
        'image/avif',
        0.8
      );
    });
    cachedAvifSupport = supported;
    return supported;
  } catch {
    cachedAvifSupport = false;
    return false;
  }
}

/**
 * Inspects both MIME type and filename extension to classify the input file or return
 * a friendly plain-language unsupported reason with the closest alternative.
 */
export function classifyInputFile(file: File): {
  supported: boolean;
  format?: SupportedInputFormat;
  unsupportedReason?: string;
} {
  const mime = (file.type || '').toLowerCase().trim();
  const ext = (file.name.split('.').pop() || '').toLowerCase().trim();

  // Check explicitly unsupported camera RAW / PSD formats first
  if (['cr2', 'cr3', 'nef', 'arw', 'dng', 'orf', 'rw2', 'pef', 'raf'].includes(ext)) {
    return {
      supported: false,
      unsupportedReason: `"${file.name}" is a camera RAW file (.${ext.toUpperCase()}). Please export it to TIFF, PNG, or JPG in your camera or photo app first, then drop it here.`,
    };
  }
  if (ext === 'psd' || mime.includes('photoshop')) {
    return {
      supported: false,
      unsupportedReason: `"${file.name}" is an Adobe Photoshop (.PSD) layered file. Please export it as PNG, TIFF, or JPG first.`,
    };
  }

  if (mime === 'application/pdf' || ext === 'pdf') {
    return { supported: true, format: 'pdf' };
  }
  if (
    mime === 'image/heic' ||
    mime === 'image/heif' ||
    mime === 'image/heic-sequence' ||
    mime === 'image/heif-sequence' ||
    ext === 'heic' ||
    ext === 'heif'
  ) {
    return { supported: true, format: 'heic' };
  }
  if (mime === 'image/tiff' || mime === 'image/x-tiff' || ext === 'tif' || ext === 'tiff') {
    return { supported: true, format: 'tiff' };
  }
  if (mime === 'image/svg+xml' || ext === 'svg') {
    return { supported: true, format: 'svg' };
  }
  if (
    mime === 'image/x-icon' ||
    mime === 'image/vnd.microsoft.icon' ||
    mime === 'image/ico' ||
    ext === 'ico'
  ) {
    return { supported: true, format: 'ico' };
  }
  if (mime === 'image/avif' || ext === 'avif') {
    return { supported: true, format: 'avif' };
  }
  if (mime === 'image/webp' || ext === 'webp') {
    return { supported: true, format: 'webp' };
  }
  if (mime === 'image/png' || ext === 'png') {
    return { supported: true, format: 'png' };
  }
  if (mime === 'image/gif' || ext === 'gif') {
    return { supported: true, format: 'gif' };
  }
  if (mime === 'image/bmp' || mime === 'image/x-ms-bmp' || ext === 'bmp') {
    return { supported: true, format: 'bmp' };
  }
  if (mime === 'image/jpeg' || mime === 'image/jpg' || ['jpg', 'jpeg', 'jpe', 'jfif'].includes(ext)) {
    return { supported: true, format: 'jpg' };
  }

  // Generic image/* fallback
  if (mime.startsWith('image/')) {
    return { supported: true, format: 'png' };
  }

  return {
    supported: false,
    unsupportedReason: `"${file.name}" (.${ext || 'unknown'}) is not a supported image or PDF format. Supported inputs: JPG, PNG, WebP, HEIC, AVIF, PDF, SVG, TIFF, GIF, BMP, and ICO.`,
  };
}

/**
 * Decodes an input file into one or more HTMLCanvasElements (multiple only when input is a multi-page PDF).
 * Uses native createImageBitmap first and lazily imports heic-to, utif, or pdfjs-dist only when required.
 */
export async function decodeFileToCanvases(
  file: File,
  settings: ConverterSettings
): Promise<DecodedSourceFrame[]> {
  const classification = classifyInputFile(file);
  if (!classification.supported || !classification.format) {
    throw new Error(classification.unsupportedReason || 'Unsupported file format.');
  }

  const fmt = classification.format;

  // 1. PDF input -> render each selected page via lazy-loaded pdfjs-dist
  if (fmt === 'pdf') {
    const pages = await renderPdfFileToCanvases(
      file,
      settings.pdfInputDpi,
      settings.pdfPageRange
    );
    return pages.map((p) => ({
      canvas: p.canvas,
      width: p.canvas.width,
      height: p.canvas.height,
      sourceFormat: 'pdf',
      pageLabel: p.totalPages > 1 ? `p${p.pageNumber}` : undefined,
    }));
  }

  // 2. SVG input -> rasterize at user-chosen dimensions or crisp default
  if (fmt === 'svg') {
    const canvas = await rasterizeSvgFile(file, settings);
    return [
      {
        canvas,
        width: canvas.width,
        height: canvas.height,
        sourceFormat: 'svg',
      },
    ];
  }

  // 3. ICO input -> extract largest embedded PNG if available, otherwise native decode
  if (fmt === 'ico') {
    try {
      const buffer = await file.arrayBuffer();
      const extractedPng = await extractLargestPngFromIco(buffer);
      if (extractedPng) {
        const { canvas, wasCapped } = await decodeBlobViaNativeBrowser(extractedPng);
        return [
          {
            canvas,
            width: canvas.width,
            height: canvas.height,
            sourceFormat: 'ico',
            wasCappedForSafety: wasCapped,
          },
        ];
      }
    } catch {
      // Fall through to native decode
    }
  }

  // 4. TIFF input -> try native first (Safari supports TIFF), then lazy-load UTIF
  if (fmt === 'tiff') {
    try {
      const { canvas, wasCapped } = await decodeBlobViaNativeBrowser(file);
      return [
        {
          canvas,
          width: canvas.width,
          height: canvas.height,
          sourceFormat: 'tiff',
          wasCappedForSafety: wasCapped,
        },
      ];
    } catch {
      const { canvas, wasCapped } = await decodeTiffViaUtif(file);
      return [
        {
          canvas,
          width: canvas.width,
          height: canvas.height,
          sourceFormat: 'tiff',
          wasCappedForSafety: wasCapped,
        },
      ];
    }
  }

  // 5. HEIC/HEIF input -> try native createImageBitmap first, then lazy-load heic-to
  if (fmt === 'heic') {
    try {
      const { canvas, wasCapped } = await decodeBlobViaNativeBrowser(file);
      return [
        {
          canvas,
          width: canvas.width,
          height: canvas.height,
          sourceFormat: 'heic',
          wasCappedForSafety: wasCapped,
        },
      ];
    } catch {
      const { canvas, wasCapped } = await decodeHeicViaLazyLibrary(file);
      return [
        {
          canvas,
          width: canvas.width,
          height: canvas.height,
          sourceFormat: 'heic',
          wasCappedForSafety: wasCapped,
        },
      ];
    }
  }

  // 6. Standard raster formats (JPG, PNG, WebP, GIF, BMP, AVIF, ICO fallback)
  const { canvas, wasCapped } = await decodeBlobViaNativeBrowser(file);
  return [
    {
      canvas,
      width: canvas.width,
      height: canvas.height,
      sourceFormat: fmt,
      wasCappedForSafety: wasCapped,
    },
  ];
}

async function decodeBlobViaNativeBrowser(
  blob: Blob
): Promise<{ canvas: HTMLCanvasElement; wasCapped: boolean }> {
  if ('createImageBitmap' in window) {
    try {
      const bmp = await createImageBitmap(blob, { imageOrientation: 'from-image' });
      try {
        return drawDrawableToSafeCanvas(bmp, bmp.width, bmp.height);
      } finally {
        bmp.close();
      }
    } catch {
      // Fall back to HTMLImageElement below
    }
  }

  const url = URL.createObjectURL(blob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Browser could not decode this image file.'));
      el.src = url;
    });
    const w = img.naturalWidth || img.width || 512;
    const h = img.naturalHeight || img.height || 512;
    return drawDrawableToSafeCanvas(img, w, h);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function drawDrawableToSafeCanvas(
  source: CanvasImageSource,
  rawW: number,
  rawH: number
): { canvas: HTMLCanvasElement; wasCapped: boolean } {
  let targetW = Math.max(1, Math.round(rawW));
  let targetH = Math.max(1, Math.round(rawH));
  let wasCapped = false;

  if (targetW * targetH > MAX_SAFE_CANVAS_PIXELS) {
    const ratio = Math.sqrt(MAX_SAFE_CANVAS_PIXELS / (targetW * targetH));
    targetW = Math.max(1, Math.floor(targetW * ratio));
    targetH = Math.max(1, Math.floor(targetH * ratio));
    wasCapped = true;
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not initialize 2D canvas context.');
  }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, 0, 0, targetW, targetH);
  return { canvas, wasCapped };
}

async function decodeHeicViaLazyLibrary(
  file: File
): Promise<{ canvas: HTMLCanvasElement; wasCapped: boolean }> {
  const heicModule = await import('heic-to');
  const heicTo = heicModule.heicTo || (heicModule as unknown as { default: { heicTo: typeof heicModule.heicTo } }).default?.heicTo;
  if (typeof heicTo !== 'function') {
    throw new Error('HEIC decoder module failed to initialize.');
  }
  const pngBlob = await heicTo({
    blob: file,
    type: 'image/png',
    quality: 1,
  });
  return decodeBlobViaNativeBrowser(pngBlob);
}

async function decodeTiffViaUtif(
  file: File
): Promise<{ canvas: HTMLCanvasElement; wasCapped: boolean }> {
  const utifModule = await import('utif');
  const UTIF = (utifModule.default || utifModule) as typeof import('utif');
  const buffer = await file.arrayBuffer();
  const ifds = UTIF.decode(buffer);
  if (!ifds || ifds.length === 0) {
    throw new Error('No readable image frame found in TIFF file.');
  }
  UTIF.decodeImage(buffer, ifds[0]);
  const rgba = UTIF.toRGBA8(ifds[0]);
  const rawW = ifds[0].width;
  const rawH = ifds[0].height;

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = rawW;
  tempCanvas.height = rawH;
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) throw new Error('Could not create canvas context for TIFF decoding.');

  const imgData = tempCtx.createImageData(rawW, rawH);
  imgData.data.set(rgba);
  tempCtx.putImageData(imgData, 0, 0);

  return drawDrawableToSafeCanvas(tempCanvas, rawW, rawH);
}

async function rasterizeSvgFile(
  file: File,
  settings: ConverterSettings
): Promise<HTMLCanvasElement> {
  const svgText = await file.text();
  const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Could not parse SVG vector document.'));
      el.src = url;
    });

    let baseW = img.naturalWidth || img.width || 1024;
    let baseH = img.naturalHeight || img.height || 1024;
    if (baseW < 64 && baseH < 64) {
      const scaleUp = 1024 / Math.max(baseW, baseH, 1);
      baseW = Math.round(baseW * scaleUp);
      baseH = Math.round(baseH * scaleUp);
    }

    const { width, height } = computeTargetDimensions(baseW, baseH, settings);
    const { canvas } = drawDrawableToSafeCanvas(img, width, height);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Computes output pixel dimensions respecting the user's selected ResizeMode and aspect ratio.
 */
export function computeTargetDimensions(
  srcW: number,
  srcH: number,
  settings: ConverterSettings
): { width: number; height: number } {
  let w = srcW;
  let h = srcH;

  if (settings.resizeMode === 'passport-35x45') {
    return { width: 413, height: 531 };
  }
  if (settings.resizeMode === 'us-2x2') {
    return { width: 600, height: 600 };
  }
  if (settings.resizeMode === 'percentage') {
    const pct = Math.max(5, Math.min(200, settings.scalePercent || 100)) / 100;
    return {
      width: Math.max(1, Math.round(w * pct)),
      height: Math.max(1, Math.round(h * pct)),
    };
  }
  if (settings.resizeMode === 'max-width' && settings.maxWidth && settings.maxWidth > 0) {
    if (w > settings.maxWidth) {
      const scale = settings.maxWidth / w;
      w = Math.round(w * scale);
      h = Math.round(h * scale);
    }
  } else if (settings.resizeMode === 'max-height' && settings.maxHeight && settings.maxHeight > 0) {
    if (h > settings.maxHeight) {
      const scale = settings.maxHeight / h;
      w = Math.round(w * scale);
      h = Math.round(h * scale);
    }
  }

  // Also allow both maxWidth and maxHeight when keep/max-width/max-height has both filled
  if (settings.maxWidth && settings.maxWidth > 0 && w > settings.maxWidth) {
    const s = settings.maxWidth / w;
    w = Math.round(w * s);
    h = Math.round(h * s);
  }
  if (settings.maxHeight && settings.maxHeight > 0 && h > settings.maxHeight) {
    const s = settings.maxHeight / h;
    w = Math.round(w * s);
    h = Math.round(h * s);
  }

  return {
    width: Math.max(1, w),
    height: Math.max(1, h),
  };
}

/**
 * Renders a source canvas onto a target canvas of (destW x destH), optionally filling the background
 * color when the output format does not support transparency (JPG, BMP, PDF).
 */
export function renderPreparedCanvas(
  sourceCanvas: HTMLCanvasElement,
  destW: number,
  destH: number,
  outputFormat: SupportedOutputFormat,
  backgroundColor: string
): HTMLCanvasElement {
  const outCanvas = document.createElement('canvas');
  outCanvas.width = Math.max(1, Math.round(destW));
  outCanvas.height = Math.max(1, Math.round(destH));
  const ctx = outCanvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not initialize 2D canvas context for output rendering.');
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const needsOpaqueBackground =
    outputFormat === 'jpg' || outputFormat === 'bmp' || outputFormat === 'pdf';

  if (needsOpaqueBackground) {
    ctx.fillStyle = backgroundColor || '#FFFFFF';
    ctx.fillRect(0, 0, outCanvas.width, outCanvas.height);
  } else {
    ctx.clearRect(0, 0, outCanvas.width, outCanvas.height);
  }

  // If using fixed aspect preset (passport 35x45 or US 2x2), center-cover crop nicely
  const srcRatio = sourceCanvas.width / sourceCanvas.height;
  const dstRatio = outCanvas.width / outCanvas.height;
  if (Math.abs(srcRatio - dstRatio) > 0.02) {
    let sx = 0;
    let sy = 0;
    let sw = sourceCanvas.width;
    let sh = sourceCanvas.height;
    if (srcRatio > dstRatio) {
      sw = Math.round(sourceCanvas.height * dstRatio);
      sx = Math.floor((sourceCanvas.width - sw) / 2);
    } else {
      sh = Math.round(sourceCanvas.width / dstRatio);
      sy = Math.floor((sourceCanvas.height - sh) / 2);
    }
    ctx.drawImage(sourceCanvas, sx, sy, sw, sh, 0, 0, outCanvas.width, outCanvas.height);
  } else {
    ctx.drawImage(sourceCanvas, 0, 0, outCanvas.width, outCanvas.height);
  }

  return outCanvas;
}

/**
 * Encodes a single prepared canvas into the requested output format at a specific quality (0.05..1.0).
 */
async function encodeSingleCanvasAtQuality(
  canvas: HTMLCanvasElement,
  format: SupportedOutputFormat,
  qualityNormalized: number,
  settings: ConverterSettings
): Promise<Blob> {
  if (format === 'jpg' || format === 'png' || format === 'webp' || format === 'avif') {
    const mimeMap: Record<'jpg' | 'png' | 'webp' | 'avif', string> = {
      jpg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      avif: 'image/avif',
    };
    const mime = mimeMap[format];
    const q = format === 'png' ? undefined : Math.max(0.05, Math.min(1, qualityNormalized));

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error(`Browser could not encode ${format.toUpperCase()}.`))),
        mime,
        q
      );
    });

    if (format === 'avif' && blob.type !== 'image/avif') {
      throw new Error(
        'Your current browser does not support native AVIF encoding. Please choose WebP or JPG instead.'
      );
    }
    return blob;
  }

  if (format === 'bmp') {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context unavailable for BMP encoding.');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return encodeBmpFromImageData(imgData);
  }

  if (format === 'gif') {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context unavailable for GIF encoding.');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return encodeStaticGifFromImageData(imgData);
  }

  if (format === 'ico') {
    return encodeIcoFromCanvas(canvas, settings.icoSizes);
  }

  if (format === 'tiff') {
    const utifModule = await import('utif');
    const UTIF = (utifModule.default || utifModule) as typeof import('utif');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context unavailable for TIFF encoding.');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const tiffBuffer = UTIF.encodeImage(
      new Uint8Array(imgData.data.buffer),
      canvas.width,
      canvas.height
    );
    return new Blob([tiffBuffer], { type: 'image/tiff' });
  }

  if (format === 'pdf') {
    const pdfOptions: PdfComposeOptions = {
      pageSize: settings.pdfPageSize,
      orientation: settings.pdfOrientation,
      marginMm: settings.pdfMarginMm,
      backgroundColor: settings.backgroundColor,
      quality: qualityNormalized,
      targetKb: settings.targetKb || undefined,
    };
    const res = await composeCanvasesToPdf([canvas], pdfOptions);
    return res.blob;
  }

  throw new Error(`Unsupported output format: ${format}`);
}

/**
 * Encodes a decoded frame into the user's chosen output format, executing the 7-pass binary search
 * on quality + progressive dimension scaling (0.9x down to 0.5x) whenever a target KB size is set.
 */
export async function encodeFrameWithSettings(
  frame: DecodedSourceFrame,
  baseFileName: string,
  originalBytes: number,
  settings: ConverterSettings
): Promise<ConvertedItemOutput> {
  const { width: initialW, height: initialH } = computeTargetDimensions(
    frame.width,
    frame.height,
    settings
  );

  const fmt = settings.outputFormat;
  const qualityNormalized = Math.max(0.1, Math.min(1, settings.quality / 100));
  const targetBytes =
    settings.targetKb && settings.targetKb > 0 ? Math.floor(settings.targetKb * 1024) : 0;

  const isLossyQualityFormat = fmt === 'jpg' || fmt === 'webp' || fmt === 'avif';
  let finalBlob: Blob | null = null;
  let finalW = initialW;
  let finalH = initialH;
  let targetReached = true;
  let qualityUsed = qualityNormalized;
  let scaleUsed = 1;
  let warningMessage = frame.wasCappedForSafety
    ? 'Dimensions were capped at 16 MP for mobile browser memory safety.'
    : undefined;

  if (fmt === 'pdf') {
    const preparedCanvas = renderPreparedCanvas(
      frame.canvas,
      initialW,
      initialH,
      'pdf',
      settings.backgroundColor
    );
    const pdfRes = await composeCanvasesToPdf([preparedCanvas], {
      pageSize: settings.pdfPageSize,
      orientation: settings.pdfOrientation,
      marginMm: settings.pdfMarginMm,
      backgroundColor: settings.backgroundColor,
      quality: qualityNormalized,
      targetKb: settings.targetKb || undefined,
    });
    finalBlob = pdfRes.blob;
    targetReached = pdfRes.targetReached;
    qualityUsed = pdfRes.qualityUsed;
    scaleUsed = pdfRes.scaleUsed;
    finalW = Math.max(1, Math.round(initialW * scaleUsed));
    finalH = Math.max(1, Math.round(initialH * scaleUsed));
  } else if (!targetBytes) {
    const preparedCanvas = renderPreparedCanvas(
      frame.canvas,
      initialW,
      initialH,
      fmt,
      settings.backgroundColor
    );
    finalBlob = await encodeSingleCanvasAtQuality(
      preparedCanvas,
      fmt,
      qualityNormalized,
      settings
    );
  } else {
    // Target KB specified: run 7-pass binary search on quality (for lossy formats) + dimension scales
    const scales = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4];
    let smallestBlob: Blob | null = null;
    let smallestW = initialW;
    let smallestH = initialH;
    let smallestQ = 0.08;
    let smallestScale = 0.4;
    let matched = false;

    for (const scale of scales) {
      const scaledW = Math.max(16, Math.round(initialW * scale));
      const scaledH = Math.max(16, Math.round(initialH * scale));
      const preparedCanvas = renderPreparedCanvas(
        frame.canvas,
        scaledW,
        scaledH,
        fmt,
        settings.backgroundColor
      );

      if (isLossyQualityFormat) {
        let low = 0.05;
        let high = 0.95;
        let bestInScale: Blob | null = null;
        let bestQ = low;

        for (let pass = 0; pass < 7; pass++) {
          const mid = (low + high) / 2;
          const candidate = await encodeSingleCanvasAtQuality(
            preparedCanvas,
            fmt,
            mid,
            settings
          );
          if (!smallestBlob || candidate.size < smallestBlob.size) {
            smallestBlob = candidate;
            smallestW = scaledW;
            smallestH = scaledH;
            smallestQ = mid;
            smallestScale = scale;
          }
          if (candidate.size <= targetBytes) {
            bestInScale = candidate;
            bestQ = mid;
            low = mid;
          } else {
            high = mid;
          }
        }

        if (bestInScale) {
          finalBlob = bestInScale;
          finalW = scaledW;
          finalH = scaledH;
          qualityUsed = bestQ;
          scaleUsed = scale;
          matched = true;
          break;
        }
      } else {
        // Lossless/indexed format (PNG, BMP, GIF, TIFF, ICO): scale down until under targetBytes
        const candidate = await encodeSingleCanvasAtQuality(
          preparedCanvas,
          fmt,
          1,
          settings
        );
        if (!smallestBlob || candidate.size < smallestBlob.size) {
          smallestBlob = candidate;
          smallestW = scaledW;
          smallestH = scaledH;
          smallestScale = scale;
        }
        if (candidate.size <= targetBytes) {
          finalBlob = candidate;
          finalW = scaledW;
          finalH = scaledH;
          scaleUsed = scale;
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      finalBlob = smallestBlob!;
      finalW = smallestW;
      finalH = smallestH;
      qualityUsed = smallestQ;
      scaleUsed = smallestScale;
      targetReached = false;
      warningMessage = `Smallest possible ${fmt.toUpperCase()} is ${formatByteSize(
        finalBlob.size
      )} (target was ${settings.targetKb} KB). Try switching to JPG or WebP for tighter compression.`;
    }
  }

  if (!finalBlob) {
    throw new Error('Encoding produced an empty output.');
  }

  const cleanStem = baseFileName.replace(/\.[^.]+$/, '');
  const pageSuffix = frame.pageLabel ? `-${frame.pageLabel}` : '';
  const outputFileName = `${cleanStem}${pageSuffix}.${fmt}`;
  const objectUrl = URL.createObjectURL(finalBlob);

  // Create a browser-renderable thumbnail preview URL for TIFF/PDF outputs
  let previewUrl = objectUrl;
  if (fmt === 'pdf' || fmt === 'tiff') {
    const thumbCanvas = renderPreparedCanvas(frame.canvas, 160, 160, 'jpg', '#FFFFFF');
    const thumbBlob = await new Promise<Blob | null>((r) =>
      thumbCanvas.toBlob((b) => r(b), 'image/jpeg', 0.8)
    );
    if (thumbBlob) {
      previewUrl = URL.createObjectURL(thumbBlob);
    }
  }

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    sourceFileName: frame.pageLabel ? `${baseFileName} (${frame.pageLabel})` : baseFileName,
    outputFileName,
    sourceFormat: frame.sourceFormat.toUpperCase(),
    outputFormat: fmt,
    originalBytes,
    outputBytes: finalBlob.size,
    width: finalW,
    height: finalH,
    blob: finalBlob,
    objectUrl,
    previewUrl,
    targetReached,
    qualityUsed,
    scaleUsed,
    warningMessage,
  };
}

/**
 * Lazily imports fflate (MIT) to package multiple converted outputs into a single .zip Blob.
 */
export async function buildBatchZipArchive(items: ConvertedItemOutput[]): Promise<Blob> {
  const { zipSync } = await import('fflate');
  const fileMap: Record<string, Uint8Array> = {};
  const usedNames = new Set<string>();

  for (const item of items) {
    let candidateName = item.outputFileName;
    let counter = 2;
    while (usedNames.has(candidateName)) {
      const dotIdx = item.outputFileName.lastIndexOf('.');
      const stem = dotIdx !== -1 ? item.outputFileName.slice(0, dotIdx) : item.outputFileName;
      const ext = dotIdx !== -1 ? item.outputFileName.slice(dotIdx) : '';
      candidateName = `${stem}-${counter}${ext}`;
      counter++;
    }
    usedNames.add(candidateName);
    const buf = await item.blob.arrayBuffer();
    fileMap[candidateName] = new Uint8Array(buf);
  }

  const zipped = zipSync(fileMap, { level: 6 });
  return new Blob([zipped], { type: 'application/zip' });
}

export function formatByteSize(bytes: number): string {
  if (bytes >= 1048576) {
    return `${(bytes / 1048576).toFixed(2)} MB`;
  }
  return `${(bytes / 1024).toFixed(bytes < 10240 ? 1 : 0)} KB`;
}
