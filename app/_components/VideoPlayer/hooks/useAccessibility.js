export const useAccessibility = (
  isLoading,
  error,
  title,
  isPlaying,
  isMuted,
  volume,
  playbackRate,
  currentTime,
  videoDuration
) => {
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

  return { formatTimeForA11y, getVideoAriaLabel };
};
