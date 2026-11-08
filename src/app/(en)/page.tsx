import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, PlayCircle, Check, ArrowUpRight, FileCheck2, Scale, Wallet } from 'lucide-react';
import Qualifier from '@/components/Qualifier';
import { StartupHero, LiveBenchmark, PlatformFeatures } from '@/components/StartupExperience';
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
  ['01', 'Expat Resident Mortgages', 'First UAE purchase? Begin with what you can borrow and what you need to put down.', '/mortgages/uae-residents', 'Residents'],
  ['02', 'Non-Resident Mortgages', 'Living abroad? See how lenders treat income earned outside the UAE.', '/mortgages/non-resident-dubai', 'Overseas buyers'],
  ['03', 'Off-Plan & Handover Finance', 'Line up the money for your last developer payment ahead of handover.', '/mortgages/under-construction-off-plan', 'Handover'],
  ['04', 'Switch Bank (Buyout)', 'Find out what moving lenders saves once every fee is counted.', '/mortgages/mortgage-buyout-refinance', 'Homeowners'],
] as const;

const FAQS = [
  { q: 'How does a mortgage broker in Dubai help?', a: 'We shortlist lenders that suit your profile, help you get your paperwork right and explain each step. The lending decision and the final offer always come from the bank.' },
  { q: 'How much cash do I need for an AED 2M home?', a: `Putting down 20%, our estimate is ${aed(cashToClose({ price: 2_000_000, downPct: 20 }).total)} in total, covering the deposit and the usual Dubai purchase fees. Your bank’s own fees, insurance and costs specific to the property can push that higher. Change the inputs in the calculator to match your case.` },
  { q: 'Can non-residents get a mortgage in Dubai?', a: 'Yes, a number of UAE banks lend to people living overseas. Where you earn, the currency you are paid in, your credit record and the property itself all shape the loan size and deposit. Eligibility is only confirmed once a lender has reviewed your documents.' },
  { q: 'What should I compare besides the mortgage rate?', a: 'Look at how long the rate is fixed, what it becomes afterwards, the minimum rate, arrangement fees, insurance and the cost of repaying early. The cheapest opening rate can still be the dearer loan overall.' },
  { q: 'How long does mortgage pre-approval take?', a: 'It depends on the bank and on how complete your documents are. Bear in mind that pre-approval is only a first view of your finances. It is not a final offer and does not value the property.' },
  { q: 'What fees should I ask about?', a: 'Before you go ahead, get in writing every charge: the bank’s fees, any broker fee, valuation, insurance, and the registration and transfer costs.' },
];

