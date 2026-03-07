import Explore from "../_components/layout/Explore/Explore";
import Footer from "../_components/layout/Footer/Footer";
import styles from "./StudentPage.module.css";
export default function page() {
  return (
    <section className={styles.home}>
      <Explore />
      <Footer />
    </section>
  );
}
