// Verifies every internal href in out/**/*.html resolves to an exported file. Usage: node scripts/check-links.mjs
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
const out = path.resolve('.next/server/app');
const assets = path.resolve('public');
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = path.join(d, f); statSync(p).isDirectory() ? (f !== '_next' && walk(p)) : p.endsWith('.html') && files.push(p); });
walk(out);
const ok = (href) => {
  const p = decodeURIComponent(href.split(/[?#]/)[0]).replace(/\/$/, '') || '/';
  if (p === '/') return true;
  if (existsSync(path.join(assets,p)) && statSync(path.join(assets,p)).isFile()) return true;
  return [p, `${p}.html`, `${p}/index.html`, `${p}.body`].some((c) => existsSync(path.join(out, c)) && statSync(path.join(out, c)).isFile());
};
const bad = new Map();
for (const f of files) {
  for (const m of readFileSync(f, 'utf8').matchAll(/href="(\/[^"]*)"/g)) {
    if (m[1].startsWith('/_next')) continue;
    if (!ok(m[1])) bad.set(m[1], path.relative(out, f));
  }
}
console.log(`${files.length} pages scanned, ${bad.size} broken internal links`);
for (const [h, f] of bad) console.log(`  ${h}  (first seen in ${f})`);
process.exit(bad.size ? 1 : 0);
