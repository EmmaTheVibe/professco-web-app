import styles from "./About.module.css";
import Footer from "@/app/_components/layout/Footer/Footer";
import Segment from "@/app/_components/layout/Segment/Segment";
import SlideInImage from "@/app/_components/common/SlideInImage/SlideInImage";

// Section 4 reuses image 2 until about-pc-4 / about-mobile-4 are exported from Figma.
const features = [
  {
    title: "Tailored ICAN Courses:",
    description:
      "Access a library of expertly designed courses that align with ICAN requirements.",
    points: [
      "Every course meets ICAN standards.",
      "Learn from top professionals and educators.",
      "Built to help you pass with confidence.",
    ],
    image: { pc: "/images/about-pc-1.png", mobile: "/images/about-mobile-1.png" },
  },
  {
    title: "Student-Centric Learning:",
    description:
      "Learn at your own pace with flexible modules, quizzes, and progress tracking.",
    points: [
      "Study anytime, anywhere at your pace.",
      "Bite-sized lessons for easy understanding.",
      "Stay motivated with clear milestones.",
    ],
    image: { pc: "/images/about-pc-2.png", mobile: "/images/about-mobile-2.png" },
  },
  {
    title: "Lecturer Income Opportunities:",
    description:
      "Create, publish, and monetize your courses while reaching a broad audience of learners.",
    points: [
      "Build and publish your content seamlessly.",
      "Expand your impact with a wide learner base.",
      "Teach, manage, and grow in one place.",
    ],
    image: { pc: "/images/about-pc-3.png", mobile: "/images/about-mobile-3.png" },
  },
  {
    title: "Affordable Learning Solutions:",
    description: "Achieve your professional goals without breaking the bank.",
    points: [
      "Quality education at a low cost.",
      "Maximize your investment in every lesson.",
      "Advance your career without overspending.",
    ],
    image: { pc: "/images/about-pc-2.png", mobile: "/images/about-mobile-2.png" },
  },
];

export default function Page() {
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

      <div className={`container ${styles.features}`}>
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`${styles.card} ${index % 2 === 1 ? styles.rev : ""}`}
          >
            <div className={styles.textBox}>
              <div className={styles.infoBox}>
                <div className={styles.circle}>
                  <img src="/images/sparkles.svg" alt="" />
                </div>
                <h1 className="semiboldFont">{feature.title}</h1>
                <p>{feature.description}</p>
                <div className={styles.points}>
                  {feature.points.map((point) => (
                    <div key={point} className={styles.line}>
                      <div className={styles.bullet}>
                        <img src="/images/about-tick.svg" alt="" />
                      </div>
                      <p>{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <picture className={styles.picture}>
              <source media="(min-width: 600px)" srcSet={feature.image.pc} />
              <SlideInImage
                src={feature.image.mobile}
                alt=""
                className={styles.banner}
                from={index % 2 === 1 ? "left" : "right"}
              />
            </picture>
          </div>
        ))}
      </div>

      <Segment />
      <Footer />
    </section>
  );
}
