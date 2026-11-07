import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, Section, CtaBand, FaqList, Disclosure, aed } from '@/components/ui';
import RateTable from '@/components/RateTable';
import Calculator from '@/components/calc/Calculator';
import { CostBars, RatePath } from '@/components/Charts';
import { BANKS } from '@/data/banks';
import { BENCH } from '@/data/site';
import { fixedThenRevert } from '@/lib/math';

export const metadata: Metadata = { title: '2026 UAE 24-Bank Mortgage Rate, EIBOR Revert & Floor Rate Bible', description: 'Every UAE bank’s fixed rates, 3M EIBOR revert margin, minimum floor, fees, overpayment and non-resident LTV—November 2026.', alternates: { canonical: '/rates/uae-mortgage-rates-eibor-revert-bible' } };

export default function Page() {
  const ranked = BANKS.map((b) => ({ b, r: fixedThenRevert(1_500_000, 25, b.intro, b.introTerm === '1Y' ? 1 : 2, BENCH.eibor3m, b.margin, b.floor, 5) })).sort((a, c) => a.r.cost - c.r.cost);
  return (
    <>
      <PageHero crumbs={[{ name: 'Rates', href: '/rates' }, { name: 'Rate & revert bible', href: '/rates/uae-mortgage-rates-eibor-revert-bible' }]} eyebrow="UAE mortgage rates" title="UAE mortgage rates: 24-bank comparison, EIBOR revert & floor rates"
        capsule={`As of November 2026, UAE fixed mortgage rates start at 3.75% (1-year Islamic profit rate at Sharjah Islamic Bank) and 3.89% (2-year conventional fixed at Emirates NBD and United Arab Bank), while 3-year fixed rates range between 3.95% and 4.39%. After the fixed term, loans revert to 3-Month EIBOR (${BENCH.eibor3m.toFixed(2)}%, CBUAE fixing ${BENCH.eiborDate}) plus 1.00% to 1.99%, subject to a minimum floor rate.`}>
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
      <Section title="Five-year cost ranking on AED 1.5M" intro="Same loan, same 25-year term, intro rate then EIBOR + margin (floored). Lower is better.">
        <ol className="grid gap-2 md:grid-cols-2">
          {ranked.map(({ b, r }, i) => (
            <li key={b.slug}><Link href={`/rates/${b.slug}`} className="card flex items-center justify-between !p-4"><span><span className="num me-3 text-slate">{String(i + 1).padStart(2, '0')}</span><span className="font-semibold text-navy">{b.name}</span></span><span className="num font-semibold text-navy">{aed(r.cost)}</span></Link></li>
          ))}
        </ol>
      </Section>
      <Section tone="mist" title="Run it on your loan"><div className="rounded-card border border-line p-5 sm:p-8"><Calculator slug="fixed-to-revert-analyzer" /></div></Section>
      <Section tone="mist" title="Reading a rate card"><div className="max-w-3xl"><FaqList faqs={[
        { q: 'What is a revert margin?', a: 'The fixed percentage a bank adds to 3-month EIBOR once your fixed period ends. It is set in your offer letter and usually lasts for the life of the loan.' },
        { q: 'What is a floor rate?', a: 'The minimum rate you will pay after reversion even if EIBOR falls. A high floor (e.g. 3.75%) removes much of the benefit of falling rates.' },
        { q: 'Why is HSBC’s 1.99% floor important?', a: 'If EIBOR drops, a low floor lets your rate fall with it; combined with a +1.24% margin it is one of the best long-term holds.' },
      ]} /></div></Section>
      <CtaBand />
    </>
  );
}
