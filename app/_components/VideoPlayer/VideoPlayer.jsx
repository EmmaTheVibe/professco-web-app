"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./VideoPlayer.module.css";
import VideoLoading from "./components/VideoLoading";
import VideoError from "./components/VideoError";
import useVideoAnalytics from "./hooks/useVideoAnalytics";
import useVideoTime from "./hooks/useVideoTime";
import useVideoState from "./hooks/useVideoState";
import useVideoKeyboardControls from "./hooks/useKeyboardControls";

const VideoPlayer = ({
  manifestUrl,
  licenseServerUrl,
  videoId = `video_${Date.now()}`,
  title = "Course Video Demo",
  onError = null,
  poster,
  course,
  moduleId,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const {
    currentTime,
    setCurrentTime,
    videoDuration,
    setVideoDuration,
    formatTimeForA11y,
  } = useVideoTime();

  const {
    isLoading,
    error,
    hasStartedPlaying,
    isPlaying,
    isMuted,
    volume,
    playbackRate,
    setIsLoading,
    setError,
    setHasStartedPlaying,
    setIsPlaying,
    setIsMuted,
    setVolume,
    setPlaybackRate,
    getVideoAriaLabel,
  } = useVideoState(title, currentTime, videoDuration);

  const { trackEvent } = useVideoAnalytics(videoId, currentTime, videoDuration);

  useVideoKeyboardControls(
    videoRef,
    trackEvent,
    playbackRate,
    setVolume,
    setIsMuted,
    setPlaybackRate
  );

  // Helper function to check if current module is the last one
  const isLastModule = () => {
    if (!Array.isArray(course?.modules) || course.modules.length === 0)
      return true;

    const lastModule = course.modules[course.modules.length - 1];
    return moduleId === lastModule.id;
  };

  const goToNextModule = () => {
    if (isLastModule()) {
      trackEvent("course_completed");
      return;
    }

    const nextModuleId = Number(moduleId) + 1;

    const params = new URLSearchParams(searchParams);
    params.set("moduleId", nextModuleId.toString());

    router.push(`?${params.toString()}`);
    trackEvent("auto_next_module", {
      currentModule: moduleId,
      nextModule: nextModuleId,
    });
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

            goToNextModule();
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
  }, [manifestUrl, licenseServerUrl, moduleId]);

  if (error) {
    return <VideoError error={error} />;
  }

  return (
    <div className={styles.videoContainer}>
      {title && (
        <div className={styles.videoTitle || "video-title"}>
          <h2 id={`video-title-${videoId}`}>{title}</h2>
        </div>
      )}

      {isLoading && <VideoLoading />}

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
          autoPlay
          webkit-playsinline="true"
          className={styles.shakaVideo}
          poster={poster ? poster : "/images/courseThumbnail2.png"}
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
