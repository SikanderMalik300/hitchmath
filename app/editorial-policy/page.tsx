import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import SimplePage, { H2 } from '@/components/SimplePage';
import { RefTable } from '@/components/Tables';

const page = getPage('editorial-policy');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <SimplePage page={page}>
      <H2>Who writes HitchMath</H2>
      <p>
        Sikander Mushtaq writes and checks HitchMath. He builds the calculators and pulls every
        towing and payload figure from the manufacturer’s own documents.
      </p>

      <H2>Sources rule</H2>
      <p>
        Manufacturer documents come first. Dealer pages and forums are never used as a source for a
        number.
      </p>

      <H2>Conflicts rule</H2>
      <p>
        If two official documents disagree, we show both and use the lower number in the
        calculators.
      </p>

      <H2>AI use</H2>
      <p>
        I use AI tools to help draft and check text and code. Every number is checked by hand against
        the source document before it goes live, and every page is read by me before publishing.
      </p>

      <H2>Update policy</H2>
      <p>
        Vehicle pages are re-checked when a new model-year guide is published and at least once a
        year. “Last updated” changes only when content changes.
      </p>

      <H2 id="corrections">Corrections</H2>
      <p>Public log, newest first.</p>
      <RefTable columns={['Date', 'Page', 'Change']} rows={[['None', 'None', 'No corrections yet.']]} />

      <H2>Ads and affiliates</H2>
      <p>
        There are none at launch. When added, they never change a number or a verdict, and affiliate
        links are marked.
      </p>
    </SimplePage>
  );
}
