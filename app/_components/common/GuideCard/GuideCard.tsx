"use client";

import { motion } from "framer-motion";
import styles from "./GuideCard.module.css";

interface Guide {
  banner: string;
  title: string;
  content: string;
  avatar: string;
  posterName: string;
  date: string;
}

interface Props {
  guide: Guide;
  index?: number;
}

export default function GuideCard({ guide, index = 0 }: Props) {
  return (
    <motion.div
      className={styles.guideCard}
      initial={{ opacity: 0, y: 96 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: index * 0.12,
      }}
    >
      <div className={styles.pic}>
        <img src={guide.banner} alt="banner" />
      </div>
      <div className={styles.info}>
        <p
          className="semiboldFont"
          style={{ fontSize: "20px", lineHeight: "30px" }}
        >
          {guide.title}
        </p>
        <p style={{ color: "#6B7280", margin: "12px 0 29px" }}>
          {guide.content}
        </p>
        <div style={{ display: "flex", width: "100%" }}>
          <img
            src={guide.avatar}
            alt="avatar"
            style={{ marginRight: "12px" }}
          />
          <div>
            <p
              className="semiboldFont"
              style={{ color: "#344054", fontSize: "14px", lineHeight: "20px" }}
            >
              {guide.posterName}
            </p>
            <p
              className="lightFont"
              style={{ color: "#9CA3AF", fontSize: "14px", lineHeight: "20px" }}
            >
              {guide.date}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
