import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { chevySuburban2026 } from '@/lib/data/vehicles/chevy-suburban-2026';
import { SUBURBAN } from '@/lib/pages/vehicle-content-3';

const page = getPage('chevy-suburban-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={chevySuburban2026}
      content={SUBURBAN}
      mini={{ defaultId: 'sub-53-mtp#1', defaultTrailer: 6500, defaultPeople: 600, defaultCargo: 250 }}
    />
  );
}
