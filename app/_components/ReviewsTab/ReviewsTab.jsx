"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import LiveRating from "../LiveRating/LiveRating";
import styles from "./ReviewsTab.module.css";

export default function ReviewsTab() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch the comment field to get real-time updates
  const comment = watch("comment", "");

  // Count words (split by whitespace and filter out empty strings)
  const wordCount =
    comment.trim() === "" ? 0 : comment.trim().split(/\s+/).length;

  // Alternative: Count characters
  // const charCount = comment.length;

  const onSubmit = (data) => {
    console.log("Review submitted:", data);
    // Handle form submission here
  };

  return (
    <div className={styles.reviewsTab}>
      <div className={styles.top}>
        <h1 className={`boldFont ${styles.heading}`}>Leave a review</h1>
        <LiveRating />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.line}>
            <p className={`${styles.label} semiboldFont`}>
              Comment <span className={styles.star}>*</span>
            </p>
            <p
              className={`${
                wordCount > 100 ? styles.countError : styles.count
              }`}
            >
              <span>{wordCount}</span>/100
            </p>
          </div>

          <div className={styles.commentBox}>
            <textarea
              id="comment"
              placeholder="Comment"
              {...register("comment", {
                required: "Comment is required",
                validate: (value) => {
                  const words =
                    value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
                  if (words > 100) {
                    return "Comment cannot exceed 100 words";
                  }
                  return true;
                },
              })}
            />
            {errors.comment && (
              <p className={styles.error}>{errors.comment.message}</p>
            )}
          </div>

          <button className="filled" type="submit">
            <p>Submit Review</p>
          </button>

          <p className={styles.txt}>
            Don't have an account, create one{" "}
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
