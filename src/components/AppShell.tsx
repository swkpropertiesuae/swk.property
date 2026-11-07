import Link from 'next/link';
import type { ReactNode } from 'react';
import { Info } from 'lucide-react';

/** Shared chrome for portal.* and hub.* app views. Shows a preview banner until auth + CRM are wired. */
export default function AppShell({ title, nav, active, children, sub }: { title: string; sub: string; nav: [string, string][]; active: string; children: ReactNode }) {
  return (
    <div className="bg-mist">
      <div className="border-b border-line bg-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
          <p className="flex items-center gap-2 text-slate"><Info size={15} className="text-teal" /> Product demonstration with fictional data. No live account access or document uploads.</p>
        </div>
      </div>
      <div className="wrap grid gap-8 py-10 lg:grid-cols-[220px_1fr]">
        <aside>
          <p className="eyebrow mb-4">{title}</p>
          <nav className="flex gap-1 overflow-x-auto lg:flex-col" aria-label={title}>
            {nav.map(([l, h]) => (
              <Link key={h} href={h} aria-current={active === h ? 'page' : undefined}
                className={`whitespace-nowrap rounded-btn px-3 py-2.5 text-sm font-medium ${active === h ? 'bg-navy text-white' : 'text-slate hover:bg-white hover:text-navy'}`}>{l}</Link>
            ))}
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

export const PORTAL_NAV: [string, string][] = [['Dashboard', '/portal/dashboard'], ['Document vault', '/portal/vault'], ['Closing pack', '/portal/closing-pack'], ['Homeowner radar', '/portal/homeowner-radar'], ['Sign out', '/portal/login']];
export const HUB_NAV: [string, string][] = [['Partner programme', '/partners'], ['Dashboard', '/partners/dashboard'], ['Co-branded tools', '/partners/co-branded-tools'], ['Payouts', '/partners/payouts'], ['Register', '/partners/register']];
