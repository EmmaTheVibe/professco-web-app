"use client";
import { useState } from "react";
import styles from "./ContentTab.module.css";
import { courseContent } from "@/app/_utils/data";

export default function ContentTab() {
  const [list, setList] = useState(courseContent);
  function handleIsOpen(id) {
    setList((curr) =>
      curr.map((item) =>
        item.id === id ? { ...item, open: !item.open } : item
      )
    );
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
              <div className={styles.clip}>
                <p className={styles.title}>1. Welcome</p>
                <div className={styles.line}>
                  <img src="/images/play-btn.svg" alt="play" />{" "}
                  <p className={styles.duration}>6 mins</p>
                </div>
              </div>
              <div className={styles.lockedClip}>
                <div>
                  <p className={styles.title}>2. Interface Overview</p>
                  <div className={styles.line}>
                    <img src="/images/play-btn.svg" alt="play" />{" "}
                    <p className={styles.duration}>6 mins</p>
                  </div>
                </div>
                <div className={styles.lockBox}>
                  <img src="/images/square-lock.svg" alt="lock" />
                </div>
              </div>
              <div className={styles.lockedClip}>
                <div>
                  <p className={styles.title}>3. Introduction to Android</p>
                  <div className={styles.line}>
                    <img src="/images/play-btn.svg" alt="play" />{" "}
                    <p className={styles.duration}>6 mins</p>
                  </div>
                </div>
                <div className={styles.lockBox}>
                  <img src="/images/square-lock.svg" alt="lock" />
                </div>
              </div>
              <div className={styles.lockedClip}>
                <div>
                  <p className={styles.title}>4. FAQs</p>
                  <div className={styles.line}>
                    <img src="/images/play-btn.svg" alt="play" />{" "}
                    <p className={styles.duration}>6 mins</p>
                  </div>
                </div>
                <div className={styles.lockBox}>
                  <img src="/images/square-lock.svg" alt="lock" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
