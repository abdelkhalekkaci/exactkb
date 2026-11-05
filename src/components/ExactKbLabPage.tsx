import React, { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Grid,
  MoveHorizontal,
  ShieldCheck,
  Sparkles,
  Upload
} from 'lucide-react';
import {
  BackdropMode,
  BiometricPresetId,
  CompressionResult,
  LocaleCode,
  SignatureInkColor,
  StudioStampConfig
} from '../types/atelier';
import {
  BIOMETRIC_PRESETS,
  STANDARD_KB_CEILINGS,
  TRANSLATIONS
} from '../data/seoRoutesAndTranslations';
import {
  getToolLandingBySlug,
  HOME_GEO_CONTENT,
  OFFICIAL_PORTAL_SPEC_TABLE,
  TOOL_LANDING_PAGES
} from '../data/toolLandingPages';
import { PHOTO_SEO_ARTICLES } from '../data/photoSeoArticles';
import {
  CURATED_SAMPLES,
  generateCuratedSampleDataUrl,
  SampleId
} from '../utils/sampleCanvasGenerators';
import {
  compileExactKbPdfBlob,
  generatePharmacySheetDataUrl,
  runSevenPassBinarySearch
} from '../utils/exactKbEngine';
import { VisitorVisualGuide } from './VisitorVisualGuide';

interface ExactKbLabPageProps {
  locale: LocaleCode;
  activeToolSlug: string | null;
  initialPresetId: BiometricPresetId;
  initialTargetKb: number;
  bridgedQrDataUrl: string | null;
  onClearBridgedQr: () => void;
  onSelectToolSlug: (slug: string | null) => void;
  onSelectBlogSlug: (slug: string) => void;
}

