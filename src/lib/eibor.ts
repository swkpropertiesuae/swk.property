/** Strict parser for the CBUAE public EIBOR chart payload; never accepts a client-supplied source URL. */
export const EIBOR_SOURCE = 'https://centralbank.ae/en/forex-eibor/eibor-rates/';
export const EIBOR_ENDPOINT = 'https://centralbank.ae/umbraco/surface/eibor/GetEiborData';
export type Fixing = { date: string; valueDate: string; overnight: number; oneMonth: number; threeMonth: number; sixMonth: number; oneYear: number };
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export function isoDate(value: unknown): string {
  if (typeof value !== 'string') throw new Error('Missing fixing date');
  const m = /^(\d{2}) ([A-Z][a-z]{2}) (\d{4})$/.exec(value);
  if (!m || !months.includes(m[2])) throw new Error('Invalid fixing date');
  const iso = `${m[3]}-${String(months.indexOf(m[2]) + 1).padStart(2,'0')}-${m[1]}`;
  if (new Date(iso).toISOString().slice(0,10) !== iso) throw new Error('Invalid calendar date');
  return iso;
}
export function parseEibor(html: string): Fixing[] {
  if (html.length > 3_000_000) throw new Error('Upstream payload too large');
  const match = /<script[^>]+id="eibor-chart-data"[^>]*>([\s\S]*?)<\/script>/i.exec(html);
  if (!match) throw new Error('CBUAE data format changed');
  const d = JSON.parse(match[1]) as Record<string, unknown>;
  const fields = ['historicalDates','historicalValueDates','historicalOnRates','historicalOneMonth','historicalThreeMonth','historicalSixMonth','historicalOneYear'];
  const count = Array.isArray(d.historicalDates) ? d.historicalDates.length : 0;
  if (!count || fields.some(k => !Array.isArray(d[k]) || (d[k] as unknown[]).length !== count)) throw new Error('Incomplete EIBOR series');
  const rate = (k: string, i: number) => { const n = (d[k] as unknown[])[i]; if (typeof n !== 'number' || !Number.isFinite(n) || n < 0 || n > 30) throw new Error('Invalid rate'); return n; };
  const rows = (d.historicalDates as string[]).slice(-65).map((v,j) => { const i=Math.max(0,count-65)+j; return ({ date:isoDate(v), valueDate:isoDate((d.historicalValueDates as string[])[i]), overnight:rate('historicalOnRates',i), oneMonth:rate('historicalOneMonth',i), threeMonth:rate('historicalThreeMonth',i), sixMonth:rate('historicalSixMonth',i), oneYear:rate('historicalOneYear',i) }); });
  rows.sort((a,b) => a.date.localeCompare(b.date));
  if (new Set(rows.map(r=>r.date)).size !== rows.length) throw new Error('Duplicate fixing dates');
  return rows.slice(-65);
}
