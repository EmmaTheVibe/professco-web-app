import Explore from "@/app/_components/Explore/Explore";
import Footer from "@/app/_components/Footer/Footer";
import Rating from "@/app/_components/Rating/Rating";
import RelatedCourses from "@/app/_components/RelatedCourses/RelatedCourses";
import Spinner from "@/app/_components/Spinner/Spinner";
import TabSystem from "@/app/_components/TabSystem/TabSystem";
import { getCourseById } from "@/app/_lib/data-service";
import { formatAmount } from "@/app/_lib/fns";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import styles from "./CoursePage.module.css";
import ClientVideoWrapper from "@/app/_components/ClientVideoWrapper/ClientVideoWrapper";
import TabSystemWrapper from "@/app/_components/TabSystem/TabSystemWrapper";

export default async function Page({ params }) {
  const videoManifest =
    "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";
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
            {/* <img
              src={course.cover_image}
              alt="banner"
              className={styles.banner}
            /> */}
            <div className={styles.banner}>
              <ClientVideoWrapper
                manifestUri={videoManifest}
                title={course.title}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.segB}>
        <TabSystemWrapper />
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
