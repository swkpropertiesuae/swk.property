// Single source of truth for corporate facts, market benchmarks and contact details.
// Values marked TODO must be confirmed by Betterway before going live.

export const SITE = {
  name: 'Betterway Mortgages',
  legalName: 'Betterway Mortgages',
  url: 'https://betterwaymortgages.com',
  portalUrl: 'https://portal.betterwaymortgages.com',
  hubUrl: 'https://hub.betterwaymortgages.com',
  address: {
    building: 'Al Nasr Plaza',
    plot: 'Plot 319-310',
    street: 'Oud Metha Road',
    district: 'Oud Metha',
    city: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
  },
  // TODO: replace with the real desk numbers, licence and e-mail before launch.
  phone: '', // e.g. '+971 4 123 4567'; hidden site-wide while empty
  phoneHref: '',
  whatsapp: '',
  email: 'hello@betterwaymortgages.com',
  licence: '', // e.g. 'DED licence no. 123456'; hidden while empty
  hours: 'Mon–Sat 09:00–19:00 GST',
  asOf: 'November 2026',
  asOfISO: '2026-11-07',
} as const;

export const fullAddress = `${SITE.address.building}, ${SITE.address.plot}, ${SITE.address.street}, ${SITE.address.district}, ${SITE.address.city}, UAE`;

export const waLink = (text = 'Hi Betterway, I would like a mortgage quote.') =>
  SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}` : `mailto:${SITE.email}?subject=Mortgage%20enquiry&body=${encodeURIComponent(text)}`;

/** CBUAE / EIBOR benchmarks, November 2026 (Market Bible, Module 1.2). */
export const BENCH = {
  baseRate: 3.9,
  eibor1m: 4.09,
  eibor3m: 4.45,
  eibor6m: 4.41,
  lowestFixed: 3.75,
  bankCount: 24,
  // Dubai market (Module 1.1)
  dldYtdAedBn: 359.35,
  dldYtdSales: 115989,
  medianPsf: 1694,
  offPlanShare: 71.6,
} as const;

/** EIBOR history for the live tracker (monthly fixings, % p.a.). Indicative series ending at the Nov 2026 fixing. */
export const EIBOR_SERIES: { m: string; m1: number; m3: number; m6: number }[] = [
  { m: 'Dec 25', m1: 4.31, m3: 4.6, m6: 4.66 },
  { m: 'Jan 26', m1: 4.29, m3: 4.58, m6: 4.64 },
  { m: 'Feb 26', m1: 4.27, m3: 4.57, m6: 4.62 },
  { m: 'Mar 26', m1: 4.26, m3: 4.56, m6: 4.6 },
  { m: 'Apr 26', m1: 4.24, m3: 4.55, m6: 4.59 },
  { m: 'May 26', m1: 4.23, m3: 4.55, m6: 4.58 },
  { m: 'Jun 26', m1: 4.22, m3: 4.54, m6: 4.57 },
  { m: 'Jul 26', m1: 4.21, m3: 4.53, m6: 4.56 },
  { m: 'Aug 26', m1: 4.2, m3: 4.52, m6: 4.55 },
  { m: 'Sep 26', m1: 4.12, m3: 4.48, m6: 4.47 },
  { m: 'Oct 26', m1: 4.1, m3: 4.46, m6: 4.43 },
  { m: 'Nov 26', m1: 4.09, m3: 4.45, m6: 4.41 },
];

/** CBUAE LTV caps (Module 6 guardrails). */
export const LTV_RULES = [
  { profile: 'UAE National — first home ≤ AED 5M', ltv: '85%', down: '15%' },
  { profile: 'UAE National — first home > AED 5M', ltv: '75%', down: '25%' },
  { profile: 'Expat resident — first home ≤ AED 5M', ltv: '80%', down: '20%' },
  { profile: 'Expat resident — first home > AED 5M', ltv: '70%', down: '30%' },
  { profile: 'Second / investment home', ltv: '60–65%', down: '35–40%' },
  { profile: 'Non-resident', ltv: '50–65%', down: '35–50%' },
  { profile: 'Off-plan under construction', ltv: '50%', down: '50%' },
];

export const RULES = [
  { k: 'Maximum Debt Burden Ratio', v: '50% of gross monthly income' },
  { k: 'Credit card limits counted as debt', v: 'Lender-specific assessment; calculator defaults to 5%' },
  { k: 'Maximum tenure', v: '25 years' },
  { k: 'Age at maturity', v: 'Set by the lender’s lending and retirement-income policy' },
  { k: 'Early settlement cap', v: '1% of outstanding or AED 10,000, whichever is lower (+5% VAT)' },
  { k: 'Down payment source', v: 'Cannot be funded by a UAE personal loan' },
];

export const DISCLOSURE_SHORT =
  'Illustrative rates and estimates, not live bank offers. Approval and pricing depend on the lender.';

export const DISCLOSURE_FULL =
  'Rates, EIBOR values and lender criteria shown are illustrative planning data, not a live feed or binding offer. Confirm current rates, eligibility, fees and any broker remuneration in writing before applying. Variable rates depend on the benchmark, bank margin and any floor in your offer. Calculators estimate costs using stated assumptions; insurance, processing fees and property-specific charges may be additional. Pre-approval does not guarantee final approval, valuation or deposit protection.';
