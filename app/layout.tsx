import type { Metadata } from 'next';
import './globals.css';
import { SITE } from '@/lib/registry';

// Minimal root layout: just <html>/<body> so the /embed/* routes can opt out of the
// site chrome and web font. The site chrome lives in app/(site)/layout.tsx.
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
