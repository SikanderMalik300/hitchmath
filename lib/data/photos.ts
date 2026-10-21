// Every image slot (hitchmath-photos.md + day-1.1 fixes). All 8 formerly-pending
// slots are now verified with checked Unsplash/Pexels photos. A slot only falls
// back to a colour block if its processed files are missing (photo-manifest.json).

export type PhotoId =
  | 'tow-hero'
  | 'tongue-scale'
  | 'payload-bed'
  | 'scale-ticket'
  | 'tacoma'
  | 'f150'
  | 'tundra'
  | 'ram1500'
  | 'silverado'
  | '4runner'
  | 'maverick'
  | 'highlander'
  | 'rav4'
  | 'ranger'
  | 'ridgeline'
  | 'colorado'
  | 'bronco'
  | 'explorer'
  | 'pilot'
  | 'outback';

export interface Photo {
  id: PhotoId;
  file: string; // base file name without extension, in /images
  sourceUrl: string;
  photographer: string;
  photographerUrl: string;
  source: 'Unsplash' | 'Pexels' | 'Owner';
  license: 'Unsplash License' | 'Pexels License' | '';
  alt: string;
  focalX: number; // 0-100
  focalY: number; // 0-100
  usedOn: string[]; // slugs
  status: 'verified' | 'pending';
}

