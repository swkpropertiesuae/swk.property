import { BANKS } from './banks';
import { DEVELOPERS } from './handover';

export type NavLink = { label: string; href: string; desc?: string };
export type NavCol = { title: string; links: NavLink[] };
export type NavItem = { label: string; href: string; cols?: NavCol[]; feature?: { title: string; body: string; href: string; cta: string } };

export const NAV: NavItem[] = [
  {
    label: 'Mortgages', href: '/mortgages',
    cols: [
      { title: 'Buy a home', links: [
        { label: 'Expat residents', href: '/mortgages/uae-residents', desc: 'Up to 80% LTV' },
        { label: 'UAE Nationals', href: '/mortgages/uae-nationals', desc: 'Up to 85% LTV' },
        { label: 'GCC Nationals', href: '/mortgages/gcc-nationals' },
        { label: 'Self-employed', href: '/mortgages/self-employed' },
        { label: 'Islamic home finance', href: '/mortgages/islamic-home-finance' },
      ] },
      { title: 'Invest & grow', links: [
        { label: 'Non-resident buyers', href: '/mortgages/non-resident-dubai', desc: 'Up to 65% LTV' },
        { label: 'Golden Visa mortgages', href: '/mortgages/golden-visa-mortgage' },
        { label: 'Second home & investment', href: '/mortgages/second-home-investment' },
        { label: 'HNW mega loans', href: '/mortgages/mega-loans-luxury-villas' },
        { label: 'Portfolio consolidation', href: '/mortgages/portfolio-consolidation' },
      ] },
      { title: 'Switch, release, build', links: [
        { label: 'Switch bank (buyout)', href: '/mortgages/mortgage-buyout-refinance' },
        { label: 'Equity release', href: '/mortgages/equity-release' },
        { label: 'Off-plan & handover', href: '/mortgages/under-construction-off-plan' },
        { label: 'Plot & construction', href: '/mortgages/land-plot-construction' },
      ] },
    ],
    feature: { title: 'Prepare for pre-approval', body: 'Understand your budget and the documents your lender needs.', href: '/contact', cta: 'Start pre-approval' },
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
      { title: 'Buy', links: [
        { label: 'Mortgage & upfront costs', href: '/calculators/mortgage-calculator' },
        { label: 'DBR & borrowing power', href: '/calculators/dbr-borrowing-power' },
        { label: 'Rent vs buy', href: '/calculators/rent-vs-buy-dubai' },
        { label: 'Golden Visa estimator', href: '/calculators/golden-visa-mortgage-calculator' },
      ] },
      { title: 'Own & optimise', links: [
        { label: 'Fixed vs revert analyser', href: '/calculators/fixed-to-revert-analyzer' },
        { label: 'Buyout net savings', href: '/calculators/buyout-refinance-savings' },
        { label: 'Overpayment', href: '/calculators/overpayment-early-settlement' },
        { label: 'Handover & cash-out', href: '/calculators/handover-equity-release' },
        { label: 'Non-resident rental coverage', href: '/calculators/non-resident-rental-coverage' },
      ] },
      { title: 'Legal micro-tools', links: [
        { label: 'Form F clause generator', href: '/tools/form-f-clause-generator' },
        { label: 'Life insurance auditor', href: '/tools/life-insurance-assignment-audit' },
        { label: 'Transfer-day cheque splitter', href: '/tools/transfer-day-cheque-calculator' },
      ] },
    ],
  },
  {
    label: 'Off-plan', href: '/handover/dubai-off-plan-handover-mortgage-guide',
    cols: [
      { title: 'Handover', links: [
        { label: 'Off-plan handover guide', href: '/handover/dubai-off-plan-handover-mortgage-guide' },
        { label: 'Handover & cash-out calculator', href: '/calculators/handover-equity-release' },
        { label: 'Explore handover projects', href: '/handover' },
      ] },
      { title: 'Developer guides', links: DEVELOPERS.filter((d) => d.hub).slice(0, 7).map((d) => ({ label: d.name, href: `/handover/${d.slug}` })) },
      { title: ' ', links: DEVELOPERS.filter((d) => d.hub).slice(7).map((d) => ({ label: d.name, href: `/handover/${d.slug}` })) },
    ],
  },
  {
    label: 'Areas', href: '/areas',
    cols: [
      { title: 'Dubai', links: [
        { label: 'Dubai Marina', href: '/areas/dubai/dubai-marina' },
        { label: 'Downtown Dubai', href: '/areas/dubai/downtown-dubai' },
        { label: 'Dubai Hills Estate', href: '/areas/dubai/dubai-hills-estate' },
        { label: 'Palm Jumeirah', href: '/areas/dubai/palm-jumeirah' },
        { label: 'All 45 Dubai areas', href: '/areas/dubai' },
      ] },
      { title: 'Abu Dhabi & North', links: [
        { label: 'Yas Island', href: '/areas/abu-dhabi/yas-island' },
        { label: 'Saadiyat Island', href: '/areas/abu-dhabi/saadiyat-island' },
        { label: 'All Abu Dhabi areas', href: '/areas/abu-dhabi' },
        { label: 'RAK & Sharjah', href: '/areas/northern' },
      ] },
      { title: 'By budget', links: [
        { label: 'AED 20,000 salary', href: '/affordability/20000-aed-salary-mortgage-dubai' },
        { label: 'AED 30,000 salary', href: '/affordability/30000-aed-salary-mortgage-dubai' },
        { label: 'AED 2M Golden Visa home', href: '/affordability/2-million-aed-golden-visa-property-mortgage' },
        { label: 'All budgets', href: '/affordability' },
      ] },
    ],
  },
  {
    label: 'Resources', href: '/guides',
    cols: [
      { title: 'Buying guides', links: [
        { label: 'Form F protection clauses', href: '/guides/dubai-form-f-mortgage-valuation-protection-clause' },
        { label: 'Credit cards & DBR', href: '/guides/how-credit-card-limits-reduce-uae-mortgage-dbr' },
        { label: 'Transfer-day checklist', href: '/guides/complete-dld-trustee-transfer-day-checklist' },
        { label: 'All guides', href: '/guides' },
      ] },
      { title: 'Property advisory', links: [
        { label: 'Commercial property finance', href: '/advisory/commercial-property-finance' },
        { label: 'DIFC wills', href: '/advisory/difc-wills-and-estate-planning' },
        { label: 'External life insurance', href: '/advisory/external-mortgage-life-insurance' },
        { label: 'All advisory services', href: '/advisory' },
      ] },
      { title: 'Company', links: [
        { label: 'About Betterway', href: '/about-us' },
        { label: 'Betterway vs going direct', href: '/why-betterway-vs-direct-bank' },
        { label: 'Our underwriters', href: '/our-underwriters' },
        { label: 'Client reviews', href: '/reviews' },
      ] },
    ],
  },
];
