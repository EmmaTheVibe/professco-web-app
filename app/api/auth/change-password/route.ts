import { NextRequest, NextResponse } from "next/server";
import { adoptRotatedToken, proxyAuthed } from "@/app/_lib/http";

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const { current_password, password } = await request.json();

  return adoptRotatedToken(
    await proxyAuthed("/account/password", {
      method: "PUT",
      body: { current_password, password },
      errorMessage: "Failed to change password",
    }),
  );
}
