import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArHero, ArSection, ArLinks } from '@/components/ar';
import Calculator from '@/components/calc/Calculator';
import { AR_CALC_CAPSULE, AR_UI } from '@/data/ar';
import { TOOLS, AR_CALCS, toolBy } from '@/data/tools';

export const dynamicParams = false;
export const generateStaticParams = () => AR_CALCS.map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = toolBy((await params).slug);
  return t ? { title: t.ar, alternates: { canonical: `/ar/calculators/${t.slug}`, languages: { 'en-AE': `/calculators/${t.slug}` } } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const t = toolBy((await params).slug);
  if (!t || !AR_CALCS.includes(t.slug)) notFound();
  return (
    <>
      <ArHero crumbs={[[AR_UI.calculators, '/ar#calculators'], [t.ar, `/ar/calculators/${t.slug}`]]} eyebrow={AR_UI.calculators} title={t.ar} capsule={AR_CALC_CAPSULE(t.ar)} en={`/calculators/${t.slug}`} />
      <section className="py-12"><div className="wrap"><div className="rounded-card border border-line p-5 sm:p-8"><Calculator slug={t.slug} lang="ar" /></div></div></section>
      <ArSection tone="mist" title="أدوات حساب أخرى"><ArLinks links={AR_CALCS.filter((s) => s !== t.slug).map((s) => ({ title: TOOLS.find((x) => x.slug === s)!.ar, href: `/ar/calculators/${s}` }))} /></ArSection>
    </>
  );
}
