import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { proxyAuthed } from "@/app/_lib/http";

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const { current_password } = await request.json();

  const response = await proxyAuthed("/account", {
    method: "DELETE",
    body: { current_password },
    errorMessage: "Failed to delete account",
  });

  if (response.ok) {
    (await cookies()).delete("token");
  }

  return response;
}
