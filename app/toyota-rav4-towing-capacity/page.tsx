import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { toyotaRav42026 } from '@/lib/data/vehicles/toyota-rav4-2026';
import { RAV4 } from '@/lib/pages/vehicle-content-2';

const page = getPage('toyota-rav4-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={toyotaRav42026}
      content={RAV4}
      mini={{ defaultId: '4524', defaultTrailer: 2500, defaultPeople: 360, defaultCargo: 150 }}
    />
  );
}
