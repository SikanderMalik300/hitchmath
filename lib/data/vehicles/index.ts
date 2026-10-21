import type { VehicleData } from './types';
import toyotaTacoma2026 from './toyota-tacoma-2026';
import fordF1502026 from './ford-f150-2026';
import toyotaTundra2026 from './toyota-tundra-2026';
import ram15002026 from './ram-1500-2026';
import chevySilverado15002026 from './chevy-silverado-1500-2026';
import toyota4Runner2026 from './toyota-4runner-2026';
import fordMaverick2026 from './ford-maverick-2026';
import toyotaHighlander2026 from './toyota-highlander-2026';
import toyotaRav42026 from './toyota-rav4-2026';
import fordRanger2026 from './ford-ranger-2026';
import hondaRidgeline2026 from './honda-ridgeline-2026';
import chevyColorado2026 from './chevy-colorado-2026';
import fordBronco2026 from './ford-bronco-2026';
import fordExplorer2026 from './ford-explorer-2026';
import hondaPilot2026 from './honda-pilot-2026';
import subaruOutback2026 from './subaru-outback-2026';

export const VEHICLES: VehicleData[] = [
  toyotaTacoma2026,
  fordF1502026,
  toyotaTundra2026,
  ram15002026,
  chevySilverado15002026,
  toyota4Runner2026,
  fordMaverick2026,
  toyotaHighlander2026,
  toyotaRav42026,
  fordRanger2026,
  hondaRidgeline2026,
  chevyColorado2026,
  fordBronco2026,
  fordExplorer2026,
  hondaPilot2026,
  subaruOutback2026,
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
  fordMaverick2026,
  toyotaHighlander2026,
  toyotaRav42026,
  fordRanger2026,
  hondaRidgeline2026,
  chevyColorado2026,
  fordBronco2026,
  fordExplorer2026,
  hondaPilot2026,
  subaruOutback2026,
};
export * from './types';
