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
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  let url = endpoint ? `${baseUrl}/${endpoint}` : baseUrl;

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
    const data = await fetchData(`course/${id}`);

    return data;
  } catch (error) {
    console.error(`Failed to fetch course with ID ${id}:`, error);

    throw error;
  }
}

export async function getCoursesByType(courseType, page = 1) {
  try {
    const slug = courseType.toUpperCase();

    const queryParams = {
      page: page,
      per_page: PAGE_SIZE,
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
