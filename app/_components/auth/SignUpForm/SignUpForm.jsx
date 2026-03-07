"use client";

import { useMediaQuery } from "@mui/material";
import styles from "./SignUpForm.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { register as registerUser } from "@/app/_lib/auth-service";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const lg = useMediaQuery("(min-width: 1200px)");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisibleB, setPasswordVisibleB] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
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

  const onSubmit = async (data) => {
    setError("");
    setIsSubmitting(true);

    try {
      const userData = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
      };

      const response = await registerUser(userData);

      router.push("/login");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.form}>
        {error && (
          <div
            style={{
              padding: "12px",
              marginBottom: "20px",
              backgroundColor: "#fee",
              color: "#c00",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ marginBottom: "26px" }}>
          <p className={styles.label}>
            First name <span>*</span>
          </p>
          <input
            type="text"
            id="firstName"
            {...register("firstName", {
              required: "First name is required",
            })}
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <p style={{ color: "#c00", fontSize: "14px", marginTop: "4px" }}>
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "26px" }}>
          <p className={styles.label}>
            Last name <span>*</span>
          </p>
          <input
            type="text"
            id="lastName"
            {...register("lastName", {
              required: "Last name is required",
            })}
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <p style={{ color: "#c00", fontSize: "14px", marginTop: "4px" }}>
              {errors.lastName.message}
            </p>
          )}
        </div>

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

        <div style={{ marginBottom: "26px" }}>
          <p className={styles.label}>
            Password <span>*</span>
          </p>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
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
            <p style={{ color: "#c00", fontSize: "14px", marginTop: "4px" }}>
              {errors.password.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "26px" }}>
          <p className={styles.label}>
            Confirm Password <span>*</span>
          </p>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
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
            <p style={{ color: "#c00", fontSize: "14px", marginTop: "4px" }}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          className={`filled ${styles.submit}`}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <p>
            {isSubmitting ? "Creating Account..." : "Create Professco Account"}
          </p>
        </button>

        <button className={styles.google} type="button">
          <p className="semiboldFont">Use Google Instead</p>
          <img
            src="/images/google-logo.svg"
            alt="logo"
            className={styles.logo}
          />
        </button>
      </div>

      {lg && (
        <img src="/images/graduation.png" alt="grad" className={styles.grad} />
      )}
    </div>
  );
}
