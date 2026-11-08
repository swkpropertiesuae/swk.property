import type { Metadata } from 'next';
import { REG } from '@/data/regulation';
import Link from 'next/link';
import { PageHero, Section, CtaBand, aed } from '@/components/ui';
import { Filter } from '@/components/client';
import { buyoutSavings, handoverRelease, borrowingPower } from '@/lib/math';

export const metadata: Metadata = { title: 'Client Reviews & Case Studies', description: 'Sample mortgage cases by buyer type: overseas, self-employed, off-plan handover and switching.', alternates: { canonical: '/reviews' } };

const bo = buyoutSavings({ balance: 1_800_000, currentRate: 6.1, newRate: 3.99, yearsLeft: 21 });
const ho = handoverRelease(2_000_000, 20, 2_800_000, REG.ltv.expat.first);
const cards = borrowingPower({ salary: 38_000, existingEmis: 0, cardLimits: 120_000, years: 25 });
const noCards = borrowingPower({ salary: 38_000, existingEmis: 0, cardLimits: 0, years: 25 });

// Worked scenarios show the method with real formulas; they are not client testimonials.
const CASES = [
  { tags: ['Buyout'], title: 'Revert shock on a Marina apartment', body: `An AED 1.8M loan about to move to 6.10%. Fixing at 3.99% for three years elsewhere cuts the repayment by ${aed(bo.monthly)} a month. The ${aed(bo.switchCost)} cost of switching is earned back in ${bo.breakEvenMonths} months.`, href: '/calculators/buyout-refinance-savings' },
  { tags: ['Handover'], title: '80/20 handover with valuation uplift', body: `Paid AED 2.0M off-plan, valued at AED 2.8M on completion. A ${REG.ltv.expat.first}% loan on the new value comes to ${aed(ho.loanCap)}. AED 400,000 settles the developer, leaving up to ${aed(ho.cashOut)} that could be released if affordability allows.`, href: '/calculators/handover-equity-release' },
  { tags: ['Self-employed'], title: 'Freezone owner on a low salary draw', body: 'Example: a DMCC company owner pays themselves AED 15,000 a month while the business makes AED 1.2M a year. A bank that counts company profit could assess income nearer AED 100,000 a month.', href: '/mortgages/self-employed' },
  { tags: ['Resident'], title: 'Unused credit cards blocking approval', body: `Earning AED 38,000 a month with AED 120,000 in card limits. Cancelling two cards that were never used lifts the possible loan from ${aed(cards.maxLoan)} to ${aed(noCards.maxLoan)}.`, href: '/calculators/dbr-borrowing-power' },
  { tags: ['Non-resident'], title: 'UK buyer closing without flying in', body: 'Example: P60, SA302 and an Experian report; sterling income discounted by 15%; a 60% loan; Form F signed online and a short video PoA.', href: '/mortgages/non-resident-uk' },
  { tags: ['Non-resident', 'Golden Visa'], title: 'Planning property finance and residency', body: 'A buyer is looking at an AED 2.1M apartment. The mortgage and the residency application each need their own checks with the bank and the authority.', href: '/mortgages/golden-visa-mortgage' },
];

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Reviews', href: '/reviews' }]} eyebrow="Proof" title="Mortgage examples, explained."
        capsule="These are worked planning examples, not client testimonials or promises of a result. Filter them by overseas buyer, self-employed, handover or switching." />
      <Section title="Google reviews">
        {/* Client slot: embed the verified Google Business Profile reviews widget for Al Nasr Plaza here. */}
        <div className="card flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-slate">Search for Betterway Mortgages on Google Maps, and check who posted each review and where it came from.</p>
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
