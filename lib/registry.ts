// Single source of truth for every page (A2). Titles, metas and H1s are copied
// word for word from the build spec. Hub/trust/legal metas are added strings that
// follow the writing rules (A13), since the spec does not supply them.

import type { SourceId } from './data/sources';
import type { PhotoId } from './data/photos';

export type Category = 'home' | 'tool' | 'vehicle' | 'hub' | 'trust' | 'legal';

export interface PageEntry {
  slug: string; // '' for home
  path: string; // trailing-slash URL path
  title: string; // <= 60 chars
  meta: string; // <= 155 chars
  h1: string;
  category: Category;
  description: string; // one-line, used on /sitemap/ and tiles
  tileName?: string; // short name for tiles
  tileLine?: string; // muted line under a tile
  related?: string[]; // slugs
  lastUpdated: string; // ISO date; changes only when content changes
  sources?: SourceId[];
  photoId?: PhotoId;
  ownerNote?: string; // empty in v1
  inSitemap: boolean; // listed in sitemap.xml and /sitemap/
}

const UPDATED = '2026-10-19';

function p(slug: string): string {
  return slug === '' ? '/' : `/${slug}/`;
}

export const PAGES: PageEntry[] = [
  {
    slug: '',
    path: '/',
    title: 'HitchMath: Towing Capacity, Payload and Tongue Weight Math',
    meta: "Free towing calculators that show their math, and towing tables for popular trucks and SUVs copied from the makers' own guides.",
    h1: 'Towing math you can check',
    category: 'home',
    description: 'Towing calculators and vehicle towing tables from manufacturer documents.',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  // Tool pages
  {
    slug: 'towing-capacity-calculator',
    path: '/towing-capacity-calculator/',
    title: 'Towing Capacity Calculator: Can My Truck Tow It? | HitchMath',
    meta: "Check a trailer against your truck's tow rating, payload, tongue weight and GCWR in one go. Shows the math and every limit you'd hit.",
    h1: 'Towing capacity calculator: can my truck tow it?',
    category: 'tool',
    description: 'Run all five towing checks together and see the first limit you would hit.',
    tileName: 'Towing capacity calculator',
    tileLine: 'All five checks in one: trailer, payload, tongue, GCWR and hitch.',
    related: [
      'payload-calculator',
      'tongue-weight-calculator',
      'gcwr-calculator',
      'toyota-tacoma-towing-capacity',
      'ford-f150-towing-capacity',
    ],
    sources: [
      'toyota-tacoma-specs-2026',
      'ford-guide-2026',
      'gm-guide-2026',
      'ram-1500-chart-2026',
      'j2807-overview',
      'cfr-571-110',
      'nrvta-80',
      'usgs-water',
    ],
    photoId: 'tow-hero',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'payload-calculator',
    path: '/payload-calculator/',
    title: 'Payload Calculator: How Much Can My Truck Carry? | HitchMath',
    meta: "Add up passengers, cargo, accessories and tongue weight against your truck's payload. Uses the door-jamb number and shows what's left.",
    h1: 'Payload calculator: how much can my truck carry?',
    category: 'tool',
    description: 'Add people, cargo, accessories and tongue weight against your payload.',
    tileName: 'Payload calculator',
    tileLine: 'Door-jamb payload minus people, cargo and tongue weight.',
    related: [
      'towing-capacity-calculator',
      'tongue-weight-calculator',
      'gcwr-calculator',
      'toyota-tundra-towing-capacity',
    ],
    sources: [
      'toyota-tacoma-specs-2026',
      'toyota-tundra-specs-2026',
      'cfr-571-110',
      'cfr-575-6',
      'usgs-water',
    ],
    photoId: 'payload-bed',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'tongue-weight-calculator',
    path: '/tongue-weight-calculator/',
    title: 'Tongue Weight Calculator: 10 to 15% Rule, Shown | HitchMath',
    meta: 'Find the right tongue weight for any trailer, check a measured number, or use the bathroom-scale method. Bumper-pull and fifth wheel.',
    h1: 'Tongue weight calculator',
    category: 'tool',
    description: 'Tongue weight range, a measured-weight check, and the bathroom-scale method.',
    tileName: 'Tongue weight',
    tileLine: 'The 10 to 15% range, with the OEM sources behind it.',
    related: ['towing-capacity-calculator', 'payload-calculator', 'gcwr-calculator'],
    sources: ['gm-guide-2026', 'ford-guide-2026', 'curt-5th-wheel', 'weighsafe-measure', 'equalizer-tongue'],
    photoId: 'tongue-scale',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'gcwr-calculator',
    path: '/gcwr-calculator/',
    title: 'GCWR Calculator: Combined Weight Check | HitchMath',
    meta: 'Add your loaded truck and trailer and compare it with GCWR. See the heaviest trailer your GCWR allows and which limit is lower.',
    h1: 'GCWR calculator: combined truck and trailer weight',
    category: 'tool',
    description: 'Compare loaded truck plus trailer with GCWR, both directions.',
    tileName: 'GCWR calculator',
    tileLine: 'Truck plus trailer against the combined weight rating.',
    related: [
      'towing-capacity-calculator',
      'payload-calculator',
      'chevy-silverado-1500-towing-capacity',
      'ford-f150-towing-capacity',
    ],
    sources: ['gm-guide-2026', 'ford-guide-2026', 'ram-1500-chart-2026', 'j2807-overview'],
    photoId: 'scale-ticket',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  // Vehicle pages
  {
    slug: 'toyota-tacoma-towing-capacity',
    path: '/toyota-tacoma-towing-capacity/',
    title: 'Toyota Tacoma Towing Capacity 2026: Every Trim | HitchMath',
    meta: "The 2026 Tacoma tows 3,500 to 6,500 lb depending on grade, cab and engine. All 27 configurations from Toyota's own specs, plus payload.",
    h1: 'Toyota Tacoma towing capacity (2026): every trim and configuration',
    category: 'vehicle',
    description: 'All 27 configurations of the 2026 Tacoma with payload, GVWR and tongue limit.',
    tileName: 'Tacoma towing',
    tileLine: '2026, 3,500 to 6,500 lb',
    related: [
      'toyota-tundra-towing-capacity',
      'toyota-4runner-towing-capacity',
      'towing-capacity-calculator',
      'tongue-weight-calculator',
      'payload-calculator',
    ],
    sources: [
      'toyota-tacoma-specs-2026',
      'toyota-press-tacoma-2016',
      'toyota-press-tacoma-2023',
      'toyota-press-tacoma-2024',
      'toyota-press-tacoma-2025',
      'toyota-towing',
    ],
    photoId: 'tacoma',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'ford-f150-towing-capacity',
    path: '/ford-f150-towing-capacity/',
    title: 'F-150 Towing Capacity 2026: By Engine and Axle | HitchMath',
    meta: "The 2026 F-150 tows 8,200 to 13,500 lb. Max tow and payload for every engine from Ford's own towing guide and spec sheet, with GCWR.",
    h1: 'Ford F-150 towing capacity (2026): by engine, axle and package',
    category: 'vehicle',
    description: 'Every 2026 F-150 engine with max tow, payload and the GCWR rows behind them.',
    tileName: 'F-150 towing',
    tileLine: '2026, 8,200 to 13,500 lb',
    related: [
      'ram-1500-towing-capacity',
      'chevy-silverado-1500-towing-capacity',
      'gcwr-calculator',
      'towing-capacity-calculator',
      'payload-calculator',
    ],
    sources: ['ford-f150-specs-2026', 'ford-guide-2026', 'ford-guide-2025'],
    photoId: 'f150',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'toyota-tundra-towing-capacity',
    path: '/toyota-tundra-towing-capacity/',
    title: 'Toyota Tundra Towing Capacity 2026: All 32 Trims | HitchMath',
    meta: "The 2026 Tundra tows 8,300 to 12,000 lb. Every grade, cab, bed and drive from Toyota's own specs, with payload and GVWR.",
    h1: 'Toyota Tundra towing capacity (2026): every trim and configuration',
    category: 'vehicle',
    description: 'All 32 configurations of the 2026 Tundra with payload and GVWR.',
    tileName: 'Tundra towing',
    tileLine: '2026, 8,300 to 12,000 lb',
    related: [
      'toyota-tacoma-towing-capacity',
      'ford-f150-towing-capacity',
      'payload-calculator',
      'towing-capacity-calculator',
    ],
    sources: ['toyota-tundra-specs-2026', 'toyota-press-tundra-2025', 'toyota-press-tundra-2026'],
    photoId: 'tundra',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'ram-1500-towing-capacity',
    path: '/ram-1500-towing-capacity/',
    title: 'Ram 1500 Towing Capacity 2026: By Engine | HitchMath',
    meta: "The 2026 Ram 1500 tows up to 11,610 lb with the Hurricane I6 and 11,320 lb with the returning 5.7L HEMI. Every engine's max tow and payload.",
    h1: 'Ram 1500 towing capacity (2026): every engine',
    category: 'vehicle',
    description: 'Every 2026 Ram 1500 engine with max tow and payload from Ram’s chart.',
    tileName: 'Ram 1500 towing',
    tileLine: '2026, up to 11,610 lb',
    related: [
      'ford-f150-towing-capacity',
      'chevy-silverado-1500-towing-capacity',
      'towing-capacity-calculator',
      'gcwr-calculator',
    ],
    sources: ['ram-1500-chart-2026', 'j2807-overview'],
    photoId: 'ram1500',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'chevy-silverado-1500-towing-capacity',
    path: '/chevy-silverado-1500-towing-capacity/',
    title: 'Silverado 1500 Towing Capacity 2026: All Engines | HitchMath',
    meta: "The 2026 Silverado 1500 tows 8,700 to 13,300 lb. Every engine, cab and box with GCWR from Chevrolet's 2026 Trailering Guide.",
    h1: 'Chevy Silverado 1500 towing capacity (2026): every engine, cab and box',
    category: 'vehicle',
    description: 'Every 2026 Silverado 1500 engine, cab and box with GCWR.',
    tileName: 'Silverado 1500 towing',
    tileLine: '2026, 8,700 to 13,300 lb',
    related: [
      'ford-f150-towing-capacity',
      'ram-1500-towing-capacity',
      'gcwr-calculator',
      'towing-capacity-calculator',
    ],
    sources: ['gm-guide-2026', 'gm-silverado1500-chart-2026'],
    photoId: 'silverado',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'toyota-4runner-towing-capacity',
    path: '/toyota-4runner-towing-capacity/',
    title: 'Toyota 4Runner Towing Capacity 2026: Every Trim | HitchMath',
    meta: 'The 2026 4Runner tows 6,000 lb in most trims and 5,800 lb in the Trailhunter, TRD Pro and Platinum. All 16 versions with payload.',
    h1: 'Toyota 4Runner towing capacity (2026): every trim',
    category: 'vehicle',
    description: 'All 16 versions of the 2026 4Runner with payload computed from Toyota specs.',
    tileName: '4Runner towing',
    tileLine: '2026, 5,800 to 6,000 lb',
    related: [
      'toyota-tacoma-towing-capacity',
      'toyota-tundra-towing-capacity',
      'towing-capacity-calculator',
      'payload-calculator',
    ],
    sources: ['toyota-4runner-specs-2026', 'toyota-press-4runner-2026'],
    photoId: '4runner',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  // Hubs
  {
    slug: 'towing-calculators',
    path: '/towing-calculators/',
    title: 'Towing Calculators: Payload, Tongue Weight, GCWR | HitchMath',
    meta: 'Four towing calculators that show their math: the full towing check, payload, tongue weight and GCWR. Start with the one that fits your question.',
    h1: 'Towing calculators',
    category: 'hub',
    description: 'The four towing calculators and which one to start with.',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'towing-capacity',
    path: '/towing-capacity/',
    title: 'Towing Capacity by Vehicle: 2026 Trucks and SUVs | HitchMath',
    meta: "2026 towing ratings for popular trucks and SUVs, copied from the makers' own guides and spec pages, with payload and the source on every page.",
    h1: 'Towing capacity by vehicle',
    category: 'hub',
    description: '2026 towing ratings by vehicle, from manufacturer guides and spec pages.',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  // Trust pages
  {
    slug: 'about',
    path: '/about/',
    title: 'About HitchMath: Towing Math You Can Check | HitchMath',
    meta: 'HitchMath answers one question: can your truck safely tow what you want to tow? Calculators that show their math and tables from maker documents.',
    h1: 'About HitchMath',
    category: 'trust',
    description: 'What HitchMath is and who runs it.',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'authors/sikander-mushtaq',
    path: '/authors/sikander-mushtaq/',
    title: 'Sikander Mushtaq, HitchMath Author | HitchMath',
    meta: 'Sikander Mushtaq builds the HitchMath calculators and checks every towing and payload figure against the maker’s own guide or spec page.',
    h1: 'Sikander Mushtaq',
    category: 'trust',
    description: 'The person behind HitchMath.',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'how-we-calculate',
    path: '/how-we-calculate/',
    title: 'How We Calculate: Sources and Formulas | HitchMath',
    meta: 'Where HitchMath numbers come from, what the ratings assume, the four formulas, and the rules of thumb we label as rules of thumb.',
    h1: 'How we calculate',
    category: 'trust',
    description: 'Sources, assumptions, formulas and constants behind the numbers.',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'editorial-policy',
    path: '/editorial-policy/',
    title: 'Editorial Policy and Corrections | HitchMath',
    meta: 'Who writes HitchMath, the sources rule, how we handle conflicting documents, how we use AI, our update policy and the corrections log.',
    h1: 'Editorial policy',
    category: 'trust',
    description: 'Sources rule, conflicts rule, AI use, updates and corrections.',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'contact',
    path: '/contact/',
    title: 'Contact HitchMath | HitchMath',
    meta: 'Email HitchMath or use the contact form. Report a towing number that does not match your door-jamb sticker or owner’s manual.',
    h1: 'Contact',
    category: 'trust',
    description: 'Reach HitchMath by form or email.',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  // Legal pages
  {
    slug: 'privacy',
    path: '/privacy/',
    title: 'Privacy Policy | HitchMath',
    meta: 'How HitchMath handles data: Cloudflare hosting and analytics, Web3Forms for the contact form, and Google Analytics 4 only when it is turned on.',
    h1: 'Privacy policy',
    category: 'legal',
    description: 'What data HitchMath collects and which processors it uses.',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'terms',
    path: '/terms/',
    title: 'Terms of Use | HitchMath',
    meta: 'The terms for using HitchMath calculators and content, including the planning-only nature of the figures.',
    h1: 'Terms of use',
    category: 'legal',
    description: 'Terms for using the site and its calculators.',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'disclaimer',
    path: '/disclaimer/',
    title: 'Disclaimer | HitchMath',
    meta: 'HitchMath figures come from manufacturer documents and are for planning only. Your door-jamb sticker and a scale ticket are the final word.',
    h1: 'Disclaimer',
    category: 'legal',
    description: 'The figures are for planning only.',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'affiliate-disclosure',
    path: '/affiliate-disclosure/',
    title: 'Affiliate Disclosure | HitchMath',
    meta: 'HitchMath has no affiliate links at the moment. When added, they are marked and use rel sponsored nofollow, and never change a number.',
    h1: 'Affiliate disclosure',
    category: 'legal',
    description: 'No affiliate links at launch; how they will be marked later.',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
  {
    slug: 'sitemap',
    path: '/sitemap/',
    title: 'Sitemap | HitchMath',
    meta: 'Every HitchMath page with a one-line description: the calculators, the vehicle towing pages, the hubs and the trust and legal pages.',
    h1: 'Sitemap',
    category: 'legal',
    description: 'Every page on HitchMath.',
    lastUpdated: UPDATED,
    inSitemap: true,
  },
];

export const PAGES_BY_SLUG: Record<string, PageEntry> = Object.fromEntries(
  PAGES.map((pg) => [pg.slug, pg]),
);

export function getPage(slug: string): PageEntry {
  const pg = PAGES_BY_SLUG[slug];
  if (!pg) throw new Error(`Unknown page slug: ${slug}`);
  return pg;
}

export function pagesByCategory(cat: Category): PageEntry[] {
  return PAGES.filter((pg) => pg.category === cat);
}

export const SITE = {
  name: 'HitchMath',
  domain: 'https://hitchmath.com',
  email: 'hello@hitchmath.com',
  author: 'Sikander Mushtaq',
  authorPath: '/authors/sikander-mushtaq/',
  authorPersonId: 'https://hitchmath.com/authors/sikander-mushtaq/#person',
} as const;

export function absUrl(path: string): string {
  return `${SITE.domain}${path}`;
}

export { p as pathForSlug };
