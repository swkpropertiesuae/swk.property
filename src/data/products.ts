// Silo 02 — Core mortgage products & buyer profiles (/mortgages/[slug]).
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

export const PRODUCTS: Product[] = [
  {
    slug: 'uae-residents', name: 'Expat Resident Mortgages', ar: 'تمويل المقيمين الوافدين', core: true,
    title: 'Expat Resident Mortgages in Dubai: 80% LTV on Your First Home',
    badge: 'Up to 80% LTV', cta: 'Start my mortgage enquiry',
    card: 'Plan your deposit, monthly payment and application for a UAE home.',
    capsule: 'Expat residents in the UAE can borrow up to 80% of a first home valued at AED 5M or less and 70% above AED 5M under CBUAE rules. Tenures run to 25 years, with maturity age set by lender policy, with total debt repayments capped at 50% of gross monthly income.',
    facts: [['Max LTV (≤ AED 5M)', '80%'], ['Max LTV (> AED 5M)', '70%'], ['Minimum salary', 'AED 10,000–15,000 / month'], ['Max tenure', '25 yrs or age 65'], ['Pre-approval', 'Lender-dependent'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'How residents are underwritten', p: 'Banks read your salary certificate (dated within 30 days), six months of payslips and six consecutive salary credits. Fixed allowances count in full; variable pay, bonuses and commissions are usually averaged over 12–24 months at 50–75%. Your employer’s listing category with each bank changes both the rate and whether salary transfer is required.' },
      { h: 'The real cash you need', p: 'On top of the 20% down payment, budget about 7% for the 4% DLD fee, AED 580 title deed, 0.25% mortgage registration, AED 4,200 trustee fee, AED 3,150 valuation and the 2.1% agency commission. Our calculator itemises every dirham before you sign anything.' },
      { h: 'Why dual pre-approval matters', p: 'A pre-approval from one bank can collapse if its valuer down-values the unit. We submit to a primary and a backup bank whose valuer panels differ, but neither a backup application nor pre-approval guarantees a valuation or protects a deposit. Contract conditions need legal review.' },
    ],
    faqs: [
      { q: 'Can I buy with 10% down as an expat?', a: 'No. CBUAE caps first-home LTV for expats at 80% (≤ AED 5M), so at least 20% must be your own funds—and it cannot come from a UAE personal loan.' },
      { q: 'Do I need to transfer my salary?', a: 'Not always. Salary-transfer products are 0.10–0.25% cheaper, but around half the panel offers non-salary-transfer pricing for listed employers.' },
      { q: 'How long does the whole process take?', a: 'Typically 3–5 weeks from pre-approval to DLD transfer: document review, valuation, a Final Offer Letter and trustee transfer. The lender confirms timing.' },
    ],
    calc: 'mortgage-calculator',
  },
  {
    slug: 'uae-nationals', name: 'UAE National Mortgages', ar: 'تمويل المواطنين الإماراتيين',
    title: 'UAE National & Emirati Mortgages: 85% LTV + MRHE and Sheikh Zayed Top-Ups',
    badge: 'Up to 85% LTV', cta: 'Check Emirati eligibility',
    card: 'Explore home finance and housing-programme requirements for Emirati buyers.',
    capsule: 'UAE Nationals can borrow up to 85% of a first home valued at AED 5M or less and 75% above, with tenures to 25 years and maturity up to age 70. Bank loans can be layered on top of Mohammed bin Rashid Housing Establishment or Sheikh Zayed Housing Programme approvals to fund larger villas.',
    facts: [['Max LTV (≤ AED 5M)', '85%'], ['Max LTV (> AED 5M)', '75%'], ['Max age at maturity', '70'], ['Housing grant top-ups', 'MRHE · SZHP'], ['Pension income', 'Accepted'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'Combining government housing with a bank loan', p: 'Where an MRHE or SZHP loan covers part of a villa build or purchase, the bank can register a second-ranking facility for the balance. We sequence both approvals so the housing authority NOC and bank offer arrive together.' },
      { h: 'Pricing for nationals', p: 'Several panel banks price UAE National salary-transfer loans 0.10–0.20% below expat tiers, and Islamic banks such as DIB, ADIB and Al Hilal offer Ijara with national-only profit rates.' },
      { h: 'Government and semi-government employers', p: 'Federal, emirate-level and GRE employees typically fall into the top employer category at every bank, unlocking the lowest rate tiers and higher income multiples.' },
    ],
    faqs: [
      { q: 'Can a UAE National borrow for a second home?', a: 'Yes—second and investment homes are capped at 65% LTV for nationals, with rental income counted toward affordability.' },
      { q: 'Is the MRHE loan counted in my DBR?', a: 'Yes. Its monthly instalment is included in the 50% debt burden ratio, which is why sequencing and tenor choice matter.' },
    ],
    calc: 'dbr-borrowing-power',
  },
  {
    slug: 'gcc-nationals', name: 'GCC National Mortgages', ar: 'تمويل مواطني دول الخليج',
    title: 'GCC National Mortgages in Dubai & Abu Dhabi: Saudi, Qatari, Kuwaiti, Bahraini & Omani Buyers',
    badge: 'Up to 75% LTV', cta: 'Check GCC eligibility',
    card: 'Understand UAE property finance for GCC citizens, at home or overseas.',
    capsule: 'GCC citizens buying in Dubai or Abu Dhabi are underwritten close to UAE National terms when resident, and at up to 65–70% LTV when living in their home country. Banks verify income through GOSI, employer letters or commercial registrations and pull SIMAH, QCB or Ci-Net bureau reports.',
    facts: [['Resident GCC LTV', 'Up to 75–80%'], ['Non-resident GCC LTV', '65–70%'], ['FX haircut', '0–5% (pegged currencies)'], ['Credit bureaux', 'SIMAH · QCB · Ci-Net · Benefit'], ['Freehold access', 'All UAE freehold zones'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'Pegged currencies, minimal haircut', p: 'Because SAR, QAR, BHD and OMR are pegged to the dollar, most banks apply little or no FX haircut to GCC income—unlike the 15–20% applied to GBP, EUR or INR.' },
      { h: 'Documents banks ask for', p: 'Salaried: salary certificate plus six months of statements (GOSI certificate for Saudi applicants). Self-employed: commercial registration, establishment card and two years of audited accounts.' },
    ],
    faqs: [{ q: 'Can GCC nationals buy outside freehold areas?', a: 'GCC citizens enjoy wider ownership rights than other foreigners in several emirates; we confirm title eligibility with DLD or ADREC before the bank instructs valuation.' }],
    calc: 'mortgage-calculator',
  },
  {
    slug: 'non-resident-dubai', name: 'Non-Resident Mortgages', ar: 'تمويل غير المقيمين', core: true,
    title: 'Non-Resident Dubai Mortgages: Up to 65% LTV Across 14 UAE Banks',
    badge: 'Up to 65% LTV · Remote PoA', cta: 'Check non-resident LTV',
    card: 'Explore UAE mortgage options using overseas salary or business income.',
    capsule: 'Non-residents can get a Dubai mortgage without an Emirates ID across 14 UAE banks. HSBC, Emirates NBD, FAB, ADCB, Standard Chartered and DIB lend up to 60% LTV; Mashreq, CBD and Amlak lend up to 65%. Closing can be fully remote in 3–5 weeks via a 15-minute Dubai Courts video Power of Attorney.',
    facts: [['Max LTV', '60–65%'], ['Active lenders', '14 banks'], ['Max tenure', '25 years'], ['FX haircut', '0–20% by currency'], ['Remote closing', 'Confirm lender & notary requirements'], ['Timeline', '3–5 weeks']],
    sections: [
      { h: 'How overseas income is read', p: 'Banks convert foreign income at a haircut (e.g. 15% for GBP or EUR, 20% for INR) and verify it with home-country tax returns and credit bureau reports. Country guides outline documents to discuss with the lender.' },
      { h: 'Closing without flying in', p: 'Form F is signed through Dubai REST OTP. A Dubai Courts Smart Notary video call issues a Power of Attorney that must explicitly include borrowing and first-degree mortgage registration authority, dated within two years.' },
      { h: 'Wholesale FX on your down payment', p: 'Down payments and fees move through our FX partner at wholesale spreads, typically saving 1–2% versus retail bank conversion on a seven-figure transfer.' },
    ],
    faqs: [
      { q: 'Do I need a UAE bank account?', a: 'Yes—the lending bank opens a non-resident account to collect EMIs; we coordinate it remotely alongside the mortgage file.' },
      { q: 'What is the minimum income?', a: 'Most banks look for the equivalent of AED 25,000–30,000 per month after the FX haircut.' },
    ],
    calc: 'non-resident-rental-coverage',
  },
  {
    slug: 'self-employed', name: 'Self-Employed Mortgages', ar: 'تمويل أصحاب الأعمال',
    title: 'Self-Employed & Freezone Company Owner Mortgages: Retained Earnings and Dividend Add-Back Underwriting',
    badge: 'Corporate income accepted', cta: 'Assess my business income',
    card: 'Prepare your company accounts and income evidence for a lender review.',
    capsule: 'Self-employed borrowers in the UAE need a trade licence held for at least two years, two years of audited financials and 6–12 months of corporate statements. Banks such as RAKBANK, Mashreq, CBD, Emirates NBD, DIB and FAB can underwrite corporate net profit plus depreciation and director drawings at up to 80% LTV.',
    facts: [['Trading history', '≥ 2 years'], ['Financials', '2 years audited'], ['Max LTV', '80% (resident)'], ['Max age at maturity', '70'], ['Income method', 'Net profit + add-backs × shareholding'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'The retained-earnings problem', p: 'Most rejections happen because owners pay themselves little salary and leave profit in the company. We present corporate net profit, depreciation and director drawings to banks that accept them, attributed by shareholding.' },
      { h: 'Freezone specifics', p: 'DMCC, IFZA, Meydan, RAKEZ and DIFC entities are accepted, but some banks require a minimum turnover or a UAE-based office lease. We pre-screen your licence category against each bank’s policy.' },
    ],
    faqs: [{ q: 'Can I use only one year of financials?', a: 'A few banks accept 12 months for established professions, usually at a lower LTV and higher rate.' }],
    calc: 'dbr-borrowing-power',
  },
  {
    slug: 'golden-visa-mortgage', name: 'Golden Visa Mortgages', ar: 'تمويل الإقامة الذهبية', core: true,
    title: 'UAE Golden Visa Mortgages: Property Finance & Eligibility',
    badge: 'Property & residency', cta: 'Explore Golden Visa mortgages',
    card: 'Understand how property finance and Golden Visa requirements fit together.',
    capsule: 'A mortgage and a Golden Visa are separate applications. Property value, ownership evidence and current authority requirements affect residency eligibility. Check the documents required for a mortgaged property with DLD and the relevant immigration authority before committing.',
    facts: [['Mortgage decision', 'Lender assessment'], ['Visa decision', 'Relevant authority'], ['Property evidence', 'Confirm with DLD'], ['Bank NOC', 'May be required'], ['Visa fees', 'Confirm current fees'], ['Refinancing', 'Check documentation impact']],
    sections: [
      { h: 'Check the property and ownership evidence', p: 'Confirm which title, valuation and ownership documents apply to your case. Off-plan and completed properties can have different requirements.' },
      { h: 'Keep the finance and visa decisions separate', p: 'Bank pre-approval does not confirm visa eligibility. Request current guidance from the relevant authority and ask the lender about NOC requirements.' },
    ],
    faqs: [
      { q: 'Does mortgage approval guarantee a Golden Visa?', a: 'No. The relevant authority makes the residency decision separately.' },
      { q: 'What happens if I refinance?', a: 'Ask the lender and relevant authority which updated documents are required for your circumstances.' },
    ],
    calc: 'golden-visa-mortgage-calculator',
  },
  {
    slug: 'islamic-home-finance', name: 'Islamic Home Finance', ar: 'التمويل العقاري الإسلامي', core: true,
    title: 'Islamic Sharia-Compliant Home Finance: Ijara vs Murabaha Across DIB, ADIB, EIB, SIB & Ajman Bank',
    badge: 'Ijara & Murabaha', cta: 'Compare Islamic rates',
    card: 'Compare Islamic home finance structures, profit rates and terms.',
    capsule: 'Islamic home finance in the UAE is mainly offered as Ijara (lease-to-own with a variable rental linked to EIBOR) or Murabaha (cost-plus sale with a fixed profit). Profit rates start at 3.75% (1-year, Sharjah Islamic Bank), and DIB carries the lowest revert margin on the panel at +1.00%.',
    facts: [['Lowest profit rate', '3.75% (SIB, 1Y)'], ['Lowest revert margin', '+1.00% (DIB)'], ['Structures', 'Ijara · Murabaha · Diminishing Musharaka'], ['Islamic lenders', '8 on panel'], ['LTV', 'Same CBUAE caps'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'Ijara vs Murabaha in practice', p: 'Ijara lets the bank own the asset and lease it to you, with rentals re-priced off EIBOR—most flexible for overpayment. Murabaha fixes the total profit at signing, giving certainty but less benefit if rates fall.' },
      { h: 'Takaful instead of conventional insurance', p: 'Islamic finance pairs with Takaful life and property cover. Several Islamic banks accept assigned external Takaful policies at lower cost than bundled cover.' },
    ],
    faqs: [{ q: 'Is Islamic finance more expensive?', a: 'Not inherently. On our November 2026 panel, Islamic banks hold both the lowest intro rate (SIB) and the lowest revert margin (DIB).' }],
    calc: 'fixed-to-revert-analyzer',
  },
  {
    slug: 'mortgage-buyout-refinance', name: 'Switch Bank (Buyout)', ar: 'نقل التمويل وإعادة التمويل', core: true,
    title: 'Switch Bank / Mortgage Buyout: CBUAE 1% Exit Cap, Zero-Fee Banks & 3-Year Clawback Math',
    badge: 'Compare switching costs', cta: 'Calculate refinance savings',
    card: 'Compare refinance savings after exit fees and switching costs.',
    capsule: 'A UAE mortgage buyout moves your loan to a cheaper bank. CBUAE caps early settlement penalties at 1% of the outstanding balance or AED 10,000, whichever is lower, plus VAT. Most banks waive buyout processing and valuation fees but claw them back if you leave within 36 months.',
    facts: [['Exit penalty cap', '1% or AED 10,000 (+VAT)'], ['Buyout processing fee', '0% at most banks'], ['Clawback window', 'Typically 36 months'], ['Break-even target', '< 12 months'], ['Golden Visa', 'Remains valid'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'When a switch pays', p: 'As a rule of thumb, a 0.50% rate cut on a balance above AED 1M recovers the AED 10,500 exit cost in under a year. Our calculator includes the old bank’s penalty, new mortgage registration (0.25% + AED 290) and any clawback exposure.' },
      { h: 'The liability letter sequence', p: 'Your new bank issues an FOL, your current bank issues a liability letter (valid ~15 days), the new bank pays off the old loan by manager’s cheque, and DLD re-registers the mortgage—usually 3–4 weeks.' },
    ],
    faqs: [{ q: 'Can I take cash out when I switch?', a: 'Yes—combine the buyout with equity release up to 80% of the new valuation for residents (subject to DBR).' }],
    calc: 'buyout-refinance-savings',
  },
  {
    slug: 'equity-release', name: 'Equity Release & Cash-Out', ar: 'تحرير حقوق الملكية', core: true,
    title: 'Equity Release & Cash-Out Refinancing: Unlock up to 80% LTV from Paid-Off or Appreciated Homes',
    badge: 'Property-backed borrowing', cta: 'Calculate unlocked equity',
    card: 'Explore borrowing against property you own, subject to a new affordability review.',
    capsule: 'UAE equity release lets owners of paid-off or appreciated property borrow against current market value—up to 80% LTV for resident expats, 85% for UAE Nationals and 60–65% for investment property. Tax treatment depends on your circumstances, end use is checked and the new EMI must fit within the 50% DBR cap.',
    facts: [['Max LTV (resident home)', '80%'], ['Max LTV (investment)', '60–65%'], ['Valuation basis', 'Current RERA valuation'], ['Tenure', 'Up to 25 years'], ['Typical timeline', '2–3 weeks'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'Using equity to buy the next property', p: 'Many investors release equity from a paid-off apartment to fund the down payment and fees on an off-plan or second ready unit. Banks treat the released cash as own funds, unlike a personal loan.' },
      { h: 'Protect the family while you leverage', p: 'Assigning an external life policy (instead of the bank’s) saves roughly half the premium, and a DIFC single-property Will stops the asset freezing if a joint owner dies.' },
    ],
    faqs: [{ q: 'Is there a minimum release amount?', a: 'Most banks require a loan of at least AED 500,000.' }],
    calc: 'handover-equity-release',
  },
  {
    slug: 'second-home-investment', name: 'Investment & Second Homes', ar: 'تمويل المنزل الثاني والاستثمار',
    title: 'Investment & Second Property Mortgages: 60–65% LTV and Using Ejari Rent to Boost DBR',
    badge: '60–65% LTV', cta: 'Model rental coverage',
    card: 'Plan a second-home purchase with rental assumptions and a suitable deposit.',
    capsule: 'A second or investment home in the UAE is capped at 60–65% LTV for residents. Banks count 70–80% of the property’s registered Ejari rental income toward affordability, which can offset the new EMI within the 50% DBR limit—making portfolio growth feasible on a single salary.',
    facts: [['Max LTV', '60–65%'], ['Rent counted', '70–80% of Ejari'], ['Proof of rent', 'Ejari + 6 months credits'], ['Short-let income', 'Some banks, with DTCM permit'], ['Tenure', 'Up to 25 years'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'How rent improves your borrowing power', p: 'If your second unit rents for AED 96,000 a year, a bank counting 80% adds AED 6,400 per month to eligible income—roughly AED 1.1M of extra borrowing capacity at today’s stress rates.' },
      { h: 'Gross yields by community', p: 'Our 60 community hubs publish indicative price per square foot and gross yields so you can compare EMI coverage before choosing where to buy.' },
    ],
    faqs: [{ q: 'Does holiday-home income count?', a: 'A handful of banks accept DTCM-licensed short-let income averaged over 12 months, usually at a 50% factor.' }],
    calc: 'non-resident-rental-coverage',
  },
  {
    slug: 'land-plot-construction', name: 'Plot & Construction Loans', ar: 'تمويل الأراضي والبناء',
    title: 'Residential Land Plot & Self-Build Villa Construction Loans: Stage-Payment Drawdowns',
    badge: 'Stage drawdowns', cta: 'Plan my build finance',
    card: 'Explore finance for a plot or construction project, with staged payments.',
    capsule: 'UAE plot and construction loans typically fund 50–70% of the land price and up to 70–80% of build costs, released in stages against consultant-certified progress. A tripartite agreement between borrower, bank and contractor governs drawdowns, with interest charged only on released amounts.',
    facts: [['Plot LTV', '50–70%'], ['Build cost LTV', 'Up to 70–80%'], ['Drawdowns', '4–6 certified stages'], ['Agreement', 'Tripartite with contractor'], ['Interest', 'On drawn balance only'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'What banks need before stage one', p: 'Approved drawings, building permit, a fixed-price contract with a licensed contractor and a consultant appointed to certify each stage.' },
      { h: 'Where it works', p: 'Freehold villa plots in Dubai Hills, Jumeirah Golf Estates, Al Furjan, Tilal Al Ghaf and Saadiyat, plus national plots under housing programmes.' },
    ],
    faqs: [{ q: 'Can I convert to a standard mortgage on completion?', a: 'Yes—on the completion certificate the facility converts to an amortising home loan.' }],
    calc: 'mortgage-calculator',
  },
  {
    slug: 'under-construction-off-plan', name: 'Off-Plan & Handover Finance', ar: 'تمويل العقارات على الخارطة', core: true,
    title: 'Under-Construction Off-Plan Mortgages: CBUAE 50% LTV Ceiling and the 80% Handover Shift',
    badge: 'Emaar · Meraas · Sobha', cta: 'Check my project’s APL',
    card: 'Plan your developer balance and confirm project eligibility before handover.',
    capsule: 'CBUAE caps lending on off-plan property under early construction at 50% LTV. Within 60–90 days of handover, banks underwrite the final developer instalment as a ready property at up to 80% LTV for expat residents—only if the project is on the bank’s Approved Project List (APL).',
    facts: [['Under-construction LTV', '50% max'], ['Handover LTV', '80% resident · 85% National'], ['DLD fee at handover', 'None (Oqood paid)'], ['Handover fees', '0.25% + AED 290, AED 4,200, AED 580, AED 3,150'], ['Projects mapped', '80 handover pages'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'The APL is everything', p: 'Each bank keeps an approved list by developer and tower. A missing tower means no loan from that bank, so we check APL coverage before your developer’s handover notice arrives.' },
      { h: 'Valuation uplift cash-out', p: 'Banks lending on fresh handover valuation can fund more than the developer balance. Bought at AED 2.0M on 80/20, now valued at AED 2.8M? 80% LTV is AED 2.24M—AED 400k to the developer, the rest released as cash.' },
    ],
    faqs: [{ q: 'Can I get a mortgage before 50% is paid?', a: 'Yes, but under-construction loans are capped at 50% LTV and offered by fewer banks; most buyers wait for handover financing.' }],
    calc: 'handover-equity-release',
  },
  {
    slug: 'mega-loans-luxury-villas', name: 'HNW Mega Loans', ar: 'تمويل الفلل الفاخرة',
    title: 'HNW Mega Mortgages & Trophy Asset Financing: AED 15M to AED 100M+ in Emirates Hills & Palm Jumeirah',
    badge: 'AED 15M–100M+', cta: 'Speak to the private desk',
    card: 'Prepare a tailored finance assessment for a high-value property.',
    capsule: 'Mega mortgages above AED 15M in the UAE are typically structured by private-banking arms of FAB, HSBC, Emirates NBD and Standard Chartered. Residents borrow up to 70% LTV above AED 5M; pricing is negotiated on relationship assets, and global wealth or rental income can substitute for salary.',
    facts: [['Loan size', 'AED 15M–100M+'], ['Max LTV (> AED 5M)', '70% resident · 75% National'], ['Income basis', 'Global assets, dividends, rent'], ['Pricing', 'Relationship-negotiated'], ['Valuation', 'Two-valuer panels'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'Relationship pricing', p: 'Depositing AUM with the lender can cut 0.25–0.50% off the rate. We run the numbers to show whether the opportunity cost of parked assets beats the rate saving.' },
      { h: 'Trophy valuations', p: 'Unique assets on Palm Jumeirah fronds or Emirates Hills golf course lots often need two valuers; we pre-brief valuers with comparable evidence.' },
    ],
    faqs: [{ q: 'Can an offshore company hold the property?', a: 'Yes—RAK ICC or JAFZA offshore structures are accepted by most private banks, with personal guarantees.' }],
    calc: 'mortgage-calculator',
  },
  {
    slug: 'portfolio-consolidation', name: 'Portfolio Consolidation', ar: 'دمج المحافظ العقارية',
    title: 'Multi-Property Portfolio Consolidation Mortgages: 2 to 10 Properties in One Low-Rate Facility',
    badge: '2–10 properties', cta: 'Review my portfolio',
    card: 'Review property loans together, including fees, security and repayment terms.',
    capsule: 'Portfolio consolidation refinances 2 to 10 mortgaged UAE properties into one bank facility, aligning revert dates and often cutting the blended rate by 0.25–0.75%. Each property is valued separately, rents are assessed together, and CBUAE early-settlement caps limit exit costs to 1% or AED 10,000 per loan.',
    facts: [['Properties', '2–10'], ['Blended LTV', '60–65%'], ['Exit cap per loan', '1% or AED 10,000'], ['Rent assessment', 'Portfolio-level'], ['Benefit', 'One rate, one revert date'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'Why consolidate', p: 'Landlords with loans at four banks face four revert dates and four floor rates. One facility simplifies cash flow and strengthens your negotiating position at renewal.' },
      { h: 'Exit-cost math', p: 'Each existing loan carries its own capped exit penalty; we only recommend moving loans where the rate gain clears the penalty within 12 months.' },
    ],
    faqs: [{ q: 'Do all properties need to be in one emirate?', a: 'No. National banks lend across emirates, though valuation is instructed separately for each title.' }],
    calc: 'buyout-refinance-savings',
  },
];

export const productBy = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
