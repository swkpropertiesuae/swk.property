'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useInView, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowRight, Bell, Check, ChevronRight, CircleCheck, FileCheck2, Globe2, LockKeyhole, Pause, Play, RefreshCw, ShieldCheck, Sparkles, Wallet, X } from 'lucide-react';
import snapshot from '@/data/eibor-snapshot.json';
import { emi, cashToClose } from '@/lib/math';

const aed=(v:number)=>`AED ${Math.round(v).toLocaleString('en-US')}`;
const c=cashToClose({price:2_000_000,downPct:20});
type Benchmark = Omit<typeof snapshot,'status'> & { status:string; warning?:string };
let request: Promise<Benchmark> | undefined;
function fetchBenchmark() {
  if(!request) request=fetch('/api/market/eibor',{signal:AbortSignal.timeout(18000)}).then(async r=>{if(!r.ok)throw new Error('Unavailable');const d=await r.json();if(!d.latest||typeof d.latest.threeMonth!=='number'||!d.source?.startsWith('https://centralbank.ae/'))throw new Error('Invalid response');return d as Benchmark;}).finally(()=>{request=undefined;});
  return request;
}
export function useBenchmark() {
  const [data,setData]=useState<Benchmark>(snapshot);
  const [loading,setLoading]=useState(false);
  const refresh=async()=>{setLoading(true);try{setData(await fetchBenchmark());}catch{setData(d=>({...d,status:'cached'}));}finally{setLoading(false);}};
  useEffect(()=>{let active=true;fetchBenchmark().then(d=>active&&setData(d)).catch(()=>active&&setData(d=>({...d,status:'cached'})));return()=>{active=false;};},[]);
  return {data,loading,refresh};
}
const date=(v:string)=>new Date(v+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Dubai'});

export function LiveBenchmark({compact=false}:{compact?:boolean}) {
  const {data,loading,refresh}=useBenchmark();
  return <div className={`live-benchmark ${compact?'compact':''}`}>
    <div className="benchmark-top"><span><i className={data.status==='current'?'connected':''}/>{data.status==='current'?'Public source connected':data.status==='stale'?'Published data · older fixing':'Verified snapshot'}</span><button type="button" onClick={refresh} disabled={loading} aria-label="Refresh public benchmark"><RefreshCw size={13} className={loading?'animate-spin':''}/></button></div>
    <div className="benchmark-values">{[['3M EIBOR',data.latest.threeMonth],['1M EIBOR',data.latest.oneMonth],['6M EIBOR',data.latest.sixMonth]].map(([k,v])=><div key={k}><p>{k}</p><strong>{(v as number).toFixed(5)}<small>%</small></strong></div>)}</div>
    <p className="benchmark-source">Published {date(data.latest.date)} · <a href={data.source} target="_blank" rel="noopener noreferrer">CBUAE ↗</a></p>
    {!compact&&<p className="mt-3 text-xs text-slate">A public reference benchmark, not a bank’s mortgage offer.</p>}
  </div>;
}

export function MacWorkspace({mini=false}:{mini?:boolean}) {
  return <div className={`mac-device ${mini?'mini':''}`}>
    <div className="mac-lid"><div className="mac-screen"><div className="mac-notch"/><div className="mac-menubar"><b>betterway</b><span>File　Edit　View</span><span className="ms-auto">◉　⌕　Sat 9:41</span></div><div className="mac-toolbar"><span className="traffic"><i/><i/><i/></span><span className="address"><LockKeyhole size={9}/> Betterway workspace · Preview</span></div>
      <div className="workspace"><aside><img src="/brand/symbol-teal.svg" alt="" width={22} height={27}/><b>Home</b><span>My budget</span><span>Compare</span><span>Checklist</span><span className="workspace-help">Your next move ↗</span></aside><div className="workspace-main"><div className="workspace-greeting"><div><span>YOUR MORTGAGE PLAN</span><h3>Make room for what’s next.</h3></div><span className="workspace-avatar">B</span></div>
      <div className="workspace-metrics"><div><span>Estimated payment</span><strong>{aed(emi(c.loan,3.99,25))}<small>/mo</small></strong><p>3.99% p.a. · 25 years</p></div><div><span>Deposit + purchase fees</span><strong>{aed(c.total)}</strong><p>AED 2M home · 20% deposit</p></div></div>
      <div className="workspace-bottom"><div className="workspace-chart"><span>See the whole picture</span><div className="chart-columns">{[38,52,45,65,60,78,71,90,83,100,93,115].map((h,i)=><i key={i} style={{height:`${h}%`,animationDelay:`${i*.08}s`}}/>)}</div><p>Deposit　　Fees　　Loan</p></div><div className="workspace-tasks"><span>Next on your list</span>{['Confirm your budget','Review lender terms','Prepare your documents'].map((s,i)=><div key={s}><i>{i===0?<Check size={9}/>:i+1}</i>{s}</div>)}<small>Illustrative plan, not an application</small></div></div>
      </div></div></div></div><div className="mac-base"><i/></div><div className="mac-foot"/>
  </div>;
}

export function StartupHero() {
  const stage=useRef<HTMLDivElement>(null),phone=useRef<HTMLVideoElement>(null),film=useRef<HTMLVideoElement>(null),tour=useRef<HTMLDialogElement>(null);
  const inView=useInView(stage,{amount:.1});const reduce=useReducedMotion();const [paused,setPaused]=useState(false),[visible,setVisible]=useState(true),[saveData,setSaveData]=useState(false);
  useEffect(()=>{const sync=()=>setVisible(!document.hidden);sync();setSaveData(Boolean((navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData));document.addEventListener('visibilitychange',sync);return()=>document.removeEventListener('visibilitychange',sync);},[]);
  const moving=inView&&visible&&!paused&&!reduce&&!saveData;
  useEffect(()=>{if(!phone.current)return;if(moving)phone.current.play().catch(()=>{});else phone.current.pause();},[moving]);
  const showTour=()=>{tour.current?.showModal();film.current?.play().catch(()=>{});};
  const closeTour=()=>{film.current?.pause();tour.current?.close();};
  return <section className={`startup-hero ${moving?'motion-on':''}`}>
    <div className="hero-colour colour-a" aria-hidden="true"/><div className="hero-colour colour-b" aria-hidden="true"/><div className="hero-colour colour-c" aria-hidden="true"/><div className="hero-lines" aria-hidden="true"/>
    <div className="wrap relative z-[1]"><div className="startup-heading"><p className="startup-eyebrow"><span/>Mortgage broker in Dubai & UAE</p><h1>Mortgages, with<br/><em>more perspective.</em></h1><p>Compare your options. Know your real costs.<br className="hidden sm:block"/> Put your next home in focus.</p><div className="startup-actions"><Link className="btn startup-primary" href="#calculator">Build my mortgage plan <ArrowUpRight size={17}/></Link><button className="btn startup-secondary" type="button" onClick={showTour}><Play size={14} fill="currentColor"/> Watch the experience</button></div><div className="hero-audiences"><span>For residents</span><i/><span>For overseas buyers</span><i/><span>For your next move</span></div></div>
      <div ref={stage} className="startup-stage">
        <div className="hero-laptop"><MacWorkspace/></div>
        <div className="hero-phone"><div className="phone-metal"><div className="video-screen"><video ref={phone} muted loop playsInline preload="none" poster="/media/app-ui-poster.webp" aria-label="Illustrative Betterway mobile planning interface"><source src="/media/app-ui-tour.mp4" type="video/mp4"/></video></div></div></div>
        <div className="float-note note-budget"><span className="note-icon"><Wallet size={19}/></span><div><small>KNOW YOUR NUMBERS</small><b>{aed(c.total)}</b><span>Estimated upfront cash · example</span></div><ArrowUpRight size={15}/></div>
        <button className="float-note note-alert" type="button" onClick={()=>window.dispatchEvent(new Event('betterway:open-alerts'))}><span className="note-icon violet"><Bell size={18}/></span><span><b>Your next step, on time.</b><span>Create a mortgage reminder</span></span><ChevronRight size={15}/></button>
        <div className="stage-label"><span className="status-dot"/> Workspace & app concept · Preview</div>
      </div>
      <div className="stage-footer"><button type="button" className="motion-control" onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={paused?'Play experience animation':'Pause experience animation'}>{paused?<Play size={12}/>:<Pause size={12}/>} {paused?'Play':'Pause'} motion</button><Link href="/portal/login">Explore the workspace preview <ArrowUpRight size={13}/></Link></div>
    </div>
    <dialog ref={tour} className="tour-dialog" aria-label="Betterway product experience" onCancel={()=>film.current?.pause()} onClick={e=>{if(e.target===tour.current)closeTour();}}><div><button type="button" aria-label="Close video" className="dialog-close" onClick={closeTour}><X size={20}/></button><video ref={film} controls playsInline preload="none" poster="/media/app-ui-poster.webp"><source src="/media/app-ui-tour.mp4" type="video/mp4"/></video><p>Betterway mobile experience · Illustrative product walkthrough</p></div></dialog>
  </section>;
}

type Reminder={id:string;title:string;date:string};
export function AlertCenter() {
  const dialog=useRef<HTMLDialogElement>(null);const [reminders,setReminders]=useState<Reminder[]>([]),[keep,setKeep]=useState(false),[feedback,setFeedback]=useState(''),[toast,setToast]=useState('');
  const {data}=useBenchmark();
  useEffect(()=>{const open=()=>dialog.current?.showModal();window.addEventListener('betterway:open-alerts',open);try{const saved=JSON.parse(localStorage.getItem('betterway-reminders')||'null');if(saved?.enabled&&Array.isArray(saved.items)){setKeep(true);setReminders(saved.items.filter((r:Reminder)=>typeof r.title==='string'&&typeof r.id==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(r.date)&&Number.isFinite(Date.parse(r.date))).slice(0,10));}}catch{}return()=>window.removeEventListener('betterway:open-alerts',open);},[]);
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),7000);return()=>clearTimeout(t);},[toast]);
  const persist=(items:Reminder[],enabled:boolean)=>{try{if(enabled)localStorage.setItem('betterway-reminders',JSON.stringify({enabled,items}));else localStorage.removeItem('betterway-reminders');}catch{setFeedback('Storage is unavailable. Reminders will last for this visit.');}};
  const add=(e:React.FormEvent<HTMLFormElement>)=>{e.preventDefault();const form=new FormData(e.currentTarget);const day=String(form.get('reminderDate')||'');const title=String(form.get('reminderTitle')||'').trim().slice(0,80);if(!day||!title)return;const next=[{id:crypto.randomUUID(),title,date:day},...reminders].slice(0,10);setReminders(next);persist(next,keep);setFeedback('Reminder added to this device.');setToast('Your mortgage reminder is ready. View or edit it in the alert centre.');dialog.current?.close();};
  return <><button type="button" className="alert-bell" aria-label="Open mortgage alerts" onClick={()=>dialog.current?.showModal()}><Bell size={19}/>{reminders.length>0&&<span>{reminders.length}</span>}</button>
    <dialog ref={dialog} className="alerts-dialog" aria-label="Mortgage alerts and reminders" onClick={e=>{if(e.target===dialog.current)dialog.current?.close();}}><div className="alerts-content"><div className="flex items-start justify-between gap-3"><div><p className="eyebrow">Stay a step ahead</p><h2 className="mt-2 text-2xl font-semibold">Your mortgage alerts.</h2></div><button type="button" onClick={()=>dialog.current?.close()} className="dialog-close" aria-label="Close alerts"><X size={20}/></button></div>
      <a className="alert-item" href="/rates/eibor-live-tracker"><span className="note-icon"><Globe2 size={18}/></span><span><b>Latest published EIBOR</b><span>3M {data.latest.threeMonth.toFixed(5)}% · {date(data.latest.date)}</span><small>CBUAE public benchmark · Not a mortgage offer</small></span><ArrowUpRight size={15}/></a>
      <form onSubmit={add} className="reminder-form"><h3 className="text-sm font-semibold">Set your own reminder</h3><label>What’s next?<input required name="reminderTitle" maxLength={80} defaultValue="Review my mortgage options"/></label><label>Reminder date<input required type="date" name="reminderDate"/></label><label className="keep-reminders"><input type="checkbox" checked={keep} onChange={e=>{setKeep(e.target.checked);persist(reminders,e.target.checked);}}/> Keep reminders on this device</label><button className="btn btn-primary" type="submit">Add reminder <ArrowRight size={14}/></button><p className="text-xs leading-relaxed text-slate">On-device reminders appear when you visit. No email, SMS or browser push is sent.</p></form>
      <div aria-live="polite" className="text-sm text-teal mt-3">{feedback}</div><ul className="reminder-list">{reminders.map(r=><li key={r.id}><Bell size={15}/><span><b>{r.title}</b><small>{date(r.date)}</small></span><button type="button" aria-label={`Remove ${r.title}`} onClick={()=>{const next=reminders.filter(x=>x.id!==r.id);setReminders(next);persist(next,keep);}}><X size={14}/></button></li>)}</ul>
    </div></dialog>{toast&&<div className="startup-toast" role="status"><span className="note-icon"><Bell size={19}/></span><span><b>Reminder added</b><span>{toast}</span></span><button type="button" onClick={()=>setToast('')} aria-label="Dismiss reminder notification"><X size={15}/></button></div>}</>;
}

