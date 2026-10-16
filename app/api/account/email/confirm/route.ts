import { NextRequest, NextResponse } from "next/server";
import { adoptRotatedToken, proxyAuthed } from "@/app/_lib/http";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { email, otp } = await request.json();

  return adoptRotatedToken(
    await proxyAuthed("/account/email/confirm", {
      method: "POST",
      body: { email, otp },
      errorMessage: "Failed to confirm your new email",
    }),
  );
}
