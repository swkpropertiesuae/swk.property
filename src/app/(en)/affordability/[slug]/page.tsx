import type { Metadata } from 'next';
import { REG, maxLtv } from '@/data/regulation';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Section, Facts, FaqList, CtaBand, LinkGrid, aed } from '@/components/ui';
import Calculator from '@/components/calc/Calculator';
import { AFFORD } from '@/data/content';
import { COMMUNITIES } from '@/data/communities';
import { borrowingPower, cashToClose, emi, goldenVisa, STRESS_RATE } from '@/lib/math';

export const dynamicParams = false;
export const generateStaticParams = () => AFFORD.map((a) => ({ slug: a.slug }));
const find = (s: string) => AFFORD.find((a) => a.slug === s);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = find((await params).slug);
  return a ? { title: a.title, description: a.kind === 'salary' ? `Maximum UAE mortgage and property price on a AED ${a.amount.toLocaleString('en-US')} monthly salary under the CBUAE ${REG.dbrMax}% DBR rule.` : `Down payment, DLD fees, cash to close and monthly payment for a AED ${(a.amount / 1e6).toLocaleString('en-US')}M property.`, alternates: { canonical: `/affordability/${a.slug}` } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const a = find((await params).slug);
  if (!a) notFound();
  const crumbs = [{ name: 'Affordability', href: '/affordability' }, { name: a.title.replace(/\?$/, ''), href: `/affordability/${a.slug}` }];
  const others = AFFORD.filter((x) => x.kind === a.kind && x.slug !== a.slug).map((x) => ({ title: x.title.replace(' in Dubai?', '').replace('How Much Mortgage Can I Get on a ', ''), href: `/affordability/${x.slug}` }));

  if (a.kind === 'salary') {
    const s = a.amount;
    const clean = borrowingPower({ salary: s, existingEmis: 0, cardLimits: 0, years: 25 });
    const typical = borrowingPower({ salary: s, existingEmis: s * 0.1, cardLimits: s * 2, years: 25 });
    const lo = REG.ltv.expat.first / 100, hi = REG.ltv.expat.firstAbove / 100;
    const maxPrice = clean.maxLoan / lo <= REG.valueThreshold ? clean.maxLoan / lo : clean.maxLoan / hi; // CBUAE expat first-home caps
    const fits = COMMUNITIES.filter((c) => c.typical * 1e6 <= maxPrice).sort((x, y) => y.typical - x.typical).slice(0, 8);
    return (
      <>
        <PageHero crumbs={crumbs} eyebrow="Affordability by salary" title={a.title}
          capsule={`On a AED ${s.toLocaleString('en-US')} monthly salary with no other debts, the CBUAE ${REG.dbrMax}% DBR rule allows up to AED ${(s / 2).toLocaleString('en-US')} a month in total repayments. Stress-tested at 6.5% over 25 years, that supports a loan of about ${aed(clean.maxLoan)}—a property near ${aed(maxPrice)} with ${100 - (maxPrice <= REG.valueThreshold ? REG.ltv.expat.first : REG.ltv.expat.firstAbove)}% down. Car loans and card limits reduce it.`} />
        <Section title="Your numbers">
          <Facts facts={[['50% DBR capacity', `${aed(s / 2)}/mo`], ['Max loan, no debts', aed(clean.maxLoan)], [`Max property (expat first home, ${maxLtv('expat', maxPrice)}% LTV)`, aed(maxPrice)], ['With a car loan & cards*', aed(typical.maxLoan)], ['EMI on max loan @3.99%', `${aed(emi(clean.maxLoan, 3.99, 25))}/mo`], ['Cash to close', aed(cashToClose({ price: maxPrice, downPct: 20 }).total)]]} />
          <p className="mt-3 text-xs text-slate">*Assumes existing EMIs of 10% of salary and card limits of 2× salary.</p>
        </Section>
        <Section tone="mist" title="Adjust for your debts and cards"><div className="rounded-card border border-line bg-white p-5 sm:p-8"><Calculator slug="dbr-borrowing-power" initial={{ salary: Math.min(300_000, s) }} /></div></Section>
        {fits.length > 0 && <Section title="Communities within reach"><LinkGrid cols={4} links={fits.map((c) => ({ title: c.name, body: `Typical AED ${c.typical}M · ${c.yieldPct}% yield`, href: `/areas/${c.emirate}/${c.slug}` }))} /></Section>}
        <Section tone="mist" title="FAQ"><div className="max-w-3xl"><FaqList faqs={[
          { q: `Is AED ${s.toLocaleString('en-US')} enough for a mortgage in Dubai?`, a: s >= 15000 ? 'Yes. Most banks require at least AED 10,000–15,000 a month; higher salaries unlock more lenders and better pricing.' : 'Some banks accept AED 10,000, but options are limited.' },
          { q: 'How can I borrow more?', a: `Close unused credit cards, clear small loans, add a co-borrower, choose a 3% card-policy bank, or extend the term (up to ${REG.tenorMax} years; each bank sets its age limit).` },
        ]} /></div></Section>
        <Section title="Other salary levels"><LinkGrid cols={4} links={others} /></Section>
        <CtaBand />
      </>
    );
  }

  const p = a.amount;
  const ltv = maxLtv('expat', p);
  const c = cashToClose({ price: p, downPct: 100 - ltv });
  const e = emi(c.loan, 3.99, 25);
  const salaryNeeded = Math.max(emi(c.loan, STRESS_RATE, 25) / 0.5, c.loan / 84); // DBR at stress rate, or 7x annual income cap
  const gv = goldenVisa(p, 2);
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Affordability by price" title={a.title}
        capsule={`Buying a AED ${p.toLocaleString('en-US')} home in Dubai as an expat resident needs ${100 - ltv}% down (${aed(c.down)}) because CBUAE caps LTV at ${ltv}%${p > 5_000_000 ? ' above AED 5M' : ''}. With 4% DLD, registration, trustee, valuation and agency fees, total cash to close is about ${aed(c.total)}, and the payment at 3.99% over 25 years is ${aed(e)} a month.`} />
      <Section title="Cash to close, itemised">
        <div className="overflow-hidden rounded-card border border-line">
          <table className="table-bw"><tbody className="num">
            {[['Down payment', c.down], ['DLD 4% + AED 580', c.dld], ['Mortgage registration', c.mortgageReg], ['Trustee', c.trustee], ['Valuation', c.valuation], ['Agency 2% + VAT', c.agencyFee]].map(([k, v]) => <tr key={k as string}><td className="font-sans">{k}</td><td className="text-end">{aed(v as number)}</td></tr>)}
            <tr><td className="font-sans font-semibold text-navy">Total</td><td className="text-end font-semibold text-teal">{aed(c.total)}</td></tr>
          </tbody></table>
        </div>
        <div className="mt-6"><Facts facts={[['Max LTV', `${ltv}%`], ['Loan', aed(c.loan)], ['EMI @3.99% / 25y', `${aed(e)}/mo`], ['Indicative salary needed', `${aed(salaryNeeded)}/mo`], ['Golden Visa', gv.eligible ? 'Eligible' : `Short by ${aed(gv.gap)}`], ['UAE National LTV', p > 5_000_000 ? '75%' : '85%']]} /></div>
      </Section>
      <Section tone="mist" title="Change the numbers"><div className="rounded-card border border-line bg-white p-5 sm:p-8"><Calculator slug="mortgage-calculator" initial={{ price: Math.min(30_000_000, p), down: 100 - ltv }} /></div></Section>
      {a.golden && <Section title="Golden Visa on this purchase"><p className="lead max-w-3xl">At AED 2M the property meets the February 2026 threshold on day one, with no paid-equity requirement. Visa fees for you and two dependants run about {aed(gv.low)}–{aed(gv.high)}. <Link className="text-teal underline" href="/mortgages/golden-visa-mortgage">Golden Visa mortgages</Link>.</p></Section>}
      <Section tone={a.golden ? 'mist' : 'white'} title="Other budgets"><LinkGrid cols={4} links={others} /></Section>
      <CtaBand />
    </>
  );
}
