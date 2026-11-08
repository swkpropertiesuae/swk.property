import type { Metadata } from 'next';
import AppShell, { PORTAL_NAV } from '@/components/AppShell';
import Calculator from '@/components/calc/Calculator';

export const metadata: Metadata = { title: 'Closing Pack' };

export default function Page() {
  return (
    <AppShell title="Client portal" sub="portal.betterwaymortgages.com" nav={PORTAL_NAV} active="/portal/closing-pack">
      <h1 className="mb-2 font-display text-2xl font-bold">72-hour closing pack</h1>
      <p className="mb-6 text-slate">Who each manager’s cheque is made out to, how much, and which originals to bring on transfer day.</p>
      <div className="card"><Calculator slug="transfer-day-cheque-calculator" initial={{ price: 3_200_000, payoff: 1_400_000, deposit: 320_000, ltv: 80 }} /></div>
      <div className="card mt-6">
        <h2 className="font-display text-lg font-semibold">Bring on the day</h2>
        <ul className="mt-3 grid gap-2 text-sm text-ink sm:grid-cols-2">{['Original passports & Emirates IDs (all parties)', 'Signed Form F and addendums', 'Developer NOC', 'Bank Final Offer Letter', 'Seller’s bank liability letter', 'Power of Attorney originals (if any)'].map((x) => <li key={x}>• {x}</li>)}</ul>
      </div>
    </AppShell>
  );
}
