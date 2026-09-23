import { RefObject } from "react";
import Link from "next/link";
import CourseCard from "@/app/_components/course/CourseCard/CourseCard";
import Skeleton from "@/app/_components/common/Skeleton/Skeleton";
import ScrollButton from "@/app/_components/common/ScrollButton/ScrollButton";
import type { Course } from "@/app/_utils/types";
import styles from "../CourseList.module.css";

interface Props {
  activeTab: string;
  searchedCourses: Course[];
  loading: boolean;
  previewCount: number;
  isSlideMode: boolean;
  isVerticalMode: boolean;
  isAtEnd: boolean;
  scrollAxis: "horizontal" | "vertical";
  gridWrapperRef: RefObject<HTMLDivElement>;
  ownedCourseIds: Set<number>;
}

export default function MobileLayout({
  activeTab,
  searchedCourses,
  loading,
  previewCount,
  isSlideMode,
  isVerticalMode,
  isAtEnd,
  scrollAxis,
  gridWrapperRef,
  ownedCourseIds,
}: Props) {
  return (
    <>
      <section className={styles.seg}>
        <div className="container">
          <div
            className={`${styles.top} ${
              searchedCourses.length === 0 ? styles.border : ""
            }`}
          >
            <div className={styles.wrapper}>
              <p>Courses</p>
              <h1 className={styles.heading}>
                {activeTab} courses from the very best
              </h1>
              <p className={`lightFont ${styles.moreInfo}`}>
                Learn from vetted and certified chartered professionals with
                proven track records
              </p>

              <Link
                href={
                  activeTab && activeTab.toLowerCase() !== "all"
                    ? `/courses?exam=${activeTab.toLowerCase()}`
                    : "/courses"
                }
              >
                <div className={styles.btn}>
                  <button className="filled">
                    <p>View all</p>
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.segB}>
        <div className="container">
          <div
            className={`${styles.bottom} ${
              searchedCourses.length === 0 ? "" : styles.borderB
            }`}
          >
            <div
              className={`${styles.gridWrapper} ${isAtEnd ? styles.atEnd : ""} ${
                isSlideMode ? styles.slideMode : ""
              } ${isVerticalMode ? styles.verticalMode : ""}`}
              ref={gridWrapperRef}
            >
              {loading ? (
                <div
                  className={`${styles.courseGrid} ${
                    isSlideMode ? styles.slideMode : ""
                  }`}
                >
                  {Array.from({ length: previewCount }).map((_, index) => (
                    <Skeleton key={index} />
                  ))}
                </div>
              ) : (
                <div
                  className={`${styles.courseGrid} ${
                    isSlideMode ? styles.slideMode : ""
                  }`}
                >
                  {searchedCourses.map((course) => (
                    <CourseCard
                      courseItem={course}
                      isOwned={ownedCourseIds.has(course.id)}
                      key={course.id}
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
    </>
  );
}
