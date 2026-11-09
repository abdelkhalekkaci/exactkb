# CompressPhoto (`compressphoto.space`)

**CompressPhoto** is a 100% browser-local image & document studio featuring:
1. **Biometric & Target-KB Photo Compressor**: 7-pass binary search for 10 KB–500 KB ceilings, 35×45 mm & 2×2" biometric cropping, wet-ink signature shadow removal, and 8-up 4×6" print sheets.
2. **Universal Private Image & Document Converter**: 11 input formats (`JPG`, `PNG`, `WebP`, `GIF`, `BMP`, `AVIF`, `HEIC/HEIF`, `TIFF`, `SVG`, `ICO`, `PDF`) and 9 output formats (`JPG`, `PNG`, `WebP`, `AVIF`, `BMP`, `GIF`, `TIFF`, multi-size `ICO`, and single/multi-page `PDF`) with batch ZIP export and 23 dedicated SEO routes in `EN`, `FR`, `ES`, and `AR`.
3. **Permanent Static QR Code & Vector Barcode Printshop**: Zero-tracking static QR codes (`URL`, `Wi-Fi`, `vCard`, `WhatsApp`, `Menu`) and `CODE-128B` vector barcodes.

Every byte is processed in browser RAM (`HTMLCanvasElement`, `OffscreenCanvas`, `WebAssembly`, and typed arrays). Zero files ever leave the user's device.

---

## 1. Self-Hosted Libraries & Licenses

All runtime dependencies are pinned to exact versions in `package.json` and bundled locally via Vite (zero third-party runtime CDN calls):

| Package | Version | License | Purpose & Loading Strategy |
| :--- | :--- | :--- | :--- |
| `react` / `react-dom` | `19.0.0` | MIT | Core UI framework |
| `lucide-react` | `0.546.0` | ISC | Studio iconography |
| `qrcode` | `1.5.4` | MIT | ISO/IEC 18004 QR matrix generation |
| `fflate` | `0.8.3` | MIT | Lazy-loaded (`import('fflate')`) only when clicking **Download all as ZIP** |
| `utif` | `3.1.0` | MIT | Lazy-loaded (`import('utif')`) only when decoding or encoding `.tif`/`.tiff` files |
| `pdfjs-dist` | `6.5.438` | Apache-2.0 | Lazy-loaded (`import('pdfjs-dist')`) with local bundled Web Worker only when a `.pdf` input file is dropped |
| `heic-to` | `1.6.7` | MIT (wrapper) / **LGPL-3.0** (`libheif`) | Lazy-loaded (`import('heic-to')`) only when `.heic`/`.heif` decoding falls back from native `createImageBitmap` on Chrome/Firefox. Note: `heic-to` wraps `libheif` (LGPL-3.0); because it is dynamically imported as a separate chunk, users can inspect or replace the WebAssembly/JS decoder module independently. |

Zero-dependency custom encoders in `src/services/binaryImageEncoders.ts` and `src/services/pdfComposer.ts` handle:
- **BMP**: 24-bit uncompressed DIB container
- **ICO**: Multi-resolution Windows icon container (`16×16`, `32×32`, `48×48`, `64×64`, `128×128`, `256×256` PNG-in-ICO frames)
- **GIF**: Static `GIF89a` 256-color palette quantizer + LZW encoder
- **PDF**: ISO-32000-1 PDF 1.4 multi-page document composer with A4 / US Letter / Fit-to-Image sizing, portrait/landscape orientation, margins, and 7-pass binary search for target KB ceilings

---

## 2. How to Add a New Conversion Route

1. Open `src/data/converterRoutes.ts`.
2. Add the new slug to the `ConverterRouteSlug` union type (e.g., `'webp-to-pdf'`).
3. Append a new `ConverterRouteConfig` entry to `CONVERTER_ROUTES` with:
   - `slug`, `fromFormat`, `toFormat`, `defaultOutputFormat`, `acceptMime`
   - `title` (< 60 chars), `metaDescription` (< 155 chars), `h1`, `introParagraphs` (150+ unique words)
   - `steps` (4 steps), `comparisonRows` (4 format comparison rows), `faqs` (5 unique Q&As), and `relatedSlugs`.
4. Run `npm run build` (which executes `scripts/prerender-routes.ts`) to automatically generate localized static HTML shells (`/en/...`, `/fr/...`, `/es/...`, `/ar/...`) and update `public/sitemap.xml` and `public/llms.txt`.

---

## 3. How to Add a New Language

1. Add the 2-letter ISO code to `LocaleCode` in `src/types/atelier.ts`.
2. Add the locale metadata to `LOCALE_META` and `UI_TRANSLATIONS` in `src/data/seoRoutesAndTranslations.ts`.
3. Add localized UI labels to `CONVERTER_UI_LABELS` in `src/data/converterRoutes.ts` (mark machine-assisted drafts with `// TODO(review-i18n)` for human review).
4. Add the locale code to the `LOCALES` array in `scripts/prerender-routes.ts` and run `npm run build`.

---

## 4. Known Browser Limitations

- **AVIF Encoding**: Relies on native `HTMLCanvasElement.toBlob('image/avif')`. Supported in Chrome 94+ and Firefox 113+; browsers without native AVIF encode support automatically display a clear fallback notice and offer WebP/PNG/JPG.
- **Animated GIF / Animated WebP**: Animated inputs decode and convert the **first frame** as a static image; a badge in the file queue notifies the user before conversion.
- **Unsupported Proprietary Raw Formats**: Camera RAW (`.cr2`, `.nef`, `.arw`, `.dng`), Photoshop (`.psd`), Illustrator (`.ai`), EPS, and Word (`.docx`) are intentionally rejected with an actionable message recommending export to PNG, JPG, TIFF, or PDF first.
- **iOS Safari Canvas Ceiling**: Mobile Safari enforces a maximum canvas area of `16,777,216` pixels (`4096 × 4096`). Images exceeding this pixel count are automatically downscaled proportionally to prevent memory allocation crashes while preserving aspect ratio.
