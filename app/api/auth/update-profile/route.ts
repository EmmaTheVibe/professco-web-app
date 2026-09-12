import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { safeJson } from "@/app/_lib/http";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// NOTE: backend path/payload shape is a best guess, unconfirmed via Postman.
// Adjust once the backend team confirms the real endpoint.
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const { first_name, last_name, email } = await request.json();

    const response = await fetch(`${API_BASE_URL}/user/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ first_name, last_name, email }),
    });

    const data = await safeJson(response);

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to update profile" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Update profile route error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
