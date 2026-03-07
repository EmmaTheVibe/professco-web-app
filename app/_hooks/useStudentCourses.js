import { useQuery } from "@tanstack/react-query";

async function fetchStudentCourses() {
  const res = await fetch("/api/dashboard/courses");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch courses");
  }

  return data;
}

export function useStudentCourses() {
  return useQuery({
    queryKey: ["student-courses"],
    queryFn: fetchStudentCourses,
  });
}
