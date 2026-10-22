import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { fordExplorer2026 } from '@/lib/data/vehicles/ford-explorer-2026';
import { EXPLORER } from '@/lib/pages/vehicle-content-2';

const page = getPage('ford-explorer-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={fordExplorer2026}
      content={EXPLORER}
      mini={{ defaultId: 'exp-23-4wd', defaultTrailer: 4000, defaultPeople: 540, defaultCargo: 200 }}
    />
  );
}
