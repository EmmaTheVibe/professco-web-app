import SuggestedRow from "./SuggestedRow";
import styles from "./SuggestedCourses.module.css";

const suggestedRowDefinitions = [
  { label: "Strategic Financial Management", examSlug: "ican" },
  { label: "Advanced Audit & Assurance", examSlug: "cipm" },
  { label: "Advanced Taxation", examSlug: "cima" },
];

export default function SuggestedRows() {
  return (
    <>
      <div className={styles.heading}>
        <h1 className="boldFont">Suggested courses</h1>
        <p className={`lightFont ${styles.desc}`}>
          Learn from vetted and certified chartered professionals with proven
          track records
        </p>
      </div>
      <div className={styles.rows}>
        {suggestedRowDefinitions.map((row) => (
          <SuggestedRow
            key={row.examSlug}
            label={row.label}
            examSlug={row.examSlug}
          />
        ))}
      </div>
    </>
  );
}
