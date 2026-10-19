// Verbatim vehicle-page prose from the build spec (pages 5 to 10). Do not rewrite (A13).
import type { VehicleContent } from '@/components/VehiclePage';

export const TACOMA: VehicleContent = {
  quickAnswer:
    'The 2026 Toyota Tacoma tows up to 6,500 lb. Only the SR5 XtraCab and TRD PreRunner XtraCab reach that number. Most Double Cab versions are rated 6,000 to 6,400 lb, the i-FORCE MAX hybrids 5,950 to 6,000 lb, and the SR with the automatic transmission 3,500 lb. Payload runs from 1,230 to 1,705 lb.',
  sections: [
    {
      h2: 'Which 2026 Tacoma tows the most?',
      body: 'The SR5 XtraCab (4x2 or 4x4) and the TRD PreRunner XtraCab are rated at 6,500 lb with a 650 lb tongue limit. They are the lightest Tacomas with the i-FORCE engine, which leaves the most of the truck’s combined weight rating for the trailer. The catch is payload: the SR5 XtraCab 4x4 has only 1,230 lb.',
    },
    {
      h2: 'Why the hybrid tows less',
      body: 'The i-FORCE MAX makes far more torque, yet Toyota rates it at 5,950 to 6,000 lb. In Toyota’s own table the hybrid adds 400 to 470 lb of curb weight compared with the same grade and cab on the i-FORCE engine (TRD Off-Road, TRD Sport, Limited), and that weight comes out of the trailer rating. If towing is the main job, a TRD Sport or TRD Off-Road with the i-FORCE engine is rated higher.',
    },
    {
      h2: 'The 3,500 lb Tacoma',
      body: 'Four SR configurations with the automatic transmission are rated at only 3,500 lb in Toyota’s table. The SR Double Cab 4x4 with the 6-speed manual is rated 6,400 lb. If you’re shopping for a used 2026 SR to tow, check the exact configuration before you buy a trailer.',
    },
    {
      h2: 'Tacoma towing vs payload: the real limit',
      body: 'A 6,000 lb camper at 12% puts 720 lb on the hitch. That’s already above the 640 lb maximum tongue weight Toyota lists for every Double Cab, so a loaded camper near 6,000 lb doesn’t fit the Tacoma even before you count passengers. For most Tacoma owners, tongue weight and payload are the limits, not the towing number.',
    },
  ],
  notCovered:
    'Toyota’s spec page doesn’t publish GCWR or axle ratings for the Tacoma, so we don’t show them. Figures are for 2026 models as built by Toyota. Dealer-added accessories, lift kits and larger tires change curb weight and can lower payload. Your door-jamb sticker shows the payload for your truck.',
  faq: [
    {
      q: 'How much can a Tacoma actually tow?',
      a: 'Up to 6,500 lb for the 2026 SR5 XtraCab and TRD PreRunner, according to Toyota’s specifications. Most Double Cabs are rated 6,000 to 6,400 lb. In practice, the 640 lb tongue limit and 1,230 to 1,705 lb of payload stop most owners first: at 12% tongue weight, 640 lb matches a trailer of about 5,330 lb.',
    },
    {
      q: 'Which Tacoma can tow 5,000 lbs?',
      a: 'Every 2026 Tacoma except the four SR automatic configurations rated at 3,500 lb. A 5,000 lb trailer at 12% puts 600 lb on the hitch, under the 640 lb tongue limit. Check payload too: two adults, gear and a 600 lb tongue can use more than 1,000 lb.',
    },
    {
      q: 'Can a Toyota Tacoma pull 8,000 lbs?',
      a: 'No. No 2026 Tacoma is rated above 6,500 lb, and the 2016 to 2023 generation topped out at 6,800 lb. An 8,000 lb trailer needs a full-size truck such as the Tundra, which Toyota rates from 8,300 to 12,000 lb for 2026.',
    },
    {
      q: 'What is the towing capacity of the Tacoma i-FORCE MAX?',
      a: '5,950 to 6,000 lb for 2026. The TRD Sport i-FORCE MAX, TRD Off-Road i-FORCE MAX, Limited i-FORCE MAX, TRD Pro and Trailhunter 5-ft bed are rated 6,000 lb; the Trailhunter with the 6-ft bed is rated 5,950 lb.',
    },
    {
      q: 'Did the new Tacoma lose towing capacity?',
      a: 'Yes, slightly. Toyota rated the 2016 to 2023 Tacoma V6 with the Tow Package at up to 6,800 lb under SAE J2807. The 2024 and later Tacoma tops out at 6,500 lb.',
    },
    {
      q: 'Does the Tacoma need a weight distribution hitch?',
      a: 'Toyota’s spec page doesn’t state a weight-distribution threshold for the Tacoma; check the towing section of your owner’s manual. Many owners use one for trailers near the truck’s limit because it levels the truck and restores weight to the front axle. It doesn’t increase the 640 or 650 lb tongue limit.',
    },
  ],
};

