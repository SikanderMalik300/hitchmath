import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import ToolPage from '@/components/ToolPage';
import { RefTable } from '@/components/Tables';
import { SectionH2 } from '@/components/content';
import TongueCalculator from '@/components/calculators/TongueCalculator';
import { TONGUE } from '@/lib/pages/tool-content';
import { tongueRange } from '@/lib/calc/tongue';
import { fmt } from '@/lib/format';

const page = getPage('tongue-weight-calculator');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  const bumper = [2000, 3000, 4000, 5000, 6000, 7000, 8000, 10000].map((t) => {
    const r = tongueRange(t, 'conventional');
    return [fmt(t), fmt(r.low), fmt(r.target), fmt(r.high)];
  });
  const fifth = [8000, 10000, 12000, 14000].map((t) => {
    const r = tongueRange(t, 'fifthWheel');
    return [fmt(t), fmt(r.low), fmt(r.target), fmt(r.high)];
  });

  const referenceTables = (
    <>
      <SectionH2>Reference table: tongue weight by trailer weight (bumper-pull, 10% to 15%)</SectionH2>
      <RefTable
        caption="Bumper-pull tongue weight by trailer weight, at 10% to 15%"
        columns={['Trailer weight (lb)', 'Low (10%)', 'Target (12%)', 'High (15%)']}
        rows={bumper}
      />
      <h3 className="mt-6 text-h3 font-medium text-ink">Fifth wheel (15% to 25%)</h3>
      <RefTable
        caption="Fifth wheel pin weight by trailer weight, at 15% to 25%"
        columns={['Trailer weight (lb)', 'Low (15%)', 'Target (20%)', 'High (25%)']}
        rows={fifth}
      />
    </>
  );

  return (
    <ToolPage
      page={page}
      content={TONGUE}
      calculator={<TongueCalculator />}
      referenceTables={referenceTables}
      embed={{
        toolName: 'Tongue weight calculator',
        embedPath: '/embed/tongue-weight-calculator/',
        height: 560,
      }}
    />
  );
}
