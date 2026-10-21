import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { fordRanger2026 } from '@/lib/data/vehicles/ford-ranger-2026';
import { RANGER } from '@/lib/pages/vehicle-content-2';

const page = getPage('ford-ranger-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={fordRanger2026}
      content={RANGER}
      mini={{ defaultId: 'rng-27-4x4', defaultTrailer: 6000, defaultPeople: 360, defaultCargo: 200 }}
    />
  );
}
