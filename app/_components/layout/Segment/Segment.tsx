"use client";

import { motion } from "framer-motion";
import Notifs from "@/app/_components/common/Notifs/Notifs";
import styles from "./Segment.module.css";

const cardVariants = {
  hidden: { opacity: 0, y: 56, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function Segment() {
  return (
    <section className={styles.seg}>
      <div className="container">
        <div className={styles.frame}>
          <h1 className="boldFont">
            A professional learning platform <br /> <span>you can trust</span>
          </h1>
          <div className={styles.content}>
            <div className={styles.box}>
              <h3 className="boldFont">
                Verified lecturers with proven track record of success
              </h3>
              <p className={`lightFont ${styles.txt}`}>
                Meet qualified professionals and instructors with expertise in
                various fields, ready to provide you top-grade (or first -
                class) tutoring/training.
              </p>
            </div>

            <motion.div
              className={styles.wrapper}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.45 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.14 } },
              }}
            >
              <motion.img
                src="/images/lecturer1.png"
                alt="lecturer"
                className={styles.lecturer1}
                variants={{
                  hidden: { opacity: 0, y: 34, scale: 0.96 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
              />
              <motion.img
                src="/images/award.svg"
                alt="award"
                className={styles.award}
                variants={{
                  hidden: { opacity: 0, y: 30, rotate: -8, scale: 0.8 },
                  visible: { opacity: 1, y: 0, rotate: 0, scale: 1 },
                }}
                transition={{ type: "spring", stiffness: 170, damping: 15 }}
              />
              <motion.div
                className={styles.notifBox}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
              >
                <Notifs dark={false} />
              </motion.div>
            </motion.div>
          </div>
        </div>
        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14 } },
          }}
        >
          <motion.div
            className={styles.card}
            variants={cardVariants}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <div className={`${styles.icon} ${styles.iconA}`}>
              <img src="/images/verified.svg" alt="verified" />
            </div>
            <p className={`boldFont ${styles.heading}`}>Verified</p>
            <p className={styles.desc}>
              All teaching professionals are verified and certified in their
              various fields.
            </p>
          </motion.div>
          <motion.div
            className={styles.card}
            variants={cardVariants}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <div className={`${styles.icon} ${styles.iconB}`}>
              <img src="/images/reliable.svg" alt="reliable" />
            </div>
            <p className={`boldFont ${styles.heading}`}>Reliable</p>
            <p className={styles.desc}>
              All learning materials are from relevant and reliable sources.
            </p>
          </motion.div>
          <motion.div
            className={styles.card}
            variants={cardVariants}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <div className={`${styles.icon} ${styles.iconC}`}>
              <img src="/images/flexible.svg" alt="flexible" />
            </div>
            <p className={`boldFont ${styles.heading}`}>Flexible</p>
            <p className={styles.desc}>
              Learn at your pace and at your comfort, from anywhere and at
              anytime.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
