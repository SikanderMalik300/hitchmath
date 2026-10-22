import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { toyota4Runner2026 } from '@/lib/data/vehicles/toyota-4runner-2026';
import { FOURRUNNER } from '@/lib/pages/vehicle-content';

const page = getPage('toyota-4runner-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={toyota4Runner2026}
      content={FOURRUNNER}
      mini={{ defaultId: '8664', defaultTrailer: 5000, defaultPeople: 540, defaultCargo: 200 }}
    />
  );
}
