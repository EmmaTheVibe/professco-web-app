"use client";

import dynamic from "next/dynamic";

// Now this dynamic import with ssr: false works because it's in a client component
const VideoPlayer = dynamic(
  () => import("@/app/_components/VideoPlayer/VideoPlayer"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // minHeight: "200px",
          height: "100%",
          background: "#f5f5f5",
          borderRadius: "8px",
          color: "#666",
          fontSize: "14px",
        }}
      >
        Loading video player...
      </div>
    ),
  }
);

export default function ClientVideoWrapper({ manifestUri, licenseServerUrl }) {
  return (
    <VideoPlayer
      manifestUri={manifestUri}
      licenseServerUrl={licenseServerUrl}
    />
  );
}
