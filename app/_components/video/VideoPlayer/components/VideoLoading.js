import styles from "../VideoPlayer.module.css";

const VideoLoading = () => {
  return (
    <div
      className={styles.loadingOverlay}
      role="status"
      aria-live="polite"
      aria-label="Loading video player"
    >
      <div className={styles.spinner} aria-hidden="true"></div>
    </div>
  );
};

export default VideoLoading;
