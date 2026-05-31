import styles from "./BottomBanner.module.css";

export default function BottomBanner() {
  return (
    <section className={styles.footer}>
      <div className={`container ${styles.wrapper}`}>
        <p className="boldFont">Become a lecturer on Professco</p>
        <p className={styles.txt}>
          Are you a certified ICAN, CIMA, CITN, CIS, CFA, ACCA professional
        </p>
        <button>
          <p>Teach on Professco</p>
        </button>
      </div>
    </section>
  );
}
