import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import SimplePage from '@/components/SimplePage';
import { DISCLAIMER_LINE } from '@/lib/content';

const page = getPage('terms');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <SimplePage page={page}>
      <p>
        HitchMath provides towing calculators and towing data for general information. By using the
        site you agree to these terms.
      </p>
      <p>{DISCLAIMER_LINE}</p>
      <p>
        The calculators use the numbers you enter. A wrong input gives a wrong answer. You are
        responsible for checking your truck’s door-jamb sticker, owner’s manual and a scale ticket
        before you tow.
      </p>
      <p>
        The content is provided as is, without warranty. We are not liable for decisions made from
        the figures on this site. We may update the site and these terms at any time.
      </p>
    </SimplePage>
  );
}
