"use client";

import { Suspense } from "react";
import ExamCard from "@/app/_components/common/ExamCard/ExamCard";
import Spinner from "@/app/_components/layout/Spinner/Spinner";
import { examTabs } from "@/app/_utils/data";
import styles from "./PersonalizeForm.module.css";

export default function PersonalizeForm() {
  return (
    <div className={styles.grid}>
      {examTabs.map((exam) => (
        <Suspense key={exam.id} fallback={<Spinner />}>
          <ExamCard exam={exam} selectable />
        </Suspense>
      ))}
    </div>
  );
}
