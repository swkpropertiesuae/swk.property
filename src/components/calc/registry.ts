// Declarative calculator definitions: inputs + pure compute. One renderer (Calculator.tsx) draws all of them in EN or AR.
import * as M from '@/lib/math';
import { REG } from '@/data/regulation';
import { BANKS } from '@/data/banks';
import { BENCH } from '@/data/site';

export type L = { en: string; ar: string };
export type Input = { k: string; label: L; def: number; min: number; max: number; step: number; unit: 'AED' | '%' | 'yrs' | '' ; options?: { v: number; label: L }[] };
export type Row = { label: L; v: number | string; f?: 'aed' | 'pct' | 'mo' | 'raw' | 'yrs'; strong?: boolean };
export type Out = { hero: Row; rows: Row[]; bars?: { label: string; v: number; hl?: boolean }[]; text?: string; note?: L };
export type CalcDef = { inputs: Input[]; compute: (v: Record<string, number>) => Out };

const l = (en: string, ar: string): L => ({ en, ar });
const price = (def = 2_000_000): Input => ({ k: 'price', label: l('Property price', 'سعر العقار'), def, min: 300_000, max: 30_000_000, step: 50_000, unit: 'AED' });
const rate = (def = 3.99): Input => ({ k: 'rate', label: l('Interest rate', 'معدل الفائدة'), def, min: 2, max: 9, step: 0.01, unit: '%' });
const years = (def = 25): Input => ({ k: 'years', label: l('Tenure', 'المدة'), def, min: 5, max: 25, step: 1, unit: 'yrs' });
const yesNo = (k: string, label: L, def: number): Input => ({ k, label, def, min: 0, max: 1, step: 1, unit: '', options: [{ v: 1, label: l('Yes', 'نعم') }, { v: 0, label: l('No', 'لا') }] });