export const F150: VehicleContent = {
  quickAnswer:
    'The 2026 Ford F-150 tows up to 13,500 lb with the 3.5L EcoBoost V6, SuperCrew 4x4, Tow/Haul Package and Max Tow Axle. The 5.0L V8 tops out at 12,800 lb, the PowerBoost hybrid at 12,400 lb (4x2), the 2.7L EcoBoost at 8,400 lb and the Raptor models at 8,200 to 8,700 lb. Max payload is 2,440 lb.',
  sections: [
    {
      h2: 'Which F-150 tows the most?',
      body: 'The 3.5L EcoBoost with the 3.55 axle, Tow/Haul Package (53T) and Max Tow Axle: 13,500 lb on a 19,400 lb GCWR in Ford’s 2026 guide. Without the Max Tow Axle the same engine is rated thousands of pounds lower, so the engine name alone doesn’t tell you the number.',
    },
    {
      h2: 'The packages that change the number',
      body: 'Ford’s guide says the Tow/Haul Package plus the Max Tow Axle is required for gas F-150 ratings above 11,600 lb, which is also the rating of the standard receiver. Above 5,000 lb or 500 lb tongue weight on the standard receiver, Ford requires a weight-distribution system.',
    },
    {
      h2: 'Where Ford’s documents disagree',
      body: 'Ford’s 2026 towing guide and its 2026 F-150 spec sheet list different numbers for two engines: payload for the 5.0L V8 (2,225 lb in the guide, 2,235 lb in the spec sheet) and the PowerBoost max tow (11,600 lb on the guide’s summary page, 12,400 lb in the spec sheet and the guide’s own hybrid table). Our calculators use the lower number.',
    },
  ],
  notCovered:
    'We show each engine’s maximum and the GCWR rows behind it, not every cab, box and wheelbase combination. For your exact truck, use Ford’s towing guide row that matches your cab, wheelbase, axle ratio and packages, or Ford’s VIN-based towing calculator. Fifth-wheel and gooseneck ratings are not covered here.',
  faq: [
    {
      q: 'What’s better for towing, the 5.0 or the 3.5 EcoBoost?',
      a: 'On paper, the 3.5L EcoBoost: up to 13,500 lb against 12,800 lb for the 5.0L V8 in 2026, and 2,440 lb max payload against 2,235 lb. Both need the Tow/Haul Package and Max Tow Axle for their top ratings. Many owners still pick the V8 for simpler maintenance; the ratings don’t capture that.',
    },
    {
      q: 'Which F-150 can tow 14,000 lbs?',
      a: 'None. The 2026 F-150’s highest rating is 13,500 lb. A 14,000 lb trailer needs a heavy-duty truck such as the F-250 Super Duty.',
    },
    {
      q: 'Will an F-150 pull a 30 foot camper?',
      a: 'Often, but check the loaded weight, not the length. Many 30 ft travel trailers weigh 6,500 to 8,500 lb loaded. At 12% tongue weight an 8,000 lb trailer puts 960 lb on the hitch, so payload and the receiver rating decide it. Run your numbers in the calculator above.',
    },
    {
      q: 'How do I find the GCWR of my F-150?',
      a: 'Find your engine, axle ratio, cab and wheelbase in Ford’s RV & Trailer Towing Guide for your model year; each row lists GCWR next to max trailer weight. The axle code is on the door-jamb label. Ford’s online towing calculator can also look it up from your VIN.',
    },
    {
      q: 'What is the towing capacity of the F-150 PowerBoost?',
      a: 'Ford’s 2026 spec sheet rates the PowerBoost hybrid at 12,400 lb in 4x2 and 11,600 lb in 4x4, both SuperCrew. The guide’s summary page shows 11,600 lb as the PowerBoost maximum. Until Ford’s documents agree, plan around 11,600 lb for a 4x4.',
    },
    {
      q: 'How much can a 2.7 EcoBoost F-150 tow?',
      a: 'Up to 8,400 lb for 2026 in 4x2 (8,200 lb in 4x4), with the 3.73 axle and a 13,300 lb GCWR in Ford’s guide. Max payload is 1,775 lb.',
    },
  ],
};

