export const protectedRoutes = ["/student", "/personalize"];

export function isProtectedPath(pathname) {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
