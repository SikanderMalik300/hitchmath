import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { toyotaHighlander2026 } from '@/lib/data/vehicles/toyota-highlander-2026';
import { HIGHLANDER } from '@/lib/pages/vehicle-content-2';

const page = getPage('toyota-highlander-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={toyotaHighlander2026}
      content={HIGHLANDER}
      mini={{ defaultId: '6953', defaultTrailer: 3500, defaultPeople: 540, defaultCargo: 200 }}
    />
  );
}
