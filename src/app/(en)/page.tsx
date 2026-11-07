import Link from 'next/link';
import { ArrowRight, Check, X as XIcon, MessageCircle, ShieldCheck, Building2, Users, Clock3 } from 'lucide-react';
import Qualifier from '@/components/Qualifier';
import PhoneHero from '@/components/PhoneHero';
import Calculator from '@/components/calc/Calculator';
import RateTable from '@/components/RateTable';
import { Section, Disclosure, FaqList, CtaBand, LinkGrid, aed } from '@/components/ui';
import { PRODUCTS } from '@/data/products';
import { BANKS } from '@/data/banks';
import { BENCH, LTV_RULES, waLink } from '@/data/site';
import { cashToClose } from '@/lib/math';

const lowest = (k: 'fixed3' | 'fixed5') => Math.min(...BANKS.map((b) => b[k]));
const lowestIntro = (t: '1Y' | '2Y') => Math.min(...BANKS.filter((b) => b.introTerm === t).map((b) => b.intro));

const STAGES = ['Profile & documents', 'Dual-bank pre-approval', 'Valuation', 'Final Offer Letter', 'DLD transfer & keys'];

const PAINS = [
  ['Bank-bundled life insurance', 'Your own policy instead of the bank’s: ~0.26% a year vs ~0.65%. AED 80,000+ saved on AED 2M.', '/tools/life-insurance-assignment-audit'],
  ['10% Form F deposit at risk', 'Valuation checked before you sign, plus clauses that return your deposit if finance fails.', '/tools/form-f-clause-generator'],
  ['Down-valuation shock', 'Two banks, two different valuers, applied for in parallel.', '/advisory/property-valuation-appeal-desk'],
  ['Seller liability letter expiry', 'We track the 15-day validity so the transfer closes before it expires.', '/guides/mortgage-to-mortgage-transfer-seller-liability-letter'],
  ['Self-employed rejections', 'Company profit counted as income, at banks that accept it.', '/mortgages/self-employed'],
  ['The 36-month clawback', 'Your real saving after exit fees and waived-fee clawbacks.', '/guides/3-year-clawback-clause-on-uae-mortgage-buyouts'],
  ['Joint owners without a will', 'A DIFC will registered at closing, so the home is never frozen.', '/advisory/difc-wills-and-estate-planning'],
] as const;

const FAQS = [
  { q: 'Do you charge a brokerage fee?', a: 'No. Betterway is paid by the lending bank on disbursal. You pay AED 0 to us, and the bank’s rate is the same as going direct—often lower, because we negotiate across 24 banks.' },
  { q: 'Why salaried, non-commission underwriters?', a: 'Our advisors earn the same whichever bank you choose, so the recommendation is driven by your five-year cost, revert margin and floor rate—not by a bank incentive.' },
  { q: 'What is the lowest mortgage rate in the UAE right now?', a: 'As of November 2026 the lowest advertised fixed rate on our panel is 3.75% (1-year Islamic, Sharjah Islamic Bank). The best five-year outcome depends on the revert margin and floor, which our analyser compares.' },
  { q: 'How much cash do I need to buy a AED 2M home?', a: `At 20% down, about ${aed(cashToClose({ price: 2_000_000, downPct: 20 }).total)} in total: AED 400,000 down payment plus DLD, registration, trustee, valuation and agency fees.` },
  { q: 'Can non-residents get a mortgage?', a: 'Yes—14 UAE banks lend to non-residents at up to 60–65% LTV, with remote closing by video Power of Attorney.' },
  { q: 'How fast is pre-approval?', a: 'Formal pre-approval from two banks in parallel typically takes 48 hours once your documents are complete.' },
];

