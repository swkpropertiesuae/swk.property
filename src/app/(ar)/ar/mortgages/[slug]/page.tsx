import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { ArHero, ArSection, ArLinks } from '@/components/ar';
import Calculator from '@/components/calc/Calculator';
import { AR_PRODUCTS, AR_UI } from '@/data/ar';
import { PRODUCTS } from '@/data/products';
import { AR_CALCS } from '@/data/tools';

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(AR_PRODUCTS).map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = AR_PRODUCTS[slug];
  return a ? { title: a.title, description: a.capsule.slice(0, 150), alternates: { canonical: `/ar/mortgages/${slug}`, languages: { 'en-AE': `/mortgages/${slug}` } } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = AR_PRODUCTS[slug];
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!a || !p) notFound();
  const calc = AR_CALCS.includes(p.calc) ? p.calc : 'mortgage-calculator';
  return (
    <>
      <ArHero crumbs={[[AR_UI.mortgages, '/ar#mortgages'], [p.ar, `/ar/mortgages/${slug}`]]} eyebrow={p.ar} title={a.title} capsule={a.capsule} en={`/mortgages/${slug}`} />
      <ArSection title="ما تحتاج معرفته"><ul className="grid gap-3 sm:grid-cols-2">{a.points.map((x) => <li key={x} className="flex gap-3 text-[17px]"><Check className="mt-1 shrink-0 text-teal" size={18} />{x}</li>)}</ul></ArSection>
      <ArSection tone="mist" title="جرّب أرقامك"><div className="rounded-card border border-line bg-white p-5 sm:p-8"><Calculator slug={calc} lang="ar" /></div></ArSection>
      <ArSection title="خيارات تمويل أخرى"><ArLinks links={Object.keys(AR_PRODUCTS).filter((s) => s !== slug).slice(0, 8).map((s) => ({ title: PRODUCTS.find((x) => x.slug === s)!.ar, href: `/ar/mortgages/${s}` }))} /></ArSection>
    </>
  );
}
