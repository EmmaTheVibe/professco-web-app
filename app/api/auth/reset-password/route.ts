import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { email, otp, password } = await request.json();
    const cookieStore = await cookies();
    const nonce_key = cookieStore.get("reset_nonce_key")?.value;

    if (!nonce_key) {
      return NextResponse.json(
        { message: "Missing reset nonce key" },
        { status: 400 },
      );
    }

    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, otp, nonce_key, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to reset password" },
        { status: response.status },
      );
    }

    cookieStore.delete("reset_nonce_key");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Reset password route error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
