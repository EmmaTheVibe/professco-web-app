"use client";

import { useRef } from "react";
import CourseCard from "@/app/_components/course/CourseCard/CourseCard";
import styles from "./RelatedCourses.module.css";
import useRelatedCourses from "@/app/_hooks/useRelatedCourses";
import Skeleton from "@/app/_components/common/Skeleton/Skeleton";
import ScrollButton from "@/app/_components/common/ScrollButton/ScrollButton";
import useScrollEnd from "@/app/_components/common/ScrollButton/useScrollEnd";

const PREVIEW_COUNT = 8;

interface Props {
  courseId: string | number;
  courseType: string;
}

export default function RelatedCourses({ courseId, courseType }: Props) {
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const isAtEnd = useScrollEnd(gridWrapperRef);

  const { relatedCourses, isLoading, relatedCoursesCount, error } =
    useRelatedCourses(courseType);

  const courses = relatedCourses
    ? relatedCourses.filter((course) => course.id !== Number(courseId))
    : [];

  return (
    <>
      <div
        className={`${styles.gridWrapper} ${isAtEnd ? styles.atEnd : ""}`}
        ref={gridWrapperRef}
      >
        {isLoading ? (
          <div className={styles.grid}>
            {Array.from({ length: PREVIEW_COUNT }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {courses?.slice(0, PREVIEW_COUNT).map((course) => (
              <CourseCard key={course.id} courseItem={course} />
            ))}
          </div>
        )}
      </div>
      <div className={styles.scrollButtonCarrier}>
        <ScrollButton containerRef={gridWrapperRef} scrollAmount={308} />
      </div>
    </>
  );
}
