// Every generated image has a single purpose and a fixed placement on the website.
// traits/prominence/placement drive automatic model, quality and size routing (see config.mjs).

const PHOTO = 'Photorealistic editorial commercial photography, natural colour, crisp detail, realistic materials and anatomy. Palette of charcoal, concrete grey, warm white and fire-protection red. No text, no letters, no numbers, no logos, no brand names, no watermarks, no signage wording.';
const STUDIO = 'Premium catalogue product photography on a seamless warm light-grey studio backdrop, soft key light from upper left, gentle floor shadow, centred composition with generous margin, realistic materials. Generic unbranded equipment. No text, no letters, no numbers, no logos, no labels with writing, no watermarks.';

export const IMAGE_JOBS = [
  {
    id: 'hero-pump-room',
    placement: 'hero', prominence: 'hero', traits: ['hero', 'industrial-machinery', 'photoreal-people', 'complex-lighting'],
    use: 'Homepage hero (full-bleed, right two-thirds visible; headline overlaid on the darker left).',
    alt: 'Fire protection engineer reviewing a tablet beside red fire pump pipework in a plant room',
    prompt: `Wide cinematic interior of a modern fire pump room inside a new commercial tower. Bright red-painted fire protection pipework, large gate valves with handwheels, pressure gauges, a horizontal split-case fire pump and a smaller jockey pump on concrete plinths, clean grey epoxy floor. One fire protection engineer in a white hard hat, high-visibility vest over a grey shirt, stands in the right third reviewing a tablet. The left 40% of the frame falls into deep charcoal shadow with soft out-of-focus pipe silhouettes, leaving calm negative space for a headline overlay. Low-angle, 35mm lens, moody directional light with warm highlights on the red pipes. ${PHOTO}`,
  },
  {
    id: 'installation-team',
    placement: 'banner', prominence: 'key', traits: ['premium-banner', 'multi-subject', 'photoreal-people'],
    use: 'Homepage "Supply, installation & commissioning" feature band and Products page banner.',
    alt: 'Technicians installing sprinkler pipework and smoke detectors in an open commercial ceiling',
    prompt: `Two fire safety installation technicians working in a modern commercial building under construction. One on a mobile scaffold platform fixes a pendant sprinkler head to a red sprinkler branch line in the open ceiling; the other, on the floor, holds a white ceiling smoke detector and checks cabling. Exposed ceiling with red sprinkler mains, cable trays and ductwork. Both wear hard hats, safety glasses and hi-vis vests. Daylight from tall windows, slight haze, documentary feel, eye-level wide shot. ${PHOTO}`,
  },
  {
    id: 'svc-sprinkler-design',
    placement: 'card', prominence: 'support', traits: ['architecture'],
    use: 'Fire Protection Engineering service card and detail hero.',
    alt: 'Red sprinkler pipework with pendant sprinkler heads across an exposed ceiling',
    prompt: `Looking up at an exposed concrete ceiling of a modern atrium with a neat network of red sprinkler mains and branch lines, grooved couplings, hangers and brass pendant sprinkler heads in a regular grid. Strong perspective lines, clean architecture, soft daylight. ${PHOTO}`,
  },
  {
    id: 'svc-code-review',
    placement: 'card', prominence: 'support', traits: [],
    use: 'Code Consulting & Life Safety Audits service card and detail hero.',
    alt: 'Engineer marking escape routes in red on architectural floor plans',
    prompt: `Overhead close view of an engineer's hands marking escape routes with a red pen on large architectural floor plans spread across a desk. A scale ruler, a closed thick technical code handbook with a plain cover, a tablet showing an abstract floor plan, coffee cup. Plans show only abstract lines and room outlines. Soft window light. ${PHOTO}`,
  },
  {
    id: 'svc-passive-fire',
    placement: 'card', prominence: 'support', traits: ['detail-sensitive'],
    use: 'Passive Fire Protection Review service card and detail hero.',
    alt: 'Steel beams with intumescent fireproofing and sealed service penetrations',
    prompt: `Detail view inside a building under construction: structural steel beams and columns coated with smooth off-white intumescent fireproofing, and a concrete wall where pipes and cable trays pass through penetrations neatly sealed with red firestop sealant and collars. Raking side light revealing coating texture. ${PHOTO}`,
  },
  {
    id: 'svc-commissioning',
    placement: 'card', prominence: 'key', traits: ['industrial-machinery'],
    use: 'Testing, Commissioning & Handover service card and detail hero.',
    alt: 'Engineer witnessing a fire pump test and reading a pressure gauge',
    prompt: `Close medium shot of a commissioning engineer witnessing a fire pump performance test: gloved hand holding a clipboard, looking at a large pressure gauge on red pipework next to a flow-test header valve, a second gauge in soft focus. Hard hat and safety glasses. Plant room lighting with warm highlights. ${PHOTO}`,
  },
  {
    id: 'svc-site-safety',
    placement: 'card', prominence: 'support', traits: ['architecture'],
    use: 'Temporary Construction Facilities Review service card and detail hero.',
    alt: 'Construction site with temporary fire extinguisher station and site cabins',
    prompt: `Large construction site in a sunny Gulf-region city: a red temporary fire point station with two portable extinguishers on a stand in the foreground, tidy laydown area, white site cabins, a concrete building frame and tower crane behind, clear blue sky with light dust haze. Wide shot. ${PHOTO}`,
  },
  {
    id: 'training-session',
    placement: 'card', prominence: 'support', traits: ['multi-subject'],
    use: 'Training Academy section (homepage) and Training page hero.',
    alt: 'Engineers attending a technical fire protection training session',
    prompt: `Professional technical training session in a modern seminar room: an instructor stands beside a large screen displaying an abstract coloured sprinkler pipe schematic, six engineers seated at tables with notebooks and laptops, attentive. Shot from the back corner, shallow depth of field, warm natural light. ${PHOTO}`,
  },
  {
    id: 'sector-hospitality',
    placement: 'card', prominence: 'key', traits: ['architecture'],
    use: 'Sector: Luxury Hospitality & Master Developments (panel, story and detail hero). Replaces an unsuitable stock photo.',
    alt: 'Luxury waterfront resort hotel at dusk on a man-made island',
    prompt: `Luxury five-star waterfront resort hotel on a man-made island in the Arabian Gulf at blue-hour dusk: contemporary low-rise architecture with warm-lit facades, infinity pool, palm trees, private marina with a few yachts, calm water reflections, distant city skyline on the horizon. Elegant architectural photography, wide shot, slightly elevated viewpoint. ${PHOTO}`,
  },
  {
    id: 'prod-fire-alarm',
    placement: 'product', prominence: 'key', traits: [],
    use: 'Product category: Fire Alarm Systems.',
    alt: 'Red addressable fire alarm control panel with manual call point and sounder',
    prompt: `A red wall-mounted addressable fire alarm control panel with a small blank dark display and a few indicator LEDs, beside a red manual call point and a red wall sounder-beacon. ${STUDIO}`,
  },
  {
    id: 'prod-extinguishers',
    placement: 'product', prominence: 'key', traits: [],
    use: 'Product category: Fire Extinguishers.',
    alt: 'Three portable fire extinguishers of different types',
    prompt: `Three red portable fire extinguishers standing side by side: a stored-pressure dry powder extinguisher with hose, a CO2 extinguisher with a black horn, and a foam extinguisher, each with plain unprinted bands, chrome valves and pressure gauges. ${STUDIO}`,
  },
  {
    id: 'prod-sprinkler-hydrant',
    placement: 'product', prominence: 'key', traits: [],
    use: 'Product category: Sprinkler & Hydrant Systems.',
    alt: 'Fire hydrant landing valve, hose reel and sprinkler heads',
    prompt: `A red fire hose reel drum with coiled red hose, a brass hydrant landing valve with red handwheel, and three brass sprinkler heads (pendant, upright and sidewall) arranged in front on the floor. ${STUDIO}`,
  },
  {
    id: 'prod-detection',
    placement: 'product', prominence: 'key', traits: [],
    use: 'Product category: Smoke & Heat Detection.',
    alt: 'White ceiling smoke and heat detectors',
    prompt: `Two white ceiling-mounted fire detectors — an optical smoke detector and a heat detector — on their mounting bases, plus one detector turned to show its base, small red indicator LED. Clean minimal arrangement. ${STUDIO}`,
  },
  {
    id: 'prod-emergency-lighting',
    placement: 'product', prominence: 'key', traits: [],
    use: 'Product category: Emergency Lighting & Safety Equipment.',
    alt: 'Illuminated green running-man exit sign and emergency bulkhead light',
    prompt: `An illuminated green emergency exit sign showing only the running-man pictogram and an arrow (no words), next to a white LED emergency bulkhead light and a twin-spot emergency light. ${STUDIO}`,
  },
  {
    id: 'prod-security',
    placement: 'product', prominence: 'key', traits: [],
    use: 'Product category: Security & Surveillance Solutions.',
    alt: 'Dome and bullet CCTV cameras with an access control card reader',
    prompt: `A white dome CCTV camera, a white bullet CCTV camera on a wall bracket, and a slim black access-control card reader with keypad (keys without characters). ${STUDIO}`,
  },
];
