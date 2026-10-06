// Single source of truth for business content. All facts below come from the client guideline
// (client-materials/website-guideline by client.docx) or the brief supplied with the project.

export const site = {
  name: 'Ignis Vortex',
  legal: 'Ignis Code & Plan Review Services LLC',
  domain: 'https://www.ignis-vortex.com',
  email: 'waseem@ignisplanreview.com',
  facebook: 'https://www.facebook.com/share/r/1GyjVFYP7A/',
};

/** Image references are paths under /assets/ without extension; each has a `-small` variant. */
export type ImageRef = string;

export const standards: [string, string][] = [
  ['NFPA', 'Fire & life safety codes'],
  ['SAES', 'Saudi Aramco Engineering Standards'],
  ['SBC 801', 'Saudi Fire Protection Code'],
  ['UAE FLSC', 'UAE Fire & Life Safety Code'],
  ['NBC 2016', 'Part 4 · Fire & Life Safety'],
  ['IBC', 'International Building Code'],
  ['IS Codes', 'Indian Standards'],
];

export const kpis = [
  { value: 2, suffix: '', label: 'PE disciplines', title: 'Dual PE Licensure', text: 'Fire Protection & Civil Engineering — US State Boards & Saudi Council of Engineers.' },
  { value: 10, suffix: '+', label: 'Years experience', title: '10+ Years Experience', text: 'Complex engineering, owner’s representation and authority compliance across GCC giga-projects, high-rises and industrial sectors.' },
  { value: 4, suffix: '', label: 'International jurisdictions', title: '4 International Jurisdictions', text: 'Project execution and regulatory compliance across KSA, UAE, India and USA.' },
];

export const reasons = [
  { icon: 'book', title: 'Multi-Jurisdictional Code Mastery', text: 'Deep technical alignment with Saudi Aramco Engineering Standards (SAES), Saudi Building Code (SBC 801), UAE Fire & Life Safety Code, Indian Standards (NBC 2016 Part 4) and NFPA codes.' },
  { icon: 'settings', title: 'Software-Driven Engineering', text: 'Advanced CFD fire modelling, 3D occupant egress simulations and automated hydraulic calculations to resolve clashes prior to construction.' },
  { icon: 'people', title: 'Owner’s Engineering & Authority Liaison', text: 'End-to-end technical representation during design, third-party audits, TCF submittals, testing & commissioning, and AHJ approvals (Aramco LPD/FrPD, Dubai Civil Defence).' },
];

export type Service = {
  slug: string; title: string; short: string; intro: string; image: ImageRef; icon: string; group: string;
  scope: string[]; outputs: string[]; tools: string; codes: string; audience: string;
};

export const serviceGroups = [
  { name: 'Fire & life safety', text: 'Design and review that place life safety at the centre of the building.' },
  { name: 'Technical advisory', text: 'Independent technical support throughout design, construction and handover.' },
  { name: 'Civil & structural', text: 'Site, structural and professional engineering expertise for informed decisions.' },
];

