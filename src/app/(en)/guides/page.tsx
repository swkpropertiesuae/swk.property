import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { GUIDES } from '@/data/content';

export const metadata: Metadata = { title: 'UAE Mortgage Regulatory & Underwriting Playbooks', description: 'Form F clauses, card limits and DBR, payoff letters, clawbacks, income rules, AECB scores, joint loans and transfer day.', alternates: { canonical: '/guides' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Guides', href: '/guides' }]} eyebrow="Guides" title="Underwriting playbooks for UAE buyers"
        capsule="Ten in-depth guides to the rules that shape a UAE mortgage: protecting your deposit in Form F, how card limits cut borrowing, seller payoff letters, switching clawbacks, how bonuses and rent are counted, AECB scores, joint applicants, clearing post-handover plans, Golden Visa NOCs and transfer day." />
      <Section title="10 playbooks"><LinkGrid links={GUIDES.map((g) => ({ title: g.title, body: g.capsule.split('. ')[0] + '.', href: `/guides/${g.slug}` }))} /></Section>
      <CtaBand />
    </>
  );
}