export function PlatformFeatures() {
  const [tab,setTab]=useState(0);
  const items=[{icon:Wallet,title:'Your budget. In full.',body:'See the deposit, purchase fees and monthly payment together.',href:'/calculators/mortgage-calculator',label:'Run the numbers'},{icon:FileCheck2,title:'Prepared beats surprised.',body:'Know which documents and lender checks come next.',href:'/guides',label:'Explore the buying guides'},{icon:ShieldCheck,title:'You stay in control.',body:'Choose what to share. Ask your advisor for the approved secure document channel.',href:'/privacy-and-cbuae-disclosure',label:'Read our disclosure'}];
  return <div className="platform-grid"><div className="platform-tab-card"><p className="eyebrow">A clearer process</p><h3>Less chasing.<br/>More moving forward.</h3><div className="feature-tab-list" role="group" aria-label="Mortgage planning features">{items.map((a,i)=><button type="button" key={a.title} aria-pressed={tab===i} onClick={()=>setTab(i)}><a.icon size={19}/><span>{a.title}</span><ChevronRight size={16}/></button>)}</div><p>{items[tab].body}</p><Link href={items[tab].href} className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-teal">{items[tab].label}<ArrowUpRight size={14}/></Link></div><div className="platform-visual"><div className="os-window"><div className="os-title"><span className="traffic"><i/><i/><i/></span><span>Betterway · Planning workspace</span><span>⌘</span></div><div className="feature-preview" key={tab}>{tab===0?<><p>YOUR HOME BUDGET</p><strong>{aed(c.total)}</strong><span>Estimated deposit + purchase fees</span><div className="budget-bar"><i/><i/><i/></div><ul><li><i/>Deposit <b>{aed(c.down)}</b></li><li><i/>DLD & title deed <b>{aed(c.dld)}</b></li><li><i/>Other purchase fees <b>{aed(c.fees-c.dld)}</b></li></ul><small>AED 2M property · 20% down · Illustrative</small></>:tab===1?<><p>YOUR DOCUMENT CHECKLIST</p><h4>One step at a time.</h4>{['Identity documents','Income evidence','Existing debt details','Property documents'].map((s,i)=><div className="check-row" key={s}><CircleCheck size={20}/><span>{s}</span><small>Prepare</small></div>)}<small>This checklist does not upload or verify documents.</small></>:<><div className="privacy-orbit"><LockKeyhole size={44}/></div><h4>Share with intention.</h4><span>Request the approved secure intake channel before sending identity or banking documents.</span><Link href="/contact" className="btn btn-primary mt-7">Ask an advisor <ArrowUpRight size={14}/></Link></>}</div></div><span className="platform-preview-label">Product preview · Illustrative information</span></div></div>;
}