export const services: Service[] = [
  { slug: 'fire-protection-engineering', title: 'Fire Protection Engineering', short: 'Performance-based design for complex architecture.', intro: 'Fire protection design brings building use, system performance and life safety into one coordinated strategy. For non-standard or complex architecture where prescriptive compliance is impractical, performance-based design uses CFD fire dynamics and egress analysis.', image: 'gen/svc-sprinkler-design', icon: 'shield', group: 'Fire & life safety', scope: ['Performance-based fire engineering for complex buildings', 'CFD fire and smoke analysis, tenability assessment and egress analysis', 'Sprinkler, standpipe, deluge and fire pump supply network design', '3D piping layouts, hydraulic analysis and interdisciplinary coordination'], outputs: ['Design criteria and fire protection strategy', 'Hydraulic calculation packages and piping layouts', 'Simulation reports and performance-based design documentation'], tools: 'AutoSPRINK · HydraCAD · HydraCalc · FDS · PyroSim · Pathfinder', codes: 'NFPA · SAES · SBC 801 · UAE Fire & Life Safety Code · NBC 2016 Part 4', audience: 'Project owners, architects, MEP consultants and contractors.' },
  { slug: 'code-consulting', title: 'Code Consulting & Life Safety Audits', short: 'Clear code interpretation. Safer, compliant buildings.', intro: 'Comprehensive building safety evaluations against NFPA, SAES, SBC 801, the UAE Fire Code and the Indian National Building Code (NBC 2016 Part 4). We help project teams turn complex code requirements into clear design actions.', image: 'gen/svc-code-review', icon: 'document', group: 'Fire & life safety', scope: ['Occupancy classification and applicable code assessment', 'Life safety plan reviews and building safety evaluations', 'Means of egress, exit capacity and fire compartmentation reviews', 'Compliance observations and coordination with project stakeholders'], outputs: ['Code compliance matrix', 'Life safety audit report and documented findings', 'Prioritised design comments and review responses'], tools: 'AutoCAD · Bluebeam · Pathfinder', codes: 'NFPA · SAES · SBC 801 · UAE Fire & Life Safety Code · NBC 2016 Part 4', audience: 'Building owners, architects, facility teams and MEP consultants.' },
  { slug: 'passive-fire-protection', title: 'Passive Fire Protection Review', short: 'Fireproofing, firestopping and compartmentation.', intro: 'Engineering reviews of structural fireproofing (intumescent coatings, boards), UL/ULC-certified firestop assemblies and compartmentation boundaries — connected to the design and installation details that support their intended performance.', image: 'gen/svc-passive-fire', icon: 'layers', group: 'Fire & life safety', scope: ['Structural fireproofing review, including intumescent coatings and boards', 'UL/ULC-certified firestop assembly documentation reviews', 'Compartmentation boundaries and penetration details', 'Coordination of architectural, structural and MEP interfaces'], outputs: ['Passive fire protection review comments', 'Assembly and detail assessment', 'Compartmentation coordination observations'], tools: 'AutoCAD · Bluebeam', codes: 'Applicable fire and building codes · listed assembly requirements', audience: 'Architects, main contractors, specialist contractors and project owners.' },
  { slug: 'owners-engineering', title: 'Owner’s Engineering & Technical Advisory', short: 'Independent technical representation, design to handover.', intro: 'We support owners with an independent engineering perspective throughout project delivery. Technical oversight connects the design brief, consultant and contractor submissions, site verification and authority requirements.', image: 'engineering', icon: 'people', group: 'Technical advisory', scope: ['Owner’s technical representation during design and delivery', 'Consultant and contractor submission coordination', 'Third-party audits and non-conformance (NCR) review', 'Authority liaison and approval submission support'], outputs: ['Technical advisory and review reports', 'Documented compliance observations', 'Submission coordination and close-out recommendations'], tools: 'Procore · Bluebeam · AutoCAD', codes: 'Project-specific codes · SAES · applicable authority criteria', audience: 'Developers, project owners, delivery teams and asset managers.' },
  { slug: 'design-verification', title: 'Third-Party Design Verification', short: 'Independent scrutiny before authority submission.', intro: 'Independent engineering review of contractor and consultant drawings, hydraulic calculations and submittals prior to authority submission — identifying coordination gaps and compliance issues before documents move into review or construction.', image: 'plans', icon: 'check', group: 'Technical advisory', scope: ['Contractor and consultant drawing review', 'Hydraulic calculation and design criteria verification', 'Technical submittal reviews before authority submission', 'Constructability and interdisciplinary coordination checks'], outputs: ['Independent technical review report', 'Marked-up drawings and calculation observations', 'Review response and coordination register'], tools: 'HydraCalc · AutoCAD · Bluebeam', codes: 'Applicable jurisdiction codes · project design criteria', audience: 'Owners, MEP consultants, main contractors and design managers.' },
  { slug: 'temporary-construction-facilities', title: 'Temporary Construction Facilities (TCF) Review', short: 'Life safety throughout the construction phase.', intro: 'Technical review and approval of construction-phase life safety plans, laydown layouts and temporary site safety measures in line with Saudi Aramco LPD criteria where applicable.', image: 'gen/svc-site-safety', icon: 'building', group: 'Technical advisory', scope: ['Construction-phase life safety plans', 'Laydown areas, temporary accommodation and site layouts', 'Temporary fire protection and emergency access considerations', 'Technical review against Saudi Aramco LPD criteria where applicable'], outputs: ['Temporary facility plan review', 'Site life safety observations', 'Technical comments for submission coordination'], tools: 'AutoCAD · Bluebeam', codes: 'Saudi Aramco LPD criteria where applicable · project-specific safety requirements', audience: 'Construction managers, contractors, project owners and site teams.' },
  { slug: 'testing-commissioning', title: 'Testing, Commissioning & Handover', short: 'From installed systems to verified performance.', intro: 'Site inspection and witnessing of active system testing — NFPA 20 fire pumps, alarm interface triggers and clean agent discharge — giving handover teams a clear, documented basis for action and a zero-defect handover objective.', image: 'gen/svc-commissioning', icon: 'settings', group: 'Technical advisory', scope: ['Fire pump testing witness and technical inspection (NFPA 20)', 'Alarm interface and cause-and-effect testing review', 'Clean agent system discharge testing and documentation review', 'Non-conformance follow-up and handover advisory'], outputs: ['Inspection and witnessing observations', 'Testing documentation review', 'Handover and technical close-out recommendations'], tools: 'Procore · Bluebeam', codes: 'NFPA 20 · applicable system standards and approved design criteria', audience: 'Owners, commissioning teams, contractors and facility operators.' },
  { slug: 'civil-structural', title: 'Civil & Structural Engineering', short: 'Site utilities, structural integrity and forensic review.', intro: 'Land development and site utilities — site grading, stormwater management (hydraulics & hydrology) and layout optimisation — together with structural design validation, code compliance reviews (IS Codes, IBC) and forensic investigations.', image: 'structure', icon: 'building', group: 'Civil & structural', scope: ['Land development, site grading and layout optimisation', 'Stormwater management, hydraulics and hydrology', 'Structural integrity and design validation (IS Codes, IBC)', 'Forensic investigations and structural compliance review'], outputs: ['Civil and structural engineering reviews', 'Site utility and drainage design documentation', 'Structural assessment and investigation findings'], tools: 'AutoCAD · coordinated engineering analysis', codes: 'Applicable IS Codes · IBC · project-specific civil and structural standards', audience: 'Developers, civil consultants, architects and project owners.' },
  { slug: 'pe-stamp', title: 'PE Stamp Services', short: 'Professional engineering stamping in licensed US states.', intro: 'Official Professional Engineering stamping across licensed US states (Nevada, Kentucky, Texas, New York), within the engineer’s licensed discipline. Each enquiry begins with a review of the project location, scope and technical documentation.', image: 'highrise', icon: 'document', group: 'Civil & structural', scope: ['Project and jurisdiction eligibility review', 'Engineering document and calculation assessment', 'Fire protection engineering: Texas, New York and Kentucky', 'Civil engineering: Nevada, Texas, New York and Kentucky'], outputs: ['Engineering review comments', 'Professional engineering sealing where appropriate to the agreed scope', 'Jurisdiction-specific documentation coordination'], tools: 'AutoCAD · Bluebeam · applicable engineering analysis', codes: 'Applicable state professional engineering and building requirements', audience: 'Architects, engineering consultants, contractors and US project owners.' },
];

