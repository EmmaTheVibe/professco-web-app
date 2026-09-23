"use client";

import { useStudentCourses } from "@/app/_hooks/useStudentCourses";
import MyCourseCard from "@/app/_components/student/MyCourseCard/MyCourseCard";
import EmptyState from "@/app/_components/common/EmptyState/EmptyState";
import Skeleton from "@/app/_components/common/Skeleton/Skeleton";
import styles from "./MyCoursesGrid.module.css";

export default function MyCoursesGrid() {
  const { data, isLoading } = useStudentCourses();

  const courses = data?.data || [];

  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <EmptyState
        illustration="/images/empty-student-courses.png"
        heading="No courses yet"
        description="You have not bought any courses yet"
        cta={{ label: "Explore Professco", href: "/student" }}
      />
    );
  }

  return (
    <div className={styles.grid}>
      {courses.map((course) => (
        <MyCourseCard
          key={course.id}
          course={course}
          progress={0}
          rating={null}
        />
      ))}
    </div>
  );
}
