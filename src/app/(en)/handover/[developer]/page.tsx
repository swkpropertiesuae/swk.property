import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Section, Facts, CtaBand, LinkGrid, aedM } from '@/components/ui';
import { DEVELOPERS, devBy, projectsOf } from '@/data/handover';
import { BANKS } from '@/data/banks';

export const dynamicParams = false;
export const generateStaticParams = () => DEVELOPERS.filter((d) => d.hub).map((d) => ({ developer: d.slug }));

export async function generateMetadata({ params }: { params: Promise<{ developer: string }> }): Promise<Metadata> {
  const d = devBy((await params).developer);
  return d ? { title: `${d.name} Handover Mortgages — APL Banks & Projects`, description: `Which UAE banks approve ${d.name} projects for handover mortgages, NOC timings, escrow and every tracked project.`, alternates: { canonical: `/handover/${d.slug}` } } : {};
}

export default async function Page({ params }: { params: Promise<{ developer: string }> }) {
  const d = devBy((await params).developer);
  if (!d?.hub) notFound();
  const projects = projectsOf(d.slug);
  const tally = new Map<string, number>();
  projects.flatMap((p) => p.top).forEach((k) => tally.set(k, (tally.get(k) ?? 0) + 1));
  const banks = [...tally.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => ({ b: BANKS.find((x) => x.short === k)!, n })).filter((x) => x.b);
  const apl = projects.map((p) => p.apl).filter(Boolean) as number[];
  return (
    <>
      <PageHero crumbs={[{ name: 'Off-plan handover', href: '/handover' }, { name: d.name, href: `/handover/${d.slug}` }]} eyebrow="Developer APL hub" title={`${d.name} handover mortgages: APL banks, NOCs & projects`}
        capsule={`${d.blurb} Developer NOCs typically take ${d.nocDays}; payments run through ${d.escrow.toLowerCase()}. Betterway tracks ${projects.length} ${d.name} projects and confirms tower-level APL coverage before each buyer’s completion notice.`} />
      <Section title="Developer facts">
        <Facts facts={[['Projects tracked', String(projects.length)], ['APL bank range', apl.length ? `${Math.min(...apl)}–${Math.max(...apl)} banks` : 'On request'], ['NOC turnaround', d.nocDays], ['Escrow', d.escrow], ['Under-construction LTV', '50% max'], ['Handover LTV', '80% resident · 85% National']]} />
      </Section>
      {banks.length > 0 && (
        <Section tone="mist" title={`Most active lenders on ${d.name}`}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {banks.map(({ b, n }) => <Link key={b.slug} href={`/rates/${b.slug}`} className="card !p-4"><span className="font-semibold text-navy">{b.name}</span><span className="mt-1 block text-sm text-slate">Top-3 APL on {n} project{n > 1 ? 's' : ''}</span></Link>)}
          </div>
        </Section>
      )}
      <Section title={`${d.name} projects`}>
        <LinkGrid links={projects.map((p) => ({ title: p.name, body: `${p.community} · ${p.window}${p.plan ? ` · ${p.plan}` : ''}${p.value ? ` · now ~${aedM(p.value)}` : ''}`, href: `/handover/${d.slug}/${p.slug}`, tag: p.apl ? `${p.apl} banks` : 'Handover 2027–28' }))} />
      </Section>
      <CtaBand />
    </>
  );
}
