// Verbatim tool-page prose from the build spec (pages 1 to 4). Do not rewrite (A13).
import type { ToolContent } from '@/components/ToolPage';

export const TOWING_CAPACITY: ToolContent = {
  quickAnswer:
    'Your real towing limit is the lowest of five numbers: the trailer rating, payload, GCWR, the hitch rating and the tongue limit. The trailer rating on the brochure assumes only a 150 lb driver and a 150 lb passenger. Everyone and everything else you add comes off it. Enter your numbers below to see which limit you hit first.',
  howToUse: [
    'Find your truck’s max trailer rating for your exact configuration. Our vehicle pages list them by cab, engine and drive.',
    'Read the payload number on the sticker inside the driver’s door.',
    'Enter the trailer’s loaded weight. If you only know the dry weight, use the trailer’s GVWR instead.',
    'Add the people and gear that will ride in the truck, and the hitch hardware.',
    'Read the verdict. If any check fails, the result names it and shows how many pounds you’re over.',
  ],
  formula: [
    'Tongue weight = trailer weight × tongue %',
    'Payload used = people + cargo + hitch hardware + tongue weight',
    'Adjusted trailer rating = trailer rating − (people + cargo + hitch hardware − 300 lb)',
    'Combined weight = curb weight + people + cargo + hitch hardware + trailer weight, which must stay at or under GCWR',
  ],
  examples: [
    {
      title: 'Example 1: a 2026 Tacoma TRD Off-Road with a 4,800 lb camper',
      body: 'Toyota rates the 2026 Tacoma TRD Off-Road Double Cab 5-ft bed 4x4 automatic at 6,300 lb towing and 1,610 lb payload. Two adults (360 lb), 200 lb of gear and a 60 lb ball mount: tongue weight is 576 lb (12% of 4,800). Payload used is 1,196 lb, leaving 414 lb. The adjusted trailer rating is 6,300 − (620 − 300) = 5,980 lb, so the camper uses 80.3% of it. Every check passes.',
    },
    {
      title: 'Example 2: same truck, 6,000 lb trailer, four people',
      body: 'Now the family comes along: 640 lb of people, 250 lb of gear, the same 60 lb hitch and a 6,000 lb trailer. Tongue weight is 720 lb. Payload used is 1,670 lb, 60 lb over the 1,610 lb limit. The adjusted trailer rating drops to 5,650 lb, so the trailer is 350 lb over. Toyota also lists a 640 lb maximum tongue weight for this truck, and 720 lb is 80 lb over that. The brochure number said 6,300 lb. The real answer is no.',
    },
  ],
  notCovered:
    'It doesn’t know your truck. You enter the ratings, so a wrong rating gives a wrong answer. It doesn’t check rear axle weight (GAWR), tire load ratings, trailer brakes or state towing laws. It treats tongue weight as a percentage, which is an estimate. A scale ticket from a truck stop CAT scale is the only way to know what your setup really weighs.',
  tips: [
    'Use the trailer’s GVWR, not its dry weight. Dry weight leaves out water, propane, batteries and everything you pack. A 30 gallon fresh tank alone is about 250 lb.',
    'Check the rating for your exact truck. On the 2026 F-150, the same engine can be rated thousands of pounds apart depending on axle ratio and tow package.',
    'Weigh the whole rig once at a truck stop scale. It costs about the price of a coffee and ends the guessing.',
    'If you’re near a limit, move gear from the truck to the trailer or the other way. It changes which limit you hit.',
  ],
  faq: [
    {
      q: 'How do you calculate your towing capacity?',
      a: 'Start with the trailer rating for your exact truck, then subtract the weight of people and cargo above the 300 lb the rating already assumes. Then check payload: people, cargo, hitch and tongue weight must fit under the door-jamb number. Finally, truck plus trailer must stay under GCWR. The lowest result is your real limit.',
    },
    {
      q: 'What is the 80/20 rule for towing?',
      a: 'Many RV groups suggest towing no more than 80% of your rated capacity to leave room for wind, hills and heat. It’s advice, not a rating. No manufacturer or federal rule requires it. Our calculator shows the percentage you’re using so you can decide, but it only fails a check when you go over an actual rating.',
    },
    {
      q: 'Does tongue weight count against towing capacity or payload?',
      a: 'It counts against payload, because the tongue sits on your truck. A 6,000 lb trailer at 12% puts 720 lb on the hitch, and those 720 lb come out of the same payload as your passengers. That’s why payload is often the first limit people hit, long before the brochure towing number.',
    },
    {
      q: 'What size truck do I need to pull 12,000 lbs?',
      a: 'A 12,000 lb trailer is at the very top of half-ton trucks. The 2026 F-150 is rated up to 13,500 lb and the 2026 Silverado 1500 up to 13,300 lb, but only in specific configurations with the max tow package. Once you add people, cargo and a 1,400 lb tongue, most half-tons run out of payload. Many owners choose a 3/4-ton truck for this weight.',
    },
    {
      q: 'Can I use dry weight to check if my truck can tow a camper?',
      a: 'No. Dry weight is the trailer as it left the factory, without water, propane, batteries, dealer options or your gear. Loaded campers often weigh 1,000 lb or more above dry weight. Use the loaded weight from a scale, or the trailer’s GVWR if you haven’t weighed it yet.',
    },
    {
      q: 'Can I find my towing capacity by VIN?',
      a: 'Ford’s own towing calculator uses your VIN for F-Series trucks. For other brands, the VIN gives you the exact engine, axle and trim, which you then match to the maker’s towing guide. The free government VIN decoder (NHTSA vPIC) shows the GVWR class but not towing capacity.',
    },
  ],
};

