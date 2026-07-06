import Explore from "../_components/layout/Explore/Explore";
import Footer from "../_components/layout/Footer/Footer";
import SuggestedCourses from "../_components/course/SuggestedCourses/SuggestedCourses";
import styles from "./StudentPage.module.css";
export default function page() {
  return (
    <section className={styles.home}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={`boldFont ${styles.title}`}>
            Pass your professional exams with ease the first time
          </h1>
          <p className={`lightFont ${styles.desc}`}>
            We offer you/provide a variety of professional courses and
            certification from top education providers (from around the world).
            Learn with Professco today!
          </p>
        </div>
      </div>
      <SuggestedCourses />
      <Explore />
      <Footer />
    </section>
  );
}
