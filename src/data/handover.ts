// Silo 05 — Off-plan developer APL hubs & handover projects (/handover/[developer]/[project]).
// Priority 50 projects from Market Bible Module 13.2. Expansion 30: valuation data pending (null) until desk confirms.

export type Developer = { slug: string; name: string; hub: boolean; blurb: string; nocDays: string; escrow: string };

export const DEVELOPERS: Developer[] = [
  { slug: 'emaar', name: 'Emaar Properties', hub: true, nocDays: '2–3 working days', escrow: 'Project-specific escrow IBAN per tower', blurb: 'The city’s biggest master developer, behind Downtown, Dubai Hills, Creek Harbour, Emaar Beachfront, The Valley and The Oasis. Its projects are approved by more lenders than most, usually 20 to 22 banks.' },
  { slug: 'sobha', name: 'Sobha Realty', hub: true, nocDays: '3–5 working days', escrow: 'Escrow per project phase', blurb: 'Builds in-house from design to finishing. Its projects include Sobha Hartland I and II, Sobha One and Sobha Reserve. Around 17 or 18 banks approve them, and DIB and Emirates NBD are especially active.' },
  { slug: 'meraas', name: 'Meraas', hub: true, nocDays: '3–5 working days', escrow: 'Dubai Holding escrow structure', blurb: 'Part of Dubai Holding, responsible for City Walk, Bluewaters, Nad Al Sheba Gardens and Madinat Jumeirah Living. Roughly 20 to 21 lenders accept its projects.' },
  { slug: 'nakheel', name: 'Nakheel', hub: true, nocDays: '5–7 working days', escrow: 'Escrow per master community', blurb: 'Created Palm Jumeirah and is now delivering Palm Jebel Ali, Dubai Islands and Tilal Al Furjan. Recent launches are on about 19 to 20 bank lists.' },
  { slug: 'damac', name: 'DAMAC Properties', hub: true, nocDays: '5–7 working days', escrow: 'Escrow per building', blurb: 'Delivers large numbers of units across DAMAC Hills, DAMAC Lagoons and Business Bay. Fewer lenders cover it, about 15 or 16, with DIB, Mashreq and CBD the most willing.' },
  { slug: 'aldar', name: 'Aldar Properties', hub: true, nocDays: '3–5 working days', escrow: 'ADREC escrow (Abu Dhabi) / DLD (Dubai)', blurb: 'The capital’s main developer, known for Yas, Saadiyat and Al Reem, now building Haven and Athlon in Dubai. Some 22 lenders approve its projects, among them FAB, ADCB and ADIB.' },
  { slug: 'ellington', name: 'Ellington Properties', hub: true, nocDays: '3–5 working days', escrow: 'Escrow per project', blurb: 'A smaller developer known for its design focus: Upper House, The Quayside, Mercer House and Ocean House. Its projects appear on about 16 approved lists.' },
  { slug: 'select-group', name: 'Select Group', hub: true, nocDays: '3–5 working days', escrow: 'Escrow per project', blurb: 'Concentrates on Dubai Marina and Business Bay with Peninsula, Six Senses Residences and Nautica. Around 17 or 18 banks lend on its towers.' },
  { slug: 'binghatti', name: 'Binghatti', hub: true, nocDays: '5–7 working days', escrow: 'Escrow per building', blurb: 'Builds quickly and partners with brands such as Jacob & Co and Mercedes-Benz. About 14 lenders approve it, chiefly DIB, CBD, Mashreq and RAKBANK.' },
  { slug: 'omniyat', name: 'Omniyat', hub: true, nocDays: '5–7 working days', escrow: 'Escrow per project', blurb: 'Works only at the very top of the market with ORLA, VELA and The Opus. Roughly 12 banks lend, usually through private-banking teams at HSBC, FAB and Emirates NBD.' },
  { slug: 'majid-al-futtaim', name: 'Majid Al Futtaim', hub: true, nocDays: '3–5 working days', escrow: 'Escrow per phase', blurb: 'Behind Tilal Al Ghaf and its Harmony, Aura and Alaya villa phases. Most of the larger Dubai lenders include it on their lists.' },
  { slug: 'arada', name: 'Arada', hub: true, nocDays: '3–5 working days', escrow: 'Escrow per phase', blurb: 'Based in Sharjah, where it built Aljada and Masaar, and now developing Jouri Hills in Dubai. About 18 lenders approve it, Sharjah Islamic Bank among them.' },
  { slug: 'azizi', name: 'Azizi Developments', hub: true, nocDays: '5–10 working days', escrow: 'Escrow per building', blurb: 'Produces a high volume of homes in Al Furjan, MBR City and Dubai South, including Venice and Riviera. Around 14 banks lend, led by DIB, CBD and Mashreq.' },
  { slug: 'danube', name: 'Danube Properties', hub: true, nocDays: '5–7 working days', escrow: 'Escrow per building', blurb: 'Best known for its 1%-a-month plans that continue after handover, at Oceanz, Viewz and Bayz. About 13 lenders approve it, CBD and RAKBANK most often.' },
  // Developers with project pages but no hub page.
  { slug: 'deyaar', name: 'Deyaar', hub: false, nocDays: '3–5 working days', escrow: 'Escrow per project', blurb: 'Developer linked to Dubai Islamic Bank.' },
  { slug: 'dubai-south', name: 'Dubai South Properties', hub: false, nocDays: '3–5 working days', escrow: 'Escrow per phase', blurb: 'State-backed master developer of the district around Al Maktoum Airport and Expo City.' },
  { slug: 'al-habtoor', name: 'Al Habtoor Group', hub: false, nocDays: '3–5 working days', escrow: 'Escrow per project', blurb: 'Builds hotels and homes along Sheikh Zayed Road.' },
  { slug: 'liv', name: 'LIV Developers', hub: false, nocDays: '3–5 working days', escrow: 'Escrow per project', blurb: 'Developer of waterfront towers in Dubai Marina.' },
  { slug: 'palma', name: 'Palma Holding', hub: false, nocDays: '5–7 working days', escrow: 'Escrow per project', blurb: 'Developer behind Serenia on Palm Jumeirah.' },
  { slug: 'union-properties', name: 'Union Properties / Wasl', hub: false, nocDays: '5–7 working days', escrow: 'Escrow per project', blurb: 'Active in Motor City and Zabeel.' },
  { slug: 'nikki-beach', name: 'Nikki Beach Residences (RAK)', hub: false, nocDays: '5–7 working days', escrow: 'RERA RAK escrow', blurb: 'Builds branded resort homes on Al Marjan Island.' },
  { slug: 'mr-c', name: 'Mr. C Residences', hub: false, nocDays: '5–7 working days', escrow: 'Escrow per project', blurb: 'Specialises in residences carrying hotel or designer brands.' },
  { slug: 'lum1nar', name: 'Lum1nar', hub: false, nocDays: '5–7 working days', escrow: 'Escrow per project', blurb: 'Developer focused on Jumeirah Village Circle.' },
];

