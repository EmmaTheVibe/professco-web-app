import { useState } from "react";

const useVideoTime = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

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

  return {
    currentTime,
    setCurrentTime,
    videoDuration,
    setVideoDuration,
    formatTimeForA11y,
  };
};

export default useVideoTime;
