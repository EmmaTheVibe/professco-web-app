import Explore from "@/app/_components/Explore/Explore";
import Rating from "@/app/_components/Rating/Rating";
import RelatedCourses from "@/app/_components/RelatedCourses/RelatedCourses";
import styles from "./CoursePage.module.css";
import { getCourseById, getCoursesByType } from "@/app/_lib/data-service";
import Footer from "@/app/_components/Footer/Footer";
import { notFound } from "next/navigation";
import { formatAmount } from "@/app/_lib/fns";
import ReusableNav from "@/app/_components/ReusableNav/ReusableNav";
import { courseDetailTabs } from "@/app/_utils/data";
import TabSystem from "@/app/_components/TabSystem/TabSystem";
import CourseHashInitializer from "@/app/_components/CourseHashInitializer";

export default async function Page({ params }) {
  const { courseId, courseType, courseTitle } = await params;

  const course = await getCourseById(courseId);

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

  // const filteredRelatedCourses = relatedCourses.filter(
  //   (c) => c.id !== courseId
  // );

  return (
    <section className={styles.coursepage}>
      <CourseHashInitializer />
      <section className={styles.seg}>
        <div className="container">
          <div className={styles.wrapper}>
            <div>
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
              <h1 className={`boldFont ${styles.title}`}>
                {course.courseTitle}
              </h1>
              <p className={styles.desc}>
                Learn from vetted and certified chartered professionals with
                proven track records
              </p>
              <div className={styles.pricePack}>
                <div className={styles.price}>
                  <p className="boldFont">₦{formatAmount(course.amount)}</p>
                </div>

                <Rating count={reviews_count} rating={cache_rating} />
              </div>
              <button className={`filled ${styles.btn}`}>
                <p>Purchase course</p>
              </button>
            </div>
            <img
              // src="/images/courseThumbnail2.png"
              src={course.cover_image}
              alt="banner"
              className={styles.banner}
            />
          </div>
        </div>
      </section>
      <section className={styles.segB}>
        <TabSystem />
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
            <RelatedCourses courseId={courseId} courseType={courseType} />
          </div>
        </div>
      </section>
      <Explore />
      <Footer />
    </section>
  );
}
