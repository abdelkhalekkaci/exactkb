import React, { useMemo } from 'react';
import {
  ArrowRightLeft,
  CheckCircle2,
  Download,
  FileCode2,
  FileText,
  Globe,
  Grid,
  MoveHorizontal,
  QrCode,
  ShieldCheck,
  Sparkles,
  Upload,
  Wifi
} from 'lucide-react';
import { LocaleCode } from '../types/atelier';
import { generateCuratedSampleDataUrl } from '../utils/sampleCanvasGenerators';

interface VisitorVisualGuideProps {
  mode: 'compress' | 'qr';
  locale: LocaleCode;
}

interface GuideCopy {
  badge: string;
  kbTitle: string;
  kbSub: string;
  kbStep1Title: string;
  kbStep1Desc: string;
  kbStep2Title: string;
  kbStep2Desc: string;
  kbStep3Title: string;
  kbStep3Desc: string;
  sliderExplainTitle: string;
  sliderExplainDesc: string;
  sliderLeftTag: string;
  sliderRightTag: string;
  sigBeforeTag: string;
  sigAfterTag: string;
  sigExplainTitle: string;
  sigExplainDesc: string;
  qrTitle: string;
  qrSub: string;
  qrStep1Title: string;
  qrStep1Desc: string;
  qrStep2Title: string;
  qrStep2Desc: string;
  qrStep3Title: string;
  qrStep3Desc: string;
  qrForeverTitle: string;
  qrForeverDesc: string;
}

