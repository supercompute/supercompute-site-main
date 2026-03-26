// ─── Auth utilities ───────────────────────────────────────────────────────────
// Works in both Node.js and Edge (Cloudflare Workers) via Web Crypto API.

export const SESSION_COOKIE = "sc_session";
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// Protected routes that require login
export const PROTECTED_PREFIXES = [
  "/admin",
  "/dashboard",
  "/assets",
  "/alerts",
  "/projects",
  "/live",
];

// ─── HMAC helpers ─────────────────────────────────────────────────────────────

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toBase64url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64url(str: string): Uint8Array {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

// ─── Sign / verify ────────────────────────────────────────────────────────────

export async function createSessionToken(email: string): Promise<string> {
  const secret = process.env.SESSION_SECRET ?? "sc-change-me-in-prod";
  const payload = toBase64url(
    new TextEncoder().encode(JSON.stringify({ email, exp: Date.now() + SESSION_TTL_MS }))
  );
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${payload}.${toBase64url(sig)}`;
}

export async function verifySessionToken(
  token: string
): Promise<{ email: string } | null> {
  try {
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return null;

    const secret = process.env.SESSION_SECRET ?? "sc-change-me-in-prod";
    const key = await getKey(secret);
    const sigBytes = fromBase64url(sig);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes.buffer as ArrayBuffer,
      new TextEncoder().encode(payload)
    );
    if (!valid) return null;

    const data = JSON.parse(new TextDecoder().decode(fromBase64url(payload)));
    if (typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return { email: data.email };
  } catch {
    return null;
  }
}

// ─── Credential check ─────────────────────────────────────────────────────────

export function checkCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL ?? "service@supercompute.io";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!adminPassword) return false; // Must set env var
  return (
    email.toLowerCase().trim() === adminEmail.toLowerCase().trim() &&
    password === adminPassword
  );
}
