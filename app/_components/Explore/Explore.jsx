"use client";

import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner/Spinner";
import { examTabs } from "@/app/_utils/data";
import styles from "./Explore.module.css";

import dynamic from "next/dynamic";

const ExamCard = dynamic(() => import("@/app/_components/ExamCard/ExamCard"), {
  ssr: false,
});

export default function Explore() {
  return (
    <section className={styles.explore}>
      <div className={`container ${styles.box}`}>
        <div className={styles.top}>
          <p style={{ color: "#4B5563" }}>Available on Professco</p>
          <h1 className="boldFont">Explore Professco</h1>
          <p className={styles.txt}>
            Learn from verified/certified Professionals in various fields with
            high performance, accomplishments/reputation and proven track
            records.
          </p>
        </div>

        <div className={styles.bottom}>
          <div className={styles.examGrid}>
            {examTabs.map((exam) => (
              <Suspense key={exam.id} fallback={<Spinner />}>
                <div className={styles.card}>
                  <ExamCard exam={exam} />
                </div>
              </Suspense>
            ))}
          </div>
        </div>
      </div>
      <section className={styles.seg}>
        <div className={`container ${styles.boxB}`}>
          <h2 className="boldFont">
            Learn from vetted and certified chartered professionals with proven
            track records
          </h2>
          <div className={styles.segGrid}>
            {examTabs.map((exam) => (
              <div key={exam.id}>
                <p className={`boldFont ${styles.heading}`}>{exam.name}</p>
                {exam.segments.map((segment, index) => (
                  <p key={index} className={styles.topic}>
                    {segment}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
