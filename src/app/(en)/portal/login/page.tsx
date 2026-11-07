import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Client Portal Preview', robots: { index: false, follow: false } };
export default function Page() {
  return <section className="bg-mist py-20"><div className="wrap max-w-md"><div className="card !p-8 text-center"><img src="/brand/symbol-teal.svg" alt="" width={56} height={56} className="mx-auto h-14 w-14" /><h1 className="mt-5 text-2xl font-semibold">Client portal preview</h1><p className="mt-3 text-sm leading-relaxed text-slate">Try a demo filled with made-up information. Sign-in, UAE PASS and document upload are switched off here.</p><Link href="/portal/dashboard" className="btn btn-ghost mt-6 w-full">View demonstration <ArrowRight size={16} /></Link><Link href="/contact" className="btn btn-primary mt-3 w-full">Ask about your application</Link></div></div></section>;
}
