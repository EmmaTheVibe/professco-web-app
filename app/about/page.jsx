"use client";
import styles from "./About.module.css";
import HomeNav from "@/app/_components/navigation/HomeNav/HomeNav";
import Footer from "@/app/_components/layout/Footer/Footer";
import Segment from "@/app/_components/layout/Segment/Segment";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Page() {
  const lg = useMediaQuery("(min-width: 1000px)");

  return (
    <section className={styles.about}>
      <section className={styles.hero}>
        <div className={`container ${styles.wrapper}`}>
          <p className={`semiboldFont ${styles.tag}`}>About us</p>
          <h1 className="semiboldFont">
            Empower Your ICAN Journey with Professco
          </h1>
          <p className={styles.desc}>Making education accessible for all!</p>
          <div className={styles.btnPack}>
            <button className="filled">
              <p>For Student</p>
            </button>
            <button className="outlined">
              <p>For Lecturers</p>
            </button>
          </div>
        </div>
      </section>
      <section className={styles.seg}>
        <div className={`container ${styles.wrapperB}`}>
          <h1 className="semiboldFont">
            Tailored ICAN courses and tools for students to succeed and
            lecturers to earn.
          </h1>
          <p>
            Welcome to Professco, the ultimate web learning platform designed to
            help students excel in their ICAN exams and support lecturers in
            creating impactful courses. We provide tailored learning experiences
            that simplify complex concepts and guide you step-by-step towards
            your professional goals.
          </p>
          <br />
          <p>
            Professco bridges the gap between knowledge and opportunity by
            equipping students with the tools and resources they need to
            succeed. For lecturers, it’s a chance to share expertise, build a
            legacy, and earn income from their valuable insights.
          </p>
        </div>
      </section>
      <section className={styles.frame}>
        <div className={styles.infoBox}>
          <div className={styles.circle}>
            <div className={styles.innerCircle}>
              <img src="/images/sparkles.svg" alt="sparkles" />
            </div>
          </div>
          <h1 className="semiboldFont">Tailored ICAN Courses:</h1>
          <p>
            Access a library of expertly designed courses that align with ICAN
            requirements.
          </p>
          <div className={styles.points}>
            <div className={styles.line}>
              <div className={styles.bullet}>
                <img src="/images/about-tick.svg" alt="tick" />
              </div>
              <p>-</p>
            </div>
            <div className={styles.line}>
              <div className={styles.bullet}>
                <img src="/images/about-tick.svg" alt="tick" />
              </div>
              <p>-</p>
            </div>
            <div className={styles.line}>
              <div className={styles.bullet}>
                <img src="/images/about-tick.svg" alt="tick" />
              </div>
              <p>-</p>
            </div>
          </div>
        </div>
        <img
          src={lg ? "/images/about-pc-1.png" : "/images/about-mobile-1.png"}
          alt="banner"
          className={styles.banner}
        />
      </section>

      <section className={`${styles.frame} ${styles.rev}`}>
        <div className={styles.infoBox}>
          <div className={styles.circle}>
            <div className={styles.innerCircle}>
              <img src="/images/sparkles.svg" alt="sparkles" />
            </div>
          </div>
          <h1 className="semiboldFont">Student-Centric Learning:</h1>
          <p>
            Learn at your own pace with flexible modules, quizzes, and progress
            tracking.
          </p>
          <div className={styles.points}>
            <div className={styles.line}>
              <div className={styles.bullet}>
                <img src="/images/about-tick.svg" alt="tick" />
              </div>
              <p>-</p>
            </div>
            <div className={styles.line}>
              <div className={styles.bullet}>
                <img src="/images/about-tick.svg" alt="tick" />
              </div>
              <p>-</p>
            </div>
            <div className={styles.line}>
              <div className={styles.bullet}>
                <img src="/images/about-tick.svg" alt="tick" />
              </div>
              <p>-</p>
            </div>
          </div>
        </div>
        <img
          src={lg ? "/images/about-pc-2.png" : "/images/about-mobile-2.png"}
          alt="banner"
          className={styles.banner}
        />
      </section>

      <section className={styles.frame}>
        <div className={styles.infoBox}>
          <div className={styles.circle}>
            <div className={styles.innerCircle}>
              <img src="/images/sparkles.svg" alt="sparkles" />
            </div>
          </div>
          <h1 className="semiboldFont">Lecturer Income Opportunities:</h1>
          <p>
            Create, publish, and monetize your courses while reaching a broad
            audience of learners.
          </p>
          <div className={styles.points}>
            <div className={styles.line}>
              <div className={styles.bullet}>
                <img src="/images/about-tick.svg" alt="tick" />
              </div>
              <p>-</p>
            </div>
            <div className={styles.line}>
              <div className={styles.bullet}>
                <img src="/images/about-tick.svg" alt="tick" />
              </div>
              <p>-</p>
            </div>
            <div className={styles.line}>
              <div className={styles.bullet}>
                <img src="/images/about-tick.svg" alt="tick" />
              </div>
              <p>-</p>
            </div>
          </div>
        </div>
        <img
          src={lg ? "/images/about-pc-3.png" : "/images/about-mobile-3.png"}
          alt="banner"
          className={styles.banner}
        />
      </section>

      <section className={`${styles.frame} ${styles.rev}`}>
        <div className={styles.infoBox}>
          <div className={styles.circle}>
            <img src="/images/sparkles.svg" alt="sparkles" />
          </div>
          <h1 className="semiboldFont">Affordable Learning Solutions:</h1>
          <p>Achieve your professional goals without breaking the bank.</p>
          <div className={styles.points}>
            <div className={styles.line}>
              <div className={styles.bullet}>
                <img src="/images/about-tick.svg" alt="tick" />
              </div>
              <p>-</p>
            </div>
            <div className={styles.line}>
              <div className={styles.bullet}>
                <img src="/images/about-tick.svg" alt="tick" />
              </div>
              <p>-</p>
            </div>
            <div className={styles.line}>
              <div className={styles.bullet}>
                <img src="/images/about-tick.svg" alt="tick" />
              </div>
              <p>-</p>
            </div>
          </div>
        </div>
        <img
          src={lg ? "/images/about-pc-2.png" : "/images/about-mobile-2.png"}
          alt="banner"
          className={`${styles.banner} ${styles.last}`}
        />
      </section>

      <Segment />
      <Footer />
    </section>
  );
}
