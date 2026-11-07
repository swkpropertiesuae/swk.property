import eiborSnap from './eibor-snapshot.json' with { type: 'json' };
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
  // Latest published CBUAE fixing (refreshed by scripts/refresh-eibor.mjs; the API route serves the live value).
  eibor1m: eiborSnap.latest.oneMonth,
  eibor3m: eiborSnap.latest.threeMonth,
  eibor6m: eiborSnap.latest.sixMonth,
  eiborDate: eiborSnap.latest.date,
  lowestFixed: 3.75,
  bankCount: 24,
  // Dubai market (Module 1.1)
  dldYtdAedBn: 359.35,
  dldYtdSales: 115989,
  medianPsf: 1694,
  offPlanShare: 71.6,
} as const;


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
  'Published EIBOR fixings show their source date. Other rate examples and lender criteria are indicative planning information, not binding offers. Confirm current rates, eligibility, fees and any broker remuneration in writing before applying. Variable rates depend on the benchmark, bank margin and any floor in your offer. Calculators estimate costs using stated assumptions; insurance, processing fees and property-specific charges may be additional. Pre-approval does not guarantee final approval, valuation or deposit protection.';
