import eiborSnap from './eibor-snapshot.json' with { type: 'json' };
import { REG, LENDER, pctOf, EARLY_SETTLEMENT_TEXT } from './regulation';
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


/** LTV table: CBUAE caps from src/data/regulation.ts; lender-practice rows are labelled as such. */
const dp = (n: number) => `${100 - n}%`;
export const LTV_RULES = [
  { profile: 'UAE National — first home up to AED 5M', ltv: pctOf(REG.ltv.national.first), down: dp(REG.ltv.national.first), basis: 'CBUAE' },
  { profile: 'UAE National — first home above AED 5M', ltv: pctOf(REG.ltv.national.firstAbove), down: dp(REG.ltv.national.firstAbove), basis: 'CBUAE' },
  { profile: 'Expatriate — first home up to AED 5M', ltv: pctOf(REG.ltv.expat.first), down: dp(REG.ltv.expat.first), basis: 'CBUAE' },
  { profile: 'Expatriate — first home above AED 5M', ltv: pctOf(REG.ltv.expat.firstAbove), down: dp(REG.ltv.expat.firstAbove), basis: 'CBUAE' },
  { profile: 'UAE National — second or later home', ltv: pctOf(REG.ltv.national.subsequent), down: dp(REG.ltv.national.subsequent), basis: 'CBUAE' },
  { profile: 'Expatriate — second or later home', ltv: pctOf(REG.ltv.expat.subsequent), down: dp(REG.ltv.expat.subsequent), basis: 'CBUAE' },
  { profile: 'Non-resident (bank policy)', ltv: `${LENDER.nonResidentLtv.min}–${LENDER.nonResidentLtv.max}%`, down: `${100 - LENDER.nonResidentLtv.max}–${100 - LENDER.nonResidentLtv.min}%`, basis: 'Lender' },
  { profile: 'Off-plan, under construction (bank policy)', ltv: `up to ${LENDER.offPlanLtv}%`, down: `from ${100 - LENDER.offPlanLtv}%`, basis: 'Lender' },
];

export const RULES = [
  { k: 'Maximum debt burden ratio (CBUAE)', v: `${REG.dbrMax}% of gross monthly income` },
  { k: 'Maximum mortgage term (CBUAE)', v: `${REG.tenorMax} years` },
  { k: 'Early settlement fee cap (CBUAE)', v: EARLY_SETTLEMENT_TEXT },
  { k: 'Age at maturity', v: `Set by each bank; commonly ${LENDER.ageAtMaturity.salaried} salaried, ${LENDER.ageAtMaturity.selfEmployed} self-employed` },
  { k: 'Credit card limits counted as debt', v: 'Bank-specific; calculator defaults to 5% of total limits' },
];

export const DISCLOSURE_SHORT =
  'Illustrative rates and estimates, not live bank offers. Approval and pricing depend on the lender.';

export const DISCLOSURE_FULL =
  'Published EIBOR fixings show their source date. Other rate examples and lender criteria are indicative planning information, not binding offers. Confirm current rates, eligibility, fees and any broker remuneration in writing before applying. Variable rates depend on the benchmark, bank margin and any floor in your offer. Calculators estimate costs using stated assumptions; insurance, processing fees and property-specific charges may be additional. Pre-approval does not guarantee final approval, valuation or deposit protection.';
