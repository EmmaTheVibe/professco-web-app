"use client";

import { useState, useEffect, useRef } from "react";
import CourseCard from "@/app/_components/course/CourseCard/CourseCard";
import useFilterStore from "@/app/_utils/filter-store";
import { useOwnedCourseIds } from "@/app/_hooks/useOwnedCourseIds";
import styles from "./CourseList.module.css";
import useMediaQuery from "@/app/_hooks/useMediaQuery";
import Tags from "@/app/_components/common/Tags/Tags";
import Spinner from "@/app/_components/layout/Spinner/Spinner";
import Pagination from "@/app/_components/common/Pagination/Pagination";
import Filter from "@/app/_components/common/Filter/Filter";
import Overlay from "@/app/_components/common/Overlay/Overlay";
import Skeleton from "@/app/_components/common/Skeleton/Skeleton";
import useScrollEnd from "@/app/_components/common/ScrollButton/useScrollEnd";
import MobileLayout from "./components/MobileLayout";
import PCLayout from "./components/PCLayout";

const COURSE_PREVIEW_COUNT = 5;

export default function CourseList({
  showAll,
  courses,
  loading,
  count,
  isFetching,
}) {
  const activeTab = useFilterStore((state) => state.activeTab);
  const ownedCourseIds = useOwnedCourseIds();
  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);
  const filterButtonRef = useRef(null);
  const gridWrapperRefMobile = useRef(null);
  const gridWrapperRefDesktop = useRef(null);

  const [mounted, setMounted] = useState(false);
  const lg = useMediaQuery("(min-width: 400px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSlideMode = mounted && lg;
  const isVerticalMode = mounted && !lg;
  const scrollAxis = isVerticalMode ? "vertical" : "horizontal";
  const isAtEndMobile = useScrollEnd(gridWrapperRefMobile, scrollAxis);
  const isAtEndDesktop = useScrollEnd(gridWrapperRefDesktop, scrollAxis);
  const previewCount = COURSE_PREVIEW_COUNT;

  const ratingFilters = [
    { value: 4, name: "4.0 stars & Up" },
    { value: 3, name: "3.0 stars & Up" },
    { value: 2, name: "2.0 stars & Up" },
    { value: 1, name: "1.0 stars & Up" },
    { value: 0, name: "0.0 stars & Up" },
  ];
  const levelFilters = [
    { value: "beginner", name: "Beginner Level" },
    { value: "intermediate", name: "Intermediate Level" },
    { value: "advanced", name: "Advanced Level" },
  ];
  const priceFilters = [
    { value: "free", name: "Free" },
    { value: "paid", name: "Paid" },
  ];

  let filteredCourses = courses || [];

  if (!showAll) {
    filteredCourses = filteredCourses.slice(0, previewCount);
  }

  const searchedCourses =
    query.length > 0
      ? filteredCourses.filter((course) =>
          `${course.courseTitle} ${course.courseDesc} ${course.courseType}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
      : filteredCourses;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className={styles.courseList}>
      {!showAll ? (
        <>
          <MobileLayout
            activeTab={activeTab}
            searchedCourses={searchedCourses}
            loading={loading}
            previewCount={previewCount}
            isSlideMode={isSlideMode}
            isVerticalMode={isVerticalMode}
            isAtEnd={isAtEndMobile}
            scrollAxis={scrollAxis}
            gridWrapperRef={gridWrapperRefMobile}
            ownedCourseIds={ownedCourseIds}
          />
          <PCLayout
            activeTab={activeTab}
            searchedCourses={searchedCourses}
            loading={loading}
            previewCount={previewCount}
            isSlideMode={isSlideMode}
            isVerticalMode={isVerticalMode}
            isAtEnd={isAtEndDesktop}
            scrollAxis={scrollAxis}
            gridWrapperRef={gridWrapperRefDesktop}
            ownedCourseIds={ownedCourseIds}
          />
        </>
      ) : (
        <div className={`${styles.wrapperB} container`}>
          <div className={styles.topB}>
            <p>Courses</p>
            <h1 className={styles.heading}>
              {activeTab} courses from the very best
            </h1>
            <p className={`lightFont ${styles.moreInfo}`}>
              Learn from vetted and certified chartered professionals with
              proven track records
            </p>
            <div className={styles.tagBox}>
              <Tags />
            </div>
            <div className={styles.btnB}>
              <button
                className="btn-dark"
                onClick={openModal}
                ref={filterButtonRef}
              >
                <p>Filters</p> <img src="/images/filter.svg" alt="filter" />
              </button>
            </div>
          </div>
          <div className={styles.bottomB}>
            <Overlay isOpen={open} onClose={closeModal} withBlur={true}>
              <div
                className={`${styles.sidebar} ${open ? styles.open : ""}`}
                ref={sidebarRef}
              >
                <div className={styles.closeLine}>
                  <div className={styles.closer} onClick={closeModal}>
                    <img src="/images/closer.svg" alt="close" />
                  </div>
                </div>

                <Filter options={ratingFilters} label="rating" />
                <div className={styles.dividerB}></div>
                <Filter options={levelFilters} label="level" />
                <div className={styles.dividerB}></div>
                <Filter options={priceFilters} label="price" sortBy="amount" />
              </div>
            </Overlay>

            <div className={styles.gridWrapperB}>
              {loading ? (
                <div className={styles.courseGridB}>
                  {Array.from({ length: 12 }).map((_, index) => (
                    <Skeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className={styles.courseGridB}>
                  {searchedCourses.map((course) => (
                    <CourseCard
                      courseItem={course}
                      isOwned={ownedCourseIds.has(course.id)}
                      key={course.id}
                    />
                  ))}
                </div>
              )}
              <Pagination count={count} isFetching={isFetching} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
