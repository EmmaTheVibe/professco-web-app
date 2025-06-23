import styles from "./ContactForm.module.css";

export default function ContactForm() {
  return (
    <form className={styles.form}>
      <div className={styles.pack}>
        <div style={{ marginBottom: "26px" }}>
          <p className={styles.label}>First Name</p>
          <input type="text" id="firstName" />
        </div>

        <div style={{ marginBottom: "26px" }}>
          <p className={styles.label}>Last Name</p>
          <input type="text" id="lastName" />
        </div>
      </div>

      <div style={{ marginBottom: "26px" }}>
        <p className={styles.label}>Email</p>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input type="text" id="email" />
        </div>
      </div>

      <div style={{ marginBottom: "26px" }}>
        <p className={styles.label}>Phone Number</p>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input type="tel" id="phone" />
        </div>
      </div>
      <div style={{ marginBottom: "26px" }}>
        <p className={styles.label}>Message</p>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <textarea placeholder="message"></textarea>
        </div>
      </div>

      <div
        style={{ marginBottom: "32px", display: "flex", alignItems: "center" }}
      >
        <input
          type="checkbox"
          id="checkbox"
          name="myCheckbox"
          className={styles.checkbox}
        />
        <label htmlFor="checkbox">
          <p style={{ color: "#475467" }}>
            You agree to our friendly privacy policy.
          </p>
        </label>
      </div>

      <button className={`filled ${styles.submit}`}>
        <p>Send</p>
      </button>
    </form>
  );
}
