'use client';
// Regulatory toast in the manner of Monara's "not a bank" notice. Dismissal lasts for the browser session.
import { useEffect, useState } from 'react';
import { Info, X } from 'lucide-react';

export default function DisclosureToast() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let dismissed = false;
    try { dismissed = sessionStorage.getItem('bw-toast') === '0'; } catch {}
    if (dismissed) return;
    // Appears once the visitor starts reading, so it never covers the first screen's actions.
    const onScroll = () => { if (window.scrollY > 480) { setShow(true); window.removeEventListener('scroll', onScroll); } };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  const dismiss = () => { setShow(false); try { sessionStorage.setItem('bw-toast', '0'); } catch {} };
  return (
    <div className="bw-toast" role="note" aria-label="Regulatory notice">
      <Info size={16} className="mt-0.5 shrink-0 text-brass" />
      <p>Betterway Mortgages is a mortgage adviser, not a bank. Lending decisions, rates and final offers are made by the lender.</p>
      <button type="button" onClick={dismiss} aria-label="Dismiss notice"><X size={16} /></button>
    </div>
  );
}
