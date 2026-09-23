import { RefObject } from "react";
import CourseCard from "@/app/_components/course/CourseCard/CourseCard";
import Skeleton from "@/app/_components/common/Skeleton/Skeleton";
import ScrollButton from "@/app/_components/common/ScrollButton/ScrollButton";
import type { Course } from "@/app/_utils/types";
import styles from "../RelatedCourses.module.css";

interface Props {
  courses: Course[];
  isLoading: boolean;
  previewCount: number;
  isSlideMode: boolean;
  isVerticalMode: boolean;
  isAtEnd: boolean;
  scrollAxis: "horizontal" | "vertical";
  gridWrapperRef: RefObject<HTMLDivElement>;
  ownedCourseIds: Set<number>;
}

export default function MobileLayout({
  courses,
  isLoading,
  previewCount,
  isSlideMode,
  isVerticalMode,
  isAtEnd,
  scrollAxis,
  gridWrapperRef,
  ownedCourseIds,
}: Props) {
  return (
    <section className={styles.seg}>
      <div className="container">
        <div className={styles.top}>
          <h1 className="boldFont">Related courses</h1>
          <p className={`lightFont ${styles.relatedInfo}`}>
            Similar courses taken by others who are preparing for exams like
            you
          </p>
        </div>

        <div className={styles.bottom}>
          <div
            className={`${styles.gridWrapper} ${isAtEnd ? styles.atEnd : ""} ${
              isSlideMode ? styles.slideMode : ""
            } ${isVerticalMode ? styles.verticalMode : ""}`}
            ref={gridWrapperRef}
          >
            {isLoading ? (
              <div
                className={`${styles.grid} ${
                  isSlideMode ? styles.slideMode : ""
                }`}
              >
                {Array.from({ length: previewCount }).map((_, index) => (
                  <Skeleton key={index} />
                ))}
              </div>
            ) : (
              <div
                className={`${styles.grid} ${
                  isSlideMode ? styles.slideMode : ""
                }`}
              >
                {courses.slice(0, previewCount).map((course) => (
                  <CourseCard
                    key={course.id}
                    courseItem={course}
                    isOwned={ownedCourseIds.has(course.id)}
                  />
                ))}
              </div>
            )}
          </div>
          <div
            className={`${styles.scrollButtonCarrier} ${
              isSlideMode ? styles.slideMode : ""
            } ${isVerticalMode ? styles.verticalMode : ""}`}
          >
            <ScrollButton
              containerRef={gridWrapperRef}
              scrollAmount={isVerticalMode ? 470 : 318}
              axis={scrollAxis}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
