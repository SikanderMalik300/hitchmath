// Verbatim vehicle-page prose from hitchmath-batch2-spec.md (pages 11 to 20). Do not rewrite (A13).
import type { VehicleContent } from '@/components/VehiclePage';

export const MAVERICK: VehicleContent = {
  quickAnswer:
    "The 2026 Ford Maverick tows 2,000 lb as standard. With all-wheel drive and the 4K Tow Package (53Q), both the 2.5L hybrid and the 2.0L EcoBoost are rated 4,000 lb. Front-wheel-drive Mavericks stay at 2,000 lb. The package's hitch allows a 400 lb tongue load.",
  sections: [
    {
      h2: 'Which Maverick tows 4,000 lb?',
      body: 'Only an all-wheel-drive Maverick with the 4K Tow Package. Ford rates it 4,000 lb with the 2.5L hybrid (8,315 lb GCWR) or the 2.0L EcoBoost (8,130 lb GCWR). Every other Maverick is rated 2,000 lb.',
    },
    {
      h2: 'The tongue limit is the real cap',
      body: 'The 4K hitch allows 400 lb on the ball. At a typical 12% tongue weight, that matches a trailer of about 3,330 lb. A 4,000 lb trailer only fits if its tongue weight is 10% or less, so weigh it before you tow.',
    },
    {
      h2: 'Hybrid or EcoBoost for towing?',
      body: 'Both are rated the same: 2,000 lb standard and 4,000 lb with AWD and the package. The hybrid package adds an auxiliary transmission cooler. The EcoBoost package adds a radiator upgrade instead.',
    },
  ],
  notCovered:
    "Ford's guide doesn't print Maverick payload or curb weight in the towing tables, so we don't show them. Check your door-jamb sticker for payload.",
  faq: [
    {
      q: 'Can a Ford Maverick tow 5,000 lbs?',
      a: 'No. The 2026 Maverick tops out at 4,000 lb, and only with AWD and the 4K Tow Package.',
    },
    {
      q: 'Can a Maverick pull a camper?',
      a: 'A small camper, yes, if it stays under 4,000 lb and its tongue weight stays under 400 lb. At 12% tongue weight that is a camper of about 3,330 lb. Many pop-up and teardrop campers fit. Most travel trailers do not.',
    },
    {
      q: 'Does the Maverick hybrid tow 4,000 lbs?',
      a: 'Yes. Ford rates the 2.5L hybrid at 4,000 lb with AWD and the 4K Tow Package (53Q). Without the package it is rated 2,000 lb.',
    },
    {
      q: 'What does the 4K Tow Package include?',
      a: 'Ford lists a 4- and 7-pin connector, a Class III hitch receiver, a trailer brake controller and an upgraded cooling fan. It also adds an auxiliary transmission cooler on the hybrid or a radiator upgrade on the EcoBoost.',
    },
  ],
};

export const HIGHLANDER: VehicleContent = {
  quickAnswer:
    "The 2026 Toyota Highlander tows 5,000 lb with the 2.4L turbo engine in every grade (XLE, XSE, Limited and Platinum). The Highlander Hybrid is rated 3,500 lb. Toyota's GVWR and curb weights work out to about 1,405 to 1,594 lb of payload.",
  sections: [
    {
      h2: 'Gas or hybrid for towing?',
      body: "The gas Highlander is rated 1,500 lb higher, at 5,000 lb versus 3,500 lb. It also has more payload. The XLE has 1,594 lb and the Hybrid Limited 1,405 lb, from Toyota's GVWR and curb weights.",
    },
    {
      h2: 'What a 5,000 lb Highlander can pull',
      body: "A 4,000 lb camper at 12% puts 480 lb on the hitch. Two adults (360 lb) and 200 lb of gear bring the payload used to 1,040 lb. That fits under the XLE's 1,594 lb.",
    },
    {
      h2: 'Highlander vs Grand Highlander',
      body: 'The Grand Highlander is a separate, larger model. This page covers only the Highlander.',
    },
  ],
  notCovered:
    "Toyota doesn't publish Highlander GCWR or a tongue limit on its spec page, so we don't show them.",
  faq: [
    {
      q: 'Can a Toyota Highlander tow 5,000 lbs?',
      a: 'Yes, the gas 2.4L turbo versions are rated 5,000 lb in every 2026 grade. The hybrid is rated 3,500 lb.',
    },
    {
      q: 'How much can a Highlander Hybrid tow?',
      a: '3,500 lb for 2026, in the XLE, Limited and Platinum hybrid grades.',
    },
    {
      q: 'Can a Highlander pull a camper?',
      a: 'A light camper, yes. Keep it under 5,000 lb loaded (3,500 lb for the hybrid) and check payload. Tongue weight, people and cargo must fit within about 1,405 to 1,594 lb.',
    },
  ],
};

