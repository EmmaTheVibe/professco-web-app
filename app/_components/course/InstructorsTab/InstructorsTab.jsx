"use client";
import { useRef } from "react";
import { useMediaQuery } from "@mui/material";
import styles from "./InstructorsTab.module.css";
import ScrollButton from "@/app/_components/common/ScrollButton/ScrollButton";
import useScrollEnd from "@/app/_components/common/ScrollButton/useScrollEnd";

function InstructorCourseGrid({ lg }) {
  const gridWrapperRef = useRef(null);
  const isAtEnd = useScrollEnd(gridWrapperRef);

  return (
    <div className={styles.gridWrapperContainer}>
      <div
        className={`${styles.gridWrapper} ${isAtEnd ? styles.atEnd : ""}`}
        ref={gridWrapperRef}
      >
        <div className={styles.cardGrid}>
          {[...Array(3)].map((_, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.banner}>
                <img
                  src={`/images/course-banner-${lg ? "md" : "sm"}.png`}
                  alt="banner"
                  className={styles.banner}
                />
              </div>

              <div className={styles.cardInfo}>
                <p className={`${styles.cardTitle} boldFont`}>
                  BA1 Fundamentals of Business Economics
                </p>
                <p className={`${styles.cardType}`}>ICAN</p>
                <div className={styles.rating}>
                  <img
                    src="/images/blackstar.svg"
                    alt="star"
                    className={styles.blackstar}
                  />
                  <p style={{ fontSize: "14px", lineHeight: "20px" }}>
                    4.8 (150 reviews)
                  </p>
                </div>
                <p className={styles.cardTxt}>
                  <span>What you'll learn: </span>Macroeconomic...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.scrollButtonCarrier}>
        <ScrollButton containerRef={gridWrapperRef} scrollAmount={424} />
      </div>
    </div>
  );
}

export default function InstructorsTab({ course }) {
  const lg = useMediaQuery("(min-width: 400px)");

  return (
    <div className={styles.instructorsTab}>
      <div className={styles.line}>
        <h1 className={`boldFont ${styles.heading}`}>Instructor(s)</h1>
        <button className={`bareB ${styles.viewAllButton}`}>
          <p>View All</p>
        </button>
      </div>
      <div className={styles.instructorsGrid}>
        {course.tutors.map((tutor) => (
          <div className={styles.instructorWrapper} key={tutor.id}>
            <div className={styles.instructor}>
              <div className={styles.instructorBox}>
                <img
                  src="/images/instructor-avatar.svg"
                  alt="avatar"
                  className={styles.avatar}
                />
                <div className={styles.instructorBrief}>
                  <p className={`${styles.instructorName} boldFont`}>
                    {`${tutor.last_name} ${
                      tutor.middlename && tutor.middlename
                    } ${tutor.first_name}`}
                  </p>
                  <p className={styles.instructorTxt}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim
                  </p>
                  <div className={styles.courseTypes}>
                    <div className={styles.courseType}>
                      <p className="semiboldFont">CIMA</p>
                    </div>
                    <div className={styles.courseType}>
                      <p className="semiboldFont">ICAN</p>
                    </div>
                    <div className={styles.courseType}>
                      <p className="semiboldFont">ACCA</p>
                    </div>
                  </div>
                  <div className={styles.instructorSummary}>
                    <p className={styles.learners}>
                      6757 <span>learners</span>
                    </p>
                    <div className={styles.divider}></div>
                    <p className={styles.courses}>
                      3 <span>courses</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.dividerB}></div>
              <InstructorCourseGrid lg={lg} />
            </div>
            <p className={styles.moreInfo}>
              Tim Buchalka
              <br />
              Java Python Android and C# Expert Developer - 1.21M students
              <br />
              Tim's been a professional software developer for close to 40
              years. During his career, he has worked for major companies such
              as Fujitsu, Mitsubishi, and Saab.
              <br />
              His video courses are used to train developers in major companies
              such as Mercedes-Benz, Paypal, VW, Pitney Bowes, IBM, and T-Mobile
              just to name a few (via the Udemy for Business program).
              <br />
              What makes Tim unique is his professional programming career -
              many instructors have never programmed professionally, let alone
              had a distinguished professional development career like Tim.
              <br />
              Tim has trained over 1.21 million students how to program, way
              more than a typical IT Professor at a college does in a lifetime.
              <br />
              In fact, Tim's courses are often purchased by students struggling
              to get through college programming courses.
              <br />
              "I am learning a lot about Java very quickly. I wish my college
              courses worked this way, they drag the same amount of material out
              over months." - Thomas Neal
              <br />
              "I love this guy. I'm in school for java right now at a local
              college and I bought this course hoping it would help clarify the
              fuzzy areas of my coursework. There's no comparison. Every time I
              get lost in my textbook, I watch a couple more of these videos and
              I'm right back on track. He explains everything so perfectly. It
              sinks right in." - Kristen Andreani
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
