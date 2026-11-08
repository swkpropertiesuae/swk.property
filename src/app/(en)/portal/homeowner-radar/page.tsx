import type { Metadata } from 'next';
import Link from 'next/link';
import AppShell, { PORTAL_NAV } from '@/components/AppShell';
import { Countdown } from '@/components/AppClient';
import Calculator from '@/components/calc/Calculator';

export const metadata: Metadata = { title: 'Homeowner Radar' };

export default function Page() {
  return (
    <AppShell title="Client portal" sub="portal.betterwaymortgages.com" nav={PORTAL_NAV} active="/portal/homeowner-radar">
      <h1 className="mb-2 font-display text-2xl font-bold">Homeowner radar</h1>
      <p className="mb-6 text-slate">We keep an eye on your fixed-rate end date, EIBOR and lender pricing so you do not slip onto a higher variable rate unnoticed.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        <Countdown label="Fixed period ends in" days={88} tone="warn" />
        <div className="card"><p className="text-sm text-slate">Your revert rate today</p><p className="num mt-1 text-3xl font-semibold text-navy">6.10%</p></div>
        <div className="card"><p className="text-sm text-slate">Best re-fix on panel</p><p className="num mt-1 text-3xl font-semibold text-teal">3.99%</p></div>
      </div>
      <div className="card mt-6"><h2 className="mb-5 font-display text-lg font-semibold">Should you switch?</h2><Calculator slug="buyout-refinance-savings" /></div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link href="/mortgages/golden-visa-mortgage" className="card"><p className="font-semibold text-navy">Golden Visa NOC</p><p className="mt-1 text-sm text-slate">Your home is valued above AED 2M—request the bank NOC.</p></Link>
        <Link href="/advisory/difc-wills-and-estate-planning" className="card"><p className="font-semibold text-navy">DIFC single-property will</p><p className="mt-1 text-sm text-slate">Protect a jointly owned, mortgaged home.</p></Link>
      </div>
    </AppShell>
  );
}
