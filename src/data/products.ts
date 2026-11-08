// Silo 02 — Core mortgage products & buyer profiles (/mortgages/[slug]).
import { REG, LENDER } from './regulation';

export type Faq = { q: string; a: string };
export type Product = {
  slug: string;
  name: string;
  ar: string;
  title: string; // H1
  badge: string;
  card: string; // short card copy (unique per product)
  cta: string;
  capsule: string; // ~50-word AEO citation capsule
  facts: [string, string][];
  sections: { h: string; p: string }[];
  faqs: Faq[];
  calc: string; // related calculator slug
  core?: boolean; // shows on homepage 8-card grid
};

const ES = `${REG.earlySettlement.pct}% or AED ${REG.earlySettlement.capAed.toLocaleString('en-US')}`;

export const PRODUCTS: Product[] = [
  {
    slug: 'uae-residents', name: 'Expat Resident Mortgages', ar: 'تمويل المقيمين الوافدين', core: true,
    title: `Expat Resident Mortgages in Dubai: ${REG.ltv.expat.first}% LTV on Your First Home`,
    badge: `Up to ${REG.ltv.expat.first}% LTV`, cta: 'Start my mortgage enquiry',
    card: 'Work out your deposit, likely repayment and paperwork before you make an offer.',
    capsule: `If you live and work in the UAE on a residence visa, the central bank lets a lender finance up to ${REG.ltv.expat.first}% of your first home when the price is AED 5M or less, falling to ${REG.ltv.expat.firstAbove}% above that. Loans can last up to ${REG.tenorMax} years, your bank decides the latest age you can still be repaying, and every monthly debt you carry must add up to no more than ${REG.dbrMax}% of gross income.`,
    facts: [['Max LTV (≤ AED 5M)', `${REG.ltv.expat.first}%`], ['Max LTV (> AED 5M)', `${REG.ltv.expat.firstAbove}%`], ['Minimum salary', 'Set by each bank'], ['Max tenure', `${REG.tenorMax} years`], ['Pre-approval', 'Lender-dependent'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'How residents are underwritten', p: 'Expect the bank to ask for a recent salary certificate, around six months of payslips and the matching salary credits on your statement. Basic pay and fixed allowances usually count in full. Bonuses and commission are normally averaged and only partly counted. Where your employer sits on each bank’s company list affects both your rate and whether you must move your salary.' },
      { h: 'The real cash you need', p: `Your own contribution starts at ${100 - REG.ltv.expat.first}% of the price, and purchase costs come on top: the 4% DLD transfer fee, title deed and mortgage registration charges, trustee and valuation fees, plus agency commission if an agent is involved. Together these often add around 7%. The calculator lists each line so nothing is a surprise on transfer day.` },
      { h: 'Why dual pre-approval matters', p: 'A single approval can fall apart if that bank’s valuer comes in below the agreed price. Lining up a second lender that uses a different valuation panel gives you somewhere to turn. Neither approval guarantees a valuation or protects your deposit, so have the sale contract reviewed before you sign.' },
    ],
    faqs: [
      { q: 'Can I buy with 10% down as an expat?', a: `No. For an expatriate buying a first home of AED 5M or less, the most a bank may lend is ${REG.ltv.expat.first}% of the value, so you need at least ${100 - REG.ltv.expat.first}% from your own money, plus purchase costs.` },
      { q: 'Do I need to transfer my salary?', a: 'Not necessarily. Moving your salary to the lender often earns a slightly lower rate, but many banks also offer pricing without it for employees of companies on their approved list.' },
      { q: 'How long does the whole process take?', a: 'Allow roughly three to five weeks from pre-approval to the DLD transfer. That covers document checks, valuation, the final offer letter and the trustee appointment. Your bank will confirm its own timeline.' },
    ],
    calc: 'mortgage-calculator',
  },
  {
    slug: 'uae-nationals', name: 'UAE National Mortgages', ar: 'تمويل المواطنين الإماراتيين',
    title: `UAE National & Emirati Mortgages: ${REG.ltv.national.first}% LTV + MRHE and Sheikh Zayed Top-Ups`,
    badge: `Up to ${REG.ltv.national.first}% LTV`, cta: 'Check Emirati eligibility',
    card: 'See how a bank loan and a government housing programme can work together.',
    capsule: `Emirati buyers can borrow up to ${REG.ltv.national.first}% of a first home priced at AED 5M or less, and ${REG.ltv.national.firstAbove}% above that, for as long as ${REG.tenorMax} years under central bank rules. Where the Mohammed bin Rashid Housing Establishment or the Sheikh Zayed Housing Programme has approved support, a bank facility can cover the remaining cost of a larger home.`,
    facts: [['Max LTV (≤ AED 5M)', `${REG.ltv.national.first}%`], ['Max LTV (> AED 5M)', `${REG.ltv.national.firstAbove}%`], ['Age at maturity', 'Set by each bank'], ['Housing grant top-ups', 'MRHE · SZHP'], ['Pension income', 'Accepted by many banks'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'Combining government housing with a bank loan', p: 'When a housing programme funds part of a build or purchase, a bank can lend the difference behind it. The order matters: the programme’s no-objection letter and the bank’s offer need to line up so neither approval expires while you wait for the other.' },
      { h: 'Pricing for nationals', p: 'Some lenders keep separate, often cheaper, rate grids for Emirati customers who transfer their salary. Islamic banks may also publish profit rates reserved for nationals.' },
      { h: 'Government and semi-government employers', p: 'People working for federal, local government or government-related entities usually sit in a bank’s strongest employer category, which tends to mean better pricing and more generous income treatment.' },
    ],
    faqs: [
      { q: 'Can a UAE National borrow for a second home?', a: `Yes. On a second or later home the cap for UAE Nationals is ${REG.ltv.national.subsequent}% of the value, and some banks will count expected rent towards affordability.` },
      { q: 'Is the MRHE loan counted in my DBR?', a: `Yes. The housing loan instalment sits inside the ${REG.dbrMax}% limit alongside the bank repayment, so the loan term you choose for each one changes how much you can borrow.` },
    ],
    calc: 'dbr-borrowing-power',
  },
  {
    slug: 'gcc-nationals', name: 'GCC National Mortgages', ar: 'تمويل مواطني دول الخليج',
    title: 'GCC National Mortgages in Dubai & Abu Dhabi: Saudi, Qatari, Kuwaiti, Bahraini & Omani Buyers',
    badge: 'Bank-specific LTV', cta: 'Check GCC eligibility',
    card: 'Finance a UAE home as a Gulf citizen, whether you live here or back home.',
    capsule: 'Saudi, Qatari, Kuwaiti, Bahraini and Omani citizens who live in the UAE are often assessed on terms close to those for Emiratis. Those still based in their home country fall under each bank’s non-resident policy. Lenders confirm income through employer letters, GOSI records or commercial registrations and check the relevant home-country credit bureau.',
    facts: [['Resident GCC LTV', 'Bank-specific'], ['Non-resident GCC LTV', 'Bank-specific'], ['FX haircut', 'Low for USD-pegged currencies'], ['Credit bureaux', 'SIMAH · QCB · Ci-Net · Benefit'], ['Freehold access', 'All UAE freehold zones'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'Pegged currencies, minimal haircut', p: 'Riyal, dinar and rial incomes are tied to the US dollar, as the dirham is, so lenders usually discount them only lightly, if at all, when converting. Floating currencies such as sterling, the euro or the rupee are typically cut by more.' },
      { h: 'Documents banks ask for', p: 'Employees: a salary letter and around six months of bank statements, with a GOSI certificate for Saudi applicants. Business owners: the commercial registration, establishment card and two years of audited accounts.' },
    ],
    faqs: [{ q: 'Can GCC nationals buy outside freehold areas?', a: 'In some emirates Gulf citizens may own in areas closed to other foreign buyers. Confirm the title position with the land department before the bank orders a valuation.' }],
    calc: 'mortgage-calculator',
  },
  {
    slug: 'non-resident-dubai', name: 'Non-Resident Mortgages', ar: 'تمويل غير المقيمين', core: true,
    title: `Non-Resident Dubai Mortgages: ${LENDER.nonResidentLtv.min}–${LENDER.nonResidentLtv.max}% LTV, Set by Each Bank`,
    badge: `${LENDER.nonResidentLtv.min}–${LENDER.nonResidentLtv.max}% LTV · bank policy`, cta: 'Check non-resident LTV',
    card: 'Use income earned abroad to finance a home or investment in the UAE.',
    capsule: 'You do not need an Emirates ID to borrow against Dubai property: 14 UAE lenders on our panel accept buyers living overseas. HSBC, Emirates NBD, FAB, ADCB, Standard Chartered and DIB typically cap non-resident loans at 60% LTV, while Mashreq, CBD and Amlak may reach 65%. Most files complete in three to five weeks and can be signed remotely.',
    facts: [['Typical LTV (bank policy)', `${LENDER.nonResidentLtv.min}–${LENDER.nonResidentLtv.max}%`], ['Active lenders', '14 banks'], ['Max tenure', `${REG.tenorMax} years`], ['FX haircut', 'Varies by currency'], ['Remote closing', 'Confirm lender & notary requirements'], ['Timeline', '3–5 weeks']],
    sections: [
      { h: 'How overseas income is read', p: 'Foreign earnings are converted to dirhams and then trimmed as a buffer against currency moves. Floating currencies such as sterling, the euro or the rupee usually take a bigger cut than dollar-linked ones. The bank checks the figure against your tax returns and a home-country credit report. Our country guides list what each nationality is usually asked for.' },
      { h: 'Closing without flying in', p: 'The sale agreement (Form F) can be signed online, and a Dubai Courts remote notary session can grant a power of attorney to someone who attends the transfer for you. Make sure the wording covers taking the loan and registering the mortgage, and check how recent the bank needs it to be.' },
      { h: 'Wholesale FX on your down payment', p: 'Sending a large deposit through a currency specialist rather than your high-street bank can narrow the exchange spread noticeably. Ask for the all-in rate in writing before you transfer.' },
    ],
    faqs: [
      { q: 'Do I need a UAE bank account?', a: 'Yes. The lender opens an account in your name to collect repayments, and this can usually be arranged remotely as part of the application.' },
      { q: 'What is the minimum income?', a: 'Each bank sets its own threshold after converting and discounting foreign income. As a guide, many look for the equivalent of AED 25,000 to 30,000 a month.' },
    ],
    calc: 'non-resident-rental-coverage',
  },
  {
    slug: 'self-employed', name: 'Self-Employed Mortgages', ar: 'تمويل أصحاب الأعمال',
    title: 'Self-Employed & Freezone Company Owner Mortgages: Retained Earnings and Dividend Add-Back Underwriting',
    badge: 'Corporate income accepted', cta: 'Assess my business income',
    card: 'Get your company accounts in shape before a lender looks at them.',
    capsule: `Business owners are usually asked for a trade licence at least two years old, two years of audited accounts and six to twelve months of company bank statements. Some lenders, including RAKBANK, Mashreq, CBD, Emirates NBD, DIB and FAB, will look past a small salary to company profit, depreciation and drawings. The normal caps still apply: ${REG.ltv.expat.first}% on an expatriate’s first home up to AED 5M.`,
    facts: [['Trading history', '≥ 2 years'], ['Financials', '2 years audited'], ['Max LTV (expat first home)', `${REG.ltv.expat.first}%`], ['Age at maturity', 'Set by each bank'], ['Income method', 'Net profit + add-backs × shareholding'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'The retained-earnings problem', p: 'Owners often draw a modest salary and leave profit in the business, which makes personal income look thin on paper. Banks that assess company earnings can count your share of profit, plus depreciation and drawings, instead of salary alone.' },
      { h: 'Freezone specifics', p: 'Companies in DMCC, IFZA, Meydan, RAKEZ, DIFC and other free zones are widely accepted. Some banks still want a minimum turnover or a physical UAE office, so check your licence type against each lender before you apply.' },
    ],
    faqs: [{ q: 'Can I use only one year of financials?', a: 'Occasionally, for well-established professionals, but expect a smaller loan relative to value and a higher rate than with two full years.' }],
    calc: 'dbr-borrowing-power',
  },
  {
    slug: 'golden-visa-mortgage', name: 'Golden Visa Mortgages', ar: 'تمويل الإقامة الذهبية', core: true,
    title: 'UAE Golden Visa Mortgages: Property Finance & Eligibility',
    badge: 'Property & residency', cta: 'Explore Golden Visa mortgages',
    card: 'See where property finance and long-term residency rules meet.',
    capsule: 'Getting a mortgage and qualifying for a Golden Visa are two different processes run by two different bodies. Whether a financed property counts towards residency depends on its value, how ownership is evidenced and the rules in force when you apply. Check with the land department and the immigration authority before you commit.',
    facts: [['Mortgage decision', 'Lender assessment'], ['Visa decision', 'Relevant authority'], ['Property evidence', 'Confirm with DLD'], ['Bank NOC', 'May be required'], ['Visa fees', 'Confirm current fees'], ['Refinancing', 'Check documentation impact']],
    sections: [
      { h: 'Check the property and ownership evidence', p: 'Find out which title, valuation and ownership papers the authority will want for your property. Ready and off-plan homes are often treated differently.' },
      { h: 'Keep the finance and visa decisions separate', p: 'A bank approval says nothing about residency eligibility. Get current guidance from the authority directly, and ask your lender whether it must issue a no-objection letter.' },
    ],
    faqs: [
      { q: 'Does mortgage approval guarantee a Golden Visa?', a: 'No. Residency is decided by the authority, independently of the bank.' },
      { q: 'What happens if I refinance?', a: 'Moving the loan can change the paperwork behind your visa. Ask both the new lender and the authority what they will need.' },
    ],
    calc: 'golden-visa-mortgage-calculator',
  },
  {
    slug: 'islamic-home-finance', name: 'Islamic Home Finance', ar: 'التمويل العقاري الإسلامي', core: true,
    title: 'Islamic Sharia-Compliant Home Finance: Ijara vs Murabaha Across DIB, ADIB, EIB, SIB & Ajman Bank',
    badge: 'Ijara & Murabaha', cta: 'Compare Islamic rates',
    card: 'Weigh up Sharia-compliant structures, profit rates and terms side by side.',
    capsule: 'Sharia-compliant home finance in the UAE mostly takes two forms. With Ijara the bank owns the home and leases it to you, and the rent moves with EIBOR. With Murabaha the bank sells it to you at an agreed mark-up. On our current panel the lowest one-year profit rate is 3.75% (Sharjah Islamic Bank) and the lowest margin after the fixed period is 1.00% (DIB).',
    facts: [['Lowest profit rate', '3.75% (SIB, 1Y)'], ['Lowest revert margin', '+1.00% (DIB)'], ['Structures', 'Ijara · Murabaha · Diminishing Musharaka'], ['Islamic lenders', '8 on panel'], ['LTV', 'Same CBUAE caps'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'Ijara vs Murabaha in practice', p: 'Ijara rent is reset against EIBOR, so it can go up or down, and it tends to allow more flexible part-payments. Murabaha locks the total profit when you sign. That gives certainty, but you gain nothing if market rates later fall.' },
      { h: 'Takaful instead of conventional insurance', p: 'Life and property cover on Islamic finance is provided through Takaful. Several Islamic lenders will accept your own Takaful policy instead of their bundled one, which can cost less.' },
    ],
    faqs: [{ q: 'Is Islamic finance more expensive?', a: 'Not by default. On our November 2026 figures, Islamic banks offer both the lowest starting rate and the lowest margin after the fixed period.' }],
    calc: 'fixed-to-revert-analyzer',
  },
  {
    slug: 'mortgage-buyout-refinance', name: 'Switch Bank (Buyout)', ar: 'نقل التمويل وإعادة التمويل', core: true,
    title: 'Switch Bank / Mortgage Buyout: CBUAE 1% Exit Cap, Zero-Fee Banks & 3-Year Clawback Math',
    badge: 'Compare switching costs', cta: 'Calculate refinance savings',
    card: 'Find out whether moving your loan pays once every exit cost is counted.',
    capsule: `A buyout replaces your current mortgage with a new one at another bank, usually to get a lower rate. Central bank rules limit what your existing lender can charge for early repayment to ${ES}, whichever is lower. Many banks waive their own arrangement and valuation fees for switchers but may ask for them back if you move again within about three years.`,
    facts: [['Exit penalty cap', `${ES}, lower of`], ['Buyout processing fee', 'Often waived'], ['Clawback window', 'Typically 36 months'], ['Break-even target', '< 12 months'], ['Golden Visa', 'Check documents with the authority'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'When a switch pays', p: `Add up what moving costs, including the early repayment charge (no more than ${ES}), the new mortgage registration fee and any fees you would have to repay later. Then compare that with the monthly saving. On larger balances even a modest rate cut often pays for itself within a year. The calculator runs the comparison month by month.` },
      { h: 'The liability letter sequence', p: 'Once the new bank issues its offer, your current bank provides a liability letter showing the exact payoff amount, which is only valid for a short time. The new lender clears the old loan, and the land department records the new mortgage. It usually takes three to four weeks end to end.' },
    ],
    faqs: [{ q: 'Can I take cash out when I switch?', a: `Often, yes, as long as the new loan stays inside the usual caps (for example ${REG.ltv.expat.first}% of the new valuation on an expatriate’s first home) and the higher repayment still passes the ${REG.dbrMax}% debt test.` }],
    calc: 'buyout-refinance-savings',
  },
  {
    slug: 'equity-release', name: 'Equity Release & Cash-Out', ar: 'تحرير حقوق الملكية', core: true,
    title: `Equity Release & Cash-Out Refinancing: Borrow Against a Home You Own`,
    badge: 'Property-backed borrowing', cta: 'Calculate unlocked equity',
    card: 'Borrow against a property you own, subject to a fresh affordability check.',
    capsule: `Equity release turns part of your home’s current value into cash by taking a new or larger mortgage on it. The usual limits apply: ${REG.ltv.expat.first}% for an expatriate’s first home and ${REG.ltv.national.first}% for a UAE National’s (up to AED 5M), and ${REG.ltv.expat.subsequent}% or ${REG.ltv.national.subsequent}% on investment property. Expect the bank to ask what the funds are for, and to check that the new repayment fits within ${REG.dbrMax}% of income.`,
    facts: [['Max LTV (expat first home)', `${REG.ltv.expat.first}%`], ['Max LTV (investment)', `${REG.ltv.expat.subsequent}% expat · ${REG.ltv.national.subsequent}% National`], ['Valuation basis', 'Current RERA valuation'], ['Tenure', `Up to ${REG.tenorMax} years`], ['Typical timeline', '2–3 weeks'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'Using equity to buy the next property', p: 'A common move is to borrow against a home that is already paid off and use the cash for the deposit and costs on a second purchase. Lenders generally treat this as your own money, which a personal loan would not be.' },
      { h: 'Protect the family while you leverage', p: 'More borrowing means more to protect. An assigned life policy from an outside insurer can cost less than the bank’s own cover, and a registered will helps the property pass smoothly if an owner dies.' },
    ],
    faqs: [{ q: 'Is there a minimum release amount?', a: 'Many lenders will not write a loan below about AED 500,000, although the threshold varies.' }],
    calc: 'handover-equity-release',
  },
  {
    slug: 'second-home-investment', name: 'Investment & Second Homes', ar: 'تمويل المنزل الثاني والاستثمار',
    title: `Investment & Second Property Mortgages: ${REG.ltv.expat.subsequent}% / ${REG.ltv.national.subsequent}% LTV and Using Rent to Support Affordability`,
    badge: `${REG.ltv.expat.subsequent}–${REG.ltv.national.subsequent}% LTV`, cta: 'Model rental coverage',
    card: 'Test a second purchase against realistic rent and the deposit it needs.',
    capsule: `Once you already own a home, any further property can be financed up to ${REG.ltv.expat.subsequent}% of its value if you are an expatriate, or ${REG.ltv.national.subsequent}% as a UAE National, regardless of price. Many lenders treat part of a registered tenancy’s rent as extra income, which can make the new repayment easier to fit within the ${REG.dbrMax}% limit.`,
    facts: [['Max LTV', `${REG.ltv.expat.subsequent}% expat · ${REG.ltv.national.subsequent}% National`], ['Rent counted', 'Bank-specific share of Ejari'], ['Proof of rent', 'Ejari + 6 months credits'], ['Short-let income', 'Some banks, with DTCM permit'], ['Tenure', `Up to ${REG.tenorMax} years`], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'How rent improves your borrowing power', p: 'Suppose a unit is let for AED 96,000 a year and your bank counts 80% of it. That adds AED 6,400 a month to the income it assesses, which can support a noticeably larger loan. The exact share counted depends on the lender.' },
      { h: 'Gross yields by community', p: 'Each of our 60 community pages shows an indicative price per square foot and gross yield. You can see how far rent might go towards a repayment before you shortlist an area.' },
    ],
    faqs: [{ q: 'Does holiday-home income count?', a: 'A small number of lenders accept licensed short-let income, typically averaged over a year and counted at a reduced rate.' }],
    calc: 'non-resident-rental-coverage',
  },
  {
    slug: 'land-plot-construction', name: 'Plot & Construction Loans', ar: 'تمويل الأراضي والبناء',
    title: 'Residential Land Plot & Self-Build Villa Construction Loans: Stage-Payment Drawdowns',
    badge: 'Stage drawdowns', cta: 'Plan my build finance',
    card: 'Fund a plot and its build in stages tied to construction progress.',
    capsule: 'Build finance usually covers a share of the plot price and a larger share of construction cost, released in instalments as an appointed consultant signs off each stage. The borrower, bank and contractor sign a three-way agreement that controls payments, and interest is only charged on money already drawn. Each lender sets its own percentages.',
    facts: [['Plot LTV', 'Bank policy'], ['Build cost LTV', 'Bank policy'], ['Drawdowns', '4–6 certified stages'], ['Agreement', 'Tripartite with contractor'], ['Interest', 'On drawn balance only'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'What banks need before stage one', p: 'Have approved drawings, a building permit, a fixed-price contract with a licensed builder and an independent consultant ready to certify progress before the first release.' },
      { h: 'Where it works', p: 'Typical cases are freehold villa plots in master communities such as Dubai Hills, Jumeirah Golf Estates, Al Furjan, Tilal Al Ghaf and Saadiyat, and plots granted to nationals under housing programmes.' },
    ],
    faqs: [{ q: 'Can I convert to a standard mortgage on completion?', a: 'Yes. Once the completion certificate is issued, the facility normally becomes an ordinary repayment mortgage.' }],
    calc: 'mortgage-calculator',
  },
  {
    slug: 'under-construction-off-plan', name: 'Off-Plan & Handover Finance', ar: 'تمويل العقارات على الخارطة', core: true,
    title: `Under-Construction Off-Plan Mortgages: Lending During Construction and at Handover`,
    badge: 'Emaar · Meraas · Sobha', cta: 'Check my project’s APL',
    card: 'Plan the final developer payment and check your project is bankable.',
    capsule: `While a building is still going up, most lenders will finance no more than ${LENDER.offPlanLtv}% of the price, and that limit is bank policy rather than regulation. As handover nears, a bank may treat the unit as ready. The standard first-home caps then apply (${REG.ltv.expat.first}% for expatriates, ${REG.ltv.national.first}% for UAE Nationals up to AED 5M), provided the tower is on that bank’s approved project list.`,
    facts: [['Under-construction LTV', `Up to ${LENDER.offPlanLtv}% (bank policy)`], ['Handover LTV', `${REG.ltv.expat.first}% expat · ${REG.ltv.national.first}% National`], ['DLD fee at handover', 'None (Oqood paid)'], ['Handover fees', 'Registration, trustee, title deed, valuation'], ['Projects mapped', '80 handover pages'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'The APL is everything', p: 'Banks only lend on developments they have approved, often building by building. If your tower is not on a lender’s list, that lender is out, so check coverage well before the developer sends its completion notice.' },
      { h: 'Valuation uplift cash-out', p: `If the unit is worth more at handover than you paid, a lender valuing it fresh may lend more than you still owe the developer. Example: bought for AED 2.0M on an 80/20 plan, now valued at AED 2.8M. At ${REG.ltv.expat.first}% that is a loan of AED 2.24M: AED 400,000 settles the developer and the rest could be released, subject to affordability.` },
    ],
    faqs: [{ q: 'Can I get a mortgage before 50% is paid?', a: `It is possible with some lenders, but choice is limited and most cap lending at ${LENDER.offPlanLtv}% during construction. Many buyers keep paying the developer and arrange finance at handover instead.` }],
    calc: 'handover-equity-release',
  },
  {
    slug: 'mega-loans-luxury-villas', name: 'HNW Mega Loans', ar: 'تمويل الفلل الفاخرة',
    title: 'HNW Mega Mortgages & Trophy Asset Financing: AED 15M to AED 100M+ in Emirates Hills & Palm Jumeirah',
    badge: 'AED 15M–100M+', cta: 'Speak to the private desk',
    card: 'Put together a bespoke finance case for a high-value home.',
    capsule: `Loans above about AED 15M are usually arranged through the private-banking teams of lenders such as FAB, HSBC, Emirates NBD and Standard Chartered. Because these homes are above AED 5M, the caps are ${REG.ltv.expat.firstAbove}% of value for an expatriate’s first home and ${REG.ltv.national.firstAbove}% for a UAE National’s. Pricing is negotiated around the wider relationship, and investment or rental income can stand in for salary.`,
    facts: [['Loan size', 'AED 15M–100M+'], ['Max LTV (> AED 5M, first home)', `${REG.ltv.expat.firstAbove}% expat · ${REG.ltv.national.firstAbove}% National`], ['Income basis', 'Global assets, dividends, rent'], ['Pricing', 'Relationship-negotiated'], ['Valuation', 'Two-valuer panels'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'Relationship pricing', p: 'Placing investments with the lender can earn a lower rate. Check whether the saving is worth more than what those assets could earn elsewhere before you agree.' },
      { h: 'Trophy valuations', p: 'One-off homes on the Palm fronds or Emirates Hills golf frontage have few direct comparables, so banks often ask for two valuations. Gathering sale evidence early helps both valuers.' },
    ],
    faqs: [{ q: 'Can an offshore company hold the property?', a: 'Many private banks accept ownership through a RAK ICC or JAFZA offshore company, usually backed by personal guarantees from the shareholders.' }],
    calc: 'mortgage-calculator',
  },
  {
    slug: 'portfolio-consolidation', name: 'Portfolio Consolidation', ar: 'دمج المحافظ العقارية',
    title: 'Multi-Property Portfolio Consolidation Mortgages: 2 to 10 Properties in One Low-Rate Facility',
    badge: '2–10 properties', cta: 'Review my portfolio',
    card: 'Look at all your property loans together: fees, security and terms.',
    capsule: `Consolidation moves several mortgaged UAE properties, typically two to ten, onto one lender’s books so the rates and renewal dates line up. Every property is valued on its own, the rents are assessed together, and the early repayment charge on each existing loan is limited to ${ES}, whichever is lower.`,
    facts: [['Properties', '2–10'], ['Max LTV (investment)', `${REG.ltv.expat.subsequent}% expat · ${REG.ltv.national.subsequent}% National`], ['Exit cap per loan', `${ES}, lower of`], ['Rent assessment', 'Portfolio-level'], ['Benefit', 'One rate, one revert date'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'Why consolidate', p: 'Spreading loans across several banks means juggling different reset dates and minimum rates. A single facility is easier to manage and gives you more weight when the rate comes up for review.' },
      { h: 'Exit-cost math', p: 'Each loan you move has its own early repayment charge. Only move the ones where the rate saving covers that charge within about a year.' },
    ],
    faqs: [{ q: 'Do all properties need to be in one emirate?', a: 'No. Nationwide lenders can secure homes in different emirates, with a separate valuation for each title.' }],
    calc: 'buyout-refinance-savings',
  },
];

export const productBy = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
