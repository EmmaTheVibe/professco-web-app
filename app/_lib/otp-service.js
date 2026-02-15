// app/_lib/otp-service.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function generateOTP(email) {
  try {
    const url = `${API_BASE_URL}/auth/generate-otp`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to generate OTP");
    }

    console.log("Generate OTP response:", data);
    return data;
  } catch (error) {
    console.error("Generate OTP error:", error);
    throw error;
  }
}

export async function verifyOTP(email, otp, nonceKey) {
  try {
    const url = `${API_BASE_URL}/auth/login-otp`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        otp: Number(otp),
        nonce_key: nonceKey,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "OTP verification failed");
    }

    console.log("Verify OTP response:", data);
    return data;
  } catch (error) {
    console.error("Verify OTP error:", error);
    throw error;
  }
}
