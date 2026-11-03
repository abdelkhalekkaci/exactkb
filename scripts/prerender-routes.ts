import fs from 'node:fs';
import path from 'node:path';
import { PHOTO_SEO_ARTICLES } from '../src/data/photoSeoArticles';
import { QR_SEO_ARTICLES } from '../src/data/qrSeoArticles';

const SITE_ORIGIN = 'https://compressphoto.space';
const DIST_DIR = path.resolve(process.cwd(), 'dist');

interface StaticRouteConfig {
  routePath: string; // e.g. '/', '/qr', '/blog/slug'
  title: string;
  description: string;
  ogType: 'website' | 'article';
  jsonLd: Record<string, unknown>;
  bodyHtml: string;
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildNavLinksHtml(): string {
  const allArticles = [...PHOTO_SEO_ARTICLES, ...QR_SEO_ARTICLES];
  const articleLinks = allArticles
    .map(
      (a) =>
        `<li><a href="/blog/${escapeHtml(a.slug)}">${escapeHtml(
          a.translations.en.title
        )}</a></li>`
    )
    .join('\n          ');

  return `
    <nav aria-label="Primary Navigation">
      <ul>
        <li><a href="/">Compress Photo to Exact KB (20KB, 50KB, 100KB)</a></li>
        <li><a href="/qr">Permanent Static QR Code &amp; CODE-128 Barcode Generator</a></li>
        <li><a href="/blog">Photo Compression &amp; QR Code Guides</a></li>
        <li><a href="/about">About CompressPhoto Studio</a></li>
        <li><a href="/legal">Legal Notice &amp; Terms of Service</a></li>
        <li><a href="/privacy">Zero-Server Privacy Policy &amp; GDPR Compliance</a></li>
        <li><a href="/contact">Contact &amp; Technical Support</a></li>
      </ul>
      <h2>All 20 Technical Guides</h2>
      <ul>
        ${articleLinks}
      </ul>
    </nav>`;
}

function buildRoutes(): StaticRouteConfig[] {
  const routes: StaticRouteConfig[] = [];
  const navHtml = buildNavLinksHtml();

  // 1. Root '/'
  routes.push({
    routePath: '/',
    title: 'Compress Photo to 20KB, 50KB, 100KB Online | CompressPhoto',
    description:
      'Compress passport photos, visa portraits, and signatures to 20KB, 50KB, or 100KB online. Crop 35x45mm & 2x2 IDs and generate static vector QR codes in browser.',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_ORIGIN}/#organization`,
          name: 'CompressPhoto',
          url: `${SITE_ORIGIN}/`,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_ORIGIN}/favicon.svg`
          },
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'contact@compressphoto.space',
            contactType: 'customer support',
            availableLanguage: ['en', 'fr', 'es', 'ar']
          }
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_ORIGIN}/#website`,
          url: `${SITE_ORIGIN}/`,
          name: 'CompressPhoto',
          description:
            'Compress passport photos, visa portraits, and signatures to 20KB, 50KB, or 100KB online. Crop 35x45mm & 2x2 IDs and generate static vector QR codes in browser.',
          publisher: { '@id': `${SITE_ORIGIN}/#organization` },
          inLanguage: ['en', 'fr', 'es', 'ar']
        },
        {
          '@type': 'SoftwareApplication',
          '@id': `${SITE_ORIGIN}/#software`,
          name: 'CompressPhoto',
          alternateName: 'CompressPhoto.space',
          url: `${SITE_ORIGIN}/`,
          image: `${SITE_ORIGIN}/og-image.png`,
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'All',
          description:
            'Compress passport photos, visa portraits, and signatures to 20KB, 50KB, or 100KB online. Crop 35x45mm & 2x2 IDs and generate static vector QR codes in browser.',
          publisher: { '@id': `${SITE_ORIGIN}/#organization` },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        }
      ]
    },
    bodyHtml: `
      <main>
        <header>
          <h1>Compress Photo &amp; Signature to 20KB, 50KB, 100KB Online</h1>
          <p>100% private in your browser. Resize 35×45mm passport photos, 2×2&quot; US visa portraits, and wet-ink signatures to your exact KB limit.</p>
        </header>
        <section>
          <h2>1. Select Passport Photo, Visa Crop, or Signature Preset</h2>
          <h2>2. Set Target File Size in KB (20KB, 50KB, 100KB, 200KB)</h2>
          <h2>3. Instant Biometric Preview &amp; Compressed JPG / PDF Download</h2>
        </section>
        <section>
          <h2>Official Photo KB Compression &amp; Biometric ID Specifications</h2>
          <article>
            <h3>Compress Photo to 20KB, 50KB &amp; 100KB for Online Portals</h3>
            <ul>
              <li>10KB – 20KB Exact Ceiling: SSC, UPSC, IBPS &amp; Banking Signature Uploads</li>
              <li>50KB Exact Ceiling: France ANTS, Morocco CNIE &amp; Schengen Visa Portals</li>
              <li>100KB – 240KB Ceiling: US Department of State DS-160 &amp; DV Lottery</li>
            </ul>
          </article>
          <article>
            <h3>35×45 mm Passport, 2×2&quot; US Visa &amp; Wet-Ink Signature Presets</h3>
            <ul>
              <li>35×45 mm (413×531 px @ 300 DPI) ICAO 9303 Biometric Passport Standard</li>
              <li>2×2 inch (600×600 px @ 300 DPI) Square US Visa &amp; Green Card Crop</li>
              <li>560×180 px Adaptive Shadow Removal for Handwritten Pen Signatures</li>
            </ul>
          </article>
          <article>
            <h3>100% Browser-Local Privacy &amp; Exact-KB PDF Wrapper</h3>
            <ul>
              <li>Instant ISO-32000 PDF Export Locked Under Your Target KB Limit</li>
              <li>Interactive Before / After Optical Split-Slider Sharpness Check</li>
              <li>Zero Server Storage · GDPR Compliant Client-Side Canvas Engine</li>
            </ul>
          </article>
        </section>
        ${navHtml}
      </main>`
  });

  // 2. '/qr'
  routes.push({
    routePath: '/qr',
    title: 'Free Static QR Code & Vector Barcode Generator | CompressPhoto',
    description:
      'Generate permanent static QR codes (URL, Wi-Fi, vCard 3.0, Café Menu, WhatsApp) and CODE-128 vector SVG & 300 DPI PNG barcodes 100% locally in your browser.',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'CompressPhoto Free Permanent Static QR Code & Vector Barcode Generator',
      url: `${SITE_ORIGIN}/qr`,
      image: `${SITE_ORIGIN}/og-image.png`,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      description:
        'Generate permanent static QR codes (URL, Wi-Fi, vCard 3.0, Café Menu, WhatsApp) and CODE-128 vector SVG & 300 DPI PNG barcodes 100% locally in your browser.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
    },
    bodyHtml: `
      <main>
        <header>
          <h1>Free Permanent Static QR Code &amp; Vector Barcode Generator</h1>
          <p>100% direct static encoding with zero middleman links—your URL, Wi-Fi, vCard 3.0, Menu, WhatsApp, and CODE-128 barcodes never expire.</p>
        </header>
        <section>
          <h2>1. Select QR Code Type (URL, Wi-Fi, vCard 3.0, Menu, WhatsApp, Barcode)</h2>
          <h2>2. Customize Vector QR Matrix, Corner Markers &amp; Center Logo</h2>
          <h2>3. Live Scannability Preview &amp; Print SVG / 300 DPI PNG Export</h2>
        </section>
        <section>
          <h2>Permanent Static Vector QR Code &amp; CODE-128 Barcode Specifications</h2>
          <article>
            <h3>100% Permanent Static QR Codes (Zero Expiration)</h3>
            <ul>
              <li>Website URL &amp; Landing Page Direct Matrix Encoding</li>
              <li>Guest Wi-Fi Auto-Connect (WPA/WPA2 SSID &amp; Password)</li>
              <li>vCard 3.0 Digital Business Card for iOS &amp; Android Contacts</li>
            </ul>
          </article>
          <article>
            <h3>Restaurant Menu, WhatsApp Chat &amp; Retail CODE-128 Barcodes</h3>
            <ul>
              <li>Contactless Bistro &amp; Café Menu QR with Table Number Parameter</li>
              <li>WhatsApp Click-to-Chat (wa.me) with Pre-Filled Customer Message</li>
              <li>ISO/IEC 15417 CODE-128 Subset-B ASCII Retail &amp; Logistics Barcode</li>
            </ul>
          </article>
          <article>
            <h3>Print-Ready Vector SVG, 300 DPI PNG &amp; &lt; 20KB Export</h3>
            <ul>
              <li>True Geometric SVG Vector Paths for Adobe Illustrator &amp; Print Shops</li>
              <li>1200×1200 px High-Resolution PNG for Packaging &amp; Signage</li>
              <li>1-Click Bridge to CompressPhoto KB Compressor (&lt; 20KB Portal Upload)</li>
            </ul>
          </article>
        </section>
        ${navHtml}
      </main>`
  });

  // 3. '/blog'
  const allArticles = [
    ...PHOTO_SEO_ARTICLES.map((a) => ({ ...a, domain: 'photo' as const })),
    ...QR_SEO_ARTICLES.map((q) => ({ ...q, domain: 'qr' as const }))
  ];

  routes.push({
    routePath: '/blog',
    title: 'Photo Compression & QR Code Guides | CompressPhoto',
    description:
      'Step-by-step tutorials on compressing photos to exact kilobyte limits (20KB, 50KB, 100KB, Passports, Signatures) and generating permanent static QR codes.',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Photo Compression & QR Code Guides | CompressPhoto',
      description:
        'Step-by-step tutorials on compressing photos to exact kilobyte limits (20KB, 50KB, 100KB, Passports, Signatures) and generating permanent static QR codes.',
      url: `${SITE_ORIGIN}/blog`,
      publisher: {
        '@type': 'Organization',
        name: 'CompressPhoto',
        url: `${SITE_ORIGIN}/`
      }
    },
    bodyHtml: `
      <main>
        <header>
          <h1>Photo Compression &amp; QR Code Practical Guides</h1>
          <p>Step-by-step tutorials on compressing photos to exact kilobyte limits (20KB, 50KB, 100KB, Passports, Signatures) and generating permanent static QR codes &amp; vector barcodes.</p>
        </header>
        <section>
          <h2>All 20 Technical Tutorials</h2>
          ${ allArticles
            .map(
              (a) => `
            <article>
              <h3><a href="/blog/${escapeHtml(a.slug)}">${escapeHtml(
                a.translations.en.title
              )}</a></h3>
              <p>${escapeHtml(a.translations.en.excerpt)}</p>
            </article>`
            )
            .join('\n') }
        </section>
        ${navHtml}
      </main>`
  });

  // 4. Info & Legal pages
  const infoPages: Array<{
    routePath: string;
    title: string;
    description: string;
    h1: string;
    summary: string;
  }> = [
    {
      routePath: '/about',
      title: 'About CompressPhoto — Precision Client-Side Imaging & QR Studio',
      description:
        'Learn how CompressPhoto processes biometric passport photos, exact-KB signatures, and permanent vector QR codes 100% locally in your browser.',
      h1: 'About CompressPhoto — Client-Side Biometric & Vector Imaging Studio',
      summary:
        'CompressPhoto is an independent browser-based engineering studio dedicated to deterministic exact-kilobyte image compression and zero-redirect static QR & barcode generation.'
    },
    {
      routePath: '/legal',
      title: 'Legal Notice & Terms of Use | CompressPhoto',
      description:
        'Read the official Legal Notice, Terms of Service, and intellectual property policies for CompressPhoto (compressphoto.space).',
      h1: 'Legal Notice & Terms of Service',
      summary:
        'Official publisher information, terms of use, and open web compliance guarantees for CompressPhoto (compressphoto.space).'
    },
    {
      routePath: '/privacy',
      title: 'Privacy Policy — 100% Client-Side Zero-Upload Guarantee | CompressPhoto',
      description:
        'CompressPhoto processes all photos, biometric IDs, signatures, and QR codes locally in your browser RAM with zero server uploads and full GDPR compliance.',
      h1: 'Zero-Server Privacy Policy & GDPR Compliance',
      summary:
        'Your passport photos, signatures, and Wi-Fi credentials never leave your device. All compression and vector rendering runs inside local WebAssembly and HTML5 Canvas memory.'
    },
    {
      routePath: '/contact',
      title: 'Contact & Technical Support | CompressPhoto',
      description:
        'Get in touch with the CompressPhoto engineering team for support, feature requests, or compliance inquiries.',
      h1: 'Contact & Technical Support',
      summary:
        'Reach our engineering and biometric compliance desk at contact@compressphoto.space for assistance with exact-KB photo limits or vector QR specifications.'
    }
  ];

  for (const page of infoPages) {
    routes.push({
      routePath: page.routePath,
      title: page.title,
      description: page.description,
      ogType: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.title,
        description: page.description,
        url: `${SITE_ORIGIN}${page.routePath}`,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` }
      },
      bodyHtml: `
        <main>
          <article>
            <h1>${escapeHtml(page.h1)}</h1>
            <p>${escapeHtml(page.summary)}</p>
          </article>
          ${navHtml}
        </main>`
    });
  }

  // 5. All 20 Blog Articles
  for (const article of allArticles) {
    const en = article.translations.en;
    const routePath = `/blog/${article.slug}`;
    const canonicalUrl = `${SITE_ORIGIN}${routePath}`;
    const fullTitle = `${en.title} | CompressPhoto`;

    const sectionsHtml = en.sections
      .map(
        (sec) => `
        <section>
          <h2>${escapeHtml(sec.heading)}</h2>
          <p>${escapeHtml(sec.body)}</p>
          ${
            sec.bullets && sec.bullets.length > 0
              ? `<ul>${sec.bullets
                  .map((bp) => `<li>${escapeHtml(bp)}</li>`)
                  .join('')}</ul>`
              : ''
          }
        </section>`
      )
      .join('\n');

    const proTipHtml = en.proTip
      ? `
      <aside>
        <h2>Studio Pro Tip</h2>
        <p>${escapeHtml(en.proTip)}</p>
      </aside>`
      : '';

    const faqsHtml = `
      <section>
        <h2>Frequently Asked Questions</h2>
        <dl>
          ${en.faqs
            .map(
              (f) =>
                `<dt>${escapeHtml(f.question)}</dt><dd>${escapeHtml(
                  f.answer
                )}</dd>`
            )
            .join('\n          ')}
        </dl>
      </section>`;

    routes.push({
      routePath,
      title: fullTitle,
      description: en.metaDescription,
      ogType: 'article',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'TechArticle',
            '@id': `${canonicalUrl}#article`,
            headline: en.title,
            description: en.metaDescription,
            image: `${SITE_ORIGIN}/og-image.png`,
            datePublished: '2026-10-15T08:00:00+00:00',
            dateModified: '2026-11-02T12:00:00+00:00',
            inLanguage: 'en',
            proficiencyLevel: 'Beginner',
            author: {
              '@type': 'Organization',
              name: 'CompressPhoto Biometric & Imaging Lab',
              url: `${SITE_ORIGIN}/about`
            },
            publisher: {
              '@type': 'Organization',
              name: 'CompressPhoto',
              url: `${SITE_ORIGIN}/`,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_ORIGIN}/favicon.svg`
              }
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonicalUrl
            },
            url: canonicalUrl,
            keywords: en.primaryKeywords.join(', ')
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${canonicalUrl}#breadcrumb`,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'CompressPhoto',
                item: `${SITE_ORIGIN}/`
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Photo Compression & QR Code Guides',
                item: `${SITE_ORIGIN}/blog`
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: en.title,
                item: canonicalUrl
              }
            ]
          },
          {
            '@type': 'FAQPage',
            '@id': `${canonicalUrl}#faq`,
            mainEntity: en.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer
              }
            }))
          }
        ]
      },
      bodyHtml: `
        <main>
          <article>
            <header>
              <p><a href="/blog">← Back to All Photo Compression &amp; QR Code Guides</a></p>
              <h1>${escapeHtml(en.title)}</h1>
              <p>
                <span>Reviewed by CompressPhoto Biometric &amp; Imaging Lab</span> •
                <time datetime="2026-11-02">Updated &amp; Verified: November 2026</time> •
                <span>Standard Format: ${escapeHtml(article.specs.dimensionsPx)} (${escapeHtml(
                  article.specs.physicalSize
                )}) — Target: ${escapeHtml(article.specs.byteCeiling)}</span>
              </p>
              <p>${escapeHtml(en.intro)}</p>
            </header>
            ${sectionsHtml}
            ${proTipHtml}
            ${faqsHtml}
          </article>
          ${navHtml}
        </main>`
    });
  }

  return routes;
}

