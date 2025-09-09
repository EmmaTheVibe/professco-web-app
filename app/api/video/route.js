import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://professco.ng/videos/videoCodec/manifest.mpd",
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
    return NextResponse.json(
      { error: "Failed to fetch video" },
      { status: 500 }
    );
  }
}