const GUIDE_COPY: Record<LocaleCode, GuideCopy> = {
  en: {
    badge: 'VISUAL USER GUIDE · HOW IT WORKS',
    kbTitle: 'How to Compress Your Photo or Signature in 3 Simple Steps',
    kbSub: 'Follow the visual screens below to prepare your passport photo, visa portrait, or handwritten signature in seconds.',
    kbStep1Title: 'Step 1 — Drop Your Photo or Signature',
    kbStep1Desc: 'Drag and drop any JPG, PNG, or WebP file into the top box (or click to browse from your phone or computer). Everything stays 100% private inside your browser.',
    kbStep2Title: 'Step 2 — Select Document Type & Max KB',
    kbStep2Desc: 'Click a ready-made official preset (Passport 35×45 mm, US Visa 2×2", or Signature < 20 KB) and choose your strict maximum kilobyte limit (10 KB to 500 KB).',
    kbStep3Title: 'Step 3 — Compare & Download Instantly',
    kbStep3Desc: 'Slide the yellow Before/After line to inspect image sharpness, then download your verified JPG, a Target-KB PDF, or a printable 4×6" 8-photo pharmacy sheet.',
    sliderExplainTitle: 'What is the Yellow "Before / After" Line in the Preview?',
    sliderExplainDesc: 'The vertical yellow line is an interactive comparison slider. The LEFT side ("Before") shows your original uploaded file with its original background. The RIGHT side ("After") shows the final compressed & whitened image at your exact KB target. Drag the round handle left or right to verify there is zero blur before downloading.',
    sliderLeftTag: 'LEFT = Original Photo (Off-white / Uncompressed)',
    sliderRightTag: 'RIGHT = Studio White + Locked Under Target KB',
    sigBeforeTag: 'BEFORE: Phone Camera Gray Paper Shadow',
    sigAfterTag: 'AFTER: Pure White Paper & Crisp Ink (< 18 KB)',
    sigExplainTitle: 'Automatic Signature Shadow Removal (< 20 KB)',
    sigExplainDesc: 'Took a photo of your signature with your phone? Turn on "Remove Signature Paper Shadow" to erase gray lighting shadows and turn the paper pure white #FFFFFF.',
    qrTitle: 'How to Create a Permanent Vector QR Code or Barcode',
    qrSub: 'Unlike subscription QR websites that deactivate your code after a free trial, our generator encodes your data directly into the image so it works forever.',
    qrStep1Title: 'Step 1 — Choose Your QR Type & Enter Info',
    qrStep1Desc: 'Select Website URL, Wi-Fi Auto-Connect, Business Card (vCard 3.0), Café Menu, WhatsApp, or Retail Barcode, then type your details.',
    qrStep2Title: 'Step 2 — Customize Corner Style & Center Logo',
    qrStep2Desc: 'Pick Square, Rounded, or Diamond corner markers, choose dot shapes, and optionally upload your brand logo in the center.',
    qrStep3Title: 'Step 3 — Download Print SVG, 1200px PNG, or < 20 KB',
    qrStep3Desc: 'Download a crisp 1200×1200 px PNG for web/social media, a scalable Vector SVG for professional printing, or send it to the KB Compressor.',
    qrForeverTitle: 'Why Our QR Codes Never Expire (100% Direct Encoding)',
    qrForeverDesc: 'Standard QR generators encode a middleman tracking link that expires unless you pay monthly. We encode your actual URL, Wi-Fi password, or vCard directly into the dots—meaning zero tracking and infinite lifetime.'
  },
  fr: {
    badge: 'GUIDE VISUEL · MODE D’EMPLOI',
    kbTitle: 'Comment Compresser Votre Photo ou Signature en 3 Étapes',
    kbSub: 'Suivez les écrans illustrés ci-dessous pour calibrer votre photo de passeport, visa ou signature manuscrite en quelques secondes.',
    kbStep1Title: 'Étape 1 — Déposez Votre Photo ou Signature',
    kbStep1Desc: 'Glissez votre fichier JPG, PNG ou WebP dans la grande zone en haut (ou cliquez pour choisir un fichier). Tout reste 100% privé sur votre appareil.',
    kbStep2Title: 'Étape 2 — Choisissez le Format & la Limite en Ko',
    kbStep2Desc: 'Sélectionnez un format officiel (Passeport 35×45 mm, Visa USA 2×2", ou Signature < 20 Ko) puis cliquez sur le poids maximum autorisé (ex. 20 Ko ou 50 Ko).',
    kbStep3Title: 'Étape 3 — Comparez & Téléchargez',
    kbStep3Desc: 'Déplacez la ligne jaune Avant/Après pour vérifier la netteté, puis téléchargez l’image vérifiée, le PDF au Ko exact, ou la planche de 8 photos 10×15 cm.',
    sliderExplainTitle: 'À quoi sert la ligne jaune « Avant / Après » sur l’aperçu ?',
    sliderExplainDesc: 'La ligne verticale jaune est un comparateur interactif. À GAUCHE (« Avant »), vous voyez votre image d’origine. À DROITE (« Après »), vous voyez le résultat final détouré sur fond blanc pur et compressé sous votre limite en Ko. Glissez le curseur de gauche à droite pour contrôler la qualité.',
    sliderLeftTag: 'GAUCHE = Photo Originale (Fond beige / Non compressée)',
    sliderRightTag: 'DROITE = Fond Blanc Pur + Poids Ko Garanti',
    sigBeforeTag: 'AVANT : Ombre grise du papier au smartphone',
    sigAfterTag: 'APRÈS : Fond Blanc Pur & Encre Nette (< 18 Ko)',
    sigExplainTitle: 'Nettoyage Automatique d’Ombre pour Signature (< 20 Ko)',
    sigExplainDesc: 'Vous avez pris votre signature en photo avec votre téléphone ? Activez le nettoyage d’ombre pour blanchir le papier (#FFFFFF) tout en gardant l’encre nette.',
    qrTitle: 'Comment Créer un QR Code ou Code-Barres Permanent',
    qrSub: 'Contrairement aux sites payants qui désactivent vos QR codes après quelques jours, notre outil encode vos données directement dans le dessin.',
    qrStep1Title: 'Étape 1 — Choisissez le Type de QR Code',
    qrStep1Desc: 'Sélectionnez Site Web, Wi-Fi invité, Carte de Visite (vCard), Menu Café, WhatsApp ou Code-Barres, puis remplissez vos informations.',
    qrStep2Title: 'Étape 2 — Personnalisez les Coins & le Logo',
    qrStep2Desc: 'Choisissez la forme des coins (Carrés, Arrondis, Losanges), le style des points et ajoutez votre logo au centre si souhaité.',
    qrStep3Title: 'Étape 3 — Téléchargez en PNG 1200px ou SVG Vectoriel',
    qrStep3Desc: 'Téléchargez l’image Haute Définition PNG (1200 px), le fichier vectoriel SVG pour l’imprimerie, ou compressez-le sous 20 Ko.',
    qrForeverTitle: 'Pourquoi nos QR Codes n’expirent jamais (Zéro Redirection)',
    qrForeverDesc: 'Vos informations (lien web, mot de passe Wi-Fi, contact vCard) sont inscrites directement dans les points du QR code, sans serveur intermédiaire ni abonnement.'
  },
  es: {
    badge: 'GUÍA VISUAL PASO A PASO · CÓMO FUNCIONA',
    kbTitle: 'Cómo Comprimir tu Foto o Firma al KB Exacto en 3 Pasos',
    kbSub: 'Sigue las pantallas visuales a continuación para preparar tu foto de pasaporte, visado o firma manuscrita en segundos.',
    kbStep1Title: 'Paso 1 — Sube tu Foto o Firma',
    kbStep1Desc: 'Arrastra y suelta tu archivo JPG, PNG o WebP en el recuadro superior (o haz clic para elegirlo). Todo se procesa 100% en tu navegador.',
    kbStep2Title: 'Paso 2 — Elige el Tipo de Documento y KB Máximo',
    kbStep2Desc: 'Selecciona un formato oficial (Pasaporte 35×45 mm, Visa EE.UU. 2×2" o Firma < 20 KB) y elige el peso máximo permitido (de 10 KB a 500 KB).',
    kbStep3Title: 'Paso 3 — Compara y Descarga al Instante',
    kbStep3Desc: 'Desliza la línea amarilla Antes/Después para revisar la nitidez y descarga tu imagen verificada, un PDF exacto o la hoja de 8 fotos (10×15 cm).',
    sliderExplainTitle: '¿Qué es la línea amarilla «Antes / Después» en la vista previa?',
    sliderExplainDesc: 'La línea vertical amarilla es un comparador interactivo. A la IZQUIERDA («Antes») ves tu foto original. A la DERECHA («Después») ves la foto con fondo blanco puro y comprimida al KB exacto. Arrastra el círculo amarillo hacia la izquierda o derecha para comprobar la calidad.',
    sliderLeftTag: 'IZQUIERDA = Foto Original (Sin comprimir)',
    sliderRightTag: 'DERECHA = Fondo Blanco Puro + KB Exacto',
    sigBeforeTag: 'ANTES: Sombra gris del papel tomada con móvil',
    sigAfterTag: 'DESPUÉS: Papel Blanco Puro y Tinta Nítida (< 18 KB)',
    sigExplainTitle: 'Eliminación Automática de Sombras en Firmas (< 20 KB)',
    sigExplainDesc: '¿Tomaste una foto de tu firma con el móvil? Activa el limpiador de sombras para convertir el papel gris en blanco puro #FFFFFF automáticamente.',
    qrTitle: 'Cómo Crear un Código QR o Código de Barras Permanente',
    qrSub: 'Sin enlaces intermediarios ni suscripciones: tus datos se codifican directamente en la matriz para que funcionen para siempre.',
    qrStep1Title: 'Paso 1 — Elige el Tipo de QR y Rellena los Datos',
    qrStep1Desc: 'Elige Sitio Web, Wi-Fi, Tarjeta de Visita (vCard), Menú, WhatsApp o Código de Barras e introduce tu información.',
    qrStep2Title: 'Paso 2 — Personaliza Esquinas y Logo Central',
    qrStep2Desc: 'Selecciona esquinas cuadradas, redondeadas o diamante, estilo de puntos y sube tu logo central si lo deseas.',
    qrStep3Title: 'Paso 3 — Descarga en PNG 1200px, Vector SVG o < 20 KB',
    qrStep3Desc: 'Descarga en PNG de alta resolución (1200 px), Vector SVG para imprenta o envíalo al compresor para dejarlo bajo 20 KB.',
    qrForeverTitle: 'Por qué nuestros códigos QR nunca caducan',
    qrForeverDesc: 'Codificamos tu URL, clave Wi-Fi o contacto vCard directamente en los puntos del código QR, sin servidores de redirección.'
  },
  ar: {
    badge: 'الدليل المصوّر خطوة بخطوة · طريقة الاستخدام',
    kbTitle: 'كيفية ضغط صورتك أو توقيعك إلى الكيلوبايت الدقيق في 3 خطوات',
    kbSub: 'اتبع الشاشات التوضيحية أدناه لتجهيز صورة جواز السفر أو التأشيرة أو التوقيع الخطي في ثوانٍ.',
    kbStep1Title: 'الخطوة 1 — أضف صورتك أو توقيعك',
    kbStep1Desc: 'اسحب وأفلت ملف JPG أو PNG أو WebP داخل المربع العلوي الكبير (أو اضغط لاختيار ملف من هاتفك أو حاسوبك). تتم المعالجة محلياً 100%.',
    kbStep2Title: 'الخطوة 2 — اختر نوع الوثيقة والحد الأقصى (KB)',
    kbStep2Desc: 'اختر القالب الرسمي الجاهز (جواز سفر 35×45 مم، تأشيرة أمريكا 2×2 بوصة، أو توقيع < 20KB) وحدد السقف الأقصى للكيلوبايت.',
    kbStep3Title: 'الخطوة 3 — قارن الجودة وحمّل الملف فوراً',
    kbStep3Desc: 'حرّك الخط الأصفر (قبل / بعد) لفحص دقة الصورة، ثم قم بتنزيل الصورة المضغوطة أو ملف PDF أو ورقة طباعة 8 صور (10×15 سم).',
    sliderExplainTitle: 'ما هو الخط الأصفر (قبل / بعد) الموجود داخل شاشة المعاينة؟',
    sliderExplainDesc: 'الخط العمودي الأصفر هو أداة مقارنة بصرية تفاعلية: الجزء الأيسر (قبل) يعرض صورتك الأصلية قبل المعالجة، بينما الجزء الأيمن (بعد) يعرض الصورة بعد تبييض الخلفية وضغطها تحت السقف المطلوب بالكيلوبايت. اسحب الدائرة الصفراء يميناً ويساراً للتأكد من نقاء الصورة قبل تنزيلها.',
    sliderLeftTag: 'اليسار = الصورة الأصلية (قبل الضغط وتوحيد الخلفية)',
    sliderRightTag: 'اليمين = خلفية بيضاء نقية + حجم مضمون بالكيلوبايت',
    sigBeforeTag: 'قبل: ظل رمادي ناتج عن تصوير الورقة بالهاتف',
    sigAfterTag: 'بعد: خلفية بيضاء نقية وحبر واضح (< 18 KB)',
    sigExplainTitle: 'إزالة ظل الكاميرا تلقائياً للتوقيع الخطي (< 20 KB)',
    sigExplainDesc: 'هل قمت بتصوير توقيعك بالهاتف؟ فعّل خيار إزالة ظل التوقيع لتحويل خلفية الورقة الرمادية إلى أبيض نقي #FFFFFF بضغطة واحدة.',
    qrTitle: 'كيفية إنشاء رمز QR أو باركود دائم لا تنتهي صلاحيته',
    qrSub: 'تشفير مباشر داخل المصفوفة المتجهة بدون أي روابط وسيطة أو اشتراكات شهرية.',
    qrStep1Title: 'الخطوة 1 — اختر نوع رمز QR وأدخل البيانات',
    qrStep1Desc: 'اختر رابط موقع، شبكة Wi-Fi، بطاقة أعمال، قائمة مقهى، واتساب أو باركود، ثم اكتب بياناتك.',
    qrStep2Title: 'الخطوة 2 — خصّص شكل الزوايا والشعار الوسطي',
    qrStep2Desc: 'اختر زوايا مربعة أو دائرية أو ماسية، وحدد شكل النقاط أو ارفع شعارك في وسط الرمز.',
    qrStep3Title: 'الخطوة 3 — تنزيل بصيغة PNG عالية الدقة أو ملف متجه SVG',
    qrStep3Desc: 'قم بتنزيل صورة PNG بدقة 1200 بكسل، أو ملف SVG للطباعة الاحترافية، أو اضغط الرمز لأقل من 20 كيلوبايت.',
    qrForeverTitle: 'لماذا لا تنتهي صلاحية رموز QR لدينا أبداً؟',
    qrForeverDesc: 'نحن ندمج بياناتك (الرابط أو كلمة مرور Wi-Fi أو بطاقة العمل) مباشرة داخل نقاط الرمز بدون خوادم تحويل وسيطة.'
  }
};

