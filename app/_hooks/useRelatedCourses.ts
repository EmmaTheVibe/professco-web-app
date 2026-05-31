"use client";

import { useQuery } from "@tanstack/react-query";
import { getCoursesByType } from "@/app/_lib/data-service";
import type { Course } from "@/app/_utils/types";

export default function useRelatedCourses(courseType: string, page: number = 1) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["relatedCourses", courseType, page],
    queryFn: () => getCoursesByType(courseType, page),
    enabled: !!courseType,
  });

  const courses: Course[] = data?.courses || [];
  const count: number = data?.count || 0;

  return {
    isLoading,
    error,
    relatedCourses: courses,
    relatedCoursesCount: count,
  };
}
