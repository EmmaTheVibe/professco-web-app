import { useQuery } from "@tanstack/react-query";
import { Course } from "@/app/_utils/types";
import useAuthStore from "@/app/_utils/auth-store";

export interface StudentCoursesResponse {
  data: Course[];
  total: number;
  [key: string]: unknown;
}

async function fetchStudentCourses(): Promise<StudentCoursesResponse> {
  const res = await fetch("/api/dashboard/courses");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch courses");
  }

  return data;
}

export function useStudentCourses() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ["student-courses"],
    queryFn: fetchStudentCourses,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
