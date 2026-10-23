import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { subaruAscent2026 } from '@/lib/data/vehicles/subaru-ascent-2026';
import { ASCENT } from '@/lib/pages/vehicle-content-3';

const page = getPage('subaru-ascent-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={subaruAscent2026}
      content={ASCENT}
      mini={{ defaultId: 'asc-touring-7', defaultTrailer: 3500, defaultPeople: 600, defaultCargo: 150 }}
    />
  );
}
