import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { PRODUCTS } from '@/data/products';
import { COUNTRIES } from '@/data/countries';

export const metadata: Metadata = { title: 'UAE Mortgage Products & Buyer Profiles', description: 'All 14 mortgage types we arrange, plus 25 guides for overseas buyers by country.', alternates: { canonical: '/mortgages' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Mortgages', href: '/mortgages' }]} eyebrow="Mortgages" title="Every UAE mortgage, for every kind of buyer"
        capsule="We arrange home loans for residents, Islamic finance, off-plan and handover loans, switching, equity release, non-resident and Golden Visa finance, build loans and very large loans with 24 UAE lenders. Each page explains the borrowing limits, the documents banks ask for and includes a working calculator." />
      <Section title="14 mortgage products"><LinkGrid links={PRODUCTS.map((p) => ({ title: p.name, body: p.card, href: `/mortgages/${p.slug}`, tag: p.badge }))} /></Section>
      <Section tone="mist" title="Non-resident guides by country"><LinkGrid cols={4} links={COUNTRIES.map((c) => ({ title: c.name, body: `${c.ltv} LTV · ${c.fx}`, href: `/mortgages/non-resident-${c.slug}` }))} /></Section>
      <CtaBand />
    </>
  );
}
