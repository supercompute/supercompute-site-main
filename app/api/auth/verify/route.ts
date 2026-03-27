// SIWE verification endpoint — the CF Worker auth endpoint.
// Verifies EIP-4361 signature, upserts D1 user record, issues JWT cookie.
import { SiweMessage } from "siwe";
import { createSessionToken, SESSION_COOKIE, SESSION_TTL_MS } from "@/lib/auth";
import { d1Query } from "@/lib/d1";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { message?: string; signature?: string };
    const { message, signature } = body;

    if (!message || !signature) {
      return Response.json(
        { error: "message and signature are required" },
        { status: 400 }
      );
    }

    // Verify EIP-4361 SIWE signature
    const siweMessage = new SiweMessage(message);
    const result = await siweMessage.verify({ signature });

    if (!result.success || !result.data?.address) {
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }

    const address = result.data.address.toLowerCase();

    // Find or create the user in D1; fall through on DB error so auth still works
    let role = "user";
    try {
      const existing = await d1Query<{ role: string }>(
        "SELECT role FROM users WHERE wallet_address = ? LIMIT 1",
        [address]
      );

      if (existing.length > 0) {
        role = existing[0].role ?? "user";
      } else {
        const id = crypto.randomUUID();
        await d1Query(
          `INSERT INTO users (id, email, name, wallet_address, role)
           VALUES (?, ?, ?, ?, ?)`,
          [id, `${address}@wallet.siwe`, address.slice(0, 10), address, "user"]
        );
      }
    } catch (err) {
      console.error("[auth/verify] D1 error (non-fatal):", err);
    }

    const token = await createSessionToken(address, role);
    const maxAge = Math.floor(SESSION_TTL_MS / 1000);

    return Response.json(
      { ok: true, address, role },
      {
        headers: {
          "Set-Cookie": `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`,
        },
      }
    );
  } catch (err) {
    console.error("[auth/verify]", err);
    return Response.json({ error: "Verification failed" }, { status: 500 });
  }
}
