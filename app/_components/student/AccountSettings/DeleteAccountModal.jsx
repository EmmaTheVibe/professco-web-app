"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Modal from "@/app/_components/common/Modal/Modal";
import Loader from "@/app/_components/common/Loader/Loader";
import useAuthStore from "@/app/_utils/auth-store";
import { deleteAccount } from "@/app/_lib/auth-service";
import styles from "./DeleteAccountModal.module.css";

function DeleteAccountForm({ onClose }) {
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);

  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!password) return setError("Enter your password to confirm.");

    setIsDeleting(true);
    setError("");

    try {
      await deleteAccount(password);
      clearUser();
      toast.success("Your account has been deleted.");
      router.replace("/");
    } catch (err) {
      setError(err.message || "Failed to delete account. Please try again.");
      setIsDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.badge}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2 className={`boldFont ${styles.title}`}>Delete account</h2>
      <p className={styles.description}>
        This permanently deletes your Professco account. You&apos;ll lose access
        to your courses and can&apos;t undo this. Enter your password to
        confirm.
      </p>

      <div className={styles.inputGroup}>
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isDeleting}
          autoFocus
        />
        <img
          src={
            passwordVisible
              ? "/images/form-icon-visibility.svg"
              : "/images/form-icon-visibility-off.svg"
          }
          alt="Toggle password visibility"
          onClick={() => setPasswordVisible((v) => !v)}
          className={styles.icon}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={onClose}
          disabled={isDeleting}
        >
          <p>Cancel</p>
        </button>
        <button type="submit" className={styles.deleteBtn} disabled={isDeleting}>
          {isDeleting ? <Loader /> : <p>Delete account</p>}
        </button>
      </div>
    </form>
  );
}

export default function DeleteAccountModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
      <DeleteAccountForm onClose={onClose} />
    </Modal>
  );
}
