import ClientVideoWrapper from "@/app/_components/video/ClientVideoWrapper/ClientVideoWrapper";
import Explore from "@/app/_components/layout/Explore/Explore";
import Footer from "@/app/_components/layout/Footer/Footer";
import Rating from "@/app/_components/common/Rating/Rating";
import RelatedCourses from "@/app/_components/course/RelatedCourses/RelatedCourses";
import Spinner from "@/app/_components/layout/Spinner/Spinner";
import TabSystemWrapper from "@/app/_components/course/TabSystem/TabSystemWrapper";
import { getCourseById } from "@/app/_lib/data-service";
import { formatAmount } from "@/app/_lib/fns";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import styles from "./CoursePage.module.css";
import Link from "next/link";
import AddToCartButton from "@/app/_components/cart/AddToCartButton";

export default async function Page({ params, searchParams }) {
  const { courseId, courseType, courseTitle } = await params;
  const course = await getCourseById(courseId);
  const { moduleId } = await searchParams;

  const defaultModuleId = course.modules[0]?.id;
  const moduleExists =
    moduleId && course.modules.some((mod) => mod.id === Number(moduleId));
  const actualModuleId = moduleExists ? Number(moduleId) : defaultModuleId;

  if (!course) {
    notFound();
  }

  const expectedCourseType = course.exam_body?.slug.toLowerCase();
  const expectedCourseTitle = course.title.toLowerCase().replace(/\s+/g, "-");

  if (
    courseType !== expectedCourseType ||
    decodeURIComponent(courseTitle) !== expectedCourseTitle
  ) {
    notFound();
  }

  const { cache_rating, reviews_count } = course;

  return (
    <section className={styles.coursepage}>
      <section className={styles.seg}>
        <div className="container">
          <div className={styles.wrapper}>
            <div className={styles.infoBox}>
              <div className={styles.line}>
                <p>Courses</p>
                <img
                  src="/images/arrowright.svg"
                  alt="arrow"
                  style={{
                    margin: "0 8px",
                    transform: "translateY(-0.7px)",
                  }}
                />
                <p>{course.exam_body?.slug}</p>
                <img
                  src="/images/arrowright.svg"
                  alt="arrow"
                  style={{
                    margin: "0 8px",
                    transform: "translateY(-1.3px)",
                  }}
                />
                <p className="semiboldFont">Fundamentals</p>
              </div>
              <h1 className={`boldFont ${styles.title}`}>{course.title}</h1>
              <p className={styles.desc}>{course.description}</p>
              <div className={styles.pricePack}>
                <div className={styles.price}>
                  <p className="boldFont">₦{formatAmount(course.amount)}</p>
                </div>

                <Rating count={reviews_count} rating={cache_rating} />
              </div>
              <div className={styles.btnGroup}>
                <Link
                  href={`/checkout?directPurchase=true&courseId=${courseId}`}
                >
                  <button className={`filled ${styles.btn}`}>
                    <p>Purchase course</p>
                  </button>
                </Link>
                <AddToCartButton courseId={courseId} />
              </div>
            </div>
            {/* <img
              src={course.cover_image}
              alt="banner"
              className={styles.banner}
            /> */}
            <div className={styles.banner}>
              <Suspense fallback={<Spinner />}>
                <ClientVideoWrapper
                  title={course.title}
                  poster={course.cover_image}
                  course={course}
                  moduleId={actualModuleId}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.segB}>
        <TabSystemWrapper course={course} moduleId={actualModuleId} />
      </section>
      <section className={styles.segC}>
        <div className={`container ${styles.segCWrapper}`}>
          <div className={styles.top}>
            <h1 className="boldFont">Related courses</h1>
            <p className={`lightFont ${styles.relatedInfo}`}>
              Similar courses taken by others who are preparing for exams like
              you
            </p>
          </div>

          <div className={styles.bottom}>
            <Suspense fallback={<Spinner />}>
              <RelatedCourses courseId={courseId} courseType={courseType} />
            </Suspense>
          </div>
        </div>
      </section>
      <Suspense fallback={<Spinner />}>
        <Explore />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Footer />
      </Suspense>
    </section>
  );
}
