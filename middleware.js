import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const response = NextResponse.next();

  // Pass auth status via request header for server components
  response.headers.set("x-is-authenticated", token ? "true" : "false");

  return response;
}

export const config = {
  matcher: [
    // Match all routes except static files, API routes, and Next.js internals
    "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.).*)",
  ],
};
