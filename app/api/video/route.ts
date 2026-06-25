import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const response = await fetch(
      process.env.VIDEO_MANIFEST_URL as string,
      {
        headers: {
          Accept: "application/dash+xml, video/mp4, */*",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const manifest = await response.text();

    return new NextResponse(manifest, {
      headers: {
        "Content-Type": "application/dash+xml",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Video proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch video" },
      { status: 500 }
    );
  }
}
