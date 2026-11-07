import Link from 'next/link';
import { BANKS, revert, pct, type Bank } from '@/data/banks';
import { BENCH } from '@/data/site';

/** Full 24-bank table, server-rendered (no 0% hydration state). */
export default function RateTable({ banks = BANKS, limit }: { banks?: Bank[]; limit?: number }) {
  const rows = limit ? banks.slice(0, limit) : banks;
  return (
    <div className="overflow-x-auto rounded-card border border-line bg-white"><p className="px-4 py-3 text-xs text-slate border-b border-line">Illustrative comparison data. Confirm current pricing and eligibility with the lender.</p>
      <table className="table-bw min-w-[880px]">
        <caption className="sr-only">Illustrative UAE mortgage rates by bank</caption>
        <thead>
          <tr>
            <th scope="col">Bank</th><th scope="col">Type</th><th scope="col">Intro fixed</th><th scope="col">3Y</th><th scope="col">5Y</th>
            <th scope="col">Revert margin</th><th scope="col">Revert @{BENCH.eibor3m.toFixed(2)}%</th><th scope="col">Floor</th><th scope="col">Free overpay</th><th scope="col">Non-res LTV</th>
          </tr>
        </thead>
        <tbody className="num">
          {rows.map((b) => (
            <tr key={b.slug}>
              <th scope="row" className="font-sans font-semibold"><Link href={`/rates/${b.slug}`} className="text-navy hover:text-teal">{b.name}</Link></th>
              <td className="font-sans text-slate">{b.type}</td>
              <td className="font-semibold text-teal">{pct(b.intro)} <span className="text-xs text-slate">({b.introTerm})</span></td>
              <td>{pct(b.fixed3)}</td>
              <td>{pct(b.fixed5)}</td>
              <td>+{b.margin.toFixed(2)}%</td>
              <td>{pct(revert(b))}</td>
              <td>{pct(b.floor)}</td>
              <td>{b.overpay}%</td>
              <td>{b.nrLtv ? `${b.nrLtv}%` : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
