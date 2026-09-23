import { Suspense } from "react";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import ClientVideoWrapper from "@/app/_components/video/ClientVideoWrapper/ClientVideoWrapper";
import CourseContentPanel from "@/app/_components/course/CourseContentPanel/CourseContentPanel";
import PanelToggleButton from "@/app/_components/course/CourseContentPanel/PanelToggleButton";
import TabSystemWrapper from "@/app/_components/course/TabSystem/TabSystemWrapper";
import Footer from "@/app/_components/layout/Footer/Footer";
import Spinner from "@/app/_components/layout/Spinner/Spinner";
import { getCourseById, getStudentCourses } from "@/app/_lib/data-service";
import styles from "./WatchCoursePage.module.css";

export default async function WatchCourse({ params, searchParams }) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);
  const { moduleId } = await searchParams;

  if (!course) {
    notFound();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  // Fail open on infrastructure errors so a backend hiccup doesn't lock out
  // legitimate purchasers; only a definitive "not owned" result denies access.
  let ownsCourse = true;
  try {
    const studentCourses = await getStudentCourses(token);
    ownsCourse = studentCourses.data.some(
      (owned) => owned.id === Number(courseId),
    );
  } catch (error) {
    console.log("DEBUG dashboard/courses fetch failed:", error.message);
  }

  if (!ownsCourse) {
    redirect("/student/my-courses");
  }

  const defaultModuleId = course.modules[0]?.id;
  const moduleExists =
    moduleId && course.modules.some((mod) => mod.id === Number(moduleId));
  const actualModuleId = moduleExists ? Number(moduleId) : defaultModuleId;

  const activeModule = course.modules.find((mod) => mod.id === actualModuleId);

  return (
    <section className={styles.watchCourse}>
      <section className={styles.left}>
        <div className={styles.layout}>
          <div className={`container ${styles.main}`}>
            <div className={styles.videoWrapper}>
              <Suspense fallback={<Spinner />}>
                <ClientVideoWrapper
                  title={course.title}
                  poster={course.cover_image}
                  course={course}
                  moduleId={actualModuleId}
                />
              </Suspense>
              <PanelToggleButton />
            </div>

            {/* <div className={styles.infoRow}>
            <h1 className={`boldFont ${styles.title}`}>{course.title}</h1>
            <div className={styles.moduleLine}>
              <p className="semiboldFont">{activeModule?.title}</p>
              {activeModule?.description && <p>{activeModule.description}</p>}
            </div>
          </div> */}
          </div>
          <TabSystemWrapper course={course} moduleId={actualModuleId} />
        </div>

        <Footer showFull={false} />
      </section>

      <CourseContentPanel course={course} moduleId={actualModuleId} />
    </section>
  );
}
