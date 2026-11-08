import type { Metadata } from 'next';
import { REG } from '@/data/regulation';
import { notFound } from 'next/navigation';
import { ArHero, ArSection, ArFacts, ArLinks } from '@/components/ar';
import Calculator from '@/components/calc/Calculator';
import { AR_UI, AR_STOCK } from '@/data/ar';
import { COMMUNITIES, AR_COMMUNITIES, EMIRATES, communityBy } from '@/data/communities';
import { coverage } from '@/lib/derive';

export const dynamicParams = false;
export const generateStaticParams = () => AR_COMMUNITIES.map((s) => COMMUNITIES.find((c) => c.slug === s)!).map((c) => ({ emirate: c.emirate, community: c.slug }));
const n = (x: number) => Math.round(x).toLocaleString('en-US');

export async function generateMetadata({ params }: { params: Promise<{ emirate: string; community: string }> }): Promise<Metadata> {
  const { emirate, community } = await params;
  const c = communityBy(emirate, community);
  return c ? { title: `التمويل العقاري في ${c.ar ?? c.name}: الأسعار والعوائد`, alternates: { canonical: `/ar/areas/${emirate}/${community}`, languages: { 'en-AE': `/areas/${emirate}/${community}` } } } : {};
}

export default async function Page({ params }: { params: Promise<{ emirate: string; community: string }> }) {
  const { emirate, community } = await params;
  const c = communityBy(emirate, community);
  if (!c || !AR_COMMUNITIES.includes(c.slug)) notFound();
  const k = coverage(c);
  const name = c.ar ?? c.name;
  return (
    <>
      <ArHero crumbs={[[AR_UI.areas, '/ar#areas'], [name, `/ar/areas/${emirate}/${community}`]]} eyebrow={`${EMIRATES[c.emirate].ar} · ${AR_STOCK[c.stock]}`} title={`الشراء بالتمويل العقاري في ${name}: الأسعار والعوائد وتغطية القسط`}
        capsule={`تُباع العقارات في ${name} بنحو ${n(c.psf)} درهم للقدم المربعة، ويقارب العائد الإيجاري الإجمالي ${c.yieldPct}%. فإذا موّلت وحدة نموذجية سعرها ${c.typical} مليون درهم بنسبة ${REG.ltv.expat.first}% وسعر 3.99%، يكون القسط قرابة ${n(k.res)} درهم شهرياً، في حين يبلغ الإيجار المعتاد نحو ${n(k.rentMo)} درهم.`} en={`/areas/${emirate}/${community}`} />
      <ArSection title="السوق بالأرقام">
        <ArFacts facts={[['السعر للقدم المربعة', `AED ${n(c.psf)}`], ['العائد الإجمالي', `${c.yieldPct}%`], ['قيمة الوحدة النموذجية', `AED ${c.typical}M`], ['الإيجار السنوي', `AED ${n(c.rent)}`], [`القسط بتمويل ${REG.ltv.expat.first}%`, `AED ${n(k.res)}`], [`النقد المطلوب (${100 - REG.ltv.expat.first}% + الرسوم)`, `AED ${n(k.cash)}`]]} />
        <p className="mt-3 text-xs text-slate">أرقام تقريبية، ونحدّثها كل شهر.</p>
      </ArSection>
      <ArSection tone="mist" title="الإيجار مقابل الشراء"><div className="rounded-card border border-line bg-white p-5 sm:p-8"><Calculator slug="rent-vs-buy-dubai" lang="ar" initial={{ price: Math.min(30_000_000, k.price), rent: Math.min(1_000_000, Math.round(c.rent / 5000) * 5000) }} /></div></ArSection>
      <ArSection title="مناطق أخرى"><ArLinks links={AR_COMMUNITIES.filter((s) => s !== c.slug).slice(0, 8).map((s) => COMMUNITIES.find((x) => x.slug === s)!).map((x) => ({ title: x.ar ?? x.name, body: `${x.yieldPct}%`, href: `/ar/areas/${x.emirate}/${x.slug}` }))} /></ArSection>
    </>
  );
}
