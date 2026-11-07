import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { BANKS } from '@/data/banks';
import { COMPARISONS } from '@/data/compare';

export const metadata: Metadata = { title: 'UAE Mortgage Rates by Bank — November 2026', description: 'Rates, margins over EIBOR and minimum rates for 24 UAE banks, plus 15 side-by-side comparisons.', alternates: { canonical: '/rates' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Rates', href: '/rates' }]} eyebrow="Rates" title="UAE mortgage rates, revert margins and floors by bank"
        capsule="We track 24 UAE mortgage lenders: one- and two-year fixed rates starting at 3.75%, three- and five-year fixes, the margin over three-month EIBOR once the fix ends (+1.00% to +1.99%), minimum rates, free overpayment and limits for overseas buyers. Start with the full rate table or put two banks side by side." />
      <Section title="Benchmarks"><LinkGrid cols={2} links={[{ title: '24-Bank Rate & Revert Bible', body: 'The full table with five-year cost ranking.', href: '/rates/uae-mortgage-rates-eibor-revert-bible', tag: 'Master table' }, { title: 'EIBOR Live Tracker', body: '1M, 3M and 6M EIBOR with revert-rate impact.', href: '/rates/eibor-live-tracker', tag: '3M 4.45%' }]} /></Section>
      <Section tone="mist" title="24 bank rate pages"><LinkGrid cols={4} links={BANKS.map((b) => ({ title: b.name, body: `From ${b.intro}% · EIBOR + ${b.margin.toFixed(2)}%`, href: `/rates/${b.slug}` }))} /></Section>
      <Section id="compare" title="15 head-to-head comparisons"><LinkGrid links={COMPARISONS.map((c) => ({ title: c.title, href: `/rates/compare/${c.slug}` }))} /></Section>
      <CtaBand />
    </>
  );
}
