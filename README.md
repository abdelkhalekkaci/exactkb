# CompressPhoto — Exact KB Photo Compressor & Print-Ready QR Code Studio

[![Live Website](https://img.shields.io/badge/Live_App-compressphoto.space-b84a27?style=for-the-badge)](https://compressphoto.space/)
[![QR Code Studio](https://img.shields.io/badge/QR_&_Barcode_Studio-compressphoto.space%2Fqr-1e5b46?style=for-the-badge)](https://compressphoto.space/qr)
[![Privacy](https://img.shields.io/badge/Privacy-100%25_Client--Side_WebAssembly-141311?style=for-the-badge)](https://compressphoto.space/)

**[CompressPhoto (compressphoto.space)](https://compressphoto.space/)** is a 100% client-side, privacy-first web utility engineered to compress photos to an **exact target file size in kilobytes (20KB, 50KB, 100KB, 200KB)** for government portals, visa applications, and exam registrations—alongside a **300 DPI Vector QR Code & 1D Barcode Printshop Studio**.

All image encoding, binary-search byte targeting, and vector QR/barcode generation run **locally inside your browser** with zero server uploads.

---

## Live Web Tools & Direct Links

| Tool / Studio | Live URL | Key Capabilities |
| :--- | :--- | :--- |
| **Exact KB Photo Compressor** | [https://compressphoto.space/](https://compressphoto.space/) | Binary-search compression to exact KB ceiling (JPEG, WebP, PNG) |
| **QR Code & 1D Barcode Studio** | [https://compressphoto.space/qr](https://compressphoto.space/qr) | 16 QR & Barcode types, custom logos, frames, SVG/PNG/PDF & A4 sheet export |
| **Compress Photo to 20KB** | [https://compressphoto.space/compress-to-20kb](https://compressphoto.space/compress-to-20kb) | Strict 10KB–20KB target for SSC, UPSC, IBPS & signature portals |
| **Compress Photo to 50KB** | [https://compressphoto.space/compress-to-50kb](https://compressphoto.space/compress-to-50kb) | Strict ≤50KB target for DS-160 US Visa, Schengen & passport portals |
| **Compress Photo to 100KB** | [https://compressphoto.space/compress-to-100kb](https://compressphoto.space/compress-to-100kb) | High-clarity ≤100KB portrait & document compression |
| **Compress Photo to 200KB** | [https://compressphoto.space/compress-to-200kb](https://compressphoto.space/compress-to-200kb) | High-resolution ≤200KB portal & academic upload preset |
| **Passport & Visa Photo Maker** | [https://compressphoto.space/passport-photo-maker](https://compressphoto.space/passport-photo-maker) | 2x2 inch (600x600 px), 35x45mm Schengen, Canada & UK biometric cropper |
| **Signature Extractor & Resizer** | [https://compressphoto.space/signature-extractor](https://compressphoto.space/signature-extractor) | Otsu thresholding to remove paper shadows + 140x60 px / 10KB–20KB export |
| **PDF Merger & KB Compressor** | [https://compressphoto.space/pdf-merger-compressor](https://compressphoto.space/pdf-merger-compressor) | Combine images into a single PDF under 100KB, 200KB, or 500KB |

---

## Why Choose CompressPhoto Over Traditional Tools?

| Feature | [CompressPhoto.space](https://compressphoto.space/) | TinyPNG / iLoveIMG | QR Code Monkey / Beaconstac |
| :--- | :---: | :---: | :---: |
| **Exact Target KB (e.g., strictly ≤20KB or ≤50KB)** | **Yes (Binary Search)** | No (Percentage only) | N/A |
| **100% Local Browser Processing (Zero Cloud Uploads)** | **Yes** | No (Server Upload) | Partial |
| **Biometric Passport & Visa Presets (2x2", 35x45mm)** | **Yes** | No | N/A |
| **16-Option Static QR Code & 1D Barcode Generator** | **Yes** | No | QR Only |
| **Free Vector SVG, 300 DPI PNG & A4 Label Sheet Export** | **Yes (No Signup)** | Paid / N/A | Paid Paywall |
| **Multi-Language Support (EN, FR, ES, AR)** | **Yes** | Limited | Limited |

---

## Core Modules

### 1. Deterministic Exact-KB Photo Compressor
Government and university portals reject uploads that exceed strict byte ceilings (such as `20 KB` or `50 KB`) or fall below minimum thresholds. [CompressPhoto](https://compressphoto.space/) runs an iterative binary search over quantization parameters and chroma subsampling directly in the browser to hit `92%–99.8%` of your target kilobyte ceiling without blurry artifacts.

### 2. 16-Option QR Code & 1D Barcode Printshop Studio
Visit **[compressphoto.space/qr](https://compressphoto.space/qr)** to generate permanent, zero-expiration vector codes:
- **8 QR Code Payload Types:** Website URL, Wi-Fi Network (`WIFI:`), vCard 3.0 Contact, WhatsApp Direct Chat, Email (`MATMSG`), SMS, UPI / PayPal Payment Links, and Raw Text/JSON.
- **8 Industrial 1D Barcode Symbologies:** `CODE128`, `EAN13`, `EAN8`, `UPC`, `CODE39`, `ITF14`, `MSI`, and `codabar`.
- **Full Visual & Print Customization:** Custom module shapes (Square, Dots, Rounded, Classy), custom corner finder styles, linear gradients, center brand logo with automatic `H (30%)` Reed-Solomon error correction, "SCAN ME" frames, configurable print DPI (`72` to `600 DPI`), A4/Letter multi-label PDF sheet layouts, and batch CSV/multi-line `.zip` export.

---

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle & prerender SEO routes
npm run build
```

---

## Official Links
- **Homepage & Photo Compressor:** [https://compressphoto.space/](https://compressphoto.space/)
- **QR Code & Barcode Generator:** [https://compressphoto.space/qr](https://compressphoto.space/qr)
- **Multilingual Editions:**
  - [English](https://compressphoto.space/)
  - [Français](https://compressphoto.space/?lang=fr)
  - [Español](https://compressphoto.space/?lang=es)
  - [العربية](https://compressphoto.space/?lang=ar)
