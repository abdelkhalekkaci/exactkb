/**
 * 100% Client-Side PDF-to-Images (via lazy-loaded pdfjs-dist)
 * and Multi-Page Images-to-PDF Composer (with A4/Letter/Fit sizing, margins, orientation,
 * and 7-pass target-KB binary search).
 */

export type PdfPageSize = 'fit' | 'a4' | 'letter';
export type PdfOrientation = 'auto' | 'portrait' | 'landscape';

export interface PdfComposeOptions {
  pageSize: PdfPageSize;
  orientation: PdfOrientation;
  marginMm: number; // e.g. 0, 10, 20
  backgroundColor: string; // e.g. '#FFFFFF'
  quality: number; // 0.1 to 1.0
  targetKb?: number; // optional exact KB cap
}

export interface RenderedPdfPage {
  blob: Blob;
  pageNumber: number;
  totalPages: number;
  width: number;
  height: number;
}

let pdfWorkerInitialized = false;

/**
 * Parses a human-friendly page range string (e.g. "all", "", "1-3, 5") into 1-based page numbers.
 */
export function parsePdfPageRange(rangeInput: string, totalPages: number): number[] {
  const cleaned = rangeInput.trim().toLowerCase();
  if (!cleaned || cleaned === 'all' || cleaned === '*') {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  const parts = cleaned.split(',');
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    if (trimmed.includes('-')) {
      const [startStr, endStr] = trimmed.split('-');
      const start = Math.max(1, parseInt(startStr, 10) || 1);
      const end = Math.min(totalPages, parseInt(endStr, 10) || totalPages);
      for (let p = Math.min(start, end); p <= Math.max(start, end); p++) {
        if (p >= 1 && p <= totalPages) pages.add(p);
      }
    } else {
      const single = parseInt(trimmed, 10);
      if (!Number.isNaN(single) && single >= 1 && single <= totalPages) {
        pages.add(single);
      }
    }
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  return sorted.length > 0 ? sorted : [1];
}

/**
 * Lazily loads Mozilla PDF.js only when a user drops a .pdf file, rendering each selected page
 * at the chosen DPI (72, 150, or 300).
 */
export async function renderPdfFileToCanvases(
  file: File,
  dpi: 72 | 150 | 300 = 150,
  pageRangeStr = ''
): Promise<Array<{ canvas: HTMLCanvasElement; pageNumber: number; totalPages: number }>> {
  const pdfjs = await import('pdfjs-dist');
  if (!pdfWorkerInitialized) {
    const workerModule = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
    pdfjs.GlobalWorkerOptions.workerSrc = workerModule.default;
    pdfWorkerInitialized = true;
  }

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) });
  const pdfDoc = await loadingTask.promise;
  const totalPages = pdfDoc.numPages;
  const targetPages = parsePdfPageRange(pageRangeStr, totalPages);

  const scale = dpi / 72;
  const MAX_CANVAS_PIXELS = 16_777_216; // 4096 x 4096 iOS Safari safe limit
  const results: Array<{ canvas: HTMLCanvasElement; pageNumber: number; totalPages: number }> = [];

  for (const pageNum of targetPages) {
    const page = await pdfDoc.getPage(pageNum);
    const baseViewport = page.getViewport({ scale: 1 });
    let effectiveScale = scale;
    const projectedPixels = baseViewport.width * effectiveScale * (baseViewport.height * effectiveScale);
    if (projectedPixels > MAX_CANVAS_PIXELS) {
      effectiveScale = Math.sqrt(MAX_CANVAS_PIXELS / (baseViewport.width * baseViewport.height));
    }

    const viewport = page.getViewport({ scale: effectiveScale });
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not initialize canvas for PDF page rendering.');
    }
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: ctx,
      canvas,
      viewport,
    }).promise;

    results.push({
      canvas,
      pageNumber: pageNum,
      totalPages,
    });
  }

  return results;
}

/**
 * Builds a valid multi-page ISO-32000-1 PDF 1.4 binary document from one or more HTMLCanvasElements.
 * Supports A4, Letter, or Fit-to-Image sizing, Portrait/Landscape/Auto orientation, millimeter margins,
 * and a 7-pass binary search on JPEG quality + dimension scale to hit a target file size in KB.
 */
