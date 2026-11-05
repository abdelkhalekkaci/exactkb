export type SampleId = 'biometric-portrait' | 'wet-ink-signature' | 'studio-product';

export interface CuratedSample {
  id: SampleId;
  label: string;
  subtitle: string;
  recommendedPreset: 'schengen-35x45' | 'wet-ink-sig' | 'amazon-1000';
  recommendedKb: number;
}

export const CURATED_SAMPLES: CuratedSample[] = [
  {
    id: 'biometric-portrait',
    label: 'Sample I · Biometric Portrait',
    subtitle: '35×45 mm Schengen / CNIE & 2×2" Visa Subject',
    recommendedPreset: 'schengen-35x45',
    recommendedKb: 50
  },
  {
    id: 'wet-ink-signature',
    label: 'Sample II · Wet-Ink Signature (With Phone Shadow)',
    subtitle: 'Handwritten Fountain-Pen Scan · Test < 20 KB Cleanser',
    recommendedPreset: 'wet-ink-sig',
    recommendedKb: 20
  },
  {
    id: 'studio-product',
    label: 'Sample III · Medium-Format TLR Camera',
    subtitle: '1000×1000 px E-Commerce Studio Object',
    recommendedPreset: 'amazon-1000',
    recommendedKb: 100
  }
];

