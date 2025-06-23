import styles from "./Rating.module.css";

export default function Rating({ count, rating, dark = false }) {
  function roundToOneDecimal(rating) {
    return Math.round(rating * 10) / 10;
  }
  const roundedUpRating = roundToOneDecimal(rating);
  const fullStars = Math.floor(roundedUpRating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={styles.rating}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: "8px",
          width: "96px",
        }}
      >
        {/* Render full stars */}
        {[...Array(fullStars)].map((_, index) =>
          dark ? (
            <img
              key={`full-${index}`}
              src="/images/filled-black-star.svg"
              alt="Full Star"
            />
          ) : (
            <img
              key={`full-${index}`}
              src="/images/ratingstarfull.svg"
              alt="Full Star"
            />
          )
        )}

        {/* Render half star if needed */}
        {hasHalfStar && (
          <img src="/images/ratingstarhalf.svg" alt="Half Star" />
        )}

        {/* Render empty stars */}
        {[...Array(emptyStars)].map((_, index) =>
          dark ? (
            <img
              key={`empty-${index}`}
              src="/images/empty-black-star.svg"
              alt="Empty Star"
            />
          ) : (
            <img
              key={`empty-${index}`}
              src="/images/ratingstarempty.svg"
              alt="Empty Star"
            />
          )
        )}
      </div>
      {!dark && (
        <p>
          ({roundedUpRating} stars) • {count} review
          {count !== 1 && "s"}
        </p>
      )}
    </div>
  );
}
