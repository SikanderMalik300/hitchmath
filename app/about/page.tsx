import type { Metadata } from 'next';
import Link from 'next/link';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import SimplePage from '@/components/SimplePage';

const page = getPage('about');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <SimplePage page={page}>
      <p>
        HitchMath answers one question: can your truck safely tow what you want to tow? We do that
        with calculators that show their math and vehicle tables copied from the manufacturer’s own
        documents, with the source on every table. HitchMath is run by Sikander Mushtaq.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <Link href="/authors/sikander-mushtaq/" className="link">
            About the author
          </Link>
        </li>
        <li>
          <Link href="/how-we-calculate/" className="link">
            How we calculate
          </Link>
        </li>
        <li>
          <Link href="/editorial-policy/" prefetch={false} className="link">
            Editorial policy
          </Link>
        </li>
        <li>
          <Link href="/contact/" prefetch={false} className="link">
            Contact
          </Link>
        </li>
      </ul>
    </SimplePage>
  );
}
