import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("reset_nonce_key");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset OTP cancel route error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