export const TUNDRA: VehicleContent = {
  quickAnswer:
    'The 2026 Toyota Tundra tows up to 12,000 lb, but only the SR5 Double Cab 6.5-ft bed 4x2 reaches that number in Toyota’s specs. Most configurations are rated 10,870 to 11,450 lb, the Capstone 10,290 lb and the base SR 8,300 lb. Payload runs from 1,420 to 1,850 lb.',
  sections: [
    {
      h2: 'Which Tundra can tow 12,000 lbs?',
      body: 'One configuration: the 2026 SR5 Double Cab with the 6.5-ft bed and 4x2. The same SR5 in 4x4 is rated 11,200 lb, and the CrewMax SR5 versions 11,010 to 11,400 lb. If you need the full 12,000 lb, check the exact cab, bed and drive on the window sticker.',
    },
    {
      h2: 'i-FORCE vs i-FORCE MAX for towing',
      body: 'The hybrid i-FORCE MAX doesn’t raise the tow rating. In Toyota’s 2026 table, a Limited CrewMax 5.5-ft 4x4 is rated 11,120 lb with the i-FORCE and 11,130 lb with the i-FORCE MAX, and the Platinum hybrid 4x4 rates lower than the i-FORCE version (10,990 vs 11,050 lb). The hybrid’s extra weight also trims payload.',
    },
    {
      h2: 'Payload is the limit with big trailers',
      body: 'A 10,000 lb travel trailer at 12% puts 1,200 lb on the hitch. A Tundra Platinum i-FORCE MAX has 1,510 lb of payload, which leaves 310 lb for everyone in the cab and the hitch itself. Two adults use more than that.',
    },
  ],
  notCovered:
    'Toyota’s spec page doesn’t list GCWR or a separate tongue limit for the Tundra, so we don’t show them. Curb weights are not shown because Toyota’s page didn’t provide them cleanly for every configuration. Older model years before 2025 aren’t covered yet.',
  faq: [
    {
      q: 'Can a Toyota Tundra pull 8,000 lbs?',
      a: 'Yes. Every 2026 Tundra is rated at 8,300 lb or more. At 12% tongue weight, 8,000 lb puts 960 lb on the hitch, so check payload: the SR has 1,710 to 1,850 lb depending on cab and bed.',
    },
    {
      q: 'Which tows more, the F-150 or the Tundra?',
      a: 'The F-150, on paper. The 2026 F-150 is rated up to 13,500 lb against 12,000 lb for the Tundra, and its max payload is 2,440 lb against 1,850 lb. Compare the exact configurations you’re shopping, because most Tundras land between 10,870 and 11,450 lb and many F-150s are below their 13,500 lb maximum too.',
    },
    {
      q: 'Is the Toyota Tundra a 3/4 ton truck?',
      a: 'No. The Tundra is a half-ton (1500-class) full-size pickup, like the F-150, Silverado 1500 and Ram 1500. Toyota doesn’t sell a 3/4-ton Tundra in the US.',
    },
    {
      q: 'What is the towing capacity of the Tundra i-FORCE MAX?',
      a: '10,290 to 11,450 lb for 2026. The highest is the Limited i-FORCE MAX CrewMax 5.5-ft 4x2 at 11,450 lb; the lowest is the Capstone at 10,290 lb.',
    },
    {
      q: 'How much can a Tundra TRD Pro tow?',
      a: 'Toyota rates the 2026 Tundra TRD Pro (CrewMax 5.5-ft, 4x4, i-FORCE MAX) at 11,130 lb with 1,580 lb of payload.',
    },
  ],
};

