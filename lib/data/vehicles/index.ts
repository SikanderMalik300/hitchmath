import type { VehicleData } from './types';
import toyotaTacoma2026 from './toyota-tacoma-2026';
import fordF1502026 from './ford-f150-2026';
import toyotaTundra2026 from './toyota-tundra-2026';
import ram15002026 from './ram-1500-2026';
import chevySilverado15002026 from './chevy-silverado-1500-2026';
import toyota4Runner2026 from './toyota-4runner-2026';

export const VEHICLES: VehicleData[] = [
  toyotaTacoma2026,
  fordF1502026,
  toyotaTundra2026,
  ram15002026,
  chevySilverado15002026,
  toyota4Runner2026,
];

export const VEHICLES_BY_SLUG: Record<string, VehicleData> = Object.fromEntries(
  VEHICLES.map((v) => [v.slug, v]),
);

export {
  toyotaTacoma2026,
  fordF1502026,
  toyotaTundra2026,
  ram15002026,
  chevySilverado15002026,
  toyota4Runner2026,
};
export * from './types';
