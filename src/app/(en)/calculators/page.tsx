import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { TOOLS, toolHref } from '@/data/tools';

export const metadata: Metadata = { title: 'UAE Mortgage Calculators & Legal Micro-Tools', description: 'Twelve ungated UAE mortgage calculators: EMI and DLD costs, DBR, fixed vs revert, buyout, handover, Golden Visa, rent vs buy and more.', alternates: { canonical: '/calculators' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Calculators', href: '/calculators' }]} eyebrow="Tools" title="Ungated UAE mortgage calculators"
        capsule="Twelve calculators and legal micro-tools built on CBUAE and DLD formulas: monthly payment and full cash-to-close, 50% DBR borrowing power, fixed-versus-revert ranking across 24 banks, buyout savings, handover cash-out, Golden Visa fees and Form F protection clauses. No sign-up needed." />
      <Section title="Calculators"><LinkGrid links={TOOLS.filter((t) => t.base === 'calculators').map((t) => ({ title: t.name, body: t.capsule.split('. ')[0] + '.', href: toolHref(t) }))} /></Section>
      <Section tone="mist" title="Legal micro-tools"><LinkGrid links={TOOLS.filter((t) => t.base === 'tools').map((t) => ({ title: t.name, body: t.capsule.split('. ')[0] + '.', href: toolHref(t) }))} /></Section>
      <CtaBand />
    </>
  );
}
