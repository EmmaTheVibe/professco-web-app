import Carousel from "@/app/_components/common/Carousel/Carousel";
import Faqs from "@/app/_components/common/Faqs/Faqs";
import GuideCard from "@/app/_components/common/GuideCard/GuideCard";
import ReviewCard from "@/app/_components/common/ReviewCard/ReviewCard";
import Segment from "@/app/_components/layout/Segment/Segment";
import { guideData } from "@/app/_utils/data";
import Link from "next/link";
import CourseSegment from "@/app/_components/course/CourseSegment/CourseSegment";
import styles from "./HomePage.module.css";
import Footer from "@/app/_components/layout/Footer/Footer";
import { fetchData } from "./_lib/data-service";

export default function Page() {
  // async function exampleUsage() {
  //   try {
  //     const courseData = await fetchData("course");
  //     console.log("Course data received:", courseData);
  //   } catch (error) {
  //     console.log("Failed to fetch data:", error.message);
  //   }
  // }
  // exampleUsage();
  return (
    <section className={styles.homepage}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={` boldFont ${styles.title}`}>
            Pass your professional exams with ease the first time
          </h1>
          <p className={`lightFont ${styles.desc}`}>
            We offer you/provide a variety of professional courses and
            certification from top education providers (from around the world).
            Learn with Professco today!
          </p>
          <div>
            <Link href="/courses">
              <button className={`filled ${styles.herobtn}`}>
                <p>Explore our courses</p>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <CourseSegment />

      <Segment />

      <section className={styles.segB}>
        <div className="container">
          <div className={styles.frameB}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <img
                src="/images/medalbg.svg"
                alt="medalbg"
                className={styles.medalbg}
              />
              <img
                src="/images/pagesthick.png"
                alt="pages"
                className={styles.pagesthick}
              />
            </div>
            <div className={styles.boxB}>
              <h1 className="boldFont">Become certified</h1>
              <p className={`lightFont ${styles.txt}`}>
                Improve your resume, expand your abilities, start a new career
                path by becoming a certified professional. Join us to start.
              </p>
              <div className={styles.btnPack}>
                <Link href="/getstarted">
                  <button className="filled">
                    <p>Get started</p>
                  </button>
                </Link>
                <Link href="/courses">
                  <button className="bare" width="242px">
                    <p>Explore courses</p>
                    <img
                      src="/images/plus.svg"
                      alt="plus"
                      style={{
                        marginLeft: "10px",
                        transform: "translateY(1px)",
                      }}
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.segC}>
        <div className={`container ${styles.segCWrapper}`}>
          <div className={styles.segCFrame}>
            <img src="/images/avatargrp.png" alt="avatar group" />
            <div>
              <h3 className="boldFont">5000+</h3>
              <p>Professionals prepare with Professco</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.segD}>
        <div className={`container ${styles.segDWrapper}`}>
          <div className={styles.segDFrame}>
            <div className={styles.reviewHero}>
              <h1 className="boldFont">
                What professionals like you are saying
              </h1>
              <p className={`lightFont ${styles.txt}`}>
                Very impressed about the quality of learning. It is properly
                planned out with engaging and necessary materials from very well
                practiced professionals. Glad to say I&apos;m now certified in
                my field and now looking forward to taking more online classes
              </p>
              <div className={styles.btnPackB}>
                <button className="filled">
                  <p>Get started</p>
                </button>

                <Link href="/courses">
                  <button className="bare">
                    <p>Explore courses</p>
                    <img
                      src="/images/plus.svg"
                      alt="plus"
                      style={{
                        marginLeft: "10px",
                        transform: "translateY(1px)",
                      }}
                    />
                  </button>
                </Link>
              </div>
            </div>

            <div className={styles.reviewFrame}>
              <div className={styles.reviewGrid}>
                {[...Array(2)].map((_, index) => (
                  <ReviewCard key={index} />
                ))}
              </div>
              <div className={styles.reviewGridB}>
                {[...Array(2)].map((_, index) => (
                  <ReviewCard key={index} />
                ))}
              </div>
              {/* {lg && (
                <div className={styles.reviewGrid}>
                  {[...Array(2)].map((_, index) => (
                    <ReviewCard key={index} />
                  ))}
                </div>
              )} */}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.segE}>
        <img
          src="/images/greencurve.svg"
          alt="vector"
          className={styles.greencurve}
        />
        <img
          src="/images/yellowarch.svg"
          alt="vector"
          className={styles.yellowarch}
        />
        <div className={`container ${styles.segEWrapper}`}>
          <div className={styles.segEFrame}>
            <div className={styles.boxC}>
              <h1 className="boldFont">Lecture on Professco</h1>
              <p className={`lightFont ${styles.txt}`}>
                Join (thousands of) qualified professionals/instructors from all
                over the world to teach (thousands/millions) of students on
                Professco.
              </p>
              <div className={styles.btnPackB}>
                <button className="filled">
                  <p>Get started</p>
                </button>
                <button className="bare">
                  <p>Learn more</p>
                  <img
                    src="/images/plus.svg"
                    alt="plus"
                    style={{
                      marginLeft: "10px",
                      transform: "translateY(1px)",
                    }}
                  />
                </button>
              </div>
            </div>

            <Carousel />
          </div>
        </div>
      </section>

      <section className={styles.segF}>
        <div className={`container ${styles.segFWrapper}`}>
          <h1 className="boldFont" style={{ marginBottom: "22px" }}>
            FAQs
          </h1>
          <p className={styles.txt}>Search and get answers to your enquiries</p>
          <Faqs />
          <h1 className="boldFont" style={{ marginBottom: "16px" }}>
            Still have a question?
          </h1>
          <p className={styles.txt}>
            Click the button below to leave your questions
          </p>
          <Link href="/contact">
            <button className={`outlined ${styles.contactBtn}`}>
              <p>Contact us</p>
            </button>
          </Link>
          <div className={styles.guides}>
            <div className={styles.boxD}>
              <div className={styles.segFFrame}>
                <p style={{ marginBottom: "16px" }}>Learn</p>
                <h2
                  className={`boldFont ${styles.guidesHeading}`}
                  style={{ marginBottom: "16px" }}
                >
                  Guides and Resources to help you
                </h2>
                <p className={`lightFont ${styles.guidesDesc}`}>
                  Learn from vetted and certified chartered professionals with
                  proven track records
                </p>
              </div>

              <button className={`outlined ${styles.guidesBtn}`}>
                <p>View all</p>
              </button>
            </div>

            <div className={styles.guidesGrid}>
              {guideData.map((guide, index) => (
                <GuideCard key={index} guide={guide} />
              ))}
            </div>
          </div>
        </div>
        {/* <MultipleItems /> */}
      </section>

      <Footer />
    </section>
  );
}
