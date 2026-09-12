import { NextResponse } from "next/server";
import { safeJson } from "@/app/_lib/http";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(): Promise<NextResponse> {
  try {
    if (!API_BASE_URL) {
      return NextResponse.json(
        { message: "API base URL is not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/examBody`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await safeJson(response);

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to fetch exam bodies" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Exam bodies route error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