export const PHOTOS: Record<PhotoId, Photo> = {
  'tow-hero': {
    id: 'tow-hero',
    file: 'suv-towing-travel-trailer-desert-road',
    sourceUrl: 'https://unsplash.com/photos/black-suv-and-white-trailer-CfhtS2nj95c',
    photographer: 'Benjamin Zanatta',
    photographerUrl: 'https://unsplash.com/@benjaminzanatta',
    source: 'Unsplash',
    license: 'Unsplash License',
    alt: 'Dark SUV towing a white travel trailer on a desert road',
    focalX: 55,
    focalY: 62,
    usedOn: ['', 'towing-capacity-calculator'],
    status: 'verified',
  },
  'tongue-scale': {
    id: 'tongue-scale',
    file: 'tow-ball-hitch-close-up',
    sourceUrl: 'https://www.pexels.com/photo/close-up-photo-of-a-tow-hitch-on-a-vehicle-12833615/',
    photographer: 'Csaba Nagy',
    photographerUrl: 'https://www.pexels.com/@csaba-nagy',
    source: 'Pexels',
    license: 'Pexels License',
    alt: "Close-up of a tow ball hitch on a vehicle's rear bumper",
    focalX: 42,
    focalY: 45,
    usedOn: ['tongue-weight-calculator'],
    status: 'verified',
  },
  'payload-bed': {
    id: 'payload-bed',
    file: 'pickup-bed-loaded-logs',
    sourceUrl: 'https://www.pexels.com/photo/men-loading-cut-down-tree-logs-onto-a-pick-up-truck-14279588/',
    photographer: 'Luis Quintero',
    photographerUrl: 'https://www.pexels.com/@jibarofoto/',
    source: 'Pexels',
    license: 'Pexels License',
    alt: 'Pickup truck bed being loaded with cut logs',
    focalX: 50,
    focalY: 60,
    usedOn: ['payload-calculator'],
    status: 'verified',
  },
  'scale-ticket': {
    id: 'scale-ticket',
    file: 'pickup-towing-cabin-trailer',
    sourceUrl: 'https://www.pexels.com/photo/pick-up-with-mobile-home-on-trailer-25396350/',
    photographer: 'Natalia S',
    photographerUrl: 'https://www.pexels.com/@planka/',
    source: 'Pexels',
    license: 'Pexels License',
    alt: 'Dark pickup towing a small wooden cabin on a flatbed trailer',
    focalX: 45,
    focalY: 60,
    usedOn: ['gcwr-calculator'],
    status: 'verified',
  },
  tacoma: {
    id: 'tacoma',
    file: 'gray-tacoma-mountain-valley',
    sourceUrl: 'https://unsplash.com/photos/1DWOnSP_HjM',
    photographer: 'Blake Carpenter',
    photographerUrl: 'https://unsplash.com/@blakepnw',
    source: 'Unsplash',
    license: 'Unsplash License',
    alt: 'Gray Toyota Tacoma parked on a grassy valley floor below mountains',
    focalX: 48,
    focalY: 62,
    usedOn: ['toyota-tacoma-towing-capacity'],
    status: 'verified',
  },
  f150: {
    id: 'f150',
    file: 'red-f150-travel-trailer-desert',
    sourceUrl: 'https://unsplash.com/photos/QXSUg-9Cgik',
    photographer: 'John Schnick',
    photographerUrl: 'https://unsplash.com/@johnschnick',
    source: 'Unsplash',
    license: 'Unsplash License',
    alt: 'Red Ford F-150 hitched to a silver travel trailer at a desert campsite',
    focalX: 50,
    focalY: 68,
    usedOn: ['ford-f150-towing-capacity'],
    status: 'verified',
  },
  tundra: {
    id: 'tundra',
    file: 'pickup-towing-boat-coastal-road',
    sourceUrl: 'https://unsplash.com/photos/dcprs36lAsY',
    photographer: 'Liosha Shyp',
    photographerUrl: 'https://unsplash.com/@liosha_shyp',
    source: 'Unsplash',
    license: 'Unsplash License',
    alt: 'Pickup towing a fishing boat along a coastal mountain road',
    focalX: 15,
    focalY: 62,
    usedOn: ['toyota-tundra-towing-capacity'],
    status: 'verified',
  },
  ram1500: {
    id: 'ram1500',
    file: 'gray-pickup-hitched-travel-trailer',
    sourceUrl: 'https://unsplash.com/photos/5FQuPgsCSeI',
    photographer: 'John Steinbeck',
    photographerUrl: 'https://unsplash.com/@parbuckle',
    source: 'Unsplash',
    license: 'Unsplash License',
    alt: 'Light gray pickup hitched to a silver travel trailer on gravel',
    focalX: 40,
    focalY: 55,
    usedOn: ['ram-1500-towing-capacity'],
    status: 'verified',
  },
  silverado: {
    id: 'silverado',
    file: 'silver-pickup-livestock-trailer',
    sourceUrl: 'https://unsplash.com/photos/o27hYxRHP-M',
    photographer: 'Howard R Wheeler',
    photographerUrl: 'https://unsplash.com/@hrw2003',
    source: 'Unsplash',
    license: 'Unsplash License',
    alt: 'Silver pickup hitched to a livestock trailer with horses in a field',
    focalX: 20,
    focalY: 60,
    usedOn: ['chevy-silverado-1500-towing-capacity'],
    status: 'verified',
  },
  '4runner': {
    id: '4runner',
    file: 'white-suv-boat-launch-ramp',
    sourceUrl: 'https://www.pexels.com/photo/a-white-suv-parked-on-the-shore-next-to-a-boat-27706384/',
    photographer: 'Helena Jankovičová Kováčová',
    photographerUrl: 'https://www.pexels.com/@helen1/',
    source: 'Pexels',
    license: 'Pexels License',
    alt: 'White SUV backing a boat trailer down a sandy launch ramp',
    focalX: 62,
    focalY: 55,
    usedOn: ['toyota-4runner-towing-capacity'],
    status: 'verified',
  },
  maverick: {
    id: 'maverick',
    file: 'orange-pickup-hilltop-camp',
    sourceUrl: 'https://www.pexels.com/photo/person-sitting-on-hilltop-in-countryside-26743193/',
    photographer: 'Quang Nguyen Vinh',
    photographerUrl: 'https://www.pexels.com/@quang-nguyen-vinh-222549/',
    source: 'Pexels',
    license: 'Pexels License',
    alt: 'Orange pickup with a side awning parked on a grassy hilltop above the mountains',
    focalX: 25,
    focalY: 60,
    usedOn: ['ford-maverick-towing-capacity'],
    status: 'verified',
  },
  highlander: {
    id: 'highlander',
    file: 'highlander-towing-trailer-mountain-lake',
    sourceUrl: 'https://unsplash.com/photos/Dx5Lq0k7hkU',
    photographer: 'Zihao Wang',
    photographerUrl: 'https://unsplash.com/@zihao_wang',
    source: 'Unsplash',
    license: 'Unsplash License',
    alt: 'Toyota Highlander towing a small travel trailer past a mountain lake',
    focalX: 45,
    focalY: 70,
    usedOn: ['toyota-highlander-towing-capacity'],
    status: 'verified',
  },
  rav4: {
    id: 'rav4',
    file: 'small-vintage-trailer-green-field',
    sourceUrl: 'https://unsplash.com/photos/JKmjElTIG5I',
    photographer: 'Lance Anderson',
    photographerUrl: 'https://unsplash.com/@lanceanderson',
    source: 'Unsplash',
    license: 'Unsplash License',
    alt: 'Small vintage travel trailer parked in a green field under a blue sky',
    focalX: 70,
    focalY: 70,
    usedOn: ['toyota-rav4-towing-capacity'],
    status: 'verified',
  },
  ranger: {
    id: 'ranger',
    file: 'orange-midsize-pickup-mountain-ridge',
    sourceUrl: 'https://www.pexels.com/photo/orange-car-in-a-valley-18864554/',
    photographer: 'M.Emin BİLİR',
    photographerUrl: 'https://www.pexels.com/@travelerchitect/',
    source: 'Pexels',
    license: 'Pexels License',
    alt: 'Orange midsize pickup on a grassy ridge below snowy mountains',
    focalX: 45,
    focalY: 65,
    usedOn: ['ford-ranger-towing-capacity'],
    status: 'verified',
  },
  ridgeline: {
    id: 'ridgeline',
    file: 'silver-pickup-dirt-road-valley',
    sourceUrl: 'https://www.pexels.com/photo/a-silver-pickup-truck-driving-on-dirt-road-5652670/',
    photographer: 'Julia Volk',
    photographerUrl: 'https://www.pexels.com/@julia-volk/',
    source: 'Pexels',
    license: 'Pexels License',
    alt: 'Silver pickup driving away on a dirt road through a grassy valley',
    focalX: 50,
    focalY: 70,
    usedOn: ['honda-ridgeline-towing-capacity'],
    status: 'verified',
  },
  colorado: {
    id: 'colorado',
    file: 'pickup-rooftop-tent-grassland',
    sourceUrl: 'https://www.pexels.com/photo/4x4-cars-on-grassland-17767192/',
    photographer: 'Jenny Uhling',
    photographerUrl: 'https://www.pexels.com/@jenny-uhling-2262740/',
    source: 'Pexels',
    license: 'Pexels License',
    alt: 'Pickup with a rooftop tent camped on open grassland in the hills',
    focalX: 55,
    focalY: 65,
    usedOn: ['chevy-colorado-towing-capacity'],
    status: 'verified',
  },
  bronco: {
    id: 'bronco',
    file: 'offroad-suvs-mountain-campsite',
    sourceUrl: 'https://www.pexels.com/photo/vehicles-parked-on-camp-site-9899941/',
    photographer: 'Jaime Reimer',
    photographerUrl: 'https://www.pexels.com/@jaime-reimer-1376930/',
    source: 'Pexels',
    license: 'Pexels License',
    alt: 'Two off-road SUVs at a mountain campsite, one with a rooftop tent',
    focalX: 55,
    focalY: 65,
    usedOn: ['ford-bronco-towing-capacity'],
    status: 'verified',
  },
  explorer: {
    id: 'explorer',
    file: 'white-suv-roof-box-desert',
    sourceUrl: 'https://unsplash.com/photos/6MD6LYNdeFc',
    photographer: 'R Chang',
    photographerUrl: 'https://unsplash.com/@nerdspeed',
    source: 'Unsplash',
    license: 'Unsplash License',
    alt: 'White SUV with a roof box parked in the desert under a clear sky',
    focalX: 60,
    focalY: 70,
    usedOn: ['ford-explorer-towing-capacity'],
    status: 'verified',
  },
  pilot: {
    id: 'pilot',
    file: 'white-suv-rooftop-tent-lake',
    sourceUrl: 'https://www.pexels.com/photo/suv-car-with-tent-on-top-placed-on-lake-shore-in-sunlight-6271666/',
    photographer: 'Uriel Mont',
    photographerUrl: 'https://www.pexels.com/@uriel-mont/',
    source: 'Pexels',
    license: 'Pexels License',
    alt: 'White SUV with a rooftop tent on a sunny lake shore',
    focalX: 55,
    focalY: 55,
    usedOn: ['honda-pilot-towing-capacity'],
    status: 'verified',
  },
  outback: {
    id: 'outback',
    file: 'small-car-teardrop-trailer-field',
    sourceUrl: 'https://www.pexels.com/photo/vehicle-with-a-trailer-parked-on-grass-field-5458436/',
    photographer: 'Isaac Cedercrantz',
    photographerUrl: 'https://www.pexels.com/@isaac-cedercrantz-3623507/',
    source: 'Pexels',
    license: 'Pexels License',
    alt: 'Small car hitched to a teardrop trailer in a misty field',
    focalX: 50,
    focalY: 80,
    usedOn: ['subaru-outback-towing-capacity'],
    status: 'verified',
  },
};

export const PHOTO_LIST: Photo[] = Object.values(PHOTOS);

/** Verified photos, for the homepage "Photo credits" section. */
export const CREDITED_PHOTOS: Photo[] = PHOTO_LIST.filter((p) => p.status === 'verified');

export function getPhoto(id: PhotoId): Photo {
  return PHOTOS[id];
}
