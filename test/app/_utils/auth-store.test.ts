import { beforeEach, describe, expect, it, vi } from "vitest";
import useAuthStore, {
  AUTH_LOGOUT_STORAGE_KEY,
} from "@/app/_utils/auth-store";

const initialState = useAuthStore.getState();

beforeEach(() => {
  useAuthStore.setState(initialState, true);
  localStorage.clear();
});

describe("auth-store", () => {
  it("starts unauthenticated with no user", () => {
    const { isAuthenticated, user } = useAuthStore.getState();
    expect(isAuthenticated).toBe(false);
    expect(user).toBeNull();
  });

  it("setUser marks the store authenticated", () => {
    const profile = { first_name: "Ada", last_name: "Lovelace" } as any;

    useAuthStore.getState().setUser(profile);

    const { isAuthenticated, user } = useAuthStore.getState();
    expect(isAuthenticated).toBe(true);
    expect(user).toEqual(profile);
  });

  it("clearUser resets to logged-out state", () => {
    useAuthStore.getState().setUser({ first_name: "Ada" } as any);

    useAuthStore.getState().clearUser();

    const { isAuthenticated, user } = useAuthStore.getState();
    expect(isAuthenticated).toBe(false);
    expect(user).toBeNull();
  });

  it("clearUser broadcasts a logout sentinel to localStorage for other tabs", () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    useAuthStore.getState().clearUser();

    expect(setItemSpy).toHaveBeenCalledWith(
      AUTH_LOGOUT_STORAGE_KEY,
      expect.any(String),
    );
    setItemSpy.mockRestore();
  });
});
