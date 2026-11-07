import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import '../globals.css';
import { JsonLd, orgSchema } from '@/components/ui';
import { SITE, BENCH, waLink } from '@/data/site';
import { AR_UI } from '@/data/ar';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'بيترواي للتمويل العقاري — قارن 24 بنكاً في الإمارات', template: '%s | بيترواي للتمويل العقاري' },
  description: 'استشارات تمويل عقاري في النصر بلازا، عود ميثاء، دبي. قارن خيارات التمويل وافهم التكاليف قبل التقديم.',
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico' }], apple: '/apple-touch-icon.png' },
  openGraph: { locale: 'ar_AE', images: ['/images/dubai-waterfront-1280.webp'] },
};
export const viewport: Viewport = { themeColor: '#007D78' };

const NAV: [string, string][] = [[AR_UI.mortgages, '/ar#mortgages'], [AR_UI.calculators, '/ar#calculators'], [AR_UI.rates, '/ar#rates'], [AR_UI.areas, '/ar#areas']];

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <div className="bg-navy text-[13px] text-white/80">
          <div className="wrap flex h-9 items-center justify-between gap-4 whitespace-nowrap">
            <p className="hidden truncate md:block">{AR_UI.fee} · {AR_UI.address}</p>
            <p className="ms-auto">أسعار وأرقام إرشادية · الشروط يحددها البنك</p>
          </div>
        </div>
        <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
          <div className="wrap flex h-[72px] items-center justify-between gap-4">
            <Link href="/ar" aria-label="بيترواي"><img src="/brand/logo-primary.svg" alt="Betterway Mortgage" width={168} height={50} className="h-10 w-auto" /></Link>
            <nav className="hidden gap-1 md:flex" aria-label="الرئيسية">{NAV.map(([l, h]) => <Link key={h} href={h} className="rounded-full px-3.5 py-2 text-[15px] font-medium text-slate hover:text-navy">{l}</Link>)}</nav>
            <div className="flex items-center gap-2">
              <Link href="/" lang="en" className="btn btn-ghost !px-3 !py-2">{AR_UI.english}</Link>
              <a href={waLink('مرحباً بيترواي، أرغب في الحصول على عرض تمويل عقاري.')} rel="noopener" className="btn btn-primary !py-2.5 max-sm:hidden">{AR_UI.cta}</a>
            </div>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="bg-navy py-12 text-sm text-white/70">
          <div className="wrap space-y-4">
            <img src="/brand/logo-white.svg" alt="Betterway Mortgage" width={170} height={50} className="h-10 w-auto" />
            <p>{AR_UI.address}</p>
            <p className="text-xs text-white/50">{AR_UI.disclosure}</p>
            <p className="text-xs text-white/50">© 2026 Betterway Mortgages · <Link href="/privacy-and-cbuae-disclosure" className="ulink">الإفصاح والخصوصية</Link></p>
          </div>
        </footer>
        <JsonLd data={orgSchema()} />
      </body>
    </html>
  );
}
