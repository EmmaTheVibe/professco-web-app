"use client";

import { useEffect } from "react";
import useAuthStore from "@/app/_utils/auth-store";

export default function DashboardUserLogger() {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    console.log("Current dashboard user:", user);
  }, [user]);

  return null;
}
