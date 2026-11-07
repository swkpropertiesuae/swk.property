import type { Metadata } from 'next';
import { PageHero, Section, CtaBand, Facts, aed } from '@/components/ui';
import EiborChart from '@/components/EiborChart';
import { BENCH } from '@/data/site';
import { BANKS } from '@/data/banks';
import { emi } from '@/lib/math';

export const metadata: Metadata = { title: 'EIBOR Tracker — 1M, 3M & 6M Mortgage Impact', description: 'Understand how 1M, 3M and 6M EIBOR affect UAE mortgage repayments using illustrative scenarios.', alternates: { canonical: '/rates/eibor-live-tracker' } };

export default function Page() {
  const shocks = [-0.5, -0.25, 0, 0.25, 0.5];
  return (
    <>
      <PageHero crumbs={[{ name: 'Rates', href: '/rates' }, { name: 'EIBOR tracker', href: '/rates/eibor-live-tracker' }]} eyebrow="Understand EIBOR" title="EIBOR tracker: 1M, 3M and 6M EIBOR"
        capsule="EIBOR is a reference rate used in many UAE variable-rate mortgages. Your offer specifies the benchmark, bank margin, reset dates and any floor. The figures below are illustrative scenarios, not a live feed. Check the CBUAE publication for current rates." />
      <Section title="Illustrative benchmark inputs">
        <Facts facts={[['CBUAE base rate', `${BENCH.baseRate}%`], ['1M EIBOR', `${BENCH.eibor1m}%`], ['3M EIBOR', `${BENCH.eibor3m}%`], ['6M EIBOR', `${BENCH.eibor6m}%`], ['Revert range', '5.45%–6.44%'], ['Lowest floor', '1.99% (HSBC)']]} />
        <div className="mt-8"><EiborChart /></div><a href="https://www.centralbank.ae/en/forex-eibor/eibor-rates/" className="mt-5 inline-block text-sm font-semibold text-teal">Published EIBOR rates · CBUAE ↗</a>
      </Section>
      <Section tone="mist" title="What an EIBOR move does to your payment" intro="AED 1.5M, 20 years remaining, using an example +1.65% margin.">
        <div className="overflow-x-auto rounded-card border border-line bg-white">
          <table className="table-bw"><thead><tr><th>3M EIBOR</th><th>Revert rate</th><th>Monthly payment</th><th>Change</th></tr></thead>
            <tbody className="num">{shocks.map((s) => { const r = BENCH.eibor3m + s + 1.65; const e = emi(1_500_000, r, 20), base = emi(1_500_000, BENCH.eibor3m + 1.65, 20); return <tr key={s}><td>{(BENCH.eibor3m + s).toFixed(2)}%</td><td>{r.toFixed(2)}%</td><td>{aed(e)}</td><td className={s ? (s > 0 ? 'text-warn' : 'text-teal') : ''}>{s ? `${s > 0 ? '+' : '−'}${aed(Math.abs(e - base)).slice(4)}` : '—'}</td></tr>; })}</tbody>
          </table>
        </div>
      </Section>
      <Section title="Revert rate by bank at the example EIBOR">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[...BANKS].sort((a, b) => a.margin - b.margin).map((b) => <div key={b.slug} className="flex justify-between rounded-xl border border-line p-3 text-sm"><span className="font-medium text-navy">{b.short}</span><span className="num">{(BENCH.eibor3m + b.margin).toFixed(2)}%</span></div>)}
        </div>
      </Section>
      <CtaBand title="Fixed period ending soon?" body="Compare a re-fix or refinance before your fixed period ends, allowing time for lender review and switching costs." />
    </>
  );
}
