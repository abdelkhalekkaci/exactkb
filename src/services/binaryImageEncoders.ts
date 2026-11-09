/**
 * Zero-dependency binary image encoders & decoders for BMP, ICO (multi-size), and Static GIF89a.
 * Runs 100% in browser RAM with zero external network calls.
 */

/**
 * Encodes RGBA ImageData into a standard 24-bit uncompressed Windows BMP (DIB) Blob.
 * Any transparency should already be composited onto the user's chosen background color on the canvas.
 */
export function encodeBmpFromImageData(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const rowBytesUnpadded = width * 3;
  const rowPadding = (4 - (rowBytesUnpadded % 4)) % 4;
  const rowStride = rowBytesUnpadded + rowPadding;
  const pixelArraySize = rowStride * height;
  const fileHeaderSize = 14;
  const dibHeaderSize = 40;
  const totalFileSize = fileHeaderSize + dibHeaderSize + pixelArraySize;

  const buffer = new ArrayBuffer(totalFileSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  // BITMAPFILEHEADER (14 bytes)
  view.setUint8(0, 0x42); // 'B'
  view.setUint8(1, 0x4d); // 'M'
  view.setUint32(2, totalFileSize, true);
  view.setUint16(6, 0, true);
  view.setUint16(8, 0, true);
  view.setUint32(10, fileHeaderSize + dibHeaderSize, true);

  // BITMAPINFOHEADER (40 bytes)
  view.setUint32(14, dibHeaderSize, true);
  view.setInt32(18, width, true);
  view.setInt32(22, height, true); // positive height = bottom-up scanlines
  view.setUint16(26, 1, true); // color planes
  view.setUint16(28, 24, true); // 24 bits per pixel (BGR)
  view.setUint32(30, 0, true); // BI_RGB (no compression)
  view.setUint32(34, pixelArraySize, true);
  view.setInt32(38, 2835, true); // ~72 DPI horizontal (pixels/meter)
  view.setInt32(42, 2835, true); // ~72 DPI vertical
  view.setUint32(46, 0, true);
  view.setUint32(50, 0, true);

  let dstOffset = fileHeaderSize + dibHeaderSize;
  for (let y = height - 1; y >= 0; y--) {
    const srcRowStart = y * width * 4;
    for (let x = 0; x < width; x++) {
      const srcIdx = srcRowStart + x * 4;
      bytes[dstOffset++] = data[srcIdx + 2]; // Blue
      bytes[dstOffset++] = data[srcIdx + 1]; // Green
      bytes[dstOffset++] = data[srcIdx];     // Red
    }
    for (let p = 0; p < rowPadding; p++) {
      bytes[dstOffset++] = 0;
    }
  }

  return new Blob([buffer], { type: 'image/bmp' });
}

/**
 * Encodes a source canvas into a real multi-resolution Windows .ico binary container
 * embedding lossless PNG frames for each requested icon size (e.g. 16, 32, 48, 64, 128, 256).
 */
export async function encodeIcoFromCanvas(
  sourceCanvas: HTMLCanvasElement,
  sizes: number[] = [16, 32, 48, 64, 128, 256]
): Promise<Blob> {
  const validSizes = sizes
    .map((s) => Math.max(16, Math.min(256, Math.round(s))))
    .filter((s, idx, arr) => arr.indexOf(s) === idx)
    .sort((a, b) => a - b);

  const finalSizes = validSizes.length > 0 ? validSizes : [16, 32, 48, 64, 128, 256];
  const pngBuffers: Uint8Array[] = [];

  for (const size of finalSizes) {
    const iconCanvas = document.createElement('canvas');
    iconCanvas.width = size;
    iconCanvas.height = size;
    const ctx = iconCanvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not initialize 2D canvas context for ICO encoding.');
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Fit proportionally inside the square icon frame
    const scale = Math.min(size / sourceCanvas.width, size / sourceCanvas.height);
    const drawW = Math.max(1, Math.round(sourceCanvas.width * scale));
    const drawH = Math.max(1, Math.round(sourceCanvas.height * scale));
    const offsetX = Math.floor((size - drawW) / 2);
    const offsetY = Math.floor((size - drawH) / 2);

    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(sourceCanvas, offsetX, offsetY, drawW, drawH);

    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      iconCanvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('Failed to encode ICO frame'))),
        'image/png'
      );
    });
    const arrayBuffer = await pngBlob.arrayBuffer();
    pngBuffers.push(new Uint8Array(arrayBuffer));
  }

  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  const totalBytes = headerSize + pngBuffers.reduce((acc, buf) => acc + buf.byteLength, 0);

  const outBuffer = new ArrayBuffer(totalBytes);
  const view = new DataView(outBuffer);
  const outBytes = new Uint8Array(outBuffer);

  // ICONDIR header (6 bytes)
  view.setUint16(0, 0, true);     // Reserved (0)
  view.setUint16(2, 1, true);     // Type (1 = ICO)
  view.setUint16(4, count, true); // Number of images

  let dataOffset = headerSize;
  for (let i = 0; i < count; i++) {
    const size = finalSizes[i];
    const pngData = pngBuffers[i];
    const entryOffset = 6 + i * 16;

    view.setUint8(entryOffset + 0, size === 256 ? 0 : size); // Width (0 means 256)
    view.setUint8(entryOffset + 1, size === 256 ? 0 : size); // Height (0 means 256)
    view.setUint8(entryOffset + 2, 0);                       // Color palette count
    view.setUint8(entryOffset + 3, 0);                       // Reserved
    view.setUint16(entryOffset + 4, 1, true);                // Color planes
    view.setUint16(entryOffset + 6, 32, true);               // Bits per pixel
    view.setUint32(entryOffset + 8, pngData.byteLength, true);
    view.setUint32(entryOffset + 12, dataOffset, true);

    outBytes.set(pngData, dataOffset);
    dataOffset += pngData.byteLength;
  }

  return new Blob([outBuffer], { type: 'image/x-icon' });
}

