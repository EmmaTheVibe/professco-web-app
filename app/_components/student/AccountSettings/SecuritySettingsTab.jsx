"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { changePassword } from "@/app/_lib/auth-service";
import Loader from "@/app/_components/common/Loader/Loader";
import styles from "./SecuritySettingsTab.module.css";

export default function SecuritySettingsTab() {
  const [currentVisible, setCurrentVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await changePassword({
        current_password: data.currentPassword,
        new_password: data.newPassword,
        new_password_confirmation: data.confirmPassword,
      });

      setSuccessMessage(response.message || "Password updated successfully.");
      reset();
    } catch (err) {
      setError(err.message || "Failed to update password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <div className={`${styles.message} ${styles.errorMessage}`}>
          {error}
        </div>
      )}
      {successMessage && (
        <div className={`${styles.message} ${styles.successMessage}`}>
          {successMessage}
        </div>
      )}

      <p className={`boldFont ${styles.sectionTitle}`}>Personal information</p>
      <p className={styles.sectionDesc}>
        You must enter at least 4 learning objectives or outcomes
      </p>

      <div className={styles.fieldGroup}>
        <p className={styles.label}>
          Current Password <span>*</span>
        </p>
        <div className={styles.inputGroup}>
          <input
            type={currentVisible ? "text" : "password"}
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            disabled={isSubmitting}
          />
          <img
            src="/images/form-icon-visibility-off.svg"
            alt="icon"
            onClick={() => setCurrentVisible((v) => !v)}
            className={styles.icon}
            style={{ cursor: "pointer" }}
          />
        </div>
        {errors.currentPassword && (
          <p className={styles.fieldError}>{errors.currentPassword.message}</p>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <p className={styles.label}>
          New Password <span>*</span>
        </p>
        <div className={styles.inputGroup}>
          <input
            type={newVisible ? "text" : "password"}
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            disabled={isSubmitting}
          />
          <img
            src="/images/form-icon-visibility-off.svg"
            alt="icon"
            onClick={() => setNewVisible((v) => !v)}
            className={styles.icon}
            style={{ cursor: "pointer" }}
          />
        </div>
        {errors.newPassword && (
          <p className={styles.fieldError}>{errors.newPassword.message}</p>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <p className={styles.label}>
          Confirm Password <span>*</span>
        </p>
        <div className={styles.inputGroup}>
          <input
            type={confirmVisible ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            disabled={isSubmitting}
          />
          <img
            src="/images/form-icon-visibility-off.svg"
            alt="icon"
            onClick={() => setConfirmVisible((v) => !v)}
            className={styles.icon}
            style={{ cursor: "pointer" }}
          />
        </div>
        {errors.confirmPassword && (
          <p className={styles.fieldError}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        className={`outlined ${styles.submit}`}
        disabled={isSubmitting}
      >
        <p>{isSubmitting ? <Loader variant="dark" /> : "Update password"}</p>
      </button>
    </form>
  );
}
