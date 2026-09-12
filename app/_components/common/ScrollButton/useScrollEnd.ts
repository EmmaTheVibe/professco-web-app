import { useState, useEffect, RefObject } from "react";

type Axis = "horizontal" | "vertical";

export default function useScrollEnd(
  containerRef: RefObject<HTMLDivElement>,
  axis: Axis = "horizontal",
): boolean {
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const checkIfAtEnd = () => {
      const atEnd =
        axis === "vertical"
          ? container.scrollTop + container.clientHeight >= container.scrollHeight - 5
          : container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;
      setIsAtEnd(atEnd);
    };

    checkIfAtEnd();

    container.addEventListener("scroll", checkIfAtEnd);
    window.addEventListener("resize", checkIfAtEnd);
    const resizeObserver = new ResizeObserver(checkIfAtEnd);
    if (container.firstElementChild) {
      resizeObserver.observe(container.firstElementChild);
    }

    return () => {
      container.removeEventListener("scroll", checkIfAtEnd);
      window.removeEventListener("resize", checkIfAtEnd);
      resizeObserver.disconnect();
    };
  }, [containerRef, axis]);

  return isAtEnd;
}
