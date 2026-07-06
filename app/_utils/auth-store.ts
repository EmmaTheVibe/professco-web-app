import { create } from "zustand";
import type { User } from "@/app/_utils/types";

export type { User };

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

  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));

export default useAuthStore;
