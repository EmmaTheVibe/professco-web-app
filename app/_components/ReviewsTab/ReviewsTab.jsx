"use client";
import Link from "next/link";
import LiveRating from "../LiveRating/LiveRating";
import styles from "./ReviewsTab.module.css";
export default function ReviewsTab() {
  return (
    <div className={styles.reviewsTab}>
      <div className={styles.top}>
        <h1 className={`boldFont ${styles.heading}`}>Leave a review</h1>
        <LiveRating />
        <form className={styles.form}>
          <div className={styles.line}>
            <p className={`${styles.label} semiboldFont`}>
              Comment <span className={styles.star}>*</span>
            </p>
            <p className={styles.count}>
              <span>0</span>/100
            </p>
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <textarea id="comment" placeholder="Comment" />
          </div>

          <button className="filled">
            <p>Submit Review</p>
          </button>

          <p className={styles.txt}>
            Don’t have an account, create one{" "}
            <Link href="/signup">
              <span>here</span>
            </Link>
          </p>
        </form>
      </div>
      <div className={styles.bottom}>
        <h1 className={`boldFont ${styles.heading}`}>Reviews</h1>
        <div className={styles.grid}>
          {[...Array(3)].map((_, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, index) => (
                  <img
                    key={index}
                    src="/images/filled-black-star.svg"
                    alt="star"
                    style={{
                      width: "13.1px",
                      height: "12.38px",
                      marginRight: "2.62px",
                    }}
                  />
                ))}
              </div>
              <p className={styles.reviewTxt}>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare."
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="/images/reviewavatar.svg"
                  alt="avatar"
                  style={{ marginRight: "20px" }}
                />
                <div>
                  <p
                    style={{ fontSize: "14px", lineHeight: "20px" }}
                    className="semiboldFont"
                  >
                    Name Surname
                  </p>
                  <p
                    style={{
                      color: "#6B7280",
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
                  >
                    ICAN Student
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
