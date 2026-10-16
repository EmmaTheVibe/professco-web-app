import type { User } from "@/app/_utils/types";

interface RegisterParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface ForgotPasswordParams {
  email: string;
}

interface ResetPasswordParams {
  email: string;
  otp: string;
  password: string;
}

interface UpdateProfileParams {
  first_name: string;
  last_name: string;
}

interface ChangePasswordParams {
  current_password: string;
  password: string;
}

interface LoginResponse {
  profile: User;
}

export async function register(params: RegisterParams): Promise<unknown> {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function login(params: LoginParams): Promise<LoginResponse> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function forgotPassword(
  params: ForgotPasswordParams,
): Promise<{ message?: string; nonce_key?: string }> {
  try {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send reset link");
    }

    return data;
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
}

export async function resetPassword(
  params: ResetPasswordParams,
): Promise<{ message?: string }> {
  try {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to reset password");
    }

    return data;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
}

export async function updateProfile(
  params: UpdateProfileParams,
): Promise<{ profile?: User; message?: string }> {
  try {
    const response = await fetch("/api/auth/update-profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update profile");
    }

    return data;
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
}

export async function changePassword(
  params: ChangePasswordParams,
): Promise<{ message?: string; signedOut?: boolean }> {
  try {
    const response = await fetch("/api/auth/change-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to change password");
    }

    return data;
  } catch (error) {
    console.error("Change password error:", error);
    throw error;
  }
}

export async function logout(): Promise<{ success: boolean }> {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

async function postAccount(
  path: string,
  body: Record<string, string> | undefined,
  fallbackMessage: string,
): Promise<{ message?: string; user?: User; signedOut?: boolean }> {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }

  return data;
}

export function requestOldEmailCode() {
  return postAccount(
    "/api/account/email/old/request",
    undefined,
    "Failed to send code to your current email",
  );
}

export function verifyOldEmailCode(otp: string) {
  return postAccount("/api/account/email/old/verify", { otp }, "Invalid code");
}

export function requestNewEmailCode(email: string) {
  return postAccount(
    "/api/account/email/request",
    { email },
    "Failed to send code to your new email",
  );
}

export function confirmNewEmail(email: string, otp: string) {
  return postAccount(
    "/api/account/email/confirm",
    { email, otp },
    "Failed to confirm your new email",
  );
}

export async function deleteAccount(
  currentPassword: string,
): Promise<{ message?: string }> {
  const response = await fetch("/api/account", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ current_password: currentPassword }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete account");
  }

  return data;
}
