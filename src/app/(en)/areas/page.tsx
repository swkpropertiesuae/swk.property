import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { COMMUNITIES, EMIRATES, type Emirate } from '@/data/communities';
import { BENCH } from '@/data/site';

export const metadata: Metadata = { title: 'UAE Freehold Community Valuation & Yield Hubs', description: '60 freehold communities across Dubai, Abu Dhabi, RAK and Sharjah with price per sq.ft., yields and EMI coverage.', alternates: { canonical: '/areas' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Areas', href: '/areas' }]} eyebrow="Areas" title="60 freehold communities, priced for a mortgage"
        capsule={`So far in 2026, Dubai has registered ${BENCH.dldYtdSales.toLocaleString('en-US')} sales worth AED ${BENCH.dldYtdAedBn}B, at a median of AED ${BENCH.medianPsf.toLocaleString('en-US')} per sq.ft. Each area page gives a guide price, gross yield and how far rent goes towards the repayment for owner-occupiers and investors.`} />
      {(Object.keys(EMIRATES) as Emirate[]).map((k, i) => (
        <Section key={k} tone={i % 2 ? 'mist' : 'white'} title={EMIRATES[k].name} action={{ label: `All ${EMIRATES[k].name}`, href: `/areas/${k}` }}>
          <LinkGrid cols={4} links={COMMUNITIES.filter((c) => c.emirate === k).map((c) => ({ title: c.name, body: `AED ${c.psf.toLocaleString('en-US')}/sq.ft. · ${c.yieldPct}% yield`, href: `/areas/${k}/${c.slug}` }))} />
        </Section>
      ))}
      <CtaBand />
    </>
  );
}
