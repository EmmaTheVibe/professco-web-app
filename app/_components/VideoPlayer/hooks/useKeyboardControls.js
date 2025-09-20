import { useCallback, useEffect } from "react";

const useVideoKeyboardControls = (
  videoRef,
  trackEvent,
  playbackRate,
  setVolume,
  setIsMuted,
  setPlaybackRate
) => {
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
    [videoRef, trackEvent, playbackRate, setVolume, setIsMuted, setPlaybackRate]
  );

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  // Return the handler in case it's needed elsewhere
  return { handleKeyPress };
};

export default useVideoKeyboardControls;
