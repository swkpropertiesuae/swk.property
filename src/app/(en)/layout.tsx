import type { Metadata, Viewport } from 'next';
import '../globals.css';
import '../startup.css';
import '../brand.css';
import Header from '@/components/Header';
import CoPilot from '@/components/CoPilot';
import MotionKit from '@/components/MotionKit';
import { UtilityBar, Footer, JsonLd, orgSchema } from '@/components/ui';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Betterway Mortgages — Mortgage Broker in Dubai & UAE', template: '%s | Betterway Mortgages' },
  description: 'Dubai mortgage advice for residents, non-residents and investors. Compare UAE mortgage rates, calculate payments and understand upfront costs.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: { type: 'website', siteName: SITE.name, images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Betterway Mortgages — Mortgage Broker in Dubai & UAE' }], locale: 'en_AE' },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
  alternates: { languages: { 'en-AE': '/', 'ar-AE': '/ar' } },
};

export const viewport: Viewport = { themeColor: '#021125', width: 'device-width', initialScale: 1 };

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
        <MotionKit />
        <JsonLd data={orgSchema()} />
      </body>
    </html>
  );
}