export const RAV4: VehicleContent = {
  quickAnswer:
    'The 2026 Toyota RAV4 tows 1,750 lb with front-wheel drive and 3,500 lb with all-wheel drive on the SE, XLE Premium, XSE, Limited and Woodland. The LE is rated 1,750 lb even with AWD. Payload is about 1,073 to 1,205 lb.',
  sections: [
    {
      h2: 'Why the LE AWD tows less',
      body: 'Toyota rates the LE at 1,750 lb in both FWD and AWD form. On the SE and XLE Premium, choosing AWD doubles the rating to 3,500 lb. If you plan to tow up to 3,500 lb, skip the LE.',
    },
    {
      h2: 'What fits under 1,750 and 3,500 lb',
      body: 'A 1,750 lb rating covers a small utility trailer, a jet ski or a light teardrop. A 3,500 lb rating covers most pop-up campers and small boats. At 12% tongue weight, a 3,000 lb trailer puts 360 lb on the hitch, which counts against payload.',
    },
  ],
  notCovered:
    "Toyota doesn't publish RAV4 GCWR or a tongue limit on its spec page, so we don't show them.",
  faq: [
    {
      q: 'Can a RAV4 tow 3,500 lbs?',
      a: 'Yes, if it has all-wheel drive and is an SE, XLE Premium, XSE, Limited or Woodland. Front-wheel-drive versions and the LE AWD are rated 1,750 lb.',
    },
    {
      q: 'Can a RAV4 tow a camper?',
      a: 'A light one. With AWD on an eligible grade, the limit is 3,500 lb loaded. That covers many pop-up and teardrop campers, but not most travel trailers.',
    },
    {
      q: 'Does the RAV4 Hybrid tow less than the gas RAV4?',
      a: "For 2026, every RAV4 on Toyota's spec page is a hybrid, so there is no gas version to compare. The ratings are 1,750 lb (FWD and LE AWD) and 3,500 lb (other AWD grades).",
    },
  ],
};

export const RANGER: VehicleContent = {
  quickAnswer:
    'The 2026 Ford Ranger tows up to 7,500 lb with the 2.3L EcoBoost or the 2.7L EcoBoost V6 and the Trailer Tow Package (53R). The Ranger Raptor is rated 5,510 lb. Towing from the bumper alone is limited to 3,500 lb.',
  sections: [
    {
      h2: 'The 750 lb tongue limit',
      body: "The Ranger's hitch receiver is rated 7,500 lb with a 750 lb tongue load. That is exactly 10% of 7,500 lb. At 12% tongue weight, 750 lb matches a trailer of about 6,250 lb.",
    },
    {
      h2: 'Why the Raptor tows less',
      body: "Ford rates the Raptor 5,510 lb with a 550 lb tongue limit, below the regular Ranger's 7,500 lb. Its off-road suspension and 4.27 axle are tuned for the trail, not for heavy trailers.",
    },
    {
      h2: '2.3L or 2.7L for towing?',
      body: 'Both are rated 7,500 lb. The 2.7L V6 4x4 has the highest GCWR, at 12,745 lb versus 12,590 lb for the 2.3L 4x4. That leaves about 155 lb more room for people and cargo at the same trailer weight.',
    },
  ],
  notCovered:
    "Ford's guide doesn't print Ranger payload or curb weight in the towing tables. Check your door-jamb sticker.",
  faq: [
    {
      q: 'Can a Ford Ranger tow 7,500 lbs?',
      a: 'Yes, with the 2.3L or 2.7L EcoBoost and the Trailer Tow Package (53R). Keep the tongue under 750 lb, which means about 10% tongue weight at 7,500 lb.',
    },
    {
      q: 'Can a Ranger pull a travel trailer?',
      a: 'Many, yes. Using 12% tongue weight, the 750 lb tongue limit points to trailers of about 6,250 lb or less. Check payload for people and gear too.',
    },
    {
      q: 'What is the Ranger Raptor towing capacity?',
      a: "5,510 lb with a 550 lb tongue limit, per Ford's 2026 towing guide.",
    },
    {
      q: 'Do I need the tow package?',
      a: 'For anything over 3,500 lb, yes. Ford limits bumper-only towing to 3,500 lb with a 350 lb tongue.',
    },
  ],
};

