import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { ADVISORY } from '@/data/content';

export const metadata: Metadata = { title: '360° Private Client, Wills & Commercial Desk', description: 'Business property finance, SME borrowing, conveyancing, DIFC wills, life cover, currency exchange, remote PoA and valuation reviews.', alternates: { canonical: '/advisory' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Advisory', href: '/advisory' }]} eyebrow="Advisory" title="Everything around the mortgage, handled by one desk"
        capsule="Outside home loans, our advisory team handles business property finance up to AED 600M, SME borrowing, conveyancing, DIFC wills, outside life cover, currency exchange, remote powers of attorney and valuation reviews, so the same people stay with your file from contract to title deed." />
      <Section title="Eight advisory services"><LinkGrid cols={4} links={ADVISORY.map((a) => ({ title: a.name, body: a.capsule.split('. ')[0] + '.', href: `/advisory/${a.slug}` }))} /></Section>
      <CtaBand />
    </>
  );
}
