// Every source with id, name shown on site, url, access date (A2, A15).
// Dealer pages and forums are never a source for a number (editorial policy).

export type SourceId =
  | 'ford-guide-2026'
  | 'ford-guide-2025'
  | 'ford-f150-specs-2026'
  | 'gm-guide-2026'
  | 'gm-silverado1500-chart-2026'
  | 'ram-1500-chart-2026'
  | 'toyota-tacoma-specs-2026'
  | 'toyota-tundra-specs-2026'
  | 'toyota-4runner-specs-2026'
  | 'toyota-towing'
  | 'toyota-press-tacoma-2016'
  | 'toyota-press-tacoma-2023'
  | 'toyota-press-tacoma-2024'
  | 'toyota-press-tacoma-2025'
  | 'toyota-press-tundra-2025'
  | 'toyota-press-tundra-2026'
  | 'toyota-press-4runner-2026'
  | 'cfr-571-110'
  | 'cfr-575-6'
  | 'curt-hitch-classes'
  | 'curt-5th-wheel'
  | 'weighsafe-measure'
  | 'equalizer-tongue'
  | 'usgs-water'
  | 'nrvta-80'
  | 'j2807-overview'
  | 'forestriver-defs'
  | 'chevy-silverado1500-page-2026'
  | 'toyota-highlander-specs-2026'
  | 'toyota-rav4-specs-2026'
  | 'toyota-press-rav4-2026'
  | 'honda-ridgeline-specs-2026'
  | 'honda-pilot-specs-2026'
  | 'subaru-outback-specs-2026'
  | 'jeep-wrangler-specs-2026'
  | 'jeep-wrangler-specs-2026-pdf'
  | 'nissan-frontier-brochure-2026'
  | 'nissan-frontier-presskit-2026'
  | 'subaru-ascent-specs-2026'
  | 'subaru-ascent-specs-2024'
  | 'kia-telluride-specs-2027'
  | 'kia-telluride-hev-specs-2027'
  | 'kia-telluride-specs-2025'
  | 'cfr-571-3'
  | 'cfr-567-4'
  | 'cfr-383-91';

export interface Source {
  id: SourceId;
  name: string;
  url: string;
  accessed: string; // ISO date
}

const ACCESSED = '2026-10-19';
const ACCESSED3 = '2026-10-23'; // batch 3