export const CALCS: Record<string, CalcDef> = {
  'mortgage-calculator': {
    inputs: [price(), { k: 'down', label: l('Down payment', 'الدفعة الأولى'), def: 20, min: 15, max: 80, step: 1, unit: '%' }, rate(), years(), yesNo('agency', l('Agency commission (2%)', 'عمولة الوسيط (2%)'), 1)],
    compute: (v) => {
      const c = M.cashToClose({ price: v.price, downPct: v.down, agency: !!v.agency });
      const e = M.emi(c.loan, v.rate, v.years);
      return {
        hero: { label: l('Monthly payment', 'القسط الشهري'), v: e, f: 'mo' },
        rows: [
          { label: l('Loan amount', 'مبلغ التمويل'), v: c.loan, f: 'aed' },
          { label: l('Down payment', 'الدفعة الأولى'), v: c.down, f: 'aed' },
          { label: l('DLD 4% + AED 580 title deed', 'رسوم دائرة الأراضي 4% + 580'), v: c.dld, f: 'aed' },
          { label: l('Mortgage registration 0.25% + AED 290', 'تسجيل الرهن 0.25% + 290'), v: c.mortgageReg, f: 'aed' },
          { label: l('Trustee fee (incl. VAT)', 'رسوم أمين التسجيل'), v: c.trustee, f: 'aed' },
          { label: l('Valuation (incl. VAT)', 'رسوم التقييم'), v: c.valuation, f: 'aed' },
          { label: l('Agency 2% + VAT', 'عمولة الوسيط'), v: c.agencyFee, f: 'aed' },
          { label: l('Total cash to close', 'إجمالي النقد المطلوب'), v: c.total, f: 'aed', strong: true },
          { label: l('Total interest over term', 'إجمالي الفائدة'), v: e * v.years * 12 - c.loan, f: 'aed' },
        ],
      };
    },
  },
  'dbr-borrowing-power': {
    inputs: [
      { k: 'salary', label: l('Gross monthly salary', 'الراتب الشهري الإجمالي'), def: 35_000, min: 10_000, max: 300_000, step: 1000, unit: 'AED' },
      { k: 'emis', label: l('Existing loan EMIs / month', 'أقساط القروض الحالية'), def: 2_000, min: 0, max: 100_000, step: 500, unit: 'AED' },
      { k: 'cards', label: l('Total credit card limits', 'إجمالي حدود البطاقات'), def: 80_000, min: 0, max: 1_000_000, step: 5000, unit: 'AED' },
      years(),
      { k: 'cc', label: l('Bank card policy', 'سياسة البنك للبطاقات'), def: 5, min: 3, max: 5, step: 2, unit: '', options: [{ v: 5, label: l('5% banks', 'بنوك 5%') }, { v: 3, label: l('3% banks (HSBC, ADCB, DIB)', 'بنوك 3%') }] },
    ],
    compute: (v) => {
      const r = M.borrowingPower({ salary: v.salary, existingEmis: v.emis, cardLimits: v.cards, ccFactor: v.cc as 3 | 5, years: v.years });
      const noCards = M.borrowingPower({ salary: v.salary, existingEmis: v.emis, cardLimits: 0, ccFactor: 5, years: v.years });
      return {
        hero: { label: l('Maximum loan', 'الحد الأقصى للتمويل'), v: r.maxLoan, f: 'aed' },
        rows: [
          { label: l('50% DBR capacity / month', 'سعة عبء الدين 50%'), v: r.capacity, f: 'aed' },
          { label: l('Credit card hit / month', 'خصم البطاقات الائتمانية'), v: r.cardHit, f: 'aed' },
          { label: l('Available for mortgage EMI', 'المتاح لقسط التمويل'), v: r.available, f: 'aed' },
          { label: l(`Max property at ${REG.ltv.expat.first}% LTV (expat first home)`, `أقصى سعر عقار بنسبة ${REG.ltv.expat.first}%`), v: r.maxLoan / (REG.ltv.expat.first / 100), f: 'aed', strong: true },
          { label: l('Extra loan if cards closed', 'تمويل إضافي عند إغلاق البطاقات'), v: Math.max(0, noCards.maxLoan - r.maxLoan), f: 'aed' },
        ],
        note: l('Stress rate 6.5% · capped at 7× annual income. Banks vary.', 'معدل اختبار 6.5% · بحد أقصى 7 أضعاف الدخل السنوي.'),
      };
    },
  },
  'fixed-to-revert-analyzer': {
    inputs: [{ k: 'loan', label: l('Loan amount', 'مبلغ التمويل'), def: 1_500_000, min: 300_000, max: 20_000_000, step: 50_000, unit: 'AED' }, years(), { k: 'eibor', label: l('3M EIBOR assumption', '3 أشهر إيبور'), def: +BENCH.eibor3m.toFixed(2), min: 2, max: 7, step: 0.05, unit: '%' }],
    compute: (v) => {
      const res = BANKS.map((b) => {
        const fy = b.introTerm === '1Y' ? 1 : 2;
        const r = M.fixedThenRevert(v.loan, v.years, b.intro, fy, v.eibor, b.margin, b.floor, 5);
        return { b, cost: r.cost, rev: r.revertRate };
      }).sort((a, c) => a.cost - c.cost);
      const best = res[0], worst = res[res.length - 1];
      return {
        hero: { label: l(`Lowest 5-year cost: ${best.b.short}`, `أقل تكلفة 5 سنوات: ${best.b.short}`), v: best.cost, f: 'aed' },
        rows: [
          { label: l('Highest 5-year cost', 'أعلى تكلفة'), v: `${worst.b.short} · AED ${Math.round(worst.cost).toLocaleString('en-US')}`, f: 'raw' },
          { label: l('Spread best vs worst', 'الفرق بين الأفضل والأسوأ'), v: worst.cost - best.cost, f: 'aed', strong: true },
          { label: l(`${best.b.short} revert rate`, 'معدل العودة'), v: best.rev, f: 'pct' },
        ],
        bars: res.slice(0, 10).map((x, i) => ({ label: x.b.short, v: x.cost, hl: i === 0 })),
      };
    },
  },
  'buyout-refinance-savings': {
    inputs: [
      { k: 'balance', label: l('Outstanding balance', 'الرصيد المتبقي'), def: 1_500_000, min: 200_000, max: 20_000_000, step: 50_000, unit: 'AED' },
      { k: 'current', label: l('Current rate', 'المعدل الحالي'), def: 6.2, min: 2, max: 9, step: 0.01, unit: '%' },
      { k: 'next', label: l('New rate', 'المعدل الجديد'), def: 3.99, min: 2, max: 9, step: 0.01, unit: '%' },
      { k: 'left', label: l('Years remaining', 'السنوات المتبقية'), def: 20, min: 3, max: 25, step: 1, unit: 'yrs' },
    ],
    compute: (v) => {
      const r = M.buyoutSavings({ balance: v.balance, currentRate: v.current, newRate: v.next, yearsLeft: v.left });
      return {
        hero: { label: l('Net saving over 36 months', 'صافي التوفير خلال 36 شهراً'), v: r.net, f: 'aed' },
        rows: [
          { label: l('Current EMI', 'القسط الحالي'), v: r.oldEmi, f: 'mo' },
          { label: l('New EMI', 'القسط الجديد'), v: r.newEmi, f: 'mo' },
          { label: l('Monthly saving', 'التوفير الشهري'), v: r.monthly, f: 'mo', strong: true },
          { label: l('Switch cost (exit cap + re-registration)', 'تكلفة النقل'), v: r.switchCost, f: 'aed' },
          { label: l('Break-even', 'نقطة التعادل'), v: Number.isFinite(r.breakEvenMonths) ? `${r.breakEvenMonths} months` : '—', f: 'raw' },
        ],
      };
    },
  },
  'handover-equity-release': {
    inputs: [
      { k: 'purchase', label: l('Original purchase price', 'سعر الشراء الأصلي'), def: 2_000_000, min: 400_000, max: 30_000_000, step: 50_000, unit: 'AED' },
      { k: 'bal', label: l('Payment plan', 'خطة الدفع'), def: 20, min: 20, max: 60, step: 10, unit: '', options: [{ v: 40, label: l('60/40', '60/40') }, { v: 30, label: l('70/30', '70/30') }, { v: 20, label: l('80/20', '80/20') }, { v: 50, label: l('50/50', '50/50') }] },
      { k: 'val', label: l('Handover valuation', 'تقييم التسليم'), def: 2_800_000, min: 400_000, max: 40_000_000, step: 50_000, unit: 'AED' },
      { k: 'ltv', label: l('Max LTV', 'نسبة التمويل'), def: 80, min: 50, max: 85, step: 5, unit: '%' },
    ],
    compute: (v) => {
      const r = M.handoverRelease(v.purchase, v.bal, v.val, v.ltv);
      return {
        hero: { label: l('Cash you could release', 'السيولة الممكن تحريرها'), v: r.cashOut, f: 'aed' },
        rows: [
          { label: l('Developer balance due', 'المستحق للمطور'), v: r.owed, f: 'aed' },
          { label: l('Maximum loan on valuation', 'الحد الأقصى للتمويل'), v: r.loanCap, f: 'aed', strong: true },
          { label: l('Valuation uplift', 'ارتفاع القيمة'), v: r.uplift, f: 'aed' },
          { label: l('Handover fees (no 4% DLD)', 'رسوم التسليم'), v: r.fees, f: 'aed' },
        ],
        note: l('Cash-out subject to bank policy and 50% DBR.', 'يخضع لسياسة البنك ونسبة عبء الدين 50%.'),
      };
    },
  },
  'golden-visa-mortgage-calculator': {
    inputs: [price(2_000_000), { k: 'deps', label: l('Family dependants', 'عدد المعالين'), def: 2, min: 0, max: 8, step: 1, unit: '' }, { k: 'down', label: l('Down payment', 'الدفعة الأولى'), def: 20, min: 20, max: 80, step: 1, unit: '%' }],
    compute: (v) => {
      const g = M.goldenVisa(v.price, v.deps);
      const c = M.cashToClose({ price: v.price, downPct: v.down });
      return {
        hero: { label: l(g.eligible ? 'Eligible — total visa fees from' : 'Below threshold by', g.eligible ? 'مؤهل — إجمالي الرسوم من' : 'أقل من الحد بمقدار'), v: g.eligible ? g.low : g.gap, f: 'aed' },
        rows: [
          { label: l('Visa fees range', 'نطاق رسوم التأشيرة'), v: `AED ${Math.round(g.low).toLocaleString('en-US')} – ${Math.round(g.high).toLocaleString('en-US')}`, f: 'raw' },
          { label: l('Cash to close the purchase', 'النقد المطلوب للشراء'), v: c.total, f: 'aed', strong: true },
          { label: l('Loan amount', 'مبلغ التمويل'), v: c.loan, f: 'aed' },
          { label: l('Paid-equity requirement', 'شرط حقوق الملكية'), v: 'None (Feb 2026)', f: 'raw' },
        ],
      };
    },
  },
  'non-resident-rental-coverage': {
    inputs: [price(1_800_000), { k: 'ltv', label: l('LTV', 'نسبة التمويل'), def: 60, min: 40, max: 65, step: 5, unit: '%' }, rate(4.49), years(), { k: 'yield', label: l('Gross rental yield', 'العائد الإيجاري'), def: 6.5, min: 3, max: 10, step: 0.1, unit: '%' }, { k: 'sc', label: l('Service charge / sq.ft.', 'رسوم الخدمة'), def: 18, min: 5, max: 40, step: 1, unit: 'AED' }, { k: 'psf', label: l('Price per sq.ft.', 'السعر للقدم المربعة'), def: 1700, min: 600, max: 5000, step: 50, unit: 'AED' }],
    compute: (v) => {
      const loan = v.price * (v.ltv / 100);
      const e = M.emi(loan, v.rate, v.years);
      const sqft = v.price / v.psf;
      const net = (v.price * (v.yield / 100) - sqft * v.sc) * 0.95 / 12;
      const c = M.cashToClose({ price: v.price, downPct: 100 - v.ltv });
      return {
        hero: { label: l('Rent covers EMI by', 'تغطية الإيجار للقسط'), v: `${((net / e) * 100).toFixed(0)}%`, f: 'raw' },
        rows: [
          { label: l('Monthly EMI', 'القسط الشهري'), v: e, f: 'mo' },
          { label: l('Net monthly rent', 'صافي الإيجار الشهري'), v: net, f: 'mo' },
          { label: l('Monthly cash flow', 'التدفق النقدي الشهري'), v: net - e, f: 'mo', strong: true },
          { label: l('Cash to close', 'النقد المطلوب'), v: c.total, f: 'aed' },
        ],
      };
    },
  },
  'rent-vs-buy-dubai': {
    inputs: [price(1_800_000), { k: 'rent', label: l('Current annual rent', 'الإيجار السنوي'), def: 110_000, min: 30_000, max: 1_000_000, step: 5000, unit: 'AED' }, rate(), { k: 'esc', label: l('Rent escalation / yr', 'زيادة الإيجار السنوية'), def: 5, min: 0, max: 15, step: 0.5, unit: '%' }, { k: 'app', label: l('Price growth / yr', 'نمو الأسعار السنوي'), def: 3, min: -3, max: 10, step: 0.5, unit: '%' }],
    compute: (v) => {
      const r = M.rentVsBuy(v.price, 20, v.rate, 25, v.rent, v.esc, v.app, 15);
      return {
        hero: { label: l('Buying wins from year', 'الشراء أفضل ابتداءً من السنة'), v: r.breakEven ? `Year ${r.breakEven}` : 'Not within 15 yrs', f: 'raw' },
        rows: [
          { label: l('Monthly EMI', 'القسط الشهري'), v: r.emi, f: 'mo' },
          { label: l('Monthly rent today', 'الإيجار الشهري الحالي'), v: v.rent / 12, f: 'mo' },
          { label: l('Upfront cash', 'النقد المقدم'), v: r.upfront, f: 'aed' },
          { label: l('Rent paid over 10 years', 'الإيجار خلال 10 سنوات'), v: r.rows[9].rentCum, f: 'aed', strong: true },
        ],
        bars: r.rows.filter((_, i) => i % 3 === 2).map((x) => ({ label: `Y${x.year}`, v: x.rentCum - x.ownNet, hl: x.ownNet <= x.rentCum })),
      };
    },
  },
  'overpayment-early-settlement': {
    inputs: [{ k: 'loan', label: l('Loan amount', 'مبلغ التمويل'), def: 1_500_000, min: 300_000, max: 20_000_000, step: 50_000, unit: 'AED' }, rate(4.25), years(), { k: 'lump', label: l('Annual lump sum', 'الدفعة السنوية'), def: 100_000, min: 0, max: 2_000_000, step: 10_000, unit: 'AED' }],
    compute: (v) => {
      const r = M.overpayment(v.loan, v.rate, v.years, v.lump);
      return {
        hero: { label: l('Interest saved', 'الفائدة الموفرة'), v: r.saved, f: 'aed' },
        rows: [
          { label: l('Monthly EMI', 'القسط الشهري'), v: r.emi, f: 'mo' },
          { label: l('Years saved', 'السنوات الموفرة'), v: r.yearsSaved, f: 'yrs', strong: true },
          { label: l('New payoff', 'مدة السداد الجديدة'), v: r.months / 12, f: 'yrs' },
          { label: l('Lump sum as % of loan', 'نسبة الدفعة'), v: (v.lump / v.loan) * 100, f: 'pct' },
        ],
        note: l('Most banks allow 10–25% free per year; above that the CBUAE cap applies.', 'تسمح معظم البنوك بسداد 10–25% سنوياً دون رسوم.'),
      };
    },
  },
  'form-f-clause-generator': {
    inputs: [
      { k: 'val', label: l('Minimum acceptable valuation', 'الحد الأدنى للتقييم'), def: 2_950_000, min: 300_000, max: 50_000_000, step: 10_000, unit: 'AED' },
      { k: 'ltv', label: l('Loan as % of price', 'نسبة التمويل'), def: 80, min: 50, max: 85, step: 5, unit: '%' },
      { k: 'days', label: l('FOL deadline', 'مهلة خطاب العرض'), def: 21, min: 21, max: 28, step: 7, unit: '', options: [{ v: 21, label: l('21 days', '21 يوماً') }, { v: 28, label: l('28 days', '28 يوماً') }] },
      { k: 'validity', label: l('Contract validity', 'صلاحية العقد'), def: 45, min: 45, max: 60, step: 15, unit: '', options: [{ v: 45, label: l('45 days', '45 يوماً') }, { v: 60, label: l('60 days', '60 يوماً') }] },
      yesNo('sellerMortgage', l('Seller has a mortgage', 'العقار مرهون'), 1),
    ],
    compute: (v) => {
      const n = (x: number) => x.toLocaleString('en-US');
      const words: Record<number, string> = { 21: 'Twenty-One', 28: 'Twenty-Eight', 45: 'Forty-Five', 60: 'Sixty' };
      const text = [
        'SPECIAL CONDITION 1 — SUBJECT TO BANK VALUATION & FINAL OFFER LETTER (FOL):',
        '1.1 The Parties expressly agree that this Contract F is strictly conditional upon the Buyer obtaining both:',
        `    (a) An official RERA-certified bank property valuation report valuing the Property at no less than AED ${n(v.val)}; and`,
        `    (b) An unconditional written Final Offer Letter ("FOL") from a UAE Central Bank (CBUAE) licensed financial institution for a mortgage loan of no less than ${v.ltv}% of the Purchase Price within ${words[v.days]} (${v.days}) calendar days from full execution of this Contract F.`,
        '1.2 If no written price adjustment agreement is reached within Five (5) working days following a valuation shortfall, or if the Buyer’s lending bank declines to issue the FOL for any reason not caused by willful default of the Buyer, this Contract F shall automatically terminate with immediate effect without penalty, and the Stakeholder Agency shall return the uncashed 10% Security Deposit Cheque to the Buyer within Forty-Eight (48) hours.',
        '',
        `SPECIAL CONDITION 2 — ${v.sellerMortgage ? 'SELLER MORTGAGE CLEARANCE, LIABILITY LETTER & ' : ''}AUTOMATIC EXTENSION:`,
        ...(v.sellerMortgage ? ['2.1 The Seller confirms that the Property is mortgaged to [SELLER’S BANK] and undertakes to apply for the official Bank Liability Letter within Two (2) working days of receiving the Buyer’s signed FOL.'] : []),
        `2.${v.sellerMortgage ? 2 : 1} The validity period of this Contract F shall be ${words[v.validity]} (${v.validity}) calendar days. In the event of administrative delays by the Buyer’s Bank, Seller’s Bank, Master Developer (NOC), or DLD beyond either Party’s control, both Parties grant an automatic written extension of up to Fifteen (15) additional calendar days at zero penalty.`,
        '',
        'SPECIAL CONDITION 3 — DEPOSIT CHEQUE CUSTODY & PROPERTY COMPLIANCE WARRANTY:',
        '3.1 The Buyer’s 10% Security Deposit Cheque shall be held strictly in trust and uncashed by the RERA-licensed Brokerage as neutral stakeholder and shall never be presented for encashment prior to DLD Transfer.',
        '3.2 The Seller warrants that there are no unauthorized structural modifications or building violations that would prevent Developer NOC or Bank Valuation approval.',
      ].join('\n');
      return {
        hero: { label: l('Clauses ready to paste', 'البنود جاهزة للنسخ'), v: '3 special conditions', f: 'raw' },
        rows: [{ label: l('Deposit protected', 'العربون المحمي'), v: v.val * 0.1, f: 'aed', strong: true }],
        text,
        note: l('Template only — have a RERA-registered conveyancer review before signing. Arabic version requires certified legal translation.', 'نموذج فقط — يجب مراجعته من مختص قانوني. النسخة العربية تتطلب ترجمة قانونية معتمدة.'),
      };
    },
  },
  'life-insurance-assignment-audit': {
    inputs: [{ k: 'loan', label: l('Loan amount', 'مبلغ التمويل'), def: 2_000_000, min: 300_000, max: 20_000_000, step: 50_000, unit: 'AED' }, rate(4.25), years(15), { k: 'bank', label: l('Bank premium p.a.', 'قسط البنك السنوي'), def: 0.65, min: 0.3, max: 1, step: 0.01, unit: '%' }, { k: 'ext', label: l('External premium p.a.', 'القسط الخارجي'), def: 0.26, min: 0.1, max: 0.8, step: 0.01, unit: '%' }],
    compute: (v) => {
      const r = M.lifeInsurance(v.loan, v.rate, v.years, v.bank, v.ext);
      return {
        hero: { label: l('Saved with an external policy', 'التوفير مع وثيقة خارجية'), v: r.saved, f: 'aed' },
        rows: [
          { label: l('Bank-bundled cover total', 'إجمالي تأمين البنك'), v: r.bank, f: 'aed' },
          { label: l('External cover total', 'إجمالي التأمين الخارجي'), v: r.ext, f: 'aed' },
          { label: l('Average monthly saving', 'متوسط التوفير الشهري'), v: r.monthlyGain, f: 'mo', strong: true },
          { label: l('Banks accepting assignment', 'بنوك تقبل التنازل'), v: BANKS.filter((b) => b.externalLife).map((b) => b.short).join(', '), f: 'raw' },
        ],
      };
    },
  },
  'transfer-day-cheque-calculator': {
    inputs: [price(2_500_000), { k: 'payoff', label: l('Seller’s bank payoff', 'مستحقات بنك البائع'), def: 1_100_000, min: 0, max: 30_000_000, step: 10_000, unit: 'AED' }, { k: 'deposit', label: l('Deposit paid at Form F', 'العربون المدفوع'), def: 250_000, min: 0, max: 5_000_000, step: 10_000, unit: 'AED' }, { k: 'ltv', label: l('Your loan LTV', 'نسبة تمويلك'), def: 80, min: 0, max: 85, step: 5, unit: '%' }],
    compute: (v) => {
      const loan = v.price * (v.ltv / 100);
      const s = M.chequeSplit(v.price, v.payoff, v.deposit, loan);
      const total = s.sellerBank + s.seller + s.dld + s.mortgageReg + s.trustee;
      return {
        hero: { label: l('Total across manager’s cheques', 'إجمالي الشيكات'), v: total, f: 'aed' },
        rows: [
          { label: l('Payee: seller’s bank (liability letter)', 'المستفيد: بنك البائع'), v: s.sellerBank, f: 'aed' },
          { label: l('Payee: seller (balance)', 'المستفيد: البائع'), v: s.seller, f: 'aed' },
          { label: l('Payee: Dubai Land Department', 'المستفيد: دائرة الأراضي'), v: s.dld, f: 'aed' },
          { label: l('Payee: DLD mortgage registration', 'تسجيل الرهن'), v: s.mortgageReg, f: 'aed' },
          { label: l('Payee: trustee office', 'المستفيد: أمين التسجيل'), v: s.trustee, f: 'aed' },
          { label: l('Funded by your loan', 'ممول من قرضك'), v: loan, f: 'aed', strong: true },
        ],
      };
    },
  },
};