/** Software table from the client guideline: package · technical application · delivered outputs. */
export const software = [
  { name: 'AutoSPRINK', companion: 'HydraCAD / HydraCalc', icon: 'water', label: 'Water-based systems', text: 'Wet/dry fire sprinkler systems, standpipes, deluge systems and fire pump supply networks.', output: '3D piping layouts, pipe sizing and hydraulic calculation packages.' },
  { name: 'FDS / PyroSim', companion: 'Fire Dynamics Simulator', icon: 'flame', label: 'Computational fluid dynamics', text: 'CFD fire dynamics and smoke behaviour modelling.', output: 'Tenability analyses, smoke movement studies and performance-based design solutions.' },
  { name: 'Pathfinder', companion: 'Occupant movement', icon: 'egress', label: 'Evacuation modelling', text: '3D occupant movement and evacuation modelling.', output: 'Egress time calculations, exit capacity validations and bottleneck identification.' },
  { name: 'CONTAM', companion: 'Airflow & pressure', icon: 'wind', label: 'Multizone analysis', text: 'Multizone airflow and pressure distribution modelling.', output: 'Stairwell pressurisation design, atrium smoke control and zone pressure mapping.' },
  { name: 'AutoCAD', companion: 'Procore / Bluebeam', icon: 'layers', label: 'Design coordination', text: 'Integrated life safety design drawing sets and markup management.', output: 'Issued for Construction (IFC) packages, submittal reviews and markup coordination.' },
];

