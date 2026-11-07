import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, Section } from '@/components/ui';
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = { title: 'Sitemap', alternates: { canonical: '/sitemap' } };

const SILOS = ['Core & AI endpoints', 'Mortgage products', 'Calculators & tools', 'Rates & comparisons', 'Off-plan handover', 'Communities', 'Non-resident countries', 'Affordability', 'Advisory', 'Guides', 'Client portal & partner hub', 'العربية'];

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Sitemap', href: '/sitemap' }]} title="Sitemap" aside={false} capsule={`All ${ROUTES.length} pages of betterwaymortgages.com across 12 sections.`} updated={false} />
      {SILOS.map((s, i) => (
        <Section key={s} tone={i % 2 ? 'mist' : 'white'} title={`${s} (${ROUTES.filter((r) => r.silo === i + 1).length})`}>
          <ul className="columns-1 gap-8 text-sm sm:columns-2 lg:columns-3">
            {ROUTES.filter((r) => r.silo === i + 1).map((r) => <li key={r.path} className="mb-2 break-inside-avoid"><Link href={r.path} className="ulink text-navy hover:text-teal">{r.title}</Link></li>)}
          </ul>
        </Section>
      ))}
    </>
  );
}
