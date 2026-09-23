import { useMemo } from "react";
import { useStudentCourses } from "@/app/_hooks/useStudentCourses";

export function useOwnedCourseIds(): Set<number> {
  const { data } = useStudentCourses();

  return useMemo(() => new Set((data?.data ?? []).map((course) => course.id)), [
    data,
  ]);
}
