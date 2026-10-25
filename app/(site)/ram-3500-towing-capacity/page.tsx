import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import HdVehiclePage from '@/components/HdVehiclePage';
import data from '@/lib/data/vehicles/hd/ram-3500-2026';
import { RAM3500 } from '@/lib/pages/vehicle-content-4';

const page = getPage('ram-3500-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return <HdVehiclePage page={page} data={data} content={RAM3500} />;
}
