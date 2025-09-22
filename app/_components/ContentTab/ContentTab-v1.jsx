"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./ContentTab.module.css";
import { courseContent } from "@/app/_utils/data";

export default function ContentTab({ course, moduleId }) {
  const [list, setList] = useState(courseContent);
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleIsOpen(id) {
    setList((curr) =>
      curr.map((item) =>
        item.id === id ? { ...item, open: !item.open } : item
      )
    );
  }

  function handleModuleClick(moduleId) {
    const params = new URLSearchParams(searchParams);
    params.set("moduleId", moduleId);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className={styles.contentTab}>
      <p className={`${styles.heading} boldFont`}>Course Content</p>
      <div className={styles.accordion}>
        {list.map((item) => (
          <div
            className={`${styles.accordionItem} ${
              item.open ? styles.open : ""
            }`}
            key={item.id}
          >
            <div
              className={styles.topWrap}
              onClick={() => handleIsOpen(item.id)}
            >
              <div className={styles.top}>
                <p className={`semiboldFont ${styles.mainTitle}`}>
                  Section 1: Introduction
                </p>

                <img
                  src="/images/content-tab-arrow.svg"
                  alt="arrow"
                  style={{
                    transition: "0.3s ease",
                  }}
                  className={styles.arrow}
                />
              </div>

              <p className={styles.fullDuration}>24 mins</p>
            </div>

            <div className={styles.bottomWrap}>
              {course.modules.map((module, index) => (
                <div
                  className={`${styles.clip} ${
                    moduleId === module.id ? styles.active : ""
                  }`}
                  key={module.id}
                  onClick={() => handleModuleClick(module.id)}
                  style={{ cursor: "pointer" }}
                >
                  <p className={styles.title}>
                    {index + 1}. {module.title}
                  </p>
                  <div className={styles.line}>
                    <img src="/images/play-btn.svg" alt="play" />{" "}
                    <p className={styles.duration}> mins</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