export const RIDGELINE: VehicleContent = {
  quickAnswer:
    'Every 2026 Honda Ridgeline tows 5,000 lb, from the Sport to the Black Edition. Honda lists 1,509 to 1,583 lb of payload and a 9,986 lb GCWR. With a 5,000 lb trailer, GCWR leaves only 482 to 566 lb for people and cargo.',
  sections: [
    {
      h2: "GCWR is the Ridgeline's real limit",
      body: "Add the Sport's 4,420 lb curb weight to a 5,000 lb trailer and you reach 9,420 lb. Against the 9,986 lb GCWR, that leaves 566 lb for people, cargo and hitch. On the Black Edition (4,504 lb) it is 482 lb. Two adults and a cooler can use that up.",
    },
    {
      h2: 'Does the trim change towing?',
      body: 'No. All four trims share the 3.5L V6, i-VTM4 all-wheel drive, the 6,019 lb GVWR and the 5,000 lb rating. Heavier trims have slightly less payload.',
    },
  ],
  notCovered:
    "Honda doesn't list a tongue weight limit in its 2026 Ridgeline specifications, so we don't show one.",
  faq: [
    {
      q: 'Can a Honda Ridgeline tow 5,000 lbs?',
      a: 'Yes, every 2026 trim is rated 5,000 lb. With a trailer that heavy, keep people and cargo light. The 9,986 lb GCWR leaves 482 to 566 lb for them.',
    },
    {
      q: 'Can a Ridgeline pull a camper?',
      a: 'A camper well under 5,000 lb, yes. A 4,000 lb camper leaves about 1,482 to 1,566 lb of GCWR for people, cargo and hitch, which is much more comfortable.',
    },
    {
      q: 'Is the Ridgeline a real truck for towing?',
      a: 'It is a unibody midsize pickup with all-wheel drive. Honda rates it below body-on-frame rivals like the Ranger (7,500 lb) and Colorado (7,700 lb with the Trailering Package).',
    },
  ],
};

