import type { Metadata } from 'next';
import AppShell, { HUB_NAV } from '@/components/AppShell';
import { LeadForm } from '@/components/client';

export const metadata: Metadata = { title: 'Partner Registration' };

export default function Page() {
  return (
    <AppShell title="Partner Hub" sub="hub.betterwaymortgages.com" nav={HUB_NAV} active="/partners/register">
      <h1 className="mb-2 font-display text-2xl font-bold">Register as a Betterway partner</h1>
      <p className="mb-6 max-w-2xl text-slate">Send us your details and RERA BRN. Once we have checked your card, your Silver tier account is switched on the same day.</p>
      <div className="max-w-xl"><LeadForm topic="Partner Hub registration (include RERA BRN and agency)" /></div>
    </AppShell>
  );
}
