import type { Metadata } from 'next';
import { PageHero, Section, LinkGrid, CtaBand } from '@/components/ui';
import { AFFORD } from '@/data/content';
import { REG } from '@/data/regulation';

export const metadata: Metadata = { title: 'How Much Mortgage Can I Afford in Dubai?', description: 'What you can borrow by monthly salary, and what you need by property price, under the central bank’s debt and loan-to-value limits.', alternates: { canonical: '/affordability' } };

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Affordability', href: '/affordability' }]} eyebrow="Affordability" title="How much can you borrow—and how much cash do you need?"
        capsule={`Two central bank limits decide affordability: your total debt repayments must stay within ${REG.dbrMax}% of gross income, and on an expatriate’s first home up to AED 5M the loan cannot exceed ${REG.ltv.expat.first}% of value. Use these pages either way round: start from your salary to find a price, or from a price to find the cash you need.`} />
      <Section title="By monthly salary"><LinkGrid cols={4} links={AFFORD.filter((a) => a.kind === 'salary').map((a) => ({ title: `AED ${a.amount.toLocaleString('en-US')}${a.plus ? '+' : ''} / month`, href: `/affordability/${a.slug}` }))} /></Section>
      <Section tone="mist" title="By property price"><LinkGrid cols={4} links={AFFORD.filter((a) => a.kind === 'price').map((a) => ({ title: `AED ${(a.amount / 1e6).toLocaleString('en-US')}M${a.plus ? '+' : ''}`, body: a.title, href: `/affordability/${a.slug}` }))} /></Section>
      <CtaBand />
    </>
  );
}
