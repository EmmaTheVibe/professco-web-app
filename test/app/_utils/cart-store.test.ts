import { beforeEach, describe, expect, it } from "vitest";
import useCartStore from "@/app/_utils/cart-store";

const initialState = useCartStore.getState();

beforeEach(() => {
  useCartStore.setState(initialState, true);
  localStorage.clear();
});

describe("cart-store", () => {
  it("starts with an empty cart", () => {
    expect(useCartStore.getState().cart).toEqual([]);
  });

  it("addToCart adds a course id, coercing strings to numbers", () => {
    useCartStore.getState().addToCart("42");

    expect(useCartStore.getState().cart).toEqual([42]);
  });

  it("addToCart does not add duplicates", () => {
    useCartStore.getState().addToCart(42);
    useCartStore.getState().addToCart(42);

    expect(useCartStore.getState().cart).toEqual([42]);
  });

  it("addToCart persists the cart to localStorage", () => {
    useCartStore.getState().addToCart(7);

    expect(JSON.parse(localStorage.getItem("cart") ?? "[]")).toEqual([7]);
  });

  it("removeFromCart removes only the matching id", () => {
    useCartStore.getState().addToCart(1);
    useCartStore.getState().addToCart(2);

    useCartStore.getState().removeFromCart(1);

    expect(useCartStore.getState().cart).toEqual([2]);
    expect(JSON.parse(localStorage.getItem("cart") ?? "[]")).toEqual([2]);
  });

  it("initCart restores a previously persisted cart", () => {
    localStorage.setItem("cart", JSON.stringify([3, 4]));

    useCartStore.getState().initCart();

    expect(useCartStore.getState().cart).toEqual([3, 4]);
    expect(useCartStore.getState().cartLoaded).toBe(true);
  });

  it("initCart marks cartLoaded even with nothing stored", () => {
    useCartStore.getState().initCart();

    expect(useCartStore.getState().cart).toEqual([]);
    expect(useCartStore.getState().cartLoaded).toBe(true);
  });

  it("initCart marks cartLoaded even if stored JSON is corrupt", () => {
    localStorage.setItem("cart", "{not valid json");

    useCartStore.getState().initCart();

    expect(useCartStore.getState().cartLoaded).toBe(true);
  });
});
