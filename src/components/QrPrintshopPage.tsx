import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRightLeft,
  Barcode,
  Coffee,
  Contact,
  Download,
  FileCode2,
  Globe,
  MessageSquare,
  Upload,
  Wifi
} from 'lucide-react';
import {
  CenterEmblemPreset,
  FinderPatternStyle,
  LocaleCode,
  MenuPayloadData,
  ModuleDotStyle,
  QRPayloadType,
  VCardPayloadData,
  WhatsappPayloadData,
  WifiPayloadData
} from '../types/atelier';
import {
  buildRawPayloadString,
  generateVectorSvgString,
  renderSvgToHighResPngDataUrl
} from '../utils/qrAndBarcodeEngine';
import { TRANSLATIONS } from '../data/seoRoutesAndTranslations';
import { VisitorVisualGuide } from './VisitorVisualGuide';

interface QrPrintshopPageProps {
  locale: LocaleCode;
  initialPayloadType: QRPayloadType;
  onSendQrToExactKb: (pngDataUrl: string) => void;
}

export const QrPrintshopPage: React.FC<QrPrintshopPageProps> = ({
  locale,
  initialPayloadType,
  onSendQrToExactKb
}) => {
  const t = TRANSLATIONS[locale];
  const [payloadType, setPayloadType] = useState<QRPayloadType>(initialPayloadType);

  useEffect(() => {
    setPayloadType(initialPayloadType);
  }, [initialPayloadType]);

  const [wifiData, setWifiData] = useState<WifiPayloadData>({
    ssid: 'Guest_WiFi_5G',
    password: 'welcome2026',
    encryption: 'WPA',
    hidden: false
  });

  const [vcardData, setVcardData] = useState<VCardPayloadData>({
    firstName: 'Camille',
    lastName: 'Moreau',
    title: 'Creative Director',
    organization: 'Atelier Studio',
    phone: '+41 22 555 0194',
    email: 'camille@atelier.ch',
    website: 'https://atelier.ch',
    city: 'Geneva'
  });

  const [menuData, setMenuData] = useState<MenuPayloadData>({
    bistroName: 'Café Lumière',
    menuUrl: 'https://cafe-lumiere.ch/menu',
    tableNumber: '12',
    dailyNote: 'Scan for Menu',
    wifiHint: ''
  });

  const [whatsappData, setWhatsappData] = useState<WhatsappPayloadData>({
    phone: '+33614289000',
    message: 'Hello, I have a question.'
  });

  const [urlString, setUrlString] = useState<string>('https://example.com');
  const [code128String, setCode128String] = useState<string>('SKU-2026-094');

  const [finderStyle, setFinderStyle] = useState<FinderPatternStyle>('rounded');
  const [moduleStyle, setModuleStyle] = useState<ModuleDotStyle>('square');
  const [emblemPreset, setEmblemPreset] = useState<CenterEmblemPreset>('none');
  const [customEmblemUrl, setCustomEmblemUrl] = useState<string | null>(null);
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  const emblemInputRef = useRef<HTMLInputElement | null>(null);

  const rawPayload = useMemo(
    () =>
      buildRawPayloadString(payloadType, {
        wifi: wifiData,
        vcard: vcardData,
        menu: menuData,
        whatsapp: whatsappData,
        url: urlString,
        code128: code128String
      }),
    [payloadType, wifiData, vcardData, menuData, whatsappData, urlString, code128String]
  );

  const svgMarkup = useMemo(
    () =>
      generateVectorSvgString(payloadType, rawPayload, {
        fgColor: '#14213d',
        bgColor: '#ffffff',
        finderStyle,
        moduleStyle,
        emblemPreset,
        customEmblemDataUrl: customEmblemUrl
      }),
    [payloadType, rawPayload, finderStyle, moduleStyle, emblemPreset, customEmblemUrl]
  );

  const handleEmblemFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomEmblemUrl(reader.result);
        setEmblemPreset('custom');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadSvg = () => {
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr-${payloadType}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    setExportStatus('Downloaded Vector SVG (.svg)');
    setTimeout(() => setExportStatus(null), 3500);
  };

  const handleDownload1200Png = async () => {
    const w = 1200;
    const h = payloadType === 'code128' ? 500 : 1200;
    const pngUrl = await renderSvgToHighResPngDataUrl(svgMarkup, w, h);
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = `qr-${payloadType}-1200px.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setExportStatus('Downloaded High-Res PNG (1200 px)');
    setTimeout(() => setExportStatus(null), 3500);
  };

  const handleBridgeToExactKb = async () => {
    const w = payloadType === 'code128' ? 1000 : 800;
    const h = payloadType === 'code128' ? 420 : 800;
    const pngUrl = await renderSvgToHighResPngDataUrl(svgMarkup, w, h);
    onSendQrToExactKb(pngUrl);
  };

  const PAYLOAD_TABS: { id: QRPayloadType; label: string; icon: React.ReactNode }[] = [
    { id: 'url', label: t.qrTabUrl, icon: <Globe className="w-4 h-4" /> },
    { id: 'wifi', label: t.qrTabWifi, icon: <Wifi className="w-4 h-4" /> },
    { id: 'vcard', label: t.qrTabVcard, icon: <Contact className="w-4 h-4" /> },
    { id: 'menu', label: t.qrTabMenu, icon: <Coffee className="w-4 h-4" /> },
    { id: 'whatsapp', label: t.qrTabWhatsapp, icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'code128', label: t.qrTabBarcode, icon: <Barcode className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* CLEAN, SIMPLE HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
          {t.qrHeroTitle}
        </h1>
        <p className="text-sm sm:text-base opacity-80">
          {t.qrHeroSub}
        </p>
      </div>

      {/* STEP 1: PICK QR TYPE */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {PAYLOAD_TABS.map((tab) => {
          const active = payloadType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setPayloadType(tab.id)}
              className={`py-3 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                active
                  ? 'bg-[#fca311] text-[#14213d] border-[#fca311] shadow-xs'
                  : 'bg-[#ffffff] dark:bg-[#1b2c52] border-[#14213d]/20 dark:border-[#ffffff]/20 hover:border-[#fca311]'
              }`}
            >
              {tab.icon}
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* STEP 2 & STEP 3: INPUTS + LIVE PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT 6 COLUMNS: Simple Input Fields */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-4">
            <h2 className="text-base font-bold border-b border-[#14213d]/10 dark:border-[#ffffff]/10 pb-3">
              {t.qrStep1Details}
            </h2>

            {payloadType === 'url' && (
              <div>
                <label className="block text-xs font-semibold mb-1.5">Website Link (URL)</label>
                <input
                  type="url"
                  value={urlString}
                  onChange={(e) => setUrlString(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                />
              </div>
            )}

            {payloadType === 'wifi' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Wi-Fi Network Name (SSID)</label>
                  <input
                    type="text"
                    value={wifiData.ssid}
                    onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Wi-Fi Password</label>
                  <input
                    type="text"
                    value={wifiData.password}
                    onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
              </div>
            )}

            {payloadType === 'vcard' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">First Name</label>
                    <input
                      type="text"
                      value={vcardData.firstName}
                      onChange={(e) => setVcardData({ ...vcardData, firstName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Last Name</label>
                    <input
                      type="text"
                      value={vcardData.lastName}
                      onChange={(e) => setVcardData({ ...vcardData, lastName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Phone</label>
                    <input
                      type="text"
                      value={vcardData.phone}
                      onChange={(e) => setVcardData({ ...vcardData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      value={vcardData.email}
                      onChange={(e) => setVcardData({ ...vcardData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Company / Title</label>
                  <input
                    type="text"
                    value={vcardData.organization}
                    onChange={(e) => setVcardData({ ...vcardData, organization: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
              </div>
            )}

            {payloadType === 'menu' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Restaurant / Café Name</label>
                  <input
                    type="text"
                    value={menuData.bistroName}
                    onChange={(e) => setMenuData({ ...menuData, bistroName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Menu Link (URL)</label>
                  <input
                    type="url"
                    value={menuData.menuUrl}
                    onChange={(e) => setMenuData({ ...menuData, menuUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
              </div>
            )}

            {payloadType === 'whatsapp' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">WhatsApp Phone Number</label>
                  <input
                    type="text"
                    value={whatsappData.phone}
                    onChange={(e) => setWhatsappData({ ...whatsappData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Message</label>
                  <input
                    type="text"
                    value={whatsappData.message}
                    onChange={(e) => setWhatsappData({ ...whatsappData, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent"
                  />
                </div>
              </div>
            )}

            {payloadType === 'code128' && (
              <div>
                <label className="block text-xs font-semibold mb-1">Barcode Text / SKU</label>
                <input
                  type="text"
                  maxLength={28}
                  value={code128String}
                  onChange={(e) => setCode128String(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 bg-transparent uppercase"
                />
              </div>
            )}
          </div>

          {/* Simple Style Controls */}
          {payloadType !== 'code128' && (
            <div className="p-6 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-4">
              <h2 className="text-base font-bold">{t.qrStep2Customize}</h2>

              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'square', label: 'Square Corners' },
                    { id: 'rounded', label: 'Rounded Corners' },
                    { id: 'diamond', label: 'Diamond Corners' }
                  ] as const
                ).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFinderStyle(f.id)}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border cursor-pointer ${
                      finderStyle === f.id
                        ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                        : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'square', label: 'Square Dots' },
                    { id: 'dots', label: 'Round Dots' },
                    { id: 'bars', label: 'Vertical Bars' }
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setModuleStyle(m.id)}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border cursor-pointer ${
                      moduleStyle === m.id
                        ? 'bg-[#fca311] text-[#14213d] border-[#fca311]'
                        : 'border-[#14213d]/20 dark:border-[#ffffff]/20'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <input
                  ref={emblemInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  onChange={handleEmblemFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => emblemInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-lg border border-[#14213d]/25 dark:border-[#ffffff]/25 hover:border-[#fca311] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-[#fca311]" />
                  <span>{t.uploadCenterLogo}</span>
                </button>

                {emblemPreset !== 'none' && (
                  <button
                    onClick={() => setEmblemPreset('none')}
                    className="text-xs underline opacity-75 hover:opacity-100 cursor-pointer"
                  >
                    {t.removeLogo}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT 6 COLUMNS: Clean QR Preview & Download */}
        <div className="lg:col-span-6">
          <div className="p-6 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-5 text-center">
            <h2 className="text-base font-bold text-start border-b border-[#14213d]/10 dark:border-[#ffffff]/10 pb-3">
              {t.qrStep3Preview}
            </h2>

            <div className="p-6 rounded-xl bg-[#ffffff] border-2 border-[#14213d]/15 max-w-[280px] mx-auto flex items-center justify-center">
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: svgMarkup }}
              />
            </div>

            <div className="space-y-3 pt-2">
              <button
                data-cursor-label="DOWNLOAD"
                onClick={handleDownload1200Png}
                className="w-full py-4 px-6 rounded-lg bg-[#fca311] hover:bg-[#e5920e] text-[#14213d] text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>{t.downloadHighResPng}</span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleDownloadSvg}
                  className="py-3 px-4 rounded-lg border-2 border-[#14213d]/20 dark:border-[#ffffff]/25 hover:border-[#fca311] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileCode2 className="w-4 h-4 text-[#fca311]" />
                  <span>{t.downloadVectorSvg}</span>
                </button>

                <button
                  onClick={handleBridgeToExactKb}
                  className="py-3 px-4 rounded-lg border-2 border-[#14213d]/20 dark:border-[#ffffff]/25 hover:border-[#fca311] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowRightLeft className="w-4 h-4 text-[#fca311]" />
                  <span>{t.compressQrUnder20Kb}</span>
                </button>
              </div>
            </div>

            {exportStatus && (
              <div className="p-3 rounded-lg bg-[#fca311]/20 border border-[#fca311] text-xs font-mono font-bold">
                ✓ {exportStatus}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ILLUSTRATED VISITOR GUIDE WITH WEBSITE SCREENS FOR QR GENERATOR */}
      <VisitorVisualGuide mode="qr" locale={locale} />
    </div>
  );
};
