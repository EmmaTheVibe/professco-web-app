"use client";

import React, { useEffect, useRef, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "./VideoPlayer.module.css";

const VideoPlayer = ({ manifestUri, licenseServerUrl }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const size1 = useMediaQuery("(min-width: 1200px)");
  const size2 = useMediaQuery("(min-width: 1000px)");
  const size3 = useMediaQuery("(min-width: 850px)");
  const size4 = useMediaQuery("(min-width: 600px)");

  useEffect(() => {
    let isMounted = true;

    const initializePlayer = async () => {
      try {
        // Check if we're in the browser
        if (typeof window === "undefined") {
          return;
        }

        // Dynamic import of Shaka Player
        const shaka = await import("shaka-player/dist/shaka-player.ui.js");
        await import("shaka-player/dist/controls.css");

        if (!isMounted) return;

        const videoElement = videoRef.current;
        if (!videoElement) {
          console.error("Video element not found");
          return;
        }

        // Check browser support
        if (!shaka.Player.isBrowserSupported()) {
          setError("Browser not supported for video playback");
          setIsLoading(false);
          return;
        }

        // Install polyfills
        shaka.polyfill.installAll();

        // Create player
        const player = new shaka.Player(videoElement);
        playerRef.current = player;

        // Create UI
        const videoContainer = videoElement.parentElement;
        const ui = new shaka.ui.Overlay(player, videoContainer, videoElement);

        // Error handling
        player.addEventListener("error", (event) => {
          console.error("Shaka Player Error:", event.detail);
          setError("Video playback error occurred");
        });

        // Configure DRM if needed
        if (licenseServerUrl) {
          player.configure({
            drm: {
              servers: {
                "com.widevine.alpha": licenseServerUrl,
              },
            },
          });
        }

        // Load the manifest
        await player.load(manifestUri);

        if (isMounted) {
          console.log("Video loaded successfully!");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error initializing video player:", error);
        console.error("Error type:", typeof error);
        console.error("Error stringified:", JSON.stringify(error));
        if (error instanceof Error) {
          console.error("Error message:", error.message);
          console.error("Stack trace:", error.stack);
        }
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
          playerRef.current.destroy();
        } catch (error) {
          console.error("Error destroying player:", error);
        }
      }
    };
  }, [manifestUri, licenseServerUrl]);

  if (error) {
    return (
      <div className={styles.videoContainer}>
        <div className={styles.errorMessage}>
          <p>⚠️ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.videoContainer}>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>Loading video player...</p>
        </div>
      )}
      <div
        data-shaka-player-container
        data-shaka-player-cast-receiver-id="44991CE2"
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        <video
          ref={videoRef}
          autoPlay
          className={styles.shakaVideo}
          // style={{
          //   width: `${
          //     size1
          //       ? "658px"
          //       : size2
          //       ? "550px"
          //       : size3
          //       ? "450px"
          //       : size4
          //       ? "100%"
          //       : "100%"
          //   }`,
          //   height: `${
          //     size1
          //       ? "484px"
          //       : size2
          //       ? "465px"
          //       : size3
          //       ? "400px"
          //       : size4
          //       ? "350px"
          //       : "216px"
          //   }`,
          // }}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
