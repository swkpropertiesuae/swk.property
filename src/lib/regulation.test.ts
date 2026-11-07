import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { REG, LENDER, maxLtv, CHECKED_ON } from '../data/regulation.ts';

// Values verified against the CBUAE Rulebook (Art. 3), Resolution 31/2/2020 and the Oct-2019 fee amendment.
test('CBUAE ratios match the published rulebook', () => {
  assert.deepEqual(REG.ltv.national, { first: 85, firstAbove: 75, subsequent: 65 });
  assert.deepEqual(REG.ltv.expat, { first: 80, firstAbove: 70, subsequent: 60 });
  assert.equal(REG.valueThreshold, 5_000_000);
  assert.equal(REG.dbrMax, 50);
  assert.equal(REG.tenorMax, 25);
  assert.deepEqual(REG.earlySettlement, { pct: 1, capAed: 10_000 });
  assert.match(CHECKED_ON, /^\d{4}-\d{2}-\d{2}$/);
});

test('maxLtv applies the AED 5M threshold and second-home caps', () => {
  assert.equal(maxLtv('expat', 5_000_000), 80);
  assert.equal(maxLtv('expat', 5_000_001), 70);
  assert.equal(maxLtv('national', 3_000_000), 85);
  assert.equal(maxLtv('national', 9_000_000), 75);
  assert.equal(maxLtv('expat', 2_000_000, false), 60);
  assert.equal(maxLtv('national', 2_000_000, false), 65);
  assert.ok(LENDER.offPlanLtv <= 50);
});

const files = (dir: string): string[] => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? files(p) : /\.(ts|tsx)$/.test(f) && !/\.test\.ts$/.test(f) && !p.endsWith('regulation.ts') ? [p] : [];
});
const SRC = files(join(import.meta.dirname, '..'));

// Figures that were wrong or mis-attributed before; they must never come back.
const FORBIDDEN: [RegExp, string][] = [
  [/10,500/, 'early-settlement cap is AED 10,000, not 10,500'],
  [/60\s*[–-]\s*65%/, 'second-home caps are 60% expat / 65% National, not a range'],
  [/65\s*[–-]\s*70%/, 'no such CBUAE band'],
  [/80\s*[–-]\s*85%/, 'state 80% expat / 85% National separately'],
  [/CBUAE[^.\n]{0,40}\b50%[^.\n]{0,30}(off-plan|under[- ]construction)/i, 'off-plan 50% is bank practice, not CBUAE'],
  [/المصرف المركزي[^.\n]{0,40}قيد الإنشاء/, 'off-plan cap is bank practice (AR)'],
];

test('no forbidden or mis-attributed regulatory figures in source', () => {
  const hits = SRC.flatMap((f) => readFileSync(f, 'utf8').split('\n').flatMap((l, i) =>
    FORBIDDEN.filter(([re]) => re.test(l)).map(([, why]) => `${f}:${i + 1} — ${why}`)));
  assert.deepEqual(hits, []);
});

// Bank-specific figures (non-resident panels, demo dashboards) may stay literal; everything else must use REG.
const LITERAL_OK = /banks\.ts$|countries\.ts$|portal[\\/]|StartupExperience|CoPilot/;
const BANK_LINE = /HSBC|Mashreq|Emirates NBD|ADCB|FAB|CBD|Amlak|non-resident|Non-resident|P60|غير المقيمين/;
test('resident LTV caps are never hard-coded outside regulation.ts', () => {
  const hits = SRC.filter((f) => !LITERAL_OK.test(f)).flatMap((f) => readFileSync(f, 'utf8').split('\n').flatMap((l, i) =>
    /\b(85|80|75|70|65|60)% (LTV|من قيمة)/.test(l) && !BANK_LINE.test(l) ? [`${f}:${i + 1}`] : []));
  assert.deepEqual(hits, []);
});
