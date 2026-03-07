"use client";

import { useRef } from "react";
import CourseCard from "@/app/_components/course/CourseCard/CourseCard";
import styles from "./RelatedCourses.module.css";
import { useMediaQuery } from "@mui/material";
import useRelatedCourses from "@/app/_hooks/useRelatedCourses";
import Skeleton from "@/app/_components/common/Skeleton/Skeleton";
import ScrollButton from "@/app/_components/common/ScrollButton/ScrollButton";
import useScrollEnd from "@/app/_components/common/ScrollButton/useScrollEnd";

export default function RelatedCourses({ courseId, courseType }) {
  const lg = useMediaQuery("(min-width: 600px)");
  const lg2 = useMediaQuery("(min-width: 1000px)");
  const gridWrapperRef = useRef(null);
  const isAtEnd = useScrollEnd(gridWrapperRef);

  const { relatedCourses, isLoading, relatedCoursesCount, error } =
    useRelatedCourses(courseType);

  const courses = relatedCourses.data
    ? relatedCourses.data.filter((course) => course.id !== Number(courseId))
    : [];

  return (
    <>
      <div
        className={`${styles.gridWrapper} ${isAtEnd ? styles.atEnd : ""}`}
        ref={gridWrapperRef}
      >
        {isLoading ? (
          <div className={styles.grid}>
            {Array.from({
              length: lg2 ? 5 : lg ? 2 : 3,
            }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {courses?.slice(0, `${lg2 ? 5 : lg ? 2 : 3}`).map((course) => (
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
