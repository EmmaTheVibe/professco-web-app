import { useState, useEffect } from "react";

export default function useScrollEnd(containerRef) {
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const checkIfAtEnd = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      // Add small threshold (5px) to account for sub-pixel rendering
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 5;
      setIsAtEnd(atEnd);
    };

    // Check initially
    checkIfAtEnd();

    // Check on scroll
    container.addEventListener("scroll", checkIfAtEnd);
    // Check on resize (in case content changes)
    window.addEventListener("resize", checkIfAtEnd);

    return () => {
      container.removeEventListener("scroll", checkIfAtEnd);
      window.removeEventListener("resize", checkIfAtEnd);
    };
  }, [containerRef]);

  return isAtEnd;
}
