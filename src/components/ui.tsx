import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Info, MapPin, ShieldCheck } from 'lucide-react';
import { SITE, BENCH, DISCLOSURE_SHORT, DISCLOSURE_FULL, fullAddress, waLink } from '@/data/site';
import MotionReveal from '@/components/MotionReveal';
import type { Faq as FaqT } from '@/data/products';

export const aed = (n: number) => `AED ${Math.round(n).toLocaleString('en-US')}`;
export const aedM = (n: number) => `AED ${n >= 10 ? n.toFixed(1) : n.toFixed(2)}M`;

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Renders `*word*` in a heading as the serif italic accent used across the brand (Caldren-style). */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return <>{parts.map((p, i) => (i % 2 ? <em key={i}>{p}</em> : p))}</>;
}
export const plain = (text: string) => text.replace(/\*/g, '');

/** Pill button with a rolling label and an accent disc (8B glamping button-primary). */
export function Cta({ href, children, tone = 'dark', size, external, className = '' }: { href: string; children: string; tone?: 'dark' | 'light' | 'emerald' | 'brass' | 'ghost'; size?: 'sm'; external?: boolean; className?: string }) {
  const cls = `bw-btn ${tone !== 'dark' ? `bw-btn--${tone}` : ''} ${size === 'sm' ? 'bw-btn--sm' : ''} ${className}`;
  const inner = (
    <>
      <span className="bw-btn__label"><span>{children}</span><span aria-hidden="true">{children}</span></span>
      <span className="bw-btn__disc" aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.8} /></span>
    </>
  );
  return external || /^(https?:|mailto:|tel:)/.test(href)
    ? <a href={href} className={cls} rel="noopener">{inner}</a>
    : <Link href={href} className={cls}>{inner}</Link>;
}

/** Announcement bar (Monara): one line of genuinely useful, sourced information. */
export function UtilityBar() {
  return (
    <div className="bw-announce">
      <div className="wrap">
        <p className="truncate"><ShieldCheck size={14} className="me-1.5 inline -translate-y-px text-brass" /><b>CBUAE EIBOR fixings</b><span className="hidden sm:inline"> are published every business day. Compare your offer against the benchmark.</span></p>
        <span className="bw-announce__sep" aria-hidden="true" />
        <Link href="/rates/eibor-live-tracker">EIBOR tracker →</Link>
      </div>
    </div>
  );
}

export function Disclosure({ dark = false }: { dark?: boolean }) {
  return (
    <details className={`group mt-4 max-w-2xl text-xs ${dark ? 'text-white/60' : 'text-slate'}`}>
      <summary className="cursor-pointer list-none">
        {DISCLOSURE_SHORT} <span className={`inline-flex items-center gap-1 font-semibold underline-offset-2 hover:underline ${dark ? 'text-mint' : 'text-teal'}`}><Info size={12} /> Rate assumptions & fees</span>
      </summary>
      <p className="mt-2 leading-relaxed">{DISCLOSURE_FULL}</p>
    </details>
  );
}

export function Crumbs({ items }: { items: { name: string; href: string }[] }) {
  const all = [{ name: 'Home', href: '/' }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-slate">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true" className="text-line">/</span>}
              {i < all.length - 1 ? <Link href={c.href} className="hover:text-teal">{c.name}</Link> : <span aria-current="page" className="text-navy">{c.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: SITE.url + c.href })) }} />
    </>
  );
}

/** Standard page header: breadcrumbs, H1, 50-word AEO citation capsule, actions. */
/** Small static phone shown beside inner-page headers: live benchmarks + primary action. */
export function MiniPhone() {
  return (
    <div className="float relative mx-auto hidden w-[250px] rounded-[2.6rem] bg-[#0b1220] p-[9px] shadow-[0_40px_80px_-30px_rgb(2_34_72/0.5),inset_0_0_0_2px_#2a3446] lg:block" aria-hidden="true">
      <div className="relative overflow-hidden rounded-[2.1rem] bg-white px-5 pb-6 pt-11">
        <span className="absolute start-1/2 top-2.5 h-[22px] w-[80px] -translate-x-1/2 rounded-full bg-[#0b1220] rtl:translate-x-1/2" />
        <div className="flex items-center gap-2"><img src="/brand/symbol-teal.svg" alt="" width={20} height={20} className="h-5 w-5" /><span className="text-[13px] font-semibold text-navy">Betterway</span></div>
        <div className="mt-4 rounded-2xl bg-navy p-4 text-white">
          <p className="text-[11px] text-white/60">Example fixed rate</p>
          <p className="num text-[26px] font-semibold">{BENCH.lowestFixed}%</p>
        </div>
        <div className="mt-2 space-y-1.5 text-[11px]">
          {[['Planning rate', `${BENCH.lowestFixed}%`], ['Lender directory', '24'], ['Costs', 'Itemised'], ['Approval', 'Bank assessed']].map(([a, b]) => (
            <div key={a} className="flex justify-between rounded-lg bg-mist px-3 py-2"><span className="text-slate">{a}</span><span className="num font-semibold text-navy">{b}</span></div>
          ))}
        </div>
        <div className="mt-3 rounded-btn bg-teal py-2.5 text-center text-[12px] font-semibold text-white">Plan your mortgage</div>
      </div>
    </div>
  );
}

