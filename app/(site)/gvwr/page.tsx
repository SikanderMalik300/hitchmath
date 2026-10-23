import type { Metadata } from 'next';
import Link from 'next/link';
import { getPage } from '@/lib/registry';
import { buildMetadata, ogImagePath } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ContentGraph, type Crumb, type FaqItem } from '@/components/JsonLd';
import { QuickAnswer, SectionH2, Related } from '@/components/content';
import { RefTable } from '@/components/Tables';
import { FigurePhoto } from '@/components/Photo';
import PayloadCalculator from '@/components/calculators/PayloadCalculator';
import Faq from '@/components/Faq';
import Sources from '@/components/Sources';
import AuthorBox from '@/components/AuthorBox';
import Disclaimer from '@/components/Disclaimer';
import AdSlot from '@/components/AdSlot';

const page = getPage('gvwr');
export const metadata: Metadata = buildMetadata(page);

const FAQ: FaqItem[] = [
  {
    q: 'What does GVWR mean?',
    a: 'Gross vehicle weight rating. It is the most the vehicle may weigh when fully loaded, as set by the maker.',
  },
  {
    q: 'Does GVWR include the trailer?',
    a: "No. GVWR covers the vehicle only. The trailer's tongue weight counts toward GVWR, but the rest of the trailer counts toward GCWR.",
  },
  {
    q: 'Is GVWR the same as towing capacity?',
    a: 'No. Towing capacity is the heaviest trailer the vehicle may pull. GVWR is the heaviest the vehicle itself may be. A vehicle can be under its towing capacity and still over its GVWR.',
  },
  {
    q: 'How do I calculate payload from GVWR?',
    a: 'Subtract the curb weight from the GVWR. Use the GVWR on your door label and weigh the vehicle if you can, because options add weight.',
  },
  {
    q: 'Can I raise my GVWR?',
    a: "Not legally by adding parts. The GVWR is the maker's rating on the certification label. Upgraded springs or tires don't change it.",
  },
  {
    q: 'Where is the GVWR sticker?',
    a: "On the driver's door edge or the door-latch pillar, on the certification label.",
  },
];

export default function Page() {
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Towing calculators', path: '/towing-calculators/' },
    { name: 'GVWR', path: page.path },
  ];

  return (
    <article className="container-x section-y">
      <ContentGraph
        page={page}
        kind="vehicle"
        crumbs={crumbs}
        faq={FAQ}
        image={ogImagePath(page.slug)}
      />

      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-4 text-h1-m md:text-h1 font-medium text-ink">{page.h1}</h1>

      <div className="mt-6 max-w-prose">
        <QuickAnswer>
          GVWR (gross vehicle weight rating) is the most your vehicle may weigh with everything in
          it: the vehicle, people, cargo, and the trailer&apos;s tongue weight. The maker sets it and
          prints it on the label in the driver&apos;s door frame. Payload is GVWR minus curb weight.
        </QuickAnswer>
      </div>

      <div className="mt-10 max-w-prose space-y-8 prose-body text-body text-ink">
        <section className="space-y-3">
          <SectionH2>What GVWR means</SectionH2>
          <p>
            Federal rules define GVWR as the value the maker specifies as the loaded weight of a
            single vehicle. It is a limit for the vehicle alone. The trailer&apos;s weight is not part
            of it, but the part of the trailer that rests on the hitch is.
          </p>
        </section>

        <section className="space-y-3">
          <SectionH2>Where to find your GVWR</SectionH2>
          <p>
            Look on the certification label on the driver&apos;s door edge or door-latch pillar.
            Federal rules require the GVWR there in pounds, along with a GAWR for each axle. The tire
            and loading placard nearby gives the most people and cargo the vehicle should carry.
          </p>
        </section>

        <section className="space-y-3">
          <SectionH2>GVWR, curb weight and payload</SectionH2>
          <p>
            Curb weight is the vehicle with standard equipment and full fuel, oil and coolant.
            Payload is what&apos;s left: GVWR minus curb weight. Payload must cover every person, all
            cargo, any added accessories and the trailer&apos;s tongue weight.
          </p>
          <RefTable
            caption="Worked example from Kia's 2027 Telluride specifications."
            columns={['Vehicle', 'GVWR', 'Curb weight', 'Payload (GVWR − curb)']}
            rows={[['2027 Kia Telluride EX AWD', '6,261 lb', '4,605 to 4,645 lb', '1,616 to 1,656 lb']]}
          />
        </section>

        <section className="space-y-3">
          <SectionH2>Tongue weight counts against GVWR</SectionH2>
          <p>
            A 5,000 lb trailer at 10% puts 500 lb on the hitch. That 500 lb comes out of payload.
            Four adults at 150 lb each add 600 lb. Together that is 1,100 lb before any luggage.
          </p>
          <p>On the Telluride EX AWD above, that leaves 516 to 556 lb for cargo, coolers and gear.</p>
        </section>

        <section className="space-y-3">
          <SectionH2>GVWR vs GAWR vs GCWR vs towing capacity</SectionH2>
          <RefTable
            caption="Four weight ratings and where each one is printed."
            columns={['Rating', 'What it limits', 'Where to find it']}
            rows={[
              ['GVWR', 'The loaded vehicle', 'Door-frame label'],
              ['GAWR', 'Each axle, front and rear', 'Door-frame label'],
              ['GCWR', 'Vehicle plus loaded trailer together', "Maker's towing guide or owner's manual"],
              ['Max trailer weight', 'The trailer alone', "Maker's towing guide"],
            ]}
          />
          <p>
            You must stay under all four at once. Our{' '}
            <Link href="/towing-capacity-calculator/" className="link">
              towing capacity calculator
            </Link>{' '}
            checks them together.
          </p>
        </section>

        <section className="space-y-3">
          <SectionH2>Same GVWR, different payload</SectionH2>
          <p>
            Makers often give several trims one GVWR. Heavier trims then carry less. On the 2027
            Telluride AWD, every gas trim has a 6,261 lb GVWR. The X-Pro trims weigh up to 4,736 lb,
            so their payload starts at 1,525 lb.
          </p>
        </section>

        <section className="space-y-3">
          <SectionH2>When GVWR matters for a license</SectionH2>
          <p>
            For private towing, most pickups and SUVs are far below federal commercial thresholds.
            Federal rules put a single vehicle in commercial Group B at a GVWR of 26,001 lb or more.
            A combination is in Group A at a GCWR of 26,001 lb or more when the trailer&apos;s GVWR is
            over 10,000 lb. Commercial license rules also depend on use and on your state, so check
            your state&apos;s rules.
          </p>
        </section>
      </div>

      <div className="mt-10 max-w-calc">
        <FigurePhoto id="gvwr" label={page.h1} />
      </div>

      <div className="mt-10">
        <PayloadCalculator />
      </div>

      <AdSlot />

      <div className="mt-10 max-w-prose space-y-8">
        <section className="space-y-3">
          <SectionH2>What this page doesn&apos;t cover</SectionH2>
          <p className="prose-body text-body text-ink">
            This page explains the rating. It doesn&apos;t replace your door-jamb label, which lists
            the GVWR for your exact vehicle.
          </p>
        </section>

        <Faq items={FAQ} />
        <Related slugs={page.related ?? []} />
        <Sources ids={page.sources ?? []} />
        <AuthorBox lastUpdated={page.lastUpdated} />
        <Disclaimer />
      </div>
    </article>
  );
}
