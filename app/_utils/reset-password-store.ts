import { create } from "zustand";

const STORAGE_KEY = "resetPasswordState";

interface ResetPasswordState {
  email: string;
  hasRequestedReset: boolean;
  savedAt: number;
  setEmail: (email: string) => void;
  setHasRequestedReset: (value: boolean) => void;
  loadState: (state: {
    email: string;
    hasRequestedReset: boolean;
    savedAt: number;
  }) => void;
  clearResetState: () => void;
}

const persistState = (state: {
  email: string;
  hasRequestedReset: boolean;
  savedAt: number;
}) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const useResetPasswordStore = create<ResetPasswordState>((set) => ({
  email: "",
  hasRequestedReset: false,
  savedAt: 0,

  setEmail: (email) => {
    const next = { email, hasRequestedReset: true, savedAt: Date.now() };
    set(() => next);
    persistState(next);
  },

  setHasRequestedReset: (value) => {
    set((state) => {
      const next = {
        email: state.email,
        hasRequestedReset: value,
        savedAt: value ? state.savedAt || Date.now() : 0,
      };
      persistState(next);
      return next;
    });
  },

  loadState: (state) => {
    const next = {
      email: state.email,
      hasRequestedReset: state.hasRequestedReset,
      savedAt: state.savedAt,
    };
    set(() => next);
    persistState(next);
  },

  clearResetState: () => {
    set({ email: "", hasRequestedReset: false, savedAt: 0 });
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  },
}));

export default useResetPasswordStore;
