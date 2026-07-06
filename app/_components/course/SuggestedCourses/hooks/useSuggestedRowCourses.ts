import { useQuery } from "@tanstack/react-query";
import { getSortedCourses } from "@/app/_lib/data-service";

export default function useSuggestedRowCourses(examSlug: string, limit: number = 8) {
  return useQuery({
    queryKey: ["suggested-row-courses", examSlug, limit],
    queryFn: () => getSortedCourses({ examValue: examSlug, page: 1, limit }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
