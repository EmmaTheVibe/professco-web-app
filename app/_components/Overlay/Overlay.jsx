"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Overlay.module.css"; // Import the CSS module
import { useMediaQuery } from "@mui/material";

export default function Overlay({
  isOpen,
  onClose,
  children,
  className = "",
  withBlur = true,
}) {
  const overlayRef = useRef(null);

  const md = useMediaQuery("(min-width: 600px)");
  const md2 = useMediaQuery("(min-width: 850px)");
  const lg = useMediaQuery("(min-width: 1000px)");
  const lg2 = useMediaQuery("(min-width: 1400px)");

  useEffect(() => {
    if (isOpen && !lg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClick = (event) => {
    if (overlayRef.current && event.target === overlayRef.current) {
      onClose?.();
    }
  };

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${className} ${
        isOpen ? styles.active : ""
      } ${withBlur ? styles.withBlur : ""}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
