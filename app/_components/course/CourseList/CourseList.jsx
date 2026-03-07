"use client";

import { useState, useEffect, useRef } from "react";
import CourseCard from "@/app/_components/course/CourseCard/CourseCard";
import useFilterStore from "@/app/_utils/filter-store";
import styles from "./CourseList.module.css";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import Tags from "@/app/_components/common/Tags/Tags";
import Spinner from "@/app/_components/layout/Spinner/Spinner";
import Pagination from "@/app/_components/common/Pagination/Pagination";
import Filter from "@/app/_components/common/Filter/Filter";
import Overlay from "@/app/_components/common/Overlay/Overlay";
import Skeleton from "@/app/_components/common/Skeleton/Skeleton";
import ScrollButton from "@/app/_components/common/ScrollButton/ScrollButton";
import useScrollEnd from "@/app/_components/common/ScrollButton/useScrollEnd";

export default function CourseList({
  showAll,
  courses,
  loading,
  count,
  isFetching,
}) {
  const activeTab = useFilterStore((state) => state.activeTab);
  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);
  const filterButtonRef = useRef(null);
  const gridWrapperRef = useRef(null);
  const isAtEnd = useScrollEnd(gridWrapperRef);

  const md = useMediaQuery("(min-width: 600px)");
  const md2 = useMediaQuery("(min-width: 850px)");
  const lg = useMediaQuery("(min-width: 1000px)");
  const lg2 = useMediaQuery("(min-width: 1400px)");

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
    filteredCourses = filteredCourses.slice(
      0,
      lg2 ? 5 : lg ? 5 : md2 ? 3 : md ? 2 : 3,
    );
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

              <Link href="/courses">
                <div className={styles.btn}>
                  <button className="filled">
                    <p>View all</p>
                  </button>
                </div>
              </Link>
            </div>
          </div>

          <div
            className={`${styles.bottom} ${
              searchedCourses.length === 0 ? "" : styles.borderB
            }`}
          >
            <div
              className={`${styles.gridWrapper} ${isAtEnd ? styles.atEnd : ""}`}
              ref={gridWrapperRef}
            >
              {loading ? (
                <div className={styles.courseGrid}>
                  {Array.from({
                    length: lg2 ? 5 : lg ? 5 : md2 ? 3 : md ? 2 : 3,
                  }).map((_, index) => (
                    <Skeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className={styles.courseGrid}>
                  {searchedCourses.map((course) => (
                    <CourseCard courseItem={course} key={course.id} />
                  ))}
                </div>
              )}
            </div>
            <div className={styles.scrollButtonCarrier}>
              <ScrollButton containerRef={gridWrapperRef} scrollAmount={318} />
            </div>
          </div>
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
                    <CourseCard courseItem={course} key={course.id} />
                  ))}
                </div>
              )}
              {/* <div className={styles.courseGridB}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} />
                ))}
              </div> */}
              <Pagination count={count} isFetching={isFetching} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
