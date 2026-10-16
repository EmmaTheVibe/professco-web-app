"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore, {
  type User,
  AUTH_LOGOUT_STORAGE_KEY,
} from "@/app/_utils/auth-store";
import { isProtectedPath } from "@/app/_utils/protected-routes";

interface InitialAuth {
  isAuthenticated: boolean;
  user: User | null;
}

interface Props {
  initialAuth: InitialAuth;
}

interface RevalidateOptions {
  clearOnNetworkError: boolean;
  onSessionLost: () => void;
}

async function revalidateAuth({ clearOnNetworkError, onSessionLost }: RevalidateOptions) {
  try {
    const res = await fetch("/api/auth/me");

    if (res.status === 401) {
      useAuthStore.setState({ isAuthenticated: false, user: null });
      onSessionLost();
      return;
    }

    // Any other failure is a backend problem; keep the current session state.
    if (!res.ok) return;

    const data = await res.json();
    if (data?.profile) {
      useAuthStore.getState().setUser(data.profile);
    }
  } catch {
    if (clearOnNetworkError) {
      useAuthStore.setState({ isAuthenticated: false, user: null });
    }
  }
}

export default function AuthSeeder({ initialAuth }: Props) {
  const router = useRouter();

  useState(() => {
    useAuthStore.setState(initialAuth);
    return true;
  });

  useEffect(() => {
    // proxy.js only guards on navigation, so a session that dies while a
    // protected page is open has to be kicked out from here.
    const onSessionLost = () => {
      const { pathname } = window.location;
      if (isProtectedPath(pathname)) {
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      }
    };

    if (initialAuth.isAuthenticated) {
      revalidateAuth({ clearOnNetworkError: true, onSessionLost });
    }

    const handleVisibility = () => {
      if (
        document.visibilityState === "visible" &&
        useAuthStore.getState().isAuthenticated
      ) {
        revalidateAuth({ clearOnNetworkError: false, onSessionLost });
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === AUTH_LOGOUT_STORAGE_KEY) {
        useAuthStore.setState({ isAuthenticated: false, user: null });
        onSessionLost();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("storage", handleStorage);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("storage", handleStorage);
    };
  }, [initialAuth.isAuthenticated, router]);

  return null;
}
