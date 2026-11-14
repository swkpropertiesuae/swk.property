'use client';
// Home hero: Caldren's white editorial sheet over a full-bleed film, with a live hotspot that reads the
// latest published CBUAE EIBOR fixing (falls back to the dated snapshot) and a showreel dialog.
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowDown, Play, Plus, X } from 'lucide-react';
import { useBenchmark } from '@/components/StartupExperience';
import { Cta } from '@/components/ui';

const date = (v: string) => new Date(v + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Dubai' });

export default function HomeHero() {
  const { data } = useBenchmark();
  const film = useRef<HTMLVideoElement>(null), dialog = useRef<HTMLDialogElement>(null);

  const open = () => { dialog.current?.showModal(); film.current?.play().catch(() => {}); };
  const close = () => { film.current?.pause(); dialog.current?.close(); };

  return (
    <section className="bw-hero" aria-labelledby="hero-title">

      <div className="bw-hero__sheet">
        <div className="wrap">
          <p className="bw-hero__kicker bw-label"><i />Betterway — Mortgage advisory · Dubai & UAE<i /></p>
          <h1 id="hero-title" className="bw-hero__title bw-display">
            <span className="line">A better way <em>home,</em></span>
            <span className="line">clearly financed.</span>
          </h1>
          <div className="bw-hero__grid">
            <div className="grid justify-items-start gap-6">
              <button type="button" className="bw-film" onClick={open}>
                Watch
                <span className="bw-film__thumb"><img src="/images/marina-evening.webp" alt="" width={128} height={128} /><span><Play size={16} fill="currentColor" /></span></span>
                the film
              </button>
              <p className="bw-hero__lead">Compare UAE lenders, see the real cost behind the headline rate, and arrive at the bank with your documents ready.</p>
              <Cta href="#calculator">Build my mortgage plan</Cta>
            </div>
            <span aria-hidden="true" />
            <div className="bw-hero__aside">
              <p>Advising <b>residents, overseas buyers and investors</b> across Dubai, Abu Dhabi, Sharjah and Ras Al Khaimah.</p>
              <Link href="/about-us" className="bw-link"><Plus size={14} /> Discover Betterway</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bw-hero__stage">
        <div className="bw-hero__media" aria-hidden="true">
          <img className="bw-hero__drift" src="/images/dubai-waterfront-3344.webp" srcSet="/images/dubai-waterfront-1280.webp 1280w, /images/dubai-waterfront-1672.webp 1672w, /images/dubai-waterfront-3344.webp 3344w" sizes="100vw" width={3344} height={1882} alt="" fetchPriority="high" decoding="sync" />
        </div>
        <div className="bw-hero__pin">
          <i aria-hidden="true" /><s aria-hidden="true" />
          <a href="/rates/eibor-live-tracker" className="bw-frost--dark rounded-2xl backdrop-blur-md">
            <b>3M EIBOR · {data.latest.threeMonth.toFixed(2)}%</b>
            <span>Published {date(data.latest.date)} · CBUAE</span>
          </a>
        </div>
        <div className="bw-hero__card">
          <div className="bw-frost">
            <p className="bw-label !text-[10px]">Planning, not promises</p>
            <p className="mt-2 text-[14px] leading-relaxed text-navy">Rates shown are public benchmarks or illustrations. Your lender confirms the offer in writing.</p>
            <p className="mt-3 text-[11px] text-slate">Concept residence · AI-generated image</p>
          </div>
        </div>
        <a href="#lenders" className="bw-hero__scroll">Keep scrolling <ArrowDown size={16} /></a>
      </div>

      <dialog ref={dialog} className="bw-dialog" aria-label="Betterway explainer film" onCancel={() => film.current?.pause()} onClick={(e) => { if (e.target === dialog.current) close(); }}>
        <button type="button" className="bw-dialog__close" aria-label="Close film" onClick={close}><X size={18} /></button>
        <video ref={film} controls playsInline preload="none" poster="/video/betterway-explainer.jpg">
          <source src="/video/betterway-explainer.mp4" type="video/mp4" />
        </video>
        <p>How Betterway helps you compare offers · 32-second explainer</p>
      </dialog>
    </section>
  );
}
