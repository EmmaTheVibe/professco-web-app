import BottomBanner from "@/app/_components/layout/BottomBanner/BottomBanner";
import styles from "./ResetPassword.module.css";
import ResetPasswordForm from "../_components/auth/ResetPasswordForm/ResetPasswordForm";

export default function UpdatePassword() {
  return (
    <section className={styles.reset}>
      <section className={styles.main}>
        <div className="container">
          <div className={styles.frame}>
            <div>
              <p style={{ color: "#4B5563" }}>Password Reset</p>
              <h1 className="boldFont">Please input your new password</h1>
              <p className={`lightFont ${styles.desc}`}></p>
            </div>
            <ResetPasswordForm />
          </div>
        </div>
      </section>
      <div className={styles.box}>
        <BottomBanner />
      </div>
    </section>
  );
}
