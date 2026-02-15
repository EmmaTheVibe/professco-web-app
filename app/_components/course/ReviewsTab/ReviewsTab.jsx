"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import LiveRating from "@/app/_components/course/LiveRating/LiveRating";
import styles from "./ReviewsTab.module.css";
import { useState } from "react";

export default function ReviewsTab({ course }) {
  const [currentRating, setCurrentRating] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const comment = watch("comment", "");

  const wordCount =
    comment.trim() === "" ? 0 : comment.trim().split(/\s+/).length;

  const onSubmit = (data) => {
    reset();
    setCurrentRating(0);
  };

  return (
    <div className={styles.reviewsTab}>
      <div className={styles.top}>
        <h1 className={`boldFont ${styles.heading}`}>Leave a review</h1>
        <LiveRating
          currentRating={currentRating}
          setCurrentRating={setCurrentRating}
        />
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
        <h1 className={`boldFont ${styles.heading}`}>
          Reviews ({course.reviews_count})
        </h1>
        <div className={styles.grid}>
          {course.reviews.map((review) => (
            <div className={styles.card} key={review.id}>
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
              <p className={styles.reviewTxt}>{review.comment}</p>
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
