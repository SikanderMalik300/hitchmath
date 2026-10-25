// Copy for batch-4 heavy-duty pages (30-36). Numbers are filled from the computed
// max tables and the hitch table. Ford 5th-wheel/gooseneck wording is held back
// until step 2, so Ford copy is conventional-only here.
import type { HdContent } from '@/components/HdVehiclePage';

export const F250: HdContent = {
  quickAnswer:
    'The 2026 Ford F-250 tows up to 22,000 lb with a conventional hitch. That maximum needs the 6.7L Power Stroke diesel and the High-Capacity Axle Upgrade Package (535). Without that package, diesel F-250s are rated about 15,500 to 16,600 lb conventional. Fifth-wheel and gooseneck ratings are being added.',
  sections: [
    {
      h2: 'What the 535 package changes',
      body: "Ford requires the High-Capacity Axle Upgrade Package for conventional towing over 18,200 lb, with 18-inch all-season or 20-inch all-terrain tires. It raises the diesel's GCWR from 23,500 to 30,000 lb.",
    },
    {
      h2: 'Gas or diesel?',
      body: 'The 7.3L gas V8 with the 4.30 axle is rated 18,200 lb conventional in every cab. The diesels reach 22,000 lb, but only with the 535 package.',
    },
    {
      h2: 'Tremor tows less',
      body: "With the Tremor Off-Road Package, the hitch is rated 18,200 lb and 1,820 lb of tongue weight. Ford's table lists the Tremor crew cab at 18,200 lb.",
    },
    {
      h2: 'Tongue weight at 10%',
      body: 'A 15,000 lb trailer at 10% puts 1,500 lb on the hitch. That comes out of payload, so check the payload on your door label before you buy the trailer.',
    },
  ],
  notCovered:
    "Ford's guide doesn't print F-250 payload or curb weight in its towing pages, so we don't show them. Our 5th-wheel and gooseneck ratings for this truck are being added and checked.",
  faq: [
    { q: 'How much can a 2026 F-250 tow?', a: 'Up to 22,000 lb conventional, with the 6.7L diesel and the 535 package. Fifth-wheel and gooseneck ratings are being added.' },
    { q: 'Do I need the High-Capacity Axle Upgrade Package?', a: "Only for conventional towing over 18,200 lb, according to Ford's 2026 guide." },
    { q: 'F-250 gas or diesel for towing?', a: 'The 7.3L gas tops out at 18,200 lb conventional. The diesel goes higher with the 535 package.' },
    { q: "What is the F-250's max tongue weight?", a: '2,200 lb on the factory receiver, or 1,820 lb on the Tremor.' },
  ],
};

export const F350: HdContent = {
  quickAnswer:
    'The 2026 Ford F-350 tows up to 28,000 lb conventional as a dually (DRW) and 25,000 lb with single rear wheels (SRW). The highest ratings need the 6.7L High Output diesel. Gooseneck ratings are being added.',
  sections: [
    {
      h2: 'SRW or DRW?',
      body: 'The single-rear-wheel F-350 is capped at 25,000 lb conventional by its hitch, and the dually at 28,000 lb. The receiver is rated 25,000 lb and 2,500 lb of tongue on the SRW, and 28,000 lb and 2,800 lb on the DRW.',
    },
    {
      h2: 'When you get the 3-inch receiver',
      body: 'Ford fits a 3-inch receiver on the F-350 DRW Crew Cab with the 6.7L High Output diesel and the 4.10 axle. Other F-350s use a 2.5-inch receiver.',
    },
    {
      h2: 'Gas or diesel?',
      body: 'The 7.3L gas V8 is rated up to 22,000 lb conventional. The 6.7L High Output diesel reaches 28,000 lb conventional on the dually Crew Cab.',
    },
  ],
  notCovered:
    "Ford's guide doesn't print F-350 payload or curb weight in its towing pages. Our 5th-wheel and gooseneck ratings for this truck are being added and checked.",
  faq: [
    { q: 'How much can a 2026 F-350 tow?', a: 'Up to 28,000 lb conventional as a dually and 25,000 lb with single rear wheels. Gooseneck ratings are being added.' },
    { q: 'F-350 SRW or DRW for towing?', a: 'The dually (DRW) tows up to 28,000 lb conventional, the SRW up to 25,000 lb.' },
    { q: "What is the F-350's max tongue weight?", a: '2,500 lb on the SRW receiver and 2,800 lb on the DRW receiver.' },
    { q: 'F-350 gas or diesel?', a: 'The 7.3L gas tops out at 22,000 lb conventional. The 6.7L High Output diesel reaches 28,000 lb.' },
  ],
};

