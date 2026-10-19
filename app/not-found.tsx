import Link from 'next/link';

export const metadata = {
  title: 'Page not found | HitchMath',
};

export default function NotFound() {
  return (
    <div className="container-x section-y">
      <h1 className="text-h1-m md:text-h1 font-medium text-ink">Page not found</h1>
      <p className="mt-4 max-w-prose text-body text-ink">
        We could not find that page. Try the calculators or the vehicle towing pages.
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-small">
        <li>
          <Link href="/" className="link">
            Home
          </Link>
        </li>
        <li>
          <Link href="/towing-calculators/" prefetch={false} className="link">
            Towing calculators
          </Link>
        </li>
        <li>
          <Link href="/towing-capacity/" prefetch={false} className="link">
            Towing capacity by vehicle
          </Link>
        </li>
        <li>
          <Link href="/sitemap/" prefetch={false} className="link">
            Sitemap
          </Link>
        </li>
      </ul>
    </div>
  );
}
