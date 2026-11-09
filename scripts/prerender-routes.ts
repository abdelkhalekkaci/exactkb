import fs from 'node:fs';
import path from 'node:path';
import { PHOTO_SEO_ARTICLES } from '../src/data/photoSeoArticles';
import { QR_SEO_ARTICLES } from '../src/data/qrSeoArticles';
import {
  LOCALIZED_ROUTE_META,
  TRANSLATIONS
} from '../src/data/seoRoutesAndTranslations';
import {
  HOME_GEO_CONTENT,
  OFFICIAL_PORTAL_SPEC_TABLE,
  TOOL_LANDING_PAGES,
  ToolLandingPageConfig
} from '../src/data/toolLandingPages';
import {
  CONVERTER_ROUTES,
  CONVERTER_UI_LABELS,
  ConverterRouteConfig
} from '../src/data/converterRoutes';
import { LocaleCode } from '../src/types/atelier';

const SITE_ORIGIN = 'https://compressphoto.space';
const DIST_DIR = path.resolve(process.cwd(), 'dist');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const LOCALES: LocaleCode[] = ['en', 'fr', 'es', 'ar'];

interface StaticRouteConfig {
  locale: LocaleCode;
  basePath: string; // e.g. '/', '/compress-photo-to-20kb', '/qr', '/blog/slug'
  localizedPath: string; // e.g. '/', '/fr', '/fr/ants-photo-identite-50ko'
  title: string;
  description: string;
  ogType: 'website' | 'article';
  priority: string;
  changefreq: 'weekly' | 'monthly';
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

function getLocalizedUrlPath(locale: LocaleCode, basePath: string): string {
  if (locale === 'en') return basePath;
  return basePath === '/' ? `/${locale}` : `/${locale}${basePath}`;
}

/**
 * Silo-pure navigation for Photo Compression & Biometric ID pages
 * (Excludes unrelated QR café menu / Wi-Fi blog links to protect topical authority)
 */
function buildPhotoSiloNavHtml(locale: LocaleCode): string {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const toolLinks = TOOL_LANDING_PAGES.map(
    (tool) =>
      `<li><a href="${prefix}/${escapeHtml(tool.slug)}">${escapeHtml(
        tool.h1[locale]
      )}</a></li>`
  ).join('\n          ');

  const photoArticleLinks = PHOTO_SEO_ARTICLES.map(
    (a) =>
      `<li><a href="${prefix}/blog/${escapeHtml(a.slug)}">${escapeHtml(
        a.translations[locale].title
      )}</a></li>`
  ).join('\n          ');

  const converterLinks = CONVERTER_ROUTES.map(
    (c) =>
      `<li><a href="${prefix}/${escapeHtml(c.slug)}">${escapeHtml(
        c.h1
      )}</a></li>`
  ).join('\n          ');

  return `
    <nav aria-label="Biometric Photo, Image Converter &amp; KB Compression Directory">
      <h2>${escapeHtml(HOME_GEO_CONTENT[locale].dedicatedToolsHeading)}</h2>
      <ul>
        <li><a href="${prefix || '/'}">${escapeHtml(
          TRANSLATIONS[locale].kbHeroTitle
        )}</a></li>
        ${toolLinks}
      </ul>
      <h2>Universal Image &amp; PDF Format Converters</h2>
      <ul>
        ${converterLinks}
      </ul>
      <h2>Biometric Photo, Passport &amp; Signature Guides</h2>
      <ul>
        ${photoArticleLinks}
      </ul>
      <ul>
        <li><a href="${prefix}/blog">${escapeHtml(
          TRANSLATIONS[locale].navBlog
        )}</a></li>
        <li><a href="${prefix}/about">${escapeHtml(
          TRANSLATIONS[locale].navAbout
        )}</a></li>
        <li><a href="${prefix}/privacy">${escapeHtml(
          TRANSLATIONS[locale].navPrivacy
        )}</a></li>
        <li><a href="${prefix}/legal">${escapeHtml(
          TRANSLATIONS[locale].navLegal
        )}</a></li>
        <li><a href="${prefix}/contact">${escapeHtml(
          TRANSLATIONS[locale].navContact
        )}</a></li>
      </ul>
    </nav>`;
}

/**
 * Silo-pure navigation for the /qr Static Vector QR & Barcode Studio
 */
function buildQrSiloNavHtml(locale: LocaleCode): string {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const qrArticleLinks = QR_SEO_ARTICLES.map(
    (a) =>
      `<li><a href="${prefix}/blog/${escapeHtml(a.slug)}">${escapeHtml(
        a.translations[locale].title
      )}</a></li>`
  ).join('\n          ');

  return `
    <nav aria-label="Static Vector QR Code & Barcode Guides">
      <h2>Permanent Static QR Code &amp; CODE-128 Barcode Guides</h2>
      <ul>
        <li><a href="${prefix}/qr">${escapeHtml(
          TRANSLATIONS[locale].navQrStudio
        )}</a></li>
        ${qrArticleLinks}
      </ul>
      <ul>
        <li><a href="${prefix || '/'}">${escapeHtml(
          TRANSLATIONS[locale].navCompress
        )}</a></li>
        <li><a href="${prefix}/image-converter">${escapeHtml(
          TRANSLATIONS[locale].navConverter
        )}</a></li>
        <li><a href="${prefix}/about">${escapeHtml(
          TRANSLATIONS[locale].navAbout
        )}</a></li>
        <li><a href="${prefix}/privacy">${escapeHtml(
          TRANSLATIONS[locale].navPrivacy
        )}</a></li>
      </ul>
    </nav>`;
}

function buildPhotoToolBodyHtml(
  locale: LocaleCode,
  landing: ToolLandingPageConfig | null
): string {
  const t = TRANSLATIONS[locale];
  const geo = HOME_GEO_CONTENT[locale];
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const h1 = landing ? landing.h1[locale] : t.kbHeroTitle;
  const subtitle = landing ? landing.subtitle[locale] : t.kbHeroSub;
  const directAnswer = landing
    ? landing.directAnswer[locale]
    : geo.directAnswer;

  const faqs = landing
    ? [
        ...(landing.specificFaqs[locale] || landing.specificFaqs.en),
        ...geo.faqs.slice(0, 4)
      ]
    : geo.faqs;

  const tableRowsHtml = OFFICIAL_PORTAL_SPEC_TABLE.map(
    (row) => `
            <tr>
              <td><a href="${prefix}/${escapeHtml(row.routeSlug)}">${escapeHtml(
                row.countryFlag
              )} ${escapeHtml(row.portalName[locale])}</a></td>
              <td>${escapeHtml(row.dimensionsMm)}</td>
              <td>${escapeHtml(row.dimensionsPx)}</td>
              <td>${escapeHtml(row.targetKbLabel)}</td>
              <td>${escapeHtml(row.backgroundSpec[locale])}</td>
            </tr>`
  ).join('');

  const rejectionHtml = geo.rejectionReasons
    .map(
      (r) => `
          <article>
            <h3>${escapeHtml(r.title)}</h3>
            <p>${escapeHtml(r.desc)}</p>
          </article>`
    )
    .join('');

  const seoCardsHtml = t.kbSeoCards
    .map(
      (card) => `
          <article>
            <h3>${escapeHtml(card.title)}</h3>
            <p>${escapeHtml(card.body)}</p>
            <ul>
              ${card.specs
                .map((s) => `<li>${escapeHtml(s)}</li>`)
                .join('\n              ')}
            </ul>
          </article>`
    )
    .join('');

  const faqsHtml = faqs
    .map(
      (f) =>
        `<dt>${escapeHtml(f.question)}</dt><dd>${escapeHtml(f.answer)}</dd>`
    )
    .join('\n          ');

  return `
      <main>
        <header>
          <h1>${escapeHtml(h1)}</h1>
          <p>${escapeHtml(subtitle)}</p>
          <p><strong>${escapeHtml(geo.eeatBadgeTitle)}:</strong> ${escapeHtml(
            directAnswer
          )}</p>
        </header>
        <section>
          <h2>1. ${escapeHtml(t.step1DocType)}</h2>
          <h2>2. ${escapeHtml(t.step2MaxKb)}</h2>
          <h2>3. ${escapeHtml(t.step3PreviewDownload)}</h2>
        </section>
        <section>
          <h2>${escapeHtml(geo.specTableHeading)}</h2>
          <p>${escapeHtml(geo.specTableSub)}</p>
          <table>
            <thead>
              <tr>
                <th>${escapeHtml(geo.colPortal)}</th>
                <th>${escapeHtml(geo.colDimensionsMm)}</th>
                <th>${escapeHtml(geo.colPixels)}</th>
                <th>${escapeHtml(geo.colMaxKb)}</th>
                <th>Background / Standard</th>
              </tr>
            </thead>
            <tbody>
              ${tableRowsHtml}
            </tbody>
          </table>
        </section>
        <section>
          <h2>${escapeHtml(t.kbSeoSectionTitle)}</h2>
          <p>${escapeHtml(t.kbSeoSectionSub)}</p>
          ${seoCardsHtml}
        </section>
        <section>
          <h2>${escapeHtml(geo.rejectionTitle)}</h2>
          <p>${escapeHtml(geo.rejectionSub)}</p>
          ${rejectionHtml}
        </section>
        <section>
          <h2>${escapeHtml(geo.faqHeading)}</h2>
          <dl>
            ${faqsHtml}
          </dl>
        </section>
        ${buildPhotoSiloNavHtml(locale)}
      </main>`;
}

function buildPhotoToolJsonLd(
  locale: LocaleCode,
  canonicalUrl: string,
  title: string,
  description: string,
  landing: ToolLandingPageConfig | null
): Record<string, unknown> {
  const t = TRANSLATIONS[locale];
  const geo = HOME_GEO_CONTENT[locale];
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const homeUrl = `${SITE_ORIGIN}${prefix || '/'}`;

  const faqs = landing
    ? [
        ...(landing.specificFaqs[locale] || landing.specificFaqs.en),
        ...geo.faqs.slice(0, 4)
      ]
    : geo.faqs;

  const breadcrumbs = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'CompressPhoto',
      item: homeUrl
    }
  ];

  if (landing) {
    breadcrumbs.push({
      '@type': 'ListItem',
      position: 2,
      name: landing.h1[locale],
      item: canonicalUrl
    });
  }

  return {
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
        description: LOCALIZED_ROUTE_META[locale].compress.description,
        publisher: { '@id': `${SITE_ORIGIN}/#organization` },
        inLanguage: ['en', 'fr', 'es', 'ar']
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${canonicalUrl}#software`,
        name: title,
        url: canonicalUrl,
        image: `${SITE_ORIGIN}/og-image.png`,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All',
        inLanguage: locale,
        description,
        featureList: [
          '7-Pass Binary Search Image Compression (10KB, 20KB, 50KB, 100KB, 200KB)',
          '35x45 mm (413x531 px @ 300 DPI) ICAO 9303 Biometric Passport & ANTS/CNIE Calibration',
          '2x2 inch (600x600 px @ 300 DPI) US Visa DS-160 & Green Card DV Lottery Preset',
          'Handwritten Wet-Ink Signature Paper Shadow Removal (< 20KB)',
          'ISO-32000 Target-KB PDF Wrapper & 4x6 inch 8-Photo Sheet Generator',
          '100% Client-Side Browser RAM Processing (Zero Server Uploads)'
        ],
        publisher: { '@id': `${SITE_ORIGIN}/#organization` },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      },
      {
        '@type': 'HowTo',
        '@id': `${canonicalUrl}#howto`,
        name: landing ? landing.h1[locale] : t.kbHeroTitle,
        description,
        totalTime: 'PT15S',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: t.step1DocType,
            text: 'Upload your photo or signature and choose an official 300 DPI biometric preset (35×45 mm Passport, 2×2 inch US Visa, or Handwritten Signature).'
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: t.step2MaxKb,
            text: 'Select your strict kilobyte ceiling (10KB, 20KB, 50KB, 100KB, or 200KB). The 7-pass binary search engine locks the exact byte size automatically.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: t.step3PreviewDownload,
            text: 'Inspect sharpness with the Before/After optical split slider and download your verified JPG, WebP, PNG, ISO-32000 PDF, or 4×6 inch 8-photo print sheet.'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbs
      }
    ]
  };
}

