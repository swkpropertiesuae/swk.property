import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Section, CtaBand, aedM } from '@/components/ui';
import { COMMUNITIES, EMIRATES, type Emirate } from '@/data/communities';

export const dynamicParams = false;
export const generateStaticParams = () => (Object.keys(EMIRATES) as Emirate[]).map((emirate) => ({ emirate }));

export async function generateMetadata({ params }: { params: Promise<{ emirate: string }> }): Promise<Metadata> {
  const e = EMIRATES[(await params).emirate as Emirate];
  return e ? { title: `${e.name} Communities — Prices, Yields & Mortgage Coverage`, alternates: { canonical: `/areas/${(await params).emirate}` } } : {};
}

export default async function Page({ params }: { params: Promise<{ emirate: string }> }) {
  const key = (await params).emirate as Emirate;
  const e = EMIRATES[key];
  if (!e) notFound();
  const list = COMMUNITIES.filter((c) => c.emirate === key).sort((a, b) => b.yieldPct - a.yieldPct);
  return (
    <>
      <PageHero crumbs={[{ name: 'Areas', href: '/areas' }, { name: e.name, href: `/areas/${key}` }]} eyebrow="Areas" title={`${e.name} freehold communities: prices, yields & EMI coverage`}
        capsule={`${list.length} freehold areas in ${e.name}, ranked by gross yield, with a guide price per square foot and a typical unit price. Open any area to compare a resident’s and an investor’s repayment with the usual rent. Sales are recorded by the ${e.regulator}.`} />
      <Section title={`${list.length} communities`}>
        <div className="overflow-x-auto rounded-card border border-line">
          <table className="table-bw min-w-[640px]">
            <thead><tr><th>Community</th><th>Stock</th><th>AED / sq.ft.</th><th>Gross yield</th><th>Typical unit</th></tr></thead>
            <tbody className="num">{list.map((c) => <tr key={c.slug}><th scope="row" className="font-sans"><Link href={`/areas/${key}/${c.slug}`} className="font-semibold text-navy hover:text-teal">{c.name}</Link></th><td className="font-sans text-slate">{c.stock}</td><td>{c.psf.toLocaleString('en-US')}</td><td className="text-teal">{c.yieldPct}%</td><td>{aedM(c.typical)}</td></tr>)}</tbody>
          </table>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
