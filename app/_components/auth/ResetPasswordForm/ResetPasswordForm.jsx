"use client";

import styles from "./ResetPasswordForm.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/app/_lib/auth-service";
import Loader from "@/app/_components/common/Loader/Loader";

export default function ResetPasswordForm({
  email,
  onSuccess,
  onRequestNewOtp,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisibleB, setPasswordVisibleB] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm(
    // { mode: "onTouched" }
    { mode: "onChange" },
  );

  const password = watch("password");

  const toggleVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const toggleVisibilityB = () => {
    setPasswordVisibleB((prevState) => !prevState);
  };

  const router = useRouter();

  const handleRequestNewOtp = async () => {
    setError("");
    setSuccessMessage("");
    setIsCancelling(true);

    try {
      const response = await fetch("/api/auth/reset-password/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to request a new OTP.");
      }

      onRequestNewOtp?.();
    } catch (err) {
      setError(err.message || "Unable to request a new OTP. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  };

  const onSubmit = async (data) => {
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await resetPassword({
        email,
        otp: data.otp,
        password: data.password,
      });

      setSuccessMessage(response.message || "Password reset successfully.");
      reset();
      onSuccess?.();
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
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

        <div className={styles.fieldGroup}>
          <p className={styles.label}>
            OTP <span>*</span>
          </p>
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="otp"
              {...register("otp", {
                required: "OTP is required",
                minLength: {
                  value: 6,
                  message: "OTP must be 6 digits",
                },
                maxLength: {
                  value: 6,
                  message: "OTP must be 6 digits",
                },
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "OTP must contain only digits",
                },
              })}
              disabled={isSubmitting}
            />
          </div>
          {errors.otp && (
            <p className={styles.fieldError}>{errors.otp.message}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <p className={styles.label}>
            Password <span>*</span>
          </p>
          <div className={styles.inputGroup}>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
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
              onClick={toggleVisibility}
              className={styles.icon}
              style={{ cursor: "pointer" }}
            />
          </div>
          {errors.password && (
            <p className={styles.fieldError}>{errors.password.message}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <p className={styles.label}>
            Confirm Password <span>*</span>
          </p>
          <div className={styles.inputGroup}>
            <input
              type={passwordVisibleB ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              disabled={isSubmitting}
            />
            <img
              src="/images/form-icon-visibility-off.svg"
              alt="icon"
              onClick={toggleVisibilityB}
              className={styles.icon}
              style={{ cursor: "pointer" }}
            />
          </div>
          {errors.confirmPassword && (
            <p className={styles.fieldError}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`filled ${styles.submit}`}
          disabled={isSubmitting}
        >
          <p>{isSubmitting ? <Loader /> : "Proceed"}</p>
        </button>

        <button
          type="button"
          className={styles.secondaryAction}
          onClick={handleRequestNewOtp}
          disabled={isCancelling || isSubmitting}
        >
          {isCancelling ? "Requesting new OTP..." : "Request new OTP"}
        </button>
      </form>

      <img src="/images/graduation.png" alt="grad" className={styles.grad} />
    </div>
  );
}
