import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function safeJson(response: Response): Promise<any> {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { message: text.slice(0, 200) };
  }
}

export async function setAuthCookie(token: string): Promise<void> {
  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

// For endpoints that revoke every session and return a fresh token for this one:
// store the new token (never forward it to the browser), or drop the dead cookie.
export async function adoptRotatedToken(
  response: NextResponse,
): Promise<NextResponse> {
  if (!response.ok) return response;

  const { token, ...data } = await response.json();

  if (token) {
    await setAuthCookie(token);
  } else {
    (await cookies()).delete("token");
  }

  return NextResponse.json({ ...data, signedOut: !token });
}

interface ProxyOptions {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  errorMessage: string;
}

// Forwards a request to the backend with the user's token cookie as a bearer token.
export async function proxyAuthed(
  path: string,
  { method, body, errorMessage }: ProxyOptions,
): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    const data = await safeJson(response);

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || errorMessage, errors: data.errors },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`${method} ${path} proxy error:`, error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
