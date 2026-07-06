import Link from "next/link";
import BottomBanner from "@/app/_components/layout/BottomBanner/BottomBanner";
import PersonalizeForm from "@/app/_components/auth/PersonalizeForm/PersonalizeForm";
import styles from "./Personalize.module.css";

export default function Personalize() {
  return (
    <section className={styles.personalize}>
      <section className={styles.main}>
        <div className={`container ${styles.wrapper}`}>
          <div className={styles.topBar}>
            <Link href="/student" className={styles.close}>
              Close ✕
            </Link>
          </div>
          <div className={styles.frame}>
            <div>
              <p style={{ color: "#4B5563" }}>Let&apos;s get you started</p>
              <h1 className={`boldFont ${styles.title}`}>
                What exam are you preparing for?
              </h1>
              <p className={`lightFont ${styles.desc}`}>
                We&apos;ve got courses for every professional exam
              </p>
              <div className={styles.btnPC}>
                <Link href="/student">
                  <button className={`filled ${styles.btn}`}>
                    <p>Get Started</p>
                  </button>
                </Link>
              </div>
            </div>
            <PersonalizeForm />
            <div className={styles.btnMobile}>
              <Link href="/student">
                <button className={`filled ${styles.btn}`}>
                  <p>Get Started</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.box}>
        <BottomBanner />
      </div>
    </section>
  );
}
