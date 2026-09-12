"use client";

import useFilterStore from "@/app/_utils/filter-store";
import styles from "./ExamCard.module.css";

interface Exam {
  id: number;
  name: string;
  logo: string;
  description: string;
  segments: string[];
}

interface Props {
  exam: Exam;
  selectable?: boolean;
  selected?: boolean;
  onToggle?: (id: number) => void;
}

export default function ExamCard({
  exam,
  selectable = false,
  selected,
  onToggle,
}: Props) {
  const addExamType = useFilterStore((state) => state.addExamType);
  const examTypeList = useFilterStore((state) => state.examTypeList);

  const isControlled = onToggle !== undefined;
  const isSelected = isControlled
    ? !!selected
    : selectable && examTypeList.includes(exam.id);

  const handleClick = () => {
    if (isControlled) {
      onToggle(exam.id);
    } else {
      addExamType(exam.id, selectable);
    }
  };

  return (
    <div
      className={`${styles.examcard} ${isSelected ? styles.selected : ""} ${
        selectable ? styles.selectable : ""
      }`}
      onClick={handleClick}
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
      {isSelected && (
        <div className={styles.circle}>
          <img src="/images/examcard-tick.svg" alt="tick" />
        </div>
      )}
    </div>
  );
}
