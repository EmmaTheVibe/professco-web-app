// app/hooks/useRelatedCourses.js
"use client";

import { useQuery } from "@tanstack/react-query";
import { getCoursesByType } from "@/app/_lib/data-service"; // Make sure path is correct
// import PAGE_SIZE from "@/app/_utils/constants"; // If you need to expose PAGE_SIZE

export default function useRelatedCourses(courseType, page = 1) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["relatedCourses", courseType, page],
    queryFn: () => getCoursesByType(courseType, page),
    enabled: !!courseType, // Only run query if courseType is available
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
