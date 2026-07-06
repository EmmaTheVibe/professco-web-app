import Link from "next/link";
import styles from "./MyCoursesEmptyState.module.css";

interface Props {
  heading: string;
  description: string;
}

export default function MyCoursesEmptyState({ heading, description }: Props) {
  return (
    <div className={styles.emptyState}>
      <svg className={styles.dashedBorder} aria-hidden="true">
        <rect width="100%" height="100%" rx="8" ry="8" />
      </svg>
      <img
        src="/images/empty-student-courses.png"
        alt=""
        className={styles.illustration}
      />
      <h2 className={`boldFont ${styles.heading}`}>{heading}</h2>
      <p className={styles.desc}>{description}</p>
      <Link href="/student">
        <button className="filled">
          <p>Explore Professco</p>
        </button>
      </Link>
    </div>
  );
}
