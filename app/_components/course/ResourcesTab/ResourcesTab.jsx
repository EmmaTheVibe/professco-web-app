import styles from "./ResourcesTab.module.css";

export default function ResourcesTab() {
  const list = Array.from({ length: 8 });
  return (
    <div className={styles.resourcesTab}>
      <div className={styles.list}>
        {list.map((_, i) => (
          <div className={styles.item} key={i}>
            <div className={styles.topWrap}>
              <div>
                <p className={`boldFont ${styles.mainTitle}`}>
                  Material Title.pdf
                </p>
                <p className={styles.txt}>Material Description Here</p>
              </div>

              <button
                className="filledB"
                disabled={true}
                // style={{ opacity: "30%" }}
              >
                <img src="/images/download.svg" alt="icon" />
                <p className="lightFont">Download</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
