import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Section, CtaBand, LinkGrid, aed } from '@/components/ui';
import RateTable from '@/components/RateTable';
import { COMPARISONS, type Comparison } from '@/data/compare';
import { BANKS, bankBy, revert, pct, type Bank } from '@/data/banks';
import { BENCH } from '@/data/site';
import { fixedThenRevert, borrowingPower, emi, lifeInsurance } from '@/lib/math';

export const dynamicParams = false;
export const generateStaticParams = () => COMPARISONS.map((c) => ({ slug: c.slug }));
const find = (s: string) => COMPARISONS.find((c) => c.slug === s);

const cost5 = (b: Bank, loan = 1_500_000) => fixedThenRevert(loan, 25, b.intro, b.introTerm === '1Y' ? 1 : 2, BENCH.eibor3m, b.margin, b.floor, 5).cost;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = find((await params).slug);
  return c ? { title: `${c.title} (2026)`, description: `${c.title}: rates, revert margins, floors and 5-year cumulative cost compared.`, alternates: { canonical: `/rates/compare/${c.slug}` } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const c = find((await params).slug);
  if (!c) notFound();
  const crumbs = [{ name: 'Rates', href: '/rates' }, { name: 'Compare', href: '/rates#compare' }, { name: c.title, href: `/rates/compare/${c.slug}` }];
  const more = COMPARISONS.filter((x) => x.slug !== c.slug).slice(0, 6).map((x) => ({ title: x.title, href: `/rates/compare/${x.slug}` }));
  return (
    <>
      {c.kind === 'banks' ? <BankPair c={c} crumbs={crumbs} /> : <Topic c={c} crumbs={crumbs} />}
      <Section tone="mist" title="More comparisons"><LinkGrid links={more} /></Section>
      <CtaBand />
    </>
  );
}