export default function Home() {
  const c = cashToClose({ price: 2_500_000, downPct: 20 });
  const ticker = [
    ['3M EIBOR', `${BENCH.eibor3m}%`],
    ['1Y fixed from', `${lowestIntro('1Y')}%`],
    ['2Y fixed from', `${lowestIntro('2Y')}%`],
    ['3Y fixed from', `${lowest('fixed3')}%`],
    ['5Y fixed from', `${lowest('fixed5')}%`],
  ];
  return (
    <>
      {/* HERO: Dubai skyline video loop under a navy scrim; phones on the right */}
      <section className="relative overflow-hidden bg-navy text-white">
        <video className="absolute inset-0 hidden h-full w-full object-cover opacity-70 motion-safe:md:block" data-hero-bg autoPlay muted loop playsInline preload="metadata" poster="/video/hero-dubai.jpg" aria-hidden="true" tabIndex={-1}>
          <source src="/video/hero-dubai.webm" type="video/webm" />
          <source src="/video/hero-dubai.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[url('/video/hero-dubai.jpg')] bg-cover bg-center opacity-60 md:motion-safe:hidden" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(8_29_55/0.95)_0%,rgb(8_29_55/0.8)_45%,rgb(8_29_55/0.35)_100%)]" aria-hidden="true" />
        <div className="wrap relative grid min-h-[calc(100svh-108px)] items-center gap-12 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-16">
          <div>
            <p className="mb-5 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-mint"><ShieldCheck size={13} className="me-1" /> CBUAE-registered · AED 0 client fee</p>
            <h1 className="h1 !text-white">Compare 24 UAE banks.<br />Fixed from <span className="text-mint">3.75%*</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">One application. Every Dubai mortgage offer side by side. Salaried advisors, never paid by the bank you pick.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-primary">Get pre-approved in 48h <ArrowRight size={16} /></Link>
              <Link href="/calculators/mortgage-calculator" className="btn btn-light">Calculate my payment</Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
              {['Expats & UAE Nationals', 'Non-residents', 'Off-plan handover', 'Switch bank'].map((t) => <li key={t} className="flex items-center gap-1.5"><Check size={15} className="text-mint" />{t}</li>)}
            </ul>
            <Disclosure dark />
          </div>
          <PhoneHero />
        </div>
      </section>

      {/* Live benchmark strip */}
      <section aria-label="Live mortgage benchmarks" className="border-y border-line bg-white">
        <div className="wrap grid grid-cols-2 divide-line sm:grid-cols-5 sm:divide-x">
          {ticker.map(([k, v]) => (
            <Link key={k} href="/rates/uae-mortgage-rates-eibor-revert-bible" className="group px-2 py-5 sm:px-5">
              <p className="text-xs font-medium uppercase tracking-wide text-slate">{k}</p>
              <p className="num mt-1 text-2xl font-semibold text-navy group-hover:text-teal">{v}</p>
            </Link>
          ))}
        </div>
      </section>

      <Section eyebrow="How it works" title="Your mortgage in 30 seconds">
        <div className="grid items-center gap-10 lg:grid-cols-[1.6fr_1fr]">
          <video className="w-full rounded-card border border-line bg-navy shadow-[0_30px_60px_-30px_rgb(8_29_55/0.45)]" controls playsInline preload="none" poster="/video/betterway-explainer.jpg" aria-describedby="explainer-steps">
            <source src="/video/betterway-explainer.mp4" type="video/mp4" />
          </video>
          <ol id="explainer-steps" className="space-y-5">
            {[['Compare 24 banks', 'Rates, revert margins, floors and fees in one table.'], ['Know every dirham', 'Monthly payment and full cash to close, before you sign.'], ['Pre-approved in 48 hours', 'Two banks work on your file at once.'], ['Valuation, offer, keys', 'We track every deadline to DLD transfer.']].map(([t, b], i) => (
              <li key={t} className="flex gap-4"><span className="num flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal">{i + 1}</span><span><span className="block font-display text-lg font-semibold text-navy">{t}</span><span className="text-slate">{b}</span></span></li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="mist" eyebrow="30-second rate check" title="See which banks will lend to you">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4 text-lg text-slate">
            <p>Four questions. No documents, no sign-up.</p>
            <p>Your answers set the rules banks apply to you: the loan-to-value cap, which lenders accept your income, and whether your project is on their approved list.</p>
          </div>
          <Qualifier />
        </div>
      </Section>

      <Section eyebrow="Our panel" title="24 UAE banks, one offer table" intro="Conventional, Islamic and non-bank lenders, compared on rate, revert margin, floor and fees.">
        <ul className="flex flex-wrap gap-2">
          {BANKS.map((b) => <li key={b.slug}><Link href={`/rates/${b.slug}`} className="chip inline-block">{b.name}</Link></li>)}
        </ul>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[[Users, 'Salaried advisors', 'Paid the same whichever bank you choose.'], [Clock3, '48-hour pre-approval', 'Two banks in parallel, different valuer panels.'], [Building2, 'Al Nasr Plaza, Oud Metha', 'Walk in, or close remotely by video PoA.']].map(([Icon, t, b]) => {
            const I = Icon as typeof Users;
            return (
              <div key={t as string} className="card">
                <I className="text-teal" size={22} />
                <p className="mt-4 font-display text-lg font-semibold text-navy">{t as string}</p>
                <p className="mt-1 text-sm text-slate">{b as string}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="mist" eyebrow="Mortgages" title="Mortgages for every buyer" action={{ label: 'All 14 products', href: '/mortgages' }}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.filter((p) => p.core).map((p) => (
            <Link key={p.slug} href={`/mortgages/${p.slug}`} className="card group flex flex-col">
              <span className="tag self-start">{p.badge}</span>
              <span className="mt-4 font-display text-lg font-semibold text-navy group-hover:text-teal">{p.name}</span>
              <span className="mt-2 text-sm leading-relaxed text-slate">{p.card}</span>
              <span className="mt-auto pt-5 text-sm font-semibold text-teal">{p.cta} →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="calculator" eyebrow="Ungated calculator" title="Monthly payment and upfront cost" intro="No sign-up. Change any number.">
        <div className="rounded-card border border-line bg-white p-5 sm:p-8"><Calculator slug="mortgage-calculator" /></div>
      </Section>

      <Section tone="mist" eyebrow="Rate & revert bible" title="Look past the fixed rate" intro="After 1–5 years, every loan moves to 3M EIBOR + a margin of 1.00% to 1.99%. On AED 1.5M, that margin gap is worth about AED 155,000." action={{ label: 'See all 24 banks', href: '/rates/uae-mortgage-rates-eibor-revert-bible' }}>
        <RateTable limit={8} banks={[...BANKS].sort((a, b) => a.intro - b.intro)} />
      </Section>

      <Section eyebrow="Betterway vs going direct" title="Why not go direct to a bank?">
        <div className="overflow-x-auto rounded-card border border-line">
          <table className="table-bw min-w-[640px]">
            <thead><tr><th scope="col">What you get</th><th scope="col">Betterway</th><th scope="col">Going direct to one bank</th></tr></thead>
            <tbody>
              {[['Banks compared', '24, side by side', '1'], ['Revert margin & floor shown upfront', 'Yes', 'Often only in the FOL'], ['Parallel backup pre-approval', 'Yes', 'No'], ['Valuation appeal desk', 'Yes', 'No'], ['External life insurance assignment', 'Routed to accepting banks', 'Bank policy pushed'], ['Fee to you', 'AED 0', 'AED 0']].map(([k, a, b]) => (
                <tr key={k}><th scope="row" className="font-medium text-navy">{k}</th><td className="font-semibold text-teal"><Check size={15} className="me-1 inline" />{a}</td><td className="text-slate">{b === 'AED 0' ? b : <><XIcon size={14} className="me-1 inline text-slate/60" />{b}</>}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href="/why-betterway-vs-direct-bank" className="btn btn-ghost mt-6">Read the full comparison <ArrowRight size={15} /></Link>
      </Section>

      <Section tone="navy" eyebrow="Client portal" title="Track every step online" intro="See each stage, upload documents and watch every deadline, from Form F to keys.">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-card bg-white p-6 text-ink">
            <div className="flex items-center justify-between"><p className="font-semibold text-navy">Villa 14, Dubai Hills · AED 3.2M</p><span className="tag">Stage 3 of 5</span></div>
            <ol className="mt-6 grid gap-3 sm:grid-cols-5">
              {STAGES.map((s, i) => (
                <li key={s} className={`rounded-xl border p-3 text-sm ${i < 2 ? 'border-teal bg-teal-50' : i === 2 ? 'border-teal' : 'border-line'}`}>
                  <span className={`num text-xs ${i <= 2 ? 'text-teal' : 'text-slate'}`}>0{i + 1}</span>
                  <span className="mt-1 block font-medium text-navy">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-mist p-4"><p className="text-xs text-slate">Form F expires in</p><p className="num text-xl font-semibold text-navy">17 days</p></div>
              <div className="rounded-xl bg-mist p-4"><p className="text-xs text-slate">Valuation</p><p className="num text-xl font-semibold text-navy">Thu 2:30 PM</p></div>
              <div className="rounded-xl bg-mist p-4"><p className="text-xs text-slate">Vault</p><p className="num text-xl font-semibold text-teal">11/12 verified</p></div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <ul className="space-y-4 text-white/80">
              {['Sign in with UAE PASS, or a WhatsApp code from abroad', 'Send documents on WhatsApp, we file them for you', 'Two banks working on your file at once', 'Exact cheque amounts 72 hours before transfer'].map((t) => <li key={t} className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0 text-mint" />{t}</li>)}
            </ul>
            <Link href="/portal/login" className="btn btn-light mt-8 self-start">Open the client portal <ArrowRight size={15} /></Link>
          </div>
        </div>
      </Section>

      <Section eyebrow="CBUAE rules, in plain numbers" title="How much you can borrow, and the cash you need">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-card border border-line">
            <table className="table-bw">
              <caption className="bg-white px-3 py-3 text-start font-semibold text-navy">Maximum loan-to-value</caption>
              <thead><tr><th scope="col">Buyer & property</th><th scope="col">Max LTV</th><th scope="col">Min down</th></tr></thead>
              <tbody className="num">{LTV_RULES.map((r) => <tr key={r.profile}><td className="font-sans">{r.profile}</td><td className="font-semibold text-teal">{r.ltv}</td><td>{r.down}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="overflow-hidden rounded-card border border-line">
            <table className="table-bw">
              <caption className="bg-white px-3 py-3 text-start font-semibold text-navy">Upfront costs on a AED 2.5M purchase (20% down)</caption>
              <tbody className="num">
                {[['Down payment', c.down], ['DLD 4% + AED 580', c.dld], ['Mortgage registration 0.25% + AED 290', c.mortgageReg], ['Trustee fee', c.trustee], ['Valuation', c.valuation], ['Agency 2% + VAT', c.agencyFee]].map(([k, v]) => (
                  <tr key={k as string}><td className="font-sans">{k}</td><td className="text-end">{aed(v as number)}</td></tr>
                ))}
                <tr><td className="font-sans font-semibold text-navy">Total cash to close</td><td className="text-end font-semibold text-teal">{aed(c.total)}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section tone="mist" eyebrow="Protection" title="Seven costly mistakes we prevent">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PAINS.map(([t, b, h], i) => (
            <Link key={t} href={h} className="card group">
              <span className="num text-sm text-teal">0{i + 1}</span>
              <span className="mt-2 block font-display text-[17px] font-semibold text-navy group-hover:text-teal">{t}</span>
              <span className="mt-2 block text-sm leading-relaxed text-slate">{b}</span>
            </Link>
          ))}
          <a href={waLink()} rel="noopener" className="card flex flex-col justify-between !border-teal bg-teal text-white">
            <span className="font-display text-lg font-semibold">Not sure which applies to you?</span>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold"><MessageCircle size={16} /> Ask an underwriter</span>
          </a>
        </div>
      </Section>

      <Section eyebrow="Explore" title="Find your exact situation">
        <LinkGrid cols={3} links={[
          { title: 'Off-plan handover finance', body: '80 projects and 14 developer APL hubs—check which banks approve your tower.', href: '/handover/dubai-off-plan-handover-mortgage-guide', tag: '80 projects' },
          { title: 'Non-resident by country', body: '25 country pages mapping tax proofs, credit bureaux and FX haircuts.', href: '/mortgages/non-resident-dubai', tag: '25 countries' },
          { title: 'Community valuation & yields', body: 'Price per sq.ft. and rental yield vs EMI coverage across 60 freehold areas.', href: '/areas', tag: '60 areas' },
          { title: 'Affordability by salary', body: 'How much you can borrow on AED 15,000 to AED 100,000+ a month.', href: '/affordability', tag: '15 brackets' },
          { title: 'Underwriting playbooks', body: 'Form F clauses, card limits and DBR, clawbacks, transfer-day checklists.', href: '/guides', tag: '10 guides' },
          { title: '360° advisory desk', body: 'Commercial finance, DIFC wills, conveyancing, FX and valuation appeals.', href: '/advisory', tag: '8 services' },
        ]} />
      </Section>

      <Section tone="mist" eyebrow="FAQ" title="Common questions">
        <div className="max-w-3xl"><FaqList faqs={FAQS} /></div>
      </Section>

      <CtaBand />
    </>
  );
}
