"use client";

import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cart: [],
  cartLoaded: false,

  initCart: () => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) set({ cart: JSON.parse(stored), cartLoaded: true });
      else set({ cartLoaded: true });
    } catch {
      set({ cartLoaded: true });
    }
  },

  addToCart: (courseId) => {
    const id = Number(courseId);
    set((state) => {
      const newCart = state.cart.includes(id)
        ? state.cart
        : [...state.cart, id];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    });
  },

  removeFromCart: (courseId) => {
    const id = Number(courseId);
    set((state) => {
      const newCart = state.cart.filter((item) => item !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    });
  },
}));

export default useCartStore;
