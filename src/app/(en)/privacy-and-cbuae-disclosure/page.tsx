import type { Metadata } from 'next';
import { PageHero, Section, Sources } from '@/components/ui';
import { SITE, DISCLOSURE_FULL, RULES, fullAddress } from '@/data/site';

export const metadata: Metadata = { title: 'CBUAE Consumer Protection Disclosure, Privacy Policy & Terms', description: 'How Betterway Mortgages earns its income, how rates, minimum rates and fees are presented, and how we handle personal data.', alternates: { canonical: '/privacy-and-cbuae-disclosure' } };

const BLOCKS: [string, string[]][] = [
  ['How we are paid', ['Ask us to confirm in writing any fee we charge and any payment we receive from a lender before you proceed. The bank’s offer should list its own fees and repayment terms.']],
  ['How rates are shown', [DISCLOSURE_FULL, 'All rates, margins and floors are indicative as of ' + SITE.asOf + ' and are confirmed only in the bank’s Final Offer Letter.']],
  ['Key CBUAE consumer rules', RULES.map((r) => `${r.k}: ${r.v}.`)],
  ['Your data', ['We only collect what a mortgage application needs: your identity, income, debts and property details.', 'This site does not host a live document store. Please do not send ID or bank documents through any demonstration screen; ask your advisor for the approved secure route.', 'You can request access, correction or deletion at any time by e-mailing ' + SITE.email + '.']],
  ['Complaints', ['Please bring any complaint to us first. If we cannot resolve it, you can take it to the CBUAE consumer protection channels or to Sanadak.', `Registered office: ${fullAddress}.${SITE.licence ? ` ${SITE.licence}.` : ''}`]],
];

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Privacy & CBUAE disclosure', href: '/privacy-and-cbuae-disclosure' }]} eyebrow="Legal" aside={false} title="CBUAE consumer protection disclosure, privacy policy & terms"
        capsule="See the assumptions behind every figure on this site, ask for fees in writing, and send application documents only through an approved secure channel. Your actual terms are the ones in the lender’s written offer." />
      <Section title="Full disclosure">
        <div className="max-w-3xl space-y-10">
          {BLOCKS.map(([h, ps]) => (
            <div key={h}><h3 className="font-display text-xl font-semibold">{h}</h3><div className="prose-bw mt-3">{ps.map((p) => <p key={p}>{p}</p>)}</div></div>
          ))}
        </div>
        <Sources />
      </Section>
    </>
  );
}
