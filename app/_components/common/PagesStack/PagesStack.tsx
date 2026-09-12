"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import styles from "./PagesStack.module.css";

interface PagesStackProps {
  srcs: [string, string, string];
  altPrefix?: string;
  faded?: boolean;
}

const pagePositions = [
  { top: 0, left: 0, width: 163.7, height: 189.0, zIndex: 1 },
  { top: 1.02, left: 81.59, width: 135.3, height: 170.9, zIndex: 2 },
  { top: 9.71, left: 142.38, width: 149.6, height: 180.5, zIndex: 3 },
];

const pagePositions1200 = [
  { top: 0, left: 0, width: 321.1, height: 370.7 },
  { top: 2, left: 160, width: 265.3, height: 335.2 },
  { top: 19.04, left: 279.2, width: 293.4, height: 354.1 },
];

const stackReveal = [
  { dx: 67.57, dy: -0.86, rotate: 18.35 },
  { dx: 0.18, dy: 7.17, rotate: 5.91 },
  { dx: -67.76, dy: -6.32, rotate: -11.79 },
];

const stackReveal1200 = [
  { dx: 132.48, dy: -1.67 },
  { dx: 0.38, dy: 14.08 },
  { dx: -132.87, dy: -12.41 },
];

export default function PagesStack({
  srcs,
  altPrefix = "Page",
  faded = false,
}: PagesStackProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.55 });

  return (
    <div className={styles.stack} ref={ref}>
      {srcs.map((src, index) => {
        const pos = pagePositions[index];
        const pos1200 = pagePositions1200[index];
        const reveal = stackReveal[index];
        const reveal1200 = stackReveal1200[index];

        return (
          <img
            key={src}
            src={src}
            alt={`${altPrefix} ${index + 1}`}
            className={`${styles.card} ${isInView ? styles.revealed : ""}`}
            style={
              {
                "--top": `${pos.top}px`,
                "--left": `${pos.left}px`,
                "--width": `${pos.width}px`,
                "--height": `${pos.height}px`,
                "--top-1200": `${pos1200.top}px`,
                "--left-1200": `${pos1200.left}px`,
                "--width-1200": `${pos1200.width}px`,
                "--height-1200": `${pos1200.height}px`,
                "--rx": `${reveal.dx}px`,
                "--ry": `${reveal.dy}px`,
                "--rrot": `${reveal.rotate}deg`,
                "--rx-1200": `${reveal1200.dx}px`,
                "--ry-1200": `${reveal1200.dy}px`,
                "--final-opacity": faded ? 0.9 : 1,
                zIndex: pos.zIndex,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