export const ExactKbLabPage: React.FC<ExactKbLabPageProps> = ({
  locale,
  activeToolSlug,
  initialPresetId,
  initialTargetKb,
  bridgedQrDataUrl,
  onClearBridgedQr,
  onSelectToolSlug,
  onSelectBlogSlug
}) => {
  const t = TRANSLATIONS[locale];
  const geo = HOME_GEO_CONTENT[locale];
  const activeLanding = getToolLandingBySlug(activeToolSlug);

  const [activeSampleId, setActiveSampleId] =
    useState<SampleId>('biometric-portrait');
  const [sourceDataUrl, setSourceDataUrl] = useState<string>(() =>
    generateCuratedSampleDataUrl('biometric-portrait')
  );
  const [sourceLabel, setSourceLabel] = useState<string>(
    'Sample Passport Photo'
  );
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);

  const [presetId, setPresetId] = useState<BiometricPresetId>(
    activeLanding ? activeLanding.presetId : initialPresetId
  );
  const [customWidth, setCustomWidth] = useState<number>(413);
  const [customHeight, setCustomHeight] = useState<number>(531);
  const [targetKb, setTargetKb] = useState<number>(
    activeLanding ? activeLanding.targetKb : initialTargetKb
  );
  const [mimeType, setMimeType] = useState<
    'image/jpeg' | 'image/webp' | 'image/png'
  >('image/jpeg');
  const [backdropMode, setBackdropMode] = useState<BackdropMode>('pure-white');

  // Wet-ink signature cleanser
  const [wetInkEnabled, setWetInkEnabled] = useState<boolean>(
    (activeLanding ? activeLanding.presetId : initialPresetId) === 'wet-ink-sig'
  );
  const [wetInkThreshold, setWetInkThreshold] = useState<number>(62);
  const [wetInkBoost, setWetInkBoost] = useState<number>(1.85);
  const [wetInkColor] = useState<SignatureInkColor>('fountain-blue');

  // Show/hide extra options so default UI stays super simple
  const [showAdvancedOptions, setShowAdvancedOptions] =
    useState<boolean>(false);

  // Split preview
  const [splitPercent, setSplitPercent] = useState<number>(50);
  const [isDraggingSplit, setIsDraggingSplit] = useState<boolean>(false);

  // Engine output
  const [compressionResult, setCompressionResult] =
    useState<CompressionResult | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  // 4x6 Pharmacy sheet modal
  const [pharmacySheetUrl, setPharmacySheetUrl] = useState<string | null>(null);
  const [showPharmacyModal, setShowPharmacyModal] = useState<boolean>(false);
  const [stampConfig, setStampConfig] = useState<StudioStampConfig>({
    enabled: true,
    studioName: 'COMPRESSPHOTO STUDIO',
    dateString: '2026-11-01',
    certificationCode: '300-DPI-VERIFIED',
    showWatermark: false,
    watermarkText: 'PROOF',
    inkColor: 'charcoal'
  });

  const [exportFeedback, setExportFeedback] = useState<string | null>(null);
  const splitContainerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync preset & target KB when landing route or initialPresetId changes
  useEffect(() => {
    const nextPreset = activeLanding ? activeLanding.presetId : initialPresetId;
    const nextKb = activeLanding ? activeLanding.targetKb : initialTargetKb;
    setPresetId(nextPreset);
    setTargetKb(nextKb);

    if (nextPreset === 'wet-ink-sig') {
      setWetInkEnabled(true);
      setBackdropMode('pure-white');
      setActiveSampleId('wet-ink-signature');
      setSourceDataUrl(generateCuratedSampleDataUrl('wet-ink-signature'));
      setSourceLabel('Sample Handwritten Signature');
    } else if (nextPreset === 'amazon-1000') {
      setWetInkEnabled(false);
      setBackdropMode('pure-white');
      setActiveSampleId('studio-product');
      setSourceDataUrl(generateCuratedSampleDataUrl('studio-product'));
      setSourceLabel('Sample Product Photo');
    } else {
      setWetInkEnabled(false);
      setBackdropMode('pure-white');
      if (activeSampleId !== 'biometric-portrait' && !bridgedQrDataUrl) {
        setActiveSampleId('biometric-portrait');
        setSourceDataUrl(generateCuratedSampleDataUrl('biometric-portrait'));
        setSourceLabel('Sample Passport Photo');
      }
    }
  }, [activeToolSlug, initialPresetId, initialTargetKb]);

  useEffect(() => {
    if (bridgedQrDataUrl) {
      setSourceDataUrl(bridgedQrDataUrl);
      setSourceLabel('QR Code from Printshop');
      setPresetId('custom');
      setCustomWidth(600);
      setCustomHeight(600);
      setTargetKb(20);
      setWetInkEnabled(false);
      setBackdropMode('original');
    }
  }, [bridgedQrDataUrl]);

  const activePreset =
    BIOMETRIC_PRESETS.find((p) => p.id === presetId) || BIOMETRIC_PRESETS[0];
  const effectiveWidth =
    presetId === 'custom' ? customWidth : activePreset.widthPx;
  const effectiveHeight =
    presetId === 'custom' ? customHeight : activePreset.heightPx;

  useEffect(() => {
    let cancelled = false;
    setIsCompressing(true);

    runSevenPassBinarySearch(
      sourceDataUrl,
      effectiveWidth,
      effectiveHeight,
      targetKb,
      mimeType,
      backdropMode,
      {
        enabled: wetInkEnabled,
        threshold: wetInkThreshold,
        contrastBoost: wetInkBoost,
        inkColor: wetInkColor
      }
    )
      .then(({ result }) => {
        if (cancelled) return;
        setCompressionResult(result);
        setIsCompressing(false);
      })
      .catch(() => {
        if (!cancelled) setIsCompressing(false);
      });

    return () => {
      cancelled = true;
    };
  }, [
    sourceDataUrl,
    effectiveWidth,
    effectiveHeight,
    targetKb,
    mimeType,
    backdropMode,
    wetInkEnabled,
    wetInkThreshold,
    wetInkBoost,
    wetInkColor
  ]);

  const loadFileObject = (file: File) => {
    onClearBridgedQr();
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSourceDataUrl(reader.result);
        setSourceLabel(`${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFileObject(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      loadFileObject(file);
    }
  };

  const handleSelectSample = (sampleId: SampleId) => {
    onClearBridgedQr();
    setActiveSampleId(sampleId);
    const sample =
      CURATED_SAMPLES.find((s) => s.id === sampleId) || CURATED_SAMPLES[0];
    setSourceDataUrl(generateCuratedSampleDataUrl(sample.id));
    setSourceLabel(sample.label);
    setPresetId(sample.recommendedPreset);
    setTargetKb(sample.recommendedKb);
    setWetInkEnabled(sample.id === 'wet-ink-signature');
  };

  const handleSelectPreset = (newPresetId: BiometricPresetId) => {
    setPresetId(newPresetId);
    const preset = BIOMETRIC_PRESETS.find((p) => p.id === newPresetId);
    if (!preset) return;
    setCustomWidth(preset.widthPx);
    setCustomHeight(preset.heightPx);
    setTargetKb(preset.recommendedKb);
    setBackdropMode(preset.defaultBackdrop);
    if (preset.isSignature) {
      setWetInkEnabled(true);
      if (activeSampleId !== 'wet-ink-signature' && !bridgedQrDataUrl) {
        setActiveSampleId('wet-ink-signature');
        setSourceDataUrl(generateCuratedSampleDataUrl('wet-ink-signature'));
        setSourceLabel('Sample Wet-Ink Signature');
      }
    } else {
      setWetInkEnabled(false);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingSplit || !splitContainerRef.current) return;
    const rect = splitContainerRef.current.getBoundingClientRect();
    const xPct = Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
    );
    setSplitPercent(Math.round(xPct));
  };

  const triggerDownload = (href: string, filename: string, message: string) => {
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setExportFeedback(message);
    setTimeout(() => setExportFeedback(null), 3500);
  };

  const handleDownloadVerifiedImage = () => {
    if (!compressionResult) return;
    const ext =
      mimeType === 'image/webp'
        ? 'webp'
        : mimeType === 'image/png'
          ? 'png'
          : 'jpg';
    triggerDownload(
      compressionResult.dataUrl,
      `compressphoto-${compressionResult.kb}KB.${ext}`,
      `Downloaded ${ext.toUpperCase()} (${compressionResult.kb} KB)`
    );
  };

  const handleDownloadExactPdf = () => {
    if (!compressionResult) return;
    const { blob, finalBytes } = compileExactKbPdfBlob(
      compressionResult.dataUrl,
      compressionResult.width,
      compressionResult.height,
      targetKb
    );
    const url = URL.createObjectURL(blob);
    const finalKb = (finalBytes / 1024).toFixed(2);
    triggerDownload(
      url,
      `compressphoto-${finalKb}KB.pdf`,
      `Downloaded PDF (${finalKb} KB)`
    );
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const handleOpenPharmacySheet = async () => {
    if (!compressionResult) return;
    const url = await generatePharmacySheetDataUrl(
      compressionResult.dataUrl,
      activePreset.name,
      activePreset.physicalSize,
      stampConfig
    );
    setPharmacySheetUrl(url);
    setShowPharmacyModal(true);
  };

  const SIMPLE_PRESETS: { id: BiometricPresetId; title: string; sub: string }[] =
    [
      {
        id: 'schengen-35x45',
        title: t.presetPassportTitle,
        sub: t.presetPassportSub
      },
      {
        id: 'us-visa-2x2',
        title: t.presetUsVisaTitle,
        sub: t.presetUsVisaSub
      },
      { id: 'wet-ink-sig', title: t.presetSigTitle, sub: t.presetSigSub },
      { id: 'custom', title: t.presetCustomTitle, sub: t.presetCustomSub }
    ];

  const langPrefix = locale === 'en' ? '' : `/${locale}`;

  const combinedFaqs = activeLanding
    ? [
        ...(activeLanding.specificFaqs[locale] ||
          activeLanding.specificFaqs.en),
        ...geo.faqs.slice(0, 4)
      ]
    : geo.faqs;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* HERO HEADER + AEO DIRECT ANSWER BLOCK */}
      <header className="text-center max-w-3xl mx-auto space-y-3">
        {activeLanding && (
          <div className="text-xs font-mono font-bold tracking-wider uppercase text-[#fca311]">
            {activeLanding.badgeText[locale]}
          </div>
        )}

        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
          {activeLanding ? activeLanding.h1[locale] : t.kbHeroTitle}
        </h1>

        <p className="text-sm sm:text-base opacity-85 leading-relaxed">
          {activeLanding ? activeLanding.subtitle[locale] : t.kbHeroSub}
        </p>

        {/* Quick-Access Interactive Preset & Portal Bar (Segmented Functional Navigation) */}
        <nav
          aria-label="Dedicated KB & Official Portal Compressors"
          className="pt-2 flex flex-wrap items-center justify-center gap-1.5"
        >
          <a
            href={langPrefix || '/'}
            onClick={(e) => {
              e.preventDefault();
              onSelectToolSlug(null);
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors cursor-pointer ${
              !activeToolSlug
                ? 'bg-[#14213d] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#14213d] border-transparent'
                : 'border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311]'
            }`}
          >
            {locale === 'fr'
              ? 'Tous les formats'
              : locale === 'es'
                ? 'Todos los formatos'
                : locale === 'ar'
                  ? 'جميع المقاسات'
                  : 'All Presets'}
          </a>
          {[
            { slug: 'compress-photo-to-20kb', label: '20 KB' },
            { slug: 'compress-photo-to-50kb', label: '50 KB' },
            { slug: 'compress-photo-to-100kb', label: '100 KB' },
            {
              slug: 'compress-signature-to-20kb',
              label:
                locale === 'fr'
                  ? 'Signature < 20 Ko'
                  : locale === 'es'
                    ? 'Firma < 20 KB'
                    : locale === 'ar'
                      ? 'توقيع < 20KB'
                      : 'Signature < 20 KB'
            },
            {
              slug: 'ants-photo-identite-50ko',
              label: '🇫🇷 France ANTS 35×45mm'
            },
            {
              slug: 'photo-cnie-maroc-35x45mm',
              label: '🇲🇦 Maroc CNIE 35×45mm'
            },
            {
              slug: 'ds160-photo-compressor-600x600',
              label: '🇺🇸 US Visa DS-160 (600×600)'
            },
            {
              slug: 'compress-photo-to-pdf-under-50kb',
              label: 'PDF ≤ 50 KB'
            }
          ].map((item) => {
            const isCurrent = activeToolSlug === item.slug;
            return (
              <a
                key={item.slug}
                href={`${langPrefix}/${item.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectToolSlug(item.slug);
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors cursor-pointer ${
                  isCurrent
                    ? 'bg-[#fca311] text-[#14213d] border-[#fca311] font-bold'
                    : 'border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </header>

      {/* STEP 1: HUGE, OBVIOUS DRAG & DROP UPLOAD BOX */}
      <div
        data-cursor-label="DROP PHOTO"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingFile(true);
        }}
        onDragLeave={() => setIsDraggingFile(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`p-8 sm:p-10 rounded-xl border-2 border-dashed transition-all text-center cursor-pointer ${
          isDraggingFile
            ? 'border-[#fca311] bg-[#fca311]/15 scale-[1.01]'
            : 'border-[#14213d]/35 dark:border-[#ffffff]/35 hover:border-[#fca311] dark:hover:border-[#fca311] bg-[#ffffff] dark:bg-[#1b2c52]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="w-16 h-16 rounded-full bg-[#fca311] text-[#14213d] flex items-center justify-center mx-auto mb-4 shadow-md">
          <Upload className="w-8 h-8 stroke-[2.2]" />
        </div>

        <div className="text-lg sm:text-xl font-bold">
          {t.dropTitle}{' '}
          <span className="underline decoration-[#fca311] decoration-2">
            {t.dropClick}
          </span>
        </div>
        <p className="text-xs sm:text-sm opacity-75 mt-1">
          {t.dropSub} <strong>{sourceLabel}</strong>
        </p>

        {/* Quick Sample Switchers (Stop propagation so clicking sample doesn't open file dialog) */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-5 pt-4 border-t border-[#14213d]/10 dark:border-[#ffffff]/10 flex flex-wrap items-center justify-center gap-2 text-xs"
        >
          <span className="opacity-70 mr-1">{t.samplePrompt}</span>
          {[
            { id: 'biometric-portrait' as SampleId, label: t.samplePassport },
            { id: 'wet-ink-signature' as SampleId, label: t.sampleSignature },
            { id: 'studio-product' as SampleId, label: t.sampleProduct }
          ].map((smp) => (
            <button
              key={smp.id}
              onClick={() => handleSelectSample(smp.id)}
              className={`px-3 py-1.5 rounded-md font-semibold border transition-colors cursor-pointer ${
                activeSampleId === smp.id && !bridgedQrDataUrl
                  ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                  : 'border-[#14213d]/25 dark:border-[#ffffff]/25 hover:border-[#fca311]'
              }`}
            >
              {smp.label}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 2 & STEP 3: SIMPLE WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT 5 COLUMNS: Simple Step 1 (Document Type) & Step 2 (Max KB) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Step 1: Document Size Preset */}
          <div className="p-6 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">{t.step1DocType}</h2>
              <span className="text-xs font-mono opacity-75 tabular-nums">
                {effectiveWidth}×{effectiveHeight} px
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SIMPLE_PRESETS.map((p) => {
                const active = presetId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPreset(p.id)}
                    className={`p-3.5 rounded-lg border text-start transition-all cursor-pointer ${
                      active
                        ? 'bg-[#fca311] text-[#14213d] border-[#fca311] font-bold shadow-xs'
                        : 'border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311]'
                    }`}
                  >
                    <div className="text-xs font-bold">{p.title}</div>
                    <div
                      className={`text-[11px] mt-0.5 ${active ? 'text-[#14213d]/85' : 'opacity-70'}`}
                    >
                      {p.sub}
                    </div>
                  </button>
                );
              })}
            </div>

            {presetId === 'custom' && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    {t.widthLabel}
                  </label>
                  <input
                    type="number"
                    min={64}
                    max={2400}
                    value={customWidth}
                    onChange={(e) =>
                      setCustomWidth(
                        Math.max(64, Number(e.target.value) || 400)
                      )
                    }
                    className="w-full px-3 py-2 text-xs font-mono rounded-md border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    {t.heightLabel}
                  </label>
                  <input
                    type="number"
                    min={64}
                    max={2400}
                    value={customHeight}
                    onChange={(e) =>
                      setCustomHeight(
                        Math.max(64, Number(e.target.value) || 400)
                      )
                    }
                    className="w-full px-3 py-2 text-xs font-mono rounded-md border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent tabular-nums"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Target KB Size */}
          <div className="p-6 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">{t.step2MaxKb}</h2>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#fca311] text-[#14213d] tabular-nums">
                Max: {targetKb} KB
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {STANDARD_KB_CEILINGS.map((kb) => {
                const active = targetKb === kb;
                return (
                  <button
                    key={kb}
                    onClick={() => setTargetKb(kb)}
                    className={`py-2.5 rounded-lg border text-xs font-mono font-bold tabular-nums transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                        : 'border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311]'
                    }`}
                  >
                    {kb} KB
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-1">
              <input
                type="range"
                min={8}
                max={500}
                value={targetKb}
                onChange={(e) => setTargetKb(Number(e.target.value))}
                className="w-full accent-[#fca311]"
              />
              <div className="flex items-center gap-1 shrink-0">
                <input
                  type="number"
                  min={5}
                  max={2000}
                  value={targetKb}
                  onChange={(e) =>
                    setTargetKb(Math.max(5, Number(e.target.value) || 20))
                  }
                  className="w-16 px-2 py-1 text-xs font-mono rounded border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent text-right tabular-nums"
                />
                <span className="text-xs font-mono">KB</span>
              </div>
            </div>
          </div>

          {/* Optional Collapsible Advanced Settings (Keeps UI clean) */}
          <div className="rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] overflow-hidden">
            <button
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              className="w-full px-6 py-4 flex items-center justify-between text-xs font-bold cursor-pointer hover:bg-[#fca311]/10 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#fca311]" />
                <span>{t.optionalCleanup}</span>
              </span>
              {showAdvancedOptions ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showAdvancedOptions && (
              <div className="px-6 pb-6 pt-2 space-y-4 border-t border-[#14213d]/10 dark:border-[#ffffff]/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">
                    {t.removeShadowLabel}
                  </span>
                  <button
                    onClick={() => setWetInkEnabled(!wetInkEnabled)}
                    className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                      wetInkEnabled
                        ? 'bg-[#fca311] text-[#14213d]'
                        : 'border border-[#14213d]/25 dark:border-[#ffffff]/25'
                    }`}
                  >
                    {wetInkEnabled ? 'ON' : 'OFF'}
                  </button>
                </div>

                {wetInkEnabled && (
                  <div className="space-y-3 pt-1">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{t.shadowStrengthLabel}</span>
                        <span className="font-mono tabular-nums">
                          {wetInkThreshold}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={25}
                        max={88}
                        value={wetInkThreshold}
                        onChange={(e) =>
                          setWetInkThreshold(Number(e.target.value))
                        }
                        className="w-full accent-[#fca311]"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{t.inkDarknessLabel}</span>
                        <span className="font-mono tabular-nums">
                          {wetInkBoost.toFixed(1)}×
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1.0}
                        max={3.0}
                        step={0.1}
                        value={wetInkBoost}
                        onChange={(e) => setWetInkBoost(Number(e.target.value))}
                        className="w-full accent-[#fca311]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold mb-2">
                    {t.backdropColorLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: 'original', label: t.backdropOriginal },
                        { id: 'pure-white', label: t.backdropWhite },
                        { id: 'id-blue', label: t.backdropBlue }
                      ] as const
                    ).map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setBackdropMode(b.id)}
                        className={`py-2 px-2 rounded text-xs font-semibold border cursor-pointer ${
                          backdropMode === b.id
                            ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                            : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2">
                    {t.outputFormatLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { mime: 'image/jpeg', label: 'JPG' },
                        { mime: 'image/webp', label: 'WebP' },
                        { mime: 'image/png', label: 'PNG' }
                      ] as const
                    ).map((fmt) => (
                      <button
                        key={fmt.mime}
                        onClick={() => setMimeType(fmt.mime)}
                        className={`py-1.5 rounded text-xs font-mono font-bold border cursor-pointer ${
                          mimeType === fmt.mime
                            ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                            : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                        }`}
                      >
                        {fmt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT 7 COLUMNS: Step 3 — Live Preview & 3 Clear Download Buttons */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-5">
            {/* Result Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#14213d]/10 dark:border-[#ffffff]/10">
              <h2 className="text-base font-bold">{t.step3PreviewDownload}</h2>
              {compressionResult && (
                <div className="flex items-center gap-2 text-xs font-mono font-bold px-3 py-1 rounded bg-[#fca311] text-[#14213d] tabular-nums">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {t.readyUnderLimit}: {compressionResult.kb} KB (&le;{' '}
                    {targetKb} KB)
                  </span>
                </div>
              )}
            </div>

            {/* Interactive Before / After Split Preview */}
            <div
              ref={splitContainerRef}
              data-cursor-label="DRAG SLIDER"
              onPointerDown={() => setIsDraggingSplit(true)}
              onPointerUp={() => setIsDraggingSplit(false)}
              onPointerLeave={() => setIsDraggingSplit(false)}
              onPointerMove={handlePointerMove}
              className="relative overflow-hidden rounded-lg border-2 border-[#14213d]/20 dark:border-[#ffffff]/20 bg-[#ffffff] select-none cursor-ew-resize mx-auto max-w-[500px]"
            >
              {compressionResult ? (
                <img
                  src={compressionResult.dataUrl}
                  alt="Compressed Biometric Photo Preview"
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[380px] object-contain block mx-auto"
                />
              ) : (
                <div className="h-[320px] flex items-center justify-center text-xs font-mono text-[#14213d]">
                  Compressing...
                </div>
              )}

              {/* Before Layer */}
              <div
                style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
                className="absolute inset-0 bg-[#ffffff]"
              >
                <img
                  src={sourceDataUrl}
                  alt="Original Photo Before Compression"
                  referrerPolicy="no-referrer"
                  className="w-full h-full max-h-[380px] object-contain block mx-auto"
                />
              </div>

              {/* Yellow Slider Handle */}
              <div
                style={{ left: `${splitPercent}%` }}
                className="absolute top-0 bottom-0 w-0.5 bg-[#fca311] pointer-events-none"
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#fca311] text-[#14213d] shadow-md flex items-center justify-center border-2 border-[#ffffff]">
                  <MoveHorizontal className="w-4 h-4" />
                </div>
              </div>

              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-[#14213d]/90 text-[#ffffff] text-[11px] font-mono pointer-events-none">
                {t.beforeLabel}
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-[#fca311] text-[#14213d] text-[11px] font-mono font-bold pointer-events-none tabular-nums">
                {t.afterLabel} (
                {compressionResult ? `${compressionResult.kb} KB` : '...'})
              </div>
            </div>

            {/* Clear 1-line explanation of the yellow Before/After line */}
            <div className="text-center text-xs opacity-80 flex items-center justify-center gap-1.5">
              <MoveHorizontal className="w-3.5 h-3.5 text-[#fca311] shrink-0" />
              <span>
                {locale === 'fr'
                  ? 'Glissez la ligne jaune à gauche ou à droite pour comparer l’Original (Gauche) et l’Image Compressée (Droite).'
                  : locale === 'es'
                    ? 'Arrastra la línea amarilla a izquierda o derecha para comparar el Original (Izquierda) y la Imagen Comprimida (Derecha).'
                    : locale === 'ar'
                      ? 'اسحب الخط الأصفر يميناً أو يساراً للمقارنة بين الصورة الأصلية (يسار) والصورة المضغوطة (يمين).'
                      : 'Drag the yellow line left or right to compare Original (Left) vs. Compressed & Whitened (Right).'}
              </span>
            </div>

            {/* Real-Time Biometric & Portal Compliance Verification Bar */}
            {compressionResult && (
              <div className="pt-2 border-t border-[#14213d]/10 dark:border-[#ffffff]/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold opacity-80">
                  {geo.checklistTitle}:
                </span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] opacity-90">
                  <span>
                    ✓ {compressionResult.kb} KB &le; {targetKb} KB
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    ✓ {effectiveWidth}×{effectiveHeight} px (300 DPI)
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>✓ {geo.checklistSrgbPass}</span>
                </div>
              </div>
            )}

            {/* Primary Download CTA + 2 Secondary Export Options */}
            <div className="space-y-3 pt-1">
              <button
                data-cursor-label="DOWNLOAD"
                onClick={handleDownloadVerifiedImage}
                disabled={isCompressing || !compressionResult}
                className="w-full py-4 px-6 rounded-lg bg-[#fca311] hover:bg-[#e5920e] text-[#14213d] text-sm font-bold flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>
                  {t.downloadCompressedBtn} (
                  {compressionResult ? `${compressionResult.kb} KB` : '...'})
                </span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleDownloadExactPdf}
                  disabled={isCompressing || !compressionResult}
                  className="py-3 px-4 rounded-lg border-2 border-[#14213d]/20 dark:border-[#ffffff]/25 hover:border-[#fca311] text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#fca311]" />
                  <span>
                    {t.downloadPdfBtn} (&le; {targetKb} KB)
                  </span>
                </button>

                <button
                  onClick={handleOpenPharmacySheet}
                  disabled={isCompressing || !compressionResult}
                  className="py-3 px-4 rounded-lg border-2 border-[#14213d]/20 dark:border-[#ffffff]/25 hover:border-[#fca311] text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Grid className="w-4 h-4 text-[#fca311]" />
                  <span>{t.printSheetBtn}</span>
                </button>
              </div>
            </div>

            {exportFeedback && (
              <div className="p-3 rounded-lg bg-[#fca311]/20 border border-[#fca311] text-xs font-mono font-bold text-center">
                ✓ {exportFeedback}
              </div>
            )}
          </div>

          {/* AEO Direct Answer & Biometric Standard Verification Box */}
          <div className="p-5 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#fca311]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{geo.eeatBadgeTitle}</span>
            </div>
            <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
              {activeLanding
                ? activeLanding.directAnswer[locale]
                : geo.directAnswer}
            </p>
          </div>
        </div>
      </div>

      {/* ILLUSTRATED VISITOR GUIDE WITH WEBSITE SCREENS & BEFORE/AFTER EXPLANATION */}
      <VisitorVisualGuide mode="exactkb" locale={locale} />

      {/* SECTION 1: OFFICIAL BIOMETRIC PORTAL SPECIFICATION TABLE (HTML <TABLE> FOR SEO & AI LLMs) */}
      <section
        aria-labelledby="official-portal-spec-table-heading"
        className="pt-8 border-t border-[#14213d]/15 dark:border-[#ffffff]/15 space-y-5"
      >
        <div className="max-w-3xl space-y-1.5">
          <h2
            id="official-portal-spec-table-heading"
            className="font-serif text-2xl sm:text-3xl font-bold tracking-tight"
          >
            {geo.specTableHeading}
          </h2>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
            {geo.specTableSub}
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52]">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#14213d]/5 dark:bg-[#ffffff]/5">
                <th className="py-3.5 px-4 font-bold">{geo.colPortal}</th>
                <th className="py-3.5 px-4 font-bold">{geo.colDimensionsMm}</th>
                <th className="py-3.5 px-4 font-bold">{geo.colPixels}</th>
                <th className="py-3.5 px-4 font-bold">{geo.colMaxKb}</th>
                <th className="py-3.5 px-4 font-bold text-right">
                  {geo.colAction}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#14213d]/10 dark:divide-[#ffffff]/10">
              {OFFICIAL_PORTAL_SPEC_TABLE.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[#fca311]/10 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <a
                      href={`${langPrefix}/${row.routeSlug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectToolSlug(row.routeSlug);
                      }}
                      className="font-bold hover:text-[#fca311] transition-colors block"
                    >
                      <span className="mr-1.5">{row.countryFlag}</span>
                      {row.portalName[locale]}
                    </a>
                    <span className="text-[11px] opacity-70 block mt-0.5">
                      {row.backgroundSpec[locale]}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono whitespace-nowrap tabular-nums">
                    {row.dimensionsMm}
                  </td>
                  <td className="py-3.5 px-4 font-mono whitespace-nowrap tabular-nums">
                    {row.dimensionsPx}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#fca311] whitespace-nowrap tabular-nums">
                    {row.targetKbLabel}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <a
                      href={`${langPrefix}/${row.routeSlug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectToolSlug(row.routeSlug);
                      }}
                      className="inline-block px-3 py-1.5 rounded-md bg-[#fca311] text-[#14213d] text-xs font-bold hover:bg-[#e5920e] transition-colors cursor-pointer"
                    >
                      {geo.applyPresetBtn}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: SEMANTIC SEO SPECIFICATION CARDS */}
      <section
        aria-labelledby="compressphoto-kb-specs-heading"
        className="pt-8 border-t border-[#14213d]/15 dark:border-[#ffffff]/15 space-y-6"
      >
        <div className="max-w-3xl space-y-2">
          <h2
            id="compressphoto-kb-specs-heading"
            className="font-serif text-2xl sm:text-3xl font-bold tracking-tight"
          >
            {t.kbSeoSectionTitle}
          </h2>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
            {t.kbSeoSectionSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.kbSeoCards.map((card, idx) => (
            <article
              key={idx}
              className="p-6 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <h3 className="font-serif text-base sm:text-lg font-bold leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs opacity-80 leading-relaxed">
                  {card.body}
                </p>
              </div>
              <ul className="space-y-1.5 pt-3 border-t border-[#14213d]/10 dark:border-[#ffffff]/10">
                {card.specs.map((spec, sIdx) => (
                  <li
                    key={sIdx}
                    className="text-xs font-medium flex items-start gap-2"
                  >
                    <span className="text-[#fca311] font-bold">•</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 3: DIAGNOSTIC GUIDE — WHY PORTAL UPLOADS GET REJECTED */}
      <section
        aria-labelledby="portal-rejection-diagnostic-heading"
        className="pt-8 border-t border-[#14213d]/15 dark:border-[#ffffff]/15 space-y-6"
      >
        <div className="max-w-3xl space-y-1.5">
          <h2
            id="portal-rejection-diagnostic-heading"
            className="font-serif text-2xl sm:text-3xl font-bold tracking-tight"
          >
            {geo.rejectionTitle}
          </h2>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
            {geo.rejectionSub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {geo.rejectionReasons.map((reason, idx) => (
            <article
              key={idx}
              className="p-5 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-2"
            >
              <h3 className="text-sm sm:text-base font-bold text-[#14213d] dark:text-[#ffffff]">
                {reason.title}
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                {reason.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 4: STRUCTURED FAQ SECTION (<dl><dt><dd> SYNCED WITH FAQPAGE JSON-LD) */}
      <section
        aria-labelledby="biometric-faq-heading"
        className="pt-8 border-t border-[#14213d]/15 dark:border-[#ffffff]/15 space-y-6"
      >
        <div className="max-w-3xl space-y-1.5">
          <h2
            id="biometric-faq-heading"
            className="font-serif text-2xl sm:text-3xl font-bold tracking-tight"
          >
            {geo.faqHeading}
          </h2>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
            {geo.faqSub}
          </p>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {combinedFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-2"
            >
              <dt className="font-serif text-sm sm:text-base font-bold leading-snug">
                {faq.question}
              </dt>
              <dd className="text-xs opacity-80 leading-relaxed">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* SECTION 5: DEDICATED PHOTO & PORTAL TOOLS + BIOMETRIC GUIDES SILO */}
      <section
        aria-labelledby="dedicated-photo-tools-silo-heading"
        className="pt-8 border-t border-[#14213d]/15 dark:border-[#ffffff]/15 space-y-6"
      >
        <div className="max-w-3xl space-y-1.5">
          <h2
            id="dedicated-photo-tools-silo-heading"
            className="font-serif text-xl sm:text-2xl font-bold tracking-tight"
          >
            {geo.dedicatedToolsHeading}
          </h2>
          <p className="text-xs sm:text-sm opacity-80">
            {geo.dedicatedToolsSub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {TOOL_LANDING_PAGES.map((tool) => (
            <a
              key={tool.slug}
              href={`${langPrefix}/${tool.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onSelectToolSlug(tool.slug);
              }}
              className={`p-4 rounded-xl border transition-colors block ${
                activeToolSlug === tool.slug
                  ? 'border-[#fca311] bg-[#fca311]/10'
                  : 'border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] hover:border-[#fca311]'
              }`}
            >
              <div className="text-xs font-bold leading-snug">
                {tool.h1[locale]}
              </div>
              <div className="text-[11px] font-mono opacity-70 mt-1">
                {tool.portalSpecs.dimensionsPx} · {tool.portalSpecs.maxKb}
              </div>
            </a>
          ))}
        </div>

        {/* Pure Photo & Biometric ID Guides Silo (10 Articles — Zero QR Dilution) */}
        <div className="pt-4 space-y-3">
          <h3 className="font-serif text-base sm:text-lg font-bold">
            {locale === 'fr'
              ? 'Guides Techniques : Photos d’Identité, Passeports & Signatures'
              : locale === 'es'
                ? 'Guías Técnicas: Fotos de Pasaporte, Visas y Firmas'
                : locale === 'ar'
                  ? 'أدلة تقنية: صور جواز السفر والتأشيرات والتوقيعات'
                  : 'Biometric Photo, Passport & Signature Engineering Guides'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {PHOTO_SEO_ARTICLES.map((article) => (
              <a
                key={article.slug}
                href={`${langPrefix}/blog/${article.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectBlogSlug(article.slug);
                }}
                className="p-3 rounded-lg border border-[#14213d]/10 dark:border-[#ffffff]/10 hover:border-[#fca311] transition-colors flex items-center justify-between gap-2"
              >
                <span className="font-medium truncate">
                  {article.translations[locale].title}
                </span>
                <span className="font-mono text-[11px] text-[#fca311] shrink-0">
                  {article.specs.byteCeiling}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4x6 Pharmacy Sheet Modal */}
      {showPharmacyModal && pharmacySheetUrl && (
        <div className="fixed inset-0 z-50 bg-[#14213d]/85 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#ffffff] dark:bg-[#1b2c52] border-2 border-[#fca311] rounded-xl max-w-3xl w-full p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-[#14213d]/15 dark:border-[#ffffff]/15 pb-4">
              <h3 className="font-serif text-xl font-bold">
                Printable 4×6 inch (10×15 cm) 8-Photo Sheet
              </h3>
              <button
                onClick={() => setShowPharmacyModal(false)}
                className="px-3 py-1.5 rounded bg-[#fca311] text-[#14213d] text-xs font-bold cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="bg-[#ffffff] p-3 rounded-lg border border-[#14213d]/20">
              <img
                src={pharmacySheetUrl}
                alt="4x6 inch 8-Photo Sheet"
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={stampConfig.enabled}
                  onChange={(e) =>
                    setStampConfig({
                      ...stampConfig,
                      enabled: e.target.checked
                    })
                  }
                  className="accent-[#fca311]"
                />
                <span>Include Studio Date Stamp</span>
              </label>

              <button
                onClick={() =>
                  triggerDownload(
                    pharmacySheetUrl,
                    `compressphoto-4x6-sheet-${presetId}.jpg`,
                    'Downloaded 4×6 inch (10×15 cm) 8-Photo Sheet'
                  )
                }
                className="py-3 px-6 rounded-lg bg-[#fca311] hover:bg-[#e5920e] text-[#14213d] text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Printable 4×6&quot; Sheet</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
