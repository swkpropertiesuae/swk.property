import type { Metadata } from 'next';
import { REG } from '@/data/regulation';
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
  return p && d ? { title: `${p.name} Handover Mortgage — ${d.name}, ${p.community}`, description: `Handover mortgage for ${p.name} (${p.community}): ${p.plan ? `${p.plan} plan, ` : ''}${p.apl ? `${p.apl} APL banks, ` : ''}${REG.ltv.expat.first}% LTV at completion and cash-out on valuation uplift.`, alternates: { canonical: `/handover/${developer}/${project}` } } : {};
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
    ? `${d.name}’s ${p.name} in ${p.community} is due ${p.window}. Buyers on the ${p.plan} plan still owe ${p.balancePct}% at completion. Units launched at about ${aedM(p.launch!)} and are now valued near ${aedM(p.value!)}. ${p.apl} lenders have approved the project. With a ${REG.ltv.expat.first}% loan on an expatriate’s first home, that valuation supports borrowing of ${aed(r.loanCap)}, freeing up to ${aed(r.cashOut)} after the developer is paid.`
    : `${d.name} expects to hand over ${p.name} in ${p.community} in ${p.window}. Lenders that have approved ${d.name} projects can then fund what you still owe, up to ${REG.ltv.expat.first}% of value on an expatriate’s first home. The 4% DLD fee is not charged again because it was paid with the Oqood. We check each bank’s approval for your building before the completion notice arrives.`;
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
        <p className="mt-6 text-sm text-slate">Bank approval is given tower by tower and can change, so we check with each lender before applying.</p>
      </Section>
      <Section title="Your handover cash-out">
        <div className="rounded-card border border-line p-5 sm:p-8">
          <Calculator slug="handover-equity-release" initial={r ? { purchase: p.launch! * 1e6, bal: p.balancePct!, val: p.value! * 1e6 } : undefined} />
        </div>
      </Section>
      <Section tone="mist" title="FAQ"><div className="max-w-3xl"><FaqList faqs={[
        { q: `When should I apply for my ${p.name} handover mortgage?`, a: 'Begin two to three months before the completion notice is due, so pre-approval, valuation and the developer NOC are all in place when the final payment falls due.' },
        { q: 'Do I pay the 4% DLD fee again at handover?', a: 'No. The 4% transfer fee was paid when the Oqood was registered. At handover you pay mortgage registration, the title deed fee, the trustee fee and the valuation.' },
        { q: 'What if the valuation comes in below my purchase price?', a: 'For a purchase, banks lend on the lower of the price and the valuation. A valuation review or a second lender can help cover a shortfall.' },
      ]} /></div></Section>
      {siblings.length > 0 && <Section title={`More ${d.name} projects`}><LinkGrid links={siblings.map((x) => ({ title: x.name, body: `${x.community} · ${x.window}`, href: `/handover/${x.dev}/${x.slug}` }))} /></Section>}
      <CtaBand title="Handover notice arrived?" body="Talk to an advisor about whether banks accept this project, your payment plan and what to prepare for the lender." />
    </>
  );
}
