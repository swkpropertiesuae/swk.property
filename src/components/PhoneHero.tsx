'use client';
// Hero visual: two iPhone frames running the Betterway app, screens cycle every 3.5 s.
// Motion stops for prefers-reduced-motion and behind the pause button (WCAG 2.2.2).
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, animate } from 'motion/react';
import { Check, Pause, Play, ShieldCheck, TrendingDown } from 'lucide-react';
import { BANKS } from '@/data/banks';
import { emi } from '@/lib/math';

const SAVE = Math.round(emi(1_500_000, 6.1, 20) - emi(1_500_000, 3.99, 20)); // AED 1.5M, 20 yrs left

const ease = [0.22, 1, 0.36, 1] as const;

function CountUp({ to, run, prefix = 'AED ', suffix = '' }: { to: number; run: boolean; prefix?: string; suffix?: string }) {
  const [v, setV] = useState(to);
  useEffect(() => {
    if (!run) { setV(to); return; }
    const c = animate(to * 0.6, to, { duration: 1.1, ease, onUpdate: (x) => setV(x) });
    return () => c.stop();
  }, [to, run]);
  return <>{prefix}{Math.round(v).toLocaleString('en-US')}{suffix}</>;
}

function Frame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[3rem] bg-[#0b1220] p-[10px] shadow-[0_40px_80px_-30px_rgb(8_29_55/0.55),inset_0_0_0_2px_#2a3446] ${className}`}>
      <span className="absolute -start-[3px] top-28 h-14 w-[3px] rounded-s bg-[#2a3446]" aria-hidden="true" />
      <span className="absolute -end-[3px] top-36 h-20 w-[3px] rounded-e bg-[#2a3446]" aria-hidden="true" />
      <div className="relative h-full overflow-hidden rounded-[2.4rem] bg-white">
        <div className="absolute start-1/2 top-2.5 z-20 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-[#0b1220] rtl:translate-x-1/2" aria-hidden="true" />
        <div className="flex items-center justify-between px-7 pt-3.5 text-[11px] font-semibold text-navy" aria-hidden="true"><span>9:41</span><span className="tracking-tighter">●●● ▮</span></div>
        {children}
      </div>
    </div>
  );
}

const top = [...BANKS].sort((a, b) => a.intro - b.intro).slice(0, 5);

const SCREENS = [
  { key: 'rates', title: 'Best rates today' },
  { key: 'calc', title: 'Your payment' },
  { key: 'track', title: 'Your application' },
] as const;

function Screen({ k, run }: { k: (typeof SCREENS)[number]['key']; run: boolean }) {
  if (k === 'rates') return (
    <ul className="space-y-2">
      {top.map((b, i) => (
        <motion.li key={b.slug} initial={run ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4, ease }}
          className={`flex items-center justify-between rounded-xl px-3 py-2.5 ${i === 0 ? 'bg-teal text-white' : 'bg-mist text-navy'}`}>
          <span className="text-[12px] font-semibold">{b.short}</span>
          <span className="num text-[13px] font-semibold">{b.intro.toFixed(2)}%</span>
        </motion.li>
      ))}
    </ul>
  );
  if (k === 'calc') return (
    <div>
      <div className="rounded-2xl bg-navy p-4 text-white">
        <p className="text-[11px] text-white/60">Monthly payment</p>
        <p className="num mt-1 text-[22px] font-semibold"><CountUp to={8437} run={run} /></p>
        <div className="mt-3 h-1.5 rounded-full bg-white/15"><motion.div className="h-full rounded-full bg-mint" initial={run ? { width: '20%' } : false} animate={{ width: '72%' }} transition={{ duration: 1.1, ease }} /></div>
      </div>
      <dl className="mt-3 space-y-1.5 text-[11px]">
        {[['Price', 'AED 2,000,000'], ['Down payment 20%', 'AED 400,000'], ['DLD 4%', 'AED 80,580'], ['Cash to close', 'AED 534,220']].map(([a, b]) => (
          <div key={a} className="flex justify-between rounded-lg bg-mist px-3 py-2"><dt className="text-slate">{a}</dt><dd className="num font-semibold text-navy">{b}</dd></div>
        ))}
      </dl>
    </div>
  );
  return (
    <ol className="space-y-2.5">
      {['Documents verified', 'Pre-approved · 2 banks', 'Valuation booked', 'Final offer', 'Keys'].map((s, i) => (
        <motion.li key={s} initial={run ? { opacity: 0, x: -6 } : false} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12, duration: 0.35, ease }} className="flex items-center gap-2.5">
          <span className={`flex h-6 w-6 items-center justify-center rounded-full ${i < 3 ? 'bg-teal text-white' : 'border border-line text-slate'}`}>{i < 3 ? <Check size={13} /> : <span className="text-[10px]">{i + 1}</span>}</span>
          <span className={`text-[12px] font-medium ${i < 3 ? 'text-navy' : 'text-slate'}`}>{s}</span>
        </motion.li>
      ))}
    </ol>
  );
}

