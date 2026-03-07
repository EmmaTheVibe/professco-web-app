import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request) {
  try {
    const { courseIds, email } = await request.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const body = {
      course_ids: courseIds.map(Number),
      user_reference: crypto.randomUUID(),
    };

    if (email) {
      body.email = email;
    }

    const response = await fetch(
      `${API_BASE_URL}/payment/multiple-courses`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Payment initiation failed" },
        { status: response.status }
      );
    }

    return NextResponse.json(data?.data?.data || data);
  } catch (error) {
    console.error("Multiple payment route error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
