import PAGE_SIZE from "@/app/_utils/constants";
import type { Course, CoursesResponse } from "@/app/_utils/types";

interface QueryParams {
  [key: string]: string | number | null | undefined;
}

interface FetchOptions extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
}

interface GetSortedCoursesParams {
  examValue?: string;
  page?: number;
  limit?: number;
  minAmount?: number | null;
  maxAmount?: number | null;
  minRating?: number | null;
  sortBy?: string | null;
  sortOrder?: string | null;
  tag?: string | null;
}

function buildQueryParams(params: QueryParams): string {
  const query = new URLSearchParams();
  for (const key in params) {
    if (
      params[key] !== undefined &&
      params[key] !== null &&
      params[key] !== ""
    ) {
      query.append(key, String(params[key]));
    }
  }
  return query.toString();
}

export async function fetchData(
  endpoint: string = "",
  params: QueryParams = {},
  options: FetchOptions = {}
): Promise<unknown> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;

  let url: string;
  if (endpoint) {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
    const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    url = `${cleanBaseUrl}/${cleanEndpoint}`;
  } else {
    url = baseUrl;
  }

  const queryString = buildQueryParams(params);
  if (queryString) {
    url += `?${queryString}`;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
      mode: "cors",
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getCoursesByType(
  courseType: string,
  page: number = 1
): Promise<CoursesResponse> {
  try {
    const slug = courseType.toUpperCase();
    const data = await fetchData(`exam_body/${slug}/courses`, {
      page,
      limit: PAGE_SIZE,
    }) as { data: Course[]; total: number };

    return {
      courses: data.data || [],
      count: data.total || 0,
    };
  } catch (error) {
    console.error(`Failed to fetch courses of type ${courseType}:`, error);
    throw error;
  }
}

export async function getSortedCourses({
  examValue = "all",
  page = 1,
  limit = 12,
  minAmount = null,
  maxAmount = null,
  minRating = null,
  sortBy = null,
  sortOrder = null,
  tag = null,
}: GetSortedCoursesParams): Promise<CoursesResponse> {
  try {
    const queryParams: QueryParams = { page, limit };

    if (examValue.toLowerCase() !== "all") {
      queryParams.exam_bodies = examValue.toUpperCase();
    }
    if (minAmount !== null) queryParams.min_amount = minAmount;
    if (maxAmount !== null) queryParams.max_amount = maxAmount;
    if (minRating !== null) queryParams.min_rating = minRating;

    queryParams.sort_by = sortBy || "amount";
    queryParams.sort_order = sortOrder || "desc";

    if (tag !== null) queryParams.tags = tag;

    const data = await fetchData("course", queryParams) as { data: Course[]; total: number };

    return {
      courses: data.data || [],
      count: data.total || 0,
    };
  } catch (error) {
    console.error("Error fetching courses from API with filters:", error);
    throw error;
  }
}

export async function getCourseById(id: number | string): Promise<unknown> {
  try {
    return await fetchData(`course/${id}`);
  } catch (error) {
    console.error(`Failed to fetch course with ID ${id}:`, error);
    throw error;
  }
}

export async function fetchVideo(): Promise<{ url: string; manifest: string }> {
  try {
    const response = await fetch("/api/video", {
      method: "GET",
      headers: {
        Accept: "application/dash+xml, video/mp4, */*",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      url: "https://professco.ng/videos/videoCodec/manifest.mpd",
      manifest: await response.text(),
    };
  } catch (error) {
    console.error("Error fetching video manifest:", error);
    throw error;
  }
}
