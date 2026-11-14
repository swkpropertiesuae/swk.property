import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, BadgeCheck, Check, FileCheck2, Languages, Layers3, Plus, ReceiptText, Scale } from 'lucide-react';
import HomeHero from '@/components/home/HomeHero';
import DisclosureToast from '@/components/home/DisclosureToast';
import Qualifier from '@/components/Qualifier';
import { LiveBenchmark } from '@/components/StartupExperience';
import LogoMarquee from '@/components/LogoMarquee';
import { RatePath } from '@/components/Charts';
import Calculator from '@/components/calc/Calculator';
import { Cta, JsonLd, Rich, aed } from '@/components/ui';
import { BANKS } from '@/data/banks';
import { COMMUNITIES, EMIRATES, type Emirate } from '@/data/communities';
import { COUNTRIES } from '@/data/countries';
import { GUIDES } from '@/data/content';
import { DEVELOPERS, PROJECTS } from '@/data/handover';
import { TOOLS } from '@/data/tools';
import { LTV_RULES, SITE } from '@/data/site';
import { cashToClose } from '@/lib/math';

export const metadata: Metadata = {
  title: 'Mortgage Broker in Dubai & UAE | Betterway Mortgages',
  description: 'Dubai mortgage advice for residents, non-residents and investors. Compare UAE mortgage rates, estimate payments and plan your upfront costs with Betterway.',
  alternates: { canonical: '/' },
};

/* ---------- Content (every figure is derived from the site's own data files) ---------- */

const PILLARS = [
  ['Many lenders, one conversation', 'We compare suitable UAE banks for your profile instead of starting and ending with one.'],
  ['The real cost, not the teaser', 'Fixed period, revert margin, floor, fees and insurance, side by side before you choose.'],
  ['Ready before the bank asks', 'Know which documents and checks come next, so pre-approval moves without surprises.'],
  ['English and Arabic', 'Plain-language guidance and calculators in both languages, from first question to transfer day.'],
] as const;

const ltv = (match: string) => LTV_RULES.find((r) => r.profile.startsWith(match))?.ltv ?? '—';

const STAYS = [
  { tag: 'Residents', name: 'Expat resident mortgages', body: 'Buying your first UAE home on a local salary. Start with your budget, deposit and purchase fees.', href: '/mortgages/uae-residents', img: '/images/dubai-interior-1280.webp', w: 1280, h: 720, alt: 'Concept image: a bright Dubai apartment interior with a waterfront view',
    facts: [['Max LTV', ltv('Expat resident — first home ≤')], ['DBR cap', '50%'], ['Tenure', '25 yrs']], more: ['UAE Nationals', '/mortgages/uae-nationals'] },
  { tag: 'Overseas buyers', name: 'Non-resident mortgages', body: 'Financing a Dubai property on overseas salary or business income, with currency and document checks explained.', href: '/mortgages/non-resident-dubai', img: '/images/marina-evening.webp', w: 1376, h: 768, alt: 'Concept image: a Dubai marina at dusk seen from a terrace',
    facts: [['Max LTV', ltv('Non-resident')], ['Countries', String(COUNTRIES.length)], ['Income', 'Overseas']], more: ['Golden Visa mortgages', '/mortgages/golden-visa-mortgage'] },
  { tag: 'Handover', name: 'Off-plan & handover finance', body: 'Plan the final developer payment before your handover date, with project eligibility and valuation in view.', href: '/handover/dubai-off-plan-handover-mortgage-guide', img: '/images/offplan-dusk.webp', w: 1376, h: 768, alt: 'Concept image: a residential tower nearing completion at blue hour',
    facts: [['Under construction', ltv('Off-plan')], ['Developers', String(DEVELOPERS.length)], ['Projects', String(PROJECTS.length)]], more: ['Off-plan mortgages', '/mortgages/under-construction-off-plan'] },
  { tag: 'Homeowners', name: 'Switch bank (buyout)', body: 'Compare refinance savings after exit fees, valuation and switching costs, before your fixed period ends.', href: '/mortgages/mortgage-buyout-refinance', img: '/images/keys-handover.webp', w: 1376, h: 768, alt: 'Concept image: brass house keys passed across a travertine table',
    facts: [['Exit fee cap', '1% / 10k'], ['Compare', 'Revert'], ['Tool', 'Savings']], more: ['Equity release', '/mortgages/equity-release'] },
] as const;

