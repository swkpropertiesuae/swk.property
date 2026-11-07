// 24-bank rate & revert bible — Market Bible Module 10 (November 2026).
// Revert = latest published 3M EIBOR (BENCH.eibor3m) + margin. Fixed rates are illustrative lowest advertised tiers.
import { BENCH } from './site';

export type Bank = {
  slug: string; // /rates/[slug]
  key: string; // short id used by compare pages
  name: string;
  short: string;
  ar: string;
  type: 'Islamic' | 'Conventional' | 'Dual';
  intro: number;
  introTerm: '1Y' | '2Y';
  fixed3: number;
  fixed5: number;
  margin: number;
  floor: number;
  feePurchase: string;
  feeBuyout: string;
  overpay: number; // free partial settlement % per year
  nrLtv: number | null; // non-resident max LTV
  ccFactor: 3 | 5; // % of card limits counted in DBR
  externalLife: boolean; // accepts assigned external life policy
  hq: string;
  note: string;
};

const b = (
  slug: string, key: string, name: string, short: string, ar: string, type: Bank['type'],
  intro: number, introTerm: Bank['introTerm'], fixed3: number, fixed5: number, margin: number, floor: number,
  feePurchase: string, feeBuyout: string, overpay: number, nrLtv: number | null, hq: string, note: string,
  opts: { cc3?: boolean; ext?: boolean } = {},
): Bank => ({
  slug, key, name, short, ar, type, intro, introTerm, fixed3, fixed5, margin, floor, feePurchase, feeBuyout,
  overpay, nrLtv, ccFactor: opts.cc3 ? 3 : 5, externalLife: !!opts.ext, hq, note,
});

