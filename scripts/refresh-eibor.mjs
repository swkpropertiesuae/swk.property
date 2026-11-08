// Refresh src/data/eibor-snapshot.json from the CBUAE public EIBOR page before each build.
// Never fails the build: on any error the last dated snapshot is kept and a warning is printed.
// Run: node --experimental-strip-types scripts/refresh-eibor.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { EIBOR_ENDPOINT, EIBOR_SOURCE, parseEibor } from '../src/lib/eibor.ts';

const file = new URL('../src/data/eibor-snapshot.json', import.meta.url);
try {
  const res = await fetch(EIBOR_ENDPOINT, { signal: AbortSignal.timeout(15000), headers: { Accept: 'text/html' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const history = parseEibor(await res.text());
  const latest = history[history.length - 1];
  const prev = JSON.parse(readFileSync(file, 'utf8'));
  if (latest.date < prev.latest.date) throw new Error(`upstream fixing ${latest.date} is older than snapshot ${prev.latest.date}`);
  writeFileSync(file, JSON.stringify({ status: 'snapshot', source: EIBOR_SOURCE, retrievedAt: new Date().toISOString(), latest, history }, null, 2) + '\n');
  console.log(`EIBOR snapshot refreshed: 3M ${latest.threeMonth}% fixed ${latest.date}`);
} catch (e) {
  console.warn(`EIBOR refresh skipped (${e.message}); keeping the existing dated snapshot.`);
}