export const products = [
  { slug: 'fire-alarm-systems', title: 'Fire Alarm Systems', short: 'Detection, notification and coordinated system interfaces.', icon: 'alarm', image: 'gen/prod-fire-alarm', alt: 'Red addressable fire alarm control panel with manual call point and sounder', intro: 'Fire alarm systems support early notification and coordinated emergency response. We supply and install alarm systems matched to the building occupancy, required interfaces and applicable standards.', applications: ['Commercial and residential buildings', 'Industrial facilities and mixed-use developments', 'Notification and system interface coordination'], considerations: ['Detection and notification strategy', 'System zoning and cause-and-effect requirements', 'Compatibility with the approved life safety design'] },
  { slug: 'fire-extinguishers', title: 'Fire Extinguishers', short: 'Portable fire protection matched to the hazard.', icon: 'flame', image: 'gen/prod-extinguishers', alt: 'Three portable fire extinguishers of different types', intro: 'Portable extinguishers form part of a coordinated first-response strategy. Selection depends on the fire hazard, occupancy, placement and applicable code requirements.', applications: ['Commercial workplaces and public areas', 'Plant rooms and industrial spaces', 'Construction and temporary facilities'], considerations: ['Hazard classification and appropriate extinguishing agent', 'Location, access and coverage requirements', 'Inspection and maintenance provisions'] },
  { slug: 'sprinkler-hydrant', title: 'Sprinkler & Hydrant Systems', short: 'Water-based protection, from supply to discharge.', icon: 'water', image: 'gen/prod-sprinkler-hydrant', alt: 'Fire hose reel, hydrant landing valve and sprinkler heads', intro: 'Water-based fire protection combines the supply network, piping and discharge devices into one designed system — supplied and installed in line with the project’s fire protection strategy and hydraulic design.', applications: ['Commercial and high-rise developments', 'Industrial premises and compounds', 'Building and site fire protection networks'], considerations: ['Design demand and hydraulic analysis', 'Water supply and fire pump coordination', 'Piping layout and interface requirements'] },
  { slug: 'detection', title: 'Smoke & Heat Detection', short: 'Early detection for the building environment.', icon: 'sensor', image: 'gen/prod-detection', alt: 'White ceiling smoke and heat detectors with a mounting base', intro: 'Detection devices should suit the building use and environmental conditions. We help frame requirements for smoke and heat detection within the wider alarm strategy, then supply and install the agreed devices.', applications: ['Occupied spaces and circulation areas', 'Service rooms and plant areas', 'Commercial and residential developments'], considerations: ['Environmental conditions and detector suitability', 'Coverage and location coordination', 'Alarm system compatibility'] },
  { slug: 'emergency-lighting', title: 'Emergency Lighting & Safety Equipment', short: 'Clear guidance along emergency escape routes.', icon: 'egress', image: 'gen/prod-emergency-lighting', alt: 'Illuminated green running-man exit sign and emergency lights', intro: 'Emergency lighting and safety equipment support wayfinding and evacuation when normal conditions are interrupted. Discuss the exit strategy and building requirements to establish the relevant scope.', applications: ['Escape routes, stairs and exits', 'Commercial and hospitality buildings', 'Public and shared residential spaces'], considerations: ['Exit signage and route visibility', 'Emergency supply coordination', 'Inspection and maintenance access'] },
  { slug: 'security-surveillance', title: 'Security & Surveillance Solutions', short: 'CCTV and access control for coordinated security.', icon: 'camera', image: 'gen/prod-security', alt: 'Dome and bullet CCTV cameras with an access control reader', intro: 'Security solutions should reflect the use, layout and operational requirements of a facility. Share your CCTV, surveillance and access-control requirements for a project-specific enquiry.', applications: ['Commercial and residential properties', 'Industrial and infrastructure facilities', 'Controlled entrances and perimeter areas'], considerations: ['Coverage and access strategy', 'Building systems and network coordination', 'Operational and privacy requirements'] },
];

