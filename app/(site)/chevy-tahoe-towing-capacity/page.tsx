import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { chevyTahoe2026 } from '@/lib/data/vehicles/chevy-tahoe-2026';
import { TAHOE } from '@/lib/pages/vehicle-content-3';

const page = getPage('chevy-tahoe-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={chevyTahoe2026}
      content={TAHOE}
      mini={{ defaultId: 'tahoe-53-mtp#1', defaultTrailer: 6500, defaultPeople: 450, defaultCargo: 200 }}
    />
  );
}
