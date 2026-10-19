import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import ToolPage from '@/components/ToolPage';
import { RefTable } from '@/components/Tables';
import { SectionH2 } from '@/components/content';
import TowCalculator from '@/components/calculators/TowCalculator';
import { TOWING_CAPACITY } from '@/lib/pages/tool-content';

const page = getPage('towing-capacity-calculator');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  const referenceTables = (
    <>
      <SectionH2>Reference table: what each limit means</SectionH2>
      <RefTable
        columns={['Limit', 'Where to find it', 'What counts against it']}
        rows={[
          ['Max trailer rating', 'Owner’s manual or the maker’s towing guide', 'Loaded trailer weight; reduced by people and cargo over 300 lb'],
          ['Payload', 'Driver’s door-jamb sticker', 'People, cargo, hitch hardware, tongue weight'],
          ['GVWR', 'Door-jamb sticker', 'Whole truck, including tongue weight'],
          ['GCWR', 'Owner’s manual or towing guide', 'Loaded truck plus loaded trailer'],
          ['Hitch rating', 'Label on the receiver and ball mount', 'Trailer weight and tongue weight; the lowest-rated part wins'],
        ]}
      />
    </>
  );

  return (
    <ToolPage
      page={page}
      content={TOWING_CAPACITY}
      calculator={<TowCalculator />}
      referenceTables={referenceTables}
    />
  );
}