/** Supply & installation delivery path (products + installation, per client brief). */
export const deliverySteps = [
  { title: 'Assess', text: 'Building use, hazards, jurisdiction and the approved fire & life safety strategy.' },
  { title: 'Engineer', text: 'Design, hydraulic and code verification so equipment suits the building.' },
  { title: 'Supply', text: 'Fire safety and security equipment selected for the project requirements.' },
  { title: 'Install', text: 'Installation coordinated with architecture, structure and MEP interfaces.' },
  { title: 'Commission', text: 'Testing, witnessing and documentation toward a clean, zero-defect handover.' },
];

export const sectors = [
  { slug: 'oil-gas', title: 'Oil & Gas / Giga-Compound Developments', short: 'Industrial environments and large residential compounds.', image: 'industrial', icon: 'settings', stat: '1,970 units', statLabel: 'across 6 compounds', intro: 'Large compounds and industrial developments bring together site-wide infrastructure, building life safety and rigorous owner requirements. Our leadership brings owner’s technical authority experience for Saudi Aramco residential developments.', experience: 'Lead owner’s technical authority experience for 1,970 residential units across six compounds under Saudi Aramco Loss Prevention Department (LPD) and Fire Prevention Department (FrPD) jurisdiction.', challenges: ['Coordinating fire protection across multiple buildings', 'Aligning technical submissions with owner and authority criteria', 'Managing construction-phase safety and handover'], related: ['owners-engineering', 'fire-protection-engineering', 'temporary-construction-facilities'] },
  { slug: 'hospitality', title: 'Luxury Hospitality & Master Developments', short: 'Life safety for exceptional guest environments.', image: 'gen/sector-hospitality', icon: 'building', stat: '$5B', statLabel: 'hospitality & marine portfolio', intro: 'Hospitality projects balance distinctive architecture, guest experience and complex operating requirements. Fire engineering and technical oversight need to be integrated early in design and delivery.', experience: 'Engineering delivery and life safety oversight for 5-star hotel developments and marine island assets — the $5B “The World Islands” Dubai, Côte d’Azur and Portofino.', challenges: ['Life safety within complex architectural layouts', 'Coordination of hospitality and mixed-use occupancies', 'Systems integration and phased project delivery'], related: ['fire-protection-engineering', 'code-consulting', 'testing-commissioning'] },
  { slug: 'high-rise', title: 'High-Rise Residential & Commercial Towers', short: 'A coordinated strategy for vertical communities.', image: 'highrise', icon: 'building', stat: 'G+8 – G+24', statLabel: 'residential towers', intro: 'High-rise buildings require a connected approach to evacuation, smoke movement, water-based protection and structural safety. We support project teams with code-led design and independent technical reviews.', experience: 'Fire safety strategy, egress design and Civil Defence approvals for high-density residential towers (G+8 to G+24) and mixed-use complexes.', challenges: ['Means of egress and evacuation capacity', 'Stairwell pressurisation and smoke control', 'Fire protection and structural coordination'], related: ['fire-protection-engineering', 'code-consulting', 'civil-structural'] },
  { slug: 'infrastructure', title: 'Specialized Infrastructure & Industrial Facilities', short: 'Engineering for demanding, specialised environments.', image: 'structure', icon: 'settings', stat: 'IIT Kanpur', statLabel: 'Pseudo Dynamic Test Lab', intro: 'Specialised facilities need engineering that responds to their processes, structures and occupancy. We bring civil, structural and fire protection perspectives to independent design review and technical advisory.', experience: 'Structural and fire engineering experience for high-tech testing facilities (IIT Kanpur Pseudo Dynamic Test Lab) and commercial developments.', challenges: ['Facility-specific safety and structural requirements', 'Interdisciplinary design and constructability', 'Documented verification and commissioning'], related: ['civil-structural', 'design-verification', 'testing-commissioning'] },
];

