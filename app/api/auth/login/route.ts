import { checkCredentials, createSessionToken, SESSION_COOKIE, SESSION_TTL_MS } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body as { email: string; password: string };

    if (!email || !password) {
      return Response.json({ error: "Email and password required" }, { status: 400 });
    }

    if (!checkCredentials(email, password)) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await createSessionToken(email);
    const maxAge = Math.floor(SESSION_TTL_MS / 1000);

    return Response.json(
      { ok: true },
      {
        headers: {
          "Set-Cookie": `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`,
        },
      }
    );
  } catch (err) {
    console.error("[auth/login]", err);
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
