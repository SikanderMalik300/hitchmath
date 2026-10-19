import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { toyotaTundra2026 } from '@/lib/data/vehicles/toyota-tundra-2026';
import { TUNDRA } from '@/lib/pages/vehicle-content';

const page = getPage('toyota-tundra-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={toyotaTundra2026}
      content={TUNDRA}
      mini={{ defaultId: '8241', defaultTrailer: 9000, defaultPeople: 400, defaultCargo: 350 }}
    />
  );
}
