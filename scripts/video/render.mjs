// Renders a time-driven HTML scene (window.render(t)) to MP4 + WebM + poster via Playwright and ffmpeg.
// Usage: node scripts/video/render.mjs <scene.html> <out-basename> <seconds> [fps=30] [posterAt=seconds]
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright'); // globally installed in the dev container
import { spawn } from 'node:child_process';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [, , scene, out, secs, fpsArg = '30', posterAt] = process.argv;
if (!scene || !out || !secs) throw new Error('usage: render.mjs <scene.html> <out-basename> <seconds> [fps] [posterAt]');
const fps = Number(fpsArg), frames = Math.round(Number(secs) * fps);

const enc = (args) => spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-', ...args], { stdio: ['pipe', 'inherit', 'inherit'] });
const mp4 = enc(['-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${out}.mp4`]);
const webm = enc(['-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '38', '-row-mt', '1', `${out}.webm`]);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(pathToFileURL(path.resolve(scene)).href);
await page.evaluate(() => document.fonts.ready);
for (let f = 0; f < frames; f++) {
  await page.evaluate((t) => window.render(t), f / fps);
  const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
  for (const p of [mp4, webm]) if (!p.stdin.write(buf)) await new Promise((r) => p.stdin.once('drain', r));
}
await page.evaluate((t) => window.render(t), Number(posterAt ?? 0));
await page.screenshot({ path: `${out}.jpg`, type: 'jpeg', quality: 85 });
await browser.close();
for (const p of [mp4, webm]) p.stdin.end();
await Promise.all([mp4, webm].map((p) => new Promise((r, j) => p.on('close', (c) => (c ? j(new Error(`ffmpeg ${c}`)) : r())))));
console.log(`${out}: ${frames} frames @ ${fps}fps`);
