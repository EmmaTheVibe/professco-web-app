"use client";

import { useEffect, useState } from "react";
import ExamCard from "@/app/_components/common/ExamCard/ExamCard";
import Spinner from "@/app/_components/layout/Spinner/Spinner";
import { getExamBodies } from "@/app/_lib/account-setup-service";
import styles from "./PersonalizeForm.module.css";

export default function PersonalizeForm() {
  const [examBodies, setExamBodies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadExamBodies() {
      try {
        const data = await getExamBodies();

        if (isMounted) {
          setExamBodies(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load exam bodies.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadExamBodies();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.grid}>
      {examBodies.map((exam) => (
        <ExamCard key={exam.id} exam={exam} selectable />
      ))}
    </div>
  );
}