export async function composeCanvasesToPdf(
  canvases: HTMLCanvasElement[],
  options: PdfComposeOptions
): Promise<{
  blob: Blob;
  targetReached: boolean;
  qualityUsed: number;
  scaleUsed: number;
}> {
  if (canvases.length === 0) {
    throw new Error('No images provided for PDF generation.');
  }

  const targetBytes =
    options.targetKb && options.targetKb > 0 ? Math.floor(options.targetKb * 1024) : 0;

  if (!targetBytes) {
    const blob = await buildPdfForQualityAndScale(canvases, options, options.quality, 1);
    return {
      blob,
      targetReached: true,
      qualityUsed: options.quality,
      scaleUsed: 1,
    };
  }

  // Binary search across quality (7 passes) and progressive dimension scales if needed
  const scales = [1, 0.9, 0.8, 0.7, 0.6, 0.5];
  let smallestBlob: Blob | null = null;
  let smallestQuality = 0.1;
  let smallestScale = 0.5;

  for (const scale of scales) {
    let low = 0.1;
    let high = 0.95;
    let bestInScale: Blob | null = null;
    let bestQInScale = low;

    for (let pass = 0; pass < 7; pass++) {
      const mid = (low + high) / 2;
      const candidate = await buildPdfForQualityAndScale(canvases, options, mid, scale);
      if (!smallestBlob || candidate.size < smallestBlob.size) {
        smallestBlob = candidate;
        smallestQuality = mid;
        smallestScale = scale;
      }
      if (candidate.size <= targetBytes) {
        bestInScale = candidate;
        bestQInScale = mid;
        low = mid; // try higher quality while staying under targetBytes
      } else {
        high = mid;
      }
    }

    if (bestInScale) {
      return {
        blob: bestInScale,
        targetReached: true,
        qualityUsed: bestQInScale,
        scaleUsed: scale,
      };
    }
  }

  const fallback =
    smallestBlob || (await buildPdfForQualityAndScale(canvases, options, 0.1, 0.5));
  return {
    blob: fallback,
    targetReached: fallback.size <= targetBytes,
    qualityUsed: smallestQuality,
    scaleUsed: smallestScale,
  };
}

