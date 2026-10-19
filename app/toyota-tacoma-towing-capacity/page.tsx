import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { toyotaTacoma2026 } from '@/lib/data/vehicles/toyota-tacoma-2026';
import { TACOMA } from '@/lib/pages/vehicle-content';

const page = getPage('toyota-tacoma-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={toyotaTacoma2026}
      content={TACOMA}
      mini={{ defaultId: '7544', defaultTrailer: 4800, defaultPeople: 360, defaultCargo: 200 }}
    />
  );
}
