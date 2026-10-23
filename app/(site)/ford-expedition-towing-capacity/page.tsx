import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { fordExpedition2026 } from '@/lib/data/vehicles/ford-expedition-2026';
import { EXPEDITION } from '@/lib/pages/vehicle-content-3';

const page = getPage('ford-expedition-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={fordExpedition2026}
      content={EXPEDITION}
      mini={{ defaultId: 'exp-swb-4x4', defaultTrailer: 7000, defaultPeople: 450, defaultCargo: 200 }}
    />
  );
}
