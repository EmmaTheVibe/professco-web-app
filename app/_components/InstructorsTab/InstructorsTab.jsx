import styles from "./InstructorsTab.module.css";
export default function InstructorsTab() {
  return (
    <div className={styles.instructorsTab}>
      <div className={styles.line}>
        <h1 className={`boldFont ${styles.heading}`}>Instructor(s)</h1>
        <button className={`bareB ${styles.viewAllButton}`}>
          <p>View All</p>
        </button>
      </div>
      <div className={styles.instructor}>
        <img
          src="/images/instructor-avatar.svg"
          alt="avatar"
          className={styles.avatar}
        />
        <div className={styles.instructorBrief}>
          <p className={`${styles.instructorName} boldFont`}>Okoro James</p>
          <p className={styles.instructorTxt}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim
          </p>
        </div>
      </div>
    </div>
  );
}