export const SOURCES: Record<SourceId, Source> = {
  'ford-guide-2026': {
    id: 'ford-guide-2026',
    name: 'Ford, 2026 RV & Trailer Towing Guide',
    url: 'https://www.ford.com/content/dam/brand_ford/en_us/brand/towing/pdf/2026-Ford-RV-and-Trailer-Towing-Guide-v2.pdf',
    accessed: '2026-10-20',
  },
  'ford-guide-2025': {
    id: 'ford-guide-2025',
    name: 'Ford, 2025 RV & Trailer Towing Guide',
    url: 'https://www.vdm.ford.com/content/dam/brand_ford/en_us/brand/towing/pdf/2025-Ford-RV-and-Trailer-Towing-Guide.pdf',
    accessed: ACCESSED,
  },
  'ford-f150-specs-2026': {
    id: 'ford-f150-specs-2026',
    name: 'Ford, 2026 F-150 Technical Specifications (v1.1, 03/31/26)',
    url: 'https://www.fromtheroad.ford.com/content/dam/fordmediasite/us/en/library/2026/specs/2026_Ford_F150_Specs.pdf',
    accessed: ACCESSED,
  },
  'gm-guide-2026': {
    id: 'gm-guide-2026',
    name: 'Chevrolet, 2026 Trailering Guide',
    url: 'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/trucks/trailering-and-towing/news/v2/CH-CAT-GEN-TRBRND020_2026%20Chevrolet%20Trailering%20Guidev2.pdf',
    accessed: ACCESSED,
  },
  'gm-silverado1500-chart-2026': {
    id: 'gm-silverado1500-chart-2026',
    name: 'Chevrolet, 2026 Silverado 1500 trailering chart',
    url: 'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/trucks/trailering-and-towing/2026_Silverado_1500_Max.pdf',
    accessed: ACCESSED,
  },
  'ram-1500-chart-2026': {
    id: 'ram-1500-chart-2026',
    name: 'Ram, 2026 Ram 1500 Payload & Towing chart',
    url: 'https://www.ramtrucks.com/content/dam/fca-brands/na/ramtrucks/en_us/towing/towing-capacity-guide/brochure/26MY_Ram_1500_PayTow_2.3.pdf',
    accessed: ACCESSED,
  },
  'toyota-tacoma-specs-2026': {
    id: 'toyota-tacoma-specs-2026',
    name: 'Toyota, 2026 Tacoma full specifications (Weights/Capacities)',
    url: 'https://www.toyota.com/tacoma/features/weights_capacities',
    accessed: ACCESSED,
  },
  'toyota-tundra-specs-2026': {
    id: 'toyota-tundra-specs-2026',
    name: 'Toyota, 2026 Tundra full specifications (Weights/Capacities)',
    url: 'https://www.toyota.com/tundra/features/weights_capacities',
    accessed: ACCESSED,
  },
  'toyota-4runner-specs-2026': {
    id: 'toyota-4runner-specs-2026',
    name: 'Toyota, 2026 4Runner full specifications (Weights/Capacities)',
    url: 'https://www.toyota.com/4runner/features/weights_capacities',
    accessed: ACCESSED,
  },
  'toyota-towing': {
    id: 'toyota-towing',
    name: 'Toyota, Toyotas for towing',
    url: 'https://www.toyota.com/toyotas-for-towing/',
    accessed: ACCESSED,
  },
  'toyota-press-tacoma-2016': {
    id: 'toyota-press-tacoma-2016',
    name: 'Toyota Pressroom, 2016 Tacoma debut',
    url: 'https://pressroom.toyota.com/2016-toyota-tacoma-debut-aug17/',
    accessed: ACCESSED,
  },
  'toyota-press-tacoma-2023': {
    id: 'toyota-press-tacoma-2023',
    name: 'Toyota Pressroom, 2023 Tacoma',
    url: 'https://pressroom.toyota.com/?generate_pdf=74790',
    accessed: ACCESSED,
  },
  'toyota-press-tacoma-2024': {
    id: 'toyota-press-tacoma-2024',
    name: 'Toyota Pressroom, 2024 Tacoma',
    url: 'https://pressroom.toyota.com/?generate_pdf=84109',
    accessed: ACCESSED,
  },
  'toyota-press-tacoma-2025': {
    id: 'toyota-press-tacoma-2025',
    name: 'Toyota Pressroom, 2025 Tacoma',
    url: 'https://pressroom.toyota.com/?generate_pdf=97924',
    accessed: ACCESSED,
  },
  'toyota-press-tundra-2025': {
    id: 'toyota-press-tundra-2025',
    name: 'Toyota Pressroom, 2025 Tundra',
    url: 'https://pressroom.toyota.com/2025-toyota-tundra-adds-trd-rally-package-and-more/',
    accessed: ACCESSED,
  },
  'toyota-press-tundra-2026': {
    id: 'toyota-press-tundra-2026',
    name: 'Toyota Pressroom, 2026 Tundra',
    url: 'https://pressroom.toyota.com/2026-toyota-tundra-a-bold-new-chapter-in-full-size-pickup-excellence/',
    accessed: ACCESSED,
  },
  'toyota-press-4runner-2026': {
    id: 'toyota-press-4runner-2026',
    name: 'Toyota Pressroom, 2026 4Runner',
    url: 'https://pressroom.toyota.com/?generate_pdf=110691',
    accessed: ACCESSED,
  },
  'cfr-571-110': {
    id: 'cfr-571-110',
    name: '49 CFR 571.110 (tire and loading placard)',
    url: 'https://www.law.cornell.edu/cfr/text/49/571.110',
    accessed: ACCESSED,
  },
  'cfr-575-6': {
    id: 'cfr-575-6',
    name: "49 CFR 575.6 (owner's manual load steps)",
    url: 'https://www.law.cornell.edu/cfr/text/49/575.6',
    accessed: ACCESSED,
  },
  'curt-hitch-classes': {
    id: 'curt-hitch-classes',
    name: 'CURT, Types of trailer hitches',
    url: 'https://www.curtmfg.com/types-trailer-hitches',
    accessed: ACCESSED,
  },
  'curt-5th-wheel': {
    id: 'curt-5th-wheel',
    name: 'CURT, 5th wheel hitches 101',
    url: 'https://www.curtmfg.com/5th-wheel-hitches-101',
    accessed: ACCESSED,
  },
  'weighsafe-measure': {
    id: 'weighsafe-measure',
    name: 'Weigh Safe, How to measure tongue weight',
    url: 'https://www.weigh-safe.com/towing-safety/how-to-measure-tongue-weight',
    accessed: ACCESSED,
  },
  'equalizer-tongue': {
    id: 'equalizer-tongue',
    name: 'Equal-i-zer, Why tongue weight matters',
    url: 'https://www.equalizerhitch.com/blog/why-is-tongue-weight-so-important/',
    accessed: ACCESSED,
  },
  'usgs-water': {
    id: 'usgs-water',
    name: 'USGS, How much does water weigh',
    url: 'https://www.usgs.gov/index.php/special-topics/water-science-school/science/a-million-gallons-water-how-much-it',
    accessed: ACCESSED,
  },
  'nrvta-80': {
    id: 'nrvta-80',
    name: 'National RV Training Academy, RV towing',
    url: 'https://nrvta.com/rv-towing-is-your-truck-up-to-the-challenge/',
    accessed: ACCESSED,
  },
  'j2807-overview': {
    id: 'j2807-overview',
    name: 'Truck Parts & Service, SAE J2807 overview',
    url: 'https://www.truckpartsandservice.com/home/article/15046832/tow-ratings-sae-j2807-overview',
    accessed: ACCESSED,
  },
  'forestriver-defs': {
    id: 'forestriver-defs',
    name: 'Forest River, RV definitions',
    url: 'https://www.forestriverinc.com/RV-DEFINITIONS',
    accessed: ACCESSED,
  },
  'chevy-silverado1500-page-2026': {
    id: 'chevy-silverado1500-page-2026',
    name: 'Chevrolet, 2026 Silverado 1500 product page',
    url: 'https://www.chevrolet.com/trucks/previous-year/silverado/1500',
    accessed: '2026-10-20',
  },
  'toyota-highlander-specs-2026': {
    id: 'toyota-highlander-specs-2026',
    name: 'Toyota, 2026 Highlander specifications (Weights/Capacities)',
    url: 'https://www.toyota.com/highlander/features/weights_capacities',
    accessed: '2026-10-21',
  },
  'toyota-rav4-specs-2026': {
    id: 'toyota-rav4-specs-2026',
    name: 'Toyota, 2026 RAV4 specifications (Weights/Capacities)',
    url: 'https://www.toyota.com/rav4/features/weights_capacities',
    accessed: '2026-10-21',
  },
  'toyota-press-rav4-2026': {
    id: 'toyota-press-rav4-2026',
    name: 'Toyota Newsroom, The Next Adventure Begins: 2026 RAV4 Arrives this Winter',
    url: 'https://pressroom.toyota.com/the-next-adventure-begins-2026-rav4-arrives-this-winter/',
    accessed: '2026-10-21',
  },
  'honda-ridgeline-specs-2026': {
    id: 'honda-ridgeline-specs-2026',
    name: 'Honda News, 2026 Honda Ridgeline Specifications & Features',
    url: 'https://hondanews.com/en-US/honda-automobiles/releases/release-cc341be273b56f82f9ccdc8fe2000550-2026-honda-ridgeline-specifications-features',
    accessed: '2026-10-21',
  },
  'honda-pilot-specs-2026': {
    id: 'honda-pilot-specs-2026',
    name: 'Honda News, 2026 Honda Pilot Specifications & Features',
    url: 'https://hondanews.com/en-US/honda-automobiles/releases/release-14c469388b7fed5af247fc02e2009aa7-2026-honda-pilot-specifications-features',
    accessed: '2026-10-21',
  },
  'subaru-outback-specs-2026': {
    id: 'subaru-outback-specs-2026',
    name: 'Subaru, 2026 Outback trim comparison (Compare Specs)',
    url: 'https://www.subaru.com/services/vehicles/pdf/trimComparison/2026/OBK',
    accessed: '2026-10-21',
  },
  'jeep-wrangler-specs-2026': {
    id: 'jeep-wrangler-specs-2026',
    name: 'Stellantis Media, 2026 Jeep Wrangler Specifications',
    url: 'https://media.stellantisnorthamerica.com/view-spec.do?id=27221',
    accessed: ACCESSED3,
  },
  'jeep-wrangler-specs-2026-pdf': {
    id: 'jeep-wrangler-specs-2026-pdf',
    name: '2026 Jeep Wrangler Specifications (PDF)',
    url: 'https://s3.amazonaws.com/chryslermedia.iconicweb.com/mediasite/specs/2026_JP_Wrangler_SPl4u58u77eeicb0t51n2lc8s5fg.pdf',
    accessed: ACCESSED3,
  },
  'nissan-frontier-brochure-2026': {
    id: 'nissan-frontier-brochure-2026',
    name: 'Nissan, 2026 Frontier brochure (Capacities/Towing/Payload, p. 12)',
    url: 'https://www.nissanusa.com/content/dam/Nissan/us/vehicle-brochures/2026/2026-nissan-frontier-brochure-en.pdf',
    accessed: ACCESSED3,
  },
  'nissan-frontier-presskit-2026': {
    id: 'nissan-frontier-presskit-2026',
    name: 'Nissan News, 2026 Nissan Frontier Press Kit',
    url: 'https://usa.nissannews.com/en-US/releases/2026-nissan-frontier-press-kit',
    accessed: ACCESSED3,
  },
  'subaru-ascent-specs-2026': {
    id: 'subaru-ascent-specs-2026',
    name: 'Subaru, 2026 Ascent trim comparison (Compare Specs)',
    url: 'https://www.subaru.com/services/vehicles/pdf/trimComparison/2026/ASC',
    accessed: ACCESSED3,
  },
  'subaru-ascent-specs-2024': {
    id: 'subaru-ascent-specs-2024',
    name: 'Subaru, 2024 Ascent trim comparison (Compare Specs)',
    url: 'https://www.subaru.com/services/vehicles/pdf/trimComparison/2024/ASC',
    accessed: ACCESSED3,
  },
  'kia-telluride-specs-2027': {
    id: 'kia-telluride-specs-2027',
    name: 'Kia America Media, 2027 Telluride specifications',
    url: 'https://www.kiamedia.com/us/en/models/telluride/2027/specifications',
    accessed: ACCESSED3,
  },
  'kia-telluride-hev-specs-2027': {
    id: 'kia-telluride-hev-specs-2027',
    name: 'Kia America Media, 2027 Telluride HEV specifications',
    url: 'https://www.kiamedia.com/us/en/models/telluride-hev/2027/specifications',
    accessed: ACCESSED3,
  },
  'kia-telluride-specs-2025': {
    id: 'kia-telluride-specs-2025',
    name: 'Kia America Media, 2025 Telluride specifications',
    url: 'https://www.kiamedia.com/us/en/models/telluride/2025/specifications',
    accessed: ACCESSED3,
  },
  'cfr-571-3': {
    id: 'cfr-571-3',
    name: '49 CFR 571.3, Definitions (eCFR via Cornell LII)',
    url: 'https://www.law.cornell.edu/cfr/text/49/571.3',
    accessed: ACCESSED3,
  },
  'cfr-567-4': {
    id: 'cfr-567-4',
    name: '49 CFR 567.4, Requirements for manufacturers of motor vehicles',
    url: 'https://www.law.cornell.edu/cfr/text/49/567.4',
    accessed: ACCESSED3,
  },
  'cfr-383-91': {
    id: 'cfr-383-91',
    name: '49 CFR 383.91, Commercial motor vehicle groups',
    url: 'https://www.law.cornell.edu/cfr/text/49/383.91',
    accessed: ACCESSED3,
  },
};

export function getSource(id: SourceId): Source {
  const s = SOURCES[id];
  if (!s) throw new Error(`Unknown source id: ${id}`);
  return s;
}

export function getSources(ids: SourceId[]): Source[] {
  return ids.map(getSource);
}