function BankPair({ c, crumbs }: { c: Comparison; crumbs: { name: string; href: string }[] }) {
  const a = bankBy(c.a!)!, b = bankBy(c.b!)!;
  const [ca, cb] = [cost5(a), cost5(b)];
  const win = ca <= cb ? a : b, diff = Math.abs(ca - cb);
  const rows: [string, (x: Bank) => string][] = [
    ['Type', (x) => x.type], ['Intro fixed', (x) => `${pct(x.intro)} (${x.introTerm})`], ['3-year fixed', (x) => pct(x.fixed3)], ['5-year fixed', (x) => pct(x.fixed5)],
    ['Revert margin', (x) => `+${x.margin.toFixed(2)}%`], ['Revert today', (x) => pct(revert(x))], ['Floor', (x) => pct(x.floor)], ['Purchase fee', (x) => x.feePurchase],
    ['Free overpayment', (x) => `${x.overpay}%`], ['Card limits in DBR', (x) => `${x.ccFactor}%`], ['Non-resident LTV', (x) => (x.nrLtv ? `${x.nrLtv}%` : '—')], ['External life cover', (x) => (x.externalLife ? 'Yes' : 'No')],
    ['5-yr interest on AED 1.5M', (x) => aed(cost5(x))],
  ];
  const angle = c.focus === 'non-resident' ? ` For non-residents, ${a.short} lends up to ${a.nrLtv ?? '—'}% LTV and ${b.short} up to ${b.nrLtv ?? '—'}%.` : c.focus === 'self-employed' ? ` Both underwrite self-employed income; ${a.overpay > b.overpay ? a.short : b.short} allows more free overpayment for lumpy business income.` : '';
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Head-to-head" title={`${c.title}: which costs less over five years?`}
        capsule={`On a AED 1.5M, 25-year loan, ${win.name} is cheaper over five years by about ${aed(diff)}. ${a.short} starts at ${a.intro}% and reverts to EIBOR + ${a.margin.toFixed(2)}% (floor ${a.floor}%); ${b.short} starts at ${b.intro}% and reverts to EIBOR + ${b.margin.toFixed(2)}% (floor ${b.floor}%).${angle}`} />
      <Section title="Side by side">
        <div className="overflow-x-auto rounded-card border border-line">
          <table className="table-bw min-w-[560px]">
            <thead><tr><th>Feature</th><th><Link href={`/rates/${a.slug}`} className="text-teal">{a.name}</Link></th><th><Link href={`/rates/${b.slug}`} className="text-teal">{b.name}</Link></th></tr></thead>
            <tbody className="num">{rows.map(([k, f]) => <tr key={k}><th scope="row" className="font-sans font-medium text-navy">{k}</th><td>{f(a)}</td><td>{f(b)}</td></tr>)}</tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

function Topic({ c, crumbs }: { c: Comparison; crumbs: { name: string; href: string }[] }) {
  const t = c.topic!;
  if (t === 'conv-islamic') {
    const best = (type: Bank['type']) => [...BANKS.filter((x) => x.type === type)].sort((x, y) => cost5(x) - cost5(y))[0];
    const i = best('Islamic'), v = best('Conventional');
    return (<>
      <PageHero crumbs={crumbs} eyebrow="Comparison" title={c.title} capsule={`Islamic home finance is not automatically dearer. On AED 1.5M over five years, the best Islamic option (${i.name}) costs ${aed(cost5(i))} in profit versus ${aed(cost5(v))} interest at the best conventional bank (${v.name}). Islamic Ijara reprices off EIBOR like a variable mortgage; Murabaha fixes the total profit upfront.`} />
      <Section title="Islamic lenders"><RateTable banks={BANKS.filter((x) => x.type === 'Islamic')} /></Section>
      <Section tone="mist" title="Conventional lenders"><RateTable banks={BANKS.filter((x) => x.type !== 'Islamic')} /></Section>
    </>);
  }
  if (t === 'fixed-terms') {
    const loan = 2_000_000;
    const tiers = [['Lowest 2-year', Math.min(...BANKS.map((b) => b.intro))], ['Lowest 3-year', Math.min(...BANKS.map((b) => b.fixed3))], ['Lowest 5-year', Math.min(...BANKS.map((b) => b.fixed5))]] as const;
    return (<>
      <PageHero crumbs={crumbs} eyebrow="Comparison" title={c.title} capsule={`In November 2026 the lowest UAE fixed rates are ${tiers[0][1]}% short-term, ${tiers[1][1]}% for 3 years and ${tiers[2][1]}% for 5 years. Longer fixes cost more today but remove revert risk; with 3M EIBOR at ${BENCH.eibor3m.toFixed(2)}% (CBUAE, ${BENCH.eiborDate}) and margins of +1.00% to +1.99%, reverting early can cost more than a 5-year fix.`} />
      <Section title="Monthly payment on AED 2M (25 years)">
        <div className="grid gap-4 md:grid-cols-3">{tiers.map(([k, r]) => <div key={k} className="card"><p className="text-sm text-slate">{k} · {r}%</p><p className="num mt-1 text-2xl font-semibold text-navy">{aed(emi(loan, r, 25))}/mo</p></div>)}</div>
      </Section>
      <Section tone="mist" title="All banks by term"><RateTable /></Section>
    </>);
  }
  if (t === 'salary-transfer') return (<>
    <PageHero crumbs={crumbs} eyebrow="Comparison" title={c.title} capsule="Salary-transfer (STL) mortgages in the UAE are typically priced 0.10%–0.25% below non-salary-transfer (NSTL) versions of the same product, because the bank captures your salary account. On AED 2M over 25 years, a 0.25% gap is roughly AED 280 a month—worth it only if you are comfortable moving your salary." />
    <Section title="STL vs NSTL on AED 2M">
      <div className="grid gap-4 md:grid-cols-2">{[['Salary transfer', 3.99], ['Non-salary transfer', 4.24]].map(([k, r]) => <div key={k as string} className="card"><p className="text-sm text-slate">{k} · {r}%</p><p className="num mt-1 text-2xl font-semibold text-navy">{aed(emi(2_000_000, r as number, 25))}/mo</p></div>)}</div>
      <p className="mt-6 max-w-3xl text-slate">Self-employed borrowers, those paid by overseas employers and people expecting to change jobs usually prefer NSTL to keep flexibility.</p>
    </Section>
  </>);
  if (t === 'cc-dbr') {
    const at = (f: 3 | 5) => borrowingPower({ salary: 40_000, existingEmis: 0, cardLimits: 150_000, ccFactor: f, years: 25 }).maxLoan;
    return (<>
      <PageHero crumbs={crumbs} eyebrow="Comparison" title={c.title} capsule={`UAE banks count a share of your total credit card limits as monthly debt. Most use 5%; HSBC, ADCB and DIB use 3%. With AED 150,000 of limits on a AED 40,000 salary, that difference lifts maximum borrowing from ${aed(at(5))} to ${aed(at(3))}.`} />
      <Section title="3% vs 5% banks"><RateTable banks={[...BANKS].sort((x, y) => x.ccFactor - y.ccFactor)} limit={10} /></Section>
    </>);
  }
  const li = lifeInsurance(2_000_000, 4.25, 15);
  return (<>
    <PageHero crumbs={crumbs} eyebrow="Comparison" title={c.title} capsule={`${BANKS.filter((b) => b.externalLife).map((b) => b.short).join(', ')} accept an assigned external decreasing-term life policy instead of their bundled cover. On AED 2M over 15 years that saves about ${aed(li.saved)}—and lower monthly outgoings also help your DBR.`} />
    <Section title="Banks accepting external life insurance"><RateTable banks={BANKS.filter((b) => b.externalLife)} /></Section>
    <Section tone="mist" title="Audit your own policy"><Link className="btn btn-primary" href="/tools/life-insurance-assignment-audit">Open the life insurance auditor</Link></Section>
  </>);
}
