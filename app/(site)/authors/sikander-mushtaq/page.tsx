import type { Metadata } from 'next';
import Link from 'next/link';
import { getPage, SITE } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import SimplePage, { H2 } from '@/components/SimplePage';
import { ProfilePage } from '@/components/JsonLd';

const page = getPage('authors/sikander-mushtaq');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <SimplePage page={page} schema={<ProfilePage />}>
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-pill bg-band-2 text-body font-semibold text-ink"
        >
          SM
        </span>
      </div>

      <p>
        I&apos;m Sikander Mushtaq, the person behind HitchMath. I build the calculators and pull
        every towing and payload figure from the manufacturer&apos;s own towing guide or spec page.
      </p>
      <p>
        I don&apos;t sell trucks, trailers or hitches, and no manufacturer pays for a listing here.
        When a maker&apos;s own documents disagree, I show both figures and say so on the page.
      </p>

      <H2 id="how-i-check">How I check the numbers</H2>
      <p>
        Each figure comes from the manufacturer&apos;s published towing guide or spec sheet, usually
        a PDF. On every page I name the document and the date I read it.
      </p>
      <p>
        The calculators show their formulas and worked examples you can redo by hand. See{' '}
        <Link href="/how-we-calculate/" className="link">
          how we calculate
        </Link>{' '}
        for the method, and our{' '}
        <Link href="/editorial-policy/" prefetch={false} className="link">
          editorial policy
        </Link>{' '}
        for how I source and date each number.
      </p>

      <H2 id="report-an-error">Report an error</H2>
      <p>
        If a number doesn&apos;t match your door-jamb sticker or owner&apos;s manual, email{' '}
        <a href={`mailto:${SITE.email}`} className="link">
          {SITE.email}
        </a>{' '}
        with the year, trim and the figure you see. I check every report.
      </p>
      <p>
        Fixes are logged in public. See the{' '}
        <Link href="/editorial-policy/#corrections" prefetch={false} className="link">
          corrections log
        </Link>{' '}
        on our editorial policy page.
      </p>
    </SimplePage>
  );
}
