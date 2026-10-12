import { NextResponse } from "next/server";
import { proxyAuthed } from "@/app/_lib/http";

export async function POST(): Promise<NextResponse> {
  return proxyAuthed("/account/email/old/request", {
    method: "POST",
    errorMessage: "Failed to send code to your current email",
  });
}