export type Project = {
  slug: string;
  dev: string;
  name: string;
  community: string;
  window: string;
  plan: string | null; // e.g. '80/20'
  balancePct: number | null; // % due at handover
  launch: number | null; // AED M
  value: number | null; // AED M 2026 valuation
  apl: number | null; // bank count
  top: string[]; // top APL banks (short keys)
  wave: 2 | 3;
};

const p = (dev: string, slug: string, name: string, community: string, window: string, plan: string, launch: number, value: number, apl: number, top: string): Project => ({
  slug, dev, name, community, window, plan, balancePct: Number(plan.split('/')[1]) || null, launch, value, apl, top: top.split(','), wave: 2,
});
const x = (dev: string, slug: string, name: string, community: string, window = '2027–2028'): Project => ({
  slug, dev, name, community, window, plan: null, balancePct: null, launch: null, value: null, apl: null, top: [], wave: 3,
});

export const PROJECTS: Project[] = [
  p('emaar', 'marina-shores', 'Marina Shores', 'Dubai Marina', 'Q4 2026', '80/20', 1.5, 2.35, 22, 'ENBD,DIB,FAB'),
  p('emaar', 'st-regis-residences-downtown', 'St. Regis Residences', 'Downtown Dubai', 'Q4 2026', '70/30', 2.3, 3.4, 22, 'ENBD,HSBC,FAB'),
  p('emaar', 'armani-beach-residences', 'Armani Beach Residences', 'Palm Jumeirah', 'Q4 2026', '60/40', 21.5, 28.0, 18, 'HSBC,FAB,ENBD'),
  p('emaar', 'beach-vista-emaar-beachfront', 'Beach Vista / Seapoint', 'Emaar Beachfront', '2026–27', '80/20', 2.1, 3.15, 22, 'ENBD,DIB,ADCB'),
  p('emaar', 'creek-waters-dubai-creek', 'Creek Waters 1 & 2', 'Dubai Creek Harbour', '2027', '80/20', 1.7, 2.3, 21, 'ENBD,DIB,Mashreq'),
  p('emaar', 'the-oasis-by-emaar', 'The Oasis — Palmiera', 'Dubailand', '2027', '80/20', 8.5, 11.2, 20, 'FAB,ENBD,HSBC'),
  p('emaar', 'park-horizon-dubai-hills', 'Park Horizon', 'Dubai Hills Estate', 'Q4 2026', '80/20', 1.35, 1.95, 22, 'ENBD,HSBC,ADCB'),
  p('emaar', 'elora-the-valley', 'Elora & Farm Gardens', 'The Valley', 'Q4 2026', '80/20', 1.65, 2.45, 21, 'DIB,ENBD,ADIB'),
  p('emaar', 'seagate-rashid-yachts', 'Seagate & Seascape', 'Mina Rashid', 'Q4 2026', '80/20', 1.4, 2.05, 20, 'ENBD,DIB,FAB'),
  p('emaar', 'golf-trails-emaar-south', 'Fairway Villas / Golf Trails', 'Emaar South', '2026–27', '80/20', 1.25, 1.8, 20, 'ENBD,DIB,ADCB'),
  p('sobha', 'sobha-one', 'Sobha One Towers A–E', 'Ras Al Khor', 'Q4 2026', '60/40', 1.6, 2.15, 18, 'ENBD,DIB,Mashreq'),
  p('sobha', 'sobha-hartland-2-330-riverside', '330 Riverside Crescent', 'Sobha Hartland II', '2026–27', '60/40', 1.45, 1.95, 18, 'DIB,ENBD,ADCB'),
  p('sobha', 'sobha-seahaven-marina', 'Sobha SeaHaven', 'Dubai Harbour', 'Q4 2026', '80/20', 3.2, 4.1, 17, 'HSBC,ENBD,Mashreq'),
  p('sobha', 'sobha-reserve-wadi-al-safa', 'Sobha Reserve Villas', 'Wadi Al Safa 2', 'Q4 2026', '80/20', 7.6, 9.8, 18, 'FAB,ENBD,DIB'),
  p('sobha', 'verde-by-sobha-jlt', 'Verde by Sobha', 'JLT', 'Q4 2026', '80/20', 1.75, 2.3, 18, 'ENBD,Mashreq,CBD'),
  p('meraas', 'central-park-city-walk', 'Central Park — Fern / Erin', 'City Walk', 'Q4 2026', '70/30', 1.8, 2.65, 21, 'ENBD,DIB,FAB'),
  p('meraas', 'nad-al-sheba-gardens', 'Nad Al Sheba Gardens', 'Nad Al Sheba', '2026–27', '60/40', 3.6, 5.1, 21, 'DIB,ENBD,ADIB'),
  p('meraas', 'madinat-jumeirah-living-elara', 'MJL Lamaa & Elara', 'Umm Suqeim', 'Q4 2026', '70/30', 1.95, 2.85, 21, 'ENBD,HSBC,DIB'),
  p('meraas', 'jebel-ali-village-townhouses', 'Jebel Ali Village', 'Jebel Ali', 'Q4 2026', '60/40', 2.4, 3.45, 20, 'ENBD,DIB,Mashreq'),
  p('meraas', 'design-quarter-d3', 'Design Quarter at d3', 'Dubai Design District', '2027', '60/40', 1.87, 2.5, 20, 'ENBD,FAB,ADCB'),
  p('nakheel', 'palm-beach-towers-1-2-3', 'Palm Beach Towers', 'Palm Jumeirah', 'Q4 2026', '60/40', 2.6, 3.8, 20, 'ENBD,DIB,HSBC'),
  p('nakheel', 'tilal-al-furjan-villas', 'Tilal Al Furjan', 'Al Furjan', 'Q4 2026', '50/50', 2.9, 4.35, 20, 'DIB,ENBD,ADIB'),
  p('nakheel', 'rixos-dubai-islands', 'Rixos & Bay Villas', 'Dubai Islands', '2027', '80/20', 2.6, 3.5, 19, 'ENBD,DIB,FAB'),
  p('damac', 'damac-lagoons-monte-carlo', 'DAMAC Lagoons', 'Hessa Street', 'Q4 2026', '60/40', 1.9, 2.75, 16, 'DIB,ENBD,Mashreq'),
  p('damac', 'damac-bay-cavalli-harbour', 'DAMAC Bay by Cavalli', 'Dubai Harbour', '2027', '80/20', 2.9, 3.7, 16, 'DIB,Mashreq,CBD'),
  p('damac', 'canal-heights-business-bay', 'Canal Heights & Chic', 'Business Bay', '2026–27', '80/20', 1.25, 1.65, 16, 'DIB,ADCB,RAKBANK'),
  p('damac', 'elo-camelia-damac-hills-2', 'Camelia & ELO', 'DAMAC Hills 2', 'Q4 2026', '60/40', 1.31, 1.72, 15, 'DIB,Mashreq,CBD'),
  p('damac', 'safa-two-de-grisogono', 'Safa One & Safa Two', 'Al Safa / SZR', '2026–27', '75/25', 1.6, 2.15, 16, 'DIB,ENBD,CBD'),
  p('aldar', 'haven-by-aldar-dubailand', 'Haven & Athlon', 'Dubailand', '2027', '60/40', 2.5, 3.25, 22, 'FAB,ADCB,ADIB'),
  p('aldar', 'yas-park-views-abu-dhabi', 'Yas Park & Saadiyat', 'Abu Dhabi', '2026–27', '60/40', 2.2, 2.95, 22, 'FAB,ADCB,ADIB'),
  p('ellington', 'upper-house-jlt', 'Upper House', 'JLT', 'Q4 2026', '70/30', 1.4, 1.95, 16, 'ENBD,Mashreq,CBD'),
  p('ellington', 'ocean-house-palm-jumeirah', 'Ocean House', 'Palm Jumeirah', 'Q4 2026', '60/40', 9.5, 13.5, 16, 'HSBC,ENBD,FAB'),
  p('ellington', 'the-quayside-business-bay', 'The Quayside', 'Business Bay', 'Q4 2026', '70/30', 1.65, 2.25, 16, 'ENBD,CBD,ADCB'),
  p('ellington', 'mercer-house-uptown-dubai', 'Mercer House', 'Uptown Dubai', '2027', '70/30', 2.1, 2.65, 16, 'ENBD,Mashreq,CBD'),
  p('select-group', 'peninsula-four-the-plaza', 'Peninsula Four', 'Business Bay', 'Q4 2026', '60/40', 1.55, 2.2, 18, 'ENBD,HSBC,Mashreq'),
  p('select-group', 'six-senses-dubai-marina', 'Six Senses Residences', 'Dubai Marina', '2026–27', '40/60', 5.8, 7.5, 17, 'HSBC,FAB,ENBD'),
  p('select-group', 'nautica-maritime-city', 'Nautica 1 & 2', 'Dubai Maritime City', 'Q4 2026', '40/60', 1.45, 1.95, 17, 'ENBD,Mashreq,CBD'),
  p('binghatti', 'burj-binghatti-jacob-co', 'Burj Binghatti Jacob & Co', 'Business Bay', '2026–27', '70/30', 8.2, 10.1, 14, 'DIB,Mashreq,CBD'),
  p('binghatti', 'binghatti-skyrise-trillionaire', 'Binghatti Skyrise & Trillionaire', 'Business Bay', 'Q4 2026', '70/30', 1.45, 1.85, 14, 'DIB,CBD,RAKBANK'),
  p('binghatti', 'binghatti-hills-amberhall', 'Binghatti Hills & Amberhall', 'Dubai Science Park / JVC', 'Q4 2026', '70/30', 0.85, 1.15, 14, 'DIB,CBD,Ajman'),
  p('omniyat', 'orla-dorchester-palm', 'ORLA Dorchester Collection', 'Palm Jumeirah', 'Q4 2026', '50/50', 22.0, 29.5, 12, 'HSBC,FAB,ENBD'),
  p('danube', 'oceanz-viewz-by-danube', 'Oceanz & Viewz', 'Maritime City / JLT', '2026–27', '65/35', 1.15, 1.45, 13, 'CBD,RAKBANK,DIB'),
  p('azizi', 'azizi-venice-dubai-south', 'Azizi Venice & Riviera Rêve', 'Dubai South / MBR City', '2026–27', '50/50', 0.89, 1.18, 14, 'DIB,CBD,Mashreq'),
  p('deyaar', 'tria-mar-casa-deyaar', 'Tria & Mar Casa', 'DSO / Maritime City', 'Q4 2026', '50/50', 0.85, 1.2, 16, 'DIB,ENBD,CBD'),
  p('dubai-south', 'south-bay-phase-4-5-6', 'South Bay & Expo Valley', 'Dubai South / Expo City', 'Q4 2026', '60/40', 2.6, 3.6, 18, 'ENBD,DIB,FAB'),
  p('al-habtoor', 'al-habtoor-tower', 'Al Habtoor Tower', 'Business Bay / SZR', 'Q4 2026', '60/40', 1.84, 2.35, 16, 'ENBD,CBD,Mashreq'),
  p('liv', 'liv-lux-dubai-marina', 'LIV LUX & LIV Waterside', 'Dubai Marina', 'Q4 2026', '60/40', 1.85, 2.55, 15, 'HSBC,ENBD,CBD'),
  p('palma', 'serenia-living-palm-jumeirah', 'Serenia Living', 'Palm Jumeirah', 'Q4 2026', '50/50', 8.0, 11.5, 16, 'HSBC,ENBD,FAB'),
  p('arada', 'jouri-hills-arman-aljada', 'Jouri Hills & Aljada', 'Jumeirah Golf Estates / Sharjah', 'Q4 2026', '60/40', 3.9, 5.2, 18, 'DIB,ENBD,SIB'),
  p('union-properties', 'takaya-motor-city', 'Takaya / Park Views Residences', 'Motor City / Zabeel', 'Q4 2026', '40/60', 1.4, 1.95, 20, 'ENBD,DIB,FAB'),
  // 30 expansion projects (Wave 3) — figures confirmed by the desk before publishing.
  x('majid-al-futtaim', 'harmony-aura-tilal-al-ghaf', 'Harmony & Aura', 'Tilal Al Ghaf'),
  x('majid-al-futtaim', 'alaya-lanai-islands-tilal-al-ghaf', 'Alaya & Lanai Islands', 'Tilal Al Ghaf'),
  x('nakheel', 'ghaf-woods-serra-cilia', 'Ghaf Woods', 'Al Barsha South'),
  x('emaar', 'address-residences-zabeel', 'Address Residences Zabeel', 'Zabeel'),
  x('emaar', 'the-heights-country-club', 'The Heights Country Club', 'Wadi Al Safa'),
  x('emaar', 'palace-residences-dubai-hills', 'Palace Residences', 'Dubai Hills Estate'),
  x('emaar', 'bayview-address-resorts-beachfront', 'Bayview by Address Resorts', 'Emaar Beachfront'),
  x('emaar', 'valia-nima-the-valley', 'Valia & Nima', 'The Valley'),
  x('sobha', 'sobha-hartland-greens-waves-opulence', 'Hartland Greens & Waves Opulence', 'Sobha Hartland'),
  x('sobha', 'sobha-orbis-motor-city', 'Sobha Orbis', 'Motor City'),
  x('sobha', 'sobha-elwood-dubailand', 'Sobha Elwood', 'Dubailand'),
  x('meraas', 'bluewaters-bay-residences', 'Bluewaters Bay', 'Bluewaters Island'),
  x('aldar', 'acres-villas-dubailand', 'The Acres', 'Dubailand'),
  x('meraas', 'verve-city-walk', 'Verve City Walk', 'City Walk'),
  x('nakheel', 'palm-jebel-ali-frond-villas', 'Palm Jebel Ali Frond Villas', 'Palm Jebel Ali'),
  x('nakheel', 'como-residences-palm-jumeirah', 'Como Residences', 'Palm Jumeirah'),
  x('damac', 'autograph-collection-damac-hills', 'Autograph Collection', 'DAMAC Hills'),
  x('dubai-south', 'sun-city-dubailand', 'Sun City', 'Dubailand'),
  x('aldar', 'verdes-by-haven-dubai', 'Verdes by Haven', 'Dubailand'),
  x('nikki-beach', 'nikki-beach-residences-al-marjan', 'Nikki Beach Residences', 'Al Marjan Island, RAK'),
  x('select-group', 'one-river-point-business-bay', 'One River Point', 'Business Bay'),
  x('ellington', 'hillmont-residences-jvc', 'Hillmont Residences', 'JVC'),
  x('binghatti', 'binghatti-aquarise-business-bay', 'Binghatti Aquarise', 'Business Bay'),
  x('binghatti', 'binghatti-ghost-al-jaddaf', 'Binghatti Ghost', 'Al Jaddaf'),
  x('emaar', 'town-square-aria-fia-savannah', 'Aria, Fia & Savannah', 'Town Square Dubai'),
  x('lum1nar', 'lum1nar-vistara-jvc', 'Vistara', 'JVC'),
  x('omniyat', 'karl-lagerfeld-villas-meydan', 'Karl Lagerfeld Villas', 'Meydan'),
  x('mr-c', 'eden-hills-mr-c-residences', 'Eden Hills & Mr. C Residences', 'Al Barsha / Jumeirah'),
  x('emaar', 'greenside-club-drive-dubai-hills', 'Greenside & Club Drive', 'Dubai Hills Estate'),
  x('aldar', 'the-source-mamsha-saadiyat-abu-dhabi', 'The Source & Mamsha', 'Saadiyat Island, Abu Dhabi'),
];

export const devBy = (slug: string) => DEVELOPERS.find((d) => d.slug === slug);
export const projectsOf = (dev: string) => PROJECTS.filter((pr) => pr.dev === dev);
