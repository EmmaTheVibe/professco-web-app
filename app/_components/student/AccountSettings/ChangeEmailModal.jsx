"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Modal from "@/app/_components/common/Modal/Modal";
import Loader from "@/app/_components/common/Loader/Loader";
import useAuthStore from "@/app/_utils/auth-store";
import {
  confirmNewEmail,
  requestNewEmailCode,
  requestOldEmailCode,
  verifyOldEmailCode,
} from "@/app/_lib/auth-service";
import styles from "./UpdateProfileModal.module.css";

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function onlyDigits(value) {
  return value.replace(/\D/g, "").slice(0, 6);
}

// Steps: confirm current email -> verify its code -> enter new email -> verify its code.
function ChangeEmailForm({ onClose }) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const router = useRouter();

  const [step, setStep] = useState("start");
  const [oldOtp, setOldOtp] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newOtp, setNewOtp] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState("");

  async function run(action) {
    setIsBusy(true);
    setError("");
    try {
      await action();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsBusy(false);
    }
  }

  function resend(request) {
    run(async () => {
      await request();
      toast.success("A new code has been sent.");
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (step === "start") {
      run(async () => {
        await requestOldEmailCode();
        setStep("verifyOld");
      });
    } else if (step === "verifyOld") {
      if (oldOtp.length !== 6) return setError("Enter the 6-digit code.");
      run(async () => {
        await verifyOldEmailCode(oldOtp);
        setStep("newEmail");
      });
    } else if (step === "newEmail") {
      const email = newEmail.trim();
      if (!EMAIL_PATTERN.test(email)) return setError("Enter a valid email address.");
      if (email.toLowerCase() === user?.email?.toLowerCase()) {
        return setError("That's already your email address.");
      }
      run(async () => {
        await requestNewEmailCode(email);
        setNewEmail(email);
        setNewOtp("");
        setStep("verifyNew");
      });
    } else if (step === "verifyNew") {
      if (newOtp.length !== 6) return setError("Enter the 6-digit code.");
      run(async () => {
        const response = await confirmNewEmail(newEmail, newOtp);

        if (response.signedOut) {
          toast.success("Email changed. Please log in again.");
          clearUser();
          router.replace("/login");
          return;
        }

        setUser(response.user || { ...user, email: newEmail });
        toast.success(response.message || "Your email has been updated.");
        onClose();
      });
    }
  }

  const buttonLabel = {
    start: "Send code",
    verifyOld: "Verify code",
    newEmail: "Send code",
    verifyNew: "Confirm new email",
  }[step];

  return (
    <form className={styles.body} onSubmit={handleSubmit}>
      {step === "start" && (
        <>
          <p className={`boldFont ${styles.sectionTitle}`}>Confirm it&apos;s you</p>
          <p className={styles.sectionDesc}>
            We&apos;ll send a 6-digit code to <strong>{user?.email}</strong>.
          </p>
        </>
      )}

      {step === "verifyOld" && (
        <>
          <p className={`boldFont ${styles.sectionTitle}`}>Enter the code</p>
          <p className={styles.sectionDesc}>
            We sent a code to <strong>{user?.email}</strong>.
          </p>
          <div className={styles.fieldGroup}>
            <p className={styles.label}>
              Code <span>*</span>
            </p>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="123456"
              value={oldOtp}
              onChange={(e) => setOldOtp(onlyDigits(e.target.value))}
              disabled={isBusy}
              autoFocus
            />
          </div>
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => resend(requestOldEmailCode)}
            disabled={isBusy}
          >
            Resend code
          </button>
        </>
      )}

      {step === "newEmail" && (
        <>
          <p className={`boldFont ${styles.sectionTitle}`}>Enter your new email</p>
          <p className={styles.sectionDesc}>
            We&apos;ll send a code to this address to confirm it.
          </p>
          <div className={styles.fieldGroup}>
            <p className={styles.label}>
              New email <span>*</span>
            </p>
            <input
              type="email"
              placeholder="you@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={isBusy}
              autoFocus
            />
          </div>
        </>
      )}

      {step === "verifyNew" && (
        <>
          <p className={`boldFont ${styles.sectionTitle}`}>Confirm your new email</p>
          <p className={styles.sectionDesc}>
            We sent a code to <strong>{newEmail}</strong>.
          </p>
          <div className={styles.fieldGroup}>
            <p className={styles.label}>
              Code <span>*</span>
            </p>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="123456"
              value={newOtp}
              onChange={(e) => setNewOtp(onlyDigits(e.target.value))}
              disabled={isBusy}
              autoFocus
            />
          </div>
          <div className={styles.linkRow}>
            <button
              type="button"
              className={styles.linkButton}
              onClick={() => resend(() => requestNewEmailCode(newEmail))}
              disabled={isBusy}
            >
              Resend code
            </button>
            <button
              type="button"
              className={styles.linkButton}
              onClick={() => {
                setError("");
                setStep("newEmail");
              }}
              disabled={isBusy}
            >
              Use a different email
            </button>
          </div>
        </>
      )}

      {error && <p className={styles.fieldError}>{error}</p>}

      <button type="submit" className={`filled ${styles.save}`} disabled={isBusy}>
        {isBusy ? <Loader /> : <p>{buttonLabel}</p>}
      </button>
    </form>
  );
}

export default function ChangeEmailModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
      <div className={styles.header}>
        <p className={`boldFont ${styles.title}`}>Change email address</p>
      </div>
      <ChangeEmailForm onClose={onClose} />
    </Modal>
  );
}