const emirateStats = (e: Emirate) => {
  const list = COMMUNITIES.filter((c) => c.emirate === e);
  const y = list.map((c) => c.yieldPct);
  return { count: list.length, yields: `${Math.min(...y).toFixed(1)}–${Math.max(...y).toFixed(1)}%` };
};
const MARKETS = [
  ...(['dubai', 'abu-dhabi', 'northern'] as Emirate[]).map((e) => {
    const s = emirateStats(e);
    return { name: EMIRATES[e].name, chip: e === 'dubai' ? 'DLD' : e === 'abu-dhabi' ? 'ADREC' : 'RAK · SRERD', body: EMIRATES[e].regulator, href: `/areas/${e}`, k1: 'Communities', v1: String(s.count), k2: 'Gross yields', v2: s.yields };
  }),
  { name: 'Overseas', chip: 'Non-resident', body: 'Guidance for buyers earning outside the UAE.', href: '/mortgages/non-resident-dubai', k1: 'Countries', v1: String(COUNTRIES.length), k2: 'Max LTV', v2: ltv('Non-resident') },
];

const JOURNAL_IMG = ['/images/dubai-waterfront-1280.webp', '/img/advisor-consultation-1376.webp', '/images/marina-evening.webp'];

const FAQS = [
  { q: 'How does a mortgage broker in Dubai help?', a: 'A broker helps you compare suitable lenders, prepare documents and understand the application process. The bank makes the lending decision and issues your final offer.' },
  { q: 'How much cash do I need for an AED 2M home?', a: `With a 20% deposit, this calculator estimates ${aed(cashToClose({ price: 2_000_000, downPct: 20 }).total)} including the deposit and typical Dubai purchase fees. Bank processing fees, insurance and property-specific charges may add to this. Adjust the assumptions in the mortgage calculator.` },
  { q: 'Can non-residents get a mortgage in Dubai?', a: 'Some UAE lenders consider non-resident applicants. Your income country, currency, credit history and property affect the available loan and deposit. A lender must review your documents before confirming eligibility.' },
  { q: 'What should I compare besides the mortgage rate?', a: 'Compare the fixed period, variable-rate formula, minimum floor, processing fees, insurance and early repayment terms. A lower introductory rate does not always mean a lower total cost.' },
  { q: 'How long does mortgage pre-approval take?', a: 'Timing depends on the lender and the completeness of your documents. Pre-approval is an initial assessment; it is not a final loan offer or a property valuation.' },
  { q: 'What fees should I ask about?', a: 'Request a written breakdown of bank fees, broker fees if applicable, valuation, insurance, property registration and transfer charges before proceeding.' },
];

/* ---------- Small building blocks ---------- */

