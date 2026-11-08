// Single source of truth for UAE mortgage rules quoted anywhere on the site.
// Every page must import from here; src/lib/regulation.test.ts fails the build if a page states a different figure.
// Change a value only after re-checking the cited source, then update CHECKED_ON.

export const CHECKED_ON = '2026-11-07';

export const SOURCES = {
  cbuaeRatios: { name: 'CBUAE Rulebook — Regulations Regarding Mortgage Loans, Article 3 (Important Ratios)', url: 'https://rulebook.centralbank.ae/en/rulebook/article-3-important-ratios' },
  cbuaeAmend2020: { name: 'CBUAE Board Resolution No. 31/2/2020 amending Circular No. 31/2013', url: 'https://rulebook.centralbank.ae/en/rulebook/central-bank-board-directors%E2%80%99-resolution-no-3122020-amending-circular-no-312013' },
  cbuaeEarlySettlement: { name: 'CBUAE amendment to mortgage early-settlement fees (October 2019)', url: 'https://www.zawya.com/en/press-release/central-bank-of-the-uae-eases-mortgage-loan-requirements-for-bank-customers-aosrd76j' },
} as const;

/** CBUAE regulatory caps (binding on all UAE banks). */
export const REG = {
  valueThreshold: 5_000_000, // AED; first-home caps step down above this value
  ltv: {
    national: { first: 85, firstAbove: 75, subsequent: 65 },
    expat: { first: 80, firstAbove: 70, subsequent: 60 },
  },
  dbrMax: 50, // % of gross monthly income
  tenorMax: 25, // years
  earlySettlement: { pct: 1, capAed: 10_000 }, // whichever is lower
} as const;

/** Lender practice, not CBUAE rules. Always describe these as bank policy. */
export const LENDER = {
  offPlanLtv: 50, // most banks while a property is under construction
  nonResidentLtv: { min: 50, max: 65 },
  ageAtMaturity: { salaried: 65, selfEmployed: 70 }, // typical; each bank sets its own
} as const;

const L = REG.ltv;
export const pctOf = (n: number) => `${n}%`;
export const FIRST_HOME_SUMMARY = `UAE Nationals ${L.national.first}% and expatriates ${L.expat.first}% on a first home up to AED 5M (${L.national.firstAbove}% and ${L.expat.firstAbove}% above), and ${L.national.subsequent}% / ${L.expat.subsequent}% on second and later homes`;
export const EARLY_SETTLEMENT_TEXT = `${REG.earlySettlement.pct}% of the outstanding balance or AED ${REG.earlySettlement.capAed.toLocaleString('en-US')}, whichever is lower`;

/** Max LTV for a property, by buyer and purchase number. */
export function maxLtv(buyer: 'national' | 'expat', price: number, firstHome = true) {
  const r = L[buyer];
  return firstHome ? (price > REG.valueThreshold ? r.firstAbove : r.first) : r.subsequent;
}
