"use client";

import { useQuery } from "@tanstack/react-query";
import { getCoursesByType } from "@/app/_lib/data-service";

export default function useRelatedCourses(courseType, page = 1) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["relatedCourses", courseType, page],
    queryFn: () => getCoursesByType(courseType, page),
    enabled: !!courseType,
  });

  const courses = data?.courses || [];
  const count = data?.count || 0;

  return {
    isLoading,
    error,
    relatedCourses: courses,
    relatedCoursesCount: count,
  };
}
