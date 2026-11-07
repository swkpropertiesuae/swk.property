import type { Metadata } from 'next';
import { PageHero, Section } from '@/components/ui';
import { SITE, DISCLOSURE_FULL, RULES, fullAddress } from '@/data/site';

export const metadata: Metadata = { title: 'CBUAE Consumer Protection Disclosure, Privacy Policy & Terms', description: 'How Betterway Mortgages is paid, how rates, floors and fees are shown, and how personal data is handled.', alternates: { canonical: '/privacy-and-cbuae-disclosure' } };

const BLOCKS: [string, string[]][] = [
  ['How we are paid', ['Betterway charges clients no brokerage fee. The lending bank pays Betterway when your loan is disbursed. This does not change the rate offered to you.', 'Advisors are salaried and receive no per-bank incentive.']],
  ['How rates are shown', [DISCLOSURE_FULL, 'All rates, margins and floors are indicative as of ' + SITE.asOf + ' and are confirmed only in the bank’s Final Offer Letter.']],
  ['Key CBUAE consumer rules', RULES.map((r) => `${r.k}: ${r.v}.`)],
  ['Your data', ['We collect only what is needed to assess and submit a mortgage application: identity, income, liabilities and property details.', 'Documents are shared only with the banks, valuers and conveyancing parties you approve, and stored in an access-controlled vault.', 'You can request access, correction or deletion at any time by e-mailing ' + SITE.email + '.']],
  ['Complaints', ['Raise any complaint with our desk first. If unresolved, you may escalate to the CBUAE consumer protection channels or Sanadak.', `Registered office: ${fullAddress}.${SITE.licence ? ` ${SITE.licence}.` : ''}`]],
];

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Privacy & CBUAE disclosure', href: '/privacy-and-cbuae-disclosure' }]} eyebrow="Legal" aside={false} title="CBUAE consumer protection disclosure, privacy policy & terms"
        capsule="Betterway Mortgages charges clients no brokerage fee and is paid by the lending bank on disbursal. Rates shown are indicative lowest advertised tiers that revert to 3-month EIBOR plus a margin, subject to a floor, after the fixed period. This page sets out fees, rules, data use and complaints." />
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
