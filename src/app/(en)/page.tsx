import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, PlayCircle, Check, ArrowUpRight, FileCheck2, Scale, Wallet } from 'lucide-react';
import Qualifier from '@/components/Qualifier';
import { StartupHero, LiveBenchmark, PlatformFeatures, BrandMaterials } from '@/components/StartupExperience';
import MotionReveal from '@/components/MotionReveal';
import LogoMarquee from '@/components/LogoMarquee';
import { Photo, Laptop } from '@/components/media';
import { OfferDashboard, RatePath } from '@/components/Charts';
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
      <StartupHero />
      <section className="bg-white py-12 lg:py-16"><div className="wrap market-intro"><div><h2 className="mt-4">Published benchmarks.<br />A clearer starting point.</h2><p>Follow the latest public EIBOR fixing, then compare the full terms of your mortgage offer.</p></div><LiveBenchmark /></div></section>

      <section className="border-y border-line bg-white" aria-label="Mortgage planning essentials">
        <div className="wrap grid gap-0 divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {[[Scale, 'Compare UAE mortgage rates', 'Look beyond the headline rate.', '/rates/uae-mortgage-rates-eibor-revert-bible'], [Wallet, 'Know your upfront costs', 'Deposit, fees and monthly payment.', '/calculators/mortgage-calculator'], [FileCheck2, 'Prepare for pre-approval', 'Understand what lenders need.', '/contact']].map(([Icon, t, b, h]) => {
            const I = Icon as typeof Scale;
            return <Link href={h as string} key={t as string} className="essentials-link"><I size={21} strokeWidth={1.5} className="shrink-0 text-teal" /><span><b>{t as string}</b><span>{b as string}</span></span><ArrowUpRight size={16} className="ms-auto shrink-0 text-teal" /></Link>;
          })}
        </div>
      </section>

      <Section eyebrow="Built around your next move" title="A little less friction. A lot more clarity."><PlatformFeatures /></Section>

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

      <section className="bg-white pb-16 lg:pb-24">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <MotionReveal><Photo name="advisor-consultation" alt="Concept image: an advisor reviewing a mortgage offer with a client" className="aspect-[1376/768] shadow-[0_40px_80px_-40px_rgb(8_29_55/0.5)]" /></MotionReveal>
          <div>
            
            <h2 className="h2">Read the offer before you sign.</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">Go through the fixed period, revert margin, floor rate, fees and insurance with an advisor, line by line.</p>
            <Link href="/contact" className="btn btn-primary mt-8">Book a consultation <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="journey-section">
        <div className="wrap grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <MotionReveal className="journey-image"><img src="/images/dubai-interior-1280.webp" srcSet="/images/dubai-interior-720.webp 720w, /images/dubai-interior-1280.webp 1280w" sizes="(min-width:1024px) 46vw, 100vw" width={1280} height={720} loading="lazy" alt="Conceptual Dubai apartment with a bright waterfront outlook" /></MotionReveal>
          <div><h2 className="h2 mt-4 !text-white">Know what comes next.</h2><ol className="journey-steps">{[['Set your budget', 'Check income, deposit and purchase costs.'], ['Compare your options', 'Review rates, fees and lender requirements.'], ['Apply for pre-approval', 'Submit documents for the bank’s assessment.'], ['Value, finalise, transfer', 'Complete valuation, final approval and registration.']].map(([t, b], i) => <li key={t}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{t}</h3><p>{b}</p></div></li>)}</ol><Link href="/guides/complete-dld-trustee-transfer-day-checklist" className="inline-flex items-center gap-2 text-sm font-semibold text-mint">Your transfer-day checklist <ArrowRight size={15} /></Link></div>
        </div>
      </section>

      <Section eyebrow="Places worth a closer look" title="Your next chapter has an address." intro="Explore real UAE communities, then build a finance plan around the property you have in mind.">
        <div className="project-grid">
          {[
            { name:'The Oasis', developer:'Emaar', logo:'emaar.svg', image:'the-oasis.webp', description:'Villas, waterways and landscaped neighbourhoods in Dubai.', url:'https://www.emaar.com/en/our-communities/the-oasis' },
            { name:'DAMAC Islands', developer:'DAMAC', logo:'damac.png', image:'damac-islands.webp', description:'A residential community with a tropical island-inspired masterplan.', url:'https://www.damacproperties.com' },
            { name:'Sobha One', developer:'Sobha Realty', logo:'sobha.png', image:'sobha-one.webp', description:'A residential development by Sobha Realty in Dubai.', url:'https://sobharealty.com/sobha-communities/sobha-one' },
          ].map(p=><article key={p.name} className="project-card"><div className="project-image"><img src={`/projects/${p.image}`} alt={`${p.name} — developer architectural rendering`} width={1100} height={700} loading="lazy"/><span className="image-credit">Developer render · {p.developer}</span></div><div className="project-info"><img className="developer-logo" src={`/projects/${p.logo}`} alt={p.developer} width={110} height={30} loading="lazy"/><h3>{p.name}</h3><p>{p.description}</p><a href={p.url} target="_blank" rel="noopener noreferrer">Explore the developer’s website <ArrowUpRight size={14}/></a></div></article>)}
        </div><p className="mt-6 text-xs leading-relaxed text-slate">Developer imagery is illustrative. Project availability and lender acceptance require confirmation. Names and logos identify the developers; they do not imply a Betterway partnership.</p>
      </Section>

      <Section eyebrow="Mortgage rate comparison" title="Look beyond the fixed rate." intro="Compare 24 UAE banks in the lender directory. Review the fixed period, EIBOR revert margin, floor rate and fees before deciding." action={{ label: 'Explore bank comparisons', href: '/rates/uae-mortgage-rates-eibor-revert-bible' }}>
        <div className="mb-10 grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
          <Laptop className="drop-shadow-[0_40px_50px_rgb(8_29_55/0.25)]"><OfferDashboard /></Laptop>
          <div className="card">
            <p className="font-display text-lg font-semibold text-navy">Teaser rate vs real cost</p>
            <p className="mt-1 text-sm text-slate">Two example banks, AED 1.5M, five years.</p>
            <div className="mt-4"><RatePath /></div>
            <Link href="/rates/uae-mortgage-rates-eibor-revert-bible#revert-video" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal"><PlayCircle size={18} /> Watch the 20-second explainer</Link>
          </div>
        </div>
        <LogoMarquee label="UAE banks in the lender directory" items={BANKS.map((b) => ({ id: b.key, label: b.name, href: `/rates/${b.slug}` }))} />
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
      <section className="bg-mist py-16 lg:py-20"><div className="wrap"><BrandMaterials /></div></section>
      <Section eyebrow="FAQs" title="Your questions, answered."><div className="max-w-3xl"><FaqList faqs={FAQS} /></div></Section>
      <CtaBand />
    </>
  );
}
