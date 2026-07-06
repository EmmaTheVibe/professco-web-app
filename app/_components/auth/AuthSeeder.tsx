"use client";

import { useState } from "react";
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

  return null;
}
