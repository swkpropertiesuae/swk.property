import type { Metadata } from 'next';
import { REG, LENDER } from '@/data/regulation';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Section, Facts, FaqList, CtaBand, LinkGrid, aed, aedM } from '@/components/ui';
import Calculator from '@/components/calc/Calculator';
import { COMMUNITIES, EMIRATES, AR_COMMUNITIES, communityBy } from '@/data/communities';
import { PROJECTS } from '@/data/handover';
import { coverage } from '@/lib/derive';

export const dynamicParams = false;
export const generateStaticParams = () => COMMUNITIES.map((c) => ({ emirate: c.emirate, community: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ emirate: string; community: string }> }): Promise<Metadata> {
  const { emirate, community } = await params;
  const c = communityBy(emirate, community);
  return c ? { title: `${c.name} Mortgage Guide — AED ${c.psf.toLocaleString('en-US')}/sq.ft., ${c.yieldPct}% Yield`, description: `Mortgage, price per sq.ft., rental yield and EMI-vs-rent coverage for ${c.name}, ${EMIRATES[c.emirate].name}.`, alternates: { canonical: `/areas/${emirate}/${community}`, ...(AR_COMMUNITIES.includes(c.slug) ? { languages: { 'ar-AE': `/ar/areas/${emirate}/${community}` } } : {}) } } : {};
}

export default async function Page({ params }: { params: Promise<{ emirate: string; community: string }> }) {
  const { emirate, community } = await params;
  const c = communityBy(emirate, community);
  if (!c) notFound();
  const e = EMIRATES[c.emirate];
  const k = coverage(c);
  const key = c.name.split(/[ (&,]/)[0].toLowerCase();
  const projects = PROJECTS.filter((p) => p.community.toLowerCase().includes(key)).slice(0, 6);
  const nearby = COMMUNITIES.filter((x) => x.emirate === c.emirate && x.slug !== c.slug && x.stock === c.stock).slice(0, 4);
  return (
    <>
      <PageHero crumbs={[{ name: 'Areas', href: '/areas' }, { name: e.name, href: `/areas/${c.emirate}` }, { name: c.name, href: `/areas/${c.emirate}/${c.slug}` }]} eyebrow={`${e.name} · ${c.stock}`} title={`Buying in ${c.name} with a mortgage: prices, yields & EMI coverage`}
        capsule={`Homes in ${c.name} sell for roughly AED ${c.psf.toLocaleString('en-US')} per sq.ft., and gross rental yields are about ${c.yieldPct}%. Financing a typical ${c.stock === 'Apartments' ? 'apartment' : 'home'} priced at ${aedM(c.typical)} with a ${REG.ltv.expat.first}% loan at 3.99% costs around ${aed(k.res)} a month. Typical rent is ${aed(k.rentMo)}, so rent would cover ${Math.round(k.resCov * 100)}% of the repayment. Active developers: ${c.devs}.`} />
      <Section title={`${c.name} market snapshot`}>
        <Facts facts={[['Price per sq.ft.', `AED ${c.psf.toLocaleString('en-US')}`], ['Gross yield', `${c.yieldPct}%`], ['Typical unit', aedM(c.typical)], ['Typical rent / yr', aed(c.rent)], ['Cash to close (20%)', aed(k.cash)], ['Registry', e.regulator]]} />
        <p className="mt-4 text-xs text-slate">These are guide figures. Ask us for recent registered sales in this area.</p>
      </Section>
      <Section tone="mist" title="Does rent cover the mortgage?">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card"><p className="text-sm text-slate">Expat first home, {REG.ltv.expat.first}% LTV @ 3.99%</p><p className="num mt-1 text-2xl font-semibold text-navy">{aed(k.res)}/mo</p><p className="mt-1 text-sm text-teal">Rent covers {Math.round(k.resCov * 100)}%</p></div>
          <div className="card"><p className="text-sm text-slate">Expat second home, {REG.ltv.expat.subsequent}% LTV @ 4.29%</p><p className="num mt-1 text-2xl font-semibold text-navy">{aed(k.inv)}/mo</p><p className="mt-1 text-sm text-teal">Rent covers {Math.round(k.invCov * 100)}%</p></div>
          <div className="card"><p className="text-sm text-slate">Typical monthly rent</p><p className="num mt-1 text-2xl font-semibold text-navy">{aed(k.rentMo)}/mo</p><p className="mt-1 text-sm text-slate">Before service charges</p></div>
        </div>
      </Section>
      <Section title={`Rent or buy in ${c.name}?`}>
        <div className="rounded-card border border-line p-5 sm:p-8"><Calculator slug="rent-vs-buy-dubai" initial={{ price: Math.min(30_000_000, k.price), rent: Math.min(1_000_000, Math.round(c.rent / 5000) * 5000) }} /></div>
      </Section>
      {projects.length > 0 && <Section tone="mist" title={`Handover projects in ${c.name}`}><LinkGrid links={projects.map((p) => ({ title: p.name, body: `${p.window}${p.plan ? ` · ${p.plan}` : ''}`, href: `/handover/${p.dev}/${p.slug}` }))} /></Section>}
      <Section title="FAQ"><div className="max-w-3xl"><FaqList faqs={[
        { q: `Can expats get a mortgage in ${c.name}?`, a: `Yes, ${c.name} is open to freehold ownership. Expatriates can borrow up to ${REG.ltv.expat.first}% of a first home worth AED 5M or less, and UAE Nationals up to ${REG.ltv.national.first}%. For buyers living abroad, the limit is each bank’s choice and usually falls between ${LENDER.nonResidentLtv.min}% and ${LENDER.nonResidentLtv.max}%.` },
        { q: `Which banks lend most in ${c.name}?`, a: 'Most lenders on our panel finance completed homes here. For towers still under construction, it depends on whether each bank has approved the project.' },
      ]} /></div></Section>
      {nearby.length > 0 && <Section tone={projects.length ? 'white' : 'mist'} title="Similar communities"><LinkGrid cols={4} links={nearby.map((x) => ({ title: x.name, body: `AED ${x.psf.toLocaleString('en-US')}/sq.ft. · ${x.yieldPct}%`, href: `/areas/${x.emirate}/${x.slug}` }))} /></Section>}
      <CtaBand title={`Pre-approval for ${c.name}`} />
    </>
  );
}