/** Standard page header. A "Short title: keyword detail" string renders as a short H1 with the detail as a subline inside the H1. */
export function PageHero({ crumbs, eyebrow, title, capsule, children, aside, updated = true }: {
  crumbs: { name: string; href: string }[]; eyebrow?: string; title: string; capsule?: string; children?: ReactNode; aside?: ReactNode | false; updated?: boolean;
}) {
  const cut = title.indexOf(': ');
  const [head, sub] = cut > 0 ? [title.slice(0, cut), title.slice(cut + 2)] : [title, ''];
  const side = aside === undefined ? <MiniPhone /> : aside;
  return (
    <section className="bw-pagehero">
      <div className="wrap relative py-10 lg:py-16">
        <Crumbs items={crumbs} />
        <div className={`mt-8 grid gap-10 ${side ? 'lg:grid-cols-[minmax(0,1fr)_250px] lg:items-center' : ''}`}>
          <div>
            {eyebrow && <p className="bw-label mb-5"><i />{eyebrow}</p>}
            <h1 className="max-w-4xl">
              {head}
              {sub && <span className="mt-4 block font-sans text-lg font-normal leading-snug tracking-normal text-slate sm:text-xl">{sub}</span>}
            </h1>
            {capsule && (
              <div className="bw-capsule mt-7 max-w-2xl" data-capsule>
                <p className="text-[15.5px] leading-relaxed text-ink">{capsule}</p>
                {updated && <p className="mt-2 text-xs text-slate">Updated {SITE.asOf}</p>}
              </div>
            )}
            {children}
          </div>
          {side}
        </div>
      </div>
    </section>
  );
}

export function Section({ id, title, eyebrow, intro, children, tone = 'white', action }: { id?: string; title: string; eyebrow?: string; intro?: string; children: ReactNode; tone?: 'white' | 'mist' | 'navy'; action?: { label: string; href: string } }) {
  const bg = tone === 'mist' ? 'bg-mist' : tone === 'navy' ? 'bg-navy text-white' : 'bg-white';
  const dark = tone === 'navy';
  return (
    <section id={id} className={`${bg} py-16 lg:py-24`}>
      <MotionReveal className="wrap">
        <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div>
            {eyebrow && <p className={`bw-label mb-5 ${dark ? 'bw-label--light' : ''}`}><i />{eyebrow}</p>}
            <h2 className={`h2 ${dark ? '!text-white' : ''} [&_em]:font-serif [&_em]:font-normal [&_em]:italic`}><Rich text={title} /></h2>
          </div>
          {(intro || action) && (
            <div className="grid justify-items-start gap-6 lg:justify-self-end lg:max-w-[460px]">
              {intro && <p className={`text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-slate'}`}>{intro}</p>}
              {action && <Cta href={action.href} tone={dark ? 'light' : 'ghost'} size="sm">{action.label}</Cta>}
            </div>
          )}
        </div>
        {children}
      </MotionReveal>
    </section>
  );
}