export function BrandMaterials() {
  const [tab,setTab]=useState('banner');
  return <div className="materials-grid"><div><p className="eyebrow">Built to move with you</p><h2 className="h2 mt-4">One Betterway.<br/>Every touchpoint.</h2><p className="mt-5 max-w-md text-slate leading-relaxed">A clear mortgage conversation, from the first introduction to the next step. Explore the brand across desktop, mobile and shareable materials.</p><div className="material-tabs" role="group" aria-label="Brand material format">{['banner','flyer'].map(t=><button type="button" key={t} aria-pressed={tab===t} onClick={()=>setTab(t)}>{t==='banner'?'Digital banner':'Campaign flyer'}</button>)}</div><a href={`/brand/materials/betterway-${tab}.png`} download className="btn btn-ghost mt-5">Download {tab} (PNG) <ArrowUpRight size={14}/></a><a className="ml-4 text-xs text-teal underline underline-offset-4" href="/brand/materials/betterway-startup-media-kit.zip" download>Full media kit</a></div><div className={`material-display ${tab}`}><img key={tab} src={`/brand/materials/betterway-${tab}.svg`} alt={`Betterway ${tab} brand application`} width={tab==='banner'?1600:900} height={tab==='banner'?900:1200} loading="lazy"/></div></div>;
}

