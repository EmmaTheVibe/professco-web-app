# Code Review TODOs

Working notes from the July 31, 2026 review pass.

## High Priority

- Add entitlement checks to purchased-course video pages once the backend endpoint is available.
  - Current page: `app/student/my-courses/[examType]/[courseId]/page.jsx`
  - Current risk: the page fetches a course by public course id and renders the video player without confirming that the authenticated student owns the course.
  - Expected direction: use the upcoming authenticated backend endpoint, or validate the route course id against the student's enrolled courses before rendering video/license data.

- Add debug logs around guest OTP checkout payloads.
  - Current files:
    - `app/_components/auth/OTPModal/OTPModal.jsx`
    - `app/_components/cart/components/Summary.jsx`
    - `app/_lib/payment-service.js`
    - `app/api/payment/initiate/route.ts`
    - `app/api/payment/multiple/route.ts`
  - Goal: log what OTP verification returns, what `Summary` passes into `processPayment`, what the payment service sends, and what the API route receives.
  - Reason: guest checkout currently passes the OTP verification response through a parameter named `email`, so logs should confirm whether the payment route receives an email string or an object.

## Medium Priority

- Keep student "My courses" simulated for now, but replace it with real dashboard data later.
  - Current file: `app/_components/student/MyCoursesGrid/MyCoursesGrid.tsx`
  - Current behavior: fetches public ICAN courses and applies simulated progress/rating states.
  - Future direction: use `useStudentCourses()` and `/api/dashboard/courses` when the backend shape is ready.

- Fix public course detail 404 handling.
  - Current file: `app/courses/[courseType]/[courseTitle]/[courseId]/page.jsx`
  - Current issue: `course.modules` is read before the `if (!course) notFound()` check.
  - Future direction: validate `course` and `course.modules` before reading module data.

- Harden API proxy response parsing.
  - Current files:
    - `app/api/payment/initiate/route.ts`
    - `app/api/payment/multiple/route.ts`
    - `app/api/dashboard/courses/route.ts`
    - `app/api/auth/login/route.ts`
    - `app/api/auth/register/route.ts`
  - Current issue: routes call `response.json()` directly, which can turn non-JSON upstream errors into generic 500s.
  - Future direction: parse JSON defensively and preserve upstream status/message where possible.

- Revisit invalid-token client auth state.
  - Current file: `app/_components/auth/AuthSeeder.tsx`
  - Current issue: cookie presence seeds `isAuthenticated: true`, but a failed `/api/auth/me` does not explicitly clear the Zustand auth store.
  - Future direction: clear client auth state when `/api/auth/me` returns non-OK or no profile.

## Pagination Decision

- Keep a fixed pagination size.
  - Current files:
    - `app/_hooks/useCourses.ts`
    - `app/_components/common/Pagination/Pagination.tsx`
    - `app/_utils/constants.js`
  - Recommended direction: make `PAGE_SIZE` the single source of truth. Do not let the URL `limit` parameter change the fetch size unless pagination also receives and uses that same limit.
  - Practical fix: remove or ignore `searchParams.get("limit")` in `useCourses.ts` and always request `PAGE_SIZE`, matching `Pagination.tsx`.

## Deferred / Intentionally Left Alone

- Course search is sidelined for now.
  - Current file: `app/_components/course/CourseList/CourseList.jsx`
  - Note: search currently references old field names, but this is not active work.

- Lint script is left as-is for now.
  - Current file: `package.json`
  - Note: `next lint` should eventually be replaced with an ESLint CLI command for the current Next.js version.