export const PAYLOAD: ToolContent = {
  quickAnswer:
    'Payload is the total weight of people and cargo your truck can carry, including the trailer’s tongue weight. The fastest way to find it is the yellow sticker on the driver’s door jamb: “The combined weight of occupants and cargo should never exceed” a number of pounds. If you only have specs, payload is GVWR minus curb weight.',
  howToUse: [
    'Enter the payload number from your door-jamb sticker. No sticker handy? Switch to GVWR and curb weight.',
    'Add each person who rides along.',
    'Add cargo and anything bolted on after the factory: bed cover, rack, tool box, bigger tires.',
    'If you tow, enter the tongue weight, or the trailer weight and let the calculator work it out.',
    'The result shows pounds used, pounds left and the percentage.',
  ],
  formula: [
    'Payload = GVWR − curb weight',
    'Payload used = people + cargo + accessories + hitch hardware + tongue weight',
    'Payload left = payload − payload used',
  ],
  examples: [
    {
      title: 'Example 1: four people and a small trailer in a 2026 Tacoma',
      body: 'The 2026 Tacoma TRD Off-Road Double Cab 5-ft 4x4 automatic has 1,610 lb of payload. Four adults weigh 680 lb, there’s 150 lb of gear, and the trailer puts 500 lb on the hitch. That’s 1,330 lb used, 280 lb left, or 82.6% of payload.',
    },
    {
      title: 'Example 2: the 2026 Tundra SR5 and a 9,000 lb travel trailer',
      body: 'Toyota lists 1,830 lb payload for the 2026 Tundra SR5 Double Cab 6.5-ft bed 4x2. Two adults (400 lb), 350 lb of gear, a 95 lb weight-distribution hitch, and 1,080 lb of tongue weight (12% of 9,000): 1,925 lb. That’s 95 lb over payload, even though the trailer is well under the truck’s 12,000 lb tow rating.',
    },
  ],
  notCovered:
    'It doesn’t split the load between front and rear axles, so it can’t check your rear axle rating (GAWR) or tire load. It uses the payload you enter; aftermarket parts installed before you bought the truck may already have used some of it. For the true number, weigh the empty truck with a full tank and subtract from GVWR.',
  tips: [
    'The door-jamb number is for your exact truck as built. Brochure payload is the best case for the lightest version.',
    'Every option adds weight and lowers payload. A 4x4 with a sunroof and big wheels can have hundreds of pounds less than the brochure figure.',
    'Tongue weight is the item people forget most. Count it every time you tow.',
  ],
  faq: [
    {
      q: 'How do you calculate your payload?',
      a: 'Take GVWR from the door-jamb sticker and subtract the truck’s curb weight. Most trucks built for the US also print the result directly on the tire and loading placard: “The combined weight of occupants and cargo should never exceed” a number. That number already reflects your truck’s options, so it’s the one to use.',
    },
    {
      q: 'What is the formula for payload?',
      a: 'Payload = GVWR − curb weight. To see what’s left on a trip, subtract people, cargo, accessories, hitch hardware and tongue weight from that payload. If the result is below zero, the truck is over its gross vehicle weight rating.',
    },
    {
      q: 'What does 2,000 lb payload mean?',
      a: 'It means people, cargo and the trailer’s tongue weight together can add up to 2,000 lb before the truck reaches its GVWR. Two 200 lb adults and a 1,000 lb tongue from an 8,000 lb trailer at 12.5% already use 1,400 lb, leaving 600 lb for everything in the bed and cab.',
    },
    {
      q: 'Does payload include the driver?',
      a: 'Yes. Payload is everything added to the empty truck, and the driver counts. The federal loading placard calculation starts from the full payload and subtracts every occupant, driver included. Curb weight includes a full tank of fuel but nobody inside.',
    },
    {
      q: 'Does tongue weight count as payload?',
      a: 'Yes. The trailer’s tongue rests on your hitch, so its weight is carried by the truck. Federal owner’s-manual rules even describe it as load transferred to your vehicle. A 7,000 lb trailer at 12% puts 840 lb on payload.',
    },
    {
      q: 'Where is the payload sticker on my truck?',
      a: 'On the driver’s door frame (the B-pillar) or the rear edge of the driver’s door, on the yellow and white Tire and Loading Information label. Federal rule FMVSS 110 requires it on light vehicles up to 10,000 lb GVWR.',
    },
  ],
};

