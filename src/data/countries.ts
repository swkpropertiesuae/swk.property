// Silo 07 — Non-resident country matrix (/mortgages/non-resident-[slug]).
// Rows 1–15 from Market Bible Module 13.3. Rows 16–25 are indicative desk guidance — confirm with lenders.
export type Country = {
  slug: string;
  name: string;
  demonym: string;
  ltv: string;
  fx: string;
  salaried: string;
  selfEmp: string;
  bureau: string;
  banks: string;
  note: string;
};

const c = (slug: string, name: string, demonym: string, ltv: string, fx: string, salaried: string, selfEmp: string, bureau: string, banks: string, note: string): Country =>
  ({ slug, name, demonym, ltv, fx, salaried, selfEmp, bureau, banks, note });

export const COUNTRIES: Country[] = [
  c('uk', 'United Kingdom', 'British', '65%', 'GBP · 15%', 'HMRC P60 + 6 months payslips', 'SA302 + Tax Year Overview + Companies House filings', 'Experian / Equifax / TransUnion', 'Mashreq, CBD, HSBC, Emirates NBD, Standard Chartered',
    'British owners make up one of the biggest overseas buyer groups in Dubai. Existing HSBC customers may be offered better pricing through the bank’s international banking route than its standard non-resident grid.'),
  c('india', 'India (NRI & Resident)', 'Indian', '65%', 'INR · 20%', 'Form 16 + ITR acknowledgements (2 years)', '2 years ITR + CA-audited P&L with UDIN', 'TransUnion CIBIL (≥ 700)', 'Bank of Baroda, Mashreq, CBD, Emirates NBD',
    'Bank of Baroda’s UAE branches are used to assessing Indian tax returns. Under the Liberalised Remittance Scheme each person can send about USD 250,000 a year, so plan how the deposit will leave India early.'),
  c('saudi-arabia', 'Saudi Arabia', 'Saudi', 'Up to 65% (bank policy)', 'SAR · 0%', 'GOSI certificate + employer letter', 'Ministry of Commerce CR + SOCPA-audited accounts', 'SIMAH', 'Emirates NBD, FAB, ADIB, DIB, Mashreq',
    'Because the riyal is tied to the dollar, Saudi income is usually converted without a discount, and Gulf citizenship can widen where you are allowed to own.'),
  c('canada', 'Canada', 'Canadian', '65%', 'CAD · 15%', 'CRA Notice of Assessment + T4 + 6 months pay stubs', 'T2 corporate return + CPA financials', 'Equifax / TransUnion Canada', 'Mashreq, CBD, HSBC, Standard Chartered',
    'Download your last two Notices of Assessment from CRA My Account before you start; most lenders ask for them first.'),
  c('germany', 'Germany & Austria', 'German', '65%', 'EUR · 15%', 'Lohnsteuerbescheinigung + Steuerbescheid', 'Handelsregisterauszug + 2 years Bilanz', 'SCHUFA Holding AG', 'Mashreq, CBD, Emirates NBD, HSBC',
    'You can request a free SCHUFA Datenkopie yourself, and most UAE banks accept it as the credit report.'),
  c('france', 'France & Belgium', 'French', '65%', 'EUR · 15%', 'Avis d’Imposition + 6 bulletins de salaire', 'Extrait Kbis + 2 years certified bilans', 'Banque de France (FICP)', 'Mashreq, CBD, HSBC, Standard Chartered',
    'The avis d’imposition is published once a year, in summer. Lenders will ask for the most recent one.'),
  c('usa', 'United States', 'American', '65%', 'USD · 0%', 'IRS W-2 + Form 1040 (2 years)', 'IRS Form 1120 / K-1 + CPA audits', 'Experian / Equifax / TransUnion', 'Mashreq, CBD, HSBC, Citi',
    'Dollar income needs no currency discount because the dirham is pegged to it. Expect FATCA paperwork when the UAE account is opened.'),
  c('singapore', 'Singapore', 'Singaporean', '65%', 'SGD · 10%', 'IRAS Notice of Assessment + CPF history', 'ACRA BizFile + 2 years audited accounts', 'Credit Bureau Singapore', 'HSBC, Standard Chartered, Mashreq, CBD',
    'If you already bank with Standard Chartered or HSBC in Singapore, that history can help the UAE application.'),
  c('hong-kong', 'Hong Kong', 'Hong Kong', '65%', 'HKD · 0%', 'IRD Salaries Tax return (IRC6401)', 'Business Registration + 2 years CPA audits', 'TransUnion Hong Kong', 'HSBC, Standard Chartered, Mashreq',
    'The Hong Kong dollar is linked to the US dollar, so lenders rarely discount it.'),
  c('australia', 'Australia', 'Australian', '65%', 'AUD · 15%', 'ATO Notice of Assessment', 'ASIC extract + 2 years CA financials', 'Equifax AU / Illion', 'Mashreq, CBD, HSBC',
    'Your ATO assessments are available through myGov. Have the latest two years ready.'),
  c('switzerland', 'Switzerland', 'Swiss', '65%', 'CHF · 10%', 'Lohnausweis + tax assessment', 'ZEFIX extract + 2 years audited accounts', 'ZEK / CRIF Switzerland', 'HSBC, Mashreq, CBD',
    'The franc is a floating currency, but lenders usually discount it less than most others.'),
  c('netherlands', 'Netherlands', 'Dutch', '65%', 'EUR · 15%', 'Aanslag Inkomstenbelasting + Jaaropgaaf', 'KVK uittreksel + 2 years jaarrekening', 'Stichting BKR', 'Mashreq, CBD, HSBC',
    'A BKR summary costs nothing to download and is generally accepted as your credit report.'),
  c('qatar-kuwait', 'Qatar, Kuwait & Bahrain', 'GCC', 'Up to 65% (bank policy)', 'GCC · 0–5%', 'Salary certificate + 6 months statements', 'CR + establishment card + 2 years audits', 'QCB / Ci-Net / Benefit', 'Emirates NBD, FAB, DIB, ADIB, Mashreq',
    'Gulf currencies are dollar-linked, so little or no conversion discount is applied.'),
  c('italy-spain', 'Italy & Spain', 'Italian and Spanish', '65%', 'EUR · 15%', 'Modello 730 (IT) / IRPF (ES)', 'Visura Camerale / Nota Simple + audits', 'CRIF (IT) / CIRBE (ES)', 'Mashreq, CBD',
    'Applicants from southern Europe are most often approved by Mashreq and CBD.'),
  c('cis-kazakhstan', 'Kazakhstan & CIS', 'Kazakh and CIS', '55–60%', 'USD/KZT · 20%', 'Translated employment contract + tax certificate', 'Charter + 2 years IFRS audited accounts', 'First Credit Bureau (FCB)', 'Mashreq, Amlak',
    'Expect to have documents translated, certified and legalised, and to be offered a smaller loan relative to value than applicants from OECD countries.'),
  c('china', 'Mainland China', 'Chinese', '50–60%', 'CNY · 20%', 'Individual Income Tax (IIT) app record + employer letter', 'Business licence + 2 years CPA audits', 'PBOC Credit Reference Center', 'HSBC, Standard Chartered, Mashreq',
    'Annual transfer limits of about USD 50,000 per person mean the deposit often has to be moved over time, so arrange it first.'),
  c('turkey', 'Turkey', 'Turkish', '50–60%', 'TRY · 25%', 'SGK service statement + e-Devlet income record', 'Tax plate (Vergi Levhası) + 2 years financials', 'KKB / Findeks', 'Mashreq, CBD, Amlak',
    'Lira income swings a lot, so banks discount it heavily. Earnings in dollars or euros make the case far easier.'),
  c('egypt', 'Egypt', 'Egyptian', '50–60%', 'EGP · 25%', 'Employer letter + insurance print (Form 111)', 'Commercial register + tax card + audits', 'I-Score', 'Mashreq, Arab Bank, Amlak',
    'Approvals usually rest on income or savings held in dollars or dirhams rather than local currency.'),
  c('pakistan', 'Pakistan', 'Pakistani', '50–60%', 'PKR · 25%', 'FBR tax return + salary certificate', 'NTN + 2 years audited accounts', 'eCIB / Tasdeeq', 'Mashreq, CBD, Amlak',
    'Lenders check that you are on the FBR active taxpayer list. Holding the deposit in a foreign-currency account makes the source of funds easier to show.'),
  c('lebanon-and-jordan', 'Lebanon & Jordan', 'Lebanese and Jordanian', '55–60%', 'USD/JOD · 0–10%', 'Employer letter + 6 months statements', 'Commercial register + 2 years audits', 'CRIF Jordan', 'Arab Bank, Mashreq, CBD',
    'With branches across the Levant, Arab Bank is usually the first lender to approach.'),
  c('south-africa', 'South Africa', 'South African', '60%', 'ZAR · 20%', 'IRP5 + ITA34 assessment', 'CIPC registration + 2 years financials', 'TransUnion / Experian SA', 'Mashreq, CBD, Standard Chartered',
    'The deposit has to be sent within South Africa’s offshore allowance rules, so check your remaining allowance.'),
  c('nigeria-and-kenya', 'Nigeria & Kenya', 'Nigerian and Kenyan', '50%', 'NGN/KES · 25%', 'Employer letter + tax clearance certificate', 'CAC / BRS registration + 2 years audits', 'CRC / Metropol', 'Mashreq, Amlak',
    'A dollar salary from an international employer is viewed far more favourably than local-currency pay, which is discounted steeply.'),
  c('sweden-norway-denmark', 'Sweden, Norway & Denmark', 'Nordic', '65%', 'SEK/NOK/DKK · 15%', 'Annual tax assessment + 6 payslips', 'Company registry extract + 2 years annual reports', 'UC / Experian / Bisnode', 'Mashreq, CBD, HSBC',
    'Nordic tax records are online and easy for a bank to verify, which tends to speed up approval.'),
  c('poland-and-central-europe', 'Poland & Central Europe', 'Central European', '60%', 'PLN/CZK · 20%', 'PIT-37 / PIT-11 + payslips', 'CEIDG / KRS extract + 2 years financials', 'BIK', 'Mashreq, CBD',
    'An employment contract paid in euros or dollars generally earns better terms than local-currency pay.'),
  c('brazil-and-latin-america', 'Brazil & Latin America', 'Brazilian and Latin American', '50–60%', 'BRL/MXN · 25%', 'IRPF declaration + payslips', 'CNPJ + 2 years audited accounts', 'Serasa Experian', 'Mashreq, Amlak',
    'Volatile currencies are discounted more heavily, and income paid in dollars outside the country can make a big difference.'),
];
