"use client";

import { useQuery } from "@tanstack/react-query";
import { getSortedCourses } from "@/app/_lib/data-service";
import MyCourseCard from "@/app/_components/student/MyCourseCard/MyCourseCard";
import Skeleton from "@/app/_components/common/Skeleton/Skeleton";
import styles from "./MyCoursesGrid.module.css";

const simulatedStates = [
  { progress: 0, rating: null },
  { progress: 75, rating: null },
  { progress: 75, rating: 3 },
  { progress: 100, rating: 5 },
];

export default function MyCoursesGrid() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-courses-simulated", "ican"],
    queryFn: () =>
      getSortedCourses({ examValue: "ican", page: 1, limit: simulatedStates.length }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const courses = data?.courses || [];

  if (isLoading) {
    return (
      <div className={styles.grid}>
        {simulatedStates.map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {courses.map((course, index) => (
        <MyCourseCard
          key={course.id}
          course={course}
          progress={simulatedStates[index]?.progress ?? 0}
          rating={simulatedStates[index]?.rating ?? null}
        />
      ))}
    </div>
  );
}
