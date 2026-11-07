import { BANKS } from './banks';

export type NavLink = { label: string; href: string; desc?: string };
export type NavCol = { title: string; links: NavLink[] };
export type NavItem = { label: string; href: string; cols?: NavCol[]; feature?: { title: string; body: string; href: string; cta: string } };

// Top-level IA follows the UAE mortgage-broker convention (Buy · Refinance · Rates · Calculators · Commercial · Resources).
export const NAV: NavItem[] = [
  {
    label: 'Buy', href: '/mortgages',
    cols: [
      { title: 'Living in the UAE', links: [
        { label: 'Expat residents', href: '/mortgages/uae-residents', desc: 'Up to 80% LTV' },
        { label: 'UAE Nationals', href: '/mortgages/uae-nationals', desc: 'Up to 85% LTV' },
        { label: 'GCC Nationals', href: '/mortgages/gcc-nationals' },
        { label: 'Self-employed', href: '/mortgages/self-employed' },
        { label: 'Islamic home finance', href: '/mortgages/islamic-home-finance' },
      ] },
      { title: 'Investing from abroad', links: [
        { label: 'Non-resident buyers', href: '/mortgages/non-resident-dubai', desc: 'Up to 65% LTV' },
        { label: 'Golden Visa mortgages', href: '/mortgages/golden-visa-mortgage' },
        { label: 'Second home & investment', href: '/mortgages/second-home-investment' },
        { label: 'High-value homes', href: '/mortgages/mega-loans-luxury-villas' },
      ] },
      { title: 'Off-plan & new builds', links: [
        { label: 'Off-plan & handover', href: '/mortgages/under-construction-off-plan' },
        { label: 'Handover guide', href: '/handover/dubai-off-plan-handover-mortgage-guide' },
        { label: 'Handover projects', href: '/handover' },
        { label: 'Plot & construction', href: '/mortgages/land-plot-construction' },
      ] },
    ],
    feature: { title: 'Know your budget first', body: 'See your borrowing power and upfront costs before you view a property.', href: '/calculators/dbr-borrowing-power', cta: 'Check eligibility' },
  },
  {
    label: 'Refinance', href: '/mortgages/mortgage-buyout-refinance',
    cols: [
      { title: 'Switch your mortgage', links: [
        { label: 'Switch bank (buyout)', href: '/mortgages/mortgage-buyout-refinance' },
        { label: 'Refinance savings calculator', href: '/calculators/buyout-refinance-savings' },
        { label: 'Fixed vs revert analyser', href: '/calculators/fixed-to-revert-analyzer' },
      ] },
      { title: 'Release value', links: [
        { label: 'Equity release & cash-out', href: '/mortgages/equity-release' },
        { label: 'Portfolio consolidation', href: '/mortgages/portfolio-consolidation' },
        { label: 'Handover & cash-out calculator', href: '/calculators/handover-equity-release' },
      ] },
      { title: 'Plan ahead', links: [
        { label: '3-year clawback explained', href: '/guides/3-year-clawback-clause-on-uae-mortgage-buyouts' },
        { label: 'Overpayment calculator', href: '/calculators/overpayment-early-settlement' },
        { label: 'EIBOR tracker', href: '/rates/eibor-live-tracker' },
      ] },
    ],
    feature: { title: 'Is your fixed rate ending?', body: 'Compare your revert rate with switching costs before it resets.', href: '/calculators/buyout-refinance-savings', cta: 'Calculate savings' },
  },
  {
    label: 'Rates', href: '/rates',
    cols: [
      { title: 'Benchmarks', links: [
        { label: 'UAE mortgage rate comparison', href: '/rates/uae-mortgage-rates-eibor-revert-bible' },
        { label: 'EIBOR tracker', href: '/rates/eibor-live-tracker' },
        { label: 'All bank comparisons', href: '/rates#compare' },
      ] },
      { title: 'Popular banks', links: BANKS.filter((b) => ['emirates-nbd', 'hsbc', 'fab', 'dib', 'adcb', 'mashreq'].includes(b.key)).map((b) => ({ label: b.name, href: `/rates/${b.slug}` })) },
      { title: 'Head-to-head', links: [
        { label: 'Emirates NBD vs HSBC', href: '/rates/compare/emirates-nbd-vs-hsbc-mortgage' },
        { label: 'DIB vs ADIB', href: '/rates/compare/dubai-islamic-bank-vs-adib-home-finance' },
        { label: '2Y vs 3Y vs 5Y fixed', href: '/rates/compare/2-year-fixed-vs-3-year-fixed-vs-5-year-fixed-uae' },
        { label: 'Conventional vs Islamic', href: '/rates/compare/conventional-vs-islamic-mortgage-uae-math' },
      ] },
    ],
    feature: { title: 'More than a fixed rate', body: 'Compare the revert margin, floor rate and fees as well.', href: '/rates/uae-mortgage-rates-eibor-revert-bible', cta: 'See all 24 banks' },
  },
  {
    label: 'Calculators', href: '/calculators',
    cols: [
      { title: 'Most used', links: [
        { label: 'Mortgage calculator', href: '/calculators/mortgage-calculator' },
        { label: 'Eligibility (DBR) calculator', href: '/calculators/dbr-borrowing-power' },
        { label: 'Refinance calculator', href: '/calculators/buyout-refinance-savings' },
        { label: 'Rent vs buy', href: '/calculators/rent-vs-buy-dubai' },
      ] },
      { title: 'Plan & compare', links: [
        { label: 'Fixed vs revert analyser', href: '/calculators/fixed-to-revert-analyzer' },
        { label: 'Overpayment', href: '/calculators/overpayment-early-settlement' },
        { label: 'Handover & cash-out', href: '/calculators/handover-equity-release' },
        { label: 'Golden Visa estimator', href: '/calculators/golden-visa-mortgage-calculator' },
        { label: 'Non-resident rental coverage', href: '/calculators/non-resident-rental-coverage' },
      ] },
      { title: 'Buying tools', links: [
        { label: 'Form F clause generator', href: '/tools/form-f-clause-generator' },
        { label: 'Life insurance auditor', href: '/tools/life-insurance-assignment-audit' },
        { label: 'Transfer-day cheque splitter', href: '/tools/transfer-day-cheque-calculator' },
      ] },
    ],
  },
  {
    label: 'Commercial Finance', href: '/advisory/commercial-property-finance',
    cols: [
      { title: 'Business property', links: [
        { label: 'Commercial property finance', href: '/advisory/commercial-property-finance' },
        { label: 'SME & corporate lending', href: '/advisory/sme-and-corporate-lending' },
        { label: 'Portfolio consolidation', href: '/mortgages/portfolio-consolidation' },
      ] },
      { title: 'Around the transaction', links: [
        { label: 'Conveyancing', href: '/advisory/rera-conveyancing-services' },
        { label: 'Valuation appeal desk', href: '/advisory/property-valuation-appeal-desk' },
        { label: 'Wholesale FX', href: '/advisory/wholesale-fx-currency-exchange' },
      ] },
      { title: 'Protect what you own', links: [
        { label: 'External life insurance', href: '/advisory/external-mortgage-life-insurance' },
        { label: 'DIFC wills', href: '/advisory/difc-wills-and-estate-planning' },
        { label: 'All advisory services', href: '/advisory' },
      ] },
    ],
  },
  {
    label: 'Resources', href: '/guides',
    cols: [
      { title: 'Learn', links: [
        { label: 'How it works', href: '/#how-it-works' },
        { label: 'Buying guides', href: '/guides' },
        { label: 'Form F protection clauses', href: '/guides/dubai-form-f-mortgage-valuation-protection-clause' },
        { label: 'Transfer-day checklist', href: '/guides/complete-dld-trustee-transfer-day-checklist' },
      ] },
      { title: 'Explore', links: [
        { label: 'Areas & communities', href: '/areas' },
        { label: 'Affordability by salary', href: '/affordability' },
        { label: 'Developer guides', href: '/handover' },
      ] },
      { title: 'Company', links: [
        { label: 'About Betterway', href: '/about-us' },
        { label: 'Broker or bank?', href: '/why-betterway-vs-direct-bank' },
        { label: 'Our team', href: '/our-underwriters' },
        { label: 'Contact', href: '/contact' },
      ] },
    ],
  },
];
