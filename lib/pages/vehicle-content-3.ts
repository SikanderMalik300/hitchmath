// Verbatim vehicle-page prose from hitchmath-batch3-spec.md (pages 22 to 29). Do not rewrite (A13).
import type { VehicleContent } from '@/components/VehiclePage';

export const EXPEDITION: VehicleContent = {
  quickAnswer:
    'The 2026 Ford Expedition tows up to 9,600 lb. That rating is for the standard-length Expedition 4x4 with the 3.73 axle and a 15,900 lb GCWR. The Expedition MAX 4x4 is rated 9,000 lb. Two-wheel-drive models are rated 6,000 lb (SWB) and 6,300 lb (MAX).',
  sections: [
    {
      h2: 'Which Expedition tows 9,600 lb?',
      body: "Only the standard-length 4x4 with the 3.73 axle and the 15,900 lb GCWR. With 24-inch wheels it drops to 9,200 lb. The Tremor's High Output engine is listed at 9,300 lb. The longer MAX 4x4 is rated 9,000 lb.",
    },
    {
      h2: 'Over 7,000 lb you need a weight-distributing hitch',
      body: 'With a plain ball mount, Ford limits the Expedition to 7,000 lb and 700 lb on the tongue. A weight-distributing hitch raises that to 9,600 lb and 960 lb on the SWB, or 9,000 lb and 900 lb on the MAX.',
    },
    {
      h2: 'The 960 lb tongue limit sets the real cap',
      body: "Ford's ratings assume a 10% tongue weight. Many travel trailers run 12% to 13%. At 12%, the 960 lb tongue limit matches a trailer of 8,000 lb, not 9,600 lb.",
    },
  ],
  notCovered:
    "Ford's guide doesn't print Expedition payload or curb weight in its towing pages, so we don't show them. Check your door-jamb label for payload.",
  faq: [
    {
      q: 'How much can a 2026 Ford Expedition tow?',
      a: 'Up to 9,600 lb, for the standard-length 4x4 with the 3.73 axle and a weight-distributing hitch.',
    },
    {
      q: 'Can the Expedition MAX tow as much as the regular Expedition?',
      a: 'Not quite. Ford rates the MAX 4x4 at 9,000 lb and the standard-length 4x4 at up to 9,600 lb. In two-wheel drive the MAX is rated higher, 6,300 lb against 6,000 lb.',
    },
    {
      q: 'Do I need a weight-distributing hitch with an Expedition?',
      a: "Yes, for any trailer over 7,000 lb. Ford's guide lists this as required equipment.",
    },
    {
      q: 'Can an Expedition tow a 30-foot travel trailer?',
      a: "It depends on the trailer's weight, not its length. Check the loaded weight and tongue weight against 9,600 lb and 960 lb, and the frontal area against Ford's 60 sq ft limit.",
    },
  ],
};

export const TAHOE: VehicleContent = {
  quickAnswer:
    'The 2026 Chevy Tahoe tows up to 8,400 lb. That rating is for the 5.3L V8 with the Max Trailering Package in 2WD. In 4WD the best is 8,200 lb. With a plain weight-carrying hitch, any Tahoe is limited to 5,000 lb.',
  sections: [
    {
      h2: 'Which Tahoe tows the most?',
      body: 'The 2WD 5.3L V8 with the Max Trailering Package, at 8,400 lb. The 6.2L V8 and the 3.0L Duramax with the package reach 8,200 lb in 2WD. In 4WD, the 5.3L with the package leads at 8,200 lb.',
    },
    {
      h2: 'Weight-carrying vs weight-distributing hitch',
      body: 'Above 600 lb on the tongue, GM requires a weight-distributing hitch and sway control. Without one, the limit is 5,000 lb whatever the engine.',
    },
    {
      h2: 'Does the 6.2L tow more than the 5.3L?',
      body: 'No. In the 2026 guide the 6.2L is rated lower than the 5.3L in every column. With the package it is 8,200 lb in 2WD against 8,400 lb for the 5.3L.',
    },
  ],
  notCovered:
    "Chevrolet's guide doesn't print Tahoe payload or curb weight, so we don't show them. Check the tire and loading label in your door frame.",
  faq: [
    {
      q: 'How much can a 2026 Tahoe tow?',
      a: 'Up to 8,400 lb with the 5.3L V8 and Max Trailering Package in 2WD. Most 4WD Tahoes are rated 7,600 to 8,200 lb.',
    },
    {
      q: 'Does the Tahoe diesel tow more?',
      a: 'Not in 2026. The 3.0L Duramax is rated 8,200 lb in 2WD and 7,900 to 8,000 lb in 4WD. The 5.3L with the package matches or beats it.',
    },
    {
      q: "What is the Tahoe's max tongue weight?",
      a: 'GM lists up to 1,250 lb with a weight-distributing hitch, and 600 lb with a weight-carrying hitch.',
    },
    {
      q: 'Tahoe or Suburban for towing?',
      a: "The Tahoe is rated slightly higher. The 2WD 5.3L with the package is 8,400 lb in a Tahoe and 8,200 lb in a Suburban, from the same page of GM's guide.",
    },
  ],
};

