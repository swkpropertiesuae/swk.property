'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { ArrowUpRight, BatteryFull, Check, Pause, Play, Signal, Wifi } from 'lucide-react';
import { cashToClose, emi } from '@/lib/math';

const example = { price: 2_000_000, downPct: 20, rate: 3.99, years: 25 };
const costs = cashToClose(example);
const money = (n: number) => Math.round(n).toLocaleString('en-US');

/** Code-rendered iPhone mockups: sharp at every size, with genuine calculator values. */
export default function PhoneHero() {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scene, setScene] = useState<'home' | 'skyline'>('home');
  const [view, setView] = useState<'payment' | 'upfront'>('payment');
  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);
  const moving = inView && visible && !paused && !reducedMotion;
  useEffect(() => {
    if (!video.current) return;
    if (moving && scene === 'skyline') video.current.play().catch(() => {});
    else video.current.pause();
  }, [moving, scene]);

  return (
    <div ref={ref} className={`hero-visual ${moving ? 'is-moving' : ''}`} aria-label="Illustrative mortgage planning on mobile">
      <div className="hero-photo">
        {scene === 'skyline' && <video ref={video} className="hero-skyline" muted loop playsInline preload="none" poster="/video/hero-dubai.jpg" aria-hidden="true" tabIndex={-1}><source src="/video/hero-dubai.webm" type="video/webm" /><source src="/video/hero-dubai.mp4" type="video/mp4" /></video>}
        <img src="/images/dubai-waterfront-3344.webp" srcSet="/images/dubai-waterfront-1280.webp 1280w, /images/dubai-waterfront-1672.webp 1672w, /images/dubai-waterfront-3344.webp 3344w" sizes="(min-width: 1024px) 52vw, 100vw" width={3344} height={1882} alt="Conceptual Dubai waterfront home in warm morning light" fetchPriority="high" decoding="async" />

      </div>
      <div className="scene-controls" role="group" aria-label="Hero backdrop"><button type="button" aria-pressed={scene === 'home'} onClick={() => setScene('home')}>Residence</button><button type="button" aria-pressed={scene === 'skyline'} onClick={() => setScene('skyline')}>Skyline</button></div>
      <div className="visual-caption"><span className="h-1.5 w-1.5 rounded-full bg-mint" /> A clearer way home.</div>

      <div className="iphone iphone-back" aria-hidden="true">
        <div className="iphone-screen">
          <div className="island" />
          <div className="phone-brand"><img src="/brand/symbol-teal.svg" alt="" width={19} height={24} /> betterway</div>
          <p className="phone-kicker">YOUR NEXT STEPS</p>
          <p className="text-xl font-semibold leading-tight text-navy">From plans<br />to your keys.</p>
          <div className="mt-5 space-y-4">
            {['Budget & documents', 'Bank pre-approval', 'Property valuation', 'Final offer', 'Transfer & keys'].map((t, i) => <div key={t} className="flex items-center gap-2.5 text-[10px] text-slate"><span className={`step-dot ${i === 0 ? 'active' : ''}`}>{i === 0 ? <Check size={10} /> : i + 1}</span>{t}</div>)}
          </div>
          <p className="mt-5 text-[9px] text-slate">Your mortgage journey</p>
          <div className="home-indicator" />
        </div>
      </div>

      <div className="iphone iphone-front">
        <div className="iphone-screen">
          <div className="phone-status" aria-hidden="true"><span>9:41</span><span className="flex gap-1"><Signal size={10} /><Wifi size={10} /><BatteryFull size={13} /></span></div>
          <div className="island" />
          <div className="phone-brand"><img src="/brand/symbol-teal.svg" alt="" width={20} height={25} /> betterway <ArrowUpRight size={13} className="ms-auto text-teal" /></div>
          <p className="phone-kicker">YOUR HOME. YOUR NUMBERS.</p>
          <div className="phone-tabs" role="group" aria-label="Mortgage planning view">
            <button type="button" aria-pressed={view === 'payment'} onClick={() => setView('payment')}>Monthly</button>
            <button type="button" aria-pressed={view === 'upfront'} onClick={() => setView('upfront')}>Upfront</button>
          </div>
          <div className="phone-total" aria-live="polite" aria-atomic="true">
            <span>{view === 'payment' ? 'Estimated monthly payment' : 'Estimated cash to close'}</span>
            <strong key={view}><small>AED</small> {money(view === 'payment' ? emi(costs.loan, example.rate, example.years) : costs.total)}</strong>
            <span>{view === 'payment' ? '3.99% p.a. · 25 years' : 'Down payment + purchase fees'}</span>
          </div>
          <dl className="phone-facts">
            {(view === 'payment' ? [['Property value', example.price], ['Down payment · 20%', costs.down], ['Loan amount', costs.loan]] : [['Down payment', costs.down], ['DLD & title deed', costs.dld], ['Other purchase fees', costs.fees - costs.dld]]).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{money(v as number)}</dd></div>)}
          </dl>
          <div className="phone-insight"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-teal"><Check size={14} /></span><p>Know your budget.<br /><b>Before you find your home.</b></p></div>
          <a href="/calculators/mortgage-calculator" className="phone-action">Adjust my numbers <ArrowUpRight size={13} /></a>
          <p className="phone-disclaimer">Illustrative estimate, not a bank offer.</p>
          <div className="home-indicator" />
        </div>
      </div>
      <button type="button" className="visual-pause" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? 'Play phone animation' : 'Pause phone animation'}>{paused ? <Play size={12} /> : <Pause size={12} />}<span>{paused ? 'Play' : 'Pause'} motion</span></button>
    </div>
  );
}
