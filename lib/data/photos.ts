// Every image slot (hitchmath-photos.md). Pending slots render a --band-2 colour
// block with the page name until the browser agent verifies them. No placeholder
// stock image, no broken image.

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
    file: '',
    sourceUrl: '',
    photographer: '',
    photographerUrl: '',
    source: 'Unsplash',
    license: '',
    alt: 'Pickup bed loaded with cargo',
    focalX: 50,
    focalY: 50,
    usedOn: ['payload-calculator'],
    status: 'pending',
  },
  'scale-ticket': {
    id: 'scale-ticket',
    file: '',
    sourceUrl: '',
    photographer: '',
    photographerUrl: '',
    source: 'Unsplash',
    license: '',
    alt: 'Truck and trailer on a truck-stop scale',
    focalX: 50,
    focalY: 50,
    usedOn: ['gcwr-calculator'],
    status: 'pending',
  },
  tacoma: {
    id: 'tacoma',
    file: '',
    sourceUrl: '',
    photographer: '',
    photographerUrl: '',
    source: 'Unsplash',
    license: '',
    alt: 'Midsize pickup towing a small camper',
    focalX: 50,
    focalY: 50,
    usedOn: ['toyota-tacoma-towing-capacity'],
    status: 'pending',
  },
  f150: {
    id: 'f150',
    file: '',
    sourceUrl: '',
    photographer: '',
    photographerUrl: '',
    source: 'Unsplash',
    license: '',
    alt: 'Full-size pickup towing a travel trailer on a highway',
    focalX: 50,
    focalY: 50,
    usedOn: ['ford-f150-towing-capacity'],
    status: 'pending',
  },
  tundra: {
    id: 'tundra',
    file: '',
    sourceUrl: '',
    photographer: '',
    photographerUrl: '',
    source: 'Pexels',
    license: '',
    alt: 'Full-size pickup with a boat trailer',
    focalX: 50,
    focalY: 50,
    usedOn: ['toyota-tundra-towing-capacity'],
    status: 'pending',
  },
  ram1500: {
    id: 'ram1500',
    file: '',
    sourceUrl: '',
    photographer: '',
    photographerUrl: '',
    source: 'Unsplash',
    license: '',
    alt: 'Pickup towing a cargo or car trailer',
    focalX: 50,
    focalY: 50,
    usedOn: ['ram-1500-towing-capacity'],
    status: 'pending',
  },
  silverado: {
    id: 'silverado',
    file: '',
    sourceUrl: '',
    photographer: '',
    photographerUrl: '',
    source: 'Unsplash',
    license: '',
    alt: 'Pickup towing a horse or livestock trailer in daylight',
    focalX: 50,
    focalY: 50,
    usedOn: ['chevy-silverado-1500-towing-capacity'],
    status: 'pending',
  },
  '4runner': {
    id: '4runner',
    file: '',
    sourceUrl: '',
    photographer: '',
    photographerUrl: '',
    source: 'Unsplash',
    license: '',
    alt: 'SUV towing a small off-road trailer or teardrop',
    focalX: 50,
    focalY: 50,
    usedOn: ['toyota-4runner-towing-capacity'],
    status: 'pending',
  },
};

export const PHOTO_LIST: Photo[] = Object.values(PHOTOS);

/** Verified photos used on the homepage, for the "Photo credits" section. */
export const CREDITED_PHOTOS: Photo[] = PHOTO_LIST.filter((p) => p.status === 'verified');

export function getPhoto(id: PhotoId): Photo {
  return PHOTOS[id];
}
