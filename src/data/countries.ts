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
    'UK buyers are the largest Western non-resident cohort in Dubai; HSBC’s international relationship route can price below standard non-resident tiers.'),
  c('india', 'India (NRI & Resident)', 'Indian', '65%', 'INR · 20%', 'Form 16 + ITR acknowledgements (2 years)', '2 years ITR + CA-audited P&L with UDIN', 'TransUnion CIBIL (≥ 700)', 'Bank of Baroda, Mashreq, CBD, Emirates NBD',
    'Bank of Baroda UAE underwrites Indian ITR income natively; LRS remittance limits (USD 250,000 per person per year) shape how the down payment is funded.'),
  c('saudi-arabia', 'Saudi Arabia', 'Saudi', 'Up to 65% (bank policy)', 'SAR · 0%', 'GOSI certificate + employer letter', 'Ministry of Commerce CR + SOCPA-audited accounts', 'SIMAH', 'Emirates NBD, FAB, ADIB, DIB, Mashreq',
    'Pegged SAR income carries no haircut, and GCC citizenship opens ownership rights beyond standard freehold zones.'),
  c('canada', 'Canada', 'Canadian', '65%', 'CAD · 15%', 'CRA Notice of Assessment + T4 + 6 months pay stubs', 'T2 corporate return + CPA financials', 'Equifax / TransUnion Canada', 'Mashreq, CBD, HSBC, Standard Chartered',
    'Canadian applicants should request NOAs for two years from CRA My Account before applying.'),
  c('germany', 'Germany & Austria', 'German', '65%', 'EUR · 15%', 'Lohnsteuerbescheinigung + Steuerbescheid', 'Handelsregisterauszug + 2 years Bilanz', 'SCHUFA Holding AG', 'Mashreq, CBD, Emirates NBD, HSBC',
    'A SCHUFA self-disclosure (Datenkopie) is free and accepted by most UAE lenders.'),
  c('france', 'France & Belgium', 'French', '65%', 'EUR · 15%', 'Avis d’Imposition + 6 bulletins de salaire', 'Extrait Kbis + 2 years certified bilans', 'Banque de France (FICP)', 'Mashreq, CBD, HSBC, Standard Chartered',
    'French tax notices are issued annually in the summer; banks want the latest one.'),
  c('usa', 'United States', 'American', '65%', 'USD · 0%', 'IRS W-2 + Form 1040 (2 years)', 'IRS Form 1120 / K-1 + CPA audits', 'Experian / Equifax / TransUnion', 'Mashreq, CBD, HSBC, Citi',
    'USD income carries no FX haircut; FATCA forms are required at account opening.'),
  c('singapore', 'Singapore', 'Singaporean', '65%', 'SGD · 10%', 'IRAS Notice of Assessment + CPF history', 'ACRA BizFile + 2 years audited accounts', 'Credit Bureau Singapore', 'HSBC, Standard Chartered, Mashreq, CBD',
    'Standard Chartered and HSBC can leverage existing Singapore relationships.'),
  c('hong-kong', 'Hong Kong', 'Hong Kong', '65%', 'HKD · 0%', 'IRD Salaries Tax return (IRC6401)', 'Business Registration + 2 years CPA audits', 'TransUnion Hong Kong', 'HSBC, Standard Chartered, Mashreq',
    'HKD is pegged to USD, so most banks apply no haircut.'),
  c('australia', 'Australia', 'Australian', '65%', 'AUD · 15%', 'ATO Notice of Assessment', 'ASIC extract + 2 years CA financials', 'Equifax AU / Illion', 'Mashreq, CBD, HSBC',
    'ATO notices can be downloaded from myGov; banks want the two most recent years.'),
  c('switzerland', 'Switzerland', 'Swiss', '65%', 'CHF · 10%', 'Lohnausweis + tax assessment', 'ZEFIX extract + 2 years audited accounts', 'ZEK / CRIF Switzerland', 'HSBC, Mashreq, CBD',
    'CHF income receives one of the lightest haircuts among non-pegged currencies.'),
  c('netherlands', 'Netherlands', 'Dutch', '65%', 'EUR · 15%', 'Aanslag Inkomstenbelasting + Jaaropgaaf', 'KVK uittreksel + 2 years jaarrekening', 'Stichting BKR', 'Mashreq, CBD, HSBC',
    'A BKR overview is free to download and accepted as the bureau report.'),
  c('qatar-kuwait', 'Qatar, Kuwait & Bahrain', 'GCC', 'Up to 65% (bank policy)', 'GCC · 0–5%', 'Salary certificate + 6 months statements', 'CR + establishment card + 2 years audits', 'QCB / Ci-Net / Benefit', 'Emirates NBD, FAB, DIB, ADIB, Mashreq',
    'GCC currencies are pegged, keeping haircuts minimal.'),
  c('italy-spain', 'Italy & Spain', 'Italian and Spanish', '65%', 'EUR · 15%', 'Modello 730 (IT) / IRPF (ES)', 'Visura Camerale / Nota Simple + audits', 'CRIF (IT) / CIRBE (ES)', 'Mashreq, CBD',
    'Southern-European applicants are underwritten mainly by Mashreq and CBD.'),
  c('cis-kazakhstan', 'Kazakhstan & CIS', 'Kazakh and CIS', '55–60%', 'USD/KZT · 20%', 'Translated employment contract + tax certificate', 'Charter + 2 years IFRS audited accounts', 'First Credit Bureau (FCB)', 'Mashreq, Amlak',
    'Documents need certified translation and legalisation; LTVs are lower than for OECD applicants.'),
  c('china', 'Mainland China', 'Chinese', '50–60%', 'CNY · 20%', 'Individual Income Tax (IIT) app record + employer letter', 'Business licence + 2 years CPA audits', 'PBOC Credit Reference Center', 'HSBC, Standard Chartered, Mashreq',
    'Capital-control limits (USD 50,000 per person per year) make the down-payment funding plan the critical path.'),
  c('turkey', 'Turkey', 'Turkish', '50–60%', 'TRY · 25%', 'SGK service statement + e-Devlet income record', 'Tax plate (Vergi Levhası) + 2 years financials', 'KKB / Findeks', 'Mashreq, CBD, Amlak',
    'High TRY volatility drives the steepest haircut on the panel; USD or EUR income streams help.'),
  c('egypt', 'Egypt', 'Egyptian', '50–60%', 'EGP · 25%', 'Employer letter + insurance print (Form 111)', 'Commercial register + tax card + audits', 'I-Score', 'Mashreq, Arab Bank, Amlak',
    'Most approvals rely on USD or AED-denominated income or assets.'),
  c('pakistan', 'Pakistan', 'Pakistani', '50–60%', 'PKR · 25%', 'FBR tax return + salary certificate', 'NTN + 2 years audited accounts', 'eCIB / Tasdeeq', 'Mashreq, CBD, Amlak',
    'FBR active-taxpayer status is checked; foreign-currency accounts simplify proof of funds.'),
  c('lebanon-and-jordan', 'Lebanon & Jordan', 'Lebanese and Jordanian', '55–60%', 'USD/JOD · 0–10%', 'Employer letter + 6 months statements', 'Commercial register + 2 years audits', 'CRIF Jordan', 'Arab Bank, Mashreq, CBD',
    'Arab Bank’s Levant network makes it the natural first submission.'),
  c('south-africa', 'South Africa', 'South African', '60%', 'ZAR · 20%', 'IRP5 + ITA34 assessment', 'CIPC registration + 2 years financials', 'TransUnion / Experian SA', 'Mashreq, CBD, Standard Chartered',
    'SARB offshore allowance rules apply to the down payment.'),
  c('nigeria-and-kenya', 'Nigeria & Kenya', 'Nigerian and Kenyan', '50%', 'NGN/KES · 25%', 'Employer letter + tax clearance certificate', 'CAC / BRS registration + 2 years audits', 'CRC / Metropol', 'Mashreq, Amlak',
    'Lenders favour USD-paid roles at multinationals; local-currency income is heavily discounted.'),
  c('sweden-norway-denmark', 'Sweden, Norway & Denmark', 'Nordic', '65%', 'SEK/NOK/DKK · 15%', 'Annual tax assessment + 6 payslips', 'Company registry extract + 2 years annual reports', 'UC / Experian / Bisnode', 'Mashreq, CBD, HSBC',
    'Nordic tax data is digital and verifiable, making files fast to underwrite.'),
  c('poland-and-central-europe', 'Poland & Central Europe', 'Central European', '60%', 'PLN/CZK · 20%', 'PIT-37 / PIT-11 + payslips', 'CEIDG / KRS extract + 2 years financials', 'BIK', 'Mashreq, CBD',
    'Euro or USD contracts improve terms against local-currency income.'),
  c('brazil-and-latin-america', 'Brazil & Latin America', 'Brazilian and Latin American', '50–60%', 'BRL/MXN · 25%', 'IRPF declaration + payslips', 'CNPJ + 2 years audited accounts', 'Serasa Experian', 'Mashreq, Amlak',
    'Volatile currencies attract larger haircuts; offshore USD income materially improves eligibility.'),
];
