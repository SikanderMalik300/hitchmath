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
  | '4runner';

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
    focalX: 30,
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
    focalX: 45,
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
};

export const PHOTO_LIST: Photo[] = Object.values(PHOTOS);

/** Verified photos, for the homepage "Photo credits" section. */
export const CREDITED_PHOTOS: Photo[] = PHOTO_LIST.filter((p) => p.status === 'verified');

export function getPhoto(id: PhotoId): Photo {
  return PHOTOS[id];
}
