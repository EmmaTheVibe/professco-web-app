"use client";
import useCartStore from "@/app/_utils/cart-store";
import { formatAmount } from "@/app/_lib/fns";
import styles from "../Cart.module.css";

export default function CartCard({ course }) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className={styles.cartCard}>
      <div className={styles.thumbnail}>
        <img src={course.cover_image} alt="thumbnail" />
      </div>
      <div className={styles.infobox}>
        <div className={styles.top}>
          <p className={`${styles.courseTitle} boldFont`}>{course.title}</p>

          <div className={styles.rating}>
            <img
              src="/images/blackstar.svg"
              alt="star"
              className={styles.blackstar}
            />
            <p style={{ fontSize: "14px", lineHeight: "20px" }}>
              {course.cache_rating} ({course.reviews_count} review
              {course.reviews_count !== 1 && "s"})
            </p>
          </div>
        </div>

        <div className={styles.base}>
          <img
            src="/images/cart-delete.svg"
            alt="delete"
            style={{ cursor: "pointer" }}
            onClick={() => removeFromCart(course.id)}
          />
          <p className={`${styles.price} boldFont`}>
            ₦{formatAmount(course.amount)}
          </p>
        </div>
      </div>
    </div>
  );
}
