import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { subaruOutback2026 } from '@/lib/data/vehicles/subaru-outback-2026';
import { OUTBACK } from '@/lib/pages/vehicle-content-2';

const page = getPage('subaru-outback-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={subaruOutback2026}
      content={OUTBACK}
      mini={{ defaultId: 'obk-wilderness', defaultTrailer: 2500, defaultPeople: 360, defaultCargo: 150 }}
    />
  );
}
