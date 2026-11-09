import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Download,
  FileArchive,
  FileCheck2,
  FileText,
  Image as ImageIcon,
  Layers,
  Lock,
  RefreshCw,
  ShieldCheck,
  Sliders,
  Trash2,
  Upload,
  AlertTriangle,
} from 'lucide-react';
import { LocaleCode } from '../types/atelier';
import {
  CONVERTER_ROUTES,
  CONVERTER_UI_LABELS,
  ConverterRouteConfig,
  getConverterRouteBySlug,
} from '../data/converterRoutes';
import {
  buildBatchZipArchive,
  classifyInputFile,
  computeTargetDimensions,
  ConvertedItemOutput,
  ConverterSettings,
  decodeFileToCanvases,
  detectAvifEncodingSupport,
  encodeFrameWithSettings,
  formatByteSize,
  renderPreparedCanvas,
  ResizeMode,
  SupportedOutputFormat,
} from '../services/imageConverterEngine';
import { composeCanvasesToPdf, PdfOrientation, PdfPageSize } from '../services/pdfComposer';
import { ReservedAdSlot } from '../config/adConfig';

export interface ImageConverterPageProps {
  locale: LocaleCode;
  converterSlug: string;
  onSelectConverterRoute: (slug: string) => void;
  onSelectCompressorTool: (toolSlug: string, targetKb?: number) => void;
}

interface QueuedFileEntry {
  id: string;
  file: File;
  status: 'queued' | 'converting' | 'done' | 'error';
  errorMessage?: string;
  outputs: ConvertedItemOutput[];
}

const DEFAULT_ICO_SIZES = [16, 32, 48, 64, 128, 256];
const FIFTY_MB_BYTES = 50 * 1024 * 1024;

