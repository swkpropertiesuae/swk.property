import type { Metadata } from 'next';
import AppShell, { PORTAL_NAV } from '@/components/AppShell';
import { VaultMatrix } from '@/components/AppClient';

export const metadata: Metadata = { title: 'Smart Document Vault' };

export default function Page() {
  return (
    <AppShell title="Client portal" sub="portal.betterwaymortgages.com" nav={PORTAL_NAV} active="/portal/vault">
      <h1 className="mb-2 font-display text-2xl font-bold">Smart document vault</h1>
      <p className="mb-6 text-slate">The checklist changes with your profile, and each upload is checked automatically.</p>
      <VaultMatrix />
    </AppShell>
  );
}
