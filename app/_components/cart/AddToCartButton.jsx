"use client";

import useCartStore from "@/app/_utils/cart-store";

export default function AddToCartButton({ courseId }) {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const isInCart = cart.includes(Number(courseId));

  return (
    <button
      className="outlined"
      style={{ width: 201 }}
      onClick={() => addToCart(courseId)}
      disabled={isInCart}
    >
      <p>{isInCart ? "Added to cart" : "Add to cart"}</p>
    </button>
  );
}