export default function Home() {
  return (
    <>
      <StartupHero />

      <section className="border-y border-line bg-white" aria-label="Mortgage planning essentials">
        <div className="wrap grid gap-0 divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {[[Scale, 'Compare UAE mortgage rates', 'See the cost after the fixed period.', '/rates/uae-mortgage-rates-eibor-revert-bible'], [Wallet, 'Know your upfront costs', 'Deposit, fees and repayment in one view.', '/calculators/mortgage-calculator'], [FileCheck2, 'Prepare for pre-approval', 'Know the documents banks ask for.', '/contact']].map(([Icon, t, b, h]) => {
            const I = Icon as typeof Scale;
            return <Link href={h as string} key={t as string} className="essentials-link"><I size={21} strokeWidth={1.5} className="shrink-0 text-teal" /><span><b>{t as string}</b><span>{b as string}</span></span><ArrowUpRight size={16} className="ms-auto shrink-0 text-teal" /></Link>;
          })}
        </div>
      </section>

      <Section tone="mist" eyebrow="Your starting point" title="A few questions. A clearer direction.">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="max-w-md"><p className="text-lg leading-relaxed text-slate">Answer a handful of questions about your plans and see which routes may suit you. When you are ready, go through your documents with an advisor.</p><p className="mt-5 text-sm text-slate">Nothing is sent to a bank and your credit file is not checked.</p><Link className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal" href="/guides">New to UAE mortgages? Start here <ArrowRight size={15} /></Link></div>
          <Qualifier />
        </div>
      </Section>

      <Section eyebrow="Mortgage rate comparison" title="Look beyond the fixed rate." intro="Our directory covers 24 UAE lenders. Set each one’s fixed term, margin over EIBOR, minimum rate and fees side by side before you choose." action={{ label: 'Explore bank comparisons', href: '/rates/uae-mortgage-rates-eibor-revert-bible' }}>
        <div className="mb-10 grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
          <Laptop className="drop-shadow-[0_40px_50px_rgb(8_29_55/0.25)]"><OfferDashboard /></Laptop>
          <div className="card">
            <p className="font-display text-lg font-semibold text-navy">Teaser rate vs real cost</p>
            <p className="mt-1 text-sm text-slate">Two sample lenders on an AED 1.5M loan over five years.</p>
            <div className="mt-4"><RatePath /></div>
            <Link href="/rates/uae-mortgage-rates-eibor-revert-bible#revert-video" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal"><PlayCircle size={18} /> Watch the 20-second explainer</Link>
          </div>
        </div>
        <LogoMarquee label="UAE banks in the lender directory" items={BANKS.map((b) => ({ id: b.key, label: b.name, href: `/rates/${b.slug}` }))} />
        <p className="mt-5 text-xs leading-relaxed text-slate">Figures in the directory are a guide, not a live offer, and listing a bank does not mean we have a partnership with it. Ask for a written quote before relying on any rate.</p>
      </Section>

      <Section id="calculator" tone="mist" eyebrow="Mortgage calculator" title="Make the numbers work for you." intro="See your likely repayment and the cash you need up front. You do not need an account.">
        <div className="rounded-[28px] border border-line bg-white p-5 sm:p-8"><Calculator slug="mortgage-calculator" /></div>
        <p className="mt-4 text-xs leading-relaxed text-slate">These are planning figures. Actual rates and fees vary with the lender, the property and your situation, and bank fees or insurance may be extra.</p>
      </Section>

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

      <section className="bg-mist py-12 lg:py-16"><div className="wrap market-intro"><div><h2 className="mt-4">Published benchmarks.<br />A clearer starting point.</h2><p>Watch the most recent published EIBOR rate, then check how your offer is priced against it.</p></div><LiveBenchmark /></div></section>

      <section className="bg-white py-16 lg:py-24">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <MotionReveal><Photo name="advisor-consultation" alt="Concept image: an advisor reviewing a mortgage offer with a client" className="aspect-[1376/768] shadow-[0_40px_80px_-40px_rgb(8_29_55/0.5)]" /></MotionReveal>
          <div>
            
            <h2 className="h2">Read the offer before you sign.</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">Sit down with an advisor and check every term: the fixed period, what the rate moves to, the minimum rate, the fees and the insurance.</p>
            <Link href="/contact" className="btn btn-primary mt-8">Book a consultation <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="journey-section scroll-mt-24">
        <div className="wrap grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <MotionReveal className="journey-image"><img src="/images/dubai-interior-1280.webp" srcSet="/images/dubai-interior-720.webp 720w, /images/dubai-interior-1280.webp 1280w" sizes="(min-width:1024px) 46vw, 100vw" width={1280} height={720} loading="lazy" alt="Conceptual Dubai apartment with a bright waterfront outlook" /></MotionReveal>
          <div><h2 className="h2 mt-4 !text-white">Know what comes next.</h2><ol className="journey-steps">{[['Set your budget', 'Match your income and savings to a realistic price.'], ['Compare your options', 'Weigh up lenders on rate, fees and criteria.'], ['Apply for pre-approval', 'Send your documents so a bank can assess you.'], ['Value, finalise, transfer', 'Valuation, final offer, then registration at the trustee.']].map(([t, b], i) => <li key={t}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{t}</h3><p>{b}</p></div></li>)}</ol><Link href="/guides/complete-dld-trustee-transfer-day-checklist" className="inline-flex items-center gap-2 text-sm font-semibold text-mint">Your transfer-day checklist <ArrowRight size={15} /></Link></div>
        </div>
      </section>

      <Section tone="mist" eyebrow="Places worth a closer look" title="Your next chapter has an address." intro="Browse UAE neighbourhoods and new launches, then shape a finance plan around the home you like.">
        <div className="project-grid">
          {[
            { name:'The Oasis', developer:'Emaar', logo:'emaar.svg', image:'the-oasis.webp', description:'Villa neighbourhoods set around water and green space in Dubailand.', url:'https://www.emaar.com/en/our-communities/the-oasis' },
            { name:'DAMAC Islands', developer:'DAMAC', logo:'damac.png', image:'damac-islands.webp', description:'A villa community planned around a chain of island-themed districts.', url:'https://www.damacproperties.com' },
            { name:'Sobha One', developer:'Sobha Realty', logo:'sobha.png', image:'sobha-one.webp', description:'A cluster of towers by Sobha Realty overlooking Ras Al Khor.', url:'https://sobharealty.com/sobha-communities/sobha-one' },
          ].map(p=><article key={p.name} className="project-card"><div className="project-image"><img src={`/projects/${p.image}`} alt={`${p.name} — developer architectural rendering`} width={1100} height={700} loading="lazy"/><span className="image-credit">Developer render · {p.developer}</span></div><div className="project-info"><img className="developer-logo" src={`/projects/${p.logo}`} alt={p.developer} width={110} height={30} loading="lazy"/><h3>{p.name}</h3><p>{p.description}</p><a href={p.url} target="_blank" rel="noopener noreferrer">Explore the developer’s website <ArrowUpRight size={14}/></a></div></article>)}
        </div><p className="mt-6 text-xs leading-relaxed text-slate">Images come from the developers and are for illustration. Check availability and whether your lender accepts the project. Names and logos only identify each developer and do not mean we work with them.</p>
      </Section>

      <Section eyebrow="Built around your next move" title="A little less friction. A lot more clarity."><PlatformFeatures /></Section>

      <Section tone="mist" eyebrow="Useful answers" title="Less guesswork. Better decisions.">
        <LinkGrid links={[
          { title: 'Off-plan handover finance', body: 'What you still owe, and whether banks will lend on your tower.', href: '/handover/dubai-off-plan-handover-mortgage-guide' },
          { title: 'Non-resident mortgages', body: 'How foreign income is counted and what to prepare.', href: '/mortgages/non-resident-dubai' },
          { title: 'Dubai communities', body: 'Prices, yields and lenders for each neighbourhood.', href: '/areas' },
          { title: 'Mortgage affordability', body: 'What your salary and current debts let you borrow.', href: '/affordability' },
          { title: 'Form F & buying guides', body: 'Contract clauses, valuations and transfer day, step by step.', href: '/guides' },
          { title: 'Mortgage & property advisory', body: 'Business property, life cover, wills and conveyancing.', href: '/advisory' },
        ]} />
      </Section>

      <Section eyebrow="FAQs" title="Your questions, answered."><div className="max-w-3xl"><FaqList faqs={FAQS} /></div></Section>

      <CtaBand />
    </>
  );
}
