"use client";

import { useEffect } from "react";
import { getSortedCourses } from "@/app/_lib/data-service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useFilterStore from "@/app/_utils/filter-store";
import PAGE_SIZE from "@/app/_utils/constants";

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

const formatTagForBackend = (tagInput) => {
  if (!tagInput || tagInput.toLowerCase() === "all") return null;
  return tagInput.toLowerCase().replace(/\s+/g, "-");
};

export default function useCourses() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = useFilterStore((state) => state.activeTab);
  const queryClient = useQueryClient();

  const rawExam = searchParams?.get("exam")?.toLowerCase();
  const examValue =
    activeTab === "all" && rawExam && validExams.includes(rawExam)
      ? rawExam // Use URL param only if activeTab is default 'all' and URL has a valid exam
      : activeTab;

  const rawPrices = searchParams.getAll("price").map((p) => p.toLowerCase());
  const priceValues = rawPrices.filter((p) => validPrices.includes(p));

  let minAmountParam = null;
  let maxAmountParam = null;
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
  const minRating =
    Number.isFinite(Number(rawRating)) &&
    validRatings.includes(Number(rawRating))
      ? Number(rawRating)
      : null;

  const rawLevels = searchParams.getAll("level").map((l) => l.toLowerCase());
  const levelValues = rawLevels.filter((l) => validLevels.includes(l));
  const levelValuesKey = levelValues.sort().join(",");

  const rawSortBy = searchParams.get("sort_by")?.toLowerCase();
  const sortBy = rawSortBy && validSortBy.includes(rawSortBy) ? rawSortBy : null;

  const rawSortOrder = searchParams.get("sort_order")?.toLowerCase();
  const sortOrder =
    rawSortOrder && validSortOrder.includes(rawSortOrder)
      ? rawSortOrder
      : sortBy
        ? "desc"
        : null;

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit")
    ? 12
    : Number(searchParams.get("limit"));

  const rawTagFromUrl = searchParams.get("tags");
  const formattedTagForInternalUse = formatTagForBackend(rawTagFromUrl);
  const tagValue = validBackendTags.includes(
    formattedTagForInternalUse || "all",
  )
    ? formattedTagForInternalUse
    : "all";
  const backendTagParam = tagValue === "all" ? null : tagValue;

  // NEW: Destructure isFetching from useQuery
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
        sortBy: sortBy,
        sortOrder: sortOrder,
        tag: backendTagParam,
      }),
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh, won't refetch
    gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache even when unused
  });

  let courses = data?.courses || [];
  let backendTotalCount = data?.count || 0;

  if (applyPriceFilterFrontend) {
    courses = courses.filter((course) => {
      const amount = parseFloat(course.amount);
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

  const count = courses.length;

  const pageCount = Math.ceil(backendTotalCount / limit);

  // Redirect to last valid page if URL has invalid page number
  useEffect(() => {
    if (pageCount > 0 && page > pageCount) {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageCount.toString());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [page, pageCount, pathname, router, searchParams]);

  // Prefetch adjacent pages when page/filters change
  useEffect(() => {
    // Prefetch next page
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

    // Prefetch previous page
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

  // Early return if page is invalid - prevents flash of "Page X of Y" before redirect
  if (pageCount > 0 && page > pageCount) {
    return { isLoading: true, isFetching: false, error: null, courses: [], count: 0 };
  }

  return { isLoading, isFetching, error, courses, count: backendTotalCount };
}
