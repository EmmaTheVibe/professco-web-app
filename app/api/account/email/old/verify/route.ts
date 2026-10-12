import { NextRequest, NextResponse } from "next/server";
import { proxyAuthed } from "@/app/_lib/http";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { otp } = await request.json();

  return proxyAuthed("/account/email/old/verify", {
    method: "POST",
    body: { otp },
    errorMessage: "Failed to verify code",
  });
}
