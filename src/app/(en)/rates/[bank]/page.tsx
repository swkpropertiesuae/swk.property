import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Section, Facts, FaqList, CtaBand, LinkGrid, aed } from '@/components/ui';
import Calculator from '@/components/calc/Calculator';
import { BANKS, revert, pct } from '@/data/banks';
import { BENCH } from '@/data/site';
import { COMPARISONS } from '@/data/compare';
import { fixedThenRevert, emi } from '@/lib/math';

export const dynamicParams = false;
export const generateStaticParams = () => BANKS.map((b) => ({ bank: b.slug }));
const find = (s: string) => BANKS.find((b) => b.slug === s);

export async function generateMetadata({ params }: { params: Promise<{ bank: string }> }): Promise<Metadata> {
  const b = find((await params).bank);
  return b ? { title: `${b.name} Mortgage Rates 2026 — From ${b.intro}%, EIBOR + ${b.margin.toFixed(2)}%`, description: `${b.name} home loan: ${b.intro}% ${b.introTerm} fixed, ${b.fixed3}% 3-year, revert 3M EIBOR + ${b.margin.toFixed(2)}%, floor ${b.floor}%, ${b.overpay}% free overpayment.`, alternates: { canonical: `/rates/${b.slug}`, languages: { 'ar-AE': `/ar/rates/${b.slug}` } } } : {};
}

export default async function Page({ params }: { params: Promise<{ bank: string }> }) {
  const b = find((await params).bank);
  if (!b) notFound();
  const fy = b.introTerm === '1Y' ? 1 : 2;
  const r = fixedThenRevert(1_500_000, 25, b.intro, fy, BENCH.eibor3m, b.margin, b.floor, 5);
  const rank = BANKS.map((x) => fixedThenRevert(1_500_000, 25, x.intro, x.introTerm === '1Y' ? 1 : 2, BENCH.eibor3m, x.margin, x.floor, 5).cost).sort((a, c) => a - c).indexOf(r.cost) + 1;
  const comps = COMPARISONS.filter((c) => c.a === b.key || c.b === b.key);
  const peers = BANKS.filter((x) => x.type === b.type && x.slug !== b.slug).slice(0, 4);
  const lifeDiff = emi(2_000_000, revert(b), 20) - emi(2_000_000, BENCH.eibor3m + 1.0, 20);
  return (
    <>
      <PageHero crumbs={[{ name: 'Rates', href: '/rates' }, { name: b.name, href: `/rates/${b.slug}` }]} eyebrow={`${b.type} · ${b.hq}`} title={`${b.name} mortgage rates & credit policy (November 2026)`}
        capsule={`${b.name} offers a ${b.intro}% ${b.introTerm === '1Y' ? '1-year' : '2-year'} fixed ${b.type === 'Islamic' ? 'profit rate' : 'rate'}, ${b.fixed3}% for 3 years and ${b.fixed5}% for 5 years. After the fixed period it reverts to 3-month EIBOR + ${b.margin.toFixed(2)}% (${pct(revert(b))} today) with a ${b.floor}% floor, allows ${b.overpay}% free annual overpayment and counts ${b.ccFactor}% of card limits toward DBR.`}>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/contact" className="btn btn-primary">Get a {b.short} offer via Betterway</Link><Link href="/rates/uae-mortgage-rates-eibor-revert-bible" className="btn btn-ghost">Compare all 24 banks</Link></div>
      </PageHero>
      <Section title={`${b.short} at a glance`}>
        <Facts facts={[
          [`Intro fixed (${b.introTerm})`, pct(b.intro)], ['3-year fixed', pct(b.fixed3)], ['5-year fixed', pct(b.fixed5)],
          ['Revert margin', `3M EIBOR + ${b.margin.toFixed(2)}%`], ['Revert today', pct(revert(b))], ['Minimum floor', pct(b.floor)],
          ['Purchase fee', b.feePurchase], ['Buyout fee', b.feeBuyout], ['Free overpayment / yr', `${b.overpay}%`],
          ['Card limits in DBR', `${b.ccFactor}%`], ['Non-resident max LTV', b.nrLtv ? `${b.nrLtv}%` : 'Residents only'], ['External life insurance', b.externalLife ? 'Accepted' : 'Bank policy'],
        ]} />
        <p className="lead mt-8 max-w-3xl">{b.note}</p>
      </Section>
      <Section tone="mist" title="Five-year cost on AED 1.5M">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card"><p className="text-sm text-slate">Intro EMI ({b.introTerm})</p><p className="num mt-1 text-2xl font-semibold text-navy">{aed(r.introEmi)}/mo</p></div>
          <div className="card"><p className="text-sm text-slate">EMI after revert ({pct(r.revertRate)})</p><p className="num mt-1 text-2xl font-semibold text-navy">{aed(r.revertEmi)}/mo</p></div>
          <div className="card"><p className="text-sm text-slate">Interest over 5 years</p><p className="num mt-1 text-2xl font-semibold text-navy">{aed(r.cost)}</p><p className="mt-1 text-sm text-teal">Rank {rank} of 24</p></div>
        </div>
        {b.margin > 1 && <p className="mt-6 max-w-3xl text-slate">On AED 2M with 20 years left, {b.short}’s revert costs about <b className="num text-navy">{aed(lifeDiff)}/month</b> more than the panel’s lowest margin (DIB, +1.00%).</p>}
      </Section>
      <Section title="Model your own loan"><div className="rounded-card border border-line p-5 sm:p-8"><Calculator slug="mortgage-calculator" initial={{ rate: b.fixed3 }} /></div></Section>
      <Section tone="mist" title={`${b.short} FAQ`}><div className="max-w-3xl"><FaqList faqs={[
        { q: `Does ${b.name} lend to non-residents?`, a: b.nrLtv ? `Yes, up to ${b.nrLtv}% LTV subject to income and country criteria.` : `${b.name} currently lends to UAE residents only on our panel.` },
        { q: `How much can I overpay with ${b.short}?`, a: `Up to ${b.overpay}% of the outstanding balance each year without a fee; above that the CBUAE cap of 1% or AED 10,000 applies.` },
        { q: `Is ${b.short} good after the fixed period?`, a: `Its revert is 3M EIBOR + ${b.margin.toFixed(2)}% with a ${b.floor}% floor—${b.margin <= 1.4 ? 'among the lowest on the panel' : b.margin >= 1.8 ? 'at the higher end of the panel, so plan a buyout before reversion' : 'mid-panel'}.` },
      ]} /></div></Section>
      {comps.length > 0 && <Section title="Head-to-head"><LinkGrid links={comps.map((c) => ({ title: c.title, href: `/rates/compare/${c.slug}` }))} /></Section>}
      <Section tone={comps.length ? 'mist' : 'white'} title={`Other ${b.type.toLowerCase()} lenders`}><LinkGrid cols={4} links={peers.map((x) => ({ title: x.name, body: `From ${x.intro}% · EIBOR + ${x.margin.toFixed(2)}%`, href: `/rates/${x.slug}` }))} /></Section>
      <CtaBand />
    </>
  );
}
