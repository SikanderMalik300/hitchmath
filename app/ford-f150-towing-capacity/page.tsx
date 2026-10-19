import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { fordF1502026 } from '@/lib/data/vehicles/ford-f150-2026';
import { F150 } from '@/lib/pages/vehicle-content';

const page = getPage('ford-f150-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={fordF1502026}
      content={F150}
      mini={{ defaultId: '35-4x4', defaultTrailer: 9000, defaultPeople: 360, defaultCargo: 250 }}
    />
  );
}
