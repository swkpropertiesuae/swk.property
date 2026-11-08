import type { Metadata } from 'next';
import { PageHero, Section, CtaBand } from '@/components/ui';
import { Photo } from '@/components/media';

export const metadata: Metadata = { title: 'Mortgage Specialists for Dubai & UAE', description: 'The specialist mortgage teams at Betterway: residents, overseas buyers, business owners, off-plan handover, Islamic finance and private clients.', alternates: { canonical: '/our-underwriters' } };

// Desk structure. Named profiles (with Person schema) are added once each advisor's licence details are confirmed.
const DESKS = [
  ['Resident & first-home desk', 'Salaried expats and Emiratis: what lenders need on employer and income.', ['Salary-transfer vs non-STL pricing', 'MRHE / SZHP top-ups', 'Pre-approval documents']],
  ['Non-resident desk', 'Overseas income, tax documents and credit files.', ['Video PoA closing', 'Home-country credit files', 'FX costs']],
  ['Self-employed desk', 'Free zone and mainland owners: presenting company profit and add-backs.', ['Audited financial review', 'Retained-earnings cases', 'Commercial premises']],
  ['Off-plan & handover desk', 'Whether banks accept the project, developer payments and valuation needs.', ['APL coverage checks', 'Developer NOCs', 'Handover cash-out']],
  ['Islamic finance desk', 'Ijara, Murabaha and Diminishing Musharaka with eight Islamic lenders.', ['Takaful assignment', 'Profit-rate comparison', 'Sharia board documentation']],
  ['Private client & commercial', 'Homes above AED 15M, property portfolios and business property.', ['Relationship pricing', 'Property valuation', 'SPV structures']],
] as const;

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Our underwriters', href: '/our-underwriters' }]} eyebrow="People" title="Mortgage support for your situation." aside={<Photo name="advisor-consultation" priority sizes="(min-width: 1024px) 300px, 100vw" alt="Concept image: an advisor reviewing a mortgage offer with a client" className="hidden aspect-[4/5] lg:block" />}
        capsule="Find guidance for residents, overseas buyers, business owners, handover purchases, Islamic finance and high-value homes. An advisor helps you prepare; the bank does the underwriting and makes the decision." />
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