export const SUBURBAN: VehicleContent = {
  quickAnswer:
    'The 2026 Chevy Suburban tows up to 8,200 lb. That rating is for the 5.3L V8 with the Max Trailering Package in 2WD. The 3.0L Duramax is close at 8,100 lb in 2WD. The best 4WD Suburban is rated 8,000 lb.',
  sections: [
    {
      h2: 'Which Suburban tows the most?',
      body: 'In 2WD, the 5.3L with the Max Trailering Package at 8,200 lb. In 4WD, the same engine and package at 8,000 lb. The 6.2L tows less than the 5.3L in every column.',
    },
    {
      h2: 'Why the Suburban is rated lower than the Tahoe',
      body: 'Both share a GCWR of 14,000 or 14,500 lb. The Suburban is longer and heavier, so less of that GCWR is left for the trailer. GM’s ratings already include driver, passengers and fuel.',
    },
    {
      h2: "The diesel's package adds no rating",
      body: 'On the Suburban, the 3.0L Duramax is rated 8,100 lb in 2WD and 7,800 lb in 4WD, with or without the Max Trailering Package.',
    },
  ],
  notCovered:
    "Chevrolet's guide doesn't print Suburban payload or curb weight, so we don't show them.",
  faq: [
    {
      q: 'How much can a 2026 Suburban tow?',
      a: 'Up to 8,200 lb with the 5.3L V8 and Max Trailering Package in 2WD.',
    },
    {
      q: 'Can a Suburban tow 8,000 lbs in 4WD?',
      a: 'Yes, the 5.3L V8 with the Max Trailering Package is rated 8,000 lb in 4WD. Other 4WD versions are rated 7,300 to 7,800 lb.',
    },
    {
      q: 'Does the Suburban need a weight-distributing hitch?',
      a: 'Above 5,000 lb or 600 lb tongue weight, yes. GM requires a weight-distributing hitch and sway control.',
    },
    {
      q: 'Suburban or Tahoe for towing?',
      a: 'The Tahoe is rated 100 to 300 lb higher in each matching column. The Suburban carries more people and cargo inside.',
    },
  ],
};

export const TRAVERSE: VehicleContent = {
  quickAnswer:
    'The 2026 Chevy Traverse tows 5,000 lb with the factory Trailering Package (V92), in FWD or AWD. Without that package it is rated 1,500 lb. The tongue weight limit is 500 lb.',
  sections: [
    {
      h2: 'Check for the V92 package before you tow',
      body: 'GM rates a Traverse without V92 at 1,500 lb. With V92 the GCWR rises from 6,720 to 10,030 lb in FWD and from 7,050 to 10,250 lb in AWD. Ask the dealer to confirm V92 from the VIN.',
    },
    {
      h2: 'The 500 lb tongue limit',
      body: 'At 10%, 500 lb on the tongue matches a 5,000 lb trailer. At 12%, it matches about 4,170 lb.',
    },
  ],
  notCovered:
    "Chevrolet's guide doesn't print Traverse payload or curb weight, so we don't show them.",
  faq: [
    {
      q: 'How much can a 2026 Chevy Traverse tow?',
      a: '5,000 lb with the Trailering Package (V92). Without it, 1,500 lb.',
    },
    {
      q: 'Does AWD change the Traverse tow rating?',
      a: 'No. FWD and AWD are both 1,500 lb without V92 and 5,000 lb with it. AWD has a higher GCWR.',
    },
    {
      q: 'Can a Traverse tow a camper?',
      a: 'With V92, a camper up to 5,000 lb with a tongue weight up to 500 lb. At 12% tongue weight that is a camper of about 4,170 lb.',
    },
  ],
};

