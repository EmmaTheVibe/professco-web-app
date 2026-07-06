export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  [key: string]: unknown;
}

export interface ExamBody {
  id?: number;
  slug: string;
  name?: string;
  [key: string]: unknown;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  color: string;
  [key: string]: unknown;
}

export interface Tutor {
  id: number;
  first_name: string;
  middlename: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  avatar: string | null;
  gallery: string | null;
  rating: number;
  [key: string]: unknown;
}

export interface CourseModule {
  id: number;
  course_id: number;
  title: string;
  description: string;
  course_section_id?: number;
  manifest_url?: string;
  license_url?: string;
  [key: string]: unknown;
}

export interface Review {
  id: number;
  comment: string;
  rating: number;
  [key: string]: unknown;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  amount: string;
  cover_image: string;
  cache_rating: string | number;
  reviews_count: string | number;
  exam_body: ExamBody;
  tags: string[] | Tag[];
  [key: string]: unknown;
}

export interface CourseDetail {
  id: number;
  code: string;
  exam_body_id: number;
  title: string;
  description: string;
  details: string;
  image: string;
  cover_image: string;
  amount: string;
  cache_rating: string;
  students_count: number;
  modules_count: number;
  reviews_count: number;
  exam_body: ExamBody;
  tags: Tag[];
  tutors: Tutor[];
  modules: CourseModule[];
  reviews: Review[];
  [key: string]: unknown;
}

export interface CoursesResponse {
  courses: Course[];
  count: number;
}