export function Facts({ facts }: { facts: [string, string][] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
      {facts.map(([k, v]) => (
        <div key={k} className="bg-white p-5 max-sm:odd:last:col-span-2 sm:[&:nth-child(3n+1):last-child]:col-span-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-slate">{k}</dt>
          <dd className={`mt-1.5 text-lg font-semibold text-navy ${/^[\d+−-]|^AED|^3M/.test(v) ? 'num' : 'font-display'}`}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function FaqList({ faqs }: { faqs: FaqT[] }) {
  if (!faqs.length) return null;
  return (
    <>
      <div className="divide-y divide-line rounded-card border border-line bg-white">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-navy">
              {f.q}<span className="mt-0.5 text-teal transition group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-3 leading-relaxed text-slate">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }} />
    </>
  );
}

export function LinkGrid({ links, cols = 3 }: { links: { title: string; body?: string; href: string; tag?: string }[]; cols?: 2 | 3 | 4 }) {
  const c = cols === 4 ? 'lg:grid-cols-4' : cols === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';
  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${c}`}>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="card group flex flex-col">
          {l.tag && <span className="tag mb-3 self-start">{l.tag}</span>}
          <span className="font-display text-[17px] font-semibold text-navy group-hover:text-teal">{l.title}</span>
          {l.body && <span className="mt-2 text-sm leading-relaxed text-slate">{l.body}</span>}
          <span className="mt-auto pt-4 text-sm font-semibold text-teal">Open <ArrowRight size={14} className="inline transition group-hover:translate-x-0.5" /></span>
        </Link>
      ))}
    </div>
  );
}

export function CtaBand({ title = 'Your next move starts *here.*', body = 'Understand your mortgage options, prepare your documents and plan your budget.' }: { title?: string; body?: string }) {
  return (
    <section className="bw-invite py-16 lg:py-24">
      <div className="wrap">
        <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="bw-label mb-5"><i />Talk to an advisor</p>
            <h2 className="bw-h2"><Rich text={title.includes('*') ? title : title.replace(/(\S+)\s*$/, '*$1*')} /></h2>
            <p className="bw-lead mt-5 max-w-2xl">{body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Cta href="/contact">Discuss my mortgage</Cta>
            <Cta href={waLink()} tone="light">Ask a question</Cta>
          </div>
        </div>
      </div>
    </section>
  );
}

const FOOT: { title: string; links: [string, string][] }[] = [
  { title: 'Mortgages', links: [['Expat residents', '/mortgages/uae-residents'], ['UAE Nationals', '/mortgages/uae-nationals'], ['Non-resident', '/mortgages/non-resident-dubai'], ['Golden Visa', '/mortgages/golden-visa-mortgage'], ['Islamic finance', '/mortgages/islamic-home-finance'], ['Switch bank', '/mortgages/mortgage-buyout-refinance'], ['All products', '/mortgages']] },
  { title: 'Rates & tools', links: [['UAE mortgage rates', '/rates/uae-mortgage-rates-eibor-revert-bible'], ['EIBOR tracker', '/rates/eibor-live-tracker'], ['Mortgage calculator', '/calculators/mortgage-calculator'], ['DBR calculator', '/calculators/dbr-borrowing-power'], ['Form F clauses', '/tools/form-f-clause-generator'], ['All calculators', '/calculators']] },
  { title: 'Explore', links: [['Off-plan handover', '/handover/dubai-off-plan-handover-mortgage-guide'], ['Areas & yields', '/areas'], ['Affordability', '/affordability'], ['Guides', '/guides'], ['Advisory', '/advisory'], ['Sitemap', '/sitemap']] },
  { title: 'Company', links: [['About us', '/about-us'], ['Why not go direct?', '/why-betterway-vs-direct-bank'], ['Underwriters', '/our-underwriters'], ['Reviews', '/reviews'], ['Careers', '/careers'], ['Contact', '/contact'], ['For agents', '/partners']] },
];

export function Footer() {
  return (
    <footer className="bw-footer">
      <div className="wrap bw-footer__top">
        <div className="bw-footer__brand">
          <img src="/brand/logo-white-full.svg" alt="Betterway Mortgages" width={1591} height={444} />
          <p className="mt-7 max-w-sm text-[15px] leading-relaxed text-white/70">Mortgage advice for residents, overseas buyers and investors across the UAE. Compare the whole offer, not just the rate.</p>
          <p className="mt-6 flex gap-2 text-sm"><MapPin size={16} className="mt-0.5 shrink-0 text-brass" />{fullAddress}</p>
          <p className="mt-3 text-sm">{SITE.phone && <><a href={SITE.phoneHref} className="ulink">{SITE.phone}</a> · </>}<a href={`mailto:${SITE.email}`} className="ulink">{SITE.email}</a></p>
          <p className="mt-1 text-sm">{SITE.hours}</p>
          {SITE.licence && <p className="mt-4 text-xs text-white/50">{SITE.licence}</p>}
          <div className="mt-8"><Cta href="/contact" tone="brass" size="sm">Talk to an advisor</Cta></div>
        </div>
        <div className="bw-footer__cols">
          {FOOT.map((g) => (
            <div key={g.title}>
              <h3>{g.title}</h3>
              <ul>{g.links.map(([l, h]) => <li key={h}><Link href={h} className="ulink">{l}</Link></li>)}</ul>
            </div>
          ))}
        </div>
      </div>
      <div className="bw-footer__mark" data-reveal="mark" aria-hidden="true"><span>betterway</span></div>
      <div className="relative z-[1] bg-obsidian">
        <div className="wrap bw-footer__base">
          <p>{DISCLOSURE_FULL}</p>
          <p>Betterway Mortgages is a mortgage adviser, not a bank. Lending decisions, rates and final offers are made by the lender. Concept residence and advisor images are AI-generated.</p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p>© 2026 {SITE.legalName}. All rights reserved.</p>
            <nav aria-label="Legal"><Link href="/privacy-and-cbuae-disclosure" className="ulink">Privacy & CBUAE disclosure</Link><Link href="/sitemap" className="ulink">Sitemap</Link><Link href="/ar" lang="ar" className="ulink">العربية</Link></nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['FinancialService', 'LocalBusiness'],
    '@id': `${SITE.url}/#org`,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/brand/logo-primary.svg`,
    image: `${SITE.url}/brand/materials/betterway-banner.png`,
    ...(SITE.phone ? { telephone: SITE.phone } : {}),
    email: SITE.email,
    address: { '@type': 'PostalAddress', streetAddress: `${SITE.address.building}, ${SITE.address.plot}, ${SITE.address.street}`, addressLocality: SITE.address.district, addressRegion: 'Dubai', addressCountry: 'AE' },
    areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah'],
    openingHours: 'Mo-Sa 09:00-19:00',
  };
}