export const BANKS: Bank[] = [
  b('sharjah-islamic-bank-mortgage', 'sib', 'Sharjah Islamic Bank', 'SIB', 'مصرف الشارقة الإسلامي', 'Islamic', 3.75, '1Y', 4.15, 4.49, 1.75, 3.75, '0%', '0%', 10, null, 'Sharjah',
    'Lowest headline 1-year Islamic profit rate on the panel, but the 3.75% floor equals the teaser—so the rate can never drop below today’s intro level after reversion.'),
  b('emirates-nbd-mortgage', 'emirates-nbd', 'Emirates NBD', 'ENBD', 'بنك الإمارات دبي الوطني', 'Conventional', 3.89, '2Y', 3.99, 4.29, 1.65, 2.49, '0.26–1.05%', '0%', 10, 60, 'Dubai',
    'The largest Dubai lender by mortgage book and on almost every developer APL; strongest for handovers and salaried expats at approved employers.', { ext: true }),
  b('united-arab-bank-mortgage', 'uab', 'United Arab Bank', 'UAB', 'البنك العربي المتحد', 'Conventional', 3.89, '2Y', 4.05, 4.35, 1.5, 2.75, '0.525%', '0%', 10, null, 'Sharjah',
    'Matches Emirates NBD’s 2-year headline with a slimmer +1.50% revert margin; resident-only lending.'),
  b('first-abu-dhabi-bank-fab-mortgage', 'fab', 'First Abu Dhabi Bank', 'FAB', 'بنك أبوظبي الأول', 'Conventional', 3.95, '2Y', 3.99, 4.25, 1.5, 2.25, '0–1.05%', '0%', 10, 60, 'Abu Dhabi',
    'Lowest 5-year fixed on the panel (4.25%) and a low 2.25% floor; first choice for Abu Dhabi freehold and HNW mega-loans.', { ext: true }),
  b('abu-dhabi-islamic-bank-adib-mortgage', 'adib', 'Abu Dhabi Islamic Bank', 'ADIB', 'مصرف أبوظبي الإسلامي', 'Islamic', 3.95, '1Y', 3.99, 4.39, 1.6, 2.99, '0.525%', '0%', 20, 60, 'Abu Dhabi',
    'Ijara-based home finance with a generous 20% free annual partial settlement—useful for bonus-driven borrowers.'),
  b('hsbc-uae-mortgage', 'hsbc', 'HSBC UAE', 'HSBC', 'إتش إس بي سي الإمارات', 'Conventional', 3.99, '2Y', 4.05, 4.19, 1.24, 1.99, '0.525–1%', '0%', 25, 60, 'Dubai',
    'Lowest floor (1.99%) and one of the thinnest revert margins (+1.24%), 25% free overpayment, and only 3% of card limits counted toward DBR.', { cc3: true, ext: true }),
  b('dubai-islamic-bank-dib-mortgage', 'dib', 'Dubai Islamic Bank', 'DIB', 'بنك دبي الإسلامي', 'Islamic', 3.99, '1Y', 4.1, 4.35, 1.0, 2.24, '0%', '0%', 10, 60, 'Dubai',
    'The lowest revert margin on the panel (+1.00% over 3M EIBOR) with zero purchase fee; on most Dubai developer APLs.', { cc3: true }),
  b('adcb-mortgage', 'adcb', 'ADCB', 'ADCB', 'بنك أبوظبي التجاري', 'Conventional', 3.99, '2Y', 4.09, 4.29, 1.49, 2.49, '1.05%', '0%', 20, 60, 'Abu Dhabi',
    'Counts 3% of card limits for DBR and allows 20% free overpayment; strong in Abu Dhabi and for external life insurance assignment.', { cc3: true, ext: true }),
  b('standard-chartered-uae-mortgage', 'standard-chartered', 'Standard Chartered UAE', 'SC', 'ستاندرد تشارترد الإمارات', 'Conventional', 4.05, '2Y', 4.15, 4.35, 1.35, 2.0, '0.525%', '0%', 10, 60, 'Dubai',
    'A 2.00% floor and +1.35% margin make SC a strong long-term holder; accepts external life policies.', { ext: true }),
  b('emirates-islamic-bank-mortgage', 'emirates-islamic', 'Emirates Islamic', 'EI', 'الإمارات الإسلامي', 'Islamic', 3.99, '2Y', 4.15, 4.45, 1.69, 2.75, '1.05%', '0%', 10, 50, 'Dubai',
    'Emirates NBD’s Islamic arm, sharing its APL coverage; non-resident lending capped at 50% LTV.'),
  b('commercial-bank-of-dubai-cbd-mortgage', 'cbd', 'Commercial Bank of Dubai', 'CBD', 'بنك دبي التجاري', 'Conventional', 4.09, '2Y', 4.19, 4.49, 1.59, 2.5, '0.525%', '0%', 10, 65, 'Dubai',
    'One of three panel lenders offering 65% LTV to non-residents; flexible on Business Bay and DAMAC stock.'),
  b('rakbank-mortgage', 'rakbank', 'RAKBANK', 'RAKBANK', 'بنك رأس الخيمة الوطني', 'Dual', 4.15, '2Y', 4.24, 4.55, 1.79, 2.75, '1.05%', '0%', 10, 60, 'Ras Al Khaimah',
    'A go-to for self-employed and Freezone owners, underwriting corporate net profit plus add-backs.'),
  b('mashreq-bank-mortgage', 'mashreq', 'Mashreq Bank', 'Mashreq', 'بنك المشرق', 'Dual', 4.24, '2Y', 4.49, 4.74, 1.75, 2.49, '1.05%', '0%', 15, 65, 'Dubai',
    '65% LTV for non-residents and flexible self-employed underwriting; 15% free overpayment.'),
  b('ajman-bank-mortgage', 'ajman', 'Ajman Bank', 'Ajman', 'مصرف عجمان', 'Islamic', 4.1, '2Y', 4.19, 4.59, 1.79, 3.25, '0.525%', '0%', 10, null, 'Ajman',
    'Northern-Emirates Islamic lender active on affordable JVC and Science Park stock; residents only.'),
  b('national-bank-of-fujairah-nbf-mortgage', 'nbf', 'National Bank of Fujairah', 'NBF', 'بنك الفجيرة الوطني', 'Conventional', 4.19, '2Y', 4.29, 4.65, 1.85, 2.99, '1.05%', '0.5%', 10, null, 'Fujairah',
    'Relationship-led lender suited to business owners already banking with NBF; residents only.'),
  b('arab-bank-uae-mortgage', 'arab-bank', 'Arab Bank UAE', 'Arab Bank', 'البنك العربي', 'Conventional', 4.15, '2Y', 4.25, 4.55, 1.65, 2.75, '1.05%', '0%', 10, 60, 'Dubai',
    'Levant-network bank popular with Jordanian and Lebanese buyers, with 60% LTV non-resident lending.'),
  b('rakislamic-mortgage', 'rakislamic', 'RAKislamic', 'RAKislamic', 'راك الإسلامي', 'Islamic', 4.19, '2Y', 4.29, 4.59, 1.79, 2.99, '1.05%', '0%', 10, 60, 'Ras Al Khaimah',
    'RAKBANK’s Sharia-compliant window, mirroring its self-employed appetite in Islamic form.'),
  b('al-hilal-bank-mortgage', 'al-hilal', 'Al Hilal Bank', 'Al Hilal', 'مصرف الهلال', 'Islamic', 4.05, '2Y', 4.15, 4.45, 1.59, 2.75, '0.525%', '0%', 10, null, 'Abu Dhabi',
    'ADCB-group Islamic bank focused on UAE Nationals and Abu Dhabi residents.'),
  b('nbq-umm-al-qaiwain-mortgage', 'nbq', 'National Bank of Umm Al Qaiwain', 'NBQ', 'بنك أم القيوين الوطني', 'Conventional', 4.25, '2Y', 4.39, 4.75, 1.89, 3.25, '1.05%', '0.5%', 10, null, 'Umm Al Quwain',
    'Niche lender for Northern-Emirates nationals and relationship clients.'),
  b('citibank-uae-mortgage', 'citi', 'Citibank UAE', 'Citi', 'سيتي بنك الإمارات', 'Conventional', 4.15, '2Y', 4.25, 4.49, 1.39, 2.25, '0.525%', '0%', 15, 60, 'Dubai',
    'Citigold relationship tiers unlock pricing below the card rate and a +1.39% margin.'),
  b('bank-of-baroda-uae-mortgage', 'bank-of-baroda', 'Bank of Baroda UAE', 'BoB', 'بنك بارودا', 'Conventional', 4.25, '2Y', 4.35, 4.69, 1.75, 3.0, '0.75%', '0.25%', 10, 60, 'Dubai',
    'Specialist in NRI underwriting using Indian ITR income—useful where other banks reject foreign self-employed income.'),
  b('invest-bank-mortgage', 'invest-bank', 'Invest Bank', 'Invest Bank', 'بنك الاستثمار', 'Conventional', 4.39, '2Y', 4.55, 4.89, 1.95, 3.5, '1.05%', '0.5%', 10, null, 'Sharjah',
    'Sharjah-based lender for relationship clients; higher pricing reflects a narrower appetite.'),
  b('cbi-commercial-bank-international-mortgage', 'cbi', 'Commercial Bank International', 'CBI', 'البنك التجاري الدولي', 'Conventional', 4.29, '2Y', 4.45, 4.79, 1.89, 3.25, '1.05%', '0.5%', 10, null, 'Dubai',
    'Selective resident lender; often competitive on buyouts for existing CBI account holders.'),
  b('amlak-finance-mortgage', 'amlak', 'Amlak Finance', 'Amlak', 'أملاك للتمويل', 'Islamic', 4.65, '2Y', 4.85, 5.05, 1.99, 3.99, '1.05%', '0.5%', 10, 65, 'Dubai',
    'Non-bank Islamic financier offering 65% LTV to non-residents and accepting profiles banks decline.'),
];

export const bankBy = (key: string) => BANKS.find((x) => x.key === key || x.slug === key);
export const revert = (bk: Bank, eibor = BENCH.eibor3m) => +(eibor + bk.margin).toFixed(2);
export const pct = (n: number) => `${n.toFixed(2)}%`;
