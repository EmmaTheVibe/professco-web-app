"use client";

import useContexts from "@/app/_utils/useContexts";
import styles from "./ExamCard.module.css";

export default function ExamCard({ exam, selectable = false }) {
  const { addExamType, examTypeList } = useContexts();

  return (
    <div
      className={`${styles.examcard} ${
        selectable && examTypeList.includes(exam.name) ? styles.selected : ""
      } ${selectable ? styles.selectable : ""}`}
      onClick={() => addExamType(exam.name, selectable)}
    >
      <div className={styles.logobox}>
        <img src={exam.logo} alt="logo" />
      </div>
      <div className={styles.info}>
        <p
          className={`boldFont ${styles.title}`}
          style={{ marginBottom: "4px" }}
        >
          {exam.name}
        </p>
        <p className={`lightFont ${styles.desc}`}>{exam.description}</p>
      </div>
      {selectable && examTypeList.includes(exam.name) ? (
        <div className={styles.circle}>
          <img src="/images/examcard-tick.svg" alt="tick" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