export const WRANGLER: VehicleContent = {
  quickAnswer:
    'The 2026 Jeep Wrangler tows 2,000 lb as a 2-door and 3,500 lb as a 4-door. The 4-door Rubicon with the 8-speed automatic and the 4.10 axle is rated 5,000 lb, with the 3.6L V-6 or the 2.0L turbo. The 6.4L V-8 392 models are rated 3,500 lb.',
  sections: [
    {
      h2: 'Which Wrangler tows 5,000 lb?',
      body: 'Only two versions: the 4-door Rubicon with the automatic and the 4.10 axle, with either the 3.6L V-6 or the 2.0L turbo. Both have a 10,300 lb GCWR. Every other 4-door is rated 3,500 lb.',
    },
    {
      h2: 'The 4.56 axle lowers the rating',
      body: 'A Rubicon with the 4.56 axle is rated 3,500 lb, and its GCWR falls to 8,600 lb. It does carry more payload, 1,545 to 1,562 lb against 1,310 to 1,328 lb on the 4.10.',
    },
    {
      h2: 'Payload runs out fast',
      body: 'A 4-door Sahara 2.0L has 1,119 lb of payload. A 3,500 lb trailer at 10% puts 350 lb on the hitch. Two adults at 150 lb each add 300 lb. That leaves 469 lb for gear.',
    },
  ],
  notCovered:
    "Jeep's spec sheet prints no GVWR or tongue limit per version, so we don't show them. Use the label in your door frame.",
  faq: [
    {
      q: 'How much can a Jeep Wrangler tow?',
      a: '2,000 lb as a 2-door, 3,500 lb as a 4-door, and 5,000 lb as a 4-door Rubicon with the automatic and 4.10 axle.',
    },
    {
      q: 'Can a Wrangler tow a camper?',
      a: 'A small one. A 4-door is rated 3,500 lb, so a teardrop or small pop-up can fit. Check tongue weight against payload first.',
    },
    {
      q: 'Does the 392 tow more?',
      a: 'No. Jeep rates the 6.4L V-8 at 3,500 lb, the same as most 4-doors and below the 5,000 lb Rubicon.',
    },
    {
      q: 'Can a 2-door Wrangler tow 3,500 lbs?',
      a: 'No. Jeep rates every 2026 2-door at 2,000 lb.',
    },
  ],
};

export const FRONTIER: VehicleContent = {
  quickAnswer:
    'The 2026 Nissan Frontier tows up to 7,150 lb, as a King Cab S 4x2. Crew Cab models are rated 6,270 to 7,070 lb. Every Frontier uses the 3.8L V6 and the 9-speed automatic, with an 11,960 lb GCWR.',
  sections: [
    {
      h2: 'Which Frontier tows the most?',
      body: 'The lightest one. The King Cab S 4x2 weighs 4,385 lb and is rated 7,150 lb. Every Frontier shares one GCWR, so each extra pound of truck comes off the trailer rating.',
    },
    {
      h2: 'PRO-4X and long beds tow less',
      body: "The PRO-4X short bed is rated 6,680 lb and the PRO-4X long bed 6,270 lb. That's the lowest in the line, 880 lb below the King Cab S 4x2.",
    },
    {
      h2: 'Payload is tight on 4x4 crew cabs',
      body: 'A Crew Cab SV 4x4 has 1,310 lb of payload. A 6,000 lb trailer at 10% puts 600 lb on the hitch. Four adults at 150 lb add 600 lb. That leaves 110 lb for everything else.',
    },
  ],
  notCovered:
    "Nissan doesn't publish the Nissan Towing Guide online that its press kit mentions, so we don't show its hitch limits.",
  faq: [
    {
      q: 'How much can a 2026 Nissan Frontier tow?',
      a: 'Up to 7,150 lb as a King Cab S 4x2. Crew Cabs are rated 6,270 to 7,070 lb.',
    },
    {
      q: 'Does the PRO-4X tow less?',
      a: "Yes. Nissan's brochure rates the PRO-4X at 6,680 lb (short bed) and 6,270 lb (long bed), the lowest in the line.",
    },
    {
      q: 'Does the Frontier come with a hitch?',
      a: 'Not on every grade. Nissan lists a Class IV hitch receiver with the SV and PRO Convenience Packages, and a dealer Tow Package for the King Cab.',
    },
    {
      q: 'Frontier or Tacoma for towing?',
      a: "The Frontier's best rating is 7,150 lb. See our Tacoma page for Toyota's 2026 numbers side by side.",
    },
  ],
};

