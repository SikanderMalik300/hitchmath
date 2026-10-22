import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import ToolPage from '@/components/ToolPage';
import { RefTable } from '@/components/Tables';
import { SectionH2 } from '@/components/content';
import { getSource } from '@/lib/data/sources';
import GcwrCalculator from '@/components/calculators/GcwrCalculator';
import { GCWR } from '@/lib/pages/tool-content';

const page = getPage('gcwr-calculator');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  const gm = getSource('gm-guide-2026');
  const ford = getSource('ford-guide-2026');
  const ram = getSource('ram-1500-chart-2026');
  const link = (href: string, text: string) => (
    <a href={href} target="_blank" rel="noopener" className="link">
      {text}
    </a>
  );

  const referenceTables = (
    <>
      <SectionH2>Reference table: GCWR examples from 2026 guides</SectionH2>
      <RefTable
        caption="GCWR examples from 2026 manufacturer guides"
        columns={['Truck (2026)', 'Configuration', 'GCWR (lb)', 'Max trailer (lb)', 'Source']}
        rows={[
          ['Chevrolet Silverado 1500', '5.3L V8, Crew Cab Short Box 4x4', '15,000', '9,300', link(gm.url, gm.name)],
          [
            'Chevrolet Silverado 1500',
            '3.0L Duramax, Max Trailering Pkg, 20" wheels, Double Cab Std Box 2WD',
            '19,000',
            '13,300',
            link(gm.url, gm.name),
          ],
          [
            'Ford F-150',
            '3.5L EcoBoost, 3.55 axle, Tow/Haul Pkg + Max Tow Axle',
            '19,400',
            '13,500',
            link(ford.url, ford.name),
          ],
          ['Ram 1500', '3.0L Hurricane SO, 3.92 axle', '17,000', '11,610', link(ram.url, ram.name)],
        ]}
      />
    </>
  );

  return (
    <ToolPage
      page={page}
      content={GCWR}
      calculator={<GcwrCalculator />}
      referenceTables={referenceTables}
    />
  );
}
