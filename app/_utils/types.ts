export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  [key: string]: unknown;
}

export interface ExamBody {
  slug: string;
  [key: string]: unknown;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  amount: number;
  cover_image: string;
  cache_rating: number;
  reviews_count: number;
  exam_body: ExamBody;
  tags: string[];
  [key: string]: unknown;
}

export interface CoursesResponse {
  courses: Course[];
  count: number;
}
