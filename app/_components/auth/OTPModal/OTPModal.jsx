import { useState, useRef, useEffect } from "react";
import styles from "./OTPModal.module.css";
import { generateOTP, verifyOTP } from "@/app/_lib/otp-service";

export default function OTPModal({ isOpen, onClose, onVerified }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [nonceKey, setNonceKey] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      setStep(1);
      setEmail("");
      setOtp(["", "", "", "", "", ""]);
      setNonceKey("");
      setIsVerifying(false);
      setIsSending(false);
      setError("");

      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  const handleEmailSubmit = async () => {
    if (!email) return;

    setIsSending(true);
    setError("");

    try {
      const response = await generateOTP(email);
      console.log("OTP generated successfully:", response);

      // Store nonce_key from response
      if (response.nonce_key) {
        setNonceKey(response.nonce_key);
        setStep(2);
      } else {
        setError("Failed to get verification key");
      }
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setIsSending(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "") && index === 5) {
      handleVerifyOtp(newOtp);
    }
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEmailSubmit();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const digits = pastedData.split("").filter((char) => /^\d$/.test(char));

    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    setOtp(newOtp);

    if (digits.length === 6) {
      handleVerifyOtp(newOtp);
    } else if (digits.length > 0) {
      inputRefs.current[Math.min(digits.length, 5)]?.focus();
    }
  };

  const handleVerifyOtp = async (otpArray) => {
    setIsVerifying(true);
    setError("");
    const otpCode = otpArray.join("");

    try {
      const response = await verifyOTP(email, otpCode, nonceKey);
      console.log("OTP verified successfully:", response);

      // TODO: Handle login/signup + payment
      // For now, just close modal
      if (onVerified) {
        onVerified(response);
      } else {
        onClose();
      }
    } catch (err) {
      setError(err.message || "Invalid OTP");
      setOtp(["", "", "", "", "", ""]);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setIsSending(true);

    try {
      const response = await generateOTP(email);
      console.log("OTP resent successfully:", response);

      if (response.nonce_key) {
        setNonceKey(response.nonce_key);
      }
    } catch (err) {
      setError(err.message || "Failed to resend OTP");
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.line}>
          <button className={styles.closeBtn} onClick={onClose}>
            <p>X</p>
          </button>
        </div>

        {error && (
          <div
            style={{
              padding: "12px",
              marginBottom: "20px",
              backgroundColor: "#fee",
              color: "#c00",
              borderRadius: "8px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {step === 1 ? (
          <div className={styles.content}>
            <h2 className={`${styles.title} boldFont`}>Enter Your Email</h2>
            <p className={styles.description}>
              We'll send you a verification code to complete your purchase
            </p>

            <div className={styles.inputWrapper}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleEmailKeyDown}
                placeholder="your.email@example.com"
                className={styles.emailInput}
                required
                autoFocus
                disabled={isSending}
              />

              <button
                onClick={handleEmailSubmit}
                className={`${styles.submitBtn} filled`}
                disabled={!email || isSending}
              >
                {isSending ? "Sending..." : "Send Code"}
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            <h2 className={`${styles.title} boldFont`}>
              Enter Verification Code
            </h2>
            <p className={styles.description}>
              We sent a 6-digit code to <strong>{email}</strong>
            </p>

            <div className={styles.otpContainer}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className={styles.otpInput}
                  disabled={isVerifying}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <button
              className={`${styles.verifyBtn} filled`}
              disabled={isVerifying || otp.some((digit) => digit === "")}
              onClick={() => handleVerifyOtp(otp)}
            >
              {isVerifying ? "Verifying..." : "Verify Code"}
            </button>

            <button
              className={styles.resendBtn}
              onClick={handleResendOTP}
              disabled={isVerifying || isSending}
            >
              {isSending ? "Sending..." : "Resend Code"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
