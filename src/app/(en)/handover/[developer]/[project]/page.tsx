import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Section, Facts, FaqList, CtaBand, LinkGrid, aed, aedM } from '@/components/ui';
import Calculator from '@/components/calc/Calculator';
import { PROJECTS, devBy, projectsOf, type Project } from '@/data/handover';
import { BANKS } from '@/data/banks';
import { handoverRelease } from '@/lib/math';

export const dynamicParams = false;
export const generateStaticParams = () => PROJECTS.map((p) => ({ developer: p.dev, project: p.slug }));
const find = (d: string, s: string) => PROJECTS.find((p) => p.dev === d && p.slug === s);

/** APL banks for a project: its own top three, else the developer's most frequent. */
function aplBanks(p: Project) {
  const keys = p.top.length ? p.top : [...new Set(projectsOf(p.dev).flatMap((x) => x.top))].slice(0, 3);
  return (keys.length ? keys : ['ENBD', 'DIB', 'FAB']).map((k) => BANKS.find((b) => b.short === k)).filter(Boolean) as typeof BANKS;
}

export async function generateMetadata({ params }: { params: Promise<{ developer: string; project: string }> }): Promise<Metadata> {
  const { developer, project } = await params;
  const p = find(developer, project);
  const d = devBy(developer);
  return p && d ? { title: `${p.name} Handover Mortgage — ${d.name}, ${p.community}`, description: `Handover mortgage for ${p.name} (${p.community}): ${p.plan ? `${p.plan} plan, ` : ''}${p.apl ? `${p.apl} APL banks, ` : ''}80% LTV at completion and cash-out on valuation uplift.`, alternates: { canonical: `/handover/${developer}/${project}` } } : {};
}

export default async function Page({ params }: { params: Promise<{ developer: string; project: string }> }) {
  const { developer, project } = await params;
  const p = find(developer, project);
  const d = devBy(developer);
  if (!p || !d) notFound();
  const banks = aplBanks(p);
  const r = p.launch && p.value && p.balancePct ? handoverRelease(p.launch * 1e6, p.balancePct, p.value * 1e6, 80) : null;
  const siblings = projectsOf(p.dev).filter((x) => x.slug !== p.slug).slice(0, 6);
  const crumbs = [{ name: 'Off-plan handover', href: '/handover' }, ...(d.hub ? [{ name: d.name, href: `/handover/${d.slug}` }] : []), { name: p.name, href: `/handover/${d.slug}/${p.slug}` }];
  const capsule = r
    ? `${p.name} by ${d.name} in ${p.community} hands over ${p.window} on a ${p.plan} plan, leaving ${p.balancePct}% due at completion. Launched around ${aedM(p.launch!)}, units now value near ${aedM(p.value!)}. ${p.apl} banks hold it on their APL; at 80% LTV a buyer could borrow ${aed(r.loanCap)} and release up to ${aed(r.cashOut)}.`
    : `${p.name} by ${d.name} in ${p.community} is scheduled for handover in ${p.window}. At completion, banks on ${d.name}’s Approved Project List can finance the remaining developer balance at up to 80% LTV for residents, with no 4% DLD fee because Oqood was paid at launch. Our desk confirms tower-level APL coverage before your handover notice.`;
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow={`${d.name} · ${p.community}`} title={`${p.name} handover mortgage: APL banks, payment plan & cash-out`} capsule={capsule}>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/contact" className="btn btn-primary">Check my unit’s APL</Link><Link href="/handover/dubai-off-plan-handover-mortgage-guide" className="btn btn-ghost">Handover guide</Link></div>
      </PageHero>
      <Section title="Project numbers">
        <Facts facts={[
          ['Developer', d.name], ['Community', p.community], ['Handover window', p.window],
          ['Payment plan', p.plan ?? 'On request'], ['Launch price', p.launch ? aedM(p.launch) : 'On request'], ['2026 valuation', p.value ? aedM(p.value) : 'On request'],
          ['APL banks', p.apl ? String(p.apl) : 'On request'], ['Developer NOC', d.nocDays], ['Escrow', d.escrow],
        ]} />
      </Section>
      <Section tone="mist" title="Banks that approve this project">
        <div className="grid gap-4 md:grid-cols-3">
          {banks.map((b) => (
            <Link key={b.slug} href={`/rates/${b.slug}`} className="card">
              <span className="font-display text-lg font-semibold text-navy">{b.name}</span>
              <span className="num mt-2 block text-sm text-slate">3Y fixed {b.fixed3}% · EIBOR + {b.margin.toFixed(2)}% · floor {b.floor}%</span>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate">APL status is tower-specific and changes; we confirm with each bank before submission.</p>
      </Section>
      <Section title="Your handover cash-out">
        <div className="rounded-card border border-line p-5 sm:p-8">
          <Calculator slug="handover-equity-release" initial={r ? { purchase: p.launch! * 1e6, bal: p.balancePct!, val: p.value! * 1e6 } : undefined} />
        </div>
      </Section>
      <Section tone="mist" title="FAQ"><div className="max-w-3xl"><FaqList faqs={[
        { q: `When should I apply for my ${p.name} handover mortgage?`, a: 'Start 60–90 days before the expected completion notice so pre-approval, valuation and the developer NOC are ready when the final payment is called.' },
        { q: 'Do I pay the 4% DLD fee again at handover?', a: 'No. The 4% was paid with the Oqood at launch; at handover you pay mortgage registration (0.25% + AED 290), the AED 580 title deed, AED 4,200 trustee and AED 3,150 valuation.' },
        { q: 'What if the valuation comes in below my purchase price?', a: 'The loan is based on the lower of price or valuation for a purchase; our appeal desk and backup bank route help close the gap.' },
      ]} /></div></Section>
      {siblings.length > 0 && <Section title={`More ${d.name} projects`}><LinkGrid links={siblings.map((x) => ({ title: x.name, body: `${x.community} · ${x.window}`, href: `/handover/${x.dev}/${x.slug}` }))} /></Section>}
      <CtaBand title="Handover notice arrived?" body="Send us your SPA and payment-plan statement; we confirm APL banks and your cash-out within 48 hours." />
    </>
  );
}
