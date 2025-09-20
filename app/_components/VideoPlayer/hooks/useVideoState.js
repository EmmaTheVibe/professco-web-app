import { useState } from "react";

const useVideoState = (title, currentTime, videoDuration) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Format time for screen readers (helper function)
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

  return {
    // State values
    isLoading,
    error,
    hasStartedPlaying,
    isPlaying,
    isMuted,
    volume,
    playbackRate,

    // State setters
    setIsLoading,
    setError,
    setHasStartedPlaying,
    setIsPlaying,
    setIsMuted,
    setVolume,
    setPlaybackRate,

    // Computed values
    getVideoAriaLabel,
  };
};

export default useVideoState;