export const ImageConverterPage: React.FC<ImageConverterPageProps> = ({
  locale,
  converterSlug,
  onSelectConverterRoute,
  onSelectCompressorTool,
}) => {
  const activeRoute: ConverterRouteConfig = useMemo(() => {
    return getConverterRouteBySlug(converterSlug) || CONVERTER_ROUTES[0];
  }, [converterSlug]);

  const ui = CONVERTER_UI_LABELS[locale] || CONVERTER_UI_LABELS.en;
  const isRtl = locale === 'ar';
  const fileInputId = useId();

  // Converter settings state
  const [outputFormat, setOutputFormat] = useState<SupportedOutputFormat>(
    activeRoute.defaultOutputFormat
  );
  const [quality, setQuality] = useState<number>(85);
  const [targetKbInput, setTargetKbInput] = useState<string>('');
  const [resizeMode, setResizeMode] = useState<ResizeMode>('keep');
  const [maxWidthInput, setMaxWidthInput] = useState<string>('');
  const [maxHeightInput, setMaxHeightInput] = useState<string>('');
  const [scalePercent, setScalePercent] = useState<number>(100);
  const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF');
  const [stripMetadata, setStripMetadata] = useState<boolean>(true);
  const [icoSizes, setIcoSizes] = useState<number[]>(DEFAULT_ICO_SIZES);
  const [pdfInputDpi, setPdfInputDpi] = useState<72 | 150 | 300>(150);
  const [pdfPageRange, setPdfPageRange] = useState<string>('');
  const [pdfCombineMode, setPdfCombineMode] = useState<'merged' | 'separate'>('merged');
  const [pdfPageSize, setPdfPageSize] = useState<PdfPageSize>('a4');
  const [pdfOrientation, setPdfOrientation] = useState<PdfOrientation>('auto');
  const [pdfMarginMm, setPdfMarginMm] = useState<0 | 10 | 20>(10);

  // Capabilities & Queue state
  const [avifSupported, setAvifSupported] = useState<boolean>(true);
  const [queue, setQueue] = useState<QueuedFileEntry[]>([]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [mergedPdfOutput, setMergedPdfOutput] = useState<{
    url: string;
    fileName: string;
    bytes: number;
    pageCount: number;
    targetReached: boolean;
  } | null>(null);
  const [unsupportedFormatNotice, setUnsupportedFormatNotice] = useState<string | null>(null);

  const objectUrlsRef = useRef<Set<string>>(new Set());

  const registerUrl = useCallback((url: string) => {
    objectUrlsRef.current.add(url);
  }, []);

  const revokeAllUrls = useCallback(() => {
    objectUrlsRef.current.forEach((u) => {
      try {
        URL.revokeObjectURL(u);
      } catch {
        // ignore
      }
    });
    objectUrlsRef.current.clear();
  }, []);

  // Sync default output format when navigating between dedicated converter routes
  useEffect(() => {
    setOutputFormat(activeRoute.defaultOutputFormat);
    setUnsupportedFormatNotice(null);
  }, [activeRoute]);

  // Feature-detect AVIF encoding support on mount
  useEffect(() => {
    let active = true;
    detectAvifEncodingSupport().then((supported) => {
      if (active) setAvifSupported(supported);
    });
    return () => {
      active = false;
    };
  }, []);

  // Revoke object URLs on unmount
  useEffect(() => {
    return () => {
      revokeAllUrls();
    };
  }, [revokeAllUrls]);

  // Inject JSON-LD Structured Data (SoftwareApplication, FAQPage, BreadcrumbList)
  useEffect(() => {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    const canonicalUrl = `https://compressphoto.space${prefix}/${activeRoute.slug}`;
    const schemaGraph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: activeRoute.h1,
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'All (Web Browser)',
          url: canonicalUrl,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          description: activeRoute.metaDescription,
          featureList: [
            '100% client-side browser conversion with zero server uploads',
            '7-pass binary search for exact file size in KB',
            'Batch processing with ZIP archive and multi-page PDF support',
            'Automatic EXIF and GPS metadata removal',
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: activeRoute.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'CompressPhoto',
              item: `https://compressphoto.space${prefix || '/'}`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Image Converter',
              item: `https://compressphoto.space${prefix}/image-converter`,
            },
            ...(activeRoute.slug !== 'image-converter'
              ? [
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: `${activeRoute.sourceLabel} to ${activeRoute.targetLabel}`,
                    item: canonicalUrl,
                  },
                ]
              : []),
          ],
        },
      ],
    };

    const scriptId = 'compressphoto-converter-jsonld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(schemaGraph);

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, [activeRoute, locale]);

  const currentSettings: ConverterSettings = useMemo(
    () => ({
      outputFormat,
      quality,
      targetKb: targetKbInput ? Math.max(5, Number(targetKbInput)) : null,
      resizeMode,
      maxWidth: maxWidthInput ? Math.max(16, Number(maxWidthInput)) : null,
      maxHeight: maxHeightInput ? Math.max(16, Number(maxHeightInput)) : null,
      scalePercent,
      backgroundColor,
      stripMetadata,
      icoSizes,
      pdfInputDpi,
      pdfPageRange,
      pdfCombineMode,
      pdfPageSize,
      pdfOrientation,
      pdfMarginMm,
    }),
    [
      outputFormat,
      quality,
      targetKbInput,
      resizeMode,
      maxWidthInput,
      maxHeightInput,
      scalePercent,
      backgroundColor,
      stripMetadata,
      icoSizes,
      pdfInputDpi,
      pdfPageRange,
      pdfCombineMode,
      pdfPageSize,
      pdfOrientation,
      pdfMarginMm,
    ]
  );

  const totalBatchBytes = useMemo(
    () => queue.reduce((sum, item) => sum + item.file.size, 0),
    [queue]
  );

  const hasPdfInputInQueue = useMemo(
    () =>
      activeRoute.sourceLabel === 'PDF' ||
      queue.some(
        (q) =>
          q.file.type === 'application/pdf' ||
          q.file.name.toLowerCase().endsWith('.pdf')
      ),
    [queue, activeRoute.sourceLabel]
  );

  const isLosslessOutput =
    outputFormat === 'png' ||
    outputFormat === 'bmp' ||
    outputFormat === 'gif' ||
    outputFormat === 'tiff' ||
    outputFormat === 'ico';

  const needsBackgroundColorOption =
    outputFormat === 'jpg' || outputFormat === 'bmp' || outputFormat === 'pdf';

  const runBatchConversion = useCallback(
    async (entriesToConvert: QueuedFileEntry[], settingsSnap: ConverterSettings) => {
      if (entriesToConvert.length === 0) return;
      setIsProcessing(true);
      setMergedPdfOutput(null);
      setStatusMessage(`Converting 0 / ${entriesToConvert.length}…`);

      // If PDF output + Combine Mode = 'merged' with 1+ files, also build a combined multi-page PDF
      const mergedCanvases: HTMLCanvasElement[] = [];
      let completedCount = 0;

      // Concurrency limit of 2 files at a time
      const CONCURRENCY = 2;
      let cursor = 0;

      const worker = async () => {
        while (cursor < entriesToConvert.length) {
          const index = cursor++;
          const entry = entriesToConvert[index];

          setQueue((prev) =>
            prev.map((q) =>
              q.id === entry.id ? { ...q, status: 'converting', errorMessage: undefined } : q
            )
          );

          try {
            const frames = await decodeFileToCanvases(entry.file, settingsSnap);
            const outputs: ConvertedItemOutput[] = [];

            for (const frame of frames) {
              if (settingsSnap.outputFormat === 'pdf' && settingsSnap.pdfCombineMode === 'merged') {
                const { width, height } = computeTargetDimensions(
                  frame.width,
                  frame.height,
                  settingsSnap
                );
                const prepared = renderPreparedCanvas(
                  frame.canvas,
                  width,
                  height,
                  'pdf',
                  settingsSnap.backgroundColor
                );
                mergedCanvases.push(prepared);
              }

              const out = await encodeFrameWithSettings(
                frame,
                entry.file.name,
                entry.file.size,
                settingsSnap
              );
              registerUrl(out.objectUrl);
              if (out.previewUrl !== out.objectUrl) {
                registerUrl(out.previewUrl);
              }
              outputs.push(out);
            }

            setQueue((prev) =>
              prev.map((q) =>
                q.id === entry.id ? { ...q, status: 'done', outputs } : q
              )
            );
          } catch (err) {
            const msg =
              err instanceof Error ? err.message : 'Could not decode or convert this file.';
            setQueue((prev) =>
              prev.map((q) =>
                q.id === entry.id ? { ...q, status: 'error', errorMessage: msg } : q
              )
            );
          } finally {
            completedCount++;
            setStatusMessage(`Converted ${completedCount} / ${entriesToConvert.length}`);
          }
        }
      };

      const workers = Array.from(
        { length: Math.min(CONCURRENCY, entriesToConvert.length) },
        () => worker()
      );
      await Promise.all(workers);

      // Build combined multi-page PDF if requested
      if (
        settingsSnap.outputFormat === 'pdf' &&
        settingsSnap.pdfCombineMode === 'merged' &&
        mergedCanvases.length > 0
      ) {
        try {
          setStatusMessage('Assembling combined multi-page PDF…');
          const mergedRes = await composeCanvasesToPdf(mergedCanvases, {
            pageSize: settingsSnap.pdfPageSize,
            orientation: settingsSnap.pdfOrientation,
            marginMm: settingsSnap.pdfMarginMm,
            backgroundColor: settingsSnap.backgroundColor,
            quality: Math.max(0.1, Math.min(1, settingsSnap.quality / 100)),
            targetKb: settingsSnap.targetKb || undefined,
          });
          const mergedUrl = URL.createObjectURL(mergedRes.blob);
          registerUrl(mergedUrl);
          const firstStem = entriesToConvert[0].file.name.replace(/\.[^.]+$/, '');
          const combinedName =
            entriesToConvert.length > 1
              ? `${firstStem}-merged-${mergedCanvases.length}pages.pdf`
              : `${firstStem}.pdf`;

          setMergedPdfOutput({
            url: mergedUrl,
            fileName: combinedName,
            bytes: mergedRes.blob.size,
            pageCount: mergedCanvases.length,
            targetReached: mergedRes.targetReached,
          });
        } catch {
          // Individual page PDFs remain available in the queue
        }
      }

      setIsProcessing(false);
      setStatusMessage(
        `Done — ${entriesToConvert.length} ${
          entriesToConvert.length === 1 ? 'file' : 'files'
        } processed locally.`
      );
    },
    [registerUrl]
  );

  const handleFilesAdded = useCallback(
    (fileList: FileList | File[]) => {
      const incoming = Array.from(fileList || []);
      if (incoming.length === 0) return;

      const newEntries: QueuedFileEntry[] = [];
      let unsupportedMsg: string | null = null;

      for (const file of incoming) {
        const check = classifyInputFile(file);
        if (!check.supported) {
          unsupportedMsg = check.unsupportedReason || `Unsupported file: ${file.name}`;
          newEntries.push({
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            file,
            status: 'error',
            errorMessage: check.unsupportedReason,
            outputs: [],
          });
        } else {
          newEntries.push({
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            file,
            status: 'queued',
            outputs: [],
          });
        }
      }

      if (unsupportedMsg) {
        setUnsupportedFormatNotice(unsupportedMsg);
      } else {
        setUnsupportedFormatNotice(null);
      }

      setQueue((prev) => {
        const combined = [...prev, ...newEntries];
        const validToRun = newEntries.filter((e) => e.status === 'queued');
        if (validToRun.length > 0) {
          setTimeout(() => {
            runBatchConversion(
              combined.filter((c) => c.status !== 'error'),
              currentSettings
            );
          }, 20);
        }
        return combined;
      });
    },
    [currentSettings, runBatchConversion]
  );

  const handleReconvertAll = useCallback(() => {
    const validEntries = queue.filter((q) => classifyInputFile(q.file).supported);
    if (validEntries.length === 0) return;
    runBatchConversion(validEntries, currentSettings);
  }, [queue, currentSettings, runBatchConversion]);

  const handleClearQueue = useCallback(() => {
    revokeAllUrls();
    setQueue([]);
    setMergedPdfOutput(null);
    setStatusMessage('');
    setUnsupportedFormatNotice(null);
  }, [revokeAllUrls]);

  const handleMoveQueueItem = useCallback((index: number, direction: -1 | 1) => {
    setQueue((prev) => {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const copy = [...prev];
      const [moved] = copy.splice(index, 1);
      copy.splice(targetIndex, 0, moved);
      return copy;
    });
  }, []);

  const handleRemoveQueueItem = useCallback((id: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const allCompletedOutputs = useMemo(
    () => queue.flatMap((q) => q.outputs),
    [queue]
  );

  const handleDownloadZip = useCallback(async () => {
    if (allCompletedOutputs.length === 0) return;
    try {
      setStatusMessage('Building ZIP archive in browser…');
      const zipBlob = await buildBatchZipArchive(allCompletedOutputs);
      const zipUrl = URL.createObjectURL(zipBlob);
      registerUrl(zipUrl);
      const link = document.createElement('a');
      link.href = zipUrl;
      link.download = `compressphoto-converted-${allCompletedOutputs.length}-files.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setStatusMessage(`Downloaded ZIP (${formatByteSize(zipBlob.size)})`);
    } catch {
      setStatusMessage('Could not create ZIP archive.');
    }
  }, [allCompletedOutputs, registerUrl]);

  const toggleIcoSize = (size: number) => {
    setIcoSizes((prev) => {
      if (prev.includes(size)) {
        return prev.length > 1 ? prev.filter((s) => s !== size) : prev;
      }
      return [...prev, size].sort((a, b) => a - b);
    });
  };

  const applyQuickPreset = (
    preset:
      | { type: 'kb'; kb: number }
      | { type: 'passport-35x45' }
      | { type: 'us-2x2' }
  ) => {
    if (preset.type === 'kb') {
      setTargetKbInput(String(preset.kb));
      if (isLosslessOutput) {
        setOutputFormat('jpg');
      }
    } else if (preset.type === 'passport-35x45') {
      setResizeMode('passport-35x45');
      setTargetKbInput('50');
      setOutputFormat('jpg');
    } else if (preset.type === 'us-2x2') {
      setResizeMode('us-2x2');
      setTargetKbInput('200');
      setOutputFormat('jpg');
    }
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#f8f9fa] text-[#14213d] pb-20"
    >
      {/* Hero & Tool Header */}
      <section className="bg-[#14213d] text-white border-b border-white/10 pt-8 pb-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Format Pair Breadcrumb Trail */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-[#e5e5e5]/80 mb-3"
          >
            <button
              type="button"
              onClick={() => onSelectCompressorTool('compress-photo-to-50kb', 50)}
              className="hover:text-[#fca311] transition-colors cursor-pointer"
            >
              CompressPhoto
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              onClick={() => onSelectConverterRoute('image-converter')}
              className="hover:text-[#fca311] transition-colors cursor-pointer"
            >
              Image Converter
            </button>
            {activeRoute.slug !== 'image-converter' && (
              <>
                <span aria-hidden="true">/</span>
                <span className="text-[#fca311] font-medium">
                  {activeRoute.sourceLabel} → {activeRoute.targetLabel}
                </span>
              </>
            )}
          </nav>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2.5 text-balance">
            {activeRoute.h1}
          </h1>
          <p className="text-sm sm:text-base text-[#e5e5e5] max-w-3xl leading-relaxed">
            {activeRoute.subtitle}
          </p>

          {/* Popular Format-Pair Quick Switcher */}
          <div className="mt-5 flex flex-wrap items-center gap-1.5">
            {[
              { slug: 'image-converter', label: 'All Formats' },
              { slug: 'heic-to-jpg', label: 'HEIC → JPG' },
              { slug: 'jpg-to-pdf', label: 'JPG → PDF' },
              { slug: 'pdf-to-jpg', label: 'PDF → JPG' },
              { slug: 'png-to-jpg', label: 'PNG → JPG' },
              { slug: 'webp-to-jpg', label: 'WebP → JPG' },
              { slug: 'svg-to-png', label: 'SVG → PNG' },
              { slug: 'png-to-ico', label: 'PNG → ICO' },
              { slug: 'tiff-to-jpg', label: 'TIFF → JPG' },
            ].map((tab) => {
              const isCurrent = activeRoute.slug === tab.slug;
              return (
                <button
                  key={tab.slug}
                  type="button"
                  onClick={() => onSelectConverterRoute(tab.slug)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isCurrent
                      ? 'bg-[#fca311] text-[#14213d]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Interactive Converter Studio */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-5">
        <div className="bg-white rounded-xl border border-[#e5e5e5] shadow-sm p-4 sm:p-6">
          {/* Accessible Dropzone */}
          <label
            htmlFor={fileInputId}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleFilesAdded(e.dataTransfer.files);
              }
            }}
            className={`relative block rounded-xl border-2 border-dashed p-6 sm:p-9 text-center cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[#fca311] focus-within:ring-offset-2 ${
              isDragOver
                ? 'border-[#fca311] bg-[#fca311]/10'
                : 'border-[#14213d]/25 hover:border-[#14213d] bg-[#f8f9fa]'
            }`}
          >
            <input
              id={fileInputId}
              type="file"
              multiple
              accept={activeRoute.acceptHint}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFilesAdded(e.target.files);
                  e.target.value = '';
                }
              }}
              className="sr-only"
            />
            <div className="mx-auto w-12 h-12 rounded-full bg-[#14213d] text-[#fca311] flex items-center justify-center mb-3">
              <Upload className="w-6 h-6" />
            </div>
            <strong className="block text-base sm:text-lg font-bold text-[#14213d] mb-1">
              {ui.dropTitle}
            </strong>
            <span className="block text-xs sm:text-sm text-[#14213d]/70 max-w-xl mx-auto">
              {ui.dropSub}
            </span>
            {activeRoute.slug !== 'image-converter' && (
              <span className="mt-2.5 inline-block text-xs font-medium text-[#14213d]/80">
                Optimized for <strong>{activeRoute.sourceLabel}</strong> to{' '}
                <strong>{activeRoute.targetLabel}</strong> · All 11 input formats supported
              </span>
            )}
          </label>

          {/* 50 MB Batch Memory Warning */}
          {totalBatchBytes > FIFTY_MB_BYTES && (
            <div
              role="alert"
              className="mt-4 rounded-lg border border-[#fca311] bg-[#fca311]/15 px-4 py-3 flex items-start gap-3 text-xs sm:text-sm text-[#14213d]"
            >
              <AlertTriangle className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />
              <div>
                <strong>Large Batch Notice ({formatByteSize(totalBatchBytes)}):</strong> Your
                selected files exceed 50 MB. Because all decoding runs locally in your browser RAM,
                files are processed 2 at a time to keep your device responsive.
              </div>
            </div>
          )}

          {/* Friendly Unsupported Format Guardrail Notice */}
          {unsupportedFormatNotice && (
            <div
              role="alert"
              className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 flex items-start gap-3 text-xs sm:text-sm text-red-900"
            >
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>{unsupportedFormatNotice}</div>
            </div>
          )}

          {/* Quick Size & Biometric Presets Bar */}
          <div className="mt-5 pt-4 border-t border-[#e5e5e5] flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#14213d]/70 mr-1">
              {ui.presetsHeading}:
            </span>
            {[20, 50, 100, 200].map((kb) => {
              const active = Number(targetKbInput) === kb;
              return (
                <button
                  key={kb}
                  type="button"
                  onClick={() => applyQuickPreset({ type: 'kb', kb })}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                    active
                      ? 'bg-[#14213d] text-[#fca311]'
                      : 'bg-[#f8f9fa] border border-[#e5e5e5] text-[#14213d] hover:border-[#14213d]'
                  }`}
                >
                  ≤ {kb} KB
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => applyQuickPreset({ type: 'passport-35x45' })}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                resizeMode === 'passport-35x45'
                  ? 'bg-[#14213d] text-[#fca311]'
                  : 'bg-[#f8f9fa] border border-[#e5e5e5] text-[#14213d] hover:border-[#14213d]'
              }`}
            >
              {ui.resizePassport}
            </button>
            <button
              type="button"
              onClick={() => applyQuickPreset({ type: 'us-2x2' })}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                resizeMode === 'us-2x2'
                  ? 'bg-[#14213d] text-[#fca311]'
                  : 'bg-[#f8f9fa] border border-[#e5e5e5] text-[#14213d] hover:border-[#14213d]'
              }`}
            >
              {ui.resizeUs2x2}
            </button>
            {(targetKbInput || resizeMode !== 'keep') && (
              <button
                type="button"
                onClick={() => {
                  setTargetKbInput('');
                  setResizeMode('keep');
                  setMaxWidthInput('');
                  setMaxHeightInput('');
                }}
                className="px-2.5 py-1 rounded text-xs font-medium text-[#14213d]/70 hover:text-[#14213d] underline cursor-pointer"
              >
                Reset preset
              </button>
            )}
          </div>

          {/* Conversion Settings Fieldset */}
          <fieldset className="mt-5 rounded-xl border border-[#e5e5e5] bg-[#f8f9fa] p-4 sm:p-5">
            <legend className="px-2 text-xs sm:text-sm font-bold text-[#14213d] flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#fca311]" />
              {ui.settingsLegend}
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. Output Format Selector */}
              <label className="flex flex-col gap-1.5 text-xs sm:text-sm font-semibold text-[#14213d]">
                <span>{ui.convertToLabel}</span>
                <select
                  value={outputFormat}
                  onChange={(e) =>
                    setOutputFormat(e.target.value as SupportedOutputFormat)
                  }
                  className="w-full rounded-lg border border-[#14213d]/20 bg-white px-3 py-2 text-sm text-[#14213d] font-medium focus:outline-none focus:ring-2 focus:ring-[#fca311]"
                >
                  <option value="jpg">JPG / JPEG (Universal Photo)</option>
                  <option value="png">PNG (Lossless & Transparent)</option>
                  <option value="webp">WebP (Next-Gen Web Format)</option>
                  <option value="pdf">PDF (Single or Multi-Page Document)</option>
                  <option value="avif" disabled={!avifSupported}>
                    AVIF{' '}
                    {avifSupported
                      ? '(AV1 Next-Gen Format)'
                      : '(Unsupported by your browser)'}
                  </option>
                  <option value="ico">ICO (Multi-Size Favicon 16–256px)</option>
                  <option value="tiff">TIFF (Archival Raster)</option>
                  <option value="bmp">BMP (24-bit Windows Bitmap)</option>
                  <option value="gif">GIF (Static 256-Color)</option>
                </select>
              </label>

              {/* 2. Quality Slider */}
              <label className="flex flex-col gap-1.5 text-xs sm:text-sm font-semibold text-[#14213d]">
                <span className="flex items-center justify-between">
                  <span>{ui.qualityLabel}</span>
                  <output className="font-mono tabular-nums text-[#14213d]">
                    {isLosslessOutput ? '100%' : `${quality}%`}
                  </output>
                </span>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={1}
                  value={isLosslessOutput ? 100 : quality}
                  disabled={isLosslessOutput || Boolean(targetKbInput)}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-[#14213d] disabled:opacity-40 mt-1"
                />
                <small className="text-[11px] font-normal text-[#14213d]/70">
                  {isLosslessOutput
                    ? ui.losslessNote
                    : targetKbInput
                    ? 'Auto-controlled by 7-pass Target KB search'
                    : '85% balances crisp clarity & compact size'}
                </small>
              </label>

              {/* 3. Target File Size (KB) */}
              <label className="flex flex-col gap-1.5 text-xs sm:text-sm font-semibold text-[#14213d]">
                <span>
                  {ui.targetKbLabel}{' '}
                  <small className="font-normal text-[#14213d]/60">
                    ({ui.targetKbOptional})
                  </small>
                </span>
                <input
                  type="number"
                  min={5}
                  max={50000}
                  step={5}
                  placeholder="e.g. 50"
                  value={targetKbInput}
                  onChange={(e) => setTargetKbInput(e.target.value)}
                  className="w-full rounded-lg border border-[#14213d]/20 bg-white px-3 py-2 text-sm text-[#14213d] font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-[#fca311]"
                />
                <small className="text-[11px] font-normal text-[#14213d]/70">
                  Binary-searches quality, then scales dimensions if needed
                </small>
              </label>

              {/* 4. Resize Mode Selector */}
              <label className="flex flex-col gap-1.5 text-xs sm:text-sm font-semibold text-[#14213d]">
                <span>{ui.resizeLabel}</span>
                <select
                  value={resizeMode}
                  onChange={(e) => setResizeMode(e.target.value as ResizeMode)}
                  className="w-full rounded-lg border border-[#14213d]/20 bg-white px-3 py-2 text-sm text-[#14213d] font-medium focus:outline-none focus:ring-2 focus:ring-[#fca311]"
                >
                  <option value="keep">{ui.resizeKeep}</option>
                  <option value="max-width">{ui.resizeMaxW}</option>
                  <option value="max-height">{ui.resizeMaxH}</option>
                  <option value="percentage">{ui.resizePct}</option>
                  <option value="passport-35x45">{ui.resizePassport}</option>
                  <option value="us-2x2">{ui.resizeUs2x2}</option>
                </select>
              </label>
            </div>

            {/* Contextual Resize Inputs */}
            {(resizeMode === 'max-width' ||
              resizeMode === 'max-height' ||
              resizeMode === 'percentage') && (
              <div className="mt-4 pt-3 border-t border-[#e5e5e5] grid grid-cols-1 sm:grid-cols-3 gap-4">
                {resizeMode === 'max-width' && (
                  <label className="flex flex-col gap-1 text-xs font-semibold text-[#14213d]">
                    <span>Maximum Width (px) — keeps aspect ratio</span>
                    <input
                      type="number"
                      min={16}
                      max={8000}
                      placeholder="e.g. 1200"
                      value={maxWidthInput}
                      onChange={(e) => setMaxWidthInput(e.target.value)}
                      className="rounded-lg border border-[#14213d]/20 bg-white px-3 py-1.5 text-sm font-mono tabular-nums"
                    />
                  </label>
                )}
                {resizeMode === 'max-height' && (
                  <label className="flex flex-col gap-1 text-xs font-semibold text-[#14213d]">
                    <span>Maximum Height (px) — keeps aspect ratio</span>
                    <input
                      type="number"
                      min={16}
                      max={8000}
                      placeholder="e.g. 1200"
                      value={maxHeightInput}
                      onChange={(e) => setMaxHeightInput(e.target.value)}
                      className="rounded-lg border border-[#14213d]/20 bg-white px-3 py-1.5 text-sm font-mono tabular-nums"
                    />
                  </label>
                )}
                {resizeMode === 'percentage' && (
                  <label className="flex flex-col gap-1 text-xs font-semibold text-[#14213d]">
                    <span>Scale Percentage ({scalePercent}%)</span>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      step={5}
                      value={scalePercent}
                      onChange={(e) => setScalePercent(Number(e.target.value))}
                      className="w-full accent-[#14213d]"
                    />
                  </label>
                )}
              </div>
            )}

            {/* Contextual PDF Input Controls (DPI + Page Range) */}
            {hasPdfInputInQueue && (
              <div className="mt-4 pt-3 border-t border-[#e5e5e5] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1 text-xs font-semibold text-[#14213d]">
                  <span>PDF Render Resolution (DPI)</span>
                  <select
                    value={pdfInputDpi}
                    onChange={(e) =>
                      setPdfInputDpi(Number(e.target.value) as 72 | 150 | 300)
                    }
                    className="rounded-lg border border-[#14213d]/20 bg-white px-3 py-1.5 text-sm font-medium"
                  >
                    <option value={72}>72 DPI (Fast Screen / Web Preview)</option>
                    <option value={150}>150 DPI (Standard Portal & Office Quality)</option>
                    <option value={300}>300 DPI (High-Resolution Print & OCR)</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-xs font-semibold text-[#14213d]">
                  <span>PDF Page Range (leave blank for all pages)</span>
                  <input
                    type="text"
                    placeholder="All pages — or e.g. 1-3, 5"
                    value={pdfPageRange}
                    onChange={(e) => setPdfPageRange(e.target.value)}
                    className="rounded-lg border border-[#14213d]/20 bg-white px-3 py-1.5 text-sm font-mono"
                  />
                </label>
              </div>
            )}

            {/* Contextual PDF Output Controls (Merge vs Separate, Page Size, Orientation, Margin) */}
            {outputFormat === 'pdf' && (
              <div className="mt-4 pt-3 border-t border-[#e5e5e5] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <label className="flex flex-col gap-1 text-xs font-semibold text-[#14213d]">
                  <span>PDF Combine Mode</span>
                  <select
                    value={pdfCombineMode}
                    onChange={(e) =>
                      setPdfCombineMode(e.target.value as 'merged' | 'separate')
                    }
                    className="rounded-lg border border-[#14213d]/20 bg-white px-3 py-1.5 text-sm font-medium"
                  >
                    <option value="merged">Combine all into 1 multi-page PDF</option>
                    <option value="separate">1 separate PDF per image</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-xs font-semibold text-[#14213d]">
                  <span>PDF Page Size</span>
                  <select
                    value={pdfPageSize}
                    onChange={(e) => setPdfPageSize(e.target.value as PdfPageSize)}
                    className="rounded-lg border border-[#14213d]/20 bg-white px-3 py-1.5 text-sm font-medium"
                  >
                    <option value="a4">A4 (210 × 297 mm)</option>
                    <option value="letter">US Letter (8.5 × 11 in)</option>
                    <option value="fit">Fit to image dimensions</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-xs font-semibold text-[#14213d]">
                  <span>Page Orientation</span>
                  <select
                    value={pdfOrientation}
                    disabled={pdfPageSize === 'fit'}
                    onChange={(e) =>
                      setPdfOrientation(e.target.value as PdfOrientation)
                    }
                    className="rounded-lg border border-[#14213d]/20 bg-white px-3 py-1.5 text-sm font-medium disabled:opacity-50"
                  >
                    <option value="auto">Auto (match image aspect)</option>
                    <option value="portrait">Portrait (Vertical)</option>
                    <option value="landscape">Landscape (Horizontal)</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-xs font-semibold text-[#14213d]">
                  <span>Page Margin</span>
                  <select
                    value={pdfMarginMm}
                    onChange={(e) =>
                      setPdfMarginMm(Number(e.target.value) as 0 | 10 | 20)
                    }
                    className="rounded-lg border border-[#14213d]/20 bg-white px-3 py-1.5 text-sm font-medium"
                  >
                    <option value={0}>No margin (0 mm)</option>
                    <option value={10}>Small margin (10 mm)</option>
                    <option value={20}>Standard margin (20 mm)</option>
                  </select>
                </label>
              </div>
            )}

            {/* Contextual ICO Multi-Size Selector */}
            {outputFormat === 'ico' && (
              <div className="mt-4 pt-3 border-t border-[#e5e5e5]">
                <span className="block text-xs font-semibold text-[#14213d] mb-2">
                  Embedded ICO Frame Resolutions (select one or multiple sizes to pack into a single .ico binary):
                </span>
                <div className="flex flex-wrap gap-2">
                  {DEFAULT_ICO_SIZES.map((sz) => {
                    const checked = icoSizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => toggleIcoSize(sz)}
                        className={`px-3 py-1 rounded text-xs font-mono font-semibold cursor-pointer transition-colors ${
                          checked
                            ? 'bg-[#14213d] text-[#fca311]'
                            : 'bg-white border border-[#14213d]/20 text-[#14213d]/70'
                        }`}
                      >
                        {sz}×{sz} px
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Background Fill Color & EXIF Privacy Row */}
            <div className="mt-4 pt-3 border-t border-[#e5e5e5] flex flex-wrap items-center justify-between gap-4">
              {needsBackgroundColorOption && (
                <label className="flex items-center gap-2.5 text-xs font-semibold text-[#14213d]">
                  <span>{ui.bgColorLabel}:</span>
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-8 h-8 rounded border border-[#14213d]/30 cursor-pointer bg-white p-0.5"
                  />
                  <span className="font-mono text-xs text-[#14213d]/70 uppercase">
                    {backgroundColor}
                  </span>
                </label>
              )}

              <label className="flex items-center gap-2 text-xs font-semibold text-[#14213d] cursor-pointer">
                <input
                  type="checkbox"
                  checked={stripMetadata}
                  onChange={(e) => setStripMetadata(e.target.checked)}
                  className="w-4 h-4 accent-[#14213d] rounded"
                />
                <span>{ui.stripMetaLabel}</span>
                <span className="hidden md:inline font-normal text-[#14213d]/60">
                  — {ui.stripMetaHint}
                </span>
              </label>
            </div>
          </fieldset>

          {/* Primary Action Bar & Live Status Region */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={queue.length === 0 || isProcessing}
              onClick={handleReconvertAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#14213d] text-[#fca311] font-bold text-sm hover:bg-[#14213d]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
              {ui.convertBtn}
            </button>

            {mergedPdfOutput &&
              outputFormat === 'pdf' &&
              pdfCombineMode === 'merged' && (
                <a
                  href={mergedPdfOutput.url}
                  download={mergedPdfOutput.fileName}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#fca311] text-[#14213d] font-bold text-sm hover:bg-[#fca311]/90 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  {ui.downloadMergedPdfBtn} ({mergedPdfOutput.pageCount}{' '}
                  {mergedPdfOutput.pageCount === 1 ? 'page' : 'pages'} ·{' '}
                  {formatByteSize(mergedPdfOutput.bytes)})
                </a>
              )}

            {allCompletedOutputs.length > 1 && (
              <button
                type="button"
                onClick={handleDownloadZip}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#14213d] bg-white text-[#14213d] font-semibold text-sm hover:bg-[#f8f9fa] transition-colors cursor-pointer"
              >
                <FileArchive className="w-4 h-4" />
                {ui.downloadZipBtn} ({allCompletedOutputs.length})
              </button>
            )}

            {queue.length > 0 && (
              <button
                type="button"
                onClick={handleClearQueue}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-[#e5e5e5] text-[#14213d]/80 hover:text-red-700 hover:border-red-300 text-sm font-medium transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                {ui.clearBtn}
              </button>
            )}

            <div
              role="status"
              aria-live="polite"
              className="ml-auto text-xs sm:text-sm font-medium text-[#14213d]/80 tabular-nums"
            >
              {statusMessage}
            </div>
          </div>

          {/* Multi-Page PDF Reorder Helper Banner */}
          {outputFormat === 'pdf' &&
            pdfCombineMode === 'merged' &&
            queue.length > 1 && (
              <div className="mt-4 rounded-lg border border-[#14213d]/15 bg-[#f8f9fa] px-3.5 py-2.5 flex items-center justify-between text-xs text-[#14213d]">
                <span>
                  <strong>Multi-Page PDF Order:</strong> Use the Up / Down arrows on each row
                  below to change the page order, then click <strong>Convert now</strong> to
                  rebuild your merged PDF.
                </span>
              </div>
            )}

          {/* Converted Items Queue List */}
          {queue.length > 0 && (
            <ul className="mt-5 space-y-3" aria-label="Conversion queue">
              {queue.map((entry, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === queue.length - 1;

                if (entry.status === 'error') {
                  return (
                    <li
                      key={entry.id}
                      className="rounded-xl border border-red-200 bg-red-50/70 p-3.5 flex flex-wrap items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-sm text-red-950 truncate">
                          {entry.file.name}
                        </div>
                        <div className="text-xs text-red-800 mt-0.5">
                          {entry.errorMessage || 'Conversion failed for this file.'}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveQueueItem(entry.id)}
                        className="px-2.5 py-1 text-xs font-semibold text-red-800 hover:bg-red-100 rounded cursor-pointer"
                      >
                        Remove
                      </button>
                    </li>
                  );
                }

                if (entry.status === 'queued' || entry.status === 'converting') {
                  return (
                    <li
                      key={entry.id}
                      className="rounded-xl border border-[#e5e5e5] bg-[#f8f9fa] p-3.5 flex items-center gap-3"
                    >
                      <div className="w-12 h-12 rounded-lg bg-[#14213d]/10 flex items-center justify-center shrink-0">
                        <RefreshCw className="w-5 h-5 text-[#14213d] animate-spin" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-sm text-[#14213d] truncate">
                          {entry.file.name}
                        </div>
                        <div className="text-xs text-[#14213d]/70 tabular-nums">
                          {formatByteSize(entry.file.size)} · Converting in browser…
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <React.Fragment key={entry.id}>
                    {entry.outputs.map((out) => {
                      const pctDelta = Math.round(
                        (1 - out.outputBytes / Math.max(1, out.originalBytes)) * 100
                      );
                      const deltaText =
                        pctDelta > 0
                          ? `-${pctDelta}% smaller`
                          : pctDelta < 0
                          ? `+${Math.abs(pctDelta)}%`
                          : 'same size';

                      return (
                        <li
                          key={out.id}
                          className="rounded-xl border border-[#e5e5e5] bg-white p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3.5 hover:border-[#14213d]/30 transition-colors"
                        >
                          <img
                            src={out.previewUrl}
                            alt={out.outputFileName}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-lg object-cover bg-[#f8f9fa] border border-[#e5e5e5] shrink-0"
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-bold text-sm text-[#14213d] break-all">
                                {out.outputFileName}
                              </span>
                              <span className="text-xs text-[#14213d]/60 font-mono">
                                {out.sourceFormat} → {out.outputFormat.toUpperCase()}
                              </span>
                            </div>

                            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#14213d]/80 font-mono tabular-nums">
                              <span>{formatByteSize(out.originalBytes)}</span>
                              <span aria-hidden="true">→</span>
                              <strong
                                className={
                                  out.targetReached ? 'text-emerald-700' : 'text-amber-700'
                                }
                              >
                                {formatByteSize(out.outputBytes)}
                              </strong>
                              <span>({deltaText})</span>
                              <span aria-hidden="true">·</span>
                              <span>
                                {out.width}×{out.height} px
                              </span>
                            </div>

                            {out.warningMessage && (
                              <div className="mt-1 text-xs text-amber-800">
                                {out.warningMessage}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {outputFormat === 'pdf' &&
                              pdfCombineMode === 'merged' &&
                              queue.length > 1 && (
                                <div className="flex items-center gap-1 mr-1">
                                  <button
                                    type="button"
                                    disabled={isFirst}
                                    onClick={() => handleMoveQueueItem(idx, -1)}
                                    title="Move page up"
                                    aria-label="Move page up"
                                    className="p-1.5 rounded border border-[#e5e5e5] text-[#14213d] disabled:opacity-30 hover:bg-[#f8f9fa] cursor-pointer"
                                  >
                                    <ArrowUp className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={isLast}
                                    onClick={() => handleMoveQueueItem(idx, 1)}
                                    title="Move page down"
                                    aria-label="Move page down"
                                    className="p-1.5 rounded border border-[#e5e5e5] text-[#14213d] disabled:opacity-30 hover:bg-[#f8f9fa] cursor-pointer"
                                  >
                                    <ArrowDown className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}

                            <a
                              href={out.objectUrl}
                              download={out.outputFileName}
                              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#14213d] text-white hover:bg-[#fca311] hover:text-[#14213d] font-semibold text-xs sm:text-sm transition-colors w-full sm:w-auto"
                            >
                              <Download className="w-4 h-4" />
                              Download
                            </a>
                          </div>
                        </li>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </ul>
          )}

          {/* Client-Side Privacy Assurance Bar */}
          <div className="mt-6 pt-4 border-t border-[#e5e5e5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#14213d]/75">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#fca311] shrink-0" />
              <span>{ui.privacyNote}</span>
            </div>
            <button
              type="button"
              onClick={() =>
                onSelectCompressorTool(activeRoute.compressorLinkSlug, 50)
              }
              className="inline-flex items-center gap-1 font-bold text-[#14213d] hover:text-[#fca311] transition-colors shrink-0 cursor-pointer"
            >
              <span>{activeRoute.compressorLinkAnchor}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Reserved Ad Slot #1: Below Tool (hidden by default while ADS_ENABLED = false) */}
        <ReservedAdSlot position="below-tool" />

        {/* Editorial & Technical Guide for the Active Route */}
        <article className="mt-10 space-y-10">
          {/* 150+ Word Unique Format-Pair Introduction */}
          <section className="bg-white rounded-xl border border-[#e5e5e5] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#14213d] mb-4">
              Why Convert {activeRoute.sourceLabel} to {activeRoute.targetLabel} in Your Browser?
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#14213d]/85 leading-relaxed">
              {activeRoute.introParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* 4-Step How-To Section */}
          <section className="bg-white rounded-xl border border-[#e5e5e5] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#14213d] mb-5">
              {ui.howToHeading}
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeRoute.steps.map((stepText, idx) => (
                <li
                  key={idx}
                  className="rounded-lg border border-[#e5e5e5] bg-[#f8f9fa] p-4 flex items-start gap-3.5"
                >
                  <span className="w-7 h-7 rounded-md bg-[#14213d] text-[#fca311] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span className="text-sm text-[#14213d]/90 leading-relaxed">
                    {stepText}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* Technical Format Comparison Table */}
          <section className="bg-white rounded-xl border border-[#e5e5e5] p-6 sm:p-8 overflow-x-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-[#14213d] mb-4">
              {ui.comparisonHeading}: {activeRoute.sourceLabel} vs {activeRoute.targetLabel}
            </h2>
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-[#14213d]/15 text-[#14213d]">
                  <th className="py-3 pr-4 font-bold">{ui.featureCol}</th>
                  <th className="py-3 px-4 font-bold">{activeRoute.sourceLabel}</th>
                  <th className="py-3 pl-4 font-bold text-[#14213d]">
                    {activeRoute.targetLabel}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e5e5]">
                {activeRoute.comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#f8f9fa]">
                    <td className="py-3 pr-4 font-semibold text-[#14213d]">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 text-[#14213d]/75">{row.sourceValue}</td>
                    <td className="py-3 pl-4 font-medium text-[#14213d]">
                      {row.targetValue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Reserved Ad Slot #2: In-Article (hidden by default while ADS_ENABLED = false) */}
          <ReservedAdSlot position="in-article" />

          {/* 5 Unique FAQs */}
          <section className="bg-white rounded-xl border border-[#e5e5e5] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#14213d] mb-5">
              {ui.faqHeading}
            </h2>
            <div className="divide-y divide-[#e5e5e5]">
              {activeRoute.faqs.map((faq, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                  <h3 className="text-base font-bold text-[#14213d] mb-1.5">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-[#14213d]/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Converters + Bidirectional Link to CompressPhoto Studio */}
          <section className="bg-white rounded-xl border border-[#e5e5e5] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[#14213d] mb-4">
              {ui.relatedHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {activeRoute.relatedSlugs.map((relSlug) => {
                const relRoute = getConverterRouteBySlug(relSlug);
                if (!relRoute) return null;
                return (
                  <button
                    key={relRoute.slug}
                    type="button"
                    onClick={() => onSelectConverterRoute(relRoute.slug)}
                    className="text-left rounded-lg border border-[#e5e5e5] bg-[#f8f9fa] hover:border-[#14213d] p-3.5 transition-colors cursor-pointer group"
                  >
                    <div className="font-bold text-sm text-[#14213d] group-hover:text-[#fca311] transition-colors flex items-center justify-between">
                      <span>
                        {relRoute.sourceLabel} to {relRoute.targetLabel}
                      </span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </div>
                    <p className="text-xs text-[#14213d]/70 mt-1 line-clamp-2">
                      {relRoute.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Complete Directory of All 22 Dedicated Format Pair Converters */}
            <div className="pt-5 border-t border-[#e5e5e5]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#14213d]/60 mb-3">
                All Browser-Local Format Converters
              </h3>
              <div className="flex flex-wrap gap-2">
                {CONVERTER_ROUTES.map((route) => {
                  const isCurrent = route.slug === activeRoute.slug;
                  return (
                    <button
                      key={route.slug}
                      type="button"
                      onClick={() => onSelectConverterRoute(route.slug)}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#14213d] text-[#fca311] font-semibold'
                          : 'bg-[#f8f9fa] text-[#14213d]/80 hover:text-[#14213d] border border-[#e5e5e5]'
                      }`}
                    >
                      {route.slug === 'image-converter'
                        ? 'Universal Image Converter'
                        : `${route.sourceLabel} to ${route.targetLabel}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};