export const TONGUE: ToolContent = {
  quickAnswer:
    'For a bumper-pull trailer, tongue weight should be 10% to 15% of the loaded trailer weight. A 5,000 lb trailer needs 500 to 750 lb on the hitch. Fifth wheel and gooseneck trailers put 15% to 25% on the kingpin. GM and Ram both publish these ranges in their towing guides.',
  howToUse: [
    'Pick bumper-pull or fifth wheel.',
    'Enter the loaded trailer weight to see the target range.',
    'If you’ve measured the tongue, switch to “Check my tongue weight” to see the percentage.',
    'No scale big enough? Use the bathroom-scale method and enter the reading.',
  ],
  formula: [
    'Range = trailer weight × 10% to 15% (fifth wheel 15% to 25%)',
    'Tongue % = measured tongue weight ÷ trailer weight × 100',
    'Bathroom-scale lever: reading × 4 (4 ft board, pivot 1 ft from the tongue end, scale at the far end)',
  ],
  examples: [
    {
      title: 'Example 1',
      body: 'A 7,000 lb loaded travel trailer should put 700 to 1,050 lb on the hitch. At 12% that’s 840 lb, and all 840 lb count against your truck’s payload.',
    },
    {
      title: 'Example 2',
      body: 'You weigh the tongue of a 5,000 lb boat trailer at 400 lb. That’s 8.0%, light enough to make sway more likely. Moving the boat forward on the trailer or loading heavy gear ahead of the axle raises it.',
    },
  ],
  notCovered:
    'It can’t tell you why a trailer sways, and it can’t replace a scale. Percentages assume the trailer is loaded the way you’ll tow it. Boat trailers often run lighter than 10%; follow the trailer maker’s number if it gives one.',
  tips: [
    'Too little tongue weight is the classic cause of trailer sway. Too much overloads the truck’s rear axle and steals payload.',
    'Load heavy items just ahead of the trailer axle, not at the back.',
    'A weight-distribution hitch spreads tongue weight across the axles. It doesn’t make the tongue lighter and it doesn’t add payload.',
    'Check the label on your ball mount and receiver. The lowest-rated part sets your tongue limit.',
  ],
  faq: [
    {
      q: 'How do I calculate my tongue weight?',
      a: 'Multiply the loaded trailer weight by 10% to 15% for a bumper-pull trailer. A 6,200 lb trailer should have 620 to 930 lb on the hitch. To know the real number, weigh it: a tongue scale, a truck stop scale (truck alone, then hitched with trailer wheels off the scale), or the bathroom-scale lever method.',
    },
    {
      q: 'How much tongue weight should a 7,000 lb trailer have?',
      a: '700 to 1,050 lb for a bumper-pull trailer, using the 10% to 15% range GM and Ram publish. Many owners aim near 12%, about 840 lb. That whole amount comes out of your truck’s payload, so check payload before you hitch up.',
    },
    {
      q: 'What is the tongue weight of a 5,000 lb trailer?',
      a: 'Between 500 and 750 lb if it’s loaded correctly. If yours measures under 500 lb, the trailer is tail-heavy and more likely to sway. Over 750 lb puts extra load on the truck’s rear axle.',
    },
    {
      q: 'What’s a good tongue weight percentage?',
      a: '10% to 15% for bumper-pull trailers, with about 12% to 13% a common target. Ram calls about 13% ideal. Fifth wheel and gooseneck trailers are different: 15% to 25% of the trailer’s weight sits on the kingpin.',
    },
    {
      q: 'How do I measure tongue weight with a bathroom scale?',
      a: 'For light tongues, rest the coupler on the scale at towing height. For heavier ones, lay a 4 ft board across a pipe placed 1 ft from one end, set the tongue on the long side 3 ft from the pivot as Weigh Safe describes, put the scale under the far end, and multiply the reading by 4.',
    },
    {
      q: 'Does a weight distribution hitch reduce tongue weight?',
      a: 'No. It moves some of the tongue load forward to the truck’s front axle and back to the trailer’s axles, which levels the rig and restores steering grip. The tongue still weighs the same and still counts against payload.',
    },
  ],
};

