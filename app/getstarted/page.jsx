import BottomBanner from "@/app/_components/BottomBanner/BottomBanner";
import ExamCard from "@/app/_components/ExamCard/ExamCard";
import { examTabs } from "@/app/_utils/data";
import styles from "./GetStarted.module.css";

export default function GetStarted() {
  return (
    <section className={styles.getStarted}>
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.hero}>
          <p className={styles.tag}>Let’s get you started</p>
          <h1>What exam are you preparing for?</h1>
          <p className={styles.desc}>
            We’ve got courses for every professional exam
          </p>
        </div>
        <div className={styles.grid}>
          {examTabs.map((exam) => (
            <ExamCard key={exam.id} exam={exam} selectable={true} />
          ))}
        </div>
        <button className="filled">
          <p>Get Started</p>
        </button>
      </div>
      <BottomBanner />
    </section>
  );
}
