import type { Metadata } from 'next';
import { PageHero, Section, CtaBand } from '@/components/ui';
import { Photo } from '@/components/media';

export const metadata: Metadata = { title: 'Meet Our RERA & CBUAE Underwriting Desk', description: 'Specialist mortgage desks at Betterway: residents, non-residents, self-employed, off-plan handover, Islamic and private client.', alternates: { canonical: '/our-underwriters' } };

// Desk structure. Named profiles (with Person schema) are added once each advisor's licence details are confirmed.
const DESKS = [
  ['Resident & first-home desk', 'Salaried expats and UAE Nationals; employer-category mapping across 24 banks.', ['Salary-transfer vs non-STL pricing', 'MRHE / SZHP top-ups', '48h dual pre-approval']],
  ['Non-resident desk', 'Overseas buyers in 25 country corridors; bureau, tax-proof and FX haircut mapping.', ['Video PoA closing', 'Home-country credit files', 'Wholesale FX']],
  ['Self-employed desk', 'Freezone and mainland owners; corporate net profit and add-back presentation.', ['Audited financial review', 'Retained-earnings cases', 'Commercial premises']],
  ['Off-plan & handover desk', 'APL tracking for 14 developers and 80 projects; valuation uplift cash-out.', ['APL coverage checks', 'Developer NOCs', 'Handover cash-out']],
  ['Islamic finance desk', 'Ijara, Murabaha and Diminishing Musharaka across eight Islamic lenders.', ['Takaful assignment', 'Profit-rate comparison', 'Sharia board documentation']],
  ['Private client & commercial', 'AED 15M+ trophy assets, portfolios and commercial property up to AED 600M.', ['Relationship pricing', 'Two-valuer panels', 'SPV structures']],
] as const;

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Our underwriters', href: '/our-underwriters' }]} eyebrow="People" title="Meet our RERA & CBUAE underwriting desk" aside={<Photo name="advisor-consultation" priority sizes="(min-width: 1024px) 300px, 100vw" alt="A Betterway underwriter explaining an offer letter to a client" className="hidden aspect-[4/5] lg:block" />}
        capsule="Every Betterway file is owned by a salaried specialist underwriter on one of six desks—residents, non-residents, self-employed, off-plan handover, Islamic finance and private client. Underwriters are not paid per approval or per bank, so recommendations follow the client’s five-year cost." />
      <Section title="Six specialist desks">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DESKS.map(([t, b, pts]) => (
            <div key={t} className="card">
              <p className="font-display text-lg font-semibold text-navy">{t}</p>
              <p className="mt-2 text-sm text-slate">{b}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-ink">{pts.map((p) => <li key={p} className="flex gap-2"><span className="text-teal">•</span>{p}</li>)}</ul>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand title="Speak to the right desk first time" />
    </>
  );
}
