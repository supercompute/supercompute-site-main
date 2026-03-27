/**
 * Cloudflare D1 REST API client
 * Used by Next.js API routes to read/write supercompute-db
 *
 * Required env vars:
 *   CF_ACCOUNT_ID   — Cloudflare account ID
 *   CF_API_TOKEN    — Cloudflare API token (D1:Edit permission)
 *   CF_D1_DB_ID     — D1 database UUID (supercompute-db)
 */

const BASE = "https://api.cloudflare.com/client/v4";

function config() {
  const accountId = process.env.CF_ACCOUNT_ID;
  const token = process.env.CF_API_TOKEN;
  const dbId = process.env.CF_D1_DB_ID;

  if (!accountId || !token || !dbId) {
    throw new Error(
      "Missing D1 env vars. Set CF_ACCOUNT_ID, CF_API_TOKEN, and CF_D1_DB_ID."
    );
  }
  return { accountId, token, dbId };
}

export async function d1Query<T = Record<string, unknown>>(
  sql: string,
  params: (string | number | null)[] = []
): Promise<T[]> {
  const { accountId, token, dbId } = config();

  const res = await fetch(
    `${BASE}/accounts/${accountId}/d1/database/${dbId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
      // Disable Next.js cache so admin edits show up immediately
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`D1 HTTP ${res.status}: ${text}`);
  }

  const json = await res.json();
  const result = json.result?.[0];

  if (!result?.success) {
    throw new Error(`D1 query failed: ${JSON.stringify(json.errors)}`);
  }

  return result.results as T[];
}
