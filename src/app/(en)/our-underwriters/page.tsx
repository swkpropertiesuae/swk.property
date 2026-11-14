import type { Metadata } from 'next';
import { PageHero, Section, CtaBand } from '@/components/ui';
import { Photo } from '@/components/media';

export const metadata: Metadata = { title: 'Mortgage Specialists for Dubai & UAE', description: 'Specialist mortgage desks at Betterway: residents, non-residents, self-employed, off-plan handover, Islamic and private client.', alternates: { canonical: '/our-underwriters' } };

// Desk structure. Named profiles (with Person schema) are added once each advisor's licence details are confirmed.
const DESKS = [
  ['Resident & first-home desk', 'Salaried expats and UAE Nationals; employer and income requirements.', ['Salary-transfer vs non-STL pricing', 'MRHE / SZHP top-ups', 'Pre-approval documents']],
  ['Non-resident desk', 'Overseas income, tax documents and credit files.', ['Video PoA closing', 'Home-country credit files', 'FX costs']],
  ['Self-employed desk', 'Freezone and mainland owners; corporate net profit and add-back presentation.', ['Audited financial review', 'Retained-earnings cases', 'Commercial premises']],
  ['Off-plan & handover desk', 'Project eligibility, developer payments and valuation requirements.', ['APL coverage checks', 'Developer NOCs', 'Handover cash-out']],
  ['Islamic finance desk', 'Ijara, Murabaha and Diminishing Musharaka across eight Islamic lenders.', ['Takaful assignment', 'Profit-rate comparison', 'Sharia board documentation']],
  ['Private client & commercial', 'AED 15M+ trophy assets, portfolios and commercial property finance.', ['Relationship pricing', 'Property valuation', 'SPV structures']],
] as const;

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Our underwriters', href: '/our-underwriters' }]} eyebrow="People" title="Mortgage support for your situation." aside={<Photo name="advisor-consultation" priority sizes="(min-width: 1024px) 540px, 100vw" alt="Concept image: an advisor reviewing a mortgage offer with a client" className="bw-window aspect-[16/10] w-full" />}
        capsule="Explore guidance for residents, overseas buyers, business owners, handover purchases, Islamic finance and high-value property. An advisor can help you prepare; the lender carries out underwriting and makes the lending decision." />
      <Section title="Six areas of mortgage support">
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
