import type { Metadata } from 'next';
import { PageHero, Section } from '@/components/ui';
import { SITE } from '@/data/site';

export const metadata: Metadata = { title: 'Careers at Betterway Mortgages', description: 'Join a salaried, non-commission UAE mortgage underwriting desk at Al Nasr Plaza, Oud Metha.', alternates: { canonical: '/careers' } };

const ROLES = [
  ['Senior Mortgage Underwriter', 'Resident & first-home desk', 'Own files end to end across 24 banks; 3+ years UAE bank or brokerage underwriting.'],
  ['Non-Resident Mortgage Specialist', 'Non-resident desk', 'Structure overseas income files; experience with UK, Indian or European tax documents.'],
  ['RERA Progression Manager', 'Conveyancing', 'Run Form F to title deed: NOCs, liability letters, cheques and trustee appointments.'],
  ['Partner Success Manager', 'Partner Hub', 'Onboard and support RERA-registered agents on the 24-hour payout programme.'],
];

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Careers', href: '/careers' }]} eyebrow="Careers" title="Underwrite for the client, on a salary"
        capsule="Betterway hires salaried mortgage underwriters and RERA progression managers in Dubai. Pay is fixed, not per approval or per bank, so advice follows the client’s five-year cost. Roles are based at Al Nasr Plaza, Oud Metha." updated={false} />
      <Section title="Open roles">
        <div className="divide-y divide-line rounded-card border border-line">
          {ROLES.map(([t, d, b]) => (
            <div key={t} className="flex flex-wrap items-center justify-between gap-4 p-6">
              <div className="max-w-2xl"><p className="font-display text-lg font-semibold text-navy">{t}</p><p className="text-sm text-teal">{d}</p><p className="mt-2 text-sm text-slate">{b}</p></div>
              <a className="btn btn-ghost" href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Application: ${t}`)}`}>Apply by e-mail</a>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
