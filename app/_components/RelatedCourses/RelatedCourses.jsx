"use client";

import CourseCard from "@/app/_components/CourseCard/CourseCard";
import styles from "./RelatedCourses.module.css";
import { useMediaQuery } from "@mui/material";
import useRelatedCourses from "@/app/courses/useRelatedCourses";
import Skeleton from "../Skeleton/Skeleton";

export default function RelatedCourses({ courseId, courseType }) {
  const lg = useMediaQuery("(min-width: 600px)");
  const lg2 = useMediaQuery("(min-width: 1000px)");

  const { relatedCourses, isLoading, relatedCoursesCount, error } =
    useRelatedCourses(courseType);

  const courses = relatedCourses.data
    ? relatedCourses.data.filter((course) => course.id !== Number(courseId))
    : [];

  console.log(courses);
  console.log(courseId);

  return (
    <div className={styles.gridWrapper}>
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
  );
}
