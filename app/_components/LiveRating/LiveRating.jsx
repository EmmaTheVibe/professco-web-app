"use client";

import { useState } from "react";
import styles from "./LiveRating.module.css";

export default function LiveRating({ currentRating, setCurrentRating }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseMove = (event, starValue) => {
    const starRect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - starRect.left;

    const isHalf = x < starRect.width / 2;

    if (isHalf) {
      setHoverRating(starValue - 0.5);
    } else {
      setHoverRating(starValue);
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (event, starValue) => {
    const starRect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - starRect.left;
    const isHalf = x < starRect.width / 2;

    if (isHalf) {
      setCurrentRating(starValue - 0.5);
    } else {
      setCurrentRating(starValue);
    }
  };

  const displayRating = hoverRating || currentRating;

  const formatRatingText = (rating) => {
    if (rating % 1 === 0) {
      return rating.toString();
    }
    return rating.toFixed(1);
  };

  return (
    <div className={styles.ratingContainer}>
      <div className={styles.starsWrapper} onMouseLeave={handleMouseLeave}>
        {[1, 2, 3, 4, 5].map((starValue) => {
          let starType = "empty";

          if (displayRating >= starValue) {
            starType = "full";
          } else if (displayRating >= starValue - 0.5) {
            starType = "half";
          }

          const imgSrc = `/images/ratingstar${starType}.svg`;

          return (
            <img
              key={starValue}
              src={imgSrc}
              alt={`${starType} star`}
              className={styles.starIcon}
              onMouseMove={(e) => handleMouseMove(e, starValue)}
              onClick={(e) => handleClick(e, starValue)}
            />
          );
        })}
      </div>

      <p className={`boldFont ${styles.ratingText}`}>
        {formatRatingText(currentRating)}/5
      </p>
    </div>
  );
}
