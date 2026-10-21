import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import QueryNoindex from '@/components/QueryNoindex';
import { OrganizationAndWebsite } from '@/components/JsonLd';
import { SITE } from '@/lib/registry';

// Self-hosted Manrope (from @fontsource/manrope) so the build makes no network
// request for fonts. Same weights, display and CSS variable as before.
const manrope = localFont({
  src: [
    { path: './fonts/manrope-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/manrope-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/manrope-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-manrope',
  // Don't preload the font files: they would compete with the hero image, which is
  // the LCP element. display:swap paints the H1 immediately with the size-adjusted
  // fallback, so text is never blocked.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: { absolute: SITE.name },
  applicationName: SITE.name,
  authors: [{ name: SITE.author, url: SITE.authorPath }],
  icons: {
    icon: [
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <OrganizationAndWebsite />
        <QueryNoindex />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
