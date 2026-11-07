'use client';
// Animated charts: bars and lines grow when scrolled into view (once); static for reduced motion.
import { motion, useReducedMotion } from 'motion/react';
import { BANKS } from '@/data/banks';
import { fixedThenRevert } from '@/lib/math';
import { BENCH } from '@/data/site';

const ease = [0.22, 1, 0.36, 1] as const;
const aedK = (n: number) => `AED ${Math.round(n / 1000).toLocaleString('en-US')}k`;

/** 5-year interest on AED 1.5M / 25y for every bank, ranked. */
export function costRanking(loan = 1_500_000) {
  return BANKS.map((b) => ({ b, cost: fixedThenRevert(loan, 25, b.intro, b.introTerm === '1Y' ? 1 : 2, BENCH.eibor3m, b.margin, b.floor, 5).cost })).sort((x, y) => x.cost - y.cost);
}

export function CostBars({ limit = 10, compact = false }: { limit?: number; compact?: boolean }) {
  const reduce = useReducedMotion();
  const rows = costRanking().slice(0, limit);
  const max = rows[rows.length - 1].cost, min = rows[0].cost * 0.9;
  return (
    <figure aria-label="Five-year interest cost by bank on AED 1.5M">
      <ul className={compact ? 'space-y-1.5' : 'space-y-2.5'}>
        {rows.map(({ b, cost }, i) => (
          <li key={b.slug} className="grid grid-cols-[minmax(0,7.5rem)_1fr_auto] items-center gap-3">
            <span className={`truncate font-medium text-navy ${compact ? 'text-[10px]' : 'text-sm'}`}>{b.short}</span>
            <span className={`relative overflow-hidden rounded-full bg-mist ${compact ? 'h-2' : 'h-3'}`}>
              <motion.span className={`absolute inset-y-0 start-0 rounded-full ${i === 0 ? 'bg-teal' : 'bg-navy/70'}`}
                initial={reduce ? false : { width: 0 }} whileInView={{ width: `${((cost - min) / (max - min)) * 100}%` }} viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.9, delay: i * 0.06, ease }} style={reduce ? { width: `${((cost - min) / (max - min)) * 100}%` } : undefined} />
            </span>
            <span className={`num text-end text-slate ${compact ? 'text-[10px]' : 'text-sm'}`}>{aedK(cost)}</span>
          </li>
        ))}
      </ul>
      {!compact && <figcaption className="mt-4 text-xs text-slate">Interest paid in 5 years on AED 1.5M over 25 years: intro fixed rate, then 3M EIBOR {BENCH.eibor3m.toFixed(2)}% (CBUAE, {BENCH.eiborDate}) + bank margin (floored). Lower is better.</figcaption>}
    </figure>
  );
}

/** Rate path: intro fixed then revert, for two banks. Shows why the lowest teaser is not the cheapest loan. */
export function RatePath() {
  const reduce = useReducedMotion();
  const a = BANKS.find((b) => b.key === 'sib')!, b = BANKS.find((x) => x.key === 'dib')!;
  const W = 520, H = 200, X = (yr: number) => 40 + (yr / 5) * (W - 60), Y = (r: number) => 20 + ((6.4 - r) / (6.4 - 3.4)) * (H - 50);
  const path = (intro: number, years: number, rev: number) => `M${X(0)},${Y(intro)} L${X(years)},${Y(intro)} L${X(years)},${Y(rev)} L${X(5)},${Y(rev)}`;
  const ra = Math.max(BENCH.eibor3m + a.margin, a.floor), rb = Math.max(BENCH.eibor3m + b.margin, b.floor);
  const draw = (d: number) => (reduce ? {} : { initial: { pathLength: 0 }, whileInView: { pathLength: 1 }, viewport: { once: true }, transition: { duration: 1.6, delay: d, ease } });
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`${a.name}: ${a.intro}% for 1 year then ${ra.toFixed(2)}%. ${b.name}: ${b.intro}% then ${rb.toFixed(2)}%.`}>
        {[0, 1, 2, 3, 4, 5].map((y) => <text key={y} x={X(y)} y={H - 8} textAnchor="middle" className="fill-slate text-[11px]">{y === 0 ? 'Start' : `Yr ${y}`}</text>)}
        {[3.5, 4.5, 5.5, 6.5].map((r) => <g key={r}><line x1={40} x2={W - 20} y1={Y(r)} y2={Y(r)} className="stroke-line" /><text x={34} y={Y(r) + 4} textAnchor="end" className="fill-slate font-mono text-[10px]">{r.toFixed(1)}</text></g>)}
        <motion.path d={path(a.intro, 1, ra)} fill="none" strokeWidth={3} className="stroke-warn" strokeLinejoin="round" {...draw(0)} />
        <motion.path d={path(b.intro, 1, rb)} fill="none" strokeWidth={3} className="stroke-teal" strokeLinejoin="round" {...draw(0.3)} />
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <span className="flex items-center gap-2"><span className="h-0.5 w-5 bg-warn" />{a.short}: {a.intro}% → {ra.toFixed(2)}%</span>
        <span className="flex items-center gap-2"><span className="h-0.5 w-5 bg-teal" />{b.short}: {b.intro}% → {rb.toFixed(2)}%</span>
      </figcaption>
    </figure>
  );
}

/** App screen shown inside the laptop mockup. */
export function OfferDashboard() {
  const top = costRanking()[0];
  return (
    <div className="flex h-full text-[10px] sm:text-[11px]" aria-hidden="true">
      <aside className="hidden w-[22%] shrink-0 flex-col gap-1.5 bg-navy p-3 text-white/70 sm:flex">
        <img src="/brand/logo-white.svg" alt="" className="mb-3 h-5 w-auto self-start" />
        {['Offers', 'Documents', 'Valuation', 'Transfer'].map((t, i) => <span key={t} className={`rounded px-2 py-1 ${i === 0 ? 'bg-white/15 text-white' : ''}`}>{t}</span>)}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3">
        <div className="flex items-center justify-between"><b className="text-[12px] text-navy sm:text-[13px]">Example offer comparison</b><span className="rounded-full bg-teal-50 px-2 py-0.5 text-teal">24 banks</span></div>
        <div className="grid grid-cols-3 gap-1.5">
          {[['Best 5-yr cost', top.b.short], ['3M EIBOR', `${BENCH.eibor3m.toFixed(2)}%`], ['Lowest floor', '1.99%']].map(([k, v]) => <div key={k} className="rounded bg-mist p-1.5"><div className="text-slate">{k}</div><div className="num font-semibold text-navy">{v}</div></div>)}
        </div>
        <div className="min-h-0 flex-1 rounded border border-line p-2"><CostBars limit={7} compact /></div>
      </div>
    </div>
  );
}
