"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
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
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

  // New state for accessibility
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);

  const trackEvent = useCallback(
    (eventType, data = {}) => {
      const eventData = {
        event: eventType,
        videoId,
        timestamp: currentTime,
        duration: videoDuration,
        userAgent: navigator.userAgent,
        timestamp_iso: new Date().toISOString(),
        ...data,
      };

      console.log("📊 Video Analytics:", eventData);
    },
    [videoId, currentTime, videoDuration]
  );

  // Keyboard navigation handler
  const handleKeyPress = useCallback(
    (event) => {
      if (!videoRef.current) return;

      const video = videoRef.current;
      const { key, ctrlKey, shiftKey } = event;

      // Only handle key presses when the container or video is focused
      if (!event.target.closest("[data-shaka-player-container]")) return;

      // Prevent default for our custom shortcuts
      const customKeys = [
        " ",
        "Space",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "m",
        "M",
        "f",
        "F",
        "Home",
        "End",
        ",",
        ".",
      ];
      if (customKeys.includes(key)) {
        event.preventDefault();
      }

      switch (key) {
        case " ":
        case "Space":
          // Play/Pause
          if (video.paused) {
            video.play();
            trackEvent("keyboard_play");
          } else {
            video.pause();
            trackEvent("keyboard_pause");
          }
          break;

        case "ArrowLeft":
          // Rewind 10 seconds (or 5 seconds with Shift)
          const rewindAmount = shiftKey ? 5 : 10;
          video.currentTime = Math.max(0, video.currentTime - rewindAmount);
          trackEvent("keyboard_rewind", { seconds: rewindAmount });
          break;

        case "ArrowRight":
          // Fast forward 10 seconds (or 5 seconds with Shift)
          const forwardAmount = shiftKey ? 5 : 10;
          video.currentTime = Math.min(
            video.duration,
            video.currentTime + forwardAmount
          );
          trackEvent("keyboard_forward", { seconds: forwardAmount });
          break;

        case "ArrowUp":
          // Increase volume
          const newVolumeUp = Math.min(1, video.volume + 0.1);
          video.volume = newVolumeUp;
          setVolume(newVolumeUp);
          trackEvent("keyboard_volume_up", { volume: newVolumeUp });
          break;

        case "ArrowDown":
          // Decrease volume
          const newVolumeDown = Math.max(0, video.volume - 0.1);
          video.volume = newVolumeDown;
          setVolume(newVolumeDown);
          trackEvent("keyboard_volume_down", { volume: newVolumeDown });
          break;

        case "m":
        case "M":
          // Toggle mute
          video.muted = !video.muted;
          setIsMuted(video.muted);
          trackEvent("keyboard_toggle_mute", { muted: video.muted });
          break;

        case "f":
        case "F":
          // Toggle fullscreen
          try {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              const container = video.parentElement;
              container.requestFullscreen?.();
            }
            trackEvent("keyboard_toggle_fullscreen");
          } catch (e) {
            console.log("Fullscreen not supported or failed");
          }
          break;

        case "Home":
          // Jump to beginning
          video.currentTime = 0;
          trackEvent("keyboard_jump_start");
          break;

        case "End":
          // Jump to end
          video.currentTime = video.duration;
          trackEvent("keyboard_jump_end");
          break;

        // Playback rate controls
        case ",":
          if (ctrlKey) {
            const newRate = Math.max(0.25, playbackRate - 0.25);
            video.playbackRate = newRate;
            setPlaybackRate(newRate);
            trackEvent("keyboard_decrease_speed", { rate: newRate });
          }
          break;

        case ".":
          if (ctrlKey) {
            const newRate = Math.min(2, playbackRate + 0.25);
            video.playbackRate = newRate;
            setPlaybackRate(newRate);
            trackEvent("keyboard_increase_speed", { rate: newRate });
          }
          break;
      }
    },
    [trackEvent, playbackRate]
  );

  // Format time for screen readers
  const formatTimeForA11y = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0 seconds";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}, ${minutes} minute${
        minutes !== 1 ? "s" : ""
      }, ${secs} second${secs !== 1 ? "s" : ""}`;
    }
    return `${minutes} minute${minutes !== 1 ? "s" : ""}, ${secs} second${
      secs !== 1 ? "s" : ""
    }`;
  };

  // Generate dynamic ARIA labels
  const getVideoAriaLabel = () => {
    if (isLoading) return "Video is loading";
    if (error) return "Video playback error";

    const timeInfo =
      videoDuration > 0
        ? ` Duration: ${formatTimeForA11y(
            videoDuration
          )}. Current time: ${formatTimeForA11y(currentTime)}.`
        : "";

    const playState = isPlaying ? "Playing" : "Paused";
    const muteState = isMuted ? "Muted" : "Unmuted";
    const volumeInfo = !isMuted ? ` Volume: ${Math.round(volume * 100)}%.` : "";
    const speedInfo =
      playbackRate !== 1 ? ` Playback speed: ${playbackRate}x.` : "";

    return `${
      title || "Video player"
    }. ${playState}. ${muteState}.${volumeInfo}${speedInfo}${timeInfo}`;
  };

  useEffect(() => {
    let isMounted = true;

    const initializePlayer = async () => {
      try {
        if (typeof window === "undefined") {
          return;
        }

        const shaka = await import("shaka-player/dist/shaka-player.ui.js");
        await import("shaka-player/dist/controls.css");

        if (!isMounted) return;

        const videoElement = videoRef.current;
        if (!videoElement) {
          console.error("Video element not found");
          setError("Video element not found");
          setIsLoading(false);
          return;
        }

        if (!shaka.Player.isBrowserSupported()) {
          setError("Browser not supported for video playback");
          setIsLoading(false);
          return;
        }

        shaka.polyfill.installAll();

        const player = new shaka.Player(videoElement);
        playerRef.current = player;

        const videoContainer = videoElement.parentElement;

        const existingControls = videoContainer.querySelectorAll(
          ".shaka-controls-container"
        );
        existingControls.forEach((control) => control.remove());

        const uiConfig = {
          controlPanelElements: [
            "play_pause",
            "time_and_duration",
            "spacer",
            "mute",
            "volume",
            "overflow_menu",
            "fullscreen",
          ],
          overflowMenuButtons: [
            "captions",
            "cast",
            "quality",
            "language",
            "picture_in_picture",
            "playback_rate",
          ],
        };

        const ui = new shaka.ui.Overlay(player, videoContainer, videoElement);
        ui.configure(uiConfig);

        playerRef.current.ui = ui;

        player.addEventListener("error", (event) => {
          const error = event.detail;
          console.error("Shaka Player Error:", error);

          let errorMessage = "Video playback error occurred";
          if (error && error.code) {
            switch (error.code) {
              case 6001:
                errorMessage = "Content protection error. Please try again.";
                break;
              case 1002:
                errorMessage =
                  "Network connection error. Check your internet connection.";
                break;
              case 2001:
                errorMessage = "Video format error. Please contact support.";
                break;
              default:
                errorMessage = `Playback error (${error.code}). Please try again.`;
            }
          }

          setError(errorMessage);

          if (onError) {
            onError(errorMessage);
          }
        });

        if (licenseServerUrl) {
          player.configure({
            drm: {
              servers: {
                "com.widevine.alpha": licenseServerUrl,
              },
            },
            streaming: {
              allowCrossSiteCredentials: false,
            },
          });
        }

        await player.load(manifestUrl);

        if (isMounted) {
          videoElement.addEventListener("loadedmetadata", () => {
            const duration = videoElement.duration;
            setVideoDuration(duration);
            console.log(
              "📏 Video duration loaded:",
              Math.floor(duration),
              "seconds"
            );
            trackEvent("video_metadata_loaded", { duration });
          });

          videoElement.addEventListener("timeupdate", () => {
            const current = videoElement.currentTime;
            setCurrentTime(current);

            const progress = current / videoDuration;
            if (progress >= 0.25 && !videoElement.milestone25) {
              videoElement.milestone25 = true;
              trackEvent("video_progress_25");
            }
            if (progress >= 0.5 && !videoElement.milestone50) {
              videoElement.milestone50 = true;
              trackEvent("video_progress_50");
            }
            if (progress >= 0.75 && !videoElement.milestone75) {
              videoElement.milestone75 = true;
              trackEvent("video_progress_75");
            }
          });

          videoElement.addEventListener("play", () => {
            if (!hasStartedPlaying) {
              setHasStartedPlaying(true);
              trackEvent("video_first_play");
            }
            setIsPlaying(true);
            trackEvent("video_play", {
              playbackRate: videoElement.playbackRate,
            });
          });

          videoElement.addEventListener("pause", () => {
            setIsPlaying(false);
            trackEvent("video_pause");
          });

          videoElement.addEventListener("volumechange", () => {
            setIsMuted(videoElement.muted);
            setVolume(videoElement.volume);
          });

          videoElement.addEventListener("ratechange", () => {
            setPlaybackRate(videoElement.playbackRate);
          });

          videoElement.addEventListener("seeking", () => {
            trackEvent("video_seek_start", {
              seekTo: videoElement.currentTime,
            });
          });

          videoElement.addEventListener("seeked", () => {
            trackEvent("video_seek_end", { seekTo: videoElement.currentTime });
          });

          videoElement.addEventListener("ended", () => {
            setIsPlaying(false);
            trackEvent("video_completed");
          });

          player.addEventListener("buffering", (event) => {
            if (event.buffering) {
              trackEvent("video_buffering_start");
            } else {
              trackEvent("video_buffering_end");
            }
          });

          player.addEventListener("adaptation", (event) => {
            if (event.newTrack) {
              trackEvent("quality_change", {
                newQuality: `${event.newTrack.height}p`,
                bandwidth: event.newTrack.bandwidth,
              });
            }
          });

          trackEvent("video_loaded");

          setIsLoading(false);

          videoElement.addEventListener("contextmenu", (e) => {
            e.preventDefault();
          });

          setTimeout(() => {
            window.dispatchEvent(new Event("resize"));

            if (ui && ui.getControls) {
              try {
                const controls = ui.getControls();
                if (controls && controls.dispatchEvent) {
                  controls.dispatchEvent(new Event("resize"));
                }
              } catch (e) {
                console.log("UI controls resize failed:", e);
              }
            }

            const videoContainer = videoElement.parentElement;
            if (videoContainer) {
              const currentDisplay = videoContainer.style.display;
              videoContainer.style.display = "none";
              videoContainer.offsetHeight;
              videoContainer.style.display = currentDisplay || "";
            }
          }, 100);

          setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
          }, 500);
        }
      } catch (error) {
        console.error("Error initializing video player:", error);
        if (isMounted) {
          setError("Failed to initialize video player");
          setIsLoading(false);
        }
      }
    };

    initializePlayer();

    return () => {
      isMounted = false;
      if (playerRef.current) {
        try {
          if (playerRef.current.ui) {
            playerRef.current.ui.destroy();
          }
          playerRef.current.destroy();
        } catch (error) {
          console.error("Error destroying player:", error);
        }
      }
    };
  }, [manifestUrl, licenseServerUrl]);

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  // Error handling with better accessibility
  if (error) {
    return (
      <div className={styles.videoContainer} role="alert" aria-live="assertive">
        <div className={styles.errorMessage}>
          <h3>Video Playback Error</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
            aria-label="Retry loading video"
            autoFocus
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.videoContainer}>
      {title && (
        <div className={styles.videoTitle || "video-title"}>
          <h2 id={`video-title-${videoId}`}>{title}</h2>
        </div>
      )}

      {/* Loading state with proper announcement */}
      {isLoading && (
        <div
          className={styles.loadingOverlay}
          role="status"
          aria-live="polite"
          aria-label="Loading video player"
        >
          <div className={styles.spinner} aria-hidden="true"></div>
          <p>Loading video player...</p>
        </div>
      )}

      {/* Keyboard shortcuts help - hidden but available to screen readers */}
      <div className="sr-only" id={`video-shortcuts-${videoId}`}>
        <h3>Video Player Keyboard Shortcuts:</h3>
        <ul>
          <li>Spacebar: Play or pause video</li>
          <li>Left arrow: Rewind 10 seconds (Shift+Left: 5 seconds)</li>
          <li>Right arrow: Fast forward 10 seconds (Shift+Right: 5 seconds)</li>
          <li>Up arrow: Increase volume</li>
          <li>Down arrow: Decrease volume</li>
          <li>M: Toggle mute</li>
          <li>F: Toggle fullscreen</li>
          <li>Home: Jump to beginning</li>
          <li>End: Jump to end</li>
          <li>Ctrl + comma: Decrease playback speed</li>
          <li>Ctrl + period: Increase playback speed</li>
        </ul>
      </div>

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
          poster={poster ? poster : "/images/courseThumbnail2.png"}
          style={{ width: "100%", height: "auto" }}
          // Comprehensive ARIA attributes
          aria-label={getVideoAriaLabel()}
          aria-labelledby={title ? `video-title-${videoId}` : undefined}
          aria-describedby={`video-shortcuts-${videoId}`}
          // Live region for dynamic updates
          aria-live="polite"
          aria-atomic="false"
          // Additional attributes
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
      >
        {/* This div will announce state changes to screen readers */}
      </div>
    </div>
  );
};

export default VideoPlayer;
