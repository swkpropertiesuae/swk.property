import { EIBOR_SERIES } from '@/data/site';

/** Server-rendered SVG line chart of 1M / 3M / 6M EIBOR. */
export default function EiborChart() {
  const W = 760, H = 280, P = { l: 44, r: 16, t: 16, b: 32 };
  const all = EIBOR_SERIES.flatMap((d) => [d.m1, d.m3, d.m6]);
  const min = Math.floor(Math.min(...all) * 10) / 10 - 0.05, max = Math.ceil(Math.max(...all) * 10) / 10;
  const x = (i: number) => P.l + (i * (W - P.l - P.r)) / (EIBOR_SERIES.length - 1);
  const y = (v: number) => P.t + ((max - v) * (H - P.t - P.b)) / (max - min);
  const line = (k: 'm1' | 'm3' | 'm6') => EIBOR_SERIES.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(d[k]).toFixed(1)}`).join('');
  const series = [{ k: 'm3' as const, name: '3M EIBOR', cls: 'stroke-teal', w: 3 }, { k: 'm6' as const, name: '6M EIBOR', cls: 'stroke-navy', w: 1.75 }, { k: 'm1' as const, name: '1M EIBOR', cls: 'stroke-slate', w: 1.75 }];
  const ticks = Array.from({ length: 5 }, (_, i) => min + ((max - min) * i) / 4);
  const last = EIBOR_SERIES[EIBOR_SERIES.length - 1];
  return (
    <figure className="rounded-card border border-line bg-white p-4 sm:p-6">
      <div className="mb-3 flex flex-wrap gap-4 text-sm">
        {series.map((s) => <span key={s.k} className="flex items-center gap-2"><span className={`h-0.5 w-5 ${s.k === 'm3' ? 'bg-teal' : s.k === 'm6' ? 'bg-navy' : 'bg-slate'}`} />{s.name} <b className="num">{last[s.k].toFixed(2)}%</b></span>)}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`EIBOR over 12 months; 3M EIBOR now ${last.m3}%`}>
        {ticks.map((t) => <g key={t}><line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} className="stroke-line" /><text x={P.l - 8} y={y(t) + 4} textAnchor="end" className="fill-slate font-mono text-[11px]">{t.toFixed(2)}</text></g>)}
        {EIBOR_SERIES.map((d, i) => i % 2 === 1 && <text key={d.m} x={x(i)} y={H - 10} textAnchor="middle" className="fill-slate text-[11px]">{d.m}</text>)}
        {series.map((s) => <path key={s.k} d={line(s.k)} fill="none" strokeWidth={s.w} strokeLinejoin="round" strokeLinecap="round" className={s.cls} />)}
        <circle cx={x(EIBOR_SERIES.length - 1)} cy={y(last.m3)} r={5} className="fill-teal" />
      </svg>
      <figcaption className="mt-2 text-xs text-slate">Monthly averages, % p.a. Indicative; the bank’s offer letter is binding.</figcaption>
    </figure>
  );
}
