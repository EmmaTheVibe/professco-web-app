import { create } from "zustand";
import type { User } from "@/app/_utils/types";

export type { User };

export const AUTH_LOGOUT_STORAGE_KEY = "auth:logout";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (profile: User) => void;
  clearUser: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (profile) =>
    set({
      user: profile,
      isAuthenticated: true,
    }),

  clearUser: () => {
    set({
      user: null,
      isAuthenticated: false,
    });

    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUTH_LOGOUT_STORAGE_KEY, Date.now().toString());
    }
  },
}));

export default useAuthStore;
