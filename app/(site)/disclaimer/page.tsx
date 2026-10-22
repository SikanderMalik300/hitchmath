import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import SimplePage from '@/components/SimplePage';
import { DISCLAIMER_LINE } from '@/lib/content';

const page = getPage('disclaimer');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <SimplePage page={page}>
      <p>{DISCLAIMER_LINE}</p>
      <p>
        The calculators estimate limits from the numbers you enter and treat tongue weight as a
        percentage. They do not check rear axle weight, tire load ratings, trailer brakes or state
        towing laws. A scale ticket from a truck stop CAT scale is the only way to know what your
        setup really weighs.
      </p>
    </SimplePage>
  );
}
