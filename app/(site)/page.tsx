import type { Metadata } from 'next';
import Link from 'next/link';
import { getPage, PAGES } from '@/lib/registry';
import { buildMetadata } from '@/lib/seo';
import SiteSearch from '@/components/SiteSearch';
import { HeroPhoto } from '@/components/Photo';
import PhotoTile from '@/components/PhotoTile';
import AnswerCard from '@/components/AnswerCard';
import { SectionH2, UpdatedLine } from '@/components/content';
import { ContentGraph } from '@/components/JsonLd';
import { CREDITED_PHOTOS } from '@/lib/data/photos';
import { photoAvailable } from '@/lib/photos-runtime';

const page = getPage('');
export const metadata: Metadata = buildMetadata(page);

const INTRO =
  'Find out if your truck can really tow it. Our calculators run the five checks that matter, tow rating, payload, tongue weight, GCWR and hitch, and our vehicle tables come straight from Ford, Chevrolet, Ram and Toyota documents, with the source on every one.';

const CALCULATORS = ['towing-capacity-calculator', 'payload-calculator', 'tongue-weight-calculator', 'gcwr-calculator'];
const VEHICLES = [
  'toyota-tacoma-towing-capacity',
  'ford-f150-towing-capacity',
  'toyota-tundra-towing-capacity',
  'ram-1500-towing-capacity',
  'chevy-silverado-1500-towing-capacity',
  'toyota-4runner-towing-capacity',
];

const ANSWERS = [
  { text: '2026 Tacoma max towing: 6,500 lb (SR5 and TRD PreRunner XtraCab).', href: '/toyota-tacoma-towing-capacity/', label: 'See the Tacoma page' },
  { text: 'Tongue weight for a 6,000 lb trailer: 600 to 900 lb.', href: '/tongue-weight-calculator/', label: 'Open the tongue weight tool' },
  { text: '2026 F-150 max towing: 13,500 lb (3.5L EcoBoost, Max Tow).', href: '/ford-f150-towing-capacity/', label: 'See the F-150 page' },
];

const TRUST = [
  { h3: 'Maker documents only', body: 'Every number comes from the manufacturer’s towing guide or spec page, with the document and date shown.' },
  { h3: 'The math is on the page', body: 'Each calculator shows its formula and worked examples you can check by hand.' },
  { h3: 'Mistakes fixed in public', body: 'If a number is wrong, we fix it and log the change on our editorial policy page.' },
];

export default function Home() {
  const updates = PAGES.filter((p) => p.category === 'tool' || p.category === 'vehicle');

  return (
    <>
      <ContentGraph page={page} kind="home" />
      {/* Preload the hero image (the LCP element) so it is discovered immediately.
          imageSrcSet/imageSizes match the hero <source> so the right width is used. */}
      {photoAvailable('tow-hero') && (
        <link
          rel="preload"
          as="image"
          type="image/avif"
          imageSrcSet="/images/suv-towing-travel-trailer-desert-road-1280.avif 1280w, /images/suv-towing-travel-trailer-desert-road-960.avif 960w, /images/suv-towing-travel-trailer-desert-road-640.avif 640w"
          imageSizes="(min-width: 768px) 45vw, 100vw"
          fetchPriority="high"
        />
      )}

      {/* Hero: split color block + photo */}
      <section className="border-b border-line">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr]">
            <div className="order-1 bg-band-1 px-4 py-10 sm:px-8 md:py-14">
              <h1 className="text-h1-m md:text-h1 font-medium text-ink">Towing math you can check</h1>
              <p className="mt-4 max-w-prose text-body text-ink">{INTRO}</p>
              <div className="mt-6 max-w-md">
                <SiteSearch />
              </div>
            </div>
            <div className="order-2 h-[220px] md:h-[440px]">
              <HeroPhoto id="tow-hero" label="Towing capacity calculator" />
            </div>
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section className="section-y">
        <div className="container-x">
          <SectionH2>Calculators</SectionH2>
          <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {CALCULATORS.map((slug) => {
              const p = getPage(slug);
              return (
                <PhotoTile key={slug} href={p.path} name={p.tileName ?? p.h1} line={p.tileLine} photoId={p.photoId} />
              );
            })}
          </div>
        </div>
      </section>

      {/* Towing capacity by vehicle */}
      <section className="section-y bg-band-2">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <SectionH2>Towing capacity by vehicle</SectionH2>
            <Link href="/towing-capacity/" prefetch={false} className="link text-small">
              View all
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VEHICLES.map((slug) => {
              const p = getPage(slug);
              return (
                <PhotoTile key={slug} href={p.path} name={p.tileName ?? p.h1} line={p.tileLine} photoId={p.photoId} />
              );
            })}
          </div>
          <div className="mt-6">
            <Link href="/towing-capacity/" prefetch={false} className="link">
              See all 16 vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* Popular answers */}
      <section className="section-y bg-band-4">
        <div className="container-x">
          <SectionH2>Popular answers</SectionH2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {ANSWERS.map((a) => (
              <AnswerCard key={a.href} href={a.href} linkLabel={a.label}>
                {a.text}
              </AnswerCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why trust these numbers */}
      <section className="section-y">
        <div className="container-x">
          <SectionH2>Why trust these numbers</SectionH2>
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
            {TRUST.map((t) => (
              <div key={t.h3}>
                <h3 className="text-h3 font-medium text-ink">{t.h3}</h3>
                <p className="mt-2 text-body text-ink">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest updates */}
      <section className="section-y">
        <div className="container-x">
          <SectionH2>Latest updates</SectionH2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {updates.map((p) => (
              <li key={p.slug} className="flex items-center justify-between gap-4 py-3">
                <Link href={p.path} prefetch={false} className="text-body text-ink hover:text-brand hover:underline underline-offset-2">
                  {p.h1}
                </Link>
                <span className="shrink-0 text-small text-muted tabular">{p.lastUpdated}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <UpdatedLine date={page.lastUpdated} />
          </div>
        </div>
      </section>

      {/* Photo credits */}
      <section className="section-y">
        <div className="container-x">
          <SectionH2>Photo credits</SectionH2>
          <ul className="mt-4 space-y-2 text-small text-muted">
            {CREDITED_PHOTOS.map((photo) => (
              <li key={photo.id}>
                {photo.alt} ·{' '}
                <a href={photo.photographerUrl} target="_blank" rel="noopener" className="link">
                  {photo.photographer}
                </a>{' '}
                /{' '}
                <a href={photo.sourceUrl} target="_blank" rel="noopener" className="link">
                  {photo.source}
                </a>{' '}
                ({photo.license})
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
