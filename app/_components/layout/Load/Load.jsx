import Spinner from "@/app/_components/layout/Spinner/Spinner";
import styles from "./Load.module.css";

export default function Load() {
  return (
    <section className={styles.loading}>
      <Spinner />
    </section>
  );
}
