import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import VehiclePage from '@/components/VehiclePage';
import { chevyColorado2026 } from '@/lib/data/vehicles/chevy-colorado-2026';
import { COLORADO } from '@/lib/pages/vehicle-content-2';

const page = getPage('chevy-colorado-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return (
    <VehiclePage
      page={page}
      data={chevyColorado2026}
      content={COLORADO}
      mini={{ defaultId: 'col-tow', defaultTrailer: 6500, defaultPeople: 360, defaultCargo: 200 }}
    />
  );
}
