# CompressPhoto — Exact-KB Biometric Photo Compressor & Static Vector QR Studio

[![Live Website](https://img.shields.io/badge/Live_App-compressphoto.space-fca311?style=for-the-badge&labelColor=14213d)](https://compressphoto.space/)
[![French Edition](https://img.shields.io/badge/Edition_FR-compressphoto.space%2Ffr-14213d?style=for-the-badge)](https://compressphoto.space/fr)
[![Privacy](https://img.shields.io/badge/Privacy-100%25_Client--Side_Zero_Upload-14213d?style=for-the-badge)](https://compressphoto.space/privacy)

**[CompressPhoto (compressphoto.space)](https://compressphoto.space/)** is a 100% client-side, privacy-first biometric photo & signature compression studio engineered to lock JPEG, WebP, PNG, and ISO-32000 PDF files to **exact kilobyte ceilings (10KB, 20KB, 50KB, 100KB, 200KB) at 300 DPI** for government passport, visa, and civil service portals—alongside an isolated **Static Vector QR Code & CODE-128 Barcode Printshop (`/qr`)**.

All image decoding, 7-pass binary-search byte targeting, wet-ink signature shadow removal, and vector QR/barcode generation run **locally inside your browser RAM** with zero server uploads.

---

## Live Dedicated Tools & Official Portal Presets

| Dedicated Tool / Portal Preset | Live Pre-Calibrated URL | Official Biometric Specification |
| :--- | :--- | :--- |
| **Main Biometric Photo Compressor** | [https://compressphoto.space/](https://compressphoto.space/) | 7-pass binary search to exact KB ceiling (JPEG, WebP, PNG, PDF) |
| **Compress Photo to 20KB Online** | [https://compressphoto.space/compress-photo-to-20kb](https://compressphoto.space/compress-photo-to-20kb) | Locks between 18.5 KB and 19.9 KB at 300 DPI |
| **Compress Photo to 50KB Online** | [https://compressphoto.space/compress-photo-to-50kb](https://compressphoto.space/compress-photo-to-50kb) | 35×45 mm (413×531 px @ 300 DPI) locked ≤ 50 KB |
| **Compress Photo to 100KB Online** | [https://compressphoto.space/compress-photo-to-100kb](https://compressphoto.space/compress-photo-to-100kb) | High-clarity 300 DPI portrait & document compression ≤ 100 KB |
| **Compress Photo to 200KB Online** | [https://compressphoto.space/compress-photo-to-200kb](https://compressphoto.space/compress-photo-to-200kb) | High-resolution ≤ 200 KB portal & e-commerce preset |
| **Compress Signature to 20KB (Shadow Removal)** | [https://compressphoto.space/compress-signature-to-20kb](https://compressphoto.space/compress-signature-to-20kb) | 560×180 px (140×60 ratio) + adaptive #FFFFFF paper whitening |
| **🇫🇷 France ANTS & ANEF Photo (35×45mm 50Ko)** | [https://compressphoto.space/fr/ants-photo-identite-50ko](https://compressphoto.space/fr/ants-photo-identite-50ko) | ISO/IEC 19794-5 French Passeport, CNI, Permis & Titre de séjour |
| **🇲🇦 Morocco CNIE & Passport Photo (35×45mm)** | [https://compressphoto.space/fr/photo-cnie-maroc-35x45mm](https://compressphoto.space/fr/photo-cnie-maroc-35x45mm) | 413×531 px @ 300 DPI ≤ 50 KB for cnie.ma, passeport.ma & Massar |
| **🇪🇺 35×45mm Biometric Passport Photo Maker** | [https://compressphoto.space/passport-photo-35x45mm-50kb](https://compressphoto.space/passport-photo-35x45mm-50kb) | ICAO Doc 9303 Schengen, EU, UK & global passport + 4×6" 8-photo sheet |
| **🇺🇸 US Visa DS-160 & DV Lottery (600×600 px)** | [https://compressphoto.space/ds160-photo-compressor-600x600](https://compressphoto.space/ds160-photo-compressor-600x600) | 2×2 inch (600×600 px, 1:1 square, 24-bit sRGB) locked ≤ 100 KB / 240 KB |
| **🇮🇳 SSC, UPSC, IBPS & NEET Photo + Signature** | [https://compressphoto.space/ssc-upsc-photo-signature-20kb](https://compressphoto.space/ssc-upsc-photo-signature-20kb) | Photo (20–50 KB) & Wet-Ink Signature (10–20 KB) exam portal suite |
| **📄 Convert & Compress Photo to PDF ≤ 50KB** | [https://compressphoto.space/compress-photo-to-pdf-under-50kb](https://compressphoto.space/compress-photo-to-pdf-under-50kb) | Single-page ISO-32000 PDF with header overhead deducted automatically |
| **📦 Amazon 1000×1000 Pure White Product Photo** | [https://compressphoto.space/amazon-1000x1000-white-background-photo](https://compressphoto.space/amazon-1000x1000-white-background-photo) | 1000×1000 px on pure RGB(255,255,255) studio canvas ≤ 200 KB |
| **Static Vector QR & CODE-128 Barcode Studio** | [https://compressphoto.space/qr](https://compressphoto.space/qr) | Permanent zero-expiration QR codes (URL, Wi-Fi, vCard 3.0, Menu) & SVG barcodes |

---

## Multilingual Subdirectory Editions (148 Pre-Rendered Static HTML Pages)

- **English (Global):** [https://compressphoto.space/](https://compressphoto.space/)
- **Français (France ANTS / Maroc CNIE / Schengen):** [https://compressphoto.space/fr](https://compressphoto.space/fr)
- **Español (Pasaporte / Visa EE.UU. DS-160):** [https://compressphoto.space/es](https://compressphoto.space/es)
- **العربية (البطاقة الوطنية المغربية CNIE / جواز السفر / تأشيرة أمريكا):** [https://compressphoto.space/ar](https://compressphoto.space/ar)
- **Technical Guides & Tutorials (20 Articles × 4 Languages):** [https://compressphoto.space/blog](https://compressphoto.space/blog)
- **AI Answer Engine Catalog (`llms.txt` & `llms-full.txt`):** [https://compressphoto.space/llms.txt](https://compressphoto.space/llms.txt) · [https://compressphoto.space/llms-full.txt](https://compressphoto.space/llms-full.txt)

---

## Local Development & Static Pre-Rendering

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle & pre-render all 148 localized HTML routes + sitemap.xml
npm run build
```
