import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Decode JWT payload (base64) to extract user profile
    const parts = token.split(".");
    if (parts.length !== 3) {
      cookieStore.delete("token");
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    const payload = JSON.parse(
      Buffer.from(parts[1], "base64").toString("utf-8")
    );

    // Check if token is expired
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      cookieStore.delete("token");
      return NextResponse.json(
        { message: "Token expired" },
        { status: 401 }
      );
    }

    return NextResponse.json({ profile: payload });
  } catch (error) {
    console.error("Auth me route error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
