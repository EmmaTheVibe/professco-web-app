import styles from "./NotificationsPage.module.css";
import Footer from "@/app/_components/layout/Footer/Footer";
import NotificationsList from "@/app/_components/student/Notifications/NotificationsList";

export default function page() {
  return (
    <section className={styles.home}>
      <div className={`container ${styles.wrapper}`}>
        <h1 className={`boldFont ${styles.title}`}>Notifications</h1>
        <p className={styles.desc}>
          An of how your courses are doing on professco
        </p>

        <NotificationsList />
      </div>

      <Footer showFull={false} />
    </section>
  );
}
