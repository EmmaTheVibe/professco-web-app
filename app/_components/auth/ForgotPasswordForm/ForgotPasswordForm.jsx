"use client";
import styles from "./ForgotPasswordForm.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { forgotPassword } from "@/app/_lib/auth-service";
import Loader from "@/app/_components/common/Loader/Loader";

export default function ForgotPasswordForm({ onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await forgotPassword({ email: data.email });
      toast.success(
        response.message ||
          "Password reset link sent. Please check your email.",
      );
      reset();
      if (response.nonce_key) {
        onSuccess?.(data.email);
      }
    } catch (err) {
      toast.error(err.message || "Failed to send reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "26px" }}>
          <p className={styles.label}>
            Email <span>*</span>
          </p>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              disabled={isSubmitting}
            />
            <img
              src="/images/form-icon-mail.svg"
              alt="icon"
              className={styles.icon}
            />
          </div>
          {errors.email && (
            <p style={{ color: "#c00", fontSize: "14px", marginTop: "4px" }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`filled ${styles.submit}`}
          disabled={isSubmitting}
        >
          <p>{isSubmitting ? <Loader /> : "Get Reset Link"}</p>
        </button>
      </form>

      <img src="/images/graduation.png" alt="grad" className={styles.grad} />
    </div>
  );
}
