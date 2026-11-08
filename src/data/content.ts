import { REG } from './regulation';
// Silos 08, 09, 10 — affordability brackets, advisory desk, cornerstone guides.
import type { Faq } from './products';

export type Afford = { slug: string; kind: 'salary' | 'price'; amount: number; title: string; plus?: boolean; golden?: boolean };

export const AFFORD: Afford[] = [
  { slug: '15000-aed-salary-mortgage-dubai', kind: 'salary', amount: 15000, title: 'How Much Mortgage Can I Get on a AED 15,000 Salary in Dubai?' },
  { slug: '20000-aed-salary-mortgage-dubai', kind: 'salary', amount: 20000, title: 'How Much Mortgage Can I Get on a AED 20,000 Salary in Dubai?' },
  { slug: '25000-aed-salary-mortgage-dubai', kind: 'salary', amount: 25000, title: 'How Much Mortgage Can I Get on a AED 25,000 Salary in Dubai?' },
  { slug: '30000-aed-salary-mortgage-dubai', kind: 'salary', amount: 30000, title: 'How Much Mortgage Can I Get on a AED 30,000 Salary in Dubai?' },
  { slug: '40000-aed-salary-mortgage-dubai', kind: 'salary', amount: 40000, title: 'How Much Mortgage Can I Get on a AED 40,000 Salary in Dubai?' },
  { slug: '50000-aed-salary-mortgage-dubai', kind: 'salary', amount: 50000, title: 'How Much Mortgage Can I Get on a AED 50,000 Salary in Dubai?' },
  { slug: '75000-aed-salary-mortgage-dubai', kind: 'salary', amount: 75000, title: 'How Much Mortgage Can I Get on a AED 75,000 Salary in Dubai?' },
  { slug: '100000-aed-plus-salary-mortgage-dubai', kind: 'salary', amount: 100000, plus: true, title: 'Mortgages for AED 100,000+ Monthly Salaries in Dubai' },
  { slug: '1-million-aed-property-mortgage-upfront-costs', kind: 'price', amount: 1_000_000, title: 'Buying a AED 1 Million Property in Dubai: Mortgage & Upfront Costs' },
  { slug: '1-5-million-aed-property-mortgage-upfront-costs', kind: 'price', amount: 1_500_000, title: 'Buying a AED 1.5 Million Property in Dubai: Mortgage & Upfront Costs' },
  { slug: '2-million-aed-golden-visa-property-mortgage', kind: 'price', amount: 2_000_000, golden: true, title: 'AED 2 Million Golden Visa Property: Mortgage & Upfront Costs' },
  { slug: '3-million-aed-villa-mortgage-upfront-costs', kind: 'price', amount: 3_000_000, title: 'Buying a AED 3 Million Villa in Dubai: Mortgage & Upfront Costs' },
  { slug: '5-million-aed-ltv-threshold-mortgage', kind: 'price', amount: 5_000_000, title: 'AED 5 Million: The CBUAE LTV Threshold Explained' },
  { slug: '10-million-aed-luxury-villa-mortgage', kind: 'price', amount: 10_000_000, title: 'Financing a AED 10 Million Luxury Villa in Dubai' },
  { slug: '20-million-aed-plus-mansion-mortgage', kind: 'price', amount: 20_000_000, plus: true, title: 'Financing a AED 20 Million+ Mansion in Dubai' },
];

export type Advisory = { slug: string; name: string; title: string; capsule: string; points: string[]; faqs: Faq[] };

const ES = `${REG.earlySettlement.pct}% of the balance or AED ${REG.earlySettlement.capAed.toLocaleString('en-US')}, whichever is lower`;