export function generateCuratedSampleDataUrl(sampleId: SampleId): string {
  const canvas = document.createElement('canvas');

  if (sampleId === 'wet-ink-signature') {
    canvas.width = 840;
    canvas.height = 270;
    const ctx = canvas.getContext('2d')!;

    // 1. Realistic unevenly lit phone-camera paper background (warm gray on right from phone shadow)
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, '#F3EFE6');
    bgGrad.addColorStop(0.48, '#EAE4D7');
    bgGrad.addColorStop(0.72, '#C8C1B4'); // Simulated smartphone shadow across right half
    bgGrad.addColorStop(1, '#B5AEA0');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle paper grain noise so JPEG compression and shadow cleanser have real texture to work on
    for (let i = 0; i < 4500; i++) {
      const x = (i * 197) % canvas.width;
      const y = (i * 311) % canvas.height;
      ctx.fillStyle = i % 2 === 0 ? 'rgba(60,50,40,0.04)' : 'rgba(255,255,255,0.05)';
      ctx.fillRect(x, y, 2, 2);
    }

    // Faint notebook baseline
    ctx.strokeStyle = 'rgba(130, 145, 165, 0.28)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(48, 210);
    ctx.lineTo(canvas.width - 48, 210);
    ctx.stroke();

    // 2. Authentic Wet-Ink Cursive Fountain Pen Signature
    ctx.save();
    ctx.strokeStyle = '#14284B';
    ctx.fillStyle = '#14284B';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Capital 'A' flourish
    ctx.lineWidth = 5.2;
    ctx.beginPath();
    ctx.moveTo(95, 198);
    ctx.bezierCurveTo(118, 120, 150, 52, 168, 54);
    ctx.bezierCurveTo(184, 56, 186, 145, 198, 198);
    ctx.stroke();

    // Crossbar loop of 'A' leading into cursive 'bdelkhalek'
    ctx.lineWidth = 4.0;
    ctx.beginPath();
    ctx.moveTo(112, 152);
    ctx.bezierCurveTo(78, 134, 155, 112, 226, 146);
    ctx.bezierCurveTo(246, 156, 255, 92, 244, 86);
    ctx.bezierCurveTo(232, 80, 228, 176, 256, 178);
    ctx.bezierCurveTo(276, 180, 286, 142, 302, 144);
    ctx.bezierCurveTo(316, 146, 312, 178, 332, 176);
    ctx.bezierCurveTo(354, 174, 372, 84, 360, 78);
    ctx.bezierCurveTo(348, 72, 346, 180, 382, 176);
    ctx.stroke();

    // Surname 'Kaci' with expressive nib pressure variation
    ctx.lineWidth = 5.4;
    ctx.beginPath();
    ctx.moveTo(425, 62);
    ctx.bezierCurveTo(422, 118, 416, 168, 414, 196);
    ctx.stroke();

    ctx.lineWidth = 4.2;
    ctx.beginPath();
    ctx.moveTo(478, 84);
    ctx.bezierCurveTo(448, 116, 424, 138, 418, 142);
    ctx.bezierCurveTo(436, 148, 456, 182, 488, 178);
    ctx.bezierCurveTo(510, 175, 520, 148, 536, 150);
    ctx.bezierCurveTo(550, 152, 546, 178, 568, 176);
    ctx.bezierCurveTo(588, 174, 602, 146, 620, 150);
    ctx.bezierCurveTo(638, 154, 650, 176, 686, 168);
    ctx.stroke();

    // Dot over 'i'
    ctx.beginPath();
    ctx.arc(622, 118, 3.8, 0, Math.PI * 2);
    ctx.fill();

    // Under-flourish paraph stroke
    ctx.lineWidth = 3.4;
    ctx.beginPath();
    ctx.moveTo(155, 224);
    ctx.bezierCurveTo(310, 192, 540, 188, 735, 206);
    ctx.bezierCurveTo(758, 208, 710, 232, 650, 236);
    ctx.stroke();

    ctx.restore();
    return canvas.toDataURL('image/jpeg', 0.96);
  }

  if (sampleId === 'studio-product') {
    canvas.width = 1000;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d')!;

    // Soft studio cyclorama background (slightly off-white at edges so Pure White normalizer works)
    const grad = ctx.createRadialGradient(500, 480, 120, 500, 500, 680);
    grad.addColorStop(0, '#FAF8F3');
    grad.addColorStop(1, '#E5E0D5');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1000, 1000);

    // Contact shadow
    ctx.fillStyle = 'rgba(22, 21, 20, 0.14)';
    ctx.beginPath();
    ctx.ellipse(500, 825, 210, 28, 0, 0, Math.PI * 2);
    ctx.fill();

    // Twin-Lens Reflex (TLR) Medium-Format Camera Body
    ctx.fillStyle = '#1E1D1B';
    ctx.strokeStyle = '#3A3733';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(310, 240, 380, 570, 22);
    ctx.fill();
    ctx.stroke();

    // Silver brushed aluminum faceplate
    const metalGrad = ctx.createLinearGradient(340, 260, 660, 780);
    metalGrad.addColorStop(0, '#E6E2DA');
    metalGrad.addColorStop(0.5, '#C8C3B8');
    metalGrad.addColorStop(1, '#9E988E');
    ctx.fillStyle = metalGrad;
    ctx.beginPath();
    ctx.roundRect(348, 275, 304, 500, 16);
    ctx.fill();

    // Leatherette body panels
    ctx.fillStyle = '#181715';
    ctx.beginPath();
    ctx.roundRect(364, 292, 272, 466, 12);
    ctx.fill();

    // Top Waist-Level Finder Hood
    ctx.fillStyle = '#2A2826';
    ctx.beginPath();
    ctx.moveTo(340, 240);
    ctx.lineTo(375, 165);
    ctx.lineTo(625, 165);
    ctx.lineTo(660, 240);
    ctx.closePath();
    ctx.fill();

    // Engraved Nameplate Banner
    ctx.fillStyle = '#E8E4DC';
    ctx.fillRect(390, 252, 220, 42);
    ctx.fillStyle = '#161514';
    ctx.font = '700 20px "Fraunces", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('ATELIER OPTIK 6×6', 500, 280);

    // Helper to draw precision optical lens
    const drawLens = (cx: number, cy: number, rOuter: number, label: string) => {
      // Brass/Chrome outer ring
      ctx.fillStyle = '#D8D3C8';
      ctx.beginPath();
      ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#4A4640';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Dark barrel
      ctx.fillStyle = '#141413';
      ctx.beginPath();
      ctx.arc(cx, cy, rOuter * 0.82, 0, Math.PI * 2);
      ctx.fill();

      // Multi-coated optical glass reflection
      const glassGrad = ctx.createRadialGradient(cx - 18, cy - 18, 6, cx, cy, rOuter * 0.68);
      glassGrad.addColorStop(0, '#3B6E8C');
      glassGrad.addColorStop(0.45, '#193247');
      glassGrad.addColorStop(0.85, '#0D1822');
      glassGrad.addColorStop(1, '#080B0E');
      ctx.fillStyle = glassGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, rOuter * 0.66, 0, Math.PI * 2);
      ctx.fill();

      // Specular highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.beginPath();
      ctx.ellipse(cx - rOuter * 0.24, cy - rOuter * 0.24, rOuter * 0.18, rOuter * 0.09, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();

      // Technical text ring
      ctx.fillStyle = '#C83E2B';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillText(label, cx, cy + rOuter + 18);
    };

    // Viewing Lens (Top) & Taking Lens (Bottom)
    drawLens(500, 415, 78, 'HEIDOSMAT 1:2.8 / 80mm');
    drawLens(500, 615, 92, 'PLANAR 1:2.8 f=80mm · SYNCHRO-COMPUR');

    return canvas.toDataURL('image/jpeg', 0.96);
  }

  // Default: 'biometric-portrait' (High-detail biometric studio subject at 826×1062 px = 2x 35×45mm @ 300DPI)
  canvas.width = 826;
  canvas.height = 1062;
  const ctx = canvas.getContext('2d')!;

  // 1. Studio backdrop (soft studio off-white/gray gradient around edges so Backdrop Normalizer can isolate subject)
  const bg = ctx.createRadialGradient(413, 440, 120, 413, 531, 640);
  bg.addColorStop(0, '#F1EEE7');
  bg.addColorStop(0.7, '#E3DECF');
  bg.addColorStop(1, '#D5CFC2');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle backdrop studio texture
  for (let i = 0; i < 3600; i++) {
    const x = (i * 173) % canvas.width;
    const y = (i * 293) % canvas.height;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(0,0,0,0.015)' : 'rgba(255,255,255,0.02)';
    ctx.fillRect(x, y, 2, 2);
  }

  // 2. Back hair silhouette
  ctx.fillStyle = '#1E1916';
  ctx.beginPath();
  ctx.ellipse(413, 435, 195, 250, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3. Tailored Navy Studio Blazer & Crisp White Shirt Collar (Biometric shoulders)
  ctx.fillStyle = '#1B2536';
  ctx.beginPath();
  ctx.moveTo(95, 1062);
  ctx.bezierCurveTo(115, 815, 235, 745, 413, 745);
  ctx.bezierCurveTo(591, 745, 711, 815, 731, 1062);
  ctx.closePath();
  ctx.fill();

  // White dress shirt V-neck
  ctx.fillStyle = '#F9F8F5';
  ctx.beginPath();
  ctx.moveTo(318, 742);
  ctx.lineTo(413, 955);
  ctx.lineTo(508, 742);
  ctx.closePath();
  ctx.fill();

  // Blazer Lapels
  ctx.strokeStyle = '#111824';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(300, 748);
  ctx.lineTo(395, 965);
  ctx.moveTo(526, 748);
  ctx.lineTo(431, 965);
  ctx.stroke();

  // 4. Neck & Natural Studio Shadow
  const neckGrad = ctx.createLinearGradient(345, 620, 481, 780);
  neckGrad.addColorStop(0, '#DEB89B');
  neckGrad.addColorStop(0.5, '#E7C5AA');
  neckGrad.addColorStop(1, '#CFA587');
  ctx.fillStyle = neckGrad;
  ctx.beginPath();
  ctx.roundRect(348, 610, 130, 175, 45);
  ctx.fill();

  // Chin shadow on neck
  ctx.fillStyle = 'rgba(120, 78, 54, 0.22)';
  ctx.beginPath();
  ctx.ellipse(413, 662, 66, 28, 0, 0, Math.PI * 2);
  ctx.fill();

  // 5. Ears (Tucked hair per ICAO 9303 biometric specification)
  ctx.fillStyle = '#DCB497';
  ctx.beginPath();
  ctx.ellipse(246, 468, 22, 46, -0.08, 0, Math.PI * 2);
  ctx.ellipse(580, 468, 22, 46, 0.08, 0, Math.PI * 2);
  ctx.fill();

  // 6. Head & Facial Structure
  const faceGrad = ctx.createRadialGradient(395, 415, 30, 413, 450, 215);
  faceGrad.addColorStop(0, '#F3D6BE');
  faceGrad.addColorStop(0.65, '#E8C3A6');
  faceGrad.addColorStop(1, '#D4AB8C');
  ctx.fillStyle = faceGrad;
  ctx.beginPath();
  ctx.ellipse(413, 450, 162, 212, 0, 0, Math.PI * 2);
  ctx.fill();

  // 7. Hairline & Parted Studio Hair
  ctx.fillStyle = '#1E1916';
  ctx.beginPath();
  ctx.moveTo(248, 425);
  ctx.bezierCurveTo(242, 275, 325, 218, 413, 218);
  ctx.bezierCurveTo(505, 218, 584, 275, 578, 425);
  ctx.bezierCurveTo(552, 330, 485, 292, 390, 286);
  ctx.bezierCurveTo(315, 282, 270, 340, 248, 425);
  ctx.closePath();
  ctx.fill();

  // 8. Eyebrows
  ctx.strokeStyle = '#2B231E';
  ctx.lineWidth = 7.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(304, 404);
  ctx.quadraticCurveTo(342, 388, 378, 401);
  ctx.moveTo(448, 401);
  ctx.quadraticCurveTo(484, 388, 522, 404);
  ctx.stroke();

  // 9. High-Detail Biometric Eyes (Critical for testing 7-pass sharpness in the Split Loupe)
  const drawEye = (cx: number, cy: number) => {
    // Sclera
    ctx.fillStyle = '#FAF8F5';
    ctx.beginPath();
    ctx.ellipse(cx, cy, 30, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Iris
    const irisGrad = ctx.createRadialGradient(cx, cy, 3, cx, cy, 13);
    irisGrad.addColorStop(0, '#2B1E16');
    irisGrad.addColorStop(0.55, '#59412E');
    irisGrad.addColorStop(1, '#261B13');
    ctx.fillStyle = irisGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 12.5, 0, Math.PI * 2);
    ctx.fill();

    // Pupil
    ctx.fillStyle = '#0E0D0C';
    ctx.beginPath();
    ctx.arc(cx, cy, 5.2, 0, Math.PI * 2);
    ctx.fill();

    // Studio Octabox Catchlight
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(cx - 4, cy - 4, 2.6, 0, Math.PI * 2);
    ctx.fill();

    // Upper eyelid crease
    ctx.strokeStyle = '#231C18';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(cx, cy + 4, 31, Math.PI * 1.12, Math.PI * 1.88);
    ctx.stroke();
  };

  drawEye(342, 442);
  drawEye(484, 442);

  // 10. Nose Bridge & Tip
  ctx.strokeStyle = 'rgba(155, 108, 82, 0.55)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(413, 438);
  ctx.lineTo(409, 518);
  ctx.quadraticCurveTo(413, 532, 426, 526);
  ctx.stroke();

  // 11. Neutral Closed Mouth (Biometric requirement)
  ctx.fillStyle = '#C47D72';
  ctx.beginPath();
  ctx.moveTo(366, 576);
  ctx.quadraticCurveTo(395, 566, 413, 571);
  ctx.quadraticCurveTo(431, 566, 460, 576);
  ctx.quadraticCurveTo(413, 596, 366, 576);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#8F4E45';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(366, 576);
  ctx.quadraticCurveTo(413, 580, 460, 576);
  ctx.stroke();

  return canvas.toDataURL('image/jpeg', 0.96);
}
