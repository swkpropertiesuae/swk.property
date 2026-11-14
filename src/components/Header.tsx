'use client';
// Mega-menu header adapted from 21st.dev "Mega Menu Navbar" (anelkabag/navbar2): shared animated panel, mobile slide-down.
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { AlertCenter } from '@/components/StartupExperience';
import { NAV } from '@/data/nav';
import { Cta } from '@/components/ui';

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const reduce = useReducedMotion();
  useEffect(() => { setOpen(null); setMobile(false); }, [path]);
  useEffect(() => {
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(null); setMobile(false); } };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, []);
  const active = NAV.find((n) => n.label === open);

  return (
    <header ref={ref} className="bw-header">
      <div className="wrap bw-header__bar">
        <Link href="/" aria-label="Betterway Mortgages home" className="bw-header__logo shrink-0">
          <img src="/brand/logo-primary.svg" alt="Betterway Mortgages" width={1591} height={444} fetchPriority="high" />
        </Link>
        <nav aria-label="Main" className="bw-nav">
          {NAV.map((n) => (
            <button key={n.label} type="button" aria-expanded={open === n.label} onClick={() => setOpen((c) => (c === n.label ? null : n.label))}
              onMouseEnter={() => open && setOpen(n.label)}>
              {n.label}
              <ChevronDown size={14} className={`transition-transform duration-300 ${open === n.label ? 'rotate-180' : ''}`} />
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <AlertCenter />
          <Link href="/ar" className="hidden rounded-full px-3 py-2 text-sm font-medium text-slate hover:text-navy xl:inline" lang="ar">العربية</Link>
          <span className="hidden min-[1100px]:inline-flex"><Cta href="/contact" size="sm">Talk to an advisor</Cta></span>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full bg-mist text-navy min-[1100px]:hidden" aria-label={mobile ? 'Close menu' : 'Open menu'} aria-expanded={mobile} onClick={() => setMobile((m) => !m)}>
            {mobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {active?.cols && (
          <motion.div key={active.label} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }} className="hidden overflow-hidden border-t border-line bg-white min-[1100px]:block">
            <div className="wrap grid grid-cols-[1fr_1fr_1fr_240px] gap-6 py-8">
              {active.cols.map((c, ci) => (
                <div key={ci}>
                  <p className="eyebrow mb-4 h-4">{c.title.trim()}</p>
                  <ul className="space-y-3">
                    {c.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="group flex items-baseline justify-between gap-3 text-[15px] font-medium text-navy hover:text-teal">
                          <span className="ulink">{l.label}</span>
                          {l.desc && <span className="text-xs text-slate">{l.desc}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {active.cols.length < 3 && <div />}
              <div className="rounded-card bg-obsidian p-6 text-white">
                <p className="font-display text-lg font-semibold">{active.feature?.title ?? 'Plan your next move'}</p>
                <p className="mt-2 text-sm text-white/70">{active.feature?.body ?? 'Every calculator is free to use, with no sign-up.'}</p>
                <Link href={active.feature?.href ?? active.href} className="btn btn-light mt-5 !py-2">{active.feature?.cta ?? `All ${active.label.toLowerCase()}`} <ArrowRight size={15} /></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {mobile && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: reduce ? 0 : 0.25 }} className="overflow-hidden border-t border-line bg-white min-[1100px]:hidden">
            <nav aria-label="Mobile" className="wrap max-h-[calc(100dvh-72px)] overflow-y-auto pb-8 pt-2">
              {NAV.map((n) => (
                <details key={n.label} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-base font-semibold text-navy">
                    {n.label}<ChevronDown size={18} className="transition group-open:rotate-180" />
                  </summary>
                  <ul className="space-y-3 pb-4">
                    {n.cols?.flatMap((c) => c.links).map((l) => (
                      <li key={l.href}><Link href={l.href} className="block text-[15px] text-slate">{l.label}</Link></li>
                    ))}
                  </ul>
                </details>
              ))}
              <div className="mt-6 grid gap-3">
                <Link href="/contact" className="btn btn-primary w-full">Talk to an advisor</Link>

                <Link href="/ar" className="btn btn-ghost w-full" lang="ar">العربية</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