export const COLORADO: VehicleContent = {
  quickAnswer:
    'The 2026 Chevrolet Colorado tows up to 7,700 lb with the 2.7L TurboMax and the Trailering Package. Without the package it is rated 3,500 lb, and the off-road ZR2 is rated 6,000 lb. Chevrolet allows up to 770 lb of tongue weight.',
  sections: [
    {
      h2: 'Why the package matters so much',
      body: 'The engine and axle are the same in all three rows. The Trailering Package raises GCWR from 9,100 to 13,250 lb and the rating from 3,500 to 7,700 lb. Check the window sticker or build sheet before you buy a trailer.',
    },
    {
      h2: 'The ZR2 tows 6,000 lb',
      body: "The ZR2's GCWR is 11,600 lb, and its trailer rating is 6,000 lb, 1,700 lb less than a Colorado with the Trailering Package.",
    },
    {
      h2: '770 lb of tongue weight',
      body: 'At 10%, 770 lb matches the 7,700 lb rating. At 12%, it matches a trailer of about 6,420 lb.',
    },
  ],
  notCovered:
    "Chevrolet's 2026 trailering guide lists the Colorado Crew Cab only and doesn't print payload in the towing table. Check your door-jamb sticker.",
  faq: [
    {
      q: 'Can a Chevy Colorado tow 7,700 lbs?',
      a: "Yes, with the 2.7L TurboMax and the Trailering Package, per Chevrolet's 2026 guide. Without the package it is 3,500 lb.",
    },
    {
      q: 'How much can a Colorado ZR2 tow?',
      a: '6,000 lb for 2026.',
    },
    {
      q: 'Colorado vs Ranger towing?',
      a: 'The Colorado with the Trailering Package is rated 7,700 lb. The Ranger is rated 7,500 lb with its tow package. The Colorado allows a 770 lb tongue and the Ranger 750 lb.',
    },
  ],
};

export const BRONCO: VehicleContent = {
  quickAnswer:
    "The 2026 Ford Bronco tows 3,500 lb in almost every version, with the 2.3L or 2.7L EcoBoost and any axle. One version is rated a little lower: the 2.7L Badlands 4-door with the 4.70 Sasquatch axle, at 3,460 lb. The Bronco Raptor tows 4,500 lb. Trailers over 2,000 lb need Ford's dealer-installed hitch receiver.",
  sections: [
    {
      h2: 'Why every Bronco is about 3,500 lb',
      body: "Ford's hitch receiver for the Bronco is rated 3,500 lb with a 350 lb tongue. That sets the ceiling for every trim except the Raptor, whatever engine or axle you choose.",
    },
    {
      h2: 'Bronco Raptor: 4,500 lb',
      body: "The Raptor's 3.0L V6 and 10,650 lb GCWR earn a 4,500 lb rating and a 450 lb tongue limit. It is the only Bronco above 3,500 lb.",
    },
    {
      h2: 'Bronco vs Bronco Sport',
      body: 'The Bronco Sport is a different, smaller vehicle with its own ratings. This page covers only the Bronco.',
    },
  ],
  notCovered:
    "Ford's guide doesn't print Bronco payload in the towing tables. Check your door-jamb sticker.",
  faq: [
    {
      q: 'Can a Ford Bronco tow a camper?',
      a: 'A small one, under 3,500 lb loaded with a tongue under 350 lb. At 12%, that is a camper of about 2,920 lb. The Raptor allows 4,500 lb.',
    },
    {
      q: 'Does the 2.7L Bronco tow more?',
      a: 'No. The 2.7L V6 is rated 3,500 lb like the 2.3L, and the Badlands 4-door with the 4.70 axle is rated 3,460 lb.',
    },
    {
      q: 'How much can a Bronco Raptor tow?',
      a: "4,500 lb, with a 450 lb tongue limit, per Ford's 2026 towing guide.",
    },
  ],
};

export const EXPLORER: VehicleContent = {
  quickAnswer:
    'Every 2026 Ford Explorer sold to the public tows 5,000 lb, with the 2.3L EcoBoost or the 3.0L EcoBoost V6 in the ST and Tremor. The standard Class III trailer tow package is included. The hitch allows a 500 lb tongue load.',
  sections: [
    {
      h2: 'Same rating, different GCWR',
      body: 'The 2.3L is rated 10,000 to 10,100 lb GCWR and the 3.0L 10,800 lb. With a 5,000 lb trailer, the 3.0L leaves about 700 lb more GCWR for people and cargo.',
    },
    {
      h2: 'The 500 lb tongue limit',
      body: 'At 12% tongue weight, 500 lb matches a trailer of about 4,170 lb. Load a 5,000 lb trailer to 10% tongue weight, or tow lighter.',
    },
  ],
  notCovered: "Ford's guide doesn't print Explorer payload. Check your door-jamb sticker.",
  faq: [
    {
      q: 'Can a Ford Explorer tow 5,000 lbs?',
      a: 'Yes, every 2026 retail Explorer is rated 5,000 lb with the standard tow package.',
    },
    {
      q: 'Does the Explorer ST tow more?',
      a: 'No. The ST is also rated 5,000 lb, but its 10,800 lb GCWR leaves more room for passengers and cargo.',
    },
    {
      q: 'Can an Explorer pull a camper?',
      a: 'Yes, up to 5,000 lb loaded with a tongue under 500 lb. At 12% tongue weight that is a camper of about 4,170 lb.',
    },
  ],
};