export const ASCENT: VehicleContent = {
  quickAnswer:
    'Every 2026 Subaru Ascent is rated to tow 5,000 lb. All trims use the 2.4L turbo engine, the CVT and all-wheel drive. For 2024, the Base 8-Passenger was rated only 2,000 lb.',
  sections: [
    {
      h2: 'Every 2026 trim tows the same',
      body: 'Subaru lists 5,000 lb for all seven 2026 trims, from the Premium to the Onyx Edition Touring. Curb weights run from 4,450 to 4,603 lb.',
    },
    {
      h2: 'Buying a used Ascent? Check the trim',
      body: "Subaru's 2024 spec sheet rates the Base 8-Passenger at 2,000 lb. The other 2024 trims are rated 5,000 lb.",
    },
    {
      h2: 'Tongue weight and payload',
      body: "Subaru's spec sheet prints no tongue limit, GVWR or payload. A 5,000 lb trailer at 10% puts 500 lb on the hitch. Find your payload on the door-frame label and subtract that 500 lb first.",
    },
  ],
  notCovered:
    "Subaru doesn't print the Ascent's GVWR, payload or hitch tongue limit in its spec sheet, so we don't show them.",
  faq: [
    {
      q: 'How much can a 2026 Subaru Ascent tow?',
      a: '5,000 lb, on every trim.',
    },
    {
      q: 'Can a Subaru Ascent tow a camper?',
      a: 'A camper up to 5,000 lb loaded. Many small travel trailers fit. Subaru notes that trailer brakes may be needed.',
    },
    {
      q: 'Did older Ascents tow less?',
      a: 'The 2024 Base 8-Passenger was rated 2,000 lb. Other 2024 trims were rated 5,000 lb.',
    },
  ],
};

export const TELLURIDE: VehicleContent = {
  quickAnswer:
    'The 2027 Kia Telluride tows 5,000 lb with the 2.5L turbo gas engine, on every trim and in FWD or AWD. The new hybrid is rated 4,500 lb. Kia made no 2026 Telluride. The 2025 X-Pro was rated 5,500 lb.',
  sections: [
    {
      h2: 'Gas or hybrid for towing?',
      body: 'The gas 2.5L turbo is rated 5,000 lb. The hybrid is rated 4,500 lb, but its higher GVWR gives the hybrid EX AWD the most payload in the line, up to 1,698 lb.',
    },
    {
      h2: 'The X-Pro no longer tows 5,500 lb',
      body: "Kia rated the 2025 EX X-Pro and SX Prestige X-Pro at 5,500 lb. On the 2027 model the X-Pro is rated 5,000 lb, the same as the other gas trims. If you're shopping used, check the model year.",
    },
    {
      h2: 'Payload with a full family',
      body: 'An EX AWD has 1,616 to 1,656 lb of payload. A 5,000 lb trailer at 10% adds 500 lb to the hitch. Six people at 150 lb add 900 lb. That leaves 216 to 256 lb for luggage.',
    },
  ],
  notCovered:
    "Kia doesn't print the Telluride's tongue limit or GCWR, so we don't show them. Check the owner's manual.",
  faq: [
    {
      q: 'How much can a 2027 Kia Telluride tow?',
      a: '5,000 lb with the gas engine and 4,500 lb as a hybrid.',
    },
    {
      q: 'Is there a 2026 Kia Telluride?',
      a: 'No. Kia went from the 2025 model year to the redesigned 2027 Telluride.',
    },
    {
      q: 'Does the Telluride X-Pro tow more?',
      a: 'Not on the 2027 model, which is rated 5,000 lb like other gas trims. The 2025 X-Pro was rated 5,500 lb.',
    },
    {
      q: 'Does the Telluride need a tow package?',
      a: 'Kia says towing requires additional equipment. The integrated tow hitch is standard on X-Pro and optional on other trims.',
    },
  ],
};
