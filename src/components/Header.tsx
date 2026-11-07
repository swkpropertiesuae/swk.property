'use client';
// Mega-menu header adapted from 21st.dev "Mega Menu Navbar" (anelkabag/navbar2): shared animated panel, mobile slide-down.
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { AlertCenter } from '@/components/StartupExperience';
import { NAV } from '@/data/nav';

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
    <header ref={ref} className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="wrap flex h-[72px] items-center justify-between gap-4">
        <Link href="/" aria-label="Betterway Mortgages home" className="shrink-0">
          <img src="/brand/logo-wordmark.svg" alt="Betterway Mortgage" width={1295} height={358} className="h-9 w-auto sm:h-10" fetchPriority="high" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((n) => (
            <button key={n.label} type="button" aria-expanded={open === n.label} onClick={() => setOpen((c) => (c === n.label ? null : n.label))}
              onMouseEnter={() => open && setOpen(n.label)}
              className={`flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition ${open === n.label ? 'bg-mist text-navy' : 'text-slate hover:text-navy'}`}>
              {n.label}
              <ChevronDown size={15} className={`transition-transform duration-300 ${open === n.label ? 'rotate-180' : ''}`} />
            </button>
          ))}
        </nav>
        <AlertCenter />
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/ar" className="hidden rounded-full px-3 py-2 xl:inline text-sm font-medium text-slate hover:text-navy" lang="ar">العربية</Link>

          <Link href="/contact" className="btn btn-primary !py-2.5">Talk to an advisor</Link>
        </div>
        <button type="button" className="rounded-full p-2 text-navy lg:hidden" aria-label={mobile ? 'Close menu' : 'Open menu'} aria-expanded={mobile} onClick={() => setMobile((m) => !m)}>
          {mobile ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {active?.cols && (
          <motion.div key={active.label} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }} className="hidden overflow-hidden border-t border-line bg-white lg:block">
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
              <div className="rounded-card bg-navy p-6 text-white">
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
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: reduce ? 0 : 0.25 }} className="overflow-hidden border-t border-line lg:hidden">
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
