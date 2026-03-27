// Returns the current session state read from the JWT cookie.
// AuthContext polls this on mount to determine isAuthenticated.
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return Response.json({ authenticated: false });
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return Response.json({ authenticated: false });
  }

  return Response.json({
    authenticated: true,
    address: session.address,
    role: session.role,
  });
}
