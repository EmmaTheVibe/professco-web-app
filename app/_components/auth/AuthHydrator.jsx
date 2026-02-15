"use client";

import { useEffect } from "react";
import useAuthStore from "@/app/_utils/auth-store";

export default function AuthHydrator() {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}
