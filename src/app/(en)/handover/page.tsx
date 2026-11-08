import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, Section, CtaBand, aedM } from '@/components/ui';
import { DEVELOPERS, PROJECTS } from '@/data/handover';

export const metadata: Metadata = { title: 'Off-Plan Handover Projects & Developer APL Hubs', description: '80 Dubai and UAE off-plan projects handing over 2026–2028 with payment plans, valuations and APL bank counts.', alternates: { canonical: '/handover' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Off-plan handover', href: '/handover' }]} eyebrow="Off-plan" title="80 handover projects, 14 developer APL hubs"
        capsule="We follow 80 UAE off-plan projects due between Q4 2026 and 2028, showing each one’s payment plan, launch price against a 2026 valuation and how many banks have approved it. Open your project to see which lenders cover it and what a handover cash-out might look like." >
        <div className="mt-8"><Link href="/handover/dubai-off-plan-handover-mortgage-guide" className="btn btn-primary">Read the handover guide</Link></div>
      </PageHero>
      {DEVELOPERS.filter((d) => PROJECTS.some((p) => p.dev === d.slug)).map((d, i) => (
        <Section key={d.slug} tone={i % 2 ? 'mist' : 'white'} title={d.name} action={d.hub ? { label: `${d.name} hub`, href: `/handover/${d.slug}` } : undefined}>
          <div className="overflow-x-auto rounded-card border border-line bg-white">
            <table className="table-bw min-w-[640px]">
              <thead><tr><th>Project</th><th>Community</th><th>Window</th><th>Plan</th><th>Launch → 2026</th><th>APL</th></tr></thead>
              <tbody>
                {PROJECTS.filter((p) => p.dev === d.slug).map((p) => (
                  <tr key={p.slug}><th scope="row"><Link href={`/handover/${p.dev}/${p.slug}`} className="font-semibold text-navy hover:text-teal">{p.name}</Link></th><td className="text-slate">{p.community}</td><td>{p.window}</td><td className="num">{p.plan ?? '—'}</td><td className="num">{p.launch ? `${aedM(p.launch)} → ${aedM(p.value!)}` : '—'}</td><td className="num">{p.apl ?? '—'}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      ))}
      <CtaBand />
    </>
  );
}
