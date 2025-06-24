"use client";

import React from "react";
import styles from "./Skeleton.module.css";

export default function Skeleton() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonPreview}>
        <div className={styles.skeletonThumbnail}></div>
      </div>
      <div className={styles.skeletonCourseInfo}>
        <div className={styles.skeletonCourseTitle}></div>
        <div className={styles.skeletonLine}>
          <div className={styles.skeletonCourseType}></div>
          <div className={styles.skeletonCoursePrice}></div>
        </div>
        <div className={styles.skeletonRating}></div>
        <div
          className={`${styles.skeletonCourseDesc} ${styles.skeletonTextLineMedium}`}
        ></div>

        <div className={styles.skeletonTags}>
          <div className={styles.skeletonTag}></div>
          <div className={styles.skeletonTag}></div>
        </div>
        <div className={styles.skeletonButton}></div>
      </div>
    </div>
  );
}
