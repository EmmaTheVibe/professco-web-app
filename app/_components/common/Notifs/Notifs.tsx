"use client";

import { motion } from "framer-motion";
import styles from "./Notifs.module.css";
import { notifs } from "@/app/_utils/data";

interface Props {
  dark?: boolean;
}

export default function Notifs({ dark = false }: Props) {
  return (
    <div className={styles.notifs}>
      <motion.img
        src="/images/chip.svg"
        alt="chip"
        className={styles.chip}
        initial={{ opacity: 0, scale: 0.4, rotate: -18 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.45 }}
      />
      {notifs.map((notif, index) => (
        <motion.div
          key={notif.id}
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 170,
            damping: 18,
            delay: index * 0.12,
          }}
        >
          <div
            className={`${styles.notif} ${
              notif.id === 2 ? styles.push : notif.id === 3 ? styles.third : ""
            }`}
            style={{
              backgroundColor: `${dark ? "#1F2937" : "#FFFFFF"}`,
              marginBottom: `${notif.id === 3 ? "0px" : ""}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                className={styles.circle}
                style={{
                  backgroundColor: `${notif.id === 2 ? "#4F46BA" : "#EBEBF5"}`,
                  border: ` ${notif.id === 2 ? "" : "1px solid #4F46BA"} `,
                }}
              >
                {notif.id === 2 ? (
                  <img
                    src={
                      dark ? "/images/blacktick.svg" : "/images/whitetick.svg"
                    }
                  />
                ) : (
                  ""
                )}
              </div>
              <div>
                <p
                  style={{
                    color: `${dark ? "#D1D5DB" : "#000000"}`,
                  }}
                  className={`semiboldFont ${styles.name}`}
                >
                  {dark ? notif.course : notif.name}
                </p>
                <p
                  style={{
                    color: "#C6C6C6",
                  }}
                  className={styles.date}
                >
                  {notif.date}
                </p>
              </div>
            </div>
            <img src={notif.avatar} alt="avatar" className={styles.avatar} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
