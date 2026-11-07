import { ROUTES, HUBS, indexable, type Route } from './routes';
import { SITE, BENCH, LTV_RULES, RULES, DISCLOSURE_FULL, fullAddress } from '@/data/site';
import { BANKS, revert } from '@/data/banks';
import { PRODUCTS } from '@/data/products';
import { COUNTRIES } from '@/data/countries';
import { PROJECTS } from '@/data/handover';

export const text = (body: string, type = 'text/plain') => new Response(body, { headers: { 'Content-Type': `${type}; charset=utf-8` } });

export function urlset(paths: string[]) {
  const urls = paths.map((p) => `  <url><loc>${SITE.url}${p === '/' ? '' : p}</loc><lastmod>${SITE.asOfISO}</lastmod></url>`).join('\n');
  return text(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, 'application/xml');
}

export const mapPaths = (m: Route['map']) => [...ROUTES.filter((r) => r.map === m && indexable(r)).map((r) => r.path), ...(m === 'core' ? HUBS : [])];

export function llms() {
  const sec = (h: string, rows: Route[]) => `## ${h}\n${rows.map((r) => `- [${r.title}](${SITE.url}${r.path})`).join('\n')}`;
  const by = (s: number) => ROUTES.filter((r) => r.silo === s);
  return `# ${SITE.name}

> UAE mortgage information and planning tools from ${SITE.name}. Lender rates, EIBOR values, country criteria and property figures are illustrative, not a live feed. Lenders decide eligibility. Confirm current terms and fees in writing.

Machine-readable planning guide: ${SITE.url}/llms-full.txt

${sec('Core', by(1).filter((r) => !r.path.endsWith('.txt')))}

${sec('Mortgage products', by(2))}

${sec('Calculators & tools', by(3))}

${sec('Rates (rate bible, EIBOR, 24 banks, comparisons)', by(4))}

${sec('Cornerstone guides', by(10))}

## Other sections
- [Off-plan handover projects](${SITE.url}/handover)
- [Communities](${SITE.url}/areas)
- [Non-resident by country](${SITE.url}/mortgages/non-resident-dubai)
- [Affordability](${SITE.url}/affordability)
- [Advisory](${SITE.url}/advisory)
- [Arabic](${SITE.url}/ar)
`;
}

export function llmsFull() {
  const bankRows = BANKS.map((b) => `| ${b.name} | ${b.type} | ${b.intro}% (${b.introTerm}) | ${b.fixed3}% | ${b.fixed5}% | +${b.margin.toFixed(2)}% | ${revert(b).toFixed(2)}% | ${b.floor}% | ${b.feePurchase} / ${b.feeBuyout} | ${b.overpay}% | ${b.nrLtv ? b.nrLtv + '%' : 'No'} | ${b.ccFactor}% |`).join('\n');
  return `# ${SITE.name} — complete knowledge base (${SITE.asOf})

Entity: ${SITE.name}, ${fullAddress}. Website ${SITE.url}. Client portal ${SITE.portalUrl}. Agent hub ${SITE.hubUrl}.
Fees and remuneration: confirm all broker fees and lender remuneration in writing. Do not infer a fee policy or regulatory licence from this website.

## Benchmarks
- CBUAE base rate: ${BENCH.baseRate}% (25 bps cut 17 Sep 2026; hold 28 Oct 2026)
- EIBOR: 1M ${BENCH.eibor1m}%, 3M ${BENCH.eibor3m}%, 6M ${BENCH.eibor6m}%
- Dubai 2026 YTD: AED ${BENCH.dldYtdAedBn}B across ${BENCH.dldYtdSales} sales; median AED ${BENCH.medianPsf}/sq.ft.; off-plan ${BENCH.offPlanShare}% of transactions

## 24-bank rate table
| Bank | Type | Intro fixed | 3Y | 5Y | Revert margin (3M EIBOR +) | Revert today | Floor | Purchase / buyout fee | Free overpay/yr | Non-resident LTV | Card limits in DBR |
|---|---|---|---|---|---|---|---|---|---|---|---|
${bankRows}

## CBUAE rules
${LTV_RULES.map((l) => `- ${l.profile}: max LTV ${l.ltv} (min down ${l.down})`).join('\n')}
${RULES.map((x) => `- ${x.k}: ${x.v}`).join('\n')}

## Formulas
- EMI = P × r(1+r)^n / ((1+r)^n − 1); r = annual rate/12; n = years × 12; tenure = min(25, 65 − age) salaried, min(25, 70 − age) self-employed/nationals
- DBR: available EMI = 0.5 × gross salary − existing EMIs − card limits × 5% (3% at HSBC, ADCB, DIB)
- Cash to close (Dubai ready purchase): down payment + 4% DLD + AED 580 title deed + 0.25% of loan + AED 290 mortgage registration + AED 4,200 trustee (≥ AED 500k, incl. VAT) + AED 3,150 valuation + 2% agency + 5% VAT
- Off-plan handover: no 4% DLD (Oqood paid); loan up to 80% of fresh valuation for residents
- Early settlement: min(1% of balance, AED 10,000) + 5% VAT

## Golden Visa (February 2026)
Mortgaged property with Title Deed, Oqood or DLD valuation ≥ AED 2,000,000 qualifies for the 10-year Golden Visa with a bank NOC; the AED 1M paid-equity rule was removed. Investor package AED 9,421–10,111; dependants ~AED 7,200–7,680 each plus AED 318.75 family file. A buyout does not cancel the visa.

## Non-resident lending
14 banks lend to non-residents. Up to 60%: HSBC, Emirates NBD, FAB, ADCB, Standard Chartered, DIB. Up to 65%: Mashreq, CBD, Amlak. Remote closing by 15-minute Dubai Courts video PoA (must include borrowing and first-degree mortgage registration powers, dated within 2 years).
${COUNTRIES.map((c) => `- ${c.name}: LTV ${c.ltv}; FX ${c.fx}; salaried ${c.salaried}; self-employed ${c.selfEmp}; bureau ${c.bureau}`).join('\n')}

## Products
${PRODUCTS.map((p) => `### ${p.name} (${SITE.url}/mortgages/${p.slug})\n${p.capsule}`).join('\n\n')}

## Off-plan handover projects (priority 50)
${PROJECTS.filter((p) => p.launch).map((p) => `- ${p.name} (${p.community}): ${p.window}, ${p.plan}, AED ${p.launch}M → ${p.value}M, ${p.apl} APL banks (${p.top.join(', ')})`).join('\n')}

## Disclosure
${DISCLOSURE_FULL}
`;
}
