import { NextResponse } from "next/server";

const protectedRoutes = ["/student", "/personalize"];
const guestOnlyRoutes = ["/login", "/signup"];

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Redirect to login if accessing protected route without auth
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to student home if already logged in and visiting a guest-only page
  const isGuestOnly = guestOnlyRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isGuestOnly && token) {
    return NextResponse.redirect(new URL("/student", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("x-is-authenticated", token ? "true" : "false");

  return response;
}

export const config = {
  matcher: [
    // Match all routes except static files, API routes, and Next.js internals
    "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.).*)",
  ],
};
