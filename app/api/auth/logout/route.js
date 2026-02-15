import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).catch(() => {});
    }

    cookieStore.delete("token");

    return NextResponse.json({ success: true });
  } catch (error) {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    console.error("Logout route error:", error);
    return NextResponse.json({ success: true });
  }
}
