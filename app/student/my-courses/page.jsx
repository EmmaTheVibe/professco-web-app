import MyCoursesContent from "@/app/_components/student/MyCoursesContent/MyCoursesContent";
import Explore from "@/app/_components/layout/Explore/Explore";
import Footer from "@/app/_components/layout/Footer/Footer";
import styles from "./MyCoursesPage.module.css";

export default function MyCourses() {
  return (
    <section className={styles.myCourses}>
      <div className="container">
        <MyCoursesContent />
      </div>
      {/* <Explore />
      <Footer /> */}
    </section>
  );
}
