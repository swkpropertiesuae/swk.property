import type { Metadata } from 'next';
import Link from 'next/link';
import { ArHero, ArSection, ArLinks } from '@/components/ar';
import Calculator from '@/components/calc/Calculator';
import { AR_PRODUCTS, AR_UI } from '@/data/ar';
import { PRODUCTS } from '@/data/products';
import { TOOLS, AR_CALCS } from '@/data/tools';
import { BANKS } from '@/data/banks';
import { COMMUNITIES, AR_COMMUNITIES } from '@/data/communities';

export const metadata: Metadata = { title: 'وسيط تمويل عقاري في دبي والإمارات', alternates: { canonical: '/ar', languages: { 'en-AE': '/' } } };

export default function Page() {
  return (
    <>
      <ArHero crumbs={[]} eyebrow="التمويل العقاري في دبي والإمارات" title="منزلك. تمويلك. طريق أوضح."
        capsule="قارن خيارات التمويل العقاري، وافهم القسط والتكاليف المقدمة، واستعد لخطوات طلبك من الاستفسار الأول إلى استلام المفاتيح." en="/" />
      <ArSection id="mortgages" title={AR_UI.mortgages}>
        <ArLinks links={Object.keys(AR_PRODUCTS).map((s) => ({ title: PRODUCTS.find((p) => p.slug === s)!.ar, body: AR_PRODUCTS[s].points[0], href: `/ar/mortgages/${s}` }))} />
      </ArSection>
      <ArSection id="calculators" tone="mist" title="حاسبة التمويل والتكاليف المقدمة">
        <div className="rounded-card border border-line bg-white p-5 sm:p-8"><Calculator slug="mortgage-calculator" lang="ar" /></div>
        <div className="mt-8"><ArLinks links={AR_CALCS.map((s) => ({ title: TOOLS.find((t) => t.slug === s)!.ar, href: `/ar/calculators/${s}` }))} /></div>
      </ArSection>
      <ArSection id="rates" title="أسعار التمويل لدى 24 بنكاً">
        <ArLinks links={BANKS.map((b) => ({ title: b.ar, body: `من ${b.intro}% · إيبور + ${b.margin.toFixed(2)}%`, href: `/ar/rates/${b.slug}` }))} />
      </ArSection>
      <ArSection id="areas" tone="mist" title="أبرز مجتمعات الفلل ومشاريع التسليم">
        <ArLinks links={AR_COMMUNITIES.map((s) => COMMUNITIES.find((c) => c.slug === s)!).map((c) => ({ title: c.ar ?? c.name, body: `${c.yieldPct}% عائد إجمالي`, href: `/ar/areas/${c.emirate}/${c.slug}` }))} />
      </ArSection>
      <section className="py-10"><div className="wrap text-sm text-slate">{AR_UI.disclosure} <Link href="/privacy-and-cbuae-disclosure" className="text-teal underline">الإفصاح الكامل</Link></div></section>
    </>
  );
}
