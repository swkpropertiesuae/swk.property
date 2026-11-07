import { EIBOR_ENDPOINT, EIBOR_SOURCE, parseEibor } from '@/lib/eibor';
import snapshot from '@/data/eibor-snapshot.json';
export const dynamic = 'force-dynamic';
export const maxDuration = 20;
export async function GET() {
  try {
    const upstream = await fetch(EIBOR_ENDPOINT, { signal:AbortSignal.timeout(12000), next:{ revalidate:3600 }, headers:{ Accept:'text/html' } });
    if (!upstream.ok) throw new Error('Source unavailable');
    const history = parseEibor(await upstream.text());
    const latest = history[history.length - 1];
    if (Date.parse(latest.date) > Date.now() + 86400000) throw new Error('Future fixing date');
    const stale = Date.now() - Date.parse(latest.date) > 7 * 86400000;
    return Response.json({ status:stale?'stale':'current', source:EIBOR_SOURCE, retrievedAt:new Date().toISOString(), latest, history }, { headers:{ 'Cache-Control':'public, s-maxage=300, stale-while-revalidate=3600', 'X-Content-Type-Options':'nosniff' } });
  } catch {
    // An old, dated public fixing remains visible; it is never relabelled live on failure.
    return Response.json({ ...snapshot, status:'cached', warning:'The public source is temporarily unavailable. Showing the dated verified snapshot.' }, { headers:{ 'Cache-Control':'public, s-maxage=60', 'X-Content-Type-Options':'nosniff' } });
  }
}