async function buildPdfForQualityAndScale(
  canvases: HTMLCanvasElement[],
  options: PdfComposeOptions,
  quality: number,
  scale: number
): Promise<Blob> {
  interface PreparedPage {
    jpegBytes: Uint8Array;
    imgPixelW: number;
    imgPixelH: number;
    pagePtW: number;
    pagePtH: number;
    drawX: number;
    drawY: number;
    drawW: number;
    drawH: number;
  }

  const preparedPages: PreparedPage[] = [];
  const marginPt = Math.max(0, options.marginMm) * (72 / 25.4);

  for (const srcCanvas of canvases) {
    const scaledW = Math.max(1, Math.round(srcCanvas.width * scale));
    const scaledH = Math.max(1, Math.round(srcCanvas.height * scale));

    const workCanvas = document.createElement('canvas');
    workCanvas.width = scaledW;
    workCanvas.height = scaledH;
    const ctx = workCanvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context unavailable for PDF encoding.');

    ctx.fillStyle = options.backgroundColor || '#FFFFFF';
    ctx.fillRect(0, 0, scaledW, scaledH);
    ctx.drawImage(srcCanvas, 0, 0, scaledW, scaledH);

    const jpegBlob = await new Promise<Blob>((resolve, reject) => {
      workCanvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('Failed to encode PDF JPEG stream'))),
        'image/jpeg',
        Math.max(0.08, Math.min(0.98, quality))
      );
    });
    const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());

    // Compute page dimensions in PDF points (1 pt = 1/72 inch)
    let pagePtW: number;
    let pagePtH: number;

    if (options.pageSize === 'fit') {
      // 96 DPI pixel-to-point mapping + margins
      const contentW = Math.max(36, scaledW * 0.75);
      const contentH = Math.max(36, scaledH * 0.75);
      pagePtW = contentW + marginPt * 2;
      pagePtH = contentH + marginPt * 2;
    } else {
      // Standard paper sizes in points: A4 = 595.28 x 841.89, Letter = 612 x 792
      const baseW = options.pageSize === 'a4' ? 595.28 : 612;
      const baseH = options.pageSize === 'a4' ? 841.89 : 792;
      const isLandscape =
        options.orientation === 'landscape' ||
        (options.orientation === 'auto' && scaledW > scaledH);

      pagePtW = isLandscape ? baseH : baseW;
      pagePtH = isLandscape ? baseW : baseH;
    }

    const availW = Math.max(18, pagePtW - marginPt * 2);
    const availH = Math.max(18, pagePtH - marginPt * 2);

    const fitScale = Math.min(availW / scaledW, availH / scaledH);
    const drawW = scaledW * fitScale;
    const drawH = scaledH * fitScale;
    const drawX = (pagePtW - drawW) / 2;
    const drawY = (pagePtH - drawH) / 2;

    preparedPages.push({
      jpegBytes,
      imgPixelW: scaledW,
      imgPixelH: scaledH,
      pagePtW,
      pagePtH,
      drawX,
      drawY,
      drawW,
      drawH,
    });
  }

  // Construct multi-page PDF object graph:
  // Object 1: Catalog
  // Object 2: Pages
  // For each page i (0..N-1):
  //   Object 3 + i*3: Page dictionary
  //   Object 4 + i*3: Content stream
  //   Object 5 + i*3: Image XObject
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [0]; // 1-indexed object byte offsets
  let byteCursor = 0;

  const pushBytes = (arr: Uint8Array) => {
    chunks.push(arr);
    byteCursor += arr.byteLength;
  };
  const pushStr = (str: string) => {
    pushBytes(encoder.encode(str));
  };

  pushStr('%PDF-1.4\n%\xFF\xFF\xFF\xFF\n');

  const pageObjNumbers: number[] = [];
  for (let i = 0; i < preparedPages.length; i++) {
    pageObjNumbers.push(3 + i * 3);
  }

  // Object 1: Catalog
  offsets[1] = byteCursor;
  pushStr('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  // Object 2: Pages tree
  offsets[2] = byteCursor;
  const kidsRef = pageObjNumbers.map((n) => `${n} 0 R`).join(' ');
  pushStr(`2 0 obj\n<< /Type /Pages /Kids [ ${kidsRef} ] /Count ${preparedPages.length} >>\nendobj\n`);

  // Pages, Contents & Image XObjects
  for (let i = 0; i < preparedPages.length; i++) {
    const p = preparedPages[i];
    const pageObjId = 3 + i * 3;
    const contentObjId = 4 + i * 3;
    const imgObjId = 5 + i * 3;
    const imgName = `/Im${i + 1}`;

    const contentStreamStr = `q\n${p.drawW.toFixed(2)} 0 0 ${p.drawH.toFixed(2)} ${p.drawX.toFixed(2)} ${p.drawY.toFixed(2)} cm\n${imgName} Do\nQ\n`;
    const contentBytes = encoder.encode(contentStreamStr);

    // Page object
    offsets[pageObjId] = byteCursor;
    pushStr(
      `${pageObjId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [ 0 0 ${p.pagePtW.toFixed(2)} ${p.pagePtH.toFixed(2)} ] /Resources << /XObject << ${imgName} ${imgObjId} 0 R >> >> /Contents ${contentObjId} 0 R >>\nendobj\n`
    );

    // Content stream object
    offsets[contentObjId] = byteCursor;
    pushStr(`${contentObjId} 0 obj\n<< /Length ${contentBytes.byteLength} >>\nstream\n`);
    pushBytes(contentBytes);
    pushStr('\nendstream\nendobj\n');

    // Image XObject
    offsets[imgObjId] = byteCursor;
    pushStr(
      `${imgObjId} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${p.imgPixelW} /Height ${p.imgPixelH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${p.jpegBytes.byteLength} >>\nstream\n`
    );
    pushBytes(p.jpegBytes);
    pushStr('\nendstream\nendobj\n');
  }

  const totalObjects = 2 + preparedPages.length * 3;
  const xrefOffset = byteCursor;
  pushStr(`xref\n0 ${totalObjects + 1}\n0000000000 65535 f \n`);
  for (let objId = 1; objId <= totalObjects; objId++) {
    const padded = String(offsets[objId] || 0).padStart(10, '0');
    pushStr(`${padded} 00000 n \n`);
  }

  pushStr(
    `trailer\n<< /Size ${totalObjects + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`
  );

  return new Blob(chunks as unknown as BlobPart[], { type: 'application/pdf' });
}
