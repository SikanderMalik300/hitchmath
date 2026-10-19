import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { ram15002026 } from '@/lib/data/vehicles/ram-1500-2026';
import { RAM } from '@/lib/pages/vehicle-content';

const page = getPage('ram-1500-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={ram15002026}
      content={RAM}
      mini={{ defaultId: 'hso', defaultTrailer: 8500, defaultPeople: 360, defaultCargo: 250 }}
    />
  );
}
