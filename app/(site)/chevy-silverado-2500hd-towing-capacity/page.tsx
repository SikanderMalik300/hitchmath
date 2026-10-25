import type { Metadata } from 'next';
import { getPage } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import HdVehiclePage from '@/components/HdVehiclePage';
import data from '@/lib/data/vehicles/hd/chevy-silverado-2500hd-2026';
import { SILVERADO2500 } from '@/lib/pages/vehicle-content-4';

const page = getPage('chevy-silverado-2500hd-towing-capacity');
export const metadata: Metadata = buildMetadata(page);

export default function Page() {
  return <HdVehiclePage page={page} data={data} content={SILVERADO2500} />;
}
