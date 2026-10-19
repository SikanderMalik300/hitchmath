import Link from 'next/link';
import { SITE } from '@/lib/registry';
import { DISCLAIMER_LINE } from '@/lib/content';

const COLS = [
  {
    heading: 'Calculators',
    links: [
      { label: 'Towing capacity calculator', href: '/towing-capacity-calculator/' },
      { label: 'Payload calculator', href: '/payload-calculator/' },
      { label: 'Tongue weight calculator', href: '/tongue-weight-calculator/' },
      { label: 'GCWR calculator', href: '/gcwr-calculator/' },
    ],
  },
  {
    heading: 'Vehicles',
    links: [
      { label: 'Toyota Tacoma', href: '/toyota-tacoma-towing-capacity/' },
      { label: 'Ford F-150', href: '/ford-f150-towing-capacity/' },
      { label: 'Toyota Tundra', href: '/toyota-tundra-towing-capacity/' },
      { label: 'Ram 1500', href: '/ram-1500-towing-capacity/' },
      { label: 'Chevy Silverado 1500', href: '/chevy-silverado-1500-towing-capacity/' },
      { label: 'Toyota 4Runner', href: '/toyota-4runner-towing-capacity/' },
    ],
  },
  {
    heading: 'Trust',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'How we calculate', href: '/how-we-calculate/' },
      { label: 'Editorial policy', href: '/editorial-policy/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
];

const LEGAL = [
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Terms', href: '/terms/' },
  { label: 'Disclaimer', href: '/disclaimer/' },
  { label: 'Affiliate disclosure', href: '/affiliate-disclosure/' },
  { label: 'Sitemap', href: '/sitemap/' },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="container-x py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {COLS.map((col) => (
            <div key={col.heading}>
              <h2 className="text-small font-semibold text-ink">{col.heading}</h2>
              <ul className="mt-3 space-y-2 text-small">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      prefetch={false}
                      className="text-muted hover:text-brand hover:underline underline-offset-2"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6 text-small">
          {LEGAL.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                prefetch={false}
                className="text-muted hover:text-brand hover:underline underline-offset-2"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-small text-muted">
          {SITE.name} is run by {SITE.author} ·{' '}
          <a
            href={`mailto:${SITE.email}`}
            className="text-brand hover:underline underline-offset-2"
          >
            {SITE.email}
          </a>
        </p>
        <p className="mt-2 text-small text-muted">{DISCLAIMER_LINE}</p>
      </div>
    </footer>
  );
}
