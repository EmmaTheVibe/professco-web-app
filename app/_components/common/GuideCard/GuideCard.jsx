import styles from "./GuideCard.module.css";
import PropTypes from "prop-types";

export default function GuideCard({ guide }) {
  return (
    <div className={styles.guideCard}>
      <div className={styles.pic}>
        <img src={guide.banner} alt="banner" />
      </div>
      <div className={styles.info}>
        <p
          className="semiboldFont"
          style={{ fontSize: "20px", lineHeight: "30px" }}
        >
          {guide.title}
        </p>
        <p style={{ color: "#6B7280", margin: "12px 0 29px" }}>
          {guide.content}
        </p>
        <div style={{ display: "flex", width: "100%" }}>
          <img
            src={guide.avatar}
            alt="avatar"
            style={{ marginRight: "12px" }}
          />
          <div>
            <p
              className="semiboldFont"
              style={{ color: "#344054", fontSize: "14px", lineHeight: "20px" }}
            >
              {guide.posterName}
            </p>
            <p
              className="lightFont"
              style={{ color: "#9CA3AF", fontSize: "14px", lineHeight: "20px" }}
            >
              {guide.date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

GuideCard.propTypes = {
  guide: PropTypes.object.isRequired,
};
