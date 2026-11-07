'use client';
// 30-second 4-step rate qualifier (Module 5 hero). Ends in a pre-filled WhatsApp handoff—no data stored client-side.
import { useState } from 'react';
import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { waLink } from '@/data/site';
import { BANKS } from '@/data/banks';

const STEPS = [
  { q: 'What are you looking to do?', opts: ['Buy a ready home', 'Off-plan handover', 'Switch bank', 'Release equity'] },
  { q: 'Your residency?', opts: ['Expat resident', 'UAE National', 'GCC National', 'Non-resident'] },
  { q: 'How are you paid?', opts: ['Salaried', 'Self-employed', 'Both'] },
  { q: 'Property value?', opts: ['Under AED 1.5M', 'AED 1.5M–3M', 'AED 3M–5M', 'Above AED 5M'] },
];

export default function Qualifier() {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<string[]>([]);
  const done = step >= STEPS.length;
  const nr = ans[1] === 'Non-resident';
  const big = ans[3] === 'Above AED 5M';
  const selfEmp = ans[2] === 'Self-employed' || ans[2] === 'Both';
  const SELF = ['rakbank', 'rakislamic', 'mashreq', 'cbd', 'emirates-nbd', 'dib', 'fab']; // Market Bible 14.2 #5
  const banks = BANKS.filter((b) => (!nr || b.nrLtv) && (!selfEmp || SELF.includes(b.key)) && (ans[0] !== 'Switch bank' || b.feeBuyout === '0%'));
  const ltv = nr ? Math.max(...banks.map((b) => b.nrLtv ?? 0)) : ans[1] === 'UAE National' ? (big ? 75 : 85) : big ? 70 : 80;
  const from = banks.length ? Math.min(...banks.map((b) => b.intro)) : null;

  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-[0_20px_60px_-30px_rgb(8_29_55/0.45)] sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-navy">30-second rate check</p>
        <p className="num text-xs text-slate">{Math.min(step + 1, 4)}/4</p>
      </div>
      <div className="mb-5 flex gap-1.5" aria-hidden="true">
        {STEPS.map((_, i) => <span key={i} className={`h-1 flex-1 rounded-full ${i < step || done ? 'bg-teal' : i === step ? 'bg-teal/40' : 'bg-line'}`} />)}
      </div>
      {!done ? (
        <fieldset>
          <legend className="font-display text-lg font-semibold text-navy">{STEPS[step].q}</legend>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {STEPS[step].opts.map((o) => (
              <button key={o} type="button" className="rounded-btn border border-line px-3 py-3 text-start text-sm font-medium text-navy transition hover:-translate-y-px hover:border-teal hover:bg-teal-50 active:scale-[0.98]"
                onClick={() => { const a = [...ans]; a[step] = o; setAns(a); setStep(step + 1); }}>{o}</button>
            ))}
          </div>
          {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="mt-4 inline-flex items-center gap-1 text-sm text-slate hover:text-navy"><ArrowLeft size={14} /> Back</button>}
        </fieldset>
      ) : (
        <div>
          <p className="font-display text-lg font-semibold text-navy">{banks.length} banks match your profile</p>
          <p className="mt-2 text-sm text-slate">{ans.join(' · ')}</p>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-btn bg-mist p-3"><dt className="text-slate">Max loan-to-value</dt><dd className="num text-lg font-semibold text-navy">{ltv}%</dd></div>
            <div className="rounded-btn bg-mist p-3"><dt className="text-slate">Rates from</dt><dd className="num text-lg font-semibold text-navy">{from ? `${from.toFixed(2)}%` : '—'}</dd></div>
          </dl>
          {ans[0] === 'Off-plan handover' && <p className="mt-3 text-sm text-slate">Final number depends on which banks list your tower. We check that first.</p>}
          {ans[0] === 'Switch bank' && <p className="mt-3 text-sm text-slate">Shown: banks with no buyout fee. Exit fee at your bank is capped at AED 10,500.</p>}
          <a href={waLink(`Hi Betterway — rate check: ${ans.join(', ')}. Please send my bank options.`)} rel="noopener" className="btn btn-primary mt-5 w-full"><MessageCircle size={16} /> Get my bank list on WhatsApp</a>
          <button type="button" onClick={() => { setStep(0); setAns([]); }} className="mt-3 w-full text-sm text-slate hover:text-navy">Start again <ArrowRight size={13} className="inline" /></button>
        </div>
      )}
    </div>
  );
}
