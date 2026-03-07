"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./LoginForm.module.css";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useForm } from "react-hook-form";
import { login as loginUser } from "@/app/_lib/auth-service";
import useAuthStore from "@/app/_utils/auth-store";

export default function LoginForm() {
  const setUser = useAuthStore((state) => state.setUser);

  const lg = useMediaQuery("(min-width: 1200px)");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const toggleVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const onSubmit = async (data) => {
    setError("");
    setIsSubmitting(true);

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      setUser(response.profile);

      router.push(redirectPath || "/");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
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

        <button
          className={`filled ${styles.submit}`}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <p>{isSubmitting ? "Logging in..." : "Login"}</p>
        </button>

        <button className={styles.google} type="button">
          <p className="semiboldFont">Use Google Instead</p>
          <img
            src="/images/google-logo.svg"
            alt="logo"
            className={styles.logo}
          />
        </button>

        <p className={styles.txt}>
          Don't have an account, create one{" "}
          <Link href="/signup">
            <span>here</span>
          </Link>
        </p>
      </div>

      {lg && (
        <img src="/images/graduation.png" alt="grad" className={styles.grad} />
      )}
    </div>
  );
}
