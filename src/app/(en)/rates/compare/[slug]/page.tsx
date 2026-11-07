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
        capsule={`Put the same AED 1.5M, 25-year loan through both and ${win.name} costs about ${aed(diff)} less over five years. ${a.short} opens at ${a.intro}% and then charges EIBOR plus ${a.margin.toFixed(2)}%, with ${a.floor}% as its minimum. ${b.short} opens at ${b.intro}%, then EIBOR plus ${b.margin.toFixed(2)}%, minimum ${b.floor}%.${angle}`} />
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
      <PageHero crumbs={crumbs} eyebrow="Comparison" title={c.title} capsule={`Choosing Sharia-compliant finance does not have to cost more. Over five years on AED 1.5M, the cheapest Islamic lender (${i.name}) charges ${aed(cost5(i))} in profit, against ${aed(cost5(v))} in interest at the cheapest conventional one (${v.name}). Ijara moves with EIBOR much like a variable loan, while Murabaha sets the total profit at the start.`} />
      <Section title="Islamic lenders"><RateTable banks={BANKS.filter((x) => x.type === 'Islamic')} /></Section>
      <Section tone="mist" title="Conventional lenders"><RateTable banks={BANKS.filter((x) => x.type !== 'Islamic')} /></Section>
    </>);
  }
  if (t === 'fixed-terms') {
    const loan = 2_000_000;
    const tiers = [['Lowest 2-year', Math.min(...BANKS.map((b) => b.intro))], ['Lowest 3-year', Math.min(...BANKS.map((b) => b.fixed3))], ['Lowest 5-year', Math.min(...BANKS.map((b) => b.fixed5))]] as const;
    return (<>
      <PageHero crumbs={crumbs} eyebrow="Comparison" title={c.title} capsule={`The cheapest fixes we see in November 2026 are ${tiers[0][1]}% for one or two years, ${tiers[1][1]}% for three and ${tiers[2][1]}% for five. A longer fix costs a little more now but keeps you off the variable rate for longer. With three-month EIBOR at ${BENCH.eibor3m.toFixed(2)}% (CBUAE, ${BENCH.eiborDate}) and margins between +1.00% and +1.99%, moving onto the variable rate early can end up dearer than fixing for five years.`} />
      <Section title="Monthly payment on AED 2M (25 years)">
        <div className="grid gap-4 md:grid-cols-3">{tiers.map(([k, r]) => <div key={k} className="card"><p className="text-sm text-slate">{k} · {r}%</p><p className="num mt-1 text-2xl font-semibold text-navy">{aed(emi(loan, r, 25))}/mo</p></div>)}</div>
      </Section>
      <Section tone="mist" title="All banks by term"><RateTable /></Section>
    </>);
  }
  if (t === 'salary-transfer') return (<>
    <PageHero crumbs={crumbs} eyebrow="Comparison" title={c.title} capsule="Banks often price a loan 0.10% to 0.25% lower if you move your salary to them (STL) than if you do not (NSTL), because they gain your main account. On AED 2M over 25 years, 0.25% is about AED 280 a month, so it only makes sense if you are happy to switch your salary." />
    <Section title="STL vs NSTL on AED 2M">
      <div className="grid gap-4 md:grid-cols-2">{[['Salary transfer', 3.99], ['Non-salary transfer', 4.24]].map(([k, r]) => <div key={k as string} className="card"><p className="text-sm text-slate">{k} · {r}%</p><p className="num mt-1 text-2xl font-semibold text-navy">{aed(emi(2_000_000, r as number, 25))}/mo</p></div>)}</div>
      <p className="mt-6 max-w-3xl text-slate">Business owners, people paid from abroad and anyone likely to change jobs soon often choose NSTL to stay flexible.</p>
    </Section>
  </>);
  if (t === 'cc-dbr') {
    const at = (f: 3 | 5) => borrowingPower({ salary: 40_000, existingEmis: 0, cardLimits: 150_000, ccFactor: f, years: 25 }).maxLoan;
    return (<>
      <PageHero crumbs={crumbs} eyebrow="Comparison" title={c.title} capsule={`Lenders add a percentage of your card limits to your monthly debts, even unused ones. Most take 5%, while HSBC, ADCB and DIB take 3%. For someone earning AED 40,000 with AED 150,000 of limits, the lower figure raises the maximum loan from ${aed(at(5))} to ${aed(at(3))}.`} />
      <Section title="3% vs 5% banks"><RateTable banks={[...BANKS].sort((x, y) => x.ccFactor - y.ccFactor)} limit={10} /></Section>
    </>);
  }
  const li = lifeInsurance(2_000_000, 4.25, 15);
  return (<>
    <PageHero crumbs={crumbs} eyebrow="Comparison" title={c.title} capsule={`${BANKS.filter((b) => b.externalLife).map((b) => b.short).join(', ')} will let you assign your own decreasing-term life policy in place of the bank’s cover. Over 15 years on AED 2M, that can save around ${aed(li.saved)}, and the smaller monthly cost also leaves more room in the affordability test.`} />
    <Section title="Banks accepting external life insurance"><RateTable banks={BANKS.filter((b) => b.externalLife)} /></Section>
    <Section tone="mist" title="Audit your own policy"><Link className="btn btn-primary" href="/tools/life-insurance-assignment-audit">Open the life insurance auditor</Link></Section>
  </>);
}
