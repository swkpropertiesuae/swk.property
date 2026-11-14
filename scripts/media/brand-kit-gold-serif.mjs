// Imports Betterway_Mortgages_Gold_Serif_Master_Brand_Kit into /public and /docs,
// removing all legacy logos, icons, favicons, OG banners, and brand materials first.
// Usage: node scripts/media/brand-kit-gold-serif.mjs <unzipped-kit-dir> [source-zip-path]
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const kit = process.argv[2];
const zipSrc = process.argv[3];
if (!kit || !existsSync(kit)) {
  console.error('Usage: node scripts/media/brand-kit-gold-serif.mjs <unzipped-kit-dir> [source-zip-path]');
  process.exit(1);
}

// 1. Remove ALL existing brand logos, icons, favicons, OG images, and old docs/readme
rmSync('public/brand', { recursive: true, force: true });
for (const f of readdirSync('public')) {
  if (/^(favicon|apple-touch-icon|app-icon|og\.png|og-hero\.png)/i.test(f)) {
    rmSync(join('public', f), { force: true });
  }
}
rmSync('docs/brand-identity-board.png', { force: true });
rmSync('docs/brand-kit-readme.txt', { force: true });

mkdirSync('public/brand/kit/logos', { recursive: true });
mkdirSync('public/brand/kit/icons', { recursive: true });
mkdirSync('public/brand/materials', { recursive: true });

// 2. Helper to set exact CAD-verified viewBox (preserving <rect>, strokes, and gradients)
function setBox(svg, viewBox, width, height, { stripCanvas = false } = {}) {
  let out = svg;
  if (stripCanvas) {
    out = out.replace(/<\/defs>\s*<rect\s+width="\d+"\s+height="\d+"[^>]*\/>/, '</defs>');
  }
  return out
    .replace(/viewBox="[^"]+"/, `viewBox="${viewBox}"`)
    .replace(/\swidth="\d+"\s+height="\d+"/, ` width="${width}" height="${height}"`);
}

const L = (f) => readFileSync(join(kit, '01_Master_Logos', f), 'utf8');
const I = (f) => readFileSync(join(kit, '02_Standalone_Icons', f), 'utf8');

// Exact CAD bounds verified from kit SVGs:
// - Horizontal lockups (translate(0,21) + squircle x=134..394, y=223..483, stroke=3 + serif x=443..1738, y=298..428):
//   Ink+stroke = [132.5..1738.0] x [242.5..505.5] -> padded 6px => viewBox="126 236 1618 276" (1618x276)
// - Stacked transparent (group1 translate(311.6,-153.05) scale(1.85) + group2 translate(-334.12,642.48) scale(1.04)):
//   Ink = [126.6..1473.4] x [259.5..1087.6] -> padded => viewBox="118 250 1364 846" (1364x846)
// - Squircle standalone icons (translate(-311.68,-589.36) scale(3.12) on rect 134,223 260x260):
//   Ink = [106.4..917.6] x [106.4..917.6] -> padded => viewBox="100 100 824 824" (824x824)
// - Pure line house icons (translate(-702.4,-1111.8) scale(4.6) on stroke-width 11.8 paths):
//   Ink+stroke = [192.8..831.2] x [199.7..824.3] -> square => viewBox="184 184 656 656" (656x656)
const webAssets = {
  'logo-primary.svg': setBox(L('05_Master_Logo_Daylight_Navy_and_Gold_Transparent.svg'), '126 236 1618 276', 1618, 276),
  'logo-white.svg': setBox(L('02_Master_Logo_White_and_Gold_Transparent.svg'), '126 236 1618 276', 1618, 276),
  'logo-white-full.svg': setBox(L('02_Master_Logo_White_and_Gold_Transparent.svg'), '126 236 1618 276', 1618, 276),
  'logo-brushed-gold.svg': setBox(L('03_Master_Logo_Dimensional_Brushed_Gold.svg'), '126 236 1618 276', 1618, 276, { stripCanvas: true }),
  'logo-navy.svg': setBox(L('06_Master_Logo_Monolithic_Navy_Stamp_Transparent.svg'), '126 236 1618 276', 1618, 276),
  'logo-stacked.svg': setBox(L('09_Stacked_Logo_White_and_Gold_Transparent.svg'), '118 250 1364 846', 1364, 846),
  'icon-gold.svg': setBox(I('02_Gold_Squircle_House_Icon_Transparent.svg'), '100 100 824 824', 824, 824),
  'icon-brushed-gold.svg': setBox(I('03_Dimensional_Brushed_Gold_Squircle_Icon_Transparent.svg'), '100 100 824 824', 824, 824),
  'icon-navy.svg': setBox(I('04_Monolithic_Navy_Squircle_Icon_Transparent.svg'), '100 100 824 824', 824, 824),
  'icon-midnight.svg': I('01_Gold_Squircle_House_Icon_Midnight_Canvas.svg'),
  'icon-line-gold.svg': setBox(I('05_Pure_Gold_House_Line_Icon_Transparent.svg'), '184 184 656 656', 656, 656),
  'icon-line-navy.svg': setBox(I('06_Pure_Navy_House_Line_Icon_Transparent.svg'), '184 184 656 656', 656, 656),
};

