"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import useMediaQuery from "@/app/_hooks/useMediaQuery";

interface Props {
  src: string;
  alt: string;
  className?: string;
  from?: "left" | "right";
  distance?: number;
}

// Slides in from the side on desktop and up from below on smaller screens.
// The offset is a keyframe chosen when the animation starts (not in `initial`),
// so the server-rendered markup doesn't depend on the screen size.
export default function SlideInImage({
  src,
  alt,
  className,
  from = "right",
  distance = 120,
}: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  const startX = isDesktop ? (from === "left" ? -distance : distance) : 0;
  const startY = isDesktop ? 0 : distance;

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      initial={{ opacity: 0 }}
      animate={
        isInView ? { opacity: 1, x: [startX, 0], y: [startY, 0] } : undefined
      }
      transition={{ type: "spring", duration: 1.4, bounce: 0.15 }}
    />
  );
}
