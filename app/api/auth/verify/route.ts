// SIWE verification endpoint — edge runtime, viem-based signature check.
// Issues JWT cookie on successful verification.
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { parseSiweMessage } from "viem/siwe";
import { createSessionToken, SESSION_COOKIE, SESSION_TTL_MS } from "@/lib/auth";
import { d1Query } from "@/lib/d1";

export const runtime = "edge";

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

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

    // Verify EIP-4361 SIWE signature (edge-compatible via viem)
    const valid = await publicClient.verifySiweMessage({
      message,
      signature: signature as `0x${string}`,
    });

    if (!valid) {
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }

    const parsed = parseSiweMessage(message);
    const address = (parsed.address ?? "").toLowerCase();

    // Find or create user in D1; fall through on DB error so auth still works
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
          `INSERT INTO users (id, email, name, wallet_address, role) VALUES (?, ?, ?, ?, ?)`,
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
