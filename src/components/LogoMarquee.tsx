'use client';
// Adapted from 21st.dev "Logo Marquee" (ddoemonn/logo-marquee): accessible infinite strip, pauses on hover/focus,
// static and scrollable under reduced motion. Restyled to brand tokens; logic unchanged.
import { useCallback, useEffect, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect, useReducedMotion } from 'motion/react';

const RAMP = 0.19, SETTLE = 0.16, MAX_COPIES = 14;
const fold = (x: number, loop: number) => { const m = x % loop; return m > 0 ? m - loop : m; };
const clamp = (x: number, min: number, max: number) => (x < min ? min : x > max ? max : x);

function useLogoMarquee({ speed = 44, gap = 40 }: { speed?: number; gap?: number }) {
  const viewportRef = useRef<HTMLDivElement>(null), trackRef = useRef<HTMLDivElement>(null), groupRef = useRef<HTMLUListElement>(null);
  const [copies, setCopies] = useState(4), [held, setHeld] = useState(false), [near, setNear] = useState(false);
  const reduced = useReducedMotion() === true;
  const reducedRef = useRef(reduced); reducedRef.current = reduced;
  const movingRef = useRef(false); movingRef.current = !held && !reduced;
  const offset = useRef(0), nudge = useRef(0), rate = useRef(0), span = useRef(0);

  const paint = useCallback(() => { const t = trackRef.current; if (t) t.style.transform = `translate3d(${(reducedRef.current ? 0 : offset.current - span.current).toFixed(2)}px,0,0)`; }, []);

  useIsomorphicLayoutEffect(() => {
    const viewport = viewportRef.current, group = groupRef.current;
    if (!viewport || !group) return;
    const measure = () => {
      const width = group.getBoundingClientRect().width, loop = width > 0 ? width + gap : 0, room = viewport.getBoundingClientRect().width;
      span.current = loop; offset.current = loop > 0 ? clamp(offset.current, -loop, loop) : 0; paint();
      const next = reduced || loop <= 0 ? 4 : clamp(Math.ceil(room / loop) + 3, 4, MAX_COPIES);
      setCopies((p) => (p === next ? p : next));
    };
    measure();
    const ro = new ResizeObserver(measure); ro.observe(viewport); ro.observe(group);
    return () => ro.disconnect();
  }, [gap, paint, reduced]);

  useEffect(() => {
    const v = viewportRef.current; if (!v) return;
    const io = new IntersectionObserver((e) => setNear(e[e.length - 1].isIntersecting), { rootMargin: '96px' });
    io.observe(v); return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !near) return;
    let frame = 0, last = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0; last = now;
      const loop = span.current; if (loop <= 0) return;
      rate.current += ((movingRef.current ? 1 : 0) - rate.current) * (1 - Math.exp(-dt / RAMP));
      const pull = nudge.current * (1 - Math.exp(-dt / SETTLE)); nudge.current -= pull;
      let x = offset.current - speed * rate.current * dt + pull;
      if (rate.current > 0.002 && Math.abs(nudge.current) < 0.25) { nudge.current = 0; x = fold(x, loop); } else x = clamp(x, -loop, loop);
      offset.current = x; paint();
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, near, speed, paint]);

  useEffect(() => { const r = () => setHeld(false); window.addEventListener('blur', r); return () => window.removeEventListener('blur', r); }, []);

  const reveal = useCallback((node: HTMLElement) => {
    const v = viewportRef.current, loop = span.current;
    if (!v || reducedRef.current || loop <= 0 || node === v) return;
    const view = v.getBoundingClientRect(), box = node.getBoundingClientRect();
    const delta = box.left < view.left + 12 ? view.left + 12 - box.left : box.right > view.right - 12 ? view.right - 12 - box.right : 0;
    if (delta) nudge.current = clamp(offset.current + nudge.current + delta, -loop, loop) - offset.current;
  }, []);

  const bind = {
    onPointerEnter: (e: React.PointerEvent) => e.pointerType !== 'touch' && setHeld(true),
    onPointerDown: () => setHeld(true),
    onPointerUp: (e: React.PointerEvent) => e.pointerType === 'touch' && setHeld(false),
    onPointerCancel: () => setHeld(false), onPointerLeave: () => setHeld(false),
    onFocus: (e: React.FocusEvent) => { setHeld(true); reveal(e.target as HTMLElement); },
    onBlur: () => setHeld(false),
  };
  return { viewportRef, trackRef, groupRef, copies, reduced, bind };
}

export default function LogoMarquee({ items, label, speed = 40, gap = 12 }: { items: { id: string; label: string; href: string }[]; label: string; speed?: number; gap?: number }) {
  const { viewportRef, trackRef, groupRef, copies, reduced, bind } = useLogoMarquee({ speed, gap });
  const groups = reduced ? 1 : copies, live = reduced ? 0 : 1;
  const face = 'inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-line bg-white px-4 text-sm font-medium text-navy';
  return (
    <section aria-label={label} className="relative isolate w-full overflow-hidden" {...bind}>
      <div ref={viewportRef} tabIndex={reduced ? 0 : undefined} style={{ overflowX: reduced ? 'auto' : 'hidden' }} className="overflow-y-hidden py-2 outline-none">
        <div ref={trackRef} style={{ gap, willChange: 'transform' }} className="flex w-max items-center">
          {Array.from({ length: groups }, (_, copy) => (
            <ul key={copy} ref={copy === live ? groupRef : undefined} aria-hidden={copy === live ? undefined : true} style={{ gap }} className="flex w-max items-center">
              {items.map((it) => (
                <li key={it.id} className="shrink-0">
                  {copy === live ? <a href={it.href} className={`${face} transition hover:border-teal hover:text-teal`}>{it.label}</a> : <span className={face}>{it.label}</span>}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 start-0 w-16 bg-gradient-to-r from-white to-white/0 rtl:bg-gradient-to-l" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 end-0 w-16 bg-gradient-to-l from-white to-white/0 rtl:bg-gradient-to-r" />
    </section>
  );
}
