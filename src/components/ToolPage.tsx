import Link from 'next/link';
import { PageHero, Section, CtaBand, LinkGrid, JsonLd } from '@/components/ui';
import Calculator from '@/components/calc/Calculator';
import { TOOLS, toolHref, type ToolMeta } from '@/data/tools';
import { SITE } from '@/data/site';

export default function ToolPage({ t }: { t: ToolMeta }) {
  const label = t.base === 'tools' ? 'Tools' : 'Calculators';
  return (
    <>
      <PageHero crumbs={[{ name: label, href: '/calculators' }, { name: t.name, href: toolHref(t) }]} eyebrow={t.base === 'tools' ? 'Legal micro-tool' : 'Calculator'} title={t.title} capsule={t.capsule} />
      <section className="bg-white py-12">
        <div className="wrap"><div className="rounded-card border border-line p-5 sm:p-8"><Calculator slug={t.slug} /></div></div>
      </section>
      {t.slug === 'fixed-to-revert-analyzer' && (
        <Section title="Fixed vs revert in 20 seconds">
          <div className="max-w-4xl"><video className="w-full rounded-card border border-line bg-navy" controls playsInline preload="none" poster="/video/fixed-vs-revert.jpg"><source src="/video/fixed-vs-revert.mp4" type="video/mp4" /></video></div>
        </Section>
      )}
      <Section tone="mist" title="How the numbers are calculated">
        <ol className="grid gap-4 md:grid-cols-3">
          {t.method.map((m, i) => <li key={m} className="card"><span className="num text-sm text-teal">0{i + 1}</span><p className="mt-2 text-[15px] text-ink">{m}</p></li>)}
        </ol>
        <p className="mt-6 max-w-3xl text-sm text-slate">Results are illustrative and use CBUAE and DLD rules as of {SITE.asOf}. Your bank’s Final Offer Letter is binding. <Link href="/privacy-and-cbuae-disclosure" className="text-teal underline">Full disclosure</Link>.</p>
      </Section>
      <Section title="More calculators"><LinkGrid cols={4} links={TOOLS.filter((x) => x.slug !== t.slug).slice(0, 8).map((x) => ({ title: x.name, href: toolHref(x) }))} /></Section>
      <CtaBand />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: t.title, applicationCategory: 'FinanceApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: 0, priceCurrency: 'AED' }, url: SITE.url + toolHref(t) }} />
    </>
  );
}
