import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, ArrowUpRight, FileCheck2, Scale, Wallet } from 'lucide-react';
import Qualifier from '@/components/Qualifier';
import PhoneHero from '@/components/PhoneHero';
import MotionReveal from '@/components/MotionReveal';
import Calculator from '@/components/calc/Calculator';
import { Section, FaqList, CtaBand, LinkGrid, aed } from '@/components/ui';
import { BANKS } from '@/data/banks';
import { cashToClose } from '@/lib/math';

export const metadata: Metadata = {
  title: 'Mortgage Broker in Dubai & UAE | Betterway Mortgages',
  description: 'Dubai mortgage advice for residents, non-residents and investors. Compare UAE mortgage rates, estimate payments and plan your upfront costs with Betterway.',
  alternates: { canonical: '/' },
};

const PRODUCTS = [
  ['01', 'Expat Resident Mortgages', 'Buying your first home in the UAE? Start with your budget and deposit.', '/mortgages/uae-residents', 'Residents'],
  ['02', 'Non-Resident Mortgages', 'Explore Dubai home finance with overseas salary or business income.', '/mortgages/non-resident-dubai', 'Overseas buyers'],
  ['03', 'Off-Plan & Handover Finance', 'Plan the final developer payment before your handover date.', '/mortgages/under-construction-off-plan', 'Handover'],
  ['04', 'Switch Bank (Buyout)', 'Compare refinance savings after exit fees and switching costs.', '/mortgages/mortgage-buyout-refinance', 'Homeowners'],
] as const;

