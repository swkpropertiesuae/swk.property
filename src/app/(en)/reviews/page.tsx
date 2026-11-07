import type { Metadata } from 'next';
import { REG } from '@/data/regulation';
import Link from 'next/link';
import { PageHero, Section, CtaBand, aed } from '@/components/ui';
import { Filter } from '@/components/client';
import { buyoutSavings, handoverRelease, borrowingPower } from '@/lib/math';

export const metadata: Metadata = { title: 'Client Reviews & Case Studies', description: 'Illustrative mortgage scenarios by profile: non-resident, self-employed, off-plan handover and buyout.', alternates: { canonical: '/reviews' } };

const bo = buyoutSavings({ balance: 1_800_000, currentRate: 6.1, newRate: 3.99, yearsLeft: 21 });
const ho = handoverRelease(2_000_000, 20, 2_800_000, REG.ltv.expat.first);
const cards = borrowingPower({ salary: 38_000, existingEmis: 0, cardLimits: 120_000, years: 25 });
const noCards = borrowingPower({ salary: 38_000, existingEmis: 0, cardLimits: 0, years: 25 });

// Worked scenarios show the method with real formulas; they are not client testimonials.
const CASES = [
  { tags: ['Buyout'], title: 'Revert shock on a Marina apartment', body: `AED 1.8M balance reverting to 6.10%. Switch to a 3.99% 3-year fixed: ${aed(bo.monthly)}/month lower, switch costs ${aed(bo.switchCost)} recovered in ${bo.breakEvenMonths} months.`, href: '/calculators/buyout-refinance-savings' },
  { tags: ['Handover'], title: '80/20 handover with valuation uplift', body: `Bought at AED 2.0M, valued AED 2.8M at handover. At the ${REG.ltv.expat.first}% expat first-home cap the loan could reach ${aed(ho.loanCap)}: AED 400,000 to the developer and up to ${aed(ho.cashOut)} released, subject to DBR.`, href: '/calculators/handover-equity-release' },
  { tags: ['Self-employed'], title: 'Freezone owner on a low salary draw', body: 'Example: an owner draws AED 15,000 salary from a DMCC company earning AED 1.2M profit a year. Banks that count company profit can assess income near AED 100,000 a month.', href: '/mortgages/self-employed' },
  { tags: ['Resident'], title: 'Unused credit cards blocking approval', body: `AED 38,000 salary with AED 120,000 of card limits. Closing two unused cards raised the maximum loan from ${aed(cards.maxLoan)} to ${aed(noCards.maxLoan)}.`, href: '/calculators/dbr-borrowing-power' },
  { tags: ['Non-resident'], title: 'UK buyer closing without flying in', body: 'Example: P60, SA302 and an Experian report, income counted at a 15% GBP haircut, 60% LTV, Form F signed by Dubai REST OTP and a 15-minute video PoA.', href: '/mortgages/non-resident-uk' },
  { tags: ['Non-resident', 'Golden Visa'], title: 'Planning property finance and residency', body: 'A buyer considers an AED 2.1M apartment. Mortgage eligibility and residency eligibility require separate checks with the lender and relevant authority.', href: '/mortgages/golden-visa-mortgage' },
];

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Reviews', href: '/reviews' }]} eyebrow="Proof" title="Mortgage examples, explained."
        capsule="These are illustrative planning scenarios, not customer testimonials or promised outcomes. Filter by non-resident, self-employed, handover or buyout." />
      <Section title="Google reviews">
        {/* Client slot: embed the verified Google Business Profile reviews widget for Al Nasr Plaza here. */}
        <div className="card flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-slate">Look up Betterway Mortgages on Google Maps. Check the business identity and source of each review.</p>
          <a href="https://www.google.com/maps/search/Betterway+Mortgages+Al+Nasr+Plaza" rel="noopener" className="btn btn-ghost">Find Betterway on Google</a>
        </div>
      </Section>
      <Section tone="mist" title="Example scenarios by profile">
        <Filter tags={['Resident', 'Non-resident', 'Self-employed', 'Handover', 'Buyout', 'Golden Visa']} items={CASES.map((c) => ({ tags: c.tags, node: (
          <Link key={c.title} href={c.href} className="card">
            <span className="flex gap-2">{c.tags.map((t) => <span key={t} className="tag">{t}</span>)}</span>
            <span className="mt-3 block font-display text-lg font-semibold text-navy">{c.title}</span>
            <span className="mt-2 block text-sm leading-relaxed text-slate">{c.body}</span>
          </Link>
        ) }))} />
      </Section>
      <CtaBand />
    </>
  );
}
