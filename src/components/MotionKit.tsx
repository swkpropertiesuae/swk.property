'use client';
// Small motion kit, modelled on the 8B glamping template: content is fully visible without JS or with
// reduced motion. When motion is allowed, <html> gets .bw-motion and [data-reveal] elements receive
// .is-in as they enter the viewport (rise = heading lines, horizon = photo windows, frost = cards, mark = footer wordmark).
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MotionKit() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches || !('IntersectionObserver' in window)) { root.classList.remove('bw-motion'); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }, { rootMargin: '160px 0px 40px 0px', threshold: 0.01 });
    const scan = () => document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
      // Anything already in or near the initial viewport is shown immediately so the first paint never flashes.
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 1.08 && r.bottom > 0) el.classList.add('is-in');
      else io.observe(el);
    });
    scan();
    root.classList.add('bw-motion');
    const onChange = () => { if (media.matches) { root.classList.remove('bw-motion'); io.disconnect(); } };
    media.addEventListener('change', onChange);
    const header = document.querySelector('.bw-header');
    const onScroll = () => header?.setAttribute('data-scrolled', String(window.scrollY > 8));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); media.removeEventListener('change', onChange); window.removeEventListener('scroll', onScroll); };
  }, [path]);
  return null;
}
