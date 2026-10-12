import { NextRequest, NextResponse } from "next/server";
import { proxyAuthed } from "@/app/_lib/http";

// Payload assumed to be { email }; not confirmed by the backend.
export async function POST(request: NextRequest): Promise<NextResponse> {
  const { email } = await request.json();

  return proxyAuthed("/account/email/request", {
    method: "POST",
    body: { email },
    errorMessage: "Failed to send code to your new email",
  });
}
