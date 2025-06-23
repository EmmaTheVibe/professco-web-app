"use client";

import styles from "./Tags.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Tags() {
  const tags = ["All", "Special Offer", "New", "Best Seller"]; // Changed "Bestseller" to "Best Seller"
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase()); // e.g., ["all", "special offer", "new", "best seller"]

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Helper to convert display format (e.g., "Special Offer") to URL format (e.g., "special-offer")
  const formatTagForUrlParam = (tagDisplayName) => {
    if (tagDisplayName.toLowerCase() === "all") {
      return null; // Special value to indicate param should be deleted
    }
    // Convert spaces to hyphens and make lowercase
    return tagDisplayName.toLowerCase().replace(/\s+/g, "-");
  };

  // Helper to convert URL param format (e.g., "special-offer") back to display format (e.g., "special offer")
  const formatUrlParamToDisplay = (urlParam) => {
    if (!urlParam) {
      // If param is missing, it means "All" is active by default
      return "all";
    }
    // Convert hyphens back to spaces
    return urlParam.replace(/-/g, " ");
  };

  const rawTagFromUrl = searchParams?.get("tags"); // Get the raw value from URL
  // Convert URL raw value to display format for comparison with `lowerCaseTags`
  const displayFormatFromUrl = formatUrlParamToDisplay(rawTagFromUrl);

  // Determine the activeTag for UI highlighting
  const activeTag = lowerCaseTags.includes(displayFormatFromUrl)
    ? displayFormatFromUrl
    : "all"; // Fallback to "all" if URL tag is invalid or missing

  function handleTag(tagDisplayName) {
    // 'tag' here is the display name (e.g., "Best Seller")
    const formattedTagForUrl = formatTagForUrlParam(tagDisplayName); // Get "best-seller" or null

    const params = new URLSearchParams(searchParams);

    if (formattedTagForUrl === null) {
      // If it's "All", delete the 'tags' parameter from the URL
      params.delete("tags");
    } else {
      // Set the 'tags' parameter with the formatted, hyphenated value
      params.set("tags", formattedTagForUrl);
    }

    params.set("page", "1"); // Ensure page is reset to string '1'
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className={styles.tagbox}>
      <p className={styles.txt}>Tags:</p>
      <div className={styles.tagline}>
        {tags.map(
          (
            tagDisplayName,
            i // Use tagDisplayName for clarity
          ) => (
            <div
              key={i}
              className={`${styles.tag} ${
                tagDisplayName.toLowerCase() === activeTag && styles.activeTag // Compare display name with activeTag
              }`}
              onClick={() => handleTag(tagDisplayName)} // Pass the display name to handleTag
            >
              <p>{tagDisplayName}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
