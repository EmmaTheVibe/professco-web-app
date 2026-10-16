import { NextRequest, NextResponse } from "next/server";
import { safeJson, setAuthCookie } from "@/app/_lib/http";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { email, password } = await request.json();

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await safeJson(response);

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Login failed" },
        { status: response.status }
      );
    }

    await setAuthCookie(data.token);

    const profileResponse = await fetch(`${API_BASE_URL}/account`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    });

    if (profileResponse.ok) {
      const profile = await safeJson(profileResponse);
      return NextResponse.json({ profile });
    }

    return NextResponse.json({ profile: data.profile });
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
