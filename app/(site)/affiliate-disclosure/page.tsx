import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import SimplePage from '@/components/SimplePage';

const page = getPage('affiliate-disclosure');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <SimplePage page={page}>
      <p>HitchMath has no affiliate links at the moment.</p>
      <p>
        When affiliate links are added, they are clearly marked and use rel=&quot;sponsored
        nofollow&quot;. An affiliate link never changes a number or a verdict in our calculators or
        tables.
      </p>
    </SimplePage>
  );
}