export const RAM: VehicleContent = {
  quickAnswer:
    'The 2026 Ram 1500 tows up to 11,610 lb with the 3.0L Hurricane inline-six (standard output), according to Ram’s 2026 payload and towing chart. The returning 5.7L HEMI V8 is rated up to 11,320 lb, the Hurricane High Output 10,000 lb and the 3.6L V6 8,130 lb. Max payload is 2,360 lb on a V6 Quad Cab 4x2.',
  sections: [
    {
      h2: 'How much can a 5.7 HEMI Ram 1500 tow?',
      body: 'Up to 11,320 lb for 2026, with the 3.92 axle and a 17,000 lb GCWR in Ram’s chart. With the 3.21 or 3.55 axle the same engine is rated about 7,600 to 8,200 lb. Axle ratio is the biggest single factor in a Ram 1500’s tow rating.',
    },
    {
      h2: 'Hurricane vs HEMI for towing',
      body: 'The standard-output Hurricane I6 is rated 290 lb higher than the HEMI (11,610 vs 11,320 lb) and carries 280 lb more max payload (1,930 vs 1,650 lb). The High Output Hurricane makes more power but is rated lower, at 10,000 lb, because it comes in heavier, higher trims.',
    },
    {
      h2: 'What Ram’s rating assumes',
      body: 'Ram’s chart says its trailer ratings include 300 lb of passenger weight. Anything above that, more people, gear in the bed, a hitch, comes off the trailer rating. Our calculators apply that adjustment automatically.',
    },
  ],
  notCovered:
    'We show each engine’s maximum, not every cab, box, axle and drive combination. Ram also offers a “Max Tow” style setup through axle and package choices; match your truck’s exact build to the row in Ram’s chart. Fifth-wheel and gooseneck ratings aren’t covered.',
  faq: [
    {
      q: 'How much can a 5.7 HEMI Ram 1500 tow?',
      a: 'Up to 11,320 lb for the 2026 model with the 3.92 rear axle, per Ram’s 2026 chart. The rating drops sharply with the taller 3.21 and 3.55 axles, so check the axle code on your door-jamb label before you pick a trailer.',
    },
    {
      q: 'Can a Ram 1500 pull a camper?',
      a: 'Yes, most travel trailers under about 8,000 lb loaded are within the ratings of a properly equipped 2026 Ram 1500. Payload usually decides it: an 8,000 lb camper at 12% puts 960 lb on the hitch, and a HEMI Crew Cab with 1,650 lb of payload has 690 lb left for people and gear.',
    },
    {
      q: 'Which Ram 1500 can tow 10,000 lbs?',
      a: 'For 2026: the 5.7L HEMI (up to 11,320 lb), the Hurricane standard output (up to 11,610 lb) and the Hurricane High Output (10,000 lb), each only with the right axle and configuration. The 3.6L V6 tops out at 8,130 lb.',
    },
    {
      q: 'What is the max payload of a 2026 Ram 1500?',
      a: '2,360 lb, on a 3.6L V6 Quad Cab 4x2, according to Ram’s chart. The HEMI’s max is 1,650 lb, the Hurricane standard output 1,930 lb and the High Output 1,490 lb.',
    },
    {
      q: 'Is the Ram 1500 rated with SAE J2807?',
      a: 'Yes. Ram’s 2026 Ram 1500 payload and towing chart is labelled “SAE J2807 Compliant.”',
    },
  ],
};

export const SILVERADO: VehicleContent = {
  quickAnswer:
    'The 2026 Chevrolet Silverado 1500 tows up to 13,300 lb with the 3.0L Duramax diesel, Max Trailering Package and 20-inch wheels (Double Cab, 2WD). The 6.2L V8 reaches 13,200 lb, the 5.3L V8 11,300 lb and the 2.7L TurboMax 9,500 lb. Without the Max Trailering Package, most Silverados are rated 9,000 to 9,900 lb.',
  sections: [
    {
      h2: 'What the Max Trailering Package adds',
      body: 'On the 5.3L V8 Crew Cab Short Box 4x4, GM’s guide rates 9,300 lb without the package and 11,000 lb with it, because the package raises GCWR from 15,000 to 16,800 lb. On the Duramax the jump is from 9,000 to 11,800 lb, and to 13,000 lb with 20-inch wheels.',
    },
    {
      h2: 'How GM calculates the trailer rating',
      body: 'GM’s 2026 Trailering Guide bases the rating on curb weight plus a 150 lb driver and a 150 lb front passenger. Everything else you add lowers the trailer you can tow by the same amount. GM recommends 10% to 15% tongue weight for conventional trailers.',
    },
    {
      h2: '5.3L vs 6.2L vs Duramax',
      body: 'Without the Max Trailering Package, the 5.3L V8 is rated slightly higher than the 6.2L (9,300 vs 9,100 lb on a Crew Cab 4x4) because the 6.2L comes on heavier trims. With the package, the 6.2L and Duramax pull well ahead: 11,900 to 13,200 lb and 11,700 to 13,300 lb.',
    },
  ],
  notCovered:
    'Payload isn’t listed per configuration in GM’s guide; use the number on your door-jamb sticker. Fifth-wheel and gooseneck ratings (GM lists up to 10,300 lb) aren’t in the main table. ZR2 and other off-road trims are rated lower; check your exact truck.',
  faq: [
    {
      q: 'Can a Chevy 1500 pull a 6,000 lb trailer?',
      a: 'Yes. Every 2026 Silverado 1500 configuration in GM’s guide is rated 8,700 lb or more. At 12% tongue weight, 6,000 lb puts 720 lb on the hitch, so the bigger question is payload: subtract people, cargo and 720 lb from your door-jamb number.',
    },
    {
      q: 'What is the towing capacity of a 5.3L V8 Silverado?',
      a: '9,200 to 9,900 lb without the Max Trailering Package and 11,000 to 11,300 lb with it, depending on cab, box and drive, in GM’s 2026 Trailering Guide.',
    },
    {
      q: 'Which Silverado 1500 tows the most?',
      a: 'The 3.0L Duramax with the Max Trailering Package and 20-inch wheels, Double Cab Standard Box 2WD: 13,300 lb on a 19,000 lb GCWR. The 6.2L V8 RST with the package and 20-inch wheels is next at 13,200 lb.',
    },
    {
      q: 'Does the Silverado 1500 need a weight distribution hitch?',
      a: 'GM’s 2026 guide describes weight-distributing hitches and says they should be frame-mounted, but doesn’t give one threshold for the Silverado 1500. Check the trailering section of your owner’s manual. For trailers near the top of the rating, most owners use one.',
    },
    {
      q: 'What is the max payload of the 2026 Silverado 1500?',
      a: 'Payload depends on the exact configuration. Use the number on your door-jamb sticker.',
    },
  ],
};

