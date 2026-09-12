import styles from "./PaymentsPage.module.css";
import Footer from "@/app/_components/layout/Footer/Footer";
import PaymentsTable from "@/app/_components/student/Payments/PaymentsTable";

export default function page() {
  return (
    <section className={styles.home}>
      <div className={`container ${styles.wrapper}`}>
        <h1 className={`boldFont ${styles.title}`}>Payments</h1>
        <p className={styles.desc}>
          All your course purchases will appear here.
        </p>

        <PaymentsTable />
      </div>

      <Footer showFull={false} />
    </section>
  );
}
