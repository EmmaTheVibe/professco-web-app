import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { exam_body_ids } = await request.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!API_BASE_URL) {
      return NextResponse.json(
        { message: "API base URL is not configured" },
        { status: 500 }
      );
    }

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    if (
      !Array.isArray(exam_body_ids) ||
      exam_body_ids.length === 0 ||
      exam_body_ids.some((id) => !Number.isFinite(Number(id)))
    ) {
      return NextResponse.json(
        { message: "Select at least one exam body" },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/account-setup/exam-bodies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        exam_body_ids: exam_body_ids.map(Number),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to save exam bodies" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Account setup exam bodies route error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
