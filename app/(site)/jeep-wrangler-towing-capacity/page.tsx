import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { jeepWrangler2026 } from '@/lib/data/vehicles/jeep-wrangler-2026';
import { WRANGLER } from '@/lib/pages/vehicle-content-3';

const page = getPage('jeep-wrangler-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={jeepWrangler2026}
      content={WRANGLER}
      mini={{ defaultId: 'wr4-rub-20-a8-410', defaultTrailer: 3500, defaultPeople: 300, defaultCargo: 150 }}
    />
  );
}
