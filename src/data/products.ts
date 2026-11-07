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

export const PRODUCTS: Product[] = [
  {
    slug: 'uae-residents', name: 'Expat Resident Mortgages', ar: 'تمويل المقيمين الوافدين', core: true,
    title: `Expat Resident Mortgages in Dubai: ${REG.ltv.expat.first}% LTV on Your First Home`,
    badge: `Up to ${REG.ltv.expat.first}% LTV`, cta: 'Start my mortgage enquiry',
    card: 'Plan your deposit, monthly payment and application for a UAE home.',
    capsule: `Under CBUAE rules, expatriate residents can borrow up to ${REG.ltv.expat.first}% of a first home worth AED 5M or less, and ${REG.ltv.expat.firstAbove}% above that. The term can run to ${REG.tenorMax} years (each bank sets its own age limit), and all monthly debt repayments must stay within ${REG.dbrMax}% of gross income.`,
    facts: [['Max LTV (≤ AED 5M)', `${REG.ltv.expat.first}%`], ['Max LTV (> AED 5M)', `${REG.ltv.expat.firstAbove}%`], ['Minimum salary', 'Set by each bank'], ['Max tenure', `${REG.tenorMax} years`], ['Pre-approval', 'Lender-dependent'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'How residents are underwritten', p: 'Banks read your salary certificate (dated within 30 days), six months of payslips and six consecutive salary credits. Fixed allowances count in full; variable pay, bonuses and commissions are usually averaged over 12–24 months at 50–75%. Your employer’s listing category with each bank changes both the rate and whether salary transfer is required.' },
      { h: 'The real cash you need', p: 'On top of the 20% down payment, budget about 7% for the 4% DLD fee, AED 580 title deed, 0.25% mortgage registration, AED 4,200 trustee fee, AED 3,150 valuation and the 2.1% agency commission. Our calculator itemises every dirham before you sign anything.' },
      { h: 'Why dual pre-approval matters', p: 'A pre-approval from one bank can collapse if its valuer down-values the unit. We submit to a primary and a backup bank whose valuer panels differ, but neither a backup application nor pre-approval guarantees a valuation or protects a deposit. Contract conditions need legal review.' },
    ],
    faqs: [
      { q: 'Can I buy with 10% down as an expat?', a: `No. The CBUAE cap for an expatriate's first home up to AED 5M is ${REG.ltv.expat.first}%, so at least ${100 - REG.ltv.expat.first}% must come from your own funds.` },
      { q: 'Do I need to transfer my salary?', a: 'Not always. Salary-transfer products are 0.10–0.25% cheaper, but around half the panel offers non-salary-transfer pricing for listed employers.' },
      { q: 'How long does the whole process take?', a: 'Typically 3–5 weeks from pre-approval to DLD transfer: document review, valuation, a Final Offer Letter and trustee transfer. The lender confirms timing.' },
    ],
    calc: 'mortgage-calculator',
  },
  {
    slug: 'uae-nationals', name: 'UAE National Mortgages', ar: 'تمويل المواطنين الإماراتيين',
    title: `UAE National & Emirati Mortgages: ${REG.ltv.national.first}% LTV + MRHE and Sheikh Zayed Top-Ups`,
    badge: `Up to ${REG.ltv.national.first}% LTV`, cta: 'Check Emirati eligibility',
    card: 'Explore home finance and housing-programme requirements for Emirati buyers.',
    capsule: `CBUAE rules let UAE Nationals borrow up to ${REG.ltv.national.first}% of a first home worth AED 5M or less and ${REG.ltv.national.firstAbove}% above that, over a term of up to ${REG.tenorMax} years. Bank loans can be layered on top of Mohammed bin Rashid Housing Establishment or Sheikh Zayed Housing Programme approvals to fund larger villas.`,
    facts: [['Max LTV (≤ AED 5M)', '85%'], ['Max LTV (> AED 5M)', '75%'], ['Max age at maturity', '70'], ['Housing grant top-ups', 'MRHE · SZHP'], ['Pension income', 'Accepted'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'Combining government housing with a bank loan', p: 'Where an MRHE or SZHP loan covers part of a villa build or purchase, the bank can register a second-ranking facility for the balance. We sequence both approvals so the housing authority NOC and bank offer arrive together.' },
      { h: 'Pricing for nationals', p: 'Several panel banks price UAE National salary-transfer loans 0.10–0.20% below expat tiers, and Islamic banks such as DIB, ADIB and Al Hilal offer Ijara with national-only profit rates.' },
      { h: 'Government and semi-government employers', p: 'Federal, emirate-level and GRE employees typically fall into the top employer category at every bank, unlocking the lowest rate tiers and higher income multiples.' },
    ],
    faqs: [
      { q: 'Can a UAE National borrow for a second home?', a: `Yes. CBUAE caps second and later homes at ${REG.ltv.national.subsequent}% LTV for UAE Nationals; banks may count rental income toward affordability.` },
      { q: 'Is the MRHE loan counted in my DBR?', a: 'Yes. Its monthly instalment is included in the 50% debt burden ratio, which is why sequencing and tenor choice matter.' },
    ],
    calc: 'dbr-borrowing-power',
  },
  {
    slug: 'gcc-nationals', name: 'GCC National Mortgages', ar: 'تمويل مواطني دول الخليج',
    title: 'GCC National Mortgages in Dubai & Abu Dhabi: Saudi, Qatari, Kuwaiti, Bahraini & Omani Buyers',
    badge: 'Bank-specific LTV', cta: 'Check GCC eligibility',
    card: 'Understand UAE property finance for GCC citizens, at home or overseas.',
    capsule: 'GCC citizens buying in Dubai or Abu Dhabi are underwritten close to UAE National terms when resident, and on bank-specific non-resident terms when living in their home country. Banks verify income through GOSI, employer letters or commercial registrations and pull SIMAH, QCB or Ci-Net bureau reports.',
    facts: [['Resident GCC LTV', 'Bank-specific'], ['Non-resident GCC LTV', 'Bank-specific'], ['FX haircut', '0–5% (pegged currencies)'], ['Credit bureaux', 'SIMAH · QCB · Ci-Net · Benefit'], ['Freehold access', 'All UAE freehold zones'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'Pegged currencies, minimal haircut', p: 'Because SAR, QAR, BHD and OMR are pegged to the dollar, most banks apply little or no FX haircut to GCC income—unlike the 15–20% applied to GBP, EUR or INR.' },
      { h: 'Documents banks ask for', p: 'Salaried: salary certificate plus six months of statements (GOSI certificate for Saudi applicants). Self-employed: commercial registration, establishment card and two years of audited accounts.' },
    ],
    faqs: [{ q: 'Can GCC nationals buy outside freehold areas?', a: 'GCC citizens enjoy wider ownership rights than other foreigners in several emirates; we confirm title eligibility with DLD or ADREC before the bank instructs valuation.' }],
    calc: 'mortgage-calculator',
  },
  {
    slug: 'non-resident-dubai', name: 'Non-Resident Mortgages', ar: 'تمويل غير المقيمين', core: true,
    title: `Non-Resident Dubai Mortgages: ${LENDER.nonResidentLtv.min}–${LENDER.nonResidentLtv.max}% LTV, Set by Each Bank`,
    badge: `${LENDER.nonResidentLtv.min}–${LENDER.nonResidentLtv.max}% LTV · bank policy`, cta: 'Check non-resident LTV',
    card: 'Explore UAE mortgage options using overseas salary or business income.',
    capsule: 'Non-residents can get a Dubai mortgage without an Emirates ID across 14 UAE banks. HSBC, Emirates NBD, FAB, ADCB, Standard Chartered and DIB lend up to 60% LTV; Mashreq, CBD and Amlak lend up to 65%. Closing can be fully remote in 3–5 weeks via a 15-minute Dubai Courts video Power of Attorney.',
    facts: [['Typical LTV (bank policy)', `${LENDER.nonResidentLtv.min}–${LENDER.nonResidentLtv.max}%`], ['Active lenders', '14 banks'], ['Max tenure', `${REG.tenorMax} years`], ['FX haircut', '0–20% by currency'], ['Remote closing', 'Confirm lender & notary requirements'], ['Timeline', '3–5 weeks']],
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
    capsule: `Self-employed borrowers in the UAE need a trade licence held for at least two years, two years of audited financials and 6–12 months of corporate statements. Banks such as RAKBANK, Mashreq, CBD, Emirates NBD, DIB and FAB can underwrite corporate net profit plus depreciation and director drawings within the CBUAE first-home cap of ${REG.ltv.expat.first}% for expatriates.`,
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
      { h: 'When a switch pays', p: 'As a rule of thumb, a 0.50% rate cut on a balance above AED 1M recovers the capped exit fee (1% or AED 10,000) in under a year. Our calculator includes the old bank’s penalty, new mortgage registration (0.25% + AED 290) and any clawback exposure.' },
      { h: 'The liability letter sequence', p: 'Your new bank issues an FOL, your current bank issues a liability letter (valid ~15 days), the new bank pays off the old loan by manager’s cheque, and DLD re-registers the mortgage—usually 3–4 weeks.' },
    ],
    faqs: [{ q: 'Can I take cash out when I switch?', a: 'Yes—combine the buyout with equity release up to 80% of the new valuation for residents (subject to DBR).' }],
    calc: 'buyout-refinance-savings',
  },
  {
    slug: 'equity-release', name: 'Equity Release & Cash-Out', ar: 'تحرير حقوق الملكية', core: true,
    title: `Equity Release & Cash-Out Refinancing: Borrow Against a Home You Own`,
    badge: 'Property-backed borrowing', cta: 'Calculate unlocked equity',
    card: 'Explore borrowing against property you own, subject to a new affordability review.',
    capsule: `Equity release lets owners borrow against today's value of a home they own. The CBUAE caps still apply: ${REG.ltv.expat.first}% for an expatriate's first home and ${REG.ltv.national.first}% for a UAE National's (up to AED 5M), and ${REG.ltv.expat.subsequent}% / ${REG.ltv.national.subsequent}% on investment property. Banks check how the money will be used, and the new repayment must fit within the ${REG.dbrMax}% debt burden limit.`,
    facts: [['Max LTV (expat first home)', `${REG.ltv.expat.first}%`], ['Max LTV (investment)', `${REG.ltv.expat.subsequent}% expat · ${REG.ltv.national.subsequent}% National`], ['Valuation basis', 'Current RERA valuation'], ['Tenure', 'Up to 25 years'], ['Typical timeline', '2–3 weeks'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'Using equity to buy the next property', p: 'Many investors release equity from a paid-off apartment to fund the down payment and fees on an off-plan or second ready unit. Banks treat the released cash as own funds, unlike a personal loan.' },
      { h: 'Protect the family while you leverage', p: 'Assigning an external life policy (instead of the bank’s) saves roughly half the premium, and a DIFC single-property Will stops the asset freezing if a joint owner dies.' },
    ],
    faqs: [{ q: 'Is there a minimum release amount?', a: 'Most banks require a loan of at least AED 500,000.' }],
    calc: 'handover-equity-release',
  },
  {
    slug: 'second-home-investment', name: 'Investment & Second Homes', ar: 'تمويل المنزل الثاني والاستثمار',
    title: `Investment & Second Property Mortgages: ${REG.ltv.expat.subsequent}% / ${REG.ltv.national.subsequent}% LTV and Using Rent to Support Affordability`,
    badge: `${REG.ltv.expat.subsequent}–${REG.ltv.national.subsequent}% LTV`, cta: 'Model rental coverage',
    card: 'Plan a second-home purchase with rental assumptions and a suitable deposit.',
    capsule: `CBUAE caps a second or later home at ${REG.ltv.expat.subsequent}% LTV for expatriates and ${REG.ltv.national.subsequent}% for UAE Nationals, whatever its value. Many banks count part of the registered Ejari rent as income, which can help the new repayment fit within the ${REG.dbrMax}% debt burden limit.`,
    facts: [['Max LTV', `${REG.ltv.expat.subsequent}% expat · ${REG.ltv.national.subsequent}% National`], ['Rent counted', 'Bank-specific share of Ejari'], ['Proof of rent', 'Ejari + 6 months credits'], ['Short-let income', 'Some banks, with DTCM permit'], ['Tenure', 'Up to 25 years'], ['Fees', 'Confirm in writing']],
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
    title: `Under-Construction Off-Plan Mortgages: Lending During Construction and at Handover`,
    badge: 'Emaar · Meraas · Sobha', cta: 'Check my project’s APL',
    card: 'Plan your developer balance and confirm project eligibility before handover.',
    capsule: `Most banks lend no more than ${LENDER.offPlanLtv}% on a property still under construction. Close to handover they can treat it as a ready home, so the CBUAE first-home caps apply (${REG.ltv.expat.first}% for expatriates, ${REG.ltv.national.first}% for UAE Nationals up to AED 5M), but only if the project is on that bank's Approved Project List.`,
    facts: [['Under-construction LTV', '50% max'], ['Handover LTV', '80% resident · 85% National'], ['DLD fee at handover', 'None (Oqood paid)'], ['Handover fees', '0.25% + AED 290, AED 4,200, AED 580, AED 3,150'], ['Projects mapped', '80 handover pages'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'The APL is everything', p: 'Each bank keeps an approved list by developer and tower. A missing tower means no loan from that bank, so we check APL coverage before your developer’s handover notice arrives.' },
      { h: 'Valuation uplift cash-out', p: `Banks lending on fresh handover valuation can fund more than the developer balance. Bought at AED 2.0M on 80/20, now valued at AED 2.8M? At ${REG.ltv.expat.first}% LTV that is AED 2.24M—AED 400k to the developer, the rest released as cash.` },
    ],
    faqs: [{ q: 'Can I get a mortgage before 50% is paid?', a: `Yes, but fewer banks offer it and most lend no more than ${LENDER.offPlanLtv}% during construction; many buyers wait for handover financing.` }],
    calc: 'handover-equity-release',
  },
  {
    slug: 'mega-loans-luxury-villas', name: 'HNW Mega Loans', ar: 'تمويل الفلل الفاخرة',
    title: 'HNW Mega Mortgages & Trophy Asset Financing: AED 15M to AED 100M+ in Emirates Hills & Palm Jumeirah',
    badge: 'AED 15M–100M+', cta: 'Speak to the private desk',
    card: 'Prepare a tailored finance assessment for a high-value property.',
    capsule: `Mega mortgages above AED 15M in the UAE are typically structured by private-banking arms of FAB, HSBC, Emirates NBD and Standard Chartered. CBUAE caps first homes above AED 5M at ${REG.ltv.expat.firstAbove}% for expatriates and ${REG.ltv.national.firstAbove}% for UAE Nationals; pricing is negotiated on relationship assets, and global wealth or rental income can substitute for salary.`,
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
    facts: [['Properties', '2–10'], ['Max LTV (investment)', `${REG.ltv.expat.subsequent}% expat · ${REG.ltv.national.subsequent}% National`], ['Exit cap per loan', '1% or AED 10,000'], ['Rent assessment', 'Portfolio-level'], ['Benefit', 'One rate, one revert date'], ['Fees', 'Confirm in writing']],
    sections: [
      { h: 'Why consolidate', p: 'Landlords with loans at four banks face four revert dates and four floor rates. One facility simplifies cash flow and strengthens your negotiating position at renewal.' },
      { h: 'Exit-cost math', p: 'Each existing loan carries its own capped exit penalty; we only recommend moving loans where the rate gain clears the penalty within 12 months.' },
    ],
    faqs: [{ q: 'Do all properties need to be in one emirate?', a: 'No. National banks lend across emirates, though valuation is instructed separately for each title.' }],
    calc: 'buyout-refinance-savings',
  },
];

export const productBy = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
