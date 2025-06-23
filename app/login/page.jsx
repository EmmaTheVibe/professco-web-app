"use client";
import BackButton from "@/app/_components/BackButton/BackButton";
import BottomBanner from "@/app/_components/BottomBanner/BottomBanner";
import LoginForm from "@/app/_components/LoginForm/LoginForm";
import styles from "./Login.module.css";
import { useMediaQuery } from "@mui/material";

export default function Login() {
  const lg = useMediaQuery("(min-width: 1200px)");

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
            {lg && (
              <img
                src="/images/graduation.png"
                alt="grad"
                className={styles.grad}
              />
            )}
          </div>
        </div>
      </section>
      <div className={styles.box}>
        <BottomBanner />
      </div>
    </section>
  );
}
