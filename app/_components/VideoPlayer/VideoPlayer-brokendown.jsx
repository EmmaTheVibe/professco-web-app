"use client";
import React from "react";
import { useVideoPlayer } from "./hooks/useVideoPlayer";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { useAccessibility } from "./hooks/useAccessibility";
import { VideoError } from "./components/VideoError";
import { VideoLoading } from "./components/VideoLoading";
import { KeyboardShortcuts } from "./components/KeyboardShortcuts";
import styles from "./VideoPlayer.module.css";

const VideoPlayer = ({
  manifestUrl,
  licenseServerUrl,
  videoId = `video_${Date.now()}`,
  title = "Course Video Demo",
  onError = null,
  poster,
  course,
}) => {
  const {
    videoRef,
    isLoading,
    error,
    currentTime,
    videoDuration,
    isPlaying,
    isMuted,
    volume,
    playbackRate,
    trackEvent,
    setVolume,
    setIsMuted,
    setPlaybackRate,
  } = useVideoPlayer(manifestUrl, licenseServerUrl, videoId, onError);

  useKeyboardControls(
    videoRef,
    trackEvent,
    playbackRate,
    setVolume,
    setIsMuted,
    setPlaybackRate
  );

  const { getVideoAriaLabel } = useAccessibility(
    isLoading,
    error,
    title,
    isPlaying,
    isMuted,
    volume,
    playbackRate,
    currentTime,
    videoDuration
  );

  if (error) {
    return (
      <VideoError error={error} onRetry={() => window.location.reload()} />
    );
  }

  return (
    <div className={styles.videoContainer}>
      {title && (
        <div className={styles.videoTitle}>
          <h2 id={`video-title-${videoId}`}>{title}</h2>
        </div>
      )}

      {isLoading && <VideoLoading />}
      <KeyboardShortcuts videoId={videoId} />

      <div
        data-shaka-player-container
        data-shaka-player-cast-receiver-id="44991CE2"
        style={{ opacity: isLoading ? 0 : 1 }}
        tabIndex="0"
        role="application"
        aria-label="Video player controls"
        aria-describedby={`video-shortcuts-${videoId}`}
      >
        <video
          ref={videoRef}
          playsInline
          controls={false}
          webkit-playsinline="true"
          className={styles.shakaVideo}
          poster={poster || "/images/courseThumbnail2.png"}
          style={{ width: "100%", height: "auto" }}
          aria-label={getVideoAriaLabel()}
          aria-labelledby={title ? `video-title-${videoId}` : undefined}
          aria-describedby={`video-shortcuts-${videoId}`}
          aria-live="polite"
          aria-atomic="false"
          role="video"
          tabIndex="-1"
        />
      </div>

      {/* Status announcements for screen readers */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        id={`video-status-${videoId}`}
      ></div>
    </div>
  );
};

export default VideoPlayer;
