import type { Metadata } from 'next';
import { REG, LENDER } from '@/data/regulation';
import { PageHero, Section, Facts, FaqList, CtaBand, LinkGrid } from '@/components/ui';
import Calculator from '@/components/calc/Calculator';
import { DEVELOPERS, PROJECTS } from '@/data/handover';

export const metadata: Metadata = { title: 'Dubai Off-Plan Handover Mortgage Guide (2026)', description: 'How lending works while a building is under construction and at handover, what it costs to move from Oqood to title deed, and how a higher valuation can free up cash.', alternates: { canonical: '/handover/dubai-off-plan-handover-mortgage-guide' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Off-plan handover', href: '/handover' }, { name: 'Handover guide', href: '/handover/dubai-off-plan-handover-mortgage-guide' }]} eyebrow="Master guide" title="Dubai off-plan handover mortgage guide: from construction to keys"
        capsule={`A wave of 60/40, 70/30 and 80/20 payment plans is coming due. During construction, most lenders will not go above ${LENDER.offPlanLtv}% of the price. As completion approaches, a bank can assess the unit as a finished home, and the normal first-home limits take over: ${REG.ltv.expat.first}% for expatriates and ${REG.ltv.national.first}% for UAE Nationals up to AED 5M. That only works if the bank has approved the project.`} />
      <Section title="The handover numbers">
        <Facts facts={[['During construction (bank policy)', `up to ${LENDER.offPlanLtv}%`], ['At handover, expat first home', `${REG.ltv.expat.first}%`], ['At handover, UAE National first home', `${REG.ltv.national.first}%`], ['Non-resident (bank policy)', `${LENDER.nonResidentLtv.min}–${LENDER.nonResidentLtv.max}%`], ['DLD 4% at handover', 'Not payable'], ['Fees due', '0.25% + AED 290, AED 4,200, AED 580, AED 3,150']]} />
      </Section>
      <Section tone="mist" title="Five steps to completion">
        <ol className="grid gap-4 md:grid-cols-5">
          {['Check APL coverage for your tower', 'Dual-bank pre-approval 60–90 days out', 'Bank valuation on completion', 'Final Offer Letter & developer NOC', 'Pay developer, Oqood → title deed'].map((s, i) => <li key={s} className="card"><span className="num text-sm text-teal">0{i + 1}</span><p className="mt-2 font-medium text-navy">{s}</p></li>)}
        </ol>
      </Section>
      <Section title="Valuation-uplift cash-out" intro={`Say you paid AED 2.0M on an 80/20 plan and the unit is valued at AED 2.8M at handover. A ${REG.ltv.expat.first}% loan on that value is AED ${(2.8 * REG.ltv.expat.first / 100).toFixed(2)}M. AED 400,000 clears the developer and the remainder could be released, if the repayment passes the affordability test.`}>
        <div className="rounded-card border border-line p-5 sm:p-8"><Calculator slug="handover-equity-release" /></div>
      </Section>
      <Section tone="mist" title="14 developer APL hubs"><LinkGrid cols={4} links={DEVELOPERS.filter((d) => d.hub).map((d) => ({ title: d.name, body: `${PROJECTS.filter((p) => p.dev === d.slug).length} projects`, href: `/handover/${d.slug}` }))} /></Section>
      <Section title="FAQ"><div className="max-w-3xl"><FaqList faqs={[
        { q: 'What is an Approved Project List (APL)?', a: 'The list of developers and individual buildings a bank has agreed to lend on. If your building is missing from a bank’s list, that bank will not finance it.' },
        { q: 'Can I get cash back at handover?', a: `Yes, at banks that lend on the handover valuation—within the CBUAE LTV caps and the ${REG.dbrMax}% debt burden limit.` },
        { q: 'What happens with a post-handover payment plan?', a: 'You can carry on paying the developer, or clear the balance with a mortgage once the title is issued.' },
      ]} /></div></Section>
      <CtaBand />
    </>
  );
}
