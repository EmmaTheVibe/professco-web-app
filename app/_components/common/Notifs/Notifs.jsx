import styles from "./Notifs.module.css";
import { notifs } from "@/app/_utils/data";

export default function Notifs({ dark = false }) {
  return (
    <div className={styles.notifs}>
      <img src="/images/chip.svg" alt="chip" className={styles.chip} />
      {notifs.map((notif) => (
        <div
          key={notif.id}
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
                  src={dark ? "/images/blacktick.svg" : "/images/whitetick.svg"}
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
      ))}
    </div>
  );
}
