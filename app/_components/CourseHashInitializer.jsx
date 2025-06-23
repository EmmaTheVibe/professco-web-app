"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function CourseHashInitializer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.location.hash) {
      router.replace(
        `${pathname}${
          searchParams.toString() ? `?${searchParams.toString()}` : ""
        }#about`,
        { scroll: false }
      );
    }
  }, []);

  return null;
}
