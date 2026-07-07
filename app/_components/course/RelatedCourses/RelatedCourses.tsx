"use client";

import { useEffect, useRef, useState } from "react";
import CourseCard from "@/app/_components/course/CourseCard/CourseCard";
import styles from "./RelatedCourses.module.css";
import useMediaQuery from "@/app/_hooks/useMediaQuery";
import useRelatedCourses from "@/app/_hooks/useRelatedCourses";
import Skeleton from "@/app/_components/common/Skeleton/Skeleton";
import ScrollButton from "@/app/_components/common/ScrollButton/ScrollButton";
import useScrollEnd from "@/app/_components/common/ScrollButton/useScrollEnd";

const MOBILE_PREVIEW_COUNT = 3;
const DESKTOP_PREVIEW_COUNT = 5;

interface Props {
  courseId: string | number;
  courseType: string;
}

export default function RelatedCourses({ courseId, courseType }: Props) {
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const isAtEnd = useScrollEnd(gridWrapperRef);

  const [mounted, setMounted] = useState(false);
  const lg = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSlideMode = mounted && lg;
  const previewCount = isSlideMode
    ? DESKTOP_PREVIEW_COUNT
    : MOBILE_PREVIEW_COUNT;

  const { relatedCourses, isLoading, relatedCoursesCount, error } =
    useRelatedCourses(courseType);

  const courses = relatedCourses
    ? relatedCourses.filter((course) => course.id !== Number(courseId))
    : [];

  return (
    <>
      <div
        className={`${styles.gridWrapper} ${isAtEnd ? styles.atEnd : ""} ${
          isSlideMode ? styles.slideMode : ""
        }`}
        ref={gridWrapperRef}
      >
        {isLoading ? (
          <div
            className={`${styles.grid} ${isSlideMode ? styles.slideMode : ""}`}
          >
            {Array.from({ length: previewCount }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : (
          <div
            className={`${styles.grid} ${isSlideMode ? styles.slideMode : ""}`}
          >
            {courses?.slice(0, previewCount).map((course) => (
              <CourseCard key={course.id} courseItem={course} />
            ))}
          </div>
        )}
      </div>
      <div
        className={`${styles.scrollButtonCarrier} ${
          isSlideMode ? styles.slideMode : ""
        }`}
      >
        <ScrollButton containerRef={gridWrapperRef} scrollAmount={308} />
      </div>
    </>
  );
}
