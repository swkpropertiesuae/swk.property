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
    'Has the cheapest one-year Islamic rate we track, but its 3.75% minimum is the same as that opening rate, so after the fixed year you can never pay less than you do today.'),
  b('emirates-nbd-mortgage', 'emirates-nbd', 'Emirates NBD', 'ENBD', 'بنك الإمارات دبي الوطني', 'Conventional', 3.89, '2Y', 3.99, 4.29, 1.65, 2.49, '0.26–1.05%', '0%', 10, 60, 'Dubai',
    'Holds the biggest home-loan book in Dubai and appears on nearly every developer’s approved list. A natural fit for handovers and for salaried expats at listed companies.', { ext: true }),
  b('united-arab-bank-mortgage', 'uab', 'United Arab Bank', 'UAB', 'البنك العربي المتحد', 'Conventional', 3.89, '2Y', 4.05, 4.35, 1.5, 2.75, '0.525%', '0%', 10, null, 'Sharjah',
    'Offers the same two-year rate as Emirates NBD but charges less over EIBOR afterwards (+1.50%). Lends to UAE residents only.'),
  b('first-abu-dhabi-bank-fab-mortgage', 'fab', 'First Abu Dhabi Bank', 'FAB', 'بنك أبوظبي الأول', 'Conventional', 3.95, '2Y', 3.99, 4.25, 1.5, 2.25, '0–1.05%', '0%', 10, 60, 'Abu Dhabi',
    'Has our cheapest five-year fix at 4.25% and a low 2.25% minimum rate. Often the first call for Abu Dhabi freehold and very large loans.', { ext: true }),
  b('abu-dhabi-islamic-bank-adib-mortgage', 'adib', 'Abu Dhabi Islamic Bank', 'ADIB', 'مصرف أبوظبي الإسلامي', 'Islamic', 3.95, '1Y', 3.99, 4.39, 1.6, 2.99, '0.525%', '0%', 20, 60, 'Abu Dhabi',
    'Provides Ijara finance and lets you repay up to 20% a year without charge, handy if much of your pay arrives as bonuses.'),
  b('hsbc-uae-mortgage', 'hsbc', 'HSBC UAE', 'HSBC', 'إتش إس بي سي الإمارات', 'Conventional', 3.99, '2Y', 4.05, 4.19, 1.24, 1.99, '0.525–1%', '0%', 25, 60, 'Dubai',
    'Combines the lowest minimum rate we track (1.99%), a slim +1.24% margin after the fix, 25% free overpayment a year and a lighter 3% charge on card limits in the affordability test.', { cc3: true, ext: true }),
  b('dubai-islamic-bank-dib-mortgage', 'dib', 'Dubai Islamic Bank', 'DIB', 'بنك دبي الإسلامي', 'Islamic', 3.99, '1Y', 4.1, 4.35, 1.0, 2.24, '0%', '0%', 10, 60, 'Dubai',
    'Charges the smallest margin over three-month EIBOR once the fix ends (+1.00%), takes no arrangement fee on purchases and covers most Dubai developers.', { cc3: true }),
  b('adcb-mortgage', 'adcb', 'ADCB', 'ADCB', 'بنك أبوظبي التجاري', 'Conventional', 3.99, '2Y', 4.09, 4.29, 1.49, 2.49, '1.05%', '0%', 20, 60, 'Abu Dhabi',
    'Uses 3% of card limits in the affordability test and allows 20% free overpayment. A good option in Abu Dhabi and if you want to use your own life policy.', { cc3: true, ext: true }),
  b('standard-chartered-uae-mortgage', 'standard-chartered', 'Standard Chartered UAE', 'SC', 'ستاندرد تشارترد الإمارات', 'Conventional', 4.05, '2Y', 4.15, 4.35, 1.35, 2.0, '0.525%', '0%', 10, 60, 'Dubai',
    'With a 2.00% minimum rate and a +1.35% margin, it suits borrowers who expect to stay put for years. Outside life cover is accepted.', { ext: true }),
  b('emirates-islamic-bank-mortgage', 'emirates-islamic', 'Emirates Islamic', 'EI', 'الإمارات الإسلامي', 'Islamic', 3.99, '2Y', 4.15, 4.45, 1.69, 2.75, '1.05%', '0%', 10, 50, 'Dubai',
    'The Islamic arm of Emirates NBD, covering the same developer projects. Lends up to 50% of value to buyers living abroad.'),
  b('commercial-bank-of-dubai-cbd-mortgage', 'cbd', 'Commercial Bank of Dubai', 'CBD', 'بنك دبي التجاري', 'Conventional', 4.09, '2Y', 4.19, 4.49, 1.59, 2.5, '0.525%', '0%', 10, 65, 'Dubai',
    'One of three lenders we work with that will go to 65% for overseas buyers, and relatively open to Business Bay and DAMAC units.'),
  b('rakbank-mortgage', 'rakbank', 'RAKBANK', 'RAKBANK', 'بنك رأس الخيمة الوطني', 'Dual', 4.15, '2Y', 4.24, 4.55, 1.79, 2.75, '1.05%', '0%', 10, 60, 'Ras Al Khaimah',
    'A frequent choice for business owners, including free zone companies, because it assesses company profit and add-backs rather than salary alone.'),
  b('mashreq-bank-mortgage', 'mashreq', 'Mashreq Bank', 'Mashreq', 'بنك المشرق', 'Dual', 4.24, '2Y', 4.49, 4.74, 1.75, 2.49, '1.05%', '0%', 15, 65, 'Dubai',
    'Lends up to 65% to overseas buyers, takes a flexible view of self-employed income and allows 15% free overpayment a year.'),
  b('ajman-bank-mortgage', 'ajman', 'Ajman Bank', 'Ajman', 'مصرف عجمان', 'Islamic', 4.1, '2Y', 4.19, 4.59, 1.79, 3.25, '0.525%', '0%', 10, null, 'Ajman',
    'An Islamic lender from the Northern Emirates that is active on lower-priced JVC and Science Park homes. Residents only.'),
  b('national-bank-of-fujairah-nbf-mortgage', 'nbf', 'National Bank of Fujairah', 'NBF', 'بنك الفجيرة الوطني', 'Conventional', 4.19, '2Y', 4.29, 4.65, 1.85, 2.99, '1.05%', '0.5%', 10, null, 'Fujairah',
    'Works best for business owners who already bank with NBF. Lends to residents only.'),
  b('arab-bank-uae-mortgage', 'arab-bank', 'Arab Bank UAE', 'Arab Bank', 'البنك العربي', 'Conventional', 4.15, '2Y', 4.25, 4.55, 1.65, 2.75, '1.05%', '0%', 10, 60, 'Dubai',
    'Its branches across the Levant make it popular with Jordanian and Lebanese buyers. Overseas applicants can borrow up to 60% of value.'),
  b('rakislamic-mortgage', 'rakislamic', 'RAKislamic', 'RAKislamic', 'راك الإسلامي', 'Islamic', 4.19, '2Y', 4.29, 4.59, 1.79, 2.99, '1.05%', '0%', 10, 60, 'Ras Al Khaimah',
    'The Islamic side of RAKBANK, bringing the same openness to self-employed applicants in a Sharia-compliant form.'),
  b('al-hilal-bank-mortgage', 'al-hilal', 'Al Hilal Bank', 'Al Hilal', 'مصرف الهلال', 'Islamic', 4.05, '2Y', 4.15, 4.45, 1.59, 2.75, '0.525%', '0%', 10, null, 'Abu Dhabi',
    'Part of the ADCB group, an Islamic lender mainly serving Emiratis and Abu Dhabi residents.'),
  b('nbq-umm-al-qaiwain-mortgage', 'nbq', 'National Bank of Umm Al Qaiwain', 'NBQ', 'بنك أم القيوين الوطني', 'Conventional', 4.25, '2Y', 4.39, 4.75, 1.89, 3.25, '1.05%', '0.5%', 10, null, 'Umm Al Quwain',
    'A smaller lender serving Emiratis from the Northern Emirates and its existing customers.'),
  b('citibank-uae-mortgage', 'citi', 'Citibank UAE', 'Citi', 'سيتي بنك الإمارات', 'Conventional', 4.15, '2Y', 4.25, 4.49, 1.39, 2.25, '0.525%', '0%', 15, 60, 'Dubai',
    'Citigold customers can get rates below the published ones and a +1.39% margin after the fix.'),
  b('bank-of-baroda-uae-mortgage', 'bank-of-baroda', 'Bank of Baroda UAE', 'BoB', 'بنك بارودا', 'Conventional', 4.25, '2Y', 4.35, 4.69, 1.75, 3.0, '0.75%', '0.25%', 10, 60, 'Dubai',
    'Experienced with non-resident Indians and assesses income from Indian tax returns, which helps self-employed applicants other banks turn away.'),
  b('invest-bank-mortgage', 'invest-bank', 'Invest Bank', 'Invest Bank', 'بنك الاستثمار', 'Conventional', 4.39, '2Y', 4.55, 4.89, 1.95, 3.5, '1.05%', '0.5%', 10, null, 'Sharjah',
    'Sharjah lender that mostly serves existing customers. Rates tend to be higher because it is more selective.'),
  b('cbi-commercial-bank-international-mortgage', 'cbi', 'Commercial Bank International', 'CBI', 'البنك التجاري الدولي', 'Conventional', 4.29, '2Y', 4.45, 4.79, 1.89, 3.25, '1.05%', '0.5%', 10, null, 'Dubai',
    'Lends selectively to residents and can be keen on buyouts for people who already bank with CBI.'),
  b('amlak-finance-mortgage', 'amlak', 'Amlak Finance', 'Amlak', 'أملاك للتمويل', 'Islamic', 4.65, '2Y', 4.85, 5.05, 1.99, 3.99, '1.05%', '0.5%', 10, 65, 'Dubai',
    'An Islamic finance company rather than a bank. Lends up to 65% to overseas buyers and will consider some profiles banks decline.'),
];

export const bankBy = (key: string) => BANKS.find((x) => x.key === key || x.slug === key);
export const revert = (bk: Bank, eibor = BENCH.eibor3m) => +(eibor + bk.margin).toFixed(2);
export const pct = (n: number) => `${n.toFixed(2)}%`;
