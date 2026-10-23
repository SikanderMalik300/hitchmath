import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { chevyTraverse2026 } from '@/lib/data/vehicles/chevy-traverse-2026';
import { TRAVERSE } from '@/lib/pages/vehicle-content-3';

const page = getPage('chevy-traverse-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={chevyTraverse2026}
      content={TRAVERSE}
      mini={{ defaultId: 'trav-awd-v92', defaultTrailer: 3500, defaultPeople: 450, defaultCargo: 150 }}
    />
  );
}
