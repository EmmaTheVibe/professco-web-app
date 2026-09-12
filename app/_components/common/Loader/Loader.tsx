import styles from "./Loader.module.css";

interface Props {
  variant?: "light" | "dark";
}

export default function Loader({ variant = "light" }: Props) {
  return (
    <span
      className={`${styles.loader} ${variant === "dark" ? styles.dark : ""}`}
    />
  );
}
