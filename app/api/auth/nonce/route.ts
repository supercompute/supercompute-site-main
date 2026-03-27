// Returns a random nonce for SIWE message construction.
// Stateless — replay protection is enforced by the session cookie TTL.
export const runtime = "edge";

export function GET() {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  return Response.json({ nonce });
}