/**
 * Extracts the highest-resolution embedded PNG frame from a .ico file if present,
 * or returns null so the caller can fall back to standard browser ICO decoding.
 */
export async function extractLargestPngFromIco(buffer: ArrayBuffer): Promise<Blob | null> {
  if (buffer.byteLength < 22) return null;
  const view = new DataView(buffer);
  const reserved = view.getUint16(0, true);
  const type = view.getUint16(2, true);
  const count = view.getUint16(4, true);

  if (reserved !== 0 || (type !== 1 && type !== 2) || count < 1 || count > 64) {
    return null;
  }

  let bestArea = -1;
  let bestOffset = 0;
  let bestLength = 0;

  for (let i = 0; i < count; i++) {
    const entryOffset = 6 + i * 16;
    if (entryOffset + 16 > buffer.byteLength) break;
    const rawW = view.getUint8(entryOffset);
    const rawH = view.getUint8(entryOffset + 1);
    const w = rawW === 0 ? 256 : rawW;
    const h = rawH === 0 ? 256 : rawH;
    const bytesInRes = view.getUint32(entryOffset + 8, true);
    const imageOffset = view.getUint32(entryOffset + 12, true);

    if (imageOffset + bytesInRes <= buffer.byteLength && w * h > bestArea) {
      bestArea = w * h;
      bestOffset = imageOffset;
      bestLength = bytesInRes;
    }
  }

  if (bestLength > 8) {
    const slice = new Uint8Array(buffer, bestOffset, bestLength);
    // Check PNG signature: 89 50 4E 47 0D 0A 1A 0A
    if (
      slice[0] === 0x89 &&
      slice[1] === 0x50 &&
      slice[2] === 0x4e &&
      slice[3] === 0x47
    ) {
      return new Blob([slice], { type: 'image/png' });
    }
  }
  return null;
}

/**
 * Encodes RGBA ImageData into a standard static GIF89a Blob using a 256-color palette
 * (216 web-safe 6x6x6 cube + 40 grayscale ramp) and LZW variable-width code compression.
 */
