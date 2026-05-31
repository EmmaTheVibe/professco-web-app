"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/app/_utils/auth-store";

const protectedRoutes = ["/student"];

export default function AuthHydrator() {
  const hydrate = useAuthStore((state) => state.hydrate);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      await hydrate();
      const { isAuthenticated } = useAuthStore.getState();
      const isProtected = protectedRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
      );
      if (isProtected && !isAuthenticated) {
        router.replace(`/login?redirect=${pathname}`);
      }
    };
    run();
  }, [hydrate, pathname, router]);

  return null;
}