export const programs = [
  { name: 'CFPS', title: 'Certified Fire Protection Specialist', text: 'Exam preparation based on the NFPA Fire Protection Handbook, focusing on suppression, detection, hazard identification and life safety principles.', topics: ['Fire suppression and detection', 'Hazard identification', 'Life safety principles'], audience: 'Engineers, consultants and fire safety professionals.' },
  { name: 'CWBSP', title: 'Certified Water-Based Systems Professional', text: 'Specialised coursework on layout, hydraulic design, testing and maintenance of water-based systems.', topics: ['Layout and hydraulic design', 'Testing and maintenance', 'NFPA 13, 14, 20, 25 and IS standards'], audience: 'Design engineers, consultants and water-based system specialists.' },
  { name: 'CFPE', title: 'Certified Fire Plan Examiner', text: 'Plan review methodology, building classification, code interpretation and inspection workflows.', topics: ['Building classification and plan review', 'NBC 2016 Part 4 and NFPA 101 / 1', 'Inspection workflows'], audience: 'Plan reviewers, engineers and authority personnel.' },
];

export const leader = {
  name: 'M. Waseem Mehdi',
  postnominals: 'P.E., FICE',
  role: 'Principal Engineer & Managing Director',
  academic: ['PhD Candidate in Fire Protection Engineering', 'M.Tech in Structural Engineering', 'B.Tech · Indian Institute of Technology (IIT) Kanpur', 'Harvard Business School CORe'],
  certifications: ['CFPS', 'CFPE', 'CWBSP', 'CHRS', 'PMP'],
  certificationNote: 'Certified Fire Protection Specialist, Certified Fire Plan Examiner, Certified Water-Based Systems Professional and Certified Hazard Recognition Specialist via NFPA · Project Management Professional.',
  fellowships: ['Fellow of the Institution of Civil Engineers, UK (FICE)', 'Member, Society of Fire Protection Engineers (SFPE, USA)'],
  licensure: [
    { discipline: 'Fire Protection Engineering', states: ['Texas', 'New York', 'Kentucky'] },
    { discipline: 'Civil Engineering', states: ['Nevada', 'Texas', 'New York', 'Kentucky'] },
  ],
  saudi: 'Registered Professional Engineer with the Saudi Council of Engineers.',
  track: [
    'Former Owner’s Technical Authority for Saudi Aramco residential developments (1,970 units).',
    'Director of Project Delivery for $5B luxury hospitality and marine portfolios in Dubai.',
    'Senior Project Manager for high-rise residential developments.',
  ],
};

/** Kept for compatibility with summary lists. */
export const credentials = [...leader.academic, 'CFPS · CFPE · CWBSP · CHRS · PMP', ...leader.fellowships];

export const offices = [
  { icon: 'pin', title: 'Saudi Arabia Office', text: 'Riyadh, Kingdom of Saudi Arabia' },
  { icon: 'building', title: 'India Operations', text: 'Civil & Structural Design Center' },
  { icon: 'globe', title: 'United States Licensing Footprint', text: 'Registered PE offices — Nevada, Texas, New York, Kentucky' },
];

export const nav: [string, string][] = [
  ['Home', '/'], ['About', '/about/'], ['Services', '/services/'], ['Products', '/products/'],
  ['Sectors', '/sectors/'], ['Training', '/training/'], ['Resources', '/resources/'], ['Contact', '/contact/'],
];

export const staticPages = ['about', 'services', 'products', 'sectors', 'training', 'resources', 'leadership', 'contact', 'request-review', 'engineering-software', 'privacy', 'terms'];
export const allRoutes = ['/', ...staticPages.map((x) => `/${x}/`), ...services.map((x) => `/services/${x.slug}/`), ...products.map((x) => `/products/${x.slug}/`), ...sectors.map((x) => `/sectors/${x.slug}/`)];
