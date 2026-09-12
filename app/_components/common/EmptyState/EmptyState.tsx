import Link from "next/link";
import styles from "./EmptyState.module.css";

interface Cta {
  label: string;
  href: string;
}

interface Props {
  illustration: string;
  heading: string;
  description: string;
  cta?: Cta;
}

export default function EmptyState({
  illustration,
  heading,
  description,
  cta,
}: Props) {
  return (
    <div className={styles.emptyState}>
      <svg className={styles.dashedBorder} aria-hidden="true">
        <rect width="100%" height="100%" rx="8" ry="8" />
      </svg>
      <img src={illustration} alt="" className={styles.illustration} />
      <h2 className={`boldFont ${styles.heading}`}>{heading}</h2>
      <p className={styles.desc}>{description}</p>
      {cta && (
        <Link href={cta.href}>
          <button className="filled">
            <p>{cta.label}</p>
          </button>
        </Link>
      )}
    </div>
  );
}
