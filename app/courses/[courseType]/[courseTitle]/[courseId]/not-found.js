import styles from "./NotFound.module.css";
export default function NotFound() {
  return (
    <section className={styles.notfound}>
      <div className="container">
        <h1 className="boldFont">
          <span style={{ color: "#e65539" }}>404</span> <br /> Course not found.
        </h1>
      </div>
    </section>
  );
}
