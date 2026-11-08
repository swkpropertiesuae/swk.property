import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, Section, CtaBand, FaqList, Disclosure, aed } from '@/components/ui';
import RateTable from '@/components/RateTable';
import Calculator from '@/components/calc/Calculator';
import { CostBars, RatePath } from '@/components/Charts';
import { BANKS } from '@/data/banks';
import { BENCH } from '@/data/site';
import { fixedThenRevert } from '@/lib/math';

export const metadata: Metadata = { title: '2026 UAE 24-Bank Mortgage Rate, EIBOR Revert & Floor Rate Bible', description: 'Fixed rates, margin over three-month EIBOR, minimum rate, fees, overpayment and non-resident limits for every UAE bank we track, November 2026.', alternates: { canonical: '/rates/uae-mortgage-rates-eibor-revert-bible' } };

export default function Page() {
  const by = (t: '1Y' | '2Y') => { const xs = BANKS.filter((b) => b.introTerm === t); const m = Math.min(...xs.map((b) => b.intro)); const hit = xs.filter((b) => b.intro === m); return { intro: m, name: hit[0].name, names: hit.map((b) => b.name).join(' and ') }; };
  const low1 = by('1Y'), low2 = by('2Y');
  const span = (k: 'fixed3' | 'margin') => [Math.min(...BANKS.map((b) => b[k])), Math.max(...BANKS.map((b) => b[k]))];
  const f3 = span('fixed3'), mg = span('margin');
  const ranked = BANKS.map((b) => ({ b, r: fixedThenRevert(1_500_000, 25, b.intro, b.introTerm === '1Y' ? 1 : 2, BENCH.eibor3m, b.margin, b.floor, 5) })).sort((a, c) => a.r.cost - c.r.cost);
  return (
    <>
      <PageHero crumbs={[{ name: 'Rates', href: '/rates' }, { name: 'Rate & revert bible', href: '/rates/uae-mortgage-rates-eibor-revert-bible' }]} eyebrow="UAE mortgage rates" title="UAE mortgage rates: 24-bank comparison, EIBOR revert & floor rates"
        capsule={`On our November 2026 figures, the cheapest one-year rate is ${low1.intro}% (${low1.name}) and the cheapest two-year rate is ${low2.intro}% (${low2.names}). Three-year fixes run from ${f3[0]}% to ${f3[1]}%. When the fixed period ends, the rate becomes three-month EIBOR, ${BENCH.eibor3m.toFixed(2)}% at the CBUAE fixing of ${BENCH.eiborDate}, plus a margin of ${mg[0].toFixed(2)}% to ${mg[1].toFixed(2)}%, and it cannot drop below the bank’s minimum rate.`}>
        <Disclosure />
      </PageHero>
      <Section title="All 24 banks"><RateTable /></Section>
      <Section id="revert-video" tone="mist" title="Why the lowest teaser rate can cost more" intro="A 20-second explainer, then the full ranking.">
        <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
          <video className="w-full rounded-card border border-line bg-navy" controls playsInline preload="none" poster="/video/fixed-vs-revert.jpg"><source src="/video/fixed-vs-revert.mp4" type="video/mp4" /></video>
          <div className="card"><RatePath /></div>
        </div>
        <div className="card mt-8"><p className="mb-4 font-display text-lg font-semibold text-navy">Five-year interest on AED 1.5M, cheapest 12 banks</p><CostBars limit={12} /></div>
      </Section>
      <Section title="Five-year cost ranking on AED 1.5M" intro="One loan amount and one 25-year term for every bank: the opening fixed rate, then EIBOR plus margin with the minimum applied. Lower totals are better.">
        <ol className="grid gap-2 md:grid-cols-2">
          {ranked.map(({ b, r }, i) => (
            <li key={b.slug}><Link href={`/rates/${b.slug}`} className="card flex items-center justify-between !p-4"><span><span className="num me-3 text-slate">{String(i + 1).padStart(2, '0')}</span><span className="font-semibold text-navy">{b.name}</span></span><span className="num font-semibold text-navy">{aed(r.cost)}</span></Link></li>
          ))}
        </ol>
      </Section>
      <Section tone="mist" title="Run it on your loan"><div className="rounded-card border border-line p-5 sm:p-8"><Calculator slug="fixed-to-revert-analyzer" /></div></Section>
      <Section tone="mist" title="Reading a rate card"><div className="max-w-3xl"><FaqList faqs={[
        { q: 'What is a revert margin?', a: 'The percentage a bank adds on top of three-month EIBOR when your fixed period ends. It is written into your offer letter and normally stays the same for the whole loan.' },
        { q: 'What is a floor rate?', a: 'The lowest rate you can be charged after the fixed period, however far EIBOR falls. A high minimum, such as 3.75%, takes away most of the benefit of falling rates.' },
        { q: 'Why is HSBC’s 1.99% floor important?', a: 'With a low minimum rate, your payment can follow EIBOR down, and paired with a +1.24% margin it is one of the better loans to keep for years.' },
      ]} /></div></Section>
      <CtaBand />
    </>
  );
}