export const VisitorVisualGuide: React.FC<VisitorVisualGuideProps> = ({ mode, locale }) => {
  const c = GUIDE_COPY[locale];

  // Generate real visual samples from our canvas engine so the guide displays authentic live images from our app
  const samplePortraitUrl = useMemo(() => generateCuratedSampleDataUrl('biometric-portrait'), []);
  const sampleSignatureUrl = useMemo(() => generateCuratedSampleDataUrl('wet-ink-signature'), []);

  if (mode === 'compress') {
    return (
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-4 space-y-10 border-t border-[#14213d]/15 dark:border-[#ffffff]/15">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#fca311] text-[#14213d] text-xs font-mono font-bold uppercase">
            {c.badge}
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
            {c.kbTitle}
          </h2>
          <p className="text-sm opacity-80">
            {c.kbSub}
          </p>
        </div>

        {/* 3 VISUAL WEBSITE SCREEN CARDS (STEPS 1, 2, 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* STEP 1 SCREEN CARD */}
          <div className="rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] overflow-hidden flex flex-col">
            {/* Simulated Website Screen Preview */}
            <div className="p-4 bg-[#14213d]/5 dark:bg-[#14213d] border-b border-[#14213d]/10 dark:border-[#ffffff]/10">
              <div className="rounded-lg border-2 border-dashed border-[#fca311] bg-[#ffffff] dark:bg-[#1b2c52] p-4 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#fca311] text-[#14213d] flex items-center justify-center mx-auto">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold">Drop Photo or Click to Upload</div>
                <div className="flex justify-center gap-1.5 text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-[#fca311]/20 font-bold">JPG</span>
                  <span className="px-2 py-0.5 rounded bg-[#fca311]/20 font-bold">PNG</span>
                  <span className="px-2 py-0.5 rounded bg-[#fca311]/20 font-bold">WebP</span>
                </div>
              </div>
            </div>
            <div className="p-5 space-y-2 flex-1">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#fca311] text-[#14213d] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <span>{c.kbStep1Title}</span>
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                {c.kbStep1Desc}
              </p>
            </div>
          </div>

          {/* STEP 2 SCREEN CARD */}
          <div className="rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] overflow-hidden flex flex-col">
            {/* Simulated Website Screen Preview */}
            <div className="p-4 bg-[#14213d]/5 dark:bg-[#14213d] border-b border-[#14213d]/10 dark:border-[#ffffff]/10">
              <div className="rounded-lg border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] p-3 space-y-2">
                <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold">
                  <div className="p-1.5 rounded bg-[#fca311] text-[#14213d] truncate">
                    ✓ Passport 35×45
                  </div>
                  <div className="p-1.5 rounded border border-[#14213d]/20 dark:border-[#ffffff]/20 truncate">
                    Signature &lt; 20KB
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-1 text-[10px] font-mono font-bold text-center">
                  <div className="py-1 rounded border border-[#14213d]/20 dark:border-[#ffffff]/20">15KB</div>
                  <div className="py-1 rounded bg-[#fca311] text-[#14213d]">20KB</div>
                  <div className="py-1 rounded border border-[#14213d]/20 dark:border-[#ffffff]/20">50KB</div>
                  <div className="py-1 rounded border border-[#14213d]/20 dark:border-[#ffffff]/20">100KB</div>
                </div>
              </div>
            </div>
            <div className="p-5 space-y-2 flex-1">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#fca311] text-[#14213d] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <span>{c.kbStep2Title}</span>
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                {c.kbStep2Desc}
              </p>
            </div>
          </div>

          {/* STEP 3 SCREEN CARD */}
          <div className="rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] overflow-hidden flex flex-col">
            {/* Simulated Website Screen Preview */}
            <div className="p-4 bg-[#14213d]/5 dark:bg-[#14213d] border-b border-[#14213d]/10 dark:border-[#ffffff]/10">
              <div className="rounded-lg border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] p-3 space-y-2">
                <div className="py-2 px-3 rounded bg-[#fca311] text-[#14213d] text-[11px] font-bold flex items-center justify-center gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Image (18.4 KB)</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold">
                  <div className="py-1 px-2 rounded border border-[#14213d]/20 dark:border-[#ffffff]/20 flex items-center justify-center gap-1">
                    <FileText className="w-3 h-3 text-[#fca311]" />
                    <span>PDF</span>
                  </div>
                  <div className="py-1 px-2 rounded border border-[#14213d]/20 dark:border-[#ffffff]/20 flex items-center justify-center gap-1">
                    <Grid className="w-3 h-3 text-[#fca311]" />
                    <span>8-Photo Sheet</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 space-y-2 flex-1">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#fca311] text-[#14213d] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <span>{c.kbStep3Title}</span>
              </h3>
              <p className="text-xs opacity-80 leading-relaxed">
                {c.kbStep3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* VISUAL EXPLANATION OF THE "BEFORE / AFTER" YELLOW SLIDER + SIGNATURE SHADOW REMOVAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card A: Explaining the Before / After Slider Screen */}
          <div className="p-6 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#fca311]">
              <MoveHorizontal className="w-4 h-4" />
              <span>Interactive Optical Slider Guide</span>
            </div>
            <h3 className="font-serif text-lg font-bold">
              {c.sliderExplainTitle}
            </h3>
            <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
              {c.sliderExplainDesc}
            </p>

            {/* Annotated Mini Visual of the Before/After Preview Box */}
            <div className="relative rounded-lg border-2 border-[#14213d]/20 dark:border-[#ffffff]/20 overflow-hidden bg-[#ffffff] h-44">
              {/* Right side: Pure white studio backdrop */}
              <img
                src={samplePortraitUrl}
                alt="After Compressed"
                className="w-full h-full object-contain bg-[#ffffff]"
              />
              {/* Left side: Warm off-white original backdrop */}
              <div
                style={{ clipPath: 'inset(0 50% 0 0)' }}
                className="absolute inset-0 bg-[#f3efe6]"
              >
                <img
                  src={samplePortraitUrl}
                  alt="Before Original"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              {/* Center Yellow Divider Line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#fca311]">
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#fca311] text-[#14213d] border-2 border-[#ffffff] shadow-md flex items-center justify-center">
                  <MoveHorizontal className="w-4 h-4" />
                </div>
              </div>
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#14213d] text-[#ffffff] text-[10px] font-mono">
                Before
              </div>
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#fca311] text-[#14213d] text-[10px] font-mono font-bold">
                After (48.2 KB)
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-semibold">
              <div className="p-2.5 rounded-lg border border-[#14213d]/15 dark:border-[#ffffff]/15">
                ← {c.sliderLeftTag}
              </div>
              <div className="p-2.5 rounded-lg bg-[#fca311]/20 border border-[#fca311]">
                → {c.sliderRightTag}
              </div>
            </div>
          </div>

          {/* Card B: Visual Before/After of Wet-Ink Signature Shadow Removal */}
          <div className="p-6 rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#fca311]">
              <Sparkles className="w-4 h-4" />
              <span>Signature &lt; 20 KB Guide</span>
            </div>
            <h3 className="font-serif text-lg font-bold">
              {c.sigExplainTitle}
            </h3>
            <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
              {c.sigExplainDesc}
            </p>

            {/* Visual Side-by-Side Signature Comparison */}
            <div className="grid grid-cols-2 gap-3 h-44">
              <div className="rounded-lg border border-[#14213d]/20 overflow-hidden bg-[#d8d4cb] flex flex-col justify-between p-2">
                <span className="px-2 py-0.5 rounded bg-[#14213d] text-[#ffffff] text-[10px] font-mono w-fit">
                  Before (Phone Shadow)
                </span>
                <img
                  src={sampleSignatureUrl}
                  alt="Signature with shadow"
                  className="w-full h-24 object-contain mix-blend-multiply opacity-85"
                />
                <span className="text-[10px] font-mono text-[#14213d] text-center">
                  Uneven Gray Paper
                </span>
              </div>

              <div className="rounded-lg border-2 border-[#fca311] overflow-hidden bg-[#ffffff] flex flex-col justify-between p-2">
                <span className="px-2 py-0.5 rounded bg-[#fca311] text-[#14213d] text-[10px] font-mono font-bold w-fit">
                  After (16.8 KB)
                </span>
                <img
                  src={sampleSignatureUrl}
                  alt="Cleaned signature"
                  className="w-full h-24 object-contain contrast-200 brightness-110"
                />
                <span className="text-[10px] font-mono font-bold text-[#14213d] text-center">
                  Pure White #FFFFFF
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-semibold">
              <div className="p-2.5 rounded-lg border border-[#14213d]/15 dark:border-[#ffffff]/15">
                ✗ {c.sigBeforeTag}
              </div>
              <div className="p-2.5 rounded-lg bg-[#fca311]/20 border border-[#fca311]">
                ✓ {c.sigAfterTag}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // QR CODE GENERATOR VISUAL GUIDE
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-4 space-y-10 border-t border-[#14213d]/15 dark:border-[#ffffff]/15">
      {/* SECTION HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#fca311] text-[#14213d] text-xs font-mono font-bold uppercase">
          {c.badge}
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
          {c.qrTitle}
        </h2>
        <p className="text-sm opacity-80">
          {c.qrSub}
        </p>
      </div>

      {/* 3 VISUAL WEBSITE SCREEN CARDS FOR QR GENERATOR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* STEP 1 QR SCREEN */}
        <div className="rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] overflow-hidden flex flex-col">
          <div className="p-4 bg-[#14213d]/5 dark:bg-[#14213d] border-b border-[#14213d]/10 dark:border-[#ffffff]/10">
            <div className="rounded-lg border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] p-3 space-y-2">
              <div className="grid grid-cols-3 gap-1.5 text-[10px] font-bold">
                <div className="py-1.5 px-2 rounded bg-[#fca311] text-[#14213d] flex items-center justify-center gap-1">
                  <Globe className="w-3 h-3" />
                  <span>URL</span>
                </div>
                <div className="py-1.5 px-2 rounded border border-[#14213d]/20 dark:border-[#ffffff]/20 flex items-center justify-center gap-1">
                  <Wifi className="w-3 h-3" />
                  <span>Wi-Fi</span>
                </div>
                <div className="py-1.5 px-2 rounded border border-[#14213d]/20 dark:border-[#ffffff]/20 flex items-center justify-center">
                  vCard
                </div>
              </div>
              <div className="px-2.5 py-1.5 rounded border border-[#14213d]/20 dark:border-[#ffffff]/20 text-[10px] font-mono opacity-80 truncate">
                https://your-website.com
              </div>
            </div>
          </div>
          <div className="p-5 space-y-2 flex-1">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#fca311] text-[#14213d] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <span>{c.qrStep1Title}</span>
            </h3>
            <p className="text-xs opacity-80 leading-relaxed">
              {c.qrStep1Desc}
            </p>
          </div>
        </div>

        {/* STEP 2 QR SCREEN */}
        <div className="rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] overflow-hidden flex flex-col">
          <div className="p-4 bg-[#14213d]/5 dark:bg-[#14213d] border-b border-[#14213d]/10 dark:border-[#ffffff]/10">
            <div className="rounded-lg border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] p-3 space-y-2">
              <div className="grid grid-cols-3 gap-1.5 text-[10px] font-bold text-center">
                <div className="py-1.5 rounded border border-[#14213d]/20 dark:border-[#ffffff]/20">Square</div>
                <div className="py-1.5 rounded bg-[#fca311] text-[#14213d]">Rounded</div>
                <div className="py-1.5 rounded border border-[#14213d]/20 dark:border-[#ffffff]/20">Diamond</div>
              </div>
              <div className="py-1.5 px-2 rounded border border-dashed border-[#fca311] text-[10px] font-bold text-center">
                + Upload Center Logo
              </div>
            </div>
          </div>
          <div className="p-5 space-y-2 flex-1">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#fca311] text-[#14213d] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <span>{c.qrStep2Title}</span>
            </h3>
            <p className="text-xs opacity-80 leading-relaxed">
              {c.qrStep2Desc}
            </p>
          </div>
        </div>

        {/* STEP 3 QR SCREEN */}
        <div className="rounded-xl border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] overflow-hidden flex flex-col">
          <div className="p-4 bg-[#14213d]/5 dark:bg-[#14213d] border-b border-[#14213d]/10 dark:border-[#ffffff]/10">
            <div className="rounded-lg border border-[#14213d]/15 dark:border-[#ffffff]/15 bg-[#ffffff] dark:bg-[#1b2c52] p-3 space-y-2">
              <div className="py-2 px-3 rounded bg-[#fca311] text-[#14213d] text-[11px] font-bold flex items-center justify-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                <span>High-Res PNG (1200 px)</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold">
                <div className="py-1 px-2 rounded border border-[#14213d]/20 dark:border-[#ffffff]/20 flex items-center justify-center gap-1">
                  <FileCode2 className="w-3 h-3 text-[#fca311]" />
                  <span>Vector SVG</span>
                </div>
                <div className="py-1 px-2 rounded border border-[#14213d]/20 dark:border-[#ffffff]/20 flex items-center justify-center gap-1">
                  <ArrowRightLeft className="w-3 h-3 text-[#fca311]" />
                  <span>&lt; 20 KB</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 space-y-2 flex-1">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#fca311] text-[#14213d] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <span>{c.qrStep3Title}</span>
            </h3>
            <p className="text-xs opacity-80 leading-relaxed">
              {c.qrStep3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* NON-EXPIRING DIRECT ENCODING GUARANTEE BANNER */}
      <div className="p-6 rounded-xl border-2 border-[#fca311] bg-[#fca311]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#fca311] text-[#14213d] flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-bold flex items-center gap-2">
              <span>{c.qrForeverTitle}</span>
            </h3>
            <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
              {c.qrForeverDesc}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#ffffff] dark:bg-[#1b2c52] border border-[#14213d]/15 dark:border-[#ffffff]/15 text-xs font-mono font-bold shrink-0">
          <CheckCircle2 className="w-4 h-4 text-[#fca311]" />
          <span>ISO/IEC 18004 Level-H</span>
        </div>
      </div>
    </section>
  );
};