const FAQS = [
  { q: 'How does a mortgage broker in Dubai help?', a: 'A broker helps you compare suitable lenders, prepare documents and understand the application process. The bank makes the lending decision and issues your final offer.' },
  { q: 'How much cash do I need for an AED 2M home?', a: `With a 20% deposit, this calculator estimates ${aed(cashToClose({ price: 2_000_000, downPct: 20 }).total)} including the deposit and typical Dubai purchase fees. Bank processing fees, insurance and property-specific charges may add to this. Adjust the assumptions in the mortgage calculator.` },
  { q: 'Can non-residents get a mortgage in Dubai?', a: 'Some UAE lenders consider non-resident applicants. Your income country, currency, credit history and property affect the available loan and deposit. A lender must review your documents before confirming eligibility.' },
  { q: 'What should I compare besides the mortgage rate?', a: 'Compare the fixed period, variable-rate formula, minimum floor, processing fees, insurance and early repayment terms. A lower introductory rate does not always mean a lower total cost.' },
  { q: 'How long does mortgage pre-approval take?', a: 'Timing depends on the lender and the completeness of your documents. Pre-approval is an initial assessment; it is not a final loan offer or a property valuation.' },
  { q: 'What fees should I ask about?', a: 'Request a written breakdown of bank fees, broker fees if applicable, valuation, insurance, property registration and transfer charges before proceeding.' },
];

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="wrap hero-layout">
          <div className="hero-copy">
            <p className="eyebrow flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-teal" /> Mortgage broker in Dubai & UAE</p>
            <h1>Your home.<br />Your mortgage.<br /><span className="text-teal">A better way.</span></h1>
            <p className="hero-intro">Compare your mortgage options. Know your costs.<br className="hidden sm:block" /> Plan your next home.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">Find my mortgage <ArrowUpRight size={17} /></Link>
              <Link href="#calculator" className="btn btn-ghost">Calculate my payment</Link>
            </div>
            <ul className="hero-checks">
              {['UAE residents', 'Non-residents', 'Refinance & handover'].map(t => <li key={t}><Check size={13} />{t}</li>)}
            </ul>
            <div className="hero-footnote"><span className="block font-semibold text-navy">Start with clarity.</span>Explore your options before choosing a bank.</div>
          </div>
          <PhoneHero />
        </div>
      </section>

      <section className="border-y border-line bg-white" aria-label="Mortgage planning essentials">
        <div className="wrap grid gap-0 divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {[[Scale, 'Compare UAE mortgage rates', 'Look beyond the headline rate.', '/rates/uae-mortgage-rates-eibor-revert-bible'], [Wallet, 'Know your upfront costs', 'Deposit, fees and monthly payment.', '/calculators/mortgage-calculator'], [FileCheck2, 'Prepare for pre-approval', 'Understand what lenders need.', '/contact']].map(([Icon, t, b, h]) => {
            const I = Icon as typeof Scale;
            return <Link href={h as string} key={t as string} className="essentials-link"><I size={21} strokeWidth={1.5} className="shrink-0 text-teal" /><span><b>{t as string}</b><span>{b as string}</span></span><ArrowUpRight size={16} className="ms-auto shrink-0 text-teal" /></Link>;
          })}
        </div>
      </section>

      <Section eyebrow="Find your way" title="A mortgage for your next move." action={{ label: 'All mortgage options', href: '/mortgages' }}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map(([n, name, body, href, tag]) => <Link key={n} href={href} className="card mortgage-card group"><span className="flex items-center justify-between"><span className="eyebrow">{tag}</span><span className="num text-xs text-slate/60">{n}</span></span><h3 className="mt-10 text-xl font-semibold group-hover:text-teal">{name}</h3><p className="mt-3 text-sm leading-relaxed text-slate">{body}</p><ArrowUpRight size={21} className="mt-auto pt-6 box-content text-teal" /></Link>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-teal">
          <Link className="ulink" href="/mortgages/uae-nationals">UAE National Mortgages ↗</Link>
          <Link className="ulink" href="/mortgages/islamic-home-finance">Islamic Home Finance ↗</Link>
          <Link className="ulink" href="/mortgages/golden-visa-mortgage">Golden Visa Mortgages ↗</Link>
          <Link className="ulink" href="/mortgages/equity-release">Equity Release & Cash-Out ↗</Link>
        </div>
      </Section>

      <Section id="calculator" tone="mist" eyebrow="Mortgage calculator" title="Make the numbers work for you." intro="Estimate your monthly payment and upfront costs. No sign-up needed.">
        <div className="rounded-[28px] border border-line bg-white p-5 sm:p-8"><Calculator slug="mortgage-calculator" /></div>
        <p className="mt-4 text-xs leading-relaxed text-slate">Planning estimates only. Rates and fees depend on the lender, property and your circumstances. Bank processing fees and insurance may be additional.</p>
      </Section>

      <Section eyebrow="Your starting point" title="A few questions. A clearer direction.">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="max-w-md"><p className="text-lg leading-relaxed text-slate">Tell us what you want to do. Explore indicative options, then discuss your documents with an advisor.</p><p className="mt-5 text-sm text-slate">No credit check. No application submitted.</p><Link className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal" href="/guides">New to UAE mortgages? Start here <ArrowRight size={15} /></Link></div>
          <Qualifier />
        </div>
      </Section>

      <section className="journey-section">
        <div className="wrap grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <MotionReveal className="journey-image"><img src="/images/dubai-interior-1280.webp" srcSet="/images/dubai-interior-720.webp 720w, /images/dubai-interior-1280.webp 1280w" sizes="(min-width:1024px) 46vw, 100vw" width={1280} height={720} loading="lazy" alt="Conceptual Dubai apartment with a bright waterfront outlook" /></MotionReveal>
          <div><p className="eyebrow !text-mint">From enquiry to keys</p><h2 className="h2 mt-4 !text-white">Know what comes next.</h2><ol className="journey-steps">{[['Set your budget', 'Check income, deposit and purchase costs.'], ['Compare your options', 'Review rates, fees and lender requirements.'], ['Apply for pre-approval', 'Submit documents for the bank’s assessment.'], ['Value, finalise, transfer', 'Complete valuation, final approval and registration.']].map(([t, b], i) => <li key={t}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{t}</h3><p>{b}</p></div></li>)}</ol><Link href="/guides/complete-dld-trustee-transfer-day-checklist" className="inline-flex items-center gap-2 text-sm font-semibold text-mint">Your transfer-day checklist <ArrowRight size={15} /></Link></div>
        </div>
      </section>

      <Section eyebrow="Mortgage rate comparison" title="Look beyond the fixed rate." intro="Compare 24 UAE banks in the lender directory. Review the fixed period, EIBOR revert margin, floor rate and fees before deciding." action={{ label: 'Explore bank comparisons', href: '/rates/uae-mortgage-rates-eibor-revert-bible' }}>
        <ul className="flex flex-wrap gap-2.5">{BANKS.map(b => <li key={b.slug}><Link href={`/rates/${b.slug}`} className="bank-pill">{b.name}</Link></li>)}</ul>
        <p className="mt-5 text-xs leading-relaxed text-slate">Directory information is indicative, not a live offer or confirmation of a bank partnership. Request a current written quote.</p>
      </Section>

      <Section tone="mist" eyebrow="Useful answers" title="Less guesswork. Better decisions.">
        <LinkGrid links={[
          { title: 'Off-plan handover finance', body: 'Plan your developer balance and project eligibility.', href: '/handover/dubai-off-plan-handover-mortgage-guide' },
          { title: 'Non-resident mortgages', body: 'Understand overseas income and document requirements.', href: '/mortgages/non-resident-dubai' },
          { title: 'Dubai communities', body: 'Explore the areas behind your property shortlist.', href: '/areas' },
          { title: 'Mortgage affordability', body: 'See how income and existing debt affect your budget.', href: '/affordability' },
          { title: 'Form F & buying guides', body: 'Understand valuations, deposits and transfer steps.', href: '/guides' },
          { title: 'Mortgage & property advisory', body: 'Explore commercial finance, insurance and conveyancing.', href: '/advisory' },
        ]} />
      </Section>
      <Section eyebrow="FAQs" title="Your questions, answered."><div className="max-w-3xl"><FaqList faqs={FAQS} /></div></Section>
      <CtaBand />
    </>
  );
}
