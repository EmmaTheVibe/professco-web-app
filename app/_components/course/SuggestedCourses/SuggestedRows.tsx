"use client";

import { useMemo } from "react";
import SuggestedRow from "./SuggestedRow";
import useAuthStore from "@/app/_utils/auth-store";
import type { ExamBody } from "@/app/_utils/types";
import styles from "./SuggestedCourses.module.css";

function getExamLabel(examBody: ExamBody) {
  return examBody.name || examBody.slug.toUpperCase();
}

export default function SuggestedRows() {
  const examBodies = useAuthStore((state) => state.user?.exam_bodies);
  const suggestedRowDefinitions = useMemo(() => {
    if (!Array.isArray(examBodies)) return [];

    const seenSlugs = new Set<string>();

    return examBodies
      .filter((examBody) => typeof examBody.slug === "string")
      .map((examBody) => ({
        label: getExamLabel(examBody),
        examSlug: examBody.slug.toLowerCase(),
      }))
      .filter((row) => {
        if (seenSlugs.has(row.examSlug)) return false;
        seenSlugs.add(row.examSlug);
        return true;
      });
  }, [examBodies]);

  return (
    <>
      <div className={styles.heading}>
        <h1 className="boldFont">Suggested courses</h1>
        <p className={`lightFont ${styles.desc}`}>
          Learn from vetted and certified chartered professionals with proven
          track records
        </p>
      </div>
      <div className={styles.rows}>
        {suggestedRowDefinitions.map((row) => (
          <SuggestedRow
            key={row.examSlug}
            label={row.label}
            examSlug={row.examSlug}
          />
        ))}
      </div>
    </>
  );
}
