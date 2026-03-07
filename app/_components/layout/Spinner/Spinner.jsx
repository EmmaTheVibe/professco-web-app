import styles from "./Spinner.module.css";
function Spinner() {
  return (
    <div className={styles.spinnerFrame}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Spinner;
