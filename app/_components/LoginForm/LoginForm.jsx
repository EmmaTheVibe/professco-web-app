"user client";
import Link from "next/link";
import styles from "./LoginForm.module.css";
import { useState } from "react";

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // const { goToSignup } = useContexts();

  const toggleVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <form className={styles.form}>
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
      <button className={`filled ${styles.submit}`}>
        <p>Login</p>
      </button>
      <button className={styles.google}>
        <p className="semiboldFont">Use Google Instead</p>
        <img src="/images/google-logo.svg" alt="logo" className={styles.logo} />
      </button>
      <p className={styles.txt}>
        Don’t have an account, create one{" "}
        <Link href="/signup">
          <span>here</span>
        </Link>
      </p>
    </form>
  );
}