for (const [name, content] of Object.entries(webAssets)) {
  writeFileSync(join('public/brand', name), content);
  console.log('wrote public/brand/' + name);
}

// 3. Copy all uncropped vector masters from the Brand Kit into public/brand/kit/
for (const f of readdirSync(join(kit, '01_Master_Logos')).filter((x) => x.endsWith('.svg'))) {
  copyFileSync(join(kit, '01_Master_Logos', f), join('public/brand/kit/logos', f));
}
for (const f of readdirSync(join(kit, '02_Standalone_Icons')).filter((x) => x.endsWith('.svg'))) {
  copyFileSync(join(kit, '02_Standalone_Icons', f), join('public/brand/kit/icons', f));
}
if (zipSrc && existsSync(zipSrc)) {
  copyFileSync(zipSrc, 'public/brand/materials/betterway-master-brand-kit.zip');
  console.log('copied public/brand/materials/betterway-master-brand-kit.zip');
}

// 4. Copy all Favicons & App Icons from 03_App_Icons_and_Favicons into public/
const fav = join(kit, '03_App_Icons_and_Favicons');
copyFileSync(join(fav, 'favicon.svg'), 'public/favicon.svg');
copyFileSync(join(fav, 'favicon.ico'), 'public/favicon.ico');
for (const sz of ['16x16', '32x32', '48x48', '64x64', '180x180']) {
  copyFileSync(join(fav, `favicon-${sz}.png`), `public/favicon-${sz}.png`);
}
copyFileSync(join(fav, 'favicon-192x192.png'), 'public/favicon-192.png');
copyFileSync(join(fav, 'favicon-512x512.png'), 'public/favicon-512.png');
copyFileSync(join(fav, 'favicon-1024x1024.png'), 'public/favicon-1024.png');
copyFileSync(join(fav, 'App_Icon_Midnight_Canvas_180x180.png'), 'public/apple-touch-icon.png');
copyFileSync(join(fav, 'App_Icon_Midnight_Canvas_192x192.png'), 'public/app-icon-192.png');
copyFileSync(join(fav, 'App_Icon_Midnight_Canvas_512x512.png'), 'public/app-icon-512.png');
copyFileSync(join(fav, 'App_Icon_Midnight_Canvas_1024x1024.png'), 'public/app-icon-1024.png');
copyFileSync(join(kit, 'Betterway_Mortgages_Gold_Serif_Brand_Identity_Board.png'), 'docs/brand-identity-board.png');
console.log('copied favicons, app icons, apple-touch-icon, and docs/brand-identity-board.png');