export const ADVISORY: Advisory[] = [
  { slug: 'commercial-property-finance', name: 'Commercial Property Finance', title: 'Commercial Property Finance in the UAE: Loans up to AED 600M',
    capsule: 'For offices, warehouses, shops, schools and hotels, our business desk arranges purchase and refinance facilities with UAE lenders. Repayments are judged against the asset’s rent or the operating company’s cash flow rather than anyone’s salary, and each bank decides its own loan-to-value and term for the deal in front of it.',
    points: ['Loan-to-value set by each lender', 'Terms agreed case by case', 'Rental-income or EBITDA serviceability (DSCR ≥ 1.25x)', 'Portfolio and single-asset structures', 'Owner-occupied clinics, schools and warehouses'],
    faqs: [{ q: 'Can a company borrow for commercial property?', a: 'Yes. Commercial loans are usually made to the trading company or a special-purpose vehicle, with the shareholders giving personal guarantees.' }] },
  { slug: 'sme-and-corporate-lending', name: 'SME & Corporate Lending', title: 'SME & Corporate Lending for UAE Business Owners',
    capsule: 'If you run a business and are also buying a home, the two sets of borrowing affect each other. We plan working-capital lines, trade finance, equipment loans and premises mortgages alongside your personal application, so a company facility you guarantee does not quietly use up the affordability your home loan needs.',
    points: ['Working-capital and overdraft lines', 'Trade finance (LCs, guarantees)', 'Equipment and fleet finance', 'Commercial mortgages for owner-occupied premises', 'Coordinated personal and corporate DBR planning'],
    faqs: [{ q: 'Do business loans affect my mortgage?', a: 'They can. A facility you personally guarantee may be counted in your debt burden, so the order in which you apply matters.' }] },
  { slug: 'rera-conveyancing-services', name: 'RERA Conveyancing', title: 'RERA Conveyancing Services in Dubai: From Form F to Title Deed',
    capsule: 'Conveyancing is everything that happens between signing Form F and receiving the new title deed: no-objection certificates, payoff letters, manager’s cheques, the trustee booking and registration with the land department. Our team keeps buyer, seller, both banks and the developer working to the same date.',
    points: ['Form F special-condition drafting', 'Developer NOC and seller liability letters', 'Manager’s cheque preparation and payee split', 'Trustee office booking and attendance', 'Title deed and mortgage registration follow-up'],
    faqs: [{ q: 'Is conveyancing mandatory?', a: 'No law requires it, but it is worth having when both sides have a mortgage and several parties must be ready on the same day.' }] },
  { slug: 'difc-wills-and-estate-planning', name: 'DIFC Wills & Estate Planning', title: 'DIFC Wills & Estate Planning for UAE Property Owners',
    capsule: 'Non-Muslim residents can register a will with the DIFC Wills Service so their UAE home and accounts pass to the people they choose instead of under default inheritance rules. For couples who own a mortgaged home together, a will covering just that property is an affordable way to stop it being tied up after a death.',
    points: ['Full-estate and single-property DIFC wills', 'Guardianship provisions for minor children', 'Joint-mortgage succession planning', 'Coordination with life-policy assignment', 'Registration and witness appointments'],
    faqs: [{ q: 'Why does a will matter with a mortgage?', a: 'Without one, a jointly owned home and shared accounts can be frozen after a death, while the bank still expects the monthly repayment.' }] },
  { slug: 'external-mortgage-life-insurance', name: 'External Mortgage Life Insurance', title: 'External Mortgage Life Insurance: Compare Cover & Costs',
    capsule: 'Every UAE mortgage needs life cover, and the bank’s own policy is often priced at around 0.65% of the loan a year. Some lenders, including HSBC, ADCB, Standard Chartered, Emirates NBD and FAB, accept an outside decreasing-term policy assigned to them. Quotes from insurers such as Zurich, MetLife or Sukoon can come in nearer 0.26%, a large saving over the loan’s life.',
    points: ['Decreasing-term cover matched to your balance', 'Assignment letters accepted by 5+ banks', 'Premium fixed at underwriting age', 'Lower monthly outgoings improve DBR', 'Takaful options for Islamic finance'],
    faqs: [{ q: 'Is the bank allowed to refuse my external policy?', a: 'Yes, some lenders insist on their own cover. If an outside policy would save you money, choose a lender that accepts one.' }] },
  { slug: 'wholesale-fx-currency-exchange', name: 'Wholesale FX', title: 'Wholesale FX for Property Purchases: Down Payments, Fees and EMIs',
    capsule: 'Converting a deposit through an ordinary bank account can cost overseas buyers one to three percent in hidden spread. Our currency partner exchanges sterling, euros, dollars, rupees and many other currencies at tighter rates, and can fix the rate in advance so the dirham amount you need on transfer day does not move.',
    points: ['Wholesale spreads on 30+ currencies', 'Forward contracts to lock rates', 'Direct settlement to the conveyancing account', 'Monthly EMI conversions', 'Regulated payment partner'],
    faqs: [{ q: 'When should I lock the rate?', a: 'A common point is when Form F is signed. From then on, exchange-rate swings cannot change what you have to bring on transfer day.' }] },
  { slug: 'remote-power-of-attorney-closing', name: 'Remote PoA Closing', title: 'Remote Power of Attorney Closing for Overseas Buyers',
    capsule: 'You can complete a Dubai purchase with a mortgage without being in the country. A power of attorney notarised on a short Dubai Courts video call lets someone you trust attend the transfer. The document must clearly allow them to take the loan and register the mortgage, and the bank will say how recent it must be.',
    points: ['Dubai Courts video notarisation', 'Mortgage-specific PoA wording', 'Embassy legalisation route where needed', 'Attorney attends trustee transfer', 'Original title deed couriered or held'],
    faqs: [{ q: 'Who can act as my attorney?', a: 'A person you trust or a licensed conveyancer. Either way, the bank must approve the wording before the transfer is booked.' }] },
  { slug: 'property-valuation-appeal-desk', name: 'Valuation Appeal Desk', title: 'Property Valuation Appeal Desk: Fighting Down-Valuations',
    capsule: 'If the bank’s valuer puts a figure below your agreed price, the loan shrinks and you either cover the gap or reopen the price. We gather recent sales of similar homes from land department records and ask the lender to review. If that fails, we look at a second bank whose valuer panel is different.',
    points: ['Comparable DLD transaction evidence packs', 'Ask about the lender’s appeal deadline', 'Valuer-panel mapping across banks', 'Backup-bank switch where appeals fail', 'Price renegotiation support under Form F'],
    faqs: [{ q: 'How often do appeals succeed?', a: 'A review supported by close, recent comparables often recovers part of the shortfall. A second lender’s valuation may cover more of it, but no outcome is guaranteed.' }] },
];

