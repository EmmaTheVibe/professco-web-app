"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/app/_utils/auth-store";

const personalizationRequiredRoutes = ["/student"];

export default function PersonalizationGuard() {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated || !user || pathname === "/personalize") return;

    const requiresPersonalization = personalizationRequiredRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    if (!requiresPersonalization) return;

    const hasExamBodies =
      Array.isArray(user.exam_bodies) && user.exam_bodies.length > 0;

    if (!hasExamBodies) {
      router.replace("/personalize");
    }
  }, [isAuthenticated, pathname, router, user]);

  return null;
}
