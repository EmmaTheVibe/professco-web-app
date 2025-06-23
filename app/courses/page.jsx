import CourseSegment from "@/app/_components/CourseSegment/CourseSegment";
import Explore from "@/app/_components/Explore/Explore";
import styles from "./Courses.module.css";
import Footer from "@/app/_components/Footer/Footer";

export default function Page() {
  return (
    <section className={styles.courses}>
      <section className={styles.seg}>
        <CourseSegment showAll={true} />
      </section>
      <Explore />
      <Footer />
    </section>
  );
}
