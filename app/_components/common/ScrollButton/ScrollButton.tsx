"use client";

import { motion, AnimatePresence } from "framer-motion";
import styles from "./ScrollButton.module.css";
import useScrollEnd from "./useScrollEnd";
import { RefObject } from "react";

type Axis = "horizontal" | "vertical";

interface Props {
  containerRef: RefObject<HTMLDivElement>;
  scrollAmount?: number;
  axis?: Axis;
}

export default function ScrollButton({
  containerRef,
  scrollAmount = 318,
  axis = "horizontal",
}: Props) {
  const isAtEnd = useScrollEnd(containerRef, axis);

  const handleScroll = () => {
    if (containerRef?.current) {
      containerRef.current.scrollBy(
        axis === "vertical"
          ? { top: scrollAmount, behavior: "smooth" }
          : { left: scrollAmount, behavior: "smooth" },
      );
    }
  };

  const centerOffset =
    axis === "vertical" ? { x: "-50%" } : { y: "-50%" };

  return (
    <AnimatePresence>
      {!isAtEnd && (
        <motion.button
          className={`${styles.scrollButton} ${
            axis === "vertical" ? styles.vertical : ""
          }`}
          onClick={handleScroll}
          initial={{ opacity: 0, scale: 0.8, ...centerOffset }}
          animate={{ opacity: 1, scale: 1, ...centerOffset }}
          exit={{ opacity: 0, scale: 0.8, ...centerOffset }}
          transition={{ duration: 0.3 }}
        >
          <span>&gt;</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
