import { useState, useEffect, useCallback } from "react";

// Helper function to convert ISO 8601 duration (PT1H2M3S) to seconds
const parseISO8601Duration = (duration) => {
  if (!duration) return 0;

  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseFloat(match[3] || 0);

  return hours * 3600 + minutes * 60 + seconds;
};

// Helper function to parse MPD XML and extract duration
const parseMPDDuration = (mpdText) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(mpdText, "text/xml");

    // Look for mediaPresentationDuration attribute in MPD element
    const mpdElement = xmlDoc.querySelector("MPD");
    if (mpdElement && mpdElement.hasAttribute("mediaPresentationDuration")) {
      const duration = mpdElement.getAttribute("mediaPresentationDuration");
      return parseISO8601Duration(duration);
    }

    // Fallback: look for duration in Period elements
    const periods = xmlDoc.querySelectorAll("Period");
    let totalDuration = 0;

    for (const period of periods) {
      if (period.hasAttribute("duration")) {
        totalDuration += parseISO8601Duration(period.getAttribute("duration"));
      }
    }

    return totalDuration || null;
  } catch (err) {
    console.error("Error parsing MPD:", err);
    return null;
  }
};

// Helper function to format seconds to readable duration
const formatDuration = (seconds) => {
  if (!seconds || seconds === 0) return "0 mins";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes} mins`;
  } else {
    return `${remainingSeconds} secs`;
  }
};

export function useVideoDuration(modules = []) {
  const [durations, setDurations] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch duration for a single module
  const fetchModuleDuration = useCallback(async (module) => {
    if (!module.manifest_url) {
      console.warn(`Module ${module.id} has no manifest_url`);
      return null;
    }

    try {
      const response = await fetch(module.manifest_url);
      if (!response.ok) {
        throw new Error(`Failed to fetch MPD: ${response.statusText}`);
      }

      const mpdText = await response.text();
      const durationInSeconds = parseMPDDuration(mpdText);

      return {
        id: module.id,
        seconds: durationInSeconds,
        formatted: formatDuration(durationInSeconds),
      };
    } catch (err) {
      console.error(`Error fetching duration for module ${module.id}:`, err);
      return {
        id: module.id,
        seconds: null,
        formatted: null,
        error: err.message,
      };
    }
  }, []);

  // Main effect to fetch all durations
  useEffect(() => {
    if (!modules || modules.length === 0) return;

    const fetchAllDurations = async () => {
      setLoading(true);
      setError(null);

      try {
        const promises = modules.map(fetchModuleDuration);
        const results = await Promise.allSettled(promises);

        const newDurations = {};
        results.forEach((result, index) => {
          if (result.status === "fulfilled" && result.value) {
            newDurations[result.value.id] = result.value;
          } else {
            const moduleId = modules[index].id;
            newDurations[moduleId] = {
              id: moduleId,
              seconds: null,
              formatted: null,
              error: result.reason?.message || "Unknown error",
            };
          }
        });

        setDurations(newDurations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDurations();
  }, [modules, fetchModuleDuration]);

  // Helper function to get total duration of all modules
  const getTotalDuration = () => {
    const totalSeconds = Object.values(durations).reduce((total, duration) => {
      return total + (duration.seconds || 0);
    }, 0);

    return {
      seconds: totalSeconds,
      formatted: formatDuration(totalSeconds),
    };
  };

  // Helper function to get duration for a specific module
  const getModuleDuration = (moduleId) => {
    return durations[moduleId] || { seconds: null, formatted: null };
  };

  return {
    durations,
    loading,
    error,
    getTotalDuration,
    getModuleDuration,
    formatDuration, // Export the formatter in case you need it elsewhere
  };
}
