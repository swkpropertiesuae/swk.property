import type { Metadata } from 'next';
import AppShell, { HUB_NAV } from '@/components/AppShell';
import { aed } from '@/components/ui';

export const metadata: Metadata = { title: 'Payouts' };

const PAY = [['DLD transfer +18h', 'Business Bay buyout', 1_400_000, 'Paid'], ['DLD transfer +22h', 'Arabian Ranches villa', 4_100_000, 'Paid'], ['DLD transfer +9h', 'Creek Harbour apartment', 1_650_000, 'Paid']] as const;

export default function Page() {
  return (
    <AppShell title="Partner Hub" sub="hub.betterwaymortgages.com" nav={HUB_NAV} active="/partners/payouts">
      <h1 className="mb-6 font-display text-2xl font-bold">Payouts</h1>
      <div className="overflow-x-auto rounded-card border border-line bg-white">
        <table className="table-bw min-w-[560px]"><thead><tr><th>Settled</th><th>Deal</th><th>Loan</th><th>Payout (35% of 0.80%)</th><th>Status</th></tr></thead>
          <tbody className="num">{PAY.map(([t, d, l, s]) => <tr key={d}><td className="font-sans">{t}</td><td className="font-sans">{d}</td><td>{aed(l)}</td><td className="text-teal">{aed(l * 0.008 * 0.35)}</td><td className="font-sans"><span className="tag">{s}</span></td></tr>)}</tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate">Paid by UAE IBAN transfer.</p>
    </AppShell>
  );
}
