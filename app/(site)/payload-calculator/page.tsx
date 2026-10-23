import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import ToolPage from '@/components/ToolPage';
import { RefTable } from '@/components/Tables';
import { SectionH2 } from '@/components/content';
import { getSource } from '@/lib/data/sources';
import PayloadCalculator from '@/components/calculators/PayloadCalculator';
import { PAYLOAD } from '@/lib/pages/tool-content';

const page = getPage('payload-calculator');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  const usgs = getSource('usgs-water');
  const cfr = getSource('cfr-571-110');
  const link = (href: string, text: string) => (
    <a href={href} target="_blank" rel="noopener" className="link">
      {text}
    </a>
  );

  const referenceTables = (
    <>
      <SectionH2>Reference table: weights people forget</SectionH2>
      <RefTable
        caption="Weights people forget when they load a truck"
        columns={['Item', 'Typical weight', 'Source']}
        rows={[
          ['Fresh water', '8.34 lb per gallon', link(usgs.url, 'USGS')],
          ['Weight-distribution hitch', '70 to 100 lb', 'typical'],
          ['Hard tonneau cover', '50 to 100 lb', 'typical'],
          [
            'Each adult (our default)',
            '180 lb',
            <>Your estimate; the federal placard method uses 150 lb ({link(cfr.url, '49 CFR 571.110')})</>,
          ],
        ]}
      />
      <p className="text-small text-muted">
        “Typical” values are shown as ranges with no brand names. Only USGS and the federal 150 lb
        value carry a source link.
      </p>
      <p className="text-small text-muted">
        GVWR is the most your vehicle may weigh fully loaded, and payload is GVWR minus curb weight.
        See{' '}
        <a href="/gvwr/" className="link">
          GVWR explained
        </a>{' '}
        for where to find it.
      </p>
    </>
  );

  return (
    <ToolPage
      page={page}
      content={PAYLOAD}
      calculator={<PayloadCalculator />}
      referenceTables={referenceTables}
      embed={{
        toolName: 'Payload calculator',
        embedPath: '/embed/payload-calculator/',
        height: 720,
      }}
    />
  );
}