export const GCWR: ToolContent = {
  quickAnswer:
    'GCWR (gross combined weight rating) is the most your loaded truck and loaded trailer may weigh together. Add curb weight, people, cargo, the hitch and the trailer, and keep the total at or under GCWR. The heaviest trailer your GCWR allows is GCWR minus the loaded truck.',
  howToUse: [
    'Find GCWR in your owner’s manual or the maker’s towing guide for your exact configuration.',
    'Enter curb weight, or weigh the truck at a scale with a full tank.',
    'Add the people, cargo and hitch hardware.',
    'Enter the loaded trailer weight.',
    'Add your trailer rating to see which limit is lower.',
  ],
  formula: [
    'Combined weight = curb weight + people + cargo + hitch hardware + trailer weight',
    'GCWR left = GCWR − combined weight',
    'Heaviest trailer by GCWR = GCWR − (curb + people + cargo + hitch hardware)',
  ],
  examples: [
    {
      title: 'Example 1',
      body: 'A half-ton with a 15,000 lb GCWR and a 5,400 lb curb weight carries two adults (360 lb), 300 lb of gear and a 70 lb hitch. With an 8,500 lb trailer the combination weighs 14,630 lb, 370 lb under GCWR. GCWR alone would allow a trailer up to 8,870 lb.',
    },
    {
      title: 'Example 2',
      body: 'Same truck, four adults (680 lb), 400 lb of gear and a 9,300 lb trailer: 15,850 lb, 850 lb over GCWR. The trailer is within a 9,300 lb tow rating, yet the combination is over. Both limits apply at once.',
    },
  ],
  notCovered:
    'GCWR is only one limit. It doesn’t check payload, tongue weight, axle ratings or the hitch. Makers set GCWR for sea-level conditions; Ford, for example, reduces gross combined weight by 2% per 1,000 ft of elevation. Use the towing capacity calculator to check everything together.',
  tips: [
    'GCWR is set for the exact engine, axle ratio and tow package. Two trucks that look the same can have different GCWRs.',
    'Weigh the whole rig at a CAT scale. The ticket shows steer axle, drive axle and trailer axles separately.',
    'Elevation matters. Plan for less margin if you tow through the mountains.',
  ],
  faq: [
    {
      q: 'How do I figure out the GCWR of my truck?',
      a: 'Look in your owner’s manual or the manufacturer’s towing guide for your model year, then find the row that matches your engine, cab, bed, drive and axle ratio. Ford, Chevrolet and Ram publish GCWR in their towing guides. The door-jamb sticker shows GVWR and axle ratings, not GCWR.',
    },
    {
      q: 'What is my GCWR by VIN?',
      a: 'The VIN tells you the exact engine and trim, which you need to pick the right GCWR row. Ford’s online towing calculator looks it up from the VIN for F-Series trucks. The free NHTSA VIN decoder may show a GCWR range for some vehicles, but often leaves it blank.',
    },
    {
      q: 'Is GCWR the same as towing capacity?',
      a: 'No. Towing capacity is the heaviest trailer the truck can pull with only a driver and passenger aboard. GCWR is the limit for truck plus trailer together. GM calculates the trailer rating as GCWR minus curb weight minus 300 lb for the driver and passenger, so every pound you add to the truck lowers what you can tow.',
    },
    {
      q: 'What happens if you exceed GCWR?',
      a: 'The engine, transmission, cooling system and brakes are working past what the maker tested for. You’ll see slower climbs, hotter transmission temperatures and longer stopping distances. It can also void warranty coverage for related damage and affect insurance after a crash.',
    },
    {
      q: 'Does GCWR include passengers?',
      a: 'Yes. GCWR covers everything: the truck, its fuel, every person, cargo, the hitch and the loaded trailer. That’s why a full cab can push a combination over GCWR even when the trailer is under the tow rating.',
    },
  ],
};