function renderHtmlForRoute(
  templateHtml: string,
  route: StaticRouteConfig
): string {
  const canonicalUrl =
    route.routePath === '/'
      ? `${SITE_ORIGIN}/`
      : `${SITE_ORIGIN}${route.routePath}`;

  const escapedTitle = escapeHtml(route.title);
  const escapedDesc = escapeHtml(route.description);

  let html = templateHtml;

  // Replace <title>
  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapedTitle}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="description" content="${escapedDesc}" />`
  );

  // Replace og:type, og:url, og:title, og:description
  html = html.replace(
    /<meta property="og:type" content="[^"]*" \/>/,
    `<meta property="og:type" content="${route.ogType}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:title" content="${escapedTitle}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:description" content="${escapedDesc}" />`
  );

  // Replace canonical & hreflang links
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="en" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="en" href="${canonicalUrl}" />`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="fr" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="fr" href="${canonicalUrl}?lang=fr" />`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="es" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="es" href="${canonicalUrl}?lang=es" />`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="ar" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="ar" href="${canonicalUrl}?lang=ar" />`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="x-default" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`
  );

  // Replace twitter:title & twitter:description
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:title" content="${escapedTitle}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:description" content="${escapedDesc}" />`
  );

  // Replace JSON-LD script block
  html = html.replace(
    /<script id="atelier-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="atelier-jsonld" type="application/ld+json">\n${JSON.stringify(
      route.jsonLd,
      null,
      2
    )}\n    </script>`
  );

  // Inject pre-rendered semantic HTML inside <div id="root">...</div>
  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${route.bodyHtml}</div>`
  );

  return html;
}

function main() {
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error(`dist/index.html not found at ${indexHtmlPath}`);
  }

  const templateHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  const routes = buildRoutes();

  for (const route of routes) {
    const renderedHtml = renderHtmlForRoute(templateHtml, route);
    const outPath =
      route.routePath === '/'
        ? indexHtmlPath
        : path.join(DIST_DIR, route.routePath.slice(1), 'index.html');

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, renderedHtml, 'utf-8');
  }

  console.log(
    `[prerender-routes] Successfully pre-rendered ${routes.length} static HTML routes into dist/.`
  );
}

main();
