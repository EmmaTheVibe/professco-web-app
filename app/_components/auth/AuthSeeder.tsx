"use client";

import { useState, useEffect } from "react";
import useAuthStore, {
  type User,
  AUTH_LOGOUT_STORAGE_KEY,
} from "@/app/_utils/auth-store";

interface InitialAuth {
  isAuthenticated: boolean;
  user: User | null;
}

interface Props {
  initialAuth: InitialAuth;
}

async function revalidateAuth({ clearOnNetworkError }: { clearOnNetworkError: boolean }) {
  try {
    const res = await fetch("/api/auth/me");
    const data = res.ok ? await res.json() : null;

    if (data?.profile) {
      useAuthStore.getState().setUser(data.profile);
    } else {
      useAuthStore.setState({ isAuthenticated: false, user: null });
    }
  } catch {
    if (clearOnNetworkError) {
      useAuthStore.setState({ isAuthenticated: false, user: null });
    }
  }
}

export default function AuthSeeder({ initialAuth }: Props) {
  useState(() => {
    useAuthStore.setState(initialAuth);
    return true;
  });

  useEffect(() => {
    if (initialAuth.isAuthenticated) {
      revalidateAuth({ clearOnNetworkError: true });
    }

    const handleVisibility = () => {
      if (
        document.visibilityState === "visible" &&
        useAuthStore.getState().isAuthenticated
      ) {
        revalidateAuth({ clearOnNetworkError: false });
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === AUTH_LOGOUT_STORAGE_KEY) {
        useAuthStore.setState({ isAuthenticated: false, user: null });
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("storage", handleStorage);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("storage", handleStorage);
    };
  }, [initialAuth.isAuthenticated]);

  return null;
}
