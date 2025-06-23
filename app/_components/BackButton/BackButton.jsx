"use client";

import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  return (
    <div
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      onClick={() => router.back()}
    >
      <img src="/images/backarrow.svg" alt="arrow" />
      <p
        className="semiboldFont"
        style={{ color: "#9CA3AF", marginLeft: "12px" }}
      >
        Close
      </p>
    </div>
  );
}

export default BackButton;
