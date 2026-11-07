import type { Metadata, Viewport } from 'next';
import '../globals.css';
import '../startup.css';
import Header from '@/components/Header';
import CoPilot from '@/components/CoPilot';
import { UtilityBar, Footer, JsonLd, orgSchema } from '@/components/ui';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Betterway Mortgages — Mortgage Broker in Dubai & UAE', template: '%s | Betterway Mortgages' },
  description: 'Dubai mortgage advice for residents, non-residents and investors. Compare UAE mortgage rates, calculate payments and understand upfront costs.',
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico' }], apple: '/apple-touch-icon.png' },
  manifest: '/site.webmanifest',
  openGraph: { type: 'website', siteName: SITE.name, images: ['/brand/materials/betterway-banner.png'], locale: 'en_AE' },
  twitter: { card: 'summary_large_image' },
  alternates: { languages: { 'en-AE': '/', 'ar-AE': '/ar' } },
};

export const viewport: Viewport = { themeColor: '#007D78', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-btn focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
        <UtilityBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CoPilot />
        <JsonLd data={orgSchema()} />
      </body>
    </html>
  );
}
