import type { Metadata } from 'next';
import { PageHero, Section } from '@/components/ui';
import { SITE } from '@/data/site';

export const metadata: Metadata = { title: 'Careers at Betterway Mortgages', description: 'Tell us you are interested in mortgage advice and progression roles at Betterway in Dubai.', alternates: { canonical: '/careers' } };

const ROLES = [
  ['Senior Mortgage Underwriter', 'Resident & first-home desk', 'Manage cases from start to finish across 24 lenders. At least three years of UAE bank or brokerage underwriting.'],
  ['Non-Resident Mortgage Specialist', 'Non-resident desk', 'Build cases on foreign income. Familiarity with UK, Indian or European tax paperwork.'],
  ['RERA Progression Manager', 'Conveyancing', 'Take files from Form F to title deed: NOCs, payoff letters, cheques and trustee bookings.'],
  ['Partner Success Manager', 'Partner Hub', 'Bring estate agents on board and look after them through the referral process.'],
];

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Careers', href: '/careers' }]} eyebrow="Careers" title="Build a career in mortgage advice."
        capsule="Thinking about a career in mortgage advice, application support or file progression? Send us a short note about yourself, and we will let you know if a suitable opening exists." updated={false} />
      <Section title="Areas of interest">
        <div className="divide-y divide-line rounded-card border border-line">
          {ROLES.map(([t, d, b]) => (
            <div key={t} className="flex flex-wrap items-center justify-between gap-4 p-6">
              <div className="max-w-2xl"><p className="font-display text-lg font-semibold text-navy">{t}</p><p className="text-sm text-teal">{d}</p><p className="mt-2 text-sm text-slate">{b}</p></div>
              <a className="btn btn-ghost" href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Application: ${t}`)}`}>Express interest</a>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
