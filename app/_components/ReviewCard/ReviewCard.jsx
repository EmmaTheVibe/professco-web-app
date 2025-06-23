import styles from "./ReviewCard.module.css";
export default function ReviewCard() {
  return (
    <div
      className={styles.ReviewCard}
      style={{
        padding: "22px 16px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0px 16px 30px 2px rgba(29, 32, 37, 0.1)",
      }}
    >
      <div style={{ display: "flex", marginBottom: "24px" }}>
        {[...Array(5)].map((_, index) => (
          <img
            key={index}
            src="/images/greenstar.svg"
            alt="star"
            style={{
              width: "13.1px",
              height: "12.38px",
              marginRight: "2.62px",
            }}
          />
        ))}
      </div>
      <p style={{ marginBottom: "24px" }} className="lightFont">
        &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse varius enim in eros elementum tristique. Duis cursus, mi
        quis viverra ornare.&quot;
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
          <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: "20px" }}>
            State, Country
          </p>
        </div>
      </div>
    </div>
  );
}