export type Guide = { slug: string; title: string; capsule: string; steps: { h: string; p: string }[]; faqs: Faq[]; tool?: string };

export const GUIDES: Guide[] = [
  { slug: 'dubai-form-f-mortgage-valuation-protection-clause', tool: 'form-f-clause-generator',
    title: 'Dubai Form F Mortgage & Valuation Protection Clauses (Copy-Paste Addendums)',
    capsule: 'Form F is the standard Dubai sale agreement, and a buyer relying on a mortgage can lose the 10% deposit cheque if the loan falls through. Special conditions can make the sale depend on a satisfactory valuation and a final bank offer within an agreed window, with the deal ending and the cheque returned if either does not come through.',
    steps: [
      { h: 'Special Condition 1 — Valuation & FOL', p: `The sale depends on a bank valuation at or above an agreed figure and an unconditional offer for the planned loan, for example up to ${REG.ltv.expat.first}% for an expatriate’s first home, within the agreed number of days. If a shortfall is not resolved by a new price within a set period, the agreement ends and the uncashed cheque goes back to the buyer.` },
      { h: 'Special Condition 2 — Seller mortgage & extension', p: 'The seller asks their bank for a payoff letter promptly once the buyer’s offer arrives. Delays caused by a bank, the developer or the land department extend the deadline without penalty to either side.' },
      { h: 'Special Condition 3 — Cheque custody & compliance', p: 'The deposit cheque stays uncashed with a neutral party until transfer. The seller confirms there are no unapproved alterations that could hold up the developer’s NOC or the valuation.' },
    ],
    faqs: [{ q: 'Will sellers accept these clauses?', a: 'Sellers who expect a financed buyer usually anticipate a finance and valuation condition. What gets negotiated is the length of the window.' }] },
  { slug: 'how-credit-card-limits-reduce-uae-mortgage-dbr', tool: 'dbr-borrowing-power',
    title: 'How Credit Card Limits Reduce Your UAE Mortgage DBR (5% vs 3%)',
    capsule: 'Banks treat a share of every credit card limit you hold as a monthly debt, even if you never use the card. Most count 5% of the limit, and some, such as HSBC, ADCB and DIB, count 3%. An idle AED 100,000 limit can therefore cost you AED 5,000 a month of affordability, which may mean a much smaller loan.',
    steps: [
      { h: 'The rule', p: `All monthly debt payments, including the new mortgage, must stay within ${REG.dbrMax}% of gross eligible income. Card limits are counted at the bank’s set percentage whatever the balance.` },
      { h: 'What to do before applying', p: 'Download your AECB report, list each card and its limit, and close or lower the ones you do not need a few weeks before the bank checks your credit.' },
      { h: 'Choose a 3% bank where it matters', p: 'If you need large limits for business spending, a lender that counts 3% may let you borrow more than one with a slightly lower rate.' },
    ],
    faqs: [{ q: 'Does a zero-balance card really count?', a: 'Yes. The lender looks at what you could owe, not what you owe today.' }] },
  { slug: 'mortgage-to-mortgage-transfer-seller-liability-letter',
    title: 'Mortgage-to-Mortgage Transfers: The Seller Liability Letter Explained',
    capsule: 'When the seller still has a mortgage, their bank issues a liability letter giving the exact amount needed to clear it, valid only for a short period. The buyer’s bank pays that amount by manager’s cheque. The transfer has to happen before the letter lapses, otherwise a new letter and new cheques are needed.',
    steps: [
      { h: 'Order of events', p: 'The buyer receives a final offer, then the seller obtains the liability letter. The buyer’s bank prepares the payoff cheque, the seller’s bank releases the title, and the transfer completes at the trustee office.' },
      { h: 'Where it breaks', p: 'The usual failure is a letter expiring while a developer NOC or cheque is still pending. Get the real expiry date from the issuing bank and plan the other dates around it.' },
    ],
    faqs: [{ q: 'Who pays to re-issue an expired letter?', a: 'Normally the seller. Some banks charge a small fee each time a letter is reissued.' }] },
  { slug: '3-year-clawback-clause-on-uae-mortgage-buyouts', tool: 'buyout-refinance-savings',
    title: 'The 3-Year Clawback Clause on UAE Mortgage Buyouts',
    capsule: `Lenders that waive fees or offer cash-back to attract a switching customer often reclaim that value if you leave within about three years. Add the reclaim to the regulated early repayment charge (${ES}) to see whether a second switch would really leave you better off.`,
    steps: [
      { h: 'What gets clawed back', p: 'Typically any arrangement fee that was waived, valuation fees that were refunded and any cash incentive paid when you joined.' },
      { h: 'How to model it', p: 'Add the clawback to the early repayment charge, then set that total against the interest you would save at the new rate over the same period.' },
    ],
    faqs: [{ q: 'Is the clawback capped by CBUAE?', a: 'No. The central bank cap applies to the early repayment fee. A clawback is a separate contractual repayment of incentives.' }] },
  { slug: 'how-uae-banks-assess-bonuses-commissions-and-rental-income',
    title: 'How UAE Banks Assess Bonuses, Commissions and Rental Income',
    capsule: 'Basic salary and fixed allowances usually count in full, but banks are more cautious with income that varies. Bonuses and commission are generally averaged over one to two years and only partly counted. Registered rent is also discounted. How a lender treats these items can move your borrowing limit a long way.',
    steps: [
      { h: 'Bonuses', p: 'Banks look for a steady record, usually two years, shown on salary letters and statements, then count a portion of the monthly average.' },
      { h: 'Commissions', p: 'Expect to show six to twelve months of statements. Some lenders limit how much commission they will add relative to fixed pay.' },
      { h: 'Rent', p: 'Provide the Ejari certificate and several months of rent credits. A share, not the full amount, is added to income.' },
    ],
    faqs: [{ q: 'Do housing allowances count?', a: 'Yes, if the allowance is fixed and appears on your salary certificate.' }] },
  { slug: 'aecb-credit-score-minimum-for-uae-mortgage',
    title: 'AECB Credit Score Minimum for a UAE Mortgage',
    capsule: 'There is no single official cut-off, but many lenders look for an AECB score somewhere above the mid-600s, and the strongest pricing tends to go to scores over 700. Recent missed payments, bounced cheques and cards close to their limit do the most harm. Check your score in the AECB app before you apply.',
    steps: [
      { h: 'Score bands', p: 'As a rough guide: under 580 is difficult, 580 to 650 narrows your options, 650 to 700 is generally workable, and above 700 opens the best rates. Each bank uses its own thresholds.' },
      { h: 'Fast fixes', p: 'Bring card balances well below their limits, clear anything overdue and avoid applying for new credit in the couple of months before your mortgage application.' },
    ],
    faqs: [{ q: 'Do non-residents need an AECB score?', a: 'Not usually. Lenders rely on a report from your home-country bureau instead, such as Experian, CIBIL or SCHUFA.' }] },
  { slug: 'joint-mortgage-dubai-husband-wife-co-borrowers',
    title: 'Joint Mortgages in Dubai: Husband, Wife & Co-Borrowers',
    capsule: `Most Dubai lenders let several people apply together, commonly spouses or close family, so their incomes are combined. Each applicant signs the loan and is normally named on the title. Everyone’s debts and card limits are added up and tested against the same ${REG.dbrMax}% limit.`,
    steps: [
      { h: 'Who can be a co-borrower', p: 'Usually a spouse, parent, child or sibling. Fewer lenders accept friends or business partners buying together.' },
      { h: 'Protect the joint owners', p: 'Give each borrower life cover and register wills, so the death of one owner does not leave the home tied up.' },
    ],
    faqs: [{ q: 'Can only one spouse be on the title?', a: 'Some lenders let a spouse who is not an owner act as guarantor, but most want anyone whose income is counted to be on the title.' }] },
  { slug: 'buying-out-developer-post-handover-payment-plan', tool: 'handover-equity-release',
    title: 'Buying Out a Developer Post-Handover Payment Plan with a Mortgage',
    capsule: `If you are still paying a developer after handover, a mortgage can clear that balance once the title is in your name, often with a lower monthly payment. Lenders treat it like a ready-home purchase or a buyout, so the standard first-home caps apply (${REG.ltv.expat.first}% for expatriates up to AED 5M), provided the developer issues a clearance letter.`,
    steps: [
      { h: 'Get the clearance letter', p: 'Ask the developer to confirm the amount outstanding and to release the title once it is paid.' },
      { h: 'Compare monthly cost', p: `Developer instalments after handover can be steep. Spread over a mortgage term of up to ${REG.tenorMax} years, the same balance usually costs far less each month.` },
    ],
    faqs: [{ q: 'Is there a DLD fee?', a: 'The 4% transfer fee does not apply again if the title is already in your name. You pay the mortgage registration fee only.' }] },
  { slug: 'bank-noc-for-dubai-golden-visa-step-by-step', tool: 'golden-visa-mortgage-calculator',
    title: 'Bank NOC for a Dubai Golden Visa: Step by Step',
    capsule: 'If your home is mortgaged and you are applying for a Golden Visa on the strength of it, the authority will usually want a no-objection certificate from your lender. Banks generally issue one within a few working days, sometimes for a fee. Paid-equity and value thresholds change from time to time, so confirm the current rules before you apply.',
    steps: [
      { h: 'Request', p: 'Ask the lender for a Golden Visa NOC addressed to the land department, quoting your title deed number.' },
      { h: 'Submit at DLD Cube', p: 'Lodge the NOC with your title deed, passport and photo, then complete the residency steps: entry permit, medical and Emirates ID.' },
    ],
    faqs: [{ q: 'Which banks issue NOCs fastest?', a: 'It varies with workload. Ask your lender for its current turnaround when you request the letter.' }] },
  { slug: 'complete-dld-trustee-transfer-day-checklist', tool: 'transfer-day-cheque-calculator',
    title: 'Complete DLD Trustee Transfer-Day Checklist',
    capsule: 'On transfer day the trustee office will want original IDs, the signed Form F, the relevant NOCs and manager’s cheques made out to the seller, the seller’s bank, the land department and the trustee. One wrong or missing cheque can mean rebooking, so agree every payee and amount a few days beforehand.',
    steps: [
      { h: '72 hours before', p: 'Go through the cheque list with the trustee: the seller’s balance, the seller’s bank payoff, the 4% transfer fee and title charge, mortgage registration and the trustee fee.' },
      { h: 'On the day', p: 'Bring original passports and Emirates IDs, the developer NOC, the bank offer and all cheques, plus original powers of attorney for anyone not attending in person.' },
    ],
    faqs: [{ q: 'Can fees be paid by card?', a: 'Many trustee offices take card payment for government fees. Payments to the seller and the seller’s bank still need manager’s cheques.' }] },
];
