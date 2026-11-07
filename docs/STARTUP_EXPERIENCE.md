# Betterway startup experience

7 November 2026 · Dubai

## Delivery

The homepage now presents a colourful product experience while keeping Betterway’s approved teal/navy identity and existing mortgage topic URLs. The client workspace and Arabic overview remain visibly labelled previews. Their metadata does not invite search indexing before activation/review. No extra placeholder marketing routes were added.

### Design decisions from the uploaded references

| Reference | Applied principle |
| --- | --- |
| Nicepay SaaS homepage | Centred message, clear actions and a product-led visual rather than a long list of claims |
| Hybrid Markets layout | Alternating calm white content and darker product surfaces |
| Rendr | Floating, compact information cards with a single purpose |
| Optibiz | Angled devices and a controlled financial-services palette |
| Worklife | Large type and generous space between ideas |
| Next-Gen Banking | Useful feature groups with contrasting panels |
| Fincrest | A coherent connection between the product and the customer’s next move |
| MonetaFlow | Navy, mint and lilac used consistently across mobile and desktop |
| Float fintech composition | Detailed metal frames, screen recesses and layered dashboard/phone views |
| Charter | Shorter display copy; strong typographic hierarchy |
| Mortgage.ai | Mortgage-specific cost and application context; no invented funding, reviews or performance statistics |
| Remy AI | Floating notifications and device depth; not copied claims or imagery |
| The two uploaded MP4s | Product-screen motion, layered transitions and a persistent mobile focal point |

The visual is implemented with native HTML/CSS, the existing motion library and an original 12-second app UI film. The uploaded inspiration graphics and films are not republished as Betterway assets.

### Interaction details

- Accurate macOS-style traffic lights, menu bar, browser address field, notched screen, metal bezel and laptop base. This is a product mockup, not a real signed-in client session.
- An iPhone mockup plays a 780 × 1688 H.264 mobile planning film: budget, comparison criteria and application checklist. It is approximately 190 KB and contains only illustrative information.
- Hero colour movement, device float and film pause together. Viewport visibility, hidden tabs, reduced-motion preferences and data-saving preference govern autoplay.
- Accessible native modal for the product film; keyboard Escape and close controls work without a custom focus trap.
- Alert centre with latest published EIBOR and user-created reminders. Saving is opt-in on-device; reminders can be removed. A confirmation toast appears after creation. No email, SMS or web push is claimed or sent.
- Interactive budget/documents/privacy feature panels.
- Real project cards and developer logos, plus source links. They do not imply a bank approval or developer partnership.
- Downloadable PNG/SVG banner, flyer, primary logo and app film in a self-contained media ZIP.

## Public benchmark integration

The application now uses Next.js’s server runtime for one public API route. The marketing pages remain prerendered. Pure static export was removed because a genuine live data refresh requires a server.

Endpoint: `GET /api/market/eibor`

Fixed source: `https://centralbank.ae/umbraco/surface/eibor/GetEiborData`

Consumer source: `https://centralbank.ae/en/forex-eibor/eibor-rates/`

The response includes `status`, `source`, `retrievedAt`, `latest` and recent `history`. It retains both fixing date and value date. The parser accepts the source’s recent series, validates dates/rates/aligned arrays and rejects malformed or oversized responses. Old missing value dates outside the recent window do not invalidate present-day published data. A future fixing date is rejected.

An upstream response is cached for one hour; the API uses CDN caching for five minutes. Timeout, invalid format or source failure falls back to a separately verified snapshot labelled `cached`, never “live”. The dated snapshot remains visible. A fixing older than seven days is labelled stale. EIBOR is a public benchmark, not a bank mortgage quote.

Verified snapshot: publication 6 November 2026; 3M 4.20677%, 1M 4.14250%, 6M 4.68714%; value date 10 November 2026. The same record was retrieved from CBUAE and parsed during implementation.

Security: no client-supplied upstream URL, no credentials in browser code, bounded source payload, timeout, schema validation, same-origin API use, defensive response headers. This public endpoint does not accept identities, messages or documents.

## Activation boundary agreed with the owner

The owner selected **Public data first** and **Keep current, flag gaps**. No service credentials were configured in this workspace. Existing contact/address details are retained; unverified registration, fee and partnership claims are not added.

| Capability | Current state | Required for activation |
| --- | --- | --- |
| Public EIBOR publication | Connected server adapter + dated fallback | Monitor source format and upstream availability |
| Bank mortgage-product feeds | Not connected | Approved lender/feed agreements, access credentials, product/eligibility schema and quote ownership |
| Messaging | Existing email/WhatsApp handoff only | Verified business sender/domain or WhatsApp Business provider, consent and delivery webhooks |
| Identity | Preview only | Approved identity provider/UAE PASS registration, server credentials, redirect allowlist and tested session flow |
| Document intake | Checklist/preview only | Authenticated intake, private encrypted storage, short-lived access, scanning, permissions, audit trail and retention policy |
| Business verification | Pending evidence | Confirmed legal name/licence, applicable registration, business contact ownership and signed bank relationships |
| Arabic | Clearly labelled overview preview | Native content and regulatory review |

No empty identity endpoint, fake upload success or unapproved banking connection is introduced. Private integrations should be activated independently with a secure credential flow and verified provider contracts; the public marketing site should not expose their secrets or raw internal errors.

## Media provenance

Real project images and developer logos were reused from the owner’s existing `swkpropertiesuae/swkpropertiesuae.com` repository. See `public/projects/sources.json` for exact upstream asset paths and official community references. The project images are developer architectural renders, not photographs of completed buildings. Betterway does not claim endorsement, lender eligibility, availability or pricing from their presence.

The new brand banner/flyer and app film are original Betterway interface compositions. Existing conceptual residence/advisor imagery is credited separately in the footer. No inspiration artwork is included in the downloadable kit.

## Reproduction and checks

- `npm ci`
- `npm test`
- `npm run build`
- `node scripts/check-links.mjs` scans prerendered HTML and resolves public assets and generated text/XML routes.
- `npm run dev` starts Next.js through the preview-compatible launcher; development output is isolated in `.next-dev`.
- `python scripts/media/render-app.py` regenerates the original app film (Pillow + FFmpeg).
- `python scripts/media/brand-materials.py` regenerates the editable self-contained SVG banner and flyer. PNG exports are rendered from those sources.

Browser verification covers desktop/mobile layouts, video controls, alert/reminder creation and dismissal, feature tabs, material switching and the public feed. Remaining deployment and verification results are recorded in the pull request.
