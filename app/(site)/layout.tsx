import localFont from 'next/font/local';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import QueryNoindex from '@/components/QueryNoindex';
import { OrganizationAndWebsite } from '@/components/JsonLd';

// Self-hosted Manrope (from @fontsource/manrope) so the build makes no network
// request for fonts. preload:false so the font never competes with the hero image.
const manrope = localFont({
  src: [
    { path: './fonts/manrope-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/manrope-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/manrope-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-manrope',
  preload: false,
});

// The site chrome and web font. The /embed/* routes use a separate layout with no
// chrome, no analytics and the system font stack.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${manrope.variable} font-sans`}>
      <OrganizationAndWebsite />
      <QueryNoindex />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <Analytics />
    </div>
  );
}