export const F450: HdContent = {
  quickAnswer:
    'The 2026 Ford F-450 pickup tows up to 30,000 lb with a conventional hitch, as a Crew Cab with the 4.30 axle and a 43,500 lb GCWR. The Regular Cab is rated 25,000 lb conventional. Gooseneck ratings are being added.',
  sections: [
    {
      h2: 'Why the Crew Cab tows more conventional',
      body: 'Ford lists 30,000 lb conventional for the F-450 Crew Cab with the 4.30 axle and 43,500 lb GCWR, and 25,000 lb for the Regular Cab at 46,700 lb GCWR. The F-450 hitch is rated 30,000 lb and 3,000 lb of tongue weight.',
    },
    {
      h2: 'Do you need a CDL?',
      body: 'Not for private towing in most cases, but a 46,700 lb GCWR is well above the 26,001 lb federal commercial threshold for combinations. Commercial use and state rules decide. See our GVWR guide.',
    },
  ],
  notCovered:
    "Ford's guide doesn't print F-450 payload or curb weight in its towing pages. Our 5th-wheel and gooseneck ratings for this truck are being added and checked.",
  faq: [
    { q: 'How much can a 2026 F-450 tow?', a: 'Up to 30,000 lb with a conventional hitch, on the Crew Cab with the 4.30 axle. Gooseneck ratings are being added.' },
    { q: 'Why does the F-450 Crew Cab tow more than the Regular Cab?', a: 'Ford rates the Crew Cab 30,000 lb conventional and the Regular Cab 25,000 lb.' },
    { q: "What is the F-450's max tongue weight?", a: '3,000 lb on the factory receiver.' },
    { q: 'Do you need a CDL to tow with an F-450?', a: "Usually not for private towing, but the GCWR is above the 26,001 lb federal commercial threshold. Check your state's rules." },
  ],
};

export const RAM2500: HdContent = {
  quickAnswer:
    'The 2026 Ram 2500 tows up to 20,000 lb with the 6.7L Cummins High Output diesel, as a Crew Cab with the 3.42 axle. The 6.4L HEMI gas V8 tops out at 17,740 lb. Ram requires a 5th-wheel or gooseneck hitch for trailers over 20,000 lb.',
  sections: [
    {
      h2: '4x2 vs 4x4',
      body: 'Every Ram cell lists 4x2 and 4x4 ratings. The 4x4 is usually rated 300 to 400 lb less, for example 15,540 vs 15,220 lb on the HEMI Regular Cab with the 3.73 axle.',
    },
    {
      h2: 'The 4.10 axle',
      body: 'On the HEMI, the 4.10 axle raises GCWR from 22,050 to 24,250 lb and the rating by about 2,200 lb.',
    },
    {
      h2: 'Power Wagon',
      body: 'The Power Wagon is rated 10,530 lb (4x4), with an 8,565 lb GVWR and 18,000 lb GCWR.',
    },
  ],
  notCovered:
    'Ram counts trailer weight and payload as mutually exclusive, so use the payload table above for cargo and the towing table for trailers.',
  faq: [
    { q: 'How much can a 2026 Ram 2500 tow?', a: 'Up to 20,000 lb with the 6.7L Cummins High Output diesel. The 6.4L HEMI tops out at 17,740 lb.' },
    { q: 'How much can the Ram 2500 HEMI tow?', a: 'Up to 17,740 lb, as a Regular Cab 4x2 with the 4.10 axle.' },
    { q: 'How much can a Ram Power Wagon tow?', a: '10,530 lb, with an 8,565 lb GVWR and 18,000 lb GCWR.' },
    { q: 'Does the Ram 2500 need a special hitch?', a: 'Ram requires a 5th-wheel or gooseneck hitch for trailers over 20,000 lb, and limits the Class V receiver to 2,000 lb of tongue weight.' },
  ],
};

export const RAM3500: HdContent = {
  quickAnswer:
    'The 2026 Ram 3500 tows up to 36,610 lb with the 6.7L Cummins High Output diesel, as a dually Regular Cab with the 3.42 axle and a 45,000 lb GCWR. The 6.4L HEMI tops out at 18,150 lb. Above 23,000 lb, Ram requires a 5th-wheel or gooseneck hitch.',
  sections: [
    {
      h2: 'SRW or DRW?',
      body: 'The dually (DRW) carries the top ratings. The highest, 36,610 lb, needs the High Output Cummins and a 45,000 lb GCWR. Single-rear-wheel 3500s are rated lower.',
    },
    {
      h2: 'The 23,000 lb hitch rule',
      body: 'Ram requires a 5th-wheel or gooseneck hitch for any trailer over 23,000 lb.',
    },
    {
      h2: 'The 2,300 lb Class V tongue limit',
      body: 'Ram limits the Class V receiver to 2,300 lb of tongue weight, which is 23,000 lb of trailer at 10%.',
    },
    {
      h2: 'Do you need a CDL?',
      body: 'Not for most private towing, but a 45,000 lb GCWR is well above the 26,001 lb federal commercial threshold. Commercial use and state rules decide.',
    },
  ],
  notCovered:
    'Ram counts trailer weight and payload as mutually exclusive, so use the payload table above for cargo and the towing table for trailers.',
  faq: [
    { q: 'How much can a 2026 Ram 3500 tow?', a: 'Up to 36,610 lb with the 6.7L Cummins High Output diesel. The 6.4L HEMI tops out at 18,150 lb.' },
    { q: 'How much can the Ram 3500 HEMI tow?', a: 'Up to 18,150 lb, as a Regular Cab 4x2 with the 4.10 axle.' },
    { q: 'Does the Ram 3500 need a 5th-wheel hitch?', a: 'For any trailer over 23,000 lb, yes. Ram limits the Class V receiver to 2,300 lb of tongue weight.' },
    { q: 'Do you need a CDL to tow with a Ram 3500?', a: "Usually not for private towing, but the 45,000 lb GCWR is above the 26,001 lb federal commercial threshold. Check your state's rules." },
  ],
};

