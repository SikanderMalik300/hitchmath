import Link from 'next/link';
import { SITE } from '@/lib/registry';

/**
 * Author box shown on every content page (A7.1). The owner has not supplied a
 * real photo, so an initials circle "SM" is used.
 */
export default function AuthorBox({ lastUpdated }: { lastUpdated: string }) {
  return (
    <section className="rounded-card border border-line bg-surface p-5 shadow-card">
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-band-2 text-small font-semibold text-ink"
        >
          SM
        </span>
        <div className="text-small">
          <p className="text-ink">
            Written by{' '}
            <Link href={SITE.authorPath} className="link">
              Sikander Mushtaq
            </Link>
            . I build HitchMath's calculators and check every towing number against the
            manufacturer's own guide or spec page.{' '}
            <Link href="/how-we-calculate/" className="link">
              Read how we calculate
            </Link>
            .
          </p>
          <p className="mt-3 text-muted">
            Last updated: {lastUpdated} ·{' '}
            <Link href="/editorial-policy/" prefetch={false} className="link">
              Editorial policy
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
