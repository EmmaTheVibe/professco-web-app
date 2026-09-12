"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Loader from "@/app/_components/common/Loader/Loader";
import useAuthStore from "@/app/_utils/auth-store";
import { verifyPayment } from "@/app/_lib/payment-service";
import styles from "./CheckoutCallback.module.css";

export default function CheckoutCallback() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [status, setStatus] = useState("loading");

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
        <Link href={isAuthenticated ? "/student/my-courses" : "/login"}>
          <button className="filled">
            <p>{isAuthenticated ? "Go to My Courses" : "Log in to continue"}</p>
          </button>
        </Link>
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
