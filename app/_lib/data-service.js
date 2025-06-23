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

export async function fetchData(endpoint = "", params = {}) {
  const baseUrl = "https://professco.ng/api";
  let url = endpoint ? `${baseUrl}/${endpoint}` : baseUrl;

  // If there are parameters, append them to the URL
  const queryString = buildQueryParams(params);
  if (queryString) {
    url += `?${queryString}`;
  }

  console.log("Attempting to fetch from:", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
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
  limit = 12, // Accept limit, default to 12 if not provided
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
      limit: limit, // Corrected: Use 'limit' for the 'per_page' query param
    };

    // Add exam_bodies if examValue is not "all"
    if (examValue.toLowerCase() !== "all") {
      queryParams.exam_bodies = examValue.toUpperCase();
    }

    // Add Price Filters (Backend-driven when applicable)
    if (minAmount !== null) {
      queryParams.min_amount = minAmount;
    }
    if (maxAmount !== null) {
      queryParams.max_amount = maxAmount;
    }

    // Add Rating Filter (Backend-driven)
    if (minRating !== null) {
      queryParams.min_rating = minRating;
    }

    // Add Sort Parameters (Backend-driven)
    queryParams.sort_by = sortBy || "amount";
    queryParams.sort_order = sortOrder || "desc";

    // NEW: Add Tag Filter
    if (tag !== null) {
      // Only add if tag is not null (i.e., not "all")
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
    console.error(
      `Error fetching courses from API with filters:`,
      queryParams,
      error
    );
    throw error;
  }
}

export async function getAllCourses() {
  try {
    const response = await fetch("http://localhost:3001/courses");

    if (!response.ok) {
      throw new Error(`Error fetching courses: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    throw error;
  }
}

export async function getCourseById(id) {
  try {
    // Use the fetchData utility for consistency and base URL handling
    // The endpoint will be 'course/:id' as per your API
    const data = await fetchData(`course/${id}`);

    // Your API directly returns the course object for this endpoint,
    // unlike the paginated list which had a 'data' array.
    // So, we can return 'data' directly here.

    // If your API returns a wrapper like { course: { ... } } or { data: { ... } }
    // you might need to adjust this return statement.
    // However, for a single resource endpoint, it's common to return the resource directly.

    return data;
  } catch (error) {
    // If fetchData throws an error for 404, it will be caught here.
    // You can choose to re-throw it, or handle it specifically (e.g., return null for 404).
    console.error(`Failed to fetch course with ID ${id}:`, error);

    // If you want to explicitly return null for a 404, you could modify fetchData
    // to include the status code in its error, or check the error message.
    // For now, re-throwing the error is standard for React Query use.
    throw error;
  }
}

export async function getCoursesByType(courseType, page = 1) {
  // Added 'page' parameter for pagination
  try {
    // The 'slug' directly comes from courseType
    // Ensure courseType is in the correct case for the slug (e.g., 'ICAN' vs 'ican')
    // Based on previous discussions, it seems your API expects uppercase for exam_bodies.
    const slug = courseType.toUpperCase();

    // Construct the query parameters.
    // If this endpoint returns a paginated response, we should include 'page' and 'per_page'.
    // If it doesn't support pagination, you can remove queryParams.
    const queryParams = {
      page: page,
      per_page: PAGE_SIZE, // Use PAGE_SIZE for the API's 'per_page' parameter
    };

    // Use the fetchData utility with the dynamic slug in the path
    const data = await fetchData(`exam_body/${slug}/courses`, queryParams);

    // Assuming this endpoint also returns paginated data in the same format
    // as /api/course (i.e., { data: [...courses], total: count })
    const courses = data.data || [];
    const count = data.total || 0;

    return {
      courses: courses,
      count: count,
    };
  } catch (error) {
    console.error(`Failed to fetch courses of type ${courseType}:`, error);
    throw error; // Re-throw the error
  }
}

// export async function getSortedCourses({
//   tagValue = "ALL",
//   examValue = "ALL",
//   page = 1,
// }) {
//   try {
//     // First, get all courses since we need to filter by nested properties
//     const response = await fetch(`http://localhost:3001/courses`);

//     if (!response.ok) {
//       throw new Error(`Error fetching courses: ${response.status}`);
//     }

//     const allCourses = await response.json();

//     // Apply filters
//     const filteredCourses = allCourses.filter((course) => {
//       // Tag filtering logic
//       const matchesTag =
//         tagValue.toLowerCase() === "all" ||
//         (course.courseTags &&
//           course.courseTags.some(
//             (tag) => tag.tagName.toLowerCase() === tagValue.toLowerCase()
//           ));

//       // Exam filtering logic
//       const matchesExam =
//         examValue.toLowerCase() === "all" ||
//         (course.courseType &&
//           course.courseType.toLowerCase() === examValue.toLowerCase());

//       // Return true if both conditions are met
//       return matchesTag && matchesExam;
//     });

//     // Calculate total count for pagination
//     const totalCount = filteredCourses.length;

//     // Calculate pagination indexes
//     const startIndex = (page - 1) * PAGE_SIZE;
//     const endIndex = startIndex + PAGE_SIZE;

//     // Get the courses for the current page
//     const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

//     // Return both the paginated courses and the total count
//     return {
//       courses: paginatedCourses,
//       count: totalCount,
//     };
//   } catch (error) {
//     console.error(`Failed to fetch courses:`, error);
//     throw error;
//   }
// }

// app/_lib/data-service.js
