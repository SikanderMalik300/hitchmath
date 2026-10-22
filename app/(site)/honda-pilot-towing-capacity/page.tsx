import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { hondaPilot2026 } from '@/lib/data/vehicles/honda-pilot-2026';
import { PILOT } from '@/lib/pages/vehicle-content-2';

const page = getPage('honda-pilot-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={hondaPilot2026}
      content={PILOT}
      mini={{ defaultId: 'plt-touring', defaultTrailer: 4000, defaultPeople: 540, defaultCargo: 200 }}
    />
  );
}
