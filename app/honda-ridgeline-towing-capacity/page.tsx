import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { hondaRidgeline2026 } from '@/lib/data/vehicles/honda-ridgeline-2026';
import { RIDGELINE } from '@/lib/pages/vehicle-content-2';

const page = getPage('honda-ridgeline-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={hondaRidgeline2026}
      content={RIDGELINE}
      mini={{ defaultId: 'rid-sport', defaultTrailer: 4500, defaultPeople: 360, defaultCargo: 150 }}
    />
  );
}