export function BenchmarkHistory() {
  const {data}=useBenchmark();const [tenor,setTenor]=useState<'oneMonth'|'threeMonth'|'sixMonth'>('threeMonth');
  const rows=data.history.slice(-30),values=rows.map(r=>r[tenor]),low=Math.min(...values)-.05,high=Math.max(...values)+.05;
  const path=rows.map((r,i)=>`${i?'L':'M'}${40+i*680/Math.max(1,rows.length-1)},${210-(r[tenor]-low)/(high-low)*170}`).join(' ');
  return <div className="rounded-card border border-line bg-white p-5 sm:p-8"><LiveBenchmark/><div className="my-6 flex flex-wrap gap-2" role="group" aria-label="EIBOR chart tenor">{([['oneMonth','1M'],['threeMonth','3M'],['sixMonth','6M']] as const).map(([key,label])=><button type="button" className={`chip ${tenor===key?'chip-on':''}`} aria-pressed={tenor===key} key={key} onClick={()=>setTenor(key)}>{label} EIBOR</button>)}</div><svg viewBox="0 0 760 250" role="img" aria-label={`Published ${tenor==='threeMonth'?'3M':tenor==='oneMonth'?'1M':'6M'} EIBOR history to ${data.latest.date}`} className="w-full h-auto"><defs><linearGradient id="history-area" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#80ceae" stopOpacity=".35"/><stop offset="1" stopColor="#80ceae" stopOpacity="0"/></linearGradient></defs>{[0,.5,1].map(p=><g key={p}><line x1="40" x2="720" y1={210-p*170} y2={210-p*170} stroke="#e3ede8"/><text x="2" y={214-p*170} fill="#6f877a" fontSize="9">{(low+p*(high-low)).toFixed(2)}</text></g>)}<path d={`${path} L720,210 L40,210 Z`} fill="url(#history-area)"/><path d={path} fill="none" stroke="#007d78" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><text x="40" y="238" fill="#6f877a" fontSize="10">{rows[0]?.date}</text><text x="720" y="238" textAnchor="end" fill="#6f877a" fontSize="10">{data.latest.date}</text></svg><p className="text-xs text-slate mt-3">Published daily fixings from CBUAE. Value dates can differ from publication dates. {data.status==='cached'?'Source refresh unavailable; showing the dated snapshot.':''}</p></div>;
}