export const FOURRUNNER: VehicleContent = {
  quickAnswer:
    'The 2026 Toyota 4Runner tows 6,000 lb in 13 of its 16 versions. The Trailhunter, TRD Pro and Platinum are rated 5,800 lb. Toyota doesn’t print a payload number for the 4Runner, but its GVWR minus curb weight gives about 1,005 to 1,550 lb, lowest on the Trailhunter.',
  sections: [
    {
      h2: 'Is the 4Runner good for towing?',
      body: 'For small campers, boats and utility trailers, yes. The 6,000 lb rating is high for a midsize SUV. The tighter limit is payload: a Trailhunter has about 1,005 lb, and a 5,000 lb trailer at 12% uses 600 lb of it before anyone gets in.',
    },
    {
      h2: 'Why the off-road trims tow less',
      body: 'The Trailhunter, TRD Pro and Platinum weigh 5,390 to 5,500 lb at the curb in Toyota’s specs, about 705 to 815 lb more than an SR5 4x4 (4,685 lb). They share the same 6,505 lb GVWR as the other hybrids, so the added weight comes straight out of payload and the trailer rating.',
    },
    {
      h2: 'What 4Runner can tow 7,000 lbs?',
      body: 'None. No 2026 4Runner is rated above 6,000 lb. For a 7,000 lb trailer, look at full-size SUVs or the Tundra.',
    },
  ],
  notCovered:
    'Toyota doesn’t publish a 4Runner payload figure, GCWR or tongue limit on its spec page, so payload here is computed from Toyota’s GVWR and curb weight. Check your door-jamb sticker for your exact payload.',
  faq: [
    {
      q: 'What 4Runner can tow 7,000 lbs?',
      a: 'None. The 2026 4Runner tops out at 6,000 lb, and the Trailhunter, TRD Pro and Platinum are rated 5,800 lb.',
    },
    {
      q: 'Is the 4Runner good for towing?',
      a: 'It’s good for light to medium trailers up to its 6,000 lb rating. Payload is the limit to watch: Toyota’s GVWR and curb weights work out to about 1,005 to 1,550 lb, and tongue weight from a 5,000 lb trailer takes about 600 lb of that.',
    },
    {
      q: 'Why is the 4Runner towing capacity limited?',
      a: 'A body-on-frame midsize SUV has a shorter wheelbase and lower GVWR than a full-size truck. Toyota sets the 4Runner’s GVWR at 6,005 to 6,505 lb, and the trailer rating has to fit inside the combined limits the truck was tested for.',
    },
    {
      q: 'Does the 4Runner hybrid tow more?',
      a: 'No. The i-FORCE MAX versions are rated 5,800 to 6,000 lb, the same or lower than the i-FORCE versions, and their heavier curb weight leaves less payload.',
    },
  ],
};