export const SILVERADO2500: HdContent = {
  quickAnswer:
    'The 2026 Chevy Silverado 2500 HD tows from 14,500 up to 20,000 lb with a conventional hitch, and up to 22,050 lb with a gooseneck or 5th-wheel. The top ratings need the Duramax 6.6L diesel and the Max Trailering Package. The 6.6L V8 gas tops out at 18,700 lb gooseneck.',
  sections: [
    {
      h2: 'Conventional vs gooseneck',
      body: "Conventional ratings run from 14,500 to 20,000 lb. Gooseneck and 5th-wheel ratings run from 11,760 to 22,050 lb. On a few light-GVWR configs GM prints a lower gooseneck than conventional, and we show the numbers as printed.",
    },
    {
      h2: 'The Max Trailering Package',
      body: 'The 22,050 lb gooseneck rating needs the Duramax 6.6L and the Max Trailering Package, which lifts GCWR to 30,000 lb.',
    },
    {
      h2: 'Gas or Duramax?',
      body: 'The 6.6L V8 gas is rated up to 16,000 lb conventional and 18,700 lb gooseneck. The Duramax reaches 20,000 lb conventional and 22,050 lb gooseneck.',
    },
    {
      h2: "GM's hitch notes",
      body: 'The Z82 Trailering Package adds a hitch platform and a 7-pin connector. UY2 adds a 7-wire camper or fifth-wheel harness and needs Z82.',
    },
  ],
  notCovered:
    "Chevrolet's guide doesn't print 2500 HD payload or curb weight in its trailering charts, so we don't show them.",
  faq: [
    { q: 'How much can a 2026 Silverado 2500 HD tow?', a: 'Up to 20,000 lb conventional and 22,050 lb gooseneck, with the Duramax and the Max Trailering Package.' },
    { q: 'Do all 2500 HDs tow 14,500 lb conventional?', a: 'No. Conventional ratings run from 14,500 up to 20,000 lb depending on the model, engine and package.' },
    { q: 'Gas or Duramax for the 2500 HD?', a: 'The 6.6L gas tops out at 16,000 lb conventional and 18,700 lb gooseneck. The Duramax reaches 20,000 and 22,050 lb.' },
    { q: 'Why is one gooseneck rating lower than conventional?', a: 'On a few light-GVWR configs GM prints a lower gooseneck than conventional. We show the numbers as printed.' },
  ],
};

export const SILVERADO3500: HdContent = {
  quickAnswer:
    'The 2026 Chevy Silverado 3500 HD tows up to 20,000 lb with a conventional hitch and up to 36,000 lb with a gooseneck, as a Duramax dually. Most dually gooseneck ratings are 32,000 lb; 36,000 lb needs the specific configuration in footnote 4.',
  sections: [
    {
      h2: 'SRW or DRW?',
      body: 'The dually Duramax lifts conventional towing to 20,000 lb. Single-rear-wheel 3500s top out at 14,500 lb conventional.',
    },
    {
      h2: '5th-wheel vs gooseneck setup',
      body: 'GM lists separate rows for the 17-inch 5th-wheel and gooseneck setups. The 5th-wheel row is 35,500 / 32,000 lb and the gooseneck row 36,000 / 32,000 lb.',
    },
    {
      h2: 'The footnote 4 condition',
      body: 'The 36,000 lb gooseneck rating requires the WT trim with the Max Trailering Package. Without it, the rating is 35,500 lb.',
    },
    {
      h2: 'Do you need a CDL?',
      body: 'A 43,900 lb GCWR is above the 26,001 lb federal commercial threshold, but most private towing is exempt. Check your state.',
    },
  ],
  notCovered:
    "Chevrolet's guide doesn't print 3500 HD payload or curb weight in its trailering charts, so we don't show them.",
  faq: [
    { q: 'How much can a 2026 Silverado 3500 HD tow?', a: 'Up to 20,000 lb conventional and 36,000 lb gooseneck as a Duramax dually.' },
    { q: 'What does the 36,000 lb gooseneck rating need?', a: 'The WT trim with the Max Trailering Package. Without it the rating is 35,500 lb.' },
    { q: 'How much can a single-rear-wheel 3500 HD tow?', a: 'Up to 14,500 lb conventional, with higher gooseneck ratings on the Duramax.' },
    { q: 'Do you need a CDL to tow with a 3500 HD?', a: "Usually not for private towing, but the 43,900 lb GCWR is above the 26,001 lb federal commercial threshold. Check your state's rules." },
  ],
};
