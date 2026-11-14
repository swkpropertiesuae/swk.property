// Imports the Betterway Master Brand Kit (v2) into /public.
// Usage: node scripts/media/brand-kit-v2.mjs <path-to-unzipped Betterway_Mortgages_Master_Brand_Kit>
// Horizontal lockups ship on a padded 2048x860 artboard; this crops each one to its artwork so it can
// sit in a header at its real size. Path coordinates are read straight from the SVG; the group
// translate is applied to the measured box.
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const kit = process.argv[2];
if (!kit) { console.error('Pass the unzipped brand kit folder.'); process.exit(1); }
const out = 'public/brand';
mkdirSync(out, { recursive: true });

function crop(svg, pad = 6) {
  const t = /<g transform="translate\(([-\d.]+),\s*([-\d.]+)\)(?:\s*scale\(([\d.]+)\))?"/.exec(svg);
  const [tx, ty, s] = t ? [+t[1], +t[2], +(t[3] ?? 1)] : [0, 0, 1];
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const d of svg.matchAll(/\sd="([^"]+)"/g)) {
    // Arc commands carry radii and flags between coordinates; drop them so only end points remain.
    const clean = d[1].replace(/A\s*[\d.]+,[\d.]+\s+[\d.]+\s+[01]\s+[01]\s+/g, 'L ');
    for (const m of clean.matchAll(/(-?[\d.]+),(-?[\d.]+)/g)) {
      const x = tx + +m[1] * s, y = ty + +m[2] * s;
      x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
    }
  }
  const box = [x0 - pad, y0 - pad, x1 - x0 + pad * 2, y1 - y0 + pad * 2].map((n) => +n.toFixed(2));
  return svg
    .replace(/viewBox="[^"]+"/, `viewBox="${box.join(' ')}"`)
    .replace(/\swidth="\d+"\s+height="\d+"/, ` width="${Math.round(box[2])}" height="${Math.round(box[3])}"`);
}

const L = (f) => readFileSync(join(kit, '01_Master_Logos', f), 'utf8');
const I = (f) => readFileSync(join(kit, '02_Standalone_Icons', f), 'utf8');
const files = {
  'logo-primary.svg': crop(L('02_Institutional_Daylight_Horizontal_Transparent.svg')),
  'logo-wordmark.svg': crop(L('02_Institutional_Daylight_Horizontal_Transparent.svg')),
  'logo-white.svg': crop(L('06_Executive_Dark_Obsidian_Horizontal_Transparent.svg')),
  'logo-white-full.svg': crop(L('06_Executive_Dark_Obsidian_Horizontal_Transparent.svg')),
  'logo-navy.svg': crop(L('07_Monolithic_Banking_Navy_Horizontal_Transparent.svg')),
  'logo-faceted.svg': crop(L('04_Dimensional_Faceted_Horizontal_Transparent.svg')),
  'logo-stacked.svg': L('11_Dimensional_Faceted_Stacked_Transparent.svg'), // multi-group artboard: kept uncropped,
  'symbol-teal.svg': crop(I('01_Standalone_Icon_Institutional_Emerald_Transparent.svg'), 4),
  'symbol-faceted.svg': crop(I('02_Standalone_Icon_Dimensional_Faceted_Transparent.svg'), 4),
  'symbol-executive.svg': crop(I('03_Standalone_Icon_Executive_Dark_Transparent.svg'), 4),
  'symbol-white.svg': crop(I('05_Standalone_Icon_Monolithic_White_Transparent.svg'), 4),
};
for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(out, name), svg);
  console.log(name, /viewBox="([^"]+)"/.exec(svg)[1]);
}

const fav = join(kit, '04_Favicons_Web');
copyFileSync(join(fav, 'favicon.svg'), 'public/favicon.svg');
copyFileSync(join(fav, 'favicon.ico'), 'public/favicon.ico');
copyFileSync(join(fav, 'favicon-180x180.png'), 'public/apple-touch-icon.png');
copyFileSync(join(fav, 'favicon-192x192.png'), 'public/favicon-192.png');
copyFileSync(join(fav, 'favicon-512x512.png'), 'public/favicon-512.png');
copyFileSync(join(kit, 'Betterway_Mortgages_Corporate_Brand_Identity_Board.png'), 'docs/brand-identity-board.png');
console.log('favicons + identity board copied');
