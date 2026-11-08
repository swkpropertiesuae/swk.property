import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import '../globals.css';
import { JsonLd, orgSchema } from '@/components/ui';
import { SITE, BENCH, waLink } from '@/data/site';
import { AR_UI } from '@/data/ar';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  robots: { index: false, follow: true },
  title: { default: 'بيترواي للتمويل العقاري — 24 بنكاً إماراتياً في مكان واحد', template: '%s | بيترواي للتمويل العقاري' },
  description: 'مكتبنا في النصر بلازا بعود ميثاء، دبي. نساعدك على المقارنة بين البنوك ومعرفة كل التكاليف قبل أن تتقدم بطلب التمويل.',
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico' }], apple: '/apple-touch-icon.png' },
  openGraph: { locale: 'ar_AE', images: ['/brand/materials/betterway-banner.png'] },
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
            <p className="ms-auto">الأرقام للاسترشاد · والقرار النهائي للبنك</p>
          </div>
        </div>
        <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
          <div className="wrap flex h-[72px] items-center justify-between gap-4">
            <Link href="/ar" aria-label="بيترواي"><img src="/brand/logo-wordmark.svg" alt="Betterway Mortgage" width={1295} height={358} className="h-9 w-auto sm:h-10" /></Link>
            <nav className="hidden gap-1 md:flex" aria-label="الرئيسية">{NAV.map(([l, h]) => <Link key={h} href={h} className="rounded-full px-3.5 py-2 text-[15px] font-medium text-slate hover:text-navy">{l}</Link>)}</nav>
            <div className="flex items-center gap-2">
              <Link href="/" lang="en" className="btn btn-ghost !px-3 !py-2">{AR_UI.english}</Link>
              <a href={waLink('مرحباً، أود التحدث مع مستشار بيترواي بشأن تمويل عقاري.')} rel="noopener" className="btn btn-primary !py-2.5 max-sm:hidden">{AR_UI.cta}</a>
            </div>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="bg-navy py-12 text-sm text-white/70">
          <div className="wrap space-y-4">
            <img src="/brand/logo-white-full.svg" alt="Betterway Mortgage" width={1295} height={358} className="h-auto w-[248px]" />
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
