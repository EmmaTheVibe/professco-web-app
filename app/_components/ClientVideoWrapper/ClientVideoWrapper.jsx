"use client";

import dynamic from "next/dynamic";

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

export default function ClientVideoWrapper({
  title,
  poster,
  course,
  moduleId,
}) {
  const module = course.modules.find((mod) => mod.id === Number(moduleId));

  if (!module) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "400px",
          background: "#fee",
          borderRadius: "8px",
          color: "#c33",
        }}
      >
        Module not found.
      </div>
    );
  }

  const { manifest_url, license_url } = module;
  // console.log(
  //   `from video wrapper, manifest url is ${manifest_url}, module id is ${moduleId} and module is ${module}`
  // );

  if (!manifest_url) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "400px",
          background: "#fee",
          borderRadius: "8px",
          color: "#c33",
        }}
      >
        Video not available for this module.
      </div>
    );
  }

  return (
    <VideoPlayer
      manifestUrl={manifest_url}
      licenseServerUrl={license_url}
      title={title}
      poster={poster}
      course={course}
      moduleId={moduleId}
      key={moduleId}
    />
  );
}
