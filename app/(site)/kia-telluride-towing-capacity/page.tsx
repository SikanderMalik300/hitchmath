import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { kiaTelluride2027 } from '@/lib/data/vehicles/kia-telluride-2027';
import { TELLURIDE } from '@/lib/pages/vehicle-content-3';

const page = getPage('kia-telluride-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={kiaTelluride2027}
      content={TELLURIDE}
      mini={{ defaultId: 'tel-ex-awd', defaultTrailer: 4000, defaultPeople: 600, defaultCargo: 200 }}
    />
  );
}
