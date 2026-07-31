"use client";

import { useState, useEffect } from "react";
import useAuthStore, { type User } from "@/app/_utils/auth-store";

interface InitialAuth {
  isAuthenticated: boolean;
  user: User | null;
}

interface Props {
  initialAuth: InitialAuth;
}

export default function AuthSeeder({ initialAuth }: Props) {
  useState(() => {
    useAuthStore.setState(initialAuth);
    return true;
  });

  useEffect(() => {
    if (!initialAuth.isAuthenticated) return;

    let cancelled = false;

    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.profile) {
          useAuthStore.getState().setUser(data.profile);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [initialAuth.isAuthenticated]);

  return null;
}
