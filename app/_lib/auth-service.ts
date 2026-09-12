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
  email: string;
}

interface ChangePasswordParams {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
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
    console.log("Forgot password response:", data);

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
    console.log("Reset password response:", data);

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
      method: "POST",
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
): Promise<{ message?: string }> {
  try {
    const response = await fetch("/api/auth/change-password", {
      method: "POST",
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
