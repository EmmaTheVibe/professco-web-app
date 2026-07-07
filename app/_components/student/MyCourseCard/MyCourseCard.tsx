import Link from "next/link";
import styles from "./MyCourseCard.module.css";
import { Course } from "@/app/_utils/types";

interface Props {
  course: Course;
  progress: number;
  rating: number | null;
}

export default function MyCourseCard({ course, progress, rating }: Props) {
  const examSlug = String(course.exam_body?.slug || "").toLowerCase();
  const href = `/student/my-courses/${examSlug}/${course.id}`;

  return (
    <Link href={href} className={styles.card}>
      <div className={styles.preview}>
        <img
          src={course.cover_image}
          alt="thumbnail"
          className={styles.thumbnail}
        />
      </div>

      <div className={styles.info}>
        <div>
          <p className={`boldFont ${styles.title}`}>{course.title}</p>
          <div className={styles.examTag}>
            <p className="semiboldFont">{course.exam_body?.slug}</p>
          </div>
          <p className={styles.desc}>
            <span className={styles.descLabel}>What you&apos;ll learn: </span>
            {course.description}
          </p>
        </div>
        <div>
          <div className={styles.progressRow}>
            <p>Course progress</p>
            <p>{progress}%</p>
          </div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>

          {progress === 0 ? (
            <p className={styles.startCourse}>START COURSE</p>
          ) : (
            <div className={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <img
                  key={star}
                  src={
                    rating && star <= rating
                      ? "/images/ratingstarfull.svg"
                      : "/images/ratingstarempty.svg"
                  }
                  alt=""
                  className={styles.star}
                />
              ))}
              <p className={styles.ratingText}>
                {rating ? "Your rating" : "Leave a rating"}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
