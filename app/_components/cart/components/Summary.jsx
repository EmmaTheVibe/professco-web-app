"use client";

import { formatAmount } from "@/app/_lib/fns";
import styles from "../Cart.module.css";
import OTPModal from "@/app/_components/auth/OTPModal/OTPModal";
import { useState } from "react";
import useAuthStore from "@/app/_utils/auth-store";
import {
  initiatePayment,
  initiateMultiplePayment,
} from "@/app/_lib/payment-service";

export default function Summary({ subtotal, courses }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const discount = 0;
  const total = subtotal - discount;

  const handlePayment = async () => {
    if (isAuthenticated) {
      await processPayment();
    } else {
      setShowOTPModal(true);
    }
  };

  const processPayment = async (guestEmail = null) => {
    setIsProcessing(true);

    try {
      let response;

      if (courses.length === 1) {
        response = await initiatePayment(courses[0].id, guestEmail);
      } else {
        const courseIds = courses.map((c) => c.id);
        response = await initiateMultiplePayment(courseIds, guestEmail);
      }

      if (response.authorization_url) {
        window.location.href = response.authorization_url;
      }
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment initiation failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.summary}>
      <h2>Order Summary</h2>
      <div className={styles.priceLine}>
        <p>
          <span className="semiboldFont">Subtotal</span>
        </p>
        <p className={`${styles.subtotal} boldFont`}>
          ₦{formatAmount(subtotal)}
        </p>
      </div>
      <div className={styles.priceLine}>
        <p>
          <span className="semiboldFont">Discount</span>
        </p>
        <p className={`${styles.discount} boldFont`}>
          ₦{formatAmount(discount)}
        </p>
      </div>
      <div className={styles.inputBox}>
        <img src="/images/discount-tag.svg" alt="tag" />
        <input
          type="text"
          placeholder="Discount Code"
          name="discountCode"
          id="discountCode"
        />
      </div>
      <button className={`${styles.applyBtn} btn-dark`}>
        <p className="semiboldFont">Apply</p>
      </button>
      <div className={styles.totalBox}>
        <p className="boldFont">Total</p>
        <p className="boldFont">
          <span>₦{formatAmount(total)}</span>
        </p>
      </div>
      <button
        className={`${styles.payBtn} filled`}
        onClick={handlePayment}
        disabled={isProcessing}
      >
        <p className="semiboldFont">
          {isProcessing ? "Processing..." : `Pay ₦${formatAmount(total)}`}
        </p>
      </button>
      <p className={styles.note}>
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our privacy policy.
      </p>

      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerified={(email) => {
          setShowOTPModal(false);
          processPayment(email);
        }}
      />
    </div>
  );
}
