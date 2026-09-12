"use client";

import { useEffect, useState } from "react";
import ForgotPasswordForm from "@/app/_components/auth/ForgotPasswordForm/ForgotPasswordForm";
import ResetPasswordForm from "@/app/_components/auth/ResetPasswordForm/ResetPasswordForm";
import Spinner from "@/app/_components/layout/Spinner/Spinner";
import useResetPasswordStore from "@/app/_utils/reset-password-store";
import styles from "./ForgotPasswordClient.module.css";
import BackButton from "../../navigation/BackButton/BackButton";
import BottomBanner from "../../layout/BottomBanner/BottomBanner";

export default function ForgotPasswordClient() {
  const [hydrated, setHydrated] = useState(false);
  const {
    email,
    hasRequestedReset,
    setEmail,
    setHasRequestedReset,
    loadState,
    clearResetState,
  } = useResetPasswordStore();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("resetPasswordState");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        const savedAt = Number(data?.savedAt ?? 0);
        const isExpired = Date.now() - savedAt > 60_000;

        if (
          isExpired ||
          !data?.email ||
          typeof data?.hasRequestedReset !== "boolean"
        ) {
          clearResetState();
        } else {
          loadState({
            email: data.email,
            hasRequestedReset: data.hasRequestedReset,
            savedAt,
          });
        }
      } catch {
        clearResetState();
      }
    }

    setHydrated(true);
  }, [clearResetState, loadState]);

  const handleForgotSuccess = (submittedEmail) => {
    setEmail(submittedEmail);
  };

  const handleResetSuccess = () => {
    clearResetState();
  };

  if (!hydrated) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  }

  return (
    <section className={styles.forgot}>
      <section className={styles.main}>
        <div className="container">
          {hasRequestedReset && email && <BackButton />}
          <div className={styles.frame}>
            <div>
              <p style={{ color: "#4B5563" }}>Password Reset</p>
              {hasRequestedReset && email ? (
                <h1 className="boldFont">Please input your new password</h1>
              ) : (
                <h1 className="boldFont">Please input your recovery email</h1>
              )}
              {!hasRequestedReset ? (
                <p className={`lightFont ${styles.desc}`}>
                  We’ll send you a link to reset your password.
                </p>
              ) : (
                <p className={`lightFont ${styles.desc}`}>
                  An OTP has been sent to{" "}
                  <span className={styles.emailHighlight}>{email}</span>
                </p>
              )}
            </div>
            {!hasRequestedReset && (
              <ForgotPasswordForm onSuccess={handleForgotSuccess} />
            )}
            {hasRequestedReset && email && (
              <ResetPasswordForm
                email={email}
                onSuccess={handleResetSuccess}
                onRequestNewOtp={handleResetSuccess}
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
