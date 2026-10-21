import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { fordBronco2026 } from '@/lib/data/vehicles/ford-bronco-2026';
import { BRONCO } from '@/lib/pages/vehicle-content-2';

const page = getPage('ford-bronco-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={fordBronco2026}
      content={BRONCO}
      mini={{ defaultId: 'br-27-470-4d#0', defaultTrailer: 3000, defaultPeople: 360, defaultCargo: 200 }}
    />
  );
}
