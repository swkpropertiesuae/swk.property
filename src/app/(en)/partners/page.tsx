import type { Metadata } from 'next';
import Link from 'next/link';
import AppShell, { HUB_NAV } from '@/components/AppShell';
import { FaqList, aed } from '@/components/ui';

export const metadata: Metadata = { title: 'Partner Hub for Real Estate Agents — 24h Mortgage Referral Payouts' };

const TIERS = [['Silver (default)', '1–4 closed referrals', 30, 'Within 24h of DLD transfer'], ['Gold', '5–11 referrals or AED 15M+', 35, 'Within 24h of DLD transfer'], ['Platinum / Agency VIP', '12+ referrals or AED 35M+', 40, 'Same-day IBAN wire + priority valuation desk']] as const;

export default function Page() {
  return (
    <AppShell title="Partner Hub" sub="hub.betterwaymortgages.com" nav={HUB_NAV} active="/partners">
      <h1 className="font-display text-3xl font-bold">Refer mortgage clients. Get paid within 24 hours of transfer.</h1>
      <p className="mt-3 max-w-2xl text-slate">Banks take 30–60 days to pay referral fees. We pay your share within 24 hours of DLD transfer.</p>
      <div className="mt-8 overflow-x-auto rounded-card border border-line bg-white">
        <table className="table-bw min-w-[640px]"><thead><tr><th>Tier</th><th>Qualification (rolling 12 months)</th><th>Your split</th><th>AED 2M loan</th><th>AED 5M loan</th><th>Settlement</th></tr></thead>
          <tbody className="num">{TIERS.map(([t, q, s, sla]) => <tr key={t}><th scope="row" className="font-sans text-navy">{t}</th><td className="font-sans">{q}</td><td className="text-teal">{s}%</td><td>{aed(2e6 * 0.008 * s / 100)}</td><td>{aed(5e6 * 0.008 * s / 100)}</td><td className="font-sans">{sla}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-slate">Examples assume a 0.80% bank procurement fee.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[['3-way WhatsApp group', 'Agent, buyer and underwriter connected in 60 seconds.'], ['15-second quick submit', 'Name, phone, budget—done.'], ['Co-branded calculator', 'Your photo, BRN and logo with 180-day attribution.']].map(([t, b]) => <div key={t} className="card"><p className="font-semibold text-navy">{t}</p><p className="mt-1 text-sm text-slate">{b}</p></div>)}
      </div>
      <Link href="/partners/register" className="btn btn-primary mt-8">Register as a partner</Link>
      <div className="mt-10 max-w-3xl"><FaqList faqs={[{ q: 'Who can join?', a: 'RERA-registered agents and brokerages with a valid BRN or ORN.' }, { q: 'Does the buyer pay more?', a: 'No. The client fee stays AED 0; your share comes from the bank’s procurement fee.' }, { q: 'When exactly am I paid?', a: 'Within 24 hours of DLD transfer by UAE IBAN transfer; same-day for Platinum.' }]} /></div>
    </AppShell>
  );
}
