import type { Metadata } from 'next';
import { PageHero, Section } from '@/components/ui';
import { SITE, DISCLOSURE_FULL, RULES, fullAddress } from '@/data/site';

export const metadata: Metadata = { title: 'CBUAE Consumer Protection Disclosure, Privacy Policy & Terms', description: 'How Betterway Mortgages is paid, how rates, floors and fees are shown, and how personal data is handled.', alternates: { canonical: '/privacy-and-cbuae-disclosure' } };

const BLOCKS: [string, string[]][] = [
  ['How we are paid', ['Request written confirmation of any broker fees and lender remuneration before proceeding. Your bank offer should set out bank fees and repayment terms.']],
  ['How rates are shown', [DISCLOSURE_FULL, 'All rates, margins and floors are indicative as of ' + SITE.asOf + ' and are confirmed only in the bank’s Final Offer Letter.']],
  ['Key CBUAE consumer rules', RULES.map((r) => `${r.k}: ${r.v}.`)],
  ['Your data', ['We collect only what is needed to assess and submit a mortgage application: identity, income, liabilities and property details.', 'This website does not provide a live document vault. Do not send identity or bank documents through a demonstration screen. Ask your advisor for the approved secure submission channel.', 'You can request access, correction or deletion at any time by e-mailing ' + SITE.email + '.']],
  ['Complaints', ['Raise any complaint with our desk first. If unresolved, you may escalate to the CBUAE consumer protection channels or Sanadak.', `Registered office: ${fullAddress}.${SITE.licence ? ` ${SITE.licence}.` : ''}`]],
];

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Privacy & CBUAE disclosure', href: '/privacy-and-cbuae-disclosure' }]} eyebrow="Legal" aside={false} title="CBUAE consumer protection disclosure, privacy policy & terms"
        capsule="Understand the assumptions behind the figures on this website, request written confirmation of fees, and use an approved secure channel for application documents. The lender’s written offer sets out your actual mortgage terms." />
      <Section title="Full disclosure">
        <div className="max-w-3xl space-y-10">
          {BLOCKS.map(([h, ps]) => (
            <div key={h}><h3 className="font-display text-xl font-semibold">{h}</h3><div className="prose-bw mt-3">{ps.map((p) => <p key={p}>{p}</p>)}</div></div>
          ))}
        </div>
      </Section>
    </>
  );
}
