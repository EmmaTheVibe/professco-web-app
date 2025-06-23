"use client";

import { getSortedCourses } from "@/app/_lib/data-service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import useContexts from "@/app/_utils/useContexts";

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

const validBackendTags = [
  "all", // 'all' means no tag filter to backend
  "special-offer", // CORRECTED: hyphen
  "new",
  "best-seller", // CORRECTED: hyphen
];

const formatTagForBackend = (tagInput) => {
  if (!tagInput || tagInput.toLowerCase() === "all") return null;
  // CORRECTED: Replace spaces with hyphens. Assumes backend takes hyphenated format.
  return tagInput.toLowerCase().replace(/\s+/g, "-");
};

export default function useCourses() {
  const searchParams = useSearchParams();
  const { activeTab } = useContexts();
  const queryClient = useQueryClient();

  // EXAM FILTER
  const rawExam = searchParams?.get("exam")?.toLowerCase();
  const examValue = validExams.includes(rawExam || "") ? rawExam : activeTab;

  // PRICE FILTER
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

  // RATING FILTER
  const rawRating = searchParams.get("rating");
  const minRating =
    Number.isFinite(Number(rawRating)) &&
    validRatings.includes(Number(rawRating))
      ? Number(rawRating)
      : null;

  // LEVEL FILTER
  const rawLevels = searchParams.getAll("level").map((l) => l.toLowerCase());
  const levelValues = rawLevels.filter((l) => validLevels.includes(l));

  // NEW: TAG FILTER
  const rawTagFromUrl = searchParams.get("tags"); // Get the raw value from URL (e.g., "best-seller")

  // Convert the URL tag to the internal backend format (e.g., "best-seller" -> "best-seller")
  const formattedTagForInternalUse = formatTagForBackend(rawTagFromUrl);

  // Validate this formatted tag against validBackendTags.
  // If it's not a valid backend tag, default to "all" internally.
  const tagValue = validBackendTags.includes(
    formattedTagForInternalUse || "all"
  )
    ? formattedTagForInternalUse // Use the formatted tag if it's valid
    : "all"; // Otherwise, default to "all" (which translates to null for backend)

  // This is the actual value sent to the backend ('special-offer', 'new', 'best-seller' or null for 'all')
  const backendTagParam = tagValue === "all" ? null : tagValue;

  // SORTING
  const sortBy = searchParams.get("sort_by") || null;
  const sortOrder = searchParams.get("sort_order") || (sortBy ? "desc" : null);

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit")
    ? 12
    : Number(searchParams.get("limit"));

  const { isLoading, data, error } = useQuery({
    queryKey: [
      "courses",
      examValue,
      page,
      limit,
      minAmountParam,
      maxAmountParam,
      minRating,
      applyPriceFilterFrontend,
      levelValues.sort().join(","),
      sortBy,
      sortOrder,
      tagValue, // NEW: Added tagValue to queryKey
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
        tag: backendTagParam, // NEW: Pass the backend-formatted tag
      }),
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

  // if (levelValues.length > 0) {
  //   courses = courses.filter(
  //     (course) =>
  //       course.level && levelValues.includes(String(course.level).toLowerCase())
  //   );
  // }

  const count = courses.length; // Count after frontend filters, if any

  // PRE-FETCHING NEXT/PREVIOUS PAGES - Use 'limit' for pageCount
  // const pageCount = Math.ceil(backendTotalCount / limit); // NEW: Use limit here

  // if (page < pageCount) {
  //   queryClient.prefetchQuery({
  //     queryKey: [
  //       "courses",
  //       examValue,
  //       page + 1,
  //       limit,
  //       minAmountParam,
  //       maxAmountParam,
  //       minRating,
  //       applyPriceFilterFrontend,
  //       levelValues.sort().join(","),
  //       sortBy,
  //       sortOrder,
  //       tagValue,
  //     ],
  //     queryFn: () =>
  //       getSortedCourses({
  //         examValue,
  //         page: page + 1,
  //         limit,
  //         minAmount: minAmountParam,
  //         maxAmount: maxAmountParam,
  //         minRating,
  //         sortBy: sortBy,
  //         sortOrder: sortOrder,
  //         tag: backendTagParam,
  //       }),
  //   });
  // }

  // if (page > 1) {
  //   queryClient.prefetchQuery({
  //     queryKey: [
  //       "courses",
  //       examValue,
  //       page - 1,
  //       limit,
  //       minAmountParam,
  //       maxAmountParam,
  //       minRating,
  //       applyPriceFilterFrontend,
  //       levelValues.sort().join(","),
  //       sortBy,
  //       sortOrder,
  //       tagValue,
  //     ],
  //     queryFn: () =>
  //       getSortedCourses({
  //         examValue,
  //         page: page - 1,
  //         limit,
  //         minAmount: minAmountParam,
  //         maxAmount: maxAmountParam,
  //         minRating,
  //         sortBy: sortBy,
  //         sortOrder: sortOrder,
  //         tag: backendTagParam,
  //       }),
  //   });
  // }

  return { isLoading, error, courses, count: backendTotalCount };
}
