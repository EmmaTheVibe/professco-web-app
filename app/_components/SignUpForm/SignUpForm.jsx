"use client";

import styles from "./SignUpForm.module.css";
import { useState } from "react";

export default function SignUpForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [passwordVisibleB, setPasswordVisibleB] = useState(false);

  const toggleVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const toggleVisibilityB = () => {
    setPasswordVisibleB((prevState) => !prevState);
  };

  return (
    <form className={styles.form}>
      <div style={{ marginBottom: "26px" }}>
        <p className={styles.label}>
          Name <span>*</span>
        </p>
        <input type="text" id="name" />
      </div>
      <div style={{ marginBottom: "26px" }}>
        <p className={styles.label}>
          Email <span>*</span>
        </p>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input type="text" id="email" />
          <img
            src="/images/form-icon-mail.svg"
            alt="icon"
            className={styles.icon}
          />
        </div>
      </div>
      <div style={{ marginBottom: "26px" }}>
        <p className={styles.label}>
          Password <span>*</span>
        </p>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input type={passwordVisible ? "text" : "password"} id="password" />
          <img
            src="/images/form-icon-visibility-off.svg"
            alt="icon"
            onClick={toggleVisibility}
            className={styles.icon}
          />
        </div>
      </div>
      <div style={{ marginBottom: "26px" }}>
        <p className={styles.label}>
          Confirm Password <span>*</span>
        </p>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type={passwordVisibleB ? "text" : "password"}
            id="confPassword"
          />
          <img
            src="/images/form-icon-visibility-off.svg"
            alt="icon"
            onClick={toggleVisibilityB}
            className={styles.icon}
          />
        </div>
      </div>
      <button className={`filled ${styles.submit}`}>
        <p>Create Professco Account</p>
      </button>
      <button className={styles.google}>
        <p className="semiboldFont">Use Google Instead</p>
        <img src="/images/google-logo.svg" alt="logo" className={styles.logo} />
      </button>
    </form>
  );
}
