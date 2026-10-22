import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { fordMaverick2026 } from '@/lib/data/vehicles/ford-maverick-2026';
import { MAVERICK } from '@/lib/pages/vehicle-content-2';

const page = getPage('ford-maverick-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={fordMaverick2026}
      content={MAVERICK}
      mini={{ defaultId: 'mav-eb-awd-4k', defaultTrailer: 3000, defaultPeople: 360, defaultCargo: 150 }}
    />
  );
}