export const PILOT: VehicleContent = {
  quickAnswer:
    'The 2026 Honda Pilot tows 5,000 lb with all-wheel drive and 3,500 lb with two-wheel drive. Only the Sport and EX-L come with 2WD. The TrailSport, Touring, Elite and Black Edition are AWD only. Honda says towing requires accessory towing equipment.',
  sections: [
    {
      h2: '2WD or AWD for towing?',
      body: "Choose AWD if you'll tow more than 3,500 lb. On the Sport and EX-L, AWD raises the rating by 1,500 lb, to 5,000 lb.",
    },
    {
      h2: 'What you need to tow',
      body: "Honda states that towing requires accessory towing equipment, such as a hitch and wiring. Ask the dealer what's installed before you hook up.",
    },
  ],
  notCovered:
    "Honda's 2026 Pilot specifications don't list payload, GVWR, GCWR or a tongue limit, so we don't show them.",
  faq: [
    {
      q: 'Can a Honda Pilot tow 5,000 lbs?',
      a: 'Yes, with AWD. Every AWD 2026 Pilot is rated 5,000 lb. The 2WD Sport and EX-L are rated 3,500 lb.',
    },
    {
      q: 'Can a Pilot pull a camper?',
      a: 'A camper up to 5,000 lb loaded with AWD. Check the door-jamb payload: tongue weight, passengers and cargo all count against it.',
    },
    {
      q: 'Does the TrailSport tow more?',
      a: 'No. The TrailSport is rated 5,000 lb, the same as the other AWD trims.',
    },
  ],
};

export const OUTBACK: VehicleContent = {
  quickAnswer:
    'The 2026 Subaru Outback tows 2,700 lb with the 2.5L engine (Premium, Limited and Touring) and 3,500 lb with the 2.4L turbo (Wilderness, Limited XT and Touring XT). Every Outback has all-wheel drive. Subaru notes that trailer brakes may be needed.',
  sections: [
    {
      h2: 'Turbo or 2.5L for towing?',
      body: 'The 2.4L turbo trims are rated 800 lb higher, at 3,500 lb versus 2,700 lb. If your trailer is near 3,000 lb, you need a Wilderness, Limited XT or Touring XT.',
    },
    {
      h2: 'Outback vs RAV4 towing',
      body: "A RAV4 AWD in the SE, XLE Premium, XSE, Limited or Woodland grade is also rated 3,500 lb. The Outback's base 2,700 lb is above the RAV4's 1,750 lb FWD and LE rating.",
    },
  ],
  notCovered:
    "Subaru's 2026 Outback comparison sheet doesn't list payload, GVWR, GCWR or tongue weight, so we don't show them.",
  faq: [
    {
      q: 'Can a Subaru Outback tow 3,500 lbs?',
      a: 'Yes, the 2026 Wilderness, Limited XT and Touring XT with the 2.4L turbo are rated 3,500 lb. The 2.5L trims are rated 2,700 lb.',
    },
    {
      q: 'Can an Outback tow a pop-up camper?',
      a: 'Many pop-ups weigh 1,500 to 3,000 lb loaded, so a turbo Outback can pull most of them. Weigh the camper loaded and stay under your trim rating.',
    },
    {
      q: 'Does the Outback need trailer brakes?',
      a: "Subaru says trailer brakes may be needed. Many states require them above a set trailer weight, so check your state's rule.",
    },
  ],
};
