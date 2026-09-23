"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/app/_components/common/Loader/Loader";
import useAuthStore from "@/app/_utils/auth-store";
import { verifyPayment } from "@/app/_lib/payment-service";
import styles from "./CheckoutCallback.module.css";

const REDIRECT_SECONDS = 5;

export default function CheckoutCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [status, setStatus] = useState("loading");
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);

  const redirectHref = isAuthenticated ? "/student/my-courses" : "/login";

  useEffect(() => {
    if (!reference) {
      setStatus("failed");
      return;
    }

    let isMounted = true;

    verifyPayment(reference)
      .then((response) => {
        if (!isMounted) return;
        setStatus(
          response?.data?.payment_status === "completed" ? "success" : "failed",
        );
      })
      .catch(() => {
        if (isMounted) setStatus("failed");
      });

    return () => {
      isMounted = false;
    };
  }, [reference]);

  useEffect(() => {
    if (status !== "success") return;

    if (countdown <= 0) {
      router.push(redirectHref);
      return;
    }

    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, countdown, router, redirectHref]);

  if (status === "loading") {
    return (
      <div className={styles.card}>
        <Loader variant="dark" />
        <p className={`semiboldFont ${styles.heading}`}>
          Confirming your payment...
        </p>
        <p className={styles.desc}>This will only take a moment.</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className={styles.card}>
        <div className={`${styles.iconCircle} ${styles.circleGreen}`}>
          <img src="/images/success-tick.svg" alt="" className={styles.icon} />
        </div>
        <p className={`boldFont ${styles.heading}`}>Payment Successful!</p>
        <p className={styles.desc}>
          Your purchase is confirmed. You can start learning right away.
        </p>
        <p className={styles.redirectNote}>
          This page will redirect in {countdown}s...
          <br />
          Failed to redirect?{" "}
          <Link href={redirectHref} className={styles.redirectLink}>
            Click here
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={`${styles.iconCircle} ${styles.circleRed}`}>
        <img src="/images/error-tick.svg" alt="" className={styles.icon} />
      </div>
      <p className={`boldFont ${styles.heading}`}>Payment Failed</p>
      <p className={styles.desc}>
        We couldn't confirm your payment. If you were charged, please contact
        support.
      </p>
      <Link href={isAuthenticated ? "/student/checkout" : "/checkout"}>
        <button className="filled">
          <p>Try Again</p>
        </button>
      </Link>
    </div>
  );
}