// 5. Generate self-contained Sovereign Gold & Midnight Navy Banner, Flyer, and OpenGraph cards
const logoWhiteB64 = Buffer.from(webAssets['logo-white.svg']).toString('base64');
const logoDaylightB64 = Buffer.from(webAssets['logo-primary.svg']).toString('base64');
const uiPngBuf = await sharp('public/media/app-ui-poster.webp').png().toBuffer();
const uiB64 = uiPngBuf.toString('base64');

const ogSvg = (w, h) => {
  const s = w / 1200;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg" cx="25%" cy="20%" r="85%">
      <stop offset="0%" stop-color="#072244"/>
      <stop offset="60%" stop-color="#021125"/>
      <stop offset="100%" stop-color="#010915"/>
    </radialGradient>
    <linearGradient id="goldRule" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#DFBA5B"/>
      <stop offset="55%" stop-color="#D7B04E"/>
      <stop offset="100%" stop-color="#D7B04E" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1060" cy="110" r="320" fill="#D7B04E" fill-opacity="0.06"/>
  <image x="88" y="88" width="520" height="${Math.round(520 * (276 / 1618))}" href="data:image/svg+xml;base64,${logoWhiteB64}"/>
  <rect x="88" y="226" width="420" height="2" fill="url(#goldRule)"/>
  <text x="88" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="68" fill="#FFFFFF" letter-spacing="-1">Every UAE bank,</text>
  <text x="88" y="408" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="68" fill="#D7B04E" letter-spacing="-0.5">weighed properly.</text>
  <text x="88" y="476" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#B9C5D3">Independent mortgage advisory across 24 UAE lenders · Al Nasr Plaza, Dubai</text>
  <text x="88" y="556" font-family="Arial, Helvetica, sans-serif" font-size="16" letter-spacing="2" fill="#D7B04E">BETTERWAYMORTGAGES.COM · CBUAE &amp; DLD RULES BUILT IN</text>
</svg>`;
};

await sharp(Buffer.from(ogSvg(1200, 630))).png({ compressionLevel: 9 }).toFile('public/og.png');
await sharp(Buffer.from(ogSvg(2400, 1260))).png({ compressionLevel: 9 }).toFile('public/og-hero.png');

const bannerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <radialGradient id="g" cx="80%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#F6EBD0"/>
      <stop offset="55%" stop-color="#F3EFE7"/>
      <stop offset="100%" stop-color="#F8F9FA"/>
    </radialGradient>
    <clipPath id="phone"><rect x="0" y="0" width="280" height="606" rx="26"/></clipPath>
  </defs>
  <rect width="1600" height="900" fill="url(#g)"/>
  <image x="90" y="78" width="420" height="72" href="data:image/svg+xml;base64,${logoDaylightB64}"/>
  <text x="90" y="238" font-family="Arial, sans-serif" font-size="16" font-weight="600" letter-spacing="3" fill="#A67C21">MORTGAGE ADVISORY IN DUBAI &amp; THE UAE</text>
  <text x="88" y="362" font-family="Georgia, 'Times New Roman', serif" font-size="88" fill="#021125" letter-spacing="-2">Mortgages, with</text>
  <text x="88" y="462" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="88" fill="#A67C21" letter-spacing="-1">more perspective.</text>
  <text x="90" y="544" font-family="Arial, sans-serif" font-size="25" fill="#4A5868">Compare 24 UAE banks on total five-year cost — before a credit check runs.</text>
  <rect x="90" y="608" width="290" height="66" rx="33" fill="#021125"/>
  <circle cx="347" cy="641" r="22" fill="#D7B04E"/>
  <text x="124" y="649" font-family="Arial, sans-serif" font-size="20" font-weight="600" fill="#FFFFFF">Plan a better way</text>
  <text x="90" y="804" font-family="Arial, sans-serif" font-size="16" fill="#4A5868">Betterway Mortgages · Al Nasr Plaza, Oud Metha, Dubai · hello@betterwaymortgages.com</text>
  <g transform="translate(1130 134) rotate(8)">
    <rect x="-8" y="-8" width="296" height="622" rx="36" fill="#021125" stroke="#D7B04E" stroke-opacity="0.45" stroke-width="3"/>
    <image width="280" height="606" href="data:image/png;base64,${uiB64}" clip-path="url(#phone)"/>
  </g>
  <rect x="995" y="612" width="280" height="98" rx="20" fill="#FFFFFF" stroke="#E2E6EA"/>
  <text x="1022" y="650" font-family="Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="1.5" fill="#A67C21">YOUR HOME. YOUR NUMBERS.</text>
  <text x="1022" y="682" font-family="Georgia, 'Times New Roman', serif" font-size="21" fill="#021125">Planning made clearer.</text>
  <text x="1025" y="804" font-family="Arial, sans-serif" font-size="13" fill="#64748B">Illustrative planning interface · Lending subject to bank approval</text>
</svg>`;

const flyerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
  <defs>
    <radialGradient id="fg" cx="25%" cy="15%" r="90%">
      <stop offset="0%" stop-color="#072244"/>
      <stop offset="65%" stop-color="#021125"/>
      <stop offset="100%" stop-color="#010915"/>
    </radialGradient>
    <clipPath id="fphone"><rect x="0" y="0" width="280" height="606" rx="26"/></clipPath>
  </defs>
  <rect width="900" height="1200" fill="url(#fg)"/>
  <image x="65" y="64" width="380" height="65" href="data:image/svg+xml;base64,${logoWhiteB64}"/>
  <text x="65" y="214" font-family="Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="2.5" fill="#D7B04E">YOUR NEXT ADDRESS STARTS WITH CLARITY</text>
  <text x="63" y="312" font-family="Georgia, 'Times New Roman', serif" font-size="74" fill="#FFFFFF" letter-spacing="-1.5">Know your costs.</text>
  <text x="63" y="396" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="74" fill="#D7B04E" letter-spacing="-1">Find your way home.</text>
  <text x="65" y="458" font-family="Arial, sans-serif" font-size="22" fill="#B9C5D3">Independent mortgage planning for Dubai &amp; the UAE.</text>
  <g transform="translate(505 515) rotate(7)">
    <rect x="-8" y="-8" width="296" height="622" rx="36" fill="#051B38" stroke="#D7B04E" stroke-opacity="0.5" stroke-width="3"/>
    <image width="280" height="606" href="data:image/png;base64,${uiB64}" clip-path="url(#fphone)"/>
  </g>
  <g font-family="Arial, sans-serif" fill="#FFFFFF" font-size="25">
    <text x="65" y="630"><tspan fill="#D7B04E" font-weight="700">01</tspan>   Plan your deposit &amp; DLD fees.</text>
    <text x="65" y="717"><tspan fill="#D7B04E" font-weight="700">02</tspan>   Compare 24 banks side by side.</text>
    <text x="65" y="804"><tspan fill="#D7B04E" font-weight="700">03</tspan>   Move from FOL to transfer day.</text>
  </g>
  <rect x="65" y="888" width="316" height="64" rx="32" fill="#D7B04E"/>
  <text x="106" y="928" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#021125">Talk to Betterway  ↗</text>
  <text x="65" y="1055" font-family="Arial, sans-serif" font-size="16" fill="#D7B04E">hello@betterwaymortgages.com</text>
  <text x="65" y="1165" font-family="Arial, sans-serif" font-size="12" fill="#8A9BB0">Illustrative planning interface. Lender approval, fees and terms apply.</text>
</svg>`;

writeFileSync('public/brand/materials/betterway-banner.svg', bannerSvg);
writeFileSync('public/brand/materials/betterway-flyer.svg', flyerSvg);
await sharp(Buffer.from(bannerSvg)).png({ compressionLevel: 9 }).toFile('public/brand/materials/betterway-banner.png');
await sharp(Buffer.from(flyerSvg)).png({ compressionLevel: 9 }).toFile('public/brand/materials/betterway-flyer.png');
console.log('generated og.png, og-hero.png, betterway-banner.{svg,png}, betterway-flyer.{svg,png}');
