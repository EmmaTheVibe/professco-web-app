import { useCallback } from "react";

const useVideoAnalytics = (videoId, currentTime, videoDuration) => {
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

      // console.log("📊 Video Analytics:", eventData);
    },
    [videoId, currentTime, videoDuration]
  );

  return { trackEvent };
};

export default useVideoAnalytics;
