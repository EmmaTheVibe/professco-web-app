import Explore from "@/app/_components/layout/Explore/Explore";
import styles from "./SettingsPage.module.css";
import Footer from "@/app/_components/layout/Footer/Footer";
export default function page() {
  return (
    <section className={styles.home}>
      <Explore />
      <Footer />
    </section>
  );
}
