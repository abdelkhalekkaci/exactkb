import React, { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  FileText,
  Grid,
  Layers,
  MoveHorizontal,
  RotateCcw,
  ShieldCheck,
  Sliders,
  Sparkles,
  Trash2,
  Type,
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
  DEFAULT_FRAMING_OPTIONS,
  DEFAULT_NAME_DATE_SLATE,
  generatePharmacySheetDataUrl,
  NameDateSlateOptions,
  runSevenPassBinarySearch,
  StudioFramingOptions
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

interface BatchPhotoItem {
  id: string;
  fileName: string;
  originalKb: number;
  targetKb: number;
  compressedKb: number;
  dataUrl: string;
  width: number;
  height: number;
  status: 'processing' | 'done' | 'error';
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

  // FREE PRO FEATURE 1: Official Name & Date of Photo (DOP) Slate Overlay
  const [slateConfig, setSlateConfig] = useState<NameDateSlateOptions>(
    DEFAULT_NAME_DATE_SLATE
  );
  const [showSlatePanel, setShowSlatePanel] = useState<boolean>(false);

  // FREE PRO FEATURE 2: Biometric Face/Eye Grid Overlay & Framing (Zoom/Pan/Rotate/Lighting)
  const [showBiometricGrid, setShowBiometricGrid] = useState<boolean>(false);
  const [framing, setFraming] = useState<StudioFramingOptions>(
    DEFAULT_FRAMING_OPTIONS
  );
  const [showFramingPanel, setShowFramingPanel] = useState<boolean>(false);

  // FREE PRO FEATURE 3: Unlimited Multi-Photo Batch Exact-KB Queue
  const [batchItems, setBatchItems] = useState<BatchPhotoItem[]>([]);
  const [isBatchProcessing, setIsBatchProcessing] = useState<boolean>(false);

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
    dateString: '2026-11-05',
    certificationCode: '300-DPI-VERIFIED',
    showWatermark: false,
    watermarkText: 'PROOF',
    inkColor: 'charcoal'
  });

  const [exportFeedback, setExportFeedback] = useState<string | null>(null);
  const splitContainerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const batchFileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync preset & target KB when landing route or initialPresetId changes
  useEffect(() => {
    const nextPreset = activeLanding ? activeLanding.presetId : initialPresetId;
    const nextKb = activeLanding ? activeLanding.targetKb : initialTargetKb;
    setPresetId(nextPreset);
    setTargetKb(nextKb);

    if (nextPreset === 'wet-ink-sig') {
      setWetInkEnabled(true);
      setShowBiometricGrid(false);
      setBackdropMode('pure-white');
      setActiveSampleId('wet-ink-signature');
      setSourceDataUrl(generateCuratedSampleDataUrl('wet-ink-signature'));
      setSourceLabel('Sample Handwritten Signature');
    } else if (nextPreset === 'amazon-1000') {
      setWetInkEnabled(false);
      setShowBiometricGrid(false);
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
      setShowBiometricGrid(false);
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
      },
      framing,
      slateConfig
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
    wetInkColor,
    framing,
    slateConfig
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

  const processBatchFiles = async (files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter((f) =>
      f.type.startsWith('image/')
    );
    if (imageFiles.length === 0) return;

    // Also load the first file into the main interactive preview
    loadFileObject(imageFiles[0]);

    if (imageFiles.length === 1 && batchItems.length === 0) {
      return;
    }

    setIsBatchProcessing(true);
    const placeholders: BatchPhotoItem[] = imageFiles.map((file, idx) => ({
      id: `${Date.now()}-${idx}-${file.name}`,
      fileName: file.name,
      originalKb: Number((file.size / 1024).toFixed(1)),
      targetKb,
      compressedKb: 0,
      dataUrl: '',
      width: effectiveWidth,
      height: effectiveHeight,
      status: 'processing'
    }));

    setBatchItems((prev) => [...placeholders, ...prev]);

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const itemId = placeholders[i].id;
      try {
        const rawDataUrl = await new Promise<string>((resolve, reject) => {
          const r = new FileReader();
          r.onload = () =>
            typeof r.result === 'string'
              ? resolve(r.result)
              : reject(new Error('Invalid file'));
          r.onerror = () => reject(new Error('Read error'));
          r.readAsDataURL(file);
        });

        const { result } = await runSevenPassBinarySearch(
          rawDataUrl,
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
          },
          framing,
          slateConfig
        );

        setBatchItems((prev) =>
          prev.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  compressedKb: result.kb,
                  dataUrl: result.dataUrl,
                  width: result.width,
                  height: result.height,
                  status: 'done'
                }
              : item
          )
        );
      } catch {
        setBatchItems((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, status: 'error' } : item
          )
        );
      }
    }
    setIsBatchProcessing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (files.length > 1) {
      processBatchFiles(files);
    } else {
      loadFileObject(files[0]);
    }
  };

  const handleBatchUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processBatchFiles(files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    if (files.length > 1) {
      processBatchFiles(files);
    } else if (files[0].type.startsWith('image/')) {
      loadFileObject(files[0]);
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
    if (sample.id === 'wet-ink-signature') {
      setShowBiometricGrid(false);
    }
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
      setShowBiometricGrid(false);
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
      `compressphoto-${compressionResult.kb}KB-300dpi.${ext}`,
      `Downloaded 300 DPI ${ext.toUpperCase()} (${compressionResult.kb} KB)`
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
      `Downloaded ISO-32000 PDF (${finalKb} KB)`
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

  const handleDownloadAllBatch = () => {
    const doneItems = batchItems.filter((item) => item.status === 'done');
    doneItems.forEach((item, idx) => {
      setTimeout(() => {
        const cleanBase = item.fileName.replace(/\.[^.]+$/, '');
        triggerDownload(
          item.dataUrl,
          `${cleanBase}-${item.compressedKb}KB-300dpi.jpg`,
          `Downloaded ${doneItems.length} Batch Photos`
        );
      }, idx * 220);
    });
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

        {/* Quick-Access Interactive Preset & Portal Bar */}
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

      {/* STEP 1: HUGE, OBVIOUS DRAG & DROP UPLOAD BOX (SINGLE OR MULTI-PHOTO BATCH) */}
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
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileUpload}
          className="hidden"
        />
        <input
          ref={batchFileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleBatchUpload}
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

        {/* Quick Sample Switchers & Free Batch Upload Trigger */}
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

          <button
            onClick={() => batchFileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-md font-bold border border-[#fca311] text-[#14213d] dark:text-[#fca311] bg-[#fca311]/15 hover:bg-[#fca311] hover:text-[#14213d] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>
              {locale === 'fr'
                ? '+ Lot Multi-Photos (Gratuit)'
                : locale === 'es'
                  ? '+ Lote Múltiples Fotos (Gratis)'
                  : locale === 'ar'
                    ? '+ ضغط مجموعة صور دفعة واحدة (مجاناً)'
                    : '+ Batch Compress Multiple Photos (Free)'}
            </span>
          </button>
        </div>
      </div>

      {/* UNLIMITED MULTI-PHOTO BATCH QUEUE PANEL (WHEN MULTIPLE FILES DROPPED/SELECTED) */}
      {batchItems.length > 0 && (
        <section
          aria-label="Multi-Photo Batch Compression Queue"
          className="p-6 rounded-xl border-2 border-[#fca311] bg-[#ffffff] dark:bg-[#1b2c52] space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#fca311]" />
              <h2 className="font-serif text-lg font-bold">
                {locale === 'fr'
                  ? `Compression par Lot Exact-KB (${batchItems.length} photos · Plafond ≤ ${targetKb} Ko)`
                  : locale === 'es'
                    ? `Compresión por Lotes Exact-KB (${batchItems.length} fotos · Límite ≤ ${targetKb} KB)`
                    : locale === 'ar'
                      ? `ضغط الدفعات (${batchItems.length} صور · السقف ≤ ${targetKb} كيلوبايت)`
                      : `Multi-Photo Batch Exact-KB Queue (${batchItems.length} photos · Target ≤ ${targetKb} KB)`}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadAllBatch}
                disabled={isBatchProcessing}
                className="px-4 py-2 rounded-lg bg-[#fca311] hover:bg-[#e5920e] text-[#14213d] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>
                  {locale === 'fr'
                    ? 'Tout Télécharger'
                    : locale === 'es'
                      ? 'Descargar Todo'
                      : locale === 'ar'
                        ? 'تحميل الكل'
                        : 'Download All'}
                </span>
              </button>
              <button
                onClick={() => setBatchItems([])}
                className="p-2 rounded-lg border border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311] text-xs cursor-pointer"
                title="Clear Batch Queue"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#14213d]/15 dark:border-[#ffffff]/15 opacity-75">
                  <th className="py-2 px-3">File</th>
                  <th className="py-2 px-3">Original</th>
                  <th className="py-2 px-3">Locked Output (300 DPI)</th>
                  <th className="py-2 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14213d]/10 dark:divide-[#ffffff]/10">
                {batchItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2.5 px-3 font-medium truncate max-w-[200px]">
                      {item.fileName}
                    </td>
                    <td className="py-2.5 px-3 font-mono tabular-nums opacity-75">
                      {item.originalKb} KB
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#fca311] tabular-nums">
                      {item.status === 'processing'
                        ? 'Compressing...'
                        : item.status === 'done'
                          ? `✓ ${item.compressedKb} KB (${item.width}×${item.height} px)`
                          : 'Error'}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {item.status === 'done' && (
                        <button
                          onClick={() =>
                            triggerDownload(
                              item.dataUrl,
                              `${item.fileName.replace(/\.[^.]+$/, '')}-${item.compressedKb}KB.jpg`,
                              `Downloaded ${item.fileName} (${item.compressedKb} KB)`
                            )
                          }
                          className="px-3 py-1 rounded bg-[#14213d] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#14213d] font-bold cursor-pointer"
                        >
                          Download JPG
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* STEP 2 & STEP 3: SIMPLE WORKBENCH + FREE PRO STUDIO CONTROLS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT 5 COLUMNS: Step 1 (Document Type), Step 2 (Max KB), and Free Pro Tools */}
        <div className="lg:col-span-5 space-y-5">
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

          {/* FREE PRO TOOL 1: OFFICIAL NAME & DATE OF PHOTO (DOP) SLATE OVERLAY */}
          <div className="rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] overflow-hidden">
            <button
              onClick={() => setShowSlatePanel(!showSlatePanel)}
              className="w-full px-6 py-4 flex items-center justify-between text-xs font-bold cursor-pointer hover:bg-[#fca311]/10 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Type className="w-4 h-4 text-[#fca311]" />
                <span>
                  {locale === 'fr'
                    ? 'Bandeau Nom & Date sur Photo (Gratuit)'
                    : locale === 'es'
                      ? 'Rótulo Nombre y Fecha en Foto (Gratis)'
                      : locale === 'ar'
                        ? 'إضافة شريط الاسم وتاريخ الصورة (مجاناً)'
                        : 'Add Name & Date Slate on Photo (Free Pro)'}
                </span>
              </span>
              {showSlatePanel ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showSlatePanel && (
              <div className="px-6 pb-6 pt-2 space-y-3 border-t border-[#14213d]/10 dark:border-[#ffffff]/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">
                    {locale === 'fr'
                      ? 'Activer le bandeau Nom + Date'
                      : locale === 'es'
                        ? 'Activar rótulo Nombre + Fecha'
                        : locale === 'ar'
                          ? 'تفعيل شريط الاسم والتاريخ'
                          : 'Enable Name & Date Banner'}
                  </span>
                  <button
                    onClick={() =>
                      setSlateConfig({
                        ...slateConfig,
                        enabled: !slateConfig.enabled,
                        fullName: slateConfig.fullName || 'ALEXANDER SMITH'
                      })
                    }
                    className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                      slateConfig.enabled
                        ? 'bg-[#fca311] text-[#14213d]'
                        : 'border border-[#14213d]/25 dark:border-[#ffffff]/25'
                    }`}
                  >
                    {slateConfig.enabled ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-medium mb-1 opacity-80">
                      Full Name on Slate
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. RAHUL SHARMA"
                      value={slateConfig.fullName}
                      onChange={(e) =>
                        setSlateConfig({
                          ...slateConfig,
                          enabled: true,
                          fullName: e.target.value
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium mb-1 opacity-80">
                      Date of Photo (DOP)
                    </label>
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      value={slateConfig.dateText}
                      onChange={(e) =>
                        setSlateConfig({
                          ...slateConfig,
                          enabled: true,
                          dateText: e.target.value
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs font-mono rounded border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {(
                    [
                      { id: 'white-bar', label: 'White Slate (Standard)' },
                      { id: 'dark-bar', label: 'Dark Slate (Contrast)' }
                    ] as const
                  ).map((st) => (
                    <button
                      key={st.id}
                      onClick={() =>
                        setSlateConfig({
                          ...slateConfig,
                          enabled: true,
                          style: st.id
                        })
                      }
                      className={`py-1.5 px-2 rounded text-xs font-semibold border cursor-pointer ${
                        slateConfig.style === st.id
                          ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                          : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* FREE PRO TOOL 2: BIOMETRIC FRAMING, ZOOM, ROTATE & LIGHTING STUDIO */}
          <div className="rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] overflow-hidden">
            <button
              onClick={() => setShowFramingPanel(!showFramingPanel)}
              className="w-full px-6 py-4 flex items-center justify-between text-xs font-bold cursor-pointer hover:bg-[#fca311]/10 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#fca311]" />
                <span>
                  {locale === 'fr'
                    ? 'Recadrage Biométrique, Zoom & Lumière (Gratuit)'
                    : locale === 'es'
                      ? 'Encuadre Biométrico, Zoom y Luz (Gratis)'
                      : locale === 'ar'
                        ? 'ضبط المحاذاة والتكبير والإضاءة (مجاناً)'
                        : 'Biometric Crop, Zoom, Rotate & Light (Free Pro)'}
                </span>
              </span>
              {showFramingPanel ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showFramingPanel && (
              <div className="px-6 pb-6 pt-2 space-y-3 border-t border-[#14213d]/10 dark:border-[#ffffff]/10">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Zoom Scale</span>
                    <span className="font-mono tabular-nums">
                      {Math.round(framing.zoom * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1.0}
                    max={2.0}
                    step={0.02}
                    value={framing.zoom}
                    onChange={(e) =>
                      setFraming({ ...framing, zoom: Number(e.target.value) })
                    }
                    className="w-full accent-[#fca311]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Pan Horizontal</span>
                      <span className="font-mono tabular-nums">
                        {framing.panX}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={-40}
                      max={40}
                      value={framing.panX}
                      onChange={(e) =>
                        setFraming({ ...framing, panX: Number(e.target.value) })
                      }
                      className="w-full accent-[#fca311]"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Pan Vertical</span>
                      <span className="font-mono tabular-nums">
                        {framing.panY}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={-40}
                      max={40}
                      value={framing.panY}
                      onChange={(e) =>
                        setFraming({ ...framing, panY: Number(e.target.value) })
                      }
                      className="w-full accent-[#fca311]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Tilt / Rotate</span>
                      <span className="font-mono tabular-nums">
                        {framing.rotateDeg}°
                      </span>
                    </div>
                    <input
                      type="range"
                      min={-12}
                      max={12}
                      step={0.5}
                      value={framing.rotateDeg}
                      onChange={(e) =>
                        setFraming({
                          ...framing,
                          rotateDeg: Number(e.target.value)
                        })
                      }
                      className="w-full accent-[#fca311]"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Studio Brightness</span>
                      <span className="font-mono tabular-nums">
                        {framing.brightness}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={85}
                      max={125}
                      value={framing.brightness}
                      onChange={(e) =>
                        setFraming({
                          ...framing,
                          brightness: Number(e.target.value)
                        })
                      }
                      className="w-full accent-[#fca311]"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setFraming(DEFAULT_FRAMING_OPTIONS)}
                  className="w-full py-1.5 rounded border border-[#14213d]/20 dark:border-[#ffffff]/20 text-xs font-semibold flex items-center justify-center gap-1.5 hover:border-[#fca311] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Framing &amp; Lighting</span>
                </button>
              </div>
            )}
          </div>

          {/* Optional Collapsible Signature Shadow & Background Settings */}
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
                        { mime: 'image/jpeg', label: 'JPG (300 DPI)' },
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

        {/* RIGHT 7 COLUMNS: Step 3 — Live Preview, Biometric Eye-Line Grid & 3 Clear Download Buttons */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-5">
            {/* Result Status Bar + Biometric ICAO Grid Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#14213d]/10 dark:border-[#ffffff]/10">
              <h2 className="text-base font-bold">{t.step3PreviewDownload}</h2>

              <div className="flex flex-wrap items-center gap-2">
                {presetId !== 'wet-ink-sig' && (
                  <button
                    onClick={() => setShowBiometricGrid(!showBiometricGrid)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                      showBiometricGrid
                        ? 'bg-[#14213d] text-[#fca311] border-[#fca311]'
                        : 'border-[#14213d]/20 dark:border-[#ffffff]/25 hover:border-[#fca311]'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>
                      {locale === 'fr'
                        ? 'Grille Biométrique OACI'
                        : locale === 'es'
                          ? 'Guía Biométrica OACI'
                          : locale === 'ar'
                            ? 'شبكة المحاذاة البيومترية'
                            : 'ICAO Face Grid'}
                    </span>
                  </button>
                )}

                {compressionResult && (
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded bg-[#fca311] text-[#14213d] tabular-nums">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {compressionResult.kb} KB (&le; {targetKb} KB)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Before / After Split Preview + Optional Biometric Face/Eye-Line SVG Overlay */}
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

              {/* FREE PRO OVERLAY: ICAO 9303 / US DOS Biometric Head, Eye-Line & Chin Alignment Guide */}
              {showBiometricGrid && (
                <svg
                  viewBox="0 0 400 500"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  aria-hidden="true"
                >
                  {/* Vertical Center Nose Axis */}
                  <line
                    x1="200"
                    y1="20"
                    x2="200"
                    y2="480"
                    stroke="#fca311"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                  />
                  {/* Crown Top Margin Line (10% - 14%) */}
                  <line
                    x1="60"
                    y1="58"
                    x2="340"
                    y2="58"
                    stroke="#fca311"
                    strokeWidth="1.5"
                  />
                  <text
                    x="65"
                    y="51"
                    fill="#14213d"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    TOP OF HEAD (CROWN)
                  </text>
                  {/* Official Eye-Level Corridor (42% - 48%) */}
                  <rect
                    x="60"
                    y="205"
                    width="280"
                    height="32"
                    fill="#fca311"
                    fillOpacity="0.18"
                    stroke="#fca311"
                    strokeWidth="1.5"
                  />
                  <text
                    x="65"
                    y="225"
                    fill="#14213d"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    ICAO EYE-LINE ZONE
                  </text>
                  {/* Chin Bottom Line (78%) */}
                  <line
                    x1="60"
                    y1="388"
                    x2="340"
                    y2="388"
                    stroke="#fca311"
                    strokeWidth="1.5"
                  />
                  <text
                    x="65"
                    y="402"
                    fill="#14213d"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    CHIN BASE (70-80% HEAD RATIO)
                  </text>
                  {/* Biometric Head Oval */}
                  <ellipse
                    cx="200"
                    cy="223"
                    rx="96"
                    ry="165"
                    fill="none"
                    stroke="#fca311"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />
                </svg>
              )}

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
                    ✓ {effectiveWidth}×{effectiveHeight} px (300 DPI JFIF)
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
