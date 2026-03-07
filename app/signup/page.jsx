import BackButton from "@/app/_components/navigation/BackButton/BackButton";
import BottomBanner from "@/app/_components/layout/BottomBanner/BottomBanner";
import SignUpForm from "@/app/_components/auth/SignUpForm/SignUpForm";
import styles from "./SignUp.module.css";

export default function SignUp() {
  return (
    <section className={styles.signup}>
      <section className={styles.main}>
        <div className="container">
          <BackButton />
          <div className={styles.frame}>
            <div className={styles.box}>
              <p style={{ color: "#4B5563" }}>Create account</p>
              <h1 className={`boldFont ${styles.title}`}>
                Awesome, let’s help you prepare for your exam
              </h1>
              <p className={`lightFont ${styles.desc}`}>
                We’ve got courses for every professional exam
              </p>
            </div>
            <SignUpForm />
          </div>
        </div>
      </section>
      <div className={styles.boxB}>
        <BottomBanner />
      </div>
    </section>
  );
}
