import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, PROTECTED_PREFIXES, verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this route needs protection
  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );

  if (!isProtected) return NextResponse.next();

  // Read the session cookie set by /api/auth/verify (SIWE flow)
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(signInUrl);
  }

  const session = await verifySessionToken(token);

  if (!session) {
    // Invalid or expired token — clear it and redirect to SIWE sign-in
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("next", pathname);
    const response = NextResponse.redirect(signInUrl);
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  // /admin/* requires role: admin — non-admins go to dashboard
  if (pathname.startsWith("/admin") && session.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Attach wallet address for downstream use (SSR headers)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-address", session.address);
  requestHeaders.set("x-user-role", session.role);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/assets/:path*",
    "/alerts/:path*",
    "/projects/:path*",
    "/live/:path*",
  ],
};
