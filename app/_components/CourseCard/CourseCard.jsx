import Link from "next/link";
import styles from "./CourseCard.module.css";
import { formatAmount } from "@/app/_lib/fns";

export default function CourseCard({ courseItem }) {
  return (
    <div>
      <Link
        href={`/courses/${courseItem.exam_body?.slug.toLowerCase()}/${encodeURIComponent(
          courseItem.title?.toLowerCase().replace(/\s+/g, "-")
        )}/${courseItem.id}`}
      >
        <div className={styles.courseCard}>
          <div className={styles.preview}>
            <img
              src={courseItem.cover_image}
              alt="thumbnail"
              className={styles.thumbnail}
            />
          </div>
          <div className={styles.courseInfo}>
            <p className={styles.courseTitle}>{courseItem.title}</p>
            <div className={styles.line}>
              <div className={styles.courseType}>
                <p className="semiboldFont">{courseItem.exam_body?.slug}</p>
              </div>
              <div className={styles.coursePrice}>
                <p className="semiboldFont">
                  ₦{formatAmount(courseItem.amount)}
                </p>
              </div>
            </div>

            <div className={styles.rating}>
              <img
                src="/images/blackstar.svg"
                alt="star"
                className={styles.blackstar}
              />
              <p style={{ fontSize: "14px", lineHeight: "20px" }}>
                {courseItem.cache_rating} ({courseItem.reviews_count} review
                {courseItem.reviews_count !== 1 && "s"})
              </p>
            </div>
            <p className={`truncate ${styles.courseDesc}`}>
              {courseItem.description}
            </p>
            <div className={styles.tags}>
              {courseItem.tags?.map((tag) => (
                <div
                  key={tag.id}
                  className={`semiboldFont ${styles.tag}`}
                  style={{ backgroundColor: `${tag.color}` }}
                >
                  <p>{tag.name}</p>
                </div>
              ))}
            </div>

            <button className={`outlined ${styles.btn}`}>
              <p>Purchase course</p>
              <img src="/images/cart.svg" alt="cart" className={styles.cart} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
