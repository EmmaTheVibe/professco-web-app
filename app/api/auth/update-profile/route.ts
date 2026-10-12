import { NextRequest, NextResponse } from "next/server";
import { proxyAuthed } from "@/app/_lib/http";

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  const { first_name, last_name } = await request.json();

  return proxyAuthed("/account/profile", {
    method: "PATCH",
    body: { first_name, last_name },
    errorMessage: "Failed to update profile",
  });
}
