"use client";
import { useEffect, useRef, useState } from "react";
import useCartStore from "@/app/_utils/cart-store";
import { getCourseById } from "@/app/_lib/data-service";
import styles from "./Cart.module.css";
import CartCard from "./components/CartCard";
import Summary from "./components/Summary";

export default function Cart({ course }) {
  const cart = useCartStore((state) => state.cart);
  const cartLoaded = useCartStore((state) => state.cartLoaded);
  const [cartCourses, setCartCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchedIdsRef = useRef(new Set());

  useEffect(() => {
    if (course || cart.length === 0) {
      setCartCourses([]);
      fetchedIdsRef.current.clear();
      return;
    }

    // Remove courses no longer in cart
    const removedIds = [...fetchedIdsRef.current].filter(
      (id) => !cart.includes(id)
    );
    if (removedIds.length > 0) {
      removedIds.forEach((id) => fetchedIdsRef.current.delete(id));
      setCartCourses((prev) => prev.filter((c) => cart.includes(c.id)));
    }

    // Fetch only IDs we haven't fetched yet
    const newIds = cart.filter((id) => !fetchedIdsRef.current.has(id));
    if (newIds.length > 0) {
      // Mark as fetched immediately to prevent double-fetching
      newIds.forEach((id) => fetchedIdsRef.current.add(id));

      async function fetchNewCourses() {
        setLoading(true);
        try {
          const fetched = await Promise.all(
            newIds.map((id) => getCourseById(id))
          );
          setCartCourses((prev) => {
            const existingIds = new Set(prev.map((c) => c.id));
            const deduped = fetched.filter((c) => !existingIds.has(c.id));
            return [...prev, ...deduped];
          });
        } catch (error) {
          console.error("Failed to fetch cart courses:", error);
          // Roll back so they can be retried
          newIds.forEach((id) => fetchedIdsRef.current.delete(id));
        } finally {
          setLoading(false);
        }
      }
      fetchNewCourses();
    }
  }, [course, cart]);

  const coursesToCheckout = course ? [course] : cartCourses;

  const subtotal = coursesToCheckout.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  if (!course && (!cartLoaded || loading)) {
    return (
      <div className={styles.cart}>
        <p>Loading cart...</p>
      </div>
    );
  }

  if (!course && cart.length === 0) {
    return (
      <div className={styles.cart}>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.cart}>
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.listWrapper}>
        <div className={styles.list}>
          {coursesToCheckout.map((c) => (
            <CartCard key={c.id} course={c} />
          ))}
        </div>
      </div>

      <Summary subtotal={subtotal} courses={coursesToCheckout} />
    </div>
  );
}
