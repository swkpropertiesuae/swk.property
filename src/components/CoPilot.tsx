'use client';
// "Mortgage assistant" co-pilot shell. Answers here are deterministic (lib/math) per Module 6: never freehand math.
// shortcut: canned intents only; wire to the LLM + RAG backend (Module 6 system prompt) when the API is ready.
import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, X, MessageCircle, Send } from 'lucide-react';
import { emi, cashToClose, borrowingPower, earlySettlementFee } from '@/lib/math';
import { waLink } from '@/data/site';

const aed = (n: number) => `AED ${Math.round(n).toLocaleString('en-US')}`;

type Msg = { from: 'bot' | 'me'; text: string; link?: { href: string; label: string } };

const INTENTS: { chip: string; answer: () => Msg }[] = [
  { chip: 'Cash needed for a AED 2.5M home?', answer: () => {
    const c = cashToClose({ price: 2_500_000, downPct: 20 });
    return { from: 'bot', text: `With 20% down you would need about ${aed(c.total)}: ${aed(c.down)} deposit, ${aed(c.dld)} DLD fee, ${aed(c.mortgageReg)} mortgage registration, ${aed(c.trustee)} trustee, ${aed(c.valuation)} valuation and ${aed(c.agencyFee)} agency. At 3.99% over 25 years the repayment is about ${aed(emi(c.loan, 3.99, 25))} a month.`, link: { href: '/calculators/mortgage-calculator', label: 'Adjust in the calculator' } };
  } },
  { chip: 'How much can I borrow on AED 35k salary?', answer: () => {
    const r = borrowingPower({ salary: 35_000, existingEmis: 0, cardLimits: 50_000, years: 25 });
    return { from: 'bot', text: `If you hold AED 50,000 of card limits, the half-of-income rule leaves ${aed(r.available)} a month for the mortgage, which supports a loan of about ${aed(r.maxLoan)}. Cancelling those cards would add roughly ${aed(borrowingPower({ salary: 35_000, existingEmis: 0, cardLimits: 0, years: 25 }).maxLoan - r.maxLoan)}.`, link: { href: '/calculators/dbr-borrowing-power', label: 'Run my own numbers' } };
  } },
  { chip: 'Is switching banks worth it?', answer: () => ({ from: 'bot', text: `Your current bank can charge at most 1% of the balance or AED 10,000 (whichever is lower) to let you go, and 5% VAT is added, so ${aed(earlySettlementFee(1e9))} at most. On AED 1.5M, cutting 6.2% to 3.99% saves about ${aed(emi(1.5e6, 6.2, 20) - emi(1.5e6, 3.99, 20))}/mo before switching costs. Count valuation, registration and arrangement fees, plus any clawback, before you decide.`, link: { href: '/calculators/buyout-refinance-savings', label: 'Check my buyout' } }) },
  { chip: 'Golden Visa with a mortgage?', answer: () => ({ from: 'bot', text: 'Having a mortgage does not on its own make you eligible for a Golden Visa. The property’s value, proof of ownership, the lender’s documents and the authority’s current rules all count, so check your situation with DLD or the immigration authority before buying.', link: { href: '/mortgages/golden-visa-mortgage', label: 'Golden Visa guide' } }) },
];

export default function CoPilot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: 'Pick a question to see a worked example, or talk to an advisor. Answers here are preset and do not assess your eligibility.' }]);
  const ask = (i: (typeof INTENTS)[number]) => setMsgs((m) => [...m, { from: 'me', text: i.chip }, i.answer()]);

  return (
    <div className="fixed bottom-4 end-4 z-50">
      {open && (
        <div role="dialog" aria-label="Mortgage assistant mortgage co-pilot" className="mb-3 flex h-[min(560px,80dvh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-card border border-line bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-navy px-5 py-4 text-white">
            <p className="flex items-center gap-2 font-semibold"><Sparkles size={16} className="text-mint" /> Mortgage assistant</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close co-pilot"><X size={18} /></button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[88%] rounded-2xl px-4 py-3 ${m.from === 'bot' ? 'bg-mist text-ink' : 'ms-auto bg-teal text-white'}`}>
                <p className="leading-relaxed">{m.text}</p>
                {m.link && <Link href={m.link.href} className="mt-2 inline-block font-semibold text-teal" onClick={() => setOpen(false)}>{m.link.label} →</Link>}
              </div>
            ))}
          </div>
          <div className="border-t border-line p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {INTENTS.map((i) => <button key={i.chip} type="button" className="chip !text-xs" onClick={() => ask(i)}>{i.chip}</button>)}
            </div>
            <a href={waLink('Hi Betterway, I have a mortgage question.')} rel="noopener" className="btn btn-primary w-full"><MessageCircle size={16} /> Ask an advisor <Send size={14} /></a>
          </div>
        </div>
      )}
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="btn btn-dark ms-auto flex !rounded-full shadow-lg ring-1 ring-white/25">
        <Sparkles size={16} className="text-mint" /> Mortgage help
      </button>
    </div>
  );
}
