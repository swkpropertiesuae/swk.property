# Betterway visual and content refresh

7 November 2026

## What changed

- Rebuilt the English homepage around a concise three-line headline, a focused mortgage enquiry and the existing calculator.
- Added two architectural concept images as responsive WebP assets. The largest hero asset is 328 KB; the mobile hero asset is 73 KB. The supporting image loads lazily.
- Replaced the original phones with detailed code-rendered iPhone mockups. Monthly and upfront views use `emi` and `cashToClose`, matching the working calculator: AED 8,437/month and AED 534,220 upfront for an AED 2M property, 20% down, 3.99% and 25 years.
- Added controlled device float, heading entrances, section movement, hover feedback and existing animated navigation. Device motion stops outside the viewport, when the tab is hidden, or when paused. Reduced-motion preferences disable animation.
- Simplified navigation and shared page headings, cards, product summaries, FAQs and conversion copy.
- Removed unsupported registration, advisor-pay, guaranteed timeline, deposit-protection, automatic Golden Visa and universal zero-fee claims from prominent pages and machine-readable descriptions.
- Removed promotional claims for disconnected portal sign-in features. Portal routes remain accessible as clearly labelled demonstrations; they are no longer promoted as live client accounts.
- Removed the dummy WhatsApp number. Enquiries fall back to the existing configured business email. Forms compose an email and do not claim a CRM submission occurred. Consultation times are preferences requiring confirmation, not live availability.
- Made EIBOR charts and bank comparisons explicitly illustrative. The EIBOR page links to CBUAE rather than presenting a fabricated series as observed market data.
- Corrected matching prominent Arabic claims and retained the Arabic routes.

## Search intent preserved

All 360 blueprint route paths remain unchanged. Exact topic phrases still appear in visible content, headings or metadata, including:

| Phrase | Placement |
| --- | --- |
| Mortgage broker in Dubai & UAE | Homepage eyebrow and metadata |
| UAE mortgage rates | Navigation, comparison and metadata |
| Expat Resident Mortgages | Product card and product route |
| Non-Resident Mortgages | Product card and product route |
| Off-Plan & Handover Finance | Product card and product route |
| Switch Bank (Buyout) | Product card and product route |
| UAE National Mortgages | Homepage link and product route |
| Islamic Home Finance | Homepage link and product route |
| Golden Visa Mortgages | Homepage link and product route |
| Equity Release & Cash-Out | Homepage link and product route |
| EIBOR revert margin / floor rate | Comparison section and rate routes |

Marketing claims that could not be substantiated were shortened or qualified rather than preserved as purported facts. No claim of search-ranking improvement is made.

## Verification

- Production Next.js static export: passed.
- Existing 12 tests, including finance formulas and 360-route invariant: passed.
- TypeScript validation: passed as part of the production build.
- Internal link scan: 371 exported HTML pages, zero broken internal links.
- Browser: desktop hero, mobile/tablet layouts, mobile navigation, monthly/upfront phone tabs, pause control and the four-step mortgage finder verified.
- Device screen content fits its frame at desktop and mobile sizes.

## Operational facts still requiring business confirmation

The source repository does not establish the firm's regulatory registration, fee policy, bank relationships, approved staff profiles, live rate data, contact mailbox ownership or its lender-specific criteria. No new credentials or private systems were available in this task. The pre-existing address and email remain configured; the dummy phone number is disabled.

Rates, country lender matrices, project/area estimates and calculators remain planning information. These datasets have not been independently re-underwritten or turned into live bank feeds. Calculator defaults can omit insurance, lender processing fees and property-specific charges; consumer copy now makes this clear. Portal and partner dashboards remain fictional demonstrations; no authentication, document vault or payout integration was built in this visual refresh.

Before restoring claims about fees, SLA, registration or partner payouts, substantiate them and update all page, Arabic, schema and feed references consistently.

## Primary rule reference

CBUAE Rulebook, Article (3), checked 7 November 2026:
https://rulebook.centralbank.ae/node/2856

The current rulebook assigns maturity age to lender policy; it does not impose a universal 65/70-year rule. The consumer-facing shared rule was corrected. The existing borrowing tool's age-based defaults remain an assumption, not a regulatory maximum.

## Image production

Created using built-in image generation. Source originals were preserved separately. Optimized project files live in `public/images/`. Website credits identify the photography as concept imagery rather than real listings.

### Hero prompt

Photorealistic architectural editorial photograph for a premium UAE mortgage fintech website. Contemporary Dubai waterfront villa, pale limestone and travertine facade, elegant glass frontage, warm interior, planted garden, reflecting water and palms. Restrained distant Dubai skyline. Soft early morning daylight, ivory and muted teal, straight architectural lines and believable proportions. Wide composition suitable for desktop and portrait crops, quiet sky. Natural textures and highlights. No people, text, logos, phone graphics or watermark. Concept residence, not a named property.

### Supporting prompt

Natural architectural editorial photograph from inside a contemporary Dubai waterfront apartment. Floor-to-ceiling windows, sunny marina, realistic distant towers, pale travertine, cream linen sofa, olive tree and muted teal detail. Warm daylight, real shadows and subtle grain. Uncluttered, understated interior. Wide composition. No people, text, logos or watermark. Concept residence, not a named development.