function Head({ n, label, title, lead, action, dark = false }: { n: string; label: string; title: string; lead?: string; action?: { label: string; href: string }; dark?: boolean }) {
  return (
    <div className="bw-head">
      <div>
        <div className="bw-head__meta"><span className="bw-index">({n})</span><span className={`bw-label ${dark ? 'bw-label--light' : ''}`}><i />{label}</span></div>
        <h2 className="bw-h2" data-reveal="rise"><Rich text={title} /></h2>
      </div>
      {(lead || action) && (
        <div className="bw-head__side" data-reveal="rise" style={{ ['--i' as string]: 1 }}>
          {lead && <p className="bw-lead">{lead}</p>}
          {action && <Cta href={action.href} tone={dark ? 'light' : 'ghost'} size="sm">{action.label}</Cta>}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HomeHero />
      <DisclosureToast />

      {/* Trust strip (Monara) */}
      <section id="lenders" className="bw-trust bg-white" aria-label="UAE lenders in the directory">
        <div className="wrap">
          <p>Comparing terms across <b>{BANKS.length} UAE lenders</b> in one directory</p>
          <LogoMarquee label="UAE banks in the lender directory" items={BANKS.map((b) => ({ id: b.key, label: b.name, href: `/rates/${b.slug}` }))} />
          <p className="!mt-4 !mb-0 !text-[11.5px]">Directory listing is not a partnership or a live offer. Request a current written quote.</p>
        </div>
      </section>

      {/* Statement + pillars (Caldren) */}
      <section className="bw-section bg-white">
        <div className="wrap">
          <Head n="01" label="Why Betterway" title="We read mortgage offers the way *lenders* write them." lead="A home loan is more than a rate. We walk you through the whole offer, so the number you sign is the number you expected." />
          <ol className="bw-pillars">
            {PILLARS.map(([t, b], i) => (
              <li key={t} className="bw-pillar" data-reveal="rise" style={{ ['--i' as string]: i }}>
                <span className="bw-index">0{i + 1}</span>
                <h3>{t}</h3>
                <p>{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Products as stays (glamping) */}
      <section className="bw-section bg-mist">
        <div className="wrap">
          <Head n="02" label="Mortgages" title="A mortgage for every *next move.*" lead="Four common starting points. Each one opens a full guide with lender criteria, costs and the documents you will need." action={{ label: 'All mortgage options', href: '/mortgages' }} />
          <div className="bw-stays">
            {STAYS.map((s, i) => (
              <article key={s.name} className="bw-stay">
                <div className="bw-window" data-reveal="horizon"><img src={s.img} alt={s.alt} width={s.w} height={s.h} loading="lazy" decoding="async" /></div>
                <div className="bw-stay__card bw-frost" data-reveal="frost" style={{ ['--from' as string]: i % 2 ? '-56px' : '56px' }}>
                  <span className="bw-label"><i />{s.tag}</span>
                  <h3>{s.name}</h3>
                  <p>{s.body}</p>
                  <dl className="bw-stay__facts">{s.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                  <div className="bw-stay__links">
                    <Cta href={s.href} size="sm">Explore</Cta>
                    <Link href={s.more[1]} className="text-sm font-medium text-teal-700 ulink">{s.more[0]} ↗</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-10 text-xs text-slate">LTV figures are CBUAE caps for typical profiles. Lenders may offer less. Concept images are AI-generated.</p>
        </div>
      </section>

      {/* Calculator on an obsidian ground (Monara) */}
      <section id="calculator" className="bw-section bw-dark">
        <div className="bw-glow bw-glow--emerald" style={{ left: '-300px', top: '-200px' }} aria-hidden="true" />
        <div className="bw-glow bw-glow--brass" style={{ right: '-420px', top: '42%' }} aria-hidden="true" />
        <div className="bw-dots" aria-hidden="true" />
        <div className="wrap">
          <Head dark n="03" label="Mortgage calculator" title="Run the numbers *before* the bank does." lead="Monthly payment, deposit and purchase fees in one view. No sign-up, nothing submitted." />
          <div className="bw-calc-shell" data-reveal="rise"><Calculator slug="mortgage-calculator" /></div>
          <p className="bw-note">Planning estimates only. Rates and fees depend on the lender, property and your circumstances. Bank processing fees and insurance may be additional.</p>
        </div>

        {/* Reasons bento (Monara "Why choose us"), on the same obsidian ground so the glows never meet an edge */}
        <div className="wrap" style={{ marginTop: 'var(--bw-section)' }}>
          <Head dark n="04" label="What changes with us" title="Less friction. *More clarity.*" />
          <div className="bw-bento">
            <article className="bw-tile bw-tile--photo" data-reveal="rise">
              <img src="/img/advisor-consultation-1376.webp" alt="Concept image: an advisor reviewing a mortgage offer with a client" width={1376} height={768} loading="lazy" />
              <div><h3>An advisor who reads the small print with you.</h3><p className="mt-2">Fixed period, revert margin, floor rate and fees, line by line.</p></div>
            </article>
            <article className="bw-tile" data-reveal="rise" style={{ ['--i' as string]: 1 }}><span className="bw-tile__icon"><Layers3 size={20} /></span><h3>{BANKS.length} lenders, one directory</h3><p>Rates, revert formulas and criteria from UAE banks, compared on the same terms.</p></article>
            <article className="bw-tile bw-tile--figure" data-reveal="rise" style={{ ['--i' as string]: 2 }}><span className="bw-label bw-label--light"><i />CBUAE debt cap</span><strong>50<small>%</small></strong><p>Maximum debt burden ratio. Our affordability maths applies it, including card limits.</p></article>
            <article className="bw-tile" data-reveal="rise" style={{ ['--i' as string]: 3 }}><span className="bw-tile__icon"><ReceiptText size={20} /></span><h3>Every dirham, itemised</h3><p>Deposit, DLD fee, trustee, valuation and registration, shown before you commit.</p></article>
            <article className="bw-tile" data-reveal="rise" style={{ ['--i' as string]: 4 }}><span className="bw-tile__icon"><Languages size={20} /></span><h3>English & العربية</h3><p>Guides and calculators in both languages, with a right-to-left Arabic site.</p></article>
            <article className="bw-tile bw-tile--wide" data-reveal="rise"><span className="bw-tile__icon"><FileCheck2 size={20} /></span><h3>Documents ready before the bank asks</h3><p>Identity, income, liabilities and property papers in one checklist, so pre-approval is not a guessing game.</p></article>
            <article className="bw-tile bw-tile--wide" data-reveal="rise" style={{ ['--i' as string]: 1 }}><span className="bw-tile__icon"><Scale size={20} /></span><h3>Teaser rate vs real cost</h3><p>See how two offers diverge once the fixed period ends and the variable rate takes over.</p><Link href="/rates/uae-mortgage-rates-eibor-revert-bible" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brass">Compare UAE rates <ArrowUpRight size={14} /></Link></article>
          </div>
        </div>
      </section>

      {/* Benchmarks */}
      <section className="bw-section bg-white">
        <div className="wrap">
          <Head n="05" label="Benchmarks" title="Published rates, *in the open.*" lead="Follow the latest public EIBOR fixing from the Central Bank, then see what a revert margin does to your payment." action={{ label: 'Open the EIBOR tracker', href: '/rates/eibor-live-tracker' }} />
          <div className="bw-bench">
            <div className="bw-bench__panel border border-line" data-reveal="rise"><LiveBenchmark /></div>
            <div className="bw-bench__panel border border-line" data-reveal="rise" style={{ ['--i' as string]: 1 }}>
              <p className="text-lg font-medium text-navy">Teaser rate vs real cost</p>
              <p className="mt-1 text-sm text-slate">Two example banks, AED 1.5M, five years. Illustrative.</p>
              <div className="mt-5"><RatePath /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats (Caldren "Quietly, at scale") — counts of what the site actually covers */}
      <section className="bw-section--tight bg-white">
        <div className="wrap">
          <div className="bw-head__meta"><span className="bw-index">(06)</span><span className="bw-label"><i />Coverage</span></div>
          <h2 className="bw-h2 mb-12" data-reveal="rise">Quietly, <em>thorough.</em></h2>
          <div className="bw-stats">
            {[[BANKS.length, '', 'UAE lenders in our comparison directory'], [TOOLS.length, '', 'Free calculators and planning tools'], [COMMUNITIES.length, '', 'Communities with price and yield guides'], [COUNTRIES.length, '', 'Countries with non-resident guidance']].map(([v, s, l], i) => (
              <div key={l as string} className="bw-stat" data-reveal="rise" style={{ ['--i' as string]: i }}><strong>{v}{s ? <sup>{s}</sup> : null}</strong><p>{l}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey on a navy ground */}
      <section className="bw-section bw-journey">
        <div className="wrap bw-journey__grid">
          <div className="bw-journey__media"><div className="bw-window" data-reveal="horizon"><img src="/images/abudhabi-corniche.webp" width={896} height={1200} loading="lazy" alt="Concept image: low-rise coastal villas and palms in soft morning light" /></div></div>
          <div className="bw-dark !bg-transparent !overflow-visible">
            <div className="bw-head__meta"><span className="bw-index">(07)</span><span className="bw-label bw-label--light"><i />Your journey</span></div>
            <h2 className="bw-h2" data-reveal="rise">Know what <em>comes next.</em></h2>
            <ol className="bw-steps mt-12">
              {[['Set your budget', 'Check income, deposit and purchase costs against the 50% debt cap.'], ['Compare your options', 'Review rates, revert margins, fees and lender requirements.'], ['Apply for pre-approval', 'Submit documents for the bank’s assessment.'], ['Value, finalise, transfer', 'Complete valuation, final offer and registration at the trustee.']].map(([t, b], i) => (
                <li key={t} data-reveal="rise" style={{ ['--i' as string]: i }}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{t}</h3><p>{b}</p></div></li>
              ))}
            </ol>
            <div className="mt-10"><Cta href="/guides/complete-dld-trustee-transfer-day-checklist" tone="brass">Transfer-day checklist</Cta></div>
          </div>
        </div>
      </section>

      {/* Markets (Caldren "Four cities, one standard") */}
      <section className="bw-section bg-white">
        <div className="wrap">
          <Head n="08" label="Where we advise" title="Four markets, *one standard.*" lead="Each emirate has its own land registry, fees and lender appetite. Start with the market behind your shortlist." action={{ label: 'Explore areas', href: '/areas' }} />
          <div className="bw-markets">
            {MARKETS.map((m, i) => (
              <Link key={m.name} href={m.href} className="bw-market" data-reveal="rise" style={{ ['--i' as string]: i }}>
                <span className="bw-market__top"><span className="bw-market__chip">{m.chip}</span><span className="bw-market__arrow"><ArrowUpRight size={18} /></span></span>
                <h3>{m.name}</h3>
                <p>{m.body}</p>
                <dl><div><dt>{m.k1}</dt><dd>{m.v1}</dd></div><div><dt>{m.k2}</dt><dd>{m.v2}</dd></div></dl>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate">Yields are indicative gross figures from our community guides, not forecasts.</p>
        </div>
      </section>

      {/* Rules built in (Monara "Secure by design") */}
      <section className="bw-section bg-mist">
        <div className="wrap bw-rules">
          <div>
            <div className="bw-head__meta"><span className="bw-index">(09)</span><span className="bw-label"><i />Rules built in</span></div>
            <h2 className="bw-h2" data-reveal="rise">Central Bank rules, <em>by design.</em></h2>
            <p className="bw-lead mt-6">Every calculator on this site applies the CBUAE mortgage regulations, so the figures you plan with are figures a lender can actually approve.</p>
            <ul className="bw-rule-list">
              {[['50% debt burden ratio', 'All monthly debt repayments, including card limits, against gross income.'], ['25-year maximum tenure', 'Shorter terms may apply depending on your age at maturity.'], ['Early settlement capped', '1% of the outstanding balance or AED 10,000, whichever is lower.'], ['Deposit from your own funds', 'A UAE personal loan cannot fund the down payment.']].map(([t, b], i) => (
                <li key={t} data-reveal="rise" style={{ ['--i' as string]: i }}><BadgeCheck size={20} /><div><b>{t}</b><span>{b}</span></div></li>
              ))}
            </ul>
          </div>
          <div data-reveal="rise">
            <div className="bw-ltv" role="table" aria-label="CBUAE loan-to-value caps">
              <div className="bw-ltv__row" role="row"><span role="columnheader">Profile</span><span role="columnheader">Max LTV</span><span role="columnheader">Deposit</span></div>
              {LTV_RULES.map((r) => <div key={r.profile} className="bw-ltv__row" role="row"><span role="cell">{r.profile}</span><b role="cell">{r.ltv}</b><span role="cell">{r.down}</span></div>)}
            </div>
            <p className="mt-4 text-xs text-slate">Source: CBUAE mortgage loan regulations. Lender policies can be stricter. Updated {SITE.asOf}.</p>
          </div>
        </div>
      </section>

      {/* Qualifier */}
      <section className="bw-section bg-white">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="bw-head__meta"><span className="bw-index">(10)</span><span className="bw-label"><i />Your starting point</span></div>
            <h2 className="bw-h2" data-reveal="rise">A few questions. <em>A clearer direction.</em></h2>
            <p className="bw-lead mt-6 max-w-md">Tell us what you want to do. Explore indicative options, then discuss your documents with an advisor.</p>
            <ul className="mt-7 grid gap-3 text-sm text-slate">{['No credit check', 'No application submitted', 'Takes about a minute'].map((t) => <li key={t} className="flex items-center gap-2"><Check size={16} className="text-teal" />{t}</li>)}</ul>
            <Link className="bw-link mt-9" href="/guides"><Plus size={14} /> New to UAE mortgages? Start here</Link>
          </div>
          <div data-reveal="rise"><Qualifier /></div>
        </div>
      </section>

      {/* Journal (Caldren "Notes on living well") */}
      <section className="bw-section bg-mist">
        <div className="wrap">
          <Head n="11" label="Guides" title="Notes on *buying well.*" lead="Plain-English guides to valuations, deposits, transfer day and the clauses that matter in a Form F." action={{ label: 'Read the guides', href: '/guides' }} />
          <div className="bw-journal">
            {GUIDES.slice(0, 3).map((g, i) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="bw-post" data-reveal="rise" style={{ ['--i' as string]: i }}>
                <div className="bw-window"><img src={JOURNAL_IMG[i]} alt="" width={1280} height={960} loading="lazy" /></div>
                <div className="bw-post__meta"><b>Guide</b><span>· {g.steps.length} steps</span></div>
                <h3>{g.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (Monara) */}
      <section className="bw-section bg-white">
        <div className="wrap bw-faq">
          <div className="bw-faq__intro">
            <div className="bw-head__meta"><span className="bw-index">(12)</span><span className="bw-label"><i />FAQs</span></div>
            <h2 className="bw-h2" data-reveal="rise">Your questions, <em>answered.</em></h2>
            <p className="bw-lead mt-6">Don’t see what you’re looking for?</p>
            <div className="mt-6"><Cta href="/contact" tone="ghost" size="sm">Ask an advisor</Cta></div>
          </div>
          <div className="bw-faq__list">
            {FAQS.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}<i aria-hidden="true">+</i></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }} />
        </div>
      </section>

      {/* Closing invitation (Caldren + glamping dawn ground) */}
      <section className="bw-section bw-invite">
        <div className="wrap bw-invite__grid">
          <div>
            <div className="bw-head__meta"><span className="bw-index">(13)</span><span className="bw-label"><i />Talk to an advisor</span></div>
            <h2 className="bw-display bw-invite__title" data-reveal="rise">Let’s find your <em>better way</em> home.</h2>
            <p className="bw-lead mt-7 max-w-xl">Tell us how you want to buy. We will come back with a short, considered set of options and the documents to prepare.</p>
            <div className="bw-invite__actions">
              <Cta href="/contact">Book a consultation</Cta>
              <Cta href="/calculators/mortgage-calculator" tone="light">Plan my budget</Cta>
            </div>
          </div>
          <div className="bw-window" data-reveal="horizon"><img src="/images/villa-courtyard.webp" alt="Concept image: a calm villa courtyard with a reflecting pool at golden hour" width={896} height={1200} loading="lazy" /></div>
        </div>
      </section>
    </>
  );
}
