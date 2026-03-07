import Notifs from "@/app/_components/common/Notifs/Notifs";
import styles from "./Segment.module.css";
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

            <div className={styles.wrapper}>
              <img
                src="/images/lecturer1.png"
                alt="lecturer"
                className={styles.lecturer1}
              />
              <img
                src="/images/award.svg"
                alt="award"
                className={styles.award}
              />
              <div className={styles.notifBox}>
                <Notifs dark={false} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.iconA}`}>
              <img src="/images/verified.svg" alt="verified" />
            </div>
            <p className={`boldFont ${styles.heading}`}>Verified</p>
            <p className={styles.desc}>
              All teaching professionals are verified and certified in their
              various fields.
            </p>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.iconB}`}>
              <img src="/images/reliable.svg" alt="reliable" />
            </div>
            <p className={`boldFont ${styles.heading}`}>Reliable</p>
            <p className={styles.desc}>
              All learning materials are from relevant and reliable sources.
            </p>
          </div>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.iconC}`}>
              <img src="/images/flexible.svg" alt="flexible" />
            </div>
            <p className={`boldFont ${styles.heading}`}>Flexible</p>
            <p className={styles.desc}>
              Learn at your pace and at your comfort, from anywhere and at
              anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
