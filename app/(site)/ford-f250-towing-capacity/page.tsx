import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import HdVehiclePage from '@/components/HdVehiclePage';
import data from '@/lib/data/vehicles/hd/ford-f250-2026';
import { F250 } from '@/lib/pages/vehicle-content-4';

const page = getPage('ford-f250-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return <HdVehiclePage page={page} data={data} content={F250} />;
}
