# Live and daily-updated rate data

## What was wrong

Every bank revert rate, 5-year cost and ranking was calculated with a hard-coded 3M EIBOR of 4.45%.
The published CBUAE 3M EIBOR fixing on 6 Nov 2026 is 4.20677%, so reverts were overstated by ~0.24 points
(e.g. HSBC showed 5.69% instead of 5.45%). All calculations now read the CBUAE fixing via `BENCH.eibor3m`
(`src/data/site.ts` ← `src/data/eibor-snapshot.json`).

## Sources

| Data | Source | Update | How the site gets it |
|---|---|---|---|
| EIBOR 1M / 3M / 6M (benchmark for every variable mortgage) | CBUAE public EIBOR page, `centralbank.ae/umbraco/surface/eibor/GetEiborData` | Each business day | `/api/market/eibor` fetches live (cached 1 h). `npm run prebuild` refreshes the snapshot used by statically built pages. |
| Bank fixed rates, margins, floors, fees | No public API. Each bank's own mortgage page / rate card; aggregator tables (e.g. mortgagecompare.ae, mortgease.ae) | Banks change them a few times a month | Edit `src/data/banks.ts`. Record the check date in the commit message. |
| Licensed alternative | LSEG (Refinitiv), the EIBOR calculation agent since 2018 | Real time | Paid data licence; replace the CBUAE fetch in `src/lib/eibor.ts`. |

## Daily refresh

`.github/workflows/daily-rate-refresh.yml` triggers a Vercel production rebuild every weekday at 08:17 GST.
The `prebuild` script pulls the latest CBUAE fixing first, so every page shows that day's EIBOR. It commits nothing.

One-time setup: Vercel → Project → Settings → Git → Deploy Hooks → create a hook for `main`,
then add it as the GitHub repository secret `VERCEL_DEPLOY_HOOK_URL`.

If CBUAE is unreachable during a build, the last dated snapshot is kept and labelled with its date. Nothing is shown as live when it is not.

## Bank fixed rates

Bank fixed rates still need a weekly manual check. Recent public aggregator snapshots (early Nov 2026) report
Emirates NBD at 4.19% and HSBC at 4.05%, while `banks.ts` lists 3.89% and 3.99%. These are unconfirmed third-party figures,
so they were not applied. Verify them against each bank before changing `banks.ts`.
