export async function getCoursesByType(courseType, page = 1) {
  try {
    const slug = courseType.toUpperCase();

    const queryParams = {
      page: page,
      limit: PAGE_SIZE,
    };

    const data = await fetchData(`exam_body/${slug}/courses`, queryParams);

    const courses = data.data || [];
    const count = data.total || 0;

    return {
      courses: courses,
      count: count,
    };
  } catch (error) {
    console.error(`Failed to fetch courses of type ${courseType}:`, error);
    throw error;
  }
}
import PAGE_SIZE from "@/app/_utils/constants";

function buildQueryParams(params) {
  const query = new URLSearchParams();
  for (const key in params) {
    if (
      params[key] !== undefined &&
      params[key] !== null &&
      params[key] !== ""
    ) {
      query.append(key, params[key]);
    }
  }
  return query.toString();
}

export async function fetchData(endpoint = "", params = {}, options = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  let url;
  if (endpoint) {
    const cleanEndpoint = endpoint.startsWith("/")
      ? endpoint.slice(1)
      : endpoint;
    const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    url = `${cleanBaseUrl}/${cleanEndpoint}`;
  } else {
    url = baseUrl;
  }

  const queryString = buildQueryParams(params);
  if (queryString) {
    url += `?${queryString}`;
  }

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
      mode: "cors",
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
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
}) {
  try {
    const queryParams = {
      page: page,
      limit: limit,
    };

    if (examValue.toLowerCase() !== "all") {
      queryParams.exam_bodies = examValue.toUpperCase();
    }

    if (minAmount !== null) {
      queryParams.min_amount = minAmount;
    }
    if (maxAmount !== null) {
      queryParams.max_amount = maxAmount;
    }

    if (minRating !== null) {
      queryParams.min_rating = minRating;
    }

    queryParams.sort_by = sortBy || "amount";
    queryParams.sort_order = sortOrder || "desc";

    if (tag !== null) {
      queryParams.tags = tag;
    }

    const data = await fetchData("course", queryParams);

    const courses = data.data || [];
    const count = data.total || 0;

    return {
      courses: courses,
      count: count,
    };
  } catch (error) {
    console.error(`Error fetching courses from API with filters:`, error);
    throw error;
  }
}

export async function getCourseById(id) {
  try {
    const data = await fetchData(`course/${id}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch course with ID ${id}:`, error);
    throw error;
  }
}

export async function fetchVideo() {
  try {
    const apiUrl = "/api/video";

    // console.log("Attempting to fetch video from proxy:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/dash+xml, video/mp4, */*",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const manifestContent = await response.text();
    return {
      url: "https://professco.ng/videos/videoCodec/manifest.mpd",
      manifest: manifestContent,
    };
  } catch (error) {
    console.error(`Error fetching video manifest:`, error);
    throw error;
  }
}