export default function PhoneHero() {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [i, setI] = useState(0);
  const run = !reduce && !paused;
  useEffect(() => {
    if (!run) return;
    const t = setInterval(() => setI((x) => (x + 1) % SCREENS.length), 3500);
    return () => clearInterval(t);
  }, [run]);
  const s = SCREENS[i];
  const float = (d: number) => (run ? { y: [0, -8, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const, delay: d } } : { y: 0 });

  return (
    <div className="relative mx-auto h-[540px] w-full max-w-[520px] select-none" aria-label="Betterway app preview: rates, payment and application tracker" role="img">
      <div className="absolute inset-x-6 top-10 bottom-6 rounded-full bg-teal/25 blur-3xl" aria-hidden="true" />

      {/* back phone */}
      <motion.div animate={float(1.2)} className="absolute end-0 top-14 hidden w-[230px] sm:block" aria-hidden="true">
        <Frame className="h-[470px] opacity-95">
          <div className="px-4 pt-6">
            <p className="text-[11px] text-slate">3M EIBOR</p>
            <p className="num text-[22px] font-semibold text-navy">4.45%</p>
            <svg viewBox="0 0 200 80" className="mt-3 w-full" aria-hidden="true">
              <motion.path d="M0,20 C30,22 50,26 80,30 S130,44 160,52 S190,58 200,60" fill="none" strokeWidth="3" className="stroke-teal" strokeLinecap="round"
                initial={run ? { pathLength: 0 } : false} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease }} />
            </svg>
            <div className="mt-4 space-y-2">
              {[['Revert today', '6.10%'], ['Best re-fix', '3.99%'], ['You save', `AED ${SAVE.toLocaleString('en-US')}/mo`]].map(([a, b]) => (
                <div key={a} className="flex justify-between rounded-xl bg-mist px-3 py-2.5 text-[11px]"><span className="text-slate">{a}</span><span className="num font-semibold text-navy">{b}</span></div>
              ))}
            </div>
          </div>
        </Frame>
      </motion.div>

      {/* front phone */}
      <motion.div animate={float(0)} className="absolute start-0 top-0 w-[250px] sm:start-6">
        <Frame className="h-[520px]">
          <div className="flex items-center gap-2 px-5 pt-5">
            <img src="/brand/symbol-teal.svg" alt="" width={22} height={22} className="h-[22px] w-[22px]" />
            <span className="text-[13px] font-semibold text-navy">Betterway</span>
          </div>
          <div className="px-5 pt-4">
            <AnimatePresence mode="wait">
              <motion.div key={s.key} initial={run ? { opacity: 0, y: 12 } : false} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease }}>
                <p className="mb-3 text-[15px] font-semibold text-navy">{s.title}</p>
                <Screen k={s.key} run={run} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="absolute inset-x-5 bottom-6 flex gap-1.5" aria-hidden="true">
            {SCREENS.map((x, j) => <span key={x.key} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${j === i ? 'bg-teal' : 'bg-line'}`} />)}
          </div>
        </Frame>
      </motion.div>

      {/* floating proof cards */}
      <motion.div animate={float(0.6)} className="absolute -start-2 bottom-16 z-10 flex items-center gap-2.5 rounded-2xl border border-line bg-white px-4 py-3 shadow-xl sm:-start-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 text-teal"><ShieldCheck size={16} /></span>
        <span><span className="block text-[11px] text-slate">Pre-approval</span><span className="block text-[13px] font-semibold text-navy">48 hours · 2 banks</span></span>
      </motion.div>
      <motion.div animate={float(1.8)} className="absolute end-2 top-2 z-10 flex items-center gap-2.5 rounded-2xl border border-line bg-white px-4 py-3 shadow-xl">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 text-teal"><TrendingDown size={16} /></span>
        <span><span className="block text-[11px] text-slate">Client fee</span><span className="num block text-[13px] font-semibold text-navy">AED 0</span></span>
      </motion.div>

      {!reduce && (
        <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play animation' : 'Pause animation'}
          className="absolute bottom-0 end-0 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-navy shadow hover:border-teal">
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      )}
    </div>
  );
}
