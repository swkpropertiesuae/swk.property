import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { TOOLS, toolHref } from '@/data/tools';

export const metadata: Metadata = { title: 'UAE Mortgage Calculators & Legal Micro-Tools', description: 'Twelve free UAE mortgage calculators: repayments and DLD costs, borrowing limit, fixed vs variable, switching, handover, Golden Visa, rent vs buy and more.', alternates: { canonical: '/calculators' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Calculators', href: '/calculators' }]} eyebrow="Tools" title="Ungated UAE mortgage calculators"
        capsule="Twelve free calculators and contract tools based on central bank and land department formulas. Work out your repayment and total purchase cash, your borrowing limit under the debt test, and the true cost of fixed-then-variable deals across 24 banks. Separate tools cover switching savings, handover cash-out, Golden Visa fees and Form F protection clauses." />
      <Section title="Calculators"><LinkGrid links={TOOLS.filter((t) => t.base === 'calculators').map((t) => ({ title: t.name, body: t.capsule.split('. ')[0] + '.', href: toolHref(t) }))} /></Section>
      <Section tone="mist" title="Legal micro-tools"><LinkGrid links={TOOLS.filter((t) => t.base === 'tools').map((t) => ({ title: t.name, body: t.capsule.split('. ')[0] + '.', href: toolHref(t) }))} /></Section>
      <CtaBand />
    </>
  );
}