export function encodeStaticGifFromImageData(imageData: ImageData): Blob {
  const { width, height, data } = imageData;

  // Build 256-color palette (3 * 256 = 768 bytes)
  // Colors 0..215: 6x6x6 RGB cube
  // Colors 216..254: 39-step grayscale ramp
  // Color 255: transparent index
  const palette = new Uint8Array(256 * 3);
  let pIdx = 0;
  const levels = [0, 51, 102, 153, 204, 255];
  for (let r = 0; r < 6; r++) {
    for (let g = 0; g < 6; g++) {
      for (let b = 0; b < 6; b++) {
        palette[pIdx++] = levels[r];
        palette[pIdx++] = levels[g];
        palette[pIdx++] = levels[b];
      }
    }
  }
  for (let i = 0; i < 39; i++) {
    const gray = Math.round((i / 38) * 255);
    palette[pIdx++] = gray;
    palette[pIdx++] = gray;
    palette[pIdx++] = gray;
  }
  // Index 255 reserved for transparency
  palette[255 * 3] = 255;
  palette[255 * 3 + 1] = 255;
  palette[255 * 3 + 2] = 255;

  // Map each pixel to a palette index (0..255)
  const indexedPixels = new Uint8Array(width * height);
  let hasTransparency = false;

  for (let i = 0, px = 0; i < data.length; i += 4, px++) {
    const a = data[i + 3];
    if (a < 128) {
      indexedPixels[px] = 255;
      hasTransparency = true;
      continue;
    }
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Check if near-neutral gray for smoother monochrome/text fidelity
    if (Math.abs(r - g) <= 6 && Math.abs(g - b) <= 6) {
      const grayStep = Math.round(((r + g + b) / (3 * 255)) * 38);
      indexedPixels[px] = 216 + grayStep;
    } else {
      const rIdx = Math.round((r / 255) * 5);
      const gIdx = Math.round((g / 255) * 5);
      const bIdx = Math.round((b / 255) * 5);
      indexedPixels[px] = rIdx * 36 + gIdx * 6 + bIdx;
    }
  }

  const lzwBytes = lzwEncodeGif(indexedPixels, 8);

  const out: number[] = [];
  const writeAscii = (str: string) => {
    for (let i = 0; i < str.length; i++) out.push(str.charCodeAt(i));
  };
  const writeU16 = (val: number) => {
    out.push(val & 0xff, (val >> 8) & 0xff);
  };

  // Header
  writeAscii('GIF89a');

  // Logical Screen Descriptor
  writeU16(width);
  writeU16(height);
  out.push(0xf7); // Global Color Table Flag (1), Color Res (7), Sort (0), Size of GCT (7 -> 256 colors)
  out.push(255);  // Background color index
  out.push(0);    // Pixel aspect ratio

  // Global Color Table (768 bytes)
  for (let i = 0; i < palette.length; i++) {
    out.push(palette[i]);
  }

  // Graphic Control Extension (for transparency if present)
  if (hasTransparency) {
    out.push(0x21, 0xf9, 0x04, 0x01, 0x00, 0x00, 255, 0x00);
  }

  // Image Descriptor
  out.push(0x2c);
  writeU16(0); // Left
  writeU16(0); // Top
  writeU16(width);
  writeU16(height);
  out.push(0x00); // No local color table, non-interlaced

  // Table Based Image Data
  out.push(8); // LZW Minimum Code Size = 8
  let offset = 0;
  while (offset < lzwBytes.length) {
    const chunkLen = Math.min(255, lzwBytes.length - offset);
    out.push(chunkLen);
    for (let i = 0; i < chunkLen; i++) {
      out.push(lzwBytes[offset + i]);
    }
    offset += chunkLen;
  }
  out.push(0x00); // Block terminator

  // Trailer
  out.push(0x3b);

  return new Blob([new Uint8Array(out)], { type: 'image/gif' });
}

function lzwEncodeGif(indexStream: Uint8Array, minCodeSize: number): Uint8Array {
  const clearCode = 1 << minCodeSize;
  const eoiCode = clearCode + 1;
  let nextCode = eoiCode + 1;
  let codeSize = minCodeSize + 1;

  // Dictionary table: key = (prefix << 8) | suffix -> code
  const dict = new Int32Array(4096 * 256).fill(-1);

  const output: number[] = [];
  let bitBuffer = 0;
  let bitCount = 0;

  const emitCode = (code: number) => {
    bitBuffer |= code << bitCount;
    bitCount += codeSize;
    while (bitCount >= 8) {
      output.push(bitBuffer & 0xff);
      bitBuffer >>= 8;
      bitCount -= 8;
    }
  };

  emitCode(clearCode);

  if (indexStream.length === 0) {
    emitCode(eoiCode);
    if (bitCount > 0) output.push(bitBuffer & 0xff);
    return new Uint8Array(output);
  }

  let prefix = indexStream[0];

  for (let i = 1; i < indexStream.length; i++) {
    const suffix = indexStream[i];
    const key = (prefix << 8) | suffix;
    const found = dict[key];

    if (found !== -1) {
      prefix = found;
    } else {
      emitCode(prefix);
      if (nextCode < 4096) {
        dict[key] = nextCode++;
        if (nextCode > (1 << codeSize) && codeSize < 12) {
          codeSize++;
        }
      } else {
        emitCode(clearCode);
        dict.fill(-1);
        nextCode = eoiCode + 1;
        codeSize = minCodeSize + 1;
      }
      prefix = suffix;
    }
  }

  emitCode(prefix);
  emitCode(eoiCode);

  if (bitCount > 0) {
    output.push(bitBuffer & 0xff);
  }

  return new Uint8Array(output);
}
