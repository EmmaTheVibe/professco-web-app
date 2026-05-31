"use client";

import { useEffect } from "react";
import { getSortedCourses } from "@/app/_lib/data-service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useFilterStore from "@/app/_utils/filter-store";
import type { Course } from "@/app/_utils/types";

const validExams = [
  "all",
  "ican",
  "acca",
  "cfa",
  "cima",
  "citn",
  "cis",
  "ats",
  "cipm",
];

const validLevels = ["beginner", "intermediate", "advanced"];

const validPrices = ["free", "paid"];

const validRatings = [0, 1, 2, 3, 4];

const validBackendTags = ["all", "special-offer", "new", "best-seller"];

const validSortBy = ["amount"];

const validSortOrder = ["asc", "desc"];

const formatTagForBackend = (tagInput: string | null): string | null => {
  if (!tagInput || tagInput.toLowerCase() === "all") return null;
  return tagInput.toLowerCase().replace(/\s+/g, "-");
};

interface UseCoursesReturn {
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  courses: Course[];
  count: number;
}

export default function useCourses(): UseCoursesReturn {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = useFilterStore((state) => state.activeTab);
  const queryClient = useQueryClient();

  const rawExam = searchParams?.get("exam")?.toLowerCase();
  const examValue =
    activeTab === "all" && rawExam && validExams.includes(rawExam)
      ? rawExam
      : activeTab;

  const rawPrices = searchParams.getAll("price").map((p) => p.toLowerCase());
  const priceValues = rawPrices.filter((p) => validPrices.includes(p));

  let minAmountParam: number | null = null;
  let maxAmountParam: number | null = null;
  let applyPriceFilterFrontend = false;

  const hasFree = priceValues.includes("free");
  const hasPaid = priceValues.includes("paid");

  if (hasFree && !hasPaid) {
    minAmountParam = 0;
    maxAmountParam = 0;
  } else if (!hasFree && hasPaid) {
    minAmountParam = 1;
    maxAmountParam = null;
  } else if (hasFree && hasPaid) {
    minAmountParam = null;
    maxAmountParam = null;
    applyPriceFilterFrontend = true;
  }

  const rawRating = searchParams.get("rating");
  const minRating: number | null =
    Number.isFinite(Number(rawRating)) &&
    validRatings.includes(Number(rawRating))
      ? Number(rawRating)
      : null;

  const rawLevels = searchParams.getAll("level").map((l) => l.toLowerCase());
  const levelValues = rawLevels.filter((l) => validLevels.includes(l));
  const levelValuesKey = levelValues.sort().join(",");

  const rawSortBy = searchParams.get("sort_by")?.toLowerCase();
  const sortBy: string | null =
    rawSortBy && validSortBy.includes(rawSortBy) ? rawSortBy : null;

  const rawSortOrder = searchParams.get("sort_order")?.toLowerCase();
  const sortOrder: string | null =
    rawSortOrder && validSortOrder.includes(rawSortOrder)
      ? rawSortOrder
      : sortBy
        ? "desc"
        : null;

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit") ? 12 : Number(searchParams.get("limit"));

  const rawTagFromUrl = searchParams.get("tags");
  const formattedTagForInternalUse = formatTagForBackend(rawTagFromUrl);
  const tagValue = validBackendTags.includes(formattedTagForInternalUse || "all")
    ? formattedTagForInternalUse
    : "all";
  const backendTagParam = tagValue === "all" ? null : tagValue;

  const { isLoading, isFetching, data, error } = useQuery({
    queryKey: [
      "courses",
      examValue,
      page,
      limit,
      minAmountParam,
      maxAmountParam,
      minRating,
      applyPriceFilterFrontend,
      levelValuesKey,
      sortBy,
      sortOrder,
      tagValue,
    ],
    queryFn: () =>
      getSortedCourses({
        examValue,
        page,
        limit,
        minAmount: minAmountParam,
        maxAmount: maxAmountParam,
        minRating,
        sortBy,
        sortOrder,
        tag: backendTagParam,
      }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  let courses: Course[] = data?.courses || [];
  const backendTotalCount: number = data?.count || 0;

  if (applyPriceFilterFrontend) {
    courses = courses.filter((course) => {
      const amount = parseFloat(String(course.amount));
      const isFree = amount === 0;
      const isPaid = amount > 0;
      return (hasFree && isFree) || (hasPaid && isPaid);
    });
  }

  if (levelValues.length > 0) {
    courses = courses.filter(
      (course) =>
        course.level &&
        levelValues.includes(String(course.level).toLowerCase()),
    );
  }

  const pageCount = Math.ceil(backendTotalCount / limit);

  useEffect(() => {
    if (pageCount > 0 && page > pageCount) {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageCount.toString());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [page, pageCount, pathname, router, searchParams]);

  useEffect(() => {
    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: [
          "courses",
          examValue,
          page + 1,
          limit,
          minAmountParam,
          maxAmountParam,
          minRating,
          applyPriceFilterFrontend,
          levelValuesKey,
          sortBy,
          sortOrder,
          tagValue,
        ],
        queryFn: () =>
          getSortedCourses({
            examValue,
            page: page + 1,
            limit,
            minAmount: minAmountParam,
            maxAmount: maxAmountParam,
            minRating,
            sortBy,
            sortOrder,
            tag: backendTagParam,
          }),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: [
          "courses",
          examValue,
          page - 1,
          limit,
          minAmountParam,
          maxAmountParam,
          minRating,
          applyPriceFilterFrontend,
          levelValuesKey,
          sortBy,
          sortOrder,
          tagValue,
        ],
        queryFn: () =>
          getSortedCourses({
            examValue,
            page: page - 1,
            limit,
            minAmount: minAmountParam,
            maxAmount: maxAmountParam,
            minRating,
            sortBy,
            sortOrder,
            tag: backendTagParam,
          }),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      });
    }
  }, [
    page,
    pageCount,
    examValue,
    limit,
    minAmountParam,
    maxAmountParam,
    minRating,
    applyPriceFilterFrontend,
    levelValuesKey,
    sortBy,
    sortOrder,
    tagValue,
    backendTagParam,
    queryClient,
  ]);

  if (pageCount > 0 && page > pageCount) {
    return { isLoading: true, isFetching: false, error: null, courses: [], count: 0 };
  }

  return { isLoading, isFetching, error: error as Error | null, courses, count: backendTotalCount };
}
