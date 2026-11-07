> **7 Nov 2026 visual/content refresh:** See [the refresh notes](docs/FINTECH_REFRESH.md) for current behavior, validation and remaining data/integration limits. This supersedes older marketing and live-feature descriptions below.

# Betterway Mortgages — betterwaymortgages.com

The 360-page site from the *360-Page Master Sitemap & 3-Wave Deployment Blueprint*. It is built with Next.js 15 (App Router) and Tailwind v4, and statically exported. Every page is pre-rendered HTML, so no page shows a 0% rate or an AED 0 result while it loads. Brand tokens come from Brand Kit v1.0: teal `#007D78`, navy `#081D37`, mist `#F2F7F6`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out (382 files: 371 HTML pages + text/XML feeds)
npm test           # math engine tests + "exactly 360 unique blueprint URLs" check
node scripts/check-links.mjs   # after build: every internal link resolves
```

**Deploy (Cloudflare Pages or any static host):** set the build command to `npm run build` and the output directory to `out`. Turn on clean URLs, so `/about-us` serves `about-us.html`.

## Architecture

| Silo | Route | Pages | Source data |
|---|---|---|---|
| 01 Core & AI endpoints | `/`, `/about-us`, … `/llms.txt`, `/llms-full.txt` | 10 | `data/site.ts` |
| 02 Products | `/mortgages/[slug]` | 14 | `data/products.ts` |
| 03 Calculators & tools | `/calculators/[slug]`, `/tools/[slug]` | 12 | `data/tools.ts`, `components/calc/registry.ts` |
| 04 Rates | `/rates/…`, `/rates/[bank]`, `/rates/compare/[slug]` | 41 | `data/banks.ts`, `data/compare.ts` |
| 05 Handover | `/handover/…/[developer]/[project]` | 95 | `data/handover.ts` |
| 06 Communities | `/areas/[emirate]/[community]` | 60 | `data/communities.ts` |
| 07 Non-resident | `/mortgages/non-resident-[country]` | 25 | `data/countries.ts` |
| 08–10 Affordability, advisory, guides | `/affordability`, `/advisory`, `/guides` | 33 | `data/content.ts` |
| 11 Portal & partner hub | `/portal/*`, `/partners/*` | 10 | app views with sample data, `noindex` |
| 12 Arabic (RTL) | `/ar/…` | 60 | `data/ar.ts` |

The site also has 12 hub pages: `/mortgages`, `/rates`, `/areas`, `/sitemap` and others. `src/lib/routes.ts` is the master inventory. It feeds the segmented sitemaps (`sitemap-core|banks|handover|communities|ar.xml`) and the `/sitemap` page. A test checks that it lists exactly 360 URLs.

- **Math:** `src/lib/math.ts` implements the CBUAE and DLD formulas from Market Bible Module 4: EMI, 50% DBR with the 5%/3% card-limit rule, itemised cash-to-close, the 1% / AED 10,000 exit cap, handover cash-out, Golden Visa fees and more. Every calculator, page figure and co-pilot answer uses these functions.
- **Calculators:** one declarative registry renders all 12 calculators in English and Arabic.
- **Design:** the header mega-menu is adapted from 21st.dev's *Mega Menu Navbar*. The dual-intent hero follows Holo, but rates and a calculator sit above the fold. Fixes from the competitor audit are built in:
  - one DOM tree (no duplicated mobile/desktop nav)
  - no gated fees
  - a one-line disclosure with an expandable full text
  - full address in the footer
- **SEO/AEO:**
  - each page has a citation capsule of about 50 words, plus breadcrumbs and FAQ / FinancialProduct / Article JSON-LD
  - `hreflang` links between English and Arabic
  - `robots.txt` allows GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot and Google-Extended

## Launch checklist (confirm before going live)

1. **Contact details** in `src/data/site.ts`: phone, WhatsApp number and DED/RERA licence number. All three are placeholders now.
2. **Community figures** in `data/communities.ts` (price per sq.ft., yield, typical price). These are indicative; replace them with the monthly DLD/ADREC data pull.
3. **The 30 Wave-3 expansion projects** in `data/handover.ts` have no plan, valuation or APL count yet. Their pages say "pending brief" until the desk adds the data.
4. **Non-resident countries 16–25** in `data/countries.ts` are desk guidance. Confirm them with the lenders.
5. **EIBOR history** in `site.ts` (`EIBOR_SERIES`) is an indicative series that ends at the November 2026 fixing. Connect the CBUAE daily feed.
6. **Bank rates** come from Market Bible Module 10. Refresh them monthly, and update `asOf` when you do.
7. **Reviews:** embed the verified Google Business Profile widget on `/reviews`. The site contains no invented testimonials.
8. **Underwriters:** add named profiles with `Person` schema once advisor licences are confirmed.
9. **Arabic copy and the Arabic Form F clause** need review by a native-speaking compliance or legal editor.
10. **Leads:** forms currently hand off to WhatsApp or e-mail. Wire them to the CRM webhook and WhatsApp Business API (Module 6, State 4).
11. **Ease AI Pro** currently answers four fixed questions with exact math. Connect it to the LLM and RAG backend using the Module 6 system prompt.
12. **Subdomains:** route `portal.betterwaymortgages.com` to `/portal/*` and `hub.betterwaymortgages.com` to `/partners/*`, and add UAE PASS and OTP authentication.
13. **Co-branded links:** `?agent=` links are generated but not yet read by the calculator page. Add attribution storage when the CRM is connected.
