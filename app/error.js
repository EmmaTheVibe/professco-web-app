"use client";
import styles from "./Error.module.css";

export default function Error() {
  return (
    <section className={styles.error}>
      <div className="container">
        <h1 className="boldFont">
          <span style={{ color: "#e65539" }}>Error</span> <br /> Something went
          wrong.
        </h1>
      </div>
    </section>
  );
}
