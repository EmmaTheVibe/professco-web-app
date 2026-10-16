import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/account`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Only a 401 means the session is gone. Other failures (404, 5xx) are
    // backend problems and must not log the user out.
    if (response.status === 401) {
      cookieStore.delete("token");
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    if (!response.ok) {
      console.error("Auth me: GET /account failed with", response.status);
      return NextResponse.json(
        { message: "Could not load account" },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ profile: data });
  } catch (error) {
    console.error("Auth me route error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
