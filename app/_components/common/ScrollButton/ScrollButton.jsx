"use client";

import { motion, AnimatePresence } from "framer-motion";
import styles from "./ScrollButton.module.css";
import useScrollEnd from "./useScrollEnd";

export default function ScrollButton({ containerRef, scrollAmount = 318 }) {
  const isAtEnd = useScrollEnd(containerRef);

  const handleScroll = () => {
    if (containerRef?.current) {
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {!isAtEnd && (
        <motion.button
          className={styles.scrollButton}
          onClick={handleScroll}
          initial={{ opacity: 0, scale: 0.8, y: "-50%" }}
          animate={{ opacity: 1, scale: 1, y: "-50%" }}
          exit={{ opacity: 0, scale: 0.8, y: "-50%" }}
          transition={{ duration: 0.3 }}
        >
          <span>&gt;</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
