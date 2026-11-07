import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Section, Facts, FaqList, CtaBand, LinkGrid, JsonLd, Sources } from '@/components/ui';
import Calculator from '@/components/calc/Calculator';
import RateTable from '@/components/RateTable';
import { PRODUCTS, productBy } from '@/data/products';
import { COUNTRIES } from '@/data/countries';
import { BANKS } from '@/data/banks';
import { toolBy } from '@/data/tools';
import { SITE } from '@/data/site';

export const dynamicParams = false;
const NR = 'non-resident-';
const countryOf = (slug: string) => (slug.startsWith(NR) && slug !== 'non-resident-dubai' ? COUNTRIES.find((c) => c.slug === slug.slice(NR.length)) : undefined);

export function generateStaticParams() {
  return [...PRODUCTS.map((p) => ({ slug: p.slug })), ...COUNTRIES.map((c) => ({ slug: NR + c.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = countryOf(slug);
  if (c) return { title: `Dubai Mortgage for ${c.demonym} Non-Residents — ${c.ltv} LTV`, description: `How ${c.demonym} buyers get a UAE mortgage: max LTV ${c.ltv}, ${c.fx} FX haircut, documents and credit bureau (${c.bureau}).`, alternates: { canonical: `/mortgages/${slug}` } };
  const p = productBy(slug);
  return p ? { title: p.title, description: p.capsule.slice(0, 158), alternates: { canonical: `/mortgages/${slug}`, languages: { 'ar-AE': `/ar/mortgages/${slug}` } } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = countryOf(slug);
  if (c) return <CountryPage slug={slug} c={c} />;
  const p = productBy(slug);
  if (!p) notFound();
  const tool = toolBy(p.calc)!;
  const related = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 6);
  return (
    <>
      <PageHero crumbs={[{ name: 'Mortgages', href: '/mortgages' }, { name: p.name, href: `/mortgages/${p.slug}` }]} eyebrow={p.badge} title={p.title} capsule={p.capsule}>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/contact" className="btn btn-primary">{p.cta}</Link><Link href={`/${tool.base}/${tool.slug}`} className="btn btn-ghost">{tool.name}</Link></div>
      </PageHero>
      <Section title={`${p.name}: key numbers`}><Facts facts={p.facts} /><Sources /></Section>
      <Section tone="mist" title="How it works">
        <div className="grid gap-6 lg:grid-cols-3">
          {p.sections.map((s) => <div key={s.h} className="card"><h3 className="h3">{s.h}</h3><p className="mt-3 text-[15px] leading-relaxed text-slate">{s.p}</p></div>)}
        </div>
      </Section>
      <Section title={tool.name} intro={tool.capsule}>
        <div className="rounded-card border border-line p-5 sm:p-8"><Calculator slug={p.calc} /></div>
      </Section>
      {slug === 'non-resident-dubai' && (
        <Section tone="mist" title="Non-resident guides by country" intro="Documents, credit bureau and FX haircut for 25 buyer nationalities.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COUNTRIES.map((x) => <Link key={x.slug} href={`/mortgages/${NR}${x.slug}`} className="card !p-4"><span className="font-semibold text-navy">{x.name}</span><span className="num mt-1 block text-sm text-slate">{x.ltv} LTV · {x.fx}</span></Link>)}
          </div>
        </Section>
      )}
      {slug === 'islamic-home-finance' && <Section tone="mist" title="Islamic profit rates on our panel"><RateTable banks={BANKS.filter((b) => b.type === 'Islamic')} /></Section>}
      <Section title="Frequently asked"><div className="max-w-3xl"><FaqList faqs={p.faqs} /></div></Section>
      <Section tone="mist" title="Related mortgages"><LinkGrid links={related.map((r) => ({ title: r.name, body: r.card, href: `/mortgages/${r.slug}`, tag: r.badge }))} /></Section>
      <CtaBand />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FinancialProduct', name: p.name, description: p.capsule, provider: { '@id': `${SITE.url}/#org` }, feesAndCommissionsSpecification: 'Confirm broker and bank fees in writing; lender terms apply.', url: `${SITE.url}/mortgages/${p.slug}` }} />
    </>
  );
}

function CountryPage({ slug, c }: { slug: string; c: (typeof COUNTRIES)[number] }) {
  const lenders = BANKS.filter((b) => b.nrLtv).sort((a, b) => (b.nrLtv! - a.nrLtv!) || a.intro - b.intro);
  return (
    <>
      <PageHero crumbs={[{ name: 'Mortgages', href: '/mortgages' }, { name: 'Non-resident', href: '/mortgages/non-resident-dubai' }, { name: c.name, href: `/mortgages/${slug}` }]}
        eyebrow={`Non-resident · ${c.name}`} title={`Dubai mortgages for ${c.demonym} non-residents: ${c.ltv} LTV, documents & credit bureau`}
        capsule={`${c.demonym} buyers living in ${c.name} can finance UAE property at up to ${c.ltv} LTV. Banks convert income at a ${c.fx.split('·')[1]?.trim() ?? ''} FX haircut, verify salary with ${c.salaried.toLowerCase()} and check credit through ${c.bureau}. Most-active lenders: ${c.banks}. Closing can be fully remote by video PoA.`}>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/contact" className="btn btn-primary">Check my eligibility</Link><Link href="/calculators/non-resident-rental-coverage" className="btn btn-ghost">Rental coverage simulator</Link></div>
      </PageHero>
      <Section title={`What ${c.demonym} applicants need`}>
        <Facts facts={[['Typical LTV (bank policy)', c.ltv], ['FX haircut', c.fx], ['Credit bureau', c.bureau], ['Salaried proof', c.salaried], ['Self-employed proof', c.selfEmp], ['Lead lenders', c.banks]]} />
        <p className="lead mt-8 max-w-3xl">{c.note}</p>
      </Section>
      <Section tone="mist" title="Non-resident lenders on our panel"><RateTable banks={lenders} /></Section>
      <Section title="Model the investment"><div className="rounded-card border border-line p-5 sm:p-8"><Calculator slug="non-resident-rental-coverage" /></div></Section>
      <Section tone="mist" title="Frequently asked">
        <div className="max-w-3xl"><FaqList faqs={[
          { q: `Can ${c.demonym} citizens buy freehold property in Dubai?`, a: 'Yes. Foreign nationals can own freehold title in designated areas across Dubai, Abu Dhabi and the Northern Emirates.' },
          { q: 'Do I need to visit the UAE to close?', a: 'No. Form F is signed through Dubai REST OTP and the transfer is completed by an attorney under a 15-minute Dubai Courts video Power of Attorney.' },
          { q: `How is ${c.name} income converted?`, a: `Banks convert at the current rate less a ${c.fx.split('·')[1]?.trim() ?? 'variable'} haircut to buffer currency moves.` },
        ]} /></div>
      </Section>
      <Section title="Other countries"><LinkGrid cols={4} links={COUNTRIES.filter((x) => x.slug !== c.slug).slice(0, 8).map((x) => ({ title: x.name, body: `${x.ltv} LTV · ${x.fx}`, href: `/mortgages/${NR}${x.slug}` }))} /></Section>
      <CtaBand title={`Remote Dubai mortgage for ${c.demonym} buyers`} />
    </>
  );
}
