import BackButton from "@/app/_components/navigation/BackButton/BackButton";
import BottomBanner from "@/app/_components/layout/BottomBanner/BottomBanner";
import LoginForm from "@/app/_components/auth/LoginForm/LoginForm";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <section className={styles.login}>
      <section className={styles.main}>
        <div className="container">
          <BackButton />
          <div className={styles.frame}>
            <div>
              <p style={{ color: "#4B5563" }}>Create account</p>
              <h1 className="boldFont">Hey, welcome back to professco</h1>
              <p className={`lightFont ${styles.desc}`}>
                We’ve got courses for every professional exam
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </section>
      <div className={styles.box}>
        <BottomBanner />
      </div>
    </section>
  );
}