function buildRoutes(): StaticRouteConfig[] {
  const routes: StaticRouteConfig[] = [];

  for (const locale of LOCALES) {
    const t = TRANSLATIONS[locale];
    const metaMap = LOCALIZED_ROUTE_META[locale];
    const prefix = locale === 'en' ? '' : `/${locale}`;

    // 1. Homepage ('/' or '/fr', '/es', '/ar')
    const homeLocalizedPath = getLocalizedUrlPath(locale, '/');
    const homeCanonicalUrl = `${SITE_ORIGIN}${homeLocalizedPath}`;
    routes.push({
      locale,
      basePath: '/',
      localizedPath: homeLocalizedPath,
      title: metaMap.compress.title,
      description: metaMap.compress.description,
      ogType: 'website',
      priority: locale === 'en' ? '1.0' : '0.95',
      changefreq: 'weekly',
      jsonLd: buildPhotoToolJsonLd(
        locale,
        homeCanonicalUrl,
        metaMap.compress.title,
        metaMap.compress.description,
        null
      ),
      bodyHtml: buildPhotoToolBodyHtml(locale, null)
    });

    // 2. All Dedicated Compressor Tool Landing Pages
    for (const landing of TOOL_LANDING_PAGES) {
      const basePath = `/${landing.slug}`;
      const localizedPath = getLocalizedUrlPath(locale, basePath);
      const canonicalUrl = `${SITE_ORIGIN}${localizedPath}`;
      const title = landing.title[locale];
      const description = landing.metaDescription[locale];

      routes.push({
        locale,
        basePath,
        localizedPath,
        title,
        description,
        ogType: 'website',
        priority: '0.92',
        changefreq: 'weekly',
        jsonLd: buildPhotoToolJsonLd(
          locale,
          canonicalUrl,
          title,
          description,
          landing
        ),
        bodyHtml: buildPhotoToolBodyHtml(locale, landing)
      });
    }

    // 2B. All 23 Image & Document Converter Routes (/image-converter + 22 format pairs)
    const convUi = CONVERTER_UI_LABELS[locale] || CONVERTER_UI_LABELS.en;
    for (const conv of CONVERTER_ROUTES) {
      const basePath = `/${conv.slug}`;
      const localizedPath = getLocalizedUrlPath(locale, basePath);
      const canonicalUrl = `${SITE_ORIGIN}${localizedPath}`;

      const comparisonRowsHtml = conv.comparisonRows
        .map(
          (r) => `
              <tr>
                <td>${escapeHtml(r.feature)}</td>
                <td>${escapeHtml(r.sourceValue)}</td>
                <td>${escapeHtml(r.targetValue)}</td>
              </tr>`
        )
        .join('');

      const stepsHtml = conv.steps
        .map((s) => `<li>${escapeHtml(s)}</li>`)
        .join('\n            ');

      const faqsHtml = conv.faqs
        .map(
          (f) =>
            `<dt>${escapeHtml(f.question)}</dt><dd>${escapeHtml(f.answer)}</dd>`
        )
        .join('\n            ');

      routes.push({
        locale,
        basePath,
        localizedPath,
        title: conv.title,
        description: conv.metaDescription,
        ogType: 'website',
        priority: conv.slug === 'image-converter' ? '0.94' : '0.90',
        changefreq: 'weekly',
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'SoftwareApplication',
              '@id': `${canonicalUrl}#software`,
              name: conv.h1,
              url: canonicalUrl,
              applicationCategory: 'MultimediaApplication',
              operatingSystem: 'All (Web Browser)',
              inLanguage: locale,
              description: conv.metaDescription,
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              }
            },
            {
              '@type': 'FAQPage',
              '@id': `${canonicalUrl}#faq`,
              mainEntity: conv.faqs.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.answer
                }
              }))
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${canonicalUrl}#breadcrumb`,
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'CompressPhoto',
                  item: `${SITE_ORIGIN}${prefix || '/'}`
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Image Converter',
                  item: `${SITE_ORIGIN}${prefix}/image-converter`
                },
                ...(conv.slug !== 'image-converter'
                  ? [
                      {
                        '@type': 'ListItem',
                        position: 3,
                        name: `${conv.sourceLabel} to ${conv.targetLabel}`,
                        item: canonicalUrl
                      }
                    ]
                  : [])
              ]
            }
          ]
        },
        bodyHtml: `
        <main>
          <header>
            <h1>${escapeHtml(conv.h1)}</h1>
            <p>${escapeHtml(conv.subtitle)}</p>
          </header>
          <section>
            <h2>Why Convert ${escapeHtml(conv.sourceLabel)} to ${escapeHtml(
              conv.targetLabel
            )} in Your Browser?</h2>
            <p>${escapeHtml(conv.introParagraphs[0])}</p>
            <p>${escapeHtml(conv.introParagraphs[1])}</p>
          </section>
          <section>
            <h2>${escapeHtml(convUi.howToHeading)}</h2>
            <ol>
              ${stepsHtml}
            </ol>
          </section>
          <section>
            <h2>${escapeHtml(convUi.comparisonHeading)}: ${escapeHtml(
              conv.sourceLabel
            )} vs ${escapeHtml(conv.targetLabel)}</h2>
            <table>
              <thead>
                <tr>
                  <th>${escapeHtml(convUi.featureCol)}</th>
                  <th>${escapeHtml(conv.sourceLabel)}</th>
                  <th>${escapeHtml(conv.targetLabel)}</th>
                </tr>
              </thead>
              <tbody>
                ${comparisonRowsHtml}
              </tbody>
            </table>
          </section>
          <section>
            <h2>${escapeHtml(convUi.faqHeading)}</h2>
            <dl>
              ${faqsHtml}
            </dl>
          </section>
          <p><a href="${prefix}/${escapeHtml(
            conv.compressorLinkSlug
          )}">${escapeHtml(conv.compressorLinkAnchor)}</a></p>
          ${buildPhotoSiloNavHtml(locale)}
        </main>`
      });
    }

    // 3. '/qr' (Isolated QR Studio Silo)
    const qrBasePath = '/qr';
    const qrLocalizedPath = getLocalizedUrlPath(locale, qrBasePath);
    const qrCanonicalUrl = `${SITE_ORIGIN}${qrLocalizedPath}`;
    routes.push({
      locale,
      basePath: qrBasePath,
      localizedPath: qrLocalizedPath,
      title: metaMap.qr.title,
      description: metaMap.qr.description,
      ogType: 'website',
      priority: '0.88',
      changefreq: 'weekly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: metaMap.qr.title,
        url: qrCanonicalUrl,
        image: `${SITE_ORIGIN}/og-image.png`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        inLanguage: locale,
        description: metaMap.qr.description,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
      },
      bodyHtml: `
      <main>
        <header>
          <h1>${escapeHtml(t.qrHeroTitle)}</h1>
          <p>${escapeHtml(t.qrHeroSub)}</p>
        </header>
        <section>
          <h2>1. ${escapeHtml(t.qrStep1Details)}</h2>
          <h2>2. ${escapeHtml(t.qrStep2Customize)}</h2>
          <h2>3. ${escapeHtml(t.qrStep3Preview)}</h2>
        </section>
        <section>
          <h2>${escapeHtml(t.qrSeoSectionTitle)}</h2>
          <p>${escapeHtml(t.qrSeoSectionSub)}</p>
          ${t.qrSeoCards
            .map(
              (c) => `
          <article>
            <h3>${escapeHtml(c.title)}</h3>
            <p>${escapeHtml(c.body)}</p>
            <ul>${c.specs.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
          </article>`
            )
            .join('')}
        </section>
        ${buildQrSiloNavHtml(locale)}
      </main>`
    });

    // 4. '/blog' Hub
    const allArticles = [
      ...PHOTO_SEO_ARTICLES.map((a) => ({ ...a, domain: 'photo' as const })),
      ...QR_SEO_ARTICLES.map((q) => ({ ...q, domain: 'qr' as const }))
    ];
    const blogBasePath = '/blog';
    const blogLocalizedPath = getLocalizedUrlPath(locale, blogBasePath);
    const blogCanonicalUrl = `${SITE_ORIGIN}${blogLocalizedPath}`;
    const blogTitle =
      locale === 'fr'
        ? 'Guides Compression Photo & QR Code | CompressPhoto'
        : locale === 'es'
          ? 'Guías de Compresión de Fotos y Códigos QR | CompressPhoto'
          : locale === 'ar'
            ? 'أدلة ضغط الصور وإنشاء رموز QR | CompressPhoto'
            : 'Photo Compression & QR Code Guides | CompressPhoto';
    const blogDesc =
      locale === 'fr'
        ? 'Tutoriels étape par étape pour compresser vos photos au Ko exact (20 Ko, 50 Ko, 100 Ko, ANTS, CNIE, Signatures) et générer des QR codes statiques.'
        : locale === 'es'
          ? 'Tutoriales paso a paso para comprimir fotos al KB exacto (20KB, 50KB, 100KB, Pasaporte, Firma) y crear códigos QR estáticos permanentes.'
          : locale === 'ar'
            ? 'شروحات خطوة بخطوة لضغط الصور بالكيلوبايت الدقيق (20 و50 و100 كيلوبايت، جواز السفر، التوقيع) وإنشاء رموز QR ثابتة.'
            : 'Step-by-step tutorials on compressing photos to exact kilobyte limits (20KB, 50KB, 100KB, Passports, Signatures) and generating permanent static QR codes.';

    routes.push({
      locale,
      basePath: blogBasePath,
      localizedPath: blogLocalizedPath,
      title: blogTitle,
      description: blogDesc,
      ogType: 'website',
      priority: '0.85',
      changefreq: 'weekly',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: blogTitle,
        description: blogDesc,
        url: blogCanonicalUrl,
        inLanguage: locale,
        publisher: {
          '@type': 'Organization',
          name: 'CompressPhoto',
          url: `${SITE_ORIGIN}/`
        }
      },
      bodyHtml: `
      <main>
        <header>
          <h1>${escapeHtml(blogTitle)}</h1>
          <p>${escapeHtml(blogDesc)}</p>
        </header>
        <section>
          <h2>All 20 Technical Tutorials</h2>
          ${allArticles
            .map(
              (a) => `
            <article>
              <h3><a href="${prefix}/blog/${escapeHtml(a.slug)}">${escapeHtml(
                a.translations[locale].title
              )}</a></h3>
              <p>${escapeHtml(a.translations[locale].excerpt)}</p>
            </article>`
            )
            .join('\n')}
        </section>
        ${buildPhotoSiloNavHtml(locale)}
      </main>`
    });

    // 5. Info & Legal Pages (/about, /legal, /privacy, /contact)
    const infoRoutes: Array<{
      basePath: string;
      metaKey: 'about' | 'legal' | 'privacy' | 'contact';
      priority: string;
    }> = [
      { basePath: '/about', metaKey: 'about', priority: '0.65' },
      { basePath: '/legal', metaKey: 'legal', priority: '0.50' },
      { basePath: '/privacy', metaKey: 'privacy', priority: '0.55' },
      { basePath: '/contact', metaKey: 'contact', priority: '0.60' }
    ];

    for (const info of infoRoutes) {
      const localizedPath = getLocalizedUrlPath(locale, info.basePath);
      const canonicalUrl = `${SITE_ORIGIN}${localizedPath}`;
      const meta = metaMap[info.metaKey];
      routes.push({
        locale,
        basePath: info.basePath,
        localizedPath,
        title: meta.title,
        description: meta.description,
        ogType: 'website',
        priority: info.priority,
        changefreq: 'monthly',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: meta.title,
          description: meta.description,
          url: canonicalUrl,
          inLanguage: locale,
          isPartOf: { '@id': `${SITE_ORIGIN}/#website` }
        },
        bodyHtml: `
        <main>
          <article>
            <h1>${escapeHtml(meta.title)}</h1>
            <p>${escapeHtml(meta.description)}</p>
          </article>
          ${buildPhotoSiloNavHtml(locale)}
        </main>`
      });
    }

    // 6. All 20 Blog Articles in each locale
    for (const article of allArticles) {
      const locContent = article.translations[locale];
      const basePath = `/blog/${article.slug}`;
      const localizedPath = getLocalizedUrlPath(locale, basePath);
      const canonicalUrl = `${SITE_ORIGIN}${localizedPath}`;
      const fullTitle = `${locContent.title} | CompressPhoto`;

      const sectionsHtml = locContent.sections
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

      const proTipHtml = locContent.proTip
        ? `
      <aside>
        <h2>Studio Pro Tip</h2>
        <p>${escapeHtml(locContent.proTip)}</p>
      </aside>`
        : '';

      const faqsHtml = `
      <section>
        <h2>Frequently Asked Questions</h2>
        <dl>
          ${locContent.faqs
            .map(
              (f) =>
                `<dt>${escapeHtml(f.question)}</dt><dd>${escapeHtml(
                  f.answer
                )}</dd>`
            )
            .join('\n          ')}
        </dl>
      </section>`;

      const siloNav =
        article.domain === 'qr'
          ? buildQrSiloNavHtml(locale)
          : buildPhotoSiloNavHtml(locale);

      routes.push({
        locale,
        basePath,
        localizedPath,
        title: fullTitle,
        description: locContent.metaDescription,
        ogType: 'article',
        priority: '0.82',
        changefreq: 'monthly',
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'TechArticle',
              '@id': `${canonicalUrl}#article`,
              headline: locContent.title,
              description: locContent.metaDescription,
              image: `${SITE_ORIGIN}/og-image.png`,
              datePublished: '2026-10-15T08:00:00+00:00',
              dateModified: '2026-11-05T12:00:00+00:00',
              inLanguage: locale,
              proficiencyLevel: 'Beginner',
              author: {
                '@type': 'Organization',
                name: 'CompressPhoto Biometric & Imaging Lab',
                url: `${SITE_ORIGIN}${prefix}/about`
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
              keywords: locContent.primaryKeywords.join(', ')
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${canonicalUrl}#breadcrumb`,
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'CompressPhoto',
                  item: `${SITE_ORIGIN}${prefix || '/'}`
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: blogTitle,
                  item: `${SITE_ORIGIN}${prefix}/blog`
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: locContent.title,
                  item: canonicalUrl
                }
              ]
            },
            {
              '@type': 'FAQPage',
              '@id': `${canonicalUrl}#faq`,
              mainEntity: locContent.faqs.map((f) => ({
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
              <p><a href="${prefix}/blog">← ${escapeHtml(blogTitle)}</a></p>
              <h1>${escapeHtml(locContent.title)}</h1>
              <p>
                <span>Reviewed by CompressPhoto Biometric &amp; Imaging Lab</span> •
                <time datetime="2026-11-05">Updated &amp; Verified: November 2026</time> •
                <span>Standard Format: ${escapeHtml(
                  article.specs.dimensionsPx
                )} (${escapeHtml(article.specs.physicalSize)}) — Target: ${escapeHtml(
                  article.specs.byteCeiling
                )}</span>
              </p>
              <p>${escapeHtml(locContent.intro)}</p>
            </header>
            ${sectionsHtml}
            ${proTipHtml}
            ${faqsHtml}
          </article>
          ${siloNav}
        </main>`
      });
    }
  }

  return routes;
}

function renderHtmlForRoute(
  templateHtml: string,
  route: StaticRouteConfig
): string {
  const selfCanonicalUrl = `${SITE_ORIGIN}${route.localizedPath}`;
  const enAlternateUrl = `${SITE_ORIGIN}${getLocalizedUrlPath('en', route.basePath)}`;
  const frAlternateUrl = `${SITE_ORIGIN}${getLocalizedUrlPath('fr', route.basePath)}`;
  const esAlternateUrl = `${SITE_ORIGIN}${getLocalizedUrlPath('es', route.basePath)}`;
  const arAlternateUrl = `${SITE_ORIGIN}${getLocalizedUrlPath('ar', route.basePath)}`;

  const escapedTitle = escapeHtml(route.title);
  const escapedDesc = escapeHtml(route.description);
  const dir = route.locale === 'ar' ? 'rtl' : 'ltr';

  let html = templateHtml;

  // Replace <html lang="en" dir="ltr">
  html = html.replace(
    /<html\s+lang="[^"]*"\s+dir="[^"]*">/,
    `<html lang="${route.locale}" dir="${dir}">`
  );

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
    `<meta property="og:url" content="${selfCanonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:title" content="${escapedTitle}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:description" content="${escapedDesc}" />`
  );

  // Replace self-referencing canonical & clean subdirectory hreflang links
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${selfCanonicalUrl}" />`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="en" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="en" href="${enAlternateUrl}" />`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="fr" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="fr" href="${frAlternateUrl}" />`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="es" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="es" href="${esAlternateUrl}" />`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="ar" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="ar" href="${arAlternateUrl}" />`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="x-default" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="x-default" href="${enAlternateUrl}" />`
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

function generateSitemapXml(routes: StaticRouteConfig[]): string {
  const urlEntries = routes
    .map((route) => {
      const locUrl = `${SITE_ORIGIN}${route.localizedPath}`;
      const enUrl = `${SITE_ORIGIN}${getLocalizedUrlPath('en', route.basePath)}`;
      const frUrl = `${SITE_ORIGIN}${getLocalizedUrlPath('fr', route.basePath)}`;
      const esUrl = `${SITE_ORIGIN}${getLocalizedUrlPath('es', route.basePath)}`;
      const arUrl = `${SITE_ORIGIN}${getLocalizedUrlPath('ar', route.basePath)}`;

      return `  <url>
    <loc>${locUrl}</loc>
    <lastmod>2026-11-09</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="fr" href="${frUrl}" />
    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${arUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />
  </url>`;
    })
    .join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urlEntries}
</urlset>
`;
}

function generateLlmsTxt(): string {
  const toolLines = TOOL_LANDING_PAGES.map(
    (t) => `- [${t.h1.en}](${SITE_ORIGIN}/${t.slug})`
  ).join('\n');

  const frToolLines = TOOL_LANDING_PAGES.map(
    (t) => `- [${t.h1.fr}](${SITE_ORIGIN}/fr/${t.slug})`
  ).join('\n');

  const photoBlogLines = PHOTO_SEO_ARTICLES.map(
    (a) => `- [${a.translations.en.title}](${SITE_ORIGIN}/blog/${a.slug})`
  ).join('\n');

  const qrBlogLines = QR_SEO_ARTICLES.map(
    (q) => `- [${q.translations.en.title}](${SITE_ORIGIN}/blog/${q.slug})`
  ).join('\n');

  const converterLines = CONVERTER_ROUTES.map(
    (c) => `- [${c.h1}](${SITE_ORIGIN}/${c.slug})`
  ).join('\n');

  return `# CompressPhoto (${SITE_ORIGIN})

> CompressPhoto is a 100% private, browser-based passport photo, visa portrait, handwritten signature compression studio, and universal image & PDF format converter. It converts between HEIC, PDF, PNG, JPG, WebP, AVIF, TIFF, SVG, BMP, GIF, and ICO and locks files to target kilobyte limits (10KB, 20KB, 30KB, 50KB, 100KB, 200KB, 500KB) at 300 DPI.

- Full Documentation: [${SITE_ORIGIN}/llms-full.txt](${SITE_ORIGIN}/llms-full.txt)
- Sitemap (All 304 Multilingual URLs): [${SITE_ORIGIN}/sitemap.xml](${SITE_ORIGIN}/sitemap.xml)

## Multilingual Studio Editions
- English (Global): [${SITE_ORIGIN}/](${SITE_ORIGIN}/)
- Français (France ANTS / Campus France / Maroc CNIE / Schengen): [${SITE_ORIGIN}/fr](${SITE_ORIGIN}/fr)
- Español (Pasaporte / Visa EE.UU. DS-160): [${SITE_ORIGIN}/es](${SITE_ORIGIN}/es)
- العربية (البطاقة الوطنية المغربية CNIE / جواز السفر / تأشيرة أمريكا): [${SITE_ORIGIN}/ar](${SITE_ORIGIN}/ar)

## Dedicated Photo, Signature & Official Portal Tools (English)
${toolLines}

## Universal Image & PDF Format Converters (23 Tools)
${converterLines}

## Outils Dédiés Photo d'Identité, ANTS, CNIE & Concours (Français)
${frToolLines}

## Photo & Signature Compression Guides (${PHOTO_SEO_ARTICLES.length} Articles)
${photoBlogLines}

## Static QR Code & Print Guides (${QR_SEO_ARTICLES.length} Articles)
- [Static QR Code & CODE-128 Barcode Generator](${SITE_ORIGIN}/qr)
${qrBlogLines}

## Information & Legal Pages
- [Blog & Guides Hub](${SITE_ORIGIN}/blog)
- [About CompressPhoto](${SITE_ORIGIN}/about)
- [Privacy Policy](${SITE_ORIGIN}/privacy)
- [Legal Notice & Terms](${SITE_ORIGIN}/legal)
- [Contact](${SITE_ORIGIN}/contact)
`;
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
      route.localizedPath === '/'
        ? indexHtmlPath
        : path.join(DIST_DIR, route.localizedPath.slice(1), 'index.html');

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, renderedHtml, 'utf-8');
  }

  // Generate and write synchronized multilingual sitemap.xml to both public/ and dist/
  const sitemapXml = generateSitemapXml(routes);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');

  // Generate and write synchronized llms.txt to both public/ and dist/
  const llmsTxt = generateLlmsTxt();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), llmsTxt, 'utf-8');
  fs.writeFileSync(path.join(DIST_DIR, 'llms.txt'), llmsTxt, 'utf-8');

  console.log(
    `[prerender-routes] Successfully pre-rendered ${routes.length} localized static HTML routes (EN, FR, ES, AR) and updated sitemap.xml & llms.txt.`
  );
}

main();

