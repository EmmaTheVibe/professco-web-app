import styles from "../VideoPlayer.module.css";

const VideoError = ({ error, onRetry }) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Default behavior: reload the page
      window.location.reload();
    }
  };

  return (
    <div className={styles.videoContainer} role="alert" aria-live="assertive">
      <div className={styles.errorMessage}>
        <h3>Video Playback Error</h3>
        <p>{error}</p>
        <button
          onClick={handleRetry}
          className={styles.retryButton}
          aria-label="Retry loading video"
          autoFocus
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default VideoError;
