import type { Metadata } from 'next';
import { PageHero, Section, Facts, CtaBand, LinkGrid } from '@/components/ui';
import { fullAddress } from '@/data/site';

export const metadata: Metadata = { title: 'About Betterway Mortgages — Al Nasr Plaza, Oud Metha', description: 'A salaried, non-commission UAE mortgage consultancy at Al Nasr Plaza, Oud Metha, Dubai, comparing 24 banks at zero client brokerage fee.', alternates: { canonical: '/about-us' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'About us', href: '/about-us' }]} eyebrow="About Betterway" title="A mortgage desk built around your five-year cost, not a bank’s target"
        capsule={`Betterway Mortgages is a Dubai mortgage consultancy headquartered at ${fullAddress}. Salaried, non-commission underwriters compare all 24 UAE retail mortgage lenders on rate, revert margin, floor and fees. Clients pay no brokerage fee; the lending bank remunerates Betterway on disbursal.`} />
      <Section title="Our salaried, non-commission charter">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="prose-bw">
            <p>Most UAE mortgage advice is paid per approval, often at rates that differ by bank. That quietly pushes buyers toward whichever lender pays most. Betterway’s underwriters are salaried: their pay does not change with the bank you pick.</p>
            <p>We publish every bank’s introductory rate, EIBOR revert margin, minimum floor and overpayment allowance, and we show upfront costs without a sign-up wall. If a bank down-values your home, a backup bank with a different valuer panel is already working on your file.</p>
            <p>Our office is at Al Nasr Plaza, Oud Metha. Visit us, or close the whole mortgage remotely.</p>
          </div>
          <Facts facts={[['Banks compared', '24'], ['Client fee', 'AED 0'], ['Pre-approval SLA', '48 hours'], ['Advisor pay', 'Salaried'], ['Languages', 'English · العربية'], ['Office', 'Al Nasr Plaza']]} />
        </div>
      </Section>
      <Section tone="mist" title="How we are held to account">
        <LinkGrid links={[
          { title: 'Privacy & CBUAE disclosure', body: 'How we are paid, how rates are shown and how your data is handled.', href: '/privacy-and-cbuae-disclosure' },
          { title: 'Meet the underwriting desk', body: 'The specialist desks behind every file.', href: '/our-underwriters' },
          { title: 'Verified client outcomes', body: 'Filter by non-resident, self-employed, handover and buyout.', href: '/reviews' },
        ]} />
      </Section>
      <CtaBand />
    </>
  );
}
