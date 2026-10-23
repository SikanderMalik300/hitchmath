import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { nissanFrontier2026 } from '@/lib/data/vehicles/nissan-frontier-2026';
import { FRONTIER } from '@/lib/pages/vehicle-content-3';

const page = getPage('nissan-frontier-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={nissanFrontier2026}
      content={FRONTIER}
      mini={{ defaultId: 'fr-cc-sv-4x4', defaultTrailer: 5000, defaultPeople: 450, defaultCargo: 150 }}
    />
  );
}
